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
    this.rollTable = this.node.find('table');
    $(this.rollTable).tablesorter();
    this._createRng();
    this._setupHandleColor();

    HasSeed.call(this);
    HasCSVSave.call(this);
    HasRollMenu.call(this);

    $(this).trigger('loaded');
  };


  /**
   *
   */
  this._createRng=function(){
    this.rng = new Rng();
  };


  /**
   *
   */
  this.fillOut=function(data){
    if(data.seed){
      this.seed = data.seed;
      this.node.find('input[name="seed"]').val(this.seed).trigger('input');
    }

    this.alias = data.alias;
    this.display = data.display;
  };


  //main
  this._constructor();
}

Object.setPrototypeOf(SeedRollContainer.prototype, Base.prototype);
