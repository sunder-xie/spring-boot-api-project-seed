/*$(function(){
	var hallId=$('#hallId').val();
	$('#person_btn').click(function(){
		if(!validate_empty('realName','真实姓名')){return false;}
		if(!validate_phone('phone')){return false;}
		var roleId=$('input:radio:checked').val();
		if(roleId==null||roleId==''){$.prompt('请选择角色!');return false;}
		$('#roleId').val(roleId);
		//序列化表单数据
		var data=$('#person_form').serializeJson();
		$.ajax({
			url:contentpath+'/personal/member/edit',
			type:'post',
			contentType : 'application/json',
			data:JSON.stringify(data),
			async:false,
			success:function(data){
				if(data.status==0){
    				$.prompt("修改成功",function(){
    					location.href=contentpath+"/personal/member/list/"+hallId;
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
})*/
$("#roleButton").click(function(){
	$(".page1").show().siblings().hide();
	var role=$("input[name='role']:checked").val();
	$("#roleSelect").val(role);
	$("#roleSign").css({color:"green"});
	$("#roleSign").html("√");
	var roleName=$("input[name='role']:checked").parent().parent().parent().children("label").html();
	$("#roleName").html(roleName);
});
$("#phone").blur(function(){
	var oldPhone=$("#phone").attr("oldPhone");
	if ($("#phone").val()!="") {
		if ($("#phone").val()!=oldPhone) {
			if (validate_phone('phone')) {
				$.ajax({
					url:"/whoami/member/person/verifyPhone",
					type:"POST",
					data:{phone:$("#phone").val()},
					dataType:"text",
					success:function(data){
						if("0"!=data){
							$("#flag").val(false);
							$("#phoneSign").css({color:"red"});
							$("#phoneSign").html("×");
							$.prompt("个人电话已存在，请更改");
						}else{
							$("#flag").val(true);
							$("#phoneSign").css({color:"green"});
							$("#phoneSign").html("√");
						}
					}
				});
			}else{
				$("#flag").val(false);
				$("#phoneSign").css({color:"red"});
				$("#phoneSign").html("×");
			}
		}else {
			$("#flag").val(true);
			$("#phoneSign").css({color:"green"});
			$("#phoneSign").html("√");
		}
	}else{
		$("#flag").val(false);
		$("#phoneSign").css({color:"red"});
		$("#phoneSign").html("×");
	}
});
$("#personName").blur(function(){
	if ($("#personName").val()!="") {
		if (validate_Chinese($("#personName").val())) {
			$("#personNameSign").css({color:"green"});
			$("#personNameSign").html("√");
		}else{
			$("#personNameSign").css({color:"red"});
			$("#personNameSign").html("×");
		}
	}else{
		$("#personNameSign").css({color:"red"});
		$("#personNameSign").html("×");
	}
});
$("#person_btn").on("click",function(){
	if ($("#personName").val()!="" && $("#roleSelect").val()!=""&&$("#phone").val()!="") {
		if($("#flag").val()){
			$.ajax({
				url:"edit",
				type:"POST",
				data:$("#person_form").serialize(),
				dataType:"text",
				success:function(data){
					if("1"==data){
						$.prompt("个人会员添加成功",function(){
							window.location.href="../person";
						});
					}else{
						$.toastr("个人会员添加失败，请重试");
					}
				},
				error:function(){
					$.toastr("系统异常，请稍后再试");
				}
			});
		}else {
			$.prompt("个人电话已存在，请更改");
		}
	}else{
		$.prompt("个人名称和电话和角色不能为空");
	}
});
$('input').iCheck({
	checkboxClass: 'icheckbox_flat-red',
	radioClass: 'iradio_flat-red'
});