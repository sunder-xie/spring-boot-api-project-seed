/*setTimeout("function",time) 设置一个超时对象

setInterval("function",time) 设置一个超时对象

SetInterval为自动重复，setTimeout不会重复。

clearTimeout(对象) 清除已设置的setTimeout对象

clearInterval(对象) 清除已设置的setInterval对象*/
var longcontect = null;
$(function () {
	//手机app二维码
	  var qrcode = new QRCode("appcodeBox");
    qrcode.makeCode(redirect);
    //微信开放平台 二维码
     var obj = new WxLogin({

        id:"wechatWebApp", 

        appid: webAppConfig.appid, 

        scope: webAppConfig.scope, 

        redirect_uri: webAppConfig.redirectUri,

        state: redirect,

        style: "",

        href: ""

      }); 
    longcontect = setInterval(sacnredirect,5000);
    setTimeout(contectTimeOut,5000*24);
 
});

function sacnredirect(){
	 $.ajax({
			url: contentpath+'/weixinoauth/scanRedirect/'+dubboxResult.dataId+'?redirect='+redirect
			, type: "GET"
			, contentType: 'application/json'
			, async: true
			, success: function (data) {
				if(data.status=='200'){
					window.location.href = contentpath+data.redirect;
				}
			}
			, error: function () {
				$.prompt('请求超时，请稍候再试');
			}
		});
}

function contectTimeOut(){
	clearInterval(longcontect);
	$.prompt("二维码失效，请刷新页面，并在2分钟内扫描二维码。");
}