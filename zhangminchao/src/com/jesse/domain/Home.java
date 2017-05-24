package com.jesse.domain;

public class Home{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5440515161162242721L;

	private Integer id;

    private String name;

    private String address;

    private String mark;

    private Integer zIndex;

    private String managerName;
    
    private String managerMobile;
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public Integer getzIndex() {
        return zIndex;
    }

    public void setzIndex(Integer zIndex) {
        this.zIndex = zIndex;
    }

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public String getManagerMobile() {
		return managerMobile;
	}

	public void setManagerMobile(String managerMobile) {
		this.managerMobile = managerMobile;
	}
}