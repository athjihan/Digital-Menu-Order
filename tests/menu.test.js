// unit test for menu repository

const MenuRepository = require('../src/repositories/menuRepo');

describe('MenuRepository Unit Tests', () => {
    let dbMock;
    let menuRepo;

    beforeEach(() => {
        dbMock = {
            query: jest.fn()
        };
        menuRepo = new MenuRepository(dbMock);
    });

    test('findAll should return all menu items', async () => {
        const mockData = [[{ id: 1, name: '' }, { id: 2, name: 'Sate Ayam' }]];
        dbMock.query.mockResolvedValueOnce(mockData);

        const result = await menuRepo.findAll();
        expect(dbMock.query).toHaveBeenCalledWith("SELECT * FROM menu");
        expect(result).toEqual(mockData[0]);
    });

    test('searchByName should return menu items that match keyword', async () => {
        const keyword = 'ayam';
        const mockResult = [[[{ id: 1, name: 'Ayam Geprek' }]]];
        dbMock.query.mockResolvedValueOnce(mockResult);

        const result = await menuRepo.searchByName(keyword);
        expect(dbMock.query).toHaveBeenCalledWith('CALL SearchMenu(?)', [keyword]);
        expect(result).toEqual(mockResult[0][0]);
    });

    test('filterByCategory should return menu items of a category', async () => {
        const category = 'minuman';
        const mockResult = [[[{ id: 3, name: 'Es Teh' }]]];
        dbMock.query.mockResolvedValueOnce(mockResult);

        const result = await menuRepo.filterByCategory(category);
        expect(dbMock.query).toHaveBeenCalledWith('CALL GetCategory(?)', [category]);
        expect(result).toEqual(mockResult[0][0]);
    });
});
