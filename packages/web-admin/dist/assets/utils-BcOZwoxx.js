import{r as c,f as p,g as H,h as N,l as k,j as h,c as S,a as C,m as v,e as m,aD as R}from"./index-BqRQ5zR-.js";function U(...t){return function(...a){t.forEach(s=>s==null?void 0:s(...a))}}function j(...t){return function(a){t.some(s=>(s==null||s(a),a==null?void 0:a.defaultPrevented))}}function X(t){return c.Children.toArray(t).filter(e=>c.isValidElement(e))}const[$,M]=S({name:"FormControlStylesContext",errorMessage:`useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `}),[z,_]=S({strict:!1,name:"FormControlContext"});function V(t){const{id:e,isRequired:a,isInvalid:s,isDisabled:n,isReadOnly:r,...l}=t,d=c.useId(),i=e||`field-${d}`,x=`${i}-label`,f=`${i}-feedback`,F=`${i}-helptext`,[I,b]=c.useState(!1),[D,P]=c.useState(!1),[y,T]=c.useState(!1),O=c.useCallback((o={},u=null)=>({id:F,...o,ref:v(u,g=>{g&&P(!0)})}),[F]),w=c.useCallback((o={},u=null)=>({...o,ref:u,"data-focus":m(y),"data-disabled":m(n),"data-invalid":m(s),"data-readonly":m(r),id:o.id!==void 0?o.id:x,htmlFor:o.htmlFor!==void 0?o.htmlFor:i}),[i,n,y,s,r,x]),A=c.useCallback((o={},u=null)=>({id:f,...o,ref:v(u,g=>{g&&b(!0)}),"aria-live":"polite"}),[f]),B=c.useCallback((o={},u=null)=>({...o,...l,ref:u,role:"group","data-focus":m(y),"data-disabled":m(n),"data-invalid":m(s),"data-readonly":m(r)}),[l,n,y,s,r]),E=c.useCallback((o={},u=null)=>({...o,ref:u,role:"presentation","aria-hidden":!0,children:o.children||"*"}),[]);return{isRequired:!!a,isInvalid:!!s,isReadOnly:!!r,isDisabled:!!n,isFocused:!!y,onFocus:()=>T(!0),onBlur:()=>T(!1),hasFeedbackText:I,setHasFeedbackText:b,hasHelpText:D,setHasHelpText:P,id:i,labelId:x,feedbackId:f,helpTextId:F,htmlProps:l,getHelpTextProps:O,getErrorMessageProps:A,getRootProps:B,getLabelProps:w,getRequiredIndicatorProps:E}}const G=p(function(e,a){const s=H("Form",e),n=N(e),{getRootProps:r,...l}=V(n),d=k("chakra-form-control",e.className);return h.jsx(z,{value:l,children:h.jsx($,{value:s,children:h.jsx(C.div,{...r({},a),className:d,__css:s.container})})})});G.displayName="FormControl";const L=p(function(e,a){const s=_(),n=M(),r=k("chakra-form__helper-text",e.className);return h.jsx(C.div,{...s==null?void 0:s.getHelpTextProps(e,a),__css:n.helperText,className:r})});L.displayName="FormHelperText";function W(t){const{isDisabled:e,isInvalid:a,isReadOnly:s,isRequired:n,...r}=J(t);return{...r,disabled:e,readOnly:s,required:n,"aria-invalid":R(a),"aria-required":R(n),"aria-readonly":R(s)}}function J(t){const e=_(),{id:a,disabled:s,readOnly:n,required:r,isRequired:l,isInvalid:d,isReadOnly:i,isDisabled:x,onFocus:f,onBlur:F,...I}=t,b=t["aria-describedby"]?[t["aria-describedby"]]:[];return e!=null&&e.hasFeedbackText&&(e!=null&&e.isInvalid)&&b.push(e.feedbackId),e!=null&&e.hasHelpText&&b.push(e.helpTextId),{...I,"aria-describedby":b.join(" ")||void 0,id:a??(e==null?void 0:e.id),isDisabled:s??x??(e==null?void 0:e.isDisabled),isReadOnly:n??i??(e==null?void 0:e.isReadOnly),isRequired:r??l??(e==null?void 0:e.isRequired),isInvalid:d??(e==null?void 0:e.isInvalid),onFocus:j(e==null?void 0:e.onFocus,f),onBlur:j(e==null?void 0:e.onBlur,F)}}const K=p(function(e,a){const{direction:s,align:n,justify:r,wrap:l,basis:d,grow:i,shrink:x,...f}=e,F={display:"flex",flexDirection:s,alignItems:n,justifyContent:r,flexWrap:l,flexBasis:d,flexGrow:i,flexShrink:x};return h.jsx(C.div,{ref:a,__css:F,...f})});K.displayName="Flex";const q=p(function(e,a){const{htmlSize:s,...n}=e,r=H("Input",n),l=N(n),d=W(l),i=k("chakra-input",e.className);return h.jsx(C.input,{size:s,...d,__css:r.field,ref:a,className:i})});q.displayName="Input";q.id="Input";function Y(t,e){return typeof t=="function"?t(...e):!!t}function Z(){}export{K as F,q as I,U as a,W as b,j as c,G as d,_ as e,M as f,X as g,Z as n,Y as s,J as u};
