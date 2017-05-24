package com.jesse.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jesse.dao.HomeDAO;
import com.jesse.domain.Home;
import com.jesse.domain.query.HomeQuery;
import com.jesse.service.BaseManager;
import com.jesse.service.HomeService;

@Service("homeService")
@Transactional
public class HomeServiceImpl extends BaseManager implements HomeService {

	@Autowired
	private HomeDAO homeDAO;
	
	@Override
	public Integer addHome(Home home) {
		return homeDAO.addHome(home);
	}

	@Override
	public Home selectHome(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Home> listHomeByQuery(HomeQuery query) {
		return homeDAO.listHomeByQuery(query);
	}

	@Override
	public Integer deleteHomeById(Integer homeId) {
		return homeDAO.deleteHomeById(homeId);
	}

	@Override
	public Home selectHomeByName(String name) {
		return homeDAO.selectHomeByName(name);
	}

	@Override
	public Home selectHomeById(Integer id) {
		return homeDAO.selectHomeById(id);
	}

	@Override
	public Integer updateHome(Home home) {
		return homeDAO.updateHome(home);
	}

	@Override
	public Home selectHomeByName(String name, Integer id) {
		return homeDAO.selectHomeByName(name, id);
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
		return homeDAO.listAllHome();
	}

	
	
	
}
