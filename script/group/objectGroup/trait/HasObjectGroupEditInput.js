/**
 *   RPG Chart Maker source file HasObjectGroupEditInput,
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
 * Object Group Edit Input Mixin.
 * @mixin
 */
function HasObjectGroupEditInput(){
  this.form = this.node.find('.objectForm');


  /**
   * Initiate object input edit click.
   */
  this.form.on('click','.objectInput .label',function(event){
    event.preventDefault();

    var node = $(this).closest('.objectInput');
    var label = node.attr('data-label');
    var type = node.attr('data-type');
    var template = '<div class="editInput">'+
      '<input placeholder="Label" value="'+label+'" name="editInputLabel" /> '+
      '<select name="addInputType">'+
        '<option value="text">Text</option>'+
        '<option value="textarea">TextArea</option>'+
        '<option value="number">Number</option>'+
        '<option value="checkbox">Checkbox</option>'+
        '<option value="color">Color</option>'+
        '<option value="datetime-local">DateTime</option>'+
      '</select>'+
      '<a href="" class="applyEditButton" title="Apply">+</a>'+
      '<a href="" class="deleteEditButton" title="Delete">-</a>'+
    '</div>';

    var edit = $(template.trim()).insertAfter(node);
    edit.find('select').val(type);
    node.hide();

    //set focus
    var input = edit.find('input[name="editInputLabel"]').focus();

    //Select the input value content.
    var FldLength = input.val().length;
    input[0].setSelectionRange(0, FldLength);
  });


  /**
   * Apply an object input edit click.
   * This is extremely finnicky should be made something less state machine dependent.
   */
  this.form.on('click','.applyEditButton',function(event){
    event.preventDefault();

    var editInput = $(this).closest('.editInput');
    var input = editInput.prev('.objectInput');

    var label = editInput.find('input[name="editInputLabel"]').val();
    var type = editInput.find('select[name="addInputType"]').val();
    var prevType = input.attr('data-type');
    var find = 'input[type="'+prevType+'"]';

    if(prevType === 'textarea'){
      find = 'textarea';
    }

    var node = input.find(find);
    var value = node.val();
    input.css('display','');

    var insert = '<input type="'+type+'" value="'+value+'" />';
    if(type === 'textarea'){
      insert = '<textarea>'+value+'</textarea>';
    }

    input.attr('data-label',label);
    input.find('.label').text(label);

    input.attr('data-type',type);
    node.after(insert);
    node.remove();

    editInput.remove();
  });


  /**
   * Name input enter key press.
   */
  this.form.on('keypress','input[name="editInputLabel"]',function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      $(this).closest('.editInput').find('.applyEditButton').trigger('click');
    }
  });


  /**
   * Delete an object input click.
   */
  this.form.on('click','.deleteEditButton',function(event){
    event.preventDefault();
    $(this).closest('.editInput').remove();
  });
}
