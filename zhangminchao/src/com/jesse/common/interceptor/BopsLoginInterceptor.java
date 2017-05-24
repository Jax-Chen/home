package com.jesse.common.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.jesse.domain.SystemUser;

public class BopsLoginInterceptor implements HandlerInterceptor{

	private List<String> allowUrls;
	
	public List<String> getAllowUrls() {
		return allowUrls;
	}
	public void setAllowUrls(List<String> allowUrls) {
		this.allowUrls = allowUrls;
	}
	
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {

		String requestUri = request.getRequestURI();
		
		for(String url : allowUrls){
			if(requestUri.endsWith(url)){
				return true;
			}
		}
		
		HttpSession session = request.getSession();
		
		SystemUser user = (SystemUser) session.getAttribute("systemUser");
		
		if(user != null){
			return true;
		}
		
		request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);  
		
		return false;
	}

}
