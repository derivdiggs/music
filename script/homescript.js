// JavaScript Document
$( window ).resize(function() {
	if($(window).width() < 480)
	{
		$('.multi').css('left',0);
		$('.music').css('left',0);
	}
	else
	{
		$('.multi').css('opacity', .5);
		$('.music').css('opacity', 1);
		$('.multi').css('left',20);
		$('.music').css('left', $('.holder').width() - 220);
	}
});

$(document).ready(function() {
	
	setTimeout(function(){
		$('.mainimage').css('opacity',1);
		if($(window).width() > 481){
			setTimeout(function(){
				$('.multi').css('left', 20);
				$('.multi').css('opacity', .5);
				$('.music').css('left', $('.holder').width() - 220);
				$('.music').css('opacity', 1);
			},1000);
		}
	},100);
});