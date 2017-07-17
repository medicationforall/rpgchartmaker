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
  $('body').on('change','.colorSelector,.fontFamilySelector',$.proxy(function(coreNode,event){
    var cNode = $(this);
    var color = cNode.val();
    var selector = cNode.attr('data-selector');
    var property = cNode.data('property');

    coreNode.setOverride(selector,property,color);
  },null,this));


  /**
   * Load template theme button.
   */
  this.settingsMenu.find('.loadThemeButton').click($.proxy(function(menu,event){
    event.preventDefault();
    var file = $(this).data('file');

    $.getJSON('theme/'+file,$.proxy(function(data){
      this.loadCSSOverrides(data);
    },menu));
  },null,this));


  /**
   * Reset button.
   */
  this.settingsMenu.find('.resetColors').click($.proxy(function(event){
    event.preventDefault();
    this.resetOverrides();
  },this));


  /**
   * Loops through CSS overrides settings, and reset to back default value.
   */
  this.resetOverrides=function(){
    $('body').find('.colorSelector').each($.proxy(this.resetOverride,this));
    $('body').find('.fontFamilySelector').each($.proxy(this.resetSelectOverride,this));

    //reset overrides
    this.overrides={};
  };


  /**
   * Reset override for an input tag.
   * @param {string} index
   * @param {Object} item
   */
  this.resetOverride=function(index,item){
    //console.log('reset',item, $(item).val(), $(item).attr('value'));
    var cNode = $(item);
    var color = cNode.attr('value');
    var selector = cNode.data('selector');
    var property = cNode.data('property');
    cNode.val(color);
    this.setOverride(selector,property,color);

    delete this.overrides[selector][property];

    if($.isEmptyObject(this.overrides[selector])){
      delete this.overrides[selector];
    }
  };


  /**
   * Reset override for an select tag.
   * @param {int} index
   * @param {Object} item
   */
  this.resetSelectOverride=function(index,item){
    //console.log('reset',item, $(item).val(), $(item).attr('value'));
    var cNode = $(item);
    var value = cNode.find('option[selected]').text();
    var selector = cNode.data('selector');
    var property = cNode.data('property');
    cNode.val(value);
    this.setOverride(selector,property,value);

    delete this.overrides[selector][property];

    if($.isEmptyObject(this.overrides[selector])){
      delete this.overrides[selector];
    }
  };


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
    this.diffOverrides(overrides);
    this.applyOverrides(overrides);
  };


  /**
   * Find the difference between already applied overrides and overrides to be applied.
   * @param {Object} overrides
   */
  this.diffOverrides=function(overrides){
    //1. clone the current overrides.
    var copy = Object.assign({},this.overrides);

    //3. Find the difference between copy and overrides.
    for(var cSelector in copy){
      //missing selector
      if(overrides.hasOwnProperty(cSelector)===false){
        //reset missing keys
        $('body').find('.colorSelector[data-selector="'+cSelector.replace(/\"/g,'\\"')+'"]').each($.proxy(this.resetOverride,this));
        $('body').find('.fontFamilySelector[data-selector="'+cSelector.replace(/\"/g,'\\"')+'"]').each($.proxy(this.resetSelectOverride,this));
      }
      //check missing properties.
      else{
        for(var cProperty in copy[cSelector]){
          if(overrides[cSelector].hasOwnProperty(cProperty)===false){
            //reset missing properties
            $('body').find('.colorSelector[data-selector="'+cSelector.replace(/\"/g,'\\"')+'"][data-property="'+cProperty+'"]').each($.proxy(this.resetOverride,this));
            $('body').find('.fontFamilySelector[data-selector="'+cSelector.replace(/\"/g,'\\"')+'"][data-property="'+cProperty+'"]').each($.proxy(this.resetSelectOverride,this));
          }
        }
      }
    }
  };


  /**
   * overwrite overrides with data.
   * @param {Object} overrides
   */
  this.applyOverrides=function(overrides){
    //loop over selectors
    for(var selector in overrides){
      if(overrides.hasOwnProperty(selector)){
        //loop over property
        for(var property in overrides[selector]){
          if(overrides[selector].hasOwnProperty(property)){
            this.setOverride(selector,property,overrides[selector][property]);
            $('body').find('input[data-selector="'+selector.replace(/\"/g,'\\"')+'"][data-property="'+property+'"]').val(overrides[selector][property]);
            $('body').find('select[data-selector="'+selector.replace(/\"/g,'\\"')+'"][data-property="'+property+'"]').val(overrides[selector][property]);
          }
        }
      }
    }
  };
}
