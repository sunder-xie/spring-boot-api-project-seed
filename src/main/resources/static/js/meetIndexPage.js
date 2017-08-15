//页面加载之后执行
	$(function() {	
		meetingPage = 1;
		meetingRoomPage=0;
		meeting();
	}); 
	
	
	$("#meeting").click(
			function () {
		$("#meeting").attr("class","index-tab-btn active");
		$("#meetingRoom").attr("class","index-tab-btn");
		meetingPage = 1;
		meetingRoomPage=0;
		loading = false; 
		meeting();		
	});
	
	function meeting(){
		$.ajax({
			url : contentpath + '/meetingInfo/selectPopMeetingInfo',
			type : 'POST',
			data : JSON.stringify({"pageNum":meetingPage,"pageSize":10}),
			contentType : 'application/json',
			success : function(data) {
				console.log(data);
				if (data.code == 6360) {
					var html = tmpl.render(data.page.list);
					$("#meethallInfo").empty();
					document.getElementById("meetingInfo").innerHTML = html;
				} else {
					$.prompt(data.msg);
				}
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	}
	
	
	/*****************热门会议厅*******************************/	
	$("#meetingRoom").click( 
		function () { 
			 meetingPage = 0;
			 meetingRoomPage = 1;
			 loading = false; 
		    $("#meeting").attr("class","index-tab-btn");
			$("#meetingRoom").attr("class","index-tab-btn active");
			$.ajax({
				url : contentpath + '/meetingHall/selectMeetingHall',
				type : 'POST',
				data : JSON.stringify({"pageNum":meetingRoomPage,"pageSize":10}),
				contentType : 'application/json',
				success : function(data) {
					console.log(data);
					var htmlroom = tmplRoom.render(data.list);
					$("#meetingInfo").empty();
					document.getElementById("meethallInfo").innerHTML = htmlroom;							
				},
				error : function(data) {
					$.prompt("系统错误");
				}
			})
	});

    var loading = false; //状态标记
    $(".main-cantainer").infinite().on("infinite", function () {
        if (loading) return;
        loading = true;
      
        $(".loading span").text('正在加载更多');
        	//会议厅滑动加载
        	if(meetingPage != 0&&meetingRoomPage == 0){
        		meetingPage += 1;	
				$.ajax({
					url : contentpath + '/meetingInfo/selectPopMeetingInfo',
					type : 'POST',
					data : JSON.stringify({"pageNum":meetingPage,"pageSize":10}),
					contentType : 'application/json',
					success : function(data) {
						console.log(data);
						if (data.page.list.length==0) {
							$(".loading span").text("没有更多内容了!");
							return;
						}
						if (data.code == 6360) {
							var html = tmpl.render(data.page.list);	
							$("#meetingInfo").append(html);		
						} else {
							$.prompt(data.msg);
						}
						loading = false;
					},
					error : function(data) {
						$.prompt("系统错误");
					}
				})
        	}
        	//会议厅滑动加载
        	if(meetingPage == 0&&meetingRoomPage != 0){
        		meetingRoomPage+=1;
			    $.ajax({
					url : contentpath + '/meetingHall/selectMeetingHall',
					type : 'POST',
					data : JSON.stringify({"pageNum":meetingRoomPage,"pageSize":10}),
					contentType : 'application/json',
					success : function(data) {
						console.log(data);
						if (data.list==0) {
							$(".loading span").text("没有更多内容了!");
							return;
						}
						var htmlroom = tmplRoom.render(data.list);
						$("#meethallInfo").append(htmlroom);
						loading = false;
					},
					error : function(data) {
						$.prompt("系统错误");
					}
				})
        	}	
    });
    
  //热门会议的关注
    function meetingbetton(obj){
   	var MeeId=$(obj).attr("id");
   	if ($(obj).text()=='关注') {
   		$.ajax({
   			url : contentpath + '/meetingInfo/meetingbetton',
   			type : 'POST',
   			data : JSON.stringify({"meeId":MeeId}),
   			contentType : 'application/json',
   			success : function(data) {
   				if (data==1) {
   					$(obj).text('已关注');
   					$(obj).attr("class","disfocus-btn");
					}else{
						$.prompt("关注失败");
					}
   			},
   			error : function(data) {
   				$.prompt("系统错误");
   			}
   		})	
   		
		}else{
			//热门会议取消关注
			$.ajax({
   			url : contentpath + '/meetingInfo/cancelMeetingbetton',
   			type : 'POST',
   			data : JSON.stringify({"meeId":MeeId}),
   			contentType : 'application/json',
   			success : function(data) {
   				if (data==1) {
   					$(obj).text('关注');
   					$(obj).attr("class","focus-btn");
					}else{
						$.prompt("取消关注失败");
					}
   			},
   			error : function(data) {
   				$.prompt("系统错误");
   			}
   		})
		}
    }
    //热门会议厅的关注
   function meetHallbetton(obj){
   	var hallId=$(obj).attr("id");
   	if ($(obj).text()=='关注') {
   		$.ajax({
   			url : contentpath + '/hallLinkUser/follow/'+hallId,
   			type : 'POST',
   			contentType : 'application/json',
   			success : function(data) {
   				if (data) {
   					$(obj).text('已关注');
   					$(obj).attr("class","disfocus-btn");				
					}else{
						$.prompt("关注失败");
					}
   			},
   			error : function(data) {
   				$.prompt("系统错误");
   			}
   		})	
		}else{
			//热门会议厅取消关注
			$.ajax({
   			url : contentpath + '/hallLinkUser/follow/'+hallId,
   			type : 'DELETE',
   			contentType : 'application/json',
   			success : function(data) {
   				if (data) {
   					$(obj).text('关注');
   					$(obj).attr("class","focus-btn");
					}else{
						$.prompt("取消关注失败");
					}
   			},
   			error : function(data) {
   				$.prompt("系统错误");
   			}
   		})
	 }  	
  }    
    