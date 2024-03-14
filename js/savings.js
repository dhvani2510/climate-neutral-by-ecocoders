var carTypes = ['T','I','S','C','M','L', 'WS', 'WM'];
var truckTypes = ['PS','PL','US','UL','V','VC','VP','SP']
var fuelTypes = {
    'Gasoline':'X',
    "E10 Gasoline":'Z',
    'Diesel':'D'
}
var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";


function evaluateSavings(item, ev_data) {
    let optionOpted = item['selectedOption'];
    let fuelType = item['fuelType'];
    let type = item['type'];
    if(optionOpted == 'Replace with EV Vehicle') {
        ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'BEV' || x['VehicleTypeId'] == 'PHEV');
        if (type =='Car')
            ev_data = ev_data.filter(x => carTypes.includes(x['ClassId']));
        else
            ev_data = ev_data.filter(x => truckTypes.includes(x['ClassId']));
        ev_data = ev_data.sort((x,y) => x['RankingAll'] - y['RankingAll']);
        ev_data = ev_data.slice(0,10);

        // CombElectricLeConsumption
        ev_data.map(element => {
            element.electical_efficiency = (element['CombElectricLeConsumption'] * 8.9 ) / 100;
            element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
            element.savings = ((item['currentEmissionIntensity'] - element.ev_emissions_intensity)/item['currentEmissionIntensity'] );
            element.percent_savings = (element.savings * 100);
            element.total_emissions_savings = element.savings * item['currentAnnualEmissions']
            element.new_annual_emissions = item['currentAnnualEmissions'] - element.total_emissions_savings
        });

        ev_data = ev_data.sort((x,y) => x['total_emissions_savings'] - y['total_emissions_savings']);

        let selectedEV = ev_data[0];

        item['percent_savings'] = Math.trunc(selectedEV['percent_savings']);
        
        item['savings'] = (selectedEV['total_emissions_savings'] / 1000000).toFixed(2);
 
        return item;
    }
    if(optionOpted == 'E85 Ethanol Usage') {
        item['percent_savings'] = 79;
        item['savings'] =(( 0.8 * item['currentAnnualEmissions'])/1000000).toFixed(2);
        return item;
    }

    if (optionOpted == 'Replace with Biofuel car')  {
        ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'ICE');
        ev_data = ev_data.filter(x => carTypes.includes(x['ClassId']));
        ev_data = ev_data.filter(x => x['FuelTypeId'] == 'E');
        ev_data = ev_data.sort((x,y) => x['RankingAll'] - y['RankingAll']);
        ev_data = ev_data.slice(0,10);

        ev_data.map(element => {
            element.electical_efficiency = (element['CombGasConsumption']  ) / 100;
            element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
            element.savings = ((item['currentEmissionIntensity'] - element.ev_emissions_intensity)/item['currentEmissionIntensity'] );
            element.percent_savings = (element.savings * 100);
            element.total_emissions_savings = element.savings * item['currentAnnualEmissions']
            element.new_annual_emissions = item['currentAnnualEmissions'] - element.total_emissions_savings
        });
        
        ev_data = ev_data.sort((x,y) => x['total_emissions_savings'] - y['total_emissions_savings']);
        let selectedEV = ev_data[0];
        console.log(selectedEV);
        if(selectedEV) {
            item['percent_savings'] = Math.trunc(selectedEV['percent_savings']);
            item['savings'] = (selectedEV['total_emissions_savings'] / 1000000).toFixed(2);    
        }
        else {
            item['percent_savings'] = 0;
            item['savings'] = 0;
        }
        return item;
    }

    if(optionOpted == 'Replace with Biofuel Truck')  {
        ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'ICE');
        ev_data = ev_data.filter(x => truckTypes.includes(x['ClassId']));
        ev_data = ev_data.filter(x => x['FuelTypeId'] == 'E');
        ev_data = ev_data.sort((x,y) => x['RankingAll'] - y['RankingAll']);
        ev_data = ev_data.slice(0,10);

        ev_data.map(element => {
            element.electical_efficiency = (element['CombGasConsumption']  ) / 100;
            element.ev_emissions_intensity = element.electical_efficiency * emmisionCoefficient;
            element.savings = ((item['currentEmissionIntensity'] - element.ev_emissions_intensity)/item['currentEmissionIntensity'] );
            element.percent_savings = (element.savings * 100);
            element.total_emissions_savings = element.savings * item['currentAnnualEmissions']
            element.new_annual_emissions = item['currentAnnualEmissions'] - element.total_emissions_savings
        });
        
        ev_data = ev_data.sort((x,y) => x['total_emissions_savings'] - y['total_emissions_savings']);
        let selectedEV = ev_data[0];
        if(selectedEV) {
            item['percent_savings'] = Math.trunc(selectedEV['percent_savings']);
            item['savings'] = (selectedEV['total_emissions_savings'] / 1000000).toFixed(2);    
        }
        else {
            item['percent_savings'] = 0;
            item['savings'] = 0;
        }
        return item;
    }
}