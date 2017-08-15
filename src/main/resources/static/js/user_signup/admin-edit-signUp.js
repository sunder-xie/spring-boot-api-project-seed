$(function(){
	$('#_btn').click(function(){
		var ids="";
		$('#choosed').find('li').each(function(){
			ids+=$(this).attr('data-right-id')+",";
			$(this).attr('disable',true);
		});
		ids=ids.substring(0,ids.lastIndexOf(","));
		if(ids==''){
			$.toastr('请至少选择一项');
			return false;
		}
		$.ajax({
   			url : contentpath + '/signupField/update',
   			type : 'POST',
   			contentType:'application/json',
   			data:JSON.stringify({'fieldIds':ids}),
   			async:false,
   			success : function(data) {
   				if (data.status == 0) {
   					$.prompt('更新成功',function(){
   						var meeId = $("#meeId").val();
   						var hallId = $("#hallId").val();
   						window.location.href = contentpath + "/signupField/list";
    				})
				}else{
					$.prompt(data.msg);
				}
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	})
});