/**
 *   RPG Chart Maker source file HasAddMenu,
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
function HasAddMenu(){
  this.addMenu = $('.add.subMenu');


  /**
   * Add list group click
   */
  this.addMenu.find('.addSeedRollContainerButton').click(function(event){
    event.preventDefault();
    var rollContainer = new SeedRollContainer();
  });


  /**
   * Add list group click
   */
  this.addMenu.find('.addListGroupButton').click(function(event){
    event.preventDefault();
    var listGroup = new ListGroup();

    //close the open rollcontainer menus
    $('.rollContainer .menu').removeClass('focus');
  });


  /**
   * Add object group click.
   */
  this.addMenu.find('.addObjectGroupButton').click(function(event){
    event.preventDefault();
    var objectGroup = new ObjectGroup();

    //close the open rollcontainer menus
    $('.rollContainer .menu').removeClass('focus');
  });
}
