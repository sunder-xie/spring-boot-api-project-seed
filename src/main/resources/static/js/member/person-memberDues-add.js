$(function(){
    	var hallId=$('#hallId').val();
    	$('#role_btn').click(function(){
    		var roleId=$('input:radio[name=role]:checked').val();
    		if(roleId==null||roleId==''){return false;}
    		$.ajax({
    			url:contentpath+'/personal/cost/'+hallId+'/'+roleId,
    			type:'post',
    			async:false,
    			success:function(data){
    				$('div.liu').remove();
    				$.each(data,function(i,dom){
    					//手动拼接
    					$('#div_meeting').prepend('<div class="form-group liu"><label class="floatl">'+dom.meeName+'</label><span class="floatr"><input type="radio" name="meeting" title='+dom.meeName+' value="'+dom.meeId+'"></span></div>');
    				});
    				//选择框再次初始化
    				$('input').iCheck({
   		    	    	checkboxClass: 'icheckbox_flat-red',
   		    	    	radioClass: 'iradio_flat-red'
    		    	});
    			},
    			error:function(data){
    				$.prompt('系统错误!');
    			}
    		})
    	});
    	$('#person_btn').click(function(){
    		var roleId=$('input:radio[name=role]:checked').val();
    		if(roleId==null||roleId==''){$.prompt('请选择角色!');return false;}
    		$('#roleId').val(roleId);
    		var meeParentId=$('input:radio[name=meeting]:checked').val();
    		if(meeParentId==null||meeParentId==''){$.prompt('请选择会议!');return false;}
    		$('#meeParentId').val(meeParentId);
    		if(!validate_number('cost','会费')){return false;}
    		//序列化表单数据
    		var data=$('#person_form').serializeJson();
    		$.ajax({
    			url:contentpath+'/personal/cost/add',
    			type:'post',
    			contentType : 'application/json',
    			data:JSON.stringify(data),
    			async:false,
    			success:function(data){
    				if(data.status==0){
    					$.prompt("添加成功",function(){
    						location.href=contentpath+"/personal/cost/list/"+hallId;
	    				});
    				}else{
    					$.prompt(data.msg);
    				}
    			},
    			error:function(data){
    				$.prompt('系统错误!');
    			}
    		})
    	});
    	$('input').iCheck({
	    	checkboxClass: 'icheckbox_flat-red',
	    	radioClass: 'iradio_flat-red'
	    });
    });