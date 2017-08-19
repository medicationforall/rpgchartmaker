/**
 *   RPG Chart Maker source file HasDirectionControl,
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
 * DIrection Control mixin.
 * @mixin
 */
function HasDirectionControl(){
  this.directions=['down','left','right','up'];
  this.directionTable = this.node.find('.menuContent table');

  /**
   *
   */
  this.directionTable.on('click','.direction',$.proxy(function(coreNode,event){
    event.preventDefault();

    var direction = $(this).data('direction');

    if($(this).hasClass('inactive')){
      $(this).removeClass('inactive').addClass('active');
      coreNode.addDirection(direction);
      coreNode.setupCopy();
    }else{
      if(coreNode.directionTable.find('.direction.active').length>1){
        $(this).removeClass('active').addClass('inactive');
        coreNode.removeDirection(direction);
        coreNode.setupCopy();
      }
    }
  },null,this));


  /**
   *
   */
  this.removeDirection=function(direction){
    var index = this.directions.indexOf(direction);

    if (index > -1) {
      this.directions.splice(index, 1);
    }
  };


  /**
   *
   */
  this.addDirection=function(direction){
    this.directions.push(direction);
    this.directions.sort();
  };


  /**
   *
   */
  this.setDirections=function(directions){
    this.directions = directions;
    this.directions.sort();
    this.directionTable.find('.direction.active').removeClass('active').addClass('inactive');

    for(var i=0,direction;(direction=this.directions[i]);i++){
      this.directionTable.find('.direction[data-direction="'+direction+'"]').removeClass('inactive').addClass('active');
    }
  };
}
