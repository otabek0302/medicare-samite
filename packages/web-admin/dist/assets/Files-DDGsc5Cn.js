import{w as Q,r as t,x as ce,v as e,B as o,T as Y,Q as oe,R as ue,y as v,S as fe,z as q,G as _,V as be,K as L,N as xe}from"./index-BqRQ5zR-.js";import{e as pe,f as Ne}from"./index-D6RHo-Rw.js";import{u as ge}from"./SettingData-CxfeWvqW.js";import{F as De}from"./index-CS1DgOx7.js";import{V as Fe,u as ke,N as he,S as C,g as je,D as ye,P as _e,i as Ee}from"./Dashboard-DfQ9GR_Q.js";import{u as H}from"./HasPermission-BxGNMDGA.js";import{U as Pe,D as we}from"./DeletePatientFile-5C8qvgG4.js";import{i as Ue}from"./image-CynZshwF.js";import{a as Ve,u as S,I as R}from"./index-CdSaDTFS.js";import{h as Ae,u as Ce,M as Se,b as ve,a as ze,c as Ie,g as Me,d as Oe,F as B,e as Ye,f as x,L as Le}from"./index.esm-CDWxJwJY.js";import{u as Re}from"./UsePatientsData-DTyhFyzP.js";import{U as Be}from"./UsersComboBox-B-um6-vK.js";import{D as T}from"./createLucideIcon-Ha6tAQX1.js";import{d as $,I as z,F as k}from"./utils-BcOZwoxx.js";import"./tr-IqXuou1v.js";import"./visually-hidden.style-BiwU0iRL.js";import"./popover-DbwkstBv.js";function Te({isOpen:l,onClose:a}){const{t:s}=Q(),[d,c]=t.useState(),[p,u]=t.useState(null),N=t.useRef(),{register:E,handleSubmit:P,reset:h}=Ae(),j=ce(),m=Ce(),f=5*1024*1024,{patientsData:w}=Re(),[g,U]=t.useState(),y=n=>{n.preventDefault();const i=n.dataTransfer.files[0];i&&i.size>f?x(m,"error",s("files.messages.sizeError")):u(i)},D=n=>{n.preventDefault()},V=n=>{const i=n.target.files[0];i&&i.size>f?x(m,"error",s("files.messages.sizeError")):u(i)},A=async n=>{if(!g)return x(m,"error",s("files.messages.patientError"));if(!p)return x(m,"error",s("files.messages.fileError"));let i={...n,patient_id:g.id,file:p};try{c(!0);const b=await fe(q.token,"add_patient_file",i);c(!1),b.response===200?(x(m,"success",s("files.messages.success")),j.invalidateQueries(["patient-files",g.id]),j.invalidateQueries(["all-files"]),u(null),h(),a()):x(m,"error",b.message)}catch(b){c(!1),x(m,"error",JSON.stringify(b))}};return e.jsxDEV(Se,{isOpen:l,onClose:a,isCentered:!0,size:"lg",children:[e.jsxDEV(ve,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:99,columnNumber:7},this),e.jsxDEV(ze,{as:"form",onSubmit:P(A),children:[e.jsxDEV(Ie,{fontSize:18,py:2,children:s("files.title")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:103,columnNumber:9},this),e.jsxDEV(Me,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:108,columnNumber:9},this),e.jsxDEV(T,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:109,columnNumber:9},this),e.jsxDEV(Oe,{children:e.jsxDEV(o,{pb:3,children:[e.jsxDEV($,{isRequired:!0,children:[e.jsxDEV(B,{children:s("files.form.title")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:113,columnNumber:15},this),e.jsxDEV(Be,{data:w,name:"Patient",setState:U,addNew:!1},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:115,columnNumber:15},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:112,columnNumber:13},this),e.jsxDEV($,{isRequired:!0,mt:5,children:[e.jsxDEV(B,{children:s("files.form.fileName")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:125,columnNumber:15},this),e.jsxDEV(z,{placeholder:"Name",...E("file_name",{required:!0})},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:126,columnNumber:15},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:122,columnNumber:13},this),e.jsxDEV(o,{mt:5,p:4,border:"2px dashed",borderColor:"gray.300",borderRadius:"md",onDrop:y,onDragOver:D,onClick:()=>{N.current&&N.current.click()},cursor:"pointer",children:p?e.jsxDEV(o,{position:"relative",children:[e.jsxDEV(Y,{children:[s("files.form.selectedFile"),": ",p.name]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:150,columnNumber:19},this),e.jsxDEV(oe,{position:"absolute",right:-2,top:-2,size:"sm",onClick:()=>{u(null)}},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:152,columnNumber:19},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:148,columnNumber:17},this):e.jsxDEV(o,{children:[e.jsxDEV(Fe,{children:[" ",e.jsxDEV(z,{ref:N,type:"file",onChange:V,accept:"*",mb:4},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:166,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:164,columnNumber:19},this),e.jsxDEV(ue,{children:[" ",e.jsxDEV(Ve,{fontSize:32},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:178,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:176,columnNumber:19},this),e.jsxDEV(Y,{textAlign:"center",mt:3,children:[e.jsxDEV("b",{children:s("files.form.choose")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:183,columnNumber:21},this)," ",s("files.form.dragHere"),".",e.jsxDEV("br",{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:184,columnNumber:21},this),s("files.form.maxSize")]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:180,columnNumber:19},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:163,columnNumber:17},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:132,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:111,columnNumber:11},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:110,columnNumber:9},this),e.jsxDEV(T,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:192,columnNumber:9},this),e.jsxDEV(Ye,{py:3,children:[e.jsxDEV(v,{colorScheme:"gray",mr:3,onClick:a,size:"sm",children:s("files.buttons.close")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:194,columnNumber:11},this),e.jsxDEV(v,{variant:"solid",size:"sm",colorScheme:"blue",type:"submit",isLoading:d,children:s("files.buttons.add")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:201,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:193,columnNumber:9},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:100,columnNumber:7},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/AddFile.jsx",lineNumber:94,columnNumber:5},this)}const $e=(l,a)=>{const s=(l-1)*a;let d=s+a-1;return{startIndex:s,endIndex:d}},Qe=_().subtract(Ee,"days").format("YYYY-MM-DD"),qe=_().format("YYYY-MM-DD");function os(){const{t:l}=Q(),[a,s]=t.useState(),{isOpen:d,onOpen:c,onClose:p}=S(),{hasPermission:u}=H(),{isOpen:N,onOpen:E,onClose:P}=S(),{isOpen:h,onOpen:j,onClose:m}=S(),[f,w]=t.useState(1),[g,U]=t.useState(""),y=ke(g,1e3),[D,V]=t.useState({startDate:Qe,endDate:qe}),{startIndex:A,endIndex:n}=$e(f,50),i=t.useRef(null),b=_(D.startDate).format("YYYY-MM-DD"),I=_(D.endDate).format("YYYY-MM-DD"),G=r=>{s(r)},K=async()=>{const r=await xe(q.token,`get_patient_file_page?start=${A}&end=${n}&search=${y}&start_date=${b}&end_date=${I}`);return{data:r==null?void 0:r.data.map(Z=>{const{id:ee,patient_id:se,file_name:ie,file:ae,f_name:re,l_name:ne,phone:te,isd_code:me,updated_at:le,created_at:de}=Z;return{id:ee,patient_id:se,"file name":e.jsxDEV(Le,{isExternal:!0,href:`${Ue}/${ae}`,display:"flex",alignItems:"center",gap:3,children:[ie," ",e.jsxDEV(Ne,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:102,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:96,columnNumber:11},this),patient_Name:`${re} ${ne}`,phone:`${me}${te}`,created_at:de,updated_at:le}}),total_record:r.total_record}},{data:F,isLoading:W,error:M}=ge({queryKey:["all-files",y,f,b,I],queryFn:K}),J=r=>{w(r)},X=Math.ceil((F==null?void 0:F.total_record)/50);return t.useEffect(()=>{i.current&&i.current.scrollIntoView({behavior:"smooth",block:"start"})},[f]),M?e.jsxDEV(be,{errorCode:M.name},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:144,columnNumber:21},this):u("FILE_VIEW")?e.jsxDEV(o,{ref:i,children:[W||!F?e.jsxDEV(o,{children:[e.jsxDEV(k,{mb:5,justify:"space-between",children:[e.jsxDEV(C,{w:400,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:154,columnNumber:13},this),e.jsxDEV(C,{w:200,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:158,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:151,columnNumber:11},this),[...Array(10)].map((r,O)=>e.jsxDEV(C,{h:10,w:"100%",mt:2},O,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:164,columnNumber:13},this))]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:150,columnNumber:9},this):e.jsxDEV(o,{children:[e.jsxDEV(k,{mb:5,justify:"space-between",align:"center",children:[e.jsxDEV(k,{align:"center",gap:4,children:[e.jsxDEV(z,{size:"md",placeholder:"Search",w:400,maxW:"50vw",onChange:r=>U(r.target.value),value:g},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:181,columnNumber:15},this),e.jsxDEV(je,{dateRange:D,setDateRange:V,size:"md"},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:190,columnNumber:15},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:178,columnNumber:13},this),e.jsxDEV(o,{children:e.jsxDEV(v,{isDisabled:!u("FILE_ADD"),size:"sm",colorScheme:"blue",onClick:c,children:l("files.buttons.add")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:197,columnNumber:15},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:196,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:174,columnNumber:11},this),e.jsxDEV(ye,{minPad:"8px 8px",data:F.data,onActionClick:e.jsxDEV(He,{onClick:G,DeleteonOpen:j,EditonOpen:E},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:212,columnNumber:15},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:207,columnNumber:11},this),e.jsxDEV(k,{justify:"center",mt:4,children:e.jsxDEV(_e,{currentPage:f,onPageChange:J,totalPages:X},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:222,columnNumber:13},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:219,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:173,columnNumber:9},this),d&&e.jsxDEV(Te,{isOpen:d,onClose:p},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:231,columnNumber:9},this),N&&e.jsxDEV(Pe,{isOpen:N,onClose:P,data:a},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:237,columnNumber:9},this),h&&e.jsxDEV(we,{isOpen:h,onClose:m,data:a},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:244,columnNumber:9},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:148,columnNumber:5},this):e.jsxDEV(he,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:145,columnNumber:43},this)}const He=({onClick:l,rowData:a,DeleteonOpen:s,EditonOpen:d})=>{const{hasPermission:c}=H();return e.jsxDEV(k,{justify:"center",children:[c("FILE_UPDATE")&&e.jsxDEV(R,{"aria-label":"Edit file",size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{l(a),d()},icon:e.jsxDEV(pe,{fontSize:18,color:L.colors.blue[500]},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:272,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:260,columnNumber:9},void 0),c("FILE_DELETE")&&e.jsxDEV(R,{"aria-label":"Delete file",size:"sm",variant:"ghost",_hover:{background:"none"},onClick:()=>{l(a),s()},icon:e.jsxDEV(De,{fontSize:18,color:L.colors.red[500]},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:292,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:280,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Files/Files.jsx",lineNumber:258,columnNumber:5},void 0)};export{os as default};
