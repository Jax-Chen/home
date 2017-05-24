package com.jesse.service;

import java.util.List;

import com.jesse.domain.Chat;
import com.jesse.domain.query.ChatQuery;

public interface ChatService {
	
	Integer addChat(Chat chat);
	
	Chat selectChat(String uname,String password);
	
	List<Chat> listChatByQuery(ChatQuery query);
	
	Integer deleteChatById(Integer chatId);
	
	Chat selectChatByUname(String uname);
	
	Chat selectChatByMobile(String mobile);
	
	Chat selectChatByEmail(String email);
	
	Chat selectChatById(Integer id);
	
	Integer updateChat(Chat chat);
	
	Chat selectChatByUname(String uname,Integer id);
	
	Chat selectChatByMobile(String mobile,Integer id);
	
	Chat selectChatByEmail(String email,Integer id);
}
