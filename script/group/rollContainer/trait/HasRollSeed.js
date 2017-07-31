/**
 *   RPG Chart Maker source file HasRollSeed,
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
 * Roll Seed Mixin. Resolve rolls based on seed.
 * @mixin
 */
function HasRollSeed(){


  /**
   * Called when a roll event is initiated.
   * @override
   * @todo not intuitive that this is the method that is called during a roll.
   */
  this.roll=function(){
    this.rollTable = this.node.find('table');
    this.resetRng();
    this.clearTitle();
    this.resetState();
    this.resetLists();
    this.createIndex();
    this.createTableHeader();
    this.createTableRows();
    this.clearRollArrayLookup();

    $(this.rollTable).trigger("updateAll");
  };


  /**
   * Reset the random number generator for a roll event.
   */
  this.resetRng=function(){
    this.rng.clearSeed();
  };


  /**
   * Resolve a roll from either a seed or at random.
   * @param {Array} arr - array to be rolled against.
   * @param {string} name - namespace for the seed lookup key.
   * @override
   * @todo not intuitive that this method is called.
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


  /**
   *
   */
  this.resolveRollGrid=function(arr,name){
    console.log('resolveRollGrid');
    var roll;

    if(this.seed && this.seed !== ''){
      roll = this.rng.getRandom(this.seed+"-"+name, 0, arr.length -1);
    } else{
      roll = Math.floor(Math.random() * arr.length);
    }
    return roll;
  };

  this.resolveRollGridDirection=function(coreNode,arr,name){
    console.log('resolveRollGridDirection');
    var roll;
    var columns = coreNode.columns;
    var direction = ['up','down','left','right'];
    var selectedIndex;

    //get the direction
    if(this.seed && this.seed !== ''){
      roll = this.rng.getRandom(this.seed+"-"+name, 0, direction.length -1);
    } else{
      roll = Math.floor(Math.random() * direction.length);
    }

    //resolve the index of the selected node
    var list = coreNode.node.find('li');

    for(var i=0,li;(li=list[i]);i++){
      if($(li).hasClass('selectedGridItem')){
        selectedIndex = i;
        break;
      }
    }

    //translate direction roll to node in array
    if(selectedIndex!==undefined){
      console.log('selected grid item index is', selectedIndex,'direction is',direction[roll]);

      if(direction[roll]==='left'){
        if(selectedIndex+1 !== arr.length && (selectedIndex+1)%columns !==0){
          roll=selectedIndex+1;
        } else{
          roll = selectedIndex;
        }
      }else if(direction[roll]==='right'){
        if(selectedIndex-1 > 0 && (selectedIndex-1)%columns !== columns-1){
          roll=selectedIndex-1;
        } else{
          roll = selectedIndex;
        }
      }else if(direction[roll]==='up'){
        if(selectedIndex-columns > -1){
          roll=selectedIndex-columns;
        } else{
          roll = selectedIndex;
        }
      }else if(direction[roll]==='down'){
        if(selectedIndex+columns < arr.length){
          roll=selectedIndex+columns;
        } else{
          roll = selectedIndex;
        }
      }
    }else{
      console.warn('selected grid item index did not resolve');
    }
    return roll;
  };
}
