package com.jesse.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jesse.dao.BaseDAO;
import com.jesse.dao.ChatDAO;
import com.jesse.domain.Chat;
import com.jesse.domain.query.ChatQuery;


@Repository("chatDAO")
public class ChatDAOImpl extends BaseDAO implements ChatDAO {
	
	@Override
	protected String getNameSpace() {
		return "ChatMapper.";
	}

	@Override
	public Integer addChat(Chat chat) {
		return insert("insert", chat);
	}

	@Override
	public Chat selectChat(String uname, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Chat> listChatByQuery(ChatQuery query) {
		getPagination(query, "listChatByQueryCount", "listChatByQuery");
		return query.getData();
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
