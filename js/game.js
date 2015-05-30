var EmptyPlayer =  function(){
    this.bacteria = 50;
    this.nrPetriDishes = 0;
    this.nrHumans = 0;
    this.nrSwamp = 0;
    this.upgrades = [];
}

var player = new EmptyPlayer();

function onestep(){
    player.bacteria += getBacteriaPerSecond()/(1000/updateRate);
}

function getBacteriaPerSecond(){
    var globalMultiplier = getMultiplierForId("global");

    return (petriDish.getBacteriaPerSecond() + human.getBacteriaPerSecond() ) * globalMultiplier;
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
