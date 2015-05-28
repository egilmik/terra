var EmptyPlayer =  function(){
    this.bacteria = 50;
    this.nrPetriDishes = 0;
    this.nrHumans = 0;
    this.upgrades = [];
}

var player = new EmptyPlayer();

var Producer = function(name, multiplier,value,cost){
  this.name = name;
  this.multiplier = multiplier;
  this.value = value;
  this.cost = cost;
};

Producer.prototype.getCost = function(nr) {
  return this.cost * Math.pow(1.3,nr);
};

petriDish = new Producer("Petri dish",1.3,1,50);
human = new Producer("Human",1.2,10,1000);

var producerList = [petriDish, human];

function getPetriDishCost(){
    return petriDish.getCost(player.nrPetriDishes);
}

function getHumanCost(){
    return human.getCost(player.nrHumans);
}

function canBuyHuman(){
    return player.bacteria < getHumanCost();
}

function canBuyPetriDish(nr){
    return player.bacteria < getPetriDishCost();
}

function butPetriDish(nr){
    player.bacteria -= getPetriDishCost();
    player.nrPetriDishes++;
}

function buyHuman(nr){
    player.bacteria -= getHumanCost();
    player.nrHumans++;
}

function onestep(){
    player.bacteria += getBacteriaPerSecond();
}

function getBacteriaPerSecond(){
    var globalMultiplier = getMultiplierForId("global");
    var petriBacteria = (player.nrPetriDishes * (petriDish.value * getMultiplierForId("petriDish")));
    var humanBacteria = (player.nrHumans * (human.value*getMultiplierForId("human")));

    return (petriBacteria + humanBacteria ) * globalMultiplier;
}

function getMultiplierForId(id){
    var multiplier = 1;
    for(var i = 0; i < player.upgrades.length; i++){
        var playerUpgradeId = player.upgrades[i];
        var upgrade = getUpgrade(playerUpgradeId);
        if(upgrade != null){
          if(upgrade.parent == id){
            multiplier += (upgrade.multiplier - 1);
          }
        }
    }
    return multiplier;
}

function ownsUpgrade(id){
    return player.upgrades.indexOf(id) > -1;
}
