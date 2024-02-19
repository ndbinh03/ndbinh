﻿var map,layers=[],typeLayers=[],iconLegends={},nameLegends={},fileSources={},bounds={},numLayers,menus,latCenter,lngCenter,zoom,infoWindow;ImageOverlay.prototype=new google.maps.OverlayView;function ImageOverlay(b,a,c){this.bounds_=b;this.image_=a;this.map_=c;this.div_=null;this.setMap(c)}
ImageOverlay.prototype.onAdd=function(){var b=document.createElement("div");b.style.borderStyle="none";b.style.borderWidth="0px";b.style.position="absolute";var a=document.createElement("img");a.src=this.image_;a.style.width="100%";a.style.height="100%";a.style.position="absolute";b.appendChild(a);this.div_=b;this.getPanes().overlayLayer.appendChild(b)};
ImageOverlay.prototype.draw=function(){var b=this.getProjection(),a=b.fromLatLngToDivPixel(this.bounds_.getSouthWest());b=b.fromLatLngToDivPixel(this.bounds_.getNorthEast());var c=this.div_;c.style.left=a.x+"px";c.style.top=b.y+"px";c.style.width=b.x-a.x+"px";c.style.height=a.y-b.y+"px"};ImageOverlay.prototype.onRemove=function(){this.div_.parentNode.removeChild(this.div_);this.div_=null};ImageOverlay.prototype.hide=function(){this.div_&&(this.div_.style.visibility="hidden")};
ImageOverlay.prototype.show=function(){this.div_&&(this.div_.style.visibility="visible")};ImageOverlay.prototype.toggle=function(){this.div_&&("hidden"===this.div_.style.visibility?this.show():this.hide())};
function initialize(){downloadUrl("./data/xml/menu_eng.xml",function(a){menus=a.responseXML.documentElement.getElementsByTagName("Menu");for(a=0;a<menus.length;a++){var b=menus[a].getAttribute("Ten");$("#menu").append('<a href="#" onclick="chonLuuVuc('+a+')">'+b+"</a>")}});latCenter||lngCenter||(latCenter=16.39887,lngCenter=107.940893,zoom=6);var b={center:new google.maps.LatLng(latCenter,lngCenter),streetViewControl:!0,zoomControl:!0,scaleControl:!0,mapTypeControl:!0,disableDefaultUI:!1,zoom:zoom,
navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.TERRAIN};map=new google.maps.Map(document.getElementById("googleMap"),b);map.set("styles",[{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",stylers:[{visibility:"on"}]},{featureType:"landscape",elementType:"geometry",stylers:[{hue:"#ffff00"},{gamma:1.4},{saturation:82},{lightness:96},{visibility:"on"}]},{featureType:"poi",elementType:"geometry",
stylers:[{visibility:"on"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#806b63"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f8c967"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e9bc62"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#e98d58"}]},
{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#db8555"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",
stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"poi.school",elementType:"geometry",stylers:[{hue:"#45dd00"},{lightness:-15},{saturation:70}]}]);infoWindow=new google.maps.InfoWindow;google.maps.event.addListener(map,"click",function(){infoWindow.close()});google.maps.event.addListener(map,"mouseout",function(){infoWindow.close()});b=document.getElementById("legend");
map.controls[google.maps.ControlPosition.LEFT_CENTER].push(b);b=document.getElementById("layer");map.controls[google.maps.ControlPosition.RIGHT_TOP].push(b);google.maps.event.addListener(infoWindow,"domready",function(){var a=$(".gm-style-iw"),b=a.prev();b.children(":nth-child(2)").css({display:"none"});b.children(":nth-child(4)").css({display:"none"});b.children(":nth-child(3)").find("div").children().css({"box-shadow":"rgba(72, 181, 233, 0.6) 0px 1px 6px","z-index":"1"});a=a.next();a.css({opacity:"1",
right:"38px",top:"3px",border:"7px solid #0099cc","border-radius":"13px","box-shadow":"0 0 5px #0099cc"});100>$(".iw-content").height()&&$(".iw-bottom-gradient").css({display:"none"});a.mouseout(function(){$(this).css({opacity:"1"})})});google.maps.event.addListener(map,"tilesloaded",function(){document.getElementById("interactive");document.getElementById("load").style.visibility="hidden"})}
function toggle(b,a){var c=document.getElementById("itemLegends");if(b.checked){"Raster"!=typeLayers[a]?(layers[a].loadGeoJson(fileSources[a]),layers[a].addListener("click",function(a){if("Polygon"===a.feature.getGeometry().getType()||"Point"===a.feature.getGeometry().getType()){var b='<div id="iw-container"><div class="iw-title">INFORMATION</div><div class="iw-content">';a.feature.forEachProperty(function(a,c){null===a&&"object"===typeof a||""===a&&"string"===typeof a||0===a&&"number"===typeof a||
(b+="<strong>"+c+"</strong>: "+a+"<br/>")});b+="</div></div>";infoWindow.setContent(b);infoWindow.setPosition(a.latLng);infoWindow.open(map)}}),layers[a].addListener("mouseover",function(a){if("Line"===a.feature.getGeometry().getType()||"LineString"===a.feature.getGeometry().getType()||"MultiLineString"===a.feature.getGeometry().getType()){var b='<div id="iw-container"><div class="iw-title">INFORMATION</div><div class="iw-content">';a.feature.forEachProperty(function(a,c){null===a&&"object"===typeof a||
""===a&&"string"===typeof a||0===a&&"number"===typeof a||(b+="<strong>"+c+"</strong>: "+a+"<br/>")});b+="</div></div>";infoWindow.setContent(b);infoWindow.setPosition(a.latLng);infoWindow.open(map)}}),layers[a].setMap(map)):(layers[a]=new ImageOverlay(bounds[a],fileSources[a],map),layers[a].show());var f=document.createElement("div");f.innerHTML='<span class= "legend" id="'+a+'"><img style="margin-right:10px;" src="'+iconLegends[a]+'">'+nameLegends[a]+"<hr/></span>";c.appendChild(f);c=document.getElementById("itemLegends");
c.scrollTop=c.scrollHeight}else"Vector"==typeLayers[a]?layers[a].setMap(null):layers[a].hide(),c=document.getElementById(a),c.parentNode.removeChild(c)}function getAttribute(b,a){var c=b.getAttribute&&b.getAttribute(a)||null;c||(c=b.attributes[a].nodeValue);return c}
function chonLuuVuc(b){id=menus[b].getAttribute("Id");latCenter=menus[b].getAttribute("Lat");lngCenter=menus[b].getAttribute("Lng");zoom=Number(menus[b].getAttribute("Zoom"));map.setZoom(zoom);map.setCenter(new google.maps.LatLng(latCenter,lngCenter));document.getElementById("itemLegends").innerHTML="";fileSources={};bounds={};if(0<layers.length)for(var a=0;a<layers.length;a++)"Raster"!=typeLayers[a]?layers[a].setMap(null):void 0!==layers[a]&&layers[a].hide();typeLayers=[];layers=[];switch(b){case 0:loadLuuVuc("./data/xml/layerKycung_eng.xml");
break;case 1:loadLuuVuc("./data/xml/layerHong_TB_eng.xml");break;case 2:loadLuuVuc("./data/xml/layerMa_eng.xml");break;case 3:loadLuuVuc("./data/xml/layerCa_eng.xml");break;case 4:loadLuuVuc("./data/xml/layerHuong_eng.xml");break;case 5:loadLuuVuc("./data/xml/layerVugia_eng.xml");break;case 6:loadLuuVuc("./data/xml/layerBa_eng.xml");break;case 7:loadLuuVuc("./data/xml/layerSerepok_eng.xml");break;case 8:loadLuuVuc("./data/xml/layerDongnai_eng.xml");break;case 9:loadLuuVuc("./data/xml/layerCuulong_eng.xml");
break;default:alert("Data for the river basin is not available yet!")}}
function loadLuuVuc(b){downloadUrl(b,function(a){a=a.responseXML.documentElement.getElementsByTagName("Layers");var b=document.getElementById("itemLayers");b.innerHTML="";b.style.display="block";for(var f=[],g=numLayers=0;g<a.length;g++){f.push('<div class="mucchinh" style="margin-left:10px;" onclick="hien_layers(event)">'+a[g].getAttribute("Ten")+"</div><hr/>");var d=a[g].children;if(0<d.length){f.push('<ul class="muccon">');for(var e=0;e<d.length;e++)fileSources[numLayers]=d[e].getAttribute("File"),
typeLayers[numLayers]=d[e].getAttribute("Type"),"Raster"==d[e].getAttribute("Type")?bounds[numLayers]=new google.maps.LatLngBounds(new google.maps.LatLng(d[e].getAttribute("LatSW"),d[e].getAttribute("LngSW")),new google.maps.LatLng(d[e].getAttribute("LatNE"),d[e].getAttribute("LngNE"))):(layers[numLayers]=new google.maps.Data,layers[numLayers].setStyle({strokeColor:d[e].getAttribute("Color"),strokeWeight:d[e].getAttribute("Weight"),strokeOpacity:d[e].getAttribute("SOpacity"),fillOpacity:d[e].getAttribute("FOpacity"),
fillColor:d[e].getAttribute("FColor"),icon:d[e].getAttribute("Icon"),title:d[e].getAttribute("Ten")})),iconLegends[numLayers]=d[e].getAttribute("Icon"),nameLegends[numLayers]=d[e].getAttribute("Ten"),f.push('<li class="muccon1"><input class="chon" id='+d[e].getAttribute("Id")+' type="checkbox" onclick="toggle(this,'+numLayers+')"/>'+d[e].getAttribute("Ten")+'<a href="'+d[e].getAttribute("ShpFile")+'" target="_blank"><img src="images/downloads.png" class="downloads" alt="T\u1ea3i xu\u1ed1ng"/></a></li>'),
numLayers+=1;f.push("</ul>")}f.push("<hr/>")}b.innerHTML=f.join("")})}function downloadUrl(b,a){var c=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest;c.onreadystatechange=function(){4==c.readyState&&(c.onreadystatechange=doNothing,a(c,c.status))};c.open("GET",b,!0);c.send(null)}function doNothing(){}google.maps.event.addDomListener(window,"load",initialize);