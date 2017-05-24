package com.jesse.common.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class WordFormatClean {
	
	public static void main(String[] args) throws Exception {
		StringBuffer buf = new StringBuffer();
	    String inputFile = "C:\\Users\\xiasq\\Desktop\\detail.txt";
	    File file=new File(inputFile);
	    InputStreamReader read = new InputStreamReader(new FileInputStream(file),"GBK");//考虑到编码格式
        BufferedReader bufferedReader = new BufferedReader(read);
        String lineTxt = null;
        while((lineTxt = bufferedReader.readLine()) != null){
          buf.append(lineTxt);
        }
        read.close();
		String content = buf.toString();
		//把<P></P>转换成</div></div>并删除样式  
		content = content.replaceAll("(<P)([^>]*)(>.*?)(<\\/P>)", "<p$3</p>");  
		// 图片
		content = content.replaceAll("<img([^>]*)/?>", "");  
		//删除不需要的标签  
		content = content.replaceAll("<[/]?(font|FONT|span|SPAN|xml|XML|del|DEL|ins|INS|meta|META|[ovwxpOVWXP]:\\w+)[^>]*?>", "");  
		//删除不需要的属性  
		content = content.replaceAll("<([^>]*)(?:lang|LANG|class|CLASS|style|STYLE|size|SIZE|face|FACE|[ovwxpOVWXP]:\\w+)=(?:'[^']*'|\"\"[^\"\"]*\"\"|[^>]+)([^>]*)>", "<$1$2>");  
	/*	//删除<STYLE TYPE="text/css"></STYLE>及之间的内容  
		int styleBegin = content.indexOf("<STYLE");  
		int styleEnd = content.indexOf("</STYLE>") + 8;  
		String style = content.substring(styleBegin, styleEnd);  
		content = content.replace(style, "");  */
		System.out.println(content);
	}

}
