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
  // let imageUrl = customImage;
  // let imageClass = 'left-aligned-image'; // Assign 'left-aligned-image' by default
  
    Swal.fire({
      position: "center",
      icon,
      title,
      // padding: 100,
      showConfirmButton: false,
      animation: true,
      timer,
      imageUrl: "assets/gadi22.png",
      imageWidth: 400, // Set the width of the custom image
      imageHeight: 200, // Set the height of the custom image
      // imageClass,
      background: 'linear-gradient(to right, #6DEFB2 40%, #D0D5FD 20%)',
      // imageClass // Apply the custom class to the image
    });
  }

  
  //For deleting vehicles

  function vehicledeleted(title, icon="success", timer=0){
    // let imageUrl = customImage;
    // let imageClass = 'left-aligned-image'; // Assign 'left-aligned-image' by default
    
      Swal.fire({
        position: "center",
        icon,
        title,
        // padding: 100,
        showConfirmButton: false,
        animation: true,
        timer,
        imageUrl: "assets/gadi22.png",
        imageWidth: 400, // Set the width of the custom image
        imageHeight: 200, // Set the height of the custom image
        // imageClass,
        background: 'linear-gradient(to right, #FFAAAA 40%, #D0D5FD 20%)',
        // imageClass // Apply the custom class to the image
      });
    }
  

    // If no vehicle found
    function vehiclenotfound(title, icon="error", timer=0){
      // let imageUrl = customImage;
      // let imageClass = 'left-aligned-image'; // Assign 'left-aligned-image' by default
      
        Swal.fire({
          position: "center",
          icon,
          title,
          // padding: 100,
          // showConfirmButton: false,
          animation: true,
          timer,
          imageUrl: "assets/trunk.png",
          imageWidth: 400, // Set the width of the custom image
          imageHeight: 200, // Set the height of the custom image
          // imageClass,
          background: '#D0D5FD',
          // imageClass // Apply the custom class to the image
        });
      }
    
      // To prompt user to choose all preferences
      function enteralldata(title, icon="error", timer=0){
        // let imageUrl = customImage;
        // let imageClass = 'left-aligned-image'; // Assign 'left-aligned-image' by default
        
          Swal.fire({
            position: "center",
            // icon,
            title,
            // padding: 100,
            // showConfirmButton: false,
            animation: true,
            timer,
            imageUrl: "assets/cars-all.png",
            imageWidth: 400, // Set the width of the custom image
            imageHeight: 200, // Set the height of the custom image
            // imageClass,
            background: '#D0D5FD',
            // imageStyle: 'border-radius: 10px'
            // imageClass // Apply the custom class to the image
          });
        }
      
  // confirmation button to delete vehicle
  function confirmation(callback){
    Swal.fire({
      // title: "Are you sure?",
      // text: "You won't be able to revert htis!",
      // icon: "warning",
      imageUrl: "assets/eko03.webp",
      showCancelButton: true,
      cancelButtontext: "No",
      confirmButtonColor: "#26b170", // "#3085d6",
      cancelButtonColor: "#0c1c81",//"#d33",
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