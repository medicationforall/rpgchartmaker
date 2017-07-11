function HasRollControl(){
  this.rollValue=true;
  this.rollControl = this.node.find('.roll');


  /**
   *
   */
  this.rollControl.click($.proxy(function(coreNode,event){
    event.preventDefault();
    //console.log('clicked unique');

    if($(this).hasClass('inactive')){
      coreNode.setRollValue(true);
    } else {
      coreNode.setRollValue(false);
    }
  },null,this));


  /**
   *
   */
  this.setRollValue=function(value){
    this.rollValue = value;

    if(this.rollValue===true){
      this.rollControl.addClass('active').removeClass('inactive');
    } else{
      this.rollControl.addClass('inactive').removeClass('active');
    }
  };
}
