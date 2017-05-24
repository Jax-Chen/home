package com.jesse.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jesse.dao.BaseDAO;
import com.jesse.dao.SystemUserDAO;
import com.jesse.domain.SystemUser;
import com.jesse.domain.User;
import com.jesse.domain.query.UserQuery;

@Repository("systemUserDAO")
public class SystemUserDAOImpl extends BaseDAO implements SystemUserDAO {

	@Override
	public Integer addUser(SystemUser user) {
		return insert("insert", user);
	}

	@Override
	public SystemUser selectUser(String uname, String password) {
		Map map = new HashMap();
		map.put("uname", uname);
		map.put("password", password);
		
		return (SystemUser) selectOne("selectUser", map);
	}

	@Override
	protected String getNameSpace() {
		return "SystemUserMapper.";
	}


	
	
}
