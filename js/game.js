var EmptyPlayer =  function(){
    this.bacteria = 50;
    this.nrPetriDishes = 0;
    this.nrHumans = 0;
    this.upgrades = [];
}

var player = new EmptyPlayer();

function butPetriDish(nr){
    player.bacteria -= petriDish.getCost(player.nrPetriDishes);
    player.nrPetriDishes++;
}

function buyHuman(nr){
    player.bacteria -= human.getCost(player.nrHumans);
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
