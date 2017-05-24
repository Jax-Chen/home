package com.jesse.common.utils;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

import org.apache.commons.lang.StringUtils;

public class ReadFileUtil {
	
	public static void main(String[] args) throws Exception {
		 StringBuffer sb= new StringBuffer("");
         
         FileReader reader = new FileReader("c://11mail.txt");
         BufferedReader br = new BufferedReader(reader);
        
         String str = null;
         int count = 0;
         while((str = br.readLine()) != null) {
        	 count++;
               sb.append(StringUtils.trim(str));
         }
        
         br.close();
         reader.close();
        // System.out.println("总条数="+count);
         System.out.println(sb.toString());
	}

}
