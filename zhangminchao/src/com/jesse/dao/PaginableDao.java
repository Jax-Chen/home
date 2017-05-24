package com.jesse.dao;

import com.jesse.common.page.Paginable;

/**
 * 分页Dao
 */
public interface PaginableDao {
    
    /**
     * 根据分页条件获取分页信息, 其中page参数目前默认采用SimplePage或其子类
     * 
     * @param <T>
     * @param page 分页信息
     * @param qTotalCount
     * @param qPagination
     * @return Paginable<T>
     */
    public <T> Paginable<T> getPagination(Paginable<T> page, String qTotalCount, String qPagination);

}
