/**
 * Created by aaron on 2017/6/16.
 */

//var data=[{"type":"pin","wid":44,"high":44,"x":332,"y":379,"page":1},{"type":"signature","wid":44,"high":44,"x":187,"y":608,"page":1}];

(function($,window,undefined){
    var resData={
        canvasLeft:$(".section_main_pdf").offset().left,
        canvasBottom:$(".section_main_pdf").height()+$(".section_main_pdf").offset().top,
        init:function(){
            this.getData();
        },
        getData:function(){
            var that=this;
            $.ajax({
                url:'data/signature.json',
                type:'get',
                dataType:'json',
                async:false,
                success:function(data){
                    console.log(data);
                    if(data.isSuccess){
                        that.resolveData(data.dataList);
                    }
                }
            })
        },
        resolveData:function(data){
            console.log(this);
            console.log(JSON.stringify(data));
            var html='';
            var resData=data;
            console.log('resData:'+resData.length);
            for(var i=0;i<resData.length;i++){
                html+='<span class="img_outer" data-icon="'+resData[i].type+'" data-page="'+resData[i].page+'" ' +
                    'style="position:absolute;cursor:move;display:inline-block;border:2px solid;top:'+(resData[i].y+this.canvasBottom-resData[i].high)+'px;' +
                    'left:'+(resData[i].x+this.canvasLeft)+'px;width:'+(resData[i].wid+4)+'px;height:'+(resData[i].high+4)+'px;">' ;
                if(resData[i].type=='signature'){
                    html+='<img src="" class="dragIcon" style="width: 100%;height: 100%"/>'+
                            '<span class="iconResize" style="display: inline-block;width:10px;position:absolute;' +
                        'height:10px;cursor:se-resize;right:-5px;bottom:-5px;background-color:#fff;border:2px solid ;border-radius:50%"></span>';
                }else{
                    html+='<img src="" class="dragIcon" style="width: 100%;height: 100%"/>';
                }
                html+='</span>';
            }
            $(".section_main_pdf").append(html);
        }
    };
    resData.init();
})(jQuery,window,undefined);
