// when get started is clicked, show the loader and then the main page
const getStartedButton = document.querySelector(".get-started-btn");
const loaderContainer = document.querySelector("#loader");
const overlay = document.querySelector(".overlay");
// add event listener for click on button
getStartedButton.addEventListener("click", () => {
    // show the k=loader for 5 secs and then redirect to main.html
    loaderContainer.style.display = "block";
    overlay.style.display = "block";
    setTimeout(() => {
        window.location.href = "main.html";
    }, 5000);
});
