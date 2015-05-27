document.getElementById("buy_petri_dish").onclick =    function() {
    butPetriDish();
    updateUI();
};

document.getElementById("buy_human").onclick = function(){
    buyHuman();
    updateUI();
}

document.getElementById("clear_save").onclick = function(){
    clearSave();
}

function updateUI(){
  updateButtonUI();
  updateLaboratoryUI();

  setElementText("bacterias_per_second", 'Bacteria per second: ' + getBacteriaPerSecond().toFixed(1));
  setElementText("buy_petri_dish",'Buy a petri dish for ' + getPetriDishCost().toFixed(1));
  setElementText("total_bacterias", 'Bacteria: ' + player.bacteria.toFixed(1));
  setElementText("nr_pertri_dishes", player.nrPetriDishes);
  setElementText("nr_humans",player.nrHumans);
  setElementText("buy_human",'Buy a human for ' + getHumanCost().toFixed(1));
}

function updateButtonUI(){
    document.getElementById("buy_petri_dish").disabled = canBuyPetriDish();
    document.getElementById("buy_human").disabled = canBuyHuman();
}

function updateLaboratoryUI(){
    var table = document.getElementById("laboratory-table").getElementsByTagName("tbody")[0];
    var nrRows = table.rows.length;
    if(nrRows < getNumberOfUpgrades()){
        console.log("init laboratory UI");
        initLaboratoryUI(table);
    }
    for(var key in upgradeMap){
      var upgrade = upgradeMap[key];
      document.getElementById("buy_"+ upgrade.id).disabled = canBuyUpgrade(upgrade.id) || !ownsUpgrade(upgrade.id);
    }

}

function initLaboratoryUI(table){
  var counter = 0;
  for(var key in upgradeMap){
    var upgrade = upgradeMap[key];
    var newRow = table.insertRow(counter);
    var newCell = newRow.insertCell(0);
    newCell.innerHTML = '<button id=\"buy_' + upgrade.id + '\" type=\"button\" class=\"btn btn-success\">' + upgrade.text + " for " + upgrade.cost+ '</button>';
    counter++;
  }
}

function setElementText(element, text){
    document.getElementById(element).innerHTML = text;
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
  player = new EmptyPlayer();
  localStorage['terra_save'] = btoa(JSON.stringify(player));
}

var firstTime = true;

function start(){
  setInterval(function () {
      if(firstTime){
        loadGame();
        firstTime = false;
      }
      onestep();
      updateUI();
  }, 1000);

  setInterval(function () {
      saveGame();
  }, 10000);
}

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


loadScript("js/game.js");
loadScript("js/upgrades.js",start())
