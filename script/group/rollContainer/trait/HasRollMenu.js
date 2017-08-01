/**
 *   RPG Chart Maker source file HasRollMenu,
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
 * Roll Menu Mixin.
 * @mixin
 */
function HasRollMenu(){
  this.display={};
  this.alias={};
  this.rollCountOverride=undefined;

  this.menuNode = this.node.find('.menu');


  /**
   * Open the RollContainer submenu.
   */
  this.openMenu=function(){
    var lists = $('.listGroupContainer .list');
    var cMenu = this.node.find('.menu .columns');

    //clear the menu
    cMenu.empty();

    //add default no. column
    this.addMenuOption('No.',cMenu);

    //if we have lists
    if(lists.length > 0){

      lists.each($.proxy(function(coreNode ,cMenu, index, item){
        var label = $(item).attr('data-name');

        coreNode.addMenuOption(label,cMenu);
      },null, this, cMenu));
    }
  };


  /**
   * Add the alias and display checkbox to the RollContainer menu.
   * @param {string} name - lookup name of the column.
   * @param {Object} node - The menu instance to attach the controls to.
   */
  this.addMenuOption=function(name,node){
    var checked='';
    if(this.resolveDisplay(name)===true){
      checked = 'checked';
    }

    var template = '<div><input class="alias" data-name="'+name+'" value="'+this.resolveAlias(name)+'" />'+
    '<input class="display" data-name="'+name+'" type="checkbox" title="display" '+checked+' /></div>';

    node.append(template);
  };


  /**
   * Alias field input.
   */
  this.menuNode.on('input','.alias',$.proxy(function(coreNode,event){
    var column = $(this).data('name');
    coreNode.setAlias(column,$(this).val());
  },null,this));


  /**
   *
   */
  this.menuNode.on('input','input[name="rollCountOverride"]',$.proxy(function(coreNode,event){
    coreNode.setRollCountOverride($(this).val());
  },null,this));


  /**
   *
   */
  this.setRollCountOverride=function(count){
    if(count==='' || count==='0' || count===0){
      this.rollCountOverride = undefined;
    }else{
      this.rollCountOverride = parseInt(count);
    }
  };


  /**
   * Set an alias base on the lookupName.
   * @param {string} column - lookup name used as the key.
   * @param {string} alias - Whats displayed as the column name in the RollContainer instance.
   */
  this.setAlias=function(column,alias){
    this.alias[column]=alias;

    //value of the alias is equal to the lookupName
    if(this.alias[column]===column){
      delete this.alias[column];
    }
  };


  /**
   * User click on the display checkbox.
   */
  this.menuNode.on('change','.display',$.proxy(function(coreNode,event){
    var column = $(this).data('name');
    coreNode.setDisplay(column,this.checked);
  },null,this));


  this.menuNode.on('click','.rollSingleTable',$.proxy(function(event){
    event.preventDefault();
    this.roll();
  },this));


  /**
   * Set the display flag for the lookupName.
   * @param {string} column - lookup name used as the key.
   * @param {boolean} display - Determines if the column is displayed for the RollContainer instance.
   */
  this.setDisplay=function(column,display){
    this.display[column] = display;

    if(this.display[column]===true){
      delete this.display[column];
    }
  };
}
