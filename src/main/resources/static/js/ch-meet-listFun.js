var meeParentId,hallId,urlIp = contentpath+'/meetingInfo/';
$(document).ready(function(){
	hallId=$("#hallId").val();
	meeParentId=$("#meeParentId").val();
});

function deleteSubById(obj){
	var chMeeId=$(obj).attr("id");
	  $.affirm("确认要删除子会议吗？", function(){
			$.ajax({
				url: urlIp + 'deleteSub',
				data: JSON.stringify({
					"meeId": chMeeId
				}),
				type: "POST",
				contentType: 'application/json',
				success: function (data) {
					if (data.code == 6350) {
						console.log(data.msg);
						$("#mee"+chMeeId).remove();
					} else {
						console.log('删除失败');
					}
				},
				error: function () {
					$.prompt('请求失败');
				}
			})
	  })
}

function createSubMeet(){
	window.location.href = urlIp+"toCreateSubMeeting?meeParentId="+meeParentId+"&hallId="+hallId;
}

function creatChMeet() {
	window.location.href = urlIp+"toCreateSuccess?meeId="+meeParentId+"&hallId="+hallId;
}