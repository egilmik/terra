var EmptyPlayer =  function(){
    this.bacteria = 0;
    this.nrPetriDishes = 1;
    this.nrHumans = 0;
    this.upgrades = ["a","b"];
}

var player = new EmptyPlayer();

var baseValuePetri = 0.1;
var baseCostPetri = 1;

var baseValueHuman = 1;
var baseCostHuman = 100;

function getPetriDishCost(){
    return baseCostPetri * Math.pow(player.nrPetriDishes,1.15);
}

function getHumanCost(){
    return baseCostHuman * Math.pow(player.nrHumans+1,1.20);
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
    return (player.nrPetriDishes * baseValuePetri) + (player.nrHumans * baseValueHuman);
}
