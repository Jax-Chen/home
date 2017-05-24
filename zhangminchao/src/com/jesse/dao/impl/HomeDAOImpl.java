package com.jesse.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jesse.dao.BaseDAO;
import com.jesse.dao.HomeDAO;
import com.jesse.domain.Home;
import com.jesse.domain.query.HomeQuery;


@Repository("homeDAO")
public class HomeDAOImpl extends BaseDAO implements HomeDAO {
	
	@Override
	protected String getNameSpace() {
		return "HomeMapper.";
	}

	@Override
	public Integer addHome(Home home) {
		return insert("insert", home);
	}

	@Override
	public Home selectHome(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Home> listHomeByQuery(HomeQuery query) {
		getPagination(query, "listHomeByQueryCount", "listHomeByQuery");
		
		return query.getData();
	}

	@Override
	public Integer deleteHomeById(Integer homeId) {
		return delete("deleteHomeById",homeId);
	}

	@Override
	public Home selectHomeByName(String name) {
		return (Home) selectOne("selectHomeByName",name);
	}

	@Override
	public Home selectHomeById(Integer id) {
		return (Home) selectOne("selectHomeById", id);
	}

	@Override
	public Integer updateHome(Home home) {
		return update("updateByPrimaryKeySelective", home);
	}

	@Override
	public Home selectHomeByName(String name, Integer id) {
		Map map = new HashMap();
		map.put("name", name);
		map.put("id", id);
		return (Home) selectOne("checkHomeByName", map);
	}

	@Override
	public Home selectHomeByMobile(String mobile, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Home selectHomeByEmail(String email, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Home> listAllHome() {
		return selectList("listAllHome");
	}

}
