/**
 *   RPG Chart Maker source file HasLoadMenu,
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
 * Load Menu Mixin.
 */
function HasLoadMenu(){
  this.loadMenu = $('.load.subMenu');


  /**
   * Import file selector change.
   */
  this.loadMenu.find('.importFile').change($.proxy(function(event){
    event.preventDefault();

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      //clear existing lists and rollContainers check
      this.clearAll();

      var file = $('.importFile')[0].files[0];
      var reader = new FileReader();

      reader.onload = $.proxy(function(e) {
        var text = reader.result;
        var data = jQuery.parseJSON(text);

        this.loadData(data);
      },this);
      reader.readAsText(file);
    } else {
      alert('The File APIs are not fully supported by your browser.');
    }
  },this));


  /**
   * Load template button.
   */
  this.loadMenu.find('.loadTemplateButton').click($.proxy(function(menu,event){
    event.preventDefault();
    var file = $(this).data('file');

    //clear lists check
    menu.clearAll();

    $.getJSON('template/'+file,$.proxy(function(data){
      this.loadData(data);
    },menu));
  },null,this));


  /**
   * Load Raw JSON button.
   */
  this.loadMenu.find('.loadRawButton').click($.proxy(function(event){
      event.preventDefault();
      var data = this.loadMenu.find('.loadRawTextArea').val();
      data = JSON.parse(data);

      if(data.type && (data.type == 'ListGroup' || data.type == 'ObjectGroup')){
        this.loadList(data);
      }
  },this));
}
