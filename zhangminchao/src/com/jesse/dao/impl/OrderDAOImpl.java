package com.jesse.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jesse.dao.BaseDAO;
import com.jesse.dao.OrderDAO;
import com.jesse.domain.Orders;
import com.jesse.domain.User;
import com.jesse.domain.query.OrderQuery;
import com.jesse.domain.query.UserQuery;


@Repository("orderDAO")
public class OrderDAOImpl extends BaseDAO implements OrderDAO {
	
	@Override
	protected String getNameSpace() {
		return "OrdersMapper.";
	}

	@Override
	public Integer addOrders(Orders order) {
		return insert("insert", order);
	}

	@Override
	public Orders selectOrders(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Orders> listOrdersByQuery(OrderQuery query) {
		getPagination(query, "listOrdersByQueryCount", "listOrdersByQuery");
		return query.getData();
	}

	@Override
	public Integer deleteOrdersById(Integer orderId) {
		return delete("deleteByPrimaryKey", orderId);
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
		return update("updateByPrimaryKeySelective", order);
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
