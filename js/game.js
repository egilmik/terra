var player = {
    bacteria: 0,
    nrPetriDishes: 1,
};

var baseValuePetri = 0.1;
var baseCostPetri = 1;

function getPetriDishCost(){
    return baseCostPetri * Math.pow(player.nrPetriDishes,1.15);
}

function canByPetriDish(nr){
    return player.bacteria < getPetriDishCost();
}

function butPetriDish(nr){
    player.bacteria -= getPetriDishCost();
    player.nrPetriDishes++;
}

function onestep(){
    player.bacteria += player.nrPetriDishes * baseValuePetri;
}
