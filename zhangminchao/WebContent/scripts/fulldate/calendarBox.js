
function showCalendar(sFld1,canChoseDates, selectedDate,overPersonsDates, overDate, belowDate, isAllDisabled)
 {
 var fld1;
 var cf=document.getElementById("CalFrame");
 var wcf=window.frames.CalFrame;
 if(!sFld1){alert("输入控件未指定！");return;}
 fld1=document.getElementById(sFld1);
 if(!fld1){alert("输入控件不存在！");return;}
// if(!wcf.bCalLoaded){alert("日历未成功装载！请刷新页面！");return;}
 cf.style.display="block";

 wcf.fld1=fld1;
 wcf.canChoseDates = canChoseDates;
 wcf.overDate = overDate;
 wcf.overPersonsDates = overPersonsDates;
 wcf.belowDate = belowDate;
 wcf.selectedDate = selectedDate;
 wcf.isAllDisabled = isAllDisabled;
 wcf.initCalendar();
 }
 function hideCalendar()
 {
 var cf=document.getElementById("CalFrame");
 cf.style.display="none";
 }
 