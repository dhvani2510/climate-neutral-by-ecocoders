var selectedProvince = "Ontario";

var optionsForProvinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
  "Northwest Territories", "Nunavut", "Yukon",
];

var settingsModal = document.getElementById("settingsModal");
var overlay = document.getElementById("overlay");
var provinceBtn = document.getElementById("provinceBtn");
var provinceSelect = document.getElementById("provinceSelect");
var emissionCoefficientElement = document.getElementById("emissionCoefficient");

function openSettingsModal() {
  settingsModal.style.display = "flex";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
  provinceBtn.innerHTML = selectedProvince;
  updateEmissionCoefficient(selectedProvince);
}

function openOptions() {
  provinceSelect.style.display = "block";
  if (provinceSelect.childElementCount == 0) {
    createOptions();
  }
  provinceSelect.querySelector(`[data-value="${selectedProvince}"]`).classList.add("selected");
}

function createOptions() {
  optionsForProvinces.forEach((item) => {
    var option = document.createElement("li");
    option.classList.add("option");
    option.innerHTML = item;
    option.value = item;
    option.setAttribute("data-value", item);
    option.setAttribute("onclick", () => updateEmissionCoefficient(item));
    provinceSelect.appendChild(option);
  });
}

function updateEmissionCoefficient(selectedProvince) {
  selectedProvince = provinceBtn.innerHTML = selectedProvince;
  var emissionCoefficient = getEmissionCoefficient(selectedProvince);
  emissionCoefficientElement.innerHTML = emissionCoefficient;
  provinceSelect.style.display = "none";
  localStorage.setItem('province', selectedProvince);
  localStorage.setItem('emissionCoefficient', emissionCoefficient);
}

function getEmissionCoefficient(selectedProvince) {
  for (var i = 0; i < provincialWfficnienyCoefficient.length; i++) {
    if (provincialWfficnienyCoefficient[i].p === selectedProvince) {
      return provincialWfficnienyCoefficient[i].c;
    }
  }
  return 0;
}

function closeSettingsModal() {
  settingsModal.style.display = "none";
  overlay.style.display = "none";
  document.body.style.overflow = ""; // Restore scrolling of main content
}

window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (provinceSelect.style.display == "block") {
      provinceSelect.style.display = "none";
    } else if (settingsModal.style.display != "none") {
      closeSettingsModal();
      provinceSelect.style.display = "none";
    }
  }
});

window.addEventListener('mousedown', function(event) {
  if (provinceSelect.style.display == "block" && !provinceSelect.contains(event.target)) {
    provinceSelect.style.display = "none";
  } else if (settingsModal.style.display != "none" && !settingsModal.contains(event.target)) {
    closeSettingsModal();
  }
});
