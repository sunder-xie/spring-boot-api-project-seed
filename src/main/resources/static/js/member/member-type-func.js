	function add(){
		$.ajax({
				url:"add",
				type:"POST",
				data:"name="+$("#name").val()+"&type="+$("#type").val(),
				dataType:"text",
				success:function(data){
					if("1"==data){
						$.prompt("会员角色添加成功",function(){
							window.location.href="../type?addType="+$("#type").val();
						});
					}else{
						$.toastr("会员角色添加失败，请重试");
					}
				},
				error:function(){
					$.toastr("系统异常，请稍后再试");
				}
			});
	}
	function edit(){
		$.ajax({
			url:"edit",
			type:"POST",
			data:"name="+$("#name").val()+"&type="+$("#type").val()+"&id="+$("#editBtn").attr("typeId"),
			dataType:"text",
			success:function(data){
				if("1"==data){
					$.prompt("会员角色修改成功",function(){
						window.location.href="../type";
					});
				}else{
					$.toastr("会员角色修改失败，请重试");
				}
			},
			error:function(){
				$.toastr("系统异常，请稍后再试");
			}
		});
	}
	function verify(){
		var flag;
		$.ajax({
			url:"verify",
			async: false,
			type:"POST",
			data:"name="+$("#name").val()+"&type="+$("#type").val(),
			dataType:"text",
			success:function(data){
				flag=data;
			},
			error:function(){
				$.toastr("系统异常，请稍后再试");
			}
		});
		return flag;
	}
	$("#addBtn").click(function(){
		if (!$("#type").val()) {
			$.toastr("请选择会员类别");
		}else if (!$("#name").val()) {
			$.toastr("请输入角色名称");
		}else {
			var flag=verify();
			if (flag==0) {
				add();
			}else if (flag==1) {
				if ($("#type").val()==0) {
					$.toastr($("#name").val()+"已经在组织角色类别下存在");
				} else {
					$.toastr($("#name").val()+"已经在个人角色类别下存在");
				}
			}
		}
	});
	$("#editBtn").click(function(){
		if (!$("#type").val()) {
			$.toastr("请选择会员类别");
		}else if (!$("#name").val()) {
			$.toastr("请输入角色名称");
		}else {
			var flag=verify();
			if (flag==0) {
				edit();
			}else if (flag==1) {
				if ($("#type").val()==0) {
					$.toastr($("#name").val()+"已经在组织角色类别下存在");
				} else {
					$.toastr($("#name").val()+"已经在个人角色类别下存在");
				}
			}
		}
	});