/**
 *   RPG Chart Maker source file HasListGroupAdd,
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
 * List Group Add Mixin.
 * @mixin
 */
function HasListGroupAdd(){


  /**
   * Add List item click.
   */
  this.node.on('click','.addNameButton',$.proxy(function(event){
    event.preventDefault();
    var nameInput = this.node.find('.nameInput');

    if(nameInput.val()!==''){
    this.AddToList(nameInput.val().trim());

    //reset note input
    nameInput.val('');
    nameInput.focus();
    }
  },this));


  /**
   * Adds the given value to the list.
   * @param {string} value - text to add to the list.
   */
  this.AddToList=function(value){
    var template = '<li>'+
    '<span class="nameText">'+value+'</span></li>';
    this.node.find('ol').append(template);
  };


  /**
   * Name input enter key press.
   */
  this.node.on('keypress','.nameInput',$.proxy(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      this.node.find('.addNameButton').trigger('click');
    }
  },this));
}
