// 取出用户信息
//var user = JSON.parse(localStorage.getItem("user"));
//var existMeeHall = JSON.parse(localStorage.getItem("existMeeHall"));
//var creMeetHallId = localStorage.getItem("create_meet_hall_id");

/**
 * 判断当前用户是否有会议厅
 */
function isExistMeeHall() {
	$.ajax({
		url : contentpath + '/meetinghall/room/',
		type : "GET",
		contentType : 'application/json',
		async : true,
		success : function(data) {
			if (data.status == "6509") {
				window.location.href = "no-meetRoom.html";
			} else {
				// 存入会议厅信息
				localStorage.setItem("existMeeHall", JSON.stringify(data));
				window.location.href = "meet-room.html";
			}
		},error : function() {
			$.prompt('请求失败!');
		}

	})

}

/**
 * 创建完会议厅后
 * 根据会议厅id查询会议厅信息
 */
/*function queryByIdMeeHall() {

	if (creMeetHallId != null) {
		$.ajax({
			url : contentpath + '/meetinghall/' + creMeetHallId,
			type : "GET",
			contentType : 'application/json',
			async : false,
			success : function(data) {
				console.log(data);
				
				if (data == null) {
					alert('未查询到会议厅信息');
				} else {
					// 存入会议厅信息
					localStorage.setItem("existMeeHall", JSON.stringify(data));
					window.location.href = "meet-room.html";
				}
			},

			error : function() {
				alert('请求失败');
			}

		})

	}else{
		alert("获取不到会议厅信息");
	}

}*/

