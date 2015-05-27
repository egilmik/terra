var Upgrade = function(parent, id,multiplier,cost, text){
    this.parent = parent;
    this.id = id;
    this.cost = cost;
    this.multiplier = multiplier;
    this.text = text;
}


var upgradeBiggerPetriDish = new Upgrade("petriDish","biggerDish",1.1,100, "Bigger petri dishes");
var upgraderWaterShortage = new Upgrade("global", "noWater", 1.1, 10000, "Create a water shortage");
var upgradeMap = {};

upgradeMap[upgraderWaterShortage.id] = upgraderWaterShortage;
upgradeMap[upgradeBiggerPetriDish.id] = upgradeBiggerPetriDish;

function canBuyUpgrade(id){
  var upgrade = upgradeMap[id];
  if(upgrade == null){
      console.log("canBuyUpgrade() upgrade id: " + id + " does not exist");
      return false;
  }
    return upgrade.cost > player.bacteria;
}

function getNumberOfUpgrades(){
  var count = 0;
  for (x in upgradeMap){
    count++;
  }
  return count;
}

function ownsUpgrade(id){
    return player.upgrades.indexOf(id) > -1;
}

function buyUpgrade(id){
    var upgrade = getUpgrade(id);
    if(upgrade != null){
        player.bacteria -= upgrade.cost;
        return true;
    } else {
      console.log("Could not find id : " + id + " in buyUpgrade");
      return false;
    }
}

function getUpgrade(id){
  var upgrade = upgradeMap[id];
  if(upgrade == null){
      console.log("canBuyUpgrade() upgrade id: " + id + " does not exist");
      return null;
  }
  return upgrade;
}
