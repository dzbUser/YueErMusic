function $pj(id){
	return document.getElementById(id);
}

class Music {
	constructor(name, src, img, singer, m_length){
		this.name = name;
		this.src = src;
		this.img = img;
		this.singer = singer;
		this.m_length = m_length;
	}
}
var ul = $pj('list_ul');
var playicn = $pj('g_player').children[0].children[1];
var music_list = [];
var info_list = []
//获取信息并写入js
//写完时应改成用for获取信息,然后装进list

var music1 = new Music('一万次悲伤', 'music/1.mp3', 'music/1.png', '逃跑计划', '255');
var music2 = new Music('追光者', 'music/2.mp3', 'music/2.png', '岑宁儿', '235');
var music3 = new Music('一万次悲伤2', 'music/1.mp3', 'music/1.png', '逃跑计划2', '255');

music_list.push(music1);
music_list.push(music2);
music_list.push(music3);


function playOne(name, src, img, singer, m_length){
	var music = new Music(name, src, img, singer, m_length);
	music_list.push(music);
	
	console.log(music_list);
	//删除节点
	while(ul.hasChildNodes()){
		ul.removeChild(ul.firstChild);
	}
	//添加节点
	addList();
	//使节点显示
	icon();
	//初始列表
	$pj('ctrl').children[3].children[0].innerHTML = music_list.length;
	$pj('m_list').children[0].children[0].children[0].children[0].innerHTML = music_list.length;
	currmusic = music_list.length-1;
	clearInterval(cur_timer);
	audio.pause();
	audio.src = music_list[currmusic].src;
	changeInfo();
	audio.play();
	cur_timer = setInterval(autoCur, 1000);
	playicn.className = 'pas';
	
}

var audio = $pj('myaudio');
audio.volume = 0.35;	//音量
var currmusic = 0;		//当前歌曲在列表中的位置
var mode = 1;		//播放模式，1列表循环，2随机循环，3单曲播放

var music_img = $pj('g_player').children[1].children[0];
var music_name = $pj('g_player').children[2].children[0].children[0];
var music_singer = $pj('g_player').children[2].children[0].children[1].children[0];
var music_currtime = $pj('M_time').children[0];
var music_length = $pj('M_time').children[1];

var cur_timer = null;

//改变播放时间，进度条，，，歌词
function autoCur(){
	var t = parseInt(audio.currentTime);
	var len = parseInt(music_list[currmusic].m_length);
	music_currtime.innerHTML = Math.floor(t/60)+":"+(t%60/100).toFixed(2).slice(-2);
	$pj('cur').style.width = t/len*100 + '%';
	for(var i = 0; i < music_list.length; i++){
		ul.children[i].className = '';
		ul.children[i].children[0].children[0].style.display = 'none';
	}
	ul.children[currmusic].children[0].children[0].style.display = 'block';
	ul.children[currmusic].className = 'z-sel';
	if(t == len){
		if(mode != 3)
			next();
		else
			;
	}
}

//改变播放器信息
function changeInfo(){
	music_img.src = music_list[currmusic].img;
	music_name.innerHTML = music_list[currmusic].name;
	music_singer.innerHTML = music_list[currmusic].singer;
	music_currtime.innerHTML = '0:00';
	var t = parseInt(music_list[currmusic].m_length);
	music_length.innerHTML = " / " + Math.floor(t/60)+":"+(t%60/100).toFixed(2).slice(-2);
}

if(music_name.innerHTML == ''){
	if(music_list.length != 0)
		changeInfo();
}


//初始化，音量条
function Init(){
	//总高113px
	//curr为红色条 height
	//btn为红点，top
	$pj('vbg').children[0].style.height = audio.volume*93 + 'px';
	//$pj('vbg').children[1].style.top = 90-audio.volume*113 + 'px'
	$pj('vbg').children[1].style.bottom = audio.volume*93-12 + 'px';

	//初始列表
	$pj('ctrl').children[3].children[0].innerHTML = music_list.length;

	$pj('m_list').children[0].children[0].children[0].children[0].innerHTML = music_list.length;
}

Init();


//控制按钮的显示关闭

///音量条
$pj('ctrl').children[1].onclick = function(){
	if($pj('ctrl').children[0].children[0].style.display == 'none' || $pj('ctrl').children[0].children[0].style.display == ''){
		$pj('ctrl').children[0].children[0].style.display = 'block';
		$pj('vbg').style.display = 'block';
		$pj('vbg').children[0].style.display = 'block';
		$pj('vbg').children[1].style.display = 'block';
	}
	else{
		$pj('ctrl').children[0].children[0].style.display = 'none';
		$pj('vbg').style.display = 'none';
		$pj('vbg').children[0].style.display = 'none';
		$pj('vbg').children[1].style.display = 'none';
	}
}
//歌单列表
$pj('ctrl').children[3].children[0].onclick = function(){
	if($pj('m_list').style.display == 'none' || $pj('m_list').style.display == '')
		$pj('m_list').style.display = 'block';
	else
		$pj('m_list').style.display = 'none';
}

//添加列表
function addList(){
	for(var i = 0; i < music_list.length; i++){
		var li = document.createElement('li');
		//col-1
		var col_1 = document.createElement('div');
		var playicn = document.createElement('div');
		playicn.className = 'playicn';
		col_1.className = 'col col-1';
		col_1.append(playicn);
		li.append(col_1);
		//col-2
		var col_2 = document.createElement('div');
		col_2.className = 'col col-2';
		col_2.innerHTML = music_list[i].name;
		li.append(col_2);
		//col-3
		var col_3 = document.createElement('div');
		col_3.className = 'col col-3';
		var icns = document.createElement('div');
		icns.className = 'icns';
		var i1 = document.createElement('i');
		i1.className = 'ico icn-del';
		i1.innerHTML = '删除';
		var i2 = document.createElement('i');
		i2.className = 'ico icn-dl';
		i2.innerHTML = '下载';
		var i3 = document.createElement('i');
		i3.className = 'ico ico-add';
		i3.innerHTML = '收藏';
		icns.append(i1);
		icns.append(i2);
		icns.append(i3);
		col_3.append(icns);
		li.append(col_3);
		//col-4
		var col_4 = document.createElement('div');
		col_4.className = 'col col-4';
		var span = document.createElement('span');
		span.style.title = music_list[i].singer;
		var a = document.createElement('a');
		a.innerHTML = music_list[i].singer;
		a.style.href = "javascript:;";
		span.append(a);
		col_4.append(span);
		li.append(col_4);
		//col-5
		var col_5 = document.createElement('div');
		col_5.className = 'col col-5';
		var t = parseInt(music_list[currmusic].m_length);
		col_5.innerHTML = Math.floor(t/60)+":"+(t%60/100).toFixed(2).slice(-2);
		li.append(col_5);
		ul.append(li);
	}
	
	for(var i = 0 ; i < ul.children.length; i++){
		var li = ul.children[i];
		var icon = li.children[2].children[0].children[0];
		icon.index = i;
		icon.onclick = function(){
			del(this.index);
		};
	}
}
addList();

function del(index){
	//删除第index首歌
	
	//获取当前删除歌曲的信息
	var cmusic = new Music(music_list[index].name, music_list[index].src, music_list[index].img, music_list[index].singer, music_list[index].m_length);
	//获取当前播放歌曲的信息
	var playingM = new Music(music_list[currmusic].name, music_list[currmusic].src, music_list[currmusic].img, music_list[currmusic].singer, music_list[currmusic].m_length);
	//console.log(cmusic);
	//总数减1
	//music_num = music_num-1;
	//数据列表删除完成
	
	//切割列表，形成删除歌曲后的新列表
	var m1 = music_list.slice(0, index);
	var m2 = music_list.slice(index+1);
	music_list = m1.concat(m2);
	
	if(music_list.length == 0)
	
//	if(index == currmusic){
//		if(index >= music_list.length){
//			index = 0;
//			currmusic = index;
//			clearInterval(cur_timer);
//			audio.pause();
//			audio.src = music_list[currmusic].src;
//			changeInfo();
//			audio.play();
//			cur_timer = setInterval(autoCur, 1000);
//			playicn.className = 'pas';
//		}
//		if(music_length >= 1){
//			console.log("music_length="+music_length);
//			currmusic = index;
//			clearInterval(cur_timer);
//			audio.pause();
//			audio.src = music_list[currmusic].src;
//			changeInfo();
//			audio.play();
//			playicn.className = 'pas';
//			cur_timer = setInterval(autoCur, 1000);
//		}
//		else{
//			console.log("last one");
//			music_name.innerHTML = "";
//			music_singer.innerHTML = "";
//			music_currtime.innerHTML = '0:00';
//			music_length.innerHTML = "/0:00";
//		}
//	}
//	else{
//		//当前播放歌曲不是被删除歌曲，更新curr
//		//遍历新列表
//		for(var j = 0; j < music_list.length; j++){
//			//console.log("j="+music_list[j].name);
//			//console.log("playing="+playingM.name);
//			if(music_list[j].name == playingM.name){
//				currmusic = j;
//				break;
//			}
//		}
//	}
	
	//删除节点
	while(ul.hasChildNodes()){
		ul.removeChild(ul.firstChild);
	}
	//添加节点
	if(music_list.length > 0){
		addList();
		//使节点显示
		icon();
	}
	//初始列表
	$pj('ctrl').children[3].children[0].innerHTML = music_list.length;
	$pj('m_list').children[0].children[0].children[0].children[0].innerHTML = music_list.length;
}

for(var i = 0 ; i < ul.children.length; i++){
	ul.children[i].index = i;
	ul.children[i].ondblclick = function(){
		dblcPlay(this.index);
	};
}
function dblcPlay(index){
	var play = $pj('g_player').children[0].children[1];
	playicn.className = 'pas';
	curr_time = 0;
	currmusic = index;
	audio.pause();
	clearInterval(cur_timer);
	audio.src = music_list[currmusic].src;
	changeInfo();
	audio.play();
	cur_timer = setInterval(autoCur, 1000);
}

//////列表onmouse显示操作
function icon(){
	for(var j = 0; j < music_list.length; j++){
		ul.children[j].onmouseover = function(){
			this.children[2].children[0].style.display = 'block';
			//this.className = 'z-sel';
		}
		ul.children[j].onmouseout = function(){
			this.children[2].children[0].style.display = 'none';
			//this.className = '';
		}
	}
}
icon();

//歌单列表的关闭
$pj('m_list').children[0].children[0].children[4].onclick = function(){
	$pj('m_list').style.display = 'none';
}

///////////////////////////////////////////////////////////////


function play(){
	if(playicn.className == 'ply'){
		playicn.className = 'pas';
		if(audio.src == ''){
			audio.src = music_list[currmusic].src;
		}
		audio.play();
		playicn.className = 'pas';
		cur_timer = setInterval(autoCur, 1000);
	}
	else if(playicn.className == 'pas'){
		playicn.className = 'ply';
		audio.pause();
		clearInterval(cur_timer);
	}
}

var modebtn = $pj('ctrl').children[2];
function changeMode(){
	mode++;
	if(mode > 3){
		mode = 1;
	}
	switch(mode){
		case 1:
				modebtn.className = 'icn-loop';
				audio.loop = '';
				break;
		case 2:
				modebtn.className = 'icn-shuffle';
				audio.loop = '';
				break
		case 3:
				modebtn.className = 'icn-one';
				audio.loop = 'loop';
				break;
	}
}

function next(){
	if(mode == 2){
		currmusic = parseInt(Math.random()*(music_list.length-0+1)+0,10); 
	}
	else{
		currmusic++;
		if(currmusic >= music_list.length)
			currmusic = 0;
	}
	curr_time = 0;
	audio.pause();
	audio.src = music_list[currmusic].src;
	changeInfo();
	audio.play();
	playicn.className = 'pas';
}
function pre(){
	curr_time = 0;
	if(mode == 2){
		currmusic = parseInt(Math.random()*(music_list.length-0+1)+0,10); 
	}
	else{
		currmusic--;
		if(currmusic >= music_list.length)
			currmusic = 0;
	}
	audio.pause();
	audio.src = music_list[currmusic].src;
	changeInfo();
	audio.play();
	playicn.className = 'pas';
}




//拖动进度条,参考 http://www.jb51.net/article/103461.htm
//http://www.jb51.net/article/25935.htm
var scroll = $pj('scroll');
var bar = $pj('cur').children[0];
var mask = $pj('cur');
var barleft = 0;
bar.onmousedown = function (event){
	var event = event || window.event;
	var leftVal = event.clientX - this.offsetLeft;
	//var that = this;
	document.onmousemove = function(event){
		var event = event || window.event;
		barleft = event.clientX - leftVal;
		if(barleft < 0)
			barleft = 0;
		else if (barleft > 493)
			barleft = 493;
		else if(barleft > scroll.offsetWidth - bar.offsetWidth)
			barleft = scroll.offsetWidth - bar.offsetWidth;

		mask.style.width = barleft + 'px';
		//这里的that取消，因为css里，进度条和点是清除浮动了的，用进度条去挤动点
		//that.style.left = barleft + 'px';
		audio.currentTime = (barleft/493)*music_list[currmusic].m_length;
		clearInterval(cur_timer);
		cur_timer = setInterval(autoCur, 1000);
		//防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	}
}
document.onmouseup = function(){
      document.onmousemove = null; //弹起鼠标不做任何操作
}

//拖动音量条
var v_scroll = $pj('vbg');
var v_bar = $pj('vbg').children[1];
var v_mask = $pj('vbg').children[0];
var bartop = 0;
v_bar.onmousedown = function(event){
	var event = event || window.event;
	//console.log(document.documentElement.clientHeight)  //屏幕的高度
	//console.log("event:"+ event.clientY)		//鼠标的高度
	//console.log("this"+ (93-this.offsetTop))		//
	var that = this;
	document.onmousemove = function(event){
		bartop = document.documentElement.clientHeight-event.clientY;
		bartop = bartop-55;
		if(bartop > 93)
			bartop = 93;
		else if(bartop < 0)
			bartop = 0;
		v_mask.style.height = bartop+'px';
		v_bar.style.bottom = bartop-12 +'px';
		audio.volume = bartop/93;
	}
}
function CollectPlay(userid){
	//收藏快捷栏这首歌,利用ajax
	//可定时当前播放歌曲的id
	var s = music_list[currmusic].img;
	var songid = s.replace("music/", "").replace(".png", "");
	var xmlHttp = createXMLHttp();
	var url = "collect?songid="+songid+"&userid="+userid;
	//true表示JavaScript脚本会在send()方法之后继续执行，而不会等待来自服务器的响应。
	xmlHttp.open("POST", url, true);
	//xmlHttp绑定回调方法，这个回调方法会在xmlHttp状态改变的时候会被调用 
	//xmlHttp的状态：0-4，我们只关心4(complete)这个状态，所以说当完成之后，再调用回调函数才有意义。
	xmlHttp.onreadystatechange = callback;
	//参数已经在url中了，不用在此处添加参数 
	xmlHttp.send(null);
}
/*
//获取xmlHttp对象
function createXMLHttp(){
	//大多数浏览器
	var xmlHttp;
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
	//兼容IE
	if(window.ActiveObject){
		xmlHttp = new ActiveObject("Microsoft.XMLHTTP");
		//如果浏览器有ActiveXObject对象，但没有Microsoft.XMLHTTP的参数 
   		if(!xmlHttp){ 
    		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); 
  		} 
	}
	return xmlHttp;
}
*/
/**
//回调函数
function callback(){
	//4表示完成
	if(xmlHttp.readyState == 4){
		//200代表服务器响应成功。404not found 500内部错误
		if(xmlHttp.status == 200){
			var result = xmlHttp.responseText;
			//解析获得的数据 
		    //获得这些数据之后，就可以动态的显示数据了。把这些数据展示到输入框下面。  
		}
	}
}
**/
