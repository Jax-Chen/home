package com.jesse.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class PurchaseUtil {

	/**
     * 判断闪购时间对不对
     * @param flashDate
     * @param flashTime
     * @return
     */
    public static boolean checkFlashTime(Date flashDate, int flashTime)
	{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String todayStr = df.format(new Date());
		Date today = null;
		Calendar rightNow = Calendar.getInstance();
		int curHour = rightNow.get(Calendar.HOUR_OF_DAY);
		
		try {
			today = df.parse(todayStr); 
		} catch (ParseException ex) {
		}
		
		if (flashDate.compareTo(today) > 0) {
			return false;
		} else {
			if (flashDate.compareTo(today) == 0 && flashTime > curHour) {
				return false;
			}
		}
		
		return true;
	}
    
}