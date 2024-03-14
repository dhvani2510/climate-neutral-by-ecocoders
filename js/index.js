//index.js is for  general functions that can be called from the layout or multiple pages

// This function gets the fleet data from local storage
function getFleetData()
{
console.log("Getting data from local storage");
const storedData = JSON.parse(localStorage.getItem('fleetData')) || [];
console.log(`${storedData.length} record(s) found`);
return storedData;
}


//Sweet alert  functions that will be replacedby Suril 

function sweetAlert(title, icon="success", timer=0){
    Swal.fire({
      position: "center",
      icon,
      title,
      showConfirmButton: false,
      timer
    });
  }
  
  function confirmation(callback){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26b170", // "#3085d6",
      cancelButtonColor: "#0c1c81",//"#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  if (typeof test === 'function'){
    module.exports = {
        getFleetData
    };
}

async function getEVData() {
  return await callAPI(2022, "Tesla", "Model 3");
}