$(function(){
    function makepoker(){
    	var poker=[]
    	var biao={};
        while(poker.length!==52){
        	var colors=['h','s','c','d'];
        	var index=Math.floor(Math.random()*4);
        	var n=Math.ceil(Math.random()*13);
        	var c=colors[index];
        	var v={
        		color:c,
        		number:n
        	}
        	if (!biao[n+c]) {
        		poker.push(v);
        		biao[n+c]=true;
        	};
          }
          return poker;
    }

	function setpoker(poker){
		var index=0;
	    var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'k'}
        for (var i = 0,poke; i < 7; i++) {
        	for (var j = 0; j < i+1; j++) {
	        	index+=1;
	        	poke=poker[index];
        		$('<div>').attr('num',poke.number).attr('id',i+'_'+j).addClass('pai').css('background-image','url(./image/'+dict[poke.number]+poke.color+'.png)').appendTo('.scene').delay(index*30).animate({
        			top:i*40,
        			left:j*130+(6-i)*65,
        			opacity:1
        		})
        	};
        };
	    

		for (; index < poker.length; index++) {
			  v=poker[index]
        		$('<div>').addClass('pai left').attr('num',v.number).css('background-image','url(./image/'+dict[v.number]+v.color+'.png)').appendTo('.scene').delay(index*30).animate({
        			top:420,
        			left:240,
        			opacity:1
        		})
        }
	}
    //开始
    var kg=false;
    $('.wanfa').delay(600).slideDown('slow')
    $('.wanfa span').on('click',function(){
        $('.wanfa').slideUp('slow');
        kg=true;  
    })
    $('.start').on('click',function(){
        if (kg) {
           setpoker(makepoker()) 
           $('.kstu').slideUp() 
        }else{
           alert('请仔细阅读玩法介绍');
           return kg=false;
        }
        
    })
    //结束
    $('.jieshu').on('click',function(){
       $('.pai').remove();
       $('.kstu').slideDown();
       $('.wanfa').delay(1000).slideDown();
       score=0;
       f=0;
       return fen.css({color:'red',fontSize:24}).text(score); 
    })
       		
    //往右走
    var index=1;
    $('.mleft').on('mousedown',false)
	$('.mleft').on('click',function(){
        if ($('.left').length==0) {return};
         $('.left').last().css({zIndex:index++,marginTop:0}).animate({left:570}).queue(function(){
         	$(this).removeClass('left').addClass('right').dequeue()
         })
   // console.dir($('.right').length)
         
	})		
    
    //往左走
    var number=0;
    $('.mright').on('mousedown',false)
    $('.mright').on('click',function(){
    	if ($('.left').length) {
    		return false;
    	}
        number++;
    	if (number>3) {
            $('.end').slideDown();
            return
        };
    	$('.right').each(function(i,v){
            $(this).css({zIndex:index++,marginTop:0}).delay(i*30).animate({left:240},10).queue(function(){
            $(this).removeClass('right').addClass('left').dequeue()
               })
    	})
    	
    	})

    $('.end').slideUp()
    function getNum(el){
    	return parseInt(el.attr('num'))
    }
    function press(el){
    	var x=parseInt(el.attr('id').split('_')[0]);
    	var y=parseInt(el.attr('id').split('_')[1]);
    	if ($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length) {
    		return false;
    	}else{
    		return true;
    	}
    }
    var pre;
    var score=0;
    var fen=$('.score .fen');
    $('.scene').on('mousedown',false)
    $('.scene').on('click','.pai',function(e){
        var l=e.pageX;
        var t=e.pageY;
    	if($(this).attr('id')&&!press($(this))){
             return;
    	}
        
        $(this).animate({marginTop:-10},200)
        if (getNum($(this))==13) {
            score+=5;
        	$(this).animate({
        		top:0,
        		left:1000
        	},200).queue(function(){
        		$(this).detach().dequeue()
        	})
        	return fen.css({color:'red',fontSize:24}).text(score);
        };
        // console.dir(pre)
        if (pre) {
        	if (getNum($(this))+getNum(pre)==13) {
                score+=5;
        		$(this).add(pre).animate({
        			top:0,
        			left:1000
        		},200).queue(function(){
        			$(this).detach().dequeue()
        		})
        	}else{
                pre.delay(200).animate({marginTop:0},200)
        		$(this).animate({marginTop:0},200)
                $('.tishi').animate({left:l,top:t})
        	}
        	pre=null
        }else{
        	pre=$(this)
        }
        // console.dir(score);
        fen.css({color:'red',fontSize:24}).text(score);
        return score;
    })
      $('.tishi').on('click',function(){
        $('.tishi').animate({left:-500,top:240})
      }) 
//发牌
   var f=0;
   var fp=$('.fpai');
   fp.on('click',function(){
    f++;
    if (f<3) {
        $('.pai').remove();
     setpoker(makepoker())
     score=0;
     return fen.css({color:'red',fontSize:24}).text(score); 
    };
   	 alert('你已没有发牌机会')
   })


})