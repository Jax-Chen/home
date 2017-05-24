package com.jesse.common.utils;

import java.util.Random;

public class UnqStringTool {

	private static char[] charArr = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
			'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
			'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5',
			'6', '7', '8', '9' };

	/**
	 * 生成16位随机唯一字符串
	 * @author wangkw
	 * @return
	 */
	public static String get16LenStr() {

		String s = String.valueOf(System.nanoTime());

		int len = s.length() / 2;
		char[] cchar = new char[len];
		for (int i = 0; i < len; i++) {
			String ts = s.substring(i, i + 2);
			int t = Integer.valueOf(ts);
			if (t >= 62) {
				t -= 62;
			}
			cchar[i] = charArr[t];
		}

		char[] rchar = new char[16];
		int flag = 0;

		for (int i = 0; i < 16; i++) {
			if (i % 2 != 0 && i != 15) {
				if (flag < len) {
					rchar[i] = cchar[flag];
					flag++;
				} else {
					rchar[i] = charArr[new Random().nextInt(62)];
				}
			} else {
				rchar[i] = charArr[new Random().nextInt(62)];
			}
		}

		return new String(rchar);
	}

}
