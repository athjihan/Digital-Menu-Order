# Gunakan image resmi Node.js
FROM node:18

# Set working directory
WORKDIR /usr/src/app/src

# Copy file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke container
COPY . .

# Ekspos port yang digunakan aplikasi
EXPOSE 3000

# Gunakan perintah npm start untuk menjalankan aplikasi
CMD ["npm", "start"]
