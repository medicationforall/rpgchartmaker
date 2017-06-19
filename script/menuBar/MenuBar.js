function MenuBar(){

  /**
   * chart name on input clear error status
   */
  $('input[name=listName]').on('input',function(){
    $(this).removeClass('error');
    $(document).prop('title', $(this).val()+' - RPG Chart Maker');
  });


  /**
   * roll button click
   */
  $('.rollButton').click($.proxy(function(event){
    event.preventDefault();
    this.rollAll();
  },this));

  /**
   *
   */
  this.rollAll=function(){
    $('.rollContainer').each(function(index,item){
      //hide open roll conainer menus
      $(item).find('.menu').removeClass('focus');

      //perform the roll
      var coreNode = $.data(item,'coreNode').roll();
    });
  };
}
