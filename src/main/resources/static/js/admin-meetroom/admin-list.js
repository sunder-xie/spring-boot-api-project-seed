$(function () {
    var _item;
    var adminlist = {
        // 管理员ID
        adminId: '1',
        // 入口函数
        init: function () {
            this.deleteAdmin();
            this.inviteAdmin();
        },
        // 点击删除执行
        deleteAdmin: function () {
            var _this = this;
            $(".js-remove-admin").on("click", function () {
                 _this.adminId = $(this).attr('data-admin-id');
            	$.affirm("确认要删除该角色吗？", function(){
                	$.ajax({
            			url : contentpath + '/meetingHall/deleteadminStrator/'+_this.adminId,
            			type : 'GET',
            			success : function(data) {
            				if (data) {
            					  // 执行删除成功后
                                $.prompt ("删除成功!",function(){
                                	location.reload();
                                	$("#delete-modal").show();
                                })
							} else {
								$.prompt("删除失败!");
							}
            			},
            			error : function(data) {
            				$.prompt("系统错误!");
            			}
            		})
            		
            	})
            })
        },

        // 邀请管理员
        inviteAdmin: function () {
            $("#invite-admin").on("click", function () {
                $("#invite-modal").show();
            });
            $("#inviteTrue").on("click", function () {
            	$("#invite-modal").hide();
            	var slt = $("input[name='role']:checked").val();         
                if (slt == undefined) {
                    $.prompt("请选择角色",function(){
                    	$("#invite-modal").show();
                    });
                } else {
                          window.location.href=contentpath+"/meetingHall/invite/"+hallId+"/"+slt;
                }
            })
        }
    };

    adminlist.init();
});