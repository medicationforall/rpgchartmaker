function HasRollSeed(){
  //resolve rolls based on seed.

  /**
   *
   */
  this.roll=function(){
    this.rollTable = this.node.find('table');
    this.resetRng();
    this.clearTitle();
    this.resetState();
    this.createTableHeader();
    this.createTableRows();
    this.clearRollArrayLookup();

    $(this.rollTable).trigger("updateAll");
  };


  /**
   *
   */
  this.resetRng=function(){
    this.rng.clearSeed();
  };


  /**
   *
   */
  this.resolveRoll=function(arr,name){
    var roll;

    if(this.seed && this.seed !== ''){
      roll = this.rng.getRandom(this.seed+"-"+name, 0, arr.length -1);
    } else{
      roll = Math.floor(Math.random() * arr.length);
    }
    
    return roll;
  };
}
