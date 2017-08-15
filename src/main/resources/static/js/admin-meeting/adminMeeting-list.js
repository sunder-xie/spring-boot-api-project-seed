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
            	$.affirm("确认要删除该管理员吗？", function(){
                	$.ajax({
            			url : contentpath + '/meeting/deletemeetingetingManage/'+_this.adminId,
            			type : 'GET',
            			success : function(data) {
            				if (data) {
            				// 执行删除成功后
                            $.prompt ("删除成功",function(){
                            	location.reload();//刷新页面
                            	/*$("#delete-modal").show();*/
                            })
						   }
            			},
            			error : function(data) {
            				$.prompt("系统错误");
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
                /*var slt = $("#selectRole").val();*/
            	$("#invite-modal").hide();
                var slt = $("input[name='role']:checked").val();
                if (slt == undefined) {
                    $.prompt("请选择角色")
                } else {
                          window.location.href=contentpath+"/meeting/inviteMeeting/"+hallId+"/"+meeId+"/"+slt;
                }
            })
        }
    };

    adminlist.init();
});