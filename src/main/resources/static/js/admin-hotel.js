$(function () {
    var adminHotel = {
        init: function () {
            this.delUserHotelInfo();
            this.delHotelRoom();
            this.cutSelectHotel();
            this.selectHotel();
        },
        // 切换选择酒店
        cutSelectHotel: function () {
            $(".js-cutHotel").on("click", function () {
                $(".page2").show().siblings().hide();
            })
        },
        // 删除房间信息
        delHotelRoom: function () {
        	  var _this = this;
              $(".js-delhtrm").on("click", function () {
                  $.affirm("确认要删除该房间信息么？",function(){
                 	  // 确认删除酒店信息
                   	var roomId = $(".js-delhtrm").attr("id");
                   	var hotelId = $(".js-delhtrm").attr("data-hotelId");
                   	console.log(hotelId);
                   	$.ajax({
               			url : contentpath + '/meetingHotel/deleteroomInfo/'+ roomId,
               			type : 'GET',
               			success : function(data) {
               				  // 执行删除成功后
               				if(data.code == "6360"){
                               $.prompt ("删除成功",function(){
                               	window.location.href = contentpath + "/meetingHotel/selectRooms?hotelId=" + hotelId;
                               })
               				}else{
               					$.prompt("删除失败");
               				}
               			},
               			error : function(data) {
               				$.prompt("系统错误");
               			}
               		})
                  })  
              })
        },
        // 确认删除该酒店信息
        delHotelRoom_true: function () {
            // 执行删除成功后
            $.prompt ("删除成功");
        },
        // 点击删除用户酒店信息
        delUserHotelInfo: function () {
            var _this = this;
            $(".js-delUserHotel").on("click", function () {
               // $.affirm("确定要删除用户酒店信息？", _this.delUserHotelInfo_true)
                $.affirm("确认要删除该酒店信息么？", function(){
              	  // 确认删除酒店信息
              	var hUId = $(".js-delUserHotel").attr("id");
              	console.info(hUId);
              	$.ajax({
          			url : contentpath + '/meetingUserRoom/deleteUserRoom/'+hUId,
          			type : 'GET',
          			success : function(data) {
          				  // 执行删除成功后
                          $.prompt ("删除成功",function(){
                          	location.reload();
                          })
          			},
          			error : function(data) {
          				$.prompt("系统错误");
          			}
          		})
              })
            })
        },
        // 确认删除用户酒店信息
        delUserHotelInfo_true: function () {
            $.prompt ("删除成功！")
        },
        // 选择酒店
        selectHotel: function () {
            $(".js-selectHotel").on("click", function () {
                var hotelId = $(this).attr("data-hote-Id");
                var id = $(this).val();
               console.info(hotelId);
                var hotelName = $(this).find(".name").text();
                $(".page1").show().siblings().hide();
                $(".js-cutHotel").attr("data-hotel-Id", hotelId).find(".form-text").text(hotelName);
            	$.ajax({
        			url : contentpath + '/meetingUserRoom/selectRoomtype/'+id,
        			type : 'GET',
        			success : function(data) {
        				if (data != null) {
        				 	console.info(data);
        				 	var hotel = [];
        				 	hotel = data[0];
        				 	$("#roomtype").find("option").remove();
        				 	var html = "<option value='"+hotel.roomId+"'>"+hotel.roomType+"</option>";
        				 	$("#roomtype").append(html);
        				 	$("#h").val(id);
        				}
        			},
        			error : function(data) {
        				$.prompt("系统错误");
        			}
        		})
            })
        }
    };
    adminHotel.init();
});

function deleteHotelRoom(hotelId){
	$.affirm("确认要删除该酒店信息么？", function(){	
	 	var flag ;
    	$.ajax({
			url:contentpath+'/meetingHotel/deleteUserRoomConfirm',
    		type:'post',
    		async:false,
    		data: "hUId="+hotelId,
    		success:function(data){
    			if (data) {  				
					flag=true;
				}else{
				    flag=false;
				}
    		}
		});
		if (flag) {
			$.toastr("酒店已有人报名!");
			return false;	
		}		
		$.ajax({
			url : contentpath + '/meetingHotel/deleteHotelInfoById/'+hotelId,
			type : 'GET',
			success : function(data) {
              $.prompt ("删除成功",function(){
              	location.reload();
              });
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		});
	});
}