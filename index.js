// code to display settings popup when icon is clied and close when clicked on smewhere else
function toggleSettings() {
  document.getElementById("popupBg").style.display = "block";
}
function closeSettings() {
  document.getElementById("popupBg").style.display = "none";

}
// if popup is opened and user clicks randomly on the scree, the popup should be closed
// TODO I don't know if this is usefull
// window.addEventListener("click") = function (event) {
//   console.log(event.target);
//   const popup = document.querySelector(".popupBg");
//   if (event.target == popup) {
//     popup.classList.remove("show");
//   }
// }

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
        pagination: true,
        search: true,
        sort: true,
        style: {
            table: {
                
            border: '3px solid #ccc',
            //'background-color': '#0c1c81',
            },
            th: {
            //'background-color': 'rgba(0, 0, 0, 0.1)',
            'background-color': '#0c1c81',
            //color: '#000',
            color: 'white',
            'border-bottom': '3px solid #ccc',
            'text-align': 'center'
            },
            td: {
            'text-align': 'center',
            //'background-color': '#0c1c81',
            //color: 'white',
            }
        }
    })
    .render(div);

})();