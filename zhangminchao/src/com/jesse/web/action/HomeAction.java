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
import com.jesse.domain.query.HomeQuery;
import com.jesse.service.HomeService;
import com.jesse.web.ws.response.Result;

@Controller
public class HomeAction extends BaseAction {

	@Autowired
	private HomeService homeService;
	
	@RequestMapping(value="/bops/homeList.do")
	public String userList(@ModelAttribute("page")HomeQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		homeService.listHomeByQuery(page);
		
		page.setUrl("/bops/homeList.do");
		
		return "home/homeList";
	}
	
	
	@RequestMapping(value = "/bops/home/delete.do", method = RequestMethod.POST)
	public @ResponseBody Result delete(HttpServletRequest request){
	    String idStr = request.getParameter("homeId");
	    
	    Result result = new Result();
	    if(!StringUtil.isNumber(idStr)) {
	        return result.failure(101, "参数错误");
	    }
	    
	    Integer id = Integer.valueOf(idStr);
	    
	    try {
	    	homeService.deleteHomeById(id);
	    	return result.success(id);
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	}
	
	@RequestMapping(value="/bops/home/listAllHome.do")
	public @ResponseBody Result listAllHome(HttpServletRequest request){
		
		Result result = new Result();
		
		try {
	    	List<Home> hList = homeService.listAllHome();
	    	result.setRetObj(hList);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
		
	}
	
	@RequestMapping(value = "/bops/home/add.do", method = RequestMethod.POST)
	public @ResponseBody Result add(HttpServletRequest request){
		
		String name = request.getParameter("name");
		String zIndex = request.getParameter("zIndex");
		String managerName = request.getParameter("managerName");
		
		String managerMobile = request.getParameter("managerMobile");
		String address = request.getParameter("address");
		String mark = request.getParameter("mark");
		
		Result result = new Result();
		if(homeService.selectHomeByName(name)!=null){
			return result.failure(101, "社区名称已存在");
		}
		
		Home home = new Home();
		home.setName(name);
		if(StringUtil.isNumber(zIndex)){
			home.setzIndex(Integer.valueOf(zIndex));
		}
		home.setManagerName(managerName);
		
		home.setManagerMobile(managerMobile);
		home.setAddress(address);
		home.setMark(mark);
		
		
	    try {
	    	homeService.addHome(home);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/bops/home/detail.do", method = RequestMethod.POST)
	public @ResponseBody Result detail(HttpServletRequest request){
	    String idStr = request.getParameter("homeId");
	    
	    Result result = new Result();
	    if(!StringUtil.isNumber(idStr)) {
	        return result.failure(101, "参数错误");
	    }
	    
	    Integer id = Integer.valueOf(idStr);
	    
	    try {
	    	Home home = homeService.selectHomeById(id);
	    	
	    	result.setRetObj(home);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/bops/home/edit.do", method = RequestMethod.POST)
	public @ResponseBody Result edit(HttpServletRequest request){
		
		String idStr = request.getParameter("homeId");
		String name = request.getParameter("name");
		String zIndex = request.getParameter("zIndex");
		String managerName = request.getParameter("managerName");
		
		String managerMobile = request.getParameter("managerMobile");
		String address = request.getParameter("address");
		String mark = request.getParameter("mark");
		
		Result result = new Result();
		if(!StringUtil.isNumber(idStr)) {
	        return result.failure(101, "参数错误");
	    }
		
		if(homeService.selectHomeByName(name,Integer.valueOf(idStr))!=null){
			return result.failure(101, "社区名称已存在");
		}
		
		Home home = new Home();
		home.setId(Integer.valueOf(idStr));
		home.setName(name);
		if(StringUtil.isNumber(zIndex)){
			home.setzIndex(Integer.valueOf(zIndex));
		}
		home.setManagerName(managerName);
		
		home.setManagerMobile(managerMobile);
		home.setAddress(address);
		home.setMark(mark);
		
		
	    try {
	    	homeService.updateHome(home);
	    	return result.success();
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
}
