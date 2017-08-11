/**
 *   RPG Chart Maker source file HasGridGroupSelect,
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
  * Has Grid Cell Selection mixin
  * @mixin
  */
function HasGridGroupSelect(){
  this.selectedCell=undefined;

  /**
   *
   */
  this.node.on('click','ol li',$.proxy(function(coreNode,event){

    if($(this).hasClass('userSelectedGridItem')){
      $(this).removeClass('userSelectedGridItem');
      this.selectedCell = undefined;
    } else{
      $(this).addClass('userSelectedGridItem');
      coreNode.selectedCell = coreNode.node.find('ol li').index($(this));

      //clear the other nodes.
      var nodes = coreNode.node.find('li').not(this);
      nodes.removeClass('userSelectedGridItem');
    }
  },null,this));
}
