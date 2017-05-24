package com.jesse.service;

import java.util.List;

import com.jesse.domain.SystemUser;
import com.jesse.domain.User;
import com.jesse.domain.query.UserQuery;

public interface SystemUserService {
	
	Integer addUser(SystemUser user);
	
	SystemUser selectUser(String uname,String password);
	
//	List<SystemUser> listUserByQuery(UserQuery query);
	
}
