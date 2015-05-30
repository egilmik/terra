var Producer = function(name, multiplier,value,cost){
  this.name = name;
  this.multiplier = multiplier;
  this.value = value;
  this.cost = cost;
};

Producer.prototype.getCost = function(nr) {
  return this.cost * Math.pow(this.multiplier,nr);
};

Producer.prototype.canBuy = function(currentBacteria, nr) {
    return currentBacteria > this.getCost(nr);
}

petriDish = new Producer("Petri dish",1.3,1,50);
human = new Producer("Human",1.2,10,1000);
var producerList = [petriDish, human];
