/**
 *   RPG Chart Maker source file ListGroup,
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

function ListGroup(animate){

//data
this.node;
this.animate=true;

//constructor
this._constructor = function(){
	this._resolveTemplate();

	if(animate!==undefined){
		this.animate=animate;
	}
}

/**
 *
 */
this._resolveTemplate=function(){
	if(ListGroup.template){
		this._setup(ListGroup.template);

	}else{
		$.get('html/listGroup.html',$.proxy(function(data){			
			ListGroup.template=data;
			this._setup(ListGroup.template);
		},this));
	}

}


/**
 *
 */
this._setup=function(template){
	this._createNode(template);
	this._setupSortable();
	this._setupAlphabetize();
	this._setupHandleColor();

	$(this).trigger('loaded');
}

/**
 *
 */
this._createNode=function(template){
	this.node = $(template.trim()).appendTo('.listGroupContainer');
	if(this.animate===true){
		this.node.animateCss('zoomInLeft');
	}
}


/**
 *
 */
this._setupSortable=function(){
	this.node.find('ol').sortable({connectWith: ".list ol"});
}

/**
 *
 */
this._setupAlphabetize=function(){
	this.node.find('.alphabetizeButton').click($.proxy(function(event){
		event.preventDefault();
		console.log('clicked alphabetize button');

		var list = this.node.find('ol li');

		list.sort(function(a,b){
			aText = $(a).find('.nameText').text();
			bText = $(b).find('.nameText').text();

			if(aText > bText){
				return 1;
			}

			if(aText < bText){
				return -1;
			}

			return 0;
		});

		list.detach().appendTo(this.node.find('ol'));
	},this));
}


/**
 *
 */
this._setupHandleColor=function(){


	this.node.find('input[name="listGroupName"]').on('input',$.proxy(function(hashCode,intToRGB,node,event){
		//console.log('input kicked off',$(this).val());
		var color = '';
		
		if($(this).val()!==''){
			var hash = hashCode($(this).val());
			color = '#'+intToRGB(hash);
			//console.log('hash',hash,(hash,hash+'').length);
		}
		
		//console.log(color);
		node.find('.handle').css('background-color',color)		
	},null,this.hashCode,this.intToRGB,this.node));
}


/**
 *
 */
this.getNode=function(){
	return this.node;
}


/**
 *
 */
this.fillOutList=function(list){

	//fill out name
	this.node.find('input[name=listGroupName]').val(list.name).trigger('input');

	//fill out List		
	for(var j=0,item;item=list.list[j];j++){
		this.node.find('ol').append('<li><span class="nameText">'+item+'</span></li>')
	}
}


/**
 *
 */
this.hashCode=function(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 


/**
 *
 */
this.intToRGB=function(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "000000".substring(0, 6 - c.length) + c;
}

//main
	this._constructor();

}
