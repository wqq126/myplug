/**
 * 去掉字符串中所有的空格
 * str		需要去空格的字符
 * is_global 是否全局  是（g）
 * */
function wqqTrim(str,is_global)
  {
   var result;
   result = str.replace(/(^\s+)|(\s+$)/g,"");
   if(is_global.toLowerCase()=="g")
   {
    result = result.replace(/\s/g,"");
    }
   return result;
}
/**
 * 检测非法字符
 * 
 * */
function wqqCheckString(str) {
	var containSpecial = RegExp(/[(\ )(\~)(\￥)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/).test(str);
	var re = /\d+/gi;
	var isnum = re.test(str);
	console.log(isnum)
	console.log(containSpecial);
	if(isnum || containSpecial) {
		return true
	} else {
		return false
	}
}