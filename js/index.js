//index.js is for  general functions that can be called from the layout or multiple pages

// This function gets the fleet data from local storage
function getFleetData()
{
console.log("Getting data from local storage");
const storedData = JSON.parse(localStorage.getItem('fleetData')) || [];
console.log(`${storedData.length} record(s) found`);
return storedData;
}


//Sweet alerts


//For adding vehicle
function vehicleadded(title, icon="success", timer=0){
  
    Swal.fire({
      position: "center",
      title,
      showConfirmButton: false,
      animation: true,
      timer,
      imageUrl: "assets/gadi22.png",
      imageWidth: 400, 
      imageHeight: 200, 
      background: 'linear-gradient(to bottom, #6DEFB2 80%, #D0D5FD 20%)',
    });
  }

  
  //For deleting vehicles
  function vehicledeleted(title, icon="success", timer=0){
    
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
  

    // If no vehicle found
    function vehiclenotfound(title, icon="error", timer=0){

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
    
      // To prompt user to choose all preferences
      function enteralldata(title, icon="error", timer=0){
        
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
      
  // confirmation button to delete vehicle
  function confirmation(callback){
    Swal.fire({
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

  if (typeof test === 'function'){
    module.exports = {
        getFleetData
    };
}

async function getEVData() {
  return await callAPI(2022, "Tesla", "Model 3");
}