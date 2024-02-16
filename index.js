
var fleetTable;
(function () {
    console.log("Greener Fleet App is running");

    const storedData = getFleetDataGridFormat();

    console.log("Initializing Grid.js");
    var div= document.getElementById("fleetTable");

        fleetTable = new gridjs.Grid({
        columns: [
            'Description', 'Type', 'Year', 'Make', 'Model',
            'Annual VKT', 'Annual Fuel', 'Fuel Type', 'Flex Fuel', 'Quantity',
            { 
                name: 'Actions',
                formatter: (cell, row) => {

                var deleteButton = gridjs.h('button', {
                    //className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                    className: 'button_sm green delete',
                    onClick: () => deleteVehicle(row.cells[10].data)
                }, 'Delete');
                var editButton =  gridjs.h('button', {
                    //className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                    className: 'button_sm green edit',
                    onClick: () => editVehicle(row.cells[10].data)
                }, 'Edit');
                    
                return [editButton, deleteButton];
                }
            },
        ],
        data: storedData,
        // pagination: true,
        search: true,
        sort: true,
        autowidth:true,
        style: {
            table: {
                'border': '0',
                'background-color': '#a7deec',
                'white-space': 'nowrap'
            },
            th: {
                'border': '0',
                'border-bottom': '1px solid #000',
                'background-color': '#a7deec',
                'white-space': 'nowrap'
            },
            td:{
                'background-color': '#a7deec',
                'white-space': 'nowrap'
            }
        }
    })
    .render(div);

})();
