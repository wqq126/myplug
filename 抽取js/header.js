/**
 * 引用JS和CSS头文件
 */
var rootPath = getRootPath(); //项目路径

/**
 * 动态加载CSS和JS文件
 */
var dynamicLoading = {
    meta : function(){
        document.write('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">');
    },
    css: function(path){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required!');
        }
        document.write('<link rel="stylesheet" type="text/css" href="' + path + '">');
    },
    js: function(path, charset){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required!');
        }
        document.write('<script charset="' + (charset ? charset : "utf-8") + '" src="' + path + '"></script>');
    }
};

/**
 * 取得项目路径
 * @author wul
 */
function getRootPath() {
    //取得当前URL
    var path = window.document.location.href;
    //取得主机地址后的目录
    var pathName = window.document.location.pathname;
    var post = path.indexOf(pathName);
    //取得主机地址
    var hostPath = path.substring(0, post);
    //取得项目名
    var name = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
    return hostPath + name + "/";
}

//动态生成meta
dynamicLoading.meta();

//动态加载项目 JS文件
dynamicLoading.js(rootPath + "/js/common/jquery-1.9.1.min.js", "utf-8");
dynamicLoading.js(rootPath + "/js/common/bootstrap.min.js", "utf-8");
dynamicLoading.js(rootPath + "/js/process/center/common/baseApp.js", "utf-8");
dynamicLoading.js(rootPath + "/js/process/center/common/bootstrap-datetimepicker.min.js", "utf-8");
dynamicLoading.js(rootPath + "/js/process/center/common/bootstrap-datetimepicker.zh-CN.js", "utf-8");
dynamicLoading.js(rootPath + "/js/process/center/common/jquery.dataTables.js", "utf-8");
dynamicLoading.js(rootPath + "/js/platform/system/loadHeader.js", "utf-8");

//动态加载项目 CSS文件
dynamicLoading.css(rootPath + "/css/common/bootstrap-3.3.5/css/bootstrap.min.css");
dynamicLoading.css(rootPath + "/css/common/bootstrap-3.3.5/css/bootstrap-responsive.css");
dynamicLoading.css(rootPath + "/css/workflow/css/jquery.dataTables.css");
dynamicLoading.css(rootPath + "/css/workflow/css/newWorkflow.css");
3、loadHeader.js 
$(function(){
    $(".container").append('<div id="header"></div>');
    $("#header").load(getRootPath() + "header.html");
});