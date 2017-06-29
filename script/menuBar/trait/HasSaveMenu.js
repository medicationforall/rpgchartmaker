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
function HasSaveMenu(){
  this.saveMenu = $('.save.subMenu');


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
   *
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
