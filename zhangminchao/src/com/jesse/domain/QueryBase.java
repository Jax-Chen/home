package com.jesse.domain;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.jesse.common.utils.ArrayUtil;


/**
 * 分页算法封装。 分页须设置: TotalItem（总条数）,缺省为0, 应该在dao中被设置 PageSize（每页条数），应在web层被设置
 * QueryBase 缺省为20，子类可以通过覆盖 getDefaultPageSize() 修改 CurrentPage（当前页）,缺省为1，首页，
 * 应在web层被设置 分页后，可以得到：TotalPage（总页数） FristItem(当前页开始记录位置，从1开始记数)
 * PageLastItem(当前页最后记录位置) 页面上，每页显示条数名字应为： lines ，当前页名字应为： page
 *
 */
public abstract class QueryBase implements Serializable {

    public static final Log logger = LogFactory.getLog(QueryBase.class);

    private static final long serialVersionUID = 4167559252122961687L;

    private static final Integer defaultPageSize = new Integer(20);

    private static final Integer defaultFriatPage = new Integer(1);

    private static final Integer defaultTotleItem = new Integer(0);

    private Integer totalItem;

    private Integer pageSize;

    private Integer currentPage;

    /**
     * @return Returns the defaultPageSize.
     */
    protected final Integer getDefaultPageSize() {
        return defaultPageSize;
    }

    public boolean isFirstPage() {
        return this.getCurrentPage().intValue() == 1;
    }

    public int getPreviousPage() {
        int back = this.getCurrentPage().intValue() - 1;

        if (back <= 0) {
            back = 1;
        }

        return back;
    }

    public boolean isLastPage() {
        return this.getTotalPage() == this.getCurrentPage().intValue();
    }

    public int getNextPage() {
        int back = this.getCurrentPage().intValue() + 1;

        if (back > this.getTotalPage()) {
            back = this.getTotalPage();
        }

        return back;
    }

    /**
     * @return Returns the currentPage.
     */
    public Integer getCurrentPage() {
        if (currentPage == null) {
            return defaultFriatPage;
        }

        return currentPage;
    }

    /**
     * @param current
     *            The currentPage to set.
     */
    public void setCurrentPage(Integer cPage) {
        if ((cPage == null) || (cPage.intValue() <= 0)) {
            this.currentPage = defaultFriatPage;
        } else {
            this.currentPage = cPage;
        }
    }

    public void setCurrentPageString(String s) {
        if (StringUtils.isBlank(s)) {
            return;
        }
        try {
            setCurrentPage(Integer.parseInt(s));
        } catch (NumberFormatException ignore) {
            this.setCurrentPage(defaultFriatPage);
        }
    }

    /**
     * @return Returns the pageSize.
     */
    public Integer getPageSize() {
        if (pageSize == null) {
            return getDefaultPageSize();
        }

        return pageSize;
    }

    public boolean hasSetPageSize() {
        return pageSize != null;
    }

    /**
     * @param size
     *            The pageSize to set.
     */
    public void setPageSize(Integer pSize) {
        if (pSize == null) {
            throw new IllegalArgumentException("PageSize can't be null.");
        }

        if (pSize.intValue() <= 0) {
            throw new IllegalArgumentException("PageSize must great than zero.");
        }

        this.pageSize = pSize;
    }

    public void setPageSizeString(String pageSizeString) {
        if (StringUtils.isBlank(pageSizeString)) {
            return;
        }

        try {
            Integer integer = new Integer(pageSizeString);
            this.setPageSize(integer);
        } catch (NumberFormatException ignore) {
        }
    }

    /**
     * @return Returns the totalItem.
     */
    public Integer getTotalItem() {
        if (totalItem == null) {
            // throw new IllegalStateException("Please set the TotalItem
            // frist.");
            return defaultTotleItem;
        }
        return totalItem;
    }

    /**
     * @param totalItem
     *            The totalItem to set.
     */
    public void setTotalItem(Integer tItem) {
        if (tItem == null) {
            // throw new IllegalArgumentException("TotalItem can't be null.");
            tItem = new Integer(0);
        }
        this.totalItem = tItem;
        int current = this.getCurrentPage().intValue();
        int lastPage = this.getTotalPage();
        if (current > lastPage) {
            this.setCurrentPage(new Integer(lastPage));
        }
    }

    public int getTotalPage() {
        int pgSize = this.getPageSize().intValue();
        int total = this.getTotalItem().intValue();
        int result = total / pgSize;
        if ((total % pgSize) != 0) {
            result++;
        }
        return result;
    }

    public int getPageFristItem() {
        int cPage = this.getCurrentPage().intValue();
        if (cPage == 1) {
            return 1; // 第一页开始当然是第 1 条记录
        }
        cPage--;
        int pgSize = this.getPageSize().intValue();

        return (pgSize * cPage) + 1;
    }

    public int getPageLastItem() {
        int assumeLast = getExpectPageLastItem();
        int totalItem = getTotalItem().intValue();

        if (assumeLast > totalItem) {
            return totalItem;
        } else {
            return assumeLast;
        }
    }

    public int getExpectPageLastItem() {
        int cPage = this.getCurrentPage().intValue();
        int pgSize = this.getPageSize().intValue();
        return pgSize * cPage;
    }

    protected String getSQLBlurValue(String value) {
        if (value == null) {
            return null;
        }

        return value + '%';
    }

    /**
     * 得到不包含分页参数以外的其它参数值
     *
     * @return
     */
    public Map<String, String> getParameters() {
        String[] removeProperties = new String[] { "defaultPageSize",
                "defaultFriatPage", "defaultTotleItem", "totalItem",
                "pageSize", "currentPage", "serialVersionUID" };
        Map<String, String> param = new HashMap<String, String>();
        Field[] fields = this.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (!ArrayUtil.contains(removeProperties, field.getName())) {
                try {
                    String properyValue = BeanUtils.getProperty(this, field
                            .getName());
                    param.put(field.getName(), properyValue);
                } catch (IllegalAccessException e) {
                    logger.error("copy fildValue error", e);
                } catch (InvocationTargetException e) {
                    logger.error("copy fildValue error", e);
                } catch (NoSuchMethodException e) {
                    logger.error("copy fildValue error", e);
                }
            }
        }
        return param;
    }
}
