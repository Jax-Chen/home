package com.jesse.web.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jesse.domain.SystemUser;
import com.jesse.domain.User;
import com.jesse.service.SystemUserService;
import com.jesse.service.UserService;

@Controller
public class SystemAction extends BaseAction {
	
	@Autowired
	private SystemUserService systemUserService;
	
	@Autowired
	private UserService userService;
	
	/**
	 * 登录
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/bops/login.do",method = RequestMethod.GET)
	public String loginViewBops(ModelMap model,HttpServletRequest request,HttpSession session){
//		User user = (User) session.getAttribute("user");
//		System.out.println(user.getUname());
		
//		userService.addUser(new User());
		
		
		return "login";
	}
	
	@RequestMapping(value="/bops/login.do",method = RequestMethod.POST)
	public String loginBops(ModelMap model,HttpServletRequest request,HttpSession session){
		
		String uname = request.getParameter("uname");
		String password = request.getParameter("password");
		
		SystemUser user = systemUserService.selectUser(uname, password);
		if(user == null){
			model.put("result", "用户名或密码错误");
			return "login";
		}else{
			session.setAttribute("systemUser", user);
			return "redirect:/bops/index.do";
		}
		
		
	}
	
	@RequestMapping(value="/bops/register.do",method = RequestMethod.GET)
	public String registerView(ModelMap model){
		
		return "register";
	}
	
	@RequestMapping(value="/bops/register.do",method = RequestMethod.POST)
	public String register(@ModelAttribute("user")SystemUser user, ModelMap model,HttpServletRequest request,HttpSession session){
		
		user.setIsSuperAdmin(0);
		systemUserService.addUser(user);
		
		session.setAttribute("systemUser", user);
		
		return "login";
	}
	
	@RequestMapping(value="/bops/logout.do")
	public String logout(ModelMap model,HttpServletRequest request,HttpSession session){
		session.setAttribute("systemUser", null);
		
		return "login";
	}
	
	
	@RequestMapping(value="/front/login.do",method = RequestMethod.GET)
	public String loginViewFront(ModelMap model,HttpServletRequest request,HttpSession session){
//		User user = (User) session.getAttribute("user");
//		System.out.println(user.getUname());
		
//		userService.addUser(new User());
		
		
		return "front/login";
	}
	
	@RequestMapping(value="/front/login.do",method = RequestMethod.POST)
	public String loginFront(ModelMap model,HttpServletRequest request,HttpSession session){
		
		String uname = request.getParameter("uname");
		String password = request.getParameter("password");
		
		User user = userService.selectUser(uname, password);
		if(user == null){
			model.put("result", "用户名或密码错误");
			return "front/login";
		}else{
			session.setAttribute("user", user);
			session.setAttribute("age", "11");
			return "redirect:/front/index.do";
		}
	}
	
	@RequestMapping(value="/front/logout.do")
	public String logoutFront(ModelMap model,HttpServletRequest request,HttpSession session){
		session.setAttribute("user", null);
		
		return "front/login";
	}
}
