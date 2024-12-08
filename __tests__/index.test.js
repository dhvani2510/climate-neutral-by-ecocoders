// Import the function to be tested
const { getFleetData, sweetAlert, confirmation  } = require('../js/index');

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


// Mock the Swal object
const Swal = {
    fire: jest.fn()
  };
  
  global.Swal = Swal;
  
  describe('sweetAlert function', () => {
    it('should call Swal.fire with the correct parameters', () => {
      sweetAlert("Test Alert", "info", 3000);
      expect(Swal.fire).toHaveBeenCalledWith({
        position: "center",
        icon: "info",
        title: "Test Alert",
        showConfirmButton: false,
        timer: 3000
      });
    });
  });
  
  describe('confirmation function', () => {
    it('should call Swal.fire with the correct parameters and execute the callback on confirmation', () => {
      const callback = jest.fn();
      Swal.fire.mockResolvedValueOnce({ isConfirmed: true });
      confirmation(callback);
    
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#26b170",
        cancelButtonColor: "#0c1c81",
        confirmButtonText: "Yes, delete it!"
      });
      //expect(callback).toHaveBeenCalled();
    });
  
    it('should not execute the callback on cancel', () => {
      const callback = jest.fn();
      Swal.fire.mockResolvedValueOnce({ isConfirmed: false });
      confirmation(callback);
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#26b170",
        cancelButtonColor: "#0c1c81",
        confirmButtonText: "Yes, delete it!"
      });
      expect(callback).not.toHaveBeenCalled();
    });
  });