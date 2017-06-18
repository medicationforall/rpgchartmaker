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

    //this.showProcessing();

    this.rollAll();


    //this.hideProcessing();

  },this));

  /**
   *
   */
  this.rollAll=function(){

    $('.rollContainer').each(function(index,item){
      var coreNode = $.data(item,'coreNode').roll();
    });
  };


  /**
   *
   */
  this.showProcessing=function(){
    console.log('call show processing class');
    $('body .processing').css('display','block');
  };


  /**
   *
   */
  this.hideProcessing=function(){
    console.log('call remove processing class');
    $('body .processing').css('display','none');
  };

}
