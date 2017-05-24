package com.jesse.domain;

import java.util.Date;

public class User extends DomainBase{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8645859257287689880L;
	
	private Integer id;
	private Integer homeId;
	private String uname;
	private String email;
	private String password;
	private String pwAnswer;
	private String pwQuestion;
	private String name;
	private Integer sex;
	private Date birthday;
	private Integer provinceId;
	private Integer cityId;
	private Integer regionId;
	private String province;
	private String city;
	private String region;
	private String address;
	private String zip;
	private String mobile;
	private String tel;
	private Long lastlogin;
	private Integer logincount;
	private String face;
	private String nickname;
	private String remark;
	private String homeName;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getHomeId() {
		return homeId;
	}

	public void setHomeId(Integer homeId) {
		this.homeId = homeId;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPwAnswer() {
		return pwAnswer;
	}

	public void setPwAnswer(String pwAnswer) {
		this.pwAnswer = pwAnswer;
	}

	public String getPwQuestion() {
		return pwQuestion;
	}

	public void setPwQuestion(String pwQuestion) {
		this.pwQuestion = pwQuestion;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public Integer getProvinceId() {
		return provinceId;
	}

	public void setProvinceId(Integer provinceId) {
		this.provinceId = provinceId;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Long getLastlogin() {
		return lastlogin;
	}

	public void setLastlogin(Long lastlogin) {
		this.lastlogin = lastlogin;
	}

	public Integer getLogincount() {
		return logincount;
	}

	public void setLogincount(Integer logincount) {
		this.logincount = logincount;
	}

	public String getFace() {
		return face;
	}

	public void setFace(String face) {
		this.face = face;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getHomeName() {
		return homeName;
	}

	public void setHomeName(String homeName) {
		this.homeName = homeName;
	}

}
