$(function(){
	var hallId=$('#hallId').val();
	$('#person_btn').click(function(){
		if(!validate_number('cost','会费')){return false;}
		//序列化表单数据
		var data=$('#person_form').serializeJson();
		$.ajax({
			url:contentpath+'/personal/cost/edit',
			type:'post',
			contentType : 'application/json',
			data:JSON.stringify(data),
			async:false,
			success:function(data){
				if(data.status==0){
					$.prompt("修改成功!",function(){
						location.href=contentpath+"/personal/cost/list/"+hallId;
    				});
				}else{
					$.prompt(data.msg);
				}
			},
			error:function(data){
				$.prompt('系统错误!');
				}
			})
		})
});
$('input').iCheck({
	checkboxClass: 'icheckbox_flat-red',
	radioClass: 'iradio_flat-red'
});