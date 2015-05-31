var EmptyPlayer =  function(){
    this.bacteria = 50;
}

var player = new EmptyPlayer();

function onestep(){
    player.bacteria += getBacteriaPerSecond()/(1000/updateRate);
}

function getBacteriaPerSecond(){
    var globalMultiplier = 1;
    return (petriDish.getBacteriaPerSecond() + human.getBacteriaPerSecond() ) * globalMultiplier;
}
