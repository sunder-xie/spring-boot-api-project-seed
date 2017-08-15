$(function() {
	/* init webuploader */
	var $list = $("#thelist"); // 这几个初始化全局的百度文档上没说明，好蛋疼。
	var $btn = $("#ctlBtn"); // 开始上传
	var thumbnailWidth = 100; // 缩略图高度和宽度
	var thumbnailHeight = 100;// （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
	/** 实现webupload hook，触发上传前，中，后的调用关键 * */
	// 获取到了文件的标记
	var fileMd5;
	var chunk;
	var chunks; // 总的分片数
	var filename;
	var hallId = $('#hallId').val();
	var parmeeId = $('#parmeeId').val();
	var attachType = $('#attachType').val();
	// 监听分块上传过程中的三个时间点
	WebUploader.Uploader.register({
		"before-send-file" : "beforeSendFile",
		"before-send" : "beforeSend",
		"after-send-file" : "afterSendFile"
	}, {
		// 时间点1：:所有分块进行上传之前调用此函数
		beforeSendFile : function(file) {
			$(".progress").show();
			var deferred = WebUploader.Deferred();
			// 1.计算文件的唯一标记，用于断点续传和秒传
			(new WebUploader.Uploader()).md5File(file, 0, 5 * 1024 * 1024)
					.progress(function(percentage) {
						$("#" + file.id).find("div.state").text("正在获取文件信息...");
					}).then(function(val) {
						fileMd5 = val;
						$("#" + file.id).find("div.state").text("成功获取文件信息");
						// 只有文件信息获取成功，才进行下一步操作
						deferred.resolve();
					});
			// 2.请求后台是否保存过该文件，如果存在，则跳过该文件，实现秒传功能
			return deferred.promise();
		},
		// 时间点2：如果有分块上传，则 每个分块上传之前调用此函数
		beforeSend : function(block) {
			var deferred = WebUploader.Deferred();
			chunk = block.chunk;
			chunks = block.chunks;
			$.ajax({
				type : "POST",
				url : contentpath + "/material/check",
				data : {
					// 文件唯一标记
					fileMd5 : fileMd5,
					// 当前分块下标
					chunk : block.chunk,
					// 当前分块大小
					chunkSize : block.end - block.start,
					// 总块数
					chunks : chunks
				},
				dataType : "json",
				success : function(response) {
					console.log(response);
					if (response.errcode == 1) {
						console.log('reject');
						// 分块存在，跳过该分块
						deferred.reject();
					} else {
						// 分块不存在或者不完整，重新发送该分块内容
						console.log('resolve');
						deferred.resolve();
					}
				}
			});
			this.owner.options.formData.fileMd5 = fileMd5;
			this.owner.options.formData.chunk = chunk;
			this.owner.options.formData.chunks = chunks;
			this.owner.options.formData.hallId = hallId;
			this.owner.options.formData.parmeeId = parmeeId;
			this.owner.options.formData.attachType = attachType;
			this.owner.options.formData.attachName = $('#attachName').val();
			return deferred.promise();
			// 1.请求后台是否保存过当前分块，如果存在，则跳过该分块文件，实现断点续传功能
		},
		// 时间点3：所有分块上传成功之后调用此函数
		afterSendFile : function() {
			// 1.如果分块上传，则通过后台合并所有分块文件
			$.ajax({
				type : "POST",
				url : contentpath + "/material/mergeChunks",
				data : {
					fileMd5 : fileMd5,
					filename : filename,
					chunk : chunk,
					chunks : chunks,
					hallId : hallId,
					parmeeId : parmeeId,
					attachType : attachType,
					attachName : $('#attachName').val()
				},
				success : function(data) {
					console.log(data);
					if (data.errcode == 0) {
	    				$.prompt("上传成功",function(){
	    					location.href=contentpath+"/material/queryPage/2";
	    				});
					} else {
						$.prompt("系统错误!");
					}
				}
			});
		}
	});

	var uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto : false,
		// swf文件路径
		swf : contentpath + '/js/Uploader.swf',
		// 是否要分片处理大文件上传。
		chunked : true,
		// 如果要分片，分多大一片？ 默认大小为5M.
		chunkSize : 5 * 1024 * 1024,
		// 如果某个分片由于网络问题出错，允许自动重传多少次？
		chunkRetry : 3,
		// 上传并发数。允许同时最大上传进程数[默认值：3]
		threads : 1,
		// 去重
		duplicate : true,
		// 文件接收服务端。
		server : contentpath + '/material/materialUpload',
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick : '#filePicker',
		// 只允许选择图片文件。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png,doc,docx,pdf',
			mimeTypes : "image/",
		},
		method : 'POST',
	});
	// 当有文件被添加进队列的时候
	uploader.on('fileQueued', function(file) {
		filename = file.name;
		if (file.size > 100 * 1024 * 1024) {
			$.prompt("文件大小不能超过100MB");
			return false;
		}
		if(filename.indexOf(".")!=-1){
			$('#attachName').val(filename.substring(0,filename.lastIndexOf(".")));
		}else{
			$('#attachName').val(filename);
		}
		$('div.webuploader-pick').text('已选择');
		if($list.is(':has(div)')){//已经选择过文件
			uploader.removeFile( $list.find('div').prop('id'),true );
		}
		$list.find('div').remove();
		/*$list.append('<div id="' + file.id + '" class="item">'
				+ '<h4 class="info">' + file.name + '</h4>'
				+ '<p class="state"></p>' + '</div>');*/
		$list.append('<div id="' + file.id + '" class="floatr item">'
				+ '<h4 class="info"></h4>'
				+ '</div>');
	});
	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
		/*var $li = $('#' + file.id), $percent = $li
				.find('.progress .progress-bar');
		// 避免重复创建
		if (!$percent.length) {
			$percent = $(
					'<div class="progress progress-striped active">'
							+ '<div class="progress-bar" role="progressbar" style="width: 0%">'
							+ '</div>' + '</div>')
					.appendTo($li).find('.progress-bar');
		}
		$li.find('p.state').text('上传中');
		$percent.css('width', percentage * 100 + '%');*/
		var percent = percentage.toString().substring(0,3)*100+'%';
		$('#upload_percent1').css('width',percent);
//		$('#upload_percent1').css({width:percentage*100+'%'});
		$('#upload_percent2').text(percent);
	});
	uploader.on('uploadSuccess', function(file) {
		$('#' + file.id).find('p.state').text('已上传');
	});
	uploader.on('uploadError', function(file) {
		$('#' + file.id).find('p.state').text('上传出错');
	});
	uploader.on('uploadComplete', function(file) {
		$('#' + file.id).find('.progress').fadeOut();
	});
	$btn.on('click', function() {
		if (!validate_empty_nofocus('attachName', '资料名称')) {
			return false;
		}
		uploader.upload();
	});
});