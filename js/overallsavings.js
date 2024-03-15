const individualSavingsBtn = document.querySelector('.action-savings a:nth-of-type(1)');
const overallSavingsBtn = document.querySelector('.action-savings a:nth-of-type(2)');

individualSavingsBtn.addEventListener('click', () => {
    individualSavingsBtn.classList.add('active');
    overallSavingsBtn.classList.remove('active');
});

overallSavingsBtn.addEventListener('click', () => {
    overallSavingsBtn.classList.add('active');
    individualSavingsBtn.classList.remove('active');
});

var fleetData = getFleetData();

function goToResultsPage() {
    localStorage.setItem('fleetData', JSON.stringify(fleetData)); // Update the local storage data
    window.location.href = ".html";
}

function goToGreenOptions() {
    localStorage.setItem('fleetData', JSON.stringify(fleetData)); // Update the local storage data
    window.location.href = "green-options.html";
}

window.onload = ()  =>{
var total_saving = 0;
var total_current_emissions = 0;
console.log(fleetData);
fleetData.forEach(item => {
    total_saving += parseFloat(item['savings']);
    total_current_emissions += parseFloat(item['currentAnnualEmissionsInTons']);
});
document.querySelector(".savings-value").innerHTML = total_saving.toFixed(2);

percent_overall_savings =  (((total_current_emissions - total_saving) / total_current_emissions)*100).toFixed(0);

console.log(total_saving);
console.log(percent_overall_savings);

localStorage.setItem('percent_overall_savings', percent_overall_savings);
getOverallSavingsPieChart();
}


//Charts

function getOverallSavingsPieChart()
{
    var labels = fleetData.map((v) => {
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
    var individualSavingsData = fleetData.map((v) => {
        return parseFloat(v.savings);
    }); 

 backgroundColor=generateBackgroundColors(individualSavingsData.length);
 var pieChartData = {
    labels: labels,
    datasets: [
      {
        label: "Overall Savings",
        data: individualSavingsData,
        backgroundColor,
        borderColor: "#07354d",
        borderWidth: 1.5,
        // borderRadius: 8,
      },
    ],
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
        font: {
          size: 24,
        },
        padding: 10,
      },
      legend: {
        display: true,
        position: "left",
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

// function generateBackgroundColors(n) {
//   const colors = [];
//   const blueHue = 200; // Start hue closer to blue
//   const greenHue = 140; // End hue closer to green

//   for (let i = 0; i < n; i++) {
//       const hue = Math.floor(Math.random() * (greenHue - blueHue + 1)) + blueHue; // Generate random hue within range
//       const color = `hsl(${hue}, 70%, 50%)`; // Convert hue to HSL color

//       colors.push(color); // Add color to the array
//   }

//   return colors;
// }

function generateBackgroundColors(n) {
    const colors = [];

    for (let i = 0; i < n; i++) {
        const hue = Math.floor(Math.random() * 360); // Generate random hue between 0 and 360
        const saturation = Math.floor(Math.random() * 51) + 50; // Generate random saturation between 50 and 100
        const lightness = Math.floor(Math.random() * 51) + 50; // Generate random lightness between 50 and 100
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Convert hue, saturation, and lightness to HSL color

        colors.push(color); // Add color to the array
    }

    return colors;
}
// function generateBackgroundColors(n) {
//     const colors = [];
//     const blueHue = 200; // Start hue closer to blue
//     const greenHue = 140; // End hue closer to green
//     const hueRange = greenHue - blueHue;
//     const step = hueRange / n; // Divide the hue range into equal parts

//     for (let i = 0; i < n; i++) {
//         const hue = blueHue + (step * i); // Calculate hue for each color
//         const color = `hsl(${hue}, 70%, 50%)`; // Convert hue to HSL color

//         colors.push(color); // Add color to the array
//     }

//     return colors;
// }
