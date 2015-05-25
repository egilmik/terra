var player = {
    bacteria: 0,
    nrPetriDishes: 1,
};

var baseValuePetri = 0.1;
var baseCostPetri = 1;

function getPetriDishCost(){
  return baseCostPetri * Math.pow(player.nrPetriDishes,1.15);
}
document.getElementById("buy_petri_dish").onclick =    function() {
    if (player.bacteria < getPetriDishCost()) {
        return alert('need more bacteria.');
    }
    player.bacteria -= getPetriDishCost();
    player.nrPetriDishes++;
    updateBacteriaUI();
};

document.getElementById("clear_save").onclick = function(){
    clearSave();
}

function updateBacteriaUI(){
  var e = document.getElementById("clicks_per_second");
  e.innerHTML = 'Bacteria per second: ' + player.nrPetriDishes.toFixed(2);
  var e2 = document.getElementById("buy_petri_dish");
  e2.innerHTML = 'Buy a petri dish for ' + getPetriDishCost().toFixed(2);
  var e = document.getElementById("total_clicks");
  e.innerHTML = 'Bacteria: ' + player.bacteria.toFixed(2);

  document.getElementById("nr_pertri_dishes").innerHTML = player.nrPetriDishes;

}
function loadGame() {
  if (!localStorage['terra_save']) return;
    var save_data = JSON.parse(atob(localStorage['terra_save']));
    player = save_data;
}

function saveGame() {
    localStorage['terra_save'] = btoa(JSON.stringify(player));
}

function clearSave(){
  localStorage.clear();
}

setInterval(function () { saveGame(); }, 10000);

var firstTime = true;
setInterval(function () {
    if(firstTime){
      loadGame();
      firstTime = false;
    }
    player.bacteria += player.nrPetriDishes * baseValuePetri;
    updateBacteriaUI();
}, 1000);

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
