/**
 *   RPG Chart Maker source file HasUniqueControl,
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
function HasUniqueControl(){
  this.unique=false;
  this.uniqueControl = this.node.find('.unique');

  /**
   *
   */
  this.uniqueControl.click($.proxy(function(coreNode,event){
    event.preventDefault();
    console.log('clicked unique');

    if($(this).hasClass('inactive')){
      coreNode.setUnique(true);
    } else {
      coreNode.setUnique(false);
    }
  },null,this));

  this.setUnique=function(value){
    this.unique = value;

    if(this.unique===true){
      this.uniqueControl.addClass('active').removeClass('inactive');
    } else{
      this.uniqueControl.addClass('inactive').removeClass('active');
    }
  };

}
