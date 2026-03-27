const { JSDOM } = require('jsdom');
// Import the functions to be tested
const { calculateTotalRotation, initializeCanvas, drawSpeedometerTriangle, animateSpeedometer } = require('../js/speedo.testable');

// Test for calculateTotalRotation function
describe('calculateTotalRotation', () => {
  test('calculates total rotation correctly', () => {
    const percent = 50;
    const expectedTotalRot = (percent / 100) * 180 * Math.PI / 180;
    expect(calculateTotalRotation(percent)).toBeCloseTo(expectedTotalRot);
  });

  test('handles zero percent gracefully', () => {
    const percent = 0;
    expect(calculateTotalRotation(percent)).toBe(0);
  });
});

// Test for initializeCanvas function
describe('initializeCanvas', () => {
  test('initializes canvas and context correctly', () => {
    const { document } = new JSDOM('<!doctype html><html><body><canvas id="canvas"></canvas></body></html>').window;
    global.document = document;
    const { canvas, ctx } = initializeCanvas();
    expect(canvas).toBeDefined();
    expect(ctx).toBeDefined();
  });
});

// Test for drawSpeedometerTriangle function
describe('drawSpeedometerTriangle', () => {
  test('draws speedometer triangle correctly', () => {
    const ctxMock = {
      save: jest.fn(),
      beginPath: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      fill: jest.fn(),
      restore: jest.fn(),
    };
    const rotation = Math.PI / 4; // 45 degrees
    drawSpeedometerTriangle(ctxMock, rotation);
    expect(ctxMock.beginPath).toHaveBeenCalledTimes(1);
    expect(ctxMock.translate).toHaveBeenCalledWith(175, 175);
    expect(ctxMock.rotate).toHaveBeenCalledWith(rotation);
    expect(ctxMock.fill).toHaveBeenCalledTimes(1);
  });
});

// Mock requestAnimationFrame for testing animateSpeedometer
global.requestAnimationFrame = jest.fn(callback => callback());

// Test for animateSpeedometer function
describe('animateSpeedometer', () => {
  test('animates speedometer correctly', () => {
    const ctxMock = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      strokeStyle: "#FF0000",
      lineWidth: "3",
      arc: jest.fn(),
      stroke: jest.fn(),
    };
    const textElementMock = { innerHTML: '' };
    animateSpeedometer(ctxMock, 0, Math.PI, textElementMock);
    expect(ctxMock.clearRect).toHaveBeenCalledTimes(1);
    expect(ctxMock.beginPath).toHaveBeenCalledTimes(3); // Three arcs are drawn
    expect(ctxMock.arc).toHaveBeenCalledTimes(3);
    expect(ctxMock.stroke).toHaveBeenCalledTimes(2); // Two strokes for the main arc and red arc
    expect(textElementMock.innerHTML).not.toBe('');
  });
});
