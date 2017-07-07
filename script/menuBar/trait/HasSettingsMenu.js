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

 /**
  * Settings Menu Mixin.
  * @mixin
  */
function HasSettingsMenu(){
  this.settingsMenu = $('.settings.subMenu');
  this.overrides = {};


  /**
   * colorSelector change.
   */
  $('body').on('change','.colorSelector',$.proxy(function(coreNode,event){
    var cNode = $(this);
    var color = cNode.val();
    var selector = cNode.attr('data-selector');
    var property = cNode.data('property');

    coreNode.setOverride(selector,property,color);
  },null,this));


  /**
   * Reset button.
   */
  this.settingsMenu.find('.resetColors').click($.proxy(function(event){
    event.preventDefault();

    //loops through color settings
    $('body').find('.colorSelector').each($.proxy(function(index,item){
      //console.log('reset',item, $(item).val(), $(item).attr('value'));
      var cNode = $(item);
      var color = cNode.attr('value');
      var selector = cNode.data('selector');
      var property = cNode.data('property');
      cNode.val(color);
      this.setOverride(selector,property,color);
    },this));

    //reset overrides
    this.overrides={};
  },this));


  /**
   * Set a CSS override.
   * @example setOverride('body','background','#c0c0c0');
   * @param {string} selector - CSS selector.
   * @param {string} property - CSS property.
   * @param {string} value - CSS value.
   */
  this.setOverride=function(selector, property, value){
    if(this.overrides[selector]===undefined){
      var data={};
      data[property]=value;
      this.overrides[selector]=data;
    }else{
      this.overrides[selector][property]=value;
    }

    //set existing objects
    $(selector).css(property,value);
  };


  /**
   * Set a hashmap collection of overrides.
   * @param {Object} overrides - keyed by selector.
   */
  this.setOverrides=function(overrides){
    //loop over selectors
    for(var selector in overrides){
      if(overrides.hasOwnProperty(selector)){
        //loop over property
        for(var property in overrides[selector]){
          if(overrides[selector].hasOwnProperty(property)){
            this.setOverride(selector,property,overrides[selector][property]);
            $('body').find('input[data-selector="'+selector.replace(/\"/g,'\\"')+'"][data-property="'+property+'"]').val(overrides[selector][property]);
          }
        }
      }
    }
  };
}
