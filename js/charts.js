const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");
var gradient = ctx ? ctx.createLinearGradient(0, 0, 600, 0) : null;
if (gradient) {
  gradient.addColorStop(0, "#07354d");
  gradient.addColorStop(1, "#95cdeb");
}
var vehicles = [];
var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";

window.onload = () => {
  vehicles = getFleetData();
  vehicles.forEach(async (element) => {
    await calculateEmissions(element);
    calculateCharts();
  });
  console.log(vehicles);
  localStorage.setItem("fleetData", JSON.stringify(vehicles));
};

function calculateCharts() {
  if (vehicles) {
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
    var data = vehicles.map((v) => {
      return v.totalCurrentEmissions;
    }); //Getting data
    var data = {
      labels,
      datasets: [
        {
          label: "Current Emissions",
          data,
          fill: true,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };
    new Chart(ctx, {
      type: "bar",
      data,
      options: {
        indexAxis: "y",
      },
    });
  }
}

function calculateEmissions(fleet) {
  current_fuel_efficiency = fleet["annualFuel"] / fleet["annualVKT"];
  current_annual_emission = fleet["annualFuel"] * emmisionCoefficient;
  current_emission_intensity = current_annual_emission / fleet["annualVKT"];
  total_current_emissions = current_annual_emission * fleet["quantity"];
  fleet["currentFuelEfficiency"] = current_fuel_efficiency;
  fleet["currentEmissionIntensity"] = current_emission_intensity;
  fleet["totalCurrentEmissions"] = total_current_emissions;
  fleet["currentAnnualEmissions"] = current_annual_emission / 44.01;
}

function goToGreenOptionsPage() {
  window.location.href = "green-options.html";
}

function goToUserInputPage() {
  window.location.href = "main.html";
}