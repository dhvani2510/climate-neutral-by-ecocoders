// Sample data
const data = ["Vehicle 1", "Vehicle 2", "Vehicle 3", "Vehicle 4"];

// Function to populate the container with data
function populateContainer() {
    const container = document.querySelector("#dynamic-divs");

    data.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("vehicle-list");
        itemDiv.textContent = item;

        const selectDiv = document.createElement("div");
        selectDiv.classList.add("options");

        // Create select dropdown
        const select = document.createElement("select");
        selectDiv.appendChild(select);

        // Create select options
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Select option";
        defaultOption.value = "";
        select.appendChild(defaultOption);

        // Add options from a sample array
        const options = ["Ethanol Usage E85", "BioDiesel Usage B20", "Switch to Bio-Fuel Car", "Switch to Bio-Fuel Tank", "Switch to EV Vehicle"];
        options.forEach(option => {
            const optionElem = document.createElement("option");
            optionElem.textContent = option;
            optionElem.value = option;
            select.appendChild(optionElem);
        });

        // Event listener for changing select option
        select.addEventListener("change", () => {
            itemDiv.textContent = select.value;
            toggleOptions();
        });

        // Add item and select divs to container
        itemDiv.appendChild(selectDiv);
        container.appendChild(itemDiv);
    });
}

// Function to toggle options display
function toggleOptions() {
    const optionsDivs = document.querySelectorAll(".options");
    optionsDivs.forEach(div => {
        div.classList.toggle("show");
    });
}

// Call the function to populate the container
populateContainer();


// const dropdown = document.getElementById("dropdown");

// document.querySelectorAll(".vehicle-list").forEach(button => {
//   button.addEventListener("mouseenter", function() {
//     const rect = button.getBoundingClientRect();
//     dropdown.style.top = `${rect.top - 8}px`;
//     dropdown.style.left = `${rect.right + 15}px`; // Adjust this value for proper positioning
//     dropdown.style.display = "block";
//   });
// });

// dropdown.addEventListener("mouseleave", function() {
//   dropdown.style.display = "none";
// });
