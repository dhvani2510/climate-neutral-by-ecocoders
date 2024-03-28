const { calculateEmissions, goToGreenOptionsPage, goToUserInputPage } = require('../js/charts.js');


// Mock document object with necessary methods and properties
const mockDocument = {
    getElementById: jest.fn(),
    createElement: jest.fn(() => ({
      id: '',
      getContext: jest.fn()
    })),
    body: {
      appendChild: jest.fn(),
      removeChild: jest.fn()
    }
  };
  
  // Mock getElementById method to return a mock canvas element
  mockDocument.getElementById.mockReturnValueOnce({
    getContext: jest.fn()
  });
  
  // Mock getContext method of the mock canvas element
  mockDocument.getElementById().getContext.mockReturnValueOnce({
    createLinearGradient: jest.fn(),
    addColorStop: jest.fn()
  });
  
  // Mock the global document object with the mock document
  global.document = mockDocument;

  document.body.innerHTML = `
  <div id="myChart"></div>
`;
describe('calculateEmissions', () => {
  test('should calculate emissions correctly', () => {
    const fleet = {
      annualFuel: 10000, // Example values, adjust as needed
      annualVKT: 5000, // Example values, adjust as needed
      fuelType: 'Gasoline' // Example values, adjust as needed
    };

    calculateEmissions(fleet);

    // Assert expected values
    expect(fleet.currentFuelEfficiency).toBe(2); // Adjust expected values based on calculations
    expect(fleet.currentEmissionIntensity).toBeCloseTo(459.8, 1); // Adjust expected values based on calculations
    expect(fleet.currentAnnualEmissions).toBe(22990000); // Adjust expected values based on calculations
    expect(fleet.currentAnnualEmissionsInTons).toBe(22.99); // Adjust expected values based on calculations
  });
});

describe('goToGreenOptionsPage', () => {
  test('should set local storage and navigate to green-options.html', () => {
    const mockLocalStorage = {
      setItem: jest.fn()
    };
    global.localStorage = mockLocalStorage;

    goToGreenOptionsPage();

    // Assert local storage was set with the correct value
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('next', 'green-options.html');

    // You can also test window.location.href if necessary
  });
});

describe('goToUserInputPage', () => {
  test('should navigate to main.html', () => {
    // Mock window.location.href and check if it's called correctly
    const mockHref = jest.fn();
    global.window = { location: { href: mockHref } };

    goToUserInputPage();

    // Assert window.location.href was called with the correct URL
    expect(mockHref).toHaveBeenCalledWith('main.html');
  });
});
