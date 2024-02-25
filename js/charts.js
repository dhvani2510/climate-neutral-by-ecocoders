function getRandomNumber(){
    return Math.floor(Math.random() * 20) + 1;
}
const ctx = document.getElementById('myChart');

var vehicles = getFleetData();

if(vehicles){

  
   var labels = vehicles.map(v=> { return v.description; });
   var initValue= 175;
   var data = labels.map(l=>{ initValue -= getRandomNumber(); return initValue; }); //Getting data 
   
   var data ={
        labels,
        datasets: [{
          label: 'Vehicle Replacement Emissions Intensities',
          data,
          fill: true,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };
    // const config = {
    //     type: 'bar',
    //     data,
    //     options: {
    //       indexAxis: 'y',
    //     }
    //   };

    new Chart(ctx, {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
          }
        // options: {
        //   scales: {
        //     y: {
        //       beginAtZero: true
        //     }
        //   }
        // }
      });

      //Using Plotly

      var colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(201, 203, 207, 0.6)'
    ];

      var data = [{
        x: data, //values
        y: labels,
        type: 'bar',
        orientation: 'h',
        marker: {
            //color: 'rgba(255, 99, 132, 0.6)',
            color: colors,
            line: {
                color: 'rgba(255, 99, 132, 1)',
                width: 1
            }
        }
    }];

    var layout = {
        title: 'Vehicle Replacement Emissions Intensities',
        xaxis: { title: 'Emissions Intensity' },
        //yaxis: { title: 'Vehicle Description' }
    };

    Plotly.newPlot('plotlyChart', data, layout);
}
 