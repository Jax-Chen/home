package com.jesse.common.page;

import java.util.Collection;

/**
 * 来自JEECMS中的分页Paginable接口, 增加了获得分页数据的getDate()方法
 */
public interface Paginable<T> {
    
    /**
     * 总记录数
     * 
     * @return int
     */
    public int getTotalCount();

    /**
     * 总页数
     * 
     * @return int
     */
    public int getTotalPage();

    /**
     * 每页记录数
     * 
     * @return int
     */
    public int getPageSize();

    /**
     * 当前页号
     * 
     * @return int
     */
    public int getPageNo();

    /**
     * 是否第一页
     * 
     * @return int
     */
    public boolean isFirstPage();

    /**
     * 是否最后一页
     * 
     * @return int
     */
    public boolean isLastPage();

    /**
     * 返回下页的页号
     * 
     * @return int
     */
    public int getNextPage();

    /**
     * 返回上页的页号
     * 
     * @return int
     */
    public int getPrePage();

    /**
     * 取得当前页显示的项的起始序号 (1-based)。
     * 
     * @return int 起始序号
     */
    public int getBeginIndex();

    /**
     * 取得当前页显示的末项序号 (1-based)。
     * 
     * @return int 末项序号
     */
    public int getEndIndex();
    
    /**
     * 取得分页数据
     * 
     * @return Collection<T> 分页数据
     */
    public Collection<T> getData();
    
}
