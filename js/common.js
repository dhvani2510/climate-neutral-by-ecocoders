var selectedProvince = 'Ontario'
var provinceOptions = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon"
]


provincialEfficnienyCoefficient = [];

fetch('https://www.canada.ca/en/environment-climate-change/services/climate-change/pricing-pollution-how-it-will-work/output-based-pricing-system/federal-greenhouse-gas-offset-system/emission-factors-reference-values.html#table_6')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        // Parse the HTML using DOM methods or libraries like DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const table = doc.getElementById('table_6');
        const rows = table.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].cells;
            let p = cells[0].innerHTML;
            if (p.indexOf('<') != -1) {
                p = p.substring(0, p.indexOf('<'));
            }
            let c = cells[1].innerHTML;
            provincialEfficnienyCoefficient.push({ p, c });
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });



function openSettingsModal() {
    document.getElementById("settingsModal").style.display = "flex";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";

    overlay.addEventListener("click", () => {
        document.getElementById("settingsModal").style.display = "none";
        overlay.style.display = "none";
    })

    // ceeate options for my custom selevt dropdown
    const selectElement = document.getElementById("provinceOptionsDiv");
    provinceOptions.forEach((province) => {
        var option = document.createElement("li");
        option.classList.add("option");
        option.innerHTML = province;
        option.value = province;
        option.setAttribute("data-value", province);
        option.setAttribute("onclick", `updateEmissionCoefficient('${province}')`); // Passing item here
        selectElement.appendChild(option);
    });


    // if procince is already selected update the values
    let storedProvince = localStorage.getItem("province");
    if (storedProvince != null)
        selectedProvince = storedProvince
    updateEmissionCoefficient(selectedProvince);
}

function updateEmissionCoefficient(event) {
    const selectElement = document.getElementById("provinceOptionsDiv")
    selectElement.style.display = "none"

    // set selected value to global variable and save it in local storage
    selectedProvince = document.getElementById("selectedProvince").innerHTML = event;
    var emissionCoefficient = getEmissionCoefficient(selectedProvince);
    document.getElementById("emissionCoefficient").innerHTML = emissionCoefficient;
    localStorage.setItem('province', event);
    localStorage.setItem('emissionCoefficient', emissionCoefficient);
}

function getEmissionCoefficient(selectedProvince) {
    for (var i = 0; i < provincialEfficnienyCoefficient.length; i++) {
        if (provincialEfficnienyCoefficient[i].p === selectedProvince) {
            return provincialEfficnienyCoefficient[i].c;
        }
    }
    return 0;
}

function openOptions() {
    document.querySelector("#provinceOptionsDiv").style.display = "inline-block";
}

function closeOptions() {

}

function closeSettingsModal() {
    document.getElementById("settingsModal").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
}

function vehicleadded(title, icon = "success", timer = 0) {

    Swal.fire({
        position: "center",
        title,
        // padding: 100,
        showConfirmButton: false,
        animation: true,
        timer,
        imageUrl: "assets/gadi22.png",
        imageWidth: 400,
        imageHeight: 200,
        background: 'linear-gradient(to bottom, #6DEFB2 80%, #D0D5FD 20%)',
    });
}

function vehicledeleted(title, icon = "success", timer = 0) {

    Swal.fire({
        position: "center",
        title,
        showConfirmButton: false,
        animation: true,
        timer,
        imageUrl: "assets/gadi22.png",
        imageWidth: 400,
        imageHeight: 200,
        background: 'linear-gradient(to bottom, #FFAAAA 80%, #D0D5FD 20%)',
    });
}

function enteralldata(title, icon = "error", timer = 0) {

    Swal.fire({
        position: "center",
        title,
        animation: true,
        timer,
        imageUrl: "assets/cars-all.png",
        imageWidth: 400,
        imageHeight: 200,
        background: '#D0D5FD',
    });
}

function confirmation(callback) {
    Swal.fire({
        title: "Are you sure?",
        imageUrl: "assets/eko03.webp",
        showCancelButton: true,
        cancelButtontext: "No",
        confirmButtonColor: "#26b170",
        cancelButtonColor: "#0c1c81",
        background: '#C4DAE9',
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

function vehiclenotfound(title, icon = "error", timer = 0) {

    Swal.fire({
        position: "center",
        title,
        animation: true,
        timer,
        imageUrl: "assets/trunk.png",
        imageWidth: 400,
        imageHeight: 200,
        background: '#D0D5FD',
    });
}