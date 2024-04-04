var vehicles = JSON.parse(localStorage.getItem("fleetData")) || [];

var totalRot = 0;
let rotation = 0;
let doAnim = true;
let canvas = null;
let ctx = null;
let text = document.querySelector(".text");
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
setTimeout(requestAnimationFrame(animate), 1500);

function calcPointsCirc(cx, cy, rad, dashLength) {
    var n = rad / dashLength,
        alpha = (Math.PI * 2) / n,
        points = [],
        i = -1;

    while (i < n) {
        var theta = alpha * i,
            theta2 = alpha * (i + 1);

        points.push({
            x: Math.cos(theta) * rad + cx,
            y: Math.sin(theta) * rad + cy,
            ex: Math.cos(theta2) * rad + cx,
            ey: Math.sin(theta2) * rad + cy
        });
        i += 2;
    }
    return points;
}

function animate() {
    //Clearing animation on every iteration
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const center = {
        x: 175,
        y: 175
    };

    //main arc
    ctx.beginPath();
    ctx.strokeStyle = rotation >= 0.75 * Math.PI ? "#00FF00" : "#FF0000";
    ctx.lineWidth = "3";
    let radius = 174;
    ctx.arc(center.x, center.y, radius, Math.PI, Math.PI + rotation);
    ctx.stroke();

    //Red Arc
    if (rotation <= 0.75 * Math.PI) {
        ctx.beginPath();
        ctx.strokeStyle = "#FF9421";
        ctx.lineWidth = "3";
        ctx.arc(center.x, center.y, radius, 1.75 * Math.PI, 0);
        ctx.stroke();
    }

    //functions to draw dotted lines
    const DrawDottedLine = (x1, y1, x2, y2, dotRadius, dotCount, dotColor) => {
        var dx = x2 - x1;
        var dy = y2 - y1;
        let slopeOfLine = dy / dx;
        var degOfLine =
            Math.atan(slopeOfLine) * (180 / Math.PI) > 0 ?
            Math.atan(slopeOfLine) * (180 / Math.PI) :
            180 + Math.atan(slopeOfLine) * (180 / Math.PI);
        var degOfNeedle = rotation * (180 / Math.PI);

        if (rotation >= 0.75 * Math.PI) {
            dotColor = degOfLine <= degOfNeedle ? "#FF9421" : "#f97272";
        } else {
            dotColor = degOfLine <= degOfNeedle ? dotColor : "#aad4d4";
            // dotColor = degOfLine <= degOfNeedle ? dotColor : "#000000";
        }
        var spaceX = dx / (dotCount - 1);
        var spaceY = dy / (dotCount - 1);
        var newX = x1;
        var newY = y1;
        for (var i = 0; i < dotCount; i++) {
            dotRadius = dotRadius >= 0.75 ? dotRadius - i * (0.5 / 15) : dotRadius;
            drawDot(newX, newY, dotRadius, `${dotColor}${100 - (i + 1)}`);
            newX += spaceX;
            newY += spaceY;
        }
    };
    const drawDot = (x, y, dotRadius, dotColor) => {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = dotColor;
        ctx.fill();
    };
    let firstDottedLineDots = calcPointsCirc(center.x, center.y, 165, 1);
    for (let k = 0; k < firstDottedLineDots.length; k++) {
        let x = firstDottedLineDots[k].x;
        let y = firstDottedLineDots[k].y;
        DrawDottedLine(x, y, 175, 175, 1.75, 30, "#35FFFF");
        // DrawDottedLine(x, y, 175, 175, 1.75, 30, "#0077b6");

    }

    //dummy circle to hide the line connecting to center
    ctx.beginPath();
    ctx.arc(center.x, center.y, 80, 2 * Math.PI, 0);
    ctx.fillStyle = "black";
    ctx.fill();

    //Speedometer triangle
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
    if (rotation < totalRot) {
        rotation += (1 * Math.PI) / 180;
        if (rotation > totalRot) {
            rotation -= (1 * Math.PI) / 180;
        }
    }

    text.innerHTML = Math.round((rotation / Math.PI) * 100) + 0 + "%";
    requestAnimationFrame(animate);
}
// Event listener for previous button if it exists
if (document.getElementById("prevButton")) {
    document.getElementById("prevButton").addEventListener("click", function() {
        window.location.href = "green-options.html"
    });
}

// Event listener for next button
if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").addEventListener("click", function() {
        window.location.href = "best-ev-options.html"
    });
}

window.onload = function() {
    var total_saving = 0;
    var total_current_emissions = 0;
    vehicles.forEach(item => {
        total_saving += parseFloat(item['savings']);
        total_current_emissions += parseFloat(item['current_emission_in_tons']);
    });
    document.querySelector(".savings-value").innerHTML = total_saving.toFixed(2);
    if (total_saving == 0) {
        percent_overall_savings = 0;
    } else {
        percent_overall_savings = (total_saving / total_current_emissions) * 100
    }
    localStorage.setItem('percent_overall_savings', percent_overall_savings);
    totalRot = ((percent_overall_savings / 100) * 180 * Math.PI) / 180;
    getOverallSavingsPieChart()
}


function getOverallSavingsPieChart() {
    var labels = vehicles.map((v) => {
        return (
            v.description +
            " - " +
            v.type +
            " - " +
            v.year +
            " - " +
            v.make +
            " - " +
            v.model
        );
    });
    var individualSavingsData = vehicles.map((v) => {
        return parseFloat(v.savings);
    });

    backgroundColor = generateBackgroundColors(individualSavingsData.length);
    var pieChartData = {
        labels: labels,
        datasets: [{
            label: "Overall Savings",
            data: individualSavingsData,
            backgroundColor,
            borderColor: "#07354d",
            borderWidth: 1.5,
            // borderRadius: 8,
        }, ],
    };

    var pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animate: true,
        animation: {
            duration: 2000,
            easing: "easeInQuint",
        },
        plugins: {
            title: {
                display: true,
                text: "Overall Savings",
                color: "#000000",
                font: {
                    size: 24,
                },
                ticks: {
                    color: "#000000",
                },
                padding: 10,
            },
            legend: {
                display: true,
                position: "left",
                labels: {
                    color: "#000000",
                }
            },
        },
    };


    const canvas = document.getElementById("overallSavingsChart");
    const ctx = canvas.getContext("2d");
    // Create the pie chart
    new Chart(ctx, {
        type: "pie",
        data: pieChartData,
        options: pieChartOptions,
    });
}

function generateBackgroundColors(n) {
    const colors = [];
    const white = 'hsl(0, 0%, 100%)'; // Define white color

    for (let i = 0; i < n; i++) {
        let color;

        // Generate a new color until it's unique and not white
        do {
            const hue = Math.floor(Math.random() * 360); // Generate random hue between 0 and 360
            const saturation = Math.floor(Math.random() * 51) + 50; // Generate random saturation between 50 and 100
            const lightness = Math.floor(Math.random() * 51) + 50; // Generate random lightness between 50 and 100
            color = `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Convert hue, saturation, and lightness to HSL color
        } while (colors.includes(color) || color === white);

        colors.push(color); // Add unique color to the array
    }

    return colors;
}