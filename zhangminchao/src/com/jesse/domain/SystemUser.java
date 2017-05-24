package com.jesse.domain;

public class SystemUser extends DomainBase{


	/**
	 * 
	 */
	private static final long serialVersionUID = -5213835424571347914L;

	private Integer id;
	
	private String uname;
	
	private String password;
	
	private Integer isSuperAdmin;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getIsSuperAdmin() {
		return isSuperAdmin;
	}

	public void setIsSuperAdmin(Integer isSuperAdmin) {
		this.isSuperAdmin = isSuperAdmin;
	}

	

}
