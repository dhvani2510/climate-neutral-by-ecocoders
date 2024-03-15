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
console.log(total_saving);
console.log(total_current_emissions);
// add total_saving to total_savings element
document.querySelector(".savings-value").innerHTML = total_saving

percent_overall_savings = ((total_current_emissions - total_saving) / total_current_emissions)*100

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
        borderRadius: 8,
      },
    ],
  };
  
  var pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Overall Savings",
        font: {
          size: 20,
        },
        //padding: 20,
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

function generateBackgroundColors(n) {
    const colors = [];
    const blueHue = 200; // Start hue closer to blue
    const greenHue = 140; // End hue closer to green
    const hueRange = greenHue - blueHue;
    const step = hueRange / n; // Divide the hue range into equal parts

    for (let i = 0; i < n; i++) {
        const hue = blueHue + (step * i); // Calculate hue for each color
        const color = `hsl(${hue}, 70%, 50%)`; // Convert hue to HSL color

        colors.push(color); // Add color to the array
    }

    return colors;
}
