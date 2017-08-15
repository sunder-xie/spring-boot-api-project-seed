var $tiket_md = $("#tiket_md");
var $chmeet_md = $("#chmeet_md");
var $remark_md = $("#remark_md");
$(".js-tiket-on").on("click",function(){
    $tiket_md.show();
});
$(".js-chmeet-on").on("click",function(){
    $chmeet_md.show();
});
$(".js-remark-on").on("click",function(){
    $remark_md.show();
});
$(".modal-main .yes").on("click",function(){
    $(".modal-main").hide();
});
$(function(){
	$('#pass_btn').click(function(){
		$.affirm('确定通过审核?',function(){
			var id = $('#signup_id').val();
			$.ajax({
				url: contentpath + '/signup/signUpPass',
				type: "POST",
				async:false,
				contentType: 'application/json',
				data: JSON.stringify({'id':id}),
				success: function (data) {
					if (data.status == 0) {
						$.prompt('操作成功!',function(){
							location.reload();
						})
					} else {
						$.prompt('操作失败!');
					} 
				},
				error: function () {
					$.prompt('系统错误!');
				}
			})
		});
	});
	$('#reject_btn').click(function(){
		$.affirm('确定拒绝审核?',function(){
			$("#reject_hidden").show();
		});
	});
	$('#_yes').click(function(){
		var rejectReason = $('#reject_reason').val();
		console.log(rejectReason);
		var id = $('#signup_id').val();
		$.ajax({
			url: contentpath + '/signup/signUpReject',
			type: "POST",
			async:false,
			contentType: 'application/json',
			data: JSON.stringify({'id':id,'rejectReason':rejectReason}),
			success: function (data) {
				if (data.status == 0) {
					$.prompt('操作成功!',function(){
						location.reload();
					})
				} else {
					$.prompt('操作失败!');
				} 
			},
			error: function () {
				$.prompt('系统错误!');
			}
		});
		$("#reject_hidden").hide();
	});
	$('#_no').click(function(){
		$("#reject_hidden").hide();
	})
});