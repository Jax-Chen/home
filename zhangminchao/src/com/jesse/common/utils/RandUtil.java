package com.jesse.common.utils;

import java.math.BigDecimal;

import org.apache.commons.lang.math.RandomUtils;

public class RandUtil {
	
	public static String getRandDigit(int num) {
		StringBuffer result= new StringBuffer();
		result.append(RandomUtils.nextInt(9));
		
		for(int i = 0; i < num-1; i++){
			result.append(RandomUtils.nextInt(9));   
		}
		
		return result.toString();
	}
	
	/**
	 * 获取两个数值之间的随机数
	 * @param minValue 最小值
	 * @param maxValue 最大值
	 * @return 随机数
	 */
	public static Double getRandData(Double minValue, Double maxValue) {
		Double result = minValue + Math.random()*(maxValue-minValue);
		result = new BigDecimal(result).setScale(1, BigDecimal.ROUND_HALF_EVEN).doubleValue();
		return result;
	}
	
	public static void main(String[] args) {
		String a = "我是你人露个脸工作表现";
		for (int i = 0; i < 200; i++) {
			System.out.println(RandomUtils.nextInt(9));
		}
		String codes = "a_b_c:443";
		System.out.println(codes.replaceAll(":443", ""));
	}
	
}
