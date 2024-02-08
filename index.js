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