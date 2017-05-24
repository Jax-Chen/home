package com.jesse.common.utils;

public class MobileUtil {
	
	public static String maskMobile(String mobile) {
		if (StringUtil.isBlank(mobile)) {
			return "";
		}
		
		mobile = mobile.trim();
		
		if (mobile.length() < 4) {
			return mobile;
		}
		
		return mobile.substring(0, 3) + "****" + mobile.substring(7);
	}

}