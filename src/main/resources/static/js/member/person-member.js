$(function () {
    var personMember = {
        init: function () {
            this.cutSelectrole();
            this.saveRole();
            this.saveMeeting();
            this.delMember();
            this.delMemberdues();
            this.cutSelectdues();
        },
        userId:"",
        //   删除个人信息
        delMember: function () {
        	var _this =this;
            var callback = this.delMemberTrue;
            $(".js-delMember").on("click", function () {
            	_this.userId=$(this).parents(".info-item").attr("data-person-Id");
                $.affirm("确认要删除么？", callback)
            })
        },
        // 确认删除
        delMemberTrue: function () {
            // 这里写删除的AJAX
        	$.ajax({
				url:'/whoami/member/person/delete',
				type:'post',
				async:false,
				success:function(data){
					if(data.status==0){
		  				$.prompt("删除成功",function(){
		  					location.reload();
	    				});
					}else{
						$.prompt(data.msg);
					}
				},
				error:function(data){
					$.prompt('系统错误!');
				}
			})
        },
        // 删除个人会费
        delMemberdues: function () {
        	var _this =this;
            var callback = this.delMemberduesTrue;
            $(".js-delMemberDues").on("click", function () {
            	_this.userId=$(this).parents(".info-item").attr("data-person-Id");
                $.affirm("确认要删除么？", callback);
            })
        },
        // 确认删除
        delMemberduesTrue: function () {
            // 这里写删除的AJAX
        	$.ajax({
				url:contentpath+'/personal/cost/del/'+personMember.userId,
				type:'post',
				async:false,
				success:function(data){
					if(data.status==0){
						$.prompt("删除成功",function(){
		  					location.reload();
	    				});
					}else{
						$.prompt(data.msg);
					}
				},
				error:function(data){
					$.prompt('系统错误!');
				}
			})
        },
        // 切换选择角色
        cutSelectrole: function () {
            $(".js-cutSelectrole").on("click", function () {
                $(".page2").show().siblings().hide();
            })
        },
        // 切换选择选择会议
        cutSelectdues: function () {
            $(".js-cutSelectdues").on("click", function () {
                $(".page3").show().siblings().hide();
            })
        },
        // 保存角色
        saveRole: function () {
            $(".js-saveRole").on("click", function () {
            	var roleName=$('input:radio[name=role]:checked').prop('title');
            	if(null==roleName||''==roleName){}
            	$('#roleSelect').text(roleName);
                $(".page1").show().siblings().hide();
            })

        },
        // 保存会议
        saveMeeting: function () {
        	$(".js-saveMeeting").on("click", function () {
        		var meetingName=$('input:radio[name=meeting]:checked').prop('title');
        		if(null==meetingName||''==meetingName){meetingName='请选择';}
        		$('#meetingSelect').text(meetingName);
        		$(".page1").show().siblings().hide();
        	})
        	
        }
    };
    personMember.init();
});