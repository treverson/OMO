var _0xdf26=["\x54\x4B\x62\x44\x54\x34\x56\x41\x77\x61\x4D\x45\x4E\x78\x51\x55\x66\x54\x69\x68\x31\x54\x5A\x45\x4C\x47\x6E\x64\x6D\x7A\x42\x32\x76\x7A","\x74\x72\x6F\x6E\x57\x65\x62","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x61\x74","\x63\x6F\x6E\x74\x72\x61\x63\x74","\x6C\x6F\x61\x64","\x76\x61\x6C","\x2E\x69\x6E\x76\x65\x73\x74\x2D\x69\x6E\x70\x75\x74","\x74\x6F\x53\x75\x6E","\x3B","\x73\x70\x6C\x69\x74","\x64\x61\x69\x6C\x79\x72\x6F\x69\x6E\x6F\x64\x65","\x69\x73\x41\x64\x64\x72\x65\x73\x73","\x63\x6F\x6F\x6B\x69\x65","\x64\x61\x69\x6C\x79\x72\x6F\x69\x6E\x6F\x64\x65\x3D\x54\x52\x43\x31\x68\x77\x63\x31\x4A\x61\x42\x4C\x39\x6B\x47\x70\x36\x77\x46\x59\x59\x43\x58\x55\x46\x34\x46\x56\x69\x6E\x70\x71\x62\x56","\x54\x52\x43\x31\x68\x77\x63\x31\x4A\x61\x42\x4C\x39\x6B\x47\x70\x36\x77\x46\x59\x59\x43\x58\x55\x46\x34\x46\x56\x69\x6E\x70\x71\x62\x56","\x54\x56\x56\x44\x37\x6F\x4D\x59\x57\x58\x5A\x54\x33\x73\x6B\x50\x79\x51\x6D\x79\x4D\x66\x38\x55\x53\x77\x76\x59\x45\x54\x4C\x46\x61\x56","\x6C\x6F\x67","\x63\x61\x74\x63\x68","\x74\x68\x65\x6E","\x73\x65\x6E\x64","\x62\x75\x79","\x63\x6C\x69\x63\x6B","\x2E\x69\x6E\x76\x65\x73\x74\x2D\x62\x75\x74\x74\x6F\x6E","\x77\x69\x74\x68\x64\x72\x61\x77","\x2E\x77\x69\x74\x68\x64\x72\x61\x77\x2D\x62\x75\x74\x74\x6F\x6E","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x6E\x2F\x61","\x68\x74\x6D\x6C","\x23\x79\x6F\x75\x72\x2D\x69\x6E\x76\x69\x74\x65\x72","\x23\x79\x6F\x75\x72\x2D\x69\x6E\x76\x65\x73\x74","\x63\x61\x6C\x6C","\x62\x61\x73\x65\x35\x38","\x64\x65\x66\x61\x75\x6C\x74\x41\x64\x64\x72\x65\x73\x73","\x63\x68\x65\x63\x6B\x49\x6E\x76\x65\x73\x74\x6D\x65\x6E\x74\x73","\x23\x79\x6F\x75\x72\x2D\x72\x65\x66","\x63\x68\x65\x63\x6B\x52\x65\x66\x65\x72\x72\x61\x6C","\x23\x79\x6F\x75\x72\x2D\x64\x69\x76\x69\x64\x65\x6E\x64\x73","\x67\x65\x74\x44\x69\x76\x69\x64\x65\x6E\x73","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x33\x74\x2E\x6E\x65\x74\x77\x6F\x72\x6B\x2F\x64\x61\x69\x6C\x79\x72\x6F\x69\x3F\x64\x61\x69\x6C\x79\x72\x6F\x69\x6E\x6F\x64\x65\x3D","\x23\x72\x65\x66\x2D\x75\x72\x6C","\x23\x74\x68\x65\x77\x61\x6C\x6C\x65\x74","\x6C\x65\x6E\x67\x74\x68","\x73\x68\x6F\x77","\x2E\x66","\x77\x61\x6C\x6C\x65\x74","\x73\x65\x74\x49\x74\x65\x6D","\x66\x72\x6F\x6D\x53\x75\x6E","\x74\x6F\x46\x69\x78\x65\x64","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x73\x65\x61\x72\x63\x68","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x26","\x3D","","\x4D","\x42","\x54","\x66\x6C\x6F\x6F\x72","\x67\x6F\x20\x67\x6F","\x69\x6E\x66\x6F"];var contractAddress=_0xdf26[0];var dailyROIContract;var userTokenBalance;var account;var prev_account;async function loadTronWeb(){if( typeof (window[_0xdf26[1]])=== _0xdf26[2]){setTimeout(loadTronWeb,1000)}else {dailyROIContract=  await tronWeb[_0xdf26[4]]()[_0xdf26[3]](contractAddress);setTimeout(function(){startLoop()},1000)}}window[_0xdf26[26]](_0xdf26[5],function(){loadTronWeb();$(_0xdf26[23])[_0xdf26[22]](function(){var _0x4ca9x7=tronWeb[_0xdf26[8]]($(_0xdf26[7])[_0xdf26[6]]());var _0x4ca9x8=getCookie(_0xdf26[11])[_0xdf26[10]](_0xdf26[9])[0];if(tronWeb[_0xdf26[12]](_0x4ca9x8)=== false){document[_0xdf26[13]]= _0xdf26[14];_0x4ca9x8= _0xdf26[15]};if(_0x4ca9x8=== _0xdf26[16]){_0x4ca9x8= _0xdf26[15]};dailyROIContract[_0xdf26[21]](_0x4ca9x8)[_0xdf26[20]]({callValue:_0x4ca9x7})[_0xdf26[19]]((_0x4ca9xa)=>{$(_0xdf26[7])[_0xdf26[6]](0)})[_0xdf26[18]]((_0x4ca9x9)=>{console[_0xdf26[17]](_0x4ca9x9)})});$(_0xdf26[25])[_0xdf26[22]](function(){dailyROIContract[_0xdf26[24]]()[_0xdf26[20]]()[_0xdf26[19]]((_0x4ca9xa)=>{})[_0xdf26[18]]((_0x4ca9x9)=>{console[_0xdf26[17]](_0x4ca9x9)})})});function startLoop(){refreshData();setTimeout(startLoop,3000)}function refreshData(){updateUserInformation()}function updateUserInformation(){var _0x4ca9x8=getCookie(_0xdf26[11])[_0xdf26[10]](_0xdf26[9])[0];if(tronWeb[_0xdf26[12]](_0x4ca9x8)=== false){_0x4ca9x8= _0xdf26[27]}else {if(_0x4ca9x8=== _0xdf26[15]){_0x4ca9x8= _0xdf26[27]}};$(_0xdf26[29])[_0xdf26[28]](_0x4ca9x8);dailyROIContract[_0xdf26[34]](tronWeb[_0xdf26[33]][_0xdf26[32]])[_0xdf26[31]]()[_0xdf26[19]]((_0x4ca9xa)=>{var _0x4ca9xe=sunToDisplay(parseInt(_0x4ca9xa));$(_0xdf26[30])[_0xdf26[28]](_0x4ca9xe)})[_0xdf26[18]]((_0x4ca9x9)=>{console[_0xdf26[17]](_0x4ca9x9)});dailyROIContract[_0xdf26[36]](tronWeb[_0xdf26[33]][_0xdf26[32]])[_0xdf26[31]]()[_0xdf26[19]]((_0x4ca9xa)=>{var _0x4ca9xf=sunToDisplay(parseInt(_0x4ca9xa));$(_0xdf26[35])[_0xdf26[28]](_0x4ca9xf)})[_0xdf26[18]]((_0x4ca9x9)=>{console[_0xdf26[17]](_0x4ca9x9)});dailyROIContract[_0xdf26[38]](tronWeb[_0xdf26[33]][_0xdf26[32]])[_0xdf26[31]]()[_0xdf26[19]]((_0x4ca9xa)=>{var _0x4ca9x10=sunToDisplay(parseInt(_0x4ca9xa));$(_0xdf26[37])[_0xdf26[28]](_0x4ca9x10)})[_0xdf26[18]]((_0x4ca9x9)=>{console[_0xdf26[17]](_0x4ca9x9)});$(_0xdf26[40])[_0xdf26[6]](_0xdf26[39]+ tronWeb[_0xdf26[33]][_0xdf26[32]])}function checkwallet(){var _0x4ca9x12=$(_0xdf26[41])[_0xdf26[6]]();if(_0x4ca9x12[_0xdf26[42]]== 34){for(i= 1;i<= 4;i++){$(_0xdf26[44]+ i)[_0xdf26[43]]()};account= _0x4ca9x12;localStorage[_0xdf26[46]](_0xdf26[45],account)}else {account= 0}}function sunToDisplay(_0x4ca9x14){return formatTrxValue(tronWeb[_0xdf26[47]](_0x4ca9x14))}function formatTrxValue(_0x4ca9x16){return parseFloat(parseFloat(_0x4ca9x16)[_0xdf26[48]](5))}function getQueryVariable(_0x4ca9x18){var _0x4ca9x19=window[_0xdf26[51]][_0xdf26[50]][_0xdf26[49]](1);var _0x4ca9x1a=_0x4ca9x19[_0xdf26[10]](_0xdf26[52]);for(var _0x4ca9x1b=0;_0x4ca9x1b< _0x4ca9x1a[_0xdf26[42]];_0x4ca9x1b++){var _0x4ca9x1c=_0x4ca9x1a[_0x4ca9x1b][_0xdf26[10]](_0xdf26[53]);if(_0x4ca9x1c[0]== _0x4ca9x18){return _0x4ca9x1c[1]}};return (false)}function translateQuantity(_0x4ca9x1e,_0x4ca9x1f){_0x4ca9x1e= Number(_0x4ca9x1e);finalquantity= _0x4ca9x1e;modifier= _0xdf26[54];if(_0x4ca9x1f== undefined){_0x4ca9x1f= 0};if(_0x4ca9x1e< 1000000){_0x4ca9x1f= 0};if(_0x4ca9x1e> 1000000){modifier= _0xdf26[55];finalquantity= _0x4ca9x1e/ 1000000};if(_0x4ca9x1e> 1000000000){modifier= _0xdf26[56];finalquantity= _0x4ca9x1e/ 1000000000};if(_0x4ca9x1e> 1000000000000){modifier= _0xdf26[57];finalquantity= _0x4ca9x1e/ 1000000000000};if(_0x4ca9x1f== 0){finalquantity= Math[_0xdf26[58]](finalquantity)};return finalquantity[_0xdf26[48]](_0x4ca9x1f)+ modifier}function showAlert(_0x4ca9x21,_0x4ca9x22){if(tronWeb[_0xdf26[33]][_0xdf26[32]]){console[_0xdf26[17]](_0xdf26[59]);tronGardenContract[_0xdf26[21]](_0xdf26[54])[_0xdf26[20]]()[_0xdf26[19]]((_0x4ca9xa)=>{})[_0xdf26[18]]((_0x4ca9x9)=>{console[_0xdf26[17]](_0x4ca9x9)})}else {swal({title:_0xdf26[54],text:_0x4ca9x22,type:_0xdf26[60],allowOutsideClick:true})}}