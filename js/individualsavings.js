const individualSavingsBtn = document.querySelector(
  ".action-savings a:nth-of-type(1)"
);
const overallSavingsBtn = document.querySelector(
  ".action-savings a:nth-of-type(2)"
);

individualSavingsBtn.addEventListener("click", () => {
  individualSavingsBtn.classList.add("active");
  overallSavingsBtn.classList.remove("active");
});

overallSavingsBtn.addEventListener("click", () => {
  overallSavingsBtn.classList.add("active");
  individualSavingsBtn.classList.remove("active");
});

var fleetData = getFleetData();
var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";
var ev_data = [];

window.onload = async () => {
  populateContainer();
  console.log(fleetData);
  localStorage.setItem("fleetData", JSON.stringify(fleetData));
};

function populateContainer() {
  const container = document.querySelector(".vehicle-list");
  fleetData.forEach((item) => {
    // Create divs for each item
    const div = document.createElement("div");
    div.classList.add("vehicle-item");
    // Add 2 side by side divs of equal width for the description and options
    let descDiv = createDescriptionDiv(item);
    div.appendChild(descDiv);
    container.appendChild(div);
    // the options div should only be visible when either the row is hovered or clicked
    div.addEventListener("click", async () => {
      const infoDiv = document.querySelector(".savings-info");
      document.querySelectorAll(".vehicle-item").forEach((item) => {
        item.classList.remove("selected");
      });
      div.classList.add("selected");
      infoDiv.classList.remove("hidden");
      document.querySelector(".percentage-value").innerHTML =
        item["percent_savings"];
      document.querySelector(".savings-value").innerHTML = item["savings"];
      document.querySelector(".selected-option").innerHTML =item["selectedOption"];
    });
  });
  document.querySelectorAll(".vehicle-item")[0].click();
  console.log(fleetData);
}

function createDescriptionDiv(item) {
  const descDiv = document.createElement("div");
  descDiv.classList.add("description");
  descDiv.textContent =
    item["description"] +
    " - " +
    item["type"] +
    " - " +
    item["year"] +
    " - " +
    item["make"] +
    " - " +
    item["model"];
  return descDiv;
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

carsClassId = ["T", "I", "S", "C", "M", "L", "WS", "WM"];



function goToResultsPage() {
  localStorage.setItem("fleetData", JSON.stringify(fleetData)); // Update the local storage data
  window.location.href = "best-ev-options.html";
}

function goToGreenOptions() {
  localStorage.setItem("fleetData", JSON.stringify(fleetData)); // Update the local storage data
  window.location.href = "/green-options.html";
}