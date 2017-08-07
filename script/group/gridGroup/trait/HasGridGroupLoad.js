/**
 *   RPG Chart Maker source file HasGridGroupLoad,
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
  * Grid Group Load Mixin.
  * @mixin
  */
function HasGridGroupLoad(){


  /**
   * Load list name, and ol list with data.
   * @param {Object} list - JSON List Data.
   */
  this.fillOutList=function(list){
    console.log('Grid Group Fill Out List');

    this.fillOutName(list);
    this.fillOutRoll(list);
    this.fillOutUnique(list);

    //fill out columns
    if(list.columns !== undefined){
      this.node.find('input[name=gridColumns]').val(list.columns).trigger('input');
    }

    //fill out List
    for(var j=0,item;(item=list.list[j]);j++){
      this.AddToList(item);
    }
  };
}
