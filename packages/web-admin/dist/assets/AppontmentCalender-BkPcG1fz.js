import{r as f,w as x,v as e,V as N,B as t,z as m,N as b}from"./index-BqRQ5zR-.js";import{u as g}from"./SettingData-CxfeWvqW.js";import{u as A}from"./HasPermission-BxGNMDGA.js";import{N as D,S as s}from"./Dashboard-DfQ9GR_Q.js";import{A as j}from"./Calender-Hrlrrbll.js";import{u as k}from"./index.esm-CDWxJwJY.js";import{F as h}from"./utils-BcOZwoxx.js";import"./index-CdSaDTFS.js";import"./index-CS1DgOx7.js";import"./createLucideIcon-Ha6tAQX1.js";import"./tr-IqXuou1v.js";import"./image-CynZshwF.js";import"./visually-hidden.style-BiwU0iRL.js";import"./findIndex-Dxv522jr.js";import"./isEqual-CHx164Rp.js";function S(){const a=k(),r="Errortoast",o=f.useRef(null),{hasPermission:p}=A(),{t:n}=x(),l=async()=>{const c=m.role.name==="Doctor"?`get_appointments/doctor/${m.id}`:"get_appointments";return(await b(m.token,c)).data},{isLoading:d,data:i,error:u}=g({queryKey:["all-appointments"],queryFn:l});return u?(a.isActive(r)||a({id:r,title:n("errors.oops"),description:n("errors.somethingWrong"),status:"error",duration:2e3,isClosable:!0,position:"top"}),e.jsxDEV(N,{message:n("errors.somethingWrong")},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:47,columnNumber:12},this)):p("APPOINTMENT_VIEW")?e.jsxDEV(t,{ref:o,children:d||!i?e.jsxDEV(t,{children:[e.jsxDEV(h,{mb:5,justify:"space-between",children:[e.jsxDEV(s,{w:400,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:58,columnNumber:13},this),e.jsxDEV(s,{w:200,h:8},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:62,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:55,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:67,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:72,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:77,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:82,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:87,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:92,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:97,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:102,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:107,columnNumber:11},this),e.jsxDEV(s,{h:10,w:"100%",mt:2},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:112,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:54,columnNumber:9},this):e.jsxDEV(t,{children:e.jsxDEV(j,{appointmentData:i},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:120,columnNumber:11},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:119,columnNumber:9},this)},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:52,columnNumber:5},this):e.jsxDEV(D,{},void 0,!1,{fileName:"/Users/fenix_systems/Desktop/medicare-master/packages/web-admin/src/Pages/Appointments/AppontmentCalender.jsx",lineNumber:49,columnNumber:50},this)}export{S as default};
