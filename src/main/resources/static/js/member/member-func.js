function choose_type(type,typeName){
	$.affirm("您选择的是"+typeName+",选择之后将无法修改，是否继续?",function(){
		location.href=contentpath+"/chooseMember/"+type;
	})
}