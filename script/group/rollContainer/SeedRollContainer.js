function SeedRollContainer(animate){
  Base.call(this, animate);
  HasRoll.call(this);
  HasRollSeed.call(this);

  this.seed='';
  this.handleKeyName='seed';


  /**
   * constructor
   */
  this._constructor = function(){
    if(animate!==undefined){
      this.animate=animate;
    }
    this._resolveTemplate(SeedRollContainer,'SeedRollContainer');
  };


  /**
   *
   */
  this._setup=function(template){
    this._createNode(template);
    this._createRng();
    this._setupHandleColor();

    HasSeed.call(this);
    HasCSVSave.call(this);

    $(this).trigger('loaded');
  };


  /**
   *
   */
  this._createRng=function(){
    this.rng = new Rng();
  };


  //main
  this._constructor();
}

Object.setPrototypeOf(SeedRollContainer.prototype, Base.prototype);
