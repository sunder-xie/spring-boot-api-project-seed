var phoneresp = false;
var phoneMsg = '';

//验证
//提交表单
$("#sign-form").on("submit", function (e) {
	e.preventDefault();
	var data = $(this).serializeJson();
	console.log(JSON.stringify(data));
	if (!data.phone || !data.password || !data.msgCode) {
		$.prompt('请完善资料信息');
	}
	else {
		$.ajax({
			url: contentpath+'/weixinoauth/dobind'
			, data: JSON.stringify(data)
			, type: "PUT"
			, contentType: 'application/json'
			, async: true
			, success: function (data) {
				if(data.status=='200'){
					$.prompt('绑定手机号成功!');
					window.location.href = contentpath+data.redirect;
				}else{
					$.prompt('绑定手机号失败!');
				}
			
			}
			, error: function () {
				$.prompt('绑定手机号超时，请稍候再试');
			}
		});
	}
});


$('#getCode_btn').click(function(){
	var _this=$(this);
	var phone =$('#phone').val().trim();
	if(!validate_phone('phone')){
		return false;
	}
	$.ajax({
		url:contentpath+'/weixin/sendMsgToAny/'+phone,
		type:'post',
		async:false,
		success:function(data){
			console.log(data);
			if(data.errcode==0){
				$.prompt("验证码发送成功，请注意查收！");
				getCode(_this);
			}else{
				$.prompt(data.errmsg);
			}
		},
		error:function(data){
			$.prompt("系统错误，验证码发送失败");
		}
	});
});
	
	
