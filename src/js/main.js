var clicks = 0; //increment this by one every click
var nrPetriDishes = 1; //automatically click once per second
var cost = 1; //the cost of this should increase exponentially

/*document.getElementById("click").onclick = function() {
    clicks++;
    update_total_clicks(); //updates the text
};*/
document.getElementById("buy_click").onclick =    function() {
    if (clicks < cost) {
        return alert('need more bacteria.');
    }
    nrPetriDishes++;
    clicks -= cost;
    cost = Math.pow(2, nrPetriDishes);
    updateBacteriaUI();
};

function updateBacteriaUI(){
  var e = document.getElementById("clicks_per_second");
  e.innerHTML = 'Bacteria per second: ' + nrPetriDishes;
  var e2 = document.getElementById("buy_click");
  e2.innerHTML = 'Buy a petri dish for ' + cost;
  var e = document.getElementById("total_clicks");
  e.innerHTML = 'Bacteria: ' + clicks;

}

setInterval(function () {
    clicks += nrPetriDishes;
    updateBacteriaUI();
}, 1000);
