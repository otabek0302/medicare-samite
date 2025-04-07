import{aH as L,V as R,x as U,aq as $,w as K,r as S,v as e,$ as W,B as v,H as b,y as P,K as N,U as G,z as J}from"./index-DPnYdkUz.js";import{e as X,f as Y}from"./index-DLA8CM9n.js";import{h as Z,u as ee,f as ie,F as s}from"./index.esm-7HBFntiH.js";import{u as se}from"./useMutation-VqWrDSyY.js";import{u as re,M as ae}from"./Medicines-DORUaJ6v.js";import{A as me}from"./AddMedicine-CVlXAJ3D.js";import{F as t,d as r,I as n}from"./utils-CbOPTj9R.js";import{C as w,a as D}from"./card-body-CkuVqMTE.js";import{D as A}from"./createLucideIcon-cf9l0Mkm.js";import{H as ne,T as k}from"./Dashboard-yaE9KkgM.js";import{S as f}from"./select-DPafIhJF.js";import{u as ce,I as oe}from"./index-DKSfyVZ9.js";import"./button-r-yWRIgx.js";import"./popover-Cm6ek3zh.js";import"./SettingData-o9nA5JFe.js";import"./HasPermission-B2qlt3qD.js";import"./index-DJio6C7j.js";import"./tr-B7dii5kF.js";import"./image-CECpK_E2.js";import"./visually-hidden.style-CjB5JpNG.js";import"./split-CzYrjwZo.js";const de=async p=>{const d=await G(J.token,"add_prescription",p);if(d.response!==200)throw new Error(d.message);return d};function te(p){return p.some(d=>Object.entries(d).some(([a,u])=>a!=="notes"&&(u===null||u===""||u===void 0)))}function _e(){const{id:p}=L(),d=R(),{register:a,getValues:u}=Z(),E=U(),[V]=$(),g=V.get("appointmentID"),M=V.get("patientID"),_=ee(),{isOpen:C,onOpen:F,onClose:I}=ce(),{t:i}=K(),{medicinesData:T}=re(),[h,x]=S.useState([{medicine_name:"",dosage:1,duration:"For 3 days",time:"After Meal",dose_interval:"Once a Day",notes:""}]),[B,O]=S.useState({medicine_name:"",dosage:1,duration:"For 3 days",time:"After Meal",dose_interval:"Once a Day",notes:""}),l=(o,c,m)=>{x(j=>j.map((y,q)=>q===o?{...y,[c]:m}:y))},H=()=>{x([...h,B]),O({medicine_name:"",dosage:1,duration:"For 3 days",time:"After Meal",dose_interval:"Once a Day",notes:""})},Q=o=>{x(c=>c.filter((m,j)=>j!==o))},z=se({mutationFn:async()=>{if(te(h))throw new Error("Please fill all the fields in medicines");const c={...u(),appointment_id:g,patient_id:M,medicines:h};await de(c)},onSuccess:()=>{E.invalidateQueries(["prescription",p]),E.invalidateQueries(["prescriptios",g]),d(`/appointment/${g}`)},onError:o=>{ie(_,"error",o.message)}});return z.isPending?e.jsxDEV(W,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:129,columnNumber:34},this):e.jsxDEV(v,{children:[e.jsxDEV(t,{justify:"space-between",alignItems:"center",children:[e.jsxDEV(b,{as:"h1",size:"md",children:i("prescriptions.add.title")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:136,columnNumber:9},this),e.jsxDEV(P,{w:120,size:"sm",variant:N("blackButton","gray"),onClick:()=>{d(-1)},children:i("prescriptions.add.buttons.back")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:141,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:133,columnNumber:7},this),e.jsxDEV(v,{children:[" ",e.jsxDEV(w,{mt:5,bg:N("white","gray.700"),children:e.jsxDEV(D,{p:3,as:"form",children:[e.jsxDEV(t,{justify:"space-between",children:[" ",e.jsxDEV(b,{as:"h3",size:"sm",children:"Medicines -"},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:159,columnNumber:15},this)," ",e.jsxDEV(P,{size:"sm",colorScheme:"blue",onClick:F,children:i("prescriptions.add.buttons.newMedicine")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:162,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:157,columnNumber:13},this),e.jsxDEV(A,{mt:2,mb:5},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:167,columnNumber:13},this),h.map((o,c)=>e.jsxDEV(v,{children:[" ",e.jsxDEV(ne,{spacing:4,w:"full",mb:5,align:"flex-end",children:[e.jsxDEV(r,{children:[e.jsxDEV(s,{fontSize:"sm",mb:0,children:i("prescriptions.add.medicine")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:174,columnNumber:21},this),e.jsxDEV(ae,{name:"Medicine",data:T,defaultName:o.medicine_name,handleChange:l,mainIndex:c},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:178,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:173,columnNumber:19},this),e.jsxDEV(r,{w:"150px",children:[e.jsxDEV(s,{fontSize:"sm",mb:0,children:i("prescriptions.add.dosage")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:181,columnNumber:21},this),e.jsxDEV(f,{name:"dosage",value:o.dosage,onChange:m=>l(c,"dosage",m.target.value),size:"md",children:[1,2,3,4,5,6,7,8,9,10].map(m=>e.jsxDEV("option",{value:m,children:m},m,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:194,columnNumber:25},this))},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:186,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:180,columnNumber:19},this),e.jsxDEV(r,{children:[e.jsxDEV(s,{fontSize:"sm",mb:0,children:i("prescriptions.add.duration.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:201,columnNumber:21},this),e.jsxDEV(f,{name:"duration",value:o.duration,onChange:m=>l(c,"duration",m.target.value),size:"md",children:[e.jsxDEV("option",{value:"For 3 days",children:i("prescriptions.add.duration.options.threeDays")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:209,columnNumber:23},this),e.jsxDEV("option",{value:"For 5 days",children:i("prescriptions.add.duration.options.fiveDays")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:212,columnNumber:23},this),e.jsxDEV("option",{value:"For 7 days",children:i("prescriptions.add.duration.options.sevenDays")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:215,columnNumber:23},this),e.jsxDEV("option",{value:"For 15 days",children:i("prescriptions.add.duration.options.fifteenDays")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:218,columnNumber:23},this),e.jsxDEV("option",{value:"For 1 Month",children:i("prescriptions.add.duration.options.oneMonth")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:221,columnNumber:23},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:204,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:200,columnNumber:19},this),e.jsxDEV(r,{children:[e.jsxDEV(s,{fontSize:"sm",mb:0,children:i("prescriptions.add.time.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:227,columnNumber:21},this),e.jsxDEV(f,{size:"md",name:"time",value:o.time,onChange:m=>l(c,"time",m.target.value),children:[e.jsxDEV("option",{value:"After Meal",children:i("prescriptions.add.time.options.afterMeal")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:240,columnNumber:23},this),e.jsxDEV("option",{value:"Before Meal",children:i("prescriptions.add.time.options.beforeMeal")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:243,columnNumber:23},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:233,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:226,columnNumber:19},this),e.jsxDEV(r,{children:[e.jsxDEV(s,{fontSize:"sm",mb:0,children:i("prescriptions.add.doseInterval.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:249,columnNumber:21},this),e.jsxDEV(f,{size:"md",name:"dose_interval",value:o.dose_interval,onChange:m=>l(c,"dose_interval",m.target.value),children:[" ",e.jsxDEV("option",{value:"Once a Day",children:i("prescriptions.add.doseInterval.options.onceADay")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:266,columnNumber:23},this),e.jsxDEV("option",{value:"Every Morning & Evening",children:i("prescriptions.add.doseInterval.options.everyMorningAndEvening")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:269,columnNumber:23},this),e.jsxDEV("option",{value:"3 Times a day",children:i("prescriptions.add.doseInterval.options.threeTimesADay")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:272,columnNumber:23},this),e.jsxDEV("option",{value:"4 Times a day",children:i("prescriptions.add.doseInterval.options.fourTimesADay")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:275,columnNumber:23},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:254,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:248,columnNumber:19},this),e.jsxDEV(r,{children:[e.jsxDEV(s,{fontSize:"sm",mb:0,children:i("prescriptions.add.notes.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:281,columnNumber:21},this),e.jsxDEV(n,{size:"md",name:"notes",value:o.notes,onChange:m=>l(c,"notes",m.target.value)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:286,columnNumber:21},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:280,columnNumber:19},this)," ",e.jsxDEV(t,{mb:"2px",children:[" ",h.length>1&&e.jsxDEV(oe,{"aria-label":"Delete Medicine",size:"md",colorScheme:"red",icon:e.jsxDEV(X,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:302,columnNumber:31},this),onClick:()=>{Q(c)}},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:298,columnNumber:23},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:295,columnNumber:19},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:172,columnNumber:17},this)]},c,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:170,columnNumber:15},this)),e.jsxDEV(P,{onClick:H,size:"sm",colorScheme:"facebook",rightIcon:e.jsxDEV(Y,{},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:316,columnNumber:26},this),children:i("prescriptions.add.buttons.newMedicine")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:312,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:156,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:153,columnNumber:9},this),e.jsxDEV(w,{mt:5,bg:N("white","gray.700"),children:e.jsxDEV(D,{p:3,as:"form",children:[e.jsxDEV(t,{justify:"space-between",children:[" ",e.jsxDEV(b,{as:"h3",size:"sm",children:i("prescriptions.add.form.physicalInformation.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:330,columnNumber:15},this)," "]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:328,columnNumber:13},this),e.jsxDEV(A,{mt:2,mb:5},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:336,columnNumber:13},this),e.jsxDEV(t,{flexWrap:"wrap",gap:5,children:[e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.foodAllergies.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:346,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("food_allergies")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:349,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:343,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.tendencyToBleed.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:357,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("tendency_bleed")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:360,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:354,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.heartDisease.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:368,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("heart_disease")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:371,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:365,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.bloodPressure.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:379,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("blood_pressure")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:382,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:376,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.diabetic.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:390,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("diabetic")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:393,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:387,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.surgery.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:401,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("surgery")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:404,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:398,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.accident.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:412,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("accident")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:415,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:409,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.others.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:423,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("others")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:426,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:420,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.medicalHistory.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:434,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("medical_history")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:437,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:431,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.currentMedication.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:445,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("current_medication")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:448,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:442,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.femalePregnancy.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:456,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("female_pregnancy")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:459,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:453,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.breastFeeding.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:467,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("breast_feeding")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:470,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:464,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.pulseRate.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:478,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("pulse_rate")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:481,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:475,columnNumber:15},this),e.jsxDEV(r,{mt:3,w:"300px",children:[e.jsxDEV(s,{fontSize:"sm",children:i("prescriptions.add.form.temperature.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:489,columnNumber:17},this),e.jsxDEV(n,{size:"md",...a("temperature")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:492,columnNumber:17},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:486,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:340,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:325,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:322,columnNumber:9},this),e.jsxDEV(w,{mt:5,bg:N("white","gray.700"),children:e.jsxDEV(D,{p:3,as:"form",children:[e.jsxDEV(t,{justify:"space-between",children:[" ",e.jsxDEV(b,{as:"h3",size:"sm",children:i("prescriptions.add.form.problemAndAdvice.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:508,columnNumber:15},this)," "]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:506,columnNumber:13},this),e.jsxDEV(A,{mt:2,mb:5},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:514,columnNumber:13},this),e.jsxDEV(r,{children:[e.jsxDEV(s,{fontSize:"md",mb:1,children:i("prescriptions.add.form.problem.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:519,columnNumber:15},this),e.jsxDEV(k,{height:100,...a("problem_desc")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:524,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:518,columnNumber:13},this),e.jsxDEV(r,{children:[e.jsxDEV(s,{fontSize:"md",mb:1,children:i("prescriptions.add.form.tests.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:530,columnNumber:15},this),e.jsxDEV(k,{height:100,...a("test")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:535,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:529,columnNumber:13},this),e.jsxDEV(r,{mt:4,children:[e.jsxDEV(s,{fontSize:"md",mb:1,children:i("prescriptions.add.form.advice.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:541,columnNumber:15},this),e.jsxDEV(k,{height:100,...a("advice")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:546,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:540,columnNumber:13},this),e.jsxDEV(r,{mt:4,children:[e.jsxDEV(s,{fontSize:"md",mb:1,children:i("prescriptions.add.form.nextVisit.label")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:552,columnNumber:15},this),e.jsxDEV(t,{gap:5,alignItems:"center",children:[i("prescriptions.add.form.nextVisit.after"),e.jsxDEV(n,{w:16,type:"number",...a("next_visit"),min:1,defaultValue:1},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:561,columnNumber:17},this),i("prescriptions.add.form.nextVisit.days")]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:557,columnNumber:15},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:551,columnNumber:13},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:503,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:500,columnNumber:9},this),e.jsxDEV(t,{w:"100%",justify:"end",mt:5,children:e.jsxDEV(P,{w:96,colorScheme:"green",size:"sm",onClick:()=>{z.mutate()},children:i("prescriptions.add.buttons.save")},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:577,columnNumber:11},this)},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:573,columnNumber:9},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:151,columnNumber:7},this),e.jsxDEV(me,{isOpen:C,onClose:I},void 0,!1,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:583,columnNumber:7},this)]},void 0,!0,{fileName:"/home/chan/medicare-samite/packages/web-admin/src/Pages/Prescriptions/AddPrescription.jsx",lineNumber:132,columnNumber:5},this)}export{_e as default};
