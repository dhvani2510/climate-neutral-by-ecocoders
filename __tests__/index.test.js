// Import the function to be tested
const { getFleetData } = require('../js/index');

// Mock localStorage
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

describe('getFleetData', () => {
    beforeEach(() => {
        // Clear mock implementation before each test
        localStorage.getItem.mockClear();
    });

    test('returns empty array when no data is stored', () => {
        // Mock localStorage.getItem to return null (no data stored)
        localStorage.getItem.mockReturnValueOnce(null);

        // Call the function
        const result = getFleetData();

        // Expectations
        expect(localStorage.getItem).toBeCalledWith('fleetData'); // Ensure getItem was called with correct key
        expect(result).toEqual([]); // Expect an empty array to be returned
    });

    test('returns stored data from localStorage', () => {
        // Mock stored data
        const storedData = [
            { id: 1, description: 'Test Car', type: 'Car', year: '2023' },
            { id: 2, description: 'Test Truck', type: 'Truck', year: '2022' }
        ];
        localStorage.getItem.mockReturnValueOnce(JSON.stringify(storedData));

        // Call the function
        const result = getFleetData();

        // Expectations
        expect(localStorage.getItem).toBeCalledWith('fleetData'); // Ensure getItem was called with correct key
        expect(result).toEqual(storedData); // Expect stored data to be returned
    });
});
