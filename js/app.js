import { Editor } from './editor/editor.js';
import { AIStudio } from './ai/ai-ui.js';
import { saveProject, loadProject } from './project/storage.js';
import { exportCanvas } from './project/export.js';

const $=s=>document.querySelector(s); const canvas=$('#editorCanvas');
const editor=new Editor(canvas,{onChange:renderLayers,onStatus:m=>$('#statusText').textContent=m});
const ai=new AIStudio(editor,{modal:$('#modal'),title:$('#modalTitle'),body:$('#modalBody')});
const toast=m=>{const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(window.__t);window.__t=setTimeout(()=>e.classList.remove('show'),1800)};
function renderLayers(){const box=$('#layersList');box.innerHTML='';editor.layers.slice().reverse().forEach(l=>{const row=document.createElement('div');row.className='layer'+(l.id===editor.selectedId?' selected':'');row.innerHTML=`<div class="thumb">${l.type==='text'?'T':l.type==='image'?'▧':l.type==='sticker'?'☺':'◇'}</div><div class="name">${l.name}</div><button data-act="up">↑</button><button data-act="down">↓</button><button data-act="lock">${l.locked?'🔒':'🔓'}</button>`;row.onclick=e=>{if(e.target.closest('button'))return;editor.select(l.id);renderLayers()};row.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=b.dataset.act;if(a==='up')editor.moveLayer(l.id,1);if(a==='down')editor.moveLayer(l.id,-1);if(a==='lock')editor.toggleLock(l.id);renderLayers()});box.appendChild(row)});}
function showCanvas(){ $('#emptyState').classList.add('hidden');$('.canvas-wrap').style.display='block'; }
$('#uploadBtn').onclick=()=>$('#fileInput').click(); $('#newBtn').onclick=()=>{editor.reset();$('#emptyState').classList.remove('hidden');$('.canvas-wrap').style.display='none';toast('New project')};
$('#openBtn').onclick=()=>$('#fileInput').click(); $('#saveBtn').onclick=()=>{const blob=saveProject(editor);const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='jittoo-project.json';a.click();URL.revokeObjectURL(a.href);toast('Project saved')};
$('#fileInput').onchange=async e=>{const f=e.target.files[0];if(!f)return;if(f.type==='application/json'||f.name.endsWith('.json')){await loadProject(editor,f);showCanvas();renderLayers();toast('Project loaded')}else{await editor.addImageFile(f);showCanvas();renderLayers();toast('Photo added')}e.target.value=''};
$('#exportBtn').onclick=()=>exportCanvas(editor,'png'); $('#undoBtn').onclick=()=>{editor.undo();renderLayers()}; $('#redoBtn').onclick=()=>{editor.redo();renderLayers()};
$('#zoomIn').onclick=()=>editor.zoomBy(1.1);$('#zoomOut').onclick=()=>editor.zoomBy(.9);$('#fitBtn').onclick=()=>editor.fit();
$('.toolbar').addEventListener('click',e=>{const b=e.target.closest('.tool');if(!b)return;document.querySelectorAll('.tool').forEach(x=>x.classList.remove('active'));b.classList.add('active');const t=b.dataset.tool;if(t==='ai')ai.open();else editor.activateTool(t)});
$('#addLayerBtn').onclick=()=>editor.addShape();
['dragenter','dragover'].forEach(ev=>$('#stageViewport').addEventListener(ev,e=>{e.preventDefault();$('#stageViewport').classList.add('drop-active')}));['dragleave','drop'].forEach(ev=>$('#stageViewport').addEventListener(ev,e=>{e.preventDefault();$('#stageViewport').classList.remove('drop-active')}));$('#stageViewport').addEventListener('drop',async e=>{const f=e.dataTransfer.files[0];if(f?.type.startsWith('image/')){await editor.addImageFile(f);showCanvas();renderLayers()}});
window.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();$('#saveBtn').click()}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?editor.redo():editor.undo();renderLayers()}if(e.key==='Delete')editor.deleteSelected()});
renderLayers();