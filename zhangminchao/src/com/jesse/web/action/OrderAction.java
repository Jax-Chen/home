package com.jesse.web.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jesse.common.utils.StringUtil;
import com.jesse.domain.Orders;
import com.jesse.domain.User;
import com.jesse.domain.query.OrderQuery;
import com.jesse.service.HomeService;
import com.jesse.service.OrderService;
import com.jesse.service.UserService;
import com.jesse.web.ws.response.Result;

@Controller
public class OrderAction extends BaseAction {

	@Autowired
	private UserService userService;
	
	@Autowired
	private HomeService homeService;
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping(value="/front/index.do")
	public String index( ModelMap model,HttpServletRequest request,HttpSession session){
		
		System.out.println("2222");
		
		
		return "front/index";
	}
	
	@RequestMapping(value="/front/orderList.do")
	public String userList(@ModelAttribute("page")OrderQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		User user = (User)session.getAttribute("user");
		
		page.setUserId(user.getId());
		
		orderService.listOrdersByQuery(page);
		
		page.setUrl("/front/orderList.do");
		
		return "front/orderList";
	}
	
	@RequestMapping(value = "/front/order/add.do", method = RequestMethod.POST)
	public @ResponseBody Result add(HttpServletRequest request){
		
		String mark = request.getParameter("mark");
		String type = request.getParameter("type");
		
		Result result = new Result();
		if(StringUtil.isBlank(mark)){
			return result.failure(101, "订单内容不能为空！");
		}
		
		if(!StringUtil.isNumeric(type)){
			return result.failure(101, "参数错误！");
		}
		
		Orders order = new Orders();
		User user = (User) request.getSession().getAttribute("user");
		if(user == null){
			return result.failure(101, "登录超时！");
		}
		order.setUserid(user.getId());
		order.setStatus(0);
		order.setMark(mark);
		order.setType(Integer.valueOf(type));
		
	    try {
	    	orderService.addOrders(order);
	    	return result.success();
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return result.failure(102, "操作失败");
		}
	    
	}
	
	@RequestMapping(value = "/front/order/update.do", method = RequestMethod.POST)
	public @ResponseBody Result update(HttpServletRequest request){
		
		String status = request.getParameter("status");
		String orderId = request.getParameter("orderId");
		
		Result result = new Result();
		if(StringUtil.isBlank(status) || StringUtil.isBlank(orderId)){
			return result.failure(101, "参数错误");
		}
		
		Orders order = new Orders();
		order.setId(Integer.valueOf(orderId));
		order.setStatus(Integer.valueOf(status));
		
	    try {
	    	orderService.updateOrders(order);
	    	return result.success();
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return result.failure(102, "操作失败");
		}
	    
	}
	
	@RequestMapping(value = "/front/order/delete.do", method = RequestMethod.POST)
	public @ResponseBody Result delete(HttpServletRequest request){
		
		String orderId = request.getParameter("orderId");
		
		Result result = new Result();
		if(!StringUtil.isNumeric(orderId)){
			return result.failure(101, "参数错误");
		}
		
		
	    try {
	    	orderService.deleteOrdersById(Integer.valueOf(orderId));
	    	return result.success();
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return result.failure(102, "操作失败");
		}
	    
	}
	
	@RequestMapping(value="/bops/orderList.do")
	public String userListBops(@ModelAttribute("page")OrderQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		
		orderService.listOrdersByQuery(page);
		
		page.setUrl("/bops/orderList.do");
		
		return "order/orderList";
	}
	
	@RequestMapping(value = "/bops/order/update.do", method = RequestMethod.POST)
	public @ResponseBody Result updateBops(HttpServletRequest request){
		
		String status = request.getParameter("status");
		String orderId = request.getParameter("orderId");
		
		Result result = new Result();
		if(StringUtil.isBlank(status) || StringUtil.isBlank(orderId)){
			return result.failure(101, "参数错误");
		}
		
		Orders order = new Orders();
		order.setId(Integer.valueOf(orderId));
		order.setStatus(Integer.valueOf(status));
		
	    try {
	    	orderService.updateOrders(order);
	    	return result.success();
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return result.failure(102, "操作失败");
		}
	    
	}
	
	@RequestMapping(value = "/bops/order/delete.do", method = RequestMethod.POST)
	public @ResponseBody Result deleteBops(HttpServletRequest request){
		
		String orderId = request.getParameter("orderId");
		
		Result result = new Result();
		if(!StringUtil.isNumeric(orderId)){
			return result.failure(101, "参数错误");
		}
		
		
	    try {
	    	orderService.deleteOrdersById(Integer.valueOf(orderId));
	    	return result.success();
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return result.failure(102, "操作失败");
		}
	    
	}
}
