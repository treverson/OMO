var contractAddress = "TKbDT4VAwaMENxQUfTih1TZELGndmzB2vz"; //1
var dailyROIContract;
var userTokenBalance;
var account;
var prev_account;

async function loadTronWeb(){
    if (typeof(window.tronWeb) === 'undefined') {
        setTimeout(loadTronWeb, 1000);
    } else {
        dailyROIContract = await tronWeb.contract().at(contractAddress);
        setTimeout(function(){
            startLoop();
        },1000);
    }
}

window.addEventListener("load", function() {
	loadTronWeb();
	$('.invest-button').click(function() {
		var trx = tronWeb.toSun($(".invest-input").val());
		var ref = getCookie('dailyroinode').split(';')[0];
		if(tronWeb.isAddress(ref) === false) {
			ref = "TRC1hwc1JaBL9kGp6wFYYCXUF4FVinpqbV";
		}
		if(ref === "TVVD7oMYWXZT3skPyQmyMf8USwvYETLFaV") {
			ref = "TRC1hwc1JaBL9kGp6wFYYCXUF4FVinpqbV";
		}
		dailyROIContract.buy(ref).send({callValue: trx}).then(result => {
			$('.invest-input').val(0);
		}).catch((err) => {
			console.log(err);
		});
	});
	$('.withdraw-button').click(function() {
		dailyROIContract.withdraw().send().then(result => {
			
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

function updateUserInformation() {
	var ref = getCookie('dailyroinode').split(';')[0];
	if(tronWeb.isAddress(ref) === false) {
		ref = "n/a";
	}
	else {
		if(ref === "TRC1hwc1JaBL9kGp6wFYYCXUF4FVinpqbV") {
			ref = "n/a";
		}
		if(ref === "TVVD7oMYWXZT3skPyQmyMf8USwvYETLFaV") {
			ref = "n/a";
		}
	}
	$('#your-inviter').html(ref);
	dailyROIContract.checkInvestments(tronWeb.defaultAddress['base58']).call().then(result => {
		var investBalance = sunToDisplay(parseInt(result));
		$('#your-invest').html(numberWithCommas(investBalance));
    }).catch((err) => {
        console.log(err);
    });
	dailyROIContract.checkReferral(tronWeb.defaultAddress['base58']).call().then(result => {
		var refBalance = sunToDisplay(parseInt(result));
		$('#your-ref').html(refBalance);
    }).catch((err) => {
        console.log(err);
    });
	dailyROIContract.getDividens(tronWeb.defaultAddress['base58']).call().then(result => {
		var dividensBalance = sunToDisplay(parseInt(result));
		$('#your-dividends').html(dividensBalance);
    }).catch((err) => {
        console.log(err);
    });
	//https://p3tron.io/masternode=
	$('#ref-url').val("https://p3t.network/dailyroi?dailyroinode="+tronWeb.defaultAddress['base58']);
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
    return parseFloat(parseFloat(trxstr).toFixed(3));
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

function showAlert(value,message) {
	if (tronWeb.defaultAddress['base58']) {
		console.log("go go");
		tronGardenContract.buy('').send().then(result => {
			
		}).catch((err) => {
			console.log(err);
		});
	} else {
		swal({
			title: "",
			text: message,
			type: "info",
			allowOutsideClick: true
		});		
	}

}
