const getStartedButton = document.querySelector(".get-started-btn");
getStartedButton.addEventListener("click", () => {
    localStorage.setItem("page", "main");
    window.location.href = "/loading.html";
})