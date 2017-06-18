function HasListGroupLoad(){
  /**
   * Load list name, and ol list with data.
   * @param list {JSON}
   */
  this.fillOutList=function(list){

    //fill out name
    this.node.find('input[name=listGroupName]').val(list.name).trigger('input');

    //fill out roll
    if(list.roll!==undefined){
      if(list.roll=='true'){
        list.roll = true;
      }else if(list.roll=='false'){
        list.roll=false;
      }

      this.node.find('input[name="roll"]').prop('checked', list.roll).trigger('change');
    }

    //fill out List
    for(var j=0,item;(item=list.list[j]);j++){
      this.node.find('ol').append('<li><span class="nameText">'+item+'</span></li>');
    }
  };
}
