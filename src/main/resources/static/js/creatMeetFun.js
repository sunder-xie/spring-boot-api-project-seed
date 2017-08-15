var meeId,hallId,meeParentId,urlIp = contentpath+'/meetingInfo/';
$(document).ready(function(){
	hallId=$("#hallId").val();
	meeId=$("#meeId").val();
	meeParentId=$("#meeParentId").val();
});
function creatmeet(){
	//校验会议名称
	if(!validate_empty("meeName","会议名")){return false;}
	if(!validate_namelenth("meeName","会议名",30)){return false;}	
	//获取会议时间
	var meetingTime = $("#meetingTime").text();
	if(meetingTime=="请选择"){
		$.toastr("请选择会议时间!");
		return false;
	}
	if(!validate_time("meeStartTime","meeEndTime")){return false;}
	if(!validate_empty("meeAddress","会议地点")){return false;}
	// 创建会议
	var data = $("#creatmeet-form").serializeJson();
    $.ajax({
		url: urlIp + 'addMeeting',
		type : 'POST',
		data: JSON.stringify(data),
		contentType : 'application/json',
		success : function(data) {
			if (data.code == 1) {
			  meeId=data.resdata.meeId;
			  vue.modal=true;
			}
			else {
				if(data.code == 0){
					$.prompt(data.msg);
				}else{
					$.prompt(data.msg);
				}
			}
		},
		error: function () {
			$.prompt('请求失败');
		}
	});
}
function setTime(obj){
	var newstr = $(obj).val().replace(/-/g,'/'); 
	var date =  new Date(newstr); 
	var time_str = date.getTime().toString();
    $(obj).next('input').val(time_str);

}
function saveChildMeet(){
	//校验子会议名称
	if(!validate_empty("meeName","会议名")){return false;}
	if(!validate_namelenth("meeName","会议名",30)){return false;}	
	//获取子会议时间
	var meetingTime = $("#meetingTime").text();
	if(meetingTime=="请选择"){
		$.toastr("请选择会议时间!");
		return false;
	}
	//校验子会议时间是否在子会议时间之中
	if(!validate_meetingParentTime("meeStartTime","meeEndTime","meetingparentStartTime","meetingparentEndTime")){return false;}
	if(!validate_empty("meeAddress","会议地点")){return false;}
	var data = $("#creatchmeet_form").serializeJson();
    console.log(JSON.stringify(data));
	$.ajax({
		url: urlIp + 'addSubMeeting',
		data: JSON.stringify(data),
		type : 'POST',
		contentType: 'application/json',
		success: function (data) {
			console.log(data.msg);
			if (data.code == 6310) {
			$.prompt("创建成功",function(){						
				window.location.href = urlIp+"toMeetList?meeParentId="+meeParentId+"&hallId="+hallId;		
			});
			}
			else{
				$.prompt('保存会议失败');
			}
		},
		error: function () {
			$.prompt('请求失败');
		}
	})
}

function childtrue() {
	window.location.href = "toMeetList?meeParentId="+meeId+"&hallId="+hallId;
}

function childfalse() {
	window.location.href = urlIp+"toCreateSuccess?meeId="+meeId+"&hallId="+hallId;
}
