function HasSeed(){
  /**
   *
   */
  this.node.find('input[name="seed"]').on('input',$.proxy(function(coreNode,event){
    //console.log($(this).val());
    //remove error state
    $(this).removeClass('error');

    //set the seed
    var seed = $(this).val();
    coreNode.seed= seed;

    //change the title
    coreNode.node.find('.title').text(seed);

    //change the roll results
    coreNode.roll();
  },null,this));
}
