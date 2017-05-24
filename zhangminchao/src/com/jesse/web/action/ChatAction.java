package com.jesse.web.action;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jesse.domain.Chat;
import com.jesse.domain.User;
import com.jesse.domain.query.ChatQuery;
import com.jesse.domain.query.UserQuery;
import com.jesse.service.ChatService;
import com.jesse.service.HomeService;
import com.jesse.service.NoticeService;
import com.jesse.service.OrderService;
import com.jesse.service.UserService;
import com.jesse.web.ws.response.Result;

@Controller
public class ChatAction extends BaseAction {

	@Autowired
	private UserService userService;
	
	@Autowired
	private HomeService homeService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private NoticeService noticeService;
	
	@Autowired
	private ChatService chatService;
	
	@RequestMapping(value="/public/chatList.do")
	public String userList(@ModelAttribute("page")ChatQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		chatService.listChatByQuery(page);
		
		UserQuery uq = new UserQuery();
		uq.setPageSize(1000);
		List<User> uList = userService.listUserByQuery(uq);
		
		page.setuList(uList);
		
		page.setUrl("/public/chatList.do");
		
		return "chat/chatList";
	}
	
	@RequestMapping(value = "/public/chat/add.do", method = RequestMethod.POST)
	public @ResponseBody Result add(HttpServletRequest request){
		String content = request.getParameter("content");
		
	    User user = (User) request.getSession().getAttribute("user");
		
		Result result = new Result();
	    
	    Chat chat = new Chat();
	    chat.setCreateTime(new Date());
	    chat.setContent(content);
	    
	    if(user!=null){
	    	chat.setSend(user.getId());
	    	chat.setName(user.getName());
	    }else{
	    	chat.setSend(-1);
	    	chat.setName("管理员");
	    }
	    
	    
	    try {
	    	chatService.addChat(chat);
	    	
	    	return result.success(chat);
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
	@RequestMapping(value = "/public/chat/list.do", method = RequestMethod.POST)
	public @ResponseBody Result list(HttpServletRequest request){
	    
		
		Result result = new Result();
		
		ChatQuery page = new ChatQuery();
		page.setPageSize(1000);
		
	    try {
	    	chatService.listChatByQuery(page);
	    	
	    	return result.success(page.getData());
	    	
		} catch (Exception e) {
			return result.failure(102, "操作失败");
		}
	    
	    
	}
	
}
