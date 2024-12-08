const { goToGreenOptionsPage, goToUserInputPage } = require('../js/charts.js');

describe('goToGreenOptionsPage', () => {
  test('should set local storage and navigate to green-options.html', () => {
    ///Arrange
    const mockLocalStorage = {
      setItem: jest.fn()
    };
    global.localStorage = mockLocalStorage;
    global.window = { location: { href: 'charts.html' } };

    ///Act
    goToGreenOptionsPage();

    /// Assert
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('next', 'green-options.html');
    expect(window.location.href).toBe("loading.html");
  });
});

describe('goToUserInputPage', () => {
  test('should navigate to main.html', () => {
    ///Arrange
    // Mocking
    global.window = { location: { href: 'charts.html' } };

    ///Act
    goToUserInputPage();

    //Assert 
    expect(window.location.href).toBe('main.html');
  });
});
