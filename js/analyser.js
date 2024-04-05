var vehicles = JSON.parse(window.localStorage.getItem("fleetData")) || [];

var ev_data = [];

var best_ev_vehicles = [];

var carTypes = ['T', 'I', 'S', 'C', 'M', 'L', 'WS', 'WM'];
var truckTypes = ['PS', 'PL', 'US', 'UL', 'V', 'VC', 'VP', 'SP'];
var fuelTypes = {
    'Gasoline': 'X',
    "E10 Gasoline": 'Z',
    'Diesel': 'D'
}
var emmisionCoefficient = window.localStorage.getItem("emissionCoefficient") || "30";

async function callAPI() {
    const url = 'https://fcrapi.azurewebsites.net/VehiclesPublic';
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    const payload = {
        ResultsPerPage: 500000,
        VehicleType: 'ICE,BEV,PHEV',
        SelectedModelYears: 'ALL',
        SelectedClasses: 'ALL',
        SelectedMakes: 'ALL',
        SelectedModels: 'ALL',
        SelectedTransmissions: 'ALL',
        SelectedFuels: 'ALL',
        SelectedCylinderRanges: 'ALL',
        Units: 'Metric',
        UsePersonalizeValues: false,
        PersKilometersPerYear: 20000,
        PersPercentageCityDriving: 55,
        PersRegGasoline: 1.45,
        PersPremGasoline: 1.70,
        PersDiesel: 1.70,
        PersElectricity: 0.16,
        PageIndexIce: 1,
        PageIndexBev: 1,
        pageIndexPhev: 1,
        SortBy: 'DefaultSortBy',
        IsAscending: true
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const data = await response.json();
        return data.VehiclesList;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = async() => {
    ev_data = await callAPI();
    vehicles.forEach(async(item) => {
        await calculateSavings(item, ev_data);
    });
    window.localStorage.setItem("fleetData", JSON.stringify(vehicles));
    document.getElementById("analyzeButton").disabled = false; // Enable the button after data is written
    evaluateBestEVOptions(ev_data);
}

async function calculateSavings(vehicle) {
    let optionSelected = vehicle['selectedOption'];
    if (optionSelected == "Nothing") {
        vehicle["percent_savings"] = 0;
        vehicle["savings"] = 0;
        return;
    } else {
        await evaluateSavings(vehicle, ev_data);
    }
}

function evaluateSavings(vehicle, ev_data) {
    let optionSelected = vehicle['selectedOption'];
    let type = vehicle['type'];
    var selectedEV = null;

    switch (optionSelected) {
        case "Replace with EV Vehicle":
            ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'BEV' || x['VehicleTypeId'] == 'PHEV');
            if (type == 'Car')
                ev_data = ev_data.filter(x => carTypes.includes(x['ClassId']));
            else
                ev_data = ev_data.filter(x => truckTypes.includes(x['ClassId']));
            ev_data = ev_data.sort((x, y) => x['RankingAll'] - y['RankingAll']);
            ev_data = ev_data.slice(0, 15);

            ev_data.map(element => {
                element.electical_efficiency = (element['CombElectricLeConsumption'] * 8.9) / 100;
                element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
                element.savings = ((vehicle['current_emission_intensity'] - element.ev_emissions_intensity) / vehicle['current_emission_intensity']);
                element.percent_savings = (element.savings * 100);
                element.total_emissions_savings = element.savings * vehicle['current_annual_emission']
                element.new_annual_emissions = vehicle['current_annual_emission'] - element.total_emissions_savings
            });

            ev_data = ev_data.sort((x, y) => x['total_emissions_savings'] - y['total_emissions_savings']);
            selectedEV = ev_data[0];
            vehicle['percent_savings'] = Math.trunc(selectedEV['percent_savings']);
            vehicle['savings'] = (selectedEV['total_emissions_savings'] / 1000000).toFixed(2);
            return;
        case "E85 Ethanol Usage":
            vehicle['percent_savings'] = 79;
            vehicle['savings'] = ((0.8 * vehicle['current_annual_emission']) / 1000000).toFixed(2);
            return;
        case "Replace with Biofuel car":
            ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'ICE');
            ev_data = ev_data.filter(x => carTypes.includes(x['ClassId']));
            ev_data = ev_data.filter(x => x['FuelTypeId'] == 'E');
            ev_data = ev_data.sort((x, y) => x['RankingAll'] - y['RankingAll']);
            ev_data = ev_data.slice(0, 10);

            ev_data.map(element => {
                element.electical_efficiency = (element['CombGasConsumption'] * 8.9) / 100;
                element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
                element.savings = ((vehicle['current_emission_intensity'] - element.ev_emissions_intensity) / vehicle['current_emission_intensity']);
                element.percent_savings = (element.savings * 100);
                element.total_emissions_savings = element.savings * vehicle['current_annual_emission']
                element.new_annual_emissions = vehicle['current_annual_emission'] - element.total_emissions_savings
            });

            ev_data = ev_data.sort((x, y) => x['total_emissions_savings'] - y['total_emissions_savings']);
            selectedEV = ev_data[0];

            if (selectedEV) {
                vehicle['percent_savings'] = Math.trunc(selectedEV['percent_savings']);
                vehicle['savings'] = (selectedEV['total_emissions_savings'] / 1000000).toFixed(2);
            } else {
                vehicle['percent_savings'] = 0;
                vehicle['savings'] = 0;
            }
            return;
        case "Replace with Biofuel Truck":
            ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'ICE');
            ev_data = ev_data.filter(x => truckTypes.includes(x['ClassId']));
            ev_data = ev_data.filter(x => x['FuelTypeId'] == 'E');
            ev_data = ev_data.sort((x, y) => x['RankingAll'] - y['RankingAll']);
            ev_data = ev_data.slice(0, 10);

            ev_data.map(element => {
                element.electical_efficiency = (element['CombGasConsumption'] * 8.9) / 100;
                element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
                element.savings = ((vehicle['current_emission_intensity'] - element.ev_emissions_intensity) / vehicle['current_emission_intensity']);
                element.percent_savings = (element.savings * 100);
                element.total_emissions_savings = element.savings * vehicle['current_annual_emission']
                element.new_annual_emissions = vehicle['current_annual_emission'] - element.total_emissions_savings
            });

            ev_data = ev_data.sort((x, y) => x['total_emissions_savings'] - y['total_emissions_savings']);
            selectedEV = ev_data[0];
            if (selectedEV) {
                vehicle['percent_savings'] = Math.trunc(selectedEV['percent_savings']);
                vehicle['savings'] = (selectedEV['total_emissions_savings'] / 1000000).toFixed(2);
            } else {
                vehicle['percent_savings'] = 0;
                vehicle['savings'] = 0;
            }
            return;
        case "Right-size to smaller vehicle":
            selectedEV = findRightSize(ev_data, vehicle);
            if (selectedEV) {
                vehicle['percent_savings'] = Math.trunc(selectedEV['percent_savings']);
                vehicle['savings'] = (selectedEV['total_emissions_savings'] / 1000000).toFixed(2);
            } else {
                vehicle['percent_savings'] = 0;
                vehicle['savings'] = 0;
            }
            return;
        case "B20 Biodiesel Usage":
            vehicle['percent_savings'] = 15;
            vehicle['savings'] = ((0.15 * vehicle['current_annual_emission']) / 1000000).toFixed(2);
            return;
        case "Nothing":
            return;
        default:
            return;
    }
}

function findRightSize(ev_data, vehicle) {
    ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'ICE');
    ev_data = ev_data.filter(x => carTypes.includes(x['ClassId']));
    ev_data = ev_data.sort((x, y) => x['RankingAll'] - y['RankingAll']);
    ev_data_nobiofuel = ev_data.filter(x => x['FuelTypeId'] != 'E');
    ev_data_biofuel = ev_data.filter(x => x['FuelTypeId'] == 'E');
    const midIndex_biofuel = Math.floor(ev_data_biofuel.length / 2);
    const midIndex_nobiofuel = Math.floor(ev_data_nobiofuel.length / 2);
    if (midIndex_nobiofuel >= 5 && midIndex_biofuel >= 5) {
        ev_data = ev_data_nobiofuel.slice(midIndex_nobiofuel - 3, midIndex_nobiofuel + 2);
        ev_data = ev_data.concat(ev_data_biofuel.slice(midIndex_biofuel - 3, midIndex_biofuel + 2));
    } else {
        ev_data = ev_data_nobiofuel.slice(0, ev_data_nobiofuel.length - 1);
        ev_data = ev_data.concat(ev_data_biofuel.slice(0, ev_data_biofuel.length - 1));
    }

    ev_data.map(element => {
        element.electical_efficiency = (element['CombGasConsumption'] * 8.9) / 100;
        element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
        element.savings = ((vehicle['current_emission_intensity'] - element.ev_emissions_intensity) / vehicle['current_emission_intensity']);
        element.percent_savings = (element.savings * 100);
        element.total_emissions_savings = element.savings * vehicle['current_annual_emission']
        element.new_annual_emissions = vehicle['current_annual_emission'] - element.total_emissions_savings
    });

    ev_data = ev_data.sort((x, y) => x['total_emissions_savings'] - y['total_emissions_savings']);
    return ev_data[0];
}

function evaluateBestEVOptions(ev_data) {
    ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'BEV' || x['VehicleTypeId'] == 'PHEV');
    ev_data = ev_data.sort((x, y) => x['RankingAll'] - y['RankingAll']);
    let uniqueMakeModels = new Set();

    ev_data = ev_data.filter(element => {
        if (!uniqueMakeModels.has(element.MakeModel)) {
            uniqueMakeModels.add(element.MakeModel);
            return true;
        }
        return false;
    });

    let car_evs = ev_data.filter(x => carTypes.includes(x['ClassId']));
    let truck_evs = ev_data.filter(x => truckTypes.includes(x['ClassId']));

    ev_data = [];
    ev_data = ev_data.concat(car_evs.slice(0, 8));
    ev_data = ev_data.concat(truck_evs.slice(0, 7));

    // select any random vehicle from cehicles
    let randomIndex = Math.floor(Math.random() * vehicles.length);
    let vehicle = vehicles[randomIndex];

    ev_data.map(element => {
        element.electical_efficiency = (element['CombElectricLeConsumption'] * 8.9) / 100;
        element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
        element.savings = ((vehicle['current_emission_intensity'] - element.ev_emissions_intensity) / vehicle['current_emission_intensity']);
        element.percent_savings = (element.savings * 100);
        element.total_emissions_savings = element.savings * vehicle['current_annual_emission']
        element.new_annual_emissions = vehicle['current_annual_emission'] - element.total_emissions_savings
    });
    ev_data = ev_data.sort((x, y) => x['total_emissions_savings'] - y['total_emissions_savings']);

    window.localStorage.setItem("best_ev_vehicles", JSON.stringify(ev_data));
}