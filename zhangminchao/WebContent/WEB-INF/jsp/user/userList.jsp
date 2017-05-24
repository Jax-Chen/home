<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/jsp/public/base.jsp" %>
<title>用户列表</title>
</head>
<body class="gray-bg">
	<!-- main部分开始 -->
                        <div class="row" id="" style="padding:20px;">
                            <div class="col-sm-12">
                                <div class="ibox float-e-margins">
                                    <div class="ibox-title">
										<div>
											<button style="float:right;margin-right:60px;margin-top:-9px;" type="button" class="btn btn-shadow btn-primary user-add">新增用户</button>
										</div>
										用户列表
                                    </div>
                                    <div class="ibox-content">
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper form-inline" role="grid">
                                            <div class="row">
												
												<form id="searchForm" action="<%=base %>/bops/userList.do" method="post">
<%-- 													<input type="hidden" name="pageNo" value="${page.pageNo }"> --%>
													<table style="width:100%;">
														<tr style="height:50px;">
	                                        				<th style="width:7%;text-align:right;">所属社区:</th>
	                                        				<td style="width:15%;">
	                                        					<input type="text" class="form-control keydown-search" style="width:100%;max-width:210px;" id="homeName" name="homeName" value="${page.homeName }"/>
	                                                        </td>
	                                        				<th style="width:7%;text-align:right;">邮箱地址:</th>
	                                        				<td width="15%">
	                                        					<input type="text" class="form-control keydown-search" style="width:100%;max-width:210px;" id="email" name="email" value="${page.email }"/>
	                                                        </td>
	                                        				<th style="width:7%;text-align:right;">注册时间:</th>
	                                        				<td width="15%">
	                                        					<input type="text" class="form-control layer-date keydown-search" style="width:42%;max-width:210px;" name="createFromTime" value="<f:formatDate pattern='yyyy-MM-dd' value='${page.createFromTime}'/>" onclick="laydate({istime: true, format: 'YYYY-MM-DD'})">
																<span style="margin: 0 6px; line-height: 34px;">-</span>
	                                        					<input type="text" class="form-control layer-date keydown-search" style="width:42%;max-width:210px;" name="createEndTime" value="<f:formatDate pattern='yyyy-MM-dd' value='${page.createEndTime}'/>" onclick="laydate({istime: true, format: 'YYYY-MM-DD'})">
	                                                        </td> 
	                                        				<th style="width:7%;text-align:right;">家庭地址:</th>
	                                        				<td width="15%">
	                                        					<input type="text" class="form-control keydown-search" style="width:100%;max-width:210px;" id="address" name="address" value="${page.address }"/>
	                                                        </td>
	                                        			</tr>
														<tr style="height:50px;">
	                                        				<th style="width:7%;text-align:right;">姓名:</th>
	                                        				<td style="width:15%;">
	                                        					<input type="text" class="form-control keydown-search" style="width:100%;max-width:210px;" name="uname" value="${page.uname }" id=""/>
	                                                        </td>
	                                        				<th style="width:7%;text-align:right;">注册手机:</th>
	                                        				<td width="15%">
	                                        					<input type="text" class="form-control keydown-search" style="width:100%;max-width:210px;" name="mobile" value="${page.mobile }" id=""/>
	                                                        </td>
															
	                                        				<th style="width:7%;text-align:right;">生日：</th>
	                                        				<td width="15%">
	                                        					<input type="text" class="form-control layer-date keydown-search" style="width:42%;max-width:210px;" name="birthdayFromTime" value="<f:formatDate pattern='yyyy-MM-dd' value='${page.birthdayFromTime}'/>" onclick="laydate({istime: true, format: 'YYYY-MM-DD'})">
																<span style="margin: 0 6px; line-height: 34px;">-</span>
	                                        					<input type="text" class="form-control layer-date keydown-search" style="width:42%;max-width:210px;" name="birthdayEndTime" value="<f:formatDate pattern='yyyy-MM-dd' value='${page.birthdayEndTime}'/>" onclick="laydate({istime: true, format: 'YYYY-MM-DD'})">
	                                                        </td> 
															<th style="width:7%;text-align:right;"></th>
															<td width="15%">
																<button style="width: 39%;min-width: 60px;margin-left: 7%;" type="submit" url="<%=base %>${page.url }" class="btn-left btn btn-w-m btn-success" id="od-search-new"><i class="fa fa-search"></i> 搜索</button>
																<button style="width:39%;min-width: 60px;" type="reset" url="<%=base %>${page.url }" class="btn btn-w-m btn-reset reset1">重置</button>
															</td>
	                                        				 
	                                        			</tr>
													</table>
												</form>
													                                                		
                                                <table style="margin-top:35px;" class="list-table table-entry-line table table-striped table-bordered table-hover dataTables-example dataTable" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                                                    <thead>
                                                        <tr style="font-size:13px;background-color:#eaedf1;" role="row" >
															
                                            				<th><input type="checkbox" class='allocation-all-box' /></th>
                                            				
                                                           <th>登录账号</th>
                                                           <th>所属社区</th>
                                            				<th>姓名</th>
                                            				<th>性别</th>
															<th>联系方式</th>
															<th>邮箱地址</th>
                                            				<th>生日</th>
                                                            <th>家庭地址 </th>
                                                            <th>操作</th>
                                            				
                                                        </tr>
                                                    </thead>
                                                    <tbody id="main_table">
<!--                                                     style="background-color:#ffffff;" -->
														<c:forEach items="${page.data}" var="user" varStatus="status">
														
                                                            <tr class="my-tr" <c:choose><c:when test="${status.index%2==0}">style="background-color:#ffffff;"</c:when><c:otherwise>style="background-color:#f5f5f5;"</c:otherwise></c:choose>   >
                                                             
																	
                                            					
                                            					<td><input type="checkbox" class='allocation-checkbox' value=''/></td>
																
																<td class="uname detail"  title="">
																	${user.uname}
																</td> 
                                            					<td class="comname detail"  title="">
                                                						<span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;
                                                						${user.homeName }
																</td>
																<td class="uname detail"  title="">
																	${user.name}
																</td> 
																
                                            					<td class="detail" >&nbsp;
                                            					
                                            						<c:if test="${user.sex==null }">
                                            							<img src="<%=base %>/src/img/user_none.png" style="margin-top: -4px;" height="16" width="16"/>&nbsp;未知
                                            						</c:if>
                                            						<c:if test="${user.sex==1 }">
                                            							<img src="<%=base %>/src/img/user_man.png" style="margin-top: -4px;" height="16" width="16"/>&nbsp;男
                                            						</c:if>
                                            						<c:if test="${user.sex==0 }">
                                            							<img src="<%=base %>/src/img/user_woman.png" style="margin-top: -4px;" height="16" width="16"/>&nbsp;女
                                            						</c:if>
                                            						
                                            					</td>
                                            					
                                                                <td class="td-mobile detail" ><i class="fa fa-mobile"></i>&nbsp;${user.mobile }</td>
                                                                
                                                                <td class="td-mobile detail" ><i class="fa fa-envelope"></i>&nbsp;${user.email }</td>
                                            					
																<td class="detail" >
                                            						<f:formatDate pattern="yyyy-MM-dd" value="${user.birthday}"/>
                                            					</td>
                                            					<td class="ulv">
                                            						${user.address }
                                            					</td>
                                            					<td class="">
                                            						<input type="hidden" name="userId" class="userId" value=${user.id }>
                                            						<button class="layui-btn layui-btn-small edit"><i class="layui-icon"></i></button>
                                            						<button class="layui-btn layui-btn-normal layui-btn-small delete"><i class="layui-icon"></i></button>
                                            					</td>
																
                                            					
                                                            </tr>
														</c:forEach>
                                                          
                                                            
                                                    </tbody>
                                                </table>
                                                <div class='row' id='_page'>
										    		<div class='col-md-12'>
										    		    <div class='col-md-4' style='margin:20px 0;'>
															每页显示 20  条，显示 ${(page.pageNo-1) * page.pageSize + 1} 到 
															
															<c:if test="${(page.pageNo) * page.pageSize > page.totalCount }">
																${page.totalCount }
															</c:if>
															<c:if test="${(page.pageNo) * page.pageSize < page.totalCount }">
																${(page.pageNo) * page.pageSize}
															</c:if>
															, 共 ${page.totalCount} 条
										    			</div> 
										    		    <div class='col-md-8'>
										    				<div style='float: right; margin: 10px -20px 20px 10px; line-height: 26px;'>共${page.totalPage}页 &nbsp;到第 
										    					<input type="text" total="$!{page.totalPage}" name="pageNo" id='turnto' style='width:25px;height:25px;' value='' />页&nbsp;&nbsp;
																<button url="<%=base %>${page.url }" id='goButton' class="btn btn-info  dim" type="button">GO</button>
																
										    				</div>
										    				<ul class='pagination' id='pagin' style='float:right;' url="<%=base %>${page.url }">
										    				
																<c:choose>
																   <c:when test="${page.firstPage==false}">
																   		<li><a id='pre_page' class='_page_no' href='javascript:void(0);' data-code='1'>&lt;&lt;</a>
																   </c:when>
																   <c:otherwise>
																   		<li class="disabled"><a id='pre_page' class='_page_no' href='javascript:void(0);' data-code='1'>&lt;&lt;</a>
																   </c:otherwise>
																</c:choose>
																
																<c:choose>
																   <c:when test="${page.firstPage==false}">
																   		<input type="hidden" value="${page.prePage}" /></li>
																		<li><a id='pre_page' class='_page_no' href='javascript:void(0);' data-code='${page.prePage}'>&lt;</a>
																   </c:when>
																   <c:otherwise>
																   		<li class="disabled"><a id='none_pre_page' href='javascript:void(0);' disabled>&lt;</a></li>
																   </c:otherwise>
																</c:choose>
																
																<c:forEach begin="${page.beginPage }" end="${page.endPage }"  var="p">
																	
																	<c:if test="${page.pageNo==p }">
																		<li class='active'><a href='javascript:void(0);' >${p}</a></li>
																	</c:if>
																	
																	<c:if test="${page.pageNo!=p }">
																		<li class=''><a href='javascript:void(0);' class='_page_no' data-code="${p }">${p}</a></li>
																	</c:if>
																
																</c:forEach>
										    					
										    					<c:choose>
																   <c:when test="${page.lastPage==false}">
																   		<li><a id='next_page' class='_page_no' href='javascript:void(0);' data-code='${page.nextPage}'>&gt;</a>
										                				<input type="hidden" value="${page.nextPage}" /></li>
																   </c:when>
																   <c:otherwise>
																   		<li class="disabled"><a id='none_next_page' href='javascript:void(0);'>&gt;</a>
																   </c:otherwise>
																</c:choose>
										    					
																<c:choose>
																   <c:when test="${page.lastPage==false}">
																   		<li><a id='next_page' class='_page_no' href='javascript:void(0);' data-code='${page.totalPage}'>&gt;&gt;</a>
																   </c:when>
																   <c:otherwise>
																   		<li class="disabled"><a id='next_page' href='javascript:void(0);' data-code='${page.totalPage}'>&gt;&gt;</a>
																   </c:otherwise>
																</c:choose>
																
										    				</ul>
										    			</div> 
										    		</div>
										    		   <input type='hidden' id='totalPageHide' value='${page.totalPage}'/>
										    		   <input type='hidden' id='updateData-pageNo' value='${page.pageNo}'/>
										    	</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
							
                            <script >
								//下拉选择框控件
                            	(function() {
                            		[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
                            			new SelectFx(el, { onChange: function(val) {
											search_click();
										}});
                            		} );
                            	})();
								
								function hello1(){
								alert("111");
								}
                            </script>
							<script>
                            layui.use('element', function(){
                              var $ = layui.jquery
                              ,element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
                              
                              //触发事件
                              var active = {
                                tabAdd: function(){
                                  //新增一个Tab项
                                  element.tabAdd('demo', {
                                    title: '新选项'+ (Math.random()*1000|0) //用于演示
                                    ,content: '内容'+ (Math.random()*1000|0)
                                    ,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
                                  })
                                }
                                ,tabDelete: function(othis){
                                  //删除指定Tab项
                                  element.tabDelete('demo', '44'); //删除：“商品管理”
                                  
                                  
                                  othis.addClass('layui-btn-disabled');
                                }
                                ,tabChange: function(){
                                  //切换到指定Tab项
                                  element.tabChange('demo', '22'); //切换到：用户管理
                                }
                              };
                              
                              $('.site-demo-active').on('click', function(){
                                var othis = $(this), type = othis.data('type');
                                active[type] ? active[type].call(this, othis) : '';
                              });
                              
                              //Hash地址的定位
                              var layid = location.hash.replace(/^#test=/, '');
                              element.tabChange('test', layid);
                              
                              element.on('tab(test)', function(elem){
                                location.hash = 'test='+ $(this).attr('lay-id');
									$("#userv").focus();
                              });
                              
                            });
                            </script>
                            <!-- main部分结束 -->
							
						</div>	
						<!-- checkbox插件 -->
<!--                     	<script src="$!{imageServer}/newframe/js/plugins/iCheck/icheck.min.js"></script> -->
<!--                         <link href="$!{imageServer}/newframe/css/plugins/iCheck/custom.css" rel="stylesheet"> -->
                    	<!-- -->
                    	
                    	
                    	<script src="<%=base %>/src/scripts/bops/userList.js"></script>
</body>
</html>