import{x as A,r as E,w as k,v as e,y as p,U as V,z as y,J as C}from"./index-DPnYdkUz.js";import{u as z}from"./useMutation-VqWrDSyY.js";import{u as S,h as I,f as h,M,b as O,a as q,c as _,g as R,d as F,F as t,e as L}from"./index.esm-7HBFntiH.js";import{u as B,f as T}from"./index-DKSfyVZ9.js";import{I as Y}from"./IsdModal-CDLqM4QY.js";import{t as G}from"./today-D_vLUvRX.js";import{D as Q}from"./createLucideIcon-cf9l0Mkm.js";import{G as J}from"./grid-BRKQYmn5.js";import{d as m,I as n}from"./utils-CbOPTj9R.js";import{I as K}from"./input-group-DWmv1S0J.js";import{I as H}from"./input-addon-CU1dmJBi.js";import{S as U}from"./select-DPafIhJF.js";const $=async d=>{const r=await V(y.token,"add_patient",d);if(r.response!==200)throw new Error(r.message);return r};function oe({nextFn:d,isOpen:r,onClose:o}){const b=A(),c=S(),{register:i,handleSubmit:N,reset:P,watch:l}=I(),[u,g]=E.useState("+998"),{isOpen:x,onOpen:j,onClose:v}=B(),{t:a}=k(),f=z({mutationFn:async s=>{await $(s)},onError:s=>{h(c,"error",JSON.stringify(s))},onSuccess:()=>{d&&d({f_name:l("f_name"),l_name:l("l_name"),phone:l("phone")}),h(c,"success",a("patients.add.messages.success")),b.invalidateQueries({queryKey:["users"]}),b.invalidateQueries({queryKey:["patients"]}),o(),P()}}),D=s=>{if(!u)return h(c,"error",a("patients.add.messages.errors.selectIsd"));const w={...s,isd_code:u,dob:s.dob?C(s.dob).format("YYYY-MM-DD"):""};f.mutate(w)};return e.jsxDEV(M,{isOpen:r,onClose:o,isCentered:!0,size:"xl",scrollBehavior:"inside",children:[e.jsxDEV(O,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:68,columnNumber:7},this),e.jsxDEV("form",{onSubmit:N(D),children:e.jsxDEV(q,{borderRadius:8,overflow:"hidden",zIndex:99999999,children:[e.jsxDEV(_,{py:4,fontSize:"md",bg:"blue.700",color:"#fff",children:a("patients.add.title")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:71,columnNumber:11},this),e.jsxDEV(R,{top:0,color:"#fff"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:74,columnNumber:11},this),e.jsxDEV(Q,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:75,columnNumber:11},this),e.jsxDEV(F,{children:e.jsxDEV(J,{templateColumns:"repeat(3, 1fr)",gap:6,mt:3,children:[e.jsxDEV(m,{isRequired:!0,gridColumn:"span 3",children:[e.jsxDEV(t,{mb:-1,children:a("patients.add.form.firstName.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:80,columnNumber:17},this),e.jsxDEV(n,{size:"sm",variant:"flushed",...i("f_name"),placeholder:a("patients.add.form.firstName.placeholder")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:81,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:79,columnNumber:15},this),e.jsxDEV(m,{isRequired:!0,gridColumn:"span 3",children:[e.jsxDEV(t,{mb:-1,children:a("patients.add.form.lastName.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:90,columnNumber:17},this),e.jsxDEV(n,{size:"sm",variant:"flushed",...i("l_name"),placeholder:a("patients.add.form.lastName.placeholder")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:91,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:89,columnNumber:15},this),e.jsxDEV(m,{isRequired:!0,gridColumn:"span 3",children:[e.jsxDEV(t,{mb:-1,children:a("patients.add.form.phone.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:100,columnNumber:17},this),e.jsxDEV(K,{children:[e.jsxDEV(H,{h:8,bg:"none",borderTop:0,borderLeft:0,p:0,pr:2,borderRadius:0,cursor:"pointer",onClick:s=>{s.stopPropagation(),j()},fontSize:"sm",children:[u," ",e.jsxDEV(T,{style:{marginLeft:"10px"}},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:116,columnNumber:32},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:102,columnNumber:19},this),e.jsxDEV(n,{size:"sm",variant:"flushed",type:"tel",placeholder:a("patients.add.form.phone.placeholder"),...i("phone",{required:!0,pattern:/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g})},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:118,columnNumber:19},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:101,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:99,columnNumber:15},this),e.jsxDEV(m,{isRequired:!0,gridColumn:"span 3",children:[e.jsxDEV(t,{mb:-1,children:a("patients.add.form.gender.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:132,columnNumber:17},this),e.jsxDEV(U,{size:"sm",variant:"flushed",defaultValue:a("patients.add.form.gender.options.male"),...i("gender"),placeholder:a("patients.add.form.gender.placeholder"),children:[e.jsxDEV("option",{value:"Male",children:a("patients.add.form.gender.options.male")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:139,columnNumber:19},this),e.jsxDEV("option",{value:"Female",children:a("patients.add.form.gender.options.female")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:140,columnNumber:19},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:133,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:131,columnNumber:15},this),e.jsxDEV(m,{isRequired:!0,gridColumn:"span 3",children:[e.jsxDEV(t,{mb:-1,children:a("patients.add.form.dob.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:145,columnNumber:17},this),e.jsxDEV(n,{max:G(),size:"sm",variant:"flushed",type:"date",...i("dob")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:146,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:144,columnNumber:15},this),e.jsxDEV(m,{gridColumn:"span 3",children:[e.jsxDEV(t,{mb:-1,children:a("patients.add.form.city.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:156,columnNumber:17},this),e.jsxDEV(n,{size:"sm",variant:"flushed",...i("city")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:157,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:155,columnNumber:15},this),e.jsxDEV(m,{gridColumn:"span 3",children:[e.jsxDEV(t,{mb:-1,children:a("patients.add.form.state.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:165,columnNumber:17},this),e.jsxDEV(n,{size:"sm",variant:"flushed",...i("state")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:166,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:164,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:78,columnNumber:13},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:77,columnNumber:11},this),e.jsxDEV(L,{children:[e.jsxDEV(p,{colorScheme:"gray",mr:3,onClick:o,size:"sm",children:a("patients.add.buttons.close")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:176,columnNumber:13},this),e.jsxDEV(p,{colorScheme:"blue",size:"sm",type:"submit",isLoading:f.isPending,children:a("patients.add.buttons.add")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:179,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:175,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:70,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:69,columnNumber:7},this),e.jsxDEV(Y,{isOpen:x,onClose:v,setisd_code:g},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:185,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/AddPatients.jsx",lineNumber:67,columnNumber:5},this)}export{oe as A};
