$(function(){
    var tmpl = $.templates("#news_jsrender");//参会人员模板
	var pageNum = 1;
	var loading = false; //是否正载加载中
   	var hasmore = true; //是否有更多内容
	var isSearch = false; //是否正在搜索情况下
    $(".main-cantainer").infinite().on("infinite", function () {
        if (loading) return;
        loading = true;
        // 参会人员滑动加载
    	if(hasmore){
    		$(".loading").show();
    		pageNum += 1;
    		if(isSearch){name = $('#search_input').val();}else{name='';}
			$.ajax({
				url : contentpath + '/signup/list/search',
				type : 'POST',
				contentType:'application/json',
				data:JSON.stringify({'pageNum':pageNum,'name':name}),
				success : function(data) {
					console.log(data);
					if (data.list.length==0) {
						hasmore=false;
						$(".loading span").text("没有更多内容了!");
					}else{
						var html = tmpl.render(data.list);	
						$(".loading").before(html);	
						if(!isPend){$('span.state').remove();}
					}
					loading = false;
				},
				error : function(data) {
					$.prompt("系统错误");
				}
			})
    	}
    });
    // 第一次进入页面，加载10条数据
 	$.ajax({
		url : contentpath + '/signup/list/search',
		type : 'POST',
		contentType:'application/json',
		data:JSON.stringify({'pageNum':pageNum,'name':$('#search_input').val()}),
		success : function(data) {
			console.log(data);
			if (data.list.length==0) {
				hasmore=false;
			}else{
				var html = tmpl.render(data.list);	
				$(".loading").before(html);	
				if(!isPend){$('span.state').remove();}
			}
			loading = false;
		},
		error : function(data) {
			$.prompt("系统错误");
		}
	});
	// 参会人员搜索
	$('#search_btn').click(function(){
		pageNum=1;
		hasmore=true;
		loading = false;
		isSearch = true;
		$(".loading").hide();
		var name = $('#search_input').val();
		$.ajax({
			url : contentpath + '/signup/list/search',
			type : 'POST',
			contentType:'application/json',
			data:JSON.stringify({'pageNum':pageNum,'name':name}),
			success : function(data) {
				$('ul').find('li').remove();
				console.log(data);
				if (data.list.length==0) {
					hasmore=false;
				}else{
					var html = tmpl.render(data.list);	
					$(".loading").before(html);	
					if(!isPend){$('span.state').remove();}
				}
				loading = false;
			},
			error : function(data) {
				$.prompt("系统错误");
			}
		})
	})
});