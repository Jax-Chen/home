package com.jesse.web.ws.response;


public class Result {

	private Meta meta;
	private Object data;
	private Object retObj;
	
	public Result success() {  
        this.meta = new Meta();  
        return this;  
    }  
  
    public Result success(Object data) {  
        this.success();  
        this.data = data;  
        return this;  
    } 
    
    public Result setRetObj(Object data) {    
        this.retObj = data;  
        return this;  
    }  
  
    public Result failure(Integer code, String msg) {  
        this.meta = new Meta(code, msg);  
        return this;  
    }
    
    public Result failure(Integer code) {
        this.meta = new Meta(code, "");  
        return this;  
    }
    
    public Result failure(MsgCode msgCode) {
    	this.meta = new Meta(msgCode.getCode(), msgCode.getName());  
        return this;
    }
  
	public Meta getMeta() {  
        return meta;  
    }  
  
    public Object getData() {  
        return data;  
    }  
    
	public Object getRetObj() {
		return retObj;
	}

	public class Meta {
		private Integer errorNO = 0;
		private String errorInfo = "";

		public Meta() { }  
  
        public Meta(Integer no, String message) {  
            this.errorNO = no;  
            this.errorInfo = message;  
        }  
  
        public boolean isSuccess() {  
            return errorNO == 0;  
        }  
		
		public Integer getErrorNO() {
			return errorNO;
		}

		public String getErrorInfo() {
			return errorInfo;
		}

	}

}
