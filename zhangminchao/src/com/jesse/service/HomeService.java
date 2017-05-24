package com.jesse.service;

import java.util.List;

import com.jesse.domain.Home;
import com.jesse.domain.query.HomeQuery;

public interface HomeService {
	
	Integer addHome(Home home);
	
	Home selectHome(String uname,String password);
	
	List<Home> listHomeByQuery(HomeQuery query);
	
	Integer deleteHomeById(Integer homeId);
	
	Home selectHomeByName(String name);
	
//	Home selectHomeByMobile(String mobile);
//	
//	Home selectHomeByEmail(String email);
	
	Home selectHomeById(Integer id);
	
	Integer updateHome(Home home);
	
	Home selectHomeByName(String name,Integer id);
	
	Home selectHomeByMobile(String mobile,Integer id);
	
	Home selectHomeByEmail(String email,Integer id);
	
	List<Home> listAllHome();
}
