var x=i=>{throw TypeError(i)};var C=(i,t,s)=>t.has(i)||x("Cannot "+s);var e=(i,t,s)=>(C(i,t,"read from private field"),s?s.call(i):t.get(i)),b=(i,t,s)=>t.has(i)?x("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,s),p=(i,t,s,r)=>(C(i,t,"write to private field"),r?r.call(i,s):t.set(i,s),s),m=(i,t,s)=>(C(i,t,"access private method"),s);import{as as U,av as k,aS as w,aT as q,aE as R,x as L,r as f}from"./index-DPnYdkUz.js";import{n as T,s as j}from"./utils-CbOPTj9R.js";var u,l,o,h,a,g,E,K,A=(K=class extends U{constructor(t,s){super();b(this,a);b(this,u);b(this,l);b(this,o);b(this,h);p(this,u,t),this.setOptions(s),this.bindMethods(),m(this,a,g).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var r;const s=this.options;this.options=e(this,u).defaultMutationOptions(t),k(this.options,s)||e(this,u).getMutationCache().notify({type:"observerOptionsUpdated",mutation:e(this,o),observer:this}),s!=null&&s.mutationKey&&this.options.mutationKey&&w(s.mutationKey)!==w(this.options.mutationKey)?this.reset():((r=e(this,o))==null?void 0:r.state.status)==="pending"&&e(this,o).setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=e(this,o))==null||t.removeObserver(this)}onMutationUpdate(t){m(this,a,g).call(this),m(this,a,E).call(this,t)}getCurrentResult(){return e(this,l)}reset(){var t;(t=e(this,o))==null||t.removeObserver(this),p(this,o,void 0),m(this,a,g).call(this),m(this,a,E).call(this)}mutate(t,s){var r;return p(this,h,s),(r=e(this,o))==null||r.removeObserver(this),p(this,o,e(this,u).getMutationCache().build(e(this,u),this.options)),e(this,o).addObserver(this),e(this,o).execute(t)}},u=new WeakMap,l=new WeakMap,o=new WeakMap,h=new WeakMap,a=new WeakSet,g=function(){var s;const t=((s=e(this,o))==null?void 0:s.state)??q();p(this,l,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},E=function(t){R.batch(()=>{var s,r,n,v,c,y,M,S;if(e(this,h)&&this.hasListeners()){const d=e(this,l).variables,O=e(this,l).context;(t==null?void 0:t.type)==="success"?((r=(s=e(this,h)).onSuccess)==null||r.call(s,t.data,d,O),(v=(n=e(this,h)).onSettled)==null||v.call(n,t.data,null,d,O)):(t==null?void 0:t.type)==="error"&&((y=(c=e(this,h)).onError)==null||y.call(c,t.error,d,O),(S=(M=e(this,h)).onSettled)==null||S.call(M,void 0,t.error,d,O))}this.listeners.forEach(d=>{d(e(this,l))})})},K);function Q(i,t){const s=L(),[r]=f.useState(()=>new A(s,i));f.useEffect(()=>{r.setOptions(i)},[r,i]);const n=f.useSyncExternalStore(f.useCallback(c=>r.subscribe(R.batchCalls(c)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),v=f.useCallback((c,y)=>{r.mutate(c,y).catch(T)},[r]);if(n.error&&j(r.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:v,mutateAsync:n.mutate}}export{Q as u};
