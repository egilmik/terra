var updateRate = 200;

document.getElementById("clear_save").onclick = function(){
    clearSave();
}

document.getElementById("save_button").onclick = function(){
    saveGame();
}

document.getElementById("load_button").onclick = function(){
    loadGame();
}

function initBuyButtons(){
    producerList.forEach(function(entry){
        document.getElementById("")
        var table = document.getElementById("buy_table");
        var nrRows = 0;
        if( table.rows != null){
          nrRows = table.rows.length;
        }
        var newRow = table.insertRow(nrRows);
        var counterCell = newRow.insertCell(0);

        var counterId = "nr_" + entry.id;
        counterCell.innerHTML = "<small id=" + counterId + "></small>";

        var nameCell = newRow.insertCell(1);
        nameCell.innerHTML = entry.name;

        var buttonCell = newRow.insertCell(2);
        var buttonId = "buy_" + entry.id;
        buttonCell.innerHTML = '<button id=' + buttonId +' type=\"button\" class=\"btn btn-success\">' + entry.name + " for " + name.cost+ '</button>';

        document.getElementById(buttonId).onclick =(function(){
            var producer = entry;
            return function(){
              producer.buy(player);
              updateUI();
            }

        })();
    });
    updateUI();
}

function init(){
  initBuyButtons();
}

function updateUI(){
  //updateLaboratoryUI();
  setElementText("bacterias_per_second", 'Bacteria per second: ' + getBacteriaPerSecond().toFixed(0));
  setElementText("total_bacterias", 'Bacteria: ' + player.bacteria.toFixed(0));

  producerList.forEach(function(entry){
      setElementText("nr_" + entry.id, entry.getNumberOwned());
      setElementText("buy_" + entry.id,'Buy a ' + entry.name + ' for ' + entry.getCost().toFixed(0));
      document.getElementById("buy_" + entry.id).disabled = !entry.canBuy(player.bacteria);
  });
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
    player.nrSwamp = swamp.getNumberOwned();
    localStorage.setItem(saveVariable,JSON.stringify(player));
}

function initPlayer(){
  human.setNumberOwned(player.nrHumans);
  petriDish.setNumberOwned(player.nrPetriDishes);
  swamp.setNumberOwned(player.nrSwamp);
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
        init();
        firstTime = false;
      }
      onestep();
      updateUI();
  }, updateRate);

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
