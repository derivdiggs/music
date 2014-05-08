var iwin;
var url = '';
var hash = '';
var frame = 'http://www.dizzyjam.com/embed/thoughtrender/';

if(location.hash.replace(/(.*)#/, '').match(/cancel/))
	url = 'error/';
if(location.hash.replace(/(.*)#/, '').match(/confirmation/))
	url = 'confirmation/';

document.write('<iframe id="dizzyjam-iframe" src="http://www.dizzyjam.com/embed/'+ url + 'thoughtrender/" onload="init();" width="700" height="1" border="0" frameborder="0" scrolling="no" allowtransparency="true"><p>Your browser does not support iframes.</p></iframe> ');

if (window.addEventListener) {  // all browsers except IE before version 9
	window.addEventListener ("message", receiveMessage, false);
} else {
	if (window.attachEvent) {   // IE before version 9
		window.attachEvent("onmessage", receiveMessage);     // Internet Explorer from version 8
	}
}

function init() {
	if(navigator.userAgent.indexOf("Safari") != -1) {
		iwin = frames["dizzyjam-iframe"];
	} else {
		iwin = window.frames[0];
	}

	try {
		iwin.postMessage('getHeight', "*");
	} catch(err) {
		// Browser not supporting postMessage method
		if(frame) {
			iwin.location = frame + '#getHeight|' + document.location.toString().replace(/#(.*)/, '');
			frame = false;

			setInterval(checkForMessages, 200);
		}
	}

}

function receiveMessage(event) {
	if(event.data.match(/setHeight:/ig))
		document.getElementById('dizzyjam-iframe').height = event.data.replace(/\D*/, '');
	if(event.data.match(/getLocation:/ig)) {
		iwin.postMessage('setLocation:' + document.location.toString().replace(/#(.*)/, ''), "*");
	}

	return;
}

// For IE 7 and other not modern browsers
function checkForMessages() {
	if(location.hash != hash) {
		hash = location.hash;
		if(location.hash.replace(/(.*)#/, '').match(/setHeight\|/)) {
			var data = location.hash.split('|');

			document.getElementById('dizzyjam-iframe').height = data[1].replace(/\D*/, '');
		}
	}
	location.hash = hash = '#dizzyjam-iframe';
}