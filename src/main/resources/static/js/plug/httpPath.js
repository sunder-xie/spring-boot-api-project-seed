var contentpath = $("#contextPath").val();
//判断是否是在手机微信上打开url
var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;