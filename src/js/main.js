var player = {
    bacteria: 0,
    nrPetriDishes: 1,
};

/*document.getElementById("click").onclick = function() {
    clicks++;
    update_total_clicks(); //updates the text
};*/

function getPetriDishCost(){
  return Math.pow(2, player.nrPetriDishes);
}
document.getElementById("buy_petri_dish").onclick =    function() {
    if (player.bacteria < getPetriDishCost()) {
        return alert('need more bacteria.');
    }
    player.bacteria -= getPetriDishCost();
    player.nrPetriDishes++;
    updateBacteriaUI();
};

function updateBacteriaUI(){
  var e = document.getElementById("clicks_per_second");
  e.innerHTML = 'Bacteria per second: ' + player.nrPetriDishes;
  var e2 = document.getElementById("buy_petri_dish");
  e2.innerHTML = 'Buy a petri dish for ' + getPetriDishCost();
  var e = document.getElementById("total_clicks");
  e.innerHTML = 'Bacteria: ' + player.bacteria;

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

setInterval(function () { saveGame(); }, 10000);

var firstTime = true;
setInterval(function () {
    if(firstTime){
      loadGame();
      firstTime = false;
    }
    player.bacteria += player.nrPetriDishes;
    updateBacteriaUI();
}, 1000);
