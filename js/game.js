var EmptyPlayer =  function(){
    this.bacteria = 50;
}

var player = new EmptyPlayer();

function onestep(){
    player.bacteria += getBacteriaPerSecond()/(200/updateRate);
}

function getBacteriaPerSecond(){
    var globalMultiplier = 1;
    var bacteria = 0;
    producerList.forEach(function(entry){
        bacteria += entry.getBacteriaPerSecond();
    });

    return bacteria * globalMultiplier;
}
