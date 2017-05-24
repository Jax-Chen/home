package com.jesse.web.validator;

import java.util.regex.Pattern;

import com.jesse.common.utils.StringUtil;


/**
 * 用于定义常量
 *
 */
public class BaseValidator {
    // 电子邮件匹配
    public static final Pattern emailPattern = Pattern.compile("^\\w+[[\\.-]?\\w*]*@\\w+([\\.-]\\w+)*(\\.\\w{2,100})+$");
    // 联系电话匹配
    public static final Pattern telPattern = Pattern.compile("^0\\d{2,3}-\\d{5,9}(-[0-9]{1,5})?+$");
    // 邮编匹配
    public static final Pattern zipPattern = Pattern.compile("^(\\d){6}+$");
    // qq
    public static final Pattern qqPattern = Pattern.compile("^(\\d){6,15}+$");
    // 生日日期匹配
    public static final Pattern birthPattern = Pattern.compile("^(\\d){4}-(\\d){1,2}-(\\d){1,2}$");
    // 手机号码匹配
    public static final Pattern mobilePattern = Pattern.compile("^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+(\\d){8})+$");
    
    public static final Pattern IDCardPattern1 = Pattern.compile("^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$");
    
    public static final Pattern IDCardPattern2 = Pattern.compile("^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$");
    
    public static final Pattern DegreePattern = Pattern.compile("^[A-Za-z0-9]{16,17}$");
    
    public static final Pattern DiplomaNumPattern = Pattern.compile("^\\d{17,18}$");
    
    public static final Pattern DriverLicenseNumPattern = Pattern.compile("^\\d{12}$");
    
    public static final Pattern CompanyNamePattern = Pattern.compile("(有限)|(合伙)|(集团)");
    
    /**
     * 检查是否匹配
     * @param value
     * @param pattern
     * @return
     */
    public static boolean isMatch(String value, Pattern pattern){
        if (StringUtil.isBlank(value)) {
            return true;
        }
        
        if(pattern.matcher(value).find()){
            return true;
        }

        return false;
    }
    
	public static boolean MobileMatch(String value) {
		if (StringUtil.isBlank(value)) {
			return false;
		}
		if (mobilePattern.matcher(value).find()) {
			return true;
		}
		return false;
	}
	
	public static boolean MailMatch(String value) {
		if (StringUtil.isBlank(value)) {
			return false;
		}
		if (emailPattern.matcher(value).find()) {
			return true;
		}
		return false;
	}
	
	
	public static boolean IDNumberMatch(String value) {
		if (StringUtil.isBlank(value)) {
			return false;
		}
		if (IDCardPattern1.matcher(value).find() || IDCardPattern2.matcher(value).find()) {
			return true;
		}
		return false;
	}
	
	public static boolean DegreeMatch(String value) {
		if (StringUtil.isBlank(value)) {
			return false;
		}
		if (DegreePattern.matcher(value).find()) {
			return true;
		}
		return false;
	}
	
	public static boolean DiplomaNumMatch(String value) {
		if (StringUtil.isBlank(value)) {
			return false;
		}
		if (DiplomaNumPattern.matcher(value).find()) {
			return true;
		}
		return false;
	}
	
	public static boolean DriverLicenseNumMatch(String value) {
		if (StringUtil.isBlank(value)) {
			return false;
		}
		if (DriverLicenseNumPattern.matcher(value).find()) {
			return true;
		}
		return false;
	}
	
	public static boolean CompanyNameMatch(String value) {
		if (StringUtil.isBlank(value)) {
			return false;
		}
		if (CompanyNamePattern.matcher(value).find()) {
			return true;
		}
		return false;
	}
	
	public static void main(String[] args) {
		System.out.println(CompanyNameMatch("有限"));
	}
	
}
