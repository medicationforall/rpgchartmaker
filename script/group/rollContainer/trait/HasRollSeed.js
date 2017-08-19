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
   * Resolve the initial cell to roll against for the Grid Group.
   * @param {Array} arr - array to be rolled against.
   * @param {string} name - namespace for the seed lookup key.
   */
  this.resolveRollGrid=function(coreNode,arr,name){
    var roll;

    var userSelected = coreNode.node.find('li.userSelectedGridItem');
    var userIndex = arr.indexOf(userSelected.html());

    if(userIndex !== -1){
      roll = userIndex;
    } else if(this.seed && this.seed !== ''){
      roll = this.rng.getRandom(this.seed+"-"+name, 0, arr.length -1);
    } else{
      roll = Math.floor(Math.random() * arr.length);
    }
    return roll;
  };


  /**
   * Get the direction of the roll for a Grid Group.
   * @param {Object} coreNode
   * @param {Array} arr - array to be rolled against.
   * @param {string} name - namespace for the seed lookup key.
   */
  this.resolveRollGridDirection=function(coreNode,arr,name){
    var roll;
    var columns = coreNode.columns;
    //var direction = ['up','down','left','right','stay'];
    var direction = coreNode.directions;
    var selectedIndex;

    //get the direction
    if(this.seed && this.seed !== ''){
      roll = this.rng.getRandom(this.seed+"-"+name, 0, direction.length -1);
    } else{
      roll = Math.floor(Math.random() * direction.length);
    }

    //resolve the index of the selected node
    var list = coreNode.node.find('li');
    var wrap = coreNode.wrapValue;

    for(var i=0,li;(li=list[i]);i++){
      if($(li).hasClass('selectedGridItem')){
        selectedIndex = i;
        break;
      }
    }

    roll = this.movedirections(selectedIndex,roll,direction,list,wrap,coreNode,arr,columns);

    return roll;
  };


  /**
   *
   */
  this.movedirections=function(selectedIndex,roll,direction,list,wrap,coreNode,arr,columns){
    var directionParts = direction[roll].split(' ');
    var localRoll = roll;
    for(var i=0,rawDirection;(rawDirection=directionParts[i]);i++){
      localRoll = this.moveDirection(selectedIndex,localRoll,rawDirection,list,wrap,coreNode,arr,columns);
      selectedIndex = localRoll;
    }

    return localRoll;
  };


  /**
   *
   */
  this.moveDirection=function(selectedIndex,roll,direction,list,wrap,coreNode,arr,columns){
    //translate direction roll to node in array
    if(selectedIndex!==undefined){
      if(direction==='right'){
        if(selectedIndex+1 !== arr.length && (selectedIndex+1)%columns !==0){
          roll=selectedIndex+1;
        } else{
          if(wrap){
            if(selectedIndex+1 === arr.length)/*account for uneven row end*/{
              var diffC = arr.length % columns;
              var idealcolumn = columns;

              if(diffC){
                idealcolumn = diffC;
              }

              roll = selectedIndex+1-idealcolumn;
            }else{
              roll = selectedIndex+1-columns;
            }
          }else{
            roll = selectedIndex;
          }
        }
      }else if(direction==='left'){
        if(selectedIndex-1 > -1 && (selectedIndex-1)%columns !== columns-1){
          roll=selectedIndex-1;
        } else{
          if(wrap){
            if(selectedIndex-1+columns >= arr.length)/*account for uneven row end*/{
              roll = selectedIndex-1+(arr.length%columns);
            }else{
              roll = selectedIndex-1+columns;
            }
          }else{
            roll = selectedIndex;
          }
        }
      }else if(direction==='up'){
        if(selectedIndex-columns > -1){
          roll=selectedIndex-columns;
        } else{
          if(wrap){
            var diff = arr.length % columns;
            var idealLength = arr.length;

            if(diff){
              idealLength = arr.length + columns - diff;
            }

            roll = selectedIndex - columns + idealLength;

            if(roll >= arr.length){
              roll-=columns;
            }
          }else{
            roll = selectedIndex;
          }
        }
      }else if(direction==='down'){
        if(selectedIndex+columns < arr.length){
          roll=selectedIndex+columns;
        }else{
          if(wrap){
              roll = selectedIndex%columns;
            }else{
            roll = selectedIndex;
          }
        }
      } else if(direction==='stay'){
        roll = selectedIndex;
      } else{
        console.warn('direction is not recognized',direction);
      }
    }else{
      console.warn('selected grid item index did not resolve');
    }

    return roll;
  };
}
