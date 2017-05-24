package com.jesse.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jesse.dao.BaseDAO;
import com.jesse.dao.UserDAO;
import com.jesse.domain.User;
import com.jesse.domain.query.UserQuery;


@Repository("userDAO")
public class UserDAOImpl extends BaseDAO implements UserDAO {
	
	@Override
	protected String getNameSpace() {
		return "UserMapper.";
	}

	@Override
	public Integer addUser(User user) {
		return this.insert("insert", user);
	}

	@Override
	public User selectUser(String uname, String password) {
		
		Map map = new HashMap();
		map.put("uname", uname);
		map.put("password", password);
		
		return (User) this.selectOne("selectUserByNameAndPassword", map);
	}

	@Override
	public List<User> listUserByQuery(UserQuery query) {
		
		getPagination(query, "listUserByQueryCount", "listUserByQuery");
		
		return query.getData();
	}

	@Override
	public Integer deleteUserById(Integer userId) {
		
		return delete("deleteUserById", userId);
	}

	@Override
	public User selectUserByUname(String uname) {
		return (User) selectOne("selectUserByUname",uname);
	}

	@Override
	public User selectUserByMobile(String mobile) {
		return (User) selectOne("selectUserByMobile",mobile);
	}

	@Override
	public User selectUserByEmail(String email) {
		return (User) selectOne("selectUserByEmail",email);
	}

	@Override
	public User selectUserById(Integer id) {
		return (User) selectOne("selectUserById", id);
	}

	@Override
	public Integer updateUser(User user) {
		return update("updateByPrimaryKeySelective", user);
	}

	
	@Override
	public User selectUserByUname(String uname,Integer id) {
		Map map = new HashMap();
		map.put("uname", uname);
		map.put("id", id);
		return (User) selectOne("checkUserByUname",map);
	}

	@Override
	public User selectUserByMobile(String mobile,Integer id) {
		Map map = new HashMap();
		map.put("mobile", mobile);
		map.put("id", id);
		return (User) selectOne("checkUserByMobile",map);
	}

	@Override
	public User selectUserByEmail(String email,Integer id) {
		Map map = new HashMap();
		map.put("email", email);
		map.put("id", id);
		return (User) selectOne("checkUserByEmail",map);
	}
}
