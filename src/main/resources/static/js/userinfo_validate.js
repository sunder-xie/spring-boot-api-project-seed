function validate_empty(domId,domName){
	var domValue=$('#'+domId).val().trim();
	if(domValue==''){
		$.toastr(domName+"不能为空");
		$('#'+domId)[0].focus();
		return false;
	}
	return true;
}
function validate_empty_nofocus(domId,domName){
	var domValue=$('#'+domId).val().trim();
	if(domValue==''){
		$.toastr(domName+"不能为空");
		return false;
	}
	return true;
}
function validate_phone(phoneId){
	var phone =$('#'+phoneId).val().trim();
	if(phone==''){
		$.toastr('手机号不能为空');
		$('#'+phoneId)[0].focus();
		return false;
	}
	if(!(/^1[34578]\d{9}$/.test(phone))){ 
		$.toastr("不是合法的手机号码"); 
        return false; 
    } 
	return true;
}
function validate_number(domId,domName){
	var domValue=$('#'+domId).val().trim();
	if(domValue==''||isNaN(domValue)){
		$.toastr(domName+"必须为数字");
		$('#'+domId)[0].focus();
		return false;
	}
	return true;
}
function validate_email(domId){
	var email=$('#'+domId).val().trim();
	if(email==''){
		$.toastr("邮箱不能为空");
		$('#'+domId)[0].focus();
		return false;
	}
	if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email))){ 
		$.toastr("不是合法的邮箱"); 
        return false; 
    }
	return true;
}
function validate_url(domId,domName){
	var url=$('#'+domId).val().trim();
	var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
	if(url==''){
		$.toastr(domName+"不能为空");
		$('#'+domId)[0].focus();
		return false;
	}
	if(!reg.test(url)){
		$.toastr("不是正确的网址，请注意检查!");
		return false; 
	}
	return true;
}
function set_time(time){
	return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/,'');
}
//验证修改我的密码和确认密码
function validate_password(dompassword,domrepassword){
	var password=$('#'+dompassword).val().trim();
	var repassword=$('#'+domrepassword).val().trim();
	// 4. 判断两次密码是否一致
	if (password != repassword) {
	   $.toastr("两次密码不一致！");
	   return false;
	}
	var reg = /^[0-9A-Za-z]{6,}$/;
	if(!(reg.test(password))){
		 $.toastr("密码必须为6位以上数字与字母的组合!");
    	   return false;
	}
	return true;
}
//判断会议的开始时间和结束时间
function validate_time(meeStartTime,meeEndTime){
	var meeStartTime=$('#'+meeStartTime).val().trim();
	var meeEndTime=$('#'+meeEndTime).val().trim();
    if( meeStartTime==""){
    	$.toastr("请选择开始时间!");
    	return false;
    }
    if( meeEndTime==""){
    	$.toastr("请选择结束时间!");
    	return false;
    }
    //格式化开始时间和结束时间
    meeStartTime = meeStartTime+":00";
    meeEndTime = meeEndTime+":00";
    meeStartTime= meeStartTime.replace(/-/g,"/");
    meeEndTime = meeEndTime.replace(/-/g,"/");
    var dateStart = new Date(meeStartTime);
    var dateEnd = new Date(meeEndTime);
    if(dateStart>= dateEnd){
    	$.toastr("选择的结束时间必须大于开始时间!");
    	return false;
    }
    return true;
}

//判断修改会议的开始时间和结束时间
function validate_modifytime(meeStartTime,meeEndTime){
	var meeStartTime=$('#'+meeStartTime).val().trim();
	var meeEndTime=$('#'+meeEndTime).val().trim();
    if(meeStartTime>= meeEndTime){
    	$.toastr("选择的结束时间必须大于开始时间!");
    	return false;
    }
    return true;
}

//用于判断子会议的时间在主会议之间,和子会议的时间
function validate_meetingParentTime(meeStartTime,meeEndTime,meetingparentStartTime,meetingparentEndTime){
	if(!validate_modifytime(meeStartTime,meeEndTime)) return false;
	var meeStartTime=$('#'+meeStartTime).val().trim();
	var meeEndTime=$('#'+meeEndTime).val().trim();
	var meetingparentStartTime=$('#'+meetingparentStartTime).val().trim();
	var meetingparentEndTime=$('#'+meetingparentEndTime).val().trim();	
    if(meeStartTime < meetingparentStartTime){
    	$.toastr("选择的子会议时间必须在主会议时间之内!");
    	return false;
    }
    if(meeEndTime > meetingparentEndTime){
    	$.toastr("选择的子会议时间必须在主会议时间之内");
    	return false;
    }
    return true;
    
}




/*校验金额*/
function validate_money(domId){
	var money = $('#'+domId).val().trim();
	if(money=='0.0'||money=="0.00"){
		$.toastr("输入的价格格式不正确!");
		 return false;  
	}
	var reg  = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
	if(!reg.test(money)){
		$.toastr("输入的价格格式不正确!");
		 return false;  
	}
	 return true;  
}

//检验正整数
function validate_positive(domId,domName){
	var positive = $('#'+domId).val().trim();
	var reg = /^(0|[1-9][0-9]*)$/; //匹配非负整数（正整数 + 0）
	if(positive==''){
		$.toastr(domName+"不能为空");
		return false;
	}
	if(!reg.test(positive)){
		$.toastr(domName+"必须为正整数或0");
		 return false;  
	}
	 return true;  
}

//用户验证会议动态标题
function validate_meetingCoordinatorName(domId,domName)  
{  
    var userName = $('#'+domId).val().trim();
    if(userName.length > 25||userName.length < 4)  
    {  
    	$.toastr(domName+"字数长度必须在4到25之间!");  
        return false;  
    }  
    
    if(!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(userName))   
    {  
    	$.toastr(domName+"只能含有汉字、数字、字母、下划线!");  
        return false;  
    }  
    return true;  
}  

//验证微信号
function validate_weixi(domId){
	 var weixiName = $('#'+domId).val().trim();
	 var reg=/^[a-zA-Z\d_]{5,}$/;
	 if(!reg.test(weixiName)){
		 $.toastr("微信号格式不正确!");
		 return false;
	 }
	 return true;
}

//判断所选则的权限是否为空
function validate_permission(domId){
	 var permission = $('#'+domId).text().trim();
	 if(permission==""){
		 $.toastr("选择的权限不能为空!");
		 return false; 
	 }
	 return true;
}

//设置一个长度的的检验
//用于验证负责人姓名
function validate_namelenth(domId,domName,length)  
{  
    var userName = $('#'+domId).val().trim();
    if(userName.length > length)  
    {  
    	$.toastr(domName+"长度不能大于"+length);  
        return false;  
    }
    if(!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(userName))   
    {  
    	$.toastr(domName+"只能含有汉字、数字、字母、下划线!");  
        return false;  
    }  
    return true;  
}  
 //带有确认的会议厅名验证的验证
function validate_nameconfirm(domId,domConfirmId,domName,length)  
{  
  var userName = $('#'+domId).val().trim();
  if(userName==''){
	    $("#"+domConfirmId).hide();
		$.toastr(domName+"不能为空");
		$('#'+domId)[0].focus();
		return false;	
  }
  if(userName.length > length)  
  {  
	 $("#"+domConfirmId).hide(); 
  	 $.toastr(domName+"长度不能大于"+length);  
      return false;  
  }
  if(!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(userName))   
  {  
	$("#"+domConfirmId).hide();  
  	$.toastr(domName+"只能含有汉字、数字、字母、下划线!");  
      return false;  
  }  
  return true;  
}  

//验证图片格式的js
function validate_image(flag){	
	if(flag==1){
		$.toastr("请上传图片");  
		return false;  
	}
	if(flag==2){
		$.toastr("你上传的文件太大了！");  
		return false;  
	}
	if(flag==3){
		$.toastr("您的设备不支持FileReader");
		return false;  
	}
	return true;  
}
// js数组是否包含
function array_contains(arr, obj) {
  var index = arr.length;
  while (index--) {
    if (arr[index] === obj) {
      return true;
    }
  }
  return false;
}



function validate_arr(arr){
	if (arr.length==0) {
		$.toastr("选择的模块不能为空!"); 
		return false;	
	}
	return true;	
}	

function validate_length(domId,dom){
	   var length = $('#'+domId).val().trim();
	   if (length>dom) { //用于限定报名的人的
		   $.toastr("报名人数超出限制!");
		  return false;
	}
	   return true;
}

/**
计算指定输入框中字符串的长度
@param eleInput 指定的输入框或输入框的id, required
@param maxLength 期望的字符串最大长度, optional, 未指定时，默认取输入框的maxLength属性，未指定maxLength属性时，指定为100字符长度
@param nativeCharSize，一个汉字的长度，optional，因数据库编码不同，汉字所占用的长度也不同，比如UTF-8编码中，汉字占用3个字符的长度，而GBK编码中汉字则是2个字符的长度。未制定时，默认按2个字符长度计算
@return 返回计算结果
*/
function computeLength(eleInput, maxLength, nativeCharSize) {
    var nativeCharRegexp = /[\u4E00-\u9FFF]/;
    var string, char, length = 0;
    var ele = (typeof eleInput == 'string') ? document.getElementById(eleInput) : eleInput;
  if(maxLength == undefined) {
      maxLength = ele.maxLength || 32;
    }
     
    if(nativeCharSize == undefined) {
        nativeCharSize = 2;
    }
     
    string = (ele.value || '').split('');
     
    for(var i = 0, count = string.length; i < count; i ++) {
        char = string[i];
        if(nativeCharRegexp.test(char)) {
            length += nativeCharSize;
        } else {
            length ++;
        }
    }
     
    return length;
}

function checkLength(target,obj) {
      var maxLength = 32; // 这是允许输入的最大数
      var targetLength = computeLength(target, maxLength, 2);      // 这个是已输入的字符
      if (targetLength >32) {
      $("#"+obj).hide(); 
   	   $.toastr("输入的昵称不正确!");
   	   return false;
	}
      return true;
}


















