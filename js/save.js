var saveVariable = "terra_save";
var countVariable = saveVariable + "_producer_count_";
var upgradeVariable = saveVariable + "_producer_upgrade_list_";
var bacteriaVariable = saveVariable + "_bacteria_count";

function loadGame() {
  player.bacteria = parseInt(localStorage[bacteriaVariable]);
  producerList.forEach(function(entry){
      var count = parseInt(localStorage[countVariable + entry.id]);
      if(isNaN(count)){
        entry.setNumberOwned(0);
      } else {
        entry.setNumberOwned(count);
      }
      var upgradeList = JSON.parse(localStorage[upgradeVariable + entry.id]);
      if(upgradeList != null){
        upgradeList.forEach(function(upgrade){
          entry.initUpgrade(upgrade);
        });
      }
  });
}

function saveGame() {
    localStorage[bacteriaVariable] = player.bacteria;
    producerList.forEach(function(entry){
      localStorage[ countVariable + entry.id] = entry.getNumberOwned();
      var upgradeIds = [];
      entry.boughtUpgrades.forEach(function(upgrade){
        upgradeIds.push(upgrade.id);
      });
      localStorage[upgradeVariable + entry.id] = JSON.stringify(upgradeIds);
    });
}

function initPlayer(){
  player = new EmptyPlayer();
  producerList.forEach(function(entry){
    entry.setNumberOwned(0);
    entry.boughtUpgrades = [];
  });

}

function clearSave(){
  initPlayer();
  saveGame();
}
