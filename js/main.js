document.getElementById("buy_petri_dish").onclick =    function() {
    if (canByPetriDish()) {
        return alert('need more bacteria.');
    }
    butPetriDish();
    updateBacteriaUI();
};

document.getElementById("clear_save").onclick = function(){
    clearSave();
}

function updateBacteriaUI(){
  setElementText("bacterias_per_second", 'Bacteria per second: ' + getBacteriaPerSecond().toFixed(1));
  setElementText("buy_petri_dish",'Buy a petri dish for ' + getPetriDishCost().toFixed(1));
  setElementText("total_bacterias", 'Bacteria: ' + player.bacteria.toFixed(1));
  setElementText("nr_pertri_dishes", player.nrPetriDishes);
}

function setElementText(element, text){
    document.getElementById(element).innerHTML = text;
}
function loadGame() {
  if (!localStorage['terra_save']) return;
    var save_data = JSON.parse(atob(localStorage['terra_save']));
    player = save_data;
}

function saveGame() {
    localStorage['terra_save'] = btoa(JSON.stringify(player));
}

function clearSave(){
  localStorage.clear();
}

var firstTime = true;

function start(){
  setInterval(function () {
      if(firstTime){
        loadGame();
        firstTime = false;
      }
      onestep();
      updateBacteriaUI();
  }, 1000);

  setInterval(function () {
      saveGame();
  }, 10000);
}

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

loadScript("js/game.js", start());
