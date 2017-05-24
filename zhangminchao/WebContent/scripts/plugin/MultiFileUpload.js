/**
 * 自己实现的文件上传的工具类
 */
;(function($) {
  
  MultiFileUpload = function(options, $element) {
    this.options = options; 
    //this.element = $element;
    this.fileDataCache = {};
    this.setOptions();
    this.__creatComponent();
    this.bindFileChange();
    if ($.browser.msie && $.browser.version == "8.0" || $.browser.safari) { // ie8需要点击file本身才允许提交(form提交访问拒绝BUG修复)
    	$element.append(this.form);
   	    this.fileInput.width($element.width());
   	    this.fileInput.height($element.height());
    } else {
    	$element.on("click", $.proxy(this.__openFile, this)); 
    }
  };
  
  MultiFileUpload.prototype = {
      // 设置选项信息
      setOptions : function(options) {
    	this.options.fieldId = this.options.fieldId || "MultiFileUploadComponent";
        this.options.uploadUrl = this.options.uploadUrl || appServer + "/ajax/resume/multiUploadFile.htm"; // url
        this.options.onUploadSuccess = this.options.onUploadSuccess || function(e) {}; // 上传成功之后执行的回调函数
        this.options.onUploadStart = this.options.onUploadStart || function(e) {}; // 开始上传前执行的回调函数
        this.options.onUploadComplete = this.options.onUploadComplete || function(e) {}; // 上传结束前执行的回调函数
        this.options.totalBytes = 0; // 总的文件字节数
        this.options.loadedBytes = 0; // 已下载的文件字节数
        this.options.messageArr = [];  // 消息数组
      },
      
      __creatComponent : function() {
    	  this.iframe  = $('<iframe src="javascript:false;"/>').attr("name",this.options.fieldId + "_Iframe").hide().appendTo("body");
    	  this.fileInput = this.__createFileInput();

    	  this.form  = $('<form method="post" enctype="multipart/form-data"/>').attr({
              "action" : this.options.uploadUrl,
              "target" : this.iframe.attr("name")
              }).append(this.fileInput).appendTo("body");
      },

      __createFileInput : function() {
    	  var $comp = $("<input type='file'/>").attr({"name" : this.options.fieldId+"_MultiFileUpload_name",
    		  "id" : this.options.fieldId+"_MultiFileUpload_id"});
    	  if ($.browser.msie && $.browser.version == "8.0" || $.browser.safari) {  // 低版本加透明
    		  $comp.css({ "opacity": 0,position: 'absolute', right: 0, top: 0, 'font-size': '118px', cursor: 'pointer' });
    	  } else {
    		  $comp.hide();
    	  }
    	  return $comp;
      },
 
      /**
       * 验证文件类型
       */
      validateFun : function(files) {
    	  // 可以在这里判断是否选择的文件超过10个
    	  if (files && files.length > 10) {
    		  openWarning("导入数量超额");
    		  return false;
    	  }
    	  return true;
      },
      
      bindFileChange : function() {
        var self = this;
        this.fileInput.attr("multiple", "multiple");
        if (this.options.acceptFiles) {
        	this.fileInput.attr("accept", this.options.acceptFiles);
        }
        this.fileInput.on("change", function() {
          // 初始化原始数据
          self.options.totalBytes = 0; 
          self.options.loadedBytes = 0;
          self.options.messageArr = [];
          var files = this.files || [this]; 
          if (self.validateFun(files) === false) {
        	  self.__changeOver();
              return false;
          }
          self.options.progressBar.show();
          var options = self.options;
          for (var i = 0; i< files.length;i++) {
        	  options.totalBytes += files[i].size;
        	  self.fileDataCache["fileId_"+(new Date().getTime())+i] = {file : files[i], index: i};
          }
          
          options.onUploadStart(files);

          for (var fileId in self.fileDataCache) { // 多线程异步请求
        	  self.uploadHandlerForm(self.fileDataCache[fileId], options, fileId); // form提交
        	  break;
          }
        });
      },

      __changeOver : function(e) {
    	// 保证每次onchange事件都能执行
          this.fileInput.off("change").remove();
          this.fileInput = null;
          this.fileInput = this.__createFileInput();;
          this.form.append(this.fileInput);
    	  this.bindFileChange();
      },
      
      // 通过Form提交
      uploadHandlerForm : function(fileData, options, fileId) {
        var self = this;
        var actionUrl = "";
        options.formData = options.formData || {};
        options.formData["fileId"] = fileId;
        options.formData["fileIndex"] = fileData.index;
        //options.formData["replace"] = self.element.attr('data-replace');
        actionUrl = options.uploadUrl+"?"+this.__getParam(options.formData);

        this.form.attr("action", actionUrl);
        this.iframe.on("load", function(){
           if (!this.parentNode){
             return;
           }
           var response = self.__getIframeContentJSON(this);
           self.uploadSuccess(fileData.file, response);
        });

        this.form.submit();
      },
      // 上传成功显示进度条
      uploadProcess : function(file) {
    	  var size = file.size;
    	  this.options.loadedBytes += size;
    	  var percentage = Math.round(this.options.loadedBytes / this.options.totalBytes * 100);
    	  this.options.progressBar.css('width', percentage + '%');
    	  this.options.progressBar.html(percentage + '%');
      },
      
      // 上传成功
      uploadSuccess : function(file, data) {
    	  var options = this.options;
    	  var json = jQuery.parseJSON(data);
    	  var fileId = json.fileId;

    	  if (!this.fileDataCache[fileId]) {
    		  return;
    	  }

    	  var file = this.fileDataCache[fileId].file;
    	  options.messageArr.push(json);
    	  delete this.fileDataCache[fileId];  // 成功返回则删除文件对象
    	  
    	  // 更新进度条 ...
		  this.uploadProcess(file);
		  options.onUploadSuccess(json);
		  
    	  if (!$.isEmptyObject(this.fileDataCache)) { // 还有线程在处理
    		  for (var fileId in this.fileDataCache) { // 一个接一个请求
    			  this.uploadHandlerForm(this.fileDataCache[fileId], options, fileId); // form提交
            	  break;
              }
    	  } else {
    		  window.setTimeout(function(){
    			  options.onUploadComplete();
    			  //options.progressBar.html(" - Complete");
    			  //options.progressBar.fadeOut(1000);
    			  //options.onUploadSuccess(options.messageArr);
    		  }, 500);
    		  this.__changeOver();
    	  }
      },
      
      __getParam : function(formData) {
    	  var arr=[];
    	  for (var name in formData) {
    		  arr.push(name+"="+encodeURIComponent(formData[name]));
    	  }
    	  return arr.join("&");
      },
      // 通过iframe获取返回值
      __getIframeContentJSON : function(iframe){
        try {
            var doc = iframe.contentDocument || iframe.contentWindow.document,response;
            var innerHTML = doc.body.innerHTML;
            response = innerHTML;
        } catch(err){
            response = "{\"success\": false}";
        }
        return response;
      },
      // 打开文件
      __openFile : function() {
        this.fileInput.click();
      },
      destroy : function() {
        this.fileInput.off("change").off("click").remove();
        this.fileInput = null;
      }
  };
})(jQuery);

