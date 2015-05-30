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

petriDish = new Producer("petriDish","Petri dish",1.3,1,50);
human = new Producer("human","Human",1.2,10,1000);
swamp = new Producer("swamp", "Swamp", 1.2,100,10000);
var producerList = [petriDish, human, swamp];

upgradePetriLvl1 = new Upgrade("petriDishLvl1",0.15,1000, "Bigger Petri dist");
upgradePetriLvl2 = new Upgrade("petriDishLvl2",0.15,10000, "Even bigger Petri dist");
petriDish.availableUpgrades.push(upgradePetriLvl1);
petriDish.availableUpgrades.push(upgradePetriLvl2);
