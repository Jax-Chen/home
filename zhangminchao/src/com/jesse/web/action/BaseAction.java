package com.jesse.web.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.app.VelocityEngine;
import org.open.posgoo.common.utils.view.cookyjar.Cookyjar;
import org.open.posgoo.common.utils.view.url.URLBroker;
import org.open.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.ui.velocity.VelocityEngineUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import com.jesse.common.utils.JsonLibUtils;
import com.jesse.web.validator.BaseValidator;


/**
 * Action基类
 */
@Controller
public abstract class BaseAction extends BaseValidator implements InitializingBean {
    
    // 日志
    protected final Logger    log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MessageSource     messageSource;

    
	
    
    protected static String nextLine = "</br>";
    protected static String gangrgangn = "\r\n";

    /**
     * 初始化绑定
     * 
     * @param binder
     */
    @InitBinder
    protected final void initBinderInternal(WebDataBinder binder) {

        registerDefaultCustomDateEditor(binder);
        registerDefaultCustomNumberEditor(binder);
        initBinder(binder);
    }

    private void registerDefaultCustomNumberEditor(WebDataBinder binder) {

        // 注册双精度数字格式化类型: #0.00
        NumberFormat numberFormat = new DecimalFormat("#0.00");
        binder.registerCustomEditor(Double.class, new CustomNumberEditor(Double.class, numberFormat, true));
    }

    protected void registerDefaultCustomDateEditor(WebDataBinder binder) {

        // 注册默认的日期格式化类型: yyyy-MM-dd
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    /**
     * 提供子类初始化表单, 子类如果要调用请重写该方法
     * 
     * @param binder
     */
    protected void initBinder(WebDataBinder binder) {
    	
    }

    /**
     * 设置城市的code信息
     * @param cookyjar
     * @param newValue
     */
    protected void setCityCookieValue(Cookyjar cookyjar, String newValue) {
    	if (StringUtils.isNotBlank(newValue)) {
    		 cookyjar.set("cityCode", newValue);
    	}
    }

    protected String getCityCookieValue(Cookyjar cookyjar) {
    	return cookyjar.get("cityCode") != null? cookyjar.get("cityCode") : "";
    }


    protected String bopsSuccess(ModelMap model) {
        return "bops/success";
    }

    protected String bopsError(ModelMap model) {
        return "bops/error";
    }

    protected String bopsSuccess(Model model, String code, String... args) {
        String message = messageSource.getMessage(code, args, Locale.CHINA);
        model.addAttribute("message", message);
        return "bops/success";
    }

    protected String bopsSuccess(ModelMap model, String code, String... args) {
        String message = messageSource.getMessage(code, args, Locale.CHINA);
        model.addAttribute("message", message);
        return "bops/success";
    }

    protected String bopsError(Model model, String code, String... args) {
        String message = messageSource.getMessage(code, args, Locale.CHINA);
        model.addAttribute("message", message);
        return "bops/error";
    }

    protected String bopsError(ModelMap model, String code, String... args) {
        String message = messageSource.getMessage(code, args, Locale.CHINA);
        model.addAttribute("message", message);
        return "bops/error";
    }
    
    
    protected String encode(HttpServletRequest request, String key){
    	if (StringUtil.isBlank(request.getParameter(key))){
    		return "";
    	}
    	try {
    		return new String(request.getParameter(key).getBytes("ISO8859-1"), "UTF-8");
			//return URLDecoder.decode(request.getParameter(key),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}
    }
    
    /**
     * 返回结果集封装(列表)
     * 转换列表对象到JSONObject对象
     * @param obj
     * @return
     */
    @SuppressWarnings("unchecked")
	protected JSONObject convertListToData(List result) {
    	if (result == null){
    		result = new ArrayList();
    	}
    	JSONObject data = new JSONObject();
    	// 返回列表时属性名一定要为record
		data.put("records", JsonLibUtils.object2json(result));
		return data;
    }
    
    @SuppressWarnings("unchecked")
    protected JSONObject convertObjToData(Object obj) {
    	return JsonLibUtils.pojo2JSONObject(obj);
    }
    
	@Override
	public void afterPropertiesSet() throws Exception {
		
	}
	
    private String getRequestParameters(HttpServletRequest request) {
    	StringBuffer sb = new StringBuffer();
        Enumeration en = request.getParameterNames();
        if (!en.hasMoreElements()) {
            return "";
        }
        while (en.hasMoreElements()) {
            String name = (String) en.nextElement();
            String[] values = request.getParameterValues(name);
            if (values == null || values.length == 0 
            		|| "password".equalsIgnoreCase(name) || "repassword".equalsIgnoreCase(name)) { // 敏感信息密码不打印
                continue;
            }
            for (String v : values) {
                sb.append(name).append('=').append(v).append("\r\n");
            }
        }
        
        if(sb.length()>=1){
        	sb.deleteCharAt(sb.length() - 1);	
        }
        
        return sb.toString();
    }

	
	/**
	 * 获取头部信息
	 * @param req
	 * @return
	 */
	protected ChannelHeader getHeader(HttpServletRequest req) {
		ChannelHeader m = new ChannelHeader();
		m.setAccount(req.getHeader("x-account"));
		m.setPassword(req.getHeader("x-password"));
		m.setTimestamp(req.getHeader("x-timestamp"));
		m.setSign(req.getHeader("x-sign"));
		return m;
	}
	
	public static class ChannelHeader {
		private String account;
		private String password;
		private String timestamp;
		private String sign;
		
		public String getAccount() {
			return account;
		}
		public void setAccount(String account) {
			this.account = account;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getTimestamp() {
			return timestamp;
		}
		public Long getLongTimestamp() {
			return Long.valueOf(timestamp);
		}
		public void setTimestamp(String timestamp) {
			this.timestamp = timestamp;
		}
		public String getSign() {
			return sign;
		}
		public void setSign(String sign) {
			this.sign = sign;
		}
	}
 
}
