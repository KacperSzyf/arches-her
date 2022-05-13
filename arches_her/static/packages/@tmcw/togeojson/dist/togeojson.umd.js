!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).toGeoJSON={})}(this,(function(e){"use strict";function t(e){return e&&e.normalize&&e.normalize(),e&&e.textContent||""}function n(e,t){const n=e.getElementsByTagName(t);return n.length?n[0]:null}function o(e){const o={};if(e){const s=n(e,"line");if(s){const e=t(n(s,"color")),r=parseFloat(t(n(s,"opacity"))),l=parseFloat(t(n(s,"width")));e&&(o.stroke=e),isNaN(r)||(o["stroke-opacity"]=r),isNaN(l)||(o["stroke-width"]=96*l/25.4)}}return o}function s(e,o){const s={};let r,l;for(l=0;l<o.length;l++)r=n(e,o[l]),r&&(s[o[l]]=t(r));return s}function r(e){const n=s(e,["name","cmt","desc","type","time","keywords"]),o=e.getElementsByTagNameNS("http://www.garmin.com/xmlschemas/GpxExtensions/v3","*");for(let s=0;s<o.length;s++){const r=o[s];r.parentNode.parentNode===e&&(n[r.tagName.replace(":","_")]=t(r))}const r=e.getElementsByTagName("link");r.length&&(n.links=[]);for(let e=0;e<r.length;e++)n.links.push(Object.assign({href:r[e].getAttribute("href")},s(r[e],["text","type"])));return n}function l(e){const o=[parseFloat(e.getAttribute("lon")),parseFloat(e.getAttribute("lat"))],s=n(e,"ele"),r=n(e,"gpxtpx:hr")||n(e,"hr"),l=n(e,"time");let i;s&&(i=parseFloat(t(s)),isNaN(i)||o.push(i));const a={coordinates:o,time:l?t(l):null,extendedValues:[]};r&&a.extendedValues.push(["heartRate",parseFloat(t(r))]);const c=n(e,"extensions");if(null!==c)for(const e of["speed","course","hAcc","vAcc"]){const o=parseFloat(t(n(c,e)));isNaN(o)||a.extendedValues.push([e,o])}return a}function i(e){const t=a(e,"rtept");if(t)return{type:"Feature",properties:Object.assign(r(e),o(n(e,"extensions")),{_gpxType:"rte"}),geometry:{type:"LineString",coordinates:t.line}}}function a(e,t){const n=e.getElementsByTagName(t);if(n.length<2)return;const o=[],s=[],r={};for(let e=0;e<n.length;e++){const t=l(n[e]);o.push(t.coordinates),t.time&&s.push(t.time);for(let o=0;o<t.extendedValues.length;o++){const[s,l]=t.extendedValues[o],i=s+"s";r[i]||(r[i]=Array(n.length).fill(null)),r[i][e]=l}}return{line:o,times:s,extendedValues:r}}function c(e){const t=e.getElementsByTagName("trkseg"),s=[],l=[],i=[];for(let e=0;e<t.length;e++){const n=a(t[e],"trkpt");n&&(i.push(n),n.times&&n.times.length&&l.push(n.times))}if(0===i.length)return;const c=i.length>1,g=Object.assign(r(e),o(n(e,"extensions")),{_gpxType:"trk"},l.length?{coordTimes:c?l:l[0]}:{});for(let e=0;e<i.length;e++){const t=i[e];s.push(t.line);for(const[n,o]of Object.entries(t.extendedValues))c?(g[n]||(g[n]=i.map(e=>new Array(e.line.length).fill(null))),g[n][e]=o):g[n]=o}return{type:"Feature",properties:g,geometry:c?{type:"MultiLineString",coordinates:s}:{type:"LineString",coordinates:s[0]}}}function*g(e){const t=e.getElementsByTagName("trk"),n=e.getElementsByTagName("rte"),o=e.getElementsByTagName("wpt");for(let e=0;e<t.length;e++){const n=c(t[e]);n&&(yield n)}for(let e=0;e<n.length;e++){const t=i(n[e]);t&&(yield t)}for(let e=0;e<o.length;e++)yield(a=o[e],{type:"Feature",properties:Object.assign(r(a),s(a,["sym"])),geometry:{type:"Point",coordinates:l(a).coordinates}});var a}const u="http://www.garmin.com/xmlschemas/ActivityExtension/v2",m=[["heartRate","heartRates"],["Cadence","cadences"],["Speed","speeds"],["Watts","watts"]],p=[["TotalTimeSeconds","totalTimeSeconds"],["DistanceMeters","distanceMeters"],["MaximumSpeed","maxSpeed"],["AverageHeartRateBpm","avgHeartRate"],["MaximumHeartRateBpm","maxHeartRate"],["AvgSpeed","avgSpeed"],["AvgWatts","avgWatts"],["MaxWatts","maxWatts"]];function f(e,o){const s=[];for(const[r,l]of o){let o=n(e,r);if(!o){const t=e.getElementsByTagNameNS(u,r);t.length&&(o=t[0])}const i=parseFloat(t(o));isNaN(i)||s.push([l,i])}return s}function h(e){const o=t(n(e,"LongitudeDegrees")),s=t(n(e,"LatitudeDegrees"));if(!o.length||!s.length)return null;const r=[parseFloat(o),parseFloat(s)],l=n(e,"AltitudeMeters"),i=n(e,"HeartRateBpm"),a=n(e,"Time");let c;return l&&(c=parseFloat(t(l)),isNaN(c)||r.push(c)),{coordinates:r,time:a?t(a):null,heartRate:i?parseFloat(t(i)):null,extensions:f(e,m)}}function d(e,t){const n=e.getElementsByTagName(t),o=[],s=[],r=[];if(n.length<2)return null;const l={extendedProperties:{}};for(let e=0;e<n.length;e++){const t=h(n[e]);if(null!==t){o.push(t.coordinates),t.time&&s.push(t.time),t.heartRate&&r.push(t.heartRate);for(const[o,s]of t.extensions)l.extendedProperties[o]||(l.extendedProperties[o]=Array(n.length).fill(null)),l.extendedProperties[o][e]=s}}return Object.assign(l,{line:o,times:s,heartRates:r})}function y(e){const t=e.getElementsByTagName("Track"),n=[],o=[],s=[],r=[];let l;const i=function(e){const t={};for(const[n,o]of e)t[n]=o;return t}(f(e,p));for(let e=0;e<t.length;e++)l=d(t[e],"Trackpoint"),l&&(n.push(l.line),l.times.length&&o.push(l.times),l.heartRates.length&&s.push(l.heartRates),r.push(l.extendedProperties));for(let e=0;e<r.length;e++){const o=r[e];for(const s in o)1===t.length?i[s]=l.extendedProperties[s]:(i[s]||(i[s]=n.map(e=>Array(e.length).fill(null))),i[s][e]=o[s])}if(0!==n.length)return o.length&&(i.coordTimes=1===n.length?o[0]:o),s.length&&(i.heartRates=1===n.length?s[0]:s),{type:"Feature",properties:i,geometry:{type:1===n.length?"LineString":"MultiLineString",coordinates:1===n.length?n[0]:n}}}function*N(e){const t=e.getElementsByTagName("Lap");for(let e=0;e<t.length;e++){const n=y(t[e]);n&&(yield n)}}const x=/\s*/g,T=/^\s*|\s*$/g,b=/\s+/;function S(e){if(!e||!e.length)return 0;let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n)|0;return t}function k(e){return e.replace(x,"").split(",").map(parseFloat)}function A(e){return e.replace(T,"").split(b).map(k)}function B(e){if(void 0!==e.xml)return e.xml;if(e.tagName){let t=e.tagName;for(let n=0;n<e.attributes.length;n++)t+=e.attributes[n].name+e.attributes[n].value;for(let n=0;n<e.childNodes.length;n++)t+=B(e.childNodes[n]);return t}return"#text"===e.nodeName?(e.nodeValue||e.value||"").trim():"#cdata-section"===e.nodeName?e.nodeValue:""}const E=["Polygon","LineString","Point","Track","gx:Track"];function F(e,o,s){let r=t(n(o,"color"))||"";const l="stroke"==s||"fill"===s?s:s+"-color";"#"===r.substr(0,1)&&(r=r.substr(1)),6===r.length||3===r.length?e[l]=r:8===r.length&&(e[s+"-opacity"]=parseInt(r.substr(0,2),16)/255,e[l]="#"+r.substr(6,2)+r.substr(4,2)+r.substr(2,2))}function v(e,o,s,r){const l=parseFloat(t(n(o,s)));isNaN(l)||(e[r]=l)}function P(e){let n=e.getElementsByTagName("coord");const o=[],s=[];0===n.length&&(n=e.getElementsByTagName("gx:coord"));for(let e=0;e<n.length;e++)o.push(t(n[e]).split(" ").map(parseFloat));const r=e.getElementsByTagName("when");for(let e=0;e<r.length;e++)s.push(t(r[e]));return{coords:o,times:s}}function L(e,o,s,r){const l=function e(o){let s,r,l,i,a;const c=[],g=[];if(n(o,"MultiGeometry"))return e(n(o,"MultiGeometry"));if(n(o,"MultiTrack"))return e(n(o,"MultiTrack"));if(n(o,"gx:MultiTrack"))return e(n(o,"gx:MultiTrack"));for(l=0;l<E.length;l++)if(r=o.getElementsByTagName(E[l]),r)for(i=0;i<r.length;i++)if(s=r[i],"Point"===E[l])c.push({type:"Point",coordinates:k(t(n(s,"coordinates")))});else if("LineString"===E[l])c.push({type:"LineString",coordinates:A(t(n(s,"coordinates")))});else if("Polygon"===E[l]){const e=s.getElementsByTagName("LinearRing"),o=[];for(a=0;a<e.length;a++)o.push(A(t(n(e[a],"coordinates"))));c.push({type:"Polygon",coordinates:o})}else if("Track"===E[l]||"gx:Track"===E[l]){const e=P(s);c.push({type:"LineString",coordinates:e.coords}),e.times.length&&g.push(e.times)}return{geoms:c,coordTimes:g}}(e);let i;const a={},c=t(n(e,"name")),g=t(n(e,"address"));let u=t(n(e,"styleUrl"));const m=t(n(e,"description")),p=n(e,"TimeSpan"),f=n(e,"TimeStamp"),h=n(e,"ExtendedData");let d=n(e,"IconStyle"),y=n(e,"LabelStyle"),N=n(e,"LineStyle"),x=n(e,"PolyStyle");const T=n(e,"visibility");if(c&&(a.name=c),g&&(a.address=g),u){"#"!==u[0]&&(u="#"+u),a.styleUrl=u,o[u]&&(a.styleHash=o[u]),s[u]&&(a.styleMapHash=s[u],a.styleHash=o[s[u].normal]);const e=r[a.styleHash];e&&(d||(d=n(e,"IconStyle")),y||(y=n(e,"LabelStyle")),N||(N=n(e,"LineStyle")),x||(x=n(e,"PolyStyle")))}if(m&&(a.description=m),p){const e=t(n(p,"begin")),o=t(n(p,"end"));a.timespan={begin:e,end:o}}if(f&&(a.timestamp=t(n(f,"when"))),d){F(a,d,"icon"),v(a,d,"scale","icon-scale"),v(a,d,"heading","icon-heading");const e=n(d,"hotSpot");if(e){const t=parseFloat(e.getAttribute("x")),n=parseFloat(e.getAttribute("y"));isNaN(t)||isNaN(n)||(a["icon-offset"]=[t,n])}const o=n(d,"Icon");if(o){const e=t(n(o,"href"));e&&(a.icon=e)}}if(y&&(F(a,y,"label"),v(a,y,"scale","label-scale")),N&&(F(a,N,"stroke"),v(a,N,"width","stroke-width")),x){F(a,x,"fill");const e=t(n(x,"fill")),o=t(n(x,"outline"));e&&(a["fill-opacity"]="1"===e?a["fill-opacity"]||1:0),o&&(a["stroke-opacity"]="1"===o?a["stroke-opacity"]||1:0)}if(h){const e=h.getElementsByTagName("Data"),o=h.getElementsByTagName("SimpleData");for(i=0;i<e.length;i++)a[e[i].getAttribute("name")]=t(n(e[i],"value"));for(i=0;i<o.length;i++)a[o[i].getAttribute("name")]=t(o[i])}T&&(a.visibility=t(T)),l.coordTimes.length&&(a.coordTimes=1===l.coordTimes.length?l.coordTimes[0]:l.coordTimes);const b={type:"Feature",geometry:0===l.geoms.length?null:1===l.geoms.length?l.geoms[0]:{type:"GeometryCollection",geometries:l.geoms},properties:a};return e.getAttribute("id")&&(b.id=e.getAttribute("id")),b}function*M(e){const o={},s={},r={},l=e.getElementsByTagName("Placemark"),i=e.getElementsByTagName("Style"),a=e.getElementsByTagName("StyleMap");for(let e=0;e<i.length;e++){const t=S(B(i[e])).toString(16);o["#"+i[e].getAttribute("id")]=t,s[t]=i[e]}for(let e=0;e<a.length;e++){o["#"+a[e].getAttribute("id")]=S(B(a[e])).toString(16);const s=a[e].getElementsByTagName("Pair"),l={};for(let e=0;e<s.length;e++)l[t(n(s[e],"key"))]=t(n(s[e],"styleUrl"));r["#"+a[e].getAttribute("id")]=l}for(let e=0;e<l.length;e++){const t=L(l[e],o,r,s);t&&(yield t)}}e.gpx=function(e){return{type:"FeatureCollection",features:Array.from(g(e))}},e.gpxGen=g,e.kml=function(e){return{type:"FeatureCollection",features:Array.from(M(e))}},e.kmlGen=M,e.tcx=function(e){return{type:"FeatureCollection",features:Array.from(N(e))}},e.tcxGen=N,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=togeojson.umd.js.map
