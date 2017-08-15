   var _this;
   
   //点击删除,委托给document管理，在jsrender动态添加时的元素也会起作用
   $(document).on("click",".js-modal-btn",function (e) {
           _this = this;
           //field_id = $(this).parents(".form-group").data("field-id");
           $(".modal-main").show();
           e.preventDefault();
       });
       
    //确认删除
   $(".modal-main .yes").on("click", function () {
	   $(".modal-main").hide();
	   var attachId=$(_this).parents(".article-item").data('article-id');
	   $.ajax({
	        url: contentpath+'/material/del/'+attachId,
	        type: 'POST',
	        success: function(data){
	        	console.log(data);
	        	if(data.errcode==0){
	  				$.prompt("删除成功!",function(){
	  					location.reload();
    				});
	        	}else{
	        		$.prompt("删除失败!");
	        	}
	        }
   		});
   });
   
   $(".modal-main .no").on("click", function () {
	     $(".modal-main").hide();
   });
   
   var loading = false; //状态标记
   var hasmore = true;
    $(".main-cantainer").infinite().on("infinite", function () {
        if (loading) return;
        loading = true;
        //会议厅滑动加载
    	if(hasmore){
    		$(".loading").show();
    		meetingPage += 1;	
			$.ajax({
				url : contentpath + '/material/queryPage/2/'+meetingPage,
				type : 'POST',
				success : function(data) {
					console.log(data);
					if (data.list.length==0) {
						hasmore=false;
						$(".loading span").text("没有更多内容了!");
					}else{
						var html = tmpl.render(data.list);	
						$(".loading").before(html);	
						if(permissions!='permissions'){
							//没有权限时隐藏删除按钮
							$('button.btn-orgin').remove();
						}
						if(p=="phone"){
					    	$('a').removeAttr('download');
					    }
					}
					loading = false;
				},
				error : function(data) {
					$.prompt("系统错误");
				}
			})
    	}
    });

