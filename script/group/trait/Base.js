/**
 *   RPG Chart Maker source file Base,
 *   Copyright (C) 2016  James M Adams
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
 * Base inheritance class for ListGroup, ObjectGroup, and RollContainer.
 * @class
 */
function Base(animate){
  //data
  this.node = undefined;
  this.handleKeyName='listGroupName';
  this.animate=true;
  this.overrideSelector=['.card','.menu'];
}


/**
 * Sets up a new instance base methods.
 * @param {string} template - string template to be inserted to the DOM.
 */
Base.prototype.setupBase=function(template){
  this._createNode(template);
  this.setupSortable();
  this._setupHandleColor();
  this._setupAlphabetize();
  this._setupCSSOverride();
  HasUniqueControl.call(this);
  HasRollControl.call(this);
};


/**
 * Placeholder method.
 */
Base.prototype.setupSortable=function(){};


/**
 * Get the html template and store it in a static template variable.
 * @param {Object} classObject - Static object class reference.
 * @param {string} name - template name to lookup.
 * @private
 */
Base.prototype._resolveTemplate=function(classObject,name){
  if(classObject.template){
    this._setup(classObject.template);
  }else{
    return $.get('html/'+name+'.html',$.proxy(function(data){
      classObject.template=data;

      if(this._setup){
        this._setup(classObject.template);
      }
    },this));
  }
};


/**
 * Inserts the template into the page.
 * If animate is true applies an animation effect.
 * @param {string} template - string template to be inserted to the DOM.
 * @private
 */
Base.prototype._createNode=function(template){
  this.node = $(template.trim()).appendTo('.listGroupContainer');
  $.data(this.node[0],'coreNode',this);

  if(this.animate===true){
    this.node.animateCss('zoomInLeft');
  }
};


/**
 * Sets the color of the list header drag handle based on the text input on the List Name input.
 * @private
 */
Base.prototype._setupHandleColor=function(){
  this.node.find('input[name="'+this.handleKeyName+'"]').on('input',$.proxy(function(hashCode,intToRGB,node,event){
    var handle = node.find('.handle');
    var color = '';
    var value = $(this).val();
    $(node).data('name',value);

    if(value!==''){
      var hash = hashCode($(this).val());
      color = '#'+intToRGB(hash);
    }

    handle.css('background-color',color);
    handle.attr('data-label',value);
    node.find('.colorSelector').attr('value',color);
    node.find('.colorSelector').val(color);
    node.find('.colorSelector').attr('data-selector','.handle[data-label="'+value+'"]');
    if(value !==''){
      node.find('.colorSelector').prop('disabled',false);
    }else{
      node.find('.colorSelector').prop('disabled',true);
    }
  },null,this._hashCode,this._intToRGB,this.node));
};


/**
 * Apply Current CSS Override for a new list instance.
 * @private
 */
Base.prototype._setupCSSOverride=function(){
  //get override
  var menuNode = $('.menuBar').data('coreNode');
  var overrides = menuNode.overrides;

  for(var i=0,selector;(selector=this.overrideSelector[i]);i++){
    if(overrides[selector]!== undefined){
      //loop over override keys
      for(var property in overrides[selector]){
        if(overrides[selector].hasOwnProperty(property)){
          if(this.node.hasClass(selector.replace(/\./,' ').trim())){
            this.node.css(property,overrides[selector][property]);
          }else{
            this.node.find(selector).css(property,overrides[selector][property]);
          }
        }
      }
    }
  }
};


/**
 * Converts a string to an integer.
 * @param {string} str - input string.
 * @return {int}
 * @private
 */
Base.prototype._hashCode=function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};


/**
 * Converts an integer to a hex code.
 * @param {int} i - integer.
 * @return {hex} Color code value.
 * @private
 */
Base.prototype._intToRGB=function(i){
  var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
  return "000000".substring(0, 6 - c.length) + c;
};


/**
 * Gather data for a list container.
 * @return {Object} data representation
 */
Base.prototype.gatherData=function(){
  var obj = {};

  //get list name
  obj.name= this.node.find('input[name=listGroupName]').val();

  //get roll checkbox
  obj.roll= this.rollValue;

  //get unique
  if(this.unique !== undefined && (this.unique===true || this.unique===false)){
    obj.unique= this.unique;
  }

  //initialize list entries
  obj.list=[];

  if(this.node.hasClass('listGroup')){
    //fill out type
    obj.type='ListGroup';

    //fill out list
    this.node.find('ol li span.nameText').each(function(index, item){
      obj.list.push($(item).text());
    });
  }else if(this.node.hasClass('objectGroup')){
    //fill out type
    obj.type='ObjectGroup';

    //fill out order
    obj.order=[];

    this.node.find('.objectForm .objectInput').each(function(index, item){
      var data ={};
      data.label = $(item).data('label');
      data.type = $(item).data('type');
      obj.order.push(data);
    });

    //fill out list
    this.node.find('ol li .object').each(function(index, item){
      obj.list.push($(item).data('json'));
    });
  }
  return obj;
};
