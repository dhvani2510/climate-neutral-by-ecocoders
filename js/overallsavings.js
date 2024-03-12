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
    window.location.href = "/green-options.html";
}

// add total_saving from all fleetData objects
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

document.querySelector('.Res').innerHTML = percent_overall_savings.toFixed(1)