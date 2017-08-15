//知识库收藏
//ajax提交收藏
function collection(_this,fileId,meeId){
	$.ajax({
		url:"/whoami/knowledgeCollection/add",
		async: false,
		type:"POST",
		data:"fileId="+fileId+"&meeId="+meeId,
		dataType:"text",
		success:function(data){
			if("1"==data){
				_this.removeClass("func-btn uncollect-data").addClass("func-btn collect-data");
			}else{
				$.toastr("资料收藏失败，请重试");
			}
		},
		error:function(){
			$.toastr("系统异常，请稍后再试");
		}
	});
}

//ajax取消收藏
function cancelCollec(_this,fileId){
	var flag=false;
	$.ajax({
		url:"/whoami/knowledgeCollection/cancel",
		async: false,
		type:"POST",
		data:"fileId="+fileId,
		dataType:"text",
		success:function(data){
			if("1"==data){
				_this.removeClass("func-btn collect-data").addClass("func-btn uncollect-data");
				flag=true;
			}else{
				$.toastr("取消收藏失败，请重试");
			}
		},
		error:function(){
			$.toastr("系统异常，请稍后再试");
		}
	});
	return flag;
}

//点击五角星图标，改变图标样式
$("[select = true]").on("click", function () {
	var _this=$(this);
	var fileId=_this.attr("file");
	var meeId=_this.attr("mee");
	if (_this.attr("class")=="func-btn uncollect-data") {
		collection(_this,fileId,meeId);
	} else {
		cancelCollec(_this,fileId);
	}
	return false;
});
//点击五角星图标，改变图标样式
$("[select = false]").on("click", function () {
	var _this=$(this);
	var fileId=_this.attr("file");
	var meeId=_this.attr("mee");
	$.affirm("确认要取消收藏该资料吗？", function(){
		if (cancelCollec(_this,fileId)) {
			_this.parent().parent().parent().remove();
		} 
	});
	return false;
});

$("[down = down]").on("click", function () {
	location.href=$(this).attr("fastdfsurl")+$(this).attr("url");
	return false;
});