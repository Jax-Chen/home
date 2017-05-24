package com.jesse.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jesse.dao.OrderDAO;
import com.jesse.dao.UserDAO;
import com.jesse.domain.Orders;
import com.jesse.domain.query.OrderQuery;
import com.jesse.service.BaseManager;
import com.jesse.service.OrderService;

@Service("orderService")
@Transactional
public class OrderServiceImpl extends BaseManager implements OrderService {

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private OrderDAO orderDAO;

	@Override
	public Integer addOrders(Orders order) {
		return orderDAO.addOrders(order);
	}

	@Override
	public Orders selectOrders(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Orders> listOrdersByQuery(OrderQuery query) {
		return orderDAO.listOrdersByQuery(query);
	}

	@Override
	public Integer deleteOrdersById(Integer orderId) {
		return orderDAO.deleteOrdersById(orderId);
	}

	@Override
	public Orders selectOrdersByUname(String uname) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Orders selectOrdersByMobile(String mobile) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Orders selectOrdersByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Orders selectOrdersById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer updateOrders(Orders order) {
		return orderDAO.updateOrders(order);
	}

	@Override
	public Orders selectOrdersByUname(String uname, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Orders selectOrdersByMobile(String mobile, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Orders selectOrdersByEmail(String email, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	
}
