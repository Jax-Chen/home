package com.jesse.web.action;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jesse.common.utils.DateUtil;
import com.jesse.common.utils.StringUtil;
import com.jesse.domain.Home;
import com.jesse.domain.User;
import com.jesse.domain.query.UserQuery;
import com.jesse.service.HomeService;
import com.jesse.service.UserService;
import com.jesse.web.ws.response.Result;

@Controller
public class UserAction extends BaseAction {

	@Autowired
	private UserService userService;
	
	@Autowired
	private HomeService homeService;
	
	@RequestMapping(value="/bops/index.do")
	public String index( ModelMap model,HttpServletRequest request,HttpSession session){
		
		System.out.println("1111");
		
		
		return "index";
	}
	
	@RequestMapping(value="/bops/userList.do")
	public String userList(@ModelAttribute("page")UserQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		userService.listUserByQuery(page);
		
		page.setUrl("/bops/userList.do");
		
		return "user/userList";
	}
	
	
	@RequestMapping(value = "/bops/user/delete.do", method = RequestMethod.POST)
	public @ResponseBody Result delete(HttpServletRequest request){
	    String idStr = request.getParameter("userId");
	    
	    Result result = new Result();
	    if(!StringUtil.isNumber(idStr)) {
	        return result.failure(101, "参数错误");
	    }
	    
	    Integer id = Integer.valueOf(idStr);
	    
	    try {
	    	userService.deleteUserById(id);
	    	return result.success(id);
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/bops/user/add.do", method = RequestMethod.POST)
	public @ResponseBody Result add(HttpServletRequest request){
		
		String homeId = request.getParameter("homeId");
		String name = request.getParameter("name");
		String uname = request.getParameter("uname");
		String mobile = request.getParameter("mobile");
		
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		String sex = request.getParameter("sex");
		
		String birthday = request.getParameter("birthday");
		String tel = request.getParameter("tel");
		String address = request.getParameter("address");
		String remark = request.getParameter("remark");
	
		Result result = new Result();
		if(userService.selectUserByUname(uname)!=null){
			return result.failure(101, "登录账号已存在");
		}
		if(userService.selectUserByMobile(mobile)!=null){
			return result.failure(101, "手机号已存在");
		}
		if(userService.selectUserByEmail(email)!=null){
			return result.failure(101, "邮箱已存在");
		}
		
		User user = new User();
		user.setHomeId(Integer.valueOf(homeId));
		user.setName(name);
		user.setUname(uname);
		user.setMobile(mobile);
		
		user.setPassword(password);
		user.setEmail(email);
		user.setSex(Integer.valueOf(sex));
		
		try {
			if(StringUtil.isNotBlank(birthday)){
				user.setBirthday(DateUtil.convertStringToDate(birthday));
			}
		} catch (ParseException e1) {
			e1.printStackTrace();
			return result.failure(102, "生日格式不对");
		}
		user.setTel(tel);
		user.setAddress(address);
		user.setRemark(remark);
		
	    try {
	    	userService.addUser(user);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/bops/user/detail.do", method = RequestMethod.POST)
	public @ResponseBody Result detail(HttpServletRequest request){
	    String idStr = request.getParameter("userId");
	    
	    Result result = new Result();
	    if(!StringUtil.isNumber(idStr)) {
	        return result.failure(101, "参数错误");
	    }
	    
	    Integer id = Integer.valueOf(idStr);
	    
	    try {
	    	User user = userService.selectUserById(id);
	    	List<Home> hList = homeService.listAllHome();
	    	
	    	Map map = new HashMap();
	    	map.put("user", user);
	    	map.put("hList", hList);
	    	result.setRetObj(map);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/bops/user/edit.do", method = RequestMethod.POST)
	public @ResponseBody Result edit(HttpServletRequest request){
		
		String userId = request.getParameter("userId");
		String homeId = request.getParameter("homeId");
		String name = request.getParameter("name");
		String uname = request.getParameter("uname");
		String mobile = request.getParameter("mobile");
		
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		String sex = request.getParameter("sex");
		
		String birthday = request.getParameter("birthday");
		String tel = request.getParameter("tel");
		String address = request.getParameter("address");
		String remark = request.getParameter("remark");
	
		Result result = new Result();
		
		if(!StringUtil.isNumeric(userId)){
			return result.failure(101, "参数错误");
		}
		if(userService.selectUserByUname(uname,Integer.valueOf(userId))!=null){
			return result.failure(101, "登录账号已存在");
		}
		if(userService.selectUserByMobile(mobile,Integer.valueOf(userId))!=null){
			return result.failure(101, "手机号已存在");
		}
		if(userService.selectUserByEmail(email,Integer.valueOf(userId))!=null){
			return result.failure(101, "邮箱已存在");
		}
		
		User user = new User();
		user.setId(Integer.valueOf(userId));
		user.setHomeId(Integer.valueOf(homeId));
		user.setName(name);
		user.setUname(uname);
		user.setMobile(mobile);
		
		user.setPassword(password);
		user.setEmail(email);
		user.setSex(Integer.valueOf(sex));
		
		try {
			if(StringUtil.isNotBlank(birthday)){
				user.setBirthday(DateUtil.convertStringToDate(birthday));
			}
		} catch (ParseException e1) {
			e1.printStackTrace();
			return result.failure(102, "生日格式不对");
		}
		user.setTel(tel);
		user.setAddress(address);
		user.setRemark(remark);
		
	    try {
	    	userService.updateUser(user);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/front/user/detailView.do")
	public String detailView(@ModelAttribute("page")UserQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		User user = (User) request.getSession().getAttribute("user");
		
		model.put("user", user);
		
		page.setUrl("/front/user/detailView.do");
		
		return "front/userDetail";
	}
	
	@RequestMapping(value = "/front/user/detailFront.do", method = RequestMethod.POST)
	public @ResponseBody Result detailFront(HttpServletRequest request){
	    String idStr = request.getParameter("userId");
	    
	    Result result = new Result();
	    if(!StringUtil.isNumber(idStr)) {
	        return result.failure(101, "参数错误");
	    }
	    
	    Integer id = Integer.valueOf(idStr);
	    
	    try {
	    	User user = userService.selectUserById(id);
	    	List<Home> hList = homeService.listAllHome();
	    	
	    	Map map = new HashMap();
	    	map.put("user", user);
	    	map.put("hList", hList);
	    	result.setRetObj(map);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/front/user/editFront.do", method = RequestMethod.POST)
	public @ResponseBody Result editFront(HttpServletRequest request){
		
		String userId = request.getParameter("userId");
		String homeId = request.getParameter("homeId");
		String name = request.getParameter("name");
		String uname = request.getParameter("uname");
		String mobile = request.getParameter("mobile");
		
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		String sex = request.getParameter("sex");
		
		String birthday = request.getParameter("birthday");
		String tel = request.getParameter("tel");
		String address = request.getParameter("address");
		String remark = request.getParameter("remark");
	
		Result result = new Result();
		
		if(!StringUtil.isNumeric(userId)){
			return result.failure(101, "参数错误");
		}
		if(userService.selectUserByUname(uname,Integer.valueOf(userId))!=null){
			return result.failure(101, "登录账号已存在");
		}
		if(userService.selectUserByMobile(mobile,Integer.valueOf(userId))!=null){
			return result.failure(101, "手机号已存在");
		}
		if(userService.selectUserByEmail(email,Integer.valueOf(userId))!=null){
			return result.failure(101, "邮箱已存在");
		}
		
		User user = new User();
		user.setId(Integer.valueOf(userId));
		user.setHomeId(Integer.valueOf(homeId));
		user.setName(name);
		user.setUname(uname);
		user.setMobile(mobile);
		
		user.setPassword(password);
		user.setEmail(email);
		user.setSex(Integer.valueOf(sex));
		
		try {
			if(StringUtil.isNotBlank(birthday)){
				user.setBirthday(DateUtil.convertStringToDate(birthday));
			}
		} catch (ParseException e1) {
			e1.printStackTrace();
			return result.failure(102, "生日格式不对");
		}
		user.setTel(tel);
		user.setAddress(address);
		user.setRemark(remark);
		
	    try {
	    	userService.updateUser(user);
	    	User userNew = userService.selectUserById(user.getId());
	    	
	    	request.getSession().setAttribute("user", userNew);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
}
