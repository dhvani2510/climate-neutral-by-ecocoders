const localStorageMock = {
    getItem: jest.fn(() => null), // Mock the getItem function to return null
    setItem: jest.fn(), // Mock the setItem function
  };
  
global.localStorage = localStorageMock; // Assign the mock to the global object

const greenOptionsFilePath='../js/green-options'
const {
    createOptionsList,
    getGreenOptions,
    updateGreenFleetOption,
    populateContainer,
    evauateGreenOpitions,
    getGreenOptionById
} = require(greenOptionsFilePath); // Import the functions to be tested

// Mock the getFleetData function
jest.mock(greenOptionsFilePath, () => ({ 
    getFleetData: jest.fn(() => ([
        // Define mock fleet data here
        // This is just an example, replace it with your actual mock data
        { id: 1, description: 'Car 1', type: 'Car', year: '2020', make: 'Toyota', model: 'Corolla' },
        { id: 2, description: 'Truck 1', type: 'Truck', year: '2018', make: 'Ford', model: 'F-150' },
    ])),
    ...jest.requireActual(greenOptionsFilePath), // Import all functions from the actual file
}));

describe('getGreenOptions', () => {
    test('selects appropriate green options', () => {
        const vehicle = {
            id: 1,
            type: "Car",
            flexFuel: "Yes",
            fuelType: "Gasoline"
        };
        const selectedOptions = getGreenOptions(vehicle);
        // Assert that selected options are correct
        expect(selectedOptions.length).toBeGreaterThan(0);
    });

    test('selects appropriate green options for Car with FlexFuel Yes and Gasoline fuel type', () => {
        const vehicle = { id: 1, type: "Car", flexFuel: "Yes", fuelType: "Gasoline" };
        const selectedOptions = getGreenOptions(vehicle);
        expect(selectedOptions.length).toBeGreaterThan(0);
        // Add specific assertions for this scenario
        expect(selectedOptions.every(option => option.id === 1 || option.id === 3 || option.id === 16)).toBe(true);
    });

    test('selects appropriate green options for Car with FlexFuel No and Gasoline fuel type', () => {
        const vehicle = { id: 1, type: "Car", flexFuel: "No", fuelType: "Gasoline" };
        const selectedOptions = getGreenOptions(vehicle);
        expect(selectedOptions.length).toBeGreaterThan(0);
        // Add specific assertions for this scenario
        expect(selectedOptions.every(option => option.id === 7 || option.id === 15 || option.id === 16)).toBe(true);
    });

    test.skip('selects appropriate green options for Light Duty Truck with FlexFuel Yes and Gasoline fuel type', () => {
        const vehicle = { id: 1, type: "Light Duty Truck", flexFuel: "Yes", fuelType: "Gasoline" };
        const selectedOptions = getGreenOptions(vehicle);
        expect(selectedOptions.length).toBeGreaterThan(0);
        // Add specific assertions for this scenario
        expect(selectedOptions.every(option => option.id === 1 || option.id === 3 || option.id === 16)).toBe(true);
    });

    test('selects appropriate green options for Light Duty Truck with FlexFuel No and Diesel fuel type', () => {
        const vehicle = { id: 1, type: "Light Duty Truck", flexFuel: "No", fuelType: "Diesel" };
        const selectedOptions = getGreenOptions(vehicle);
        expect(selectedOptions.length).toBeGreaterThan(0);
        // Add specific assertions for this scenario
        expect(selectedOptions.every(option => option.id === 8 || option.id === 9 || option.id === 10 || option.id === 12 || option.id === 16)).toBe(true);
    });
});

describe('createOptionsList', () => {
    test('creates options list correctly', () => {
        const item = {
            id: 1,
            type: "Car",
            flexFuel: "Yes",
            fuelType: "Gasoline"
        };
        const optionsList = createOptionsList(item);
        // Assert that options list is created correctly
        expect(optionsList.childNodes.length).toBeGreaterThan(0);
    });
});


describe.skip('updateGreenFleetOption', () => {
    test('updates selected option correctly', () => {
        const itemId = 1;
        const option = "Replace with EV Vehicle";
        updateGreenFleetOption(itemId, option);
        // Retrieve the updated option
        const updatedItem = fleetData.find(item => item.id === itemId);
        // Assert that selected option is updated correctly
        expect(updatedItem.selectedOption).toEqual(option);
    });
});

describe('populateContainer', () => {
    test('populates container with correct elements', () => {
        // Implement test for populateContainer function
        // You may need to use a mocking library to mock document.querySelector and other DOM-related functions
    });
});

describe('evauateGreenOpitions', () => {
    test('evaluates and updates possible options correctly', () => {
        // Implement test for evauateGreenOpitions function
        // You may need to mock localStorage and fleetData for this test
    });
});

describe('getGreenOptionById', () => {
    test('returns correct green option by id', () => {
        const id = 1;
        const option = getGreenOptionById(id);
        // Assert that correct option is returned
        expect(option).toBeDefined();
        expect(option.id).toEqual(id);
    });
});
