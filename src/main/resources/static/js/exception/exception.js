	var exceptionDefaultPageNum = 1; //默认的页码
	var exceptionDefaultpageSize = 10; //默认的每页显示数量
	
	//页面加载之后执行
	$(function() {	
		funcQueryexceptionLogs(exceptionDefaultPageNum, exceptionDefaultpageSize);
	}); 
	//查询按纽事件绑定
	$('#queryButton').click(function(){		
		funcQueryexceptionLogs(exceptionDefaultPageNum, exceptionDefaultpageSize);
	});
	//删除方法事件绑定
	$('#delButton').click(function(){	
		//先删除
		//后查询绑定
		funcDelExceptionLogs();
	});	
	
	
	
	//单个删除
	function funcDelExceptionLogById(id){
		var params ="{\"id\":"+id+"}";
		var obj = JSON.parse(params);
		$.ajax({
			url : contentpath + '/exception/del',
			type : 'POST',
			data: JSON.stringify(obj),
			contentType : 'application/json',
			success : function(data) {
				if (null != data && null != data.status && null != data.resdata && 1 == data.status) {					
					funcQueryexceptionLogs(exceptionDefaultPageNum, exceptionDefaultpageSize);
				} else {
					$.prompt(data.msg);
				}
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	}
	
	
	//批量删除方法
	function funcDelExceptionLogs(){
		var params = $('#queryExceptionLogsForm').serializeJson();
		$.ajax({
			url : contentpath + '/exception/del',
			type : 'POST',
			data: JSON.stringify(params),
			contentType : 'application/json',
			success : function(data) {
				if (null != data && null != data.status && null != data.resdata && true == data.resdata) {					
					funcQueryexceptionLogs(exceptionDefaultPageNum, exceptionDefaultpageSize);
				} else {
					$.prompt(data.msg);
				}
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	} 
	
	//批量查询方法
	function funcQueryexceptionLogs(pageNum, pageSize){
		$("#pageNum").val(pageNum);
		$("#pageSize").val(pageSize);
		var params = $('#queryExceptionLogsForm').serializeJson();
		$.ajax({
			url : contentpath + '/exception/lists',
			type : 'POST',
			data: JSON.stringify(params),
			contentType : 'application/json',
			success : function(data) {
				if (null != data && null != data.status && null != data.resdata && null != data.resdata.list ) {					
					//绑定内容显示
					var listsHtml = listsTemp.render(data.resdata.list);
					$("#listsDiv").empty();
					document.getElementById("listsDiv").innerHTML = listsHtml;
					//绑定分页
					var pageFooterHtml = pageFooterTemp.render(data.resdata);
					$("#pageFooterDiv").empty();
					document.getElementById("pageFooterDiv").innerHTML = pageFooterHtml;
				} else {
					$.prompt(data.msg);
				}
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	}  
    