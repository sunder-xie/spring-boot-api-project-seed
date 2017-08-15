rend.views.converters("formateDate", function (dateString) {  
        var formateDate = dateString.replace("T"," ");  
        //将  2016-05-13T00:00:00 格式的日期转为  2016-05-13 00:00:00
       
        return formateDate;  
    }); 
    
rend.views.converters("formateTimestamp", function (dateString) {  
         
        var timestamp = dateString;
        var newDate = new Date();
        newDate.setTime(timestamp);
        

        Date.prototype.format = function(format) {
               var date = {
                      "M+": this.getMonth() + 1,
                      "d+": this.getDate(),
                      "h+": this.getHours(),
                      "m+": this.getMinutes(),
                      "s+": this.getSeconds(),
                      "q+": Math.floor((this.getMonth() + 3) / 3),
                      "S+": this.getMilliseconds()
               };
               if (/(y+)/i.test(format)) {
                      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
               }
               for (var k in date) {
                      if (new RegExp("(" + k + ")").test(format)) {
                             format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                      }
               }
               return format;
        };
        var formateDate =  newDate.format('yyyy-MM-dd');
     
       
        return formateDate;  
    }); 
rend.views.converters("formateDate1", function (dateString) { 
	  //将  2016-05-13T00:00:00 格式的日期转为  2016-05-13
	 
  var formateDate = dateString.split("T")[0];  

 
  return formateDate;  
});  

rend.views.converters("formateDate2", function (dateString) { 
	  //将  2016-05-13T00:00:00 格式的日期转为  2016-05-13
	 
var formateDate = dateString.split(" ")[0];  


return formateDate;  
});  


rend.views.converters("formateUrl", function (dateString) {  
    var formateUrl = dateString.replace("dynamic_detailPage","dynamic_detailPageApp");  
    //将  2016-05-13T00:00:00 格式的日期转为  2016-05-13 00:00:00
   
    return formateUrl;  
}); 
