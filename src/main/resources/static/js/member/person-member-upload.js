$(function(){
	var hallId=$('#meetHallId').val();
	$('#excel_btn').click(function(){
    	var formData = new FormData($("#excel_form")[0]);
		var filepath=$('#excel_upload').val();
		var filetype=filepath.substring(filepath.lastIndexOf('.')+1);
		var filesize=$('#excel_upload')[0].files[0].size/1024;
		if(filetype!='xls'&&filetype!='xlsx'){$.prompt('只能上传excel表格');return false;}
		if(filesize>1024){$.prompt('文件大小不能超过1M');return false;}
		$.ajax({
    		url:'/whoami/member/person/uploadExcel',
    		type:'post',
    		async:false,
    		contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理 
    		processData: false, //必须false才会自动加上正确的Content-Type
    		data:formData,
    		success:function(data){
    			console.log(data);
    			if(data.status==0){
    				$.prompt("上传成功",function(){
    					location.href="/whoami/member/person";
    				});
	        	}else{
	        		$.prompt(data.errmsg);
	        	}
    		},
    		error:function(data){
    			$.prompt('系统错误！');
    		}
    	})
	})
});
$("#excel_upload").on('change', function() {
	$(this).val().match(/[^\\\/]+\.[a-zA-Z0-9]+$/);
	$('#fileText').html($(this).val().match(/[^\\\/]+\.[a-zA-Z0-9]+$/));
});
    