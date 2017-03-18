/**
 * Created by lyh on 2017/3/18.
 */
window.onload=function () {
    waterfall("main","box");
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function () {
        debugger;
        if(checkscrollside()){
            for(var i=0;i<dataInt.data.length;i++){
                var box=document.createElement("div");
                box.className='box';
                var main=document.getElementById("main");
                main.appendChild(box);
                var pic=document.createElement("div");
                pic.className="pic";
                box.appendChild(pic);
                var img=document.createElement("img");
                img.src="./images/"+dataInt.data[i].src;
                pic.appendChild(img);
            }
            waterfall("main","box");
        }
    }
}

function waterfall(main,box){
    var boxList=document.querySelectorAll(".box");
    var main=document.getElementsByClassName("main");
    //alert(boxList.length);
    var boxWidth=boxList.item(0).offsetWidth;
    var coloumn= Math.floor(document.documentElement.clientWidth/boxWidth);
    main[0].style.cssText="width:"+boxWidth*coloumn+"px;margin:0 auto;"
    var coloumnHeight=new Array();
    for(var i=0;i<boxList.length;i++){
        var box=boxList.item(i);
        var boxHeight=box.offsetHeight;
        if(i<coloumn){
            coloumnHeight.push(boxHeight);
        }else{
            var minH=Math.min.apply(null,coloumnHeight);
            var minIndex=getMinIndex(coloumnHeight,minH);
            box.style.position="absolute";
            box.style.top=minH+'px';
            box.style.left=boxList.item(minIndex).offsetLeft+'px';
            coloumnHeight[minIndex]+=box.offsetHeight;
        }

    }
}

function getMinIndex(coloumnHeight,minValue){
    for(var i=0;i<coloumnHeight.length;i++){
        if(minValue==coloumnHeight[i]){
            return i;
        }
    }
}

function checkscrollside(){
    var boxList=document.querySelectorAll(".box");
    var lastH=boxList.item(boxList.length-1).offsetTop+Math.floor(boxList.item(boxList.length-1).offsetHeight/2);
    var documentH=document.documentElement.clientHeight;
    var scrollTop=document.body.scrollTop;
    if(documentH+scrollTop>lastH){
        return true;
    }
    return false;
}