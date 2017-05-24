package com.jesse.common.utils;

import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.math.RandomUtils;


public class UUIDGenerator{
	

	private static final int IP;
	static {
		int ipadd;
		try {
			ipadd = BytesHelper.toInt( InetAddress.getLocalHost().getAddress() );
		}
		catch (Exception e) {
			ipadd = 0;
		}
		IP = ipadd;
	}
	private static short counter = (short) 0;
	private static final int JVM = (int) ( System.currentTimeMillis() >>> 8 );

	public UUIDGenerator() {
	}

	/**
	 * Unique across JVMs on this machine (unless they load this class
	 * in the same quater second - very unlikely)
	 */
	protected int getJVM() {
		return JVM;
	}

	/**
	 * Unique in a millisecond for this JVM instance (unless there
	 * are > Short.MAX_VALUE instances created in a millisecond)
	 */
	protected short getCount() {
		synchronized(UUIDGenerator.class) {
			if (counter<0) counter=0;
			return counter++;
		}
	}

	/**
	 * Unique in a local network
	 */
	protected int getIP() {
		return IP;
	}

	/**
	 * Unique down to millisecond
	 */
	protected short getHiTime() {
		return (short) ( System.currentTimeMillis() >>> 32 );
	}
	protected int getLoTime() {
		return (int) System.currentTimeMillis();
	}

	public String format(int intval) {
		String formatted = Integer.toHexString(intval);
		StringBuffer buf = new StringBuffer("00000000");
		buf.replace( 8-formatted.length(), 8, formatted );
		return buf.toString();
	}
	
	protected static String getCurDate() {
		SimpleDateFormat df;
		df = new SimpleDateFormat("yyyyMMdd");
        return df.format(new Date());
	}
	
	public String generate() {
		return new StringBuffer(36)
		.append( format(getJVM()))
		.append( format( getIP() ) )
		.append( format( getLoTime() ) )
		.append( getCount() )
		.toString();
	}
	
	public String formatCount(String count) {
		String temp = "00000000000000000";
		if (count.length() < 4) {
			return temp.substring(0, 4 - count.length()) + count;
		}
		return count;
		
	}
	
	public String generateNumber() {
		return new StringBuffer(36)
		.append( getCurDate() )
		.append( RandomUtils.nextInt(9)+"" 
				+ RandomUtils.nextInt(9) 
				+ RandomUtils.nextInt(9) 
				+ RandomUtils.nextInt(9)
				+ RandomUtils.nextInt(9)
				+ RandomUtils.nextInt(9)
				+ RandomUtils.nextInt(9)
				+ RandomUtils.nextInt(9))
		.toString();
	}
	
	public static String generateSequence() {
		return new StringBuffer(36)
		.append( getCurDate().subSequence(2, 4) )
		.append( RandomUtils.nextInt(9)+"" 
				+ RandomUtils.nextInt(9) 
				+ RandomUtils.nextInt(9) 
				+ RandomUtils.nextInt(9)
				+ RandomUtils.nextInt(9)
				+ RandomUtils.nextInt(9)
				+ RandomUtils.nextInt(9))
		.toString();
	}
	
	
	public static void main(String[] args) {
		//System.out.println(new UUIDGenerator().generateNumber());
		System.out.println(new UUIDGenerator().generateNumber());
		
	}


}





