var Ajah = function(url,varname,handleSuccess,handleFailure){
	/**
	 * url:远端地址
	 * varname：远端返回数据的变量名 
	 * handleSuccess,handleFailure是函数
	 */
	script = document.createElement("script");
	script.src = url;
	var handler = function(str){
		handleSuccess(str);
	}
	script.onload = function(){
//		var json = eval(varname);
		var json = varname;
		console.log("ssssssssss")
		console.log(json)
		handler(json);
	}
	if(window.ie){
		script.onreadystatechange = function(){
			if(script.readyState =='complete' || script.readyState == 'loaded'){
				var json = eval(varname);
				if(typeof json != 'undefined'){
					handler(json);
				}
			}
		}
	}
	document.body.appendChild(script);
}
