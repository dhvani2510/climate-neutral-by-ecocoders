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