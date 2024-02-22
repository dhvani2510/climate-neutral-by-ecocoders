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
console.log(fleetData);

populateContainer();

function populateContainer() {
    const container = document.querySelector(".vehicle-list");
    fleetData.forEach(item => {
        // Create divs for each item
        const div = document.createElement("div");
        div.classList.add("vehicle-item");
        // Add 2 side by side divs of equal width for the description and options
        let descDiv = createDescriptionDiv(item);
        div.appendChild(descDiv);
        container.appendChild(div);
 
        // the options div should only be visible when either the row is hovered or clicked
        div.addEventListener("click", () => {
                const infoDiv = document.querySelector(".savings-info");
                document.querySelectorAll('.vehicle-item').forEach(item => {
                    item.classList.remove('selected');
                });
                div.classList.add('selected');
                infoDiv.classList.remove('hidden');    
                console.log(item['selectedOption']);
                document.querySelector('.option-selected').innerHTML = "Option Selected :" + item['selectedOption'];          
        });
    });
}

function createDescriptionDiv(item) {
    const descDiv = document.createElement("div");
    descDiv.classList.add("description");
    descDiv.textContent = item['description'] + " - " + item['type'] + " - " +
        item['year'] + " - " + item['make'] + " - " + item['model'];
    return descDiv;
}