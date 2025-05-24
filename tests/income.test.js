// unit tests for check income feature

const SellerRepository = require('../src/repositories/sellerRepo');

describe('SellerRepository Unit Tests', () => {
    let dbMock;
    let sellerRepo;

    beforeEach(() => {
        dbMock = { query: jest.fn() };
        sellerRepo = new SellerRepository(dbMock);
    });

    test('getIncomeInRange returns total income from result', async () => {
        const startDate = '2024-01-01';
        const endDate = '2024-12-31';
        const mockIncome = 1000000;

        const mockResult = [[[{ totalIncome: mockIncome }]]];
        dbMock.query.mockResolvedValueOnce(mockResult);

        const result = await sellerRepo.getIncomeInRange(startDate, endDate);

        expect(dbMock.query).toHaveBeenCalledWith('CALL GetIncomeInRange(?, ?)', [startDate, endDate]);
        expect(result).toBe(mockIncome);
    });

    test('getIncomeInRange returns 0 if no result', async () => {
        const startDate = '2024-01-01';
        const endDate = '2024-12-31';

        const emptyResult = [[[]]];

        dbMock.query.mockResolvedValueOnce(emptyResult);

        const result = await sellerRepo.getIncomeInRange(startDate, endDate);

        expect(dbMock.query).toHaveBeenCalledWith('CALL GetIncomeInRange(?, ?)', [startDate, endDate]);
        expect(result).toBe(0);
    });

});
