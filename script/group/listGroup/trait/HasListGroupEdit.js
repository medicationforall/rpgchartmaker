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

/**
 * List Group Edit Mixin.
 * @mixin
 */
function HasListGroupEdit(){


  /**
   * Edit list item label click.
   */
  this.node.on('click','.nameText',function(event){
    var template = '<div class="inlineEdit">'+
    '<input class="itemEdit" type="text" value="'+$(this).text()+'" />'+
    '<div class="editControls">'+
      '<a href="" class="applyEditButton" title="Apply">'+
        '<svg height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">'+
          '<path d="M0 0h24v24H0z" fill="none"/>'+
          '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'+
        '</svg>'+
      '</a>'+

      '<a href="" class="deleteEditButton" title="Remove">'+
        '<svg height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">'+
          '<path d="M0 0h24v24H0z" fill="none"/>'+
          '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>'+
        '</svg>'+
      '</a>'+
    '</div>'+
    '</div>';
    $(this).css('display','none');
    $(this).parent().addClass('edit');
    //$(this).after(template);
    var edit = $(template).insertAfter(this);

    //set focus
    var input = edit.find('.itemEdit').focus();

    //Select the input value content.
    var FldLength = input.val().length;
    input[0].setSelectionRange(0, FldLength);
  });


  /**
   * Apply list item edit click.
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
   * Name input enter key press.
   */
  this.node.on('keypress','.itemEdit',function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      $(this).closest('.inlineEdit').find('.applyEditButton').trigger('click');
    }
  });


  /**
   * List item delete click.
   */
  this.node.on('click','.deleteEditButton',function(event){
    event.preventDefault();

    var inlineEdit = $(this).closest('.inlineEdit');
    var nameText = $(inlineEdit).prev('.nameText');

    inlineEdit.remove();
    nameText.closest('li').remove();
  });
}
