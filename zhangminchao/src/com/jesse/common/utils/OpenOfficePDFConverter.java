package com.jesse.common.utils;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.artofsolving.jodconverter.OfficeDocumentConverter;
import org.artofsolving.jodconverter.office.DefaultOfficeManagerConfiguration;
import org.artofsolving.jodconverter.office.OfficeManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * openoffice PDF转换处理类
 * @author xiasq
 *
 */
@Component
public class OpenOfficePDFConverter {
	
	protected final static Log logger = LogFactory.getLog(OpenOfficePDFConverter.class);
	private static OfficeManager officeManager;
	private static String OFFICE_HOME = "C:\\Program Files (x86)\\OpenOffice 4";
	private static int port[] = { 8100 };
	static boolean isConnect = false;
	private static @Value("${hrhutui.openoffice.port}") String configPort;
	private static @Value("${hrhutui.openoffice.homepath}") String configHomePath;
	private static List doclist = new ArrayList();
	
	private static void docListInit() {
		doclist.clear();
		doclist.add("doc");
		doclist.add("docx");
		doclist.add("ppt");
		doclist.add("pptx");
		doclist.add("xls");
		doclist.add("xlsx");
		doclist.add("txt");
		doclist.add("odt");
		doclist.add("tif");
		doclist.add("jpg");
	}

	public static boolean convert2PDF(String inputFile, String outPutFile) {
		try {
			if (!isConnect) {
				startService();
			}
			OfficeDocumentConverter converter = new OfficeDocumentConverter(
					officeManager);
			inputFile = dealTxt(inputFile); // 如果是txt文档 需要进行拓展处理。。
			converter.convert(new File(inputFile), new File(outPutFile));
			logger.error("============open office PDF文件转换成功啦。。。。。 ；inputFile="
					+ inputFile + " --> outPutFile=" + outPutFile);
		} catch (Exception ce) {
			isConnect = false;
			stopService();
			logger.error("+++++++open office————PDF文件转换失败....inputFile="+inputFile, ce);
			return false;
		}
		return true;
	}
	
	public static boolean convert2PDF(String contentUri) {
		if (contentUri == null || contentUri.trim().length() == 0) {
			return false;
		}

		if (contentUri.indexOf("/") != -1) {
			contentUri = contentUri.replaceAll("\\/", "\\\\");
		}
		
		File inputFile = new File(contentUri);
        if (!inputFile.exists()) {
            logger.error("+++++文件服务器不存在该文件 。。。 docPath=" + inputFile );
            return false;
        }
        
        contentUri = dealTxt(contentUri); // 如果是txt文档 需要进行拓展处理。。
        inputFile = new File(contentUri);
        String extension=FilenameUtils.getExtension(contentUri);
        if(!doclist.contains(extension)){
            return false;
        }
        
        // 生成输出文件
        File outFile = new File(inputFile.getParent(), FilenameUtils.getBaseName(inputFile.getName()) + ".pdf");
        // 进行PDF转换
        return convert2PDF(contentUri, outFile.getAbsolutePath());
        
	}

	public static void startService() {
		DefaultOfficeManagerConfiguration configuration = new DefaultOfficeManagerConfiguration();
		try {
			int[] a_port = port;
			// 设置OpenOffice.org安装目录 system.properties配置
			configuration.setOfficeHome(StringUtil.isNotBlank(configHomePath)?configHomePath:OFFICE_HOME);// ����OpenOffice.org��װĿ¼
			if(StringUtils.isNotBlank(configPort)){
				a_port[0] = Integer.valueOf(configPort);
			}
			configuration.setPortNumbers(a_port); //  设置转换端口，默认为8100 system.properties配置
			configuration.setTaskExecutionTimeout(1000 * 60 * 5L);// 设置任务执行超时为5分钟
			configuration.setTaskQueueTimeout(1000 * 60 * 60 * 24L);// 设置任务队列超时为24小时

			officeManager = configuration.buildOfficeManager();
			officeManager.start(); // 启动服务
			isConnect = true;
			docListInit();
			logger.error("=======open office服务启动成功======");
		} catch (Exception ce) {
			isConnect = false;
			logger.error("+++++++open office服务启动失败，，，详细信息：", ce);
		}
	}
	
	private static String dealTxt(String inputFile){
		int docIndex = inputFile.lastIndexOf(".txt");
		if(inputFile.length() >5 && docIndex == inputFile.length() -4){ // 属于txt文档时，由于存在乱码问题 需要进行处理。
			String destFile = inputFile.substring(0, docIndex) +".odt";
			try {
				FileUtils.copyFile(new File(inputFile), new File(destFile));
				logger.error("=======txt -> odt copyFile success ; inputFile=" + inputFile);
				return destFile;
			} catch (IOException e) {
				logger.error("++++++++txt -> odt copyFile error ;inputFile=" + inputFile);
				return inputFile;
			}
		}
		return inputFile;
	}

	public static void stopService() {
		logger.error("=======open office服务关闭服务======");
		isConnect = false;
		if (officeManager != null) {
			officeManager.stop();
		}
	}

//	public static void main(String[] args) {
//		String inputFilePath = "D:\\template.docx";
//		String outputFilePath = "D:\\template.pdf";
//		convert2PDF(inputFilePath, outputFilePath);
//		stopService();
//		
//	}

}
