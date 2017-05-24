package com.jesse.dao;

import java.util.List;

import com.jesse.domain.Notice;
import com.jesse.domain.query.NoticeQuery;

public interface NoticeDAO {
	Integer addNotice(Notice notice);
	
	Notice selectNotice(String uname,String password);
	
	List<Notice> listNoticeByQuery(NoticeQuery query);
	
	Integer deleteNoticeById(Integer noticeId);
	
	Notice selectNoticeByUname(String uname);
	
	Notice selectNoticeByMobile(String mobile);
	
	Notice selectNoticeByEmail(String email);
	
	Notice selectNoticeById(Integer id);
	
	Integer updateNotice(Notice notice);
	
	Notice selectNoticeByUname(String uname,Integer id);
	
	Notice selectNoticeByMobile(String mobile,Integer id);
	
	Notice selectNoticeByEmail(String email,Integer id);
}
