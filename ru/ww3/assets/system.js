var contractAddress = "TCZjU4asaxYn1zNeXKLjYzn6zw7iwsDfUJ"; //1
var dateLanding = 1552932000000;
var timeLanding = { "day": '00', "hour": '00', "min": '00', "sec": '00' };
var url_string = window.location.href;
var url = new URL(url_string);
var p3tBackendUrl = "https://api.p3t.network:6868";

window.addEventListener("load", function() {
	new ClipboardJS('#copy-ref-button');
	$('#copy-ref-button').click(function() {
		setTimeout(function(){
			$('#copy-ref-button').popover('hide')
        },1500);
	});
	$('[data-toggle="popover"]').popover();
	setInterval(() => { 
       cdTimeLanding();
	},1000);
   
  setWW3node(url.searchParams.get("ww3node"));
  if (window.location.hash.substr(1) && window.location.hash.substr(1) != '') {
    setWW3nodeByVanity();
  }
});	
function setWW3nodeByVanity() {
    getPlayer();
    function getPlayer() {
      $.ajax({
        url: p3tBackendUrl + '/player/get-by-name',
        type: "GET",
        data: { name: window.location.hash.substr(1), contractAdd: contractAddress },
        success: function (res) {
          if (res.code == 'SUCCESS' && res.data.player) {
            var player = res.data.player;
			var theCookie = "ww3node=" + player.address;
            // Run the support check
			if (!supportsLocalStorage()) {
			  // No HTML5 localStorage Support
			  document.cookie=theCookie;
			} else {
			  // HTML5 localStorage Support JSON.stringify(user));
			  localStorage.setItem('ww3node', player.address);
			}
          }
        }            
      });
    }
  }
 function setWW3node(ref) {
    var theCookie = "ww3node=" + ref;

    if (url.searchParams.get("ww3node") !== null) {
        // Run the support check
        if (!supportsLocalStorage()) {
          // No HTML5 localStorage Support
          document.cookie=theCookie;
        } else {
          // HTML5 localStorage Support JSON.stringify(user));
          localStorage.setItem('ww3node', ref);
        }
    }
  }
function supportsLocalStorage() {
    return typeof(Storage)!== 'undefined';
} 
function getCookie(name) {
          var dc = document.cookie;
          var prefix = name + "=";
          var begin = dc.indexOf("; " + prefix);

          if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return "";
          }
          else
          {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
          }

          return decodeURI(dc.substring(begin + prefix.length, end));
  }
function cdTimeLanding() {
      var timeEndLanding = (new Date(dateLanding)).getTime() / 1000;
      var now = ( new Date() ).getTime() / 1000;
      var cd = timeEndLanding - now;
      if ( cd > 0 ) timeLanding = getTimeCountDown(cd);
      $('.landing-cd-time').find('.day').html(timeLanding.day);
      $('.landing-cd-time').find('.hour').html(timeLanding.hour);
      $('.landing-cd-time').find('.min').html(timeLanding.min);
      $('.landing-cd-time').find('.sec').html(timeLanding.sec);
}
function getTimeCountDown( time ) {
      return {
        "day": dealNum(time / (24 * 60 * 60)),
        "hour": dealNum((time % (24 * 60 * 60)) / (60 * 60)),
        "min": dealNum((time % (60 * 60)) / 60),
        "sec": dealNum(time % 60)
      };
}
function dealNum (val) {
      var str = Math.floor(val)
      return (str < 10 ? '0' : '') + str
 }