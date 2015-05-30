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

Producer.prototype.buyUpgrade = function(id,player){
    var upgrade = this.getUpgrade(id);
    player.bacteria -= upgrade.getCost();
    boughtUpgrades.push(upgrade);
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
      multiplier += this.boughtUpgrades[i].multiplier -1;
    }
    return multiplier;
}

Producer.prototype.getBacteriaPerSecond = function(){
    return this.value * this.getMultiplier()* this.getNumberOwned();
}

petriDish = new Producer("petriDish","Petri dish",1.3,1,50);
human = new Producer("human","Human",1.2,10,1000);
swamp = new Producer("swamp", "Swamp", 1.2,100,10000);
var producerList = [petriDish, human, swamp];
