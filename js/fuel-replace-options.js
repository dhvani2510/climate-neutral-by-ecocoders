// Function to call the third-party API
async function callAPI(year,make,model) {
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