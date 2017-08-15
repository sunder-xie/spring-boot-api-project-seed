$(function() {
	var hotelId=$('#hotel').val();
	var roomId=$('#roomId').val();
	if(null!=hotelId&&''!=hotelId&&!isNaN(hotelId)){
		$.ajax({
			url: contentpath + '/meetingUserRoom/selectRoomtype/'+hotelId,
			type: "POST",
			success: function (data) {
				$('#room').find('option').remove();
				$.each(data,function(index,dom){
					$('#room').append('<option data-count="'+(dom.roomNumber-dom.roomSpare-dom.normalReservedNum)+'" value='+dom.roomId+'>'+dom.roomType+'</option>');
				});
				if(null!=roomId&&roomId!=''&&roomId!=0){
					//酒店房间回显
					$('#room').val(roomId);
				}else{
					var count = $('#room').find("option:selected").attr('data-count');
					if(count<=0){
						$.prompt('该类型房间剩余数不足,请选择其它房间!',function(){
							$('#signup_btn').attr('disabled',true);
						})
					}else{
						if(!flag_hasSigned){
							$('#signup_btn').removeAttr('disabled');
						}
					}
				}
			},
			error: function () {
				$.prompt('获取房间信息失败');
			}
		})
	}
	//已选择子会议回显
	if(flag_hasSigned==true && array_contains(hasChoosedFieldIds,11)){
		$.each(subMeetings,function(index,dom){
			var $div = $('div.item[data-chmeetId='+dom.submeetingId+']');
			var newitem = " <li class='chmeet-item' data-chmeetId=" + dom.submeetingId +
			">" +
			"<div class='chmeet-info floatl'><span class=name'>" + $div.find('p').text() +
			"</span><span class='time'>" + $div.find('i:last').text() +
			"</span></div>" +
			"<input type='hidden' name='submeetingId' value=" + dom.submeetingId + ">" +
			"<span class='floatr remove-btn js-remove-chmeet'><img src="+contentpath+"/css/img/edit_icon_delete.png></span>" +
			"</li>";
			$(".selectChmeet").append(newitem);
		});
		$(".noinfo").hide();
	}
	/*根据酒店查询房间信息*/
	$('#hotel').change(function(){
		var hotelId=$(this).val();
		$.ajax({
			url: contentpath + '/meetingUserRoom/selectRoomtype/'+hotelId,
			type: "POST",
			success: function (data) {
				$('#room').find('option').remove();
				$.each(data,function(index,dom){
					$('#room').append('<option data-count="'+(dom.roomNumber-dom.roomSpare-dom.normalReservedNum)+'" value='+dom.roomId+'>'+dom.roomType+'</option>');
				})
			},
			error: function () {
				$.prompt('获取房间信息失败');
			}
		})
	});
	/*选择房间变化时*/
	$('#room').change(function(){
		//房间剩余数
		var count = $('#room').find("option:selected").attr('data-count');
		if(count<=0){
			$.prompt('该类型房间剩余数不足,请选择其它房间!',function(){
				$('#signup_btn').attr('disabled',true);
			})
		}else{
			if(!flag_hasSigned){
				$('#signup_btn').removeAttr('disabled');
			}
		}
	});
	// 会议报名
	$('#signup_btn').click(function(){
		if($('#realName').length>0 && !validate_empty('realName','真实姓名')){return false;}
		if($('#phone').length>0 && !validate_phone('phone')){return false;}
		if($('#email').length>0 && !validate_email('email')){return false;}
		if($('#unitId').length>0 && !validate_empty('unitId','单位')){return false;}
		if($('#post').length>0 && !validate_empty('post','职务')){return false;}
		if($('#sex').length>0){
			$('#sex').attr('disabled',false);//提交表单前移除disabled属性
		}
		var data = $("#sign_up_main").serializeJson('submeetingId');
		$.ajax({
			url: contentpath + '/signup/message',
			type: "POST",
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function (data) {
				if (data.status == 0) {
					location.href = contentpath + "/signup/success"
				} else if (data.status == 6400) {
					$.prompt('报名失败');
				} else {
					$.prompt('服务器不可用');
				}
			},
			error: function () {
				$.prompt('请求失败');
			}
		})
	});
	// 查询身份信息开始
	if($('#div_identity').length>0){
		var identityHtml = '';
		$.ajax({
			url: contentpath + '/signupField/identityListJson',
			type: "POST",
			success: function (data) {
				$.each(data.list,function(index,dom){
					if(index==0){
						identityHtml+='<option selected="selected" value='+dom.id+'>'+dom.identity+'</option>';
					}else{
						identityHtml+='<option value='+dom.id+'>'+dom.identity+'</option>';
					}
				});
				$('#identityId').html(identityHtml);
				if(flag_hasSigned){ //用户已经报名，回显用户选择的身份
					$('#identityId').val($('#hidden_identity').val());
				}
			},
			error: function () {
				$.prompt('请求失败');
				$('#signup_btn').attr('disabled',true);
			}
		})
	}
	// 查询身份信息结束
	
	// 查询单位信息初始化 2017-03-22
	if($('#div_unit').length>0){
		var unitHtml = '';
		$.ajax({
			url: contentpath + '/member/unit/selectList',
			type: "POST",
			success: function (data) {
				$('#unit_hidden').find('div.form-group').remove();
				$.each(data,function(index,dom){
					unitHtml+='<div class="form-group js-saveUnit" data-unitId="'+dom.id+'" data-typeId='+dom.memberTypeId+ ' @click="saveUnit()">'
		                       	+' <a href="javascript:;" >'+dom.unitName+'</a>'
		                        +'  </div>'
				});
				$('#unit_hidden').append(unitHtml);
				unitHtml='';
				//用户已经报名，单位信息回显
				var unitId = $('#unitId').val();
				if(flag_hasSigned){
					$('#unit_span').text($('div[data-unitId='+unitId+']').find('a').text());
				}
			},
			error: function () {
				$.prompt('请求失败');
				$('#signup_btn').attr('disabled',true);
			}
		})
	}
	//选中单位后回显，并查询会费,可报名人数等信息
	$(document).on("click",".js-saveUnit",function(){
		signup.go_basic();
		var typeId = $(this).attr("data-typeId");
		var unitId = $(this).attr("data-unitId");
		$("#unitId").val(unitId);
		$('#unit_span').text($(this).find("a").text());
		//请求后台查询付费等信息
		$.ajax({
			url: contentpath + '/signup/selectCountAndPay/'+typeId+'/'+unitId,
			type: "POST",
			success: function (data) {
				$.prompt('贵单位报名费用是'+data.cost+',可报名人数'+data.peopleNumber+'人,'+'已报'+data.roleId+'人',function(){
					if(data.peopleNumber<=data.roleId){
						$.toastr('贵单位报名剩余名额为0');
						$('#signup_btn').attr('disabled',true);
					}else{
						if(!flag_hasSigned){
							$('#signup_btn').removeAttr('disabled');
						}
					}
				});
			},
			error: function () {
				$.prompt('请求失败');
				$('#signup_btn').attr('disabled',true);
			}
		})
	})
}); 
//oninput事件动态查询单位信息
function f_searchUnit(unitName){
	var unitHtml = '';
	if(unitName.trim()==null){return false;}
	$.ajax({
		url: contentpath + '/member/unit/selectList',
		type: "POST",
		data: {"str":unitName.trim()},
		success: function (data) {
			$('#unit_hidden').find('div.form-group').remove();
			$.each(data,function(index,dom){
				unitHtml+='<div class="form-group js-saveUnit" data-unitId="'+dom.id+'" data-typeId='+dom.memberTypeId+ ' @click="saveUnit()">'
	                       		+' <a href="javascript:;" >'+dom.unitName+'</a>'
	                        +'  </div>'
			});
			$('#unit_hidden').append(unitHtml);
			unitHtml='';
		},
		error: function () {
			$.prompt('请求失败');
			$('#signup_btn').attr('disabled',true);
		}
	})
}
