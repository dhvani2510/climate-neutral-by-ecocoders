var selectedProvince = "Ontario";

optionsForProvinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

function openSettingsModal() {
  var modal = document.getElementById("settingsModal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "flex";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling of main content
  document.getElementById("provinceBtn").innerHTML = selectedProvince;
  updateEmissionCoefficient(selectedProvince);
}

function openOptions() {
  var select = document.getElementById("provinceSelect");
  select.style.display = "block";
  if (select.childElementCount==0) {
    createOptions();
  }
}

// function to create the options for provinces
function createOptions() {
  // make Ontario as a default selected option
  optionsForProvinces.forEach((item) => {
    var option = document.createElement("li");
    option.classList.add("option");
    option.innerHTML = item;
    option.value = item;
    option.setAttribute("data-value", item);
    option.setAttribute("id", "provinceSelect");
    option.setAttribute("name", "provinceSelect");
    option.setAttribute("onclick", `updateEmissionCoefficient('${item}')`); // Passing item here
    if (item === "Ontario") {
      option.selected = true;
    }
    document.getElementById("provinceSelect").appendChild(option);
  });
}

// function to update the coefficient
function updateEmissionCoefficient(event) {
  selectedProvince = document.getElementById("provinceBtn").innerHTML = event;
  var emissionCoefficient = getEmissionCoefficient(selectedProvince);
  document.getElementById("emissionCoefficient").innerHTML =
    emissionCoefficient;
  document.getElementById("provinceSelect").style.display = "none";
}

// function to get the emission coefficient
function getEmissionCoefficient(selectedProvince) {
  for (var i = 0; i < provincialWfficnienyCoefficient.length; i++) {
    if (provincialWfficnienyCoefficient[i].p === selectedProvince) {
      return provincialWfficnienyCoefficient[i].c;
    }
  }
  return 0;
}

function closeSettingsModal() {
  var modal = document.getElementById("settingsModal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
  document.body.style.overflow = ""; // Restore scrolling of main content
}
