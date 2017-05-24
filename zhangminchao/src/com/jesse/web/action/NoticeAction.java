package com.jesse.web.action;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.open.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jesse.domain.Notice;
import com.jesse.domain.query.NoticeQuery;
import com.jesse.service.HomeService;
import com.jesse.service.NoticeService;
import com.jesse.service.OrderService;
import com.jesse.service.UserService;
import com.jesse.web.ws.response.Result;

@Controller
public class NoticeAction extends BaseAction {

	@Autowired
	private UserService userService;
	
	@Autowired
	private HomeService homeService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private NoticeService noticeService;
	
	@RequestMapping(value="/public/noticeList.do")
	public String userList(@ModelAttribute("page")NoticeQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		noticeService.listNoticeByQuery(page);
		
		page.setUrl("/public/noticeList.do");
		
		return "public/noticeList";
	}
	
	
	@RequestMapping(value="/public/notice/detail.do")
	public String detail(@ModelAttribute("page")NoticeQuery page, ModelMap model,HttpServletRequest request,HttpSession session){
		
		String noticeId = request.getParameter("noticeId");
		
		if(StringUtil.isBlank(noticeId)){
			return "redirect:/public/noticeList.do";
		}
		
		Notice notice = noticeService.selectNoticeById(Integer.valueOf(noticeId));
		
		Integer res = notice.getBrowse() + 1;
		
		notice.setBrowse(res);
		
		noticeService.updateNotice(notice);
		
		model.put("notice", notice);
		
		return "public/noticeDetail";
	}
	
	@RequestMapping(value = "/bops/notice/delete.do", method = RequestMethod.POST)
	public @ResponseBody Result delete(HttpServletRequest request){
		
		String noticeId = request.getParameter("noticeId");
		
		Result result = new Result();
		if(StringUtil.isBlank(noticeId)){
			return result.failure(101, "参数错误");
		}
		
	    try {
	    	noticeService.deleteNoticeById(Integer.valueOf(noticeId));
	    	return result.success();
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return result.failure(102, "操作失败");
		}
	    
	}
	
	@RequestMapping(value = "/bops/notice/add.do", method = RequestMethod.POST)
	public @ResponseBody Result add(HttpServletRequest request){
		
		String title = request.getParameter("title");
		String author = request.getParameter("author");
		
		String tag1 = request.getParameter("tag1");
		String tag2 = request.getParameter("tag2");
		String tag3 = request.getParameter("tag3");
		
		String content = request.getParameter("content");
		
		Result result = new Result();
		
		Notice notice = new Notice();
		notice.setTitle(title);
		notice.setAuthor(author);
		notice.setTag1(tag1);
		notice.setTag2(tag2);
		notice.setTag3(tag3);
		notice.setContent(content);
		notice.setBrowse(0);
		notice.setCreateTime(new Date());
		
	    try {
	    	noticeService.addNotice(notice);
	    	return result.success();
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return result.failure(102, "操作失败");
		}
	    
	}
	
}
