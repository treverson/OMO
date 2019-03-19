var contractAddress = "TCZjU4asaxYn1zNeXKLjYzn6zw7iwsDfUJ"; //1
var p3tBackendUrl = "https://api.p3t.network:6868";
// var axios = require('axios');
var whaleWarContract;
var userTokenBalance;
var account;
var prev_account;
var timeGrand = 0;
var timeDaily = 0;
var costKey = 0;
var time = { "day": '00', "hour": '00', "min": '00', "sec": '00' };
var timeDataDaily = { "day": '00', "hour": '00', "min": '00', "sec": '00' };
var tokenPriceIncremental_ = 0.0001;
var countReward = 0;

async function loadTronWeb(){
    if (typeof(window.tronWeb) === 'undefined') {
        setTimeout(loadTronWeb, 1000);
    } else {
        whaleWarContract = await tronWeb.contract().at(contractAddress);
        // setVanityLink();
        setTimeout(function(){
            startLoop();
            countNumberSpeak();
            setInterval(() => { 
  				    cdTimeGrand();
              cdTimeDaily();
			      },1000);
        },1000);
    }
}
function setVanityLink() {
  var listAddress = [];
  listAddress.push(getAccount());
  var data = { listAddress: listAddress, contractAdd: contractAddress };
   $.ajax({
          url: p3tBackendUrl + '/player/list',
          type: "GET",
          data: data,
          success: function (res) {
            if (res.code == 'SUCCESS') {
              var players = res.data;
              if (players && players.length > 0) {
                var vanityUrl = 'https://p3t.network/ww3#' + players[0][0].name;
                $('input[type=text][name=name_setting]').val(vanityUrl);
                $('input[type=text][name=name_setting]').attr("disabled", true);
                $('input[type=text][name=name_setting]').parents('#advisory').find('button').hide();
              }
            }
          }            
  });  
}
window.addEventListener("load", function() {
  loadTronWeb();

     $('.btn-setting-name').click(function() {
         buyWW3Vanity();
    });
     $('.sellect-daily-history').click(function() {
        var dailyRound = parseInt($(this).data('daily-round'));
        $(this).parents('.dropdown').find('button').html($(this).html());
        getDailyRoundByRoundId(dailyRound);
    });
    $('.buy-key-input').change(function() {
        var key = parseInt($(this).val());
        whaleWarContract.calPriceByKey(key).call().then(result => {
            costKey = sunToDisplay(parseInt(result));
            $('.cost-key-buy').val(costKey);
           
        }).catch((err) => {
                console.log(err);
        });
    });

  $('.buy-grand-key').click(function() {
    var trx = tronWeb.toSun(costKey);
    var ref = getCookie('ww3node').split(';')[0];
    if (!supportsLocalStorage()) {
      
    } else {
      ref = localStorage.getItem('ww3node');
    }
	if(tronWeb.isAddress(ref) === false) {
		ref = '';
		whaleWarContract.buy("TCZjU4asaxYn1zNeXKLjYzn6zw7iwsDfUJ").send({callValue: trx}).then(result => {
			$('.buy-key-input').val(1);
		}).catch((err) => {
		  console.log(err);
		});
	}
	else {
		whaleWarContract.buy(ref).send({callValue: trx}).then(result => {
			$('.buy-key-input').val(1);
		}).catch((err) => {
		  console.log(err);
		});
	}
  });
  $('.btn-withdraw-whale-war').click(function() {
    whaleWarContract.withdraw().send().then(result => {
      
    }).catch((err) => {
      console.log(err);
    });
  });
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function startLoop(){
    refreshData();
    setTimeout(startLoop, 3000);
}

function refreshData(){
  updateUserInformation();
}
function cdTimeGrand() {
        timeGrand = parseFloat(timeGrand);
        var now = ( new Date() ).getTime() / 1000;
        var cd = timeGrand - now;
        if ( cd > 0 ) time = getTimeCountDown(cd);
        var tiemDisplay = time.hour + " : " + time.min + " : " + time.sec;
        $('.grand-cd-time').html(tiemDisplay);
}
function cdTimeDaily() {
        timeDaily = parseFloat(timeDaily);
        var now = ( new Date() ).getTime() / 1000;
        var cd = timeDaily - now;
        if ( cd > 0 ) timeDataDaily = getTimeCountDown(cd);
        else timeDataDaily = { "day": '00', "hour": '00', "min": '00', "sec": '00' };
        var tiemDisplay = timeDataDaily.hour + " : " + timeDataDaily.min + " : " + timeDataDaily.sec;
        $('.daily-cd-time').html(tiemDisplay);
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
function getAccount () { 
    if (typeof(window.tronWeb) === 'undefined') return "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";
    return tronWeb.defaultAddress['base58']; 
}
function supportsLocalStorage() {
    return typeof(Storage)!== 'undefined';
} 
function countTotalReward() {
 // var oTop = $('.count-total-reward-speak').offset().top - window.innerHeight;
    if (countReward == 0) {
      $('.counter-grand-pot').each(function() {
        var $this = $(this);
        var countTo = parseInt($this.attr("data-pot"));
        $({
          countNum: countTo / 2
        }).animate({
          countNum: countTo
        },
        {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(numberWithCommas(this.countNum));
          }

          });
      });
      countReward = 1;
    }
}
function countNumberSpeak() {
   var a = 0;
  $(window).scroll(function() {
    var oTop = $('.count-number-speak').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $('.counter-balance-contract').each(function() {
        var $this = $(this),
        countTo = $this.attr("data-contract-balance");
        $({
          countNum: countTo / 2
        }).animate({
          countNum: countTo
        },
        {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(numberWithCommas(this.countNum));
          }

          });
      });
      $('.counter-total-key').each(function() {
        var $this = $(this),
        countTo = $this.attr("data-total-key");
        $({
          countNum: countTo / 2
        }).animate({
          countNum: countTo
        },
        {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(numberWithCommas(this.countNum));
              }

          });
      });
      $('.counter-distributed_reward').each(function() {
        var $this = $(this),
        countTo = $this.attr("data-total-reward");
        $({
          countNum: countTo / 2
        }).animate({
          countNum: countTo
        },
        {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(numberWithCommas(this.countNum));
          }

          });
      });
      a = 1;
    }
  });
}

function updateUserInformation() {
    

    tronWeb.trx.getBalance(getAccount()).then(result => {
      $('.player-balance').html(numberWithCommas(sunToDisplay(parseInt(result), 3)))
    }).catch(e => console.log(e));


    whaleWarContract.calPriceByKey(1).call().then(result => {
      var key = parseInt($('.buy-key-input').val());
	  if(sunToDisplay(parseInt(result), 3) != "0.01436") {
		$('.rate-buy-key').html(sunToDisplay(parseInt(result), 3));
	  }
      if (key == 1) {
        costKey = sunToDisplay(parseInt(result));
		if(costKey != "0.01436") {
			$('.cost-key-buy').val(costKey);
		}
      }  
    }).catch((err) => {
      console.log(err);
    });
    whaleWarContract.totalTronBalance().call().then(result => {
        var contractBalance = sunToDisplay(parseInt(result), 3);
        $('#contract-trx-balance').html(numberWithCommas(contractBalance));
    $('#contract-trx-balance').attr("data-contract-balance", contractBalance);
    }).catch((err) => {
        console.log(err);
    });
    whaleWarContract.totalSupply().call().then(result => {
        var contractTokenSupply = parseInt(result)/(Math.pow(10,18));
        $('#contract-token-balance').html(numberWithCommas(parseInt(Math.ceil(contractTokenSupply))));
    $('#contract-token-balance').attr("data-total-key", parseInt(contractTokenSupply));
    }).catch((err) => {
        console.log(err);
    });
  whaleWarContract.getDataGrand().call().then(result => {
    var _currentPot = sunToDisplay(parseInt(result._grandPot));
    timeGrand = parseInt(result._timeGrand);
    $('.grand-pot').html(numberWithCommas(parseInt(_currentPot)));
    $('.grand-pot').attr("data-pot", parseInt(_currentPot));
    $('#distributed-rewards').html(numberWithCommas(parseInt(formatTrxValue(_currentPot * 30 / 25))));
    $('#distributed-rewards').attr("data-total-reward", parseInt(formatTrxValue(_currentPot * 30 / 25)));

    $.ajax({url: "https://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD", success: function(trxRate){
        $('#grand-pot-usd-balance').html(parseFloat(parseFloat(parseInt(_currentPot)*trxRate.USD).toFixed(2)));
    }});



    var jackpotAddress = tronWeb.address.fromHex(result._keyHolder);
    $('.grand-jackpotowner').html(jackpotAddress);
    }).catch((err) => console.log(err));
    whaleWarContract.getDataPlayer().call().then(result => {
      

      var dividends = sunToDisplay(parseInt(result._dividends));
      var grandBonus = sunToDisplay(parseInt(result._grandBonus));
      var dailyBonus = sunToDisplay(parseInt(result._dailyBonus));
      var referralBonus = sunToDisplay(parseInt(result._referralBonus));
      var key = parseInt(result._token)/(Math.pow(10,18));

      dividends += grandBonus;
      dividends += dailyBonus;
      $('.player_ref').html(formatTrxValue(referralBonus) + ' TRX');
      $('.player_dividents').html(formatTrxValue(dividends, 3) + ' TRX');
      $('.player_daily_bonus').html(formatTrxValue(dailyBonus, 3) + ' TRX');
      // $('.player_grand_bonus').html(formatTrxValue(grandBonus));
      $('.player_key').html(numberWithCommas(parseInt(Math.ceil(key))) + ' KEYS');

      countTotalReward();
	  if(result.nameStatus) {
		  setVanityLink();
	  }
    });
     whaleWarContract.daily_round().call().then(result => {
      var currentRound = parseInt(result);
      $(".daily-current-round").attr("data-daily-round",currentRound);
      $(".daily-last-round").attr("data-daily-round",currentRound - 1);
      if (
        $('.btn-daily-history').html().trim() == 'Today'
        ) {
        getDailyRoundByRoundId(currentRound);
      }
    });

       $('#ref-url').val("https://p3t.network/ww3?ww3node="+tronWeb.defaultAddress['base58']);
}
function getDailyRoundByRoundId(roundID) {
  whaleWarContract.getDataDailyByRound(roundID).call().then(result => {
        timeDaily = parseInt(result._timeDaily);
        var pot = sunToDisplay(parseInt(result.pot));

        $('.daily-pot').html(numberWithCommas(parseInt(pot*0.2)));
        // $('input[type=hidden][name=daily_round]').val(roundID);

        var top1 = tronWeb.address.fromHex(result.top1);
        var top2 = tronWeb.address.fromHex(result.top2);
        var top3 = tronWeb.address.fromHex(result.top3);
        var top4 = tronWeb.address.fromHex(result.top4);
        var top5 = tronWeb.address.fromHex(result.top5);
        var top6 = tronWeb.address.fromHex(result.top6);
        var top7 = tronWeb.address.fromHex(result.top7);
        var top8 = tronWeb.address.fromHex(result.top8);
        var top9 = tronWeb.address.fromHex(result.top9);
        var top10 = tronWeb.address.fromHex(result.top10);
        var percentBonus = [30, 20, 10,8,7,5,5,5,5,5];
        var listAddress = [];
        listAddress.push(top1);
        listAddress.push(top2);
        listAddress.push(top3);
        listAddress.push(top4);
        listAddress.push(top5);
        listAddress.push(top6);
        listAddress.push(top7);
        listAddress.push(top8);
        listAddress.push(top9);
        listAddress.push(top10);
        if (getCookie('players').split(';')[0]) {
          var players = JSON.parse(atob(getCookie('players').split(';')[0]));
          updateDailyRank(players);
        } else {
          getPlayers();
        }
        function getPlayers() {

           $.ajax({
            url: p3tBackendUrl + '/player/list',
            type: "GET",
            data: { listAddress: listAddress },
            success: function (res) {
              if (res.code == 'SUCCESS') {
                var players = res.data[0];
                setPlayersToCookie(players);
                updateDailyRank(players);
              }
            }            
          });
        }
        function updateDailyRank(players) {
          for (var idx = 0; idx < 10; idx++) {
            var top = idx + 1;
            var topKey = 'top' + top;
            var address = tronWeb.address.fromHex(result[topKey]);
            setDailyRank(address, topKey, idx);
          }
          function setDailyRank(address, topKey, idx) {
            whaleWarContract.players(address).call().then(result => {
              if (result.nameStatus) address = getWW3PlayerName(players, address);
              if (address == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb') address = '0000000000000000000000000000000000000';
              $('.round-rank').find('.' + topKey).find('.address').html(address);
              $('.round-rank').find('.' + topKey).find('.daily-insert').html( numberWithCommas(formatTrxValue( pot * 0.2 * percentBonus[idx] / 100, 3 )) );
            }).catch(e => console.log(e))
          }
        }
  }).catch(e => console.log(e));
  // internal function
  function getWW3PlayerName(players, address) {
          var name = address;
          for(var idx = 0; idx < players.length; idx++) {
            if (address == players[idx].address) {
              name = players[idx].name;
              break;
            }
          }
          return name;
  }
  function setPlayersToCookie(players) {
    var date = new Date();
    date.setTime(date.getTime()+(1*60*60*1000)); // 1*60*60*1000 : 1hours
    var toSet = "players=" + btoa(JSON.stringify(players));
    if (players) {
        document.cookie=toSet+"; expires="+date.toGMTString();
    }
  }
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
function buyWW3Vanity() {
  var data = { address: getAccount(), name: $('input[type=text][name=name_setting]').val() };
  $.ajax({
    url: p3tBackendUrl + '/player/save',
    type: "POST",
    data: data,
    success: function (res) {
      // console.log(res);
      var err = '';
      if (res.code != 'SUCCESS') {
        err = res.message ? res.message : '';
      }
      $('.setting-name-error').html(err);
      if (res.code == 'SUCCESS') {
        whaleWarContract.buyVanity().send({callValue: tronWeb.toSun(100)});
        // setVanityLink();
      }
    }            
  });  
}
function checkwallet() {
  var wallet = $("#thewallet").val();
  
  if (wallet.length == 34) {
    for (i=1;i<=4;i++) {
      $(".f"+i).show();
    }   
    account = wallet;
    localStorage.setItem('wallet', account);
  } else 
    account = 0;
    
}

function sunToDisplay(trxprice, _toFixed = 5){
    return formatTrxValue(tronWeb.fromSun(trxprice), _toFixed)
}
function formatTrxValue(trxstr, _toFixed = 5){
    return parseFloat(parseFloat(trxstr).toFixed(_toFixed));
    // return getCommaSeparatedTwoDecimalsNumber(trxstr, _toFixed);
}
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function translateQuantity(quantity,precision){
    quantity=Number(quantity)
    finalquantity=quantity
    modifier=''
    if(precision == undefined){
        precision=0
    }
  if(quantity<1000000){
    precision=0
  } 
    
    if(quantity>1000000){
        modifier='M'
        finalquantity=quantity/1000000
    }
    if(quantity>1000000000){
        modifier='B'
        finalquantity=quantity/1000000000
    }
    if(quantity>1000000000000){
        modifier='T'
        finalquantity=quantity/1000000000000
    }
    if(precision==0){
        finalquantity=Math.floor(finalquantity)
    }
    return finalquantity.toFixed(precision)+modifier;
}