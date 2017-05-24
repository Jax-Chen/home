
var ckeditorConfig = {};
ckeditorConfig.language = "zh-cn";
ckeditorConfig.width="750";
ckeditorConfig.height="400";
ckeditorConfig.autoUpdateElement = true; 
ckeditorConfig.forcePasteAsPlainText=false;      
ckeditorConfig.pasteFromWordRemoveFontStyles=false;
ckeditorConfig.pasteFromWordRemoveStyles=false;
ckeditorConfig.disableNativeSpellChecker =false;
ckeditorConfig.scayt_autoStartup=false;

function createCkEditor(id) {
   $('#'+id).ckeditor(ckeditorConfig);
}