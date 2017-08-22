$(function(){

    /*H5拖拽并复制*/
    var moveDemo=null;
    var _type;
    var divs=document.querySelectorAll(".left_list li");
    var showBox=document.querySelector(".section_main_pdf");
    for(var i=0;i<divs.length;i++){
        divs[i].ondragstart=function(e){
            moveDemo=this.querySelector("img");
            _type=this.querySelector('.list_name').innerText;
        }
    };
    showBox.ondragover =function(e){
        e.preventDefault();
        //console.log('x:'+ e.pageX+';y:'+ e.pageY);
    };
    showBox.ondrop=function(e){
        var _clone=moveDemo.cloneNode();
        this.append(_clone);
        console.log(_clone);
        _clone.className='dragIcon';
        $(_clone).css({
            'width':'100%',
            'height':'100%'
        }).attr('draggable',false);
        $(_clone).wrap('<span class="img_outer"></span>');
        if(_type=='Signature'){
            $(_clone).parent().css({
                'position':'absolute',
                'top': e.pageY,
                'left': e.pageX,
                'cursor':'move',
                'display':'inline-block',
                'border':'2px solid'
            }).append('<span class="iconResize" style="position:absolute;display: inline-block;width: 10px;height: 10px;' +
                'cursor:se-resize;right:-5px;bottom:-5px;background-color:#fff;' +
                'border:2px solid;border-radius:50%"></span>').attr({
                'data-icon':'signature',
                'data-page':config.defaultPage
            });
        }
        else if(_type=='PIN'){
            $(_clone).parent().css({
                'position':'absolute',
                'top': e.pageY,
                'left': e.pageX,
                'cursor':'move',
                'display':'inline-block',
                'border':'2px solid'
            }).attr({
                'data-icon':'pin',
                'data-page':config.defaultPage
            });
        }
    };

    /*构造拖拽及缩放函数*/
    $(document).mousemove(function(e) {
        if (!!this.move) {
            var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
                callback = document.call_down || function() {
                        $(this.move_target).css({
                            'top': e.pageY - posix.y,
                            'left': e.pageX - posix.x
                        });
                    };
            callback.call(this, e, posix);
        }
    }).mouseup(function(e) {
        if (!!this.move) {
            var callback = document.call_up || function(){};
            callback.call(this, e);
            $.extend(this, {
                'move': false,
                'move_target': null,
                'call_down': false,
                'call_up': false
            });
        }
    });

    /*实例化*/
    $(document).on('mousedown','.img_outer',function(e){
        var offset=$(this).offset();
        this.posix={
            'x': e.pageX-offset.left,
            'y': e.pageY-offset.top
        };
        $.extend(document,{
            'move':true,
            'move_target':this
        });
    });
    $(document).on('mousedown','.iconResize',function(e){
        var that=this;
        var posix = {
            'w': $(this).parent().width(),
            'h': $(this).parent().height(),
            'x': e.pageX,
            'y': e.pageY
        };
        $.extend(document, {'move': true, 'call_down': function(e) {
            $(that).parent().css({
                'width': Math.max(30, e.pageX - posix.x + posix.w),
                'height': Math.max(30, e.pageY - posix.y + posix.h)
            });
        }});
        return false;
    });


    //获取选中元素
    $(document).on('click','.img_outer',function(e){
        $(".img_outer").removeClass("active");
        var _active=$(this).hasClass("active");
        if(_active){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
    });

    /*渲染PDF*/
   /* var _container=$(".section_main_pdf");
    PDFJS.workerSrc='js/pdf.worker.js';

    var config={
        //url:'txt/userAgreeDoc.pdf',//pdf路径
        url:'txt/webpack.pdf',
        outerHigh:_container.height(),//容器高
        outerWid:_container.width(),//容器宽
        defaultPage:1,//默认第一页
        totalPage:6//总页数
    };*/

    renderPdf();
    /*上一页*/
    $("input.page_pre").on('click',function(){
        if(config.defaultPage>1){
            --config.defaultPage;
            $(".page_num_cur").text(config.defaultPage);
            renderPdf();
        }
    });
    /*下一页*/
    $("input.page_next").on('click',function(){
    	 var totalpage = $(".total_page").html();
        if(config.defaultPage<totalpage){
            ++config.defaultPage;
            $(".page_num_cur").text(config.defaultPage);
            renderPdf();
        }
    });
    /*GO*/
    $("input.page_go_val").on('click',function(){
        var _val=$("input.page_val").val();
        var totalpage = $(".total_page").html();
        if(_val>0 && _val<=totalpage){
            config.defaultPage=parseInt(_val);//pdf不会自动转换字符串为数字
            console.log(config.defaultPage);
            $(".page_num_cur").text(_val);
            renderPdf();
        }
    });

    function renderPdf(){
        var loadingTask=PDFJS.getDocument(config.url);
        loadingTask.promise.then(
            function getPdf(pdf){
            	console.log(pdf)
            	var totalPage = pdf.pdfInfo.numpages;
            	$(".total_page").html(pdf.pdfInfo.numPages)
                pdf.getPage(config.defaultPage).then(
                    function getPage(page){
                    	console.log(page)
                        var scale=1;
                        var viewport=page.getViewport(scale);
                        var canvas=document.getElementById('canvas');
                        var context=canvas.getContext('2d');
//                      canvas.height=config.outerHigh;
//                      canvas.width=config.outerWid;
                        canvas.height = viewport.height;
                    	canvas.width = viewport.width;
                        var renderContext={
                            canvasContext:context,
                            viewport:viewport
                        };
                        page.render(renderContext);
                    },
                    function pageError(msg){
                        console.log(msg);
                    }
                )
            },
            function pdfError(msg){
                alert(msg);
            }
        );

        //对不在当前页面的签名进行隐藏或显示
        var lists=$(".section_main_pdf .img_outer");
        for(var i=0;i<lists.length;i++){
            if(lists.eq(i).data('page')==config.defaultPage){
                lists.eq(i).css({
                    'visibility':'visible'
                });
            }else{
                lists.eq(i).css({
                    'visibility':'hidden'
                });
            }
        }
    }
});

//选择头像
$(document).on('change','#selectUser',function(e){
    //通过字符串拼接选中值来实现切换图片
    var _val=$(this).find('option:selected').val();
    var _imgVal=$(".img_outer.active");
    if(_val=='spouse'){
        _imgVal.find('img').attr({
            'src':'images/pin.png'
        });
        _imgVal.attr('data-id',_val);
    }
 });

//保存信息
$(document).on('click','#saveMsg',function(e){
    /*获取canvas左下角位置*/
    var canvasHigh=$("#canvas").height();//pdf高
    var canvasWid=$("#canvas").width();//pdf宽
    //console.log('canvasHigh:'+canvasHigh);
    var canvasPosTop=$("#canvas").offset().top;//pdf距离顶部
    var canvasPosBottom=$("#canvas").offset().top+canvasHigh;//pdf底部距离顶部
    var canvasPosLeft=$("#canvas").offset().left;//pdf距离左边
    var canvasPosRight=canvasPosLeft+canvasWid;//pdf右边距离左边
    //console.log('canvasPosTop:'+canvasPosTop+';canvasPosLeft:'+canvasPosLeft);

    /*遍历获取每个签名的位置*/
    var obj=new Array();
    var lists=$(".section_main_pdf .img_outer");
    console.log(list)
    for(var i=0;i<lists.length;i++){
        var _left=parseInt(lists.eq(i).css('left'));
        if(_left<canvasPosLeft || _left> canvasPosRight){
            alert('请在文件中签名');
            return;
        }
        var _top=parseInt(lists.eq(i).css('top'));
        if(_top<canvasPosTop || _top>canvasPosBottom){
            alert('请在文件中签名');
            return;
        }
        var arr={
            type:lists.eq(i).data('icon'),//签名类型
            wid:lists.eq(i).width(),//签名的宽
            high:lists.eq(i).height(),//签名的高
            id:lists.eq(i).data('id'),//用户id
            x:_left-canvasPosLeft,//距离pdf左下角的x,
            y:Math.abs(_top+lists.eq(i).height()-canvasPosBottom),//距离pdf左下角的y,
            page:lists.eq(i).data('page'),//签名所在页
        };
        obj.push(arr);
    }
    console.log('obj:'+JSON.stringify(obj));
    //下一步：异步提交
});