//查看知识库
$(function () {
	 //ajax查询子分类
	 function selectChList(pId){
		 var r;
		 $.ajax({
				url:"/whoami/knowledgeType/chList",
				async: false,
				type:"POST",
				data:"parentId="+pId,
				dataType:"json",
				success:function(data){
					r=data;
				},
				error:function(){
					$.toastr("系统异常，请稍后再试");
				}
			});
		 return r;
	 }
	 
	 //页面添加子分类
	 function addchlist(id,_this){
		 var list=selectChList(id);
		 var n;
		 for(x in list){
			 var str="<li>";
			 if (list[x].isType==2) {
				 var str=str+"<a href='../knowledgeFile/list?parentId="+list[x].id+"' select='true'>";
			}else{
				var str=str+"<a href='javascript:;' select='true'>";
			}
			 var str=str+"<span class='rotate0reg'>";
			 if ("repository-thirdList"==_this.next("ul").attr("class")) {
				 var str=str+"<img src='/whoami/css/img/repository/folding_btn_third_class.png' alt=''>";
			}else if ("repository-fourthList"==_this.next("ul").attr("class")) {
				var str=str+"<img src='/whoami/css/img/repository/folding_btn_fourth_class.png' alt=''>";
			}
			 var str=str+"</span>";
			 var str=str+list[x].type;
			 var str=str+"<input value='"+list[x].id+"' class='0' type='hidden'>";
			 var str=str+"</a>";	
			 var str=str+"<ul class='repository-fourthList' hidden></ul>";
			 var str=str+"</li>";
			 n =_this.next("ul").append(str);
		 }
		 if (n) {
			 n.on('click',"[select = true]",function(){
				 var _this = $(this);
				 dropDown(_this);
			 });
		}
	 }
	 // 多级菜单下拉
	 function dropDown(_this){
		 
		 var $nextList = _this.next("ul");
		 var id=_this.children("input[type='hidden']").val();
		 if ("0"==_this.children("input[type='hidden']").attr("class")) {
			 addchlist(id,_this);
			 _this.children("input[type='hidden']").removeClass("0").addClass("1");
		 }
		 _this.children("span").removeClass("rotate0reg").addClass("rotate90reg");
		 $nextList.show();
	 }
	 
	$("[select = true]").on("click", function () {
		var _this = $(this);
		dropDown(_this);
	});
}); 
