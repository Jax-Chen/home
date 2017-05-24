package com.jesse.common.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HtmlUtil {

	private static final String regEx_script = "<script[^>]*?>[\\s\\S]*?<\\/script>"; // 定义script的正则表达式
	private static final String regEx_style = "<style[^>]*?>[\\s\\S]*?<\\/style>"; // 定义style的正则表达式
	private static final String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式
	private static final String regEx_space = "\\s*|\t|\r|\n";// 定义空格回车换行符

	/**
	 * @param htmlStr
	 * @return 删除Html标签
	 */
	public static String delHTMLTag(String htmlStr) {
		Pattern p_script = Pattern.compile(regEx_script,
				Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern
				.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		Pattern p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		Pattern p_space = Pattern
				.compile(regEx_space, Pattern.CASE_INSENSITIVE);
		Matcher m_space = p_space.matcher(htmlStr);
		htmlStr = m_space.replaceAll(""); // 过滤空格回车标签
		return htmlStr.trim(); // 返回文本字符串
	}

	public static String getTextFromHtml(String htmlStr) {
		htmlStr = delHTMLTag(htmlStr);
		htmlStr = htmlStr.replaceAll("&nbsp;", "");
		return htmlStr;
	}
	
	 
	public static void test(List<List> list, List<String> arr, String str) {
		for (int i = 0; i < list.size(); i++) {
			// 取得当前的数组
			if (i == list.indexOf(arr)) {
				// 迭代数组
				for (String st : arr) {
					st = str + st;
					if (i < list.size() - 1) {
						test(list, list.get(i + 1), st);
					} else if (i == list.size() - 1) {
						System.out.println(st);
					}
				}
			}
		}
	}

	public static void main(String[] args) {

		List allList = new ArrayList();
		List son1 = new ArrayList();
		List son2 = new ArrayList();
		List son3 = new ArrayList();
		List son4 = new ArrayList();

		son1.add("son1_1");
		son1.add("son1_2");
		son1.add("son1_3");
		son2.add("son2_1");
		son2.add("son2_2");
		son2.add("son2_3");
		son2.add("son2_4");
		son3.add("son3_1");
		son3.add("son3_2");
		son4.add("son4_1");
		son4.add("son4_2");
		son4.add("son4_3");
		allList.add(son1);
		allList.add(son2);
		allList.add(son3);
		allList.add(son4);
		
		
		test(allList, son1, "|");
		
	}

}
