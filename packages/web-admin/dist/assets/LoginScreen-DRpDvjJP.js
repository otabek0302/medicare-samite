import{r as g,x as V,v as e,B as l,T as y,Q as R,R as T,y as x,S as B,z as L,D as M,V as G,K as E,N as Q}from"./index-BqRQ5zR-.js";import{e as q}from"./index-D6RHo-Rw.js";import{u as H}from"./SettingData-CxfeWvqW.js";import{u as W}from"./UseSearchFilter-HwQh-PCQ.js";import{u as U}from"./HasPermission-BxGNMDGA.js";import{V as J,A as K,a as Y,N as X,S as h,D as Z}from"./Dashboard-DfQ9GR_Q.js";import{F as $}from"./index-CS1DgOx7.js";import{a as ee,u as _,I as w}from"./index-CdSaDTFS.js";import{h as se,u as A,M as ne,b as C,a as ie,c as v,g as re,d as O,e as z,f}from"./index.esm-CDWxJwJY.js";import{D as P}from"./createLucideIcon-Ha6tAQX1.js";import{I as F,F as j}from"./utils-BcOZwoxx.js";import"./tr-IqXuou1v.js";import"./image-CynZshwF.js";import"./visually-hidden.style-BiwU0iRL.js";function ae({isOpen:m,onClose:n}){const[c,i]=g.useState(),[r,o]=g.useState(null),d=g.useRef(),{handleSubmit:u,reset:b}=se(),N=V(),a=A(),p=t=>{t.preventDefault();const s=t.dataTransfer.files[0];o(s)},D=t=>{t.preventDefault()},S=t=>{const s=t.target.files[0];o(s)},k=async()=>{let t={image:r};try{i(!0);const s=await B(L.token,"add_login_screen_image",t);i(!1),s.response===200?(f(a,"success","Added!"),N.invalidateQueries(["login-screen"]),b(),n()):f(a,"error",s.message)}catch(s){i(!1),f(a,"error",JSON.stringify(s))}};return e.jsxDEV(ne,{isOpen:m,onClose:n,isCentered:!0,size:"lg",children:[e.jsxDEV(C,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:79,columnNumber:7},this),e.jsxDEV(ie,{as:"form",onSubmit:u(k),children:[e.jsxDEV(v,{fontSize:18,py:2,children:"Add Login Screen Image"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:83,columnNumber:9},this),e.jsxDEV(re,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:88,columnNumber:9},this),e.jsxDEV(P,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:89,columnNumber:9},this),e.jsxDEV(O,{children:e.jsxDEV(l,{pb:3,children:e.jsxDEV(l,{mt:5,p:4,border:"2px dashed",borderColor:"gray.300",borderRadius:"md",onDrop:p,onDragOver:D,onClick:()=>{d.current&&d.current.click()},cursor:"pointer",children:r?e.jsxDEV(l,{position:"relative",children:[e.jsxDEV(y,{children:["Selected File: ",r.name]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:108,columnNumber:19},this),e.jsxDEV(R,{position:"absolute",right:-2,top:-2,size:"sm",onClick:()=>{o(null)}},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:109,columnNumber:19},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:107,columnNumber:17},this):e.jsxDEV(l,{children:[e.jsxDEV(J,{children:[" ",e.jsxDEV(F,{ref:d,type:"file",onChange:S,accept:".jpeg, .svg, .png , .jpg",mb:4},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:123,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:121,columnNumber:19},this),e.jsxDEV(T,{children:[" ",e.jsxDEV(ee,{fontSize:32},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:134,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:132,columnNumber:19},this),e.jsxDEV(y,{textAlign:"center",mt:3,children:[e.jsxDEV("b",{children:"Choose a file"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:139,columnNumber:21},this)," or Drag it here."]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:136,columnNumber:19},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:120,columnNumber:17},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:92,columnNumber:13},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:91,columnNumber:11},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:90,columnNumber:9},this),e.jsxDEV(P,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:146,columnNumber:9},this),e.jsxDEV(z,{py:3,children:[e.jsxDEV(x,{colorScheme:"gray",mr:3,onClick:n,size:"sm",children:"Close"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:148,columnNumber:11},this),e.jsxDEV(x,{variant:"solid",size:"sm",colorScheme:"blue",type:"submit",isLoading:c,children:"Add Login Image"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:155,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:147,columnNumber:9},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:80,columnNumber:7},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Add.jsx",lineNumber:74,columnNumber:5},this)}function te({isOpen:m,onClose:n,data:c}){const i=A(),r=g.useRef(),o=V(),[d,u]=g.useState(),b=async()=>{let N={id:c.id};try{u(!0);const a=await M(L.token,"delete_login_screen_image",N);u(!1),a.response===200?(f(i,"success","Deleted!"),o.invalidateQueries(["login-screen"]),n()):f(i,"error",a.message)}catch(a){u(!1),f(i,"error",JSON.stringify(a))}};return e.jsxDEV(K,{isOpen:m,onClose:n,leastDestructiveRef:r,isCentered:!0,children:e.jsxDEV(C,{children:e.jsxDEV(Y,{children:[e.jsxDEV(v,{fontSize:"lg",fontWeight:"semi-bold",children:"Delete Login Page Image"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:56,columnNumber:11},this),e.jsxDEV(O,{children:"Are you sure? You can not undo this action afterwards."},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:62,columnNumber:11},this),e.jsxDEV(z,{children:[e.jsxDEV(x,{ref:r,onClick:n,colorScheme:"gray",size:"sm",children:"Cancel"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:67,columnNumber:13},this),e.jsxDEV(x,{colorScheme:"red",onClick:b,ml:3,size:"sm",isLoading:d,children:"Delete"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:74,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:66,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:55,columnNumber:9},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:54,columnNumber:7},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/Delete.jsx",lineNumber:49,columnNumber:5},this)}function he(){const[m,n]=g.useState(),{isOpen:c,onOpen:i,onClose:r}=_(),{hasPermission:o}=U(),{isOpen:d,onOpen:u,onClose:b}=_(),N=s=>{n(s)},a=async()=>(await Q(L.token,"get_login_screen_images")).data,{data:p,isLoading:D,error:S}=H({queryKey:["login-screen"],queryFn:a}),{handleSearchChange:k,filteredData:t}=W(p);return S?e.jsxDEV(G,{errorCode:S.name},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:55,columnNumber:21},this):o("LOGINSCREEN_VIEW")?e.jsxDEV(l,{children:[D||!p?e.jsxDEV(l,{children:[e.jsxDEV(j,{mb:5,justify:"space-between",children:[e.jsxDEV(h,{w:400,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:65,columnNumber:13},this),e.jsxDEV(h,{w:200,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:69,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:62,columnNumber:11},this),[...Array(10)].map((s,I)=>e.jsxDEV(h,{h:10,w:"100%",mt:2},I,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:76,columnNumber:13},this))]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:61,columnNumber:9},this):e.jsxDEV(l,{children:[e.jsxDEV(j,{mb:5,justify:"space-between",align:"center",children:[e.jsxDEV(F,{size:"md",placeholder:"Search",w:400,maxW:"50vw",onChange:s=>k(s.target.value)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:90,columnNumber:13},this),e.jsxDEV(l,{children:e.jsxDEV(x,{isDisabled:!o("LOGINSCREEN_ADD"),size:"sm",colorScheme:"blue",onClick:()=>{i()},children:"Add New"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:98,columnNumber:15},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:97,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:86,columnNumber:11},this),e.jsxDEV(Z,{minPad:"8px 8px",data:t,onActionClick:e.jsxDEV(me,{onClick:N,DeleteonOpen:u},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:114,columnNumber:15},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:110,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:85,columnNumber:9},this),c&&e.jsxDEV(ae,{isOpen:c,onClose:r},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:124,columnNumber:9},this),d&&e.jsxDEV(te,{isOpen:d,onClose:b,data:m},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:130,columnNumber:9},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:59,columnNumber:5},this):e.jsxDEV(X,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:56,columnNumber:50},this)}const me=({onClick:m,rowData:n,DeleteonOpen:c,EditonOpen:i})=>{const{hasPermission:r}=U();return e.jsxDEV(j,{justify:"center",children:[r("LOGINSCREEN_UPDATE")&&e.jsxDEV(w,{size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{m(n),i()},icon:e.jsxDEV(q,{fontSize:18,color:E.colors.blue[500]},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:156,columnNumber:13},void 0),isDisabled:!0},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:145,columnNumber:9},void 0),e.jsxDEV(w,{isDisabled:!r("LOGINSCREEN_DELETE"),size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{m(n),c()},icon:e.jsxDEV($,{fontSize:18,color:E.colors.red[500]},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:177,columnNumber:11},void 0)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:165,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Settings/LoginScreen/LoginScreen.jsx",lineNumber:143,columnNumber:5},void 0)};export{he as default};
