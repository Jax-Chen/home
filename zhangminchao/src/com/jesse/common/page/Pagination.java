package com.jesse.common.page;

import java.util.List;

/**
 * 来自JEECMS中的分页Pagination类, 实现了Paginable接口的getDate()方法
 */
public class Pagination<T> extends SimplePage<T> {

    private static final long serialVersionUID = 6398443093873035070L;
    // 显示的页数
    private static final int Show_Page_Tab_Num = 9;
    
    private String url;
    
    public Pagination() {
    }

    public Pagination(int pageNo, int pageSize, int totalCount) {
        super(pageNo, pageSize, totalCount);
    }

    @SuppressWarnings("unchecked")
    public Pagination(int pageNo, int pageSize, int totalCount, List list) {
        super(pageNo, pageSize, totalCount);
        this.list = list;
    }

    public int getFirstResult() {
        return (pageNo - 1) * pageSize;
    }

    /**
     * 当前页的数据
     */
    private List<T> list;

    /**
     * 取得分页数据
     *
     * @return List<T> 分页数据
     */
    public List<T> getData() {
        return list;
    }

    /**
     * 设置分页数据
     *
     * @param date 分页数据
     */
    public void setData(List<T> data) {
        this.list = data;
    }
    
    public int[] getStartPageAndEndPage() {
		int[] pageContent = new int[2];
		int iStartPage = 0;
		int iEndPage = 0;
		int iPageNum = super.getPageNo();
		int total = super.getTotalPage();
		// 点击前面几页，整体位置不动的位置标志
		int iNoMoveFlag = 0;
		// 点击后面几页，整体位置不动的位置标志
		int iNoMoveFlagEnd = 0;
		iNoMoveFlag = (Show_Page_Tab_Num + 1) / 2;
		iNoMoveFlagEnd = (Show_Page_Tab_Num) / 2;

		if (iPageNum <= iNoMoveFlag) {// 如果当前页的小于iNoMoveFlag
			if (total > Show_Page_Tab_Num) {
				// 总的页数大于要显示的页数时
				iStartPage = 1;
				// 最后显示要显示的最大页数
				iEndPage = Show_Page_Tab_Num;
			} else {
				// 总的页数小于要显示的页数时
				iStartPage = 1;
				// 后面显示最后一页
				iEndPage = total;
			}
		} else if (total - iPageNum <= iNoMoveFlagEnd) { // 如果当前页的大于iNoMoveFlagEnd

			if (total > Show_Page_Tab_Num) {// 总的页数大于要显示的页数时
				// 最前面显示的页数
				iStartPage = total - Show_Page_Tab_Num + 1;
				iEndPage = total;
			} else {
				// 总的页数小于要显示的页数时
				iStartPage = 1;
				iEndPage = total;
			}

		} else {

			// 当前页左边要加的页数
			int itempLeft = (Show_Page_Tab_Num - 1) / 2;
			// 当前页右边要加的页数
			int itempRight = (Show_Page_Tab_Num) / 2;
			// 最后一页的页书
			int ipageNum_end = iPageNum + itempRight;

			if (total > ipageNum_end) {
				iStartPage = iPageNum - itempLeft;
				iEndPage = iPageNum + itempRight;
			} else {
				iStartPage = iPageNum - itempLeft;
				iEndPage = total;
			}
		}
		pageContent[0] = iStartPage;
		pageContent[1] = iEndPage;
		return pageContent;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
