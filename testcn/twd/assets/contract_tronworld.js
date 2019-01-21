var contractAddress = "TWnyj5NZc3L96qw8szRZ1fEAv1cnvXunCs"; //1
var tronconquestContract;
var userTokenBalance;
var account;
var prev_account;
var timeleft = 0;
var time = { "day": '00', "hour": '00', "min": '00', "sec": '00' };

async function loadTronWeb(){
    if (typeof(window.tronWeb) === 'undefined') {
        setTimeout(loadTronWeb, 1000);
    } else {
        tronconquestContract = await tronWeb.contract().at(contractAddress);
        setTimeout(function(){
            startLoop();
            setInterval(() => { 
		        cdTime();
		    },1000);
        },1000);
    }
}

window.addEventListener("load", function() {
	loadTronWeb();
	$('.country-container').click(function() {
		var trx = tronWeb.toSun(($(this).find('.conquest-price').text()));
		var tronconquestId = parseInt($(this).data('tronconquest-id'));
		tronconquestContract.buy(tronconquestId).send({callValue: trx}).then(result => {
		}).catch((err) => {
			console.log(err);
		});
	});
    $('.region-container').click(function() {
        var trx = tronWeb.toSun(($(this).find('.region-price').text()));
        // console.log(trx);
        var regionId = parseInt($(this).data('region-id'));
        console.log(regionId);
        tronconquestContract.buyRegion(regionId).send({callValue: trx}).then(result => {
        }).catch((err) => {
            console.log(err);
        });
    });
	// $('.withdraw-button').click(function() {
	// 	tronconquestContract.withdraw().send().then(result => {
			
	// 	}).catch((err) => {
	// 		console.log(err);
	// 	});
	// });
});	

function startLoop(){
    refreshData();
    setTimeout(startLoop, 3000);
}

function refreshData(){
	updateUserInformation();
}
function cdTime() {
        timeleft = parseFloat(timeleft);
        let now = ( new Date() ).getTime() / 1000;
        let cd = timeleft - now;
        if ( cd > 0 ) time = getTimeCountDown(cd);
        let tiemDisplay = time.hour + " : " + time.min + " : " + time.sec;
        $('.tronconquest-cd-time').html(tiemDisplay);
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
      let str = Math.floor(val)
      return (str < 10 ? '0' : '') + str
 }

function updateUserInformation() {
	tronconquestContract.getData().call().then(result => {
		let _currentPot = sunToDisplay(parseInt(result._currentPot));
		timeleft = parseInt(result._timeleft);
		$('.tronconquest-pot').html(_currentPot);
		let jackpotAddress = tronWeb.address.fromHex(result._lastplayer);
		$('.tronconquest-jackpotowner').html("Current Jackpot Winner: "+jackpotAddress);
    }).catch((err) => {
        console.log(err);
    });
	for (let i = 0; i < 108; i++) {
		tronconquestContract.getCountryInfo(i).call().then(countryInfo => {
			let countryId = parseInt(countryInfo._id);
			let countryPrice = sunToDisplay(parseInt(countryInfo.price));
			let ownerAddress = tronWeb.address.fromHex(countryInfo.countryOwner);
			$(".country-"+countryId).find(".conquest-price").html(countryPrice);
			if(ownerAddress == tronWeb.defaultAddress['base58']) {
				$(".country-"+countryId).find(".conquest-owner").html("You").css("color", "#4bc071");
				$(".country-"+countryId).css("border", "1px #4bc071 solid");
				$(".country-"+countryId).find(".owned").show();
				$(".country-"+countryId).find(".country-flag").css("opacity", 1);
			}
			else {
				$(".country-"+countryId).find(".conquest-owner").html(ownerAddress).css("color", "");
				$(".country-"+countryId).css("border", "1px grey solid");
				$(".country-"+countryId).find(".owned").hide();
				$(".country-"+countryId).find(".country-flag").css("opacity", 0.1);
			}
		}).catch((err) => {
			console.log(err);
		});
	}
    for (let i = 0; i < 7; i++) {
        updateRegion(i);
    }
    function updateRegion(idx) {
		tronconquestContract.getRegionInfo(idx).call().then(regionInfo => {
            let regionPrice = sunToDisplay(parseInt(regionInfo.regionPrice));
            let regionOwner = tronWeb.address.fromHex(regionInfo.regionOwner);
            $(".region-"+idx).find(".region-price").html(regionPrice);
            if(regionOwner == tronWeb.defaultAddress['base58']) {
                $(".region-"+idx).find(".region-owner").html("You").css("color", "#4bc071");
				$(".region-"+idx).css("border", "1px #4bc071 solid");
				$(".region-"+idx).find(".owned").show();
            }
            else {
                $(".region-"+idx).find(".region-owner").html(regionOwner).css("color", "");
				$(".region-"+idx).css("border", "1px grey solid");
				$(".region-"+idx).find(".owned").hide();
            }
        }).catch((err) => {
            console.log(err);
        });
    }
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

function sunToDisplay(trxprice){
    return formatTrxValue(tronWeb.fromSun(trxprice))
}
function formatTrxValue(trxstr){
    return parseFloat(parseFloat(trxstr).toFixed(5));
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