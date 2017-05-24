package com.jesse.domain.query;

import com.jesse.common.page.Pagination;
import com.jesse.domain.Orders;

public class OrderQuery extends Pagination<Orders> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6620555983995149307L;

	private Integer userId;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}


	
	
}
