import{r as i,a4 as N,v as s,y as p,T as C,B as j}from"./index-BFPSIpCx.js";import{P as g,a as v,C as w,b as k,c as E,d as B,e as U,f as V,g as $,h as D}from"./popover-CAv5j0af.js";function S({data:m,setState:c,name:o,defaultData:a,addNew:f,addOpen:x}){const[h,t]=i.useState(!1),[l,b]=i.useState(""),{colorMode:r}=N(),[d,u]=i.useState();return i.useEffect(()=>{if(a){const e=m==null?void 0:m.find(n=>typeof a=="string"?n.id===Number(a):typeof a=="object"&&a!==null?n.f_name===a.f_name&&n.l_name===a.l_name&&n.phone===a.phone:!1);e&&(b(e),c(e),u(e))}},[a,m,c]),s.jsxDEV(g,{open:h,onOpenChange:t,children:[s.jsxDEV(v,{asChild:!0,children:s.jsxDEV(p,{fontWeight:"500",justifyContent:"space-between",variant:"outline",role:"combobox","aria-expanded":h,className:`w-[100%] h-8 justify-between bg-transparent hover:bg-transparent hover:text-inherit rounded-[6px] capitalize text-sm ${r==="dark"?"border-[#ffffff3d]":"border-[#E2e8f0]"}}`,children:[l?`${l.f_name} ${l.l_name}`:`Select ${o}`,s.jsxDEV(w,{className:"ml-2 h-4 w-4 shrink-0 "},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:52,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:41,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:40,columnNumber:7},this),s.jsxDEV(k,{className:`w-[300px] p-0 max-h-[240px] overflow-y-scroll hideScrollbar z-[1500] ${r==="dark"?"bg-[#2D3748]":"bg-[#ffffff]"}`,children:s.jsxDEV(E,{className:`${r==="dark"?"bg-[#2D3748]":"bg-[#ffffff]"}`,children:[s.jsxDEV(B,{placeholder:`Search ${o}`,className:r==="dark"?"text-[#fff]":"text-[#000]"},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:60,columnNumber:11},this),s.jsxDEV(U,{children:[s.jsxDEV(C,{children:["No ",o," found."]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:63,columnNumber:13},this),f&&s.jsxDEV(j,{w:"100%",px:4,mt:2,children:s.jsxDEV(p,{size:"sm",w:"100%",colorScheme:"blue",onClick:()=>{t(!1),x()},children:["Add ",o]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:69,columnNumber:17},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:65,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:62,columnNumber:11},this),s.jsxDEV(V,{children:m==null?void 0:m.map(e=>s.jsxDEV($,{value:`${e.f_name.toString()} ${e.l_name.toString()} ${e.phone}`,onSelect:()=>{t(!1),b(e),u(e),c(e)},className:"dark:text-white capitalize",children:[s.jsxDEV(D,{className:`mr-2 h-4 w-4 ${e.id===(d==null?void 0:d.id)?"opacity-100":"opacity-0"}`},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:100,columnNumber:17},this),e.f_name," ",e.l_name," ",e.phone]},e.id,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:87,columnNumber:11},this))},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:83,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:58,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:56,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/medicare-samite/packages/web-admin/src/Components/UsersComboBox.jsx",lineNumber:39,columnNumber:5},this)}export{S as U};
