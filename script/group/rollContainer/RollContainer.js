/**
 *   RPG Chart Maker source file ObjectGroup,
 *   Copyright (C) 2017  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Displays roll results.
 * @class
 */
function RollContainer(animate){
  Base.call(this, animate);
  HasRoll.call(this);
  HasRollSeed.call(this);

  this.seed='';
  this.handleKeyName='seed';


  /**
   * Constructor.
   */
  this._constructor = function(){
    if(animate!==undefined){
      this.animate=animate;
    }
    this._resolveTemplate(RollContainer,'RollContainer');
  };


  /**
   * Sets up the rollContainer.
   * @param {string} template
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
    this._setupCSSOverride();

    $(this).trigger('loaded');
  };


  /**
   * Creates Random Number Generator associated with this Roll Container.
   */
  this._createRng=function(){
    this.rng = new Rng();
  };


  /**
   * Called when loading a user saved chart.
   * @param {Object} data
   */
  this.fillOut=function(data){
    //seed
    if(data.seed){
      this.seed = data.seed;
      this.node.find('input[name="seed"]').val(this.seed).trigger('input',{"triggerRoll":false});
    }

    //alias
    if(data.alias){
      this.alias = data.alias;
    }

    //display
    if(data.display){
      this.display = data.display;
    }

    //rollCountOverride
    if(data.rollCountOverride){
      this.rollCountOverride = data.rollCountOverride;
      this.node.find('input[name="rollCountOverride"]').val(this.rollCountOverride).trigger('input',{"triggerRoll":false});
    }
  };


  /**
   * Collect the configuration data for the RollContainer.
   */
  this.gatherData=function(){
    var obj = {};
    //var coreNode = $(item).data("coreNode");
    obj.type = "RollContainer";

    //resolve alias
    if($.isEmptyObject(this.alias)===false){
      obj.alias = this.alias;
    }

    //resolve display
    if($.isEmptyObject(this.display)===false){
      obj.display = this.display;
    }

    //resolve seed
    if(this.seed && this.seed !==''){
      obj.seed = this.seed;
    }

    //resolve rollCountOverride
    if(this.rollCountOverride && this.rollCountOverride > 0){
      obj.rollCountOverride = this.rollCountOverride;
    }

    return obj;
  };


  //main
  this._constructor();
}

Object.setPrototypeOf(RollContainer.prototype, Base.prototype);
