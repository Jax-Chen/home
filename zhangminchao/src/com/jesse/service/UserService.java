package com.jesse.service;

import java.util.List;

import com.jesse.domain.User;
import com.jesse.domain.query.UserQuery;

public interface UserService {
	
	Integer addUser(User user);
	
	User selectUser(String uname,String password);
	
	List<User> listUserByQuery(UserQuery query);
	
	Integer deleteUserById(Integer userId);
	
	User selectUserByUname(String uname);
	
	User selectUserByMobile(String mobile);
	
	User selectUserByEmail(String email);
	
	User selectUserById(Integer id);
	
	Integer updateUser(User user);
	
	User selectUserByUname(String uname,Integer id);
	
	User selectUserByMobile(String mobile,Integer id);
	
	User selectUserByEmail(String email,Integer id);
}
