/**
 *   RPG Chart Maker source file HasOpenMenuButtons,
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
 * Open Menu Buttons Mixin.
 * @mixin
 */
function HasOpenMenuButtons(){


  /**
   * Open Menu Button click.
   */
  this.node.on('click','.openMenuButton',$.proxy(function(coreNode,event){
    event.preventDefault();

    //menu to open
    var menu = $(this).data('menu');
    coreNode.openMenu(menu);
  },null,this));

/**
 *
 */
  $('.menu').on('click','.closeMenuButton',function(event){
    event.preventDefault();

    if($('body').hasClass('menuOpen')){
        $('body').removeClass('menuOpen');
    }

    $('.hamburger.menu .subMenu').removeClass('focus');
  });


  /**
   * Actions to be performed when opening a menu.
   * @param {string} name - Name of the menu to be opened.
   */
  this.openMenu=function(name){
    //toggle menu display
    if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.'+name).hasClass('focus')){
        $('body').removeClass('menuOpen');
    }else if($('body').hasClass('menuOpen') ===false){
      $('body').addClass('menuOpen');
      $('.hamburger.menu .subMenu').animateCss('slideInRight');
    }

    //set menu focus
    $('.hamburger.menu .subMenu').removeClass('focus');
    $('.hamburger.menu .subMenu.'+name).addClass('focus');
  };
}
