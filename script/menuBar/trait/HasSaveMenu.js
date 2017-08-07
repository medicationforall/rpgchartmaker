/**
 *   RPG Chart Maker source file HasSaveMenu,
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
  * Save Menu Mixin.
  * @mixin
  */
function HasSaveMenu(){
  this.saveMenu = $('.save.subMenu');
  this.saveOptions = {};


  /**
   * Save Option Checkbox change.
   */
  this.saveMenu.on('change','.saveOption',$.proxy(function(coreNode, event){
    var value = $(this)[0].checked;
    var type = $(this).data('type');
    coreNode._setSaveOption(type,value);
  },null,this));


  /**
   * Set a save option.
   * @param {string} key - Reserved key lists, Rolls, overrides.
   * @param {boolean} value - option flag value.
   * @private
   */
  this._setSaveOption=function(key,value){
    this.saveOptions[key] = value;
  };


  /**
   * Get the save Option by lookup key.
   * @param {string} key - lists, Rolls, overrides.
   * @return {boolean} stored option return false if the key does not exist yet.
   */
  this.getSaveOption=function(key){
    if(this.saveOptions[key]!==undefined){
      return this.saveOptions[key];
    }else{
      return true;
    }
  };


  /**
   * Export button click.
   */
  this.saveMenu.find('.exportButton').click($.proxy(function(event){
    event.preventDefault();
    var listNameInput =this.node.find('input[name=listName]');

    if(listNameInput.val()!==''){
      data = this.gatherData();
      this.saveAsFile(JSON.stringify(data),listNameInput.val()+'.json',"text/plain;charset=utf-8");
    } else{
      listNameInput.addClass('error');
    }
  },this));


  /**
   * Prompt the browser to save a file.
   * @param {string} t - data of the file.
   * @param {string} f - file name.
   * @param {string} m - meta file type.
   * @todo duplicate code
   */
  this.saveAsFile=function(t,f,m) {
    try {
      var b = new Blob([t],{type:m});
      saveAs(b, f);
    } catch (e) {
      window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
  };
}
