var Producer = function(name, multiplier,value,cost){
  this.name = name;
  this.multiplier = multiplier;
  this.value = value;
  this.cost = cost;
  this.nrOwned = 0;
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

petriDish = new Producer("Petri dish",1.3,1,50);
human = new Producer("Human",1.2,10,1000);
var producerList = [petriDish, human];
