function HasRollMenu(){
  this.display={};
  this.alias={};

  /**
   *
   */
  this.openMenu=function(){
    console.log('open menu');

    var lists = $('.listGroupContainer .list');
    var menu = this.node.find('.menu');

    //clear the menu
    menu.empty();

    //add default no. column
    this.addMenuOption('No.',menu);

    //if we have lists
    if(lists.length > 0){
      console.log('display edit controls');

      lists.each($.proxy(function(coreNode ,menu, index, item){
        console.log(arguments);
        var input = $(item).find('input[name="listGroupName"]');
        var name = input.val();

        coreNode.addMenuOption(name,menu);
      },null, this, menu));
    }
  };

  this.addMenuOption=function(name,menu){
    var checked='';
    if(this.resolveDisplay(name)===true){
      checked = 'checked';
    }

    var template = '<div><input class="alias" data-name="'+name+'" value="'+this.resolveAlias(name)+'" />'+
    '<input class="display" data-name="'+name+'" type="checkbox" '+checked+' /></div>';

    menu.append(template);
  };

  /**
   *
   */
  this.node.find('.menu').on('input','.alias',$.proxy(function(coreNode,event){
    //console.log('alias change',$(this).val());
    var column = $(this).data('name');
    coreNode.setAlias(column,$(this).val());
  },null,this));


  /**
   *
   */
  this.setAlias=function(column,alias){
    this.alias[column]=alias;

    if(this.alias[column]===column){
      delete this.alias[column];
    }

    this.roll();
  };


  /**
   *
   */
  this.node.find('.menu').on('change','.display',$.proxy(function(coreNode,event){
    console.log('alias change',this.checked);
    var column = $(this).data('name');
    coreNode.setDisplay(column,this.checked);
  },null,this));

  /**
   *
   */
  this.setDisplay=function(column,display){
    this.display[column] = display;

    if(this.display[column]===true){
      delete this.display[column];
    }

    this.roll();
  };
}