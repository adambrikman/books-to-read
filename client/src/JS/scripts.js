// JS for Materialize CSS
document.addEventListener("DOMContentLoaded", function() {
  var elem = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elem, {
    inDuration: 350,
    outDuration: 350,
    edge: "right"
  });
});
