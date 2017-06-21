function HasOpenMenuButtons(){
  this.node.on('click','.openMenuButton',$.proxy(function(coreNode,event){
    event.preventDefault();

    //menu to open
    var menu = $(this).data('menu');
    coreNode.openMenu(menu);
  },null,this));


  /**
   *
   */
  this.openMenu=function(name){
    //toggle menu display
    if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.'+name).hasClass('focus')){
      $('body').removeClass('menuOpen');
    }else{
      $('body').addClass('menuOpen');
    }

    //set menu focus
    $('.hamburger.menu .subMenu').removeClass('focus');
    $('.hamburger.menu .subMenu.'+name).addClass('focus');
  };
}
