package com.jesse.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jesse.common.page.Paginable;
import com.jesse.common.page.SimplePage;
import com.jesse.domain.QueryPagination;


/**
 * Dao基类
 */
@SuppressWarnings("unchecked")
public abstract class BaseDAO implements PaginableDao {
    
    @Autowired
    private SqlSession sqlSession;
    // 日志
    protected final Logger log = LoggerFactory.getLogger(this.getClass());
    
    /**
     * 根据分页条件获取分页信息, 其中page参数目前默认采用SimplePage或其子类
     * 
     * @param <T>
     * @param page 分页信息
     * @param qTotalCount
     * @param qPagination
     * @return Paginable<T>
     */
    public final <T> Paginable<T> getPagination(Paginable<T> page, String qTotalCount, String qPagination) {
        if (!(page instanceof SimplePage)) {
            throw new IllegalArgumentException("'page' argument is unsupport class type, " +
            		"it must be "  + SimplePage.class.getName() + " or subclass");
        }
        int totalCount = (Integer) selectOne(qTotalCount, page);
        if (totalCount > 0) {
            SimplePage<T> _page = (SimplePage<T>) page;
            _page.setTotalCount(totalCount);
            _page.setData((List<T>)selectList(qPagination, page));
        }
        return page;
    }
    
    /**
     * 不需要分页查出所有信息 (所以不需要查总数)
     * @param <T>
     * @param page 
     * @param qPagination
     * @return Paginable<T>
     */
	public final <T> Paginable<T> getPagination(Paginable<T> page, String qPagination) {
        if (!(page instanceof SimplePage)) {
            throw new IllegalArgumentException("'page' argument is unsupport class type, " +
            		"it must be "  + SimplePage.class.getName() + " or subclass");
        }

        List<T> result = selectList(qPagination, page);
        if (result != null) {
            SimplePage<T> _page = (SimplePage<T>) page;
            _page.setPageSize(result.size());
            _page.setTotalCount(result.size());
            _page.setData(result);
        }
        return page;
    }

    /**
     * 分页查询封装(专供Brokerage应用使用)
     * 
     * @param page          query数据对象，包括分页数据和查询数据
     * @param qTotalCount   count记录总数SQL的sqlid
     * @param qPagination   分页查询SQL的sqlid
     * @return
     */
    public final QueryPagination getPagination(QueryPagination page, String qTotalCount,
                                               String qPagination) {
        if (!(page instanceof QueryPagination)) {
            throw new IllegalArgumentException("'page' argument is unsupport class type, "
                                               + "it must be " + QueryPagination.class.getName()
                                               + " or subclass");
        }
        int totalCount = (Integer) selectOne(qTotalCount, page);
        page.setTotalItem(totalCount);
        if (totalCount > 0) {
            page.setItems(selectList(qPagination, page));
        }
        return page;
    }
    
    public SqlSession getSqlSession() {
        return sqlSession;
    }
    
    public void setSessionFactory(SqlSession sqlSession1) {
        this.sqlSession = sqlSession1;
    }
    
    /**
     * 抽象方法获取域名空间
     * @return
     */
    protected abstract String getNameSpace();
    
    /**
     * 新增操作
     * @param mapperDefId mapper中定义的Id
     * @param dataObject 数据对象
     * @return
     */
    protected int insert(String mapperDefId, Object dataObject) {
    	return getSqlSession().insert(getNameSpace()+ mapperDefId, dataObject);
    }
    
    /**
     * 查询一条数据
     * @param <T>
     * @param mapperDefId
     * @param dataObject
     * @return
     */
    protected Object selectOne(String mapperDefId, Object dataObject) {
    	return getSqlSession().selectOne(getNameSpace()+mapperDefId, dataObject);
    }
    
    protected Object selectOne(String mapperDefId) {
    	return getSqlSession().selectOne(getNameSpace()+mapperDefId);
    }
    /**
     * 修改记录
     * @param mapperDefId
     * @param dataObject
     * @return
     */
    protected int update(String mapperDefId, Object dataObject) {
    	return getSqlSession().update(getNameSpace()+mapperDefId, dataObject);
    }
    
    protected int update(String mapperDefId) {
    	return getSqlSession().update(getNameSpace()+mapperDefId);
    }
    
    /**
     * 删除记录
     * @param mapperDefId
     * @param dataObject
     * @return
     */
    protected int delete(String mapperDefId, Object dataObject) {
    	return getSqlSession().delete(getNameSpace()+mapperDefId, dataObject);
    }
    
    protected int delete(String mapperDefId) {
    	return getSqlSession().delete(getNameSpace()+mapperDefId);
    }
    
    /**
     * 列表查询
     * @param <E>
     * @param mapperDefId
     * @param dataObject
     * @return
     */
    
	protected <E> List<E> selectList(String mapperDefId, Object dataObject) {
    	return getSqlSession().selectList(getNameSpace()+mapperDefId, dataObject);
    }
    
    protected <E> List<E> selectList(String mapperDefId) {
    	return getSqlSession().selectList(getNameSpace()+mapperDefId);
    }

}
