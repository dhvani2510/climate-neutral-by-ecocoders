// __tests__/main.test.js

var vehicles = [
    {
        "id":1,
        "Description": "Vehicle 1",
        "Type": "Sedan",
        "Year": 2020,
        "Make": "Toyota",
        "Model": "Camry",
        "Annual VKT": 12000,
        "Annual Fuel": 500,
        "Fuel Type": "Gasoline",
        "Flex Fuel": false,
        "Quantity": 1
    },
    {
        "id":2,
        "Description": "Vehicle 2",
        "Type": "SUV",
        "Year": 2018,
        "Make": "Honda",
        "Model": "CR-V",
        "Annual VKT": 15000,
        "Annual Fuel": 600,
        "Fuel Type": "Gasoline",
        "Flex Fuel": true,
        "Quantity": 2
    },
    {
        "id":3,
        "Description": "Truck",
        "Type": "Pickup",
        "Year": 2022,
        "Make": "Ford",
        "Model": "F-150",
        "Annual VKT": 18000,
        "Annual Fuel": 800,
        "Fuel Type": "Diesel",
        "Flex Fuel": false,
        "Quantity": 1
    }
];

// Mock localStorage
global.localStorage = {
    getItem: jest.fn(() => JSON.stringify(vehicles))
};

// Mock getFleetData function
// jest.mock('../main', () => ({
//     getFleetData: jest.fn(() => vehicles )
// }));

const { getVehicleById, getFleetData, getFleetDataGridFormat,convertToFleetArray } = require('../main');

// Test cases for getFleetData function
describe('getFleetData', () => {
    it('should return array of objects', () => {
        expect(getFleetData()).toEqual(vehicles);
    });
});

// Test cases for getFleetDataGridFormat function
describe('getFleetDataGridFormat', () => {
    it('should return array of objects', () => {
        expect(getFleetDataGridFormat()).toEqual(convertToFleetArray(vehicles));
    });
});

// Test cases for getVehicleById function
describe('getVehicleById', () => {
    it('should return vehicle with valid id', () => {
        var vehicle= vehicles.find(v=>v.id==1);
        expect(getVehicleById(1)).toEqual(vehicle);
    });

    it('should return undefined for non-existent id', () => {
        expect(getVehicleById(4)).toBeUndefined();
    });

    it('should throw error for non-integer id', () => {
        expect(() => getVehicleById('abc')).toThrow('Invalid id: must be an integer');
    });
});