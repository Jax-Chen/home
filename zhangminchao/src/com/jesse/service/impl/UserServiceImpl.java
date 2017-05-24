package com.jesse.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jesse.dao.UserDAO;
import com.jesse.domain.User;
import com.jesse.domain.query.UserQuery;
import com.jesse.service.BaseManager;
import com.jesse.service.UserService;

@Service("userService")
@Transactional
public class UserServiceImpl extends BaseManager implements UserService {

	@Autowired
	private UserDAO userDAO;
	
	
	@Override
	public Integer addUser(User user) {
		return this.userDAO.addUser(user);
	}


	@Override
	public User selectUser(String uname, String password) {
		return userDAO.selectUser(uname,password);
	}


	@Override
	public List<User> listUserByQuery(UserQuery query) {
		
		return userDAO.listUserByQuery(query);
	}


	@Override
	public Integer deleteUserById(Integer userId) {
		return userDAO.deleteUserById(userId);
	}


	@Override
	public User selectUserByUname(String uname) {
		return userDAO.selectUserByUname(uname);
	}


	@Override
	public User selectUserByMobile(String mobile) {
		return userDAO.selectUserByMobile(mobile);
	}


	@Override
	public User selectUserByEmail(String email) {
		return userDAO.selectUserByEmail(email);
	}


	@Override
	public User selectUserById(Integer id) {
		return userDAO.selectUserById(id);
	}


	@Override
	public Integer updateUser(User user) {
		return userDAO.updateUser(user);
	}
	
	@Override
	public User selectUserByUname(String uname,Integer id) {
		return userDAO.selectUserByUname(uname, id);
	}


	@Override
	public User selectUserByMobile(String mobile,Integer id) {
		return userDAO.selectUserByMobile(mobile,id);
	}


	@Override
	public User selectUserByEmail(String email,Integer id) {
		return userDAO.selectUserByEmail(email, id);
	}
	
}
