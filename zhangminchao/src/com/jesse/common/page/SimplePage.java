package com.jesse.common.page;

import java.util.List;

import com.jesse.domain.DomainBase;


/**
 * 来自JEECMS中的分页SimplePage类, 修改为抽象类
 */
public abstract class SimplePage<T> extends DomainBase implements Paginable<T> {

    private static final long serialVersionUID = 6770910398432661850L;

    public static final int DEF_COUNT = 20;

    public static final int PAGE_COUNT = 10;

    public SimplePage() {
    }

    public SimplePage(int pageNo, int pageSize, int totalCount) {
        if (totalCount <= 0) {
            this.totalCount = 0;
        } else {
            this.totalCount = totalCount;
        }
        if (pageSize <= 0) {
            this.pageSize = DEF_COUNT;
        } else {
            this.pageSize = pageSize;
        }
        if (pageNo <= 0) {
            this.pageNo = 1;
        } else {
            this.pageNo = pageNo;
        }
        if ((this.pageNo - 1) * this.pageSize >= totalCount) {
            this.pageNo = totalCount / pageSize;
        }
    }

    /**
     * 调整分页参数，使合理化
     */
    public void adjustPage() {
        if (totalCount <= 0) {
            totalCount = 0;
        }
        if (pageSize <= 0) {
            pageSize = DEF_COUNT;
        }
        if ((pageNo - 1) * pageSize >= totalCount) {
            pageNo = totalCount / pageSize;
        }
        if (pageNo <= 0) {
            pageNo = 1;
        }
    }

    public int getPageNo() {
        return pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public int getTotalPage() {
        int totalPage = totalCount / pageSize;
        if (totalCount % pageSize != 0 || totalPage == 0) {
            totalPage++;
        }
        return totalPage;
    }

    public boolean isFirstPage() {
        return pageNo <= 1;
    }

    public boolean isLastPage() {
        //return getTotalPage() <= ((pageNo-1)/pageSize+1)*pageSize;
    	return getTotalPage() <= pageNo;
    }

    public int getNextPage() {
//        if (isLastPage()) {
//            return pageNo;
//        } else {
//            return Math.min(pageNo + 10,getTotalPage());
//        }
    	
    	if (pageNo + 1 >= getTotalPage()) {
    		return getTotalPage();
    	} else {
    		return pageNo + 1;
    	}
    }

    public int getPrePage() {
//        if (isFirstPage()) {
//            return pageNo;
//        } else {
//            return Math.max(pageNo - 10,1);
//        }
        
        if (pageNo - 1 <= 1) {
    		return 1;
    	} else {
    		return pageNo - 1;
    	}
    }

    protected int totalCount = 0;
    protected int pageSize = 20;
    protected int pageNo = 1;
    protected int startRow = 0;
    protected int endRow = 0;
    protected String orderStr;

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getStartRow() {
        return startRow;
    }

    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }

    public int getEndRow() {
        return endRow;
    }

    public void setEndRow(int endRow) {
        this.endRow = endRow;
    }

    public String getOrderStr() {
        return orderStr;
    }

    public void setOrderStr(String orderStr) {
        this.orderStr = orderStr;
    }

    public int getBeginIndex() {
        if (pageNo > 0) {
            return (pageSize * (pageNo - 1)) ;
        } else {
            return 0;
        }
    }

    public int getEndIndex() {
        if (pageNo > 0) {
            return Math.min(pageSize * pageNo, totalCount);
        } else {
            return 0;
        }
    }

    public int getBeginPage() {
        if (pageNo > 0) {
            return (PAGE_COUNT * ((pageNo-1)/PAGE_COUNT)) + 1;
        } else {
            return 0;
        }
    }

    public int getEndPage() {
        if (pageNo > 0) {
            return Math.min(PAGE_COUNT * ((pageNo-1)/PAGE_COUNT+1), getTotalPage());
        } else {
            return 0;
        }
    }

    /**
     * 取得分页数据, 子类请重写此方法
     *
     * @return List<T> 分页数据
     * @see com.hrhutui.bussiness.common.page.Paginable#getDate()
     */
    public List<T> getData() {
        return null;
    }

    /**
     * 设置分页数据, 子类请重写此方法
     *
     * @param List<T> 分页数据
     */
    public void setData(List<T> data) {
    }

}
