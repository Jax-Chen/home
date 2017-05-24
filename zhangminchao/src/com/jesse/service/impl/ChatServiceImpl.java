package com.jesse.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jesse.dao.ChatDAO;
import com.jesse.dao.NoticeDAO;
import com.jesse.dao.UserDAO;
import com.jesse.domain.Chat;
import com.jesse.domain.query.ChatQuery;
import com.jesse.service.BaseManager;
import com.jesse.service.ChatService;

@Service("chatService")
@Transactional
public class ChatServiceImpl extends BaseManager implements ChatService {

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private NoticeDAO noticeDAO;
	
	@Autowired
	private ChatDAO chatDAO;

	@Override
	public Integer addChat(Chat chat) {
		return chatDAO.addChat(chat);
	}

	@Override
	public Chat selectChat(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Chat> listChatByQuery(ChatQuery query) {
		return chatDAO.listChatByQuery(query);
	}

	@Override
	public Integer deleteChatById(Integer chatId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Chat selectChatByUname(String uname) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Chat selectChatByMobile(String mobile) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Chat selectChatByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Chat selectChatById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer updateChat(Chat chat) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Chat selectChatByUname(String uname, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Chat selectChatByMobile(String mobile, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Chat selectChatByEmail(String email, Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	

	
	
	
}
