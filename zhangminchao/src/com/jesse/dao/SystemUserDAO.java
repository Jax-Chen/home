package com.jesse.dao;

import com.jesse.domain.SystemUser;

public interface SystemUserDAO {

	Integer addUser(SystemUser user);
	
	SystemUser selectUser(String uname,String password);
	
//	List<User> listUserByQuery(UserQuery query);
}
