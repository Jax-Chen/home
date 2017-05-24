package com.jesse.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jesse.dao.NoticeDAO;
import com.jesse.dao.UserDAO;
import com.jesse.domain.Notice;
import com.jesse.domain.query.NoticeQuery;
import com.jesse.service.BaseManager;
import com.jesse.service.NoticeService;

@Service("noticeService")
@Transactional
public class NoticeServiceImpl extends BaseManager implements NoticeService {

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private NoticeDAO noticeDAO;

	@Override
	public Integer addNotice(Notice notice) {
		return noticeDAO.addNotice(notice);
	}

	@Override
	public Notice selectNotice(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Notice> listNoticeByQuery(NoticeQuery query) {
		return noticeDAO.listNoticeByQuery(query);
	}

	@Override
	public Integer deleteNoticeById(Integer noticeId) {
		return noticeDAO.deleteNoticeById(noticeId);
	}

	@Override
	public Notice selectNoticeByUname(String uname) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice selectNoticeByMobile(String mobile) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice selectNoticeByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice selectNoticeById(Integer id) {
		return noticeDAO.selectNoticeById(id);
	}

	@Override
	public Integer updateNotice(Notice notice) {
		return noticeDAO.updateNotice(notice);
	}

	@Override
	public Notice selectNoticeByUname(String uname, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice selectNoticeByMobile(String mobile, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice selectNoticeByEmail(String email, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	
}
