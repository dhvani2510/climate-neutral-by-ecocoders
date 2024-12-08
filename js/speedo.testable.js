// Function to calculate total rotation
function calculateTotalRotation(percent) {
    return ((percent / 100) * 180 * Math.PI) / 180;
  }
  
  // Function to initialize the canvas and context
  function initializeCanvas() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas?.getContext("2d");
    return { canvas, ctx };
  }
  
  // Function to draw the speedometer triangle
  function drawSpeedometerTriangle(ctx, rotation) {
    var x = -75,
      y = 0;
    ctx.save();
    ctx.beginPath();
    ctx.translate(175, 175);
    ctx.rotate(rotation);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y - 10);
    ctx.lineTo(x + 10, y + 10);
    ctx.closePath();
    ctx.fillStyle = rotation >= 0.75 * Math.PI ? "#FF9421" : "#35FFFF";
    ctx.fill();
    ctx.restore();
  }
  
  // Function to animate the speedometer
  function animateSpeedometer(ctx, rotation, totalRot, textElement) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const center = { x: 175, y: 175 };
  
    ctx.beginPath();
    ctx.strokeStyle = rotation >= 0.75 * Math.PI ? "#00FF00" : "#FF0000";
    ctx.lineWidth = "3";
    let radius = 174;
    ctx.arc(center.x, center.y, radius, Math.PI, Math.PI + rotation);
    ctx.stroke();
  
    if (rotation <= 0.75 * Math.PI) {
      ctx.beginPath();
      ctx.strokeStyle = "#FF9421";
      ctx.lineWidth = "3";
      ctx.arc(center.x, center.y, radius, 1.75 * Math.PI, 0);
      ctx.stroke();
    }
  
    drawSpeedometerTriangle(ctx, rotation);
  
    if (rotation < totalRot) {
      rotation += (1 * Math.PI) / 180;
      if (rotation > totalRot) {
        rotation -= (1 * Math.PI) / 180;
      }
    }
  
    textElement.innerHTML = Math.round((rotation / Math.PI) * 100) + 0 + "%";
    requestAnimationFrame(() => animateSpeedometer(ctx, rotation, totalRot, textElement));
  }
  
  // Usage example
  let percent = parseFloat(window.localStorage.getItem('percent_overall_savings')) || 0;
  let totalRot = calculateTotalRotation(percent);
  let { canvas, ctx } = initializeCanvas();
  let text = document.querySelector(".text");
  
  if (ctx && canvas) {
    window.setTimeout(() => requestAnimationFrame(() => animateSpeedometer(ctx, 0, totalRot, text)), 1500);
  }

  if (typeof test === 'function'){
  
    module.exports = {
     calculateTotalRotation, initializeCanvas, drawSpeedometerTriangle, animateSpeedometer
    };
  }