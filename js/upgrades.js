var Upgrade = function(parent, id,multiplier,cost, text){
    this.parent = parent;
    this.id = id;
    this.multiplier = multiplier;
    this.text = text;
}


var upgradeBiggerPetriDish = new Upgrade("petriDish","biggerDish",1.1,100, "Bigger petri dishes");
var upgraderWaterShortage = new Upgrade("global", "noWater", 1.1, 10000, "Create a water shortage");
var upgradeList = [upgraderWaterShortage, upgradeBiggerPetriDish];

function canBuyUpgrade(id){
    var arrayLength = upgradeList.length;
        for (var i = 0; i < arrayLength; i++) {
            if(id == upgradeList[i].id){
                return true;
            }

        }
    return false;
}

function buyUpgrade(id){
    var upgrade = getUpgrade(id);
    if(upgrade != NULL){
        player.bacteria -= upgrade.cost;
        return true;
    } else {
      console.log("Could not find id : " + id + " in buyUpgrade");
      return false;
    }
}

function getUpgrade(id){
  var arrayLength = upgradeList.length;
      for (var i = 0; i < arrayLength; i++) {
          if(id == upgradeList[i].id){
              return upgrade[i];
          }

      }
  return NULL;
}
