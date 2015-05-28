var EmptyPlayer =  function(){
    this.bacteria = 50;
    this.nrPetriDishes = 0;
    this.nrHumans = 0;
    this.upgrades = [];
}

var player = new EmptyPlayer();

var baseValuePetri = 1;
var baseCostPetri = 10;

var baseValueHuman = 10;
var baseCostHuman = 1000;

function getPetriDishCost(){
    return baseCostPetri * Math.pow(1.3,player.nrPetriDishes);
}

function getHumanCost(){
    return baseCostHuman * Math.pow(1.20,player.nrHumans);
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
    var multiplier = 1;
    for(var i = 0; i < player.upgrades.length; i++){
        var id = player.upgrades[i];
        var upgrade = getUpgrade(id);
        if(upgrade != null){
          multiplier += (upgrade.multiplier - 1);
        }
    }

    return ((player.nrPetriDishes * baseValuePetri) + (player.nrHumans * baseValueHuman)) * multiplier;
}

function ownsUpgrade(id){
    return player.upgrades.indexOf(id) > -1;
}
