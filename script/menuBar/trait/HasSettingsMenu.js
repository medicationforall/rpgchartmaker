/**
 *   RPG Chart Maker source file HasSettingsMenu,
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
function HasSettingsMenu(){
  this.settingsMenu = $('.settings.subMenu');

  this.overrides = {};

  /**
   * colorSelector change.
   */
  this.settingsMenu.on('change','.colorSelector',$.proxy(function(coreNode,event){
    var cNode = $(this);
    var color = cNode.val();
    var selector = cNode.data('selector');
    var property = cNode.data('property');

    coreNode.setOverride(selector,property,color);
  },null,this));


  /**
   *
   */
  this.setOverride=function(selector,property,color){

    if(this.overrides[selector]===undefined){
      var data={};
      data[property]=color;
      this.overrides[selector]=data;
    }else{
      this.overrides[selector][property]=color;
    }

    //set existing objects
    $(selector).css(property,color);
  };

  this.setOverrides=function(overrides){
    //loop over selectors
    for(var selector in overrides){
      if(overrides.hasOwnProperty(selector)){
        //loop over property
        for(var property in overrides[selector]){
          if(overrides[selector].hasOwnProperty(property)){
            this.setOverride(selector,property,overrides[selector][property]);
            this.settingsMenu.find('input[data-selector="'+selector+'"][data-property="'+property+'"]').val(overrides[selector][property]);
          }
        }
      }
    }
  };
}
