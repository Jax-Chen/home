package com.jesse.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件操作工具类
 * 
 * @author wangkw
 *
 */
public class FileUtil {

	// 日志
    private final static Logger log = LoggerFactory.getLogger(FileUtil.class);
	
    
    /**
     * 写文件
     * @param file
     * @param desPath
     * @return
     */
	public static boolean writeFileByBytes(File file, String desPath, String fileName) {

		if (file == null || StringUtil.isBlank(desPath)) {
			return false;
		}

		FileInputStream in = null;
		FileOutputStream out = null;
		try {
			in = new FileInputStream(file);
			File file1 = new File(desPath + "/" + fileName);
			
			if(!new File(desPath).exists()){//不存在目录则创建
				new File(desPath).mkdirs();
			}
			
			out = new FileOutputStream(file1);// 指定要写入的图片
			int n = 0;// 每次读取的字节长度
			byte[] bb = new byte[1024];// 存储每次读取的内容
			while ((n = in.read(bb)) != -1) {
				out.write(bb, 0, n);// 将读取的内容，写入到输出流当中
			}
			
			return true;
		} catch (Exception e) {
			log.error(e.getMessage());
			return false;
		} finally {
			if(in != null){
				try {
					in.close();
				} catch (IOException e) {
				}
			}
			
			if(out != null){
				try {
					out.close();
				} catch (IOException e) {
				}// 关闭输入输出流
			}
		}
	}
	
	public static boolean writeFileByBytes(MultipartFile file, String desPath, String fileName) {
		try {
			File f = File.createTempFile("temp", null);
			file.transferTo(f);
			return writeFileByBytes(f, desPath, fileName);
		} catch (IOException e) {
			log.error(e.getMessage());
			return false;
		}
		
	}
	
	public static void main(String[] args) {
		FileUtil.writeFileByBytes(new File("C:/Users/USER_CC/Desktop/ordering/相关说明.txt"), "C:/Users/USER_CC/Desktop/ordering/new", "相关说明.txt");
	}

	/**
	 * 转换MultipartFile 2 File
	 * @param itemPicFile
	 * @return
	 */
	public static File transMF2F(MultipartFile file) {
		
		try {
			File f = File.createTempFile("temp", null);
			file.transferTo(f);
			return f;
		} catch (IOException e) {
			log.error(e.getMessage());
			return null;
		} 
		
	}

}
