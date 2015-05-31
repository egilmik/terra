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

function initLaboratoryUI(){
    producerList.forEach(function(entry){
      entry.availableUpgrades.forEach(function(upgrade){
        document.getElementById("")
        var table = document.getElementById("laboratory-table");
        var nrRows = 0;
        if( table.rows != null){
          nrRows = table.rows.length;
        }
        var newRow = table.insertRow(nrRows);
        var buttonCell = newRow.insertCell(0);
        var buttonId = "buy_" + upgrade.id;
        var upgradeText = entry.name + ":" + upgrade.text + " for " + upgrade.cost + " increase growth with " + (upgrade.multiplier *100).toFixed(0) + "%";
        if(entry.hasUpgrade(upgrade)){
            upgradeText = "(Bought) " + upgradeText;
        }
        buttonCell.innerHTML = '<button id=' + buttonId +' type=\"button\" class=\"btn btn-success\">' + upgradeText + '</button>';

        document.getElementById(buttonId).onclick =(function(){
            var producer = entry;
            var currentUpgrade = upgrade;
            return function(){
              producer.buyUpgrade(currentUpgrade,player);
              this.text = "(Bought) " + this.text;
              this.disabled = true;
              updateUI();
            }

        })();
      });
    });
    updateUI();
}

function initGrowTab(){
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

        var perSecondCell = newRow.insertCell(2);
        var perSecondId = "per_second_" + entry.id;
        perSecondCell.innerHTML = "<small id=" + perSecondId + "></small>";

        var buttonCell = newRow.insertCell(3);
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
  initGrowTab();
  initLaboratoryUI();
}

function updateUI(){
  updateLaboratoryUI();

  setElementText("bacterias_per_second", 'Bacteria per second: ' + formatNumber(getBacteriaPerSecond().toFixed(0)));
  setElementText("total_bacterias", 'Bacteria: ' + player.bacteria.toFixed(0));

  producerList.forEach(function(entry){
      setElementText("nr_" + entry.id, entry.getNumberOwned());
      setElementText("per_second_" + entry.id, "+" + entry.getBacteriaPerSecond());
      setElementText("buy_" + entry.id,'Buy a ' + entry.name + ' for ' + entry.getCost().toFixed(0));
      document.getElementById("buy_" + entry.id).disabled = !entry.canBuy(player.bacteria);
  });
}

function updateLaboratoryUI(){
    var table = document.getElementById("laboratory-table");
    producerList.forEach(function(entry){
      entry.availableUpgrades.forEach(function(upgrade){
        if(!entry.hasUpgrade(upgrade)){
          if(document.getElementById("buy_" + upgrade.id) != null){
            document.getElementById("buy_" + upgrade.id).disabled = upgrade.getCost() > player.bacteria;
          }
        }
      });
    });
}

function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function setElementText(element, text){
    document.getElementById(element).innerHTML = text;
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
loadScript("js/save.js")
loadScript("js/producer.js",start())
