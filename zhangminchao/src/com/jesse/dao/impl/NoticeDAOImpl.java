package com.jesse.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jesse.dao.BaseDAO;
import com.jesse.dao.NoticeDAO;
import com.jesse.domain.Notice;
import com.jesse.domain.query.NoticeQuery;


@Repository("noticeDAO")
public class NoticeDAOImpl extends BaseDAO implements NoticeDAO {
	
	@Override
	protected String getNameSpace() {
		return "NoticeMapper.";
	}

	@Override
	public Integer addNotice(Notice notice) {
		return insert("insert", notice);
	}

	@Override
	public Notice selectNotice(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Notice> listNoticeByQuery(NoticeQuery query) {
		getPagination(query, "listNoticeByQueryCount", "listNoticeByQuery");
		return query.getData();
	}

	@Override
	public Integer deleteNoticeById(Integer noticeId) {
		return delete("deleteByPrimaryKey", noticeId);
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
		return (Notice) selectOne("selectByPrimaryKey", id);
	}

	@Override
	public Integer updateNotice(Notice notice) {
		return update("updateByPrimaryKeySelective", notice);
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
