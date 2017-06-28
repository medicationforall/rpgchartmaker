/**
 *   RPG Chart Maker source file HasObjectGroupEditEntry,
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
function HasObjectGroupEditEntry(){

  /**
   * note edit functionality
   */
  this.node.on('click','.object',$.proxy(function(coreNode,event){
    var template = '<div class="inlineEdit">'+
    '<div class="objectEdit"></div>'+
    '<div class="editControls">'+
    '<a href="" class="applyEditButton" title="Apply">+</a>'+
    '<a href="" class="deleteEditButton" title="Delete">-</a>'+
    '</div>'+
    '</div>';
    $(this).css('display','none');
    $(this).parent().addClass('edit');
    var inlineEdit = $(template).insertAfter(this);
    coreNode.createForm(this,inlineEdit);
  },null,this));


  /**
   * @todo take base form into consideration.
   */
  this.createForm=function(dataNode,editNode){
    //console.log('createForm',dataNode,editNode);
    var template = '<div><span class="title"></span> <input class="value" type="text" /></div>';

    $(dataNode).find('div').each(function(index,item){
      //gather data
      var label = $(item).find('.title').data('label');
      var value = $(item).find('.value').text();
      var type = $(item).find('.value').data('type');

      //add the edit controls
      var node = $(template).appendTo(editNode.find('.objectEdit'));

      //set the data
      node.find('.title').text(label);
      node.find('.value').val(value);
      node.find('.value').attr('type',type);
    });
  };


  /**
   * note apply click
   */
  this.node.on('click','.applyEditButton',$.proxy(function(coreNode,event){
    event.preventDefault();
    var inlineEdit = $(this).closest('.inlineEdit');
    var object = $(inlineEdit).prev('.object');
    var editForm = inlineEdit.find('.objectEdit');

    editForm.find('div').each($.proxy(coreNode.applyUpdate,coreNode,object));

    object.css('display','');
    $(this).closest('li').removeClass('edit');
    inlineEdit.remove();
  },null,this));


  /**
   *@todo correctly gather type
   */
  this.applyUpdate=function(object, index, item){
    //console.log('applyUpdate',object, index, item);
    var title = $(item).find('.title').text();
    var type = 'text';
    var value = '';

    if(type==='text'){
      value = $(item).find('.value').val();
    }

    var field = object.find('[data-label="'+title+'"]').parent();
    field.find('.value').text(value);
  };


  /**
   * note delete click
   */
  this.node.on('click','.deleteEditButton',function(event){
    event.preventDefault();

    var inlineEdit = $(this).closest('.inlineEdit');
    var object = $(inlineEdit).prev('.object');

    inlineEdit.remove();
    object.closest('li').remove();
  });
}
