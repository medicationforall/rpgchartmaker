function HasListMenu(){


  /**
   *register copy button
   */
   this.node.find('.copyButton').on('click',$.proxy(function(event){
     event.preventDefault();
     console.log('clicked copy button',this.gatherData());

     this.node.find('.copyInput').select();
     document.execCommand("copy");

   },this));


  /**
   *
   */
   this.openMenu=function(){
     //fill out the copy input
     this.node.find('.copyInput').val(JSON.stringify(this.gatherData()));
   };

}
