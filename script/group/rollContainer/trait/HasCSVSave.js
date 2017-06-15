function HasCSVSave(){

  /**
   *
   */
  this.checkSeed=function(){
    var seed = this.node.find('input[name="seed"]');

    if(seed.val()!== ''){
      return true;
    }else{
      seed.addClass('error');
      return false;
    }
  };


  /**
   *
   */
  this.gatherData=function(){
    var data ='';
    //gather header
    data+=this.gatherCSVHeader();

    //gather records
    data+=this.gatherCSVData();
    return data;
  };


  /**
   *
   */
  this.gatherCSVHeader=function(){
    var headerData='';

    this.node.find('th').each(function(index,item){
      if(headerData!==''){
        headerData+=',';
      }
      headerData+=$(item).text();
    });

    return headerData+'\n';
  };


  /**
   *
   */
  this.gatherCSVData=function(){
    var tableData='';

    //iterate each row
    this.node.find('table tr').each(function(index,item){
      var rowData='';

      //iterate each td
      $(item).find('td').each(function(index,item){
        if(rowData!==''){
          rowData+=',';
        }
        rowData+=$(item).text();
      });
      tableData+=rowData+'\n';
    });

    return tableData;
  };


  /**
   * todo code duplication fix this.
   */
  this.saveAsFile=function(t,f,m) {
    try {
      var b = new Blob([t],{type:m});
      saveAs(b, f);
    } catch (e) {
      window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
  };


  /**
   * Click csv export save button.
   */
  this.node.find('.exportCSVButton').click($.proxy(function(event){
    event.preventDefault();
    console.log('clicked export CSV file');

    //verify that seed is not empty
    if(this.checkSeed()){
      //get file name
      var fileName = this.node.find('input[name="seed"]').val()+'.csv';
      data = this.gatherData();

      this.saveAsFile(data,fileName,"text/plain;charset=utf-8");
    }
  },this));
}
