/**
 *   RPG Chart Maker source file HasObjectGroupAddEntry,
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
 * Object Group Add Entry Mixin.
 * @mixin
 */
function HasObjectGroupAddEntry(){


  /**
   * Add entry click.
   */
  this.node.find('.addObjectButton').click($.proxy(function(event){
    event.preventDefault();

    var form = this.node.find('.objectForm');
    var message = this.node.find('.errorMessage').text('');

    //check to see if the form has children
    if(form.children().length>0){
      this._addEntry(form);
    }else{
      message.text('No Inputs in object form.');
    }

  },this));


  /**
   * Adds an object entry to the list based on the input fromt he passed in form object.
   * @param {Object} form - jquery objectForm node.
   * @todo method is too long split it up.
   * @private
   */
  this._addEntry=function(form){
    //build data object
    var data ={};
    var counter =0;

    var template = '<li><div class="object">';

    form.find('.objectInput').each($.proxy(function(index,item){
      var label = $(item).attr('data-label');
      var type =  $(item).attr('data-type');
      var value;
      var input;
      var colorBlock='';

      if(type === "text" || type === "number" || type === "color"){
        input = $(item).find('input');
        value = input.val();

        //clear the input
        input.val('');

      }else if(type === "datetime-local"){
        input = $(item).find('input');
        value = input.val();

        //clear the input
        input.val(this.getNow());

      }else if(type === "checkbox"){
        input = $(item).find('input');
        value = input[0].checked;

        //clear the input
        input.val('');
      }else if(type === "textarea"){
        input = $(item).find('textarea');
        value = input.val();

        //clear the input
        input.val('');
      }

      //set custom style
      if(type === "color"){
        colorBlock='<span class="colorBlock" style="background:'+value+'"></span>';
      }

      //make sure the value is not empty
      if(value!==''){
        data[label]=value;
        counter++;
        template+='<div><span class="title" data-label="'+label+'">'+label+':</span>'+
              ' <span class="value" data-type="'+type+'">'+value+'</span> '+colorBlock+' '+
        '</div>';
      }
    },this));

    template+='</div></li>';

    //if entries are present then add the form data to the list.
    if(counter>0){
      var node =  $(template).appendTo(this.node.find('ol'));
      node.find('.object').data('json',data);
    }
  };
}
