import{r as u,x as A,v as e,B as d,T as v,R as T,S as B,y as S,U as M,z as E,D as G,W as q,L as k,O as Q}from"./index-DPnYdkUz.js";import{e as W}from"./index-Bm_h8oZt.js";import{u as H}from"./SettingData-o9nA5JFe.js";import{u as U}from"./UseSearchFilter-BNmhWZYu.js";import{u as C}from"./HasPermission-B2qlt3qD.js";import{V as J,A as Y,a as K,N as X,S as D,D as Z}from"./Dashboard-yaE9KkgM.js";import{F as $}from"./index-DJio6C7j.js";import{a as ee,u as w,I as P}from"./index-DKSfyVZ9.js";import{h as ie,u as y,M as se,b as O,a as ae,c as z,g as ne,d as F,e as _,f as h}from"./index.esm-7HBFntiH.js";import{D as V}from"./createLucideIcon-cf9l0Mkm.js";import{I,F as L}from"./utils-CbOPTj9R.js";import"./tr-B7dii5kF.js";import"./image-CECpK_E2.js";import"./visually-hidden.style-CjB5JpNG.js";function re({isOpen:c,onClose:s}){const[t,a]=u.useState(),[n,o]=u.useState(null),l=u.useRef(),{handleSubmit:g,reset:b}=ie(),N=A(),r=y(),f=m=>{m.preventDefault();const i=m.dataTransfer.files[0];o(i)},j=m=>{m.preventDefault()},x=m=>{const i=m.target.files[0];o(i)},p=async()=>{let m={image:n};try{a(!0);const i=await M(E.token,"add_login_screen_image",m);a(!1),i.response===200?(h(r,"success","Added!"),N.invalidateQueries(["login-screen"]),b(),s()):h(r,"error",i.message)}catch(i){a(!1),h(r,"error",JSON.stringify(i))}};return e.jsxDEV(se,{isOpen:c,onClose:s,isCentered:!0,size:"lg",children:[e.jsxDEV(O,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:79,columnNumber:7},this),e.jsxDEV(ae,{as:"form",onSubmit:g(p),children:[e.jsxDEV(z,{fontSize:18,py:2,children:"Add Login Screen Image"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:83,columnNumber:9},this),e.jsxDEV(ne,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:88,columnNumber:9},this),e.jsxDEV(V,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:89,columnNumber:9},this),e.jsxDEV(F,{children:e.jsxDEV(d,{pb:3,children:e.jsxDEV(d,{mt:5,p:4,border:"2px dashed",borderColor:"gray.300",borderRadius:"md",onDrop:f,onDragOver:j,onClick:()=>{l.current&&l.current.click()},cursor:"pointer",children:n?e.jsxDEV(d,{position:"relative",children:[e.jsxDEV(v,{children:["Selected File: ",n.name]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:108,columnNumber:19},this),e.jsxDEV(T,{position:"absolute",right:-2,top:-2,size:"sm",onClick:()=>{o(null)}},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:109,columnNumber:19},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:107,columnNumber:17},this):e.jsxDEV(d,{children:[e.jsxDEV(J,{children:[" ",e.jsxDEV(I,{ref:l,type:"file",onChange:x,accept:".jpeg, .svg, .png , .jpg",mb:4},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:123,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:121,columnNumber:19},this),e.jsxDEV(B,{children:[" ",e.jsxDEV(ee,{fontSize:32},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:134,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:132,columnNumber:19},this),e.jsxDEV(v,{textAlign:"center",mt:3,children:[e.jsxDEV("b",{children:"Choose a file"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:139,columnNumber:21},this)," or Drag it here."]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:136,columnNumber:19},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:120,columnNumber:17},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:92,columnNumber:13},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:91,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:90,columnNumber:9},this),e.jsxDEV(V,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:146,columnNumber:9},this),e.jsxDEV(_,{py:3,children:[e.jsxDEV(S,{colorScheme:"gray",mr:3,onClick:s,size:"sm",children:"Close"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:148,columnNumber:11},this),e.jsxDEV(S,{variant:"solid",size:"sm",colorScheme:"blue",type:"submit",isLoading:t,children:"Add Login Image"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:155,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:147,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:80,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:74,columnNumber:5},this)}function me({isOpen:c,onClose:s,data:t}){const a=y(),n=u.useRef(),o=A(),[l,g]=u.useState(),b=async()=>{let N={id:t.id};try{g(!0);const r=await G(E.token,"delete_login_screen_image",N);g(!1),r.response===200?(h(a,"success","Deleted!"),o.invalidateQueries(["login-screen"]),s()):h(a,"error",r.message)}catch(r){g(!1),h(a,"error",JSON.stringify(r))}};return e.jsxDEV(Y,{isOpen:c,onClose:s,leastDestructiveRef:n,isCentered:!0,children:e.jsxDEV(O,{children:e.jsxDEV(K,{children:[e.jsxDEV(z,{fontSize:"lg",fontWeight:"semi-bold",children:"Delete Login Page Image"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:56,columnNumber:11},this),e.jsxDEV(F,{children:"Are you sure? You can not undo this action afterwards."},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:62,columnNumber:11},this),e.jsxDEV(_,{children:[e.jsxDEV(S,{ref:n,onClick:s,colorScheme:"gray",size:"sm",children:"Cancel"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:67,columnNumber:13},this),e.jsxDEV(S,{colorScheme:"red",onClick:b,ml:3,size:"sm",isLoading:l,children:"Delete"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:74,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:66,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:55,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:54,columnNumber:7},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:49,columnNumber:5},this)}function De(){const[c,s]=u.useState(),{isOpen:t,onOpen:a,onClose:n}=w(),{hasPermission:o}=C(),{isOpen:l,onOpen:g,onClose:b}=w(),N=i=>{s(i)},r=async()=>(await Q(E.token,"get_login_screen_images")).data,{data:f,isLoading:j,error:x}=H({queryKey:["login-screen"],queryFn:r}),{handleSearchChange:p,filteredData:m}=U(f);return x?e.jsxDEV(q,{errorCode:x.name},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:55,columnNumber:21},this):o("LOGINSCREEN_VIEW")?e.jsxDEV(d,{children:[j||!f?e.jsxDEV(d,{children:[e.jsxDEV(L,{mb:5,justify:"space-between",children:[e.jsxDEV(D,{w:400,h:8},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:65,columnNumber:13},this),e.jsxDEV(D,{w:200,h:8},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:69,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:62,columnNumber:11},this),[...Array(10)].map((i,R)=>e.jsxDEV(D,{h:10,w:"100%",mt:2},R,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:76,columnNumber:13},this))]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:61,columnNumber:9},this):e.jsxDEV(d,{children:[e.jsxDEV(L,{mb:5,justify:"space-between",align:"center",children:[e.jsxDEV(I,{size:"md",placeholder:"Search",w:400,maxW:"50vw",onChange:i=>p(i.target.value)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:90,columnNumber:13},this),e.jsxDEV(d,{children:e.jsxDEV(S,{isDisabled:!o("LOGINSCREEN_ADD"),size:"sm",colorScheme:"blue",onClick:()=>{a()},children:"Add New"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:98,columnNumber:15},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:97,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:86,columnNumber:11},this),e.jsxDEV(Z,{minPad:"8px 8px",data:m,onActionClick:e.jsxDEV(ce,{onClick:N,DeleteonOpen:g},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:114,columnNumber:15},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:110,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:85,columnNumber:9},this),t&&e.jsxDEV(re,{isOpen:t,onClose:n},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:124,columnNumber:9},this),l&&e.jsxDEV(me,{isOpen:l,onClose:b,data:c},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:130,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:59,columnNumber:5},this):e.jsxDEV(X,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:56,columnNumber:50},this)}const ce=({onClick:c,rowData:s,DeleteonOpen:t,EditonOpen:a})=>{const{hasPermission:n}=C();return e.jsxDEV(L,{justify:"center",children:[n("LOGINSCREEN_UPDATE")&&e.jsxDEV(P,{size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{c(s),a()},icon:e.jsxDEV(W,{fontSize:18,color:k.colors.blue[500]},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:156,columnNumber:13},void 0),isDisabled:!0},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:145,columnNumber:9},void 0),e.jsxDEV(P,{isDisabled:!n("LOGINSCREEN_DELETE"),size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{c(s),t()},icon:e.jsxDEV($,{fontSize:18,color:k.colors.red[500]},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:177,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:165,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:143,columnNumber:5},void 0)};export{De as default};
