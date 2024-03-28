const { calculateEmissions } = require('../js/charts');
describe('calculateEmissions', () => {
    test('should calculate emissions correctly for Gasoline fuel type', () => {
      const fleet = {
        annualFuel: 10000,
        annualVKT: 5000,
        fuelType: 'Gasoline'
      };
  
      calculateEmissions(fleet);
  
      expect(fleet.currentFuelEfficiency).toBe(2); // Adjust expected value based on calculations
      expect(fleet.currentEmissionIntensity).toBeCloseTo(459.8, 1); // Adjust expected value based on calculations
      expect(fleet.currentAnnualEmissions).toBe(22990000); // Adjust expected value based on calculations
      expect(fleet.currentAnnualEmissionsInTons).toBe(22.99); // Adjust expected value based on calculations
    });
  
    test('should calculate emissions correctly for Diesel fuel type', () => {
      const fleet = {
        annualFuel: 12000,
        annualVKT: 6000,
        fuelType: 'Diesel'
      };
  
      calculateEmissions(fleet);
  
      expect(fleet.currentFuelEfficiency).toBe(2); // Adjust expected value based on calculations
      expect(fleet.currentEmissionIntensity).toBeCloseTo(455, 1); // Adjust expected value based on calculations
      expect(fleet.currentAnnualEmissions).toBe(5460000); // Adjust expected value based on calculations
      expect(fleet.currentAnnualEmissionsInTons).toBe(5.46); // Adjust expected value based on calculations
    });
  
    test('should calculate emissions correctly for E10 Gasoline fuel type', () => {
      const fleet = {
        annualFuel: 8000,
        annualVKT: 4000,
        fuelType: 'E10 Gasoline'
      };
  
      calculateEmissions(fleet);
  
      expect(fleet.currentFuelEfficiency).toBe(2); // Adjust expected value based on calculations
      expect(fleet.currentEmissionIntensity).toBeCloseTo(414.2, 1); // Adjust expected value based on calculations
      expect(fleet.currentAnnualEmissions).toBe(3313600); // Adjust expected value based on calculations
      expect(fleet.currentAnnualEmissionsInTons).toBe(3.31); // Adjust expected value based on calculations
    });
  
    test('should calculate emissions correctly for Electric fuel type', () => {
      const fleet = {
        annualFuel: 0, // No fuel consumption for Electric vehicles
        annualVKT: 8000,
        fuelType: 'Electric'
      };
  
      calculateEmissions(fleet);
  
      expect(fleet.currentFuelEfficiency).toBe(0); // No fuel consumption
      expect(fleet.currentEmissionIntensity).toBe(0); // No emissions
      expect(fleet.currentAnnualEmissions).toBe(0); // No emissions
      expect(fleet.currentAnnualEmissionsInTons).toBe(0); // No emissions
    });
  });