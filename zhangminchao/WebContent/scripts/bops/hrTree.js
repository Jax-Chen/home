;(function($) {
 	
 $.hr = function(){};
 $.hr.extendClass = function(subClass, superClass) {
      // 开始继承
      var F = function() {
      };
      F.prototype = superClass.prototype;
      subClass.prototype = new F();
      subClass.prototype.constructor = subClass;
      subClass.superClass = superClass.prototype;
      if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
      }
      return subClass;
};
 /**
 * 树的常量定义
 */
$.hr.TreeConst = {
  treeObjectName : 'xytreeid',
  /* 下面两个是DOM对象ID名的一部分 */
  treeHeadIDPostfix : 'divhead',
  treeCheckBoxID : 'imgfuxuan',
  treeJiahaoImgID : 'imgjiahao',
  /* 下面两个是样式名，在css文件中 */
  treeUserImgStyle : 'treeyangshiImg',
  treeStyle : 'treeyangshi',
  treelink : "treelink", // 树节点名称链接
  /* 这是节点背景色的渐变颜色 */
  color : [ '#ffff00', '#ffff33', '#ffff66', '#ffff99', '#ffffcc', '#ffffff' ],
  colorNum : 6,
  /* 这是节点背景色的渐变默认时间，用户可以自己改变，观看效果，单位：毫秒 */
  timenum : 150,
  // 树的样式常量定义
  nodeSpan : "treeBaseSpan",
  rootIcon : "rootIcon",
  openRootIcon : "openRootIcon",
  folderIcon : "folderIcon",
  openFolderIcon : "openFolderIcon",
  fileIcon : "fileIcon",
  iIcon : "iIcon",
  lIcon : "lIcon",
  lMinusIcon : "lMinusIcon",
  lPlusIcon : "lPlusIcon",
  tIcon : "tIcon",
  tMinusIcon : "tMinusIcon",
  tPlusIcon : "tPlusIcon",
  blankIcon : "blankIcon",
  loadingIcon : "loadingIcon",
  buzhongIcon : "buzhongIcon",
  quanzhongIcon : "quanzhongIcon",
  jubuzhongIcon : "jubuzhongIcon",
  defaultText : 'Tree Item',
  defaultAction : 'javascript:void(0);',

  easy_jianju1 : '4px', // 单选树的间距
  // 复选树的间距
  multi_jianju1 : '2px', // 这是复选框到文件夹的距离
  multi_jianju2 : '2px', // 这是复选框到文字的距离
  multi_jianju3 : '2px' // 这是头部复选框到第一图标的距离

};

var ODPViewTreeConst = $.hr.TreeConst;   

 $.hr.popMenu = function(event, selectTreeNode, xml) {
  // 设置鼠标右键点击的节点对象
  this.selectTreeNode = selectTreeNode;
  this.currentDiv; // 当前活动菜单
  this.root; // 菜单根节点
  this.createPop(event, xml); // 进行右侧快捷菜单的创建
};
$.hr.popMenu.prototype = {
  createPop : function(event, xml) {
    if (!xml || xml == "") {
      return;
    }
    var e = ODPViewUtil.getEvent(event);
    if (e.button == 2) {
      // 转化xml to doc对象
      var doc = ODPViewUtil.XMLparse(xml);
      if (doc == null) {
        alert('快捷菜单创建失败，配置读取错误！');
        return true;
      }
      var root = doc.childNodes[0].childNodes[0];
      // 当root节点无菜单名称时，就结束菜单解析
      if (ODPViewUtil.getItem(root, "id") == null) {
        return true;
      }
      var rootName = ODPViewUtil.getItem(root, "id").value;
      $("#" + rootName).remove();
      var rootPop = ODPViewUtil.E_Obj(rootName);
      if (!rootPop) {
        document.onclick = ODPViewUtil.bindFunction(this.popup_closePop, this);
        document.oncontextmenu = function() {
          return false;
        };
        rootPop = this.popup_loadPop(event, root, rootName);
      }
      this.popup_closePop();
      this.popup_setRootDiv(rootPop.id);
      this.popup_showsub(event, rootPop, 0);
    } else if (e.button == 1 || e.button == 0) {// 左健
      var element = this.getSrcElement(e);
      var oTr = this.__getTR(element);
      if (!oTr || !oTr.popTr) {
        this.popup_closePop();
      }
    }
  },
  /*
   * 根据传入的配置对象node生成单级右键菜单 @para node:传入当前菜单的配置对象 @para parentPop: 父菜单id
   */
  popup_loadPop : function(event, node, parentPop) {
    if (node == null) {
      alert('nodes is null');
      return;
    }
    var $oDiv = this.popup_createDiv(node, parentPop);
    var $oTable = this.popup_createTable($oDiv.id);
    var nodes = node.childNodes;
    var sepCount = 0;// 分隔符个数
    for ( var i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName == 'item') {
        var $oTr = this.popup_createTr(event, nodes[i]);
        if ($oTr.attr("separate")) {
          sepCount++;
        }
        $oTr[0].onmouseover = ODPViewUtil.bindFunction(this.highlight, this, event);
        $oTr[0].onmouseout = ODPViewUtil.bindFunction(this.lowlight, this, event);
        $oTable.append($oTr);
      }
      ;
    }

    $oDiv.append($oTable);
    return $oDiv[0];
  },

  /*
   * 根据传入的配置对象(node)生成<DIV>层 @para node:传入当前菜单的配置对象 @para parentPop: 父菜单id
   */
  popup_createDiv : function(node, parentPop) {
    var $oDiv = $("<DIV/>").attr({
      "id" : parentPop,
      "prePop" : ""
    }).css({
      "display" : "",
      "zIndex" : "500"
    }).addClass("popmenu");

    if (ODPViewUtil.getItem(node, "width")) {
      // 计算菜单的宽度，以最长的那个菜单作为宽度
      var longStr = ''; // 最长的一级菜单名
      var nodes = node.childNodes;
      for ( var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var itemText = ODPViewUtil.getItem(node, "text");
        if (itemText && itemText.value.length > longStr.length)
          longStr = itemText.value;
      }
      // 这里没计算半角与全角，暂时全部用全角像素
      var divWidth = longStr.length * 15.3; // 中文一个字符占16px,英文一个字符占10px
      // 设置默认的宽度
      var defalutWidth = ODPViewUtil.getItem(node, "width").value;
      if (divWidth < defalutWidth)
        divWidth = defalutWidth;
      $oDiv.css("width", divWidth);
    } else {
      $oDiv.css("width", "90px");
    }
    $oDiv.appendTo("body");
    return $oDiv;
  },
  /*
   * 根据传入的右键菜单id生成<table>
   * 
   * @para id:当前右键菜单id
   */
  popup_createTable : function(id) {
    var $table = $("<TABLE/>").attr({
      "cellPadding" : "0",
      "cellSpacing" : "0",
      "border" : "0",
      "width" : "100%",
      "margin" : "4 4 4 4"
    }).addClass("popdatagrid").append("<tbody></tbody>");
    $table[0].onmouseover = ODPViewUtil.bindFunction(this.popup_setCurrentDiv, this);
    return $table;
  },
  /*
   * 根据传入的配置对象node生成<TR>
   * 
   * @para item:当前菜单配置对象(node) @para nest:是否有下级菜单
   */
  popup_createTr : function(event, item, popid) {
    var $oTd;
    var $oTr = $("<TR/>").attr("popTr", true);

    var txt = ODPViewUtil.getItem(item, "text").value;
    if (txt == '-') {// 如果是分隔符
      $oTr.attr("separate", true).css({
        "height" : "1",
        "backgroundColor" : "#808080"
      });
      $oTd = $("<TD/>").attr("colspan", "4");
      $oTr.append($oTd);
      return $oTr;
    }
    // 如果为链接操作
    var $href;
    var defBtnEventName = ODPViewUtil.getItem(item, "eventName") ? ODPViewUtil.getItem(item, "eventName").value : null;
    if (ODPViewUtil.getItem(item, "type") && ODPViewUtil.getItem(item, "type").value == 'href') {
      $href = $("<A/>").atrr({
        "href" : txt,
        "target" : ODPViewUtil.getItem(item, "target").value
      });
      $href[0].onclick = ODPViewUtil.bindFunction(this.trClickFun, this, defBtnEventName);
      $href[0].onmouseover = ODPViewUtil.bindFunction(this.highlight, this, event);
      $href[0].onmouseout = ODPViewUtil.bindFunction(this.lowlight, this, event);
    } else {
      $oTr[0].onclick = ODPViewUtil.bindFunction(this.trClickFun, this, defBtnEventName);
    }

    $oTd = $("<TD/>").attr({
      "width" : "25",
      "align" : "center"
    });
    if (ODPViewUtil.getItem(item, "className")) {
      var $oImg = $("<span/>").addClass("popMenuItemSpan " +ODPViewUtil.getItem(item, "className").value);
      $oTd.append($oImg);
    } else {
      $oTd.append('&nbsp;');
    }
    $oTr.append($oTd);

    $oTd = $("<TD/>");
    if (ODPViewUtil.getItem(item, "align")) {
      $oTd.attr("align", ODPViewUtil.getItem(item, "align").value);
    } else {
      $oTd.attr("align", "left");
    }
    if ($href) {
      $oTd.append($href);
    } else {
      $oTd.append(txt);
    }
    $oTr.append($oTd);
    $oTd = $("<TD/>").width("1");
    $oTr.append($oTd);
    $oTr.append($oTd);

    return $oTr;
  },
  // 菜单项获得焦点时加亮显示
  highlight : function(event) {
    var ele = ODPViewUtil.getSrcElement(event);
    this.__getTR(ele).className = "selectedRow";
  },
  // 菜单项失去焦点
  lowlight : function(event) {
    var ele = ODPViewUtil.getSrcElement(event);
    this.__getTR(ele).className = "";
  },
  // 取得单元格单击事件所在的行
  __getTR : function(ele) {
    var result = ele;
    while (result.tagName != 'TR') {
      result = result.parentNode;
    }
    return result;
  },
  /*
   * 根据传入的菜单对象和偏移量计算菜单位置 @para pop:要显示的菜单对象 @para offY:相对父菜单的偏移
   */
  popup_showsub : function(event, pop, offY) {
    var temp = pop;
    var off = 0;

    var e = ODPViewUtil.getEvent(event);
    var Y = e.clientY;
    var X = e.clientX;

    // 用户鼠标点击的绝对宽度
    X = document.body.scrollLeft + e.clientX;
    // 当鼠标点击的X坐标右边的宽度放不下右键菜单且左边有足够的空间，那么弹出右键菜单在左边；反之，弹出右键菜单右边
    if ((document.body.scrollWidth - X) < pop.clientWidth && X > pop.clientWidth)
      X = X - pop.clientWidth;

    $(pop).css("left", X);
    // 用户鼠标点击的绝对高度
    Y = document.body.scrollTop + e.clientY;
    // 当用户鼠标点击的上部区域空间能放入右键菜单那么就，弹出右键菜单向上；反之，弹出右键菜单向下
    if (Y >= pop.clientHeight)
      Y = Y - pop.clientHeight;

    $(pop).css("top", Y);
    $(pop).show();
  },
  /*
   * @para pop:要关闭的菜单对象 @para offY:是否关闭本级菜单 true 仅关闭下级，false 关闭本级和下级
   */
  popup_onMouseOutDiv : function(pop, flag) {
    if (pop == null)
      return;
    if (this.popup_getCurrentDiv() && pop.id != this.popup_getCurrentDiv().id) {// 如果是当前菜单不处理
      this.popup_hiddenPop(pop, flag);
    }
  },

  /*
   * 关闭制定菜单
   * 
   * @param pop : 被关闭的菜单 @param flag : true 仅关闭下级，false 关闭本级和下级
   */
  popup_hiddenPop : function(pop, flag) {
    if (pop == null)
      return;
    if (!flag) {
      pop.style.display = 'none';
    }
    if (pop.count) {
      for ( var i = 0; i < pop.count; i++) {
        this.popup_hiddenPop(ODPViewUtil.E_Obj(pop.id + '_' + (i + 1)), false);
      }
    }
  },
  trClickFun : function(event, methodName) {
    // 关闭快捷菜单
    this.popup_closePop();
    // 支持自定义方法
    if (window[methodName]) {
      window[methodName].apply(this, [ this.selectTreeNode ]);
    }
  },
  /*
   * 根据但前根菜单节点，关闭所有菜单
   * 
   */
  popup_closePop : function() {
    if (this.popup_getRootDiv()) {
      this.popup_hiddenPop(this.popup_getRootDiv());
      if (this.popup_getCurrentDiv()) {
        this.popup_getCurrentDiv().style.display = 'none';
      }
    }
  },
  popup_getRootDiv : function() {
    return ODPViewUtil.E_Obj(this.root);
  },
  popup_setRootDiv : function(div) {
    this.root = div;
  },
  popup_getCurrentDiv : function() {
    return ODPViewUtil.E_Obj(this.currentDiv);
  },
  popup_setCurrentDiv : function(div) {
    this.currentDiv = div;
  },
  popup_getParentDiv : function(pop) {
    return ODPViewUtil.E_Obj(pop.prePop);
  }
};
// ==== 基类 通用属性定义 ======
$.hr.BaseNode = function(name) {
  // 树节点的ID
  this.id;
  // 节点的显示名称
  this.name = name;
  // 节点的父节点
  this.parent;
  // 节点的前一个节点
  this.previous;
  // 节点的下一个节点
  this.next;
  // 在AJAX模式下起效，判断有无字节点
  this.hasChild = false;
  // 节点的子节点
  this.child = [];
  // 节点的级别，根节点为0
  this.level = 0;
  // 节点所在的树对象
  this.tree;
  // 节点在树中的序号，根节点为0
  this.xuhao = 0;
  // 子节点正在显示吗？表示当前状态
  this.displaychild = false;
  // 节点展开过的历史记录，一旦变true，无法改变，除非调树的改形状函数
  this.zhankaiguo = false;
  // 默认的样式
  this.defaultClass = "qiguai";
  // 节点详细数据信息 json字符串格式(供外部使用)
  this.dataObj;
  // 当前节点前面的图片对象
  this.nodePreImgNode = null;
};

// ==== 基类 通用方法定义 ======
$.hr.BaseNode.prototype = {
  /**
   * 节点生成html 通用的部分 抽取
   */
  createCommonFragment : function() {
    // 创建document碎片
    var oFragment = document.createDocumentFragment();
    // 这里用for循环表示前面的空格或竖线 如：2级节点循环一次。3级节点，循环两次
    for ( var i = this.level - 1; i > 0; i--) {
      var $img = $("<span/>").addClass(this.getNodeCss(this.getDivFrontImg(this.getParent(i))));
      oFragment.appendChild($img[0]);
    }
    // 生成加号图片对象
    var $img = $("<span/>").attr({
      "id" : this.getJiaHaoImgId()
    }).addClass(this.getNodeCss(this.getJiaHaoImg()));

    // 绑定加号图片对象事件
    $img[0].onclick = ODPViewUtil.bindFunction(this.jiaHaoImgClick, this);
    oFragment.appendChild($img[0]);
    // 生成文件夹图片对象
    var $foldImg = $("<span/>").attr({
      "id" : this.getFoldImgId()
    }).addClass(this.getNodeCss(this.getFoldImg()));

    oFragment.appendChild($foldImg[0]);
    return oFragment;
  },
  /**
   * 点击加号图片对象 图片触发的事件方法
   */
  jiaHaoImgClick : function(event) {
    // 存在两次调用处理的情况，不过走的分支不一样属于正常情景，但是第二次可能进来可能取不到event对象，所以做个临时保存
    var clickNode = event === null || (event != null && event.type == "readystatechange") ? this.nodePreImgNode
        : ODPViewUtil.getSrcElement(event) || this.nodePreImgNode;
    this.nodePreImgNode = clickNode;
    var curTreeObj = this.tree.divtree;

    // 这里要判断，如果本节点无子节点
    var fu = clickNode.parentNode;
    var childnodes = this.child;

    if (childnodes.length == 0) {
      // ====== 如果AJAX模式已经开启 ======
      if (curTreeObj.ajaxmode && this.hasChild) {
        // 没有自定义AJAX数据接口
        this.loadingGif();
        // 调用AJAX开始加载之前的事件接口
        curTreeObj.ajaxAddBefore.apply(clickNode, [ this.dataObj, this ]);
        if (!curTreeObj.customerAjaxReader) {
          curTreeObj.defaultAjaxReader.apply(clickNode, [ this.dataObj, this ]);
        } else { // 存在自定义AJAX数据接口
          curTreeObj.customerAjaxReader.apply(clickNode, [ this.dataObj, this ]);
        }
        // 调用AJAX开始加载之后的事件接口
        curTreeObj.ajaxAddAfter.apply(clickNode, [ this.dataObj, this ]);
      }
      return;
    }
    // 已经有孩子结点
    var isEndTail = this.next ? false : true;
    // ====== 子节点已经展开 ======
    if (this.displaychild) {
      this.displaychild = false;
      clickNode.className = this.getNodeCss(this.getJiaHaoImgAfterClick(this.displaychild, isEndTail));

      if (!this.img)
        clickNode.nextSibling.className = this.getNodeCss(ODPViewTreeConst.folderIcon);
      // 把这个节点下面所有的div设为隐藏显示
      for ( var i = fu.childNodes.length - 1; i >= 0; i--) {
        if ($(fu.childNodes[i]).attr("className") == this.defaultClass) {
          fu.childNodes[i].style.display = 'none';
        }
      }
      return;
    }
    // ====== 以下场景是节点的子节点未打开 ======
    this.displaychild = true;
    // 加变减，减变加，但要考虑是不是末节点
    clickNode.className = this.getNodeCss(this.getJiaHaoImgAfterClick(this.displaychild, isEndTail));
    // 现在已经知道序号，要求他的父节点添加子节点
    if (!this.img && clickNode.nextSibling)
      clickNode.nextSibling.className = this.getNodeCss(ODPViewTreeConst.openFolderIcon);

    if (!this.zhankaiguo) {
      this.zhankaiguo = true;
      // 加变减，减变加，但要考虑是不是末节点
      var oFragmentChildDiv = document.createDocumentFragment();
      for ( var i = 0; i < childnodes.length; i++) {
        oFragmentChildDiv.appendChild(childnodes[i].innerhtml());
      }

      fu.appendChild(oFragmentChildDiv);
    } else {
      // 这里不新加行
      for ( var i = fu.childNodes.length - 1; i >= 0; i--) {
        if ($(fu.childNodes[i]).attr("className") == this.defaultClass) {
          fu.childNodes[i].style.display = '';
        }
      }
    }
  },
  /**
   * 给节点添加子节点
   * 
   * @param {$.hr.Node}
   *          node 子节点
   */
  add : function(node) {
    // (1)设置自身的： child子节点，
    var chang = this.child.length;
    this.child[chang] = node;
    // (2)要设置node的：parent，level，tree，不设置下一个节点，子节点
    node.parent = this;
    node.level = this.level + 1;
    node.tree = this.tree;
    // (3)设置node的前一个节点的 ：next, node的previous，
    if (chang > 0) {
      node.previous = this.child[chang - 1];
      node.previous.next = node;
    }

    // (4)设置树的treeArray[], node的xuhao，
    chang = node.tree.treeArray.length;
    node.tree.treeArray[chang] = node;
    // 设置树节点序号
    this.tree.divtree.addNodeXuHao();
    node.xuhao = this.tree.divtree.getMaxNodeXuHao();

    // (5)设置树的maxlevel;
    if (node.level > this.tree.maxlevel) {
      this.tree.maxlevel = node.level;
    }
  },
  /*
   * 删除节点
   */
  remove : function() {
    // 如果是root节点直接返回
    if (this == this.tree.root)
      return;
    var tempch = null;
    var tempch2 = null;
    var isEndTail = this.next ? false : true;
    var leng = this.parent.child.length; // 该层级节点的节点数
    var parentc = this.parent.child; // 该层级的节点对象数组
    // 1.改变maxlevel
    // 如果当前树的最大级别和目前节点的最大级别一致就要调整
    // 判断当前节点是不是当级上的最后一个如果是要-1，否则不更改
    if (this.tree.maxlevel == this.level && leng == 1) {
      this.tree.maxlevel -= 1;
    }
    // 2.清理原有的数组缓存 3.改变节点next的关联关系
    // 1 递归清除清空全局树形缓存数组
    this.clearArray(this.tree.treeArray, this.child);
    // 全局树形缓存数组清空当前节点
    for ( var i = 1; i < this.tree.treeArray.length; i++) {
      if (this.tree.treeArray[i] == this) {
        this.tree.treeArray.splice(i, 1);
        break;
      }
    }
    // 如果同级下节点个数大于一个，且自己不是末尾需要更换索引位置
    if (!isEndTail) {
      // 找到和和自己同级的下一个节点改变索引位置
      for ( var i = 0; i < leng - 1; i++) {
        if (this == parentc[i]) {
          if (i + 1 <= leng - 1)
            tempch = parentc[i + 1];
          if (i - 1 >= 0)
            tempch2 = parentc[i - 1];
          // 清理父节点中的缓存
          parentc.splice(i, 1);
          break;
        }
      }
      // 更改指向
      if (tempch2)
        tempch2.next = tempch;
    }
    // 如果是末尾删除父节点中的缓存
    else {
      // 如果是末尾那么当前节点的上一个兄弟节点的NEXT应该是空
      if (leng >= 2) {
        parentc[leng - 2].next = null;
      }
      parentc.splice(leng - 1, 1);
    }
    // 4改变图示
    // 需要改变父级的图标,同级上还有其他叶子节点则不用操作。
    var parnode = this.parent;
    var parnodenext = parnode.next ? true : false;
    var foldimg;
    // 如果展开过就表示已经添加到DOM模型中需要处理
    parnode.zhankaiguo = parnode == this.tree.root ? true : parnode.zhankaiguo;
    if (parnode.zhankaiguo) { // 改变图标 文件夹图标变为文件
      var jhimg = parnode.getHtmlElementJiaHaoImg();
      if (jhimg) {
        var hasChilda = parnode.hasChild;
        parnode.hasChild = false;
        // 如果子节点未显示,或无子节点则需要改变+-符号
        if (!parnode.displaychild || parnode.child.length == 0) {
          jhimg.className = this.getNodeCss(parnode.getJiaHaoImg());
        }
        // 改变文件夹到文件
        jhimg.nextSibling.className = this.getNodeCss(parnode.getFoldImg());
        parnode.hasChild = hasChilda;
      }
      // 处理删除同一级的最后一个图片处理
      var tongjlastn = parentc[parentc.length - 1];
      if (tongjlastn && !tongjlastn.displaychild) {
        jhimg = tongjlastn.getHtmlElementJiaHaoImg();// img对象
        if (jhimg)
          jhimg.className = this.getNodeCss(tongjlastn.getJiaHaoImg()); // img图片路径
      }
      // 如果删除的节点树叶子节点而且删除的节点的前一个节点有孩子就需要递归处理竖线到空图片
      if (tongjlastn && tongjlastn.child) {
        this.clearVerticalLine(tongjlastn, tongjlastn.child, this.level, tongjlastn.level);
      }
    }
    // 5改变树DOM结构
    // 得到当前节点的父节点执行DOM删除操作
    var jiah = this.getHtmlElementJiaHaoImg();
    if (jiah) {
      var jiahpar = jiah.parentNode;
      jiahpar.parentNode.removeChild(jiahpar);
    }
  },
  /**
   * 给节点动态添加子节点,参数还可以是数组
   * 
   * @param {$.hr.Node}
   *          node 子节点
   */
  addDynamic : function(node) {
    if (this.level == 0) { // 如果是根节点
      addSubNodesToParent(this, node);
      var tree = this.tree.divtree; // 获得树
      tree.showTreeBody(); // 展开
      var div = tree.div.lastChild; // 获得树干
      if (node instanceof Array) {
        for ( var i = 0; i < node.length; i++) {
          isNeedRedraw(node[i]);
          div.appendChild(node[i].innerhtml());
        }
      } else {
        isNeedRedraw(node);
        div.appendChild(node.innerhtml());
      }
      return;
    }
    // 如果当前节点不是根节点
    if (this.child.length > 0)
      this.expand();
    if (this.child.length == 0) { // 自己没子节点
      addSubNodesToParent(this, node); // 模型添加
      var jiahaoDOM = this.getHtmlElementJiaHaoImg();
      if (this.next) { // 如果不是最后一个
        jiahaoDOM.className = this.getNodeCss(ODPViewTreeConst.tPlusIcon);
      } else {
        jiahaoDOM.className = this.getNodeCss(ODPViewTreeConst.lPlusIcon);
      }
      jiahaoDOM.nextSibling.className = this.getNodeCss(ODPViewTreeConst.folderIcon);
      jiahaoDOM.onclick();
    } else { // 自己有子节点
      if (!this.displaychild)
        this.expandChilds();
      var lastNode = this.child[this.child.length - 1];
      var lastNodejiahaoDOM = lastNode.getHtmlElementJiaHaoImg();
      if (lastNode.child.length == 0 && !lastNode.hasChild) // 如果末尾是不带子节点的
        lastNodejiahaoDOM.className = this.getNodeCss(ODPViewTreeConst.tIcon);
      else {
        if (lastNode.zhankaiguo) {// 如果展开过，要递归
          // 递归前先处理自己
          if (lastNode.displaychild) {// 正在显示
            lastNodejiahaoDOM.className = this.getNodeCss(ODPViewTreeConst.tMinusIcon);
          } else { // 不在显示
            lastNodejiahaoDOM.className = this.getNodeCss(ODPViewTreeConst.tPlusIcon);
          }
          var arr = lastNode.child; // 递归
          for ( var i = 0; i < arr.length; i++)
            arr[i].redrawVerticalLine(lastNode.level - 1);
        } else
          // 即便末尾未展开过，也变
          lastNodejiahaoDOM.className = this.getNodeCss(ODPViewTreeConst.tPlusIcon);
      }
      addSubNodesToParent(this, node); // 模型添加
      var div = this.getHtmlElement();
      // 逐个添加,要改
      if (node instanceof Array) {
        for ( var i = 0; i < node.length; i++) {
          div.appendChild(node[i].innerhtml());
        }
      } else {
        div.appendChild(node.innerhtml());
      }
    }
    // 子函数：如果有前个节点，前个节点重绘
    function isNeedRedraw(node2) {
      if (node2.previous)
        node2.previous.redrawFirstLine();
    }
    // 给内存中的树的某节点添加子节点
    function addSubNodesToParent(node3, node4) {
      if (node4 instanceof Array) {
        for ( var i2 = 0; i2 < node4.length; i2++)
          node3.add(node4[i2]);
      } else
        node3.add(node4);
    }
  },
  /**
   * ajax模式下的重新加载当前节点
   */
  reload : function() {
    if (!this.tree.divtree.ajaxmode)
      return;
    while (this.child.length > 0) {
      var node = this.child[this.child.length - 1];
      node.remove();
    }
    this.loaded = false; // 为加载
    this.zhankaiguo = false; // 未展开
    this.displaychild = false; // 未显示
    this.hasChild = true;
    var nndo = this.getHtmlElementJiaHaoImg();
    if (nndo) {
      this.nodePreImgNode = nndo;
      this.jiaHaoImgClick(null);
    }

  },
  /**
   * 页面上展开子节点,谨慎使用
   * 
   * @private
   */
  expandChilds : function() {
    // 如果它不是叶节点，而且节点的状态是this.displaychild = false;
    // 那么就单击
    if (this.level == 0)
      this.tree.divtree.showTreeBody();
    else if (this.level != this.tree.maxlevel && (!this.displaychild)) {
      this.getHtmlElementJiaHaoImg().onclick();
    }
  },
  /**
   * 展开或者收缩子节点，如果不存在该子节点则会自动加载 推荐使用
   */
  expandNodes : function() {
    var nndo = this.getHtmlElementJiaHaoImg();
    if (nndo) {
      this.nodePreImgNode = nndo;
      this.jiaHaoImgClick(null);
    }
  },
  /**
   * 返回祖先节点
   * 
   * @param {int}
   *          i 与目标节点的级别差
   * @return 返回祖先节点
   * @type $.hr.Node
   */
  getParent : function(i) {
    function getParentRecursion(i, node) {
      var node = node.parent;
      i--;
      if (i == 0)
        return node;
      return getParentRecursion(i, node);
    }
    return getParentRecursion(i, this);
  },
  // 展开方式取反
  toggle : function(node) {
    var d = node || this;
    var imgf = d.getHtmlElementFoldImg();
    // 如果不是root节点
    if (imgf) {
      imgf.onclick();
    }
  },
  /**
   * 完全展开节点（展开所有父节点）
   */
  expandParent : function() {
    // 因为DOM渲染关系必须按照顺序从上而下的构造DOM，故采取此方式处理
    var arr = [];
    var parentNode = this.parent;
    while (parentNode) {
      arr.push(parentNode);
      parentNode = parentNode.parent;
    }
    while (arr.length > 0) {
      arr.pop().expandChilds();
    }
  },

  /**
   * 页面上收缩子节点
   */
  collapseChildren : function() {
    // 如果它不是叶节点，而且节点的状态是this.displaychild = false;
    // 那么就单击
    if (this.level == 0)
      this.tree.divtree.hideTreeBody();
    else if (this.level != this.tree.maxlevel) {
      var imgjiah = this.getHtmlElementJiaHaoImg();
      imgjiah.onclick();
      var fu = imgjiah.parentNode;
      for ( var i = fu.childNodes.length - 1; $(fu.childNodes[i]).attr("className") == this.defaultClass && i >= 0; i--)
        fu.childNodes[i].style.display = 'none';
    }
  },

  /**
   * 收缩节点
   */
  collapseAll : function() {
    this.collapseChildren();
  },

  /**
   * 是否显示，即display是否为block
   */
  isShow : function() {
    return this.zhankaiguo;
  },
  /**
   * 是否渲染过,DOM模型中是否存在
   */
  isRender : function() {
    return this.displaychild;
  },
  /**
   * 页面上显示节点
   */
  expand : function() {
    this.tree.divtree.expandNode(this);
  },

  /**
   * 这个节点的方法可以返回 所有子节点的个数
   * 
   * @returns 包括当前节点
   */
  getAllChildsNum : function() {
    return this.getChildNodes().length;
  },

  /**
   * 取得选中节点的孩子结点 （不管选中与否）
   * 
   * @return {Array} 包括当前节点、所有子节点的数组
   */
  getAllChildNodes : function() {
    function getNodesRecursion(arr, node) {
      arr.push(node);
      for ( var i = 0; i < node.child.length; i++)
        getNodesRecursion(arr, node.child[i]);
    }
    var resultArr = [];
    getNodesRecursion(resultArr, this);
    return resultArr;
  },

  /**
   * 取得当前节点的直接下级的所有节点对象(不递归)。
   */
  getFirstLeveChildNodes : function() {
    var resultArr = [];
    for ( var i = 0; i < this.child.length; i++) {
      resultArr.push(this.child[i]);
    }
    return resultArr;
  },

  /*
   * 设置节点的文件夹图标为loading.gif 仅在节点显示时有效
   */
  loadingGif : function(node) {
    var img = this.getHtmlElementFoldImg();
    if (img)
      img.className = this.getNodeCss(ODPViewTreeConst.loadingIcon);
  },

  /*
   * 恢复节点的文件夹图标为标准样式 不是仅在节点显示时有效
   */
  loadingGifRenew : function(node) {
    var img = this.getHtmlElementFoldImg();
    if (!img)
      return;
    img.className = this.getNodeCss(this.getFoldImg());
    if (this.child.length > 0)
      return;
    var imgjh = img.previousSibling;
    // 改这里
    if (imgjh) {
      imgjh.className = this.getNodeCss(this.getJiaHaoImg());
    }
  },

  // 根据父节点返回竖线还是空格，是一行div中最前面的图片
  getDivFrontImg : function(node) {
    // (1)父节点不是末尾
    // (2)父节点是末尾
    var s;
    if (node.next) // (1)父节点不是末尾
      s = ODPViewTreeConst.iIcon;
    else
      // (2)父节点是末尾
      s = ODPViewTreeConst.blankIcon;
    return s;
  },

  // 重绘竖线
  redrawVerticalLine : function(num) {
    if (this.parent.displaychild) {
      var img = this.getHtmlElement().firstChild;
      for ( var i = 0; i < num; i++)
        img = img.nextSibling;
      img.className = this.getNodeCss(ODPViewTreeConst.iIcon);

      for ( var j = 0; j < this.child.length; j++)
        this.child[j].redrawVerticalLine(num);
    }
  },
  /**
   * 给节点重绘第一条线
   * 
   * @private
   */
  redrawFirstImg : function() {
    var img = this.getHtmlElement().firstChild;
    if (this.level == 1) {
      if (this.child.length == 0 && !this.hasChild) // 如果没有子节点，且AJAX模式下也无子节点
        img.className = this.getNodeCss(ODPViewTreeConst.tIcon);
      else { // 有子节点
        if (this.displaychild) { // 正在显示
          img.className = this.getNodeCss(ODPViewTreeConst.tMinusIcon);
        } else { // 不在显示
          img.className = this.getNodeCss(ODPViewTreeConst.tPlusIcon);
        }
      }
    } else {
      img.className = this.getNodeCss(ODPViewTreeConst.iIcon);
    }
  },
  /**
   * 给节点以及它的子节点重绘第一条线
   * 
   * @private
   */
  redrawFirstLine : function() {
    if (this.parent.zhankaiguo) {
      this.redrawFirstImg();
      var arr = this.child;
      for ( var i = 0; i < arr.length; i++)
        arr[i].redrawFirstLine();
    }
  },
  /**
   * 返回加号位置的图片，不过是点击后判断,注意是4种图标
   * 
   * @param {boolean}
   *          img1 节点的子节点是否正在显示
   * @param {boolean}
   *          node 节点是否在末尾
   * @return 返回加号位置图片
   * @type String
   */
  getJiaHaoImgAfterClick : function(img1, mowei) {
    var s;
    if (mowei) // 在末尾
      // 正在展开 ? 变为减 : 变为加
      s = img1 ? ODPViewTreeConst.lMinusIcon : ODPViewTreeConst.lPlusIcon;
    else
      // 不在末尾
      // 正在展开 ? 变为减 : 变为加
      s = img1 ? ODPViewTreeConst.tMinusIcon : ODPViewTreeConst.tPlusIcon;
    return s;
  },
  /**
   * 返回缺省文件夹图片
   * 
   * @return 返回文件夹图片
   * @type String
   */
  getFoldImg : function() {
    // 有3种，开文件夹，闭文件夹，一张纸
    var s;
    if (this.level != 0) {
      if (this.child.length > 0 || this.hasChild) // 有子节点
        if (this.displaychild)// 子节点在显示
          s = ODPViewTreeConst.openFolderIcon;
        else
          // 子节点不在显示
          s = ODPViewTreeConst.folderIcon;
      else
        // 无子节点
        s = ODPViewTreeConst.fileIcon;
    } else {
      s = ODPViewTreeConst.openFolderIcon;
    }
    return s;
  },
  /**
   * 返回加号位置的图片，4种情况 (1)有子节点，不是末尾 (2)有子节点，是末尾 (3)无子节点，不是末尾 (4)无子节点，是末尾
   * 
   * @return 返回加号位置的图片
   * @type String
   */
  getJiaHaoImg : function() {
    var s;
    // 增加haschild处理AJAX时的图片问题
    if (this.child.length > 0 || this.hasChild) { // 有子节点
      if (this.next) // 不是末尾
        s = ODPViewTreeConst.tPlusIcon;
      else
        // 是末尾
        s = ODPViewTreeConst.lPlusIcon;
    } else { // 无子节点
      if (this.next) // 不是末尾
        s = ODPViewTreeConst.tIcon;
      else
        // 是末尾
        s = ODPViewTreeConst.lIcon;
    }
    return s;
  },
  /**
   * 通过全局节点得到节点div对象
   * 
   * @return DOM对象，是一个div
   * @type HTMLElement:div
   */
  getHtmlElement : function() {
    return ODPViewUtil.E_Obj(this.tree.objectname + this.xuhao);
  },
  // 取得文件夹的ID值
  getFoldImgId : function() {
    return (this.tree.objectname + 'imgfold' + this.xuhao);
  },
  // 通过全局节点得到文件夹img对象
  getHtmlElementFoldImg : function() {
    return ODPViewUtil.E_Obj(this.getFoldImgId());
  },
  // 取得+ 图片的Id值
  getJiaHaoImgId : function() {
    return (this.tree.objectname + ODPViewTreeConst.treeJiahaoImgID + this.xuhao);
  },
  /**
   * 获取树节点所在的span样式 (基本样式+背景图样式)
   * @param backgroundIco 背景图样式
   * @returns {String}
   */
  getNodeCss : function(backgroundIco) {
    return ODPViewTreeConst.nodeSpan + " " + backgroundIco;
  },
  /**
   * 通过全局节点得到节点的加号img对象
   * @return DOM对象，是一个img
   * @type HTMLElement:img
   */
  getHtmlElementJiaHaoImg : function() {
    return ODPViewUtil.E_Obj(this.getJiaHaoImgId());
  },
  /*
   *获取竖线所在的图片元素
   */
  getImgTracert : function(node, nodelevel, currlevel) {
    var imgjiah = node.getHtmlElementJiaHaoImg();
    if (imgjiah) {
      for ( var i = 0; i < currlevel - nodelevel; i++) {
        imgjiah = imgjiah.previousSibling;
      }
    }
    return imgjiah;
  },
  clearArray : function(list, childList) {
    if (!childList || childList.length == 0)
      return;
    for ( var i = list.length - 1; i >= 1; i--) {
      for ( var j = childList.length - 1; j >= 0; j--) {
        if (list[i] == childList[j]) {
          list.splice(i, 1);
        }
        this.clearArray(list, childList[j].child);
      }
    }
  },

  clearVerticalLine : function(node, list, nodelevel, currlevel) {
    if (list.length == 0)
      return;
    for ( var i = 0; i < list.length; i++) {
      var img = list[i].getImgTracert(list[i], nodelevel, list[i].level);
      if (img) {
        img.className = this.getNodeCss(ODPViewTreeConst.blankIcon);
      }
      this.clearVerticalLine(list[i], list[i].child, nodelevel, list[i].level);
    }
  }
}; 
 /**
 * 单选树节点的构建
 */
$.hr.NormalNode = function(name) {
  // 节点的ID标志
  this.id;
  // 节点的url地址
  this.hrefurl;
  // a标签的target处理
  this.targetframe;
  // 调用父类的构造函数
  $.hr.NormalNode.superClass.constructor.call(this, name);
};

// 继承基类
$.hr.extendClass($.hr.NormalNode, $.hr.BaseNode);

// === 原型方法定义 ======
$.extend($.hr.NormalNode.prototype, {
  innerhtml : function() {
    // 生成节点的div
    var $div = $("<DIV/>").attr({
      "id" : this.tree.objectname + this.xuhao,
      "className" : this.defaultClass
    });
    var curNode = this;
    var curTreeObj = curNode.tree.divtree;
    // 生成通用部分组件
    var oFragment = this.createCommonFragment();

    var $link = $("<A/>").attr("href", "#").addClass(ODPViewTreeConst.treelink);
    $link[0].onclick = function(event) {

      // 去掉背景颜色标记
      if (curTreeObj.lastselected != null) {
        curTreeObj.lastselected.className = 'treelink';
      }
      // 加背景颜色标记
      $(this).addClass("selectedRow");
      curTreeObj.selected = curNode;
      curTreeObj.lastselected = $link[0];
      // 添加到属性中
      curTreeObj.clickNode(curNode);
      var objEvent = ODPViewUtil.getEvent(event);

      // 右键时选中节点处理
      if (objEvent.button == 2) { // 创建快捷菜单
        new $.hr.popMenu(event, curNode, curTreeObj.menuXml);
      } else {
        // 增加onclick事件时外部动态传入的方法的处理,如果是内部调用者不执行外部方法
        if (curTreeObj.customerReturnFun) {
          curTreeObj.customerReturnFun.apply(this, [ curNode ]);
        }
      }
      // 防止上下跳跃
      return false;
    };
    /*
     * //增加DBCLICK时展开的事件 $link[0].ondblclick = function() { curTreeObj.defaultDBClickNode(curNode); };
     */
    $link[0].onfocus = function() {
      curTreeObj.selected = null;
      this.blur();
    };
    $link[0].oncontextmenu = function() {
      return false;
    };
    // 增加右键菜单接口
    $link[0].onmousedown = function(event) {
      var objEvent = ODPViewUtil.getEvent(event);
      if (objEvent.button == 2) { // 右键快捷方式弹出
        this.onclick(event);
      }

      // 触发外界onmouseDown方法,传递当前节点到方法外
      if (curTreeObj.onmouseDownFun) {
        var fun = curTreeObj.onmouseDownFun;
        fun.apply(curNode, [ curNode ]);
      }
    };

    // 增加外部传入URL的处理
    if (curNode.hrefurl && curNode.hrefurl != '')
      $link.attr("href", curNode.hrefurl);
    // 增加外部传入的a标签的target处理
    if (curTreeObj.targetframe && curTreeObj.targetframe != '')
      $link.attr("target", curTreeObj.targetframe);

    $link.append(document.createTextNode(this.name));
    oFragment.appendChild($link[0]);
    $div.append(oFragment);
    return $div[0];
  },

  /**
   * 展开后，选中某个节点
   * 
   * @return DOM对象，是一个img
   * @type HTMLElement:img
   */
  select : function(bol) {
    this.expandParent();
    if (this.getHtmlElementFoldImg())
      this.getHtmlElementFoldImg().nextSibling.onclick(bol);
  },

  /**
   * 取消选中某个节点
   * 
   * @return DOM对象，是一个img
   * @type HTMLElement:img
   */
  deselect : function() {
    var htmlElementFoldImg = this.getHtmlElementFoldImg();
    if (htmlElementFoldImg) {
      htmlElementFoldImg.nextSibling.onclick();
    }
  },

  // 取得本节点所有父节点Id值 （逗号分隔）
  getNodeParentIDs : function() {
    var parents = [];
    var node = this;
    var parnode = node.parent;
    while (parnode) {
      parents.unshift(parnode.id);
      parnode = parnode.parent;
      if (!parnode || parnode.level == 0)
        break;
    }
    return parents.join(",");
  }

});

 
$.hr.CheckNode = function(name) {
  // 调用父类的构造函数
  $.hr.CheckNode.superClass.constructor.call(this, name);
  // 节点的复选框状态，0:不中， 1：选中， 2：部分
  this.checked = 0;
  // 渐变的颜色数
  this.timecolor = 7;
  /**
   * 复合构造情况下的可选不可选标志， 可选但是值不带入最后的获取
   */
  this.hasCheck = true;
};
// 继承基类
$.hr.extendClass($.hr.CheckNode, $.hr.BaseNode);

$.extend($.hr.CheckNode.prototype, {
  /**
   * 创建节点的DOM对象 这里的逻辑是最复杂的，插入行，结构见上面
   * 
   * @private
   * @return DOM对象，是一个div
   * @type HTMLElement:div
   */
  innerhtml : function() {
    var $div = $("<DIV/>").attr({
      "id" : this.tree.objectname + this.xuhao,
      "className" : this.defaultClass,
      "height":"16px"
    });
    var curNode = this;
    var curTreeObj = curNode.tree.divtree; // 当前节点所对应的树对象
    // 生成通用部分组件
    var oFragment = this.createCommonFragment();

    // 绘制复选框的图标，有单击事件，复杂
    $checkbx = $("<span/>").attr({
      "id" : this.getCheckBoxId()
    }).addClass(this.getNodeCss(this.getCheckBoxImg())).css({
      "width" : "16px",
      "marginLeft" : ODPViewTreeConst.multi_jianju1
    });

    $checkbx[0].onclick = function() {
      // 他的影响是双向的，
      // 对于底部，全部选中
      // 对于上方，要考虑是部分选中还是全部选中，并且立即更改属性并绘制
      var fu = this.parentNode;
      if (curNode.checked == 1) {// 全中的情况下 点击 变成全不中
        curNode.checked = 0;
        this.className = curNode.getNodeCss(ODPViewTreeConst.buzhongIcon);
      } else { // 全不中和部分不中点击变成全中。
        curNode.checked = 1;
        this.className = curNode.getNodeCss(ODPViewTreeConst.quanzhongIcon);
      }
      // 判断是否打开向上选择(半选)的参数
      if (curTreeObj.upChoose) {
        curNode.upRecursion(curNode);
      }
      // 判断是否打开向下选择的参数
      if (curTreeObj.downChoose) {
        curNode.downRecursion(curNode);
      }
    };
    oFragment.appendChild($checkbx[0]);

    // 绘制文字超链接
    var $link = $("<A/>").attr("href", "#").addClass(ODPViewTreeConst.treelink);
    $link[0].onclick = function() {
      curTreeObj.clickNode(curNode);
      return false;
    };
    $link[0].onfocus = function() {
      this.blur();
    };
    $link[0].onmouseover = function() {
      this.style.color = 'blue';
    };
    $link[0].onmouseout = function() {
      this.style.color = 'black';
    };
    $link[0].appendChild(document.createTextNode(this.name));
    $link[0].oncontextmenu = function() {
      return false;
    };

    $link[0].onmousedown = function(evt) {
      var objEvent = window.event || evt;
      // 右键时选中节点处理
      if (objEvent.button == 2) {
        this.onclick();
      }
      // 触发外界onmouseDown方法,传递当前节点到方法外
      if (curTreeObj.onmouseDownFun) {
        var fun = curTreeObj.onmouseDownFun;
        fun.apply(curNode, [ curNode ]);
      }
    };

    oFragment.appendChild($link[0]);
    $div.append(oFragment);
    return $div[0];
  },

  /**
   * 确定复选框的状态，并向下递归
   * 
   * @param {$.hr.Node}
   *          node 对这个参数节点递归，调用对象节点没用
   */
  downRecursion : function(node) {
    var _self = this;
    function selectDown(nodeDef) {
      nodeDef.checked = nodeDef.parent.checked;
      nodeDef.getHtmlElementCheckBoxImg().className = _self.getNodeCss(nodeDef.getImgByCheckStatus(nodeDef.parent.checked));
      if (nodeDef.level == nodeDef.tree.maxlevel)
        return;

      if (!nodeDef.displaychild && !nodeDef.zhankaiguo)
        return;// 注意到这里不同的地方！
      for ( var i = 0; i < nodeDef.child.length; i++)
        selectDown(nodeDef.child[i]);
    }

    if (node.level == node.tree.maxlevel)
      return;
    // 如果子节点不在显示并且子节点不存在内存 就返回
    if (!node.displaychild && !node.zhankaiguo)
      return;// 注意这句话！
    for ( var j = 0; j < node.child.length; j++)
      selectDown(node.child[j]);
  },

  /**
   * 确定复选框的状态，并向上递归
   * 
   * @param {$.hr.Node}
   *          node 对这个参数节点递归，调用对象节点没用
   */
  upRecursion : function(node) {
    if (node.level == 0)
      return;
    var boo = true; // 先假定节点状态全部一样
    var boo2 = false;
    var parentyangshi = node.parent.checked; // 父节点样式，可能是0，1，2
    var yangshi = node.checked; // 获得当前节点的样式,记住不可能是局部，只会是0或1

    var arr = node.parent.child;
    for ( var i = 0; i < arr.length; i++) {
      var tempyangshi = arr[i].checked;
      if (tempyangshi != yangshi) {
        boo = false;
        break;
      }
    }
    // 如果boo=false，说明有不同，父节点选2，看一样不一样，来决定是否递归
    // 如果boo=true,说明是相同，父节点选当前样式，看一样不一样，来决定是否递归
    if (!boo) {
      node.parent.checked = 2;
    } else {
      node.parent.checked = yangshi;
    }
    node.parent.getHtmlElementCheckBoxImg().className = this.getNodeCss(this.getImgByCheckStatus(node.parent.checked)); // 这是改html样式
    if (node.parent.checked != parentyangshi) { // 判断是否递归
      this.upRecursion(node.parent);
    }
  },

  /**
   * 根据状态返回图片（复选框）
   * 
   * @param {int}
   *          checked 节点状态
   * @return 根据状态返回图片（复选框） 节点的复选框状态，0:不中， 1：选中， 2：部分
   * @type String
   */
  getImgByCheckStatus : function(checked) {
    if (checked == 0)
      return ODPViewTreeConst.buzhongIcon;
    if (checked == 1)
      return ODPViewTreeConst.quanzhongIcon;
    if (checked == 2)
      return ODPViewTreeConst.jubuzhongIcon;
  },

  /**
   * 返回复选框图片，作用：改变节点状态属性
   * 
   * @return 返回复选框图片
   * @type String 节点的复选框状态，0:不中， 1：选中， 2：部分
   */
  getCheckBoxImg : function() {
    if (this.parent.checked == 2)
      return this.getImgByCheckStatus(this.checked);
    var s;
    // 判断子级渲染时是否子级跟随渲染
    if (this.parent.checked == 1 && this.tree.divtree.downChoose) {
      // 判断子级渲染时是否子级跟随渲染
      this.checked = 1;
      s = ODPViewTreeConst.quanzhongIcon;
    } else {
      this.checked = 0;
      s = ODPViewTreeConst.buzhongIcon;
    }
    return s;
  },

  /**
   * 页面上显示节点并打勾
   */
  expandChecked : function() {
    this.tree.divtree.expandCheckedNode(this);
  },

  /**
   * 返回节点链，0是根节点，最后是自己
   * 
   * @return 一个节点数组，从根节点开始，根节点的一个子节点， 根节点的一个子节点的子节点……直到自己
   * @type Array:$.hr.Node
   */
  getNodeLink : function() {
    if (this.level == 0)
      return [ this ];
    var s = [];
    var node = this;
    s.unshift(node);
    ee(node);
    return s;
    // 递归
    function ee(node) {
      var parent = node.parent;
      s.unshift(parent);
      if (parent == node.tree.root)
        return;
      ee(parent);
    }
    ;
  },

  load : function() {
    if (!this.tree.divtree.ajaxmode)
      return;
    this.loaded = false; // 为加载
    this.zhankaiguo = false; // 未展开
    this.displaychild = false; // 未显示
    this.getHtmlElementJiaHaoImg().onclick();
  },

  /**
   * 得到当前节点的父节点链
   */
  getNodeParentIDs : function() {
    var nodes = this.getNodeLink();
    var parents = [];
    while (nodes.length > 0) {
      var idd = nodes.pop().id;
      if (idd != '-1') {
        parents.unshift(idd);
      }
    }
    return parents;
  },

  /**
   * 通过全局节点得到节点的复选框img对象
   * @return DOM对象，是一个img
   * @type HTMLElement:img
   */
  getHtmlElementCheckBoxImg : function() {
    return ODPViewUtil.E_Obj(this.getCheckBoxId());
  },

  // 获取checkbox的ID值
  getCheckBoxId : function() {
    return (this.tree.objectname + ODPViewTreeConst.treeCheckBoxID + this.xuhao);
  }
});

$.hr.TreeDataObject = function(name, objectname, xyTreeRooNode) {

  xyTreeRooNode.tree = this;
  this.treename = name; // 名称
  // 树的最大层数，也就是最深的叶节点位于第几层，根节点算第0层
  this.maxlevel = 0;
  // 树的根节点，通过它也能访问整棵树，形式一
  this.root = xyTreeRooNode;

  /**
   * 树的所有节点的数组，通过它也能访问整棵树，形式二 有两种形式写程序好写，用客户端的内存空间换取运行效率 根节点下标是0
   */
  this.treeArray = [];
  this.treeArray[0] = this.root;

  // 写程序时可能有用
  this.current = 0;

  // 写程序时可能有用
  this.tempString = '';

  // 树的特定名称，意义重要，形如treediv1，treediv2等
  this.objectname = objectname;
  /**
   * 得到包含自己的DivTree对象
   */
  this.divtree;
};

/**
 * 给树添加一级节点，实际起一个中转作用，象接力棒传给根节点
 * 
 * @param {$.hr.Node}
 *          node 待添加的一级节点
 */
$.hr.TreeDataObject.prototype.add = function(node) {
  this.root.add(node);
};

// ==== 基类 通用属性定义 ======
$.hr.BaseTree = function(name) {

  // 树类对象的定义（数据结构）
  this.tree;
  // 树的DOM对象 (div)
  this.div;

  // 树是否使用AJAX异步加载
  this.ajaxmode = false;
  // ajax访问模式默认异步
  this.ajaxAsync = true;
  // 自定义AJAX数据读取器
  this.customerAjaxReader = null;
  // 自定义AJAX数据加载前处理
  this.ajaxAddAfter = function() {
  };
  // 自定义AJAX数据加载后处理
  this.ajaxAddBefore = function() {
  };
  // 点击节点返回的函数
  this.customerReturnFun = window["ReturnSearchResult"];
  // 树的节点序号
  this.treeNodeSeq = 0;
};
/*
 * 用类变量来确保对象的唯一性 名称，不过是保存在tree属性对象中
 */
$.hr.BaseTree.count = 0;

// ==== 基类 通用方法定义 ======
$.hr.BaseTree.prototype = {
  /**
   * 给树动态添加一级节点，页面上立刻显示
   * 
   * @param {$.hr.Node}
   *          node 动态添加的一级节点
   */
  addDynamic : function(node) {
    this.tree.root.addDynamic(node);
  },
  /**
   * 给树添加一级节点
   * 
   * @param node
   *          待添加的一级节点
   */
  add : function(node) {
    this.tree.add(node);
  },
  /**
   * 隐藏树干
   */
  hideTreeBody : function() {
    this.div.lastChild.style.display = 'none';
    this.div.firstChild.firstChild.className = this.getSpanCss(ODPViewTreeConst.rootIcon);
    this.tree.root.displaychild = false;
  },
  /**
   * 显示树干
   */
  showTreeBody : function() {
    this.div.lastChild.style.display = '';
    this.div.firstChild.firstChild.className = this.getSpanCss(ODPViewTreeConst.openRootIcon);
    this.tree.root.displaychild = true;
  },
  /**
   * 根据名称寻找一个节点，如果有同名的节点，就随便找一个
   * 
   * @param {String}
   *          name 待寻找节点的名称
   * @return 想找的节点
   * @type $.hr.Node
   */
  findOneNodeByName : function(name) {
    var arr = this.tree.treeArray;
    for ( var i = 0; i < arr.length; i++) {
      if (arr[i].name == name)
        return arr[i];

    }
    return null;
  },

  /**
   * 根据id寻找一个节点，用户必须给每个节点设id属性，并保证它的唯一性
   * 
   * @param {String ||
   *          int} id 待寻找节点的id
   * @return 想找的节点
   */
  findOneNodeById : function(id) {
    var arr = this.tree.treeArray;
    for ( var i = 0; i < arr.length; i++) {
      if (arr[i].id && arr[i].id == id) {
        return arr[i];
      }
    }
    return null;
  },

  /**
   * 取得根节点的文件夹Img对象(JQuery)
   */
  getRootFoldImgObj : function(isCheck) {
    var divtree = this;
    var $node = $("<span/>").addClass(this.getSpanCss(ODPViewTreeConst.openRootIcon));
    
    $node[0].onclick = function() {
      var divbody = this.parentNode.parentNode.lastChild;
      if (divbody.style.display == '') {
        divbody.style.display = 'none';
        if (isCheck) // 多选树 设置标志
          divtree.tree.root.displaychild = false;
          this.className = divtree.getSpanCss(ODPViewTreeConst.rootIcon);
      } else {
        if (isCheck)
          divtree.tree.root.displaychild = true;
        divbody.style.display = '';
        this.className = divtree.getSpanCss(ODPViewTreeConst.openRootIcon);
      }
    };

    return $node;
  },

  // 取得树的标志名称
  getName : function() {
    var s = ODPViewTreeConst.treeObjectName;
    s += ($.hr.BaseTree.count++);
    return s;
  },
  
  /**
   * 获取树根节点所在的span样式 (基本样式+背景图样式)
   * @param backgroundIco 背景图样式
   * @returns {String}
   */
  getSpanCss : function(backgroundIco) {
    return ODPViewTreeConst.nodeSpan + " " + backgroundIco;
  },

  // 树节点的序号数值 ++
  addNodeXuHao : function() {
    this.treeNodeSeq++;
  },

  // 获取当前树最大序号值
  getMaxNodeXuHao : function() {
    return this.treeNodeSeq;
  },

  getTreeHeadDivID : function() {
    return (this.tree.objectname + ODPViewTreeConst.treeHeadIDPostfix);
  },

  /**
   * 设置AJAX模式下TREE调用添加节点方法之后的事件
   */
  setAjaxAddAfter : function(fun) {
    this.ajaxAddAfter = fun;
  },

  /**
   * * 设置AJAX模式下TREE调用添加节点方法之前的事件
   * 
   * @type $.hr.DivTree
   */
  setAjaxAddBefore : function(fun) {
    this.ajaxAddBefore = fun;
  },

  /**
   * 设置是否已AJAX方式展现树
   */
  setAjaxMode : function(bol) {
    this.ajaxmode = bol;
  },

  /*********************************************************************************************************************
   * 设置默认AJAX数据加载器的加载方式 ，同步或异步
   ********************************************************************************************************************/
  setdefaultAjaxReaderAsync : function(bol) {
    this.ajaxAsync = bol;
  },

  /**
   * 自定义AJAX方式数据读取器
   */
  setCustomerAjaxReader : function(fun) {
    this.customerAjaxReader = fun;
  },

  /**
   * 通过XML方式创建右键菜单
   * 
   * @param currentNode
   *          在mousedown事件时选中的NODE
   */
  setOnMouseDownFun : function(fun) {
    this.onmouseDownFun = fun;
  },

  /** 
   * 默认AJAX方式数据读取器  TODO ... 默认的异步加载机制实现 待定
   * 
   */
  defaultAjaxReader : function(src, targNode) {

  },

  setCustomerReturnFun : function(fn) {
    this.customerReturnFun = fn;
  }
};
/**
 * 单选div树类定义
 */
$.hr.NormalTree = function(name) {
  // 调用父类的构造方法
  $.hr.NormalTree.superClass.constructor.call(this, name);

  var objectname = this.getName(); // 树的标志名
  // 生成树类对象
  this.tree = new $.hr.TreeDataObject(name, objectname, this.createViritualNode(name));
  // div树
  this.tree.divtree = this;

  var treeDivObj = this.creatediv();
  // 树的div dom对象
  this.div = treeDivObj[0];
  // 根节点a对象
  this.rootLinkId = treeDivObj[1];

  // 表示已选中的某个节点
  this.selected = null;
  // 上一次选中用于该表状态
  this.lastselected = null;

  // 右键菜单项
  this.showContextMenu = false;
  this.menuXml = null; // 右键菜单按钮的配置信息
};

// 继承基类
$.hr.extendClass($.hr.NormalTree, $.hr.BaseTree);

// 用于计数 静态变量
$.hr.NormalTree.count = 0;

$.extend($.hr.NormalTree.prototype, {

  /**
   * 树的初始化
   * 
   * @param funClickNode
   *          点击节点的方法函数。
   */
  init : function(funClickNode) {
    // 根节点链接的对象
    var rootLinkObj = ODPViewUtil.E_Obj(this.tree.divtree.rootLinkId);
    // 增加选中后清空原有选中的功能
    // 去掉背景颜色标记
    var current = this.tree.divtree;
    rootLinkObj.onclick = function() {
      if (current.lastselected != null) {
        current.lastselected.className = 'treelink';
      }
      // 加背景颜色标记
      $(this).addClass("selectedRow");
      current.selected = null;
      current.lastselected = rootLinkObj;
    };
    var div = this.div.lastChild;
    // 把所有的一级节点列出来
    // 首先得到所有的一级节点
    var root = this.tree.root;
    var arr = root.child;
    for ( var i = 0; i < arr.length; i++)
      div.appendChild(arr[i].innerhtml());
    // 设置点击事件所触发的方法。
    this.clickNode = funClickNode ? funClickNode : this.defaultClickNode;
  },

  /**
   * 创建树对象的div属性内容。
   * 
   * @returns {Array}
   */
  creatediv : function() {
    var divtree = this;
    var $div = $("<DIV/>").addClass(ODPViewTreeConst.treeStyle);
    var $divHead = $("<DIV/>").attr("id", this.getTreeHeadDivID());
    // 获得根节点的文件夹img对象
    var $rootNode = this.getRootFoldImgObj();
    $divHead.append($rootNode);

    var $linkObj = $("<A/>").attr("id", this.getName()).addClass(ODPViewTreeConst.treelink);
    $linkObj[0].onfocus = function() {
      this.blur();
    };
    $linkObj.append(document.createTextNode(this.tree.treename));
    $divHead.append($linkObj);
    $div.append($divHead);

    $div.append($("<DIV/>").css("display", ""));
    return [ $div[0], $linkObj.attr("id") ];
  },

  /**
   * 展开某个节点
   * 
   * @param {$.hr.Node}
   *          node 待展开的节点
   * @param timenum
   *          可选参数，颜色渐变的时间，越大颜色保留越长，默认300
   */
  expandNode : function(node, timenum) {
    if (!node || !this.getSelected())
      return;
    // 对于当选来说获取当前已选中的节点或者传入的节点
    var nod = node || this.getSelected();
    nod.expandChilds();
    var n = nod.getHtmlElementFoldImg();
    if (n)
      n.focus();

  },

  /**
   * 创建虚拟节点
   */
  createViritualNode : function(description) {
    var rootnode = new $.hr.NormalNode();
    rootnode.id = "-1";
    rootnode.name = description;
    return rootnode;
  },

  // 取得树的标志名
  getName : function() {
    var s = "xytreenormalid";
    s += ($.hr.NormalTree.count++);
    return s;
  },

  /**
   * 得到已经选中的节点
   */
  getSelected : function() {
    if (this.selected) {
      return this.selected;
    } else {
      return null;
    }
  },

  /**
   * 缺省的单击节点的行为，相当于单击文件夹
   * 
   * @param {$.hr.Node}
   *          node 被单击的节点
   */
  defaultClickNode : function(node) {
    this.selected = node;
  },

  /**
   * 缺省的双击击节点的行为，相当于单击文件夹
   * 
   * @param {$.hr.Node}
   *          node 被单击的节点
   */
  defaultDBClickNode : function(node) {
    node.getHtmlElementFoldImg().onclick();
  }

});
/**
 * 复选框树的构造方法
 * 
 * @class 这个类构造一个复选框树的实例
 * @constructor
 * @param {String}
 *          name 根节点名称
 * @param {String}
 *          img 可选，可以指定根节点图标
 */
$.hr.CheckTree = function(name) {
  // 调用父类的构造方法
  $.hr.CheckTree.superClass.constructor.call(this, name);
  var objectname = this.getName(); // 树的标志名
  // 创建树对象实例
  this.tree = new $.hr.TreeDataObject(name, objectname, this.createViritualNode(name));
  // div树
  this.tree.divtree = this;

  this.div = this.creatediv();
  // 向上选择默认开启
  this.upChoose = true;
  // 向下选择默认开启
  this.downChoose = true;
  // 自定义菜单接口
  this.onmouseDownFun = null;
  // checkbox可选但是值不带入最后的获取
  this.hasCheck = true;
};

// 继承基类
$.hr.extendClass($.hr.CheckTree, $.hr.BaseTree);
/*
 * 用类变量来确保每一个复选框树对象有个唯一的 名称，不过是保存在tree属性对象中
 */
$.hr.CheckTree.count = 0;
$.extend($.hr.CheckTree.prototype, {
  /**
   * 通常状况下用户会在网页初始化程序中调用
   * 
   * @param {Function}
   *          funClickNode 单击节点的回调函数，可选
   * @param {Function}
   *          funClickRootNode 单击根节点的回调函数，可选
   */
  init : function(funClickNode, funClickRootNode) {
    var div = this.div.lastChild;
    // 把所有的一级节点列出来
    var root = this.tree.root;
    var arr = root.child;
    var oFragment = document.createDocumentFragment();
    for ( var i = 0; i < arr.length; i++) {
      oFragment.appendChild(arr[i].innerhtml());
    }
    div.appendChild(oFragment);

    this.clickNode = funClickNode ? funClickNode : this.defaultClickNode;
    this.clickRootNode = funClickRootNode ? funClickRootNode : this.defaultClickRootNode;
  },
  /**
   * 创建树的DOM对象，包括头和树干
   * 
   * @return DOM对象，是一个div
   * @type HTMLElement:div
   */
  creatediv : function() {
    var divtree = this;
    var $div = $("<DIV/>").addClass(ODPViewTreeConst.treeStyle);
    var $divHead = $("<DIV/>").attr("id", this.getTreeHeadDivID());
    // (1) 绘制文件夹图标
    var $rootNode = this.getRootFoldImgObj(true);
    $divHead.append($rootNode);
    // (2) 绘制复选框的图标，有单击事件，复杂
    var $checkbx = $("<span/>").attr({
      "id" : this.getCheckBoxPartID() + '0'
    }).addClass(this.getSpanCss(ODPViewTreeConst.buzhongIcon)).css({
      "width" : "16px",
      "marginLeft" : ODPViewTreeConst.multi_jianju3
    });
    // 多选树前面的checkbox对象
    var _self = this;
    $checkbx[0].onclick = function() {
      var current = divtree.tree.treeArray[0]; // current是全局节点
      if (current.checked == 1) {
        current.checked = 0;
        this.className = _self.getSpanCss(ODPViewTreeConst.buzhongIcon);
      } else {
        current.checked = 1;
        this.className = _self.getSpanCss(ODPViewTreeConst.quanzhongIcon);
      }
      // 判断是否打开向下选择的参数
      if (current.tree.divtree.downChoose)
        current.downRecursion(current);
      // 如果需要打开向上选择
      if (current.tree.divtree.upChoose)
        current.upRecursion(current);
    };
    $divHead.append($checkbx);

    // (3) 绘制根节点文字链接
    var $link = $("<A/>").addClass(ODPViewTreeConst.treelink);
    $link.append(document.createTextNode(this.tree.treename));
    $link[0].onclick = function() {
      divtree.clickRootNode(divtree.tree.root);
    };
    $link[0].onfocus = function() {
      this.blur();
    };
    $link[0].onmouseover = function() {
      this.style.color = 'blue';
    };
    $link[0].onmouseout = function() {
      this.style.color = 'black';
    };
    $divHead.append($link[0]);
    $div.append($divHead);
    $div.append($("<DIV/>").css("display", ""));
    return $div[0];
  },

  /**
   * 给树清空选中的复选框，不影响形状
   */
  initClearAllCheckBox : function() {
    var root = this.tree.root;
    if (root.checked != 0) {// 说明有选择
      root.getHtmlElementCheckBoxImg().onclick();
    }
  },
  /**
   * 选中树的跟节点
   */
  chooseTreeRoot : function() {
    var root = this.tree.root;
    if (root.checked == 0) {// 进行选中处理
      root.getHtmlElementCheckBoxImg().onclick();
    }
  },
  /**
   * 创建树的虚拟节点 （第一个节点）
   */
  createViritualNode : function(description) {
    var rootnode = new $.hr.CheckNode();
    rootnode.id = "-1";
    rootnode.name = description;
    rootnode.dataObj = "{'nodeId':'-1' ,'nodeName':" + description + "[我是虚拟节点只供参考]}";
    rootnode.displaychild = true;
    rootnode.zhankaiguo = true;
    return rootnode;
  },
  /**
   * 给树的形状初始化，不影响复选框
   */
  initTreeForm : function() {
    var div = this.div.lastChild; // 获得树干
    while (div.hasChildNodes()) { // 先清空DOM
      div.removeChild(div.firstChild);
    }
    var treeArray = this.tree.treeArray;
    for ( var i = 1; i < treeArray.length; i++) {
      var x = treeArray[i];
      // 把节点的两个属性复位，除了根节点
      x.displaychild = x.zhankaiguo = false;
    }
    this.init(this.clickNode, this.clickRootNode); // 重新加载DOM对象
    this.showTreeBody(); // 一定让树干显示
  },
  /**
   * 对复选框树完全复位
   */
  initReset : function() {
    this.initClearAllCheckBox(); // 先清空
    this.initTreeForm(); // 再形状复位
  },

  // 取得树的标志信息
  getName : function() {
    var s = ODPViewTreeConst.treeObjectName;
    s += ($.hr.CheckTree.count++);
    this.xuhao = $.hr.CheckTree.count;
    return s;
  },
  /**
   * 返回是否根节点状态
   * 
   * @return 返回是否根节点被完全选中
   * @type boolean
   */
  isSelectAll : function() {
    return (this.tree.root.checked == 1) ? true : false;
  },
  /**
   * 缺省的单击节点的行为，相当于单击复选框
   * 
   * @param {$.hr.Node}
   *          node 被单击的节点
   */
  defaultClickNode : function(node) {
    node.getHtmlElementCheckBoxImg().onclick();
  },
  /**
   * 缺省的单击根节点的行为，相当于单击根节点复选框
   */
  defaultClickRootNode : function() {
    this.div.firstChild.firstChild.nextSibling.onclick();
  },
  // 全选
  SelectAll : function() {
    if (this.tree.root.checked != 1)
      this.defaultClickRootNode();
    if (this.tree.root.checked != 1)
      this.defaultClickRootNode();
  },
  // 反选
  unSelectAll : function() {
    if (this.tree.root.checked != 0)
      this.defaultClickRootNode();
  },
  /**
   * 得到被选中的节点，不含子节点
   * 
   * @return 得到被选中的节点，不含子节点
   * @type Array:$.hr.Node
   */
  getNodes : function() {
    function getNodesRecursion(arr, node) {
      if (node.checked == 1 && node.level != 0) {
        if (node.hasCheck && node.id != '-1') {
          arr.push(node);
        } else {
          for ( var i = 0; i < node.child.length; i++)
            getNodesRecursion(arr, node.child[i]);
        }
      }
    }
    var resultArr = [];
    getNodesRecursion(resultArr, this.tree.root);
    return resultArr;
  },
  /**
   * 得到被选中的所有节点，
   * 
   * @return 得到被选中的所有节点
   * @type Array:$.hr.Node
   */
  getNodesAll : function() {
    var resultArr = [];
    this.__getAllNodesRecursion(resultArr, this.tree.root);
    return resultArr;
  },
  __getAllNodesRecursion : function(arr, node) {
    if (node.checked == 1) {
      if (node.hasCheck && node.id != '-1') {
        arr.push(node);
      }
      for ( var i = 0; i < node.child.length; i++) {
        this.__getAllNodesSelected(arr, node.child[i]);
      }
    } else {
      for ( var i = 0; i < node.child.length; i++) {
        this.__getAllNodesRecursion(arr, node.child[i]);
      }
    }
  },
  __getAllNodesSelected : function(arr, nodeDef) {
    if (nodeDef.hasCheck && nodeDef.checked == 1 && nodeDef.id != '-1') {
      arr.push(nodeDef);
    }
    for ( var i = 0; i < nodeDef.child.length; i++) {
      this.__getAllNodesSelected(arr, nodeDef.child[i]);
    }
  },
  /**
   * 得到被选中的叶节点数组
   * 
   * @return 得到被选中的叶节点数组
   * @type Array:$.hr.Node
   */
  getLeafNodes : function() {
    var resultArr = [];
    this.__getLeafNodesRecursion(resultArr, this.tree.root);
    return resultArr;
  },
  __getLeafNodesRecursion : function(arr, node) {
    if (node.checked == 1) {
      if (node.child.length == 0 && node.hasCheck) {
        arr.push(node);
      } else {
        for ( var i = 0; i < node.child.length; i++)
          this.__getLeafNodesSelected(arr, node.child[i]);
      }
    } else {
      for ( var i = 0; i < node.child.length; i++)
        this.__getLeafNodesRecursion(arr, node.child[i]);
    }
  },
  __getLeafNodesSelected : function(arr, nodeDef) {
    if (nodeDef.child.length == 0 && nodeDef.hasCheck) {
      arr.push(nodeDef);
    } else {
      for ( var i = 0; i < nodeDef.child.length; i++) {
        this.__getLeafNodesSelected(arr, nodeDef.child[i]);
      }
    }
  },
  /**
   * 得到正在显示的最末级节点
   * 
   * @return 得到正在显示的最末级节点
   * @type Array:$.hr.Node
   */
  getDisplayNodes : function() {
    function getDisplayNodesRecursion(arr, node) {
      if (node.checked == 1 && !node.displaychild) {
        if (node.hasCheck && node.id != '-1')
          arr.push(node);
      } else {
        for ( var i = 0; i < node.child.length; i++)
          getDisplayNodesRecursion(arr, node.child[i]);
      }
    }
    var resultArr = [];
    getDisplayNodesRecursion(resultArr, this.tree.root);
    return resultArr;
  },
  /**
   * 展开某个节点
   * 
   * @param {$.hr.Node}
   *          node 待展开的节点
   */
  expandNode : function(node) {
    if (!node)
      return;
    var arr = node.getNodeLink();
    for ( var i = 0; i < arr.length - 1; i++) {
      if (arr[i].child.length > 0)
        arr[i].expandChilds();
    }
    arr[i].getHtmlElementCheckBoxImg().nextSibling.focus();
  },
  /**
   * 展开某个节点并选中它
   * 
   * @param {$.hr.Node}
   *          node 待展开并选中的节点
   */
  expandCheckedNode : function(node) {
    if (!node)
      return;
    var arr = node.getNodeLink();
    if (arr[arr.length - 1].checked == 1)
      return;
    for ( var i = 0; i < arr.length - 1; i++) {
      if (arr[i].child.length > 0)
        arr[i].expandChilds(); // 把自己展现就是父节点打开
    }
    var fuxuan = arr[i].getHtmlElementCheckBoxImg();
    if (arr[i].checked == 0 || arr[i].checked == 2) {// 未选择和部分选择的情况
      fuxuan.onclick();
    }
    arr[i].getHtmlElementCheckBoxImg().nextSibling.focus();
  },
  /**
   upChoose        : true, //向上选择默认开启
   downChoose      : true  //向下选择默认开启 
   设置是否选中儿子 
   **/
  setSubChecked : function(bol) {
    this.downChoose = bol;
  },
  /**
   upChoose        : true, //向上选择默认开启
   downChoose      : true  //向下选择默认开启 
   设置是否半选选中父 
   **/
  setParentChecked : function(bol) {
    this.upChoose = bol;
  },

  getCheckBoxPartID : function() {
    return (this.tree.objectname + ODPViewTreeConst.treeCheckBoxID);
  }
});
 /**
 * 该类用于封装后台返回回来的节点数据 转化成树对应的code对象
 */

$.hr.TreeCode = function(nodename, nodeId, parentCode) {

  this.text = nodename; // 节点显示名称
  this.value = nodeId; // 节点ID
  this.isRoot = false; // 是否是根节点
  this.hasChild = false; // 是否有孩子结点
  this.children = []; // 子节点对象
  this.parent = parentCode || {}; // 父节点对象
  this.parentId = "";
  this.otherFieldInfo = {}; // 拓展字段 (字段名称：字段值)
  this.subPos = 0; // 子节点的偏移量
  this.url; // 节点对应的url
  // checkbox可选但是值不带入最后的获取
  this.hasCheck = true;

};

$.hr.TreeCode.prototype = {

  addChild : function(treeCode) {
    this.children.push(treeCode);
    this.hasChild = true;
    this.subPos = this.children.length;
    treeCode.parent = this;
  },

  setHasChild : function(flag) {
    this.hasChild = flag;
  },

  isLeaf : function() { // 是否叶子节点
    return (this.children.length == 0 || this.hasChild == false);
  },

  // 添加其他字段信息
  addOtherFieldValue : function(name, value) {
    this.otherFieldInfo[name] = value;
  },

  getParentValue : function() {
    return this.parent.value || this.parentId;
  },

  // 设置父亲对象
  setParent : function(parentDef) {
    this.parent = parentDef;
  },

  // 设置父亲对象Id
  setParentId : function(parentId) {
    this.parentId = parentId;
  },

  // 设置对象的url属性
  setNodeUrl : function(url) {
    this.url = url;
  },
  /**
   * 节点的全量信息 用于异步加载或者点击选中返回
   * 
   * @returns {object} 节点的全量对象信息
   */
  getDataObj : function() {
    var jsonObj = {};
    jsonObj.nodeId = this.value;
    jsonObj.nodeName = this.text;
    jsonObj.nodeParentId = this.getParentValue();
    jsonObj.nodeUrl = this.url;
    for ( var proName in this.otherFieldInfo) {
      jsonObj[proName] = this.otherFieldInfo[proName];
    }
    return jsonObj;
  },

  setHasCheck : function(flag) {
    this.hasCheck = flag;
  }

};
 
 /**
   * 树的管理类 (入口)
   */

  $.hr.TreeMgr = {
    /**
     * 创建树对象
     * @param divId 树所在的div容器ID
     * @param options 树的构建选项
     * @returns
     */
    createTree : function(divId, options) {
      var defaults = {
        ajaxModel : true, // 加载模式
        isMulti : false, // true:为复选树；false：为单选树
        customerAjaxFun : null, // 异步加载函数
        showContextMenu : false, // 是否启用右键快捷菜单(用于节点的新增、删除、修改)
        contextMenuInfo : null, // 右键菜单信息内容 格式为： [{text:"新增",eventName:"myDefineAddFun",className:"buttonAdd"},{text:"修改",eventName:"myDefineModifyFun",className:"buttonModify"},{text:"删除",eventName:"myDefineDelFun",className:"buttonDel"}]
        description : "组织机构树", // 树的名称
        treeCodeObj : null // 封装树节点的对象(TreeCode)
      };
      $.extend(defaults, options);
      var tree = null;
      if (defaults.isMulti != true) { // 构建单选树对象
        defaults.isMulti = false;
        tree = new $.hr.NormalTree(defaults.description);   
      } else { // 构建多选树对象
        tree = new $.hr.CheckTree(defaults.description);
      }
      tree.setAjaxMode(defaults.ajaxModel); // 设置节点的请求模式是否为ajax请求
      tree.setCustomerAjaxReader(defaults.customerAjaxFun); // 设置异步加载函数
      this.setTreeContextMenu(tree, defaults); // 设置右键菜单信息属性
      // 生成所有树的节点信息
      this.createTreeNodes(defaults.treeCodeObj, tree, defaults.isMulti);
      $("#" + divId).append(tree.div);
      tree.init();
      return tree;

    },

    /**
     * 递归构建树上的所有节点对象。
     * @param {object} codeObj 树的数据对象信息 
     * @param {NormalTree|CheckTree} tree 目标树对象
     * @param {boolean} isMulti 树的类型，true:为多选树，false:单选树。
     */
    createTreeNodes : function(codeObj, tree, isMulti) {
      if (!codeObj || !codeObj.text) {
        return;
      }
      // 将数据对象转换成节点对象
      var treeNode = this.convertCodeToNode(codeObj, isMulti);
      tree.add(treeNode);
      if (!codeObj.hasChild) {
        return;
      }
      for ( var j = 0; j < codeObj.children.length; j++) {
        this.createTreeNodes(codeObj.children[j], treeNode, isMulti);
      }
    },

    /**
     * 将数据对象转换成节点对象
     * 
     * @param code
     * @param {boolean} isMulti
     *          true:为多选树节点 false:单选树节点
     */
    convertCodeToNode : function(codeObj, isMulti) {
      var treeNode = null;
      if (isMulti != true) { // 单选树
        treeNode = new $.hr.NormalNode(codeObj.text);
      } else { // 多选树
        treeNode = new $.hr.CheckNode(codeObj.text);
        treeNode.hasCheck = codeObj.hasCheck; // 如果设置为false，则即使选中了也无法返回当前节点的值。
      } 
      treeNode.id = codeObj.value;
      treeNode.hasChild = codeObj.hasChild;
      treeNode.dataObj = codeObj.getDataObj(); // 树节点的全量信息
      return treeNode;
    },
    /**
     * 构建树的右键菜单信息
     * @param theTree 目标树的对象
     * @param options 树的选项信息 
     */
    setTreeContextMenu : function(theTree, options) {
      if (options && options.showContextMenu) {
        var menuArr = options.contextMenuInfo;
        if (menuArr && menuArr.length > 0) {
          var arr = [ "<menu><items id='treeMenuPop' text='菜单维护'>" ];
          for (var index in menuArr) {
            arr.push("<item text='"+menuArr[index].text+"' eventName='"+menuArr[index].eventName+"' className='"+menuArr[index].className+"'/>");
          }
          arr.push("</items></menu>");
          theTree.menuXml = arr.join("");
        }
      }
    }
  };
$.hr.ODPViewUtil = function() {
};

$.hr.ODPViewUtil.prototype = {

    /**
     * 监听并执行外部定义函数(支持this的扩展同时，还要支持用户的入参支持) 以后控件对象、event对象都可以从this中获取
     * 
     * @param scope
     *          作用域
     * @param funstring
     *          方法字符串 如：changeSpcTag(this,'CLTLVL')
     * @returns
     */
    applyFun : function(scope, funstring) {
      if (!funstring) {
        return;
      }
      var fstParaName = this.__getFirstParmName(arguments.callee);
      scope["event"] = this.getEvent();
      if ($.type(funstring) != "string") {
        funstring = funstring + "";
      }
      if (funstring.indexOf("window.reload") >=0 || funstring.indexOf("window.close")  >=0 ){// window自带的函数直接eval处理
        eval(funstring);
        return;
      }
      var index = funstring.indexOf("("); // 第一个左括号的位置
      var curFunName = funstring.substring(0, index); // 获取方法名 changeSpcTag
      var _paramStr = funstring.substring(index); // 取得参数部分 如：(this,'CLTLVL')
      _paramStr = ODPUtil.replaceAll(_paramStr, "\\bthis\\b", fstParaName); // 替换作用域(this关键字是单词的一部分则不替换)
      try {
        // 获取function对象,定义的是函数范围的局部变量 ,不会页面的变量产生冲突。
        eval("var myfun = " + curFunName);
        eval(" var _mArr = this.__myUselessFun" + _paramStr);
        myfun.apply(scope, _mArr); // 执行方法
      } catch (e) {
        var evalStr = ODPUtil.replaceAll(funstring, "\\bthis\\b", fstParaName);
        eval(evalStr); // 执行方法
      }
      ;
    },

    // 过度函数 用于返回参数
    __myUselessFun : function() {
      var arg = [];
      for ( var j = 0; j < arguments.length; j++) {
        arg.push(arguments[j]);
      }
      return arg;
    },
    
     /**
      * 获取函数的第一个形参名称
      * @param callee
      */
     __getFirstParmName : function(callee) {
      var _callee = callee.toString(), comb = _callee.length >= 50 ? 50
          : _callee.length;
      _callee = _callee.substring(0, comb);
      var fstIndex = _callee.indexOf("(");
      var secIndex = _callee.indexOf(",");
      return _callee.substring(fstIndex + 1, secIndex);
    },
  /**
   * 绑定方法事件。
   * 
   * @param {function}
   *          functionObj 绑定的方法函数对象
   * @param {object}
   *          作用域对象
   */
  bindFunction : function(functionObj, object) {
    var newArgumentsT = [];
    for ( var j = 2; j < arguments.length; j++) {
      newArgumentsT.push(arguments[j]);
    }
    return function(event) {
      return functionObj.apply(object, [ event || window.event ].concat(newArgumentsT));
    };
  },

  getEvent : function(event) {
    return event || window.event;
  },

  // 获取触发事件的源头
  getSrcElement : function(event) {
    if (!event)
      return null;
    return obj = event.srcElement ? event.srcElement : event.target;
  },
  // 判断当前浏览器是否是IE
  isIE : function() { // 对IE11的判断加个补丁
    return $.browser.msie || ($.browser.mozilla = true && $.browser.version =="11.0");
  },
 
  parseInt : function(num, defaultNum) {
    var t = parseInt(num);
    if (!defaultNum) {
      defaultNum = 0;
    }
    return isNaN(t) ? defaultNum : t;
  },
  /*
   * xml格式转化成dom对象 各个浏览器能兼容 版本较低的IE没测过 读取xml文件 @para xml:传入符合格式的xml文件
   */
  XMLparse : function(xml) {
    if (typeof DOMParser != 'undefined') {
      return (new DOMParser()).parseFromString(xml, "application/xml");
    } else if (typeof ActiveXObject != 'undefined') {
      var doc = new ActiveXObject("MSXML2.DOMDocument");
      doc.async = "false";
      doc.loadXML(xml);
      return doc;
    } else {
      var url = "data:text/xml;charset=utf-8," + encodeURIComponent(xml);
      var request = new XMLHttpRequest();
      request.open("GET", url, false);
      request.send(null);
      return request.responseXML;
    }
  },
  // 取得xmlDoc对象的Item对象
  getItem : function(docNode, fieldName) {
    return docNode.attributes.getNamedItem(fieldName);
  },

  E_Obj : function(rootName) {
    return document.getElementById(rootName);
  }
};

var ODPViewUtil = new $.hr.ODPViewUtil();
})(jQuery);