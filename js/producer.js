var Producer = function(id,name, multiplier,value,cost){
  this.id = id;
  this.name = name;
  this.multiplier = multiplier;
  this.value = value;
  this.cost = cost;
  this.nrOwned = 0;
  this.availableUpgrades = [];
  this.boughtUpgrades = [];
};

Producer.prototype.getCost = function() {
  return this.cost * Math.pow(this.multiplier,this.nrOwned);
};

Producer.prototype.canBuy = function(currentBacteria) {
    return currentBacteria >= this.getCost();
};

Producer.prototype.buy = function(player){
    player.bacteria -= this.getCost();
    this.nrOwned++;
}

Producer.prototype.getNumberOwned = function(){
    return this.nrOwned;
}

Producer.prototype.setNumberOwned = function(nr){
    this.nrOwned = nr;
}

Producer.prototype.buyUpgrade = function(upgrade,player){
    player.bacteria -= upgrade.getCost();
    this.boughtUpgrades.push(upgrade);
}

Producer.prototype.getUpgrade = function(id){
  for(var i = 0; i < this.availableUpgrades.length; i++){
      if( this.availableUpgrades[i].id == id){
          return this.availableUpgrades[i];
      }
  }
  return null;
}

Producer.prototype.initUpgrade = function(id){
    var upgrade = this.getUpgrade(id);
    if(upgrade != null){
        this.boughtUpgrades.push(upgrade);
    } else {
      console.log("Could not init upgrade " + id);
    }
}

Producer.prototype.getMultiplier = function(){
    var multiplier = 1;
    for(var i = 0; i < this.boughtUpgrades.length; i++){
      multiplier += this.boughtUpgrades[i].multiplier;
    }
    return multiplier;
}

Producer.prototype.hasUpgrade = function(upgrade){
    return this.boughtUpgrades.indexOf(upgrade) > -1;
}

Producer.prototype.getBacteriaPerSecond = function(){
    return this.value * this.getMultiplier()* this.getNumberOwned();
}

petriDish = new Producer("petriDish","Petri dish",1.2,1,25);
human = new Producer("human","Human",1.2,5,500);
swamp = new Producer("swamp", "Swamp", 1.2,100,50000);
var producerList = [petriDish, human, swamp];

upgradePetriLvl1 = new Upgrade("petriDishLvl1",1,500, "Bigger Petri dist");
upgradePetriLvl2 = new Upgrade("petriDishLvl2",1,2500, "Even Bigger Petri dist");
upgradePetriLvl3 = new Upgrade("petriDishLvl3",2,50000, "Really big Petri dist");
petriDish.availableUpgrades.push(upgradePetriLvl1);
petriDish.availableUpgrades.push(upgradePetriLvl2);
petriDish.availableUpgrades.push(upgradePetriLvl3);

upgradeHumanLvl1 = new Upgrade("humanLvl1",1,12000, "Humans shower less");
upgradeHumanLvl2 = new Upgrade("humanLvl2",1,100000, "Humans shower once a life");
upgradeHumanLvl3 = new Upgrade("humanLvl3",2,500000, "Showers are forbidden");
human.availableUpgrades.push(upgradeHumanLvl1);
human.availableUpgrades.push(upgradeHumanLvl2);
human.availableUpgrades.push(upgradeHumanLvl3);

upgradeSwampLvl1 = new Upgrade("swampLvl1",1,1200000, "Swamp thing");
upgradeSwampLvl2 = new Upgrade("swampLvl2",1,10000000, "Even swampier");
upgradeSwampLvl3 = new Upgrade("swampLvl3",2,50000000, "Swamps everywhere");
swamp.availableUpgrades.push(upgradeSwampLvl1);
swamp.availableUpgrades.push(upgradeSwampLvl2);
swamp.availableUpgrades.push(upgradeSwampLvl3);
