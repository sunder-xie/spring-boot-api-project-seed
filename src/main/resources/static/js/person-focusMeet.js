	var futurepage = 0;
	var overpage = 0;
	var fastDFSurl=null;
	
	var tmpl = $.templates("#future_jsrender");
	var overtmpl = $.templates("#over_jsrender");
	
	$(function(){
		
		futurepage = 1;
		overpage=0;
		futureList();
		
	    $(".js_nostart_btn").on("click",function(){
	        $(this).addClass('active').siblings().removeClass('active');
	        $("#nostarted_list").show().siblings().hide();
	    });
	    
        $(".js_start_btn").on("click",function(){
	        $(this).addClass('active').siblings().removeClass('active');
	        $("#started_list").show().siblings().hide();
	        overList();
        });
        
        
		
	});

	
	function futureList(){
		$.ajax({
			url : contentpath + '/meetingLinkUser/future/'+futurepage+'/5',
			type : 'GET',
			contentType : 'application/json',
			success : function(data) {
	// 					console.log(data);
				fastDFSurl = data.fastDFSurl;
				var html = tmpl.render(data.pageInfo.list);
				document.getElementById("nostarted_list").innerHTML = html;
				itemNum();
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	}
	
	function overList(){
		futurepage = 0;
		overpage = 1;
		 
		$.ajax({
			url : contentpath + '/meetingLinkUser/over/'+overpage+'/5',
			type : 'GET',
			contentType : 'application/json',
			success : function(data) {
				console.log(data);
				fastDFSurl = data.fastDFSurl;
				var html = overtmpl.render(data.pageInfo.list);
				document.getElementById("started_list").innerHTML = html;
				itemNum();
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	}
	
	$.views.converters("fastDFSurl", function(url) {
		if (null != url && "" != url && null != fastDFSurl && "" != fastDFSurl) {
			return fastDFSurl + url;
		}
		return "../../css/img/pic1@2x.png"
	});
	
	function itemNum() {
		var fansItem = $("#fans-list").find(".meet-item").size();
		if (fansItem == 0) {
			$(".no-meetRoom").show();
		} else {
			$(".no-meetRoom").hide();
		}
	}
	
	var loading = false; //状态标记
	$(".main-cantainer").infinite().on("infinite", function() {
		 if (loading){
			 return;
		 }
		 
	    loading = true;
	    
	    setTimeout(function () {
	
	    	if(futurepage != 0 && overpage == 0){
				futurepage += 1;	
				$.ajax({
					url : contentpath + '/meetingLinkUser/future/' + futurepage + '/5',
					type : 'GET',
					contentType : 'application/json',
					success : function(data) {
						console.log(data);
						var html = tmpl .render(data.pageInfo.list);
						$("#nostarted_list").append(html);
					},
					error : function(data) {
						$.prompt("系统错误");
					}
				})
			}
	    	
	    	if(futurepage == 0 && overpage != 0){
	    		overpage += 1;
			    $.ajax({
			    	url : contentpath + '/meetingLinkUser/over/'+overpage+'/5',
					type : 'GET',
					contentType : 'application/json',
					success : function(data) {
						console.log(data);
						var overhtml = overtmpl.render(data.pageInfo.list);
						$("#started_list").append(overhtml);			
					},
					error : function(data) {
						$.prompt("系统错误");
					}
				})
	    	}	
			
	    loading = false;
	        	
		}, 500); //模拟延迟
	});