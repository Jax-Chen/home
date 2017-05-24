$(function(){
	jQuery(".markedit").on("click", function(){
		$this = $(this);
		var mark = $this.parents("td").siblings(".bc-mark").text();
		var ct = "<textarea style='width:99%;height:97%;' class='marktext'>"+mark+"</textarea>";
		layer.open({
			type:1,
			title:'编辑备注',
			btn:['确定', '取消'],
			area:['400px', '300px'],
			content:ct,
			yes:function(index){
				var marktext = jQuery(".marktext").val();
				var id = $this.attr("data-code");
				layer.confirm('确定修改？', {icon: 3, title:'提示'}, function(cindex){
                    $.ajax({
                        url:appServer+'/bops/money/bopschargemarkedit.htm',
                        type:"POST",
                        data:{"id":id, "marktext":marktext},
                        beforeSend:function(){
                            loadIndex = layer.load(1);
                        },
                        success:function(res){
                            layer.close(loadIndex);
                            if(res.meta.success){
                                layer.msg("修改成功！");
                                layer.close(index);
                                $this.parents("td").siblings(".bc-mark").text(marktext);
                            }else{
                                layer.alert(res.meta.errorInfo, {icon:2});
                            }
                        },
                        error:function(){
                            layer.close(laodIndex);
                            layer.msg('网络错误！');
                        }
                        
                    });
                });  
			}
		});
		
	});
	
	$(".bopsinvoice").on("click", function(){
		var id = $(this).attr("data-code");
		var amount = $(this).parent().siblings("#q-amount").text();
		var str = "<table style='width:80%;margin:0 auto;'><tr class='invoiceinfo' style='height: 35px;'><td align='right' width='30%'>开票金额：</td><td><input id='ivc-amount' value=''/></td></tr>"+
		"<tr class='invoiceinfo' style='height: 35px;'><td align='right' width='30%'>发票抬头：</td><td><input id='ivc-title' value=''/></td></tr>"+
		"<tr class='invoiceinfo' style='height: 35px;'><td align='right' width='30%'>收票人：</td><td><input id='ivc-recvname' value=''/></td></tr>"+
		"<tr class='invoiceinfo' style='height: 35px;'><td align='right' width='30%'>联系号码：</td><td><input id='ivc-contact' value=''/></td></tr>"+
		"<tr class='invoiceinfo' style='height: 35px;'><td align='right' width='30%'>收票地址：</td><td><input id='ivc-address' value=''/></td></tr></table>";
		layer.open({
			type:1,
			title:'开发票',
			btn:['确定', '取消'],
			area:['400px', '300px'],
			content:str,
			yes:function(index){
				var invoiceAmount = $("#ivc-amount").val();
    			var invoiceTitle = $("#ivc-title").val();
    			var invoicePerson = $("#ivc-recvname").val();
    			var invoiceContact = $("#ivc-contact").val();
    			var invoiceAddress = $("#ivc-address").val();
    			if(parseInt(invoiceAmount)> parseInt(amount)){
    				layer.alert("开票金额不得大于" + amount + "元！");
    				return false;
    			}
                    $.ajax({
                        url:appServer+'/bops/money/bopschargeinvoice.htm',
                        type:"POST",
                        data:{"id":id, "invoiceAmount":invoiceAmount, "invoiceTitle":invoiceTitle, "invoicePerson":invoicePerson, "amount":amount,
                        	"invoiceContact":invoiceContact, "invoiceAddress":invoiceAddress},
                        beforeSend:function(){
                            loadIndex = layer.load(1);
                        },
                        success:function(res){
                            layer.close(loadIndex);
                            if(res.meta.success){
                                layer.msg("操作成功！");
                                location.reload();
                            }else{
                                layer.alert(res.meta.errorInfo, {icon:2});
                            }
                        },
                        error:function(){
                            layer.close(laodIndex);
                            layer.msg('网络错误！');
                        }
                        
                    });
                 
			}
		});
	});
});