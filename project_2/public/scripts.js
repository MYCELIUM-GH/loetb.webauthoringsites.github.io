// ==== NAVBAR
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});
// ==== LOADER
var timer;
function loader() {
	timer = setTimeout(showPage, 3000);
};
function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("page-full").style.display = "block";
};