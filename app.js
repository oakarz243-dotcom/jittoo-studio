const KEY="vc_gold_products_v1";
const fallbackImage="assets/jewelry-1.jpeg";
const seed=[
{id:"p1",name:"Butterfly Heart Pendant",category:"pendant",description:"နေ့စဉ်ဝတ်ဖို့ သေးသွယ်ပြီး ချစ်စရာ pendant design",color:"Gold",stock:8,price:"",image:"assets/jewelry-1.jpeg"},
{id:"p2",name:"Classic Heart Chain",category:"necklace",description:"ရိုးရှင်းတဲ့ heart pendant နဲ့ everyday chain",color:"Gold",stock:5,price:"",image:"assets/jewelry-1.jpeg"},
{id:"p3",name:"Flower Charm Necklace",category:"necklace",description:"ပန်းပွင့် charm နဲ့ လှပတဲ့ gold-tone necklace",color:"Gold",stock:6,price:"",image:"assets/jewelry-2.jpeg"},
{id:"p4",name:"Four Leaf Pendant",category:"pendant",description:"Four-leaf inspired pendant design",color:"Gold",stock:4,price:"",image:"assets/jewelry-2.jpeg"},
{id:"p5",name:"Minimal Bar Chain",category:"chain",description:"Minimal bar style chain",color:"Gold",stock:9,price:"",image:"assets/jewelry-3.jpeg"},
{id:"p6",name:"Butterfly Drop Necklace",category:"necklace",description:"Butterfly drop detail နဲ့ လက်ဆောင်ပေးဖို့ကောင်းတဲ့ design",color:"Gold",stock:3,price:"",image:"assets/jewelry-3.jpeg"},
{id:"p7",name:"Color Stone Pendant",category:"pendant",description:"Color stone accent ပါတဲ့ collection",color:"Green / Red / Pink",stock:7,price:"",image:"assets/jewelry-4.jpeg"},
{id:"p8",name:"Pearl Drop Necklace",category:"necklace",description:"Pearl drop detail ပါတဲ့ feminine design",color:"Gold",stock:5,price:"",image:"assets/jewelry-4.jpeg"},
{id:"p9",name:"Infinity Circle",category:"pendant",description:"Circle & infinity inspired pendant",color:"Gold / Silver",stock:2,price:"",image:"assets/jewelry-5.jpeg"},
{id:"p10",name:"Double Ring Pendant",category:"pendant",description:"Modern double-ring pendant",color:"Gold",stock:4,price:"",image:"assets/jewelry-5.jpeg"},
{id:"p11",name:"Clover Charm Chain",category:"chain",description:"Clover charm နဲ့ delicate chain",color:"Gold",stock:10,price:"",image:"assets/jewelry-2.jpeg"},
{id:"p12",name:"Premium Charm Set",category:"set",description:"Charm style collection set",color:"Gold",stock:3,price:"",image:"assets/jewelry-1.jpeg"}
];
function getProducts(){try{const x=JSON.parse(localStorage.getItem(KEY));return Array.isArray(x)&&x.length?x:seed}catch{return seed}}
function money(v){return v?`Ks ${v}`:"ဈေးနှုန်း — ဆိုင်မှာမေးရန်"}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function render(){
 const list=getProducts(), q=(document.querySelector("#search")?.value||"").toLowerCase().trim(), cat=document.querySelector("#categoryFilter")?.value||"all";
 const filtered=list.filter(p=>(cat==="all"||p.category===cat)&&`${p.name} ${p.description} ${p.color}`.toLowerCase().includes(q));
 const wrap=document.querySelector("#products"); if(!wrap)return;
 wrap.innerHTML=filtered.map(p=>`<article class="product-card">
  <div class="product-image"><img src="${p.image||fallbackImage}" alt="${esc(p.name)}"><span class="stock-pill ${p.stock<1?"out":""}">${p.stock>0?`In Stock · ${p.stock}`:"Out of Stock"}</span></div>
  <div class="product-info"><div class="category">${esc(p.category)}</div><h3>${esc(p.name)}</h3><div class="desc">${esc(p.description||"")}</div>
  <div class="product-bottom"><span class="price">${money(esc(p.price||""))}</span><button class="mini-btn" data-id="${p.id}">ကြည့်မယ်</button></div></div></article>`).join("");
 document.querySelector("#empty").classList.toggle("hidden",filtered.length>0);
 wrap.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>openProduct(b.dataset.id));
}
function openProduct(id){
 const p=getProducts().find(x=>x.id===id);if(!p)return;
 const modal=document.querySelector("#modal"), content=document.querySelector("#modalContent");
 const disabled=p.stock<1;
 content.innerHTML=`<div class="modal-product"><img src="${p.image||fallbackImage}" alt="${esc(p.name)}"><div>
 <div class="category">${esc(p.category)}</div><h2>${esc(p.name)}</h2><p class="muted">${esc(p.description||"")}</p>
 <div><b>ရနိုင်တဲ့အရောင်</b><div class="color-list">${String(p.color||"Gold").split("/").map(c=>`<span class="color-tag">${esc(c.trim())}</span>`).join("")}</div></div>
 <div><b>In Stock: ${p.stock}</b><div class="order-box"><div class="qty-row"><span>အရေအတွက်</span><input id="orderQty" type="number" min="1" max="${Math.max(1,p.stock)}" value="1" ${disabled?"disabled":""}></div>
 <div class="modal-actions"><button id="telegramOrder" class="btn btn-gold" ${disabled?"disabled":""}>Telegram မှာမှာမယ် ↗</button><button id="copyOrder" class="btn btn-light">Order စာသား Copy</button></div></div></div></div></div>`;
 modal.classList.remove("hidden");
 document.querySelector("#telegramOrder")?.addEventListener("click",()=>sendOrder(p));
 document.querySelector("#copyOrder")?.addEventListener("click",async()=>{const q=document.querySelector("#orderQty")?.value||1;await navigator.clipboard?.writeText(orderText(p,q));alert("Order စာသားကို Copy လုပ်ပြီးပါပြီ။ Telegram chat ထဲ Paste လုပ်ပါ။")});
}
function orderText(p,q){return `မင်္ဂလာပါ VC Gold Collection မှာ order မှာချင်ပါတယ်။\nပစ္စည်း: ${p.name}\nအရောင်: ${p.color}\nအရေအတွက်: ${q}\nStock ပြထားသည့်အချိန်: ${p.stock}\nLocation: Mandalay, Myanmar\nPhone: 09458988516`;}
function sendOrder(p){const q=document.querySelector("#orderQty")?.value||1;const text=encodeURIComponent(orderText(p,q));window.open(`https://t.me/vcafemm?text=${text}`,"_blank","noopener")}
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelector("#year").textContent=new Date().getFullYear();
 document.querySelector("#search")?.addEventListener("input",render);document.querySelector("#categoryFilter")?.addEventListener("change",render);
 document.querySelectorAll("[data-close]").forEach(x=>x.onclick=()=>document.querySelector("#modal").classList.add("hidden"));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelector("#modal")?.classList.add("hidden")});
 render();
});
