var fleetData = getFleetData();

// Call the function to populate the container
populateContainer();
 
// Function to populate the container with data
function populateContainer() {
    const container = document.querySelector("#dynamic-divs");
    fleetData.forEach(item => {
        item['selectedOption'] = "";
        // Create divs for each item
        const div = document.createElement("div");
        div.classList.add("vehicle-item");
        // Add 2 side by side divs of equal width for the description and options
        let descDiv = createDescriptionDiv(item);
        let optionsDiv = createOptionsDiv(item);
        div.appendChild(descDiv);
        div.appendChild(optionsDiv);
        container.appendChild(div);
 
        // the options div should only be visible when either the row is hovered or clicked
        div.addEventListener("mouseover", () => {
                optionsDiv.classList.remove('hidden');                
        });
        div.addEventListener("mouseleave", () => {
            if(item['selectedOption'] == "" || item['selectedOption'] == "Select option") {
                optionsDiv.classList.add('hidden');
            }
            document.getElementById('select-list-'+item['id']).classList.add('hidden');
        });
    });
}
 
// Function to create the description div
function createDescriptionDiv(item) {
    const descDiv = document.createElement("div");
    descDiv.classList.add("description");
    descDiv.textContent = item['description'] + " - " + item['type'] + " - " +
        item['year'] + " - " + item['make'] + " - " + item['model'];
    return descDiv;
}
 
 
// Function to create the options div
function createOptionsDiv(item) {
    const optionsDiv = document.createElement("div");
    // Add class
    optionsDiv.classList.add("vehicle-green-options");
    optionsDiv.classList.add('hidden');
    // Add id
    optionsDiv.setAttribute("id", "options-"+item['id']);
    // create a button
    const button = document.createElement("button");
    button.classList.add("vehicle-list-button");
    button.setAttribute("id", "button-"+item['id']);
    button.innerHTML = item['selectedOption'] == "" ? "Select option" : item['selectedOption'];
    optionsDiv.appendChild(button);
 
    const selectList = createOptionsList(item);
    selectList.classList.add("select-list");
    selectList.classList.add("hidden");
    optionsDiv.appendChild(selectList);
 
    // create a div that shows a down arrow in a circle
    const arrow = document.createElement("button");
    arrow.classList.add("select-arrow","white");
    a = document.createElement('i')
    a.classList.add("fas", "fa-chevron-down");
    arrow.appendChild(a);
    optionsDiv.appendChild(arrow);
   
     // add click event listener to button and optionsDiv
     const toggleOptions = () => {
        selectList.classList.toggle("hidden");
    };
    const hideOptions = () => {
        selectList.classList.add("hidden");
    }
 
    button.addEventListener("click", toggleOptions);
    optionsDiv.addEventListener('mouseout', hideOptions());
 
    selectList.addEventListener('mouse', (event) => {
        if(event.target.tagName == "LI"){
            button.innerHTML = event.target.textContent;
            selectList.classList.add('hidden');
        }
    });
 
   
    return optionsDiv;
}
 
 
 
// function to create the options list
function createOptionsList(item) {
    options = ["Select option", 'Yes', 'No'];
    const selectList = document.createElement("div");
    selectList.id = "select-list-" + item['id'];
    selectList.classList.add("select-list");
    selectList.classList.add("hidden");
    options.forEach(option => {
        const optionElem = document.createElement("div");
        optionElem.textContent = option;
        optionElem.value = option;
        optionElem.setAttribute("onclick", `updateGreenFleetOption('${item['id']}','${option}')`);
        selectList.appendChild(optionElem);
    });
    return selectList;
}
 
function updateGreenFleetOption(item, option) {
    console.log(fleetData);
    let i = fleetData.find(x => x['id'] == item);
    console.log(i);
    i['selectedOption'] = document.querySelector('#button-'+item).textContent = option;
    document.getElementById('select-list-'+item).classList.add('hidden');
}