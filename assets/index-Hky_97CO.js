function DI(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in t)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function OI(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var F_={exports:{}},yu={},B_={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var na=Symbol.for("react.element"),VI=Symbol.for("react.portal"),LI=Symbol.for("react.fragment"),jI=Symbol.for("react.strict_mode"),MI=Symbol.for("react.profiler"),UI=Symbol.for("react.provider"),FI=Symbol.for("react.context"),BI=Symbol.for("react.forward_ref"),zI=Symbol.for("react.suspense"),$I=Symbol.for("react.memo"),HI=Symbol.for("react.lazy"),jm=Symbol.iterator;function qI(t){return t===null||typeof t!="object"?null:(t=jm&&t[jm]||t["@@iterator"],typeof t=="function"?t:null)}var z_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$_=Object.assign,H_={};function mi(t,e,n){this.props=t,this.context=e,this.refs=H_,this.updater=n||z_}mi.prototype.isReactComponent={};mi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};mi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function q_(){}q_.prototype=mi.prototype;function jd(t,e,n){this.props=t,this.context=e,this.refs=H_,this.updater=n||z_}var Md=jd.prototype=new q_;Md.constructor=jd;$_(Md,mi.prototype);Md.isPureReactComponent=!0;var Mm=Array.isArray,W_=Object.prototype.hasOwnProperty,Ud={current:null},G_={key:!0,ref:!0,__self:!0,__source:!0};function K_(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)W_.call(e,r)&&!G_.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:na,type:t,key:i,ref:o,props:s,_owner:Ud.current}}function WI(t,e){return{$$typeof:na,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Fd(t){return typeof t=="object"&&t!==null&&t.$$typeof===na}function GI(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Um=/\/+/g;function Ic(t,e){return typeof t=="object"&&t!==null&&t.key!=null?GI(""+t.key):e.toString(36)}function sl(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case na:case VI:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+Ic(o,0):r,Mm(s)?(n="",t!=null&&(n=t.replace(Um,"$&/")+"/"),sl(s,e,n,"",function(c){return c})):s!=null&&(Fd(s)&&(s=WI(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Um,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Mm(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+Ic(i,l);o+=sl(i,e,n,u,s)}else if(u=qI(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+Ic(i,l++),o+=sl(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Da(t,e,n){if(t==null)return t;var r=[],s=0;return sl(t,r,"","",function(i){return e.call(n,i,s++)}),r}function KI(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var ht={current:null},il={transition:null},QI={ReactCurrentDispatcher:ht,ReactCurrentBatchConfig:il,ReactCurrentOwner:Ud};function Q_(){throw Error("act(...) is not supported in production builds of React.")}ee.Children={map:Da,forEach:function(t,e,n){Da(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Da(t,function(){e++}),e},toArray:function(t){return Da(t,function(e){return e})||[]},only:function(t){if(!Fd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ee.Component=mi;ee.Fragment=LI;ee.Profiler=MI;ee.PureComponent=jd;ee.StrictMode=jI;ee.Suspense=zI;ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=QI;ee.act=Q_;ee.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=$_({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Ud.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)W_.call(e,u)&&!G_.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:na,type:t.type,key:s,ref:i,props:r,_owner:o}};ee.createContext=function(t){return t={$$typeof:FI,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:UI,_context:t},t.Consumer=t};ee.createElement=K_;ee.createFactory=function(t){var e=K_.bind(null,t);return e.type=t,e};ee.createRef=function(){return{current:null}};ee.forwardRef=function(t){return{$$typeof:BI,render:t}};ee.isValidElement=Fd;ee.lazy=function(t){return{$$typeof:HI,_payload:{_status:-1,_result:t},_init:KI}};ee.memo=function(t,e){return{$$typeof:$I,type:t,compare:e===void 0?null:e}};ee.startTransition=function(t){var e=il.transition;il.transition={};try{t()}finally{il.transition=e}};ee.unstable_act=Q_;ee.useCallback=function(t,e){return ht.current.useCallback(t,e)};ee.useContext=function(t){return ht.current.useContext(t)};ee.useDebugValue=function(){};ee.useDeferredValue=function(t){return ht.current.useDeferredValue(t)};ee.useEffect=function(t,e){return ht.current.useEffect(t,e)};ee.useId=function(){return ht.current.useId()};ee.useImperativeHandle=function(t,e,n){return ht.current.useImperativeHandle(t,e,n)};ee.useInsertionEffect=function(t,e){return ht.current.useInsertionEffect(t,e)};ee.useLayoutEffect=function(t,e){return ht.current.useLayoutEffect(t,e)};ee.useMemo=function(t,e){return ht.current.useMemo(t,e)};ee.useReducer=function(t,e,n){return ht.current.useReducer(t,e,n)};ee.useRef=function(t){return ht.current.useRef(t)};ee.useState=function(t){return ht.current.useState(t)};ee.useSyncExternalStore=function(t,e,n){return ht.current.useSyncExternalStore(t,e,n)};ee.useTransition=function(){return ht.current.useTransition()};ee.version="18.3.1";B_.exports=ee;var U=B_.exports;const X_=OI(U),XI=DI({__proto__:null,default:X_},[U]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var YI=U,JI=Symbol.for("react.element"),ZI=Symbol.for("react.fragment"),ex=Object.prototype.hasOwnProperty,tx=YI.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,nx={key:!0,ref:!0,__self:!0,__source:!0};function Y_(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)ex.call(e,r)&&!nx.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:JI,type:t,key:i,ref:o,props:s,_owner:tx.current}}yu.Fragment=ZI;yu.jsx=Y_;yu.jsxs=Y_;F_.exports=yu;var d=F_.exports,ch={},J_={exports:{}},Ct={},Z_={exports:{}},ev={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e($,Q){var J=$.length;$.push(Q);e:for(;0<J;){var ge=J-1>>>1,Ce=$[ge];if(0<s(Ce,Q))$[ge]=Q,$[J]=Ce,J=ge;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var Q=$[0],J=$.pop();if(J!==Q){$[0]=J;e:for(var ge=0,Ce=$.length,Nr=Ce>>>1;ge<Nr;){var kt=2*(ge+1)-1,br=$[kt],Mt=kt+1,bn=$[Mt];if(0>s(br,J))Mt<Ce&&0>s(bn,br)?($[ge]=bn,$[Mt]=J,ge=Mt):($[ge]=br,$[kt]=J,ge=kt);else if(Mt<Ce&&0>s(bn,J))$[ge]=bn,$[Mt]=J,ge=Mt;else break e}}return Q}function s($,Q){var J=$.sortIndex-Q.sortIndex;return J!==0?J:$.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],f=1,m=null,g=3,S=!1,k=!1,x=!1,A=typeof setTimeout=="function"?setTimeout:null,E=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function I($){for(var Q=n(c);Q!==null;){if(Q.callback===null)r(c);else if(Q.startTime<=$)r(c),Q.sortIndex=Q.expirationTime,e(u,Q);else break;Q=n(c)}}function b($){if(x=!1,I($),!k)if(n(u)!==null)k=!0,Ri(M);else{var Q=n(c);Q!==null&&Ci(b,Q.startTime-$)}}function M($,Q){k=!1,x&&(x=!1,E(_),_=-1),S=!0;var J=g;try{for(I(Q),m=n(u);m!==null&&(!(m.expirationTime>Q)||$&&!P());){var ge=m.callback;if(typeof ge=="function"){m.callback=null,g=m.priorityLevel;var Ce=ge(m.expirationTime<=Q);Q=t.unstable_now(),typeof Ce=="function"?m.callback=Ce:m===n(u)&&r(u),I(Q)}else r(u);m=n(u)}if(m!==null)var Nr=!0;else{var kt=n(c);kt!==null&&Ci(b,kt.startTime-Q),Nr=!1}return Nr}finally{m=null,g=J,S=!1}}var N=!1,y=null,_=-1,T=5,C=-1;function P(){return!(t.unstable_now()-C<T)}function D(){if(y!==null){var $=t.unstable_now();C=$;var Q=!0;try{Q=y(!0,$)}finally{Q?R():(N=!1,y=null)}}else N=!1}var R;if(typeof w=="function")R=function(){w(D)};else if(typeof MessageChannel<"u"){var He=new MessageChannel,mn=He.port2;He.port1.onmessage=D,R=function(){mn.postMessage(null)}}else R=function(){A(D,0)};function Ri($){y=$,N||(N=!0,R())}function Ci($,Q){_=A(function(){$(t.unstable_now())},Q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function($){$.callback=null},t.unstable_continueExecution=function(){k||S||(k=!0,Ri(M))},t.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<$?Math.floor(1e3/$):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function($){switch(g){case 1:case 2:case 3:var Q=3;break;default:Q=g}var J=g;g=Q;try{return $()}finally{g=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function($,Q){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var J=g;g=$;try{return Q()}finally{g=J}},t.unstable_scheduleCallback=function($,Q,J){var ge=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?ge+J:ge):J=ge,$){case 1:var Ce=-1;break;case 2:Ce=250;break;case 5:Ce=1073741823;break;case 4:Ce=1e4;break;default:Ce=5e3}return Ce=J+Ce,$={id:f++,callback:Q,priorityLevel:$,startTime:J,expirationTime:Ce,sortIndex:-1},J>ge?($.sortIndex=J,e(c,$),n(u)===null&&$===n(c)&&(x?(E(_),_=-1):x=!0,Ci(b,J-ge))):($.sortIndex=Ce,e(u,$),k||S||(k=!0,Ri(M))),$},t.unstable_shouldYield=P,t.unstable_wrapCallback=function($){var Q=g;return function(){var J=g;g=Q;try{return $.apply(this,arguments)}finally{g=J}}}})(ev);Z_.exports=ev;var rx=Z_.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sx=U,Rt=rx;function F(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var tv=new Set,Ro={};function as(t,e){Zs(t,e),Zs(t+"Capture",e)}function Zs(t,e){for(Ro[t]=e,t=0;t<e.length;t++)tv.add(e[t])}var In=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hh=Object.prototype.hasOwnProperty,ix=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Fm={},Bm={};function ox(t){return hh.call(Bm,t)?!0:hh.call(Fm,t)?!1:ix.test(t)?Bm[t]=!0:(Fm[t]=!0,!1)}function ax(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function lx(t,e,n,r){if(e===null||typeof e>"u"||ax(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function dt(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var Qe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Qe[t]=new dt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Qe[e]=new dt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Qe[t]=new dt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Qe[t]=new dt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Qe[t]=new dt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Qe[t]=new dt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Qe[t]=new dt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Qe[t]=new dt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Qe[t]=new dt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Bd=/[\-:]([a-z])/g;function zd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Bd,zd);Qe[e]=new dt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Bd,zd);Qe[e]=new dt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Bd,zd);Qe[e]=new dt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Qe[t]=new dt(t,1,!1,t.toLowerCase(),null,!1,!1)});Qe.xlinkHref=new dt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Qe[t]=new dt(t,1,!1,t.toLowerCase(),null,!0,!0)});function $d(t,e,n,r){var s=Qe.hasOwnProperty(e)?Qe[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(lx(e,n,s,r)&&(n=null),r||s===null?ox(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Nn=sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Oa=Symbol.for("react.element"),Rs=Symbol.for("react.portal"),Cs=Symbol.for("react.fragment"),Hd=Symbol.for("react.strict_mode"),dh=Symbol.for("react.profiler"),nv=Symbol.for("react.provider"),rv=Symbol.for("react.context"),qd=Symbol.for("react.forward_ref"),fh=Symbol.for("react.suspense"),ph=Symbol.for("react.suspense_list"),Wd=Symbol.for("react.memo"),Bn=Symbol.for("react.lazy"),sv=Symbol.for("react.offscreen"),zm=Symbol.iterator;function Hi(t){return t===null||typeof t!="object"?null:(t=zm&&t[zm]||t["@@iterator"],typeof t=="function"?t:null)}var we=Object.assign,xc;function Zi(t){if(xc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);xc=e&&e[1]||""}return`
`+xc+t}var Sc=!1;function Rc(t,e){if(!t||Sc)return"";Sc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Sc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Zi(t):""}function ux(t){switch(t.tag){case 5:return Zi(t.type);case 16:return Zi("Lazy");case 13:return Zi("Suspense");case 19:return Zi("SuspenseList");case 0:case 2:case 15:return t=Rc(t.type,!1),t;case 11:return t=Rc(t.type.render,!1),t;case 1:return t=Rc(t.type,!0),t;default:return""}}function mh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Cs:return"Fragment";case Rs:return"Portal";case dh:return"Profiler";case Hd:return"StrictMode";case fh:return"Suspense";case ph:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case rv:return(t.displayName||"Context")+".Consumer";case nv:return(t._context.displayName||"Context")+".Provider";case qd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Wd:return e=t.displayName||null,e!==null?e:mh(t.type)||"Memo";case Bn:e=t._payload,t=t._init;try{return mh(t(e))}catch{}}return null}function cx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return mh(e);case 8:return e===Hd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function mr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function iv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function hx(t){var e=iv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Va(t){t._valueTracker||(t._valueTracker=hx(t))}function ov(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=iv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Rl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function gh(t,e){var n=e.checked;return we({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function $m(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=mr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function av(t,e){e=e.checked,e!=null&&$d(t,"checked",e,!1)}function yh(t,e){av(t,e);var n=mr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?_h(t,e.type,n):e.hasOwnProperty("defaultValue")&&_h(t,e.type,mr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Hm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function _h(t,e,n){(e!=="number"||Rl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var eo=Array.isArray;function Fs(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+mr(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function vh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(F(91));return we({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function qm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(F(92));if(eo(n)){if(1<n.length)throw Error(F(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:mr(n)}}function lv(t,e){var n=mr(e.value),r=mr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Wm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function uv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function wh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?uv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var La,cv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(La=La||document.createElement("div"),La.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=La.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Co(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var uo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},dx=["Webkit","ms","Moz","O"];Object.keys(uo).forEach(function(t){dx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),uo[e]=uo[t]})});function hv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||uo.hasOwnProperty(t)&&uo[t]?(""+e).trim():e+"px"}function dv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=hv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var fx=we({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Eh(t,e){if(e){if(fx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(F(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(F(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(F(61))}if(e.style!=null&&typeof e.style!="object")throw Error(F(62))}}function Th(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ih=null;function Gd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var xh=null,Bs=null,zs=null;function Gm(t){if(t=ia(t)){if(typeof xh!="function")throw Error(F(280));var e=t.stateNode;e&&(e=Tu(e),xh(t.stateNode,t.type,e))}}function fv(t){Bs?zs?zs.push(t):zs=[t]:Bs=t}function pv(){if(Bs){var t=Bs,e=zs;if(zs=Bs=null,Gm(t),e)for(t=0;t<e.length;t++)Gm(e[t])}}function mv(t,e){return t(e)}function gv(){}var Cc=!1;function yv(t,e,n){if(Cc)return t(e,n);Cc=!0;try{return mv(t,e,n)}finally{Cc=!1,(Bs!==null||zs!==null)&&(gv(),pv())}}function Ao(t,e){var n=t.stateNode;if(n===null)return null;var r=Tu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(F(231,e,typeof n));return n}var Sh=!1;if(In)try{var qi={};Object.defineProperty(qi,"passive",{get:function(){Sh=!0}}),window.addEventListener("test",qi,qi),window.removeEventListener("test",qi,qi)}catch{Sh=!1}function px(t,e,n,r,s,i,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var co=!1,Cl=null,Al=!1,Rh=null,mx={onError:function(t){co=!0,Cl=t}};function gx(t,e,n,r,s,i,o,l,u){co=!1,Cl=null,px.apply(mx,arguments)}function yx(t,e,n,r,s,i,o,l,u){if(gx.apply(this,arguments),co){if(co){var c=Cl;co=!1,Cl=null}else throw Error(F(198));Al||(Al=!0,Rh=c)}}function ls(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function _v(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Km(t){if(ls(t)!==t)throw Error(F(188))}function _x(t){var e=t.alternate;if(!e){if(e=ls(t),e===null)throw Error(F(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Km(s),t;if(i===r)return Km(s),e;i=i.sibling}throw Error(F(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?t:e}function vv(t){return t=_x(t),t!==null?wv(t):null}function wv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=wv(t);if(e!==null)return e;t=t.sibling}return null}var Ev=Rt.unstable_scheduleCallback,Qm=Rt.unstable_cancelCallback,vx=Rt.unstable_shouldYield,wx=Rt.unstable_requestPaint,ke=Rt.unstable_now,Ex=Rt.unstable_getCurrentPriorityLevel,Kd=Rt.unstable_ImmediatePriority,Tv=Rt.unstable_UserBlockingPriority,kl=Rt.unstable_NormalPriority,Tx=Rt.unstable_LowPriority,Iv=Rt.unstable_IdlePriority,_u=null,rn=null;function Ix(t){if(rn&&typeof rn.onCommitFiberRoot=="function")try{rn.onCommitFiberRoot(_u,t,void 0,(t.current.flags&128)===128)}catch{}}var Ht=Math.clz32?Math.clz32:Rx,xx=Math.log,Sx=Math.LN2;function Rx(t){return t>>>=0,t===0?32:31-(xx(t)/Sx|0)|0}var ja=64,Ma=4194304;function to(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Pl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=to(l):(i&=o,i!==0&&(r=to(i)))}else o=n&~s,o!==0?r=to(o):i!==0&&(r=to(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Ht(e),s=1<<n,r|=t[n],e&=~s;return r}function Cx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ax(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Ht(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=Cx(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function Ch(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function xv(){var t=ja;return ja<<=1,!(ja&4194240)&&(ja=64),t}function Ac(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ra(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Ht(e),t[e]=n}function kx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Ht(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Qd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Ht(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var ae=0;function Sv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Rv,Xd,Cv,Av,kv,Ah=!1,Ua=[],er=null,tr=null,nr=null,ko=new Map,Po=new Map,$n=[],Px="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xm(t,e){switch(t){case"focusin":case"focusout":er=null;break;case"dragenter":case"dragleave":tr=null;break;case"mouseover":case"mouseout":nr=null;break;case"pointerover":case"pointerout":ko.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Po.delete(e.pointerId)}}function Wi(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=ia(e),e!==null&&Xd(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function Nx(t,e,n,r,s){switch(e){case"focusin":return er=Wi(er,t,e,n,r,s),!0;case"dragenter":return tr=Wi(tr,t,e,n,r,s),!0;case"mouseover":return nr=Wi(nr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return ko.set(i,Wi(ko.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Po.set(i,Wi(Po.get(i)||null,t,e,n,r,s)),!0}return!1}function Pv(t){var e=Br(t.target);if(e!==null){var n=ls(e);if(n!==null){if(e=n.tag,e===13){if(e=_v(n),e!==null){t.blockedOn=e,kv(t.priority,function(){Cv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ol(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=kh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Ih=r,n.target.dispatchEvent(r),Ih=null}else return e=ia(n),e!==null&&Xd(e),t.blockedOn=n,!1;e.shift()}return!0}function Ym(t,e,n){ol(t)&&n.delete(e)}function bx(){Ah=!1,er!==null&&ol(er)&&(er=null),tr!==null&&ol(tr)&&(tr=null),nr!==null&&ol(nr)&&(nr=null),ko.forEach(Ym),Po.forEach(Ym)}function Gi(t,e){t.blockedOn===e&&(t.blockedOn=null,Ah||(Ah=!0,Rt.unstable_scheduleCallback(Rt.unstable_NormalPriority,bx)))}function No(t){function e(s){return Gi(s,t)}if(0<Ua.length){Gi(Ua[0],t);for(var n=1;n<Ua.length;n++){var r=Ua[n];r.blockedOn===t&&(r.blockedOn=null)}}for(er!==null&&Gi(er,t),tr!==null&&Gi(tr,t),nr!==null&&Gi(nr,t),ko.forEach(e),Po.forEach(e),n=0;n<$n.length;n++)r=$n[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<$n.length&&(n=$n[0],n.blockedOn===null);)Pv(n),n.blockedOn===null&&$n.shift()}var $s=Nn.ReactCurrentBatchConfig,Nl=!0;function Dx(t,e,n,r){var s=ae,i=$s.transition;$s.transition=null;try{ae=1,Yd(t,e,n,r)}finally{ae=s,$s.transition=i}}function Ox(t,e,n,r){var s=ae,i=$s.transition;$s.transition=null;try{ae=4,Yd(t,e,n,r)}finally{ae=s,$s.transition=i}}function Yd(t,e,n,r){if(Nl){var s=kh(t,e,n,r);if(s===null)Mc(t,e,r,bl,n),Xm(t,r);else if(Nx(s,t,e,n,r))r.stopPropagation();else if(Xm(t,r),e&4&&-1<Px.indexOf(t)){for(;s!==null;){var i=ia(s);if(i!==null&&Rv(i),i=kh(t,e,n,r),i===null&&Mc(t,e,r,bl,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Mc(t,e,r,null,n)}}var bl=null;function kh(t,e,n,r){if(bl=null,t=Gd(r),t=Br(t),t!==null)if(e=ls(t),e===null)t=null;else if(n=e.tag,n===13){if(t=_v(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return bl=t,null}function Nv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ex()){case Kd:return 1;case Tv:return 4;case kl:case Tx:return 16;case Iv:return 536870912;default:return 16}default:return 16}}var Xn=null,Jd=null,al=null;function bv(){if(al)return al;var t,e=Jd,n=e.length,r,s="value"in Xn?Xn.value:Xn.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return al=s.slice(t,1<r?1-r:void 0)}function ll(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Fa(){return!0}function Jm(){return!1}function At(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Fa:Jm,this.isPropagationStopped=Jm,this}return we(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Fa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Fa)},persist:function(){},isPersistent:Fa}),e}var gi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zd=At(gi),sa=we({},gi,{view:0,detail:0}),Vx=At(sa),kc,Pc,Ki,vu=we({},sa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ef,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ki&&(Ki&&t.type==="mousemove"?(kc=t.screenX-Ki.screenX,Pc=t.screenY-Ki.screenY):Pc=kc=0,Ki=t),kc)},movementY:function(t){return"movementY"in t?t.movementY:Pc}}),Zm=At(vu),Lx=we({},vu,{dataTransfer:0}),jx=At(Lx),Mx=we({},sa,{relatedTarget:0}),Nc=At(Mx),Ux=we({},gi,{animationName:0,elapsedTime:0,pseudoElement:0}),Fx=At(Ux),Bx=we({},gi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),zx=At(Bx),$x=we({},gi,{data:0}),eg=At($x),Hx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Wx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Wx[t])?!!e[t]:!1}function ef(){return Gx}var Kx=we({},sa,{key:function(t){if(t.key){var e=Hx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ll(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?qx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ef,charCode:function(t){return t.type==="keypress"?ll(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ll(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Qx=At(Kx),Xx=we({},vu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tg=At(Xx),Yx=we({},sa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ef}),Jx=At(Yx),Zx=we({},gi,{propertyName:0,elapsedTime:0,pseudoElement:0}),e1=At(Zx),t1=we({},vu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),n1=At(t1),r1=[9,13,27,32],tf=In&&"CompositionEvent"in window,ho=null;In&&"documentMode"in document&&(ho=document.documentMode);var s1=In&&"TextEvent"in window&&!ho,Dv=In&&(!tf||ho&&8<ho&&11>=ho),ng=" ",rg=!1;function Ov(t,e){switch(t){case"keyup":return r1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Vv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var As=!1;function i1(t,e){switch(t){case"compositionend":return Vv(e);case"keypress":return e.which!==32?null:(rg=!0,ng);case"textInput":return t=e.data,t===ng&&rg?null:t;default:return null}}function o1(t,e){if(As)return t==="compositionend"||!tf&&Ov(t,e)?(t=bv(),al=Jd=Xn=null,As=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Dv&&e.locale!=="ko"?null:e.data;default:return null}}var a1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function sg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!a1[t.type]:e==="textarea"}function Lv(t,e,n,r){fv(r),e=Dl(e,"onChange"),0<e.length&&(n=new Zd("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var fo=null,bo=null;function l1(t){Gv(t,0)}function wu(t){var e=Ns(t);if(ov(e))return t}function u1(t,e){if(t==="change")return e}var jv=!1;if(In){var bc;if(In){var Dc="oninput"in document;if(!Dc){var ig=document.createElement("div");ig.setAttribute("oninput","return;"),Dc=typeof ig.oninput=="function"}bc=Dc}else bc=!1;jv=bc&&(!document.documentMode||9<document.documentMode)}function og(){fo&&(fo.detachEvent("onpropertychange",Mv),bo=fo=null)}function Mv(t){if(t.propertyName==="value"&&wu(bo)){var e=[];Lv(e,bo,t,Gd(t)),yv(l1,e)}}function c1(t,e,n){t==="focusin"?(og(),fo=e,bo=n,fo.attachEvent("onpropertychange",Mv)):t==="focusout"&&og()}function h1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return wu(bo)}function d1(t,e){if(t==="click")return wu(e)}function f1(t,e){if(t==="input"||t==="change")return wu(e)}function p1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Gt=typeof Object.is=="function"?Object.is:p1;function Do(t,e){if(Gt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!hh.call(e,s)||!Gt(t[s],e[s]))return!1}return!0}function ag(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function lg(t,e){var n=ag(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ag(n)}}function Uv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Uv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fv(){for(var t=window,e=Rl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Rl(t.document)}return e}function nf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function m1(t){var e=Fv(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Uv(n.ownerDocument.documentElement,n)){if(r!==null&&nf(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=lg(n,i);var o=lg(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var g1=In&&"documentMode"in document&&11>=document.documentMode,ks=null,Ph=null,po=null,Nh=!1;function ug(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Nh||ks==null||ks!==Rl(r)||(r=ks,"selectionStart"in r&&nf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),po&&Do(po,r)||(po=r,r=Dl(Ph,"onSelect"),0<r.length&&(e=new Zd("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ks)))}function Ba(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ps={animationend:Ba("Animation","AnimationEnd"),animationiteration:Ba("Animation","AnimationIteration"),animationstart:Ba("Animation","AnimationStart"),transitionend:Ba("Transition","TransitionEnd")},Oc={},Bv={};In&&(Bv=document.createElement("div").style,"AnimationEvent"in window||(delete Ps.animationend.animation,delete Ps.animationiteration.animation,delete Ps.animationstart.animation),"TransitionEvent"in window||delete Ps.transitionend.transition);function Eu(t){if(Oc[t])return Oc[t];if(!Ps[t])return t;var e=Ps[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Bv)return Oc[t]=e[n];return t}var zv=Eu("animationend"),$v=Eu("animationiteration"),Hv=Eu("animationstart"),qv=Eu("transitionend"),Wv=new Map,cg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function xr(t,e){Wv.set(t,e),as(e,[t])}for(var Vc=0;Vc<cg.length;Vc++){var Lc=cg[Vc],y1=Lc.toLowerCase(),_1=Lc[0].toUpperCase()+Lc.slice(1);xr(y1,"on"+_1)}xr(zv,"onAnimationEnd");xr($v,"onAnimationIteration");xr(Hv,"onAnimationStart");xr("dblclick","onDoubleClick");xr("focusin","onFocus");xr("focusout","onBlur");xr(qv,"onTransitionEnd");Zs("onMouseEnter",["mouseout","mouseover"]);Zs("onMouseLeave",["mouseout","mouseover"]);Zs("onPointerEnter",["pointerout","pointerover"]);Zs("onPointerLeave",["pointerout","pointerover"]);as("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));as("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));as("onBeforeInput",["compositionend","keypress","textInput","paste"]);as("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));as("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));as("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var no="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),v1=new Set("cancel close invalid load scroll toggle".split(" ").concat(no));function hg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,yx(r,e,void 0,t),t.currentTarget=null}function Gv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;hg(s,l,c),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;hg(s,l,c),i=u}}}if(Al)throw t=Rh,Al=!1,Rh=null,t}function fe(t,e){var n=e[Lh];n===void 0&&(n=e[Lh]=new Set);var r=t+"__bubble";n.has(r)||(Kv(e,t,2,!1),n.add(r))}function jc(t,e,n){var r=0;e&&(r|=4),Kv(n,t,r,e)}var za="_reactListening"+Math.random().toString(36).slice(2);function Oo(t){if(!t[za]){t[za]=!0,tv.forEach(function(n){n!=="selectionchange"&&(v1.has(n)||jc(n,!1,t),jc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[za]||(e[za]=!0,jc("selectionchange",!1,e))}}function Kv(t,e,n,r){switch(Nv(e)){case 1:var s=Dx;break;case 4:s=Ox;break;default:s=Yd}n=s.bind(null,e,n,t),s=void 0,!Sh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Mc(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Br(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}yv(function(){var c=i,f=Gd(n),m=[];e:{var g=Wv.get(t);if(g!==void 0){var S=Zd,k=t;switch(t){case"keypress":if(ll(n)===0)break e;case"keydown":case"keyup":S=Qx;break;case"focusin":k="focus",S=Nc;break;case"focusout":k="blur",S=Nc;break;case"beforeblur":case"afterblur":S=Nc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=Zm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=jx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=Jx;break;case zv:case $v:case Hv:S=Fx;break;case qv:S=e1;break;case"scroll":S=Vx;break;case"wheel":S=n1;break;case"copy":case"cut":case"paste":S=zx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=tg}var x=(e&4)!==0,A=!x&&t==="scroll",E=x?g!==null?g+"Capture":null:g;x=[];for(var w=c,I;w!==null;){I=w;var b=I.stateNode;if(I.tag===5&&b!==null&&(I=b,E!==null&&(b=Ao(w,E),b!=null&&x.push(Vo(w,b,I)))),A)break;w=w.return}0<x.length&&(g=new S(g,k,null,n,f),m.push({event:g,listeners:x}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",S=t==="mouseout"||t==="pointerout",g&&n!==Ih&&(k=n.relatedTarget||n.fromElement)&&(Br(k)||k[xn]))break e;if((S||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,S?(k=n.relatedTarget||n.toElement,S=c,k=k?Br(k):null,k!==null&&(A=ls(k),k!==A||k.tag!==5&&k.tag!==6)&&(k=null)):(S=null,k=c),S!==k)){if(x=Zm,b="onMouseLeave",E="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(x=tg,b="onPointerLeave",E="onPointerEnter",w="pointer"),A=S==null?g:Ns(S),I=k==null?g:Ns(k),g=new x(b,w+"leave",S,n,f),g.target=A,g.relatedTarget=I,b=null,Br(f)===c&&(x=new x(E,w+"enter",k,n,f),x.target=I,x.relatedTarget=A,b=x),A=b,S&&k)t:{for(x=S,E=k,w=0,I=x;I;I=ws(I))w++;for(I=0,b=E;b;b=ws(b))I++;for(;0<w-I;)x=ws(x),w--;for(;0<I-w;)E=ws(E),I--;for(;w--;){if(x===E||E!==null&&x===E.alternate)break t;x=ws(x),E=ws(E)}x=null}else x=null;S!==null&&dg(m,g,S,x,!1),k!==null&&A!==null&&dg(m,A,k,x,!0)}}e:{if(g=c?Ns(c):window,S=g.nodeName&&g.nodeName.toLowerCase(),S==="select"||S==="input"&&g.type==="file")var M=u1;else if(sg(g))if(jv)M=f1;else{M=h1;var N=c1}else(S=g.nodeName)&&S.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(M=d1);if(M&&(M=M(t,c))){Lv(m,M,n,f);break e}N&&N(t,g,c),t==="focusout"&&(N=g._wrapperState)&&N.controlled&&g.type==="number"&&_h(g,"number",g.value)}switch(N=c?Ns(c):window,t){case"focusin":(sg(N)||N.contentEditable==="true")&&(ks=N,Ph=c,po=null);break;case"focusout":po=Ph=ks=null;break;case"mousedown":Nh=!0;break;case"contextmenu":case"mouseup":case"dragend":Nh=!1,ug(m,n,f);break;case"selectionchange":if(g1)break;case"keydown":case"keyup":ug(m,n,f)}var y;if(tf)e:{switch(t){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else As?Ov(t,n)&&(_="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(Dv&&n.locale!=="ko"&&(As||_!=="onCompositionStart"?_==="onCompositionEnd"&&As&&(y=bv()):(Xn=f,Jd="value"in Xn?Xn.value:Xn.textContent,As=!0)),N=Dl(c,_),0<N.length&&(_=new eg(_,t,null,n,f),m.push({event:_,listeners:N}),y?_.data=y:(y=Vv(n),y!==null&&(_.data=y)))),(y=s1?i1(t,n):o1(t,n))&&(c=Dl(c,"onBeforeInput"),0<c.length&&(f=new eg("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:c}),f.data=y))}Gv(m,e)})}function Vo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Dl(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Ao(t,n),i!=null&&r.unshift(Vo(t,i,s)),i=Ao(t,e),i!=null&&r.push(Vo(t,i,s))),t=t.return}return r}function ws(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function dg(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,s?(u=Ao(n,i),u!=null&&o.unshift(Vo(n,u,l))):s||(u=Ao(n,i),u!=null&&o.push(Vo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var w1=/\r\n?/g,E1=/\u0000|\uFFFD/g;function fg(t){return(typeof t=="string"?t:""+t).replace(w1,`
`).replace(E1,"")}function $a(t,e,n){if(e=fg(e),fg(t)!==e&&n)throw Error(F(425))}function Ol(){}var bh=null,Dh=null;function Oh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Vh=typeof setTimeout=="function"?setTimeout:void 0,T1=typeof clearTimeout=="function"?clearTimeout:void 0,pg=typeof Promise=="function"?Promise:void 0,I1=typeof queueMicrotask=="function"?queueMicrotask:typeof pg<"u"?function(t){return pg.resolve(null).then(t).catch(x1)}:Vh;function x1(t){setTimeout(function(){throw t})}function Uc(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),No(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);No(e)}function rr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function mg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var yi=Math.random().toString(36).slice(2),tn="__reactFiber$"+yi,Lo="__reactProps$"+yi,xn="__reactContainer$"+yi,Lh="__reactEvents$"+yi,S1="__reactListeners$"+yi,R1="__reactHandles$"+yi;function Br(t){var e=t[tn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[xn]||n[tn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=mg(t);t!==null;){if(n=t[tn])return n;t=mg(t)}return e}t=n,n=t.parentNode}return null}function ia(t){return t=t[tn]||t[xn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ns(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(F(33))}function Tu(t){return t[Lo]||null}var jh=[],bs=-1;function Sr(t){return{current:t}}function me(t){0>bs||(t.current=jh[bs],jh[bs]=null,bs--)}function ce(t,e){bs++,jh[bs]=t.current,t.current=e}var gr={},st=Sr(gr),yt=Sr(!1),Xr=gr;function ei(t,e){var n=t.type.contextTypes;if(!n)return gr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function _t(t){return t=t.childContextTypes,t!=null}function Vl(){me(yt),me(st)}function gg(t,e,n){if(st.current!==gr)throw Error(F(168));ce(st,e),ce(yt,n)}function Qv(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(F(108,cx(t)||"Unknown",s));return we({},n,r)}function Ll(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||gr,Xr=st.current,ce(st,t),ce(yt,yt.current),!0}function yg(t,e,n){var r=t.stateNode;if(!r)throw Error(F(169));n?(t=Qv(t,e,Xr),r.__reactInternalMemoizedMergedChildContext=t,me(yt),me(st),ce(st,t)):me(yt),ce(yt,n)}var yn=null,Iu=!1,Fc=!1;function Xv(t){yn===null?yn=[t]:yn.push(t)}function C1(t){Iu=!0,Xv(t)}function Rr(){if(!Fc&&yn!==null){Fc=!0;var t=0,e=ae;try{var n=yn;for(ae=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}yn=null,Iu=!1}catch(s){throw yn!==null&&(yn=yn.slice(t+1)),Ev(Kd,Rr),s}finally{ae=e,Fc=!1}}return null}var Ds=[],Os=0,jl=null,Ml=0,Pt=[],Nt=0,Yr=null,_n=1,vn="";function Mr(t,e){Ds[Os++]=Ml,Ds[Os++]=jl,jl=t,Ml=e}function Yv(t,e,n){Pt[Nt++]=_n,Pt[Nt++]=vn,Pt[Nt++]=Yr,Yr=t;var r=_n;t=vn;var s=32-Ht(r)-1;r&=~(1<<s),n+=1;var i=32-Ht(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,_n=1<<32-Ht(e)+s|n<<s|r,vn=i+t}else _n=1<<i|n<<s|r,vn=t}function rf(t){t.return!==null&&(Mr(t,1),Yv(t,1,0))}function sf(t){for(;t===jl;)jl=Ds[--Os],Ds[Os]=null,Ml=Ds[--Os],Ds[Os]=null;for(;t===Yr;)Yr=Pt[--Nt],Pt[Nt]=null,vn=Pt[--Nt],Pt[Nt]=null,_n=Pt[--Nt],Pt[Nt]=null}var St=null,Tt=null,ye=!1,zt=null;function Jv(t,e){var n=Ot(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function _g(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,St=t,Tt=rr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,St=t,Tt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Yr!==null?{id:_n,overflow:vn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Ot(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,St=t,Tt=null,!0):!1;default:return!1}}function Mh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Uh(t){if(ye){var e=Tt;if(e){var n=e;if(!_g(t,e)){if(Mh(t))throw Error(F(418));e=rr(n.nextSibling);var r=St;e&&_g(t,e)?Jv(r,n):(t.flags=t.flags&-4097|2,ye=!1,St=t)}}else{if(Mh(t))throw Error(F(418));t.flags=t.flags&-4097|2,ye=!1,St=t}}}function vg(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;St=t}function Ha(t){if(t!==St)return!1;if(!ye)return vg(t),ye=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Oh(t.type,t.memoizedProps)),e&&(e=Tt)){if(Mh(t))throw Zv(),Error(F(418));for(;e;)Jv(t,e),e=rr(e.nextSibling)}if(vg(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(F(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Tt=rr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Tt=null}}else Tt=St?rr(t.stateNode.nextSibling):null;return!0}function Zv(){for(var t=Tt;t;)t=rr(t.nextSibling)}function ti(){Tt=St=null,ye=!1}function of(t){zt===null?zt=[t]:zt.push(t)}var A1=Nn.ReactCurrentBatchConfig;function Qi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,t))}return t}function qa(t,e){throw t=Object.prototype.toString.call(e),Error(F(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function wg(t){var e=t._init;return e(t._payload)}function e0(t){function e(E,w){if(t){var I=E.deletions;I===null?(E.deletions=[w],E.flags|=16):I.push(w)}}function n(E,w){if(!t)return null;for(;w!==null;)e(E,w),w=w.sibling;return null}function r(E,w){for(E=new Map;w!==null;)w.key!==null?E.set(w.key,w):E.set(w.index,w),w=w.sibling;return E}function s(E,w){return E=ar(E,w),E.index=0,E.sibling=null,E}function i(E,w,I){return E.index=I,t?(I=E.alternate,I!==null?(I=I.index,I<w?(E.flags|=2,w):I):(E.flags|=2,w)):(E.flags|=1048576,w)}function o(E){return t&&E.alternate===null&&(E.flags|=2),E}function l(E,w,I,b){return w===null||w.tag!==6?(w=Gc(I,E.mode,b),w.return=E,w):(w=s(w,I),w.return=E,w)}function u(E,w,I,b){var M=I.type;return M===Cs?f(E,w,I.props.children,b,I.key):w!==null&&(w.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Bn&&wg(M)===w.type)?(b=s(w,I.props),b.ref=Qi(E,w,I),b.return=E,b):(b=ml(I.type,I.key,I.props,null,E.mode,b),b.ref=Qi(E,w,I),b.return=E,b)}function c(E,w,I,b){return w===null||w.tag!==4||w.stateNode.containerInfo!==I.containerInfo||w.stateNode.implementation!==I.implementation?(w=Kc(I,E.mode,b),w.return=E,w):(w=s(w,I.children||[]),w.return=E,w)}function f(E,w,I,b,M){return w===null||w.tag!==7?(w=Wr(I,E.mode,b,M),w.return=E,w):(w=s(w,I),w.return=E,w)}function m(E,w,I){if(typeof w=="string"&&w!==""||typeof w=="number")return w=Gc(""+w,E.mode,I),w.return=E,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Oa:return I=ml(w.type,w.key,w.props,null,E.mode,I),I.ref=Qi(E,null,w),I.return=E,I;case Rs:return w=Kc(w,E.mode,I),w.return=E,w;case Bn:var b=w._init;return m(E,b(w._payload),I)}if(eo(w)||Hi(w))return w=Wr(w,E.mode,I,null),w.return=E,w;qa(E,w)}return null}function g(E,w,I,b){var M=w!==null?w.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return M!==null?null:l(E,w,""+I,b);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Oa:return I.key===M?u(E,w,I,b):null;case Rs:return I.key===M?c(E,w,I,b):null;case Bn:return M=I._init,g(E,w,M(I._payload),b)}if(eo(I)||Hi(I))return M!==null?null:f(E,w,I,b,null);qa(E,I)}return null}function S(E,w,I,b,M){if(typeof b=="string"&&b!==""||typeof b=="number")return E=E.get(I)||null,l(w,E,""+b,M);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Oa:return E=E.get(b.key===null?I:b.key)||null,u(w,E,b,M);case Rs:return E=E.get(b.key===null?I:b.key)||null,c(w,E,b,M);case Bn:var N=b._init;return S(E,w,I,N(b._payload),M)}if(eo(b)||Hi(b))return E=E.get(I)||null,f(w,E,b,M,null);qa(w,b)}return null}function k(E,w,I,b){for(var M=null,N=null,y=w,_=w=0,T=null;y!==null&&_<I.length;_++){y.index>_?(T=y,y=null):T=y.sibling;var C=g(E,y,I[_],b);if(C===null){y===null&&(y=T);break}t&&y&&C.alternate===null&&e(E,y),w=i(C,w,_),N===null?M=C:N.sibling=C,N=C,y=T}if(_===I.length)return n(E,y),ye&&Mr(E,_),M;if(y===null){for(;_<I.length;_++)y=m(E,I[_],b),y!==null&&(w=i(y,w,_),N===null?M=y:N.sibling=y,N=y);return ye&&Mr(E,_),M}for(y=r(E,y);_<I.length;_++)T=S(y,E,_,I[_],b),T!==null&&(t&&T.alternate!==null&&y.delete(T.key===null?_:T.key),w=i(T,w,_),N===null?M=T:N.sibling=T,N=T);return t&&y.forEach(function(P){return e(E,P)}),ye&&Mr(E,_),M}function x(E,w,I,b){var M=Hi(I);if(typeof M!="function")throw Error(F(150));if(I=M.call(I),I==null)throw Error(F(151));for(var N=M=null,y=w,_=w=0,T=null,C=I.next();y!==null&&!C.done;_++,C=I.next()){y.index>_?(T=y,y=null):T=y.sibling;var P=g(E,y,C.value,b);if(P===null){y===null&&(y=T);break}t&&y&&P.alternate===null&&e(E,y),w=i(P,w,_),N===null?M=P:N.sibling=P,N=P,y=T}if(C.done)return n(E,y),ye&&Mr(E,_),M;if(y===null){for(;!C.done;_++,C=I.next())C=m(E,C.value,b),C!==null&&(w=i(C,w,_),N===null?M=C:N.sibling=C,N=C);return ye&&Mr(E,_),M}for(y=r(E,y);!C.done;_++,C=I.next())C=S(y,E,_,C.value,b),C!==null&&(t&&C.alternate!==null&&y.delete(C.key===null?_:C.key),w=i(C,w,_),N===null?M=C:N.sibling=C,N=C);return t&&y.forEach(function(D){return e(E,D)}),ye&&Mr(E,_),M}function A(E,w,I,b){if(typeof I=="object"&&I!==null&&I.type===Cs&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case Oa:e:{for(var M=I.key,N=w;N!==null;){if(N.key===M){if(M=I.type,M===Cs){if(N.tag===7){n(E,N.sibling),w=s(N,I.props.children),w.return=E,E=w;break e}}else if(N.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Bn&&wg(M)===N.type){n(E,N.sibling),w=s(N,I.props),w.ref=Qi(E,N,I),w.return=E,E=w;break e}n(E,N);break}else e(E,N);N=N.sibling}I.type===Cs?(w=Wr(I.props.children,E.mode,b,I.key),w.return=E,E=w):(b=ml(I.type,I.key,I.props,null,E.mode,b),b.ref=Qi(E,w,I),b.return=E,E=b)}return o(E);case Rs:e:{for(N=I.key;w!==null;){if(w.key===N)if(w.tag===4&&w.stateNode.containerInfo===I.containerInfo&&w.stateNode.implementation===I.implementation){n(E,w.sibling),w=s(w,I.children||[]),w.return=E,E=w;break e}else{n(E,w);break}else e(E,w);w=w.sibling}w=Kc(I,E.mode,b),w.return=E,E=w}return o(E);case Bn:return N=I._init,A(E,w,N(I._payload),b)}if(eo(I))return k(E,w,I,b);if(Hi(I))return x(E,w,I,b);qa(E,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,w!==null&&w.tag===6?(n(E,w.sibling),w=s(w,I),w.return=E,E=w):(n(E,w),w=Gc(I,E.mode,b),w.return=E,E=w),o(E)):n(E,w)}return A}var ni=e0(!0),t0=e0(!1),Ul=Sr(null),Fl=null,Vs=null,af=null;function lf(){af=Vs=Fl=null}function uf(t){var e=Ul.current;me(Ul),t._currentValue=e}function Fh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Hs(t,e){Fl=t,af=Vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(gt=!0),t.firstContext=null)}function Lt(t){var e=t._currentValue;if(af!==t)if(t={context:t,memoizedValue:e,next:null},Vs===null){if(Fl===null)throw Error(F(308));Vs=t,Fl.dependencies={lanes:0,firstContext:t}}else Vs=Vs.next=t;return e}var zr=null;function cf(t){zr===null?zr=[t]:zr.push(t)}function n0(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,cf(e)):(n.next=s.next,s.next=n),e.interleaved=n,Sn(t,r)}function Sn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var zn=!1;function hf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function r0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Tn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function sr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ie&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Sn(t,n)}return s=r.interleaved,s===null?(e.next=e,cf(r)):(e.next=s.next,s.next=e),r.interleaved=e,Sn(t,n)}function ul(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Qd(t,n)}}function Eg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Bl(t,e,n,r){var s=t.updateQueue;zn=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?i=c:o.next=c,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(i!==null){var m=s.baseState;o=0,f=c=u=null,l=i;do{var g=l.lane,S=l.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:S,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var k=t,x=l;switch(g=e,S=n,x.tag){case 1:if(k=x.payload,typeof k=="function"){m=k.call(S,m,g);break e}m=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=x.payload,g=typeof k=="function"?k.call(S,m,g):k,g==null)break e;m=we({},m,g);break e;case 2:zn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=s.effects,g===null?s.effects=[l]:g.push(l))}else S={eventTime:S,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=S,u=m):f=f.next=S,o|=g;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;g=l,l=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(f===null&&(u=m),s.baseState=u,s.firstBaseUpdate=c,s.lastBaseUpdate=f,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Zr|=o,t.lanes=o,t.memoizedState=m}}function Tg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(F(191,s));s.call(r)}}}var oa={},sn=Sr(oa),jo=Sr(oa),Mo=Sr(oa);function $r(t){if(t===oa)throw Error(F(174));return t}function df(t,e){switch(ce(Mo,e),ce(jo,t),ce(sn,oa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:wh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=wh(e,t)}me(sn),ce(sn,e)}function ri(){me(sn),me(jo),me(Mo)}function s0(t){$r(Mo.current);var e=$r(sn.current),n=wh(e,t.type);e!==n&&(ce(jo,t),ce(sn,n))}function ff(t){jo.current===t&&(me(sn),me(jo))}var _e=Sr(0);function zl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Bc=[];function pf(){for(var t=0;t<Bc.length;t++)Bc[t]._workInProgressVersionPrimary=null;Bc.length=0}var cl=Nn.ReactCurrentDispatcher,zc=Nn.ReactCurrentBatchConfig,Jr=0,ve=null,je=null,ze=null,$l=!1,mo=!1,Uo=0,k1=0;function Je(){throw Error(F(321))}function mf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Gt(t[n],e[n]))return!1;return!0}function gf(t,e,n,r,s,i){if(Jr=i,ve=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,cl.current=t===null||t.memoizedState===null?D1:O1,t=n(r,s),mo){i=0;do{if(mo=!1,Uo=0,25<=i)throw Error(F(301));i+=1,ze=je=null,e.updateQueue=null,cl.current=V1,t=n(r,s)}while(mo)}if(cl.current=Hl,e=je!==null&&je.next!==null,Jr=0,ze=je=ve=null,$l=!1,e)throw Error(F(300));return t}function yf(){var t=Uo!==0;return Uo=0,t}function Zt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ze===null?ve.memoizedState=ze=t:ze=ze.next=t,ze}function jt(){if(je===null){var t=ve.alternate;t=t!==null?t.memoizedState:null}else t=je.next;var e=ze===null?ve.memoizedState:ze.next;if(e!==null)ze=e,je=t;else{if(t===null)throw Error(F(310));je=t,t={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},ze===null?ve.memoizedState=ze=t:ze=ze.next=t}return ze}function Fo(t,e){return typeof e=="function"?e(t):e}function $c(t){var e=jt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=je,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,c=i;do{var f=c.lane;if((Jr&f)===f)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var m={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,ve.lanes|=f,Zr|=f}c=c.next}while(c!==null&&c!==i);u===null?o=r:u.next=l,Gt(r,e.memoizedState)||(gt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,ve.lanes|=i,Zr|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Hc(t){var e=jt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Gt(i,e.memoizedState)||(gt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function i0(){}function o0(t,e){var n=ve,r=jt(),s=e(),i=!Gt(r.memoizedState,s);if(i&&(r.memoizedState=s,gt=!0),r=r.queue,_f(u0.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||ze!==null&&ze.memoizedState.tag&1){if(n.flags|=2048,Bo(9,l0.bind(null,n,r,s,e),void 0,null),$e===null)throw Error(F(349));Jr&30||a0(n,e,s)}return s}function a0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function l0(t,e,n,r){e.value=n,e.getSnapshot=r,c0(e)&&h0(t)}function u0(t,e,n){return n(function(){c0(e)&&h0(t)})}function c0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Gt(t,n)}catch{return!0}}function h0(t){var e=Sn(t,1);e!==null&&qt(e,t,1,-1)}function Ig(t){var e=Zt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:t},e.queue=t,t=t.dispatch=b1.bind(null,ve,t),[e.memoizedState,t]}function Bo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function d0(){return jt().memoizedState}function hl(t,e,n,r){var s=Zt();ve.flags|=t,s.memoizedState=Bo(1|e,n,void 0,r===void 0?null:r)}function xu(t,e,n,r){var s=jt();r=r===void 0?null:r;var i=void 0;if(je!==null){var o=je.memoizedState;if(i=o.destroy,r!==null&&mf(r,o.deps)){s.memoizedState=Bo(e,n,i,r);return}}ve.flags|=t,s.memoizedState=Bo(1|e,n,i,r)}function xg(t,e){return hl(8390656,8,t,e)}function _f(t,e){return xu(2048,8,t,e)}function f0(t,e){return xu(4,2,t,e)}function p0(t,e){return xu(4,4,t,e)}function m0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function g0(t,e,n){return n=n!=null?n.concat([t]):null,xu(4,4,m0.bind(null,e,t),n)}function vf(){}function y0(t,e){var n=jt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&mf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function _0(t,e){var n=jt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&mf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function v0(t,e,n){return Jr&21?(Gt(n,e)||(n=xv(),ve.lanes|=n,Zr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,gt=!0),t.memoizedState=n)}function P1(t,e){var n=ae;ae=n!==0&&4>n?n:4,t(!0);var r=zc.transition;zc.transition={};try{t(!1),e()}finally{ae=n,zc.transition=r}}function w0(){return jt().memoizedState}function N1(t,e,n){var r=or(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},E0(t))T0(e,n);else if(n=n0(t,e,n,r),n!==null){var s=ct();qt(n,t,r,s),I0(n,e,r)}}function b1(t,e,n){var r=or(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(E0(t))T0(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Gt(l,o)){var u=e.interleaved;u===null?(s.next=s,cf(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=n0(t,e,s,r),n!==null&&(s=ct(),qt(n,t,r,s),I0(n,e,r))}}function E0(t){var e=t.alternate;return t===ve||e!==null&&e===ve}function T0(t,e){mo=$l=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function I0(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Qd(t,n)}}var Hl={readContext:Lt,useCallback:Je,useContext:Je,useEffect:Je,useImperativeHandle:Je,useInsertionEffect:Je,useLayoutEffect:Je,useMemo:Je,useReducer:Je,useRef:Je,useState:Je,useDebugValue:Je,useDeferredValue:Je,useTransition:Je,useMutableSource:Je,useSyncExternalStore:Je,useId:Je,unstable_isNewReconciler:!1},D1={readContext:Lt,useCallback:function(t,e){return Zt().memoizedState=[t,e===void 0?null:e],t},useContext:Lt,useEffect:xg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,hl(4194308,4,m0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return hl(4194308,4,t,e)},useInsertionEffect:function(t,e){return hl(4,2,t,e)},useMemo:function(t,e){var n=Zt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Zt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=N1.bind(null,ve,t),[r.memoizedState,t]},useRef:function(t){var e=Zt();return t={current:t},e.memoizedState=t},useState:Ig,useDebugValue:vf,useDeferredValue:function(t){return Zt().memoizedState=t},useTransition:function(){var t=Ig(!1),e=t[0];return t=P1.bind(null,t[1]),Zt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ve,s=Zt();if(ye){if(n===void 0)throw Error(F(407));n=n()}else{if(n=e(),$e===null)throw Error(F(349));Jr&30||a0(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,xg(u0.bind(null,r,i,t),[t]),r.flags|=2048,Bo(9,l0.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=Zt(),e=$e.identifierPrefix;if(ye){var n=vn,r=_n;n=(r&~(1<<32-Ht(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Uo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=k1++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},O1={readContext:Lt,useCallback:y0,useContext:Lt,useEffect:_f,useImperativeHandle:g0,useInsertionEffect:f0,useLayoutEffect:p0,useMemo:_0,useReducer:$c,useRef:d0,useState:function(){return $c(Fo)},useDebugValue:vf,useDeferredValue:function(t){var e=jt();return v0(e,je.memoizedState,t)},useTransition:function(){var t=$c(Fo)[0],e=jt().memoizedState;return[t,e]},useMutableSource:i0,useSyncExternalStore:o0,useId:w0,unstable_isNewReconciler:!1},V1={readContext:Lt,useCallback:y0,useContext:Lt,useEffect:_f,useImperativeHandle:g0,useInsertionEffect:f0,useLayoutEffect:p0,useMemo:_0,useReducer:Hc,useRef:d0,useState:function(){return Hc(Fo)},useDebugValue:vf,useDeferredValue:function(t){var e=jt();return je===null?e.memoizedState=t:v0(e,je.memoizedState,t)},useTransition:function(){var t=Hc(Fo)[0],e=jt().memoizedState;return[t,e]},useMutableSource:i0,useSyncExternalStore:o0,useId:w0,unstable_isNewReconciler:!1};function Ft(t,e){if(t&&t.defaultProps){e=we({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Bh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:we({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Su={isMounted:function(t){return(t=t._reactInternals)?ls(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=ct(),s=or(t),i=Tn(r,s);i.payload=e,n!=null&&(i.callback=n),e=sr(t,i,s),e!==null&&(qt(e,t,s,r),ul(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=ct(),s=or(t),i=Tn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=sr(t,i,s),e!==null&&(qt(e,t,s,r),ul(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ct(),r=or(t),s=Tn(n,r);s.tag=2,e!=null&&(s.callback=e),e=sr(t,s,r),e!==null&&(qt(e,t,r,n),ul(e,t,r))}};function Sg(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!Do(n,r)||!Do(s,i):!0}function x0(t,e,n){var r=!1,s=gr,i=e.contextType;return typeof i=="object"&&i!==null?i=Lt(i):(s=_t(e)?Xr:st.current,r=e.contextTypes,i=(r=r!=null)?ei(t,s):gr),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Su,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function Rg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Su.enqueueReplaceState(e,e.state,null)}function zh(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},hf(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Lt(i):(i=_t(e)?Xr:st.current,s.context=ei(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Bh(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Su.enqueueReplaceState(s,s.state,null),Bl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function si(t,e){try{var n="",r=e;do n+=ux(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function qc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function $h(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var L1=typeof WeakMap=="function"?WeakMap:Map;function S0(t,e,n){n=Tn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Wl||(Wl=!0,Zh=r),$h(t,e)},n}function R0(t,e,n){n=Tn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){$h(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){$h(t,e),typeof r!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Cg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new L1;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=X1.bind(null,t,e,n),e.then(t,t))}function Ag(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function kg(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Tn(-1,1),e.tag=2,sr(n,e,1))),n.lanes|=1),t)}var j1=Nn.ReactCurrentOwner,gt=!1;function ut(t,e,n,r){e.child=t===null?t0(e,null,n,r):ni(e,t.child,n,r)}function Pg(t,e,n,r,s){n=n.render;var i=e.ref;return Hs(e,s),r=gf(t,e,n,r,i,s),n=yf(),t!==null&&!gt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Rn(t,e,s)):(ye&&n&&rf(e),e.flags|=1,ut(t,e,r,s),e.child)}function Ng(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!Cf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,C0(t,e,i,r,s)):(t=ml(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Do,n(o,r)&&t.ref===e.ref)return Rn(t,e,s)}return e.flags|=1,t=ar(i,r),t.ref=e.ref,t.return=e,e.child=t}function C0(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(Do(i,r)&&t.ref===e.ref)if(gt=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(gt=!0);else return e.lanes=t.lanes,Rn(t,e,s)}return Hh(t,e,n,r,s)}function A0(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ce(js,Et),Et|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ce(js,Et),Et|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ce(js,Et),Et|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,ce(js,Et),Et|=r;return ut(t,e,s,n),e.child}function k0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Hh(t,e,n,r,s){var i=_t(n)?Xr:st.current;return i=ei(e,i),Hs(e,s),n=gf(t,e,n,r,i,s),r=yf(),t!==null&&!gt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Rn(t,e,s)):(ye&&r&&rf(e),e.flags|=1,ut(t,e,n,s),e.child)}function bg(t,e,n,r,s){if(_t(n)){var i=!0;Ll(e)}else i=!1;if(Hs(e,s),e.stateNode===null)dl(t,e),x0(e,n,r),zh(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Lt(c):(c=_t(n)?Xr:st.current,c=ei(e,c));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&Rg(e,o,r,c),zn=!1;var g=e.memoizedState;o.state=g,Bl(e,r,o,s),u=e.memoizedState,l!==r||g!==u||yt.current||zn?(typeof f=="function"&&(Bh(e,n,f,r),u=e.memoizedState),(l=zn||Sg(e,n,l,r,g,u,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,r0(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:Ft(e.type,l),o.props=c,m=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Lt(u):(u=_t(n)?Xr:st.current,u=ei(e,u));var S=n.getDerivedStateFromProps;(f=typeof S=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||g!==u)&&Rg(e,o,r,u),zn=!1,g=e.memoizedState,o.state=g,Bl(e,r,o,s);var k=e.memoizedState;l!==m||g!==k||yt.current||zn?(typeof S=="function"&&(Bh(e,n,S,r),k=e.memoizedState),(c=zn||Sg(e,n,c,r,g,k,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=k),o.props=r,o.state=k,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return qh(t,e,n,r,i,s)}function qh(t,e,n,r,s,i){k0(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&yg(e,n,!1),Rn(t,e,i);r=e.stateNode,j1.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=ni(e,t.child,null,i),e.child=ni(e,null,l,i)):ut(t,e,l,i),e.memoizedState=r.state,s&&yg(e,n,!0),e.child}function P0(t){var e=t.stateNode;e.pendingContext?gg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&gg(t,e.context,!1),df(t,e.containerInfo)}function Dg(t,e,n,r,s){return ti(),of(s),e.flags|=256,ut(t,e,n,r),e.child}var Wh={dehydrated:null,treeContext:null,retryLane:0};function Gh(t){return{baseLanes:t,cachePool:null,transitions:null}}function N0(t,e,n){var r=e.pendingProps,s=_e.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),ce(_e,s&1),t===null)return Uh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Au(o,r,0,null),t=Wr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=Gh(n),e.memoizedState=Wh,t):wf(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return M1(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=ar(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=ar(l,i):(i=Wr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?Gh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=Wh,r}return i=t.child,t=i.sibling,r=ar(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function wf(t,e){return e=Au({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Wa(t,e,n,r){return r!==null&&of(r),ni(e,t.child,null,n),t=wf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function M1(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=qc(Error(F(422))),Wa(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=Au({mode:"visible",children:r.children},s,0,null),i=Wr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&ni(e,t.child,null,o),e.child.memoizedState=Gh(o),e.memoizedState=Wh,i);if(!(e.mode&1))return Wa(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(F(419)),r=qc(i,r,void 0),Wa(t,e,o,r)}if(l=(o&t.childLanes)!==0,gt||l){if(r=$e,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Sn(t,s),qt(r,t,s,-1))}return Rf(),r=qc(Error(F(421))),Wa(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=Y1.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Tt=rr(s.nextSibling),St=e,ye=!0,zt=null,t!==null&&(Pt[Nt++]=_n,Pt[Nt++]=vn,Pt[Nt++]=Yr,_n=t.id,vn=t.overflow,Yr=e),e=wf(e,r.children),e.flags|=4096,e)}function Og(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Fh(t.return,e,n)}function Wc(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function b0(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(ut(t,e,r.children,n),r=_e.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Og(t,n,e);else if(t.tag===19)Og(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ce(_e,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&zl(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Wc(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&zl(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Wc(e,!0,n,null,i);break;case"together":Wc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function dl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Rn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Zr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(F(153));if(e.child!==null){for(t=e.child,n=ar(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ar(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function U1(t,e,n){switch(e.tag){case 3:P0(e),ti();break;case 5:s0(e);break;case 1:_t(e.type)&&Ll(e);break;case 4:df(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;ce(Ul,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ce(_e,_e.current&1),e.flags|=128,null):n&e.child.childLanes?N0(t,e,n):(ce(_e,_e.current&1),t=Rn(t,e,n),t!==null?t.sibling:null);ce(_e,_e.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return b0(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ce(_e,_e.current),r)break;return null;case 22:case 23:return e.lanes=0,A0(t,e,n)}return Rn(t,e,n)}var D0,Kh,O0,V0;D0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Kh=function(){};O0=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,$r(sn.current);var i=null;switch(n){case"input":s=gh(t,s),r=gh(t,r),i=[];break;case"select":s=we({},s,{value:void 0}),r=we({},r,{value:void 0}),i=[];break;case"textarea":s=vh(t,s),r=vh(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Ol)}Eh(n,r);var o;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var l=s[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ro.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(l=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ro.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&fe("scroll",t),i||l===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(e.updateQueue=c)&&(e.flags|=4)}};V0=function(t,e,n,r){n!==r&&(e.flags|=4)};function Xi(t,e){if(!ye)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Ze(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function F1(t,e,n){var r=e.pendingProps;switch(sf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(e),null;case 1:return _t(e.type)&&Vl(),Ze(e),null;case 3:return r=e.stateNode,ri(),me(yt),me(st),pf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Ha(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zt!==null&&(nd(zt),zt=null))),Kh(t,e),Ze(e),null;case 5:ff(e);var s=$r(Mo.current);if(n=e.type,t!==null&&e.stateNode!=null)O0(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(F(166));return Ze(e),null}if(t=$r(sn.current),Ha(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[tn]=e,r[Lo]=i,t=(e.mode&1)!==0,n){case"dialog":fe("cancel",r),fe("close",r);break;case"iframe":case"object":case"embed":fe("load",r);break;case"video":case"audio":for(s=0;s<no.length;s++)fe(no[s],r);break;case"source":fe("error",r);break;case"img":case"image":case"link":fe("error",r),fe("load",r);break;case"details":fe("toggle",r);break;case"input":$m(r,i),fe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},fe("invalid",r);break;case"textarea":qm(r,i),fe("invalid",r)}Eh(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&$a(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&$a(r.textContent,l,t),s=["children",""+l]):Ro.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&fe("scroll",r)}switch(n){case"input":Va(r),Hm(r,i,!0);break;case"textarea":Va(r),Wm(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Ol)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=uv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[tn]=e,t[Lo]=r,D0(t,e,!1,!1),e.stateNode=t;e:{switch(o=Th(n,r),n){case"dialog":fe("cancel",t),fe("close",t),s=r;break;case"iframe":case"object":case"embed":fe("load",t),s=r;break;case"video":case"audio":for(s=0;s<no.length;s++)fe(no[s],t);s=r;break;case"source":fe("error",t),s=r;break;case"img":case"image":case"link":fe("error",t),fe("load",t),s=r;break;case"details":fe("toggle",t),s=r;break;case"input":$m(t,r),s=gh(t,r),fe("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=we({},r,{value:void 0}),fe("invalid",t);break;case"textarea":qm(t,r),s=vh(t,r),fe("invalid",t);break;default:s=r}Eh(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?dv(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&cv(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Co(t,u):typeof u=="number"&&Co(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Ro.hasOwnProperty(i)?u!=null&&i==="onScroll"&&fe("scroll",t):u!=null&&$d(t,i,u,o))}switch(n){case"input":Va(t),Hm(t,r,!1);break;case"textarea":Va(t),Wm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+mr(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?Fs(t,!!r.multiple,i,!1):r.defaultValue!=null&&Fs(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=Ol)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ze(e),null;case 6:if(t&&e.stateNode!=null)V0(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(F(166));if(n=$r(Mo.current),$r(sn.current),Ha(e)){if(r=e.stateNode,n=e.memoizedProps,r[tn]=e,(i=r.nodeValue!==n)&&(t=St,t!==null))switch(t.tag){case 3:$a(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&$a(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[tn]=e,e.stateNode=r}return Ze(e),null;case 13:if(me(_e),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ye&&Tt!==null&&e.mode&1&&!(e.flags&128))Zv(),ti(),e.flags|=98560,i=!1;else if(i=Ha(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(F(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(F(317));i[tn]=e}else ti(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ze(e),i=!1}else zt!==null&&(nd(zt),zt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||_e.current&1?Me===0&&(Me=3):Rf())),e.updateQueue!==null&&(e.flags|=4),Ze(e),null);case 4:return ri(),Kh(t,e),t===null&&Oo(e.stateNode.containerInfo),Ze(e),null;case 10:return uf(e.type._context),Ze(e),null;case 17:return _t(e.type)&&Vl(),Ze(e),null;case 19:if(me(_e),i=e.memoizedState,i===null)return Ze(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)Xi(i,!1);else{if(Me!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=zl(t),o!==null){for(e.flags|=128,Xi(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ce(_e,_e.current&1|2),e.child}t=t.sibling}i.tail!==null&&ke()>ii&&(e.flags|=128,r=!0,Xi(i,!1),e.lanes=4194304)}else{if(!r)if(t=zl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Xi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ye)return Ze(e),null}else 2*ke()-i.renderingStartTime>ii&&n!==1073741824&&(e.flags|=128,r=!0,Xi(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=ke(),e.sibling=null,n=_e.current,ce(_e,r?n&1|2:n&1),e):(Ze(e),null);case 22:case 23:return Sf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Et&1073741824&&(Ze(e),e.subtreeFlags&6&&(e.flags|=8192)):Ze(e),null;case 24:return null;case 25:return null}throw Error(F(156,e.tag))}function B1(t,e){switch(sf(e),e.tag){case 1:return _t(e.type)&&Vl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ri(),me(yt),me(st),pf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ff(e),null;case 13:if(me(_e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(F(340));ti()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return me(_e),null;case 4:return ri(),null;case 10:return uf(e.type._context),null;case 22:case 23:return Sf(),null;case 24:return null;default:return null}}var Ga=!1,nt=!1,z1=typeof WeakSet=="function"?WeakSet:Set,q=null;function Ls(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){xe(t,e,r)}else n.current=null}function Qh(t,e,n){try{n()}catch(r){xe(t,e,r)}}var Vg=!1;function $1(t,e){if(bh=Nl,t=Fv(),nf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,f=0,m=t,g=null;t:for(;;){for(var S;m!==n||s!==0&&m.nodeType!==3||(l=o+s),m!==i||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(S=m.firstChild)!==null;)g=m,m=S;for(;;){if(m===t)break t;if(g===n&&++c===s&&(l=o),g===i&&++f===r&&(u=o),(S=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=S}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Dh={focusedElem:t,selectionRange:n},Nl=!1,q=e;q!==null;)if(e=q,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,q=t;else for(;q!==null;){e=q;try{var k=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var x=k.memoizedProps,A=k.memoizedState,E=e.stateNode,w=E.getSnapshotBeforeUpdate(e.elementType===e.type?x:Ft(e.type,x),A);E.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var I=e.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(b){xe(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,q=t;break}q=e.return}return k=Vg,Vg=!1,k}function go(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&Qh(e,n,i)}s=s.next}while(s!==r)}}function Ru(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Xh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function L0(t){var e=t.alternate;e!==null&&(t.alternate=null,L0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[tn],delete e[Lo],delete e[Lh],delete e[S1],delete e[R1])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function j0(t){return t.tag===5||t.tag===3||t.tag===4}function Lg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||j0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Yh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ol));else if(r!==4&&(t=t.child,t!==null))for(Yh(t,e,n),t=t.sibling;t!==null;)Yh(t,e,n),t=t.sibling}function Jh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Jh(t,e,n),t=t.sibling;t!==null;)Jh(t,e,n),t=t.sibling}var qe=null,Bt=!1;function Un(t,e,n){for(n=n.child;n!==null;)M0(t,e,n),n=n.sibling}function M0(t,e,n){if(rn&&typeof rn.onCommitFiberUnmount=="function")try{rn.onCommitFiberUnmount(_u,n)}catch{}switch(n.tag){case 5:nt||Ls(n,e);case 6:var r=qe,s=Bt;qe=null,Un(t,e,n),qe=r,Bt=s,qe!==null&&(Bt?(t=qe,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):qe.removeChild(n.stateNode));break;case 18:qe!==null&&(Bt?(t=qe,n=n.stateNode,t.nodeType===8?Uc(t.parentNode,n):t.nodeType===1&&Uc(t,n),No(t)):Uc(qe,n.stateNode));break;case 4:r=qe,s=Bt,qe=n.stateNode.containerInfo,Bt=!0,Un(t,e,n),qe=r,Bt=s;break;case 0:case 11:case 14:case 15:if(!nt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Qh(n,e,o),s=s.next}while(s!==r)}Un(t,e,n);break;case 1:if(!nt&&(Ls(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){xe(n,e,l)}Un(t,e,n);break;case 21:Un(t,e,n);break;case 22:n.mode&1?(nt=(r=nt)||n.memoizedState!==null,Un(t,e,n),nt=r):Un(t,e,n);break;default:Un(t,e,n)}}function jg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new z1),e.forEach(function(r){var s=J1.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Ut(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:qe=l.stateNode,Bt=!1;break e;case 3:qe=l.stateNode.containerInfo,Bt=!0;break e;case 4:qe=l.stateNode.containerInfo,Bt=!0;break e}l=l.return}if(qe===null)throw Error(F(160));M0(i,o,s),qe=null,Bt=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(c){xe(s,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)U0(e,t),e=e.sibling}function U0(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Ut(e,t),Jt(t),r&4){try{go(3,t,t.return),Ru(3,t)}catch(x){xe(t,t.return,x)}try{go(5,t,t.return)}catch(x){xe(t,t.return,x)}}break;case 1:Ut(e,t),Jt(t),r&512&&n!==null&&Ls(n,n.return);break;case 5:if(Ut(e,t),Jt(t),r&512&&n!==null&&Ls(n,n.return),t.flags&32){var s=t.stateNode;try{Co(s,"")}catch(x){xe(t,t.return,x)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&av(s,i),Th(l,o);var c=Th(l,i);for(o=0;o<u.length;o+=2){var f=u[o],m=u[o+1];f==="style"?dv(s,m):f==="dangerouslySetInnerHTML"?cv(s,m):f==="children"?Co(s,m):$d(s,f,m,c)}switch(l){case"input":yh(s,i);break;case"textarea":lv(s,i);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var S=i.value;S!=null?Fs(s,!!i.multiple,S,!1):g!==!!i.multiple&&(i.defaultValue!=null?Fs(s,!!i.multiple,i.defaultValue,!0):Fs(s,!!i.multiple,i.multiple?[]:"",!1))}s[Lo]=i}catch(x){xe(t,t.return,x)}}break;case 6:if(Ut(e,t),Jt(t),r&4){if(t.stateNode===null)throw Error(F(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(x){xe(t,t.return,x)}}break;case 3:if(Ut(e,t),Jt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{No(e.containerInfo)}catch(x){xe(t,t.return,x)}break;case 4:Ut(e,t),Jt(t);break;case 13:Ut(e,t),Jt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(If=ke())),r&4&&jg(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(nt=(c=nt)||f,Ut(e,t),nt=c):Ut(e,t),Jt(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(q=t,f=t.child;f!==null;){for(m=q=f;q!==null;){switch(g=q,S=g.child,g.tag){case 0:case 11:case 14:case 15:go(4,g,g.return);break;case 1:Ls(g,g.return);var k=g.stateNode;if(typeof k.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,k.props=e.memoizedProps,k.state=e.memoizedState,k.componentWillUnmount()}catch(x){xe(r,n,x)}}break;case 5:Ls(g,g.return);break;case 22:if(g.memoizedState!==null){Ug(m);continue}}S!==null?(S.return=g,q=S):Ug(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{s=m.stateNode,c?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=hv("display",o))}catch(x){xe(t,t.return,x)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(x){xe(t,t.return,x)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ut(e,t),Jt(t),r&4&&jg(t);break;case 21:break;default:Ut(e,t),Jt(t)}}function Jt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(j0(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Co(s,""),r.flags&=-33);var i=Lg(t);Jh(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Lg(t);Yh(t,l,o);break;default:throw Error(F(161))}}catch(u){xe(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function H1(t,e,n){q=t,F0(t)}function F0(t,e,n){for(var r=(t.mode&1)!==0;q!==null;){var s=q,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Ga;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||nt;l=Ga;var c=nt;if(Ga=o,(nt=u)&&!c)for(q=s;q!==null;)o=q,u=o.child,o.tag===22&&o.memoizedState!==null?Fg(s):u!==null?(u.return=o,q=u):Fg(s);for(;i!==null;)q=i,F0(i),i=i.sibling;q=s,Ga=l,nt=c}Mg(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,q=i):Mg(t)}}function Mg(t){for(;q!==null;){var e=q;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:nt||Ru(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!nt)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:Ft(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Tg(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Tg(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&No(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}nt||e.flags&512&&Xh(e)}catch(g){xe(e,e.return,g)}}if(e===t){q=null;break}if(n=e.sibling,n!==null){n.return=e.return,q=n;break}q=e.return}}function Ug(t){for(;q!==null;){var e=q;if(e===t){q=null;break}var n=e.sibling;if(n!==null){n.return=e.return,q=n;break}q=e.return}}function Fg(t){for(;q!==null;){var e=q;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ru(4,e)}catch(u){xe(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){xe(e,s,u)}}var i=e.return;try{Xh(e)}catch(u){xe(e,i,u)}break;case 5:var o=e.return;try{Xh(e)}catch(u){xe(e,o,u)}}}catch(u){xe(e,e.return,u)}if(e===t){q=null;break}var l=e.sibling;if(l!==null){l.return=e.return,q=l;break}q=e.return}}var q1=Math.ceil,ql=Nn.ReactCurrentDispatcher,Ef=Nn.ReactCurrentOwner,Vt=Nn.ReactCurrentBatchConfig,ie=0,$e=null,Ne=null,Ke=0,Et=0,js=Sr(0),Me=0,zo=null,Zr=0,Cu=0,Tf=0,yo=null,pt=null,If=0,ii=1/0,gn=null,Wl=!1,Zh=null,ir=null,Ka=!1,Yn=null,Gl=0,_o=0,ed=null,fl=-1,pl=0;function ct(){return ie&6?ke():fl!==-1?fl:fl=ke()}function or(t){return t.mode&1?ie&2&&Ke!==0?Ke&-Ke:A1.transition!==null?(pl===0&&(pl=xv()),pl):(t=ae,t!==0||(t=window.event,t=t===void 0?16:Nv(t.type)),t):1}function qt(t,e,n,r){if(50<_o)throw _o=0,ed=null,Error(F(185));ra(t,n,r),(!(ie&2)||t!==$e)&&(t===$e&&(!(ie&2)&&(Cu|=n),Me===4&&Hn(t,Ke)),vt(t,r),n===1&&ie===0&&!(e.mode&1)&&(ii=ke()+500,Iu&&Rr()))}function vt(t,e){var n=t.callbackNode;Ax(t,e);var r=Pl(t,t===$e?Ke:0);if(r===0)n!==null&&Qm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Qm(n),e===1)t.tag===0?C1(Bg.bind(null,t)):Xv(Bg.bind(null,t)),I1(function(){!(ie&6)&&Rr()}),n=null;else{switch(Sv(r)){case 1:n=Kd;break;case 4:n=Tv;break;case 16:n=kl;break;case 536870912:n=Iv;break;default:n=kl}n=K0(n,B0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function B0(t,e){if(fl=-1,pl=0,ie&6)throw Error(F(327));var n=t.callbackNode;if(qs()&&t.callbackNode!==n)return null;var r=Pl(t,t===$e?Ke:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Kl(t,r);else{e=r;var s=ie;ie|=2;var i=$0();($e!==t||Ke!==e)&&(gn=null,ii=ke()+500,qr(t,e));do try{K1();break}catch(l){z0(t,l)}while(!0);lf(),ql.current=i,ie=s,Ne!==null?e=0:($e=null,Ke=0,e=Me)}if(e!==0){if(e===2&&(s=Ch(t),s!==0&&(r=s,e=td(t,s))),e===1)throw n=zo,qr(t,0),Hn(t,r),vt(t,ke()),n;if(e===6)Hn(t,r);else{if(s=t.current.alternate,!(r&30)&&!W1(s)&&(e=Kl(t,r),e===2&&(i=Ch(t),i!==0&&(r=i,e=td(t,i))),e===1))throw n=zo,qr(t,0),Hn(t,r),vt(t,ke()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(F(345));case 2:Ur(t,pt,gn);break;case 3:if(Hn(t,r),(r&130023424)===r&&(e=If+500-ke(),10<e)){if(Pl(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){ct(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Vh(Ur.bind(null,t,pt,gn),e);break}Ur(t,pt,gn);break;case 4:if(Hn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Ht(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=ke()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*q1(r/1960))-r,10<r){t.timeoutHandle=Vh(Ur.bind(null,t,pt,gn),r);break}Ur(t,pt,gn);break;case 5:Ur(t,pt,gn);break;default:throw Error(F(329))}}}return vt(t,ke()),t.callbackNode===n?B0.bind(null,t):null}function td(t,e){var n=yo;return t.current.memoizedState.isDehydrated&&(qr(t,e).flags|=256),t=Kl(t,e),t!==2&&(e=pt,pt=n,e!==null&&nd(e)),t}function nd(t){pt===null?pt=t:pt.push.apply(pt,t)}function W1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Gt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Hn(t,e){for(e&=~Tf,e&=~Cu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Ht(e),r=1<<n;t[n]=-1,e&=~r}}function Bg(t){if(ie&6)throw Error(F(327));qs();var e=Pl(t,0);if(!(e&1))return vt(t,ke()),null;var n=Kl(t,e);if(t.tag!==0&&n===2){var r=Ch(t);r!==0&&(e=r,n=td(t,r))}if(n===1)throw n=zo,qr(t,0),Hn(t,e),vt(t,ke()),n;if(n===6)throw Error(F(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ur(t,pt,gn),vt(t,ke()),null}function xf(t,e){var n=ie;ie|=1;try{return t(e)}finally{ie=n,ie===0&&(ii=ke()+500,Iu&&Rr())}}function es(t){Yn!==null&&Yn.tag===0&&!(ie&6)&&qs();var e=ie;ie|=1;var n=Vt.transition,r=ae;try{if(Vt.transition=null,ae=1,t)return t()}finally{ae=r,Vt.transition=n,ie=e,!(ie&6)&&Rr()}}function Sf(){Et=js.current,me(js)}function qr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,T1(n)),Ne!==null)for(n=Ne.return;n!==null;){var r=n;switch(sf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Vl();break;case 3:ri(),me(yt),me(st),pf();break;case 5:ff(r);break;case 4:ri();break;case 13:me(_e);break;case 19:me(_e);break;case 10:uf(r.type._context);break;case 22:case 23:Sf()}n=n.return}if($e=t,Ne=t=ar(t.current,null),Ke=Et=e,Me=0,zo=null,Tf=Cu=Zr=0,pt=yo=null,zr!==null){for(e=0;e<zr.length;e++)if(n=zr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}zr=null}return t}function z0(t,e){do{var n=Ne;try{if(lf(),cl.current=Hl,$l){for(var r=ve.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}$l=!1}if(Jr=0,ze=je=ve=null,mo=!1,Uo=0,Ef.current=null,n===null||n.return===null){Me=1,zo=e,Ne=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=Ke,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var S=Ag(o);if(S!==null){S.flags&=-257,kg(S,o,l,i,e),S.mode&1&&Cg(i,c,e),e=S,u=c;var k=e.updateQueue;if(k===null){var x=new Set;x.add(u),e.updateQueue=x}else k.add(u);break e}else{if(!(e&1)){Cg(i,c,e),Rf();break e}u=Error(F(426))}}else if(ye&&l.mode&1){var A=Ag(o);if(A!==null){!(A.flags&65536)&&(A.flags|=256),kg(A,o,l,i,e),of(si(u,l));break e}}i=u=si(u,l),Me!==4&&(Me=2),yo===null?yo=[i]:yo.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var E=S0(i,u,e);Eg(i,E);break e;case 1:l=u;var w=i.type,I=i.stateNode;if(!(i.flags&128)&&(typeof w.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&(ir===null||!ir.has(I)))){i.flags|=65536,e&=-e,i.lanes|=e;var b=R0(i,l,e);Eg(i,b);break e}}i=i.return}while(i!==null)}q0(n)}catch(M){e=M,Ne===n&&n!==null&&(Ne=n=n.return);continue}break}while(!0)}function $0(){var t=ql.current;return ql.current=Hl,t===null?Hl:t}function Rf(){(Me===0||Me===3||Me===2)&&(Me=4),$e===null||!(Zr&268435455)&&!(Cu&268435455)||Hn($e,Ke)}function Kl(t,e){var n=ie;ie|=2;var r=$0();($e!==t||Ke!==e)&&(gn=null,qr(t,e));do try{G1();break}catch(s){z0(t,s)}while(!0);if(lf(),ie=n,ql.current=r,Ne!==null)throw Error(F(261));return $e=null,Ke=0,Me}function G1(){for(;Ne!==null;)H0(Ne)}function K1(){for(;Ne!==null&&!vx();)H0(Ne)}function H0(t){var e=G0(t.alternate,t,Et);t.memoizedProps=t.pendingProps,e===null?q0(t):Ne=e,Ef.current=null}function q0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=B1(n,e),n!==null){n.flags&=32767,Ne=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Me=6,Ne=null;return}}else if(n=F1(n,e,Et),n!==null){Ne=n;return}if(e=e.sibling,e!==null){Ne=e;return}Ne=e=t}while(e!==null);Me===0&&(Me=5)}function Ur(t,e,n){var r=ae,s=Vt.transition;try{Vt.transition=null,ae=1,Q1(t,e,n,r)}finally{Vt.transition=s,ae=r}return null}function Q1(t,e,n,r){do qs();while(Yn!==null);if(ie&6)throw Error(F(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(F(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(kx(t,i),t===$e&&(Ne=$e=null,Ke=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ka||(Ka=!0,K0(kl,function(){return qs(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Vt.transition,Vt.transition=null;var o=ae;ae=1;var l=ie;ie|=4,Ef.current=null,$1(t,n),U0(n,t),m1(Dh),Nl=!!bh,Dh=bh=null,t.current=n,H1(n),wx(),ie=l,ae=o,Vt.transition=i}else t.current=n;if(Ka&&(Ka=!1,Yn=t,Gl=s),i=t.pendingLanes,i===0&&(ir=null),Ix(n.stateNode),vt(t,ke()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Wl)throw Wl=!1,t=Zh,Zh=null,t;return Gl&1&&t.tag!==0&&qs(),i=t.pendingLanes,i&1?t===ed?_o++:(_o=0,ed=t):_o=0,Rr(),null}function qs(){if(Yn!==null){var t=Sv(Gl),e=Vt.transition,n=ae;try{if(Vt.transition=null,ae=16>t?16:t,Yn===null)var r=!1;else{if(t=Yn,Yn=null,Gl=0,ie&6)throw Error(F(331));var s=ie;for(ie|=4,q=t.current;q!==null;){var i=q,o=i.child;if(q.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(q=c;q!==null;){var f=q;switch(f.tag){case 0:case 11:case 15:go(8,f,i)}var m=f.child;if(m!==null)m.return=f,q=m;else for(;q!==null;){f=q;var g=f.sibling,S=f.return;if(L0(f),f===c){q=null;break}if(g!==null){g.return=S,q=g;break}q=S}}}var k=i.alternate;if(k!==null){var x=k.child;if(x!==null){k.child=null;do{var A=x.sibling;x.sibling=null,x=A}while(x!==null)}}q=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,q=o;else e:for(;q!==null;){if(i=q,i.flags&2048)switch(i.tag){case 0:case 11:case 15:go(9,i,i.return)}var E=i.sibling;if(E!==null){E.return=i.return,q=E;break e}q=i.return}}var w=t.current;for(q=w;q!==null;){o=q;var I=o.child;if(o.subtreeFlags&2064&&I!==null)I.return=o,q=I;else e:for(o=w;q!==null;){if(l=q,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Ru(9,l)}}catch(M){xe(l,l.return,M)}if(l===o){q=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,q=b;break e}q=l.return}}if(ie=s,Rr(),rn&&typeof rn.onPostCommitFiberRoot=="function")try{rn.onPostCommitFiberRoot(_u,t)}catch{}r=!0}return r}finally{ae=n,Vt.transition=e}}return!1}function zg(t,e,n){e=si(n,e),e=S0(t,e,1),t=sr(t,e,1),e=ct(),t!==null&&(ra(t,1,e),vt(t,e))}function xe(t,e,n){if(t.tag===3)zg(t,t,n);else for(;e!==null;){if(e.tag===3){zg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ir===null||!ir.has(r))){t=si(n,t),t=R0(e,t,1),e=sr(e,t,1),t=ct(),e!==null&&(ra(e,1,t),vt(e,t));break}}e=e.return}}function X1(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=ct(),t.pingedLanes|=t.suspendedLanes&n,$e===t&&(Ke&n)===n&&(Me===4||Me===3&&(Ke&130023424)===Ke&&500>ke()-If?qr(t,0):Tf|=n),vt(t,e)}function W0(t,e){e===0&&(t.mode&1?(e=Ma,Ma<<=1,!(Ma&130023424)&&(Ma=4194304)):e=1);var n=ct();t=Sn(t,e),t!==null&&(ra(t,e,n),vt(t,n))}function Y1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),W0(t,n)}function J1(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(e),W0(t,n)}var G0;G0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||yt.current)gt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return gt=!1,U1(t,e,n);gt=!!(t.flags&131072)}else gt=!1,ye&&e.flags&1048576&&Yv(e,Ml,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;dl(t,e),t=e.pendingProps;var s=ei(e,st.current);Hs(e,n),s=gf(null,e,r,t,s,n);var i=yf();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,_t(r)?(i=!0,Ll(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,hf(e),s.updater=Su,e.stateNode=s,s._reactInternals=e,zh(e,r,t,n),e=qh(null,e,r,!0,i,n)):(e.tag=0,ye&&i&&rf(e),ut(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(dl(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=eS(r),t=Ft(r,t),s){case 0:e=Hh(null,e,r,t,n);break e;case 1:e=bg(null,e,r,t,n);break e;case 11:e=Pg(null,e,r,t,n);break e;case 14:e=Ng(null,e,r,Ft(r.type,t),n);break e}throw Error(F(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),Hh(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),bg(t,e,r,s,n);case 3:e:{if(P0(e),t===null)throw Error(F(387));r=e.pendingProps,i=e.memoizedState,s=i.element,r0(t,e),Bl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=si(Error(F(423)),e),e=Dg(t,e,r,n,s);break e}else if(r!==s){s=si(Error(F(424)),e),e=Dg(t,e,r,n,s);break e}else for(Tt=rr(e.stateNode.containerInfo.firstChild),St=e,ye=!0,zt=null,n=t0(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ti(),r===s){e=Rn(t,e,n);break e}ut(t,e,r,n)}e=e.child}return e;case 5:return s0(e),t===null&&Uh(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Oh(r,s)?o=null:i!==null&&Oh(r,i)&&(e.flags|=32),k0(t,e),ut(t,e,o,n),e.child;case 6:return t===null&&Uh(e),null;case 13:return N0(t,e,n);case 4:return df(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=ni(e,null,r,n):ut(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),Pg(t,e,r,s,n);case 7:return ut(t,e,e.pendingProps,n),e.child;case 8:return ut(t,e,e.pendingProps.children,n),e.child;case 12:return ut(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,ce(Ul,r._currentValue),r._currentValue=o,i!==null)if(Gt(i.value,o)){if(i.children===s.children&&!yt.current){e=Rn(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Tn(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?u.next=u:(u.next=f.next,f.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Fh(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(F(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Fh(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ut(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Hs(e,n),s=Lt(s),r=r(s),e.flags|=1,ut(t,e,r,n),e.child;case 14:return r=e.type,s=Ft(r,e.pendingProps),s=Ft(r.type,s),Ng(t,e,r,s,n);case 15:return C0(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),dl(t,e),e.tag=1,_t(r)?(t=!0,Ll(e)):t=!1,Hs(e,n),x0(e,r,s),zh(e,r,s,n),qh(null,e,r,!0,t,n);case 19:return b0(t,e,n);case 22:return A0(t,e,n)}throw Error(F(156,e.tag))};function K0(t,e){return Ev(t,e)}function Z1(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(t,e,n,r){return new Z1(t,e,n,r)}function Cf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function eS(t){if(typeof t=="function")return Cf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===qd)return 11;if(t===Wd)return 14}return 2}function ar(t,e){var n=t.alternate;return n===null?(n=Ot(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function ml(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")Cf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Cs:return Wr(n.children,s,i,e);case Hd:o=8,s|=8;break;case dh:return t=Ot(12,n,e,s|2),t.elementType=dh,t.lanes=i,t;case fh:return t=Ot(13,n,e,s),t.elementType=fh,t.lanes=i,t;case ph:return t=Ot(19,n,e,s),t.elementType=ph,t.lanes=i,t;case sv:return Au(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case nv:o=10;break e;case rv:o=9;break e;case qd:o=11;break e;case Wd:o=14;break e;case Bn:o=16,r=null;break e}throw Error(F(130,t==null?t:typeof t,""))}return e=Ot(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Wr(t,e,n,r){return t=Ot(7,t,r,e),t.lanes=n,t}function Au(t,e,n,r){return t=Ot(22,t,r,e),t.elementType=sv,t.lanes=n,t.stateNode={isHidden:!1},t}function Gc(t,e,n){return t=Ot(6,t,null,e),t.lanes=n,t}function Kc(t,e,n){return e=Ot(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function tS(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ac(0),this.expirationTimes=Ac(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ac(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Af(t,e,n,r,s,i,o,l,u){return t=new tS(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Ot(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},hf(i),t}function nS(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rs,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Q0(t){if(!t)return gr;t=t._reactInternals;e:{if(ls(t)!==t||t.tag!==1)throw Error(F(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(_t(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(F(171))}if(t.tag===1){var n=t.type;if(_t(n))return Qv(t,n,e)}return e}function X0(t,e,n,r,s,i,o,l,u){return t=Af(n,r,!0,t,s,i,o,l,u),t.context=Q0(null),n=t.current,r=ct(),s=or(n),i=Tn(r,s),i.callback=e??null,sr(n,i,s),t.current.lanes=s,ra(t,s,r),vt(t,r),t}function ku(t,e,n,r){var s=e.current,i=ct(),o=or(s);return n=Q0(n),e.context===null?e.context=n:e.pendingContext=n,e=Tn(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=sr(s,e,o),t!==null&&(qt(t,s,o,i),ul(t,s,o)),o}function Ql(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function $g(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function kf(t,e){$g(t,e),(t=t.alternate)&&$g(t,e)}function rS(){return null}var Y0=typeof reportError=="function"?reportError:function(t){console.error(t)};function Pf(t){this._internalRoot=t}Pu.prototype.render=Pf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(F(409));ku(t,e,null,null)};Pu.prototype.unmount=Pf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;es(function(){ku(null,t,null,null)}),e[xn]=null}};function Pu(t){this._internalRoot=t}Pu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Av();t={blockedOn:null,target:t,priority:e};for(var n=0;n<$n.length&&e!==0&&e<$n[n].priority;n++);$n.splice(n,0,t),n===0&&Pv(t)}};function Nf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Nu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Hg(){}function sS(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var c=Ql(o);i.call(c)}}var o=X0(e,r,t,0,null,!1,!1,"",Hg);return t._reactRootContainer=o,t[xn]=o.current,Oo(t.nodeType===8?t.parentNode:t),es(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var c=Ql(u);l.call(c)}}var u=Af(t,0,!1,null,null,!1,!1,"",Hg);return t._reactRootContainer=u,t[xn]=u.current,Oo(t.nodeType===8?t.parentNode:t),es(function(){ku(e,u,n,r)}),u}function bu(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=Ql(o);l.call(u)}}ku(e,o,t,s)}else o=sS(n,e,t,s,r);return Ql(o)}Rv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=to(e.pendingLanes);n!==0&&(Qd(e,n|1),vt(e,ke()),!(ie&6)&&(ii=ke()+500,Rr()))}break;case 13:es(function(){var r=Sn(t,1);if(r!==null){var s=ct();qt(r,t,1,s)}}),kf(t,1)}};Xd=function(t){if(t.tag===13){var e=Sn(t,134217728);if(e!==null){var n=ct();qt(e,t,134217728,n)}kf(t,134217728)}};Cv=function(t){if(t.tag===13){var e=or(t),n=Sn(t,e);if(n!==null){var r=ct();qt(n,t,e,r)}kf(t,e)}};Av=function(){return ae};kv=function(t,e){var n=ae;try{return ae=t,e()}finally{ae=n}};xh=function(t,e,n){switch(e){case"input":if(yh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=Tu(r);if(!s)throw Error(F(90));ov(r),yh(r,s)}}}break;case"textarea":lv(t,n);break;case"select":e=n.value,e!=null&&Fs(t,!!n.multiple,e,!1)}};mv=xf;gv=es;var iS={usingClientEntryPoint:!1,Events:[ia,Ns,Tu,fv,pv,xf]},Yi={findFiberByHostInstance:Br,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},oS={bundleType:Yi.bundleType,version:Yi.version,rendererPackageName:Yi.rendererPackageName,rendererConfig:Yi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Nn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=vv(t),t===null?null:t.stateNode},findFiberByHostInstance:Yi.findFiberByHostInstance||rS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Qa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qa.isDisabled&&Qa.supportsFiber)try{_u=Qa.inject(oS),rn=Qa}catch{}}Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=iS;Ct.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Nf(e))throw Error(F(200));return nS(t,e,null,n)};Ct.createRoot=function(t,e){if(!Nf(t))throw Error(F(299));var n=!1,r="",s=Y0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Af(t,1,!1,null,null,n,!1,r,s),t[xn]=e.current,Oo(t.nodeType===8?t.parentNode:t),new Pf(e)};Ct.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(F(188)):(t=Object.keys(t).join(","),Error(F(268,t)));return t=vv(e),t=t===null?null:t.stateNode,t};Ct.flushSync=function(t){return es(t)};Ct.hydrate=function(t,e,n){if(!Nu(e))throw Error(F(200));return bu(null,t,e,!0,n)};Ct.hydrateRoot=function(t,e,n){if(!Nf(t))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=Y0;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=X0(e,null,t,1,n??null,s,!1,i,o),t[xn]=e.current,Oo(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new Pu(e)};Ct.render=function(t,e,n){if(!Nu(e))throw Error(F(200));return bu(null,t,e,!1,n)};Ct.unmountComponentAtNode=function(t){if(!Nu(t))throw Error(F(40));return t._reactRootContainer?(es(function(){bu(null,null,t,!1,function(){t._reactRootContainer=null,t[xn]=null})}),!0):!1};Ct.unstable_batchedUpdates=xf;Ct.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Nu(n))throw Error(F(200));if(t==null||t._reactInternals===void 0)throw Error(F(38));return bu(t,e,n,!1,r)};Ct.version="18.3.1-next-f1338f8080-20240426";function J0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(J0)}catch(t){console.error(t)}}J0(),J_.exports=Ct;var aS=J_.exports,qg=aS;ch.createRoot=qg.createRoot,ch.hydrateRoot=qg.hydrateRoot;/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function $o(){return $o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},$o.apply(this,arguments)}var Jn;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Jn||(Jn={}));const Wg="popstate";function lS(t){t===void 0&&(t={});function e(s,i){let{pathname:o="/",search:l="",hash:u=""}=us(s.location.hash.substr(1));return!o.startsWith("/")&&!o.startsWith(".")&&(o="/"+o),rd("",{pathname:o,search:l,hash:u},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(s,i){let o=s.document.querySelector("base"),l="";if(o&&o.getAttribute("href")){let u=s.location.href,c=u.indexOf("#");l=c===-1?u:u.slice(0,c)}return l+"#"+(typeof i=="string"?i:Xl(i))}function r(s,i){Du(s.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(i)+")")}return cS(e,n,r,t)}function Ve(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Du(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function uS(){return Math.random().toString(36).substr(2,8)}function Gg(t,e){return{usr:t.state,key:t.key,idx:e}}function rd(t,e,n,r){return n===void 0&&(n=null),$o({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?us(e):e,{state:n,key:e&&e.key||r||uS()})}function Xl(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function us(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function cS(t,e,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,l=Jn.Pop,u=null,c=f();c==null&&(c=0,o.replaceState($o({},o.state,{idx:c}),""));function f(){return(o.state||{idx:null}).idx}function m(){l=Jn.Pop;let A=f(),E=A==null?null:A-c;c=A,u&&u({action:l,location:x.location,delta:E})}function g(A,E){l=Jn.Push;let w=rd(x.location,A,E);n&&n(w,A),c=f()+1;let I=Gg(w,c),b=x.createHref(w);try{o.pushState(I,"",b)}catch(M){if(M instanceof DOMException&&M.name==="DataCloneError")throw M;s.location.assign(b)}i&&u&&u({action:l,location:x.location,delta:1})}function S(A,E){l=Jn.Replace;let w=rd(x.location,A,E);n&&n(w,A),c=f();let I=Gg(w,c),b=x.createHref(w);o.replaceState(I,"",b),i&&u&&u({action:l,location:x.location,delta:0})}function k(A){let E=s.location.origin!=="null"?s.location.origin:s.location.href,w=typeof A=="string"?A:Xl(A);return w=w.replace(/ $/,"%20"),Ve(E,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,E)}let x={get action(){return l},get location(){return t(s,o)},listen(A){if(u)throw new Error("A history only accepts one active listener");return s.addEventListener(Wg,m),u=A,()=>{s.removeEventListener(Wg,m),u=null}},createHref(A){return e(s,A)},createURL:k,encodeLocation(A){let E=k(A);return{pathname:E.pathname,search:E.search,hash:E.hash}},push:g,replace:S,go(A){return o.go(A)}};return x}var Kg;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Kg||(Kg={}));function hS(t,e,n){return n===void 0&&(n="/"),dS(t,e,n)}function dS(t,e,n,r){let s=typeof e=="string"?us(e):e,i=bf(s.pathname||"/",n);if(i==null)return null;let o=Z0(t);fS(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let c=SS(i);l=TS(o[u],c)}return l}function Z0(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,o,l)=>{let u={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};u.relativePath.startsWith("/")&&(Ve(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=lr([r,u.relativePath]),f=n.concat(u);i.children&&i.children.length>0&&(Ve(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Z0(i.children,e,f,c)),!(i.path==null&&!i.index)&&e.push({path:c,score:wS(c,i.index),routesMeta:f})};return t.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let u of ew(i.path))s(i,o,u)}),e}function ew(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=ew(r.join("/")),l=[];return l.push(...o.map(u=>u===""?i:[i,u].join("/"))),s&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function fS(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:ES(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const pS=/^:[\w-]+$/,mS=3,gS=2,yS=1,_S=10,vS=-2,Qg=t=>t==="*";function wS(t,e){let n=t.split("/"),r=n.length;return n.some(Qg)&&(r+=vS),e&&(r+=gS),n.filter(s=>!Qg(s)).reduce((s,i)=>s+(pS.test(i)?mS:i===""?yS:_S),r)}function ES(t,e){return t.length===e.length&&t.slice(0,-1).every((r,s)=>r===e[s])?t[t.length-1]-e[e.length-1]:0}function TS(t,e,n){let{routesMeta:r}=t,s={},i="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,f=i==="/"?e:e.slice(i.length)||"/",m=IS({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},f),g=u.route;if(!m)return null;Object.assign(s,m.params),o.push({params:s,pathname:lr([i,m.pathname]),pathnameBase:PS(lr([i,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(i=lr([i,m.pathnameBase]))}return o}function IS(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=xS(t.path,t.caseSensitive,t.end),s=e.match(n);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((c,f,m)=>{let{paramName:g,isOptional:S}=f;if(g==="*"){let x=l[m]||"";o=i.slice(0,i.length-x.length).replace(/(.)\/+$/,"$1")}const k=l[m];return S&&!k?c[g]=void 0:c[g]=(k||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:o,pattern:t}}function xS(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Du(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function SS(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Du(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function bf(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const RS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,CS=t=>RS.test(t);function AS(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:s=""}=typeof t=="string"?us(t):t,i;if(n)if(CS(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Du(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=Xg(n.substring(1),"/"):i=Xg(n,e)}else i=e;return{pathname:i,search:NS(r),hash:bS(s)}}function Xg(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function Qc(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function kS(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function tw(t,e){let n=kS(t);return e?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function nw(t,e,n,r){r===void 0&&(r=!1);let s;typeof t=="string"?s=us(t):(s=$o({},t),Ve(!s.pathname||!s.pathname.includes("?"),Qc("?","pathname","search",s)),Ve(!s.pathname||!s.pathname.includes("#"),Qc("#","pathname","hash",s)),Ve(!s.search||!s.search.includes("#"),Qc("#","search","hash",s)));let i=t===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=n;else{let m=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),m-=1;s.pathname=g.join("/")}l=m>=0?e[m]:"/"}let u=AS(s,l),c=o&&o!=="/"&&o.endsWith("/"),f=(i||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||f)&&(u.pathname+="/"),u}const lr=t=>t.join("/").replace(/\/\/+/g,"/"),PS=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),NS=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,bS=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function DS(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const rw=["post","put","patch","delete"];new Set(rw);const OS=["get",...rw];new Set(OS);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ho(){return Ho=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Ho.apply(this,arguments)}const Df=U.createContext(null),VS=U.createContext(null),cs=U.createContext(null),Ou=U.createContext(null),hs=U.createContext({outlet:null,matches:[],isDataRoute:!1}),sw=U.createContext(null);function LS(t,e){let{relative:n}=e===void 0?{}:e;aa()||Ve(!1);let{basename:r,navigator:s}=U.useContext(cs),{hash:i,pathname:o,search:l}=aw(t,{relative:n}),u=o;return r!=="/"&&(u=o==="/"?r:lr([r,o])),s.createHref({pathname:u,search:l,hash:i})}function aa(){return U.useContext(Ou)!=null}function la(){return aa()||Ve(!1),U.useContext(Ou).location}function iw(t){U.useContext(cs).static||U.useLayoutEffect(t)}function ow(){let{isDataRoute:t}=U.useContext(hs);return t?QS():jS()}function jS(){aa()||Ve(!1);let t=U.useContext(Df),{basename:e,future:n,navigator:r}=U.useContext(cs),{matches:s}=U.useContext(hs),{pathname:i}=la(),o=JSON.stringify(tw(s,n.v7_relativeSplatPath)),l=U.useRef(!1);return iw(()=>{l.current=!0}),U.useCallback(function(c,f){if(f===void 0&&(f={}),!l.current)return;if(typeof c=="number"){r.go(c);return}let m=nw(c,JSON.parse(o),i,f.relative==="path");t==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:lr([e,m.pathname])),(f.replace?r.replace:r.push)(m,f.state,f)},[e,r,o,i,t])}function aw(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=U.useContext(cs),{matches:s}=U.useContext(hs),{pathname:i}=la(),o=JSON.stringify(tw(s,r.v7_relativeSplatPath));return U.useMemo(()=>nw(t,JSON.parse(o),i,n==="path"),[t,o,i,n])}function MS(t,e){return US(t,e)}function US(t,e,n,r){aa()||Ve(!1);let{navigator:s}=U.useContext(cs),{matches:i}=U.useContext(hs),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let c=la(),f;if(e){var m;let A=typeof e=="string"?us(e):e;u==="/"||(m=A.pathname)!=null&&m.startsWith(u)||Ve(!1),f=A}else f=c;let g=f.pathname||"/",S=g;if(u!=="/"){let A=u.replace(/^\//,"").split("/");S="/"+g.replace(/^\//,"").split("/").slice(A.length).join("/")}let k=hS(t,{pathname:S}),x=HS(k&&k.map(A=>Object.assign({},A,{params:Object.assign({},l,A.params),pathname:lr([u,s.encodeLocation?s.encodeLocation(A.pathname).pathname:A.pathname]),pathnameBase:A.pathnameBase==="/"?u:lr([u,s.encodeLocation?s.encodeLocation(A.pathnameBase).pathname:A.pathnameBase])})),i,n,r);return e&&x?U.createElement(Ou.Provider,{value:{location:Ho({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:Jn.Pop}},x):x}function FS(){let t=KS(),e=DS(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return U.createElement(U.Fragment,null,U.createElement("h2",null,"Unexpected Application Error!"),U.createElement("h3",{style:{fontStyle:"italic"}},e),n?U.createElement("pre",{style:s},n):null,null)}const BS=U.createElement(FS,null);class zS extends U.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?U.createElement(hs.Provider,{value:this.props.routeContext},U.createElement(sw.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function $S(t){let{routeContext:e,match:n,children:r}=t,s=U.useContext(Df);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),U.createElement(hs.Provider,{value:e},r)}function HS(t,e,n,r){var s;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var i;if(!n)return null;if(n.errors)t=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,l=(s=n)==null?void 0:s.errors;if(l!=null){let f=o.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);f>=0||Ve(!1),o=o.slice(0,Math.min(o.length,f+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let m=o[f];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(c=f),m.route.id){let{loaderData:g,errors:S}=n,k=m.route.loader&&g[m.route.id]===void 0&&(!S||S[m.route.id]===void 0);if(m.route.lazy||k){u=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((f,m,g)=>{let S,k=!1,x=null,A=null;n&&(S=l&&m.route.id?l[m.route.id]:void 0,x=m.route.errorElement||BS,u&&(c<0&&g===0?(XS("route-fallback"),k=!0,A=null):c===g&&(k=!0,A=m.route.hydrateFallbackElement||null)));let E=e.concat(o.slice(0,g+1)),w=()=>{let I;return S?I=x:k?I=A:m.route.Component?I=U.createElement(m.route.Component,null):m.route.element?I=m.route.element:I=f,U.createElement($S,{match:m,routeContext:{outlet:f,matches:E,isDataRoute:n!=null},children:I})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?U.createElement(zS,{location:n.location,revalidation:n.revalidation,component:x,error:S,children:w(),routeContext:{outlet:null,matches:E,isDataRoute:!0}}):w()},null)}var lw=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(lw||{}),uw=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(uw||{});function qS(t){let e=U.useContext(Df);return e||Ve(!1),e}function WS(t){let e=U.useContext(VS);return e||Ve(!1),e}function GS(t){let e=U.useContext(hs);return e||Ve(!1),e}function cw(t){let e=GS(),n=e.matches[e.matches.length-1];return n.route.id||Ve(!1),n.route.id}function KS(){var t;let e=U.useContext(sw),n=WS(),r=cw();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function QS(){let{router:t}=qS(lw.UseNavigateStable),e=cw(uw.UseNavigateStable),n=U.useRef(!1);return iw(()=>{n.current=!0}),U.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?t.navigate(s):t.navigate(s,Ho({fromRouteId:e},i)))},[t,e])}const Yg={};function XS(t,e,n){Yg[t]||(Yg[t]=!0)}function YS(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function Es(t){Ve(!1)}function JS(t){let{basename:e="/",children:n=null,location:r,navigationType:s=Jn.Pop,navigator:i,static:o=!1,future:l}=t;aa()&&Ve(!1);let u=e.replace(/^\/*/,"/"),c=U.useMemo(()=>({basename:u,navigator:i,static:o,future:Ho({v7_relativeSplatPath:!1},l)}),[u,l,i,o]);typeof r=="string"&&(r=us(r));let{pathname:f="/",search:m="",hash:g="",state:S=null,key:k="default"}=r,x=U.useMemo(()=>{let A=bf(f,u);return A==null?null:{location:{pathname:A,search:m,hash:g,state:S,key:k},navigationType:s}},[u,f,m,g,S,k,s]);return x==null?null:U.createElement(cs.Provider,{value:c},U.createElement(Ou.Provider,{children:n,value:x}))}function ZS(t){let{children:e,location:n}=t;return MS(sd(e),n)}new Promise(()=>{});function sd(t,e){e===void 0&&(e=[]);let n=[];return U.Children.forEach(t,(r,s)=>{if(!U.isValidElement(r))return;let i=[...e,s];if(r.type===U.Fragment){n.push.apply(n,sd(r.props.children,i));return}r.type!==Es&&Ve(!1),!r.props.index||!r.props.children||Ve(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=sd(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function id(){return id=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},id.apply(this,arguments)}function eR(t,e){if(t==null)return{};var n={},r=Object.keys(t),s,i;for(i=0;i<r.length;i++)s=r[i],!(e.indexOf(s)>=0)&&(n[s]=t[s]);return n}function tR(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function nR(t,e){return t.button===0&&(!e||e==="_self")&&!tR(t)}const rR=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],sR="6";try{window.__reactRouterVersion=sR}catch{}const iR="startTransition",Jg=XI[iR];function oR(t){let{basename:e,children:n,future:r,window:s}=t,i=U.useRef();i.current==null&&(i.current=lS({window:s,v5Compat:!0}));let o=i.current,[l,u]=U.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},f=U.useCallback(m=>{c&&Jg?Jg(()=>u(m)):u(m)},[u,c]);return U.useLayoutEffect(()=>o.listen(f),[o,f]),U.useEffect(()=>YS(r),[r]),U.createElement(JS,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const aR=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",lR=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ws=U.forwardRef(function(e,n){let{onClick:r,relative:s,reloadDocument:i,replace:o,state:l,target:u,to:c,preventScrollReset:f,viewTransition:m}=e,g=eR(e,rR),{basename:S}=U.useContext(cs),k,x=!1;if(typeof c=="string"&&lR.test(c)&&(k=c,aR))try{let I=new URL(window.location.href),b=c.startsWith("//")?new URL(I.protocol+c):new URL(c),M=bf(b.pathname,S);b.origin===I.origin&&M!=null?c=M+b.search+b.hash:x=!0}catch{}let A=LS(c,{relative:s}),E=uR(c,{replace:o,state:l,target:u,preventScrollReset:f,relative:s,viewTransition:m});function w(I){r&&r(I),I.defaultPrevented||E(I)}return U.createElement("a",id({},g,{href:k||A,onClick:x||i?r:w,ref:n,target:u}))});var Zg;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Zg||(Zg={}));var ey;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(ey||(ey={}));function uR(t,e){let{target:n,replace:r,state:s,preventScrollReset:i,relative:o,viewTransition:l}=e===void 0?{}:e,u=ow(),c=la(),f=aw(t,{relative:o});return U.useCallback(m=>{if(nR(m,n)){m.preventDefault();let g=r!==void 0?r:Xl(c)===Xl(f);u(t,{replace:g,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[c,u,f,r,s,n,t,i,o,l])}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var cR={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hR=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),he=(t,e)=>{const n=U.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:u,...c},f)=>U.createElement("svg",{ref:f,...cR,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:["lucide",`lucide-${hR(t)}`,l].join(" "),...c},[...e.map(([m,g])=>U.createElement(m,g)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hw=he("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dR=he("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const od=he("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ad=he("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dw=he("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=he("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ty=he("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qo=he("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fR=he("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oi=he("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ld=he("FlaskConical",[["path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2",key:"pzvekw"}],["path",{d:"M8.5 2h7",key:"csnxdl"}],["path",{d:"M7 16h10",key:"wp8him"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pR=he("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yl=he("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mR=he("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ny=he("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gR=he("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yR=he("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _R=he("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ud=he("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fw=he("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vR=he("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Of=he("Table2",[["path",{d:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",key:"gugj83"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=he("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wR=he("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ER=he("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vf=he("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function TR({testDocuments:t,requirements:e}){const n=t.filter(u=>u.status==="pendente").length,r=t.filter(u=>u.status==="aprovado").length,s=t.filter(u=>u.status==="reprovado").length,i=[{label:"Total de Testes",value:t.length,color:"bg-blue-500"},{label:"Aprovados",value:r,color:"bg-green-500"},{label:"Reprovados",value:s,color:"bg-red-500"},{label:"Pendentes",value:n,color:"bg-yellow-500"},{label:"Requisitos",value:e.length,color:"bg-purple-500"}],o=[{title:"Registrar Teste",description:"Colaboradora registra um novo teste de homologação",icon:ld,path:"/registro",color:"bg-blue-100 text-blue-600"},{title:"Ver Documentos",description:"Visualizar e gerenciar documentos de teste",icon:oi,path:"/documentos",color:"bg-green-100 text-green-600"},{title:"Gerar Gherkin",description:"Converter testes para formato Gherkin + Playwright",icon:Ms,path:"/gherkin",color:"bg-purple-100 text-purple-600"},{title:"Tabela de Partição",description:"Gerenciar requisitos com tabela de partição",icon:Of,path:"/particao",color:"bg-orange-100 text-orange-600"}],l=t.slice(-5).reverse();return d.jsxs("div",{className:"space-y-8",children:[d.jsxs("div",{children:[d.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"DocSimples Reports"}),d.jsx("p",{className:"mt-2 text-gray-600",children:"Sistema de documentação de testes de homologação com geração automática de Gherkin e Playwright"})]}),d.jsx("div",{className:"grid grid-cols-2 md:grid-cols-5 gap-4",children:i.map(u=>d.jsxs("div",{className:"card",children:[d.jsx("div",{className:`w-2 h-2 rounded-full ${u.color} mb-2`}),d.jsx("p",{className:"text-2xl font-bold text-gray-900",children:u.value}),d.jsx("p",{className:"text-sm text-gray-600",children:u.label})]},u.label))}),d.jsxs("div",{children:[d.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Ações Rápidas"}),d.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-4 gap-4",children:o.map(u=>{const c=u.icon;return d.jsxs(Ws,{to:u.path,className:"card hover:shadow-md transition-shadow group",children:[d.jsx("div",{className:`w-12 h-12 rounded-lg ${u.color} flex items-center justify-center mb-4`,children:d.jsx(c,{className:"w-6 h-6"})}),d.jsx("h3",{className:"font-semibold text-gray-900 group-hover:text-primary-600 transition-colors",children:u.title}),d.jsx("p",{className:"text-sm text-gray-600 mt-1",children:u.description}),d.jsxs("div",{className:"flex items-center text-primary-600 text-sm font-medium mt-3",children:[d.jsx("span",{children:"Acessar"}),d.jsx(dR,{className:"w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"})]})]},u.path)})})]}),l.length>0&&d.jsxs("div",{children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsx("h2",{className:"text-xl font-semibold text-gray-900",children:"Testes Recentes"}),d.jsx(Ws,{to:"/documentos",className:"text-primary-600 text-sm font-medium hover:text-primary-700",children:"Ver todos →"})]}),d.jsx("div",{className:"card",children:d.jsx("div",{className:"divide-y divide-gray-200",children:l.map(u=>d.jsxs("div",{className:"py-3 flex items-center justify-between",children:[d.jsxs("div",{className:"flex items-center space-x-3",children:[u.status==="aprovado"?d.jsx(od,{className:"w-5 h-5 text-green-500"}):u.status==="reprovado"?d.jsx(od,{className:"w-5 h-5 text-red-500"}):d.jsx(dw,{className:"w-5 h-5 text-yellow-500"}),d.jsxs("div",{children:[d.jsx("p",{className:"font-medium text-gray-900",children:u.title}),d.jsx("p",{className:"text-sm text-gray-500",children:u.feature})]})]}),d.jsx("span",{className:`badge ${u.status==="aprovado"?"badge-success":u.status==="reprovado"?"badge-error":"badge-warning"}`,children:u.status})]},u.id))})})]}),t.length===0&&d.jsxs("div",{className:"card text-center py-12",children:[d.jsx(ld,{className:"w-12 h-12 text-gray-400 mx-auto mb-4"}),d.jsx("h3",{className:"text-lg font-medium text-gray-900",children:"Nenhum teste registrado"}),d.jsx("p",{className:"text-gray-600 mt-1",children:"Comece registrando seu primeiro teste de homologação"}),d.jsx(Ws,{to:"/registro",className:"btn-primary inline-block mt-4",children:"Registrar Teste"})]})]})}const IR=()=>{};var ry={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},xR=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},mw={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,c=u?t[s+2]:0,f=i>>2,m=(i&3)<<4|l>>4;let g=(l&15)<<2|c>>6,S=c&63;u||(S=64,o||(g=64)),r.push(n[f],n[m],n[g],n[S])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(pw(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):xR(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||c==null||m==null)throw new SR;const g=i<<2|l>>4;if(r.push(g),c!==64){const S=l<<4&240|c>>2;if(r.push(S),m!==64){const k=c<<6&192|m;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class SR extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const RR=function(t){const e=pw(t);return mw.encodeByteArray(e,!0)},Jl=function(t){return RR(t).replace(/\./g,"")},gw=function(t){try{return mw.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CR(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AR=()=>CR().__FIREBASE_DEFAULTS__,kR=()=>{if(typeof process>"u"||typeof ry>"u")return;const t=ry.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},PR=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&gw(t[1]);return e&&JSON.parse(e)},Vu=()=>{try{return IR()||AR()||kR()||PR()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},yw=t=>{var e,n;return(n=(e=Vu())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},_w=t=>{const e=yw(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},vw=()=>{var t;return(t=Vu())==null?void 0:t.config},ww=t=>{var e;return(e=Vu())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NR{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cr(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Lf(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ew(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Jl(JSON.stringify(n)),Jl(JSON.stringify(o)),""].join(".")}const vo={};function bR(){const t={prod:[],emulator:[]};for(const e of Object.keys(vo))vo[e]?t.emulator.push(e):t.prod.push(e);return t}function DR(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let sy=!1;function jf(t,e){if(typeof window>"u"||typeof document>"u"||!Cr(window.location.host)||vo[t]===e||vo[t]||sy)return;vo[t]=e;function n(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=bR().prod.length>0;function o(){const g=document.getElementById(r);g&&g.remove()}function l(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function u(g,S){g.setAttribute("width","24"),g.setAttribute("id",S),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function c(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{sy=!0,o()},g}function f(g,S){g.setAttribute("id",S),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function m(){const g=DR(r),S=n("text"),k=document.getElementById(S)||document.createElement("span"),x=n("learnmore"),A=document.getElementById(x)||document.createElement("a"),E=n("preprendIcon"),w=document.getElementById(E)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const I=g.element;l(I),f(A,x);const b=c();u(w,E),I.append(w,k,A,b),document.body.appendChild(I)}i?(k.innerText="Preview backend disconnected.",w.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(w.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function OR(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(it())}function VR(){var e;const t=(e=Vu())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function LR(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jR(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function MR(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function UR(){const t=it();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function FR(){return!VR()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function BR(){try{return typeof indexedDB=="object"}catch{return!1}}function zR(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $R="FirebaseError";class pn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=$R,Object.setPrototypeOf(this,pn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ua.prototype.create)}}class ua{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?HR(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new pn(s,l,r)}}function HR(t,e){return t.replace(qR,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const qR=/\{\$([^}]+)}/g;function WR(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ts(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(iy(i)&&iy(o)){if(!ts(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function iy(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ro(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function so(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function GR(t,e){const n=new KR(t,e);return n.subscribe.bind(n)}class KR{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");QR(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Xc),s.error===void 0&&(s.error=Xc),s.complete===void 0&&(s.complete=Xc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function QR(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Xc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(t){return t&&t._delegate?t._delegate:t}class yr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XR{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new NR;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(JR(e))try{this.getOrInitializeService({instanceIdentifier:Fr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Fr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Fr){return this.instances.has(e)}getOptions(e=Fr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:YR(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Fr){return this.component?this.component.multipleInstances?e:Fr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function YR(t){return t===Fr?void 0:t}function JR(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZR{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new XR(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(te||(te={}));const eC={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},tC=te.INFO,nC={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},rC=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=nC[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Mf{constructor(e){this.name=e,this._logLevel=tC,this._logHandler=rC,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?eC[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}const sC=(t,e)=>e.some(n=>t instanceof n);let oy,ay;function iC(){return oy||(oy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function oC(){return ay||(ay=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Tw=new WeakMap,cd=new WeakMap,Iw=new WeakMap,Yc=new WeakMap,Uf=new WeakMap;function aC(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(ur(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Tw.set(n,t)}).catch(()=>{}),Uf.set(e,t),e}function lC(t){if(cd.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});cd.set(t,e)}let hd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return cd.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Iw.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ur(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function uC(t){hd=t(hd)}function cC(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Jc(this),e,...n);return Iw.set(r,e.sort?e.sort():[e]),ur(r)}:oC().includes(t)?function(...e){return t.apply(Jc(this),e),ur(Tw.get(this))}:function(...e){return ur(t.apply(Jc(this),e))}}function hC(t){return typeof t=="function"?cC(t):(t instanceof IDBTransaction&&lC(t),sC(t,iC())?new Proxy(t,hd):t)}function ur(t){if(t instanceof IDBRequest)return aC(t);if(Yc.has(t))return Yc.get(t);const e=hC(t);return e!==t&&(Yc.set(t,e),Uf.set(e,t)),e}const Jc=t=>Uf.get(t);function dC(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=ur(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ur(o.result),u.oldVersion,u.newVersion,ur(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const fC=["get","getKey","getAll","getAllKeys","count"],pC=["put","add","delete","clear"],Zc=new Map;function ly(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Zc.get(e))return Zc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=pC.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||fC.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),s&&u.done]))[0]};return Zc.set(e,i),i}uC(t=>({...t,get:(e,n,r)=>ly(e,n)||t.get(e,n,r),has:(e,n)=>!!ly(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mC{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(gC(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function gC(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const dd="@firebase/app",uy="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=new Mf("@firebase/app"),yC="@firebase/app-compat",_C="@firebase/analytics-compat",vC="@firebase/analytics",wC="@firebase/app-check-compat",EC="@firebase/app-check",TC="@firebase/auth",IC="@firebase/auth-compat",xC="@firebase/database",SC="@firebase/data-connect",RC="@firebase/database-compat",CC="@firebase/functions",AC="@firebase/functions-compat",kC="@firebase/installations",PC="@firebase/installations-compat",NC="@firebase/messaging",bC="@firebase/messaging-compat",DC="@firebase/performance",OC="@firebase/performance-compat",VC="@firebase/remote-config",LC="@firebase/remote-config-compat",jC="@firebase/storage",MC="@firebase/storage-compat",UC="@firebase/firestore",FC="@firebase/ai",BC="@firebase/firestore-compat",zC="firebase",$C="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fd="[DEFAULT]",HC={[dd]:"fire-core",[yC]:"fire-core-compat",[vC]:"fire-analytics",[_C]:"fire-analytics-compat",[EC]:"fire-app-check",[wC]:"fire-app-check-compat",[TC]:"fire-auth",[IC]:"fire-auth-compat",[xC]:"fire-rtdb",[SC]:"fire-data-connect",[RC]:"fire-rtdb-compat",[CC]:"fire-fn",[AC]:"fire-fn-compat",[kC]:"fire-iid",[PC]:"fire-iid-compat",[NC]:"fire-fcm",[bC]:"fire-fcm-compat",[DC]:"fire-perf",[OC]:"fire-perf-compat",[VC]:"fire-rc",[LC]:"fire-rc-compat",[jC]:"fire-gcs",[MC]:"fire-gcs-compat",[UC]:"fire-fst",[BC]:"fire-fst-compat",[FC]:"fire-vertex","fire-js":"fire-js",[zC]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl=new Map,qC=new Map,pd=new Map;function cy(t,e){try{t.container.addComponent(e)}catch(n){Cn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ns(t){const e=t.name;if(pd.has(e))return Cn.debug(`There were multiple attempts to register component ${e}.`),!1;pd.set(e,t);for(const n of Zl.values())cy(n,t);for(const n of qC.values())cy(n,t);return!0}function Lu(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function bt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},cr=new ua("app","Firebase",WC);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new yr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw cr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds=$C;function xw(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:fd,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw cr.create("bad-app-name",{appName:String(s)});if(n||(n=vw()),!n)throw cr.create("no-options");const i=Zl.get(s);if(i){if(ts(n,i.options)&&ts(r,i.config))return i;throw cr.create("duplicate-app",{appName:s})}const o=new ZR(s);for(const u of pd.values())o.addComponent(u);const l=new GC(n,r,o);return Zl.set(s,l),l}function Ff(t=fd){const e=Zl.get(t);if(!e&&t===fd&&vw())return xw();if(!e)throw cr.create("no-app",{appName:t});return e}function on(t,e,n){let r=HC[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Cn.warn(o.join(" "));return}ns(new yr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KC="firebase-heartbeat-database",QC=1,Wo="firebase-heartbeat-store";let eh=null;function Sw(){return eh||(eh=dC(KC,QC,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Wo)}catch(n){console.warn(n)}}}}).catch(t=>{throw cr.create("idb-open",{originalErrorMessage:t.message})})),eh}async function XC(t){try{const n=(await Sw()).transaction(Wo),r=await n.objectStore(Wo).get(Rw(t));return await n.done,r}catch(e){if(e instanceof pn)Cn.warn(e.message);else{const n=cr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Cn.warn(n.message)}}}async function hy(t,e){try{const r=(await Sw()).transaction(Wo,"readwrite");await r.objectStore(Wo).put(e,Rw(t)),await r.done}catch(n){if(n instanceof pn)Cn.warn(n.message);else{const r=cr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Cn.warn(r.message)}}}function Rw(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YC=1024,JC=30;class ZC{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new tA(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=dy();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>JC){const o=nA(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Cn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=dy(),{heartbeatsToSend:r,unsentEntries:s}=eA(this._heartbeatsCache.heartbeats),i=Jl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Cn.warn(n),""}}}function dy(){return new Date().toISOString().substring(0,10)}function eA(t,e=YC){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),fy(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),fy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class tA{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return BR()?zR().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await XC(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return hy(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return hy(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function fy(t){return Jl(JSON.stringify({version:2,heartbeats:t})).length}function nA(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rA(t){ns(new yr("platform-logger",e=>new mC(e),"PRIVATE")),ns(new yr("heartbeat",e=>new ZC(e),"PRIVATE")),on(dd,uy,t),on(dd,uy,"esm2020"),on("fire-js","")}rA("");var sA="firebase",iA="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */on(sA,iA,"app");var py=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hr,Cw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,_){function T(){}T.prototype=_.prototype,y.F=_.prototype,y.prototype=new T,y.prototype.constructor=y,y.D=function(C,P,D){for(var R=Array(arguments.length-2),He=2;He<arguments.length;He++)R[He-2]=arguments[He];return _.prototype[P].apply(C,R)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,_,T){T||(T=0);const C=Array(16);if(typeof _=="string")for(var P=0;P<16;++P)C[P]=_.charCodeAt(T++)|_.charCodeAt(T++)<<8|_.charCodeAt(T++)<<16|_.charCodeAt(T++)<<24;else for(P=0;P<16;++P)C[P]=_[T++]|_[T++]<<8|_[T++]<<16|_[T++]<<24;_=y.g[0],T=y.g[1],P=y.g[2];let D=y.g[3],R;R=_+(D^T&(P^D))+C[0]+3614090360&4294967295,_=T+(R<<7&4294967295|R>>>25),R=D+(P^_&(T^P))+C[1]+3905402710&4294967295,D=_+(R<<12&4294967295|R>>>20),R=P+(T^D&(_^T))+C[2]+606105819&4294967295,P=D+(R<<17&4294967295|R>>>15),R=T+(_^P&(D^_))+C[3]+3250441966&4294967295,T=P+(R<<22&4294967295|R>>>10),R=_+(D^T&(P^D))+C[4]+4118548399&4294967295,_=T+(R<<7&4294967295|R>>>25),R=D+(P^_&(T^P))+C[5]+1200080426&4294967295,D=_+(R<<12&4294967295|R>>>20),R=P+(T^D&(_^T))+C[6]+2821735955&4294967295,P=D+(R<<17&4294967295|R>>>15),R=T+(_^P&(D^_))+C[7]+4249261313&4294967295,T=P+(R<<22&4294967295|R>>>10),R=_+(D^T&(P^D))+C[8]+1770035416&4294967295,_=T+(R<<7&4294967295|R>>>25),R=D+(P^_&(T^P))+C[9]+2336552879&4294967295,D=_+(R<<12&4294967295|R>>>20),R=P+(T^D&(_^T))+C[10]+4294925233&4294967295,P=D+(R<<17&4294967295|R>>>15),R=T+(_^P&(D^_))+C[11]+2304563134&4294967295,T=P+(R<<22&4294967295|R>>>10),R=_+(D^T&(P^D))+C[12]+1804603682&4294967295,_=T+(R<<7&4294967295|R>>>25),R=D+(P^_&(T^P))+C[13]+4254626195&4294967295,D=_+(R<<12&4294967295|R>>>20),R=P+(T^D&(_^T))+C[14]+2792965006&4294967295,P=D+(R<<17&4294967295|R>>>15),R=T+(_^P&(D^_))+C[15]+1236535329&4294967295,T=P+(R<<22&4294967295|R>>>10),R=_+(P^D&(T^P))+C[1]+4129170786&4294967295,_=T+(R<<5&4294967295|R>>>27),R=D+(T^P&(_^T))+C[6]+3225465664&4294967295,D=_+(R<<9&4294967295|R>>>23),R=P+(_^T&(D^_))+C[11]+643717713&4294967295,P=D+(R<<14&4294967295|R>>>18),R=T+(D^_&(P^D))+C[0]+3921069994&4294967295,T=P+(R<<20&4294967295|R>>>12),R=_+(P^D&(T^P))+C[5]+3593408605&4294967295,_=T+(R<<5&4294967295|R>>>27),R=D+(T^P&(_^T))+C[10]+38016083&4294967295,D=_+(R<<9&4294967295|R>>>23),R=P+(_^T&(D^_))+C[15]+3634488961&4294967295,P=D+(R<<14&4294967295|R>>>18),R=T+(D^_&(P^D))+C[4]+3889429448&4294967295,T=P+(R<<20&4294967295|R>>>12),R=_+(P^D&(T^P))+C[9]+568446438&4294967295,_=T+(R<<5&4294967295|R>>>27),R=D+(T^P&(_^T))+C[14]+3275163606&4294967295,D=_+(R<<9&4294967295|R>>>23),R=P+(_^T&(D^_))+C[3]+4107603335&4294967295,P=D+(R<<14&4294967295|R>>>18),R=T+(D^_&(P^D))+C[8]+1163531501&4294967295,T=P+(R<<20&4294967295|R>>>12),R=_+(P^D&(T^P))+C[13]+2850285829&4294967295,_=T+(R<<5&4294967295|R>>>27),R=D+(T^P&(_^T))+C[2]+4243563512&4294967295,D=_+(R<<9&4294967295|R>>>23),R=P+(_^T&(D^_))+C[7]+1735328473&4294967295,P=D+(R<<14&4294967295|R>>>18),R=T+(D^_&(P^D))+C[12]+2368359562&4294967295,T=P+(R<<20&4294967295|R>>>12),R=_+(T^P^D)+C[5]+4294588738&4294967295,_=T+(R<<4&4294967295|R>>>28),R=D+(_^T^P)+C[8]+2272392833&4294967295,D=_+(R<<11&4294967295|R>>>21),R=P+(D^_^T)+C[11]+1839030562&4294967295,P=D+(R<<16&4294967295|R>>>16),R=T+(P^D^_)+C[14]+4259657740&4294967295,T=P+(R<<23&4294967295|R>>>9),R=_+(T^P^D)+C[1]+2763975236&4294967295,_=T+(R<<4&4294967295|R>>>28),R=D+(_^T^P)+C[4]+1272893353&4294967295,D=_+(R<<11&4294967295|R>>>21),R=P+(D^_^T)+C[7]+4139469664&4294967295,P=D+(R<<16&4294967295|R>>>16),R=T+(P^D^_)+C[10]+3200236656&4294967295,T=P+(R<<23&4294967295|R>>>9),R=_+(T^P^D)+C[13]+681279174&4294967295,_=T+(R<<4&4294967295|R>>>28),R=D+(_^T^P)+C[0]+3936430074&4294967295,D=_+(R<<11&4294967295|R>>>21),R=P+(D^_^T)+C[3]+3572445317&4294967295,P=D+(R<<16&4294967295|R>>>16),R=T+(P^D^_)+C[6]+76029189&4294967295,T=P+(R<<23&4294967295|R>>>9),R=_+(T^P^D)+C[9]+3654602809&4294967295,_=T+(R<<4&4294967295|R>>>28),R=D+(_^T^P)+C[12]+3873151461&4294967295,D=_+(R<<11&4294967295|R>>>21),R=P+(D^_^T)+C[15]+530742520&4294967295,P=D+(R<<16&4294967295|R>>>16),R=T+(P^D^_)+C[2]+3299628645&4294967295,T=P+(R<<23&4294967295|R>>>9),R=_+(P^(T|~D))+C[0]+4096336452&4294967295,_=T+(R<<6&4294967295|R>>>26),R=D+(T^(_|~P))+C[7]+1126891415&4294967295,D=_+(R<<10&4294967295|R>>>22),R=P+(_^(D|~T))+C[14]+2878612391&4294967295,P=D+(R<<15&4294967295|R>>>17),R=T+(D^(P|~_))+C[5]+4237533241&4294967295,T=P+(R<<21&4294967295|R>>>11),R=_+(P^(T|~D))+C[12]+1700485571&4294967295,_=T+(R<<6&4294967295|R>>>26),R=D+(T^(_|~P))+C[3]+2399980690&4294967295,D=_+(R<<10&4294967295|R>>>22),R=P+(_^(D|~T))+C[10]+4293915773&4294967295,P=D+(R<<15&4294967295|R>>>17),R=T+(D^(P|~_))+C[1]+2240044497&4294967295,T=P+(R<<21&4294967295|R>>>11),R=_+(P^(T|~D))+C[8]+1873313359&4294967295,_=T+(R<<6&4294967295|R>>>26),R=D+(T^(_|~P))+C[15]+4264355552&4294967295,D=_+(R<<10&4294967295|R>>>22),R=P+(_^(D|~T))+C[6]+2734768916&4294967295,P=D+(R<<15&4294967295|R>>>17),R=T+(D^(P|~_))+C[13]+1309151649&4294967295,T=P+(R<<21&4294967295|R>>>11),R=_+(P^(T|~D))+C[4]+4149444226&4294967295,_=T+(R<<6&4294967295|R>>>26),R=D+(T^(_|~P))+C[11]+3174756917&4294967295,D=_+(R<<10&4294967295|R>>>22),R=P+(_^(D|~T))+C[2]+718787259&4294967295,P=D+(R<<15&4294967295|R>>>17),R=T+(D^(P|~_))+C[9]+3951481745&4294967295,y.g[0]=y.g[0]+_&4294967295,y.g[1]=y.g[1]+(P+(R<<21&4294967295|R>>>11))&4294967295,y.g[2]=y.g[2]+P&4294967295,y.g[3]=y.g[3]+D&4294967295}r.prototype.v=function(y,_){_===void 0&&(_=y.length);const T=_-this.blockSize,C=this.C;let P=this.h,D=0;for(;D<_;){if(P==0)for(;D<=T;)s(this,y,D),D+=this.blockSize;if(typeof y=="string"){for(;D<_;)if(C[P++]=y.charCodeAt(D++),P==this.blockSize){s(this,C),P=0;break}}else for(;D<_;)if(C[P++]=y[D++],P==this.blockSize){s(this,C),P=0;break}}this.h=P,this.o+=_},r.prototype.A=function(){var y=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);y[0]=128;for(var _=1;_<y.length-8;++_)y[_]=0;_=this.o*8;for(var T=y.length-8;T<y.length;++T)y[T]=_&255,_/=256;for(this.v(y),y=Array(16),_=0,T=0;T<4;++T)for(let C=0;C<32;C+=8)y[_++]=this.g[T]>>>C&255;return y};function i(y,_){var T=l;return Object.prototype.hasOwnProperty.call(T,y)?T[y]:T[y]=_(y)}function o(y,_){this.h=_;const T=[];let C=!0;for(let P=y.length-1;P>=0;P--){const D=y[P]|0;C&&D==_||(T[P]=D,C=!1)}this.g=T}var l={};function u(y){return-128<=y&&y<128?i(y,function(_){return new o([_|0],_<0?-1:0)}):new o([y|0],y<0?-1:0)}function c(y){if(isNaN(y)||!isFinite(y))return m;if(y<0)return A(c(-y));const _=[];let T=1;for(let C=0;y>=T;C++)_[C]=y/T|0,T*=4294967296;return new o(_,0)}function f(y,_){if(y.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(y.charAt(0)=="-")return A(f(y.substring(1),_));if(y.indexOf("-")>=0)throw Error('number format error: interior "-" character');const T=c(Math.pow(_,8));let C=m;for(let D=0;D<y.length;D+=8){var P=Math.min(8,y.length-D);const R=parseInt(y.substring(D,D+P),_);P<8?(P=c(Math.pow(_,P)),C=C.j(P).add(c(R))):(C=C.j(T),C=C.add(c(R)))}return C}var m=u(0),g=u(1),S=u(16777216);t=o.prototype,t.m=function(){if(x(this))return-A(this).m();let y=0,_=1;for(let T=0;T<this.g.length;T++){const C=this.i(T);y+=(C>=0?C:4294967296+C)*_,_*=4294967296}return y},t.toString=function(y){if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(k(this))return"0";if(x(this))return"-"+A(this).toString(y);const _=c(Math.pow(y,6));var T=this;let C="";for(;;){const P=b(T,_).g;T=E(T,P.j(_));let D=((T.g.length>0?T.g[0]:T.h)>>>0).toString(y);if(T=P,k(T))return D+C;for(;D.length<6;)D="0"+D;C=D+C}},t.i=function(y){return y<0?0:y<this.g.length?this.g[y]:this.h};function k(y){if(y.h!=0)return!1;for(let _=0;_<y.g.length;_++)if(y.g[_]!=0)return!1;return!0}function x(y){return y.h==-1}t.l=function(y){return y=E(this,y),x(y)?-1:k(y)?0:1};function A(y){const _=y.g.length,T=[];for(let C=0;C<_;C++)T[C]=~y.g[C];return new o(T,~y.h).add(g)}t.abs=function(){return x(this)?A(this):this},t.add=function(y){const _=Math.max(this.g.length,y.g.length),T=[];let C=0;for(let P=0;P<=_;P++){let D=C+(this.i(P)&65535)+(y.i(P)&65535),R=(D>>>16)+(this.i(P)>>>16)+(y.i(P)>>>16);C=R>>>16,D&=65535,R&=65535,T[P]=R<<16|D}return new o(T,T[T.length-1]&-2147483648?-1:0)};function E(y,_){return y.add(A(_))}t.j=function(y){if(k(this)||k(y))return m;if(x(this))return x(y)?A(this).j(A(y)):A(A(this).j(y));if(x(y))return A(this.j(A(y)));if(this.l(S)<0&&y.l(S)<0)return c(this.m()*y.m());const _=this.g.length+y.g.length,T=[];for(var C=0;C<2*_;C++)T[C]=0;for(C=0;C<this.g.length;C++)for(let P=0;P<y.g.length;P++){const D=this.i(C)>>>16,R=this.i(C)&65535,He=y.i(P)>>>16,mn=y.i(P)&65535;T[2*C+2*P]+=R*mn,w(T,2*C+2*P),T[2*C+2*P+1]+=D*mn,w(T,2*C+2*P+1),T[2*C+2*P+1]+=R*He,w(T,2*C+2*P+1),T[2*C+2*P+2]+=D*He,w(T,2*C+2*P+2)}for(y=0;y<_;y++)T[y]=T[2*y+1]<<16|T[2*y];for(y=_;y<2*_;y++)T[y]=0;return new o(T,0)};function w(y,_){for(;(y[_]&65535)!=y[_];)y[_+1]+=y[_]>>>16,y[_]&=65535,_++}function I(y,_){this.g=y,this.h=_}function b(y,_){if(k(_))throw Error("division by zero");if(k(y))return new I(m,m);if(x(y))return _=b(A(y),_),new I(A(_.g),A(_.h));if(x(_))return _=b(y,A(_)),new I(A(_.g),_.h);if(y.g.length>30){if(x(y)||x(_))throw Error("slowDivide_ only works with positive integers.");for(var T=g,C=_;C.l(y)<=0;)T=M(T),C=M(C);var P=N(T,1),D=N(C,1);for(C=N(C,2),T=N(T,2);!k(C);){var R=D.add(C);R.l(y)<=0&&(P=P.add(T),D=R),C=N(C,1),T=N(T,1)}return _=E(y,P.j(_)),new I(P,_)}for(P=m;y.l(_)>=0;){for(T=Math.max(1,Math.floor(y.m()/_.m())),C=Math.ceil(Math.log(T)/Math.LN2),C=C<=48?1:Math.pow(2,C-48),D=c(T),R=D.j(_);x(R)||R.l(y)>0;)T-=C,D=c(T),R=D.j(_);k(D)&&(D=g),P=P.add(D),y=E(y,R)}return new I(P,y)}t.B=function(y){return b(this,y).h},t.and=function(y){const _=Math.max(this.g.length,y.g.length),T=[];for(let C=0;C<_;C++)T[C]=this.i(C)&y.i(C);return new o(T,this.h&y.h)},t.or=function(y){const _=Math.max(this.g.length,y.g.length),T=[];for(let C=0;C<_;C++)T[C]=this.i(C)|y.i(C);return new o(T,this.h|y.h)},t.xor=function(y){const _=Math.max(this.g.length,y.g.length),T=[];for(let C=0;C<_;C++)T[C]=this.i(C)^y.i(C);return new o(T,this.h^y.h)};function M(y){const _=y.g.length+1,T=[];for(let C=0;C<_;C++)T[C]=y.i(C)<<1|y.i(C-1)>>>31;return new o(T,y.h)}function N(y,_){const T=_>>5;_%=32;const C=y.g.length-T,P=[];for(let D=0;D<C;D++)P[D]=_>0?y.i(D+T)>>>_|y.i(D+T+1)<<32-_:y.i(D+T);return new o(P,y.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Cw=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,hr=o}).apply(typeof py<"u"?py:typeof self<"u"?self:typeof window<"u"?window:{});var Xa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Aw,io,kw,gl,md,Pw,Nw,bw;(function(){var t,e=Object.defineProperty;function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Xa=="object"&&Xa];for(var h=0;h<a.length;++h){var p=a[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function s(a,h){if(h)e:{var p=r;a=a.split(".");for(var v=0;v<a.length-1;v++){var O=a[v];if(!(O in p))break e;p=p[O]}a=a[a.length-1],v=p[a],h=h(v),h!=v&&h!=null&&e(p,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var p=[],v;for(v in h)Object.prototype.hasOwnProperty.call(h,v)&&p.push([v,h[v]]);return p}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function l(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,p){return a.call.apply(a.bind,arguments)}function c(a,h,p){return c=u,c.apply(null,arguments)}function f(a,h){var p=Array.prototype.slice.call(arguments,1);return function(){var v=p.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function m(a,h){function p(){}p.prototype=h.prototype,a.Z=h.prototype,a.prototype=new p,a.prototype.constructor=a,a.Ob=function(v,O,V){for(var B=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)B[Z-2]=arguments[Z];return h.prototype[O].apply(v,B)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function S(a){const h=a.length;if(h>0){const p=Array(h);for(let v=0;v<h;v++)p[v]=a[v];return p}return[]}function k(a,h){for(let v=1;v<arguments.length;v++){const O=arguments[v];var p=typeof O;if(p=p!="object"?p:O?Array.isArray(O)?"array":p:"null",p=="array"||p=="object"&&typeof O.length=="number"){p=a.length||0;const V=O.length||0;a.length=p+V;for(let B=0;B<V;B++)a[p+B]=O[B]}else a.push(O)}}class x{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function A(a){o.setTimeout(()=>{throw a},0)}function E(){var a=y;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class w{constructor(){this.h=this.g=null}add(h,p){const v=I.get();v.set(h,p),this.h?this.h.next=v:this.g=v,this.h=v}}var I=new x(()=>new b,a=>a.reset());class b{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let M,N=!1,y=new w,_=()=>{const a=Promise.resolve(void 0);M=()=>{a.then(T)}};function T(){for(var a;a=E();){try{a.h.call(a.g)}catch(p){A(p)}var h=I;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}N=!1}function C(){this.u=this.u,this.C=this.C}C.prototype.u=!1,C.prototype.dispose=function(){this.u||(this.u=!0,this.N())},C.prototype[Symbol.dispose]=function(){this.dispose()},C.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function P(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}P.prototype.h=function(){this.defaultPrevented=!0};var D=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};o.addEventListener("test",p,h),o.removeEventListener("test",p,h)}catch{}return a}();function R(a){return/^[\s\xa0]*$/.test(a)}function He(a,h){P.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}m(He,P),He.prototype.init=function(a,h){const p=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(p=="mouseover"?h=a.fromElement:p=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&He.Z.h.call(this)},He.prototype.h=function(){He.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var mn="closure_listenable_"+(Math.random()*1e6|0),Ri=0;function Ci(a,h,p,v,O){this.listener=a,this.proxy=null,this.src=h,this.type=p,this.capture=!!v,this.ha=O,this.key=++Ri,this.da=this.fa=!1}function $(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Q(a,h,p){for(const v in a)h.call(p,a[v],v,a)}function J(a,h){for(const p in a)h.call(void 0,a[p],p,a)}function ge(a){const h={};for(const p in a)h[p]=a[p];return h}const Ce="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Nr(a,h){let p,v;for(let O=1;O<arguments.length;O++){v=arguments[O];for(p in v)a[p]=v[p];for(let V=0;V<Ce.length;V++)p=Ce[V],Object.prototype.hasOwnProperty.call(v,p)&&(a[p]=v[p])}}function kt(a){this.src=a,this.g={},this.h=0}kt.prototype.add=function(a,h,p,v,O){const V=a.toString();a=this.g[V],a||(a=this.g[V]=[],this.h++);const B=Mt(a,h,v,O);return B>-1?(h=a[B],p||(h.fa=!1)):(h=new Ci(h,this.src,V,!!v,O),h.fa=p,a.push(h)),h};function br(a,h){const p=h.type;if(p in a.g){var v=a.g[p],O=Array.prototype.indexOf.call(v,h,void 0),V;(V=O>=0)&&Array.prototype.splice.call(v,O,1),V&&($(h),a.g[p].length==0&&(delete a.g[p],a.h--))}}function Mt(a,h,p,v){for(let O=0;O<a.length;++O){const V=a[O];if(!V.da&&V.listener==h&&V.capture==!!p&&V.ha==v)return O}return-1}var bn="closure_lm_"+(Math.random()*1e6|0),nc={};function Up(a,h,p,v,O){if(Array.isArray(h)){for(let V=0;V<h.length;V++)Up(a,h[V],p,v,O);return null}return p=zp(p),a&&a[mn]?a.J(h,p,l(v)?!!v.capture:!1,O):sI(a,h,p,!1,v,O)}function sI(a,h,p,v,O,V){if(!h)throw Error("Invalid event type");const B=l(O)?!!O.capture:!!O;let Z=sc(a);if(Z||(a[bn]=Z=new kt(a)),p=Z.add(h,p,v,B,V),p.proxy)return p;if(v=iI(),p.proxy=v,v.src=a,v.listener=p,a.addEventListener)D||(O=B),O===void 0&&(O=!1),a.addEventListener(h.toString(),v,O);else if(a.attachEvent)a.attachEvent(Bp(h.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return p}function iI(){function a(p){return h.call(a.src,a.listener,p)}const h=oI;return a}function Fp(a,h,p,v,O){if(Array.isArray(h))for(var V=0;V<h.length;V++)Fp(a,h[V],p,v,O);else v=l(v)?!!v.capture:!!v,p=zp(p),a&&a[mn]?(a=a.i,V=String(h).toString(),V in a.g&&(h=a.g[V],p=Mt(h,p,v,O),p>-1&&($(h[p]),Array.prototype.splice.call(h,p,1),h.length==0&&(delete a.g[V],a.h--)))):a&&(a=sc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Mt(h,p,v,O)),(p=a>-1?h[a]:null)&&rc(p))}function rc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[mn])br(h.i,a);else{var p=a.type,v=a.proxy;h.removeEventListener?h.removeEventListener(p,v,a.capture):h.detachEvent?h.detachEvent(Bp(p),v):h.addListener&&h.removeListener&&h.removeListener(v),(p=sc(h))?(br(p,a),p.h==0&&(p.src=null,h[bn]=null)):$(a)}}}function Bp(a){return a in nc?nc[a]:nc[a]="on"+a}function oI(a,h){if(a.da)a=!0;else{h=new He(h,this);const p=a.listener,v=a.ha||a.src;a.fa&&rc(a),a=p.call(v,h)}return a}function sc(a){return a=a[bn],a instanceof kt?a:null}var ic="__closure_events_fn_"+(Math.random()*1e9>>>0);function zp(a){return typeof a=="function"?a:(a[ic]||(a[ic]=function(h){return a.handleEvent(h)}),a[ic])}function Ye(){C.call(this),this.i=new kt(this),this.M=this,this.G=null}m(Ye,C),Ye.prototype[mn]=!0,Ye.prototype.removeEventListener=function(a,h,p,v){Fp(this,a,h,p,v)};function ot(a,h){var p,v=a.G;if(v)for(p=[];v;v=v.G)p.push(v);if(a=a.M,v=h.type||h,typeof h=="string")h=new P(h,a);else if(h instanceof P)h.target=h.target||a;else{var O=h;h=new P(v,a),Nr(h,O)}O=!0;let V,B;if(p)for(B=p.length-1;B>=0;B--)V=h.g=p[B],O=Ea(V,v,!0,h)&&O;if(V=h.g=a,O=Ea(V,v,!0,h)&&O,O=Ea(V,v,!1,h)&&O,p)for(B=0;B<p.length;B++)V=h.g=p[B],O=Ea(V,v,!1,h)&&O}Ye.prototype.N=function(){if(Ye.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const p=a.g[h];for(let v=0;v<p.length;v++)$(p[v]);delete a.g[h],a.h--}}this.G=null},Ye.prototype.J=function(a,h,p,v){return this.i.add(String(a),h,!1,p,v)},Ye.prototype.K=function(a,h,p,v){return this.i.add(String(a),h,!0,p,v)};function Ea(a,h,p,v){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let O=!0;for(let V=0;V<h.length;++V){const B=h[V];if(B&&!B.da&&B.capture==p){const Z=B.listener,Le=B.ha||B.src;B.fa&&br(a.i,B),O=Z.call(Le,v)!==!1&&O}}return O&&!v.defaultPrevented}function aI(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=c(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function $p(a){a.g=aI(()=>{a.g=null,a.i&&(a.i=!1,$p(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class lI extends C{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:$p(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ai(a){C.call(this),this.h=a,this.g={}}m(Ai,C);var Hp=[];function qp(a){Q(a.g,function(h,p){this.g.hasOwnProperty(p)&&rc(h)},a),a.g={}}Ai.prototype.N=function(){Ai.Z.N.call(this),qp(this)},Ai.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var oc=o.JSON.stringify,uI=o.JSON.parse,cI=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Wp(){}function Gp(){}var ki={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ac(){P.call(this,"d")}m(ac,P);function lc(){P.call(this,"c")}m(lc,P);var Dr={},Kp=null;function Ta(){return Kp=Kp||new Ye}Dr.Ia="serverreachability";function Qp(a){P.call(this,Dr.Ia,a)}m(Qp,P);function Pi(a){const h=Ta();ot(h,new Qp(h))}Dr.STAT_EVENT="statevent";function Xp(a,h){P.call(this,Dr.STAT_EVENT,a),this.stat=h}m(Xp,P);function at(a){const h=Ta();ot(h,new Xp(h,a))}Dr.Ja="timingevent";function Yp(a,h){P.call(this,Dr.Ja,a),this.size=h}m(Yp,P);function Ni(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function bi(){this.g=!0}bi.prototype.ua=function(){this.g=!1};function hI(a,h,p,v,O,V){a.info(function(){if(a.g)if(V){var B="",Z=V.split("&");for(let le=0;le<Z.length;le++){var Le=Z[le].split("=");if(Le.length>1){const Fe=Le[0];Le=Le[1];const Yt=Fe.split("_");B=Yt.length>=2&&Yt[1]=="type"?B+(Fe+"="+Le+"&"):B+(Fe+"=redacted&")}}}else B=null;else B=V;return"XMLHTTP REQ ("+v+") [attempt "+O+"]: "+h+`
`+p+`
`+B})}function dI(a,h,p,v,O,V,B){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+O+"]: "+h+`
`+p+`
`+V+" "+B})}function ys(a,h,p,v){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+pI(a,p)+(v?" "+v:"")})}function fI(a,h){a.info(function(){return"TIMEOUT: "+h})}bi.prototype.info=function(){};function pI(a,h){if(!a.g)return h;if(!h)return null;try{const V=JSON.parse(h);if(V){for(a=0;a<V.length;a++)if(Array.isArray(V[a])){var p=V[a];if(!(p.length<2)){var v=p[1];if(Array.isArray(v)&&!(v.length<1)){var O=v[0];if(O!="noop"&&O!="stop"&&O!="close")for(let B=1;B<v.length;B++)v[B]=""}}}}return oc(V)}catch{return h}}var Ia={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Jp={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Zp;function uc(){}m(uc,Wp),uc.prototype.g=function(){return new XMLHttpRequest},Zp=new uc;function Di(a){return encodeURIComponent(String(a))}function mI(a){var h=1;a=a.split(":");const p=[];for(;h>0&&a.length;)p.push(a.shift()),h--;return a.length&&p.push(a.join(":")),p}function Dn(a,h,p,v){this.j=a,this.i=h,this.l=p,this.S=v||1,this.V=new Ai(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new em}function em(){this.i=null,this.g="",this.h=!1}var tm={},cc={};function hc(a,h,p){a.M=1,a.A=Sa(Xt(h)),a.u=p,a.R=!0,nm(a,null)}function nm(a,h){a.F=Date.now(),xa(a),a.B=Xt(a.A);var p=a.B,v=a.S;Array.isArray(v)||(v=[String(v)]),mm(p.i,"t",v),a.C=0,p=a.j.L,a.h=new em,a.g=Dm(a.j,p?h:null,!a.u),a.P>0&&(a.O=new lI(c(a.Y,a,a.g),a.P)),h=a.V,p=a.g,v=a.ba;var O="readystatechange";Array.isArray(O)||(O&&(Hp[0]=O.toString()),O=Hp);for(let V=0;V<O.length;V++){const B=Up(p,O[V],v||h.handleEvent,!1,h.h||h);if(!B)break;h.g[B.key]=B}h=a.J?ge(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Pi(),hI(a.i,a.v,a.B,a.l,a.S,a.u)}Dn.prototype.ba=function(a){a=a.target;const h=this.O;h&&Ln(a)==3?h.j():this.Y(a)},Dn.prototype.Y=function(a){try{if(a==this.g)e:{const Z=Ln(this.g),Le=this.g.ya(),le=this.g.ca();if(!(Z<3)&&(Z!=3||this.g&&(this.h.h||this.g.la()||Tm(this.g)))){this.K||Z!=4||Le==7||(Le==8||le<=0?Pi(3):Pi(2)),dc(this);var h=this.g.ca();this.X=h;var p=gI(this);if(this.o=h==200,dI(this.i,this.v,this.B,this.l,this.S,Z,h),this.o){if(this.U&&!this.L){t:{if(this.g){var v,O=this.g;if((v=O.g?O.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(v)){var V=v;break t}}V=null}if(a=V)ys(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,fc(this,a);else{this.o=!1,this.m=3,at(12),Or(this),Oi(this);break e}}if(this.R){a=!0;let Fe;for(;!this.K&&this.C<p.length;)if(Fe=yI(this,p),Fe==cc){Z==4&&(this.m=4,at(14),a=!1),ys(this.i,this.l,null,"[Incomplete Response]");break}else if(Fe==tm){this.m=4,at(15),ys(this.i,this.l,p,"[Invalid Chunk]"),a=!1;break}else ys(this.i,this.l,Fe,null),fc(this,Fe);if(rm(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Z!=4||p.length!=0||this.h.h||(this.m=1,at(16),a=!1),this.o=this.o&&a,!a)ys(this.i,this.l,p,"[Invalid Chunked Response]"),Or(this),Oi(this);else if(p.length>0&&!this.W){this.W=!0;var B=this.j;B.g==this&&B.aa&&!B.P&&(B.j.info("Great, no buffering proxy detected. Bytes received: "+p.length),Ec(B),B.P=!0,at(11))}}else ys(this.i,this.l,p,null),fc(this,p);Z==4&&Or(this),this.o&&!this.K&&(Z==4?km(this.j,this):(this.o=!1,xa(this)))}else NI(this.g),h==400&&p.indexOf("Unknown SID")>0?(this.m=3,at(12)):(this.m=0,at(13)),Or(this),Oi(this)}}}catch{}finally{}};function gI(a){if(!rm(a))return a.g.la();const h=Tm(a.g);if(h==="")return"";let p="";const v=h.length,O=Ln(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Or(a),Oi(a),"";a.h.i=new o.TextDecoder}for(let V=0;V<v;V++)a.h.h=!0,p+=a.h.i.decode(h[V],{stream:!(O&&V==v-1)});return h.length=0,a.h.g+=p,a.C=0,a.h.g}function rm(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function yI(a,h){var p=a.C,v=h.indexOf(`
`,p);return v==-1?cc:(p=Number(h.substring(p,v)),isNaN(p)?tm:(v+=1,v+p>h.length?cc:(h=h.slice(v,v+p),a.C=v+p,h)))}Dn.prototype.cancel=function(){this.K=!0,Or(this)};function xa(a){a.T=Date.now()+a.H,sm(a,a.H)}function sm(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Ni(c(a.aa,a),h)}function dc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Dn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(fI(this.i,this.B),this.M!=2&&(Pi(),at(17)),Or(this),this.m=2,Oi(this)):sm(this,this.T-a)};function Oi(a){a.j.I==0||a.K||km(a.j,a)}function Or(a){dc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,qp(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function fc(a,h){try{var p=a.j;if(p.I!=0&&(p.g==a||pc(p.h,a))){if(!a.L&&pc(p.h,a)&&p.I==3){try{var v=p.Ba.g.parse(h)}catch{v=null}if(Array.isArray(v)&&v.length==3){var O=v;if(O[0]==0){e:if(!p.v){if(p.g)if(p.g.F+3e3<a.F)Pa(p),Aa(p);else break e;wc(p),at(18)}}else p.xa=O[1],0<p.xa-p.K&&O[2]<37500&&p.F&&p.A==0&&!p.C&&(p.C=Ni(c(p.Va,p),6e3));am(p.h)<=1&&p.ta&&(p.ta=void 0)}else Lr(p,11)}else if((a.L||p.g==a)&&Pa(p),!R(h))for(O=p.Ba.g.parse(h),h=0;h<O.length;h++){let le=O[h];const Fe=le[0];if(!(Fe<=p.K))if(p.K=Fe,le=le[1],p.I==2)if(le[0]=="c"){p.M=le[1],p.ba=le[2];const Yt=le[3];Yt!=null&&(p.ka=Yt,p.j.info("VER="+p.ka));const jr=le[4];jr!=null&&(p.za=jr,p.j.info("SVER="+p.za));const jn=le[5];jn!=null&&typeof jn=="number"&&jn>0&&(v=1.5*jn,p.O=v,p.j.info("backChannelRequestTimeoutMs_="+v)),v=p;const Mn=a.g;if(Mn){const ba=Mn.g?Mn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ba){var V=v.h;V.g||ba.indexOf("spdy")==-1&&ba.indexOf("quic")==-1&&ba.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(mc(V,V.h),V.h=null))}if(v.G){const Tc=Mn.g?Mn.g.getResponseHeader("X-HTTP-Session-Id"):null;Tc&&(v.wa=Tc,de(v.J,v.G,Tc))}}p.I=3,p.l&&p.l.ra(),p.aa&&(p.T=Date.now()-a.F,p.j.info("Handshake RTT: "+p.T+"ms")),v=p;var B=a;if(v.na=bm(v,v.L?v.ba:null,v.W),B.L){lm(v.h,B);var Z=B,Le=v.O;Le&&(Z.H=Le),Z.D&&(dc(Z),xa(Z)),v.g=B}else Cm(v);p.i.length>0&&ka(p)}else le[0]!="stop"&&le[0]!="close"||Lr(p,7);else p.I==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?Lr(p,7):vc(p):le[0]!="noop"&&p.l&&p.l.qa(le),p.A=0)}}Pi(4)}catch{}}var _I=class{constructor(a,h){this.g=a,this.map=h}};function im(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function om(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function am(a){return a.h?1:a.g?a.g.size:0}function pc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function mc(a,h){a.g?a.g.add(h):a.h=h}function lm(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}im.prototype.cancel=function(){if(this.i=um(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function um(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const p of a.g.values())h=h.concat(p.G);return h}return S(a.i)}var cm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vI(a,h){if(a){a=a.split("&");for(let p=0;p<a.length;p++){const v=a[p].indexOf("=");let O,V=null;v>=0?(O=a[p].substring(0,v),V=a[p].substring(v+1)):O=a[p],h(O,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function On(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof On?(this.l=a.l,Vi(this,a.j),this.o=a.o,this.g=a.g,Li(this,a.u),this.h=a.h,gc(this,gm(a.i)),this.m=a.m):a&&(h=String(a).match(cm))?(this.l=!1,Vi(this,h[1]||"",!0),this.o=ji(h[2]||""),this.g=ji(h[3]||"",!0),Li(this,h[4]),this.h=ji(h[5]||"",!0),gc(this,h[6]||"",!0),this.m=ji(h[7]||"")):(this.l=!1,this.i=new Ui(null,this.l))}On.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Mi(h,hm,!0),":");var p=this.g;return(p||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Mi(h,hm,!0),"@"),a.push(Di(p).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.u,p!=null&&a.push(":",String(p))),(p=this.h)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Mi(p,p.charAt(0)=="/"?TI:EI,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Mi(p,xI)),a.join("")},On.prototype.resolve=function(a){const h=Xt(this);let p=!!a.j;p?Vi(h,a.j):p=!!a.o,p?h.o=a.o:p=!!a.g,p?h.g=a.g:p=a.u!=null;var v=a.h;if(p)Li(h,a.u);else if(p=!!a.h){if(v.charAt(0)!="/")if(this.g&&!this.h)v="/"+v;else{var O=h.h.lastIndexOf("/");O!=-1&&(v=h.h.slice(0,O+1)+v)}if(O=v,O==".."||O==".")v="";else if(O.indexOf("./")!=-1||O.indexOf("/.")!=-1){v=O.lastIndexOf("/",0)==0,O=O.split("/");const V=[];for(let B=0;B<O.length;){const Z=O[B++];Z=="."?v&&B==O.length&&V.push(""):Z==".."?((V.length>1||V.length==1&&V[0]!="")&&V.pop(),v&&B==O.length&&V.push("")):(V.push(Z),v=!0)}v=V.join("/")}else v=O}return p?h.h=v:p=a.i.toString()!=="",p?gc(h,gm(a.i)):p=!!a.m,p&&(h.m=a.m),h};function Xt(a){return new On(a)}function Vi(a,h,p){a.j=p?ji(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Li(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function gc(a,h,p){h instanceof Ui?(a.i=h,SI(a.i,a.l)):(p||(h=Mi(h,II)),a.i=new Ui(h,a.l))}function de(a,h,p){a.i.set(h,p)}function Sa(a){return de(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function ji(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Mi(a,h,p){return typeof a=="string"?(a=encodeURI(a).replace(h,wI),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function wI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var hm=/[#\/\?@]/g,EI=/[#\?:]/g,TI=/[#\?]/g,II=/[#\?@]/g,xI=/#/g;function Ui(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Vr(a){a.g||(a.g=new Map,a.h=0,a.i&&vI(a.i,function(h,p){a.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}t=Ui.prototype,t.add=function(a,h){Vr(this),this.i=null,a=_s(this,a);let p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(h),this.h+=1,this};function dm(a,h){Vr(a),h=_s(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function fm(a,h){return Vr(a),h=_s(a,h),a.g.has(h)}t.forEach=function(a,h){Vr(this),this.g.forEach(function(p,v){p.forEach(function(O){a.call(h,O,v,this)},this)},this)};function pm(a,h){Vr(a);let p=[];if(typeof h=="string")fm(a,h)&&(p=p.concat(a.g.get(_s(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)p=p.concat(a[h]);return p}t.set=function(a,h){return Vr(this),this.i=null,a=_s(this,a),fm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=pm(this,a),a.length>0?String(a[0]):h):h};function mm(a,h,p){dm(a,h),p.length>0&&(a.i=null,a.g.set(_s(a,h),S(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let v=0;v<h.length;v++){var p=h[v];const O=Di(p);p=pm(this,p);for(let V=0;V<p.length;V++){let B=O;p[V]!==""&&(B+="="+Di(p[V])),a.push(B)}}return this.i=a.join("&")};function gm(a){const h=new Ui;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function _s(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function SI(a,h){h&&!a.j&&(Vr(a),a.i=null,a.g.forEach(function(p,v){const O=v.toLowerCase();v!=O&&(dm(this,v),mm(this,O,p))},a)),a.j=h}function RI(a,h){const p=new bi;if(o.Image){const v=new Image;v.onload=f(Vn,p,"TestLoadImage: loaded",!0,h,v),v.onerror=f(Vn,p,"TestLoadImage: error",!1,h,v),v.onabort=f(Vn,p,"TestLoadImage: abort",!1,h,v),v.ontimeout=f(Vn,p,"TestLoadImage: timeout",!1,h,v),o.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else h(!1)}function CI(a,h){const p=new bi,v=new AbortController,O=setTimeout(()=>{v.abort(),Vn(p,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:v.signal}).then(V=>{clearTimeout(O),V.ok?Vn(p,"TestPingServer: ok",!0,h):Vn(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(O),Vn(p,"TestPingServer: error",!1,h)})}function Vn(a,h,p,v,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),v(p)}catch{}}function AI(){this.g=new cI}function yc(a){this.i=a.Sb||null,this.h=a.ab||!1}m(yc,Wp),yc.prototype.g=function(){return new Ra(this.i,this.h)};function Ra(a,h){Ye.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Ra,Ye),t=Ra.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Bi(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Fi(this)),this.readyState=0},t.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Bi(this)),this.g&&(this.readyState=3,Bi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ym(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function ym(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}t.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Fi(this):Bi(this),this.readyState==3&&ym(this)}},t.Oa=function(a){this.g&&(this.response=this.responseText=a,Fi(this))},t.Na=function(a){this.g&&(this.response=a,Fi(this))},t.ga=function(){this.g&&Fi(this)};function Fi(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Bi(a)}t.setRequestHeader=function(a,h){this.A.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=h.next();return a.join(`\r
`)};function Bi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ra.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function _m(a){let h="";return Q(a,function(p,v){h+=v,h+=":",h+=p,h+=`\r
`}),h}function _c(a,h,p){e:{for(v in p){var v=!1;break e}v=!0}v||(p=_m(p),typeof a=="string"?p!=null&&Di(p):de(a,h,p))}function Ie(a){Ye.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(Ie,Ye);var kI=/^https?$/i,PI=["POST","PUT"];t=Ie.prototype,t.Fa=function(a){this.H=a},t.ea=function(a,h,p,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Zp.g(),this.g.onreadystatechange=g(c(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(V){vm(this,V);return}if(a=p||"",p=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var O in v)p.set(O,v[O]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const V of v.keys())p.set(V,v.get(V));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(p.keys()).find(V=>V.toLowerCase()=="content-type"),O=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(PI,h,void 0)>=0)||v||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,B]of p)this.g.setRequestHeader(V,B);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(V){vm(this,V)}};function vm(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,wm(a),Ca(a)}function wm(a){a.A||(a.A=!0,ot(a,"complete"),ot(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,ot(this,"complete"),ot(this,"abort"),Ca(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ca(this,!0)),Ie.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?Em(this):this.Xa())},t.Xa=function(){Em(this)};function Em(a){if(a.h&&typeof i<"u"){if(a.v&&Ln(a)==4)setTimeout(a.Ca.bind(a),0);else if(ot(a,"readystatechange"),Ln(a)==4){a.h=!1;try{const V=a.ca();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var v;if(v=V===0){let B=String(a.D).match(cm)[1]||null;!B&&o.self&&o.self.location&&(B=o.self.location.protocol.slice(0,-1)),v=!kI.test(B?B.toLowerCase():"")}p=v}if(p)ot(a,"complete"),ot(a,"success");else{a.o=6;try{var O=Ln(a)>2?a.g.statusText:""}catch{O=""}a.l=O+" ["+a.ca()+"]",wm(a)}}finally{Ca(a)}}}}function Ca(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const p=a.g;a.g=null,h||ot(a,"ready");try{p.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function Ln(a){return a.g?a.g.readyState:0}t.ca=function(){try{return Ln(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),uI(h)}};function Tm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function NI(a){const h={};a=(a.g&&Ln(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(R(a[v]))continue;var p=mI(a[v]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const V=h[O]||[];h[O]=V,V.push(p)}J(h,function(v){return v.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function zi(a,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||h}function Im(a){this.za=0,this.i=[],this.j=new bi,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=zi("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=zi("baseRetryDelayMs",5e3,a),this.Za=zi("retryDelaySeedMs",1e4,a),this.Ta=zi("forwardChannelMaxRetries",2,a),this.va=zi("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new im(a&&a.concurrentRequestLimit),this.Ba=new AI,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=Im.prototype,t.ka=8,t.I=1,t.connect=function(a,h,p,v){at(0),this.W=a,this.H=h||{},p&&v!==void 0&&(this.H.OSID=p,this.H.OAID=v),this.F=this.X,this.J=bm(this,null,this.W),ka(this)};function vc(a){if(xm(a),a.I==3){var h=a.V++,p=Xt(a.J);if(de(p,"SID",a.M),de(p,"RID",h),de(p,"TYPE","terminate"),$i(a,p),h=new Dn(a,a.j,h),h.M=2,h.A=Sa(Xt(p)),p=!1,o.navigator&&o.navigator.sendBeacon)try{p=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!p&&o.Image&&(new Image().src=h.A,p=!0),p||(h.g=Dm(h.j,null),h.g.ea(h.A)),h.F=Date.now(),xa(h)}Nm(a)}function Aa(a){a.g&&(Ec(a),a.g.cancel(),a.g=null)}function xm(a){Aa(a),a.v&&(o.clearTimeout(a.v),a.v=null),Pa(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function ka(a){if(!om(a.h)&&!a.m){a.m=!0;var h=a.Ea;M||_(),N||(M(),N=!0),y.add(h,a),a.D=0}}function bI(a,h){return am(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Ni(c(a.Ea,a,h),Pm(a,a.D)),a.D++,!0)}t.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const O=new Dn(this,this.j,a);let V=this.o;if(this.U&&(V?(V=ge(V),Nr(V,this.U)):V=this.U),this.u!==null||this.R||(O.J=V,V=null),this.S)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var v=this.i[p];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(h+=v,h>4096){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Rm(this,O,h),p=Xt(this.J),de(p,"RID",a),de(p,"CVER",22),this.G&&de(p,"X-HTTP-Session-Id",this.G),$i(this,p),V&&(this.R?h="headers="+Di(_m(V))+"&"+h:this.u&&_c(p,this.u,V)),mc(this.h,O),this.Ra&&de(p,"TYPE","init"),this.S?(de(p,"$req",h),de(p,"SID","null"),O.U=!0,hc(O,p,null)):hc(O,p,h),this.I=2}}else this.I==3&&(a?Sm(this,a):this.i.length==0||om(this.h)||Sm(this))};function Sm(a,h){var p;h?p=h.l:p=a.V++;const v=Xt(a.J);de(v,"SID",a.M),de(v,"RID",p),de(v,"AID",a.K),$i(a,v),a.u&&a.o&&_c(v,a.u,a.o),p=new Dn(a,a.j,p,a.D+1),a.u===null&&(p.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Rm(a,p,1e3),p.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),mc(a.h,p),hc(p,v,h)}function $i(a,h){a.H&&Q(a.H,function(p,v){de(h,v,p)}),a.l&&Q({},function(p,v){de(h,v,p)})}function Rm(a,h,p){p=Math.min(a.i.length,p);const v=a.l?c(a.l.Ka,a.l,a):null;e:{var O=a.i;let Z=-1;for(;;){const Le=["count="+p];Z==-1?p>0?(Z=O[0].g,Le.push("ofs="+Z)):Z=0:Le.push("ofs="+Z);let le=!0;for(let Fe=0;Fe<p;Fe++){var V=O[Fe].g;const Yt=O[Fe].map;if(V-=Z,V<0)Z=Math.max(0,O[Fe].g-100),le=!1;else try{V="req"+V+"_"||"";try{var B=Yt instanceof Map?Yt:Object.entries(Yt);for(const[jr,jn]of B){let Mn=jn;l(jn)&&(Mn=oc(jn)),Le.push(V+jr+"="+encodeURIComponent(Mn))}}catch(jr){throw Le.push(V+"type="+encodeURIComponent("_badmap")),jr}}catch{v&&v(Yt)}}if(le){B=Le.join("&");break e}}B=void 0}return a=a.i.splice(0,p),h.G=a,B}function Cm(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;M||_(),N||(M(),N=!0),y.add(h,a),a.A=0}}function wc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Ni(c(a.Da,a),Pm(a,a.A)),a.A++,!0)}t.Da=function(){if(this.v=null,Am(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Ni(c(this.Wa,this),a)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,at(10),Aa(this),Am(this))};function Ec(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Am(a){a.g=new Dn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=Xt(a.na);de(h,"RID","rpc"),de(h,"SID",a.M),de(h,"AID",a.K),de(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&de(h,"TO",a.ia),de(h,"TYPE","xmlhttp"),$i(a,h),a.u&&a.o&&_c(h,a.u,a.o),a.O&&(a.g.H=a.O);var p=a.g;a=a.ba,p.M=1,p.A=Sa(Xt(h)),p.u=null,p.R=!0,nm(p,a)}t.Va=function(){this.C!=null&&(this.C=null,Aa(this),wc(this),at(19))};function Pa(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function km(a,h){var p=null;if(a.g==h){Pa(a),Ec(a),a.g=null;var v=2}else if(pc(a.h,h))p=h.G,lm(a.h,h),v=1;else return;if(a.I!=0){if(h.o)if(v==1){p=h.u?h.u.length:0,h=Date.now()-h.F;var O=a.D;v=Ta(),ot(v,new Yp(v,p)),ka(a)}else Cm(a);else if(O=h.m,O==3||O==0&&h.X>0||!(v==1&&bI(a,h)||v==2&&wc(a)))switch(p&&p.length>0&&(h=a.h,h.i=h.i.concat(p)),O){case 1:Lr(a,5);break;case 4:Lr(a,10);break;case 3:Lr(a,6);break;default:Lr(a,2)}}}function Pm(a,h){let p=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(p*=2),p*h}function Lr(a,h){if(a.j.info("Error code "+h),h==2){var p=c(a.bb,a),v=a.Ua;const O=!v;v=new On(v||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Vi(v,"https"),Sa(v),O?RI(v.toString(),p):CI(v.toString(),p)}else at(2);a.I=0,a.l&&a.l.pa(h),Nm(a),xm(a)}t.bb=function(a){a?(this.j.info("Successfully pinged google.com"),at(2)):(this.j.info("Failed to ping google.com"),at(1))};function Nm(a){if(a.I=0,a.ja=[],a.l){const h=um(a.h);(h.length!=0||a.i.length!=0)&&(k(a.ja,h),k(a.ja,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.oa()}}function bm(a,h,p){var v=p instanceof On?Xt(p):new On(p);if(v.g!="")h&&(v.g=h+"."+v.g),Li(v,v.u);else{var O=o.location;v=O.protocol,h=h?h+"."+O.hostname:O.hostname,O=+O.port;const V=new On(null);v&&Vi(V,v),h&&(V.g=h),O&&Li(V,O),p&&(V.h=p),v=V}return p=a.G,h=a.wa,p&&h&&de(v,p,h),de(v,"VER",a.ka),$i(a,v),v}function Dm(a,h,p){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ie(new yc({ab:p})):new Ie(a.ma),h.Fa(a.L),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Om(){}t=Om.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function Na(){}Na.prototype.g=function(a,h){return new wt(a,h)};function wt(a,h){Ye.call(this),this.g=new Im(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!R(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!R(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new vs(this)}m(wt,Ye),wt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},wt.prototype.close=function(){vc(this.g)},wt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.v&&(p={},p.__data__=oc(a),a=p);h.i.push(new _I(h.Ya++,a)),h.I==3&&ka(h)},wt.prototype.N=function(){this.g.l=null,delete this.j,vc(this.g),delete this.g,wt.Z.N.call(this)};function Vm(a){ac.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const p in h){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}m(Vm,ac);function Lm(){lc.call(this),this.status=1}m(Lm,lc);function vs(a){this.g=a}m(vs,Om),vs.prototype.ra=function(){ot(this.g,"a")},vs.prototype.qa=function(a){ot(this.g,new Vm(a))},vs.prototype.pa=function(a){ot(this.g,new Lm)},vs.prototype.oa=function(){ot(this.g,"b")},Na.prototype.createWebChannel=Na.prototype.g,wt.prototype.send=wt.prototype.o,wt.prototype.open=wt.prototype.m,wt.prototype.close=wt.prototype.close,bw=function(){return new Na},Nw=function(){return Ta()},Pw=Dr,md={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ia.NO_ERROR=0,Ia.TIMEOUT=8,Ia.HTTP_ERROR=6,gl=Ia,Jp.COMPLETE="complete",kw=Jp,Gp.EventType=ki,ki.OPEN="a",ki.CLOSE="b",ki.ERROR="c",ki.MESSAGE="d",Ye.prototype.listen=Ye.prototype.J,io=Gp,Ie.prototype.listenOnce=Ie.prototype.K,Ie.prototype.getLastError=Ie.prototype.Ha,Ie.prototype.getLastErrorCode=Ie.prototype.ya,Ie.prototype.getStatus=Ie.prototype.ca,Ie.prototype.getResponseJson=Ie.prototype.La,Ie.prototype.getResponseText=Ie.prototype.la,Ie.prototype.send=Ie.prototype.ea,Ie.prototype.setWithCredentials=Ie.prototype.Fa,Aw=Ie}).apply(typeof Xa<"u"?Xa:typeof self<"u"?self:typeof window<"u"?window:{});const my="@firebase/firestore",gy="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}tt.UNAUTHENTICATED=new tt(null),tt.GOOGLE_CREDENTIALS=new tt("google-credentials-uid"),tt.FIRST_PARTY=new tt("first-party-uid"),tt.MOCK_USER=new tt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _i="12.7.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=new Mf("@firebase/firestore");function Ts(){return rs.logLevel}function H(t,...e){if(rs.logLevel<=te.DEBUG){const n=e.map(Bf);rs.debug(`Firestore (${_i}): ${t}`,...n)}}function An(t,...e){if(rs.logLevel<=te.ERROR){const n=e.map(Bf);rs.error(`Firestore (${_i}): ${t}`,...n)}}function ai(t,...e){if(rs.logLevel<=te.WARN){const n=e.map(Bf);rs.warn(`Firestore (${_i}): ${t}`,...n)}}function Bf(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,Dw(t,r,n)}function Dw(t,e,n){let r=`FIRESTORE (${_i}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw An(r),new Error(r)}function oe(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||Dw(e,s,r)}function Y(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class z extends pn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class oA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(tt.UNAUTHENTICATED))}shutdown(){}}class aA{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class lA{constructor(e){this.t=e,this.currentUser=tt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){oe(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new Gr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Gr,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Gr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(oe(typeof r.accessToken=="string",31837,{l:r}),new Ow(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return oe(e===null||typeof e=="string",2055,{h:e}),new tt(e)}}class uA{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=tt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class cA{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new uA(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(tt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class yy{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hA{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,bt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){oe(this.o===void 0,3512);const r=i=>{i.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new yy(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(oe(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new yy(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dA(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=dA(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function ne(t,e){return t<e?-1:t>e?1:0}function gd(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const s=t.charAt(r),i=e.charAt(r);if(s!==i)return th(s)===th(i)?ne(s,i):th(s)?1:-1}return ne(t.length,e.length)}const fA=55296,pA=57343;function th(t){const e=t.charCodeAt(0);return e>=fA&&e<=pA}function li(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _y="__name__";class en{constructor(e,n,r){n===void 0?n=0:n>e.length&&K(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&K(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return en.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof en?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=en.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return ne(e.length,n.length)}static compareSegments(e,n){const r=en.isNumericId(e),s=en.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?en.extractNumericId(e).compare(en.extractNumericId(n)):gd(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return hr.fromString(e.substring(4,e.length-2))}}class ue extends en{construct(e,n,r){return new ue(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new z(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new ue(n)}static emptyPath(){return new ue([])}}const mA=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ge extends en{construct(e,n,r){return new Ge(e,n,r)}static isValidIdentifier(e){return mA.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ge.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===_y}static keyField(){return new Ge([_y])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new z(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new z(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new z(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new z(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ge(n)}static emptyPath(){return new Ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(ue.fromString(e))}static fromName(e){return new W(ue.fromString(e).popFirst(5))}static empty(){return new W(ue.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ue.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return ue.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new ue(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vw(t,e,n){if(!n)throw new z(L.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function gA(t,e,n,r){if(e===!0&&r===!0)throw new z(L.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function vy(t){if(!W.isDocumentKey(t))throw new z(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function wy(t){if(W.isDocumentKey(t))throw new z(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Lw(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function ju(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":K(12329,{type:typeof t})}function dr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new z(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ju(t);throw new z(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(t,e){const n={typeString:t};return e&&(n.value=e),n}function ha(t,e){if(!Lw(t))throw new z(L.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new z(L.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=-62135596800,Ty=1e6;class pe{static now(){return pe.fromMillis(Date.now())}static fromDate(e){return pe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Ty);return new pe(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new z(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new z(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Ey)throw new z(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new z(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ty}_compareTo(e){return this.seconds===e.seconds?ne(this.nanoseconds,e.nanoseconds):ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:pe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ha(e,pe._jsonSchema))return new pe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ey;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}pe._jsonSchemaVersion="firestore/timestamp/1.0",pe._jsonSchema={type:De("string",pe._jsonSchemaVersion),seconds:De("number"),nanoseconds:De("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{static fromTimestamp(e){return new X(e)}static min(){return new X(new pe(0,0))}static max(){return new X(new pe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go=-1;function yA(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=X.fromTimestamp(r===1e9?new pe(n+1,0):new pe(n,r));return new _r(s,W.empty(),e)}function _A(t){return new _r(t.readTime,t.key,Go)}class _r{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new _r(X.min(),W.empty(),Go)}static max(){return new _r(X.max(),W.empty(),Go)}}function vA(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=W.comparator(t.documentKey,e.documentKey),n!==0?n:ne(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class EA{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vi(t){if(t.code!==L.FAILED_PRECONDITION||t.message!==wA)throw t;H("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&K(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new j((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof j?n:j.resolve(n)}catch(n){return j.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):j.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):j.reject(n)}static resolve(e){return new j((n,r)=>{n(e)})}static reject(e){return new j((n,r)=>{r(e)})}static waitFor(e){return new j((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=j.resolve(!1);for(const r of e)n=n.next(s=>s?j.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new j((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const c=u;n(e[c]).next(f=>{o[c]=f,++l,l===i&&r(o)},f=>s(f))}})}static doWhile(e,n){return new j((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function TA(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function wi(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Mu.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f=-1;function Uu(t){return t==null}function eu(t){return t===0&&1/t==-1/0}function IA(t){return typeof t=="number"&&Number.isInteger(t)&&!eu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jw="";function xA(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Iy(e)),e=SA(t.get(n),e);return Iy(e)}function SA(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case jw:n+="";break;default:n+=i}}return n}function Iy(t){return t+jw+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Ar(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Mw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,n){this.comparator=e,this.root=n||We.EMPTY}insert(e,n){return new Te(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,We.BLACK,null,null))}remove(e){return new Te(this.comparator,this.root.remove(e,this.comparator).copy(null,null,We.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ya(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ya(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ya(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ya(this.root,e,this.comparator,!0)}}class Ya{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class We{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??We.RED,this.left=s??We.EMPTY,this.right=i??We.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new We(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return We.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return We.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,We.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,We.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw K(43730,{key:this.key,value:this.value});if(this.right.isRed())throw K(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw K(27949);return e+(this.isRed()?0:1)}}We.EMPTY=null,We.RED=!0,We.BLACK=!1;We.EMPTY=new class{constructor(){this.size=0}get key(){throw K(57766)}get value(){throw K(16141)}get color(){throw K(16727)}get left(){throw K(29726)}get right(){throw K(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new We(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.comparator=e,this.data=new Te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Sy(this.data.getIterator())}getIteratorFrom(e){return new Sy(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ue)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ue(this.comparator);return n.data=e,n}}class Sy{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.fields=e,e.sort(Ge.comparator)}static empty(){return new It([])}unionWith(e){let n=new Ue(Ge.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new It(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return li(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Uw("Invalid base64 string: "+i):i}}(e);return new Xe(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new Xe(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Xe.EMPTY_BYTE_STRING=new Xe("");const RA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function vr(t){if(oe(!!t,39018),typeof t=="string"){let e=0;const n=RA.exec(t);if(oe(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ae(t.seconds),nanos:Ae(t.nanos)}}function Ae(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function wr(t){return typeof t=="string"?Xe.fromBase64String(t):Xe.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fw="server_timestamp",Bw="__type__",zw="__previous_value__",$w="__local_write_time__";function Hf(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[Bw])==null?void 0:r.stringValue)===Fw}function Fu(t){const e=t.mapValue.fields[zw];return Hf(e)?Fu(e):e}function Ko(t){const e=vr(t.mapValue.fields[$w].timestampValue);return new pe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{constructor(e,n,r,s,i,o,l,u,c,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=f}}const tu="(default)";class Qo{constructor(e,n){this.projectId=e,this.database=n||tu}static empty(){return new Qo("","")}get isDefaultDatabase(){return this.database===tu}isEqual(e){return e instanceof Qo&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw="__type__",AA="__max__",Ja={mapValue:{}},qw="__vector__",nu="value";function Er(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Hf(t)?4:PA(t)?9007199254740991:kA(t)?10:11:K(28295,{value:t})}function fn(t,e){if(t===e)return!0;const n=Er(t);if(n!==Er(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ko(t).isEqual(Ko(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=vr(s.timestampValue),l=vr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return wr(s.bytesValue).isEqual(wr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ae(s.geoPointValue.latitude)===Ae(i.geoPointValue.latitude)&&Ae(s.geoPointValue.longitude)===Ae(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ae(s.integerValue)===Ae(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ae(s.doubleValue),l=Ae(i.doubleValue);return o===l?eu(o)===eu(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return li(t.arrayValue.values||[],e.arrayValue.values||[],fn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(xy(o)!==xy(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!fn(o[u],l[u])))return!1;return!0}(t,e);default:return K(52216,{left:t})}}function Xo(t,e){return(t.values||[]).find(n=>fn(n,e))!==void 0}function ui(t,e){if(t===e)return 0;const n=Er(t),r=Er(e);if(n!==r)return ne(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ne(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ae(i.integerValue||i.doubleValue),u=Ae(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Ry(t.timestampValue,e.timestampValue);case 4:return Ry(Ko(t),Ko(e));case 5:return gd(t.stringValue,e.stringValue);case 6:return function(i,o){const l=wr(i),u=wr(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=ne(l[c],u[c]);if(f!==0)return f}return ne(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=ne(Ae(i.latitude),Ae(o.latitude));return l!==0?l:ne(Ae(i.longitude),Ae(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Cy(t.arrayValue,e.arrayValue);case 10:return function(i,o){var g,S,k,x;const l=i.fields||{},u=o.fields||{},c=(g=l[nu])==null?void 0:g.arrayValue,f=(S=u[nu])==null?void 0:S.arrayValue,m=ne(((k=c==null?void 0:c.values)==null?void 0:k.length)||0,((x=f==null?void 0:f.values)==null?void 0:x.length)||0);return m!==0?m:Cy(c,f)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===Ja.mapValue&&o===Ja.mapValue)return 0;if(i===Ja.mapValue)return 1;if(o===Ja.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=gd(u[m],f[m]);if(g!==0)return g;const S=ui(l[u[m]],c[f[m]]);if(S!==0)return S}return ne(u.length,f.length)}(t.mapValue,e.mapValue);default:throw K(23264,{he:n})}}function Ry(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ne(t,e);const n=vr(t),r=vr(e),s=ne(n.seconds,r.seconds);return s!==0?s:ne(n.nanos,r.nanos)}function Cy(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ui(n[s],r[s]);if(i)return i}return ne(n.length,r.length)}function ci(t){return yd(t)}function yd(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=vr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return wr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return W.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=yd(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${yd(n.fields[o])}`;return s+"}"}(t.mapValue):K(61005,{value:t})}function yl(t){switch(Er(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Fu(t);return e?16+yl(e):16;case 5:return 2*t.stringValue.length;case 6:return wr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+yl(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return Ar(r.fields,(i,o)=>{s+=i.length+yl(o)}),s}(t.mapValue);default:throw K(13486,{value:t})}}function Ay(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function _d(t){return!!t&&"integerValue"in t}function qf(t){return!!t&&"arrayValue"in t}function ky(t){return!!t&&"nullValue"in t}function Py(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function _l(t){return!!t&&"mapValue"in t}function kA(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[Hw])==null?void 0:r.stringValue)===qw}function wo(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Ar(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=wo(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=wo(t.arrayValue.values[n]);return e}return{...t}}function PA(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===AA}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.value=e}static empty(){return new mt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!_l(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=wo(n)}setAll(e){let n=Ge.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=wo(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());_l(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return fn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];_l(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Ar(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new mt(wo(this.value))}}function Ww(t){const e=[];return Ar(t.fields,(n,r)=>{const s=new Ge([n]);if(_l(r)){const i=Ww(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new It(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new rt(e,0,X.min(),X.min(),X.min(),mt.empty(),0)}static newFoundDocument(e,n,r,s){return new rt(e,1,n,X.min(),r,s,0)}static newNoDocument(e,n){return new rt(e,2,n,X.min(),X.min(),mt.empty(),0)}static newUnknownDocument(e,n){return new rt(e,3,n,X.min(),X.min(),mt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=mt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=mt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof rt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new rt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,n){this.position=e,this.inclusive=n}}function Ny(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=W.comparator(W.fromName(o.referenceValue),n.key):r=ui(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function by(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!fn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,n="asc"){this.field=e,this.dir=n}}function NA(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{}class be extends Gw{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new DA(e,n,r):n==="array-contains"?new LA(e,r):n==="in"?new jA(e,r):n==="not-in"?new MA(e,r):n==="array-contains-any"?new UA(e,r):new be(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new OA(e,r):new VA(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(ui(n,this.value)):n!==null&&Er(this.value)===Er(n)&&this.matchesComparison(ui(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Kt extends Gw{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Kt(e,n)}matches(e){return Kw(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Kw(t){return t.op==="and"}function Qw(t){return bA(t)&&Kw(t)}function bA(t){for(const e of t.filters)if(e instanceof Kt)return!1;return!0}function vd(t){if(t instanceof be)return t.field.canonicalString()+t.op.toString()+ci(t.value);if(Qw(t))return t.filters.map(e=>vd(e)).join(",");{const e=t.filters.map(n=>vd(n)).join(",");return`${t.op}(${e})`}}function Xw(t,e){return t instanceof be?function(r,s){return s instanceof be&&r.op===s.op&&r.field.isEqual(s.field)&&fn(r.value,s.value)}(t,e):t instanceof Kt?function(r,s){return s instanceof Kt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&Xw(o,s.filters[l]),!0):!1}(t,e):void K(19439)}function Yw(t){return t instanceof be?function(n){return`${n.field.canonicalString()} ${n.op} ${ci(n.value)}`}(t):t instanceof Kt?function(n){return n.op.toString()+" {"+n.getFilters().map(Yw).join(" ,")+"}"}(t):"Filter"}class DA extends be{constructor(e,n,r){super(e,n,r),this.key=W.fromName(r.referenceValue)}matches(e){const n=W.comparator(e.key,this.key);return this.matchesComparison(n)}}class OA extends be{constructor(e,n){super(e,"in",n),this.keys=Jw("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class VA extends be{constructor(e,n){super(e,"not-in",n),this.keys=Jw("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Jw(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(r=>W.fromName(r.referenceValue))}class LA extends be{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return qf(n)&&Xo(n.arrayValue,this.value)}}class jA extends be{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Xo(this.value.arrayValue,n)}}class MA extends be{constructor(e,n){super(e,"not-in",n)}matches(e){if(Xo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Xo(this.value.arrayValue,n)}}class UA extends be{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!qf(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Xo(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FA{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.Te=null}}function Dy(t,e=null,n=[],r=[],s=null,i=null,o=null){return new FA(t,e,n,r,s,i,o)}function Wf(t){const e=Y(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>vd(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Uu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ci(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ci(r)).join(",")),e.Te=n}return e.Te}function Gf(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!NA(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Xw(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!by(t.startAt,e.startAt)&&by(t.endAt,e.endAt)}function wd(t){return W.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function BA(t,e,n,r,s,i,o,l){return new Ei(t,e,n,r,s,i,o,l)}function Kf(t){return new Ei(t)}function Oy(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Zw(t){return t.collectionGroup!==null}function Eo(t){const e=Y(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Ue(Ge.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Yo(i,r))}),n.has(Ge.keyField().canonicalString())||e.Ie.push(new Yo(Ge.keyField(),r))}return e.Ie}function an(t){const e=Y(t);return e.Ee||(e.Ee=zA(e,Eo(t))),e.Ee}function zA(t,e){if(t.limitType==="F")return Dy(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Yo(s.field,i)});const n=t.endAt?new ru(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new ru(t.startAt.position,t.startAt.inclusive):null;return Dy(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Ed(t,e){const n=t.filters.concat([e]);return new Ei(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Td(t,e,n){return new Ei(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Bu(t,e){return Gf(an(t),an(e))&&t.limitType===e.limitType}function eE(t){return`${Wf(an(t))}|lt:${t.limitType}`}function Is(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>Yw(s)).join(", ")}]`),Uu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>ci(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>ci(s)).join(",")),`Target(${r})`}(an(t))}; limitType=${t.limitType})`}function zu(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):W.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of Eo(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,u){const c=Ny(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,Eo(r),s)||r.endAt&&!function(o,l,u){const c=Ny(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,Eo(r),s))}(t,e)}function $A(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function tE(t){return(e,n)=>{let r=!1;for(const s of Eo(t)){const i=HA(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function HA(t,e,n){const r=t.field.isKeyField()?W.comparator(e.key,n.key):function(i,o,l){const u=o.data.field(i),c=l.data.field(i);return u!==null&&c!==null?ui(u,c):K(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return K(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ar(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Mw(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA=new Te(W.comparator);function kn(){return qA}const nE=new Te(W.comparator);function oo(...t){let e=nE;for(const n of t)e=e.insert(n.key,n);return e}function rE(t){let e=nE;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Hr(){return To()}function sE(){return To()}function To(){return new fs(t=>t.toString(),(t,e)=>t.isEqual(e))}const WA=new Te(W.comparator),GA=new Ue(W.comparator);function re(...t){let e=GA;for(const n of t)e=e.add(n);return e}const KA=new Ue(ne);function QA(){return KA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eu(e)?"-0":e}}function iE(t){return{integerValue:""+t}}function XA(t,e){return IA(e)?iE(e):Qf(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(){this._=void 0}}function YA(t,e,n){return t instanceof su?function(s,i){const o={fields:{[Bw]:{stringValue:Fw},[$w]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Hf(i)&&(i=Fu(i)),i&&(o.fields[zw]=i),{mapValue:o}}(n,e):t instanceof Jo?aE(t,e):t instanceof Zo?lE(t,e):function(s,i){const o=oE(s,i),l=Vy(o)+Vy(s.Ae);return _d(o)&&_d(s.Ae)?iE(l):Qf(s.serializer,l)}(t,e)}function JA(t,e,n){return t instanceof Jo?aE(t,e):t instanceof Zo?lE(t,e):n}function oE(t,e){return t instanceof iu?function(r){return _d(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class su extends $u{}class Jo extends $u{constructor(e){super(),this.elements=e}}function aE(t,e){const n=uE(e);for(const r of t.elements)n.some(s=>fn(s,r))||n.push(r);return{arrayValue:{values:n}}}class Zo extends $u{constructor(e){super(),this.elements=e}}function lE(t,e){let n=uE(e);for(const r of t.elements)n=n.filter(s=>!fn(s,r));return{arrayValue:{values:n}}}class iu extends $u{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function Vy(t){return Ae(t.integerValue||t.doubleValue)}function uE(t){return qf(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function ZA(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Jo&&s instanceof Jo||r instanceof Zo&&s instanceof Zo?li(r.elements,s.elements,fn):r instanceof iu&&s instanceof iu?fn(r.Ae,s.Ae):r instanceof su&&s instanceof su}(t.transform,e.transform)}class ek{constructor(e,n){this.version=e,this.transformResults=n}}class Wt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Wt}static exists(e){return new Wt(void 0,e)}static updateTime(e){return new Wt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function vl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Hu{}function cE(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Xf(t.key,Wt.none()):new da(t.key,t.data,Wt.none());{const n=t.data,r=mt.empty();let s=new Ue(Ge.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new kr(t.key,r,new It(s.toArray()),Wt.none())}}function tk(t,e,n){t instanceof da?function(s,i,o){const l=s.value.clone(),u=jy(s.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof kr?function(s,i,o){if(!vl(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=jy(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(hE(s)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Io(t,e,n,r){return t instanceof da?function(i,o,l,u){if(!vl(i.precondition,o))return l;const c=i.value.clone(),f=My(i.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof kr?function(i,o,l,u){if(!vl(i.precondition,o))return l;const c=My(i.fieldTransforms,u,o),f=o.data;return f.setAll(hE(i)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(i,o,l){return vl(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function nk(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=oE(r.transform,s||null);i!=null&&(n===null&&(n=mt.empty()),n.set(r.field,i))}return n||null}function Ly(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&li(r,s,(i,o)=>ZA(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class da extends Hu{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class kr extends Hu{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function hE(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function jy(t,e,n){const r=new Map;oe(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,JA(o,l,n[s]))}return r}function My(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,YA(i,o,e))}return r}class Xf extends Hu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rk extends Hu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&tk(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Io(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Io(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=sE();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const u=cE(o,l);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(X.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),re())}isEqual(e){return this.batchId===e.batchId&&li(this.mutations,e.mutations,(n,r)=>Ly(n,r))&&li(this.baseMutations,e.baseMutations,(n,r)=>Ly(n,r))}}class Yf{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){oe(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return WA}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Yf(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pe,se;function ak(t){switch(t){case L.OK:return K(64938);case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0;default:return K(15467,{code:t})}}function dE(t){if(t===void 0)return An("GRPC error has no .code"),L.UNKNOWN;switch(t){case Pe.OK:return L.OK;case Pe.CANCELLED:return L.CANCELLED;case Pe.UNKNOWN:return L.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return L.INTERNAL;case Pe.UNAVAILABLE:return L.UNAVAILABLE;case Pe.UNAUTHENTICATED:return L.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case Pe.NOT_FOUND:return L.NOT_FOUND;case Pe.ALREADY_EXISTS:return L.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return L.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case Pe.ABORTED:return L.ABORTED;case Pe.OUT_OF_RANGE:return L.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return L.UNIMPLEMENTED;case Pe.DATA_LOSS:return L.DATA_LOSS;default:return K(39323,{code:t})}}(se=Pe||(Pe={}))[se.OK=0]="OK",se[se.CANCELLED=1]="CANCELLED",se[se.UNKNOWN=2]="UNKNOWN",se[se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",se[se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",se[se.NOT_FOUND=5]="NOT_FOUND",se[se.ALREADY_EXISTS=6]="ALREADY_EXISTS",se[se.PERMISSION_DENIED=7]="PERMISSION_DENIED",se[se.UNAUTHENTICATED=16]="UNAUTHENTICATED",se[se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",se[se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",se[se.ABORTED=10]="ABORTED",se[se.OUT_OF_RANGE=11]="OUT_OF_RANGE",se[se.UNIMPLEMENTED=12]="UNIMPLEMENTED",se[se.INTERNAL=13]="INTERNAL",se[se.UNAVAILABLE=14]="UNAVAILABLE",se[se.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lk(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uk=new hr([4294967295,4294967295],0);function Uy(t){const e=lk().encode(t),n=new Cw;return n.update(e),new Uint8Array(n.digest())}function Fy(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new hr([n,r],0),new hr([s,i],0)]}class Jf{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new ao(`Invalid padding: ${n}`);if(r<0)throw new ao(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ao(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new ao(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=hr.fromNumber(this.ge)}ye(e,n,r){let s=e.add(n.multiply(hr.fromNumber(r)));return s.compare(uk)===1&&(s=new hr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=Uy(e),[r,s]=Fy(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Jf(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.ge===0)return;const n=Uy(e),[r,s]=Fy(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class ao extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,fa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new qu(X.min(),s,new Te(ne),kn(),re())}}class fa{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new fa(r,n,re(),re(),re())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e,n,r,s){this.be=e,this.removedTargetIds=n,this.key=r,this.De=s}}class fE{constructor(e,n){this.targetId=e,this.Ce=n}}class pE{constructor(e,n,r=Xe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class By{constructor(){this.ve=0,this.Fe=zy(),this.Me=Xe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=re(),n=re(),r=re();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:K(38017,{changeType:i})}}),new fa(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=zy()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,oe(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class ck{constructor(e){this.Ge=e,this.ze=new Map,this.je=kn(),this.Je=Za(),this.He=Za(),this.Ye=new Te(ne)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:K(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((r,s)=>{this.rt(s)&&n(s)})}st(e){const n=e.targetId,r=e.Ce.count,s=this.ot(n);if(s){const i=s.target;if(wd(i))if(r===0){const o=new W(i.path);this.et(n,o,rt.newNoDocument(o,X.min()))}else oe(r===1,20013,{expectedCount:r});else{const o=this._t(n);if(o!==r){const l=this.ut(e),u=l?this.ct(l,e,o):1;if(u!==0){this.it(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,c)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=wr(r).toUint8Array()}catch(u){if(u instanceof Uw)return ai("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Jf(o,s,i)}catch(u){return ai(u instanceof ao?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(n,i,null),s++)}),s}Tt(e){const n=new Map;this.ze.forEach((i,o)=>{const l=this.ot(o);if(l){if(i.current&&wd(l.target)){const u=new W(l.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,rt.newNoDocument(u,e))}i.Be&&(n.set(o,i.ke()),i.qe())}});let r=re();this.He.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.ot(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new qu(e,n,this.Ye,this.je,r);return this.je=kn(),this.Je=Za(),this.He=Za(),this.Ye=new Te(ne),s}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,n)?s.Qe(n,1):s.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new By,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new Ue(ne),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new Ue(ne),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||H("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new By),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function Za(){return new Te(W.comparator)}function zy(){return new Te(W.comparator)}const hk={asc:"ASCENDING",desc:"DESCENDING"},dk={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fk={and:"AND",or:"OR"};class pk{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Id(t,e){return t.useProto3Json||Uu(e)?e:{value:e}}function ou(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function mE(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function mk(t,e){return ou(t,e.toTimestamp())}function ln(t){return oe(!!t,49232),X.fromTimestamp(function(n){const r=vr(n);return new pe(r.seconds,r.nanos)}(t))}function Zf(t,e){return xd(t,e).canonicalString()}function xd(t,e){const n=function(s){return new ue(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function gE(t){const e=ue.fromString(t);return oe(EE(e),10190,{key:e.toString()}),e}function Sd(t,e){return Zf(t.databaseId,e.path)}function nh(t,e){const n=gE(e);if(n.get(1)!==t.databaseId.projectId)throw new z(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new z(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new W(_E(n))}function yE(t,e){return Zf(t.databaseId,e)}function gk(t){const e=gE(t);return e.length===4?ue.emptyPath():_E(e)}function Rd(t){return new ue(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function _E(t){return oe(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function $y(t,e,n){return{name:Sd(t,e),fields:n.value.mapValue.fields}}function yk(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:K(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,f){return c.useProto3Json?(oe(f===void 0||typeof f=="string",58123),Xe.fromBase64String(f||"")):(oe(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Xe.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?L.UNKNOWN:dE(c.code);return new z(f,c.message||"")}(o);n=new pE(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=nh(t,r.document.name),i=ln(r.document.updateTime),o=r.document.createTime?ln(r.document.createTime):X.min(),l=new mt({mapValue:{fields:r.document.fields}}),u=rt.newFoundDocument(s,i,o,l),c=r.targetIds||[],f=r.removedTargetIds||[];n=new wl(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=nh(t,r.document),i=r.readTime?ln(r.readTime):X.min(),o=rt.newNoDocument(s,i),l=r.removedTargetIds||[];n=new wl([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=nh(t,r.document),i=r.removedTargetIds||[];n=new wl([],i,s,null)}else{if(!("filter"in e))return K(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new ok(s,i),l=r.targetId;n=new fE(l,o)}}return n}function _k(t,e){let n;if(e instanceof da)n={update:$y(t,e.key,e.value)};else if(e instanceof Xf)n={delete:Sd(t,e.key)};else if(e instanceof kr)n={update:$y(t,e.key,e.data),updateMask:Ck(e.fieldMask)};else{if(!(e instanceof rk))return K(16599,{Vt:e.type});n={verify:Sd(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof su)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Jo)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Zo)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof iu)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw K(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:mk(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:K(27497)}(t,e.precondition)),n}function vk(t,e){return t&&t.length>0?(oe(e!==void 0,14353),t.map(n=>function(s,i){let o=s.updateTime?ln(s.updateTime):ln(i);return o.isEqual(X.min())&&(o=ln(i)),new ek(o,s.transformResults||[])}(n,e))):[]}function wk(t,e){return{documents:[yE(t,e.path)]}}function Ek(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=yE(t,s);const i=function(c){if(c.length!==0)return wE(Kt.create(c,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(c){if(c.length!==0)return c.map(f=>function(g){return{field:xs(g.field),direction:xk(g.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Id(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{ft:n,parent:s}}function Tk(t){let e=gk(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){oe(r===1,65062);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(m){const g=vE(m);return g instanceof Kt&&Qw(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(g=>function(k){return new Yo(Ss(k.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(m){let g;return g=typeof m=="object"?m.value:m,Uu(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(m){const g=!!m.before,S=m.values||[];return new ru(S,g)}(n.startAt));let c=null;return n.endAt&&(c=function(m){const g=!m.before,S=m.values||[];return new ru(S,g)}(n.endAt)),BA(e,s,o,i,l,"F",u,c)}function Ik(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K(28987,{purpose:s})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function vE(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Ss(n.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ss(n.unaryFilter.field);return be.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ss(n.unaryFilter.field);return be.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ss(n.unaryFilter.field);return be.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return K(61313);default:return K(60726)}}(t):t.fieldFilter!==void 0?function(n){return be.create(Ss(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return K(58110);default:return K(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Kt.create(n.compositeFilter.filters.map(r=>vE(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return K(1026)}}(n.compositeFilter.op))}(t):K(30097,{filter:t})}function xk(t){return hk[t]}function Sk(t){return dk[t]}function Rk(t){return fk[t]}function xs(t){return{fieldPath:t.canonicalString()}}function Ss(t){return Ge.fromServerFormat(t.fieldPath)}function wE(t){return t instanceof be?function(n){if(n.op==="=="){if(Py(n.value))return{unaryFilter:{field:xs(n.field),op:"IS_NAN"}};if(ky(n.value))return{unaryFilter:{field:xs(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Py(n.value))return{unaryFilter:{field:xs(n.field),op:"IS_NOT_NAN"}};if(ky(n.value))return{unaryFilter:{field:xs(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xs(n.field),op:Sk(n.op),value:n.value}}}(t):t instanceof Kt?function(n){const r=n.getFilters().map(s=>wE(s));return r.length===1?r[0]:{compositeFilter:{op:Rk(n.op),filters:r}}}(t):K(54877,{filter:t})}function Ck(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function EE(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,n,r,s,i=X.min(),o=X.min(),l=Xe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Zn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Zn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Zn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Zn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ak{constructor(e){this.yt=e}}function kk(t){const e=Tk({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Td(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk{constructor(){this.Cn=new Nk}addToCollectionParentIndex(e,n){return this.Cn.add(n),j.resolve()}getCollectionParents(e,n){return j.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return j.resolve()}deleteFieldIndex(e,n){return j.resolve()}deleteAllFieldIndexes(e){return j.resolve()}createTargetIndexes(e,n){return j.resolve()}getDocumentsMatchingTarget(e,n){return j.resolve(null)}getIndexType(e,n){return j.resolve(0)}getFieldIndexes(e,n){return j.resolve([])}getNextCollectionGroupToUpdate(e){return j.resolve(null)}getMinOffset(e,n){return j.resolve(_r.min())}getMinOffsetFromCollectionGroup(e,n){return j.resolve(_r.min())}updateCollectionGroup(e,n,r){return j.resolve()}updateIndexEntries(e,n){return j.resolve()}}class Nk{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Ue(ue.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ue(ue.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},TE=41943040;class ft{static withCacheSize(e){return new ft(e,ft.DEFAULT_COLLECTION_PERCENTILE,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ft.DEFAULT_COLLECTION_PERCENTILE=10,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ft.DEFAULT=new ft(TE,ft.DEFAULT_COLLECTION_PERCENTILE,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ft.DISABLED=new ft(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new hi(0)}static cr(){return new hi(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy="LruGarbageCollector",bk=1048576;function Wy([t,e],[n,r]){const s=ne(t,n);return s===0?ne(e,r):s}class Dk{constructor(e){this.Ir=e,this.buffer=new Ue(Wy),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Wy(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class Ok{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){H(qy,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){wi(n)?H(qy,"Ignoring IndexedDB error during garbage collection: ",n):await vi(n)}await this.Vr(3e5)})}}class Vk{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return j.resolve(Mu.ce);const r=new Dk(n);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(H("LruGarbageCollector","Garbage collection skipped; disabled"),j.resolve(Hy)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(H("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Hy):this.yr(e,n))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,s,i,o,l,u,c;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(H("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(r=m,l=Date.now(),this.removeTargets(e,r,n))).next(m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(c=Date.now(),Ts()<=te.DEBUG&&H("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(l-o)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${m} documents in `+(c-u)+`ms
Total Duration: ${c-f}ms`),j.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Lk(t,e){return new Vk(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jk{constructor(){this.changes=new fs(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,rt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?j.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mk{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uk{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Io(r.mutation,s,It.empty(),pe.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,n,r=re()){const s=Hr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=oo();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Hr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,re()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=kn();const o=To(),l=function(){return To()}();return n.forEach((u,c)=>{const f=r.get(c.key);s.has(c.key)&&(f===void 0||f.mutation instanceof kr)?i=i.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),Io(f.mutation,c,f.mutation.getFieldMask(),pe.now())):o.set(c.key,It.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((c,f)=>o.set(c,f)),n.forEach((c,f)=>l.set(c,new Mk(f,o.get(c)??null))),l))}recalculateAndSaveOverlays(e,n){const r=To();let s=new Te((o,l)=>o-l),i=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let f=r.get(u)||It.empty();f=l.applyToLocalView(c,f),r.set(u,f);const m=(s.get(l.batchId)||re()).add(u);s=s.insert(l.batchId,m)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,m=sE();f.forEach(g=>{if(!i.has(g)){const S=cE(n.get(g),r.get(g));S!==null&&m.set(g,S),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,m))}return j.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return W.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Zw(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):j.resolve(Hr());let l=Go,u=i;return o.next(c=>j.forEach(c,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(f)?j.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,u,c,re())).next(f=>({batchId:l,changes:rE(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new W(n)).next(r=>{let s=oo();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=oo();return this.indexManager.getCollectionParents(e,i).next(l=>j.forEach(l,u=>{const c=function(m,g){return new Ei(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r,s).next(f=>{f.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,rt.newInvalidDocument(f)))});let l=oo();return o.forEach((u,c)=>{const f=i.get(u);f!==void 0&&Io(f.mutation,c,It.empty(),pe.now()),zu(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fk{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return j.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:ln(s.createTime)}}(n)),j.resolve()}getNamedQuery(e,n){return j.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,function(s){return{name:s.name,query:kk(s.bundledQuery),readTime:ln(s.readTime)}}(n)),j.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bk{constructor(){this.overlays=new Te(W.comparator),this.qr=new Map}getOverlay(e,n){return j.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Hr();return j.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.St(e,n,i)}),j.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),j.resolve()}getOverlaysForCollection(e,n,r){const s=Hr(),i=n.length+1,o=new W(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return j.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Te((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let f=i.get(c.largestBatchId);f===null&&(f=Hr(),i=i.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=Hr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=s)););return j.resolve(l)}St(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ik(n,r));let i=this.qr.get(n);i===void 0&&(i=re(),this.qr.set(n,i)),this.qr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zk{constructor(){this.sessionToken=Xe.EMPTY_BYTE_STRING}getSessionToken(e){return j.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,j.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(){this.Qr=new Ue(Be.$r),this.Ur=new Ue(Be.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new Be(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Gr(new Be(e,n))}zr(e,n){e.forEach(r=>this.removeReference(r,n))}jr(e){const n=new W(new ue([])),r=new Be(n,e),s=new Be(n,e+1),i=[];return this.Ur.forEachInRange([r,s],o=>{this.Gr(o),i.push(o.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new W(new ue([])),r=new Be(n,e),s=new Be(n,e+1);let i=re();return this.Ur.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Be(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Be{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return W.comparator(e.key,n.key)||ne(e.Yr,n.Yr)}static Kr(e,n){return ne(e.Yr,n.Yr)||W.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $k{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new Ue(Be.$r)}checkEmpty(e){return j.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new sk(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.Zr=this.Zr.add(new Be(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return j.resolve(o)}lookupMutationBatch(e,n){return j.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ei(r),i=s<0?0:s;return j.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(this.mutationQueue.length===0?$f:this.tr-1)}getAllMutationBatches(e){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Be(n,0),s=new Be(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],o=>{const l=this.Xr(o.Yr);i.push(l)}),j.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ue(ne);return n.forEach(s=>{const i=new Be(s,0),o=new Be(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],l=>{r=r.add(l.Yr)})}),j.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;W.isDocumentKey(i)||(i=i.child(""));const o=new Be(new W(i),0);let l=new Ue(ne);return this.Zr.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(l=l.add(u.Yr)),!0)},o),j.resolve(this.ti(l))}ti(e){const n=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){oe(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return j.forEach(n.mutations,s=>{const i=new Be(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,n){const r=new Be(n,0),s=this.Zr.firstAfterOrEqual(r);return j.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,j.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hk{constructor(e){this.ri=e,this.docs=function(){return new Te(W.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return j.resolve(r?r.document.mutableCopy():rt.newInvalidDocument(n))}getEntries(e,n){let r=kn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():rt.newInvalidDocument(s))}),j.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=kn();const o=n.path,l=new W(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||vA(_A(f),r)<=0||(s.has(f.key)||zu(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return j.resolve(i)}getAllFromCollectionGroup(e,n,r,s){K(9500)}ii(e,n){return j.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new qk(this)}getSize(e){return j.resolve(this.size)}}class qk extends jk{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),j.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wk{constructor(e){this.persistence=e,this.si=new fs(n=>Wf(n),Gf),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.oi=0,this._i=new ep,this.targetCount=0,this.ai=hi.ur()}forEachTarget(e,n){return this.si.forEach((r,s)=>n(s)),j.resolve()}getLastRemoteSnapshotVersion(e){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return j.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),j.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new hi(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,j.resolve()}updateTargetData(e,n){return this.Pr(n),j.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,j.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.si.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),j.waitFor(i).next(()=>s)}getTargetCount(e){return j.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return j.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),j.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),j.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),j.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return j.resolve(r)}containsKey(e,n){return j.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(e,n){this.ui={},this.overlays={},this.ci=new Mu(0),this.li=!1,this.li=!0,this.hi=new zk,this.referenceDelegate=e(this),this.Pi=new Wk(this),this.indexManager=new Pk,this.remoteDocumentCache=function(s){return new Hk(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new Ak(n),this.Ii=new Fk(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new Bk,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new $k(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){H("MemoryPersistence","Starting transaction:",e);const s=new Gk(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,n){return j.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,n)))}}class Gk extends EA{constructor(e){super(),this.currentSequenceNumber=e}}class tp{constructor(e){this.persistence=e,this.Ri=new ep,this.Vi=null}static mi(e){return new tp(e)}get fi(){if(this.Vi)return this.Vi;throw K(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),j.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),j.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),j.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.fi,r=>{const s=W.fromPath(r);return this.gi(e,s).next(i=>{i||n.removeEntry(s,X.min())})}).next(()=>(this.Vi=null,n.apply(e)))}updateLimboDocument(e,n){return this.gi(e,n).next(r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())})}Ti(e){return 0}gi(e,n){return j.or([()=>j.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class au{constructor(e,n){this.persistence=e,this.pi=new fs(r=>xA(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Lk(this,n)}static mi(e,n){return new au(e,n)}Ei(){}di(e){return j.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}wr(e){let n=0;return this.pr(e,r=>{n++}).next(()=>n)}pr(e,n){return j.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?j.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,o=>this.br(e,o,n).next(l=>{l||(r++,i.removeEntry(o,X.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),j.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),j.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),j.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),j.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=yl(e.data.value)),n}br(e,n,r){return j.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.pi.get(n);return j.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=s}static As(e,n){let r=re(),s=re();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new np(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kk{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qk{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return FR()?8:TA(it())>0?6:4}()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ys(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ws(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new Kk;return this.Ss(e,n,o).next(l=>{if(i.result=l,this.Vs)return this.bs(e,n,o,l.size)})}).next(()=>i.result)}bs(e,n,r,s){return r.documentReadCount<this.fs?(Ts()<=te.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",Is(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),j.resolve()):(Ts()<=te.DEBUG&&H("QueryEngine","Query:",Is(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Ts()<=te.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",Is(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,an(n))):j.resolve())}ys(e,n){if(Oy(n))return j.resolve(null);let r=an(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Td(n,null,"F"),r=an(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=re(...i);return this.ps.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.Ds(n,l);return this.Cs(n,c,o,u.readTime)?this.ys(e,Td(n,null,"F")):this.vs(e,c,n,u)}))})))}ws(e,n,r,s){return Oy(n)||s.isEqual(X.min())?j.resolve(null):this.ps.getDocuments(e,r).next(i=>{const o=this.Ds(n,i);return this.Cs(n,o,r,s)?j.resolve(null):(Ts()<=te.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Is(n)),this.vs(e,o,n,yA(s,Go)).next(l=>l))})}Ds(e,n){let r=new Ue(tE(e));return n.forEach((s,i)=>{zu(e,i)&&(r=r.add(i))}),r}Cs(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,n,r){return Ts()<=te.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",Is(n)),this.ps.getDocumentsMatchingQuery(e,n,_r.min(),r)}vs(e,n,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp="LocalStore",Xk=3e8;class Yk{constructor(e,n,r,s){this.persistence=e,this.Fs=n,this.serializer=s,this.Ms=new Te(ne),this.xs=new fs(i=>Wf(i),Gf),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Uk(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ms))}}function Jk(t,e,n,r){return new Yk(t,e,n,r)}async function xE(t,e){const n=Y(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let u=re();for(const c of s){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of i){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(c=>({Ls:c,removedBatchIds:o,addedBatchIds:l}))})})}function Zk(t,e){const n=Y(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const m=c.batch,g=m.keys();let S=j.resolve();return g.forEach(k=>{S=S.next(()=>f.getEntry(u,k)).next(x=>{const A=c.docVersions.get(k);oe(A!==null,48541),x.version.compareTo(A)<0&&(m.applyToRemoteDocument(x,c),x.isValidDocument()&&(x.setReadTime(c.commitVersion),f.addEntry(x)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=re();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function SE(t){const e=Y(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Pi.getLastRemoteSnapshotVersion(n))}function eP(t,e){const n=Y(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const l=[];e.targetChanges.forEach((f,m)=>{const g=s.get(m);if(!g)return;l.push(n.Pi.removeMatchingKeys(i,f.removedDocuments,m).next(()=>n.Pi.addMatchingKeys(i,f.addedDocuments,m)));let S=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(Xe.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),s=s.insert(m,S),function(x,A,E){return x.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=Xk?!0:E.addedDocuments.size+E.modifiedDocuments.size+E.removedDocuments.size>0}(g,S,f)&&l.push(n.Pi.updateTargetData(i,S))});let u=kn(),c=re();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(tP(i,o,e.documentUpdates).next(f=>{u=f.ks,c=f.qs})),!r.isEqual(X.min())){const f=n.Pi.getLastRemoteSnapshotVersion(i).next(m=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return j.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,c)).next(()=>u)}).then(i=>(n.Ms=s,i))}function tP(t,e,n){let r=re(),s=re();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=kn();return n.forEach((l,u)=>{const c=i.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(X.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):H(rp,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{ks:o,qs:s}})}function nP(t,e){const n=Y(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=$f),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function rP(t,e){const n=Y(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Pi.getTargetData(r,e).next(i=>i?(s=i,j.resolve(s)):n.Pi.allocateTargetId(r).next(o=>(s=new Zn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r})}async function Cd(t,e,n){const r=Y(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!wi(o))throw o;H(rp,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Gy(t,e,n){const r=Y(t);let s=X.min(),i=re();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const m=Y(u),g=m.xs.get(f);return g!==void 0?j.resolve(m.Ms.get(g)):m.Pi.getTargetData(c,f)}(r,o,an(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>r.Fs.getDocumentsMatchingQuery(o,e,n?s:X.min(),n?i:re())).next(l=>(sP(r,$A(e),l),{documents:l,Qs:i})))}function sP(t,e,n){let r=t.Os.get(e)||X.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Os.set(e,r)}class Ky{constructor(){this.activeTargetIds=QA()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class iP{constructor(){this.Mo=new Ky,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Ky,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oP{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qy="ConnectivityMonitor";class Xy{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){H(Qy,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){H(Qy,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let el=null;function Ad(){return el===null?el=function(){return 268435456+Math.round(2147483648*Math.random())}():el++,"0x"+el.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh="RestConnection",aP={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class lP{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===tu?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,n,r,s,i){const o=Ad(),l=this.zo(e,n.toUriEncodedString());H(rh,`Sending RPC '${e}' ${o}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:c}=new URL(l),f=Cr(c);return this.Jo(e,l,u,r,f).then(m=>(H(rh,`Received RPC '${e}' ${o}: `,m),m),m=>{throw ai(rh,`RPC '${e}' ${o} failed with error: `,m,"url: ",l,"request:",r),m})}Ho(e,n,r,s,i,o){return this.Go(e,n,r,s,i)}jo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+_i}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,n){const r=aP[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uP{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="WebChannelConnection";class cP extends lP{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,s,i){const o=Ad();return new Promise((l,u)=>{const c=new Aw;c.setWithCredentials(!0),c.listenOnce(kw.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case gl.NO_ERROR:const m=c.getResponseJson();H(et,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),l(m);break;case gl.TIMEOUT:H(et,`RPC '${e}' ${o} timed out`),u(new z(L.DEADLINE_EXCEEDED,"Request time out"));break;case gl.HTTP_ERROR:const g=c.getStatus();if(H(et,`RPC '${e}' ${o} failed with status:`,g,"response text:",c.getResponseText()),g>0){let S=c.getResponseJson();Array.isArray(S)&&(S=S[0]);const k=S==null?void 0:S.error;if(k&&k.status&&k.message){const x=function(E){const w=E.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(w)>=0?w:L.UNKNOWN}(k.status);u(new z(x,k.message))}else u(new z(L.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new z(L.UNAVAILABLE,"Connection failed."));break;default:K(9055,{l_:e,streamId:o,h_:c.getLastErrorCode(),P_:c.getLastError()})}}finally{H(et,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);H(et,`RPC '${e}' ${o} sending request:`,s),c.send(n,"POST",f,r,15)})}T_(e,n,r){const s=Ad(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=bw(),l=Nw(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=i.join("");H(et,`Creating RPC '${e}' stream ${s}: ${f}`,u);const m=o.createWebChannel(f,u);this.I_(m);let g=!1,S=!1;const k=new uP({Yo:A=>{S?H(et,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(g||(H(et,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),H(et,`RPC '${e}' stream ${s} sending:`,A),m.send(A))},Zo:()=>m.close()}),x=(A,E,w)=>{A.listen(E,I=>{try{w(I)}catch(b){setTimeout(()=>{throw b},0)}})};return x(m,io.EventType.OPEN,()=>{S||(H(et,`RPC '${e}' stream ${s} transport opened.`),k.o_())}),x(m,io.EventType.CLOSE,()=>{S||(S=!0,H(et,`RPC '${e}' stream ${s} transport closed`),k.a_(),this.E_(m))}),x(m,io.EventType.ERROR,A=>{S||(S=!0,ai(et,`RPC '${e}' stream ${s} transport errored. Name:`,A.name,"Message:",A.message),k.a_(new z(L.UNAVAILABLE,"The operation could not be completed")))}),x(m,io.EventType.MESSAGE,A=>{var E;if(!S){const w=A.data[0];oe(!!w,16349);const I=w,b=(I==null?void 0:I.error)||((E=I[0])==null?void 0:E.error);if(b){H(et,`RPC '${e}' stream ${s} received error:`,b);const M=b.status;let N=function(T){const C=Pe[T];if(C!==void 0)return dE(C)}(M),y=b.message;N===void 0&&(N=L.INTERNAL,y="Unknown error status: "+M+" with message "+b.message),S=!0,k.a_(new z(N,y)),m.close()}else H(et,`RPC '${e}' stream ${s} received:`,w),k.u_(w)}}),x(l,Pw.STAT_EVENT,A=>{A.stat===md.PROXY?H(et,`RPC '${e}' stream ${s} detected buffering proxy`):A.stat===md.NOPROXY&&H(et,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.__()},0),k}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(n=>n===e)}}function sh(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wu(t){return new pk(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,n-r);s>0&&H("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy="PersistentStream";class CE{constructor(e,n,r,s,i,o,l,u){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new RE(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===L.RESOURCE_EXHAUSTED?(An(n.toString()),An("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===n&&this.G_(r,s)},r=>{e(()=>{const s=new z(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return H(Yy,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget(()=>this.D_===e?n():(H(Yy,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class hP extends CE{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=yk(this.serializer,e),r=function(i){if(!("targetChange"in i))return X.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?X.min():o.readTime?ln(o.readTime):X.min()}(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Rd(this.serializer),n.addTarget=function(i,o){let l;const u=o.target;if(l=wd(u)?{documents:wk(i,u)}:{query:Ek(i,u).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=mE(i,o.resumeToken);const c=Id(i,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(X.min())>0){l.readTime=ou(i,o.snapshotVersion.toTimestamp());const c=Id(i,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=Ik(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Rd(this.serializer),n.removeTarget=e,this.q_(n)}}class dP extends CE{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return oe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,oe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){oe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=vk(e.writeResults,e.commitTime),r=ln(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Rd(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>_k(this.serializer,r))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fP{}class pP extends fP{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new z(L.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Go(e,xd(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new z(L.UNKNOWN,i.toString())})}Ho(e,n,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Ho(e,xd(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new z(L.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class mP{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(An(n),this.aa=!1):H("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss="RemoteStore";class gP{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(o=>{r.enqueueAndForget(async()=>{ps(this)&&(H(ss,"Restarting streams for network reachability change."),await async function(u){const c=Y(u);c.Ea.add(4),await pa(c),c.Ra.set("Unknown"),c.Ea.delete(4),await Gu(c)}(this))})}),this.Ra=new mP(r,s)}}async function Gu(t){if(ps(t))for(const e of t.da)await e(!0)}async function pa(t){for(const e of t.da)await e(!1)}function AE(t,e){const n=Y(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),ap(n)?op(n):Ti(n).O_()&&ip(n,e))}function sp(t,e){const n=Y(t),r=Ti(n);n.Ia.delete(e),r.O_()&&kE(n,e),n.Ia.size===0&&(r.O_()?r.L_():ps(n)&&n.Ra.set("Unknown"))}function ip(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ti(t).Y_(e)}function kE(t,e){t.Va.Ue(e),Ti(t).Z_(e)}function op(t){t.Va=new ck({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Ti(t).start(),t.Ra.ua()}function ap(t){return ps(t)&&!Ti(t).x_()&&t.Ia.size>0}function ps(t){return Y(t).Ea.size===0}function PE(t){t.Va=void 0}async function yP(t){t.Ra.set("Online")}async function _P(t){t.Ia.forEach((e,n)=>{ip(t,e)})}async function vP(t,e){PE(t),ap(t)?(t.Ra.ha(e),op(t)):t.Ra.set("Unknown")}async function wP(t,e,n){if(t.Ra.set("Online"),e instanceof pE&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.Ia.delete(l),s.Va.removeTarget(l))}(t,e)}catch(r){H(ss,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await lu(t,r)}else if(e instanceof wl?t.Va.Ze(e):e instanceof fE?t.Va.st(e):t.Va.tt(e),!n.isEqual(X.min()))try{const r=await SE(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Va.Tt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(c);f&&i.Ia.set(c,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Xe.EMPTY_BYTE_STRING,f.snapshotVersion)),kE(i,u);const m=new Zn(f.target,u,c,f.sequenceNumber);ip(i,m)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){H(ss,"Failed to raise snapshot:",r),await lu(t,r)}}async function lu(t,e,n){if(!wi(e))throw e;t.Ea.add(1),await pa(t),t.Ra.set("Offline"),n||(n=()=>SE(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{H(ss,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await Gu(t)})}function NE(t,e){return e().catch(n=>lu(t,n,e))}async function Ku(t){const e=Y(t),n=Tr(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:$f;for(;EP(e);)try{const s=await nP(e.localStore,r);if(s===null){e.Ta.length===0&&n.L_();break}r=s.batchId,TP(e,s)}catch(s){await lu(e,s)}bE(e)&&DE(e)}function EP(t){return ps(t)&&t.Ta.length<10}function TP(t,e){t.Ta.push(e);const n=Tr(t);n.O_()&&n.X_&&n.ea(e.mutations)}function bE(t){return ps(t)&&!Tr(t).x_()&&t.Ta.length>0}function DE(t){Tr(t).start()}async function IP(t){Tr(t).ra()}async function xP(t){const e=Tr(t);for(const n of t.Ta)e.ea(n.mutations)}async function SP(t,e,n){const r=t.Ta.shift(),s=Yf.from(r,e,n);await NE(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Ku(t)}async function RP(t,e){e&&Tr(t).X_&&await async function(r,s){if(function(o){return ak(o)&&o!==L.ABORTED}(s.code)){const i=r.Ta.shift();Tr(r).B_(),await NE(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ku(r)}}(t,e),bE(t)&&DE(t)}async function Jy(t,e){const n=Y(t);n.asyncQueue.verifyOperationInProgress(),H(ss,"RemoteStore received new credentials");const r=ps(n);n.Ea.add(3),await pa(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await Gu(n)}async function CP(t,e){const n=Y(t);e?(n.Ea.delete(2),await Gu(n)):e||(n.Ea.add(2),await pa(n),n.Ra.set("Unknown"))}function Ti(t){return t.ma||(t.ma=function(n,r,s){const i=Y(n);return i.sa(),new hP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:yP.bind(null,t),t_:_P.bind(null,t),r_:vP.bind(null,t),H_:wP.bind(null,t)}),t.da.push(async e=>{e?(t.ma.B_(),ap(t)?op(t):t.Ra.set("Unknown")):(await t.ma.stop(),PE(t))})),t.ma}function Tr(t){return t.fa||(t.fa=function(n,r,s){const i=Y(n);return i.sa(),new dP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:IP.bind(null,t),r_:RP.bind(null,t),ta:xP.bind(null,t),na:SP.bind(null,t)}),t.da.push(async e=>{e?(t.fa.B_(),await Ku(t)):(await t.fa.stop(),t.Ta.length>0&&(H(ss,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Gr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new lp(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function up(t,e){if(An("AsyncQueue",`${e}: ${t}`),wi(t))return new z(L.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{static emptySet(e){return new Ks(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||W.comparator(n.key,r.key):(n,r)=>W.comparator(n.key,r.key),this.keyedMap=oo(),this.sortedSet=new Te(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ks)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Ks;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(){this.ga=new Te(W.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):K(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,r)=>{e.push(r)}),e}}class di{constructor(e,n,r,s,i,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new di(e,n,Ks.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AP{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class kP{constructor(){this.queries=e_(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const s=Y(n),i=s.queries;s.queries=e_(),i.forEach((o,l)=>{for(const u of l.Sa)u.onError(r)})})(this,new z(L.ABORTED,"Firestore shutting down"))}}function e_(){return new fs(t=>eE(t),Bu)}async function PP(t,e){const n=Y(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new AP,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=up(o,`Initialization of query '${Is(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&cp(n)}async function NP(t,e){const n=Y(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function bP(t,e){const n=Y(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.Sa)l.Fa(s)&&(r=!0);o.wa=s}}r&&cp(n)}function DP(t,e,n){const r=Y(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function cp(t){t.Ca.forEach(e=>{e.next()})}var kd,t_;(t_=kd||(kd={})).Ma="default",t_.Cache="cache";class OP{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new di(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=di.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==kd.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e){this.key=e}}class VE{constructor(e){this.key=e}}class VP{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=re(),this.mutatedKeys=re(),this.eu=tE(e),this.tu=new Ks(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new Zy,s=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,m)=>{const g=s.get(f),S=zu(this.query,m)?m:null,k=!!g&&this.mutatedKeys.has(g.key),x=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let A=!1;g&&S?g.data.isEqual(S.data)?k!==x&&(r.track({type:3,doc:S}),A=!0):this.su(g,S)||(r.track({type:2,doc:S}),A=!0,(u&&this.eu(S,u)>0||c&&this.eu(S,c)<0)&&(l=!0)):!g&&S?(r.track({type:0,doc:S}),A=!0):g&&!S&&(r.track({type:1,doc:g}),A=!0,(u||c)&&(l=!0)),A&&(S?(o=o.add(S),i=x?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:o,iu:r,Cs:l,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((f,m)=>function(S,k){const x=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K(20277,{Rt:A})}};return x(S)-x(k)}(f.type,m.type)||this.eu(f.doc,m.doc)),this.ou(r),s=s??!1;const l=n&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,c=u!==this.Za;return this.Za=u,o.length!==0||c?{snapshot:new di(this.query,e.tu,i,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Zy,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Ya=this.Ya.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ya=this.Ya.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=re(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const n=[];return e.forEach(r=>{this.Xa.has(r)||n.push(new VE(r))}),this.Xa.forEach(r=>{e.has(r)||n.push(new OE(r))}),n}cu(e){this.Ya=e.Qs,this.Xa=re();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return di.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const hp="SyncEngine";class LP{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class jP{constructor(e){this.key=e,this.hu=!1}}class MP{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new fs(l=>eE(l),Bu),this.Iu=new Map,this.Eu=new Set,this.du=new Te(W.comparator),this.Au=new Map,this.Ru=new ep,this.Vu={},this.mu=new Map,this.fu=hi.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function UP(t,e,n=!0){const r=BE(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await LE(r,e,n,!0),s}async function FP(t,e){const n=BE(t);await LE(n,e,!0,!1)}async function LE(t,e,n,r){const s=await rP(t.localStore,an(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await BP(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&AE(t.remoteStore,s),l}async function BP(t,e,n,r,s){t.pu=(m,g,S)=>async function(x,A,E,w){let I=A.view.ru(E);I.Cs&&(I=await Gy(x.localStore,A.query,!1).then(({documents:y})=>A.view.ru(y,I)));const b=w&&w.targetChanges.get(A.targetId),M=w&&w.targetMismatches.get(A.targetId)!=null,N=A.view.applyChanges(I,x.isPrimaryClient,b,M);return r_(x,A.targetId,N.au),N.snapshot}(t,m,g,S);const i=await Gy(t.localStore,e,!0),o=new VP(e,i.Qs),l=o.ru(i.documents),u=fa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),c=o.applyChanges(l,t.isPrimaryClient,u);r_(t,n,c.au);const f=new LP(e,n,o);return t.Tu.set(e,f),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),c.snapshot}async function zP(t,e,n){const r=Y(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(o=>!Bu(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Cd(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&sp(r.remoteStore,s.targetId),Pd(r,s.targetId)}).catch(vi)):(Pd(r,s.targetId),await Cd(r.localStore,s.targetId,!0))}async function $P(t,e){const n=Y(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),sp(n.remoteStore,r.targetId))}async function HP(t,e,n){const r=YP(t);try{const s=await function(o,l){const u=Y(o),c=pe.now(),f=l.reduce((S,k)=>S.add(k.key),re());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let k=kn(),x=re();return u.Ns.getEntries(S,f).next(A=>{k=A,k.forEach((E,w)=>{w.isValidDocument()||(x=x.add(E))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,k)).next(A=>{m=A;const E=[];for(const w of l){const I=nk(w,m.get(w.key).overlayedDocument);I!=null&&E.push(new kr(w.key,I,Ww(I.value.mapValue),Wt.exists(!0)))}return u.mutationQueue.addMutationBatch(S,c,E,l)}).next(A=>{g=A;const E=A.applyToLocalDocumentSet(m,x);return u.documentOverlayCache.saveOverlays(S,A.batchId,E)})}).then(()=>({batchId:g.batchId,changes:rE(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,u){let c=o.Vu[o.currentUser.toKey()];c||(c=new Te(ne)),c=c.insert(l,u),o.Vu[o.currentUser.toKey()]=c}(r,s.batchId,n),await ma(r,s.changes),await Ku(r.remoteStore)}catch(s){const i=up(s,"Failed to persist write");n.reject(i)}}async function jE(t,e){const n=Y(t);try{const r=await eP(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Au.get(i);o&&(oe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?oe(o.hu,14607):s.removedDocuments.size>0&&(oe(o.hu,42227),o.hu=!1))}),await ma(n,r,e)}catch(r){await vi(r)}}function n_(t,e,n){const r=Y(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Tu.forEach((i,o)=>{const l=o.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const u=Y(o);u.onlineState=l;let c=!1;u.queries.forEach((f,m)=>{for(const g of m.Sa)g.va(l)&&(c=!0)}),c&&cp(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function qP(t,e,n){const r=Y(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new Te(W.comparator);o=o.insert(i,rt.newNoDocument(i,X.min()));const l=re().add(i),u=new qu(X.min(),new Map,new Te(ne),o,l);await jE(r,u),r.du=r.du.remove(i),r.Au.delete(e),dp(r)}else await Cd(r.localStore,e,!1).then(()=>Pd(r,e,n)).catch(vi)}async function WP(t,e){const n=Y(t),r=e.batch.batchId;try{const s=await Zk(n.localStore,e);UE(n,r,null),ME(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await ma(n,s)}catch(s){await vi(s)}}async function GP(t,e,n){const r=Y(t);try{const s=await function(o,l){const u=Y(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(m=>(oe(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(c,m))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(r.localStore,e);UE(r,e,n),ME(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await ma(r,s)}catch(s){await vi(s)}}function ME(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function UE(t,e,n){const r=Y(t);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Pd(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(r=>{t.Ru.containsKey(r)||FE(t,r)})}function FE(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(sp(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),dp(t))}function r_(t,e,n){for(const r of n)r instanceof OE?(t.Ru.addReference(r.key,e),KP(t,r)):r instanceof VE?(H(hp,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||FE(t,r.key)):K(19791,{wu:r})}function KP(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(H(hp,"New document in limbo: "+n),t.Eu.add(r),dp(t))}function dp(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new W(ue.fromString(e)),r=t.fu.next();t.Au.set(r,new jP(n)),t.du=t.du.insert(n,r),AE(t.remoteStore,new Zn(an(Kf(n.path)),r,"TargetPurposeLimboResolution",Mu.ce))}}async function ma(t,e,n){const r=Y(t),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((l,u)=>{o.push(r.pu(u,e,n).then(c=>{var f;if((c||n)&&r.isPrimaryClient){const m=c?!c.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(c){s.push(c);const m=np.As(u.targetId,c);i.push(m)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(u,c){const f=Y(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>j.forEach(c,g=>j.forEach(g.Es,S=>f.persistence.referenceDelegate.addReference(m,g.targetId,S)).next(()=>j.forEach(g.ds,S=>f.persistence.referenceDelegate.removeReference(m,g.targetId,S)))))}catch(m){if(!wi(m))throw m;H(rp,"Failed to update sequence numbers: "+m)}for(const m of c){const g=m.targetId;if(!m.fromCache){const S=f.Ms.get(g),k=S.snapshotVersion,x=S.withLastLimboFreeSnapshotVersion(k);f.Ms=f.Ms.insert(g,x)}}}(r.localStore,i))}async function QP(t,e){const n=Y(t);if(!n.currentUser.isEqual(e)){H(hp,"User change. New user:",e.toKey());const r=await xE(n.localStore,e);n.currentUser=e,function(i,o){i.mu.forEach(l=>{l.forEach(u=>{u.reject(new z(L.CANCELLED,o))})}),i.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ma(n,r.Ls)}}function XP(t,e){const n=Y(t),r=n.Au.get(e);if(r&&r.hu)return re().add(r.key);{let s=re();const i=n.Iu.get(e);if(!i)return s;for(const o of i){const l=n.Tu.get(o);s=s.unionWith(l.view.nu)}return s}}function BE(t){const e=Y(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=jE.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=XP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=qP.bind(null,e),e.Pu.H_=bP.bind(null,e.eventManager),e.Pu.yu=DP.bind(null,e.eventManager),e}function YP(t){const e=Y(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=WP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=GP.bind(null,e),e}class uu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Wu(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return Jk(this.persistence,new Qk,e.initialUser,this.serializer)}Cu(e){return new IE(tp.mi,this.serializer)}Du(e){return new iP}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}uu.provider={build:()=>new uu};class JP extends uu{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){oe(this.persistence.referenceDelegate instanceof au,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Ok(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?ft.withCacheSize(this.cacheSizeBytes):ft.DEFAULT;return new IE(r=>au.mi(r,n),this.serializer)}}class Nd{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>n_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=QP.bind(null,this.syncEngine),await CP(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new kP}()}createDatastore(e){const n=Wu(e.databaseInfo.databaseId),r=function(i){return new cP(i)}(e.databaseInfo);return function(i,o,l,u){return new pP(i,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new gP(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>n_(this.syncEngine,n,0),function(){return Xy.v()?new Xy:new oP}())}createSyncEngine(e,n){return function(s,i,o,l,u,c,f){const m=new MP(s,i,o,l,u,c);return f&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=Y(s);H(ss,"RemoteStore shutting down."),i.Ea.add(5),await pa(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}Nd.provider={build:()=>new Nd};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZP{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):An("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir="FirestoreClient";class eN{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=tt.UNAUTHENTICATED,this.clientId=zf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{H(Ir,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(H(Ir,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Gr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=up(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ih(t,e){t.asyncQueue.verifyOperationInProgress(),H(Ir,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await xE(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function s_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await tN(t);H(Ir,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Jy(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Jy(e.remoteStore,s)),t._onlineComponents=e}async function tN(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){H(Ir,"Using user provided OfflineComponentProvider");try{await ih(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===L.FAILED_PRECONDITION||s.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;ai("Error using user provided cache. Falling back to memory cache: "+n),await ih(t,new uu)}}else H(Ir,"Using default OfflineComponentProvider"),await ih(t,new JP(void 0));return t._offlineComponents}async function zE(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(H(Ir,"Using user provided OnlineComponentProvider"),await s_(t,t._uninitializedComponentsProvider._online)):(H(Ir,"Using default OnlineComponentProvider"),await s_(t,new Nd))),t._onlineComponents}function nN(t){return zE(t).then(e=>e.syncEngine)}async function i_(t){const e=await zE(t),n=e.eventManager;return n.onListen=UP.bind(null,e.syncEngine),n.onUnlisten=zP.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=FP.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=$P.bind(null,e.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $E(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HE="firestore.googleapis.com",a_=!0;class l_{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new z(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=HE,this.ssl=a_}else this.host=e.host,this.ssl=e.ssl??a_;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=TE;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<bk)throw new z(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}gA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$E(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Qu{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new l_({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new z(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new l_(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new oA;switch(r.type){case"firstParty":return new cA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new z(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=o_.get(n);r&&(H("ComponentProvider","Removing Datastore"),o_.delete(n),r.terminate())}(this),Promise.resolve()}}function rN(t,e,n,r={}){var c;t=dr(t,Qu);const s=Cr(e),i=t._getSettings(),o={...i,emulatorOptions:t._getEmulatorOptions()},l=`${e}:${n}`;s&&(Lf(`https://${l}`),jf("Firestore",!0)),i.host!==HE&&i.host!==l&&ai("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:s,emulatorOptions:r};if(!ts(u,o)&&(t._setSettings(u),r.mockUserToken)){let f,m;if(typeof r.mockUserToken=="string")f=r.mockUserToken,m=tt.MOCK_USER;else{f=Ew(r.mockUserToken,(c=t._app)==null?void 0:c.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new z(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new tt(g)}t._authCredentials=new aA(new Ow(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ms(this.firestore,e,this._query)}}class Oe{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new fr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Oe(this.firestore,e,this._key)}toJSON(){return{type:Oe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(ha(n,Oe._jsonSchema))return new Oe(e,r||null,new W(ue.fromString(n.referencePath)))}}Oe._jsonSchemaVersion="firestore/documentReference/1.0",Oe._jsonSchema={type:De("string",Oe._jsonSchemaVersion),referencePath:De("string")};class fr extends ms{constructor(e,n,r){super(e,n,Kf(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Oe(this.firestore,null,new W(e))}withConverter(e){return new fr(this.firestore,e,this._path)}}function qE(t,e,...n){if(t=Ee(t),Vw("collection","path",e),t instanceof Qu){const r=ue.fromString(e,...n);return wy(r),new fr(t,null,r)}{if(!(t instanceof Oe||t instanceof fr))throw new z(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ue.fromString(e,...n));return wy(r),new fr(t.firestore,null,r)}}function ga(t,e,...n){if(t=Ee(t),arguments.length===1&&(e=zf.newId()),Vw("doc","path",e),t instanceof Qu){const r=ue.fromString(e,...n);return vy(r),new Oe(t,null,new W(r))}{if(!(t instanceof Oe||t instanceof fr))throw new z(L.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ue.fromString(e,...n));return vy(r),new Oe(t.firestore,t instanceof fr?t.converter:null,new W(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_="AsyncQueue";class c_{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new RE(this,"async_queue_retry"),this._c=()=>{const r=sh();r&&H(u_,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=sh();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=sh();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new Gr;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!wi(e))throw e;H(u_,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,An("INTERNAL UNHANDLED ERROR: ",h_(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const s=lp.createAndSchedule(this,e,n,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&K(47125,{Pc:h_(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function h_(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d_(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class fi extends Qu{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new c_,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new c_(e),this._firestoreClient=void 0,await e}}}function sN(t,e){const n=typeof t=="object"?t:Ff(),r=typeof t=="string"?t:tu,s=Lu(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=_w("firestore");i&&rN(s,...i)}return s}function WE(t){if(t._terminated)throw new z(L.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||iN(t),t._firestoreClient}function iN(t){var r,s,i;const e=t._freezeSettings(),n=function(l,u,c,f){return new CA(l,u,c,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,$E(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(t._databaseId,((r=t._app)==null?void 0:r.options.appId)||"",t._persistenceKey,e);t._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new eN(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Dt(Xe.fromBase64String(e))}catch(n){throw new z(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Dt(Xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Dt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ha(e,Dt._jsonSchema))return Dt.fromBase64String(e.bytes)}}Dt._jsonSchemaVersion="firestore/bytes/1.0",Dt._jsonSchema={type:De("string",Dt._jsonSchemaVersion),bytes:De("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new z(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new z(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new z(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ne(this._lat,e._lat)||ne(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:un._jsonSchemaVersion}}static fromJSON(e){if(ha(e,un._jsonSchema))return new un(e.latitude,e.longitude)}}un._jsonSchemaVersion="firestore/geoPoint/1.0",un._jsonSchema={type:De("string",un._jsonSchemaVersion),latitude:De("number"),longitude:De("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:cn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ha(e,cn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new cn(e.vectorValues);throw new z(L.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}cn._jsonSchemaVersion="firestore/vectorValue/1.0",cn._jsonSchema={type:De("string",cn._jsonSchemaVersion),vectorValues:De("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oN=/^__.*__$/;class aN{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new kr(e,this.data,this.fieldMask,n,this.fieldTransforms):new da(e,this.data,n,this.fieldTransforms)}}class GE{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new kr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function KE(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K(40011,{Ac:t})}}class pp{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new pp({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const n=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){var s;const n=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return cu(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(KE(this.Ac)&&oN.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class lN{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Wu(e)}Cc(e,n,r,s=!1){return new pp({Ac:e,methodName:n,Dc:r,path:Ge.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function mp(t){const e=t._freezeSettings(),n=Wu(t._databaseId);return new lN(t._databaseId,!!e.ignoreUndefinedProperties,n)}function uN(t,e,n,r,s,i={}){const o=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);gp("Data must be an object, but it was:",o,r);const l=QE(r,o);let u,c;if(i.merge)u=new It(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=bd(e,m,n);if(!o.contains(g))throw new z(L.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);YE(f,g)||f.push(g)}u=new It(f),c=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,c=o.fieldTransforms;return new aN(new mt(l),u,c)}class Yu extends fp{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Yu}}function cN(t,e,n,r){const s=t.Cc(1,e,n);gp("Data must be an object, but it was:",s,r);const i=[],o=mt.empty();Ar(r,(u,c)=>{const f=yp(e,u,n);c=Ee(c);const m=s.yc(f);if(c instanceof Yu)i.push(f);else{const g=ya(c,m);g!=null&&(i.push(f),o.set(f,g))}});const l=new It(i);return new GE(o,l,s.fieldTransforms)}function hN(t,e,n,r,s,i){const o=t.Cc(1,e,n),l=[bd(e,r,n)],u=[s];if(i.length%2!=0)throw new z(L.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(bd(e,i[g])),u.push(i[g+1]);const c=[],f=mt.empty();for(let g=l.length-1;g>=0;--g)if(!YE(c,l[g])){const S=l[g];let k=u[g];k=Ee(k);const x=o.yc(S);if(k instanceof Yu)c.push(S);else{const A=ya(k,x);A!=null&&(c.push(S),f.set(S,A))}}const m=new It(c);return new GE(f,m,o.fieldTransforms)}function dN(t,e,n,r=!1){return ya(n,t.Cc(r?4:3,e))}function ya(t,e){if(XE(t=Ee(t)))return gp("Unsupported field value:",e,t),QE(t,e);if(t instanceof fp)return function(r,s){if(!KE(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let u=ya(l,s.wc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Ee(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return XA(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=pe.fromDate(r);return{timestampValue:ou(s.serializer,i)}}if(r instanceof pe){const i=new pe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ou(s.serializer,i)}}if(r instanceof un)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Dt)return{bytesValue:mE(s.serializer,r._byteString)};if(r instanceof Oe){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Zf(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof cn)return function(o,l){return{mapValue:{fields:{[Hw]:{stringValue:qw},[nu]:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Sc("VectorValues must only contain numeric values.");return Qf(l.serializer,c)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${ju(r)}`)}(t,e)}function QE(t,e){const n={};return Mw(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ar(t,(r,s)=>{const i=ya(s,e.mc(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function XE(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof pe||t instanceof un||t instanceof Dt||t instanceof Oe||t instanceof fp||t instanceof cn)}function gp(t,e,n){if(!XE(n)||!Lw(n)){const r=ju(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function bd(t,e,n){if((e=Ee(e))instanceof Xu)return e._internalPath;if(typeof e=="string")return yp(t,e);throw cu("Field path arguments must be of type string or ",t,!1,void 0,n)}const fN=new RegExp("[~\\*/\\[\\]]");function yp(t,e,n){if(e.search(fN)>=0)throw cu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Xu(...e.split("."))._internalPath}catch{throw cu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function cu(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new z(L.INVALID_ARGUMENT,l+t+u)}function YE(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Oe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new pN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(_p("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class pN extends JE{data(){return super.data()}}function _p(t,e){return typeof e=="string"?yp(t,e):e instanceof Xu?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mN(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new z(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class vp{}class ZE extends vp{}function gN(t,e,...n){let r=[];e instanceof vp&&r.push(e),r=r.concat(n),function(i){const o=i.filter(u=>u instanceof Ep).length,l=i.filter(u=>u instanceof wp).length;if(o>1||o>0&&l>0)throw new z(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class wp extends ZE{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new wp(e,n,r)}_apply(e){const n=this._parse(e);return eT(e._query,n),new ms(e.firestore,e.converter,Ed(e._query,n))}_parse(e){const n=mp(e.firestore);return function(i,o,l,u,c,f,m){let g;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new z(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){p_(m,f);const k=[];for(const x of m)k.push(f_(u,i,x));g={arrayValue:{values:k}}}else g=f_(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||p_(m,f),g=dN(l,o,m,f==="in"||f==="not-in");return be.create(c,f,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class Ep extends vp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Ep(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Kt.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const u of l)eT(o,u),o=Ed(o,u)}(e._query,n),new ms(e.firestore,e.converter,Ed(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Tp extends ZE{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Tp(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new z(L.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new z(L.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Yo(i,o)}(e._query,this._field,this._direction);return new ms(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Ei(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function yN(t,e="asc"){const n=e,r=_p("orderBy",t);return Tp._create(r,n)}function f_(t,e,n){if(typeof(n=Ee(n))=="string"){if(n==="")throw new z(L.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Zw(e)&&n.indexOf("/")!==-1)throw new z(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(ue.fromString(n));if(!W.isDocumentKey(r))throw new z(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ay(t,new W(r))}if(n instanceof Oe)return Ay(t,n._key);throw new z(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ju(n)}.`)}function p_(t,e){if(!Array.isArray(t)||t.length===0)throw new z(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function eT(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new z(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new z(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class _N{convertValue(e,n="none"){switch(Er(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(wr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw K(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Ar(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var r,s,i;const n=(i=(s=(r=e.fields)==null?void 0:r[nu].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>Ae(o.doubleValue));return new cn(n)}convertGeoPoint(e){return new un(Ae(e.latitude),Ae(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Fu(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ko(e));default:return null}}convertTimestamp(e){const n=vr(e);return new pe(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=ue.fromString(e);oe(EE(r),9688,{name:e});const s=new Qo(r.get(1),r.get(3)),i=new W(r.popFirst(5));return s.isEqual(n)||An(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vN(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class lo{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Kr extends JE{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new El(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(_p("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new z(L.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Kr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Kr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Kr._jsonSchema={type:De("string",Kr._jsonSchemaVersion),bundleSource:De("string","DocumentSnapshot"),bundleName:De("string"),bundle:De("string")};class El extends Kr{data(e={}){return super.data(e)}}class Qs{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new lo(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new El(this._firestore,this._userDataWriter,r.key,r,new lo(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new z(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const u=new El(s._firestore,s._userDataWriter,l.doc.key,l.doc,new lo(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new El(s._firestore,s._userDataWriter,l.doc.key,l.doc,new lo(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:wN(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new z(L.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Qs._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=zf.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function wN(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K(61501,{type:t})}}Qs._jsonSchemaVersion="firestore/querySnapshot/1.0",Qs._jsonSchema={type:De("string",Qs._jsonSchemaVersion),bundleSource:De("string","QuerySnapshot"),bundleName:De("string"),bundle:De("string")};class tT extends _N{constructor(e){super(),this.firestore=e}convertBytes(e){return new Dt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Oe(this.firestore,null,n)}}function nT(t,e,n,...r){t=dr(t,Oe);const s=dr(t.firestore,fi),i=mp(s);let o;return o=typeof(e=Ee(e))=="string"||e instanceof Xu?hN(i,"updateDoc",t._key,e,n,r):cN(i,"updateDoc",t._key,e),Ip(s,[o.toMutation(t._key,Wt.exists(!0))])}function rT(t){return Ip(dr(t.firestore,fi),[new Xf(t._key,Wt.none())])}function sT(t,e){const n=dr(t.firestore,fi),r=ga(t),s=vN(t.converter,e);return Ip(n,[uN(mp(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Wt.exists(!1))]).then(()=>r)}function iT(t,...e){var u,c,f;t=Ee(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||d_(e[r])||(n=e[r++]);const s={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(d_(e[r])){const m=e[r];e[r]=(u=m.next)==null?void 0:u.bind(m),e[r+1]=(c=m.error)==null?void 0:c.bind(m),e[r+2]=(f=m.complete)==null?void 0:f.bind(m)}let i,o,l;if(t instanceof Oe)o=dr(t.firestore,fi),l=Kf(t._key.path),i={next:m=>{e[r]&&e[r](EN(o,t,m))},error:e[r+1],complete:e[r+2]};else{const m=dr(t,ms);o=dr(m.firestore,fi),l=m._query;const g=new tT(o);i={next:S=>{e[r]&&e[r](new Qs(o,g,m,S))},error:e[r+1],complete:e[r+2]},mN(t._query)}return function(g,S,k,x){const A=new ZP(x),E=new OP(S,A,k);return g.asyncQueue.enqueueAndForget(async()=>PP(await i_(g),E)),()=>{A.Nu(),g.asyncQueue.enqueueAndForget(async()=>NP(await i_(g),E))}}(WE(o),l,s,i)}function Ip(t,e){return function(r,s){const i=new Gr;return r.asyncQueue.enqueueAndForget(async()=>HP(await nN(r),s,i)),i.promise}(WE(t),e)}function EN(t,e,n){const r=n.docs.get(e._key),s=new tT(t);return new Kr(t,s,e._key,r,new lo(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(s){_i=s})(ds),ns(new yr("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new fi(new lA(r.getProvider("auth-internal")),new hA(o,r.getProvider("app-check-internal")),function(c,f){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new z(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Qo(c.options.projectId,f)}(o,s),o);return i={useFetchStreams:n,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),on(my,gy,e),on(my,gy,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oT="firebasestorage.googleapis.com",aT="storageBucket",TN=2*60*1e3,IN=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re extends pn{constructor(e,n,r=0){super(oh(e),`Firebase Storage: ${n} (${oh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Re.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return oh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Se;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Se||(Se={}));function oh(t){return"storage/"+t}function xp(){const t="An unknown error occurred, please check the error payload for server response.";return new Re(Se.UNKNOWN,t)}function xN(t){return new Re(Se.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function SN(t){return new Re(Se.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function RN(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Re(Se.UNAUTHENTICATED,t)}function CN(){return new Re(Se.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function AN(t){return new Re(Se.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function kN(){return new Re(Se.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function PN(){return new Re(Se.CANCELED,"User canceled the upload/download.")}function NN(t){return new Re(Se.INVALID_URL,"Invalid URL '"+t+"'.")}function bN(t){return new Re(Se.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function DN(){return new Re(Se.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+aT+"' property when initializing the app?")}function ON(){return new Re(Se.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function VN(){return new Re(Se.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function LN(t){return new Re(Se.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Dd(t){return new Re(Se.INVALID_ARGUMENT,t)}function lT(){return new Re(Se.APP_DELETED,"The Firebase app was deleted.")}function jN(t){return new Re(Se.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function xo(t,e){return new Re(Se.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function Ji(t){throw new Re(Se.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=xt.makeFromUrl(e,n)}catch{return new xt(e,"")}if(r.path==="")return r;throw bN(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(b){b.path.charAt(b.path.length-1)==="/"&&(b.path_=b.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function c(b){b.path_=decodeURIComponent(b.path)}const f="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",S=new RegExp(`^https?://${m}/${f}/b/${s}/o${g}`,"i"),k={bucket:1,path:3},x=n===oT?"(?:storage.googleapis.com|storage.cloud.google.com)":n,A="([^?#]*)",E=new RegExp(`^https?://${x}/${s}/${A}`,"i"),I=[{regex:l,indices:u,postModify:i},{regex:S,indices:k,postModify:c},{regex:E,indices:{bucket:1,path:2},postModify:c}];for(let b=0;b<I.length;b++){const M=I[b],N=M.regex.exec(e);if(N){const y=N[M.indices.bucket];let _=N[M.indices.path];_||(_=""),r=new xt(y,_),M.postModify(r);break}}if(r==null)throw NN(e);return r}}class MN{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UN(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function u(){return l===2}let c=!1;function f(...A){c||(c=!0,e.apply(null,A))}function m(A){s=setTimeout(()=>{s=null,t(S,u())},A)}function g(){i&&clearTimeout(i)}function S(A,...E){if(c){g();return}if(A){g(),f.call(null,A,...E);return}if(u()||o){g(),f.call(null,A,...E);return}r<64&&(r*=2);let I;l===1?(l=2,I=0):I=(r+Math.random())*1e3,m(I)}let k=!1;function x(A){k||(k=!0,g(),!c&&(s!==null?(A||(l=2),clearTimeout(s),m(0)):A||(l=1)))}return m(0),i=setTimeout(()=>{o=!0,x(!0)},n),x}function FN(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BN(t){return t!==void 0}function zN(t){return typeof t=="object"&&!Array.isArray(t)}function Sp(t){return typeof t=="string"||t instanceof String}function m_(t){return Rp()&&t instanceof Blob}function Rp(){return typeof Blob<"u"}function g_(t,e,n,r){if(r<e)throw Dd(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Dd(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cp(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function uT(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var Qr;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Qr||(Qr={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $N(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HN{constructor(e,n,r,s,i,o,l,u,c,f,m,g=!0,S=!1){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=f,this.connectionFactory_=m,this.retry=g,this.isUsingEmulator=S,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((k,x)=>{this.resolve_=k,this.reject_=x,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new tl(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===Qr.NO_ERROR,u=i.getStatus();if(!l||$N(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===Qr.ABORT;r(!1,new tl(!1,null,f));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new tl(c,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());BN(u)?i(u):i()}catch(u){o(u)}else if(l!==null){const u=xp();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(s.canceled){const u=this.appDelete_?lT():PN();o(u)}else{const u=kN();o(u)}};this.canceled_?n(!1,new tl(!1,null,!0)):this.backoffId_=UN(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&FN(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class tl{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function qN(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function WN(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function GN(t,e){e&&(t["X-Firebase-GMPID"]=e)}function KN(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function QN(t,e,n,r,s,i,o=!0,l=!1){const u=uT(t.urlParams),c=t.url+u,f=Object.assign({},t.headers);return GN(f,e),qN(f,n),WN(f,i),KN(f,r),new HN(c,t.method,f,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XN(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function YN(...t){const e=XN();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(Rp())return new Blob(t);throw new Re(Se.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function JN(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZN(t){if(typeof atob>"u")throw LN("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ah{constructor(e,n){this.data=e,this.contentType=n||null}}function e2(t,e){switch(t){case nn.RAW:return new ah(cT(e));case nn.BASE64:case nn.BASE64URL:return new ah(hT(t,e));case nn.DATA_URL:return new ah(n2(e),r2(e))}throw xp()}function cT(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=t.charCodeAt(++n);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function t2(t){let e;try{e=decodeURIComponent(t)}catch{throw xo(nn.DATA_URL,"Malformed data URL.")}return cT(e)}function hT(t,e){switch(t){case nn.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw xo(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case nn.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw xo(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=ZN(e)}catch(s){throw s.message.includes("polyfill")?s:xo(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class dT{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw xo(nn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=s2(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function n2(t){const e=new dT(t);return e.base64?hT(nn.BASE64,e.rest):t2(e.rest)}function r2(t){return new dT(t).contentType}function s2(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e,n){let r=0,s="";m_(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(m_(this.data_)){const r=this.data_,s=JN(r,e,n);return s===null?null:new qn(s)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new qn(r,!0)}}static getBlob(...e){if(Rp()){const n=e.map(r=>r instanceof qn?r.data_:r);return new qn(YN.apply(null,n))}else{const n=e.map(o=>Sp(o)?e2(nn.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(o=>{for(let l=0;l<o.length;l++)s[i++]=o[l]}),new qn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fT(t){let e;try{e=JSON.parse(t)}catch{return null}return zN(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i2(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function o2(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function pT(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a2(t,e){return e}class lt{constructor(e,n,r,s){this.server=e,this.local=n||e,this.writable=!!r,this.xform=s||a2}}let nl=null;function l2(t){return!Sp(t)||t.length<2?t:pT(t)}function mT(){if(nl)return nl;const t=[];t.push(new lt("bucket")),t.push(new lt("generation")),t.push(new lt("metageneration")),t.push(new lt("name","fullPath",!0));function e(i,o){return l2(o)}const n=new lt("name");n.xform=e,t.push(n);function r(i,o){return o!==void 0?Number(o):o}const s=new lt("size");return s.xform=r,t.push(s),t.push(new lt("timeCreated")),t.push(new lt("updated")),t.push(new lt("md5Hash",null,!0)),t.push(new lt("cacheControl",null,!0)),t.push(new lt("contentDisposition",null,!0)),t.push(new lt("contentEncoding",null,!0)),t.push(new lt("contentLanguage",null,!0)),t.push(new lt("contentType",null,!0)),t.push(new lt("metadata","customMetadata",!0)),nl=t,nl}function u2(t,e){function n(){const r=t.bucket,s=t.fullPath,i=new xt(r,s);return e._makeStorageReference(i)}Object.defineProperty(t,"ref",{get:n})}function c2(t,e,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const o=n[i];r[o.local]=o.xform(r,e[o.server])}return u2(r,t),r}function gT(t,e,n){const r=fT(e);return r===null?null:c2(t,r,n)}function h2(t,e,n,r){const s=fT(e);if(s===null||!Sp(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(c=>{const f=t.bucket,m=t.fullPath,g="/b/"+o(f)+"/o/"+o(m),S=Cp(g,n,r),k=uT({alt:"media",token:c});return S+k})[0]}function d2(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(n[i.server]=t[i.local])}return JSON.stringify(n)}class yT{constructor(e,n,r,s){this.url=e,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _T(t){if(!t)throw xp()}function f2(t,e){function n(r,s){const i=gT(t,s,e);return _T(i!==null),i}return n}function p2(t,e){function n(r,s){const i=gT(t,s,e);return _T(i!==null),h2(i,s,t.host,t._protocol)}return n}function vT(t){function e(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=CN():s=RN():n.getStatus()===402?s=SN(t.bucket):n.getStatus()===403?s=AN(t.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return e}function m2(t){const e=vT(t);function n(r,s){let i=e(r,s);return r.getStatus()===404&&(i=xN(t.path)),i.serverResponse=s.serverResponse,i}return n}function g2(t,e,n){const r=e.fullServerUrl(),s=Cp(r,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,l=new yT(s,i,p2(t,n),o);return l.errorHandler=m2(e),l}function y2(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function _2(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=y2(null,e)),r}function v2(t,e,n,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let I="";for(let b=0;b<2;b++)I=I+Math.random().toString().slice(2);return I}const u=l();o["Content-Type"]="multipart/related; boundary="+u;const c=_2(e,r,s),f=d2(c,n),m="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,g=`\r
--`+u+"--",S=qn.getBlob(m,r,g);if(S===null)throw ON();const k={name:c.fullPath},x=Cp(i,t.host,t._protocol),A="POST",E=t.maxUploadRetryTime,w=new yT(x,A,f2(t,n),E);return w.urlParams=k,w.headers=o,w.body=S.uploadData(),w.errorHandler=vT(e),w}class w2{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Qr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Qr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Qr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,s,i){if(this.sent_)throw Ji("cannot .send() more than once");if(Cr(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Ji("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Ji("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Ji("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Ji("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class E2 extends w2{initXhr(){this.xhr_.responseType="text"}}function wT(){return new E2}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,n){this._service=e,n instanceof xt?this._location=n:this._location=xt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new is(e,n)}get root(){const e=new xt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return pT(this._location.path)}get storage(){return this._service}get parent(){const e=i2(this._location.path);if(e===null)return null;const n=new xt(this._location.bucket,e);return new is(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw jN(e)}}function T2(t,e,n){t._throwIfRoot("uploadBytes");const r=v2(t.storage,t._location,mT(),new qn(e,!0),n);return t.storage.makeRequestWithTokens(r,wT).then(s=>({metadata:s,ref:t}))}function I2(t){t._throwIfRoot("getDownloadURL");const e=g2(t.storage,t._location,mT());return t.storage.makeRequestWithTokens(e,wT).then(n=>{if(n===null)throw VN();return n})}function x2(t,e){const n=o2(t._location.path,e),r=new xt(t._location.bucket,n);return new is(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S2(t){return/^[A-Za-z]+:\/\//.test(t)}function R2(t,e){return new is(t,e)}function ET(t,e){if(t instanceof Ap){const n=t;if(n._bucket==null)throw DN();const r=new is(n,n._bucket);return e!=null?ET(r,e):r}else return e!==void 0?x2(t,e):t}function C2(t,e){if(e&&S2(e)){if(t instanceof Ap)return R2(t,e);throw Dd("To use ref(service, url), the first argument must be a Storage instance.")}else return ET(t,e)}function y_(t,e){const n=e==null?void 0:e[aT];return n==null?null:xt.makeFromBucketSpec(n,t)}function A2(t,e,n,r={}){t.host=`${e}:${n}`;const s=Cr(e);s&&(Lf(`https://${t.host}/b`),jf("Storage",!0)),t._isUsingEmulator=!0,t._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(t._overrideAuthToken=typeof i=="string"?i:Ew(i,t.app.options.projectId))}class Ap{constructor(e,n,r,s,i,o=!1){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=oT,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=TN,this._maxUploadRetryTime=IN,this._requests=new Set,s!=null?this._bucket=xt.makeFromBucketSpec(s,this._host):this._bucket=y_(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=xt.makeFromBucketSpec(this._url,e):this._bucket=y_(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){g_("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){g_("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(bt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new is(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new MN(lT());{const o=QN(e,this._appId,r,s,n,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const __="@firebase/storage",v_="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TT="storage";function k2(t,e,n){return t=Ee(t),T2(t,e,n)}function P2(t){return t=Ee(t),I2(t)}function N2(t,e){return t=Ee(t),C2(t,e)}function b2(t=Ff(),e){t=Ee(t);const r=Lu(t,TT).getImmediate({identifier:e}),s=_w("storage");return s&&D2(r,...s),r}function D2(t,e,n,r={}){A2(t,e,n,r)}function O2(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new Ap(n,r,s,e,ds)}function V2(){ns(new yr(TT,O2,"PUBLIC").setMultipleInstances(!0)),on(__,v_,""),on(__,v_,"esm2020")}V2();function IT(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const L2=IT,xT=new ua("auth","Firebase",IT());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu=new Mf("@firebase/auth");function j2(t,...e){hu.logLevel<=te.WARN&&hu.warn(`Auth (${ds}): ${t}`,...e)}function Tl(t,...e){hu.logLevel<=te.ERROR&&hu.error(`Auth (${ds}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(t,...e){throw kp(t,...e)}function hn(t,...e){return kp(t,...e)}function ST(t,e,n){const r={...L2(),[e]:n};return new ua("auth","Firebase",r).create(e,{appName:t.name})}function pr(t){return ST(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function kp(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return xT.create(t,...e)}function G(t,e,...n){if(!t)throw kp(e,...n)}function wn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Tl(e),new Error(e)}function Pn(t,e){t||wn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Od(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function M2(){return w_()==="http:"||w_()==="https:"}function w_(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U2(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(M2()||jR()||"connection"in navigator)?navigator.onLine:!0}function F2(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,n){this.shortDelay=e,this.longDelay=n,Pn(n>e,"Short delay should be less than long delay!"),this.isMobile=OR()||MR()}get(){return U2()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(t,e){Pn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B2={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z2=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],$2=new _a(3e4,6e4);function gs(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Pr(t,e,n,r,s={}){return CT(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=ca({key:t.config.apiKey,...o}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:u,...i};return LR()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&Cr(t.emulatorConfig.host)&&(c.credentials="include"),RT.fetch()(await AT(t,t.config.apiHost,n,l),c)})}async function CT(t,e,n){t._canInitEmulator=!1;const r={...B2,...e};try{const s=new q2(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw rl(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw rl(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw rl(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw rl(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw ST(t,f,c);Qt(t,f)}}catch(s){if(s instanceof pn)throw s;Qt(t,"network-request-failed",{message:String(s)})}}async function Ju(t,e,n,r,s={}){const i=await Pr(t,e,n,r,s);return"mfaPendingCredential"in i&&Qt(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function AT(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?Pp(t.config,s):`${t.config.apiScheme}://${s}`;return z2.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function H2(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class q2{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(hn(this.auth,"network-request-failed")),$2.get())})}}function rl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=hn(t,e,r);return s.customData._tokenResponse=n,s}function E_(t){return t!==void 0&&t.enterprise!==void 0}class W2{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return H2(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function G2(t,e){return Pr(t,"GET","/v2/recaptchaConfig",gs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K2(t,e){return Pr(t,"POST","/v1/accounts:delete",e)}async function du(t,e){return Pr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function So(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Q2(t,e=!1){const n=Ee(t),r=await n.getIdToken(e),s=Np(r);G(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:So(lh(s.auth_time)),issuedAtTime:So(lh(s.iat)),expirationTime:So(lh(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function lh(t){return Number(t)*1e3}function Np(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Tl("JWT malformed, contained fewer than 3 sections"),null;try{const s=gw(n);return s?JSON.parse(s):(Tl("Failed to decode base64 JWT payload"),null)}catch(s){return Tl("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function T_(t){const e=Np(t);return G(e,"internal-error"),G(typeof e.exp<"u","internal-error"),G(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ea(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof pn&&X2(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function X2({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y2{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=So(this.lastLoginAt),this.creationTime=So(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fu(t){var m;const e=t.auth,n=await t.getIdToken(),r=await ea(t,du(e,{idToken:n}));G(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=(m=s.providerUserInfo)!=null&&m.length?kT(s.providerUserInfo):[],o=Z2(t.providerData,i),l=t.isAnonymous,u=!(t.email&&s.passwordHash)&&!(o!=null&&o.length),c=l?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Vd(s.createdAt,s.lastLoginAt),isAnonymous:c};Object.assign(t,f)}async function J2(t){const e=Ee(t);await fu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Z2(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function kT(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eb(t,e){const n=await CT(t,{},async()=>{const r=ca({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await AT(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return t.emulatorConfig&&Cr(t.emulatorConfig.host)&&(u.credentials="include"),RT.fetch()(o,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function tb(t,e){return Pr(t,"POST","/v2/accounts:revokeToken",gs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){G(e.idToken,"internal-error"),G(typeof e.idToken<"u","internal-error"),G(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):T_(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){G(e.length!==0,"internal-error");const n=T_(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(G(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await eb(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Xs;return r&&(G(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(G(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(G(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Xs,this.toJSON())}_performRefresh(){return wn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t,e){G(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class $t{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Y2(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Vd(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await ea(this,this.stsTokenManager.getToken(this.auth,e));return G(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Q2(this,e)}reload(){return J2(this)}_assign(e){this!==e&&(G(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new $t({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){G(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await fu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(bt(this.auth.app))return Promise.reject(pr(this.auth));const e=await this.getIdToken();return await ea(this,K2(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,l=n.tenantId??void 0,u=n._redirectEventId??void 0,c=n.createdAt??void 0,f=n.lastLoginAt??void 0,{uid:m,emailVerified:g,isAnonymous:S,providerData:k,stsTokenManager:x}=n;G(m&&x,e,"internal-error");const A=Xs.fromJSON(this.name,x);G(typeof m=="string",e,"internal-error"),Fn(r,e.name),Fn(s,e.name),G(typeof g=="boolean",e,"internal-error"),G(typeof S=="boolean",e,"internal-error"),Fn(i,e.name),Fn(o,e.name),Fn(l,e.name),Fn(u,e.name),Fn(c,e.name),Fn(f,e.name);const E=new $t({uid:m,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:S,photoURL:o,phoneNumber:i,tenantId:l,stsTokenManager:A,createdAt:c,lastLoginAt:f});return k&&Array.isArray(k)&&(E.providerData=k.map(w=>({...w}))),u&&(E._redirectEventId=u),E}static async _fromIdTokenResponse(e,n,r=!1){const s=new Xs;s.updateFromServerResponse(n);const i=new $t({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await fu(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];G(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?kT(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Xs;l.updateFromIdToken(r);const u=new $t({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Vd(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_=new Map;function En(t){Pn(t instanceof Function,"Expected a class definition");let e=I_.get(t);return e?(Pn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,I_.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}PT.type="NONE";const x_=PT;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(t,e,n){return`firebase:${t}:${e}:${n}`}class Ys{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Il(this.userKey,s.apiKey,i),this.fullPersistenceKey=Il("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await du(this.auth,{idToken:e}).catch(()=>{});return n?$t._fromGetAccountInfoResponse(this.auth,n,e):null}return $t._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ys(En(x_),e,r);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||En(x_);const o=Il(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const f=await c._get(o);if(f){let m;if(typeof f=="string"){const g=await du(e,{idToken:f}).catch(()=>{});if(!g)break;m=await $t._fromGetAccountInfoResponse(e,g,f)}else m=$t._fromJSON(e,f);c!==i&&(l=m),i=c;break}}catch{}const u=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Ys(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new Ys(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S_(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(OT(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(NT(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(LT(e))return"Blackberry";if(jT(e))return"Webos";if(bT(e))return"Safari";if((e.includes("chrome/")||DT(e))&&!e.includes("edge/"))return"Chrome";if(VT(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function NT(t=it()){return/firefox\//i.test(t)}function bT(t=it()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function DT(t=it()){return/crios\//i.test(t)}function OT(t=it()){return/iemobile/i.test(t)}function VT(t=it()){return/android/i.test(t)}function LT(t=it()){return/blackberry/i.test(t)}function jT(t=it()){return/webos/i.test(t)}function bp(t=it()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function nb(t=it()){var e;return bp(t)&&!!((e=window.navigator)!=null&&e.standalone)}function rb(){return UR()&&document.documentMode===10}function MT(t=it()){return bp(t)||VT(t)||jT(t)||LT(t)||/windows phone/i.test(t)||OT(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UT(t,e=[]){let n;switch(t){case"Browser":n=S_(it());break;case"Worker":n=`${S_(it())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ds}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ib(t,e={}){return Pr(t,"GET","/v2/passwordPolicy",gs(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ob=6;class ab{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??ob,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lb{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new R_(this),this.idTokenSubscription=new R_(this),this.beforeStateQueue=new sb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xT,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=En(n)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Ys.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await du(this,{idToken:e}),r=await $t._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(bt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return G(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await fu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=F2()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(bt(this.app))return Promise.reject(pr(this));const n=e?Ee(e):null;return n&&G(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&G(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return bt(this.app)?Promise.reject(pr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return bt(this.app)?Promise.reject(pr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(En(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ib(this),n=new ab(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ua("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await tb(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&En(e)||this._popupRedirectResolver;G(n,this,"argument-error"),this.redirectPersistenceManager=await Ys.create(this,[En(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(G(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return G(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=UT(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(bt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&j2(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Ii(t){return Ee(t)}class R_{constructor(e){this.auth=e,this.observer=null,this.addObserver=GR(n=>this.observer=n)}get next(){return G(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ub(t){Zu=t}function FT(t){return Zu.loadJS(t)}function cb(){return Zu.recaptchaEnterpriseScript}function hb(){return Zu.gapiScript}function db(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class fb{constructor(){this.enterprise=new pb}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class pb{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const mb="recaptcha-enterprise",BT="NO_RECAPTCHA";class gb{constructor(e){this.type=mb,this.auth=Ii(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{G2(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new W2(u);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function s(i,o,l){const u=window.grecaptcha;E_(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(c=>{o(c)}).catch(()=>{o(BT)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new fb().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&E_(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=cb();u.length!==0&&(u+=l),FT(u).then(()=>{s(l,i,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function C_(t,e,n,r=!1,s=!1){const i=new gb(t);let o;if(s)o=BT;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const l={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,c=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function A_(t,e,n,r,s){var i;if((i=t._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await C_(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await C_(t,e,n,n==="getOobCode");return r(t,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yb(t,e){const n=Lu(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(ts(i,e??{}))return s;Qt(s,"already-initialized")}return n.initialize({options:e})}function _b(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(En);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function vb(t,e,n){const r=Ii(t);G(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=zT(e),{host:o,port:l}=wb(e),u=l===null?"":`:${l}`,c={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){G(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),G(ts(c,r.config.emulator)&&ts(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=c,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Cr(o)?(Lf(`${i}//${o}${u}`),jf("Auth",!0)):Eb()}function zT(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function wb(t){const e=zT(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:k_(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:k_(o)}}}function k_(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Eb(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return wn("not implemented")}_getIdTokenResponse(e){return wn("not implemented")}_linkToIdToken(e,n){return wn("not implemented")}_getReauthenticationResolver(e){return wn("not implemented")}}async function Tb(t,e){return Pr(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ib(t,e){return Ju(t,"POST","/v1/accounts:signInWithPassword",gs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xb(t,e){return Ju(t,"POST","/v1/accounts:signInWithEmailLink",gs(t,e))}async function Sb(t,e){return Ju(t,"POST","/v1/accounts:signInWithEmailLink",gs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta extends Dp{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new ta(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new ta(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return A_(e,n,"signInWithPassword",Ib);case"emailLink":return xb(e,{email:this._email,oobCode:this._password});default:Qt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return A_(e,r,"signUpPassword",Tb);case"emailLink":return Sb(e,{idToken:n,email:this._email,oobCode:this._password});default:Qt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Js(t,e){return Ju(t,"POST","/v1/accounts:signInWithIdp",gs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb="http://localhost";class os extends Dp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new os(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Qt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const o=new os(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Js(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Js(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Js(e,n)}buildRequest(){const e={requestUri:Rb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ca(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cb(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ab(t){const e=ro(so(t)).link,n=e?ro(so(e)).deep_link_id:null,r=ro(so(t)).deep_link_id;return(r?ro(so(r)).link:null)||r||n||e||t}class Op{constructor(e){const n=ro(so(e)),r=n.apiKey??null,s=n.oobCode??null,i=Cb(n.mode??null);G(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=Ab(e);try{return new Op(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(){this.providerId=xi.PROVIDER_ID}static credential(e,n){return ta._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Op.parseLink(n);return G(r,"argument-error"),ta._fromEmailAndCode(e,r.code,r.tenantId)}}xi.PROVIDER_ID="password";xi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";xi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va extends $T{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends va{constructor(){super("facebook.com")}static credential(e){return os._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends va{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return os._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Gn.credential(n,r)}catch{return null}}}Gn.GOOGLE_SIGN_IN_METHOD="google.com";Gn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn extends va{constructor(){super("github.com")}static credential(e){return os._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kn.credential(e.oauthAccessToken)}catch{return null}}}Kn.GITHUB_SIGN_IN_METHOD="github.com";Kn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn extends va{constructor(){super("twitter.com")}static credential(e,n){return os._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Qn.credential(n,r)}catch{return null}}}Qn.TWITTER_SIGN_IN_METHOD="twitter.com";Qn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await $t._fromIdTokenResponse(e,r,s),o=P_(r);return new pi({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=P_(r);return new pi({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function P_(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu extends pn{constructor(e,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,pu.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new pu(e,n,r,s)}}function HT(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?pu._fromErrorAndOperation(t,i,e,r):i})}async function kb(t,e,n=!1){const r=await ea(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return pi._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pb(t,e,n=!1){const{auth:r}=t;if(bt(r.app))return Promise.reject(pr(r));const s="reauthenticate";try{const i=await ea(t,HT(r,s,e,t),n);G(i.idToken,r,"internal-error");const o=Np(i.idToken);G(o,r,"internal-error");const{sub:l}=o;return G(t.uid===l,r,"user-mismatch"),pi._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Qt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qT(t,e,n=!1){if(bt(t.app))return Promise.reject(pr(t));const r="signIn",s=await HT(t,r,e),i=await pi._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function Nb(t,e){return qT(Ii(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bb(t){const e=Ii(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Db(t,e,n){return bt(t.app)?Promise.reject(pr(t)):Nb(Ee(t),xi.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&bb(t),r})}function Ob(t,e,n,r){return Ee(t).onIdTokenChanged(e,n,r)}function Vb(t,e,n){return Ee(t).beforeAuthStateChanged(e,n)}function Lb(t,e,n,r){return Ee(t).onAuthStateChanged(e,n,r)}function jb(t){return Ee(t).signOut()}const mu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(mu,"1"),this.storage.removeItem(mu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb=1e3,Ub=10;class GT extends WT{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=MT(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);rb()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ub):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Mb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}GT.type="LOCAL";const Fb=GT;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT extends WT{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}KT.type="SESSION";const QT=KT;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bb(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ec(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async c=>c(n.origin,i)),u=await Bb(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ec.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vp(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const c=Vp("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===c)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(){return window}function $b(t){dn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XT(){return typeof dn().WorkerGlobalScope<"u"&&typeof dn().importScripts=="function"}async function Hb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function qb(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function Wb(){return XT()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YT="firebaseLocalStorageDb",Gb=1,gu="firebaseLocalStorage",JT="fbase_key";class wa{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function tc(t,e){return t.transaction([gu],e?"readwrite":"readonly").objectStore(gu)}function Kb(){const t=indexedDB.deleteDatabase(YT);return new wa(t).toPromise()}function Ld(){const t=indexedDB.open(YT,Gb);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(gu,{keyPath:JT})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(gu)?e(r):(r.close(),await Kb(),e(await Ld()))})})}async function N_(t,e,n){const r=tc(t,!0).put({[JT]:e,value:n});return new wa(r).toPromise()}async function Qb(t,e){const n=tc(t,!1).get(e),r=await new wa(n).toPromise();return r===void 0?null:r.value}function b_(t,e){const n=tc(t,!0).delete(e);return new wa(n).toPromise()}const Xb=800,Yb=3;class ZT{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ld(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Yb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return XT()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ec._getInstance(Wb()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await Hb(),!this.activeServiceWorker)return;this.sender=new zb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||qb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ld();return await N_(e,mu,"1"),await b_(e,mu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>N_(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Qb(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>b_(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=tc(s,!1).getAll();return new wa(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ZT.type="LOCAL";const Jb=ZT;new _a(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zb(t,e){return e?En(e):(G(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp extends Dp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Js(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Js(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Js(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function eD(t){return qT(t.auth,new Lp(t),t.bypassAuthState)}function tD(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),Pb(n,new Lp(t),t.bypassAuthState)}async function nD(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),kb(n,new Lp(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return eD;case"linkViaPopup":case"linkViaRedirect":return nD;case"reauthViaPopup":case"reauthViaRedirect":return tD;default:Qt(this.auth,"internal-error")}}resolve(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rD=new _a(2e3,1e4);class Us extends eI{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Us.currentPopupAction&&Us.currentPopupAction.cancel(),Us.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return G(e,this.auth,"internal-error"),e}async onExecution(){Pn(this.filter.length===1,"Popup operations only handle one event");const e=Vp();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(hn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(hn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Us.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(hn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,rD.get())};e()}}Us.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sD="pendingRedirect",xl=new Map;class iD extends eI{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=xl.get(this.auth._key());if(!e){try{const r=await oD(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}xl.set(this.auth._key(),e)}return this.bypassAuthState||xl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function oD(t,e){const n=uD(e),r=lD(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function aD(t,e){xl.set(t._key(),e)}function lD(t){return En(t._redirectPersistence)}function uD(t){return Il(sD,t.config.apiKey,t.name)}async function cD(t,e,n=!1){if(bt(t.app))return Promise.reject(pr(t));const r=Ii(t),s=Zb(r,e),o=await new iD(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hD=10*60*1e3;class dD{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!fD(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!tI(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(hn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hD&&this.cachedEventUids.clear(),this.cachedEventUids.has(D_(e))}saveEventToCache(e){this.cachedEventUids.add(D_(e)),this.lastProcessedEventTime=Date.now()}}function D_(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function tI({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function fD(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tI(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pD(t,e={}){return Pr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mD=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gD=/^https?/;async function yD(t){if(t.config.emulator)return;const{authorizedDomains:e}=await pD(t);for(const n of e)try{if(_D(n))return}catch{}Qt(t,"unauthorized-domain")}function _D(t){const e=Od(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!gD.test(n))return!1;if(mD.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vD=new _a(3e4,6e4);function O_(){const t=dn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function wD(t){return new Promise((e,n)=>{var s,i,o;function r(){O_(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{O_(),n(hn(t,"network-request-failed"))},timeout:vD.get()})}if((i=(s=dn().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=dn().gapi)!=null&&o.load)r();else{const l=db("iframefcb");return dn()[l]=()=>{gapi.load?r():n(hn(t,"network-request-failed"))},FT(`${hb()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Sl=null,e})}let Sl=null;function ED(t){return Sl=Sl||wD(t),Sl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TD=new _a(5e3,15e3),ID="__/auth/iframe",xD="emulator/auth/iframe",SD={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},RD=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function CD(t){const e=t.config;G(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Pp(e,xD):`https://${t.config.authDomain}/${ID}`,r={apiKey:e.apiKey,appName:t.name,v:ds},s=RD.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ca(r).slice(1)}`}async function AD(t){const e=await ED(t),n=dn().gapi;return G(n,t,"internal-error"),e.open({where:document.body,url:CD(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:SD,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=hn(t,"network-request-failed"),l=dn().setTimeout(()=>{i(o)},TD.get());function u(){dn().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kD={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},PD=500,ND=600,bD="_blank",DD="http://localhost";class V_{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function OD(t,e,n,r=PD,s=ND){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...kD,width:r.toString(),height:s.toString(),top:i,left:o},c=it().toLowerCase();n&&(l=DT(c)?bD:n),NT(c)&&(e=e||DD,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[S,k])=>`${g}${S}=${k},`,"");if(nb(c)&&l!=="_self")return VD(e||"",l),new V_(null);const m=window.open(e||"",l,f);G(m,t,"popup-blocked");try{m.focus()}catch{}return new V_(m)}function VD(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LD="__/auth/handler",jD="emulator/auth/handler",MD=encodeURIComponent("fac");async function L_(t,e,n,r,s,i){G(t.config.authDomain,t,"auth-domain-config-required"),G(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ds,eventId:s};if(e instanceof $T){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",WR(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof va){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),c=u?`#${MD}=${encodeURIComponent(u)}`:"";return`${UD(t)}?${ca(l).slice(1)}${c}`}function UD({config:t}){return t.emulator?Pp(t,jD):`https://${t.authDomain}/${LD}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh="webStorageSupport";class FD{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=QT,this._completeRedirectFn=cD,this._overrideRedirectResult=aD}async _openPopup(e,n,r,s){var o;Pn((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await L_(e,n,r,Od(),s);return OD(e,i,Vp())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await L_(e,n,r,Od(),s);return $b(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Pn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await AD(e),r=new dD(e);return n.register("authEvent",s=>(G(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(uh,{type:uh},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[uh];i!==void 0&&n(!!i),Qt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=yD(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return MT()||bT()||bp()}}const BD=FD;var j_="@firebase/auth",M_="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zD{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){G(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $D(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function HD(t){ns(new yr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;G(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:UT(t)},c=new lb(r,s,i,u);return _b(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),ns(new yr("auth-internal",e=>{const n=Ii(e.getProvider("auth").getImmediate());return(r=>new zD(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),on(j_,M_,$D(t)),on(j_,M_,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qD=5*60,WD=ww("authIdTokenMaxAge")||qD;let U_=null;const GD=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>WD)return;const s=n==null?void 0:n.token;U_!==s&&(U_=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function KD(t=Ff()){const e=Lu(t,"auth");if(e.isInitialized())return e.getImmediate();const n=yb(t,{popupRedirectResolver:BD,persistence:[Jb,Fb,QT]}),r=ww("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=GD(i.toString());Vb(n,o,()=>o(n.currentUser)),Ob(n,l=>o(l))}}const s=yw("auth");return s&&vb(n,`http://${s}`),n}function QD(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}ub({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=hn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",QD().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});HD("Browser");const XD={apiKey:"AIzaSyC7OMYC7enoEkTsBzliRWiyHklQ9H92EKk",authDomain:"docsimplesreports.firebaseapp.com",projectId:"docsimplesreports",storageBucket:"docsimplesreports.firebasestorage.app",messagingSenderId:"37293480302",appId:"1:37293480302:web:ffac0bdc2f2e69985a897f",measurementId:"G-S9FLRP8T6N"},jp=xw(XD),Si=sN(jp),YD=b2(jp),Mp=KD(jp),nI=qE(Si,"testDocuments"),rI=qE(Si,"requirements"),JD=async t=>{const e={...t,createdAt:new Date().toISOString()};return{id:(await sT(nI,e)).id,...e}},ZD=async(t,e)=>{const n=ga(Si,"testDocuments",t);await nT(n,e)},eO=async t=>{const e=ga(Si,"testDocuments",t);await rT(e)},tO=t=>{const e=gN(nI,yN("createdAt","desc"));return iT(e,n=>{const r=n.docs.map(s=>({id:s.id,...s.data()}));t(r)})},nO=async t=>({id:(await sT(rI,t)).id,...t}),rO=async(t,e)=>{const n=ga(Si,"requirements",t);await nT(n,e)},sO=async t=>{const e=ga(Si,"requirements",t);await rT(e)},iO=t=>iT(rI,e=>{const n=e.docs.map(r=>({id:r.id,...r.data()}));t(n)}),oO=async(t,e)=>{const n=Date.now(),r=`screenshots/${e}/${n}_${t.name}`,s=N2(YD,r);return await k2(s,t),{url:await P2(s),path:r,name:t.name,uploadedAt:new Date().toISOString()}},aO=async(t,e)=>(await Db(Mp,t,e)).user,lO=async()=>{await jb(Mp)},uO=t=>Lb(Mp,t);function cO({onSave:t}){const e=ow(),[n,r]=U.useState(!1),[s,i]=U.useState([]),[o,l]=U.useState(!1),[u,c]=U.useState(null),[f,m]=U.useState({title:"",feature:"",module:"",testType:"funcional",priority:"media",status:"pendente",tester:"",environment:"",preconditions:"",steps:[{action:"",expectedResult:"",actualResult:"",status:"pendente"}],observations:"",evidences:"",elements:[{name:"",selector:"",type:"button"}]}),g=N=>{const{name:y,value:_}=N.target;m({...f,[y]:_})},S=(N,y,_)=>{const T=[...f.steps];T[N][y]=_,m({...f,steps:T})},k=()=>{m({...f,steps:[...f.steps,{action:"",expectedResult:"",actualResult:"",status:"pendente"}]})},x=N=>{if(f.steps.length>1){const y=f.steps.filter((_,T)=>T!==N);m({...f,steps:y})}},A=(N,y,_)=>{const T=[...f.elements];T[N][y]=_,m({...f,elements:T})},E=()=>{m({...f,elements:[...f.elements,{name:"",selector:"",type:"button"}]})},w=N=>{if(f.elements.length>1){const y=f.elements.filter((_,T)=>T!==N);m({...f,elements:y})}},I=async N=>{const y=Array.from(N.target.files);if(y.length!==0){l(!0),c(null);try{const _=Date.now().toString(),T=y.map(P=>oO(P,_)),C=await Promise.all(T);i([...s,...C])}catch(_){console.error("Erro ao fazer upload:",_),c("Erro ao fazer upload das imagens. Verifique se o Firebase Storage está configurado.")}finally{l(!1)}}},b=N=>{i(s.filter((y,_)=>_!==N))},M=N=>{N.preventDefault();const y={...f,screenshots:s};t(y),r(!0),setTimeout(()=>{e("/documentos")},1500)};return n?d.jsxs("div",{className:"flex flex-col items-center justify-center py-20",children:[d.jsx(ad,{className:"w-16 h-16 text-green-500 mb-4"}),d.jsx("h2",{className:"text-2xl font-bold text-gray-900",children:"Teste Registrado!"}),d.jsx("p",{className:"text-gray-600 mt-2",children:"Redirecionando para documentos..."})]}):d.jsxs("div",{className:"max-w-4xl mx-auto",children:[d.jsxs("div",{className:"mb-6",children:[d.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Registrar Teste de Homologação"}),d.jsx("p",{className:"text-gray-600 mt-1",children:"Preencha os dados do teste realizado"})]}),d.jsxs("form",{onSubmit:M,className:"space-y-6",children:[d.jsxs("div",{className:"card",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Informações Básicas"}),d.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Título do Teste *"}),d.jsx("input",{type:"text",name:"title",value:f.title,onChange:g,className:"input-field",placeholder:"Ex: Validar login com credenciais válidas",required:!0})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Feature/Funcionalidade *"}),d.jsx("input",{type:"text",name:"feature",value:f.feature,onChange:g,className:"input-field",placeholder:"Ex: Autenticação",required:!0})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Módulo"}),d.jsx("input",{type:"text",name:"module",value:f.module,onChange:g,className:"input-field",placeholder:"Ex: Usuários"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Testador *"}),d.jsx("input",{type:"text",name:"tester",value:f.tester,onChange:g,className:"input-field",placeholder:"Nome do testador",required:!0})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Tipo de Teste"}),d.jsxs("select",{name:"testType",value:f.testType,onChange:g,className:"input-field",children:[d.jsx("option",{value:"funcional",children:"Funcional"}),d.jsx("option",{value:"exploratorio",children:"Exploratório"}),d.jsx("option",{value:"regressao",children:"Regressão"}),d.jsx("option",{value:"integracao",children:"Integração"}),d.jsx("option",{value:"usabilidade",children:"Usabilidade"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Prioridade"}),d.jsxs("select",{name:"priority",value:f.priority,onChange:g,className:"input-field",children:[d.jsx("option",{value:"baixa",children:"Baixa"}),d.jsx("option",{value:"media",children:"Média"}),d.jsx("option",{value:"alta",children:"Alta"}),d.jsx("option",{value:"critica",children:"Crítica"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Status"}),d.jsxs("select",{name:"status",value:f.status,onChange:g,className:"input-field",children:[d.jsx("option",{value:"pendente",children:"Pendente"}),d.jsx("option",{value:"aprovado",children:"Aprovado"}),d.jsx("option",{value:"reprovado",children:"Reprovado"}),d.jsx("option",{value:"bloqueado",children:"Bloqueado"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Ambiente"}),d.jsx("input",{type:"text",name:"environment",value:f.environment,onChange:g,className:"input-field",placeholder:"Ex: Homologação, Staging"})]})]})]}),d.jsxs("div",{className:"card",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Pré-condições"}),d.jsx("textarea",{name:"preconditions",value:f.preconditions,onChange:g,className:"textarea-field",rows:"3",placeholder:"Descreva as pré-condições necessárias para executar o teste..."})]}),d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Passos do Teste"}),d.jsxs("button",{type:"button",onClick:k,className:"btn-secondary flex items-center space-x-1 text-sm",children:[d.jsx(ud,{className:"w-4 h-4"}),d.jsx("span",{children:"Adicionar Passo"})]})]}),d.jsx("div",{className:"space-y-4",children:f.steps.map((N,y)=>d.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 relative",children:[d.jsxs("div",{className:"flex items-center justify-between mb-3",children:[d.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Passo ",y+1]}),f.steps.length>1&&d.jsx("button",{type:"button",onClick:()=>x(y),className:"text-red-500 hover:text-red-700",children:d.jsx(Gs,{className:"w-4 h-4"})})]}),d.jsxs("div",{className:"grid gap-3",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs font-medium text-gray-500 mb-1",children:"Ação"}),d.jsx("input",{type:"text",value:N.action,onChange:_=>S(y,"action",_.target.value),className:"input-field",placeholder:"Descreva a ação executada"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs font-medium text-gray-500 mb-1",children:"Resultado Esperado"}),d.jsx("input",{type:"text",value:N.expectedResult,onChange:_=>S(y,"expectedResult",_.target.value),className:"input-field",placeholder:"O que deveria acontecer"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs font-medium text-gray-500 mb-1",children:"Resultado Obtido"}),d.jsx("input",{type:"text",value:N.actualResult,onChange:_=>S(y,"actualResult",_.target.value),className:"input-field",placeholder:"O que realmente aconteceu"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs font-medium text-gray-500 mb-1",children:"Status do Passo"}),d.jsxs("select",{value:N.status,onChange:_=>S(y,"status",_.target.value),className:"input-field",children:[d.jsx("option",{value:"pendente",children:"Pendente"}),d.jsx("option",{value:"passou",children:"Passou"}),d.jsx("option",{value:"falhou",children:"Falhou"})]})]})]})]},y))})]}),d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsxs("div",{children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Elementos da Interface"}),d.jsx("p",{className:"text-sm text-gray-500",children:"Registre os elementos interagidos para geração de selectors Playwright"})]}),d.jsxs("button",{type:"button",onClick:E,className:"btn-secondary flex items-center space-x-1 text-sm",children:[d.jsx(ud,{className:"w-4 h-4"}),d.jsx("span",{children:"Adicionar Elemento"})]})]}),d.jsx("div",{className:"space-y-3",children:f.elements.map((N,y)=>d.jsxs("div",{className:"flex items-center space-x-3",children:[d.jsx("input",{type:"text",value:N.name,onChange:_=>A(y,"name",_.target.value),className:"input-field flex-1",placeholder:"Nome do elemento (ex: Botão Login)"}),d.jsx("input",{type:"text",value:N.selector,onChange:_=>A(y,"selector",_.target.value),className:"input-field flex-1 font-mono text-sm",placeholder:"Selector (ex: #btn-login, .submit-btn)"}),d.jsxs("select",{value:N.type,onChange:_=>A(y,"type",_.target.value),className:"input-field w-32",children:[d.jsx("option",{value:"button",children:"Botão"}),d.jsx("option",{value:"input",children:"Input"}),d.jsx("option",{value:"link",children:"Link"}),d.jsx("option",{value:"select",children:"Select"}),d.jsx("option",{value:"checkbox",children:"Checkbox"}),d.jsx("option",{value:"radio",children:"Radio"}),d.jsx("option",{value:"text",children:"Texto"}),d.jsx("option",{value:"other",children:"Outro"})]}),f.elements.length>1&&d.jsx("button",{type:"button",onClick:()=>w(y),className:"text-red-500 hover:text-red-700",children:d.jsx(Gs,{className:"w-4 h-4"})})]},y))})]}),d.jsxs("div",{className:"card",children:[d.jsx("div",{className:"flex items-center justify-between mb-4",children:d.jsxs("div",{children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Screenshots / Prints"}),d.jsx("p",{className:"text-sm text-gray-500",children:"Adicione prints de erros ou evidências do teste"})]})}),d.jsxs("div",{className:"space-y-4",children:[d.jsxs("div",{className:"border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors",children:[d.jsx("input",{type:"file",id:"screenshot-upload",multiple:!0,accept:"image/*",onChange:I,className:"hidden",disabled:o}),d.jsx("label",{htmlFor:"screenshot-upload",className:"cursor-pointer flex flex-col items-center",children:o?d.jsxs(d.Fragment,{children:[d.jsx(Yl,{className:"w-10 h-10 text-primary-500 animate-spin mb-2"}),d.jsx("span",{className:"text-sm text-gray-600",children:"Fazendo upload..."})]}):d.jsxs(d.Fragment,{children:[d.jsx(wR,{className:"w-10 h-10 text-gray-400 mb-2"}),d.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Clique para selecionar imagens"}),d.jsx("span",{className:"text-xs text-gray-500 mt-1",children:"PNG, JPG, GIF até 10MB"})]})})]}),u&&d.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2",children:[d.jsx(hw,{className:"w-5 h-5 text-red-500 flex-shrink-0"}),d.jsx("p",{className:"text-sm text-red-700",children:u})]}),s.length>0&&d.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:s.map((N,y)=>d.jsxs("div",{className:"relative group",children:[d.jsx("img",{src:N.url,alt:N.name,className:"w-full h-32 object-cover rounded-lg border border-gray-200"}),d.jsx("button",{type:"button",onClick:()=>b(y),className:"absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity",children:d.jsx(Vf,{className:"w-4 h-4"})}),d.jsx("p",{className:"text-xs text-gray-500 mt-1 truncate",children:N.name})]},y))})]})]}),d.jsxs("div",{className:"card",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Observações"}),d.jsx("div",{className:"space-y-4",children:d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Observações"}),d.jsx("textarea",{name:"observations",value:f.observations,onChange:g,className:"textarea-field",rows:"3",placeholder:"Observações adicionais sobre o teste..."})]})})]}),d.jsxs("div",{className:"flex items-center justify-end space-x-3",children:[d.jsx("button",{type:"button",onClick:()=>e("/"),className:"btn-secondary",children:"Cancelar"}),d.jsxs("button",{type:"submit",className:"btn-primary flex items-center space-x-2",children:[d.jsx(fw,{className:"w-4 h-4"}),d.jsx("span",{children:"Salvar Teste"})]})]})]})]})}function hO({documents:t,onUpdate:e,onDelete:n}){const[r,s]=U.useState(""),[i,o]=U.useState("all"),[l,u]=U.useState("all"),[c,f]=U.useState(null),m=t.filter(x=>{const A=x.title.toLowerCase().includes(r.toLowerCase())||x.feature.toLowerCase().includes(r.toLowerCase()),E=i==="all"||x.status===i,w=l==="all"||x.testType===l;return A&&E&&w}),g=x=>{const A=S(x),E=new Blob([A],{type:"text/plain"}),w=URL.createObjectURL(E),I=document.createElement("a");I.href=w,I.download=`teste-${x.title.replace(/\s+/g,"-").toLowerCase()}.txt`,document.body.appendChild(I),I.click(),document.body.removeChild(I),URL.revokeObjectURL(w)},S=x=>{let A=`DOCUMENTO DE TESTE DE HOMOLOGAÇÃO
`;return A+=`${"=".repeat(50)}

`,A+=`Título: ${x.title}
`,A+=`Feature: ${x.feature}
`,A+=`Módulo: ${x.module||"N/A"}
`,A+=`Tipo: ${x.testType}
`,A+=`Prioridade: ${x.priority}
`,A+=`Status: ${x.status.toUpperCase()}
`,A+=`Testador: ${x.tester}
`,A+=`Ambiente: ${x.environment||"N/A"}
`,A+=`Data: ${new Date(x.createdAt).toLocaleString("pt-BR")}

`,x.preconditions&&(A+=`PRÉ-CONDIÇÕES:
${"-".repeat(30)}
${x.preconditions}

`),A+=`PASSOS DO TESTE:
${"-".repeat(30)}
`,x.steps.forEach((E,w)=>{A+=`
Passo ${w+1}:
`,A+=`  Ação: ${E.action}
`,A+=`  Esperado: ${E.expectedResult}
`,A+=`  Obtido: ${E.actualResult}
`,A+=`  Status: ${E.status}
`}),x.elements&&x.elements.length>0&&x.elements[0].name&&(A+=`
ELEMENTOS DA INTERFACE:
${"-".repeat(30)}
`,x.elements.forEach(E=>{E.name&&(A+=`  - ${E.name}: ${E.selector} (${E.type})
`)})),x.observations&&(A+=`
OBSERVAÇÕES:
${"-".repeat(30)}
${x.observations}
`),x.evidences&&(A+=`
EVIDÊNCIAS:
${"-".repeat(30)}
${x.evidences}
`),A},k=({status:x})=>{switch(x){case"aprovado":return d.jsx(od,{className:"w-5 h-5 text-green-500"});case"reprovado":return d.jsx(ER,{className:"w-5 h-5 text-red-500"});default:return d.jsx(dw,{className:"w-5 h-5 text-yellow-500"})}};return d.jsxs("div",{className:"space-y-6",children:[d.jsx("div",{className:"flex items-center justify-between",children:d.jsxs("div",{children:[d.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Documentos de Teste"}),d.jsxs("p",{className:"text-gray-600 mt-1",children:[t.length," documento(s) registrado(s)"]})]})}),d.jsx("div",{className:"card",children:d.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[d.jsxs("div",{className:"flex-1 relative",children:[d.jsx(vR,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"}),d.jsx("input",{type:"text",value:r,onChange:x=>s(x.target.value),className:"input-field pl-10",placeholder:"Buscar por título ou feature..."})]}),d.jsxs("div",{className:"flex gap-2",children:[d.jsxs("select",{value:i,onChange:x=>o(x.target.value),className:"input-field w-40",children:[d.jsx("option",{value:"all",children:"Todos Status"}),d.jsx("option",{value:"pendente",children:"Pendente"}),d.jsx("option",{value:"aprovado",children:"Aprovado"}),d.jsx("option",{value:"reprovado",children:"Reprovado"}),d.jsx("option",{value:"bloqueado",children:"Bloqueado"})]}),d.jsxs("select",{value:l,onChange:x=>u(x.target.value),className:"input-field w-40",children:[d.jsx("option",{value:"all",children:"Todos Tipos"}),d.jsx("option",{value:"funcional",children:"Funcional"}),d.jsx("option",{value:"exploratorio",children:"Exploratório"}),d.jsx("option",{value:"regressao",children:"Regressão"}),d.jsx("option",{value:"integracao",children:"Integração"})]})]})]})}),m.length===0?d.jsxs("div",{className:"card text-center py-12",children:[d.jsx(oi,{className:"w-12 h-12 text-gray-400 mx-auto mb-4"}),d.jsx("h3",{className:"text-lg font-medium text-gray-900",children:t.length===0?"Nenhum documento registrado":"Nenhum resultado encontrado"}),d.jsx("p",{className:"text-gray-600 mt-1",children:t.length===0?"Registre um teste para começar":"Tente ajustar os filtros de busca"})]}):d.jsx("div",{className:"grid gap-4",children:m.map(x=>d.jsx("div",{className:"card hover:shadow-md transition-shadow",children:d.jsxs("div",{className:"flex items-start justify-between",children:[d.jsxs("div",{className:"flex items-start space-x-3",children:[d.jsx(k,{status:x.status}),d.jsxs("div",{children:[d.jsx("h3",{className:"font-semibold text-gray-900",children:x.title}),d.jsxs("p",{className:"text-sm text-gray-600",children:[x.feature," ",x.module&&`• ${x.module}`]}),d.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[d.jsx("span",{className:`badge ${x.status==="aprovado"?"badge-success":x.status==="reprovado"?"badge-error":"badge-warning"}`,children:x.status}),d.jsx("span",{className:"badge badge-info",children:x.testType}),d.jsx("span",{className:"text-xs text-gray-500",children:new Date(x.createdAt).toLocaleDateString("pt-BR")})]})]})]}),d.jsxs("div",{className:"flex items-center space-x-2",children:[d.jsx("button",{onClick:()=>f(x),className:"p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg",title:"Visualizar",children:d.jsx(fR,{className:"w-4 h-4"})}),d.jsx("button",{onClick:()=>g(x),className:"p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg",title:"Exportar",children:d.jsx(qo,{className:"w-4 h-4"})}),d.jsx("button",{onClick:()=>n(x.id),className:"p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg",title:"Excluir",children:d.jsx(Gs,{className:"w-4 h-4"})})]})]})},x.id))}),c&&d.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",children:d.jsxs("div",{className:"bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto",children:[d.jsxs("div",{className:"sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between",children:[d.jsx("h2",{className:"text-xl font-bold text-gray-900",children:c.title}),d.jsx("button",{onClick:()=>f(null),className:"p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100",children:"✕"})]}),d.jsxs("div",{className:"p-6 space-y-6",children:[d.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Feature"}),d.jsx("p",{className:"font-medium",children:c.feature})]}),d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Módulo"}),d.jsx("p",{className:"font-medium",children:c.module||"N/A"})]}),d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Tipo"}),d.jsx("p",{className:"font-medium capitalize",children:c.testType})]}),d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Status"}),d.jsx("span",{className:`badge ${c.status==="aprovado"?"badge-success":c.status==="reprovado"?"badge-error":"badge-warning"}`,children:c.status})]}),d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Testador"}),d.jsx("p",{className:"font-medium",children:c.tester})]}),d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Ambiente"}),d.jsx("p",{className:"font-medium",children:c.environment||"N/A"})]}),d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Prioridade"}),d.jsx("p",{className:"font-medium capitalize",children:c.priority})]}),d.jsxs("div",{children:[d.jsx("p",{className:"text-xs text-gray-500",children:"Data"}),d.jsx("p",{className:"font-medium",children:new Date(c.createdAt).toLocaleDateString("pt-BR")})]})]}),c.preconditions&&d.jsxs("div",{children:[d.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Pré-condições"}),d.jsx("p",{className:"text-gray-700 bg-gray-50 p-3 rounded-lg",children:c.preconditions})]}),d.jsxs("div",{children:[d.jsx("h3",{className:"font-semibold text-gray-900 mb-3",children:"Passos do Teste"}),d.jsx("div",{className:"space-y-3",children:c.steps.map((x,A)=>d.jsxs("div",{className:"border border-gray-200 rounded-lg p-3",children:[d.jsxs("div",{className:"flex items-center justify-between mb-2",children:[d.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Passo ",A+1]}),d.jsx("span",{className:`badge ${x.status==="passou"?"badge-success":x.status==="falhou"?"badge-error":"badge-warning"}`,children:x.status})]}),d.jsxs("div",{className:"space-y-1 text-sm",children:[d.jsxs("p",{children:[d.jsx("strong",{children:"Ação:"})," ",x.action]}),d.jsxs("p",{children:[d.jsx("strong",{children:"Esperado:"})," ",x.expectedResult]}),d.jsxs("p",{children:[d.jsx("strong",{children:"Obtido:"})," ",x.actualResult]})]})]},A))})]}),c.elements&&c.elements.some(x=>x.name)&&d.jsxs("div",{children:[d.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Elementos da Interface"}),d.jsx("div",{className:"bg-gray-50 rounded-lg p-3",children:d.jsxs("table",{className:"w-full text-sm",children:[d.jsx("thead",{children:d.jsxs("tr",{className:"text-left text-gray-500",children:[d.jsx("th",{className:"pb-2",children:"Nome"}),d.jsx("th",{className:"pb-2",children:"Selector"}),d.jsx("th",{className:"pb-2",children:"Tipo"})]})}),d.jsx("tbody",{children:c.elements.filter(x=>x.name).map((x,A)=>d.jsxs("tr",{children:[d.jsx("td",{className:"py-1",children:x.name}),d.jsx("td",{className:"py-1 font-mono text-xs",children:x.selector}),d.jsx("td",{className:"py-1",children:x.type})]},A))})]})})]}),c.screenshots&&c.screenshots.length>0&&d.jsxs("div",{children:[d.jsx("h3",{className:"font-semibold text-gray-900 mb-3",children:"Screenshots / Prints"}),d.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-3",children:c.screenshots.map((x,A)=>d.jsxs("a",{href:x.url,target:"_blank",rel:"noopener noreferrer",className:"block",children:[d.jsx("img",{src:x.url,alt:x.name,className:"w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"}),d.jsx("p",{className:"text-xs text-gray-500 mt-1 truncate",children:x.name})]},A))})]}),c.observations&&d.jsxs("div",{children:[d.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Observações"}),d.jsx("p",{className:"text-gray-700 bg-gray-50 p-3 rounded-lg",children:c.observations})]})]}),d.jsxs("div",{className:"sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end space-x-2",children:[d.jsxs("button",{onClick:()=>g(c),className:"btn-secondary flex items-center space-x-1",children:[d.jsx(qo,{className:"w-4 h-4"}),d.jsx("span",{children:"Exportar"})]}),d.jsx("button",{onClick:()=>f(null),className:"btn-primary",children:"Fechar"})]})]})})]})}function dO({documents:t}){const[e,n]=U.useState(null),[r,s]=U.useState(""),[i,o]=U.useState(""),[l,u]=U.useState({gherkin:!1,playwright:!1}),c=g=>{var A;n(g);let S=`# language: pt

`;S+=`Funcionalidade: ${g.feature}
`,g.module&&(S+=`  # Módulo: ${g.module}
`),S+=`  # Prioridade: ${g.priority}
`,S+=`  # Tipo: ${g.testType}

`,S+=`  Cenário: ${g.title}
`,g.preconditions&&g.preconditions.split(`
`).filter(w=>w.trim()).forEach((w,I)=>{S+=`    ${I===0?"Dado":"E"} ${w.trim()}
`}),g.steps.forEach((E,w)=>{if(E.action){const I=w===0&&!g.preconditions?"Dado":"Quando";S+=`    ${I} ${E.action}
`}E.expectedResult&&(S+=`    Então ${E.expectedResult}
`)}),s(S);let k=`import { test, expect } from '@playwright/test';

`;k+=`test.describe('${g.feature}', () => {
`,k+=`  test('${g.title}', async ({ page }) => {
`;const x=((A=g.elements)==null?void 0:A.filter(E=>E.name&&E.selector))||[];x.length>0&&(k+=`    // Selectors
`,x.forEach(E=>{const w=E.name.replace(/\s+/g,"_").replace(/[^a-zA-Z0-9_]/g,"").toLowerCase();k+=`    const ${w} = '${E.selector}';
`}),k+=`
`),k+=`    // Pré-condições
`,g.preconditions&&(k+=`    // ${g.preconditions.replace(/\n/g,`
    // `)}
`),k+=`    await page.goto('URL_DA_APLICACAO');

`,g.steps.forEach((E,w)=>{k+=`    // Passo ${w+1}: ${E.action||"N/A"}
`;const I=x.find(b=>{var M;return(M=E.action)==null?void 0:M.toLowerCase().includes(b.name.toLowerCase())});if(I){const b=I.name.replace(/\s+/g,"_").replace(/[^a-zA-Z0-9_]/g,"").toLowerCase();switch(I.type){case"button":k+=`    await page.click(${b});
`;break;case"input":k+=`    await page.fill(${b}, 'VALOR');
`;break;case"link":k+=`    await page.click(${b});
`;break;case"select":k+=`    await page.selectOption(${b}, 'VALOR');
`;break;case"checkbox":case"radio":k+=`    await page.check(${b});
`;break;case"text":k+=`    await expect(page.locator(${b})).toBeVisible();
`;break;default:k+=`    await page.locator(${b}).click();
`}}else k+=`    // TODO: Implementar ação
`;E.expectedResult&&(k+=`    // Esperado: ${E.expectedResult}
`,k+=`    // await expect(page.locator('SELECTOR')).toHaveText('TEXTO');
`),k+=`
`}),k+=`  });
`,k+=`});
`,o(k)},f=async(g,S)=>{await navigator.clipboard.writeText(g),u({...l,[S]:!0}),setTimeout(()=>u({...l,[S]:!1}),2e3)},m=(g,S)=>{const k=new Blob([g],{type:"text/plain"}),x=URL.createObjectURL(k),A=document.createElement("a");A.href=x,A.download=S,document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(x)};return d.jsxs("div",{className:"space-y-6",children:[d.jsxs("div",{children:[d.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Gerador Gherkin & Playwright"}),d.jsx("p",{className:"text-gray-600 mt-1",children:"Selecione um documento de teste para gerar cenários Gherkin e código Playwright"})]}),d.jsxs("div",{className:"grid lg:grid-cols-3 gap-6",children:[d.jsx("div",{className:"lg:col-span-1",children:d.jsxs("div",{className:"card",children:[d.jsx("h2",{className:"font-semibold text-gray-900 mb-4",children:"Documentos Disponíveis"}),t.length===0?d.jsxs("div",{className:"text-center py-8 text-gray-500",children:[d.jsx(oi,{className:"w-8 h-8 mx-auto mb-2 opacity-50"}),d.jsx("p",{className:"text-sm",children:"Nenhum documento disponível"})]}):d.jsx("div",{className:"space-y-2 max-h-[600px] overflow-y-auto",children:t.map(g=>d.jsxs("button",{onClick:()=>c(g),className:`w-full text-left p-3 rounded-lg border transition-colors ${(e==null?void 0:e.id)===g.id?"border-primary-500 bg-primary-50":"border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`,children:[d.jsx("p",{className:"font-medium text-gray-900 text-sm truncate",children:g.title}),d.jsx("p",{className:"text-xs text-gray-500 mt-1",children:g.feature}),d.jsx("div",{className:"flex items-center gap-2 mt-2",children:d.jsx("span",{className:`badge text-xs ${g.status==="aprovado"?"badge-success":g.status==="reprovado"?"badge-error":"badge-warning"}`,children:g.status})})]},g.id))})]})}),d.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsxs("div",{className:"flex items-center space-x-2",children:[d.jsx(Ms,{className:"w-5 h-5 text-purple-600"}),d.jsx("h2",{className:"font-semibold text-gray-900",children:"Cenário Gherkin"})]}),r&&d.jsxs("div",{className:"flex items-center space-x-2",children:[d.jsx("button",{onClick:()=>f(r,"gherkin"),className:"btn-secondary text-sm flex items-center space-x-1",children:l.gherkin?d.jsxs(d.Fragment,{children:[d.jsx(ad,{className:"w-4 h-4 text-green-500"}),d.jsx("span",{children:"Copiado!"})]}):d.jsxs(d.Fragment,{children:[d.jsx(ty,{className:"w-4 h-4"}),d.jsx("span",{children:"Copiar"})]})}),d.jsxs("button",{onClick:()=>m(r,`${(e==null?void 0:e.feature)||"feature"}.feature`),className:"btn-secondary text-sm flex items-center space-x-1",children:[d.jsx(qo,{className:"w-4 h-4"}),d.jsx("span",{children:"Download"})]})]})]}),r?d.jsx("pre",{className:"bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm",children:d.jsx("code",{children:r})}):d.jsxs("div",{className:"bg-gray-100 rounded-lg p-8 text-center text-gray-500",children:[d.jsx(Ms,{className:"w-8 h-8 mx-auto mb-2 opacity-50"}),d.jsx("p",{children:"Selecione um documento para gerar o cenário Gherkin"})]})]}),d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsxs("div",{className:"flex items-center space-x-2",children:[d.jsx(Ms,{className:"w-5 h-5 text-green-600"}),d.jsx("h2",{className:"font-semibold text-gray-900",children:"Código Playwright"})]}),i&&d.jsxs("div",{className:"flex items-center space-x-2",children:[d.jsx("button",{onClick:()=>f(i,"playwright"),className:"btn-secondary text-sm flex items-center space-x-1",children:l.playwright?d.jsxs(d.Fragment,{children:[d.jsx(ad,{className:"w-4 h-4 text-green-500"}),d.jsx("span",{children:"Copiado!"})]}):d.jsxs(d.Fragment,{children:[d.jsx(ty,{className:"w-4 h-4"}),d.jsx("span",{children:"Copiar"})]})}),d.jsxs("button",{onClick:()=>{var g;return m(i,`${((g=e==null?void 0:e.feature)==null?void 0:g.replace(/\s+/g,"-").toLowerCase())||"test"}.spec.ts`)},className:"btn-secondary text-sm flex items-center space-x-1",children:[d.jsx(qo,{className:"w-4 h-4"}),d.jsx("span",{children:"Download"})]})]})]}),i?d.jsx("pre",{className:"bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm",children:d.jsx("code",{children:i})}):d.jsxs("div",{className:"bg-gray-100 rounded-lg p-8 text-center text-gray-500",children:[d.jsx(Ms,{className:"w-8 h-8 mx-auto mb-2 opacity-50"}),d.jsx("p",{children:"Selecione um documento para gerar o código Playwright"})]})]})]})]})]})}function fO({requirements:t,onAdd:e,onUpdate:n,onDelete:r}){const[s,i]=U.useState(!1),[o,l]=U.useState(null),[u,c]=U.useState({name:"",description:"",inputClasses:[{class:"",validValues:"",invalidValues:"",representative:""}],outputClasses:[{class:"",expectedResult:""}],boundaryValues:""}),f=()=>{c({name:"",description:"",inputClasses:[{class:"",validValues:"",invalidValues:"",representative:""}],outputClasses:[{class:"",expectedResult:""}],boundaryValues:""})},m=(N,y,_)=>{const T=[...u.inputClasses];T[N][y]=_,c({...u,inputClasses:T})},g=()=>{c({...u,inputClasses:[...u.inputClasses,{class:"",validValues:"",invalidValues:"",representative:""}]})},S=N=>{u.inputClasses.length>1&&c({...u,inputClasses:u.inputClasses.filter((y,_)=>_!==N)})},k=(N,y,_)=>{const T=[...u.outputClasses];T[N][y]=_,c({...u,outputClasses:T})},x=()=>{c({...u,outputClasses:[...u.outputClasses,{class:"",expectedResult:""}]})},A=N=>{u.outputClasses.length>1&&c({...u,outputClasses:u.outputClasses.filter((y,_)=>_!==N)})},E=N=>{N.preventDefault(),o?(n(o,u),l(null)):e(u),f(),i(!1)},w=N=>{c({name:N.name,description:N.description,inputClasses:N.inputClasses||[{class:"",validValues:"",invalidValues:"",representative:""}],outputClasses:N.outputClasses||[{class:"",expectedResult:""}],boundaryValues:N.boundaryValues||""}),l(N.id),i(!0)},I=()=>{f(),l(null),i(!1)},b=N=>{var _;let y=`# language: pt

`;return y+=`# Requisito: ${N.name}
`,y+=`# ${N.description}

`,y+=`Funcionalidade: ${N.name}

`,(_=N.inputClasses)==null||_.forEach((T,C)=>{T.validValues&&(y+=`  @valido
`,y+=`  Esquema do Cenário: ${N.name} - Valores válidos para ${T.class}
`,y+=`    Dado que o usuário está na tela de ${N.name.toLowerCase()}
`,y+=`    Quando o usuário informa <valor> no campo "${T.class}"
`,y+=`    Então o sistema deve aceitar o valor

`,y+=`    Exemplos:
`,y+=`      | valor |
`,T.validValues.split(",").forEach(P=>{y+=`      | ${P.trim()} |
`}),y+=`
`),T.invalidValues&&(y+=`  @invalido
`,y+=`  Esquema do Cenário: ${N.name} - Valores inválidos para ${T.class}
`,y+=`    Dado que o usuário está na tela de ${N.name.toLowerCase()}
`,y+=`    Quando o usuário informa <valor> no campo "${T.class}"
`,y+=`    Então o sistema deve rejeitar o valor
`,y+=`    E exibir mensagem de erro apropriada

`,y+=`    Exemplos:
`,y+=`      | valor |
`,T.invalidValues.split(",").forEach(P=>{y+=`      | ${P.trim()} |
`}),y+=`
`)}),N.boundaryValues&&(y+=`  @limite
`,y+=`  Cenário: ${N.name} - Teste de valores limite
`,y+=`    # Valores limite: ${N.boundaryValues}
`,y+=`    Dado que o usuário está na tela de ${N.name.toLowerCase()}
`,y+=`    Quando o usuário testa os valores limite
`,y+=`    Então o sistema deve comportar-se corretamente nos limites

`),y},M=N=>{const y=b(N),_=new Blob([y],{type:"text/plain"}),T=URL.createObjectURL(_),C=document.createElement("a");C.href=T,C.download=`${N.name.replace(/\s+/g,"-").toLowerCase()}.feature`,document.body.appendChild(C),C.click(),document.body.removeChild(C),URL.revokeObjectURL(T)};return d.jsxs("div",{className:"space-y-6",children:[d.jsxs("div",{className:"flex items-center justify-between",children:[d.jsxs("div",{children:[d.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Tabela de Partição de Equivalência"}),d.jsx("p",{className:"text-gray-600 mt-1",children:"Gerencie requisitos com classes de equivalência e valores limite"})]}),!s&&d.jsxs("button",{onClick:()=>i(!0),className:"btn-primary flex items-center space-x-2",children:[d.jsx(ud,{className:"w-4 h-4"}),d.jsx("span",{children:"Novo Requisito"})]})]}),s&&d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:o?"Editar Requisito":"Novo Requisito"}),d.jsx("button",{onClick:I,className:"text-gray-500 hover:text-gray-700",children:d.jsx(Vf,{className:"w-5 h-5"})})]}),d.jsxs("form",{onSubmit:E,className:"space-y-6",children:[d.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nome do Requisito *"}),d.jsx("input",{type:"text",value:u.name,onChange:N=>c({...u,name:N.target.value}),className:"input-field",placeholder:"Ex: Validação de CPF",required:!0})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Descrição"}),d.jsx("input",{type:"text",value:u.description,onChange:N=>c({...u,description:N.target.value}),className:"input-field",placeholder:"Descrição breve do requisito"})]})]}),d.jsxs("div",{children:[d.jsxs("div",{className:"flex items-center justify-between mb-3",children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Classes de Entrada (Partição)"}),d.jsx("button",{type:"button",onClick:g,className:"text-primary-600 hover:text-primary-700 text-sm font-medium",children:"+ Adicionar Classe"})]}),d.jsx("div",{className:"space-y-3",children:u.inputClasses.map((N,y)=>d.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[d.jsxs("div",{className:"flex items-center justify-between mb-3",children:[d.jsxs("span",{className:"text-sm font-medium text-gray-600",children:["Classe ",y+1]}),u.inputClasses.length>1&&d.jsx("button",{type:"button",onClick:()=>S(y),className:"text-red-500 hover:text-red-700",children:d.jsx(Gs,{className:"w-4 h-4"})})]}),d.jsxs("div",{className:"grid md:grid-cols-2 gap-3",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"Nome da Classe"}),d.jsx("input",{type:"text",value:N.class,onChange:_=>m(y,"class",_.target.value),className:"input-field",placeholder:"Ex: Idade"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"Valor Representativo"}),d.jsx("input",{type:"text",value:N.representative,onChange:_=>m(y,"representative",_.target.value),className:"input-field",placeholder:"Ex: 25"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"Valores Válidos (separados por vírgula)"}),d.jsx("input",{type:"text",value:N.validValues,onChange:_=>m(y,"validValues",_.target.value),className:"input-field",placeholder:"Ex: 18, 25, 30, 65"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"Valores Inválidos (separados por vírgula)"}),d.jsx("input",{type:"text",value:N.invalidValues,onChange:_=>m(y,"invalidValues",_.target.value),className:"input-field",placeholder:"Ex: -1, 0, 150, abc"})]})]})]},y))})]}),d.jsxs("div",{children:[d.jsxs("div",{className:"flex items-center justify-between mb-3",children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Classes de Saída"}),d.jsx("button",{type:"button",onClick:x,className:"text-primary-600 hover:text-primary-700 text-sm font-medium",children:"+ Adicionar Saída"})]}),d.jsx("div",{className:"space-y-3",children:u.outputClasses.map((N,y)=>d.jsxs("div",{className:"flex items-center space-x-3",children:[d.jsx("input",{type:"text",value:N.class,onChange:_=>k(y,"class",_.target.value),className:"input-field flex-1",placeholder:"Classe de saída"}),d.jsx("input",{type:"text",value:N.expectedResult,onChange:_=>k(y,"expectedResult",_.target.value),className:"input-field flex-1",placeholder:"Resultado esperado"}),u.outputClasses.length>1&&d.jsx("button",{type:"button",onClick:()=>A(y),className:"text-red-500 hover:text-red-700",children:d.jsx(Gs,{className:"w-4 h-4"})})]},y))})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Valores Limite (Boundary)"}),d.jsx("textarea",{value:u.boundaryValues,onChange:N=>c({...u,boundaryValues:N.target.value}),className:"textarea-field",rows:"2",placeholder:"Ex: Mínimo: 0, Máximo: 120, Logo abaixo: -1, Logo acima: 121"})]}),d.jsxs("div",{className:"flex items-center justify-end space-x-3",children:[d.jsx("button",{type:"button",onClick:I,className:"btn-secondary",children:"Cancelar"}),d.jsxs("button",{type:"submit",className:"btn-primary flex items-center space-x-2",children:[d.jsx(fw,{className:"w-4 h-4"}),d.jsx("span",{children:o?"Atualizar":"Salvar"})]})]})]})]}),t.length===0&&!s?d.jsxs("div",{className:"card text-center py-12",children:[d.jsx(Of,{className:"w-12 h-12 text-gray-400 mx-auto mb-4"}),d.jsx("h3",{className:"text-lg font-medium text-gray-900",children:"Nenhum requisito cadastrado"}),d.jsx("p",{className:"text-gray-600 mt-1",children:"Adicione um requisito para criar tabelas de partição"})]}):d.jsx("div",{className:"space-y-4",children:t.map(N=>d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"flex items-start justify-between mb-4",children:[d.jsxs("div",{children:[d.jsx("h3",{className:"font-semibold text-gray-900 text-lg",children:N.name}),N.description&&d.jsx("p",{className:"text-gray-600 text-sm mt-1",children:N.description})]}),d.jsxs("div",{className:"flex items-center space-x-2",children:[d.jsx("button",{onClick:()=>M(N),className:"p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg",title:"Exportar Gherkin",children:d.jsx(qo,{className:"w-4 h-4"})}),d.jsx("button",{onClick:()=>w(N),className:"p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg",title:"Editar",children:d.jsx(_R,{className:"w-4 h-4"})}),d.jsx("button",{onClick:()=>r(N.id),className:"p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg",title:"Excluir",children:d.jsx(Gs,{className:"w-4 h-4"})})]})]}),N.inputClasses&&N.inputClasses.some(y=>y.class)&&d.jsxs("div",{className:"mb-4",children:[d.jsx("h4",{className:"text-sm font-medium text-gray-700 mb-2",children:"Classes de Entrada"}),d.jsx("div",{className:"overflow-x-auto",children:d.jsxs("table",{className:"w-full text-sm border border-gray-200 rounded-lg",children:[d.jsx("thead",{className:"bg-gray-50",children:d.jsxs("tr",{children:[d.jsx("th",{className:"px-3 py-2 text-left text-gray-600 font-medium",children:"Classe"}),d.jsx("th",{className:"px-3 py-2 text-left text-gray-600 font-medium",children:"Valores Válidos"}),d.jsx("th",{className:"px-3 py-2 text-left text-gray-600 font-medium",children:"Valores Inválidos"}),d.jsx("th",{className:"px-3 py-2 text-left text-gray-600 font-medium",children:"Representativo"})]})}),d.jsx("tbody",{children:N.inputClasses.filter(y=>y.class).map((y,_)=>d.jsxs("tr",{className:"border-t border-gray-200",children:[d.jsx("td",{className:"px-3 py-2 font-medium",children:y.class}),d.jsx("td",{className:"px-3 py-2 text-green-700",children:y.validValues||"-"}),d.jsx("td",{className:"px-3 py-2 text-red-700",children:y.invalidValues||"-"}),d.jsx("td",{className:"px-3 py-2",children:y.representative||"-"})]},_))})]})})]}),N.outputClasses&&N.outputClasses.some(y=>y.class)&&d.jsxs("div",{className:"mb-4",children:[d.jsx("h4",{className:"text-sm font-medium text-gray-700 mb-2",children:"Classes de Saída"}),d.jsx("div",{className:"overflow-x-auto",children:d.jsxs("table",{className:"w-full text-sm border border-gray-200 rounded-lg",children:[d.jsx("thead",{className:"bg-gray-50",children:d.jsxs("tr",{children:[d.jsx("th",{className:"px-3 py-2 text-left text-gray-600 font-medium",children:"Classe"}),d.jsx("th",{className:"px-3 py-2 text-left text-gray-600 font-medium",children:"Resultado Esperado"})]})}),d.jsx("tbody",{children:N.outputClasses.filter(y=>y.class).map((y,_)=>d.jsxs("tr",{className:"border-t border-gray-200",children:[d.jsx("td",{className:"px-3 py-2 font-medium",children:y.class}),d.jsx("td",{className:"px-3 py-2",children:y.expectedResult||"-"})]},_))})]})})]}),N.boundaryValues&&d.jsxs("div",{children:[d.jsx("h4",{className:"text-sm font-medium text-gray-700 mb-2",children:"Valores Limite"}),d.jsx("p",{className:"text-sm text-gray-600 bg-gray-50 p-3 rounded-lg",children:N.boundaryValues})]})]},N.id))})]})}function pO({onLogin:t}){const[e,n]=U.useState(""),[r,s]=U.useState(""),[i,o]=U.useState(!1),[l,u]=U.useState(null),c=async f=>{f.preventDefault(),o(!0),u(null);try{await aO(e,r),t()}catch(m){console.error("Erro no login:",m),m.code==="auth/user-not-found"||m.code==="auth/wrong-password"||m.code==="auth/invalid-credential"?u("Email ou senha inválidos"):m.code==="auth/too-many-requests"?u("Muitas tentativas. Tente novamente mais tarde."):u("Erro ao fazer login. Tente novamente.")}finally{o(!1)}};return d.jsx("div",{className:"min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4",children:d.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl w-full max-w-md p-8",children:[d.jsxs("div",{className:"text-center mb-8",children:[d.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4",children:d.jsx(oi,{className:"w-8 h-8 text-primary-600"})}),d.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"DocSimples Reports"}),d.jsx("p",{className:"text-gray-500 mt-1",children:"Sistema de Documentação de Testes"})]}),d.jsxs("form",{onSubmit:c,className:"space-y-5",children:[l&&d.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2",children:[d.jsx(hw,{className:"w-5 h-5 text-red-500 flex-shrink-0"}),d.jsx("p",{className:"text-sm text-red-700",children:l})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),d.jsxs("div",{className:"relative",children:[d.jsx(gR,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),d.jsx("input",{type:"email",value:e,onChange:f=>n(f.target.value),className:"input-field pl-10",placeholder:"seu@email.com",required:!0,disabled:i})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Senha"}),d.jsxs("div",{className:"relative",children:[d.jsx(mR,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),d.jsx("input",{type:"password",value:r,onChange:f=>s(f.target.value),className:"input-field pl-10",placeholder:"••••••••",required:!0,disabled:i})]})]}),d.jsx("button",{type:"submit",disabled:i,className:"w-full btn-primary py-3 flex items-center justify-center space-x-2",children:i?d.jsxs(d.Fragment,{children:[d.jsx(Yl,{className:"w-5 h-5 animate-spin"}),d.jsx("span",{children:"Entrando..."})]}):d.jsx("span",{children:"Entrar"})})]}),d.jsx("p",{className:"text-center text-xs text-gray-400 mt-6",children:"Acesso restrito a colaboradores autorizados"})]})})}function mO({user:t,onLogout:e}){const[n,r]=U.useState(!1),s=la(),i=[{path:"/",label:"Início",icon:pR},{path:"/registro",label:"Registrar Teste",icon:ld},{path:"/documentos",label:"Documentos",icon:oi},{path:"/gherkin",label:"Gerar Gherkin",icon:Ms},{path:"/particao",label:"Tabela Partição",icon:Of}];return d.jsx("nav",{className:"bg-white shadow-sm border-b border-gray-200",children:d.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[d.jsxs("div",{className:"flex justify-between h-16",children:[d.jsx("div",{className:"flex items-center",children:d.jsxs(Ws,{to:"/",className:"flex items-center space-x-2",children:[d.jsx("div",{className:"w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center",children:d.jsx(oi,{className:"w-5 h-5 text-white"})}),d.jsx("span",{className:"font-bold text-xl text-gray-900",children:"DocSimples"})]})}),d.jsx("div",{className:"hidden md:flex items-center space-x-1",children:i.map(o=>{const l=o.icon,u=s.pathname===o.path;return d.jsxs(Ws,{to:o.path,className:`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${u?"bg-primary-100 text-primary-700":"text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`,children:[d.jsx(l,{className:"w-4 h-4"}),d.jsx("span",{children:o.label})]},o.path)})}),d.jsxs("div",{className:"hidden md:flex items-center space-x-3",children:[d.jsx("span",{className:"text-sm text-gray-600",children:t==null?void 0:t.email}),d.jsxs("button",{onClick:e,className:"flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900",children:[d.jsx(ny,{className:"w-4 h-4"}),d.jsx("span",{children:"Sair"})]})]}),d.jsx("div",{className:"md:hidden flex items-center",children:d.jsx("button",{onClick:()=>r(!n),className:"p-2 rounded-lg text-gray-600 hover:bg-gray-100",children:n?d.jsx(Vf,{className:"w-6 h-6"}):d.jsx(yR,{className:"w-6 h-6"})})})]}),n&&d.jsxs("div",{className:"md:hidden pb-4",children:[i.map(o=>{const l=o.icon,u=s.pathname===o.path;return d.jsxs(Ws,{to:o.path,onClick:()=>r(!1),className:`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${u?"bg-primary-100 text-primary-700":"text-gray-600 hover:bg-gray-100"}`,children:[d.jsx(l,{className:"w-4 h-4"}),d.jsx("span",{children:o.label})]},o.path)}),d.jsxs("div",{className:"border-t border-gray-200 mt-2 pt-2",children:[d.jsx("p",{className:"px-3 py-1 text-xs text-gray-500",children:t==null?void 0:t.email}),d.jsxs("button",{onClick:e,className:"flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full",children:[d.jsx(ny,{className:"w-4 h-4"}),d.jsx("span",{children:"Sair"})]})]})]})]})})}function gO(){const[t,e]=U.useState(null),[n,r]=U.useState(!0),[s,i]=U.useState([]),[o,l]=U.useState([]),[u,c]=U.useState(!0),[f,m]=U.useState(null);U.useEffect(()=>{const I=uO(b=>{e(b),r(!1)});return()=>I()},[]),U.useEffect(()=>{if(!t){c(!1);return}let I,b;try{I=tO(M=>{i(M),c(!1)}),b=iO(M=>{l(M)})}catch(M){console.error("Erro ao conectar com Firebase:",M),m("Erro ao conectar com o banco de dados. Verifique a configuração do Firebase."),c(!1)}return()=>{I&&I(),b&&b()}},[t]);const g=async()=>{try{await lO()}catch(I){console.error("Erro ao fazer logout:",I)}},S=async I=>{try{await JD(I)}catch(b){console.error("Erro ao adicionar documento:",b),alert("Erro ao salvar. Verifique a conexão.")}},k=async(I,b)=>{try{await ZD(I,b)}catch(M){console.error("Erro ao atualizar documento:",M)}},x=async I=>{try{await eO(I)}catch(b){console.error("Erro ao excluir documento:",b)}},A=async I=>{try{await nO(I)}catch(b){console.error("Erro ao adicionar requisito:",b)}},E=async(I,b)=>{try{await rO(I,b)}catch(M){console.error("Erro ao atualizar requisito:",M)}},w=async I=>{try{await sO(I)}catch(b){console.error("Erro ao excluir requisito:",b)}};return n?d.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:d.jsxs("div",{className:"text-center",children:[d.jsx(Yl,{className:"w-8 h-8 animate-spin text-primary-600 mx-auto mb-2"}),d.jsx("p",{className:"text-gray-600",children:"Verificando autenticação..."})]})}):t?u?d.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:d.jsxs("div",{className:"text-center",children:[d.jsx(Yl,{className:"w-8 h-8 animate-spin text-primary-600 mx-auto mb-2"}),d.jsx("p",{className:"text-gray-600",children:"Conectando ao banco de dados..."})]})}):f?d.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:d.jsxs("div",{className:"card max-w-md text-center",children:[d.jsx("p",{className:"text-red-600 font-medium",children:f}),d.jsx("p",{className:"text-gray-500 text-sm mt-2",children:"Configure as credenciais do Firebase em src/firebase.js"})]})}):d.jsx(oR,{children:d.jsxs("div",{className:"min-h-screen bg-gray-50",children:[d.jsx(mO,{user:t,onLogout:g}),d.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:d.jsxs(ZS,{children:[d.jsx(Es,{path:"/",element:d.jsx(TR,{testDocuments:s,requirements:o})}),d.jsx(Es,{path:"/registro",element:d.jsx(cO,{onSave:S})}),d.jsx(Es,{path:"/documentos",element:d.jsx(hO,{documents:s,onUpdate:k,onDelete:x})}),d.jsx(Es,{path:"/gherkin",element:d.jsx(dO,{documents:s})}),d.jsx(Es,{path:"/particao",element:d.jsx(fO,{requirements:o,onAdd:A,onUpdate:E,onDelete:w})})]})})]})}):d.jsx(pO,{onLogin:()=>{}})}ch.createRoot(document.getElementById("root")).render(d.jsx(X_.StrictMode,{children:d.jsx(gO,{})}));
