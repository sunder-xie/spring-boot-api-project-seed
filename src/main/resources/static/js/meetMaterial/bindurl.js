function fun_checkurl(url){
	return false;
	if(url==''||url.length<4){return false;}
	if (url.indexOf("http") != 0) {
		$('#attachUrl').val("http://" + url);
	}
}
$(function(){
	$('#url_btn').click(function(){
    	if (!validate_empty('attachName', '资料名称')) {
			return false;
		}
    	if (!validate_empty('attachUrl', '资料链接')) {
			return false;
		}
    	var data = $("#url_form").serializeJson();
    	$.ajax({
			url : contentpath + "/material/bindurl",
    		type : "POST",
			contentType : 'application/json',
			data: JSON.stringify(data),
			dataType : "json",
			success : function(data) {
				console.log(data);
				if (data.errcode == 0) {
    				$.prompt("操作成功",function(){
    					location.href=contentpath+"/material/queryPage/2";
    				});
				} else {
					$.prompt("系统错误!");
				}
			}
    	})
	})
});