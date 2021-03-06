package com.jesse.dao;

import java.util.List;

import com.jesse.domain.Orders;
import com.jesse.domain.User;
import com.jesse.domain.query.OrderQuery;
import com.jesse.domain.query.UserQuery;

public interface OrderDAO {

	Integer addOrders(Orders order);
	
	Orders selectOrders(String uname,String password);
	
	List<Orders> listOrdersByQuery(OrderQuery query);
	
	Integer deleteOrdersById(Integer orderId);
	
	Orders selectOrdersByUname(String uname);
	
	Orders selectOrdersByMobile(String mobile);
	
	Orders selectOrdersByEmail(String email);
	
	Orders selectOrdersById(Integer id);
	
	Integer updateOrders(Orders order);
	
	Orders selectOrdersByUname(String uname,Integer id);
	
	Orders selectOrdersByMobile(String mobile,Integer id);
	
	Orders selectOrdersByEmail(String email,Integer id);
}
