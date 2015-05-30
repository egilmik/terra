document.getElementById("buy_petri_dish").onclick =    function() {
    petriDish.buy(player);
    updateUI();
};

document.getElementById("buy_human").onclick = function(){
    human.buy(player);
    updateUI();
}

document.getElementById("clear_save").onclick = function(){
    clearSave();
}

document.getElementById("save_button").onclick = function(){
    saveGame();
}

document.getElementById("load_button").onclick = function(){
    loadGame();
}

function updateUI(){
  updateButtonUI();
  //updateLaboratoryUI();

  setElementText("bacterias_per_second", 'Bacteria per second: ' + getBacteriaPerSecond().toFixed(0));
  setElementText("total_bacterias", 'Bacteria: ' + player.bacteria.toFixed(0));
  setElementText("nr_pertri_dishes", petriDish.getNumberOwned());
  setElementText("nr_humans",human.getNumberOwned());
}

function updateButtonUI(){
    setElementText("buy_petri_dish",'Buy a petri dish for ' + petriDish.getCost().toFixed(0));
    document.getElementById("buy_petri_dish").disabled = !petriDish.canBuy(player.bacteria);
    setElementText("buy_human",'Buy a human for ' + human.getCost().toFixed(0));
    document.getElementById("buy_human").disabled = !human.canBuy(player.bacteria);
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
      if(!ownsUpgrade(upgrade.id)){
        document.getElementById(upgrade.id).disabled = canBuyUpgrade(upgrade.id);
      }
    }

}

function initLaboratoryUI(table){
  var counter = 0;
  for(var key in upgradeMap){
    var upgrade = upgradeMap[key];
    var newRow = table.insertRow(counter);
    var newCell = newRow.insertCell(0);
    newCell.innerHTML = '<button id=' + upgrade.id +' type=\"button\" class=\"btn btn-success\">' + upgrade.text + " for " + upgrade.cost+ '</button>';
    document.getElementById(upgrade.id).onclick = function(){
        buyUpgrade(this.id);
        document.getElementById(this.id).disabled = true;
    }

    if(ownsUpgrade(upgrade.id)){
      document.getElementById(upgrade.id).disabled = true;
    }

    counter++;
  }
}

function setElementText(element, text){
    document.getElementById(element).innerHTML = text;
}

var saveVariable = "terra_save";
function loadGame() {
  if (!localStorage.getItem(saveVariable)) return;
    var save_data = JSON.parse(localStorage.getItem(saveVariable));
    player = save_data;
    initPlayer();
}

function saveGame() {
    player.nrPetriDishes = petriDish.getNumberOwned();
    player.nrHumans = human.getNumberOwned();
    localStorage.setItem(saveVariable,JSON.stringify(player));
}

function initPlayer(){
  human.setNumberOwned(player.nrHumans);
  petriDish.setNumberOwned(player.nrPetriDishes);
}

function clearSave(){
  player = new EmptyPlayer();
  initPlayer();
  saveGame();
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
loadScript("js/upgrades.js")
loadScript("js/producer.js",start())
