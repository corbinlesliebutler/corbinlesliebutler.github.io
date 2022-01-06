/*! 2.3.1 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("shifty",[],e):"object"==typeof exports?exports.shifty=e():t.shifty=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/assets/",e(e.s=6)}([function(t,e,n){"use strict";(function(t){function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=new j,n=e.tween(t);return n.tweenable=e,n}Object.defineProperty(e,"__esModule",{value:!0}),e.Tweenable=e.composeEasingObject=e.tweenProps=e.clone=e.each=void 0;var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.tween=o;var c=n(5),s=r(c),f=n(1),h=function(t){return t&&t.__esModule?t:{default:t}}(f),l=n(7),p=r(l),d="undefined"!=typeof window?window:t,m=d.cancelAnimationFrame||d.webkitCancelAnimationFrame||d.oCancelAnimationFrame||d.msCancelAnimationFrame||d.mozCancelRequestAnimationFrame||d.clearTimeout,_=d.requestAnimationFrame||d.webkitRequestAnimationFrame||d.oRequestAnimationFrame||d.msRequestAnimationFrame||d.mozCancelRequestAnimationFrame&&d.mozRequestAnimationFrame||setTimeout,v=function(){},y=e.each=function(t,e){return Object.keys(t).forEach(e)},w=e.clone=function(t){return(0,h.default)({},t)},g=w(s),b=function(t,e,n,r){return t+(e-t)*n(r)},O=e.tweenProps=function(t,e,n,r,i,o,u){var a=t<o?0:(t-o)/i;return y(e,function(t){var i=u[t],o="function"==typeof i?i:g[i];e[t]=b(n[t],r[t],o,a)}),e},M=e.composeEasingObject=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"linear",n={},r=void 0===e?"undefined":a(e);return"string"===r||"function"===r?y(t,function(t){return n[t]=e}):y(t,function(t){return n[t]=n[t]||e[t]||"linear"}),n},j=e.Tweenable=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;i(this,t),this._currentState=e,this._configured=!1,this._scheduleFunction=_,void 0!==n&&this.setConfig(n)}return u(t,[{key:"_applyFilter",value:function(e){var n=this,r=t.filters,i=this._filterArgs;y(r,function(t){var o=r[t][e];void 0!==o&&o.apply(n,i)})}},{key:"_timeoutHandler",value:function(e){var n=this,r=arguments,i=this._currentState,o=this._delay,u=this._duration,a=this._step,c=this._targetState,s=this._timestamp,f=s+o+u,h=Math.min(e||t.now(),f),l=h>=f,p=u-(f-h);this.isPlaying()&&(l?(a(c,this._attachment,p),this.stop(!0)):(this._scheduleId=this._scheduleFunction.call(d,function(){return n._timeoutHandler.apply(n,r)},1e3/60),this._applyFilter("beforeTween"),h<s+o?(h=1,u=1,s=1):s+=o,O(h,i,this._originalState,c,u,s,this._easing),this._applyFilter("afterTween"),a(i,this._attachment,p)))}},{key:"tween",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,n=this._attachment,r=this._configured;return this._isTweening?this:(void 0===e&&r||this.setConfig(e),this._timestamp=t.now(),this._start(this.get(),n),this.resume())}},{key:"setConfig",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._configured=!0,this._attachment=e.attachment,(0,h.default)(this,{_pausedAtTime:null,_scheduleId:null,_delay:e.delay||0,_start:e.start||v,_step:e.step||v,_duration:e.duration||500,_currentState:w(e.from||this.get())}),(0,h.default)(this,{_originalState:this.get(),_targetState:w(e.to||this.get())});var n=this._currentState;this._targetState=(0,h.default)({},n,this._targetState),this._easing=M(n,e.easing),this._filterArgs=[n,this._originalState,this._targetState,this._easing],this._applyFilter("tweenCreated");var r=e.promise||Promise;return this._promise=new r(function(e,n){t._resolve=e,t._reject=n}),this._promise.catch(v),this}},{key:"get",value:function(){return w(this._currentState)}},{key:"set",value:function(t){this._currentState=t}},{key:"pause",value:function(){return this._pausedAtTime=t.now(),this._isPaused=!0,this}},{key:"resume",value:function(){return this._isPaused&&(this._timestamp+=t.now()-this._pausedAtTime),this._isPaused=!1,this._isTweening=!0,this._timeoutHandler(),this._promise}},{key:"seek",value:function(e){e=Math.max(e,0);var n=t.now();return this._timestamp+e===0?this:(this._timestamp=n-e,this.isPlaying()||(this._isTweening=!0,this._isPaused=!1,this._timeoutHandler(n),this.pause()),this)}},{key:"stop",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this._attachment,n=this._currentState,r=this._easing,i=this._originalState,o=this._targetState;return this._isTweening=!1,this._isPaused=!1,m(this._scheduleId),t?(this._applyFilter("beforeTween"),O(1,n,i,o,1,0,r),this._applyFilter("afterTween"),this._applyFilter("afterTweenEnd"),this._resolve(n,e)):this._reject(n,e),this}},{key:"isPlaying",value:function(){return this._isTweening&&!this._isPaused}},{key:"setScheduleFunction",value:function(t){this._scheduleFunction=t}},{key:"dispose",value:function(){var t=this;y(this,function(e){return delete t[e]})}}]),t}();(0,h.default)(j,{formulas:g,filters:{token:p},now:Date.now||function(t){return+new Date}})}).call(e,n(4))},function(t,e,n){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,a,c=r(t),s=1;s<arguments.length;s++){n=Object(arguments[s]);for(var f in n)o.call(n,f)&&(c[f]=n[f]);if(i){a=i(n);for(var h=0;h<a.length;h++)u.call(n,a[h])&&(c[a[h]]=n[a[h]])}}return c}},function(t,e,n){"use strict";function r(t,e,n,r,i,o){var u=0,a=0,c=0,s=0,f=0,h=0,l=function(t){return((u*t+a)*t+c)*t},p=function(t){return((s*t+f)*t+h)*t},d=function(t){return(3*u*t+2*a)*t+c},m=function(t){return t>=0?t:0-t},_=function(t,e){var n=void 0,r=void 0,i=void 0,o=void 0,u=void 0,a=void 0;for(i=t,a=0;a<8;a++){if(o=l(i)-t,m(o)<e)return i;if(u=d(i),m(u)<1e-6)break;i-=o/u}if(n=0,r=1,(i=t)<n)return n;if(i>r)return r;for(;n<r;){if(o=l(i),m(o-t)<e)return i;t>o?n=i:r=i,i=.5*(r-n)+n}return i};return c=3*e,a=3*(r-e)-c,u=1-c-a,h=3*n,f=3*(i-n)-h,s=1-h-f,function(t,e){return p(_(t,e))}(t,function(t){return 1/(200*t)}(o))}Object.defineProperty(e,"__esModule",{value:!0}),e.unsetBezierFunction=e.setBezierFunction=void 0;var i=n(0),o=n(1),u=function(t){return t&&t.__esModule?t:{default:t}}(o),a=function(t,e,n,i){return function(o){return r(o,t,e,n,i,1)}};e.setBezierFunction=function(t,e,n,r,o){return i.Tweenable.formulas[t]=(0,u.default)(a(e,n,r,o),{displayName:t,x1:e,y1:n,x2:r,y2:o})},e.unsetBezierFunction=function(t){return delete i.Tweenable.formulas[t]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.interpolate=void 0;var r=n(0),i=new r.Tweenable;i._filterArgs=[];e.interpolate=function(t,e,n,o){var u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,a=(0,r.clone)(t),c=(0,r.composeEasingObject)(t,o);i.set({}),i._filterArgs=[a,t,e,c],i._applyFilter("tweenCreated"),i._applyFilter("beforeTween");var s=(0,r.tweenProps)(n,a,t,e,1,u,c);return i._applyFilter("afterTween"),s}},function(t,e,n){"use strict";var r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"===("undefined"==typeof window?"undefined":i(window))&&(r=window)}t.exports=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.linear=function(t){return t},e.easeInQuad=function(t){return Math.pow(t,2)},e.easeOutQuad=function(t){return-(Math.pow(t-1,2)-1)},e.easeInOutQuad=function(t){return(t/=.5)<1?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},e.easeInCubic=function(t){return Math.pow(t,3)},e.easeOutCubic=function(t){return Math.pow(t-1,3)+1},e.easeInOutCubic=function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},e.easeInQuart=function(t){return Math.pow(t,4)},e.easeOutQuart=function(t){return-(Math.pow(t-1,4)-1)},e.easeInOutQuart=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},e.easeInQuint=function(t){return Math.pow(t,5)},e.easeOutQuint=function(t){return Math.pow(t-1,5)+1},e.easeInOutQuint=function(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},e.easeInSine=function(t){return 1-Math.cos(t*(Math.PI/2))},e.easeOutSine=function(t){return Math.sin(t*(Math.PI/2))},e.easeInOutSine=function(t){return-.5*(Math.cos(Math.PI*t)-1)},e.easeInExpo=function(t){return 0===t?0:Math.pow(2,10*(t-1))},e.easeOutExpo=function(t){return 1===t?1:1-Math.pow(2,-10*t)},e.easeInOutExpo=function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},e.easeInCirc=function(t){return-(Math.sqrt(1-t*t)-1)},e.easeOutCirc=function(t){return Math.sqrt(1-Math.pow(t-1,2))},e.easeInOutCirc=function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},e.easeOutBounce=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},e.easeInBack=function(t){var e=1.70158;return t*t*((e+1)*t-e)},e.easeOutBack=function(t){var e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},e.easeInOutBack=function(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},e.elastic=function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},e.swingFromTo=function(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},e.swingFrom=function(t){var e=1.70158;return t*t*((e+1)*t-e)},e.swingTo=function(t){var e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},e.bounce=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},e.bouncePast=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?2-(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},e.easeFromTo=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},e.easeFrom=function(t){return Math.pow(t,4)},e.easeTo=function(t){return Math.pow(t,.25)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0);Object.defineProperty(e,"Tweenable",{enumerable:!0,get:function(){return r.Tweenable}}),Object.defineProperty(e,"tween",{enumerable:!0,get:function(){return r.tween}});var i=n(3);Object.defineProperty(e,"interpolate",{enumerable:!0,get:function(){return i.interpolate}});var o=n(2);Object.defineProperty(e,"setBezierFunction",{enumerable:!0,get:function(){return o.setBezierFunction}}),Object.defineProperty(e,"unsetBezierFunction",{enumerable:!0,get:function(){return o.unsetBezierFunction}})},function(t,e,n){"use strict";function r(t){return parseInt(t,16)}function i(t,e,n){[t,e,n].forEach(g),this._tokenData=j(t)}function o(t,e,n,r){var i=this._tokenData;I(r,i),[t,e,n].forEach(function(t){return F(t,i)})}function u(t,e,n,r){var i=this._tokenData;[t,e,n].forEach(function(t){return T(t,i)}),A(r,i)}Object.defineProperty(e,"__esModule",{value:!0}),e.tweenCreated=i,e.beforeTween=o,e.afterTween=u;var a=n(0),c=/(\d|\-|\.)/,s=/([^\-0-9\.]+)/g,f=/[0-9.\-]+/g,h=function(){var t=f.source,e=/,\s*/.source;return new RegExp("rgb\\("+t+e+t+e+t+"\\)","g")}(),l=/^.*\(/,p=/#([0-9]|[a-f]){3,6}/gi,d=function(t,e){return t.map(function(t,n){return"_"+e+"_"+n})},m=function(t){var e=t.match(s);return e?(1===e.length||t.charAt(0).match(c))&&e.unshift(""):e=["",""],e.join("VAL")},_=function(t){return t=t.replace(/#/,""),3===t.length&&(t=t.split(""),t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),[r(t.substr(0,2)),r(t.substr(2,2)),r(t.substr(4,2))]},v=function(t){return"rgb("+_(t).join(",")+")"},y=function(t,e,n){var r=e.match(t),i=e.replace(t,"VAL");return r&&r.forEach(function(t){return i=i.replace("VAL",n(t))}),i},w=function(t){return y(p,t,v)},g=function(t){(0,a.each)(t,function(e){var n=t[e];"string"==typeof n&&n.match(p)&&(t[e]=w(n))})},b=function(t){var e=t.match(f).map(Math.floor);return""+t.match(l)[0]+e.join(",")+")"},O=function(t){return y(h,t,b)},M=function(t){return t.match(f)},j=function(t){var e={};return(0,a.each)(t,function(n){var r=t[n];"string"==typeof r&&(e[n]={formatString:m(r),chunkNames:d(M(r),n)})}),e},F=function(t,e){(0,a.each)(e,function(n){M(t[n]).forEach(function(r,i){return t[e[n].chunkNames[i]]=+r}),delete t[n]})},P=function(t,e){var n={};return e.forEach(function(e){n[e]=t[e],delete t[e]}),n},S=function(t,e){return e.map(function(e){return t[e]})},k=function(t,e){return e.forEach(function(e){return t=t.replace("VAL",+e.toFixed(4))}),t},T=function(t,e){(0,a.each)(e,function(n){var r=e[n],i=r.chunkNames,o=r.formatString,u=k(o,S(P(t,i),i));t[n]=O(u)})},I=function(t,e){(0,a.each)(e,function(n){var r=e[n].chunkNames,i=t[n];if("string"==typeof i){var o=i.split(" "),u=o[o.length-1];r.forEach(function(e,n){return t[e]=o[n]||u})}else r.forEach(function(e){return t[e]=i});delete t[n]})},A=function(t,e){(0,a.each)(e,function(n){var r=e[n].chunkNames,i=(r.length,t[r[0]]);t[n]="string"==typeof i?r.map(function(e){var n=t[e];return delete t[e],n}).join(" "):i})}}])});
//# sourceMappingURL=shifty.js.map