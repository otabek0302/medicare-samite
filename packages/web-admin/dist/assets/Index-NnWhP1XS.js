import{N as P,z as I,r as d,U as z,w as B,v as e,B as u,y as F,G as j,K as w}from"./index-BqRQ5zR-.js";import{F as G}from"./index-CS1DgOx7.js";import{e as L}from"./index-D6RHo-Rw.js";import{u as V}from"./SettingData-CxfeWvqW.js";import{u as q,N as Q,S as n,D as K,P as W}from"./Dashboard-DfQ9GR_Q.js";import{u as S}from"./HasPermission-BxGNMDGA.js";import{u as O}from"./index.esm-CDWxJwJY.js";import{F as l,I as H}from"./utils-BcOZwoxx.js";import{R as J,a as E}from"./radio-uc9LVGf-.js";import{I as y}from"./index-CdSaDTFS.js";import"./createLucideIcon-Ha6tAQX1.js";import"./tr-IqXuou1v.js";import"./image-CynZshwF.js";import"./visually-hidden.style-BiwU0iRL.js";import"./split-CzYrjwZo.js";const X=async()=>(await P(I.token,"get_roles")).data,Z=()=>{const{isLoading:s,data:a,error:i}=V({queryKey:["Roles"],queryFn:X});return{rolesData:a,rolesLoading:s,rolesError:i}},_=50,ee=(s,a)=>{const i=(s-1)*a,m=i+a-1;return{startIndex:i,endIndex:m}},se=s=>s==null?void 0:s.map(a=>{const{id:i,f_name:m,l_name:t,phone:c,gender:b,dob:f,email:p,image:x,wallet_amount:N,created_at:g}=a;return{id:i,image:x,name:`${m} ${t}`,Phone:`${c}`,Gender:b,DateOfBirth:j(f).format("DD MMM YYYY"),Email:p,"Wallet Balance":N,CreatedAt:j(g).format("DD MMM YYYY hh:mm a")}});function ge(){const[s,a]=d.useState(),i=z(),{hasPermission:m}=S(),t=O(),[c,b]=d.useState(1),[f,p]=d.useState(""),x=q(f,1e3),{startIndex:N,endIndex:g}=ee(c,_),k=d.useRef(null),{rolesData:v,rolesLoading:R}=Z(),[D,C]=d.useState(""),{t:h}=B(),A=async()=>{const r=await P(I.token,`get_users/page?start=${N}&end=${g}&search=${x}&role_id=${D}`);return{data:r.data,total_record:r.total_record}},{isLoading:Y,data:o,error:U}=V({queryKey:["users",c,x,D],queryFn:A}),M=r=>{b(r)},T=Math.ceil((o==null?void 0:o.total_record)/_),$=r=>(a(r),s);return d.useEffect(()=>{k.current&&k.current.scrollIntoView({behavior:"smooth",block:"start"})},[c]),d.useEffect(()=>{U&&!t.isActive("Errortoast")&&t({id:"Errortoast",title:"Oops!",description:"Something bad happened.",status:"error",duration:2e3,isClosable:!0,position:"top"})},[U,t]),m("USER_VIEW")?e.jsxDEV(u,{children:[Y||!o||R?e.jsxDEV(u,{children:[e.jsxDEV(l,{mb:5,justify:"space-between",children:[e.jsxDEV(n,{w:400,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:115,columnNumber:13},this),e.jsxDEV(n,{w:200,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:119,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:112,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:124,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:129,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:134,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:139,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:144,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:149,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:154,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:159,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:164,columnNumber:11},this),e.jsxDEV(n,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:169,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:111,columnNumber:9},this):e.jsxDEV(u,{children:[e.jsxDEV(l,{mb:5,justify:"space-between",align:"center",children:[e.jsxDEV(H,{size:"md",placeholder:h("users.index.search"),w:400,maxW:"50vw",onChange:r=>p(r.target.value),value:f},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:181,columnNumber:13},this),e.jsxDEV(u,{children:e.jsxDEV(F,{isDisabled:!m("USER_ADD"),size:"sm",colorScheme:"blue",onClick:()=>{i("/users/add")},children:h("users.index.add")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:190,columnNumber:15},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:189,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:177,columnNumber:11},this),e.jsxDEV(u,{my:2,children:e.jsxDEV(J,{onChange:C,value:D,children:e.jsxDEV(l,{direction:"row",gap:4,wrap:"wrap",children:[e.jsxDEV(E,{value:"",children:h("users.index.tabs.all")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:209,columnNumber:17},this),v.map(r=>e.jsxDEV(E,{value:r.id.toString(),children:r.name},r.id,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:211,columnNumber:19},this))]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:205,columnNumber:15},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:202,columnNumber:13},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:201,columnNumber:11},this),e.jsxDEV(K,{minPad:"1px 20px",data:se(o.data),onActionClick:e.jsxDEV(ae,{onClick:$,navigate:i},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:224,columnNumber:15},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:220,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:176,columnNumber:9},this),e.jsxDEV(l,{justify:"center",mt:4,children:e.jsxDEV(W,{currentPage:c,onPageChange:M,totalPages:T},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:235,columnNumber:9},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:232,columnNumber:7},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:109,columnNumber:5},this):e.jsxDEV(Q,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:106,columnNumber:43},this)}const ae=({onClick:s,rowData:a,DeleteonOpen:i,navigate:m})=>{const{hasPermission:t}=S();return e.jsxDEV(l,{justify:"center",children:[e.jsxDEV(y,{isDisabled:!t("USER_UPDATE"),size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{s(a),m(`/user/update/${a.id}`)},icon:e.jsxDEV(L,{fontSize:18,color:w.colors.blue[500]},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:261,columnNumber:11},void 0)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:249,columnNumber:7},void 0),e.jsxDEV(y,{isDisabled:!t("USER_DELETE"),size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{s(a),i()},icon:e.jsxDEV(G,{fontSize:18,color:w.colors.red[500]},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:279,columnNumber:11},void 0)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:267,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Users/Index.jsx",lineNumber:248,columnNumber:5},void 0)};export{ge as default};
