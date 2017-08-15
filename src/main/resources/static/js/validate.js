function validate_Chinese(str){
	//中文、英文、数字包括下划线
	if(!(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(str))){ 
		$.prompt("输入不能为空且只能为中文、英文、数字包括下划线");
		return false; 
	} 
	return true;
}
function validate_nNumber(str){
	//正整数
	if(!(/^[1-9]\d*|0$/.test(str))){ 
		$.prompt("输入只能为正整数");
		return false; 
	} 
	return true;
}
function validate_dNumber(str){
	//数字
	if(!(/^[0-9]*$/.test(str))){ 
		$.prompt("输入只能为数字");
		return false; 
	} 
	return true;
}
