package com.jesse.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidateUtil {

	public static final Pattern EmailRegex = Pattern.compile("^\\w+[[\\.-]?\\w*]*@\\w+([\\.-]\\w+)*(\\.\\w+)+$");
	//public static final Pattern PhoneRegex = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$");
	public static final Pattern PhoneRegex = Pattern.compile("^1\\d{10}$");
	public static final Pattern NumberRegex = Pattern.compile("^(\\d|([1-9]\\d+))(\\.\\d+)?$");
	public static final Pattern IntegerRegex = Pattern.compile("^(\\d|([1-9]\\d+))$");
	public static final Pattern UrlRegex = Pattern.compile("^(http|https)://.+(\\..+)+$");
	public static final Pattern NotCompanyEmailRegex = Pattern.compile("^.+@((163)|(126)|(qq)|(sina)|(hotmail)|(gmail)|(yahoo))(\\..+)+$", Pattern.CASE_INSENSITIVE);
	public static final Pattern IdCardRegex = Pattern.compile("^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$");
	
	public static boolean isEmail(String email) {
		if (StringUtil.isBlank(email)) {
			return false;
		}

		Matcher matcher = EmailRegex.matcher(email);
		return matcher.matches();
	}
	
	public static boolean isPhone(String phone) {
		if (StringUtil.isBlank(phone)) {
			return false;
		}

		Matcher matcher = PhoneRegex.matcher(phone);
		return matcher.matches();
	}
	
	public static boolean isNumber(String num) {
		if (StringUtil.isBlank(num)) {
			return false;
		}

		Matcher matcher = NumberRegex.matcher(num);
		return matcher.matches();
	}
	
	public static boolean isInteger(String num) {
		if (StringUtil.isBlank(num)) {
			return false;
		}

		Matcher matcher = IntegerRegex.matcher(num);
		return matcher.matches();
	}
	
	public static boolean isNotCompanyEmail(String val) {
		if (StringUtil.isBlank(val)) {
			return false;
		}

		Matcher matcher = NotCompanyEmailRegex.matcher(val);
		return matcher.matches();
	}
	
	public static boolean isUrl(String val) {
		if (StringUtil.isBlank(val)) {
			return false;
		}

		Matcher matcher = UrlRegex.matcher(val);
		return matcher.matches();
	}
	
	public static boolean isIdCard(String id){
		if (StringUtil.isBlank(id)) {
			return false;
		}

		Matcher matcher = IdCardRegex.matcher(id);
		return matcher.matches();
	}
	
	public static void main(String[] args) {
		System.out.println(isIdCard(""));
	}
	
	
}