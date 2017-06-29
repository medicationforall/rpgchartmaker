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
      '<a href="" class="applyEditButton" title="Apply">'+
        '<svg fill="#000000" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">'+
          '<path d="M0 0h24v24H0z" fill="none"/>'+
          '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'+
        '</svg>'+
      '</a>'+

      '<a href="" class="deleteEditButton" title="Remove">'+
        '<svg fill="#000000" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">'+
          '<path d="M0 0h24v24H0z" fill="none"/>'+
          '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>'+
        '</svg>'+
      '</a>'+
    '</div>'+
    '</div>';
    $(this).css('display','none');
    $(this).parent().addClass('edit');
    var inlineEdit = $(template).insertAfter(this);
    coreNode.createForm(this,inlineEdit);
  },null,this));


  /**
   *
   */
  this.createForm=function(dataNode,editNode){
    //console.log('createForm',dataNode,editNode);

    $(dataNode).find('div').each(function(index,item){
      //gather data
      var type = $(item).find('.value').data('type');
      var template = '<div><span class="title" data-type="'+type+'"></span> <input class="value" type="text" /></div>';
      var label = $(item).find('.title').data('label');

      var value = "";

      if(type==="text" || type==="number" || type==="color" || type==="datetime-local"){
        value = $(item).find('.value').text();
      }else if(type==="textarea"){
        template = '<div><span class="title" data-type="'+type+'"></span> <textarea class="value" type="text"></textarea></div>';
        value = $(item).find('.value').text();
      }else if(type==="checkbox"){

        var checked = '';
        value = $(item).find('.value').text();

        if(value==='true'){
          checked='checked';
        }
        template = '<div><span class="title" data-type="'+type+'"></span> <input class="value" type="checkbox" '+checked+' /></div>';
      } else{
        console.warn("unrecognized type",type);
      }

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
   *
   */
  this.applyUpdate=function(object, index, item){
    //console.log('applyUpdate',object, index, item);
    var title = $(item).find('.title').text();
    var type = $(item).find('.title').data('type');
    var value = '';
    var field = object.find('[data-label="'+title+'"]').parent();

    if(type==='text' || type==='number' || type==='textarea' || type==='datetime-local'){
      value = $(item).find('.value').val();

    }else if(type==='checkbox'){
      if($(item).find('.value')[0].checked){
        value = 'true';
      }else{
        value = 'false';
      }

    }else if(type==='color'){
      value = $(item).find('.value').val();
      field.find('.colorBlock').css('background',value);
    }else{
      console.log('warn unrecognized type',type);
    }

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
