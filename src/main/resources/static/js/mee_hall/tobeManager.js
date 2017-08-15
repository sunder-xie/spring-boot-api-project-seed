//提交表单

//	
//maps.put("status", "400");
//maps.put("msg", "邀请链接超时");
//			
//maps.put("status", "401");
//maps.put("msg", "该用户已经是该会议厅的管理员了");
//		
//maps.put("status", "200");
//maps.put("msg", "成为管理员成功");
//			
//maps.put("status", "404");
//maps.put("msg", "成为管理员失败");
			

$("#register_btn").on("click", function (e) {	
	var roleId = $("#roleId").val();
	var hallId = $("#hallId").val();
		$.ajax({
			url: contentpath+'/meetingHall/tobemanager/'+hallId+'/'+roleId
			, type: "GET"
			, contentType: 'application/json'
			, async: true
			, success: function (data) {
				if(data.status=='200'){
					$.prompt('成为管理员成功!');
				}else if(data.status='400'){
					$.prompt('邀请链接超时!');
				}else if(data.status='401'){
					$.prompt('该用户已经是该会议厅的管理员了!');
				}else if(data.status='404'){
					$.prompt('成为管理员失败!');
				}
			
			}
			, error: function () {
				$.prompt('操作超时，请稍候再试');
			}
		});
	
});