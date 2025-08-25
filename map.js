document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("getDirectionsBtn");
  if(!btn) return console.error("Get Directions button not found!");

  btn.addEventListener("click", function() {
    const destination = "Gondar Tewodros Square, Gondar, Ethiopia";
    const origin = prompt("Enter your starting location:", "");
    if(origin){
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
      window.open(url, "_blank");
    } else {
      alert("Please enter a starting location.");
    }
  });
});
