// JavaScript Document
/*
var jquery = require('./jquery.js');
var modernizer = require('./modernizrv2.7.1.js');
var overthrow = require('./overthrow.js');
var uislider = require('./uislider.js');
*/
/////////
////////
/////////
////////

$(document).ready(function() {
	
	var initialWindowWidth = $(window).width()*.6;
	var $showNav = $('.toggle-nav');
	var $nextSlide = $('.next-slide');
	var $prevSlide = $('.prev-slide');
	var $imageStrip = $('.imagestrip');
	var $imageStripImg = $('.imagestrip img');
	var $controlplay = $('#controlplay');
	var $controlpause = $('#controlpause').hide();
	var $controlmute = $('#controlmute');
	var $controlunmute = $('#controlunmute').hide();
	var $duration_text = $('.duration_text');
	var $releaseDescription = $('.releasedescription');
	var $audio = $('audio');
	
	var isFirstRun = true;
	var currentDuration;
	var currentReleaseItem = 0;
	var selectedPlaylist =0;
	var showPrev = false;
	var showNext = true;
	var audioPlayer=$('#audioplayer');
	//the current track playing in a release
	var currentTrack = 0;
	//determines if the next track in a release should begin when current track ends
	var shouldPlayNext = true ;
	//init next rollover
	$nextSlide.addClass('status-enabled');
	
	/*
	*** Environment Detection
	*/
	
	//detect android
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; 
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		isIOS=true;
	}else{
		isIOS=false;
	}
	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
	var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
	var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
	if ((is_chrome)&&(is_safari)) {is_safari=false;}
	
	//detect desktop
		(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|	compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
	
	// if desktop load files to allow file upload
	if(!jQuery.browser.mobile){
		loadjscssfile("myscript.js", "js") //dynamically load and add this .js file
		loadjscssfile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file
		loadjscssfile("mystyle.css", "css") ////dynamically load and add this .css file
	
	}
	
	
	/*
	*** set up the audio scruber #slider
	*/
	
	$(function() {
		$( "#slider" ).slider({
			animate:false,
			range: "min",
			value:1,
			min: 1,
			max: 200,
			slide: function( event, ui ) {
				//$( "#amount" ).val( "$" + ui.value );
				console.log('slide= '+ui.value);
				audioPlayer[0].currentTime =  (audioPlayer[0].duration / (200 /ui.value));
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
	});
	
	/*
	*** create a playlist array containing release objects with a track array with track objects
	*/
	
	var playlist =[];
	$.get('data/playlist.xml',{},function(xml){
		
		$('release',xml).each(function(i) {
			//releaseName = $(this).find('release');
			var releaseObj={};
			releaseObj.title=$(this).attr('title');
			releaseObj.artist=$(this).attr('artist');
			releaseObj.catalog=$(this).attr('catalog');
			releaseObj.date=$(this).attr('date');
			releaseObj.googleLink=$(this).attr('googleplay');
			releaseObj.itunesLink=$(this).attr('iTunes');
			releaseObj.beatportLink=$(this).attr('beatport');
			releaseObj.description=$(this).attr('description');
			releaseObj.tracks=[];
			
			$($(this).children(),xml).each(function(t) {
				var trackObj={};
				trackObj.title=$(this).attr('title');
				trackObj.source=$(this).attr('source');
				trackObj.artist=$(this).attr('artist');
				releaseObj.tracks.push(trackObj);
			});
			
			playlist.push(releaseObj);
			
		});
		//start playlist with latest release//
		
		makePlaylist(selectedPlaylist);
	});		
	//////////////////////////////////////////////////////////
	
	
	function makePlaylist(currentRelease){
		//remove old li
		
		$('.tracklist ul li').remove();
		//$('.tracklist ul li').remove();
		
		//create playlist
		for(var i in playlist[currentRelease].tracks){	
			$('.tracklist ul').append("<li><a href='#'>"+playlist[currentRelease].tracks[i].artist+" - "+playlist[currentRelease].tracks[i].title+"</a></li>");
				
		}
		// make default trackbackground color
		$('.tracklist ul li').addClass('notselectedtrack');
		
		$audio.append("<source id='ogg_src' src='audio/"+ playlist[currentRelease].catalog + "/" + playlist[currentRelease].tracks[0].source+".ogg' type='audio/ogg'>");
		$audio.append("<source id='mp3_src' src='audio/"+ playlist[currentRelease].catalog + "/" + playlist[currentRelease].tracks[0].source+".mp3' type='audio/mpeg'>");
		
		
		
		
		$('.tracklist ul li').click(function() {
		
			var index =$('.tracklist ul li').index(this);
			
			// revert trackbackground color to not select
			for(i=0;i< $('.tracklist ul li').size();i++){
				$('.tracklist ul li').removeClass('selectedtrack');
			}
			// set selected trackbackground color
			$(this).addClass('selectedtrack');
			currentTrack = index;
			var newTrack = 'audio/'+ playlist[currentRelease].catalog + "/" + playlist[currentRelease].tracks[currentTrack].source;
			changeTrack(newTrack);
			
		});
		//remove last release description
		$releaseDescription.find('h1').remove();
		$releaseDescription.find('h2').remove();
		$releaseDescription.find('p').remove();
		
		
		//add new release description
		
		
		$releaseDescription.append('<h2>'+playlist[currentRelease].title+'<span class="by_text">  by</span></h2>');
		$releaseDescription.append('<h1><span class="yellow_text">'+playlist[currentRelease].artist+'</span></h1>');
		
		$releaseDescription.append('<h2>'+playlist[currentRelease].catalog+' released: '+playlist[currentRelease].date+'</h2>');
		$releaseDescription.append('<div class="underholder"><p>'+playlist[currentRelease].description+'</p></div>');
		
		
		
		$('.googlebuy').remove();
		$('.itunesbuy').remove();
		$('.beatportbuy').remove();
		console.log('is droid: ' + isAndroid);
		console.log('is iOS: ' + isIOS);
		if(isAndroid) {
			$releaseDescription.append("<div class='googlebuy'></div>");
			$('.googlebuy').click(function(){
				window.location.href = playlist[currentRelease].googleLink;
			});
		}else if(isIOS){
			$releaseDescription.append("<div class='itunesbuy'></div>");
			$('.itunesbuy').click(function(){
				window.location.href = playlist[currentRelease].itunesLink;
			});
		}else{
			
			$releaseDescription.append("<div class='beatportbuy'></div>");
			$('.beatportbuy').click(function(){
				window.location.href = playlist[currentRelease].beatportLink;
			});
		}
	};
	
	audioPlayer.on('ended',function(){
		
		if(currentTrack +1  < playlist[currentReleaseItem].tracks.length && shouldPlayNext){
			currentTrack += 1;
			// revert trackbackground color to not select
			for(i=0;i< $('.tracklist ul li').size();i++){
				$('.tracklist ul li').removeClass('selectedtrack');
			}
			// set selected trackbackground color
		
			nchild = currentTrack+1;
			$('.tracklist ul li:nth-child('+nchild+')').addClass('selectedtrack');
			
			var newTrack = 'audio/'+ playlist[currentReleaseItem].catalog + "/" + playlist[currentReleaseItem].tracks[currentTrack].source;
			changeTrack(newTrack);
		}
		
	});
	
	function getMinutesStr(seconds){
		var roundedDurationSeconds = Math.round(seconds);
		var durationMin = roundedDurationSeconds / 60>>0;
		var remainingSec =roundedDurationSeconds % 60;
		if(remainingSec < 10){
			return durationMin+":0"+ remainingSec;
		}
		else
		{
			return durationMin+":"+ remainingSec;
		}
	}
	
	$controlplay.on('click', function(e) {
		if(isFirstRun){
			isFirstRun = false;
			$( "#slider" ).slider( "option", "disabled", false);
			var newTrack = 'audio/'+ playlist[0].catalog + "/" + playlist[0].tracks[0].source;
			$('.tracklist ul li:nth-child(1)').addClass('selectedtrack');
			changeTrack(newTrack);
		}
		else
		{
		audioPlayer[0].play();
        $controlplay.hide();
        $controlpause.show();
		}
	})
	
	$controlpause.on('click',function(e) {
		
		audioPlayer[0].pause();
        $controlpause.hide();
        $controlplay.show();
	})
	
	$controlmute.on('click', function(e) {
		
		audioPlayer[0].volume =0;
        $controlmute.hide();
        $controlunmute.show();
	})
	$controlunmute.on('click',function(e) {
		audioPlayer[0].volume =1;
        $controlunmute.hide();
        $controlmute.show();
	})
	
	function changeTrack(sourceUrl){
		if(isFirstRun){
			isFirstRun = false;
			$( "#slider" ).slider( "option", "disabled", false);
		}
		$controlplay.hide();
        $controlpause.show();
		var mp3Src = sourceUrl + ".mp3";
		var oggSrc = sourceUrl + ".ogg";
		$('#ogg_src').attr('src',oggSrc);
		$('#mp3_src').attr('src',mp3Src);
		audioPlayer[0].pause();
		audioPlayer[0].load();
		audioPlayer[0].addEventListener('timeupdate',function (){
			$('.playtime_text').remove();
			$('a.ui-slider-handle').append('<div class ="playtime_text">'+getMinutesStr(audioPlayer[0].currentTime)+'</div>');
			
			progressPercent = 200 * (audioPlayer[0].currentTime/audioPlayer[0].duration);
			$( "#slider" ).slider( "option", "value", progressPercent );
		});
		// wait a moment to avoid racing condition
		setTimeout(function(){
			audioPlayer[0].play();
			$('.dur').remove();
			$duration_text.append('<div class="dur">' + getMinutesStr(audioPlayer[0].duration) + '</div>');
		},2000);
	};
	
	$showNav.click(function(event) {
    	event.preventDefault();
    	$('nav').toggleClass('active');
	});
	
	$nextSlide.click(function(){
		if(currentReleaseItem < 8){
			changeImage(1);
		}
	});
	
	$prevSlide.click(function(){
		if(currentReleaseItem > 0){
			changeImage(-1);
		}
	});
	
	function changeImage(direction){
		
			currentReleaseItem += direction;
		
			makePlaylist(currentReleaseItem);
			//handle opacity of previous and next buttons as well as enable rollovers
			if(!showPrev && currentReleaseItem > 0){
				showPrev = true;
				$prevSlide.addClass('status-enabled');
				$prevSlide.css('opacity',.7);
			}
			
			if(showPrev && currentReleaseItem < 1){
				showPrev = false;
				$prevSlide.removeClass('status-enabled');
				$prevSlide.css('opacity',.3);
			}

			if(showNext && currentReleaseItem > 7){
				showNext = false;
				$nextSlide.removeClass('status-enabled');
				$nextSlide.css('opacity',.3);
			}
			
			if(!showNext && currentReleaseItem < 8){
				showNext = true;
				$nextSlide.addClass('status-enabled');
				$nextSlide.css('opacity',.7);
			}			
			
			var newX = -$imageStrip.height() * currentReleaseItem;
			$imageStrip.css('background-position', newX+'px 0');
	};
	
	
	/*
	*** get scroll position and change menu selection
	*/
	
	$( "#holder" ).scroll(function() {
		
		var offset = $('.homeholder').offset();
        var w = $(window);
		var scrollY = offset.top-w.scrollTop();
		var top_pixel = $('.headholder').height();
		var top_releases = top_pixel - $('.homeholder').height();
		var top_social = top_releases - $('.release_descriptionholder').height();
		var top_merch = top_social - $('.socialholder').height();
		var top_contact = top_merch - $('.merchholder').height();
		var modifier = 20;
		
		if(scrollY > top_releases + modifier){
			$('nav ul li:nth-child(2)').removeClass('selectednav');
			$('nav ul li:nth-child(3)').removeClass('selectednav');
			$('nav ul li:nth-child(4)').removeClass('selectednav');
			$('nav ul li:nth-child(5)').removeClass('selectednav');
			$('nav ul li:nth-child(1)').addClass('selectednav');
		}else if(scrollY >top_social + modifier){
			$('nav ul li:nth-child(1)').removeClass('selectednav');
			$('nav ul li:nth-child(3)').removeClass('selectednav');
			$('nav ul li:nth-child(4)').removeClass('selectednav');
			$('nav ul li:nth-child(5)').removeClass('selectednav');
			$('nav ul li:nth-child(2)').addClass('selectednav');
		}else if(scrollY >top_merch + modifier){
			$('nav ul li:nth-child(1)').removeClass('selectednav');
			$('nav ul li:nth-child(2)').removeClass('selectednav');
			$('nav ul li:nth-child(4)').removeClass('selectednav');
			$('nav ul li:nth-child(5)').removeClass('selectednav');
			$('nav ul li:nth-child(3)').addClass('selectednav');
		}else if(scrollY >top_contact + modifier){
			$('nav ul li:nth-child(1)').removeClass('selectednav');
			$('nav ul li:nth-child(2)').removeClass('selectednav');
			$('nav ul li:nth-child(3)').removeClass('selectednav');
			$('nav ul li:nth-child(5)').removeClass('selectednav');
			$('nav ul li:nth-child(4)').addClass('selectednav');
		}else{
			$('nav ul li:nth-child(1)').removeClass('selectednav');
			$('nav ul li:nth-child(2)').removeClass('selectednav');
			$('nav ul li:nth-child(3)').removeClass('selectednav');
			$('nav ul li:nth-child(4)').removeClass('selectednav');
			$('nav ul li:nth-child(5)').addClass('selectednav');
		}
		
		
	});
	
	/*
	*** dynamically load css / php / js
	*/
	
	function loadjscssfile(filename, filetype){
 		if (filetype=="js"){ //if filename is a external JavaScript file
  			var fileref=document.createElement('script')
  			fileref.setAttribute("type","text/javascript")
  			fileref.setAttribute("src", filename)
 		}
 		else if (filetype=="css"){ //if filename is an external CSS file
 			var fileref=document.createElement("link")
  			fileref.setAttribute("rel", "stylesheet")
  			fileref.setAttribute("type", "text/css")
  			fileref.setAttribute("href", filename)
 		}
 		if (typeof fileref!="undefined")
 			document.getElementsByTagName("head")[0].appendChild(fileref)
		}
	

	

	
	/*
	***
	*/
	
	setTimeout(function(){
		$('header h1').css('opacity',1);
		$('header').css('opacity',1);
		
		$imageStripImg.css('opacity', 1);
		
		//fix for scale on android 2.3//
		if($(window).width() === 427)
		{
			//insert message here
		};
		
		if($(window).width() > 800){
			if(is_safari){
				$('.merchcontent').css('display','none');
				$('.merchstatic').css('display','block');
			}
		}
		
		$imageStripImg.css("height", $(window).width()*.6);
		
		$('a.ui-slider-handle').append('<div class ="playtime_text">0:00</div>');
	},1000);
	
	$( window ).resize(function() {
		//fix for scale on android 2.3//
		var newX = -$imageStrip.height() * currentReleaseItem;
		$imageStrip.css('background-position', newX+'px 0');
		
		if($(window).width()<801 & !is_safari){
			
			$('.merchstatic').css('display','inline-block');
			$('.merchcontent').css('display','none');
		}
		
		if($(window).width()>800 & !is_safari){
			
			$('.merchstatic').css('display','none');
			$('.merchcontent').css('display','block');
		}
	});
});

