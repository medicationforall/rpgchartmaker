/**
 *   RPG Chart Maker source file HasListGroupEdit,
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
function HasListGroupEdit(){


  /**
   * note edit functionality
   */
  this.node.on('click','.nameText',function(event){
    var template = '<div class="inlineEdit">'+
    '<input class="itemEdit" type="text" value="'+$(this).text()+'" />'+
    '<div class="editControls">'+
    '<a href="" class="applyEditButton" title="Apply">+</a>'+
    '<a href="" class="deleteEditButton" title="Delete">-</a>'+
    '</div>'+
    '</div>';
    $(this).css('display','none');
    $(this).parent().addClass('edit');
    $(this).after(template);
  });


  /**
   * note apply click
   */
  this.node.on('click','.applyEditButton',function(event){
    event.preventDefault();
    var inlineEdit = $(this).closest('.inlineEdit');
    var nameText = $(inlineEdit).prev('.nameText');
    var itemEdit = inlineEdit.find('.itemEdit');

    nameText.text(itemEdit.val()).css('display','');
    $(this).closest('li').removeClass('edit');
    inlineEdit.remove();
  });


  /**
   * name input enter key press
   */
  this.node.on('keypress','.itemEdit',function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      $(this).closest('.inlineEdit').find('.applyEditButton').trigger('click');
    }
  });


  /**
   * note delete click
   */
  this.node.on('click','.deleteEditButton',function(event){
    event.preventDefault();

    var inlineEdit = $(this).closest('.inlineEdit');
    var nameText = $(inlineEdit).prev('.nameText');

    inlineEdit.remove();
    nameText.closest('li').remove();
  });
}
