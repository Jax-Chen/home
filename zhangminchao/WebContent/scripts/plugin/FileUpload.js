/**
 * 自己实现的文件上传的工具类
 */
;(function($) {
  
  FileUpload = function(options, $element) {
	this.element = $element;
    this.options = options; 
    this.setOptions();
    this.__creatComponent();
    this.bindFileChange();
    if (($.browser.msie && $.browser.version == "8.0") || $.browser.safari) { // ie8需要点击file本身才允许提交(form提交访问拒绝BUG修复)
    	$element.append(this.form);
   	    this.fileInput.width($element.width());
   	    this.fileInput.height($element.height());
    } else {
    	$element.on("click", $.proxy(this.__openFile, this)); 
    }
  };
  
  FileUpload.prototype = {
      // 设置选项信息
      setOptions : function(options) {
    	this.options.fieldId = this.options.fieldId || "fileUploadComponent"+this.__getIndex();
        this.options.uploadUrl = this.options.uploadUrl || appServer + "/ajax/component/uploadFile.htm"; // url
        this.options.onUploadSuccess = this.options.onUploadSuccess || function(e) {}; // 上传成功之后执行的回调函数
        this.options.onUploadStart = this.options.onUploadStart || function(e) {}; // 开始上传前执行的回调函数
        this.options.onUploadComplete = this.options.onUploadComplete || function(e) {}; // 上传结束前执行的回调函数
      },
      
      __getIndex : function() {
			if (!FileUpload.index) {
				FileUpload.index = 0;
			}
			FileUpload.index ++;
			return FileUpload.index;
		},
      
      __creatComponent : function() {
    	  this.iframe  = $('<iframe src="javascript:false;"/>').attr("name",this.options.fieldId + "_Iframe").hide().appendTo("body");
    	  this.fileInput = this.__createFileInput();
    	  this.form  = $('<form method="post" enctype="multipart/form-data"/>').attr({ "action" : this.options.uploadUrl, "target" : this.iframe.attr("name") });
    	  this.form.append(this.fileInput).appendTo("body");
      },
      
      __createFileInput : function() {
    	  var $comp = $("<input type='file'/>").attr({"name" : this.options.fieldId+"_FileUpload_name",
    		  "id" : this.options.fieldId+"_FileUpload_id"});
    	  if (($.browser.msie && $.browser.version == "8.0") || $.browser.safari) {  // 低版本加透明
    		  $comp.css({ "opacity": 0, position: 'absolute', right: 0, top: 0, 'font-size': '118px', cursor: 'pointer' });
    	  } else {
    		  $comp.hide();
    	  }
    	  return $comp;
      },
 
      /**
       * 验证文件类型
       */
      validateFun : function(file) {
    	  var name = this.__getFilename(file);
			if (typeof this.options.validateFun == "function"
					&& this.options.validateFun(file) === false) {
				return false;
			}
			if (this.options.fileTypeExts && !this.__isAllowedExtension(name)) {
				var extTypeErr = this.options.acceptFilesMessage
						|| "很抱歉，您的文件格式有误";
				alert(extTypeErr);
				return false;
			}
			return true;
      },
      
      bindFileChange : function() {
        var self = this;
        if (this.options.multi) {
        	this.fileInput.attr("multiple", "multiple");
        }
        if (this.options.acceptFiles) {
        	this.fileInput.attr("accept", this.options.acceptFiles);
        }
        this.fileInput.on("change", function() {
          var file = this; 
          var options = self.options;
          self.__fileName = self.__getFilename(file);
          if (self.validateFun(file) === false) {
        	  self.__changeOver();
              return false;
          }
          options.onUploadStart(file);
          self.uploadHandlerForm(options); // form提交
          self.__changeOver();
        });
      },
      
      __getFilename : function(file) {
    	  var name;
    	  if (file.value){
              name = file.value.replace(/.*(\/|\\)/, "");
          } else {
              // fix missing properties in Safari 4 and firefox 11.0a2
              name = (file.fileName !== null && file.fileName !== undefined) ? file.fileName : file.name;
          }
    	  return name;
      },
      
      __changeOver : function(e) {
    	  // 保证每次onchange事件都能执行
          this.fileInput.off("change").remove();
          this.fileInput = null;
          this.fileInput = this.__createFileInput();
          this.fileInput.appendTo(this.form);
    	  this.bindFileChange();
      },
      
      // 通过Form提交
      uploadHandlerForm : function(options) {
        var self = this;
        var actionUrl = "";
        if (!$.isEmptyObject(options.formData)) {
            actionUrl = options.uploadUrl+"?"+this.__getParam(options.formData);
        } else {
        	actionUrl = options.uploadUrl
        }
        this.form.attr("action", actionUrl);
        this.iframe.on("load", function(){
           if (!this.parentNode){
             return;
           }
           var response = self.__getIframeContentJSON(this);
           options.onUploadSuccess(response, self.__fileName);
           window.setTimeout(options.onUploadComplete, 500);
        });

        this.form.submit();
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
      __isAllowedExtension: function(fileName){
          var ext = (-1 !== fileName.indexOf('.'))? fileName.replace(/.*[.]/, '').toLowerCase() : '';
          var allowed = this.options.fileTypeExts || "";
          allowed = allowed.split(",");
          if (!allowed.length){return true;}
          for (var i=0; i<allowed.length; i++){
              if (allowed[i].toLowerCase() == ext){ return true;}
          }
          return false;
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

