package com.jesse.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jesse.dao.SystemUserDAO;
import com.jesse.domain.SystemUser;
import com.jesse.service.BaseManager;
import com.jesse.service.SystemUserService;

@Service("systemUserService")
@Transactional
public class SystemUserServiceImpl extends BaseManager implements SystemUserService {

	@Autowired
	SystemUserDAO systemUserDAO;

	@Override
	public Integer addUser(SystemUser user) {
		return systemUserDAO.addUser(user);
	}

	@Override
	public SystemUser selectUser(String uname, String password) {
		return systemUserDAO.selectUser(uname, password);
	}
	
	
	
}
