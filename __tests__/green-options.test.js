// const localStorageMock = {
//     getItem: jest.fn(() => null), // Mock the getItem function to return null
//     setItem: jest.fn(), // Mock the setItem function
//   };
  
//  global.localStorage = localStorageMock; // Assign the mock to the global object

const greenOptionsFilePath='../js/green-options'
const {
    createOptionsList,
    getGreenOptions,
    updateGreenFleetOption,
    populateContainer,
    evauateGreenOpitions,
    getGreenOptionById
} = require(greenOptionsFilePath); // Import the functions to be tested

// // Mock the getFleetData function
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
        expect(selectedOptions.every(option => option.id === 1 || option.id === 3 || option.id === 7)).toBe(true);
    });

    test('selects appropriate green options for Car with FlexFuel No and Gasoline fuel type', () => {
        const vehicle = { id: 1, type: "Car", flexFuel: "No", fuelType: "Gasoline" };
        const selectedOptions = getGreenOptions(vehicle);
        expect(selectedOptions.length).toBeGreaterThan(0);
        // Add specific assertions for this scenario
        expect(selectedOptions.every(option => option.id === 1 || option.id === 5 || option.id === 7)).toBe(true);
    });

    test('selects appropriate green options for Light Duty Truck with FlexFuel Yes and Gasoline fuel type', () => {
        const vehicle = { id: 1, type: "Light Duty Truck", flexFuel: "Yes", fuelType: "Gasoline" };
        const selectedOptions = getGreenOptions(vehicle);
        expect(selectedOptions.length).toBeGreaterThan(0);
        // Add specific assertions for this scenario
        expect(selectedOptions.every(option => option.id === 1 || option.id === 2 || option.id === 3 || option.id === 7)).toBe(true);
    });

    test('selects appropriate green options for Light Duty Truck with FlexFuel No and Diesel fuel type', () => {
        const vehicle = { id: 1, type: "Light Duty Truck", flexFuel: "No", fuelType: "Diesel" };
        const selectedOptions = getGreenOptions(vehicle);
        expect(selectedOptions.length).toBeGreaterThan(0);
        // Add specific assertions for this scenario
        expect(selectedOptions.every(option => option.id === 1 || option.id === 2 || option.id === 6 || option.id === 7)).toBe(true);
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

// describe('populateContainer', () => {
//     test('populates container with correct elements', () => {
//         // Implement test for populateContainer function
//         // You may need to use a mocking library to mock document.querySelector and other DOM-related functions
//     });
// });

// describe('evauateGreenOpitions', () => {
//     test('evaluates and updates possible options correctly', () => {
//         // Implement test for evauateGreenOpitions function
//         // You may need to mock localStorage and fleetData for this test
//     });
// });

describe('getGreenOptionById', () => {
    test('returns correct green option by id', () => {
        const id = 1;
        const option = getGreenOptionById(id);
        // Assert that correct option is returned
        expect(option).toBeDefined();
        expect(option.id).toEqual(id);
    });

    test('returns null when option id is not found', () => {
        const id = -1;
        const option = getGreenOptionById(id);
        // Assert that correct option is returned
        expect(option).toBeNull();
    });
});


describe('populateContainer', () => {
    test('populates container with correct elements', () => {
        // Mock fleetData for testing
        const fleetData = [
            { id: 1, description: 'Description 1', type: 'Car', year: 2020, make: 'Make 1', model: 'Model 1', selectedOption: '', possibleOptions: [] },
            { id: 2, description: 'Description 2', type: 'Truck', year: 2021, make: 'Make 2', model: 'Model 2', selectedOption: '', possibleOptions: [] }
        ];

        // Mock document.querySelector and create elements
        document.querySelector = jest.fn(() => ({
            appendChild: jest.fn(),
            addEventListener: jest.fn(),
            classList: { add: jest.fn(), remove: jest.fn() }
        }));
        document.createElement = jest.fn((tagName) => ({
            classList: { add: jest.fn() },
            appendChild: jest.fn(),
            setAttribute: jest.fn(),
            addEventListener: jest.fn(),
            textContent: '',
            innerHTML: '',
            tagName
        }));

        // Call the function to be tested
        const container = populateContainer(fleetData);

        // Assert that document.querySelector was called with the correct arguments
        expect(document.querySelector).toHaveBeenCalledWith('#dynamic-divs');
        //expect(container.id).toBe('dynamic-divs');
    });
});

describe.skip('populateContainer', () => {
    test('populates container with correct elements', () => {
        // Mock fleetData for testing
        const fleetData = [
            { id: 1, description: 'Description 1', type: 'Car', year: 2020, make: 'Make 1', model: 'Model 1', selectedOption: '', possibleOptions: [] },
            { id: 2, description: 'Description 2', type: 'Truck', year: 2021, make: 'Make 2', model: 'Model 2', selectedOption: '', possibleOptions: [] }
        ];

        // Mock document.querySelector
        document.querySelector = jest.fn(() => ({
            appendChild: jest.fn()
        }));

        // Call the function to be tested
        populateContainer(fleetData);

        // Assert that document.querySelector was called with the correct arguments
        expect(document.querySelector).toHaveBeenCalledWith('#dynamic-divs');

        // Assert that appendChild was called twice (once for each item in fleetData)
        expect(document.querySelector().appendChild).toHaveBeenCalledTimes(2);
    });
});

describe.skip('evauateGreenOpitions', () => {
    test('evaluates and updates possible options correctly', () => {
        // Mock localStorage for testing
        const mockLocalStorage = {
            getItem: jest.fn(() => JSON.stringify([])),
            setItem: jest.fn()
        };

        // Mock fleetData for testing
        const fleetData = [
            { id: 1, type: 'Car', flexFuel: 'Yes', fuelType: 'Gasoline', possibleOptions: [] },
            { id: 2, type: 'Truck', flexFuel: 'No', fuelType: 'Diesel', possibleOptions: [] }
        ];

        // Mock getGreenOptions function
        const mockGetGreenOptions = jest.fn(() => [
            { id: 1, option: 'Option 1' },
            { id: 2, option: 'Option 2' }
        ]);

        // Set up window.localStorage and fleetData in the test environment
        global.window = { localStorage: mockLocalStorage };
        global.fleetData = fleetData;

        // Call the function to be tested
        evauateGreenOpitions();

        // Assert that localStorage.getItem was called with the correct argument
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('fleetData');

        // Assert that localStorage.setItem was called with the updated fleetData
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('fleetData', JSON.stringify(fleetData));

        // Assert that getGreenOptions was called twice (once for each item in fleetData)
        expect(mockGetGreenOptions).toHaveBeenCalledTimes(2);

        // Assert that fleetData's possibleOptions property was updated correctly
        expect(fleetData[0].possibleOptions).toEqual(['Option 1', 'Option 2']);
        expect(fleetData[1].possibleOptions).toEqual(['Option 1', 'Option 2']);
    });
});