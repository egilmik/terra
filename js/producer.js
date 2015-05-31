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
human = new Producer("human","Human",1.2,5,1000);
swamp = new Producer("swamp", "Swamp", 1.2,100,100000);
var producerList = [petriDish, human, swamp];

upgradePetriLvl1 = new Upgrade("petriDishLvl1",1,2500, "Bigger Petri dist");
upgradePetriLvl2 = new Upgrade("petriDishLvl2",2,50000, "Even bigger Petri dist");
petriDish.availableUpgrades.push(upgradePetriLvl1);
petriDish.availableUpgrades.push(upgradePetriLvl2);

upgradeHumanLvl1 = new Upgrade("humanLvl1",1,250000, "Humans shower less");
human.availableUpgrades.push(upgradeHumanLvl1);
