//管理知识库分类
"use strict";
$(function () {
    var adminRespository = {
        init: function () {
            this.addItem();
            this.closeOperateModal();
            this.cliickItem();
            this.editItem();

        },
        // 点击类名
        cliickItem: function () {
            $(document).on('click', ".js-repositoryItem", function (e) {
            	var t=$(this).children("input[name='isType']").val();
            	var id=$(this).children("input[name='id']").val();
            	$("#cid").val(id);
            	if ($("#typeLength").val()>1) {
            		toDataList();
        		}else{
        			if (t=='0') {
        				e.stopPropagation();
        				$("#operate_modal").show();
        			}else if(t=='1'){
        				toChildList();
        			}else if(t=='2'){
        				toDataList();
        			}
        		}
            })
        },
        //   添加类
        addItem: function () {
            $("#addItem").on("click", function () {
                $("#addItemModal").show();
            })
        },
        // 修改类名
        editItem: function () {
            $(document).on("click",".js-editItem", function () {
            	var id=$(this).parent().parent().parent().children("div[class='item js-repositoryItem']").children("input[name='id']").val();
            	$("#eid").val(id);
                $("#editItemModal").show();
            })
        },
        closeOperateModal: function () {
            $("#js_closeModal").on("click", function () {
                $("#operate_modal").hide();
            })

        }
    };
    //    关闭点击主类的操作选择框

    adminRespository.init();
    
    //点击添加子分类
    $("#addChType").click(function (){
    	toChildList();
    });
    
    //添加子分类跳转
	function toChildList(){
		location.href='adminList?parentId='+$("#cid").val();
	}
	
	//点击添加资料
	$("#addData").click(function (){
		toDataList();
    });
	
	//添加资料跳转
	function toDataList(){
		location.href='../knowledgeFile/adminList?parentId='+$("#cid").val();
	}
	
	//点击添加按钮ajax提交
	$("#addBtn").click(function(){
		if (validate_Chinese($("#cType").val())) {
			$.ajax({
				url:"/whoami/knowledgeType/add",
				type:"POST",
				data:$('#addForm').serialize(),
				dataType:"text",
				success:function(data){
					if("1"==data){
						$.prompt("分类添加成功",function(){
							window.location.reload();
						});
					}else if ("-1"==data) {
						$.toastr("分类不能超过4层");
					}else if ("-2"==data) {
						$.toastr("父类已保存资料");
					}else{
						$.toastr("分类添加失败，请重试");
					}
				},
				error:function(){
					$.toastr("系统异常，请稍后再试");
				}
			});
		} 
	});
	//点击修改按钮ajax提交
	$("#editBtn").click(function(){
		if (validate_Chinese($("#eType").val())) {
			$.ajax({
				url:"/whoami/knowledgeType/edit",
				type:"POST",
				data:$('#editForm').serialize(),
				dataType:"text",
				success:function(data){
					if("1"==data){
						$.prompt("分类修改成功",function(){
							window.location.reload();
						});
					}else{
						$.toastr("分类修改失败，请重试");
					}
				},
				error:function(){
					$.toastr("系统异常，请稍后再试");
				}
			});
		}
	});


});
//ajax删除分类
function deleteType(obj){
	var id=$(obj).attr("id");
	var isType=$(obj).attr("isType");
	var str;
	if (isType=="0") {
		str="确认删除吗？";
	}else {
		str="该类下有子类或者资料，确认删除吗？";
	}
	$.affirm(str, function(){
		$.ajax({
			url:"/whoami/knowledgeType/delete",
			type:"post",
			data:"id="+id,
			dataType:"text",
			success:function(data){
				if("1"==data){
					$.prompt("删除成功",function(){
						$(obj).parent().parent().parent().remove();
					});
				}else{
					$.toastr("删除失败，请重试");
				}
			},
			error:function(){
				$.toastr("系统异常，请稍后再试");
			}
		});
		
	})

}