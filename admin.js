const KEY="vc_gold_products_v1";
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
const $=s=>document.querySelector(s);
function get(){try{const x=JSON.parse(localStorage.getItem(KEY));return Array.isArray(x)&&x.length?x:seed}catch{return seed}}
function save(x){localStorage.setItem(KEY,JSON.stringify(x))}
function uid(){return "p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function resetForm(){
 $("#editId").value="";$("#formTitle").textContent="ပစ္စည်းအသစ်ထည့်ရန်";$("#name").value="";$("#category").value="necklace";$("#description").value="";$("#color").value="Gold";$("#stock").value=1;$("#price").value="";$("#image").value="";$("#preview").src="assets/jewelry-1.jpeg";
}
function renderAdmin(){
 const list=get();$("#statProducts").textContent=list.length;$("#statStock").textContent=list.reduce((a,p)=>a+Number(p.stock||0),0);
 const colors=new Set(list.flatMap(p=>String(p.color||"").split("/").map(x=>x.trim()).filter(Boolean)));$("#statColors").textContent=colors.size;
 $("#adminProducts").innerHTML=list.map(p=>`<div class="admin-item"><img src="${p.image||"assets/jewelry-1.jpeg"}" alt=""><div><h3>${esc(p.name)}</h3><div class="admin-meta">${esc(p.category)} • Color: ${esc(p.color)} • <b>Stock: ${p.stock}</b>${p.price?` • ${esc(p.price)} Ks`:""}</div></div><div class="admin-actions"><button data-edit="${p.id}">Edit</button><button class="danger" data-del="${p.id}">Delete</button></div></div>`).join("");
 document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProduct(b.dataset.edit));document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>deleteProduct(b.dataset.del));
}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function editProduct(id){
 const p=get().find(x=>x.id===id);if(!p)return;$("#editId").value=p.id;$("#formTitle").textContent="ပစ္စည်းပြင်ရန်";$("#name").value=p.name;$("#category").value=p.category;$("#description").value=p.description||"";$("#color").value=p.color||"Gold";$("#stock").value=p.stock;$("#price").value=p.price||"";$("#preview").src=p.image||"assets/jewelry-1.jpeg";window.scrollTo({top:0,behavior:"smooth"});
}
function deleteProduct(id){if(!confirm("ဒီပစ္စည်းကို ဖျက်မှာ သေချာပါသလား?"))return;save(get().filter(p=>p.id!==id));renderAdmin()}
let uploadedImage="";
$("#image").addEventListener("change",e=>{const f=e.target.files?.[0];if(!f)return;const reader=new FileReader();reader.onload=()=>{uploadedImage=reader.result;$("#preview").src=uploadedImage};reader.readAsDataURL(f)});
$("#productForm").addEventListener("submit",e=>{
 e.preventDefault();const list=get(),id=$("#editId").value||uid(), old=list.find(p=>p.id===id);
 const item={id,name:$("#name").value.trim(),category:$("#category").value,description:$("#description").value.trim(),color:$("#color").value.trim()||"Gold",stock:Math.max(0,Number($("#stock").value||0)),price:$("#price").value.trim(),image:uploadedImage||old?.image||"assets/jewelry-1.jpeg"};
 const next=old?list.map(p=>p.id===id?item:p):[item,...list];save(next);uploadedImage="";resetForm();renderAdmin();alert("ပစ္စည်းသိမ်းပြီးပါပြီ။ Shop page မှာ ပြန်ကြည့်နိုင်ပါတယ်။");
});
$("#resetForm").onclick=()=>{uploadedImage="";resetForm()};$("#logout").onclick=()=>{sessionStorage.removeItem("vc_admin");location.reload()};
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();if($("#username").value==="admin"&&$("#password").value==="admin1234"){sessionStorage.setItem("vc_admin","1");$("#loginPanel").classList.add("hidden");$("#adminPanel").classList.remove("hidden");renderAdmin()}else $("#loginError").textContent="Username သို့မဟုတ် Password မမှန်ပါ။"});
if(sessionStorage.getItem("vc_admin")==="1"){$("#loginPanel").classList.add("hidden");$("#adminPanel").classList.remove("hidden");renderAdmin()}
