import{r as p,x as y,w as v,v as e,B as x,y as N,aG as L,z as k,D as X,L as q,ab as D,O as Z}from"./index-BFPSIpCx.js";import{F as $}from"./index-C7DuEf2v.js";import{e as ee}from"./index-xAROFF34.js";import{u as ie}from"./SettingData-DvTyOSTZ.js";import{A as ae,a as se,S as E,D as me}from"./Dashboard-CmmBgoMl.js";import{h as R,u as w,M,b as S,a as T,c as I,g as B,d as A,F as _,e as O,f as u}from"./index.esm-Cjy54hoM.js";import{D as C}from"./createLucideIcon-C1VZi4Qy.js";import{d as Q,I as z,F as V}from"./utils-DGMmCGlW.js";import{u as te}from"./UseSearchFilter-C_f_OzUw.js";import{u as P,I as F}from"./index-CexvglWR.js";import"./HasPermission-Dz1RX8IC.js";import"./tr-BasSmpYP.js";import"./image-4nR63Jb_.js";import"./visually-hidden.style-BGGO2DOy.js";function re({isOpen:m,onClose:a,data:i}){const[c,t]=p.useState(),{register:h,handleSubmit:b,reset:o}=R(),d=y(),r=w(),{t:s}=v(),l=async f=>{let g={...f};try{t(!0);const n=await L(k.token,"add_city",g);t(!1),n.response===200?(u(r,"success","City Added!"),d.invalidateQueries("cities"),o(),a()):u(r,"error",n.message)}catch(n){t(!1),u(r,"error",JSON.stringify(n))}};return e.jsxDEV(M,{isOpen:m,onClose:a,isCentered:!0,size:"lg",scrollBehavior:"inside",children:[e.jsxDEV(S,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:50,columnNumber:7},this),e.jsxDEV(T,{as:"form",onSubmit:b(l),children:[e.jsxDEV(I,{fontSize:18,py:2,children:s("cities.add.title")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:54,columnNumber:9},this),e.jsxDEV(B,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:59,columnNumber:9},this),e.jsxDEV(C,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:60,columnNumber:9},this),e.jsxDEV(A,{children:e.jsxDEV(x,{pb:3,children:e.jsxDEV(Q,{isRequired:!0,children:[e.jsxDEV(_,{children:s("cities.add.form.title.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:64,columnNumber:15},this),e.jsxDEV(z,{defaultValue:i==null?void 0:i.title,placeholder:s("cities.add.form.title.placeholder"),...h("title",{required:!0})},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:65,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:63,columnNumber:13},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:62,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:61,columnNumber:9},this),e.jsxDEV(C,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:73,columnNumber:9},this),e.jsxDEV(O,{py:3,children:[e.jsxDEV(N,{colorScheme:"gray",mr:3,onClick:a,size:"sm",children:s("cities.add.buttons.close")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:75,columnNumber:11},this),e.jsxDEV(N,{variant:"solid",size:"sm",colorScheme:"blue",type:"submit",isLoading:c,children:s("cities.add.buttons.add")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:82,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:74,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:51,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Add.jsx",lineNumber:44,columnNumber:5},this)}function ce({isOpen:m,onClose:a,data:i}){const[c,t]=p.useState(),{register:h,handleSubmit:b,reset:o}=R(),d=y(),r=w(),{t:s}=v(),l=async f=>{let g={...f,id:i.id};try{t(!0);const n=await L(k.token,"update_city",g);t(!1),n.response===200?(u(r,"success","City Updated!"),d.invalidateQueries("cities"),o(),a()):u(r,"error",n.message)}catch(n){t(!1),u(r,"error",JSON.stringify(n))}};return e.jsxDEV(M,{isOpen:m,onClose:a,isCentered:!0,size:"lg",scrollBehavior:"inside",children:[e.jsxDEV(S,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:51,columnNumber:7},this),e.jsxDEV(T,{as:"form",onSubmit:b(l),children:[e.jsxDEV(I,{fontSize:18,py:2,children:s("cities.update.title")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:55,columnNumber:9},this),e.jsxDEV(B,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:60,columnNumber:9},this),e.jsxDEV(C,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:61,columnNumber:9},this),e.jsxDEV(A,{children:e.jsxDEV(x,{pb:3,children:e.jsxDEV(Q,{isRequired:!0,children:[e.jsxDEV(_,{children:s("cities.update.form.title.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:65,columnNumber:15},this),e.jsxDEV(z,{defaultValue:i==null?void 0:i.title,placeholder:s("cities.update.form.title.placeholder"),...h("title",{required:!0})},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:66,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:64,columnNumber:13},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:63,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:62,columnNumber:9},this),e.jsxDEV(C,{},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:74,columnNumber:9},this),e.jsxDEV(O,{py:3,children:[e.jsxDEV(N,{colorScheme:"gray",mr:3,onClick:a,size:"sm",children:s("cities.update.buttons.close")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:76,columnNumber:11},this),e.jsxDEV(N,{variant:"solid",size:"sm",colorScheme:"blue",type:"submit",isLoading:c,children:s("cities.update.buttons.update")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:83,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:75,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:52,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Update.jsx",lineNumber:45,columnNumber:5},this)}function ne({isOpen:m,onClose:a,data:i}){const c=w(),t=p.useRef(),h=y(),[b,o]=p.useState(),{t:d}=v(),r=async()=>{let s={id:i.id};try{o(!0);const l=await X(k.token,"delete_city",s);o(!1),l.response===200?(u(c,"success","City Deleted!"),h.invalidateQueries("cities"),a()):u(c,"error",l.message)}catch(l){o(!1),u(c,"error",JSON.stringify(l))}};return e.jsxDEV(ae,{isOpen:m,onClose:a,leastDestructiveRef:t,isCentered:!0,children:e.jsxDEV(S,{children:e.jsxDEV(se,{children:[e.jsxDEV(I,{fontSize:"lg",fontWeight:"semi-bold",children:[d("cities.delete.title")," ( ",e.jsxDEV("b",{children:i==null?void 0:i.title},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:49,columnNumber:42},this)," )"]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:46,columnNumber:11},this),e.jsxDEV(A,{children:d("cities.delete.message")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:52,columnNumber:11},this),e.jsxDEV(O,{children:[e.jsxDEV(N,{ref:t,onClick:a,colorScheme:"gray",size:"sm",children:d("cities.delete.buttons.cancel")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:57,columnNumber:13},this),e.jsxDEV(N,{colorScheme:"red",onClick:r,ml:3,size:"sm",isLoading:b,children:d("cities.delete.buttons.delete")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:64,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:56,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:45,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:44,columnNumber:7},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Delete.jsx",lineNumber:39,columnNumber:5},this)}function ve(){const{t:m}=v(),{isOpen:a,onOpen:i,onClose:c}=P(),[t,h]=p.useState(),{isOpen:b,onOpen:o,onClose:d}=P(),{isOpen:r,onOpen:s,onClose:l}=P(),f=w(),g="Errortoast",n=async()=>(await Z(k.token,"get_city")).data,G=j=>{h(j)},{isLoading:W,data:U,error:H}=ie({queryKey:["cities"],queryFn:n}),{handleSearchChange:K,filteredData:Y}=te(U);return H&&(f.isActive(g)||f({id:g,title:m("cities.messages.error"),description:m("cities.messages.error"),status:"error",duration:2e3,isClosable:!0,position:"top"})),e.jsxDEV(x,{children:[W||!U?e.jsxDEV(x,{children:[e.jsxDEV(V,{mb:5,justify:"space-between",children:[e.jsxDEV(E,{w:400,h:8},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:63,columnNumber:13},this),e.jsxDEV(E,{w:50,h:8},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:67,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:60,columnNumber:11},this),e.jsxDEV(E,{h:300,w:"100%"},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:72,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:59,columnNumber:9},this):e.jsxDEV(x,{children:[e.jsxDEV(V,{mb:5,justify:"space-between",align:"center",children:[e.jsxDEV(z,{size:"md",placeholder:m("common.search"),w:400,maxW:"50vw",onChange:j=>K(j.target.value)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:83,columnNumber:13},this),e.jsxDEV(x,{children:e.jsxDEV(N,{size:"sm",colorScheme:"blue",onClick:i,children:m("common.addNew")},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:91,columnNumber:15},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:90,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:79,columnNumber:11},this),e.jsxDEV(me,{data:Y,onActionClick:e.jsxDEV(J,{onClick:G,DeleteonOpen:o,EditonOpen:s,rowData:null},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:102,columnNumber:15},this),minPad:0,imgLast:!1},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:99,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:78,columnNumber:9},this),e.jsxDEV(re,{isOpen:a,onClose:c,data:null},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:115,columnNumber:7},this),e.jsxDEV(ne,{isOpen:b,onClose:d,data:t},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:120,columnNumber:7},this),r&&e.jsxDEV(ce,{isOpen:r,onClose:l,data:t},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:126,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:57,columnNumber:5},this)}const J=({onClick:m,rowData:a,DeleteonOpen:i,EditonOpen:c})=>e.jsxDEV(V,{justify:"center",children:[e.jsxDEV(F,{"aria-label":"Edit",size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{m(a),c()},icon:e.jsxDEV(ee,{fontSize:18,color:q.colors.blue[500]},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:151,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:139,columnNumber:7},void 0),e.jsxDEV(F,{"aria-label":"Delete",size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{m(a),i()},icon:e.jsxDEV($,{fontSize:18,color:q.colors.red[500]},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:169,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:157,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Pages/Cities/Index.jsx",lineNumber:138,columnNumber:5},void 0);J.propTypes={onClick:D.func.isRequired,rowData:D.any,DeleteonOpen:D.func.isRequired,EditonOpen:D.func.isRequired};export{ve as default};
