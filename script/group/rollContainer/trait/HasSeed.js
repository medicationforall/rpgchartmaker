function HasSeed(){
  /**
   *
   */
  this.node.find('input[name="seed"]').on('input',$.proxy(function(coreNode,event){
    //console.log($(this).val());
    var seed = $(this).val();
    coreNode.seed= seed;
  },null,this));
}