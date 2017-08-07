/**
 *   RPG Chart Maker source file HasSeed,
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
 * Seed Mixin.
 * @mixin
 */
function HasSeed(){


  /**
   * User Input on the seed textbox.
   */
  this.node.find('input[name="seed"]').on('input',$.proxy(function(coreNode,event,params){
    //remove error state
    $(this).removeClass('error');

    //set the seed
    var seed = $(this).val();
    coreNode.seed= seed;

    //change the title
    coreNode.node.find('.title').text(seed);
    coreNode.setupColorSelector(seed);

    //change the roll results
    if(params === undefined || params.triggerRoll !== false){
      coreNode.roll();
    }
  },null,this));


  /**
   * Setup the the color selector located on the RollContainer menu.
   * @param {string} seed
   * @todo duplicate code?
   */
  this.setupColorSelector=function(seed){
    //get the data label
    this.node.find('.colorSelector').attr('data-selector','.handle[data-label="'+seed+'"]');

    if(seed !==''){
      this.node.find('.colorSelector').prop('disabled',false);
    }else{
      this.node.find('.colorSelector').prop('disabled',true);
    }
  };
}
