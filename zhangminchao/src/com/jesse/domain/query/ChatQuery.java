package com.jesse.domain.query;

import java.util.ArrayList;
import java.util.List;

import com.jesse.common.page.Pagination;
import com.jesse.domain.Chat;
import com.jesse.domain.User;

public class ChatQuery extends Pagination<Chat> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6070683198493596156L;


	private List<User> uList = new ArrayList<User>();


	public List<User> getuList() {
		return uList;
	}


	public void setuList(List<User> uList) {
		this.uList = uList;
	}
	
	
	
}
