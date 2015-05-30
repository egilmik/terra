var Upgrade = function(id,multiplier,cost, text){
    this.id = id;
    this.cost = cost;
    this.multiplier = multiplier;
    this.text = text;
};

Upgrade.prototype.getCost = function(){
    return this.cost;
}

var upgradeHotter = new Upgrade("hotterlvl1", 1.1, 10000, "Increase the temperature with one degree");
var upgradeMap = {};

upgradeMap[upgradeHotter.id] = upgradeHotter;


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

function buyUpgrade(id){
    var upgrade = getUpgrade(id);
    if(upgrade != null){
        player.bacteria -= upgrade.cost;
        player.upgrades.push(id);
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
