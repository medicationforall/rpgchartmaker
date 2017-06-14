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
    var roll = this.rng.getRandom(this.seed+"-"+name, 0, arr.length -1);
    return roll;
  };
}
