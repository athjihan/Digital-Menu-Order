const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = process.env.PORT || 5500;
const path = require('path');

const session = require("express-session");

app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));


app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/*
// Koneksi Database
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "seafood_database"
});
*/

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // ✅ ini yang kurang!
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false 
    } // ✅ Railway butuh ini agar koneksi aman
});




app.get('/menu', async (req, res) => {
    console.log(req.query); // Debugging
    const search = req.query.search || '';
    const category = req.query.category || '';
    const conn = await pool.getConnection();

    try {
        if (search) {
            console.log(`Searching for: ${search}`); // Debugging
            const [results] = await conn.query('CALL SearchMenu(?)', [search]);
            res.render('menu', { menu: results[0] || [], searchQuery: search, success: null, error: null });

        } else if (category && category !== 'all') {
            console.log(`Filtering category: ${category}`); // Debugging
            const [results] = await conn.query('CALL GetCategory(?)', [category]);
            res.render('menu', { menu: results[0] || [], searchQuery: category, success: null, error: null });

        } else {
            console.log('Showing all menu items'); // Debugging
            const [results] = await conn.query('SELECT * FROM menu');
            res.render('menu', { menu: results, searchQuery: '', success: null, error: null });
        }
    } catch (err) {
        console.error(err);
        res.render('menu', { menu: [], searchQuery: search, error: 'Gagal memuat menu.' });
    } finally {
        conn.release();
    }
});




app.post("/order", async (req, res) => {
    const { customer_phone, table_number, payment_method, selected_items, quantities } = req.body;

    if (!customer_phone || !selected_items) {
        return res.redirect("/menu?error=Harap isi semua field!");
    }

    const selectedItemArray = selected_items.split(",");
    const quantityArray = quantities.split(",").map(Number);

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        let total_price = 0;
        for (let i = 0; i < selectedItemArray.length; i++) {
            const [rows] = await conn.query("SELECT price FROM menu WHERE productCode = ?", [selectedItemArray[i]]);
            total_price += rows[0].price * quantityArray[i];
        }

        await conn.query("CALL AddOrder(?, ?, ?, ?)", [customer_phone, table_number, total_price, payment_method]);

        const [orderRow] = await conn.query("SELECT LAST_INSERT_ID() AS orderNumber");
        const orderNumber = orderRow[0].orderNumber;

        for (let i = 0; i < selectedItemArray.length; i++) {
            await conn.query("INSERT INTO order_details (orderNumber, productCode, priceEach, quantityOrdered) VALUES (?, ?, ?, ?)", [
                orderNumber,
                selectedItemArray[i],
                (await conn.query("SELECT price FROM menu WHERE productCode = ?", [selectedItemArray[i]]))[0][0].price,
                quantityArray[i]
            ]);
        }

        await conn.query("UPDATE orders SET totalAmount = ? WHERE orderNumber = ?", [total_price, orderNumber]);

        await conn.commit();

        // ✅ Store order details in session
        req.session.lastOrder = {
            orderNumber,
            total_price,
            selectedItemArray,
            quantityArray
        };

        res.redirect(`/menu?success=Pesanan berhasil dibuat! Order No: ${orderNumber}`);

    } catch (error) {
        await conn.rollback();
        console.error(error);
        res.redirect("/menu?error=Gagal membuat pesanan.");
    } finally {
        conn.release();
    }
});

app.get("/seller", async (req, res) => {
    try {
        const [queue] = await pool.query(`
            SELECT od.orderNumber, o.tableNumber, m.productName, od.quantityOrdered, od.queue_status
            FROM order_details od
            JOIN orders o ON od.orderNumber = o.orderNumber
            JOIN menu m ON od.productCode = m.productCode
            WHERE od.queue_status = 'waiting'
            ORDER BY od.orderNumber ASC
        `);

        const [menuItems] = await pool.query("SELECT productCode, productName FROM menu");

        // 🚨 Debug: Check the raw response from MySQL
        const [topProductsResult] = await pool.query("CALL GetTopProducts(5, 'DESC')");
        console.log("Raw Top Products Result:", topProductsResult);
        const [bottomProductsResult] = await pool.query("CALL GetTopProducts(5, 'ASC')");
        console.log("Raw Bottom Products Result:", bottomProductsResult);

        // Extract the actual result
        const topProducts = topProductsResult[0] || [];  // Ensure it's an array
        const bottomProducts = bottomProductsResult[0] || [];  // Ensure it's an array

        res.render("seller", {
            queue,
            menuItems,
            totalIncome: undefined,
            topProducts,
            bottomProducts
        });
    } catch (error) {
        console.error("Error in /seller route:", error);
        res.render("seller", {
            queue: [],
            menuItems: [],
            totalIncome: undefined,
            topProducts: [],
            bottomProducts: [],
            error: "Failed to fetch product data."
        });
    }
});


// ✅ Confirm Order Completion
app.post("/confirm-order", async (req, res) => {
    const { orderNumber } = req.body;
    try {
        await pool.query("CALL UpdateQueueStatus(?)", [orderNumber]);
        res.redirect("/seller");
    } catch (error) {
        console.error(error);
        res.redirect("/seller");
    }
});

// ➕ Add Menu
app.post('/add-menu', async (req, res) => {
    const { product_code, name, price, image_url, category, availability } = req.body;
    const conn = await pool.getConnection();

    try {
        await conn.query(
            "INSERT INTO menu (productCode, productName, price, category, availability, image_url) VALUES (?, ?, ?, ?, ?, ?)",
            [product_code, name, price, category, availability, image_url]
        );
        res.redirect('/seller?success=true');
    } catch (err) {
        console.error(err);
        res.redirect('/seller?success=false');
    }
});


// 🔄 Update Menu Availability
app.post("/update-availability", async (req, res) => {
    const { product_code, availability } = req.body;
    try {
        await pool.query("CALL UpdateMenuAvailability(?, ?)", [product_code, availability]);
        res.redirect("/seller");
    } catch (error) {
        console.error(error);
        res.redirect("/seller");
    }
});

// 💰 Check Income - return JSON only
app.post("/check-income", async (req, res) => {
    const { start_date, end_date } = req.body;
    try {
        const [rows] = await pool.query("CALL GetIncomeInRange(?, ?)", [start_date, end_date]);
        const totalIncome = rows[0][0].totalIncome || 0;
        res.json({ totalIncome });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/', (req, res) => {
    res.render('landing');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}/`);
});
