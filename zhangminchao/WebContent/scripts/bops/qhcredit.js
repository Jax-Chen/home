$(function(){
	
	$("#bk-btn-ok").on("click",function(){
		var name = $("#nameipt").val();
		var id = $("#idcardipt").val();
		var orderCode = $("#ordeript").val();
		var credit = $("#creditipt").val();
		
		$(".bk-result").hide();
		
		if(credit=="" || name=="" || id=="" || orderCode==""){
			alert("请输入正确的查询信息！");
			return;
		}
		
		$.ajax({
			url:appServer+"/bops/bkcheck/qhcredit.htm",
			type:"POST",
			data:{"name":name, "id":id, "orderCode":orderCode, "credit":credit},
			beforeSend:function(){
				$(".loadframe").show();
			},
			success:function(res){
				$(".loadframe").hide();
				if(res.meta.success){
					var resObj = res.retObj;
					showView(resObj)
				}else{
					alert(res.meta.errorInfo);
				}	
			},
			error:function(xhr){
				$(".loadframe").hide();
				alert("网络错误！");
			}
		});
		
	});
	
	$("#bk-btn-reset").live("click", function() {
		$("#nameipt").val("");
		$("#idcardipt").val("");
		$("#creditipt").val("");
		$("#ordeript").val("");
		$(".bk-result").hide();
	});
	
	$("#zeroShow").on("click",function(){
		if($(this)[0].checked){
			$(".tb-credit-res-hide").show();
		}else{
			$(".tb-credit-res-hide").hide();
		}
	});
});

function Map() {
    this.data = new Array();
    this.put = function (key, value) {
        this.data[key] = value;
    };
    this.get = function (key) {
        return this.data[key];
    };
    this.remove = function (key) {
        this.data[key] = null;
    };
    this.isEmpty = function () {
        return this.data.length == 0;
    };
    this.size = function () {
        return this.data.length;
    };
    
}



function showView(obj){
	$(".tb-credit-res").remove();
	$(".tb-credit-res-hide").remove();
	var html = "";
	
	for(i in map.data){
		if(obj[i]!="0" && obj[i]!="0.0" && obj[i]!="non"){
			html +="<tr class='tb-credit-res'>" +
					"<td>"+map.get(i)+"</td>"+
					"<td>"+obj[i]+"</td>"+
				"</tr>";
		}else{
			html +="<tr class='tb-credit-res-hide'>" +
						"<td>"+map.get(i)+"</td>"+
						"<td>"+obj[i]+"</td>"+
					"</tr>";
		}
		
	}
	
	$(".bk-driverinfo").append(html);
	$(".bk-result").show();
	
}
var map = createMap();
function createMap(){
	var map = new Map();
	map.put("seqNo","序列号");
	map.put("qhAccountNo","卡号");
	map.put("qhCardClassNm","卡等级");
	map.put("qhCardAttr","卡性质");
	map.put("qhCardBrand","卡品牌");
	map.put("qhCardProductNm","卡产品");
	map.put("qhCardNameNm","卡名称");
	map.put("qhIssBankNm","发卡行");
	map.put("qhFlagCardHighEnd","是否银联高端客户");
	map.put("qhDcFlag","借贷标记");
	map.put("qhAmt1MonMcc0HSport","近1个月高档运动交易金额");
	map.put("qhCnt1MonMcc0HSport","近1个月高档运动交易笔数");
	map.put("qhCnt1MonMcc7995","近1个月博彩交易笔数");
	map.put("qhAmt1MonMcc7995","近1个月博彩交易金额");
	map.put("qhCnt1MonMcc0Tou","近1个月差旅交易笔数");
	map.put("qhAmt1MonMcc0Tou","近1个月差旅交易金额");
	map.put("qhCnt1MonMcc9222","近1个月罚款笔数");
	map.put("qhAmt1MonMcc9222","近1个月罚款金额");
	map.put("qhCnt1MonMcc8111","近1个月法律服务交易笔数");
	map.put("qhAmt1MonMcc8111","近1个月法律服务交易金额");
	map.put("qhCnt1MonMcc38Utl","近1个月公共事业服务缴费笔数");
	map.put("qhAmt1MonMcc38Utl","近1个月公共事业服务缴费金额");
	map.put("qhCnt1MonMcc38Arl","近1个月航空交易笔数");
	map.put("qhAmt1MonMcc38Arl","近1个月航空交易金额");
	map.put("qhCnt1MonMcc5977","近1个月化妆品交易笔数");
	map.put("qhAmt1MonMcc5977","近1个月化妆品交易金额");
	map.put("qhAmt1MonMcc7011","近1个月酒店交易金额");
	map.put("qhCnt1MonMcc9311","近1个月纳税笔数");
	map.put("qhAmt1MonMcc9311","近1个月纳税金额");
	map.put("qhAmt1MonMcc30Dps","近1个月日用品交易金额");
	map.put("qhCnt1MonMcc0B","近1个月商业类交易笔数");
	map.put("qhAmt1MonMcc0B","近1个月商业类交易金额");
	map.put("qhAmt1MonMcc38Lua","近1个月奢侈品交易金额");
	map.put("qhCnt1MonMcc38Rwt","近1个月铁路交易笔数");
	map.put("qhAmt1MonMcc38Rwt","近1个月铁路交易金额");
	map.put("qhCnt1MonMcc9498","近1个月信用卡还款笔数");
	map.put("qhAmt1MonMcc9498","近1个月信用卡还款金额");
	map.put("qhCnt1MonMcc38Gst","近1个月加油站交易金额");
	map.put("qhAmt1MonMcc38Gst","近1个月加油站交易笔数");
	map.put("qhCnt1MonMcc38Rce","近1个月休闲娱乐类交易笔数");
	map.put("qhAmt1MonMcc38Rce","近1个月休闲娱乐类交易金额");
	map.put("qhCnt1MonMcc38Mer","近1个月医药和医疗器材专门零售类交易笔数");
	map.put("qhAmt1MonMcc38Mer","近1个月医药和医疗器材专门零售类交易金额");
	map.put("qhCnt1MonMcc38Htl","近1个月住宿服务交易笔数");
	map.put("qhAmt1MonMcc38Htl","近1个月住宿服务交易金额");
	map.put("qhCnt1MonMcc0Spa","近1个月按摩、保健、美容SPA交易笔数");
	map.put("qhAmt1MonMcc0Spa","近1个月按摩、保健、美容SPA交易金额");
	map.put("qhAmt1MonMcc5311","近1个月百货交易金额");
	map.put("qhCnt1MonMcc0Insur","近1个月保险支出笔数");
	map.put("qhAmt1MonMcc0Insur","近1个月保险支出金额");
	map.put("qhCnt1MonMcc38Frt","近1个月餐饮类交易笔数");
	map.put("qhAmt1MonMcc38Frt","近1个月餐饮类交易金额");
	map.put("qhCnt1MonMcc5Frt","近1个月餐娱类交易笔数");
	map.put("qhAmt1MonMcc5Frt","近1个月餐娱类交易金额");
	map.put("qhAmt1MonMcc38Smw","近1个月仓储超市交易金额");
	map.put("qhCnt1MonMcc5933","近1个月典当、拍卖、信托交易笔数");
	map.put("qhAmt1MonMcc5933","近1个月典当、拍卖、信托交易金额");
	map.put("qhCnt1MonMcc0Z","近1个月发生大额消费与非消费性支出类交易笔数");
	map.put("qhAmt1MonMcc0Z","近1个月发生大额消费与非消费性支出类交易金额");
	map.put("qhN1MonMchntTp","近1个月发生交易的MCC种类数");
	map.put("qhCnt1MonMcc0Y","近1个月非必须个人消费类交易笔数");
	map.put("qhAmt1MonMcc0Y","近1个月非必须个人消费类交易金额");
	map.put("qhCnt1MonMcc5Sog","近1个月公益类交易笔数");
	map.put("qhAmt1MonMcc5Sog","近1个月公益类交易金额");
	map.put("qhCnt1MonMcc5Liv","近1个月民生类交易笔数");
	map.put("qhAmt1MonMcc5Liv","近1个月民生类交易金额");
	map.put("qhAmt1MonMcc5Oth","近1个月其他类交易金额");
	map.put("qhCnt1MonMcc5Gen","近1个月一般类交易笔数");
	map.put("qhAmt1MonMcc5Gen","近1个月一般类交易金额");
	map.put("qhCnt1MonMcc7911","近1个月KTV交易笔数");
	map.put("qhAmt1MonMcc7911","近1个月KTV交易金额");
	map.put("qhCnt1MonMcc0Vcl","近1个月车辆交易笔数");
	map.put("qhAmt1MonMcc0Vcl","近1个月车辆交易金额");
	map.put("qhCnt1MonMcc0Art","近1个月古玩、艺术品交易笔数");
	map.put("qhAmt1MonMcc0Art","近1个月古玩、艺术品交易金额");
	map.put("qhAmt1MonMcc0Living","近1个月家庭交易金额");
	map.put("qhCnt1MonMcc5331","近1个月小型超市交易笔数");
	map.put("qhCnt1MonMcc5813","近1个月饮酒场所交易笔数");
	map.put("qhAmt1MonMcc5813","近1个月饮酒场所交易金额");
	map.put("qhCnt1MonMcc6211","近1个月证券交易笔数");
	map.put("qhAmt1MonMcc6211","近1个月证券交易金额");
	map.put("qhCnt1MonMcc5094","近1个月珠宝类交易笔数");
	map.put("qhAmt1MonMcc5094","近1个月珠宝类交易金额");
	map.put("qhCnt1MonPayment","近1个月分期付款笔数");
	map.put("qhAmt1MonPayment","近1个月分期付款金额");
	map.put("qhDt1MonLast","最近一笔交易日期");
	map.put("qhCnt1MonMchntMax","近1个月最大商户交易金额");
	map.put("qhAmt1MonMchntMax","近1个月最大商户交易笔数");
	map.put("qhFlag1MonOverseas","近1个月有无境外交易");
	map.put("qhCnt1MonOverseas","近1个月境外交易笔数");
	map.put("qhAmt1MonOverseas","近1个月境外交易金额");
	map.put("qhPct1MonAmtOverseas","近1个月境外交易金额占比");
	map.put("qhCnt1MonPreAuthorization","近1个月预授权扣款笔数");
	map.put("qhAmt1MonPreAuthorization","近1个月预授权扣款金额");
	map.put("qhCnt1MonS331000050000","近1个月大额转入交易金额");
	map.put("qhAmt1MonS331000050000","近1个月大额转入交易笔数");
	map.put("qhDt1MonLatestS13","近1个月最近一笔分期付款日期");
	map.put("qhPct1MonMaxWithdrawS33","近1个月单日大额转入后取现金额占比最大值");
	map.put("qhPct1MonMaxConsumeS33","近1个月单日大额转入后消费金额占比最大值");
	map.put("qhCnt1MonOnline","近1个月网购交易笔数");
	map.put("qhPct1MonOnlineCnt","近1个月网购交易笔数占比");
	map.put("qhAmt1MonOnline","近1个月网购交易金额");
	map.put("qhPct1MonOnlineAmt","近1个月网购交易金额占比");
	map.put("qhAmt1MonBank","近1个月银行类交易笔数");
	map.put("qhCnt1MonBank","近1个月银行类交易金额");
	map.put("qhAmt1MonMaxTrans","近1个月单笔最大交易金额");
	map.put("qhId1MonMaxTrans","近1个月单笔最大交易金额对应交易类型");
	map.put("qhCity1MonLatest","最近一笔交易城市");
	map.put("qhN1MonCurrCd","近1个月外币交易币种数");
	map.put("qhFlag1MonForeigncurr","近1个月是否有外币交易");
	map.put("qhRank11MonMcc","近1个月交易金额排名第一的MCC");
	map.put("qhAmt11MonMcc","近1个月交易金额排名第一的MCC的交易金额");
	map.put("qhRank1MonMostCurrCd","近1个月最常用外币交易币种");
	map.put("qhAmt1MonMcc38Hec","近1个月卫生类交易金额");
	map.put("qhCnt1MonMcc38Hec","近1个月卫生类交易笔数");
	map.put("qhCnt1Mon6513","近1个月物业管理费缴费笔数");
	map.put("qhAmt1Mon6513","近1个月物业管理费缴费金额");
	map.put("qhAmt1MonMaxHouse","近1个月最大购房类交易金额");
	map.put("qhCnt1MonCarBuy","近1个月买车类交易笔数");
	map.put("qhAmt1MonCarRelative","近1个月汽车相关类交易金额");
	map.put("qhAmt1MonOilCredit","近1个月信用卡加油金额");
	map.put("qhCnt1MonOilCredit","近1个月信用卡加油笔数");
	map.put("qhAmt1MonCarMaintain","近1个月汽车保养金额");
	map.put("qhCnt1MonCarMaintain","近1个月汽车保养次数");
	map.put("qhAmt1MonLend","近1个月借贷交易的交易金额");
	map.put("qhCnt1MonLend","近1个月借贷交易的交易笔数");
	map.put("qhAmt1MonHighRiskMchnt","近1个月高危商户交易金额");
	map.put("qhCnt1MonHighRiskMchnt","近1个月高危商户交易笔数");
	map.put("qhAmt1Mon1520","近1个月住宅与商业楼类交易金额");
	map.put("qhCnt1Mon1520","近1个月住宅与商业楼类交易笔数");
	map.put("qhAmt1Mon7013","近1个月房地产经纪类交易金额");
	map.put("qhCnt1Mon7013","近1个月房地产经纪类交易笔数");
	map.put("qhAmt6MonMcc0HSport","近6个月高档运动交易金额");
	map.put("qhCnt6MonMcc0HSport","近6个月高档运动交易笔数");
	map.put("qhCnt6MonMcc7995","近6个月博彩交易笔数");
	map.put("qhAmt6MonMcc7995","近6个月博彩交易金额");
	map.put("qhCnt6MonMcc0Tou","近6个月差旅交易笔数");
	map.put("qhAmt6MonMcc0Tou","近6个月差旅交易金额");
	map.put("qhCnt6MonMcc9222","近6个月罚款笔数");
	map.put("qhAmt6MonMcc9222","近6个月罚款金额");
	map.put("qhCnt6MonMcc8111","近6个月法律服务交易笔数");
	map.put("qhAmt6MonMcc8111","近6个月法律服务交易金额");
	map.put("qhCnt6MonMcc38Utl","近6个月公共事业服务缴费笔数");
	map.put("qhAmt6MonMcc38Utl","近6个月公共事业服务缴费金额");
	map.put("qhCnt6MonMcc38Arl","近6个月航空交易笔数");
	map.put("qhAmt6MonMcc38Arl","近6个月航空交易金额");
	map.put("qhCnt6MonMcc5977","近6个月化妆品交易笔数");
	map.put("qhAmt6MonMcc5977","近6个月化妆品交易金额");
	map.put("qhAmt6MonMcc7011","近6个月酒店交易金额");
	map.put("qhCnt6MonMcc9311","近6个月纳税笔数");
	map.put("qhAmt6MonMcc9311","近6个月纳税金额");
	map.put("qhAmt6MonMcc30Dps","近6个月日用品交易金额");
	map.put("qhCnt6MonMcc0B","近6个月商业类交易笔数");
	map.put("qhAmt6MonMcc0B","近6个月商业类交易金额");
	map.put("qhAmt6MonMcc38Lua","近6个月奢侈品交易金额");
	map.put("qhCnt6MonMcc38Rwt","近6个月铁路交易笔数");
	map.put("qhAmt6MonMcc38Rwt","近6个月铁路交易金额");
	map.put("qhAmt6MonMcc9498","近6个月信用卡还款金额");
	map.put("qhCnt6MonMcc38Gst","近6个月加油站交易金额");
	map.put("qhAmt6MonMcc38Gst","近6个月加油站交易笔数");
	map.put("qhCnt6MonMcc38Rce","近6个月休闲娱乐类交易笔数");
	map.put("qhAmt6MonMcc38Rce","近6个月休闲娱乐类交易金额");
	map.put("qhCnt6MonMcc38Mer","近6个月医药和医疗器材专门零售类交易笔数");
	map.put("qhAmt6MonMcc38Mer","近6个月医药和医疗器材专门零售类交易金额");
	map.put("qhCnt6MonMcc38Hec","近6个月卫生类交易笔数");
	map.put("qhAmt6MonMcc38Hec","近6个月卫生类交易金额");
	map.put("qhCnt6MonMcc38Htl","近6个月住宿服务交易笔数");
	map.put("qhAmt6MonMcc38Htl","近6个月住宿服务交易金额");
	map.put("qhCnt6MonMcc0Spa","近6个月按摩、保健、美容SPA交易笔数");
	map.put("qhAmt6MonMcc0Spa","近6个月按摩、保健、美容SPA交易金额");
	map.put("qhAmt6MonMcc5311","近6个月百货交易金额");
	map.put("qhCnt6MonMcc0Insur","近6个月保险支出笔数");
	map.put("qhAmt6MonMcc0Insur","近6个月保险支出金额");
	map.put("qhCnt6MonMcc38Frt","近6个月餐饮类交易笔数");
	map.put("qhAmt6MonMcc38Frt","近6个月餐饮类交易金额");
	map.put("qhCnt6MonMcc5Frt","近6个月餐娱类交易笔数");
	map.put("qhAmt6MonMcc5Frt","近6个月餐娱类交易金额");
	map.put("qhAmt6MonMcc38Smw","近6个月仓储超市交易金额");
	map.put("qhCnt6MonMcc5933","近6个月典当、拍卖、信托交易笔数");
	map.put("qhAmt6MonMcc5933","近6个月典当、拍卖、信托交易金额");
	map.put("qhCnt6MonMcc0Z","近6个月发生大额消费与非消费性支出类交易笔数");
	map.put("qhAmt6MonMcc0Z","近6个月发生大额消费与非消费性支出类交易金额");
	map.put("qhCnt6MonMcc0Y","近6个月非必须个人消费类交易笔数");
	map.put("qhAmt6MonMcc0Y","近6个月非必须个人消费类交易金额");
	map.put("qhCnt6MonMcc5Sog","近6个月公益类交易笔数");
	map.put("qhAmt6MonMcc5Sog","近6个月公益类交易金额");
	map.put("qhCnt6MonMcc5Liv","近6个月民生类交易笔数");
	map.put("qhAmt6MonMcc5Liv","近6个月民生类交易金额");
	map.put("qhCnt6MonMcc5Gen","近6个月一般类交易笔数");
	map.put("qhAmt6MonMcc5Gen","近6个月一般类交易金额");
	map.put("qhCnt6MonMcc7911","近6个月KTV交易笔数");
	map.put("qhAmt6MonMcc7911","近6个月KTV交易金额");
	map.put("qhCnt6MonMcc0Vcl","近6个月车辆交易笔数");
	map.put("qhAmt6MonMcc0Vcl","近6个月车辆交易金额");
	map.put("qhCnt6MonMcc0Art","近6个月古玩、艺术品交易笔数");
	map.put("qhAmt6MonMcc0Art","近6个月古玩、艺术品交易金额");
	map.put("qhAmt6MonMcc0Living","近6个月家庭交易金额");
	map.put("qhCnt6MonMcc5331","近6个月小型超市交易笔数");
	map.put("qhCnt6MonMcc5813","近6个月饮酒场所交易笔数");
	map.put("qhAmt6MonMcc5813","近6个月饮酒场所交易金额");
	map.put("qhCnt6MonMcc6211","近6个月证券交易笔数");
	map.put("qhAmt6MonMcc6211","近6个月证券交易金额");
	map.put("qhCnt6MonMcc5094","近6个月珠宝类交易笔数");
	map.put("qhAmt6MonMcc5094","近6个月珠宝类交易金额");
	map.put("qhAmt6MonAtm","近6个月ATM交易金额");
	map.put("qhAmt6MonPos","近6个月发生POS交易金额");
	map.put("qhFlag6MonOverseas","近6个月有无境外交易");
	map.put("qhCnt6MonOverseas","近6个月境外交易笔数");
	map.put("qhAmt6MonOverseas","近6个月境外交易金额");
	map.put("qhAmt6MonThirdParty","近6个月三方支付交易金额");
	map.put("qhCnt6MonPreAuthorization","近6个月预授权扣款笔数");
	map.put("qhAmt6MonPreAuthorization","近6个月预授权扣款金额");
	map.put("qhAmt6MonS331000050000","近6个月大额转入交易笔数");
	map.put("qhDt6MonLatestS13","近6个月最近一笔分期付款日期");
	map.put("qhCnt6MonOnline","近6个月网购交易笔数");
	map.put("qhPct6MonOnlineCnt","近6个月网购交易笔数占比");
	map.put("qhAmt6MonOnline","近6个月网购交易金额");
	map.put("qhPct6MonOnlineAmt","近6个月网购交易金额占比");
	map.put("qhFlag6MonForeigncurr","近6个月是否有外币交易");
	map.put("qhAmtMax6MonDayEnchashment","近6个月最大单日累计取现交易笔数");
	map.put("qhCntMax6MonDayEnchashment","近6个月最大单日累计取现交易金额");
	map.put("qhAmtMax6MonDayConsume","近6个月最大单日累计消费金额");
	map.put("qhCntMax6MonDayConsume","近6个月最大单日累计消费笔数");
	map.put("qhAmt6MonMaxConsume","近6个月单笔最大消费金额");
	map.put("qhId6MonMaxTrans","近6个月单笔最大交易金额对应交易类型");
	map.put("qhAmt6MonMaxTrans","近6个月单笔最大交易金额");
	map.put("qhCnt6MonLend","近6个月借贷交易的交易笔数");
	map.put("qhAmt6MonLend","近6个月借贷交易的交易金额");
	map.put("qhN6MonTransCity","近6个月交易城市数");
	map.put("qhRank16MonMainCity","常用城市");
	map.put("qhAmt16MonMainCity","常用城市总金额");
	map.put("qhRank26MonMainCity","第二常用城市");
	map.put("qhAmt26MonMainCity","第二常用城市总金额");
	map.put("qhRank16MonAmtCity","近6个月交易金额排名第一的城市");
	map.put("qhN6MonCurrCd","近6个月外币交易币种数");
	map.put("qhRank6MonMostCurrCd","近6个月最常用外币交易币种");
	map.put("qhRank16MonMcc","近6个月交易金额排名第一的MCC");
	map.put("qhAmt16MonMcc","近6个月交易金额排名第一的MCC的交易笔数");
	map.put("qhCnt12MonMcc7995","近12个月博彩交易笔数");
	map.put("qhAmt12MonMcc7995","近12个月博彩交易金额");
	map.put("qhCnt12MonMcc0Tou","近12个月差旅交易笔数");
	map.put("qhAmt12MonMcc0Tou","近12个月差旅交易金额");
	map.put("qhCnt12MonMcc9222","近12个月罚款笔数");
	map.put("qhAmt12MonMcc9222","近12个月罚款金额");
	map.put("qhCnt12MonMcc8111","近12个月法律服务交易笔数");
	map.put("qhAmt12MonMcc8111","近12个月法律服务交易金额");
	map.put("qhCnt12MonMcc38Utl","近12个月公共事业服务缴费笔数");
	map.put("qhAmt12MonMcc38Utl","近12个月公共事业服务缴费金额");
	map.put("qhCnt12MonMcc38Arl","近12个月航空交易笔数");
	map.put("qhAmt12MonMcc38Arl","近12个月航空交易金额");
	map.put("qhCnt12MonMcc5977","近12个月化妆品交易笔数");
	map.put("qhAmt12MonMcc5977","近12个月化妆品交易金额");
	map.put("qhAmt12MonMcc7011","近12个月酒店交易金额");
	map.put("qhCnt12MonMcc9311","近12个月纳税笔数");
	map.put("qhAmt12MonMcc9311","近12个月纳税金额");
	map.put("qhAmt12MonMcc30Dps","近12个月日用品交易金额");
	map.put("qhAmt12MonMcc38Lua","近12个月奢侈品交易金额");
	map.put("qhCnt12MonMcc38Rwt","近12个月铁路交易笔数");
	map.put("qhAmt12MonMcc38Rwt","近12个月铁路交易金额");
	map.put("qhCnt12MonMcc9498","近12个月信用卡还款笔数");
	map.put("qhAmt12MonMcc9498","近12个月信用卡还款金额");
	map.put("qhCnt12MonMcc38Rce","近12个月休闲娱乐类交易笔数");
	map.put("qhAmt12MonMcc38Rce","近12个月休闲娱乐类交易金额");
	map.put("qhCnt12MonMcc38Mer","近12个月医药和医疗器材专门零售类交易笔数");
	map.put("qhAmt12MonMcc38Mer","近12个月医药和医疗器材专门零售类交易金额");
	map.put("qhCnt12MonMcc38Hec","近12个月卫生类交易笔数");
	map.put("qhAmt12MonMcc38Hec","近12个月卫生类交易金额");
	map.put("qhCnt12MonMcc38Htl","近12个月住宿服务交易笔数");
	map.put("qhAmt12MonMcc38Htl","近12个月住宿服务交易金额");
	map.put("qhCnt12MonMcc0Spa","近12个月按摩、保健、美容SPA交易笔数");
	map.put("qhAmt12MonMcc0Spa","近12个月按摩、保健、美容SPA交易金额");
	map.put("qhAmt12MonMcc5311","近12个月百货交易金额");
	map.put("qhCnt12MonMcc0Insur","近12个月保险支出笔数");
	map.put("qhAmt12MonMcc0Insur","近12个月保险支出金额");
	map.put("qhCnt12MonMcc38Frt","近12个月餐饮类交易笔数");
	map.put("qhAmt12MonMcc38Frt","近12个月餐饮类交易金额");
	map.put("qhAmt12MonMcc5Frt","近12个月餐娱类交易金额");
	map.put("qhAmt12MonMcc38Smw","近12个月仓储超市交易金额");
	map.put("qhCnt12MonMcc5933","近12个月典当、拍卖、信托交易笔数");
	map.put("qhAmt12MonMcc5933","近12个月典当、拍卖、信托交易金额");
	map.put("qhAmt12MonMcc5Sog","近12个月公益类交易金额");
	map.put("qhAmt12MonMcc5Liv","近12个月民生类交易金额");
	map.put("qhAmt12MonMcc5Oth","近12个月其他类交易金额");
	map.put("qhAmt12MonMcc5Gen","近12个月一般类交易金额");
	map.put("qhCnt12MonMcc7911","近12个月KTV交易笔数");
	map.put("qhAmt12MonMcc7911","近12个月KTV交易金额");
	map.put("qhCnt12MonMcc0Art","近12个月古玩、艺术品交易笔数");
	map.put("qhAmt12MonMcc0Art","近12个月古玩、艺术品交易金额");
	map.put("qhAmt12MonMcc0Living","近12个月家庭交易金额");
	map.put("qhCnt12MonMcc5331","近12个月小型超市交易笔数");
	map.put("qhCnt12MonMcc5813","近12个月饮酒场所交易笔数");
	map.put("qhAmt12MonMcc5813","近12个月饮酒场所交易金额");
	map.put("qhCnt12MonMcc6211","近12个月证券交易笔数");
	map.put("qhAmt12MonMcc6211","近12个月证券交易金额");
	map.put("qhCnt12MonMcc5094","近12个月珠宝类交易笔数");
	map.put("qhAmt12MonMcc5094","近12个月珠宝类交易金额");
	map.put("qhFlag12MonOverseas","近12个月有无境外交易");
	map.put("qhCnt12MonOverseas","近12个月境外交易笔数");
	map.put("qhAmt12MonOverseas","近12个月境外交易金额");
	map.put("qhPct12MonAmtOverseas","近12个月境外交易金额占比");
	map.put("qhCnt12MonPreAuthorization","近12个月预授权扣款笔数");
	map.put("qhAmt12MonPreAuthorization","近12个月预授权扣款金额");
	map.put("qhCnt12MonOnline","近12个月网购交易笔数");
	map.put("qhPct12MonOnlineCnt","近12个月网购交易笔数占比");
	map.put("qhAmt12MonOnline","近12个月网购交易金额");
	map.put("qhPct12MonOnlineAmt","近12个月网购交易金额占比");
	map.put("qhAmtMax12MonDayEnchashment","近12个月最大单日累计取现交易笔数");
	map.put("qhCntMax12MonDayEnchashment","近12个月最大单日累计取现交易金额");
	map.put("qhAmtMax12MonDayConsume","近12个月最大单日累计消费金额");
	map.put("qhCntMax12MonDayConsume","近12个月最大单日累计消费笔数");
	map.put("qhAmt12MonMaxConsume","近12个月单笔最大消费金额");
	map.put("qhId12MonMaxTrans","近12个月单笔最大交易金额对应交易类型");
	map.put("qhAmt12MonMaxTrans","近12个月单笔最大交易金额");
	map.put("qhPct12MonOverseasCnt","近12个月境外交易笔数占比");
	map.put("qhPct12MonMaxConsumeAvgTransOutAmt","近12个月最大消费金额占月均付款金额比值");
	map.put("qhCnt12Mon6513","近12个月物业管理费缴费笔数");
	map.put("qhAmt12Mon6513","近12个月物业管理费缴费金额");
	map.put("qhMonth12MonCarPurchase","近12个月汽车预估购买时间");
	map.put("qhFlagCar","有无汽车");
	map.put("qhCarValue","汽车估值");
	map.put("qhMonth12MonHousePurchase","房产预估购买时间");
	map.put("qhFlagHouse","房产标注");
	map.put("qhHouseValue","房产估值");
	map.put("qhCrossBorderCity12MonList","近12个月跨境交易国家列举");
	map.put("qhN12MonCurrCd","近12个月外币交易币种数");
	map.put("qhRank12MonMostCurrCd","近12个月最常用外币交易币种");
	map.put("qhN12MonMchntTp","近12个月发生交易的MCC种类数");
	map.put("qhRank112MonMcc","近12个月交易金额排名第一的MCC");
	map.put("qhCrossBorderCityNm12MonList","近12个月跨境交易国家名称列举");
	map.put("qhFlag6Var1","活跃度标志  实际月");
	map.put("qhLoc1Var1","当月活动省市");
	map.put("qhRfm56Var1","历史最早交易日期");
	map.put("qhCnt1MonMcc5311","近1个月百货交易笔数");
	map.put("qhCnt1MonMcc38Smw","近1个月仓储超市交易笔数");
	map.put("qhCnt1MonMcc0Living","近1个月家庭交易笔数");
	map.put("qhCnt1MonMcc7011","近1个月酒店交易笔数");
	map.put("qhCnt1MonMcc5Oth","近1个月其他类交易笔数");
	map.put("qhCnt1MonCarRelative","近1个月汽车相关类交易笔数");
	map.put("qhCnt1MonMcc30Dps","近1个月日用品交易笔数");
	map.put("qhCnt1MonMcc38Lua","近1个月奢侈品交易笔数");
	map.put("qhAmt1MonMcc38Dpt","近1个月储蓄交易金额");
	map.put("qhCnt1MonMcc38Dpt","近1个月储蓄交易笔数");
	map.put("qhAmt1MonMcc38Wls","近1个月批发交易金额");
	map.put("qhCnt1MonMcc38Wls","近1个月批发交易笔数");
	map.put("qhFlag1MonPayment","近1个月分期付款交易标志");
	map.put("qhAmt1MonMcc5331","近1个月小型超市交易金额");
	map.put("qhRfm6Var6","交易金额稳定性");
	map.put("qhCnt6MonMcc9498","近6个月信用卡还款笔数");
	map.put("qhCnt6MonBank","近6个月银行类交易笔数");
	map.put("qhAmt6MonBank","近6个月银行类交易金额");
	map.put("qhFlag6Var3","高中低消费人群标记");
	map.put("qhFlag6Var8","消费强度标志 实际月");
	map.put("qhLoc6Var11","常用省（市）");
	map.put("qhPct12MonMaxConsumeTotConsume","近12个月月最大消费交易金额占总消费交易金额比值");
	map.put("qhAmt12MonMcc38Wls","近12个月批发类交易金额");
	map.put("qhCnt12MonMcc38Wls","近12个月批发类交易笔数");
	map.put("qhAmt12MonBank","近12个月银行类交易笔数");
	map.put("qhCnt12MonBank","近12个月银行类交易金额");
	map.put("qhAmt1MonCarBuy","近1个月买车类交易金额");
	map.put("qhAmtRank16MonAmtCity","近6个月交易金额排名第一的城市的交易金额");
	map.put("qhCnt12MonMcc30Dps","近12个月日用品交易笔数");
	map.put("qhCnt12MonMcc5311","近12个月百货交易笔数");
	map.put("qhCnt12MonMcc0Living","近12个月家庭交易笔数");
	map.put("qhCnt12MonMcc5Oth","近12个月其他类交易笔数");
	map.put("qhCnt1MonPayment12","过去第12个月分期付款笔数");
	map.put("qhCnt1MonPayment6","过去第6个月分期付款笔数");
	map.put("qhAmt1MonPayment12","过去第12个月分期付款金额");
	map.put("qhAmt1MonPayment6","过去第6个月分期付款金额");
	map.put("qhCnt1MonBank12","过去第12个月银行类交易笔数");
	map.put("qhCnt1MonBank3","过去第3个月银行类交易笔数");
	map.put("qhCnt1MonBank6","过去第6个月银行类交易笔数");
	map.put("qhCnt1MonBank9","过去第9个月银行类交易笔数");
	map.put("qhAmt1MonBank12","过去第12个月银行类交易金额");
	map.put("qhAmt1MonBank3","过去第3个月银行类交易金额");
	map.put("qhAmt1MonBank6","过去第6个月银行类交易金额");
	map.put("qhAmt1MonBank9","过去第9个月银行类交易金额");
	map.put("qhAmtMax1MonDayPreAuth12","过去第12个月最大单日累计预授权扣款金额");
	map.put("qhAmtMax1MonDayPreAuth6","过去第6个月最大单日累计预授权扣款金额");
	map.put("qhNMonthMaxCashToNow","近12个月最大取现交易金额所在月距今月数");
	return map;
}