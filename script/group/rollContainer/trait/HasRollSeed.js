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
}
