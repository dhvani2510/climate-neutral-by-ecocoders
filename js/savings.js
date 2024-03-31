var best_ev_vehicle = [];

var carTypes = ['T','I','S','C','M','L', 'WS', 'WM'];
var truckTypes = ['PS','PL','US','UL','V','VC','VP','SP']
var fuelTypes = {
    'Gasoline':'X',
    "E10 Gasoline":'Z',
    'Diesel':'D'
}
var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";


async function calculateSavings(item) {
    console.log(item);
    let optionOpted = item["selectedOption"];
    if (optionOpted == "Nothing") {
      item["percent_savings"] = 0;
      item["savings"] = 0;
      return;
    } else {
      item["savings"] = 12;
      evaluateSavings(item, ev_data);
    }
  }

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
        ev_data = ev_data.slice(0,15);

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
        best_ev_vehicle = ev_data;
        localStorage.setItem("best_ev_vehicles", JSON.stringify(best_ev_vehicle));

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

    if (optionOpted == 'Right-size to smaller vehicle') {
        ev_data = ev_data.filter(x => x['VehicleTypeId'] == 'ICE');
        ev_data = ev_data.filter(x => carTypes.includes(x['ClassId']));
        ev_data = ev_data.sort((x,y) => x['RankingAll'] - y['RankingAll']);
        ev_data_nobiofuel = ev_data.filter(x => x['FuelTypeId'] != 'E');
        ev_data_biofuel = ev_data.filter(x => x['FuelTypeId'] == 'E');
        const midIndex_biofuel = Math.floor(ev_data_biofuel.length / 2);
        const midIndex_nobiofuel = Math.floor(ev_data_nobiofuel.length / 2);
        if (midIndex_nobiofuel>=5 && midIndex_biofuel>=5) {
            ev_data = ev_data_nobiofuel.slice(midIndex_nobiofuel-3,midIndex_nobiofuel+2);
            ev_data = ev_data.concat(ev_data_biofuel.slice(midIndex_biofuel-3,midIndex_biofuel+2));
        }else{
            ev_data = ev_data_nobiofuel.slice(0,ev_data_nobiofuel.length-1);
            ev_data = ev_data.concat(ev_data_biofuel.slice(0, ev_data_biofuel.length-1));
        }
        console.log(ev_data);
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

    if (optionOpted == 'B20 Biodiesel Usage') {
        item['percent_savings'] = 15;
        item['savings'] =(( 0.15 * item['currentAnnualEmissions'])/1000000).toFixed(2);
        return item;
    }
}