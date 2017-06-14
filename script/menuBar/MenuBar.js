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

    $('.rollContainer').each(function(index,item){
      var coreNode = $.data(item,'coreNode').roll();
    });
  },this));
}
