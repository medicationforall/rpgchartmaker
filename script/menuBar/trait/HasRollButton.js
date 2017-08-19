/**
 *   RPG Chart Maker source file HassRollButton,
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
  * Roll Button Mixin.
  * @mixin
  */
function HassRollButton(){


  /**
   * Roll Click.
   */
  this.node.find('.rollButton').click($.proxy(function(event){
    event.preventDefault();
    this._rollAll();
  },this));


  /**
   * Initiates roll for all Roll Containers in the application.
   * @param {string} index
   * @param {Object} item
   * @private
   */
  this._rollAll=function(){
    var rollContainers =$('.rollContainer');

    if(rollContainers.length>0){
      rollContainers.each(function(index,item){
        //hide open roll container menus
        $(item).find('.menu').removeClass('focus');

        //perform the roll
        var coreNode = $.data(item,'coreNode');
        coreNode.roll();
      });
    }else{
      $('.gridGroup').each(function(index,item){
        //hide open roll container menus
        $(item).find('.menu').removeClass('focus');

        //perform the roll
        var coreNode = $.data(item,'coreNode');
        //coreNode.roll();
        console.warn('grid group roll isn\'t implemented yet. Requires a Roll Table.');
      });
    }
  };
}
