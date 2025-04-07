import{r as p,a4 as x,v as o,O as w,z as C}from"./index-DPnYdkUz.js";import{B as g}from"./button-r-yWRIgx.js";import{P as j,a as v,C as k,b as D,c as E,d as M,e as A,f as V,g as f,h as b}from"./popover-Cm6ek3zh.js";import{u as y}from"./SettingData-o9nA5JFe.js";function _({data:a,handleChange:c,name:t,defaultId:d,defaultName:m,mainIndex:l}){const[h,u]=p.useState(!1),[s,n]=p.useState(""),{colorMode:r}=x();p.useEffect(()=>{if(d){const e=a==null?void 0:a.find(i=>i.id===d);e&&n(e.title)}else if(m){const e=a==null?void 0:a.find(i=>i.title.toLowerCase()===m.toLowerCase());n(e?e.title:m)}},[d,m,a]);const N=e=>{const i=e.target.value;i===""||i===null||i===void 0?n():n(i)};return o.jsxDEV(j,{open:h,onOpenChange:u,children:[o.jsxDEV(v,{asChild:!0,children:o.jsxDEV(g,{variant:"outline",role:"combobox","aria-expanded":h,className:`w-[100%] h-10 justify-between bg-transparent hover:bg-transparent hover:text-inherit rounded-[6px] capitalize ${r==="dark"?"border-[#ffffff3d]":"border-[#E2e8f0]"}`,children:[s||`Select ${t}`,o.jsxDEV(k,{className:"ml-2 h-4 w-4 shrink-0 "},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:73,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:65,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:64,columnNumber:7},this),o.jsxDEV(D,{className:`w-[200px] p-0 max-h-[240px] overflow-y-scroll hideScrollbar ${r==="dark"?"bg-[#2D3748]":"bg-[#ffffff]"}`,children:o.jsxDEV(E,{className:`${r==="dark"?"bg-[#2D3748]":"bg-[#ffffff]"}`,children:[o.jsxDEV(M,{placeholder:`Search ${t}`,onChange:N,colorMode:r,className:r==="dark"?"text-[#fff]":"text-[#000]"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:84,columnNumber:11},this),o.jsxDEV(A,{children:["No ",t," found."]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:91,columnNumber:11},this),o.jsxDEV(V,{children:[s?o.jsxDEV(f,{value:s.toString(),onSelect:e=>{n(e),u(!1),c(l,"medicine_name",s),c(l,"notes","")},className:"dark:text-white capitalize",children:[o.jsxDEV(b,{className:`mr-2 h-4 w-4 ${s.toLowerCase()===s.toLowerCase()?"opacity-100":"opacity-0"}`},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:104,columnNumber:17},this),s]},s,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:94,columnNumber:15},this):null,a==null?void 0:a.map(e=>o.jsxDEV(f,{value:e.title.toString(),onSelect:i=>{n(i),u(!1),c(l,"medicine_name",e.title),c(l,"notes",e.notes)},className:"dark:text-white capitalize",children:[o.jsxDEV(b,{className:`mr-2 h-4 w-4 ${(s==null?void 0:s.toLowerCase())===(e==null?void 0:e.title.toLowerCase())?"opacity-100":"opacity-0"}`},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:125,columnNumber:17},this),e==null?void 0:e.title]},e.id,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:115,columnNumber:15},this))]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:92,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:80,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:76,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Components/MedicineAutocomplete.jsx",lineNumber:61,columnNumber:5},this)}const S=async()=>(await w(C.token,"get_prescribe_medicines")).data,O=()=>{const{isLoading:a,data:c,error:t}=y({queryKey:["medicines"],queryFn:S});return{medicinesData:c,medicinesLoading:a,medicinesError:t}};export{_ as M,O as u};
