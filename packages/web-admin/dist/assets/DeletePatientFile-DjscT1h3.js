import{w as k,r as h,x as E,v as e,B as p,T as D,R as T,S as B,y as b,aG as q,z as w,D as A}from"./index-DPnYdkUz.js";import{a as L}from"./index-DKSfyVZ9.js";import{h as O,u as V,M as I,b as U,a as Q,c as y,g as H,d as S,F as J,e as C,f as c}from"./index.esm-7HBFntiH.js";import{D as F}from"./createLucideIcon-cf9l0Mkm.js";import{d as K,I as v,F as G}from"./utils-CbOPTj9R.js";import{V as W,A as X,a as Y}from"./Dashboard-yaE9KkgM.js";function te({isOpen:f,onClose:n,data:i}){const{t:a}=k(),[o,l]=h.useState(),[m,r]=h.useState(null),{register:d,handleSubmit:P,reset:N}=O(),s=h.useRef(),j=E(),g=V(),z=t=>{t.preventDefault();const u=t.dataTransfer.files[0];r(u)},R=t=>{t.preventDefault()},_=t=>{const u=t.target.files[0];r(u)},M=async t=>{let u={...t,file:m,id:i.id};try{l(!0);const x=await q(w.token,"update_patient_file",u);l(!1),x.response===200?(c(g,"success",a("patients.patientFiles.update.messages.success")),j.invalidateQueries(["patient-files",i.patient_id]),j.invalidateQueries(["all-files"]),N(),r(null),n()):c(g,"error",a("patients.patientFiles.update.messages.error"))}catch(x){l(!1),c(g,"error",JSON.stringify(x))}};return e.jsxDEV(I,{isOpen:f,onClose:n,isCentered:!0,size:"lg",scrollBehavior:"inside",children:[e.jsxDEV(U,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:79,columnNumber:7},this),e.jsxDEV(Q,{as:"form",onSubmit:P(M),children:[e.jsxDEV(y,{fontSize:18,py:2,children:a("patients.patientFiles.update.title")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:81,columnNumber:9},this),e.jsxDEV(H,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:84,columnNumber:9},this),e.jsxDEV(F,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:85,columnNumber:9},this),e.jsxDEV(S,{children:e.jsxDEV(p,{pb:3,children:[e.jsxDEV(K,{isRequired:!0,children:[e.jsxDEV(J,{children:a("patients.patientFiles.update.form.title.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:89,columnNumber:15},this),e.jsxDEV(v,{defaultValue:i==null?void 0:i.file_name,placeholder:a("patients.patientFiles.update.form.title.placeholder"),...d("file_name",{required:!0})},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:90,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:88,columnNumber:13},this),e.jsxDEV(p,{mt:5,p:4,border:"2px dashed",borderColor:"gray.300",borderRadius:"md",onDrop:z,onDragOver:R,onClick:()=>{s.current&&s.current.click()},cursor:"pointer",children:m?e.jsxDEV(p,{position:"relative",children:[e.jsxDEV(D,{children:[a("patients.patientFiles.update.form.file.selectedFile"),": ",m.name]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:104,columnNumber:19},this),e.jsxDEV(T,{position:"absolute",right:-2,top:-2,size:"sm",onClick:()=>{r(null)}},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:106,columnNumber:19},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:102,columnNumber:17},this):e.jsxDEV(p,{children:[e.jsxDEV(W,{children:e.jsxDEV(v,{ref:s,type:"file",onChange:_,accept:".jpeg, .svg, .png , .jpg",mb:4},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:115,columnNumber:21},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:114,columnNumber:19},this),e.jsxDEV(B,{children:[" ",e.jsxDEV(L,{fontSize:32},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:127,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:125,columnNumber:19},this),e.jsxDEV(D,{textAlign:"center",mt:3,children:[e.jsxDEV("b",{children:a("patients.patientFiles.update.form.file.choose")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:133,columnNumber:21},this)," ",a("patients.patientFiles.update.form.file.dragHere")]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:129,columnNumber:19},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:113,columnNumber:17},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:93,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:87,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:86,columnNumber:9},this),e.jsxDEV(F,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:140,columnNumber:9},this),e.jsxDEV(C,{py:3,children:[e.jsxDEV(b,{colorScheme:"gray",mr:3,onClick:n,size:"sm",children:a("patients.patientFiles.update.form.close")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:142,columnNumber:11},this),e.jsxDEV(b,{variant:"solid",size:"sm",colorScheme:"blue",type:"submit",isLoading:o,children:a("patients.patientFiles.update.form.update")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:149,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:141,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:80,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/UpdatePatientFiles.jsx",lineNumber:78,columnNumber:5},this)}function ne({isOpen:f,onClose:n,data:i}){const{t:a}=k(),o=V(),l=h.useRef(),m=E(),[r,d]=h.useState(),P=async()=>{let N={id:i.id};try{d(!0);const s=await A(w.token,"delete_patient_file",N);d(!1),s.response===200?(c(o,"success","Patient File Deleted"),m.invalidateQueries({queryKey:["patient-files",i.patient_id]}),m.invalidateQueries({queryKey:["all-files"]}),n()):c(o,"error",s.message)}catch(s){d(!1),c(o,"error",JSON.stringify(s))}};return e.jsxDEV(X,{isOpen:f,onClose:n,leastDestructiveRef:l,isCentered:!0,children:e.jsxDEV(U,{children:e.jsxDEV(Y,{children:[e.jsxDEV(y,{fontSize:"lg",fontWeight:"semi-bold",children:e.jsxDEV(G,{children:[a("patientFiles.delete.title")," ( ",e.jsxDEV("b",{children:i==null?void 0:i.file_name},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:50,columnNumber:50},this)," )"]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:49,columnNumber:13},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:48,columnNumber:11},this),e.jsxDEV(S,{children:a("patientFiles.delete.body")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:54,columnNumber:11},this),e.jsxDEV(C,{children:[e.jsxDEV(b,{ref:l,onClick:n,colorScheme:"gray",size:"sm",children:a("patientFiles.delete.buttons.cancel")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:60,columnNumber:13},this),e.jsxDEV(b,{colorScheme:"red",onClick:P,ml:3,size:"sm",isLoading:r,children:a("patientFiles.delete.buttons.delete")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:64,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:58,columnNumber:11},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:47,columnNumber:9},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:46,columnNumber:7},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Patients/DeletePatientFile.jsx",lineNumber:45,columnNumber:5},this)}export{ne as D,te as U};
