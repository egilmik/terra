var Upgrade = function(id,multiplier,cost, text){
    this.id = id;
    this.cost = cost;
    this.multiplier = multiplier;
    this.text = text;
};

Upgrade.prototype.getCost = function(){
    return this.cost;
}
