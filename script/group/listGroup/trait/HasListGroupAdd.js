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
  this.inputMode='input';



  /**
   * Add List item click.
   */
  this.node.on('click','.addNameButton',$.proxy(function(event){
    event.preventDefault();
    if(this.inputMode==='input'){
      this.addFromInput();
    } else if(this.inputMode==='textarea'){
      this.addFromTextArea();
    }
  },this));


  /**
   *
   */
  this.addFromInput=function(){
    var nameInput = this.node.find('.nameInput');

    if(nameInput.val()!==''){
      this.AddToList(nameInput.val().trim());

      //reset note input
      nameInput.val('');
      nameInput.focus();
    }
  };


  /**
   *
   */
  this.addFromTextArea=function(){
    var nameTextarea = this.node.find('.nameTextarea');
    var nameInput = this.node.find('.nameInput');

    if(nameTextarea.val()!==''){
      this.fillOutRawList(nameTextarea.val().trim());

      nameTextarea.css('display','');
      nameInput.css('display','');
      this.inputMode='input';

      //reset note input
      nameTextarea.val('');
      nameInput.val('');
      nameInput.focus();
    }
  };


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
    console.log(keycode,event.shiftKey);
    if(keycode == '13' && event.shiftKey) {
      this.switchInputToTextarea();
    } else if(keycode == '13') {
      this.node.find('.addNameButton').trigger('click');
    }
  },this));

  /**
   *
   */
   this.node.find('.nameInput').on('paste', $.proxy(function(coreNode,e) {
    var pasteData = e.originalEvent.clipboardData.getData('text');
    console.log(pasteData);
    var match = /\r|\n/.exec(pasteData);
    if(match){
      coreNode.switchInputToTextarea(true);
    }
  },null,this));



  /**
   *
   */
  this.switchInputToTextarea=function(paste){
    var value = '';
    var textarea = this.node.find('.nameTextarea').css('display','inline');
    var input = this.node.find('.nameInput').css('display','none');
    this.inputMode='textarea';

    if(paste === undefined){
      value = input.val()+'\n';
    }//else{
    //  value = text;
    //}

    textarea.val(value);
    textarea.focus();
  };
}
