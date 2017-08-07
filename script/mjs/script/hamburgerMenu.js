/**
 *   Mjs source file hamburgerMenu,
 *   Copyright (C) 2016  James M Adams
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

$(document).ready(function(){

  //menu click
  $('.header .hamburger').click(function(event){
    event.preventDefault();

    //toggle menu display
    if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.general').hasClass('focus')){
      $('body').removeClass('menuOpen');
    }else{
      $('body').addClass('menuOpen');
    }

    //set menu focus
    $('.hamburger.menu .subMenu').removeClass('focus');
    $('.hamburger.menu .subMenu.general').addClass('focus');
  });

  //open infodialog button.
  $('.openInfoDialog').click(function(event){
    event.preventDefault();
    var url = $(this).data('url');
    var changeDialog = new InfoDialog(url);
  });
});
