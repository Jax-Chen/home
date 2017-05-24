package com.jesse.domain.query;

import java.util.Date;

import com.jesse.common.page.Pagination;
import com.jesse.domain.User;

public class UserQuery extends Pagination<User> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8027251636851963890L;

	private String homeName;
	
	private String email;
	
	private Date createFromTime;
	
	private Date createEndTime;

	private String mobile;
	
	private String uname;
	
	private String address;
	
	private Date birthdayFromTime;
	
	private Date birthdayEndTime;
	
	public String getHomeName() {
		return homeName;
	}

	public void setHomeName(String homeName) {
		this.homeName = homeName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreateFromTime() {
		return createFromTime;
	}

	public void setCreateFromTime(Date createFromTime) {
		this.createFromTime = createFromTime;
	}

	public Date getCreateEndTime() {
		return createEndTime;
	}

	public void setCreateEndTime(Date createEndTime) {
		this.createEndTime = createEndTime;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getBirthdayFromTime() {
		return birthdayFromTime;
	}

	public void setBirthdayFromTime(Date birthdayFromTime) {
		this.birthdayFromTime = birthdayFromTime;
	}

	public Date getBirthdayEndTime() {
		return birthdayEndTime;
	}

	public void setBirthdayEndTime(Date birthdayEndTime) {
		this.birthdayEndTime = birthdayEndTime;
	}
	
	
	
}
