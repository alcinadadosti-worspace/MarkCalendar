(() => {
'use strict';

// ============ CONSTANTES ============
const COLLABS = {
  joao:    { name:'João',    color:'color-joao',    cssVar:'--c-joao',    initial:'J', photo:'João.jpg',    homeCity:'palmeira' },
  thayane: { name:'Thayane', color:'color-thayane', cssVar:'--c-thayane', initial:'T', photo:'Thayane.png', homeCity:'penedo' },
  lianda:  { name:'Lianda',  color:'color-lianda',  cssVar:'--c-lianda',  initial:'L', photo:'Lianda.png',  homeCity:'penedo' },
  ravy:    { name:'Ravy',    color:'color-ravy',    cssVar:'--c-ravy',    initial:'R', photo:'Ravy.jpg',    homeCity:'penedo' },
  todos:   { name:'Todos',  color:'color-todos',   cssVar:'--c-todos',   initial:'★', photo:'' }
};
const ADMIN_USER = { name:'Suzana', photo:'Suzana.png' };
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const WEEKDAYS_FULL = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
const WEEKDAYS_SHORT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

const EVENT_TYPES = {
  reuniao:    { label:'Reunião',     ico:'📞' },
  entrega:    { label:'Entrega',     ico:'📦' },
  folga:      { label:'Folga',       ico:'🌴' },
  treinamento:{ label:'Treinamento', ico:'📚' },
  viagem:     { label:'Viagem',      ico:'✈️' },
  aniversario:{ label:'Aniversário', ico:'🎂' },
  call:       { label:'Call',        ico:'💻' },
  outro:      { label:'Outro',       ico:'✦' }
};

const EVENT_TEMPLATES = {
  'acao-externa':    { title:'Ação Externa',              type:'viagem',  start:'08:00', end:'12:00', location:'Campo', recurring:'none', desc:'Ação de marketing externa' },
  'reuniao-mensal':  { title:'Reunião Mensal',            type:'reuniao', start:'14:00', end:'16:00', location:'Matriz', recurring:'monthly', desc:'' },
  'reuniao-semanal': { title:'Reunião Semanal',           type:'reuniao', start:'09:00', end:'10:00', location:'Online', recurring:'weekly', desc:'' },
  'evento-vic':      { title:'Evento com Empresas (VIC)', type:'outro',   start:'09:00', end:'17:00', location:'', recurring:'none', desc:'Evento de relacionamento com empresas parceiras' }
};

const STATUS_LABELS = {
  office:  { label:'no escritório', cls:'status-office' },
  home:    { label:'home office',   cls:'status-home' },
  off:     { label:'folga',         cls:'status-off' },
  travel:  { label:'viajando',      cls:'status-travel' },
  field:   { label:'em campo',      cls:'status-field' }
};

// Feriados nacionais 2025-2027 (datas fixas + algumas móveis)
const HOLIDAYS = {
  // 2025
  '2025-01-01':'Confraternização Universal',
  '2025-03-03':'Carnaval',
  '2025-03-04':'Carnaval',
  '2025-04-18':'Sexta-feira Santa',
  '2025-04-21':'Tiradentes',
  '2025-05-01':'Dia do Trabalho',
  '2025-06-19':'Corpus Christi',
  '2025-09-07':'Independência',
  '2025-10-12':'N. Sra. Aparecida',
  '2025-11-02':'Finados',
  '2025-11-15':'Proclamação da República',
  '2025-11-20':'Consciência Negra',
  '2025-12-25':'Natal',
  // 2026
  '2026-01-01':'Confraternização Universal',
  '2026-02-16':'Carnaval',
  '2026-02-17':'Carnaval',
  '2026-04-03':'Sexta-feira Santa',
  '2026-04-21':'Tiradentes',
  '2026-05-01':'Dia do Trabalho',
  '2026-06-04':'Corpus Christi',
  '2026-09-07':'Independência',
  '2026-10-12':'N. Sra. Aparecida',
  '2026-11-02':'Finados',
  '2026-11-15':'Proclamação da República',
  '2026-11-20':'Consciência Negra',
  '2026-12-25':'Natal',
  // 2027
  '2027-01-01':'Confraternização Universal',
  '2027-02-08':'Carnaval',
  '2027-02-09':'Carnaval',
  '2027-03-26':'Sexta-feira Santa',
  '2027-04-21':'Tiradentes',
  '2027-05-01':'Dia do Trabalho',
  '2027-05-27':'Corpus Christi',
  '2027-09-07':'Independência',
  '2027-10-12':'N. Sra. Aparecida',
  '2027-11-02':'Finados',
  '2027-11-15':'Proclamação da República',
  '2027-11-20':'Consciência Negra',
  '2027-12-25':'Natal'
};

// Citações d'O Caibalion (William Walker Atkinson, 1908) — domínio público
const QUOTES = [
  'Os lábios da sabedoria estão fechados, exceto aos ouvidos do Entendimento.',
  'O TODO é MENTE; o Universo é Mental.',
  'Assim em cima como embaixo; assim embaixo como em cima.',
  'Nada está parado; tudo se move; tudo vibra.',
  'Todas as verdades são meias verdades; todos os paradoxos podem ser reconciliados.',
  'Os opostos são idênticos em natureza, mas diferentes em grau; os extremos se encaixam.',
  'Tudo tem fluxo e refluxo; tudo tem suas marés; tudo sobe e desce.',
  'O ritmo é a compensação.',
  'O Acaso nada mais é que um nome dado a uma Lei não reconhecida.',
  'Toda Causa tem seu Efeito; todo Efeito tem sua Causa.',
  'O Gênero se manifesta em todos os planos.',
  'A verdadeira Transmutação Hermética é uma Arte Mental.',
  'Para mudar a vossa disposição de espírito ou vosso estado mental, mudai vossa vibração.',
  'O Ritmo pode ser neutralizado pela aplicação da Arte da Polarização.',
  'Aquele que compreende o Princípio da Vibração, alcançou o cetro do poder.',
  'Aquele que compreende a verdade da Natureza Mental do Universo está bem avançado no Caminho da Mestria.',
  'Os Princípios da Verdade são Sete; aquele que os conhece possui a Chave Mágica.',
  'Ao estudar a mônada, ele entende o arcanjo.',
  'Nada escapa à Lei — mas é possível usar as leis do plano superior para sobrepujar as do inferior.',
  'Os Mestres ajudam a jogar o Jogo da Vida, em vez de serem jogados por ele.',
  'Eles USAM o Princípio, em vez de serem joguetes em suas mãos.',
  'Sob, e por trás de tudo, sempre se haverá de encontrar a Verdade Fundamental.'
];

// Autenticacao via Firebase Auth (senhas nao ficam no codigo)

// ============ ESTADO ============
let state = {
  current: new Date(),
  view: 'month',          // month | week | day
  role: 'viewer',         // admin | viewer
  viewerAs: null,         // 'joao' | 'thayane' | ... (quando viewer)
  filterCollab: null,     // null = todos
  showOnlyMine: false,
  theme: 'light',
  festive: true,
  events: {},             // { 'YYYY-MM-DD': [event,...] }
  birthdays: {            // mes-dia => collab
    '03-15':'joao',
    '07-22':'thayane',
    '10-08':'lianda',
    '11-30':'ravy'
  },
  statuses: {},           // { 'YYYY-MM-DD': { joao:'office', ... } }
  history: [],            // log de ações
  customColors: {},       // { joao: '#XXXXXX' }
  requests: [],           // solicitações (troca de dia, reunião)
  notes: {},              // { 'YYYY-MM-DD': { joao: { text:'...', icon:'📝' } } }
  viewMode: 'mine',       // 'mine' | 'team' (não persiste)
  priorities: {},         // { 'YYYY-MM-DD': { joao: [...itens] } }
  diary: {},              // { 'YYYY-MM-DD': { joao: 'texto' } }
  blocks: {},             // { 'YYYY-MM-DD': { joao: [{start,end,reason}] } }
  reminders: {},          // { 'eventId': { collab: minutos } }
  kudos: [],              // { id, from, to, text, when }
  messages: []            // { id, from, to, text, when, read }
};

state.current.setDate(1);

// ============ STORAGE ============
async function loadAll(){
  const keys = ['events','statuses','history','customColors','birthdays','theme','festive','requests','notes','priorities','diary','blocks','reminders','kudos','messages'];
  for(const k of keys){
    try{
      const r = await window.storage.get(k);
      if(r && r.value){
        const parsed = JSON.parse(r.value);
        state[k] = parsed;
      }
    }catch(e){ /* primeira vez */ }
  }
}
let localSaveCount = 0;
let offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');

async function save(key){
  localSaveCount++;
  localStorage.setItem('cache_' + key, JSON.stringify(state[key]));
  try{
    await window.storage.set(key, JSON.stringify(state[key]));
    updateOnlineStatus(true);
  }catch(e){
    console.warn('save offline, queued:', key);
    if(!offlineQueue.includes(key)) offlineQueue.push(key);
    localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
    updateOnlineStatus(false);
  }
  setTimeout(() => { localSaveCount = Math.max(0, localSaveCount-1); }, 1500);
}

async function flushOfflineQueue(){
  if(!offlineQueue.length) return;
  const queue = [...offlineQueue];
  offlineQueue = [];
  localStorage.setItem('offlineQueue', '[]');
  for(const key of queue){
    try{ await window.storage.set(key, JSON.stringify(state[key])); }
    catch(e){ offlineQueue.push(key); }
  }
  if(offlineQueue.length) localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
  else toast('Dados sincronizados!');
  updateOnlineStatus(!offlineQueue.length);
}

function updateOnlineStatus(online){
  const dot = $('#onlineStatus');
  if(dot){
    dot.className = 'online-dot ' + (online ? 'on' : 'off');
    dot.title = online ? 'Online' : 'Offline — mudanças serão sincronizadas';
  }
}

function startRealtimeSync(){
  db.collection(CALENDAR_COLLECTION).onSnapshot(function(snapshot){
    if(localSaveCount > 0) return;
    let changed = false;
    snapshot.docChanges().forEach(function(change){
      if(change.type === 'added' || change.type === 'modified'){
        var key = change.doc.id;
        var val = change.doc.data().value;
        if(val && state.hasOwnProperty(key)){
          try{
            var parsed = JSON.parse(val);
            if(JSON.stringify(state[key]) !== val){
              var oldVal = state[key];
              state[key] = parsed;
              localStorage.setItem('cache_' + key, val);
              changed = true;
              detectAndNotify(key, oldVal, parsed);
            }
          }catch(e){}
        }
      }
    });
    if(changed) render();
  });
}

// ============ NOTIFICATIONS ============
function requestNotificationPermission(){
  if(!('Notification' in window)) return;
  if(Notification.permission === 'default'){
    try{
      Notification.requestPermission().then(p => {
        if(p === 'granted') toast('🔔 Notificações ativadas');
      }).catch(() => {});
    }catch(e){}
  }
}

function notify(title, body, tag){
  if(!('Notification' in window) || Notification.permission !== 'granted') return;
  if(!document.hidden && !tag) return; // se a aba esta visivel, so notifica eventos importantes (com tag)
  try{
    const n = new Notification(title, {
      body, icon: 'logo.png', badge: 'icon-192.svg',
      tag: tag || ('cal-' + Date.now()), renotify: false
    });
    n.onclick = () => { window.focus(); n.close(); };
    setTimeout(() => n.close(), 8000);
  }catch(e){ console.warn('notify failed', e); }
}

function detectAndNotify(key, oldVal, newVal){
  const me = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  if(!me) return;

  if(key === 'messages'){
    const oldIds = new Set((oldVal||[]).map(m => m.id));
    (newVal||[]).forEach(m => {
      if(!oldIds.has(m.id) && m.to === me && m.from !== me){
        const fromName = m.from === 'admin' ? ADMIN_USER.name : (COLLABS[m.from]?.name || m.from);
        notify(`💬 ${fromName}`, m.text.slice(0, 100), 'msg-' + m.from);
      }
    });
  }

  if(key === 'kudos'){
    const oldIds = new Set((oldVal||[]).map(k => k.id));
    (newVal||[]).forEach(k => {
      if(!oldIds.has(k.id) && k.to === me && k.from !== me){
        const fromName = k.from === 'admin' ? ADMIN_USER.name : (COLLABS[k.from]?.name || k.from);
        notify(`⭐ Elogio de ${fromName}`, k.text.slice(0, 100), 'kudos-' + k.id);
      }
    });
  }

  if(key === 'requests'){
    const oldIds = new Set((oldVal||[]).map(r => r.id));
    (newVal||[]).forEach(r => {
      if(oldIds.has(r.id)) return;
      const fromName = r.who === 'admin' ? ADMIN_USER.name : (COLLABS[r.who]?.name || r.who);
      if(r.type === 'meeting' && r.responses && r.responses[me] === 'pending'){
        notify(`📅 Convite de reunião`, `${fromName} quer marcar reunião em ${r.suggestedDate}`, 'meet-' + r.id);
      } else if(r.type === 'substitute' && r.target === me){
        notify(`🔄 Pedido de substituição`, `${fromName} pediu para você cobrir`, 'sub-' + r.id);
      } else if(r.type === 'date-change' && state.role === 'admin'){
        notify(`🗓️ Nova solicitação`, `${fromName} quer trocar data de um evento`, 'dc-' + r.id);
      }
    });
  }

  if(key === 'events'){
    // detectar @mentions em novos comentarios e nova ajuda/oferta em meus eventos
    Object.entries(newVal || {}).forEach(([dk, evs]) => {
      const oldEvs = (oldVal || {})[dk] || [];
      evs.forEach(ev => {
        const oldEv = oldEvs.find(o => o.id === ev.id);

        // novos comentarios com @mention pra mim
        const oldCommentIds = new Set((oldEv?.comments || []).map(c => c.id));
        (ev.comments || []).forEach(c => {
          if(oldCommentIds.has(c.id) || c.who === me) return;
          // verificar se sou mencionado
          const myName = me === 'admin' ? ADMIN_USER.name : COLLABS[me]?.name;
          if(!myName) return;
          const myKey = me === 'admin' ? 'admin' : me;
          const re = new RegExp('@(' + myKey + '|' + myName.toLowerCase() + ')\\b', 'i');
          if(re.test(c.text)){
            const fromName = c.who === 'admin' ? ADMIN_USER.name : (COLLABS[c.who]?.name || c.who);
            notify(`@ ${fromName} mencionou você`, c.text.slice(0, 100), 'mention-' + c.id);
          }
        });

        // alguem ofereceu ajuda em um evento meu
        const oldOfferIds = new Set((oldEv?.helpOffers || []).map(o => o.who + o.when));
        (ev.helpOffers || []).forEach(o => {
          if(oldOfferIds.has(o.who + o.when) || o.who === me) return;
          const isMyEv = ev.collab === me || (ev.tasks && ev.tasks.some(t => t.collab === me));
          if(isMyEv){
            const fromName = COLLABS[o.who]?.name || o.who;
            notify(`🤝 ${fromName} ofereceu ajuda`, ev.title, 'offer-' + o.who + ev.id);
          }
        });
      });
    });
  }
}

// Sessao gerenciada pelo Firebase Auth (onAuthStateChanged)

// ============ HELPERS ============
const $ = s => document.querySelector(s);
function evVisibleTo(ev, who){ return ev.collab === who || ev.collab === 'todos' || (ev.tasks && ev.tasks.some(t => t.collab === who)); }
function evFullyDone(ev){
  if(ev.tasks && ev.tasks.length){
    return ev.tasks.every(t => t && typeof t === 'object' && t.done === true);
  }
  return !!ev.completed;
}
function evDoneFor(ev, who){
  if(!who) return evFullyDone(ev);
  if(ev.tasks && ev.tasks.length){
    const myTasks = ev.tasks.filter(t => typeof t === 'object' && t.collab === who);
    if(myTasks.length) return myTasks.every(t => t.done);
    return false;
  }
  return !!ev.completed;
}
function evGradient(ev){
  if(!ev.tasks || ev.tasks.length === 0) return null;
  const unique = [...new Set(ev.tasks.map(t => t.collab))].filter(c => COLLABS[c]);
  if(unique.length < 2) return null;
  const colors = unique.map(c => getComputedStyle(document.documentElement).getPropertyValue(COLLABS[c].cssVar).trim() || '#ccc');
  const step = 100 / colors.length;
  const stops = colors.map((col, i) => `${col} ${i*step}%, ${col} ${(i+1)*step}%`).join(', ');
  return `linear-gradient(135deg, ${stops})`;
}
const $$ = s => Array.from(document.querySelectorAll(s));
const pad = n => String(n).padStart(2,'0');
const keyOf = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
const keyFromDate = d => keyOf(d.getFullYear(), d.getMonth(), d.getDate());
const todayObj = new Date();
const todayKey = keyFromDate(todayObj);
const monthDayKey = d => `${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function formatTime(t){ return t || ''; }
function uid(){ return Date.now()+''+Math.random().toString(36).slice(2,8); }

function toast(msg){
  const old = $('.toast'); if(old) old.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role','alert');
  t.setAttribute('aria-live','polite');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 2400);
}

function logHistory(action){
  state.history.unshift({
    id: uid(),
    when: new Date().toISOString(),
    who: state.role === 'admin' ? ADMIN_USER.name : (state.viewerAs ? COLLABS[state.viewerAs].name : 'Colaborador'),
    action
  });
  if(state.history.length > 200) state.history = state.history.slice(0,200);
  save('history');
}

function quoteOfTheDay(){
  const idx = (todayObj.getFullYear() * 1000 + (todayObj.getMonth()+1)*31 + todayObj.getDate()) % QUOTES.length;
  return QUOTES[idx];
}

// detecta carga horária por colaborador num mês
function countEvent(e, counts){
  if(e.tasks && e.tasks.length){
    const seen = new Set();
    e.tasks.forEach(t => {
      if(counts[t.collab]!=null && !seen.has(t.collab)){ counts[t.collab]++; seen.add(t.collab); }
    });
  } else if(counts[e.collab]!=null) counts[e.collab]++;
}

function eventsByCollabInMonth(y, m){
  const counts = {joao:0, thayane:0, lianda:0, ravy:0};
  Object.keys(state.events).forEach(k => {
    const [yy,mm] = k.split('-').map(Number);
    if(yy===y && mm===m+1){
      state.events[k].forEach(e => countEvent(e, counts));
    }
  });
  return counts;
}

function eventsByCollabInWeek(weekStart){
  const counts = {joao:0,thayane:0,lianda:0,ravy:0};
  for(let i=0;i<7;i++){
    const d = new Date(weekStart); d.setDate(d.getDate()+i);
    const k = keyFromDate(d);
    (state.events[k]||[]).forEach(e => countEvent(e, counts));
  }
  return counts;
}

// próximo evento
function nextEvent(){
  const now = new Date();
  let best = null, bestKey = null;
  Object.keys(state.events).sort().forEach(k => {
    (state.events[k]||[]).forEach(ev => {
      const [yy,mm,dd] = k.split('-').map(Number);
      const t = ev.startTime || '09:00';
      const [hh,mi] = t.split(':').map(Number);
      const d = new Date(yy, mm-1, dd, hh, mi||0);
      if(d > now && (!best || d < best.date)){
        best = { event:ev, date:d };
        bestKey = k;
      }
    });
  });
  return best ? {...best, key:bestKey} : null;
}

function isBirthday(date){
  const md = monthDayKey(date);
  return state.birthdays[md] || null;
}

function eventCount(){ return Object.values(state.events).reduce((a,b)=>a+b.length, 0); }

// ============ RENDER PRINCIPAL ============
function render(){
  // tema
  document.documentElement.setAttribute('data-theme', state.theme);

  // aplicar cores custom
  Object.entries(state.customColors).forEach(([col, c]) => {
    if(c) document.documentElement.style.setProperty(COLLABS[col].cssVar, c);
  });

  // título
  const y = state.current.getFullYear();
  const m = state.current.getMonth();
  $('#monthName').textContent = MONTHS_PT[m];
  $('#yearLabel').textContent = y;

  // banner
  renderBanner();

  // sidebar
  renderSidebar();

  // view
  $('#monthView').style.display = state.view === 'month' ? 'block' : 'none';
  $('#weekView').style.display = state.view === 'week' ? 'block' : 'none';
  $('#dayView').style.display = state.view === 'day' ? 'block' : 'none';

  if(state.view === 'month') renderMonth();
  else if(state.view === 'week') renderWeek();
  else renderDay();

  // festive overlay
  renderFestive();
  renderRequestBadge();
}

// ============ BANNER ============
function renderBanner(){
  const next = nextEvent();
  const nextEl = $('#bannerNext');
  if(next){
    const c = COLLABS[next.event.collab];
    const dateStr = `${pad(next.date.getDate())}/${pad(next.date.getMonth()+1)} ${next.event.startTime||''}`.trim();
    nextEl.innerHTML = `<span style="display:inline-block;width:10px;height:10px;border:1px solid var(--ink);border-radius:2px;background:var(${c.cssVar});margin-right:6px;vertical-align:middle"></span><strong style="font-weight:600">${escapeHtml(next.event.title)}</strong> <span style="color:var(--ink-soft);font-style:italic">${dateStr} — ${c.name}</span>`;
  } else {
    nextEl.innerHTML = '<em style="color:var(--ink-soft);font-style:italic">Sem eventos futuros — bom momento pra planejar 🌿</em>';
  }

  $('#bannerQuote').innerHTML = '"' + escapeHtml(quoteOfTheDay()) + '" <span style="font-size:11px;color:var(--ink-soft);font-style:normal;font-family:\'Inter\',sans-serif;letter-spacing:0.05em;text-transform:uppercase;margin-left:4px">— O Caibalion</span>';

  renderBannerWeather();
}

// ============ CLIMA ============
const CITIES = [
  { id:'palmeira',  name:'Palmeira dos Índios', lat:-9.4081, lon:-36.6328 },
  { id:'penedo',    name:'Penedo',              lat:-10.2874, lon:-36.5819 },
  { id:'coruripe',  name:'Coruripe',            lat:-10.1264, lon:-36.1756 },
  { id:'ssebastiao',name:'São Sebastião',       lat:-9.9322, lon:-36.5567 },
  { id:'teotonio',  name:'Teotônio Vilela',     lat:-9.8939, lon:-36.3678 }
];
const WMO_CODES = {
  0:  { ico:'☀️', label:'Céu limpo' },
  1:  { ico:'🌤️', label:'Predominância de sol' },
  2:  { ico:'⛅', label:'Parcialmente nublado' },
  3:  { ico:'☁️', label:'Nublado' },
  45: { ico:'🌫️', label:'Neblina' },
  48: { ico:'🌫️', label:'Neblina com geada' },
  51: { ico:'🌦️', label:'Garoa fraca' },
  53: { ico:'🌦️', label:'Garoa' },
  55: { ico:'🌧️', label:'Garoa intensa' },
  61: { ico:'🌦️', label:'Chuva fraca' },
  63: { ico:'🌧️', label:'Chuva' },
  65: { ico:'🌧️', label:'Chuva intensa' },
  66: { ico:'🌧️', label:'Chuva congelante' },
  67: { ico:'🌧️', label:'Chuva congelante intensa' },
  71: { ico:'🌨️', label:'Neve fraca' },
  73: { ico:'🌨️', label:'Neve' },
  75: { ico:'❄️', label:'Neve intensa' },
  77: { ico:'❄️', label:'Granizo fino' },
  80: { ico:'🌦️', label:'Pancadas leves' },
  81: { ico:'🌧️', label:'Pancadas de chuva' },
  82: { ico:'⛈️', label:'Pancadas fortes' },
  85: { ico:'🌨️', label:'Pancadas de neve' },
  86: { ico:'❄️', label:'Pancadas de neve forte' },
  95: { ico:'⛈️', label:'Tempestade' },
  96: { ico:'⛈️', label:'Tempestade com granizo' },
  99: { ico:'⛈️', label:'Tempestade severa' }
};

let weatherAllCache = {};
let forecastCache = {};
let userCity = null;

function findNearestCity(lat, lon){
  let best = CITIES[1];
  let bestDist = Infinity;
  for(const c of CITIES){
    const d = Math.sqrt((c.lat-lat)**2 + (c.lon-lon)**2);
    if(d < bestDist){ bestDist = d; best = c; }
  }
  return best;
}

async function fetchCityWeather(city){
  if(weatherAllCache[city.id] && (Date.now() - weatherAllCache[city.id].fetchedAt < 30*60*1000)){
    return weatherAllCache[city.id].data;
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&timezone=America/Maceio`;
  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if(!json.current) throw new Error('sem dados');
    weatherAllCache[city.id] = { data: json.current, fetchedAt: Date.now() };
    return json.current;
  } catch(e){
    return null;
  }
}

async function fetchCityForecast(city){
  if(forecastCache[city.id] && (Date.now() - forecastCache[city.id].fetchedAt < 60*60*1000)){
    return forecastCache[city.id].data;
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America/Maceio&forecast_days=7`;
  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if(!json.daily) throw new Error('sem dados');
    forecastCache[city.id] = { data: json.daily, fetchedAt: Date.now() };
    return json.daily;
  } catch(e){
    return null;
  }
}

async function initUserLocation(){
  // 1. Tenta usar a cidade do colaborador (mais preciso)
  const myCollab = state.viewerAs && COLLABS[state.viewerAs];
  if(myCollab && myCollab.homeCity){
    userCity = CITIES.find(c => c.id === myCollab.homeCity) || CITIES[1];
    renderBannerWeather();
    return;
  }
  // 2. Fallback: geolocation
  try {
    const pos = await new Promise((ok, fail) => navigator.geolocation.getCurrentPosition(ok, fail, { timeout:8000 }));
    userCity = findNearestCity(pos.coords.latitude, pos.coords.longitude);
  } catch(e){
    userCity = CITIES[1];
  }
  renderBannerWeather();
}

async function renderBannerWeather(){
  const el = $('#bannerWeather');
  const lbl = $('#bannerWeatherLabel');
  if(!el) return;
  const city = userCity || CITIES[1];
  if(lbl) lbl.textContent = `Clima · ${city.name}/AL`;
  el.innerHTML = `<span style="font-family:'Fraunces',serif;font-size:13px;font-style:italic;color:var(--ink-soft)">consultando...</span>`;
  const data = await fetchCityWeather(city);
  if(!data){
    el.innerHTML = `<span style="font-family:'Fraunces',serif;font-size:13px;font-style:italic;color:var(--ink-faint)">indisponível</span>`;
    return;
  }
  const w = WMO_CODES[data.weather_code] || { ico:'🌡️', label:'Tempo atual' };
  const temp = Math.round(data.temperature_2m);
  const humid = data.relative_humidity_2m != null ? `, ${data.relative_humidity_2m}%` : '';
  el.innerHTML = `<span class="weather-icon">${w.ico}</span><span style="font-family:'Fraunces',serif;font-size:13px;font-style:italic">${w.label}, ${temp}°${humid}</span>`;
}

async function openWeatherModal(){
  const body = $('#weatherBody');
  body.innerHTML = '<p style="text-align:center;color:var(--ink-soft);font-style:italic">Carregando clima de todas as cidades...</p>';
  $('#weatherModal').classList.add('open');

  // Aba atual
  let html = '<div class="weather-tabs"><button class="weather-tab active" data-wtab="now">Agora</button><button class="weather-tab" data-wtab="forecast">Previsão 7 dias</button></div>';
  html += '<div id="weatherNow">';
  const results = await Promise.all(CITIES.map(async c => ({ city:c, data: await fetchCityWeather(c) })));
  for(const r of results){
    const isUser = userCity && r.city.id === userCity.id;
    if(r.data){
      const w = WMO_CODES[r.data.weather_code] || { ico:'🌡️', label:'—' };
      const wind = r.data.wind_speed_10m != null ? `${Math.round(r.data.wind_speed_10m)} km/h` : '';
      html += `<div class="weather-city${isUser?' weather-city-you':''}">
        <div class="weather-city-head">
          <span class="weather-icon" style="font-size:28px">${w.ico}</span>
          <div>
            <strong>${r.city.name}${isUser?' (você está aqui)':''}</strong>
            <span style="color:var(--ink-soft);font-size:12px;display:block">${w.label}</span>
          </div>
        </div>
        <div class="weather-city-stats">
          <span>🌡️ ${Math.round(r.data.temperature_2m)}°C</span>
          <span>💧 ${r.data.relative_humidity_2m ?? '—'}%</span>
          <span>💨 ${wind || '—'}</span>
        </div>
      </div>`;
    } else {
      html += `<div class="weather-city"><strong>${r.city.name}</strong> — <em style="color:var(--ink-faint)">indisponível</em></div>`;
    }
  }
  html += '</div>';

  // Aba previsão (oculta)
  html += '<div id="weatherForecast" style="display:none"><p style="text-align:center;color:var(--ink-soft);font-style:italic">Selecione uma cidade para ver a previsão</p>';
  html += '<div class="weather-forecast-cities">';
  for(const c of CITIES){
    html += `<button class="btn small weather-fc-btn" data-fcity="${c.id}">${c.name}</button>`;
  }
  html += '</div><div id="forecastDetail"></div></div>';

  body.innerHTML = html;

  // Tab switching
  body.querySelectorAll('.weather-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      body.querySelectorAll('.weather-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('weatherNow').style.display = tab.dataset.wtab === 'now' ? '' : 'none';
      document.getElementById('weatherForecast').style.display = tab.dataset.wtab === 'forecast' ? '' : 'none';
    });
  });

  // Forecast city buttons
  body.querySelectorAll('.weather-fc-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      body.querySelectorAll('.weather-fc-btn').forEach(b => b.classList.remove('primary'));
      btn.classList.add('primary');
      const city = CITIES.find(c => c.id === btn.dataset.fcity);
      const detail = document.getElementById('forecastDetail');
      detail.innerHTML = '<p style="text-align:center;color:var(--ink-soft);font-style:italic">Carregando previsão...</p>';
      const fc = await fetchCityForecast(city);
      if(!fc){ detail.innerHTML = '<p style="color:var(--danger)">Não foi possível carregar a previsão.</p>'; return; }
      let fhtml = `<h4 style="font-family:'Fraunces',serif;font-weight:600;margin:14px 0 8px">📅 ${city.name} — próximos 7 dias</h4>`;
      fhtml += '<div class="forecast-grid">';
      for(let i = 0; i < fc.time.length; i++){
        const d = new Date(fc.time[i] + 'T12:00:00');
        const dayName = i === 0 ? 'Hoje' : WEEKDAYS_SHORT[d.getDay()];
        const dayNum = pad(d.getDate()) + '/' + pad(d.getMonth()+1);
        const w = WMO_CODES[fc.weather_code[i]] || { ico:'🌡️', label:'—' };
        const rain = fc.precipitation_probability_max[i];
        const rainClass = rain >= 60 ? 'rain-high' : (rain >= 30 ? 'rain-mid' : 'rain-low');
        fhtml += `<div class="forecast-day">
          <span class="forecast-dayname">${dayName}</span>
          <span class="forecast-date">${dayNum}</span>
          <span style="font-size:24px">${w.ico}</span>
          <span class="forecast-temps">${Math.round(fc.temperature_2m_min[i])}° / <strong>${Math.round(fc.temperature_2m_max[i])}°</strong></span>
          <span class="forecast-rain ${rainClass}">🌧️ ${rain}%</span>
        </div>`;
      }
      fhtml += '</div>';
      detail.innerHTML = fhtml;
    });
  });

  // Auto-selecionar cidade do usuario na aba previsao
  if(userCity){
    const autoBtn = body.querySelector(`[data-fcity="${userCity.id}"]`);
    if(autoBtn) autoBtn.click();
  }
}

// ============ SIDEBAR ============
function renderSidebar(){
  // role hint
  const loggedIn = state.role === 'admin' || state.viewerAs;
  const currentName = state.role === 'admin' ? ADMIN_USER.name : (state.viewerAs ? COLLABS[state.viewerAs].name : '');
  const currentPhoto = state.role === 'admin' ? ADMIN_USER.photo : (state.viewerAs ? COLLABS[state.viewerAs].photo : '');
  if(state.role === 'admin'){
    $('#roleHint').textContent = `Logado como ${ADMIN_USER.name}. Você pode criar, editar e excluir eventos.`;
  } else if(state.viewerAs){
    $('#roleHint').textContent = `Logado como ${COLLABS[state.viewerAs].name}. Você pode confirmar presença e comentar.`;
  } else {
    $('#roleHint').textContent = 'Faça login para acessar.';
  }

  // login/logout toggle visual
  $('#loginBtn').classList.toggle('active', !loggedIn);
  $('#logoutBtn').classList.toggle('active', loggedIn);
  if(loggedIn){
    $('#loginBtn').innerHTML = `<img src="${currentPhoto}" alt="${currentName}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:4px">${currentName}`;
  } else {
    $('#loginBtn').textContent = 'Entrar';
  }
  $('#logoutBtn').style.display = loggedIn ? '' : 'none';

  // viewer status picker
  const vsArea = $('#viewerStatusArea');
  if(vsArea){
    if(state.viewerAs){
      const today = todayKey;
      const current = (state.statuses[today] && state.statuses[today][state.viewerAs]) || 'office';
      vsArea.innerHTML = '<span style="font-size:10px;color:var(--ink-soft);display:block;margin-bottom:4px">Seu status hoje:</span>' +
        '<div class="viewer-status-picker">' +
        Object.entries(STATUS_LABELS).map(([s, sl]) =>
          `<button data-vstatus="${s}" class="${current===s?'active':''}">${sl.label}</button>`
        ).join('') + '</div>';
      vsArea.querySelectorAll('[data-vstatus]').forEach(b => {
        b.addEventListener('click', () => {
          if(!state.statuses[today]) state.statuses[today] = {};
          state.statuses[today][state.viewerAs] = b.dataset.vstatus;
          save('statuses');
          render();
          toast('Status atualizado');
        });
      });
    } else { vsArea.innerHTML = ''; }
  }

  // team view toggle
  const ttArea = $('#teamToggleArea');
  if(ttArea){
    if(state.viewerAs){
      ttArea.innerHTML = '<div class="team-toggle">' +
        `<button data-vmode="mine" class="${state.viewMode==='mine'?'active':''}">Meu calendário</button>` +
        `<button data-vmode="team" class="${state.viewMode==='team'?'active':''}">Ver equipe</button>` +
        '</div>';
      ttArea.querySelectorAll('[data-vmode]').forEach(b => {
        b.addEventListener('click', () => {
          state.viewMode = b.dataset.vmode;
          if(state.viewMode === 'team'){ state.showOnlyMine = false; state.filterCollab = null; }
          else { state.showOnlyMine = true; state.filterCollab = state.viewerAs; }
          render();
        });
      });
    } else { ttArea.innerHTML = ''; }
  }

  // meeting request button + invites + my day + msgs + kudos
  const loggedInAny = state.viewerAs || state.role === 'admin';
  const mrBtn = $('#requestMeetingBtn');
  if(mrBtn) mrBtn.style.display = state.viewerAs ? '' : 'none';
  const myDayBtn = $('#myDayBtn');
  if(myDayBtn) myDayBtn.style.display = state.viewerAs ? '' : 'none';
  // mensagens, kudos e diario disponivel para admin tambem
  const msgsBtn = $('#messagesBtn');
  if(msgsBtn) msgsBtn.style.display = loggedInAny ? '' : 'none';
  const kBtn = $('#kudosBtn');
  if(kBtn) kBtn.style.display = loggedInAny ? '' : 'none';
  const dBtn = $('#diaryBtn');
  if(dBtn) dBtn.style.display = loggedInAny ? '' : 'none';
  renderMessagesBadge();
  renderKudosBadge();
  const invWrap = $('#meetingInvites');
  if(invWrap && state.viewerAs){
    const myInvites = (state.requests||[]).filter(r =>
      r.type === 'meeting' && r.status === 'pending' && r.responses && r.responses[state.viewerAs] === 'pending'
    );
    const mySubs = (state.requests||[]).filter(r =>
      r.type === 'substitute' && r.status === 'pending' && r.target === state.viewerAs
    );
    let html = '';
    if(myInvites.length){
      html += '<h2 class="panel-title" style="font-size:14px;margin-top:12px">📬 Convites de reunião</h2>' +
        myInvites.map(r => {
          const from = COLLABS[r.who] ? COLLABS[r.who].name : r.who;
          const photo = COLLABS[r.who] ? COLLABS[r.who].photo : '';
          const photoHtml = photo ? `<img src="${photo}" style="width:20px;height:20px;border-radius:50%;object-fit:cover">` : '';
          return `<div class="request-card pending" style="font-size:12px">
            <div style="display:flex;align-items:center;gap:6px">${photoHtml}<strong>${from}</strong> te convidou</div>
            <div style="color:var(--ink-soft);font-size:11px;margin:4px 0">${r.suggestedDate} às ${r.suggestedTime}${r.note ? ' · '+escapeHtml(r.note) : ''}</div>
            <div style="display:flex;gap:6px">
              <button class="btn small" data-invite-yes="${r.id}">✓ Aceitar</button>
              <button class="btn small danger" data-invite-no="${r.id}">✗ Recusar</button>
            </div>
          </div>`;
        }).join('');
    }
    if(mySubs.length){
      html += '<h2 class="panel-title" style="font-size:14px;margin-top:12px">🔄 Pedidos de substituição</h2>' +
        mySubs.map(r => {
          const from = COLLABS[r.who] ? COLLABS[r.who].name : r.who;
          const photo = COLLABS[r.who] ? COLLABS[r.who].photo : '';
          const photoHtml = photo ? `<img src="${photo}" style="width:20px;height:20px;border-radius:50%;object-fit:cover">` : '';
          const ev = Object.values(state.events).flat().find(e=>e.id===r.eventId);
          const evTitle = ev ? escapeHtml(ev.title) : '(evento removido)';
          return `<div class="request-card pending" style="font-size:12px">
            <div style="display:flex;align-items:center;gap:6px">${photoHtml}<strong>${from}</strong> pediu para substituir</div>
            <div style="color:var(--ink-soft);font-size:11px;margin:4px 0">${evTitle} em ${r.dateKey}</div>
            <div style="display:flex;gap:6px">
              <button class="btn small" data-sub-yes="${r.id}">✓ Aceitar</button>
              <button class="btn small danger" data-sub-no="${r.id}">✗ Recusar</button>
            </div>
          </div>`;
        }).join('');
    }
    invWrap.innerHTML = html;
    invWrap.querySelectorAll('[data-invite-yes]').forEach(b => {
      b.addEventListener('click', () => respondMeetingRequest(b.dataset.inviteYes, 'yes'));
    });
    invWrap.querySelectorAll('[data-invite-no]').forEach(b => {
      b.addEventListener('click', () => respondMeetingRequest(b.dataset.inviteNo, 'no'));
    });
    invWrap.querySelectorAll('[data-sub-yes]').forEach(b => {
      b.addEventListener('click', () => respondSubstituteRequest(b.dataset.subYes, 'yes'));
    });
    invWrap.querySelectorAll('[data-sub-no]').forEach(b => {
      b.addEventListener('click', () => respondSubstituteRequest(b.dataset.subNo, 'no'));
    });
  } else if(invWrap){ invWrap.innerHTML = ''; }

  // alertas de pedidos de ajuda (admin ve tudo)
  const helpWrap = $('#helpAlerts');
  if(helpWrap){
    const allHelpRequests = [];
    Object.entries(state.events || {}).forEach(([dk, evs]) => {
      evs.forEach(ev => {
        const helps = ev.helpRequests || (ev.helpRequest ? [ev.helpRequest] : []);
        helps.forEach(h => {
          allHelpRequests.push({ ev, dk, ...h });
        });
      });
    });
    // viewer: so ve ajuda em eventos onde tem tarefa, exceto a sua propria
    const myKey = state.viewerAs;
    const visible = state.role === 'admin'
      ? allHelpRequests
      : allHelpRequests.filter(h => h.who !== myKey && evVisibleTo(h.ev, myKey));
    if(visible.length){
      helpWrap.innerHTML = '<h2 class="panel-title" style="font-size:14px;margin-top:12px;color:var(--warn)">🆘 Pedidos de ajuda</h2>' +
        visible.slice(0, 5).map(h => {
          const from = COLLABS[h.who] ? COLLABS[h.who].name : h.who;
          const photo = COLLABS[h.who] ? COLLABS[h.who].photo : '';
          const photoHtml = photo ? `<img src="${photo}" style="width:20px;height:20px;border-radius:50%;object-fit:cover">` : '';
          return `<div class="request-card pending" style="font-size:12px;border-color:var(--warn);cursor:pointer" data-help-event="${h.ev.id}" data-help-date="${h.dk}">
            <div style="display:flex;align-items:center;gap:6px">${photoHtml}<strong>${from}</strong> precisa de ajuda</div>
            <div style="color:var(--ink-soft);font-size:11px;margin-top:4px">${escapeHtml(h.ev.title)} · ${h.dk}</div>
            ${h.reason ? `<div style="font-size:11px;font-style:italic;margin-top:2px">"${escapeHtml(h.reason)}"</div>` : ''}
          </div>`;
        }).join('');
      helpWrap.querySelectorAll('[data-help-event]').forEach(card => {
        card.addEventListener('click', () => {
          const dk = card.dataset.helpDate;
          const parts = dk.split('-');
          state.current = new Date(+parts[0], +parts[1]-1, +parts[2]);
          if(state.view === 'month') state.current.setDate(1);
          openModal(dk);
          render();
        });
      });
    } else { helpWrap.innerHTML = ''; }
  }

  // colaboradores
  const monthCounts = eventsByCollabInMonth(state.current.getFullYear(), state.current.getMonth());
  const collabWrap = $('#collabsList');
  collabWrap.innerHTML = '';
  const collabEntries = Object.entries(COLLABS).filter(([key]) => {
    if(key === 'todos') return false;
    if(state.role === 'viewer' && state.viewerAs && state.viewMode !== 'team') return key === state.viewerAs;
    return true;
  });
  collabEntries.forEach(([key, info]) => {
    const status = (state.statuses[todayKey] && state.statuses[todayKey][key]) || 'office';
    const st = STATUS_LABELS[status];
    const isFiltering = state.filterCollab === key;

    const row = document.createElement('div');
    row.className = 'collab' + (isFiltering ? ' filtering' : '');
    row.innerHTML = `
      <div class="avatar" style="background:var(${info.cssVar})">
        ${info.photo ? `<img src="${info.photo}" alt="${info.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : info.initial}
        <span class="status-dot ${st.cls}" title="${st.label}"></span>
      </div>
      <div class="collab-info">
        <span class="collab-name">${info.name}</span>
        <span class="collab-status">${st.label}</span>
      </div>
      <span class="collab-count">${monthCounts[key]}</span>
    `;
    row.addEventListener('click', e => {
      if(state.role === 'admin'){
        state.filterCollab = state.filterCollab === key ? null : key;
      }
      render();
    });
    collabWrap.appendChild(row);
  });

  // upcoming
  renderUpcoming();

  // summary (gráfico de barras lateral)
  renderSummary();

  // kudos / streak / aniversário do mês
  renderKudos();
}

function renderUpcoming(){
  const wrap = $('#upcomingList');
  const list = [];
  const now = new Date();
  Object.keys(state.events).sort().forEach(k => {
    state.events[k].forEach(ev => {
      const [yy,mm,dd] = k.split('-').map(Number);
      const t = ev.startTime || '09:00';
      const [hh,mi] = t.split(':').map(Number);
      const d = new Date(yy, mm-1, dd, hh, mi||0);
      if(d >= now){
        if(state.filterCollab && ev.collab !== state.filterCollab) return;
        list.push({key:k, ev, d});
      }
    });
  });
  list.sort((a,b)=>a.d - b.d);
  const top = list.slice(0, 3);
  wrap.innerHTML = '';
  if(top.length === 0){
    wrap.innerHTML = '<div style="font-family:Fraunces,serif;font-style:italic;font-size:12.5px;color:var(--ink-soft)">Nada agendado por enquanto.</div>';
    return;
  }
  top.forEach(({key, ev, d}) => {
    const diffDays = Math.floor((d - now) / 86400000);
    let when;
    if(diffDays === 0) when = 'Hoje';
    else if(diffDays === 1) when = 'Amanhã';
    else if(diffDays < 7) when = `Em ${diffDays} dias`;
    else when = `${pad(d.getDate())}/${pad(d.getMonth()+1)}`;
    if(ev.startTime) when += ' · ' + ev.startTime;

    const c = COLLABS[ev.collab];
    const card = document.createElement('div');
    card.className = 'upcoming-card';
    card.innerHTML = `
      <span class="upcoming-when">${when}</span>
      <span class="upcoming-title"><span class="dot" style="background:var(${c.cssVar})"></span>${escapeHtml(ev.title)}</span>
    `;
    card.addEventListener('click', () => openModal(key));
    wrap.appendChild(card);
  });
}

function renderSummary(){
  const counts = eventsByCollabInMonth(state.current.getFullYear(), state.current.getMonth());
  const max = Math.max(1, ...Object.values(counts));
  const sum = $('#summary');
  sum.innerHTML = '';
  Object.entries(COLLABS).filter(([k])=>k!=='todos').forEach(([k, info]) => {
    const val = counts[k];
    const pct = (val / max) * 100;
    const row = document.createElement('div');
    row.className = 'summary-row';
    row.innerHTML = `
      <span style="width:9px;height:9px;border:1px solid var(--ink);border-radius:2px;background:var(${info.cssVar})"></span>
      <span style="min-width:60px">${info.name}</span>
      <div class="bar"><div class="bar-fill" style="width:${pct}%;background:var(${info.cssVar})"></div></div>
      <strong>${val}</strong>
    `;
    sum.appendChild(row);
  });
}

function renderKudos(){
  const wrap = $('#kudos');
  // descobre aniversariantes do mês
  const m = state.current.getMonth();
  const bdays = Object.entries(state.birthdays).filter(([md])=>parseInt(md.split('-')[0])===m+1);

  // streak: dias consecutivos com eventos pra cada colaborador
  let streakHTML = '';
  if(bdays.length){
    bdays.forEach(([md, col]) => {
      const day = parseInt(md.split('-')[1]);
      streakHTML += `<div>🎂 <strong>${COLLABS[col].name}</strong> faz aniversário dia ${day}.</div>`;
    });
  }
  // achievement: collab com mais eventos (mostra empates)
  const counts = eventsByCollabInMonth(state.current.getFullYear(), state.current.getMonth());
  const max = Math.max(...Object.values(counts));
  if(max > 0){
    const winners = Object.entries(counts).filter(([,n]) => n === max).map(([k]) => COLLABS[k].name);
    const namesStr = winners.length === 1 ? `<strong>${winners[0]}</strong>` :
      winners.length === 2 ? `<strong>${winners[0]}</strong> e <strong>${winners[1]}</strong>` :
      winners.slice(0,-1).map(n=>`<strong>${n}</strong>`).join(', ') + ` e <strong>${winners[winners.length-1]}</strong>`;
    const verb = winners.length === 1 ? 'é quem tem' : 'são quem têm';
    streakHTML += `<div style="margin-top:6px">🏆 ${namesStr} ${verb} mais eventos no mês (${max}).</div>`;
  }
  if(!streakHTML){
    streakHTML = '<em>Conquistas aparecem aqui conforme o mês avança.</em>';
  }
  wrap.innerHTML = streakHTML;
}

// ============ MONTH VIEW ============
function renderMonth(){
  const y = state.current.getFullYear();
  const m = state.current.getMonth();
  const firstDay = new Date(y,m,1).getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();
  const daysPrev = new Date(y,m,0).getDate();
  const cal = $('#monthGrid');
  cal.innerHTML = '';

  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  for(let i=0;i<totalCells;i++){
    let dayNum, muted=false, dateY=y, dateM=m;
    if(i < firstDay){
      dayNum = daysPrev - firstDay + 1 + i; muted = true;
      dateM = m-1; if(dateM<0){dateM=11;dateY=y-1}
    } else if(i >= firstDay + daysInMonth){
      dayNum = i - firstDay - daysInMonth + 1; muted = true;
      dateM = m+1; if(dateM>11){dateM=0;dateY=y+1}
    } else {
      dayNum = i - firstDay + 1;
    }

    const cellDate = new Date(dateY, dateM, dayNum);
    const key = keyOf(dateY, dateM, dayNum);
    const dow = cellDate.getDay();
    const isWeekend = (dow === 0 || dow === 6);
    const holiday = HOLIDAYS[key];
    const bdayCol = isBirthday(cellDate);

    const cell = document.createElement('div');
    cell.className = 'cell';
    if(muted) cell.classList.add('muted');
    if(key === todayKey) cell.classList.add('today');
    if(isWeekend && !muted) cell.classList.add('weekend');
    if(holiday) cell.classList.add('holiday');
    if(!muted){ cell.classList.add('is-clickable'); cell.tabIndex = 0; cell.setAttribute('role','gridcell'); cell.setAttribute('aria-label', `${dayNum} de ${MONTHS_PT[dateM]}, ${(state.events[key]||[]).length} eventos`); }
    cell.dataset.key = key;

    // workload bar (top)
    const dayCounts = {joao:0,thayane:0,lianda:0,ravy:0};
    (state.events[key]||[]).forEach(e => {
      if(e.tasks && e.tasks.length){
        const seen = new Set();
        e.tasks.forEach(t => {
          if(dayCounts[t.collab]!=null && !seen.has(t.collab)){ dayCounts[t.collab]++; seen.add(t.collab); }
        });
      } else if(dayCounts[e.collab]!=null) dayCounts[e.collab]++;
    });
    const dayTotal = Object.values(dayCounts).reduce((a,b)=>a+b,0);
    if(dayTotal > 0){
      const bar = document.createElement('div');
      bar.className = 'workload-bar';
      Object.entries(dayCounts).forEach(([col, cnt]) => {
        if(cnt > 0){
          const span = document.createElement('span');
          span.style.background = `var(${COLLABS[col].cssVar})`;
          span.style.flex = cnt;
          bar.appendChild(span);
        }
      });
      cell.appendChild(bar);
    }

    const header = document.createElement('div');
    header.className = 'day-header';
    const num = document.createElement('div');
    num.className = 'day-num';
    num.textContent = dayNum;
    header.appendChild(num);

    const marks = document.createElement('div');
    marks.className = 'day-marks';
    if(holiday) marks.innerHTML += `<span class="holiday-dot" title="${escapeHtml(holiday)}">feriado</span>`;
    if(bdayCol && !muted) marks.innerHTML += `<span class="bday" title="Aniversário de ${COLLABS[bdayCol].name}">🎂</span>`;
    const noteUser = state.role === 'admin' ? 'admin' : state.viewerAs;
    if(noteUser && state.notes[key] && state.notes[key][noteUser]){
      const n = state.notes[key][noteUser];
      const nText = typeof n === 'string' ? n : (n.text || '');
      const nIcon = typeof n === 'string' ? '📝' : (n.icon || '📝');
      const preview = escapeHtml(nText.slice(0, 60));
      marks.innerHTML += `<span class="day-note-mark" title="${preview}">${nIcon}</span>`;
    }
    header.appendChild(marks);
    cell.appendChild(header);

    // events
    const evWrap = document.createElement('div');
    evWrap.className = 'events';
    let dayEvents = state.events[key] || [];
    if(state.showOnlyMine && state.viewerAs){
      dayEvents = dayEvents.filter(e => evVisibleTo(e, state.viewerAs));
    }
    const visible = dayEvents.slice(0, 3);
    visible.forEach(ev => {
      const c = COLLABS[ev.collab];
      const type = EVENT_TYPES[ev.type || 'outro'];
      const isDimmed = state.filterCollab && ev.collab !== state.filterCollab && !state.showOnlyMine;
      const isTeamReadonly = state.viewMode === 'team' && state.viewerAs && !evVisibleTo(ev, state.viewerAs);
      const eEl = document.createElement('div');
      const doneForMe = evDoneFor(ev, state.role === 'admin' ? null : state.viewerAs);
      eEl.className = 'event ' + c.color + (ev.pinned ? ' pinned' : '') + (isDimmed ? ' dimmed' : '') + (doneForMe ? ' completed' : '') + (isTeamReadonly ? ' team-readonly' : '');
      const grad = evGradient(ev);
      if(grad){ eEl.style.background = grad; eEl.style.color = 'var(--ink)'; }
      let timeBit = '';
      if(ev.startTime) timeBit = `<span class="time">${ev.startTime}</span>`;
      let rsvpBit = '';
      if(ev.rsvp){
        const r = ev.rsvp[ev.collab];
        if(r === 'yes') rsvpBit = '<span style="margin-left:auto;font-size:9px" title="Confirmado">✅</span>';
        else if(r === 'no') rsvpBit = '<span style="margin-left:auto;font-size:9px" title="Recusado">❌</span>';
      }
      const taskBadge = (ev.tasks && ev.tasks.length) ? `<span class="ev-task-badge" title="${ev.tasks.length} tarefa(s)">${ev.tasks.length}</span>` : '';
      eEl.innerHTML = `${timeBit}<span class="ico">${type.ico}</span><span class="ev-title">${escapeHtml(ev.title)}</span>${taskBadge}${rsvpBit}`;
      if(state.role === 'admin'){
        eEl.draggable = true;
        eEl.dataset.eventId = ev.id;
        eEl.dataset.fromKey = key;
        eEl.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', JSON.stringify({ id:ev.id, fromKey:key }));
          e.dataTransfer.effectAllowed = 'move';
          eEl.style.opacity = '0.5';
        });
        eEl.addEventListener('dragend', () => { eEl.style.opacity = ''; });
      }
      evWrap.appendChild(eEl);
    });
    if(dayEvents.length > 3){
      const more = document.createElement('div');
      more.className = 'more-link';
      more.textContent = `+${dayEvents.length - 3} mais`;
      evWrap.appendChild(more);
    }
    cell.appendChild(evWrap);

    if(!muted){
      cell.addEventListener('click', (e) => {
        if(e.target.closest('[draggable="true"]')) return;
        openModal(key);
      });
      cell.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openModal(key); }
      });
      if(state.role === 'admin'){
        cell.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; cell.classList.add('drag-over'); });
        cell.addEventListener('dragleave', () => { cell.classList.remove('drag-over'); });
        cell.addEventListener('drop', e => {
          e.preventDefault();
          cell.classList.remove('drag-over');
          try{
            const d = JSON.parse(e.dataTransfer.getData('text/plain'));
            if(d.fromKey === key) return;
            const fromArr = state.events[d.fromKey] || [];
            const idx = fromArr.findIndex(ev => ev.id === d.id);
            if(idx === -1) return;
            const ev = fromArr.splice(idx, 1)[0];
            if(!fromArr.length) delete state.events[d.fromKey];
            if(!state.events[key]) state.events[key] = [];
            state.events[key].push(ev);
            logHistory(`Moveu "${ev.title}" de ${d.fromKey} para ${key}`);
            save('events');
            render();
          }catch(err){}
        });
      }
    }
    cal.appendChild(cell);
  }
}

// ============ WEEK VIEW ============
function renderWeek(){
  const ref = new Date(state.current);
  // colocar no domingo da semana atual
  const dow = ref.getDay();
  const start = new Date(ref); start.setDate(ref.getDate() - dow);

  // head
  const head = $('#weekHead');
  head.innerHTML = '<div></div>'; // espaço da coluna de horas
  const noteUser = state.role === 'admin' ? 'admin' : state.viewerAs;
  for(let i=0;i<7;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const isToday = keyFromDate(d) === todayKey;
    const k = keyFromDate(d);
    let noteMark = '';
    if(noteUser && state.notes[k] && state.notes[k][noteUser]){
      const n = state.notes[k][noteUser];
      const nIcon = typeof n === 'string' ? '📝' : (n.icon || '📝');
      const nText = typeof n === 'string' ? n : (n.text || '');
      noteMark = `<span class="day-note-mark" style="position:absolute;top:4px;right:4px" title="${escapeHtml(nText.slice(0,60))}">${nIcon}</span>`;
    }
    head.innerHTML += `
      <div style="position:relative">
        <div class="wd-name">${WEEKDAYS_SHORT[i]}</div>
        <div class="wd-num">${isToday ? `<span class="wd-today">${d.getDate()}</span>` : d.getDate()}</div>
        ${noteMark}
      </div>
    `;
  }

  // grid de horas 7h-21h
  const grid = $('#weekGrid');
  grid.innerHTML = '';
  // coluna horas
  const hourCol = document.createElement('div');
  hourCol.className = 'hour-col';
  for(let h=7; h<=20; h++){
    const r = document.createElement('div');
    r.className = 'hour-row';
    r.textContent = pad(h)+':00';
    hourCol.appendChild(r);
  }
  grid.appendChild(hourCol);

  // colunas dos dias
  for(let i=0;i<7;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const key = keyFromDate(d);
    const col = document.createElement('div');
    col.className = 'day-col';
    col.dataset.key = key;
    col.addEventListener('click', e => {
      if(e.target.closest('.week-event')) return;
      openModal(key);
    });
    for(let h=7; h<=20; h++){
      const r = document.createElement('div');
      r.className = 'hour-line';
      col.appendChild(r);
    }
    // events
    let dayEvents = (state.events[key]||[]).slice();
    if(state.showOnlyMine && state.viewerAs){
      dayEvents = dayEvents.filter(ev => evVisibleTo(ev, state.viewerAs));
    }
    dayEvents.forEach(ev => {
      const startT = ev.startTime || '09:00';
      const endT = ev.endTime || addHour(startT);
      const top = timeToOffset(startT);
      const height = Math.max(24, timeToOffset(endT) - top);
      if(top < 0) return;
      const c = COLLABS[ev.collab];
      const type = EVENT_TYPES[ev.type || 'outro'];
      const isDimmed = state.filterCollab && ev.collab !== state.filterCollab && !state.showOnlyMine;
      const we = document.createElement('div');
      const weDone = evDoneFor(ev, state.role === 'admin' ? null : state.viewerAs);
      we.className = 'week-event ' + c.color + (isDimmed ? ' dimmed' : '') + (weDone ? ' completed' : '');
      const weGrad = evGradient(ev);
      if(weGrad){ we.style.background = weGrad; we.style.color = 'var(--ink)'; }
      we.style.top = top + 'px';
      we.style.height = height + 'px';
      we.innerHTML = `
        <span class="we-time">${type.ico} ${ev.startTime||''}${ev.endTime?' – '+ev.endTime:''}</span>
        <span class="we-title">${escapeHtml(ev.title)}</span>
      `;
      we.addEventListener('click', e => { e.stopPropagation(); openEventDetail(key, ev.id); });
      col.appendChild(we);
    });

    // now line se for hoje
    if(key === todayKey){
      const now = new Date();
      const hours = now.getHours() + now.getMinutes()/60;
      if(hours >= 7 && hours <= 21){
        const nl = document.createElement('div');
        nl.className = 'now-line';
        nl.style.top = ((hours - 7) * 42) + 'px';
        col.appendChild(nl);
      }
    }
    grid.appendChild(col);
  }
}

function timeToOffset(t){
  if(!t) return -1;
  const [h,m] = t.split(':').map(Number);
  if(h < 7) return 0;
  if(h > 20) return 14*42;
  return (h - 7) * 42 + (m/60)*42;
}
function addHour(t){
  if(!t || !t.includes(':')) return '10:00';
  const [h,m] = t.split(':').map(Number);
  return pad(Math.min((h||0)+1, 23))+':'+pad(m||0);
}

// ============ DAY VIEW ============
function renderDay(){
  const ref = new Date(state.current);
  // se está em "month/week" current é dia 1, mas pra day view usamos a data exata; aqui se cair em dia 1 mantém
  // adicionar uma data específica via state.dayDate seria ideal — vamos respeitar state.current.getDate()
  const key = keyFromDate(ref);
  const dow = ref.getDay();
  $('#dayViewTitle').textContent = `${ref.getDate()} de ${MONTHS_PT[ref.getMonth()].toLowerCase()}`;
  // adicionar nota do dia
  const noteUser = state.role === 'admin' ? 'admin' : state.viewerAs;
  let subExtra = '';
  if(noteUser && state.notes[key] && state.notes[key][noteUser]){
    const n = state.notes[key][noteUser];
    const nIcon = typeof n === 'string' ? '📝' : (n.icon || '📝');
    const nText = typeof n === 'string' ? n : (n.text || '');
    subExtra = ` <span title="${escapeHtml(nText.slice(0,80))}" style="font-size:16px;margin-left:6px">${nIcon}</span>`;
  }
  $('#dayViewSub').innerHTML = WEEKDAYS_FULL[dow] + subExtra;

  const grid = $('#dayGrid');
  grid.innerHTML = '';
  const hourCol = document.createElement('div');
  hourCol.className = 'hour-col';
  for(let h=7; h<=20; h++){
    const r = document.createElement('div');
    r.className = 'hour-row';
    r.textContent = pad(h)+':00';
    hourCol.appendChild(r);
  }
  grid.appendChild(hourCol);

  const col = document.createElement('div');
  col.className = 'day-col';
  col.addEventListener('click', e => {
    if(e.target.closest('.week-event')) return;
    openModal(key);
  });
  for(let h=7; h<=20; h++){
    const r = document.createElement('div');
    r.className = 'hour-line';
    col.appendChild(r);
  }
  let dayEvents = (state.events[key]||[]).slice();
  if(state.showOnlyMine && state.viewerAs){
    dayEvents = dayEvents.filter(ev => evVisibleTo(ev, state.viewerAs));
  }
  dayEvents.forEach(ev => {
    const startT = ev.startTime || '09:00';
    const endT = ev.endTime || addHour(startT);
    const top = timeToOffset(startT);
    const height = Math.max(24, timeToOffset(endT) - top);
    const c = COLLABS[ev.collab];
    const type = EVENT_TYPES[ev.type || 'outro'];
    const isDimmed = state.filterCollab && ev.collab !== state.filterCollab && !state.showOnlyMine;
    const we = document.createElement('div');
    we.className = 'week-event ' + c.color + (isDimmed ? ' dimmed' : '');
    we.style.top = top + 'px';
    we.style.height = height + 'px';
    we.innerHTML = `
      <span class="we-time">${type.ico} ${ev.startTime||''}${ev.endTime?' – '+ev.endTime:''} · ${c.name}</span>
      <span class="we-title">${escapeHtml(ev.title)}</span>
    `;
    we.addEventListener('click', e => { e.stopPropagation(); openEventDetail(key, ev.id); });
    col.appendChild(we);
  });

  if(key === todayKey){
    const now = new Date();
    const hours = now.getHours() + now.getMinutes()/60;
    if(hours >= 7 && hours <= 21){
      const nl = document.createElement('div');
      nl.className = 'now-line';
      nl.style.top = ((hours - 7) * 42) + 'px';
      col.appendChild(nl);
    }
  }
  grid.appendChild(col);
}

// ============ FESTIVE ============
function renderFestive(){
  const wrap = $('#festive');
  wrap.innerHTML = '';
  if(!state.festive) return;
  const m = state.current.getMonth();
  let symbol = null;
  if(m === 11) symbol = '❄';
  else if(m === 1) symbol = '♥';
  else if(m === 5) symbol = '✦';
  else if(m === 9) symbol = '☘';
  if(!symbol) return;
  for(let i=0;i<14;i++){
    const f = document.createElement('div');
    f.className = 'flake';
    f.textContent = symbol;
    f.style.left = Math.random()*100 + 'vw';
    f.style.animationDuration = (8 + Math.random()*10) + 's';
    f.style.animationDelay = -(Math.random()*10) + 's';
    f.style.fontSize = (12 + Math.random()*10) + 'px';
    f.style.opacity = 0.15 + Math.random()*0.35;
    wrap.appendChild(f);
  }
}

// ============ MODAL DO DIA ============
let activeDateKey = null;
let editingEvent = null;
let formTasks = [];
let formSelectedType = 'reuniao';

function openModal(key){
  activeDateKey = key;
  editingEvent = null;

  const [y,m,d] = key.split('-').map(Number);
  const dateObj = new Date(y, m-1, d);
  $('#modalDate').textContent = `${d} de ${MONTHS_PT[m-1].toLowerCase()}, ${WEEKDAYS_FULL[dateObj.getDay()]}`;
  $('#modalTitle').textContent = 'Eventos do dia';

  const holiday = HOLIDAYS[key];
  const holEl = $('#modalHoliday');
  if(holiday){ holEl.style.display='block'; holEl.textContent = `Feriado: ${holiday}`; }
  else holEl.style.display = 'none';

  renderExistingEvents();

  if(state.role === 'admin'){
    $('#adminForm').style.display = '';
    $('#viewerNote').style.display = 'none';
    resetForm();
  } else {
    $('#adminForm').style.display = 'none';
    if(state.viewMode === 'team'){
      $('#viewerNote').querySelector('.readonly-note').textContent = 'Visualizando a agenda da equipe (somente leitura).';
    } else {
      $('#viewerNote').querySelector('.readonly-note').textContent = 'Você pode confirmar presença e comentar nos seus eventos e nos eventos da equipe.';
    }
    $('#viewerNote').style.display = '';
  }

  // notas pessoais
  const noteWrap = $('#personalNoteWrap');
  const noteUser = state.role === 'admin' ? 'admin' : state.viewerAs;
  if(noteUser){
    noteWrap.style.display = '';
    const dayNotes = state.notes[activeDateKey] || {};
    const noteData = dayNotes[noteUser];
    const noteText = noteData ? (typeof noteData === 'string' ? noteData : noteData.text || '') : '';
    const noteIcon = noteData ? (typeof noteData === 'string' ? '📝' : noteData.icon || '📝') : '📝';
    $('#personalNoteText').value = noteText;
    $$('.note-ico-btn').forEach(b => b.classList.toggle('selected', b.dataset.nico === noteIcon));
    $('#deleteNoteBtn').style.display = noteText ? '' : 'none';
  } else { noteWrap.style.display = 'none'; }

  $('#modal').classList.add('open');
  setTimeout(() => $('#eventTitle')?.focus(), 100);
}

function resetForm(){
  $('#eventTitle').value = '';
  $('#eventDesc').value = '';
  $('#eventStart').value = '09:00';
  $('#eventEnd').value = '10:00';
  $('#eventLink').value = '';
  $('#eventLocation').value = '';
  $('#eventRecurring').value = 'none';
  $('#customRecurWrap').style.display = 'none';
  $('#eventPinned').checked = false;
  $('#eventPrivate').checked = false;
  formSelectedType = 'reuniao';
  formTasks = [];
  updatePickerSelections();
  renderTaskList();
  $('#saveBtn').textContent = 'Adicionar evento';
  editingEvent = null;
}

function fillFormFor(ev){
  if(state.role !== 'admin') return;
  editingEvent = ev;
  $('#eventTitle').value = ev.title || '';
  $('#eventDesc').value = ev.desc || '';
  $('#eventStart').value = ev.startTime || '';
  $('#eventEnd').value = ev.endTime || '';
  $('#eventLink').value = ev.link || '';
  $('#eventLocation').value = ev.location || '';
  $('#eventRecurring').value = ev.recurring || 'none';
  $('#eventPinned').checked = !!ev.pinned;
  $('#eventPrivate').checked = !!ev.private;
  formSelectedType = ev.type || 'reuniao';
  formTasks = (ev.tasks || []).map(t => typeof t === 'string' ? {id:uid(), collab:ev.collab, text:t, done:false} : {...t, id: t.id || uid()});
  updatePickerSelections();
  renderTaskList();
  $('#saveBtn').textContent = 'Salvar alterações';
  $('#eventTitle').focus();
}

function updatePickerSelections(){
  $$('.pick[data-type]').forEach(p => p.classList.toggle('selected', p.dataset.type === formSelectedType));
}

function renderExistingEvents(){
  const wrap = $('#existingEventsWrap');
  let list = state.events[activeDateKey] || [];
  // privacy: viewer só vê privados se for o dono
  if(state.role === 'viewer'){
    list = list.filter(e => !e.private || evVisibleTo(e, state.viewerAs));
  }
  if(state.showOnlyMine && state.viewerAs){
    list = list.filter(e => evVisibleTo(e, state.viewerAs));
  }

  wrap.innerHTML = '';
  if(list.length === 0){
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = state.role === 'admin' ? 'Nenhum evento ainda — adicione abaixo.' : 'Nenhum evento neste dia.';
    wrap.appendChild(empty);
    return;
  }

  const container = document.createElement('div');
  container.className = 'existing-events';

  // detectar conflitos (mesmo collab + overlap)
  const conflicts = detectConflicts(list);

  list.forEach(ev => {
    const c = COLLABS[ev.collab];
    const type = EVENT_TYPES[ev.type || 'outro'];
    const isConflict = conflicts.has(ev.id);
    const myRSVP = state.viewerAs && ev.rsvp && ev.rsvp[state.viewerAs];

    const row = document.createElement('div');
    row.className = 'existing-event';
    row.style.borderLeftWidth = '5px';
    row.style.borderLeftColor = `var(${c.cssVar})`;

    let timeChip = '';
    if(ev.startTime) timeChip = `<span class="chip">⏱ ${ev.startTime}${ev.endTime?' – '+ev.endTime:''}</span>`;
    let recurChip = ev.recurring && ev.recurring !== 'none' ? `<span class="chip">↻ ${ev.recurring}</span>` : '';
    let pinChip = ev.pinned ? `<span class="chip">📌 fixado</span>` : '';
    let privChip = ev.private ? `<span class="chip">🔒 privado</span>` : '';
    let conflictChip = isConflict ? `<span class="chip" style="background:#FFE0E0;color:var(--danger);border-color:var(--danger)">⚠ conflito</span>` : '';

    let linkLine = '';
    if(ev.link) linkLine = `<a class="ee-link" href="${escapeHtml(ev.link)}" target="_blank" rel="noopener">${escapeHtml(ev.link)}</a>`;
    let locLine = ev.location ? `<div class="ee-meta">📍 ${escapeHtml(ev.location)}</div>` : '';
    let descLine = ev.desc ? `<div class="ee-desc">${escapeHtml(ev.desc)}</div>` : '';
    // Status bar do evento
    let statusBar = '';
    const prepArr = ev.preparedBy || [];
    if(prepArr.length){
      const names = prepArr.map(p => COLLABS[p] ? COLLABS[p].name : p).join(', ');
      statusBar += `<span class="ev-flag-badge prep">🎯 ${names} preparado</span>`;
    }
    const helpArr = ev.helpRequests || (ev.helpRequest ? [ev.helpRequest] : []);
    if(helpArr.length){
      const names = helpArr.map(h => COLLABS[h.who] ? COLLABS[h.who].name : h.who).join(', ');
      statusBar += `<span class="ev-flag-badge help">🆘 ${names} pediu ajuda</span>`;
    }
    if(ev.helpOffers && ev.helpOffers.length){
      const offers = ev.helpOffers.map(o => COLLABS[o.who] ? COLLABS[o.who].name : o.who).join(', ');
      statusBar += `<span class="ev-flag-badge offer">🤝 ${offers} ofereceu ajuda</span>`;
    }
    if(statusBar){ statusBar = `<div class="ev-flags">${statusBar}</div>`; }
    let tasksLine = '';
    if(ev.tasks && ev.tasks.length){
      tasksLine = '<div style="margin-top:8px;border-top:1px dashed var(--muted);padding-top:8px"><span style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--ink-soft);display:block;margin-bottom:6px">Tarefas da equipe</span>';
      const grouped = {};
      ev.tasks.forEach((t,i) => {
        const task = typeof t === 'string' ? {id:'legacy_'+i, collab:ev.collab, text:t, done:false} : {...t, id: t.id || ('legacy_'+i)};
        if(!grouped[task.collab]) grouped[task.collab] = [];
        grouped[task.collab].push(task);
      });
      Object.entries(grouped).forEach(([col, tasks]) => {
        const c = COLLABS[col];
        const photo = c && c.photo ? `<img src="${c.photo}" style="width:16px;height:16px;border-radius:50%;object-fit:cover;border:1px solid var(${c.cssVar})">` : '';
        const name = c ? c.name : col;
        tasksLine += `<div style="margin-bottom:6px"><div style="display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;margin-bottom:2px">${photo} ${name}</div>`;
        tasks.forEach(task => {
          const canCheck = state.role === 'admin' || state.viewerAs === task.collab;
          tasksLine += `<div class="task-check${task.done?' done':''}${!canCheck?' locked':''}">
            <input type="checkbox" data-task-ev="${ev.id}" data-task-id="${task.id}" ${task.done?'checked':''}${!canCheck?' disabled':''}>
            <span class="task-label">${escapeHtml(task.text)}</span>
          </div>`;
        });
        tasksLine += '</div>';
      });
      tasksLine += '</div>';
    }

    let rsvpHTML = '';
    if(state.role === 'viewer' && evVisibleTo(ev, state.viewerAs)){
      if(myRSVP){
        rsvpHTML = `<div style="margin-top:4px"><span class="rsvp-status rsvp-${myRSVP==='yes'?'yes':'no'}">${myRSVP==='yes'?'✓ Presença confirmada':'✗ Presença recusada'}</span></div>`;
      } else {
        rsvpHTML = `
          <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
            <span style="font-size:11px;color:var(--ink-soft);font-style:italic;font-family:Fraunces,serif">Confirma presença?</span>
            <button class="btn small" data-rsvp="yes" data-id="${ev.id}">✓ Sim</button>
            <button class="btn small" data-rsvp="no" data-id="${ev.id}">✗ Não</button>
          </div>
        `;
      }
    } else if(state.role === 'admin' && ev.rsvp){
      const rsvpEntries = Object.entries(ev.rsvp).filter(([k,v]) => COLLABS[k]);
      if(rsvpEntries.length){
        rsvpHTML = '<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px">';
        rsvpEntries.forEach(([k,v]) => {
          const icon = v === 'yes' ? '✓' : '✗';
          rsvpHTML += `<span class="rsvp-status rsvp-${v==='yes'?'yes':'no'}" style="display:inline-flex;align-items:center;gap:4px"><img src="${COLLABS[k].photo}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;border:1.5px solid var(${COLLABS[k].cssVar})">${icon} ${COLLABS[k].name}</span>`;
        });
        const pending = Object.keys(COLLABS).filter(k => k !== 'todos' && !ev.rsvp[k]);
        pending.forEach(k => {
          rsvpHTML += `<span class="rsvp-status rsvp-pending" style="display:inline-flex;align-items:center;gap:4px"><img src="${COLLABS[k].photo}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;border:1.5px solid var(--muted);opacity:0.5">? ${COLLABS[k].name}</span>`;
        });
        rsvpHTML += '</div>';
      }
    }

    let actionsHTML = '';
    if(state.role === 'admin'){
      const completedBadge = evFullyDone(ev) ? `<span class="ee-completed">✅ Concluído</span>` : '';
      actionsHTML = `
        <div class="ee-actions">
          ${completedBadge}
          <button class="btn small" data-act="edit" data-id="${ev.id}">Editar</button>
          <button class="btn small danger" data-act="delete" data-id="${ev.id}">Excluir</button>
        </div>
      `;
    } else if(state.role === 'viewer' && state.viewMode !== 'team' && evVisibleTo(ev, state.viewerAs)){
      const hasTasks = ev.tasks && ev.tasks.length;
      let completeBtn = '';
      if(!hasTasks){
        completeBtn = ev.completed
          ? `<span class="ee-completed">✅ Concluído</span>`
          : `<button class="btn small" data-act="complete" data-id="${ev.id}">✓ Concluir</button>`;
      } else {
        const myTasks = ev.tasks.filter(t => (typeof t === 'object' ? t.collab : ev.collab) === state.viewerAs);
        if(myTasks.length){
          const doneCount = myTasks.filter(t => typeof t === 'object' && t.done).length;
          const allMyDone = doneCount === myTasks.length;
          completeBtn = allMyDone
            ? `<span class="ee-completed">✅ Suas tarefas concluídas (${doneCount}/${myTasks.length})</span>`
            : `<span style="font-size:11px;color:var(--ink-soft);font-style:italic">Suas tarefas: ${doneCount}/${myTasks.length} feitas</span>`;
        }
      }
      const swapBtn = ev.collab !== 'todos' ? `<button class="btn small" data-act="swap" data-id="${ev.id}" data-key="${activeDateKey}">↔ Solicitar troca</button>` : '';
      const isMyMeeting = ev.type === 'reuniao' && ev.collab === 'todos' && ev.rsvp && ev.rsvp[state.viewerAs] === 'yes';
      const cancelBtn = isMyMeeting ? `<button class="btn small danger" data-act="delete" data-id="${ev.id}">Cancelar reunião</button>` : '';

      // Preparado
      const preparedBy = ev.preparedBy || [];
      const isPrepared = preparedBy.includes(state.viewerAs);
      const prepBtn = isPrepared
        ? `<span class="ee-completed" style="background:#E3F2FD;color:#0277BD">🎯 Preparado</span>`
        : `<button class="btn small" data-act="prepare" data-id="${ev.id}">🎯 Marcar como preparado</button>`;

      // Pedir ajuda
      const helpList = ev.helpRequests || (ev.helpRequest ? [ev.helpRequest] : []);
      const helpAlreadyRequested = helpList.some(h => h.who === state.viewerAs);
      const helpBtn = helpAlreadyRequested
        ? `<button class="btn small" data-act="cancel-help" data-id="${ev.id}" style="background:#FFE0B2">🆘 Cancelar pedido</button>`
        : `<button class="btn small" data-act="help" data-id="${ev.id}">🆘 Pedir ajuda</button>`;

      // Pedir substituição (apenas se tenho tarefa aqui)
      const hasMyTask = hasTasks && ev.tasks.some(t => (typeof t === 'object' ? t.collab : ev.collab) === state.viewerAs);
      const subBtn = hasMyTask ? `<button class="btn small" data-act="substitute" data-id="${ev.id}">🔄 Pedir substituição</button>` : '';

      // Oferecer ajuda (se NAO sou parte do evento mas posso ver)
      const isMyEvent = ev.collab === state.viewerAs || (ev.tasks && ev.tasks.some(t => t.collab === state.viewerAs));
      const offerBtn = !isMyEvent ? `<button class="btn small" data-act="offer-help" data-id="${ev.id}">🤝 Oferecer ajuda</button>` : '';

      actionsHTML = `<div class="ee-actions">${completeBtn}${prepBtn}${helpBtn}${subBtn}${offerBtn}${swapBtn}${cancelBtn}</div>`;
    }

    // comments
    const comments = ev.comments || [];
    let commentsHTML = '';
    if(comments.length || state.role === 'viewer' || state.role === 'admin'){
      commentsHTML = `<div class="comments">`;
      if(comments.length === 0){
        commentsHTML += `<div style="font-size:11.5px;color:var(--ink-faint);font-family:Fraunces,serif;font-style:italic">Sem comentários.</div>`;
      } else {
        comments.forEach(co => {
          const cwho = co.who === 'admin' ? ADMIN_USER.name : (COLLABS[co.who]?.name || co.who);
          const dt = new Date(co.when);
          const when = `${pad(dt.getDate())}/${pad(dt.getMonth()+1)} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
          // parse @mencoes
          const textWithTags = escapeHtml(co.text).replace(/@(\w+)/g, (m, n) => {
            const k = n.toLowerCase();
            const found = Object.keys(COLLABS).find(x => x === k || COLLABS[x].name.toLowerCase() === k);
            if(found) return `<span class="ev-mention" style="background:var(${COLLABS[found].cssVar});color:var(${COLLABS[found].cssVar}-ink);padding:1px 5px;border-radius:4px;font-weight:600">@${COLLABS[found].name}</span>`;
            return m;
          });
          const thanks = co.thanks || [];
          const iThanked = state.viewerAs && thanks.includes(state.viewerAs);
          const thanksBtn = `<button class="comment-thanks${iThanked?' active':''}" data-thanks-cid="${co.id}" data-thanks-ev="${ev.id}" title="Agradecer">👍 ${thanks.length || ''}</button>`;
          commentsHTML += `<div class="comment"><span class="who">${escapeHtml(cwho)}:</span><span style="flex:1">${textWithTags}</span>${thanksBtn}<span class="when">${when}</span></div>`;
        });
      }
      const canComment = state.role === 'admin' || (state.role === 'viewer' && state.viewerAs);
      if(canComment){
        commentsHTML += `
          <div class="comment-input" style="position:relative">
            <input type="text" placeholder="Comentário... digite @ para mencionar" data-comment-id="${ev.id}" maxlength="200" autocomplete="off">
            <button data-comment-btn="${ev.id}">Enviar</button>
            <div class="mention-autocomplete" data-mention-for="${ev.id}" style="display:none"></div>
          </div>
        `;
      }
      commentsHTML += `</div>`;
    }

    row.innerHTML = `
      <div class="ee-top">
        <span class="ico-large">${type.ico}</span>
        <span class="ee-title">${escapeHtml(ev.title)}</span>
      </div>
      <div class="ee-meta">
        <span class="chip">${c.name}</span>
        <span class="chip">${type.label}</span>
        ${timeChip}${recurChip}${pinChip}${privChip}${conflictChip}
      </div>
      ${locLine}
      ${descLine}
      ${statusBar}
      ${tasksLine}
      ${linkLine}
      ${rsvpHTML}
      ${commentsHTML}
      ${actionsHTML}
    `;
    container.appendChild(row);
  });

  wrap.appendChild(container);

  // bind ações
  container.querySelectorAll('[data-act="delete"]').forEach(b => {
    b.addEventListener('click', () => deleteEvent(b.dataset.id));
  });
  container.querySelectorAll('[data-act="complete"]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===b.dataset.id);
      if(!ev) return;
      ev.completed = true;
      ev.completedAt = new Date().toISOString();
      const who = state.viewerAs ? COLLABS[state.viewerAs].name : ADMIN_USER.name;
      logHistory(`${who} concluiu "${ev.title}"`);
      save('events');
      renderExistingEvents();
      render();
      toast('Evento concluído!');
    });
  });
  container.querySelectorAll('[data-task-ev]').forEach(cb => {
    cb.addEventListener('change', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===cb.dataset.taskEv);
      if(!ev || !ev.tasks) return;
      const taskId = cb.dataset.taskId;
      let task;
      if(taskId && taskId.startsWith('legacy_')){
        const idx = parseInt(taskId.replace('legacy_',''), 10);
        if(typeof ev.tasks[idx] === 'string') ev.tasks[idx] = {id:uid(), collab:ev.collab, text:ev.tasks[idx], done:false};
        task = ev.tasks[idx];
      } else {
        task = ev.tasks.find(t => t && t.id === taskId);
      }
      if(!task) return;
      // so admin ou dono da tarefa pode marcar
      if(state.role !== 'admin' && state.viewerAs !== task.collab){
        cb.checked = task.done;
        toast('Apenas ' + (COLLABS[task.collab]?COLLABS[task.collab].name:task.collab) + ' pode marcar esta tarefa');
        return;
      }
      task.done = cb.checked;
      // auto-marcar evento como concluido se todas tarefas estao feitas
      if(ev.tasks.every(t => typeof t === 'object' && t.done)){
        ev.completed = true;
        ev.completedAt = ev.completedAt || new Date().toISOString();
      } else {
        ev.completed = false;
      }
      save('events');
      renderExistingEvents();
      render();
    });
  });
  container.querySelectorAll('[data-act="swap"]').forEach(b => {
    b.addEventListener('click', () => requestDateChange(b.dataset.key, b.dataset.id));
  });
  container.querySelectorAll('[data-act="prepare"]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===b.dataset.id);
      if(!ev) return;
      ev.preparedBy = ev.preparedBy || [];
      if(ev.preparedBy.includes(state.viewerAs)){
        ev.preparedBy = ev.preparedBy.filter(p => p !== state.viewerAs);
      } else {
        ev.preparedBy.push(state.viewerAs);
        logHistory(`${COLLABS[state.viewerAs].name} marcou "${ev.title}" como preparado`);
      }
      save('events');
      renderExistingEvents();
      render();
      toast('Status atualizado');
    });
  });
  container.querySelectorAll('[data-act="help"]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===b.dataset.id);
      if(!ev) return;
      const reason = prompt('O que você precisa de ajuda? (opcional)', '') || '';
      ev.helpRequests = ev.helpRequests || [];
      if(ev.helpRequests.some(h => h.who === state.viewerAs)) return;
      ev.helpRequests.push({ who: state.viewerAs, when: new Date().toISOString(), reason });
      logHistory(`🆘 ${COLLABS[state.viewerAs].name} pediu ajuda em "${ev.title}"`);
      save('events');
      renderExistingEvents();
      render();
      toast('Pedido de ajuda enviado para a equipe');
    });
  });
  container.querySelectorAll('[data-act="cancel-help"]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===b.dataset.id);
      if(!ev) return;
      if(ev.helpRequests) ev.helpRequests = ev.helpRequests.filter(h => h.who !== state.viewerAs);
      delete ev.helpRequest; // legacy
      save('events');
      renderExistingEvents();
      render();
      toast('Pedido de ajuda cancelado');
    });
  });
  container.querySelectorAll('[data-act="offer-help"]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===b.dataset.id);
      if(!ev) return;
      ev.helpOffers = ev.helpOffers || [];
      const already = ev.helpOffers.some(o => o.who === state.viewerAs);
      if(already){
        ev.helpOffers = ev.helpOffers.filter(o => o.who !== state.viewerAs);
        toast('Oferta de ajuda removida');
      } else {
        ev.helpOffers.push({ who: state.viewerAs, when: new Date().toISOString() });
        logHistory(`🤝 ${COLLABS[state.viewerAs].name} ofereceu ajuda em "${ev.title}"`);
        toast('Oferta de ajuda enviada!');
      }
      save('events');
      renderExistingEvents();
      render();
    });
  });
  container.querySelectorAll('[data-act="substitute"]').forEach(b => {
    b.addEventListener('click', () => openSubstituteModal(b.dataset.id));
  });
  container.querySelectorAll('[data-act="edit"]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===b.dataset.id);
      if(ev) fillFormFor(ev);
    });
  });
  container.querySelectorAll('[data-rsvp]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===b.dataset.id);
      if(!ev) return;
      ev.rsvp = ev.rsvp || {};
      ev.rsvp[state.viewerAs] = b.dataset.rsvp;
      logHistory(`${COLLABS[state.viewerAs].name} ${b.dataset.rsvp==='yes'?'confirmou':'recusou'} "${ev.title}"`);
      save('events');
      renderExistingEvents();
      render();
    });
  });
  const dateAtRender = activeDateKey;
  container.querySelectorAll('[data-thanks-cid]').forEach(b => {
    b.addEventListener('click', () => {
      const ev = (state.events[dateAtRender]||[]).find(x=>x.id===b.dataset.thanksEv);
      if(!ev) return;
      const co = (ev.comments||[]).find(c => c.id === b.dataset.thanksCid);
      if(!co) return;
      const who = state.role === 'admin' ? 'admin' : state.viewerAs;
      if(!who) return;
      co.thanks = co.thanks || [];
      if(co.thanks.includes(who)) co.thanks = co.thanks.filter(t => t !== who);
      else co.thanks.push(who);
      save('events');
      renderExistingEvents();
    });
  });
  container.querySelectorAll('[data-comment-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.commentBtn;
      const input = container.querySelector(`[data-comment-id="${id}"]`);
      const txt = input.value.trim();
      if(!txt) return;
      const ev = (state.events[activeDateKey]||[]).find(x=>x.id===id);
      if(!ev) return;
      ev.comments = ev.comments || [];
      const who = state.role === 'admin' ? 'admin' : state.viewerAs;
      ev.comments.push({
        id: uid(),
        who: who,
        text: txt,
        when: new Date().toISOString()
      });
      save('events');
      renderExistingEvents();
      // pushes para @mencoes
      const fromName = who === 'admin' ? ADMIN_USER.name : (COLLABS[who]?.name || who);
      const mentions = txt.match(/@(\w+)/g) || [];
      const notified = new Set();
      mentions.forEach(m => {
        const tag = m.slice(1).toLowerCase();
        const target = Object.keys(COLLABS).find(k => k !== 'todos' && (k === tag || COLLABS[k].name.toLowerCase() === tag));
        const fullTarget = target || (tag === 'suzana' || tag === ADMIN_USER.name.toLowerCase() ? 'admin' : null);
        if(fullTarget && fullTarget !== who && !notified.has(fullTarget)){
          notified.add(fullTarget);
          triggerPush(fullTarget, `@ ${fromName} mencionou você`, txt.slice(0, 120));
        }
      });
    });
  });
  container.querySelectorAll('[data-comment-id]').forEach(input => {
    const evId = input.dataset.commentId;
    const dropdown = container.querySelector(`[data-mention-for="${evId}"]`);
    let activeMentionIdx = 0;

    const showMentions = (filter) => {
      const candidates = Object.entries(COLLABS)
        .filter(([k]) => k !== 'todos')
        .map(([k, c]) => ({ key: k, name: c.name, photo: c.photo, cssVar: c.cssVar }));
      if(state.role === 'admin' || state.viewerAs) candidates.push({ key: 'admin', name: ADMIN_USER.name, photo: ADMIN_USER.photo });
      const f = (filter || '').toLowerCase();
      const matches = candidates.filter(c =>
        c.name.toLowerCase().includes(f) || c.key.toLowerCase().includes(f)
      );
      if(!matches.length){ dropdown.style.display = 'none'; return; }
      activeMentionIdx = 0;
      dropdown.innerHTML = matches.map((c, i) => {
        const photo = c.photo ? `<img src="${c.photo}" alt="">` : `<div class="mention-fallback">${c.name.charAt(0)}</div>`;
        return `<div class="mention-option${i===0?' active':''}" data-mname="${c.name}">${photo}<span>${c.name}</span></div>`;
      }).join('');
      dropdown.style.display = 'block';
    };

    // event delegation - 1 listener so para todo o dropdown
    dropdown.addEventListener('click', (e) => {
      const opt = e.target.closest('.mention-option');
      if(opt) insertMention(opt.dataset.mname);
    });

    const insertMention = (name) => {
      const v = input.value;
      const pos = input.selectionStart || v.length;
      const before = v.slice(0, pos);
      const atIdx = before.lastIndexOf('@');
      if(atIdx === -1) return;
      const newVal = v.slice(0, atIdx) + '@' + name + ' ' + v.slice(pos);
      input.value = newVal;
      const newPos = atIdx + name.length + 2;
      input.setSelectionRange(newPos, newPos);
      dropdown.style.display = 'none';
      input.focus();
    };

    input.addEventListener('input', () => {
      const v = input.value;
      const pos = input.selectionStart || v.length;
      const before = v.slice(0, pos);
      const match = before.match(/@(\w*)$/);
      if(match){ showMentions(match[1]); }
      else { dropdown.style.display = 'none'; }
    });

    input.addEventListener('keydown', e => {
      if(dropdown.style.display === 'block'){
        const opts = dropdown.querySelectorAll('.mention-option');
        if(e.key === 'ArrowDown'){
          e.preventDefault();
          activeMentionIdx = (activeMentionIdx + 1) % opts.length;
          opts.forEach((o, i) => o.classList.toggle('active', i === activeMentionIdx));
          return;
        }
        if(e.key === 'ArrowUp'){
          e.preventDefault();
          activeMentionIdx = (activeMentionIdx - 1 + opts.length) % opts.length;
          opts.forEach((o, i) => o.classList.toggle('active', i === activeMentionIdx));
          return;
        }
        if(e.key === 'Enter' || e.key === 'Tab'){
          e.preventDefault();
          const active = opts[activeMentionIdx];
          if(active) insertMention(active.dataset.mname);
          return;
        }
        if(e.key === 'Escape'){
          dropdown.style.display = 'none';
          return;
        }
      }
      if(e.key === 'Enter'){
        e.preventDefault();
        const btn = container.querySelector(`[data-comment-btn="${evId}"]`);
        btn?.click();
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => { dropdown.style.display = 'none'; }, 200);
    });
  });
}

function detectConflicts(list){
  const conflicts = new Set();
  for(let i=0;i<list.length;i++){
    for(let j=i+1;j<list.length;j++){
      if(list[i].collab !== list[j].collab) continue;
      const a = list[i], b = list[j];
      if(!a.startTime || !b.startTime) continue;
      const aS = a.startTime, aE = a.endTime || addHour(aS);
      const bS = b.startTime, bE = b.endTime || addHour(bS);
      if(aS < bE && bS < aE){ conflicts.add(a.id); conflicts.add(b.id); }
    }
  }
  return conflicts;
}

function deleteEvent(id){
  const list = state.events[activeDateKey] || [];
  const ev = list.find(x => x.id === id);
  if(!ev) return;
  // permissao: admin sempre, viewer so se for participante da reuniao
  if(state.role !== 'admin'){
    const isMyMeeting = ev.type === 'reuniao' && ev.collab === 'todos' && ev.rsvp && ev.rsvp[state.viewerAs] === 'yes';
    if(!isMyMeeting){ toast('Sem permissão para excluir'); return; }
  }
  if(!confirm(`Excluir "${ev.title}"?`)) return;
  state.events[activeDateKey] = list.filter(x => x.id !== id);
  if(state.events[activeDateKey].length === 0) delete state.events[activeDateKey];
  // limpar request associado se for reuniao
  const relReq = (state.requests||[]).find(r => r.type === 'meeting' && r.status === 'approved' && r.suggestedDate === activeDateKey);
  if(relReq){ relReq.status = 'cancelled'; relReq.resolvedAt = new Date().toISOString(); save('requests'); }
  logHistory(`Excluiu "${ev.title}" (${COLLABS[ev.collab].name})`);
  save('events');
  renderExistingEvents();
  render();
  toast('Evento excluído');
}

function closeModal(){
  $('#modal').classList.remove('open');
  activeDateKey = null;
  editingEvent = null;
}

function saveEvent(){
  if(state.role !== 'admin') return;
  const title = $('#eventTitle').value.trim();
  if(!title){
    const i = $('#eventTitle');
    i.focus();
    i.style.borderColor = 'var(--danger)';
    setTimeout(()=>i.style.borderColor='', 1200);
    return;
  }
  const start = $('#eventStart').value || null;
  const end = $('#eventEnd').value || null;
  if(start && end && end <= start){
    toast('O horário final deve ser após o inicial');
    return;
  }

  if(!formTasks.length){
    toast('Adicione pelo menos uma tarefa para alguém da equipe');
    return;
  }
  // sanitizar tarefas para garantir formato consistente
  formTasks = formTasks.filter(t => t && typeof t === 'object' && t.collab && t.text);
  if(!formTasks.length){
    toast('Tarefas inválidas');
    return;
  }
  // validar link (so http/https permitido)
  const linkVal = $('#eventLink').value.trim();
  if(linkVal && !/^https?:\/\//i.test(linkVal)){
    toast('Link deve começar com http:// ou https://');
    return;
  }
  const uniqueCollabs = [...new Set(formTasks.map(t => t.collab))];
  const derivedCollab = uniqueCollabs.length === 1 ? uniqueCollabs[0] : 'todos';
  const wkCounts = eventsByCollabInWeek(getWeekStart(new Date(activeDateKey)));

  if(uniqueCollabs.length === 1 && wkCounts[derivedCollab] >= 5 && !editingEvent){
    if(!confirm(`${COLLABS[derivedCollab].name} já tem ${wkCounts[derivedCollab]} eventos nesta semana. Deseja continuar?`)){
      return;
    }
  }

  if(editingEvent){
    // atualizar
    const ev = editingEvent;
    const oldTitle = ev.title;
    ev.title = title;
    ev.collab = derivedCollab;
    ev.type = formSelectedType;
    ev.startTime = start;
    ev.endTime = end;
    ev.desc = $('#eventDesc').value.trim();
    ev.link = $('#eventLink').value.trim();
    ev.location = $('#eventLocation').value.trim();
    ev.recurring = $('#eventRecurring').value;
    ev.pinned = $('#eventPinned').checked;
    ev.private = $('#eventPrivate').checked;
    ev.tasks = formTasks.map(t => ({id:t.id||uid(), collab:t.collab, text:t.text, done:t.done||false}));
    logHistory(`Editou "${oldTitle}" → "${title}"`);
    save('events');
    toast('Evento atualizado');
  } else {
    const newEv = {
      id: uid(),
      title,
      collab: derivedCollab,
      type: formSelectedType,
      startTime: start,
      endTime: end,
      desc: $('#eventDesc').value.trim(),
      link: $('#eventLink').value.trim(),
      location: $('#eventLocation').value.trim(),
      recurring: $('#eventRecurring').value,
      pinned: $('#eventPinned').checked,
      private: $('#eventPrivate').checked,
      createdAt: new Date().toISOString(),
      rsvp: {},
      comments: [],
      tasks: formTasks.length ? formTasks.map(t => ({id:uid(), collab:t.collab, text:t.text, done:false})) : []
    };
    if(!state.events[activeDateKey]) state.events[activeDateKey] = [];
    state.events[activeDateKey].push(newEv);

    // recorrência
    const rec = newEv.recurring;
    if(rec && rec !== 'none'){
      const dp = activeDateKey.split('-');
      const base = new Date(+dp[0], +dp[1]-1, +dp[2]);
      let count = 12;
      let intervalDays = 0, intervalWeeks = 0, intervalMonths = 0;
      if(rec === 'daily'){ intervalDays = 1; }
      else if(rec === 'weekly'){ intervalWeeks = 1; }
      else if(rec === 'monthly'){ intervalMonths = 1; }
      else if(rec === 'custom'){
        count = Math.min(52, Math.max(1, parseInt($('#customRecurCount').value) || 4));
        const interval = Math.max(1, parseInt($('#customRecurInterval').value) || 1);
        const unit = $('#customRecurUnit').value;
        if(unit === 'days') intervalDays = interval;
        else if(unit === 'weeks') intervalWeeks = interval;
        else if(unit === 'months') intervalMonths = interval;
      }
      for(let i=1;i<=count;i++){
        const next = new Date(base);
        if(intervalDays) next.setDate(base.getDate()+(i*intervalDays));
        if(intervalWeeks) next.setDate(base.getDate()+(i*intervalWeeks*7));
        if(intervalMonths) next.setMonth(base.getMonth()+(i*intervalMonths));
        const k = keyFromDate(next);
        const clone = {...newEv, id: uid(), recurringSource: newEv.id};
        if(clone.tasks && clone.tasks.length) clone.tasks = clone.tasks.map(t => ({...t, id: uid(), done: false}));
        clone.rsvp = {};
        clone.comments = [];
        clone.completed = false;
        if(!state.events[k]) state.events[k] = [];
        state.events[k].push(clone);
      }
    }

    const taskNames = uniqueCollabs.map(c=>COLLABS[c]?COLLABS[c].name:c);
    const logTarget = taskNames.length > 1 ? taskNames.join(', ') : taskNames[0];
    logHistory(`Criou "${title}" para ${logTarget}`);
    // push para cada colaborador que recebeu tarefa
    uniqueCollabs.forEach(c => {
      if(c && c !== 'todos') triggerPush(c, '📋 Nova tarefa atribuída', `${title} em ${activeDateKey}`);
    });
    if(uniqueCollabs.includes('todos')){
      Object.keys(COLLABS).filter(k => k !== 'todos').forEach(c => {
        triggerPush(c, '📋 Novo evento da equipe', `${title} em ${activeDateKey}`);
      });
    }
    save('events');
    toast(`✓ "${title}" criado para ${logTarget}${rec && rec !== 'none' ? ' + recorrências' : ''}`);
  }

  resetForm();
  renderExistingEvents();
  render();
}

function getWeekStart(d){
  const out = new Date(d);
  out.setDate(d.getDate() - d.getDay());
  return out;
}

function openEventDetail(key, id){
  openModal(key);
  // não preenche form, só destaca; comportamento simples por enquanto
}

// ============ INSIGHTS MODAL ============
function openInsights(){
  const y = state.current.getFullYear();
  const m = state.current.getMonth();
  const counts = eventsByCollabInMonth(y, m);
  const max = Math.max(1, ...Object.values(counts));

  // por tipo
  const typeCounts = {};
  Object.keys(state.events).forEach(k => {
    const [yy,mm] = k.split('-').map(Number);
    if(yy===y && mm===m+1){
      state.events[k].forEach(e => {
        const t = e.type || 'outro';
        typeCounts[t] = (typeCounts[t]||0)+1;
      });
    }
  });

  // por dia da semana (heatmap)
  const dowCounts = [0,0,0,0,0,0,0];
  Object.keys(state.events).forEach(k => {
    const [yy,mm,dd] = k.split('-').map(Number);
    if(yy===y && mm===m+1){
      const d = new Date(yy, mm-1, dd);
      dowCounts[d.getDay()] += state.events[k].length;
    }
  });

  const total = Object.values(counts).reduce((a,b)=>a+b,0);
  const winner = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];

  let chartHTML = '';
  Object.entries(COLLABS).filter(([k])=>k!=='todos').forEach(([k, info]) => {
    const val = counts[k] || 0;
    const pct = (val/max)*100;
    chartHTML += `
      <div class="bar-chart-row">
        <span class="label">${info.name}</span>
        <div class="bar"><div class="bar-fill" style="width:${pct}%;background:var(${info.cssVar})"></div></div>
        <span class="val">${val}</span>
      </div>
    `;
  });

  let typeHTML = '';
  Object.entries(typeCounts).sort((a,b)=>b[1]-a[1]).forEach(([t, n]) => {
    const tinfo = EVENT_TYPES[t] || EVENT_TYPES.outro;
    typeHTML += `
      <div class="type-row">
        <span class="ico">${tinfo.ico}</span>
        <span class="label">${tinfo.label}</span>
        <span class="val">${n}</span>
      </div>
    `;
  });
  if(!typeHTML) typeHTML = '<em style="font-family:Fraunces,serif;font-style:italic;color:var(--ink-soft);font-size:12px">Sem eventos no mês.</em>';

  const dowMax = Math.max(1, ...dowCounts);
  let dowHTML = '<div style="display:flex;gap:6px;align-items:flex-end;height:80px;margin-top:8px">';
  WEEKDAYS_SHORT.forEach((wd, i) => {
    const h = (dowCounts[i]/dowMax)*70;
    dowHTML += `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        <span style="font-family:'Fraunces',serif;font-weight:600;font-size:11px">${dowCounts[i]}</span>
        <div style="width:100%;height:${h+4}px;background:var(--ink);border-radius:3px 3px 0 0"></div>
        <span style="font-size:10px;color:var(--ink-soft)">${wd}</span>
      </div>
    `;
  });
  dowHTML += '</div>';

  $('#insightsBody').innerHTML = `
    <p style="font-family:Fraunces,serif;font-style:italic;color:var(--ink-soft);font-size:13px;margin-bottom:14px">
      ${MONTHS_PT[m]} de ${y} — total de <strong style="color:var(--ink);font-style:normal">${total}</strong> evento${total!==1?'s':''}.
      ${winner && winner[1]>0 ? `🏆 <strong style="color:var(--ink);font-style:normal">${COLLABS[winner[0]].name}</strong> lidera com ${winner[1]}.` : ''}
    </p>
    <div class="insights-grid">
      <div class="insight-card">
        <h4>Eventos por pessoa</h4>
        <div class="bar-chart">${chartHTML}</div>
      </div>
      <div class="insight-card">
        <h4>Distribuição por tipo</h4>
        <div class="type-list">${typeHTML}</div>
      </div>
      <div class="insight-card" style="grid-column:span 2">
        <h4>Quando a equipe está mais ocupada</h4>
        ${dowHTML}
      </div>
    </div>
  `;
  $('#insightsModal').classList.add('open');
}

// ============ HISTORY MODAL ============
function openHistory(){
  // filtrar apenas acoes de eventos/tarefas — regex que verifica padroes especificos
  const EVENT_PATTERNS = [
    /^criou\s+"/i,
    /^editou\s+"/i,
    /^excluiu\s+"/i,
    /^moveu\s+"/i,
    /concluiu\s+"/i,
    /marcou\s+"[^"]+"\s+como/i,
    /pediu\s+ajuda\s+em\s+"/i,
    /ofereceu\s+ajuda\s+em\s+"/i,
    /pediu\s+substituição/i,
    /solicitou\s+troca\s+de\s+"/i,
    /aprovou\s+(troca|reunião)/i,
    /negou\s+(troca|reunião)/i,
    /convidou\s+.+\s+para\s+reunião/i,
    /(aceitou|recusou)\s+(reunião|substituir)/i,
    /reunião\s+confirmada/i
  ];
  const filtered = (state.history || []).filter(h => {
    const action = h.action || '';
    return EVENT_PATTERNS.some(re => re.test(action));
  });
  if(!filtered.length){
    wrap.innerHTML = '<div class="history-empty">Sem atividade de eventos ainda. Crie ou edite eventos pra ver o histórico aqui.</div>';
  } else {
    wrap.innerHTML = '<div class="history-list">' + filtered.slice().reverse().map(h => {
      const d = new Date(h.when);
      const when = `${pad(d.getDate())}/${pad(d.getMonth()+1)} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
      return `<div class="history-item">
        <span class="when">${when}</span>
        <span class="what"><strong>${escapeHtml(h.who)}</strong> ${escapeHtml(h.action)}</span>
      </div>`;
    }).join('') + '</div>';
  }
  $('#historyModal').classList.add('open');
}

// ============ STATUS / MOOD MODAL ============
function openStatus(){
  const wrap = $('#statusBody');
  const today = todayKey;
  const todayStatuses = state.statuses[today] || {};
  const myKey = state.viewerAs;

  let html = '<p style="font-family:Fraunces,serif;font-style:italic;font-size:13px;color:var(--ink-soft);margin-bottom:14px">Cada colaborador define seu próprio status. Você só pode alterar o seu.</p>';

  Object.entries(COLLABS).filter(([k])=>k!=='todos').forEach(([k, info]) => {
    const current = todayStatuses[k] || 'office';
    // apenas o proprio colaborador pode editar seu status
    const canEdit = k === myKey;
    html += `
      <div style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <div class="avatar" style="background:var(${info.cssVar});width:22px;height:22px;font-size:10px">${info.initial}</div>
          <strong style="font-size:13px">${info.name}${k === myKey ? ' (você)' : ''}</strong>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:4px${!canEdit ? ';opacity:0.6;pointer-events:none' : ''}">
          ${Object.entries(STATUS_LABELS).map(([s, sl]) => `
            <button class="pick" ${canEdit?`data-status="${s}" data-collab="${k}"`:''} style="font-size:11px;padding:6px;text-align:center;justify-content:center${current===s?';box-shadow:var(--shadow)':''}${!canEdit?';cursor:default':''}">
              <span class="dot ${sl.cls}" style="border-radius:50%"></span>
              ${sl.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  });

  $('#statusBody').innerHTML = html;
  $('#statusBody').querySelectorAll('[data-status]').forEach(b => {
    b.addEventListener('click', () => {
      const col = b.dataset.collab, st = b.dataset.status;
      // defesa: so o proprio colaborador pode mudar
      if(col !== state.viewerAs){ toast('Apenas o próprio colaborador pode mudar seu status'); return; }
      if(!state.statuses[today]) state.statuses[today] = {};
      state.statuses[today][col] = st;
      save('statuses');
      openStatus(); // re-render
      render();
    });
  });
  $('#statusModal').classList.add('open');
}

// ============ SETTINGS MODAL ============
function openSettings(){
  $('#settingsTheme').value = state.theme;
  $('#settingsFestive').checked = state.festive;
  const isAdmin = state.role === 'admin';
  Object.keys(COLLABS).filter(k => k !== 'todos').forEach(k => {
    const input = document.getElementById('color-'+k);
    if(input){
      const current = state.customColors[k] || getComputedStyle(document.documentElement).getPropertyValue(COLLABS[k].cssVar).trim();
      input.value = rgbToHex(current);
      input.disabled = !isAdmin;
    }
  });
  // esconder secao de cores para viewer
  const colorsHeader = document.querySelector('#settingsModal h4');
  if(colorsHeader){
    colorsHeader.style.display = isAdmin ? '' : 'none';
    let sib = colorsHeader.nextElementSibling;
    while(sib && !sib.classList.contains('modal-actions')){
      if(sib.classList.contains('form-row')) sib.style.display = isAdmin ? '' : 'none';
      sib = sib.nextElementSibling;
    }
  }
  $('#settingsReset').style.display = isAdmin ? '' : 'none';
  $('#settingsModal').classList.add('open');
}

function rgbToHex(c){
  c = c.trim();
  if(c.startsWith('#')) return c.length === 4 ? '#'+c.slice(1).split('').map(x=>x+x).join('') : c;
  const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if(m) return '#'+[1,2,3].map(i=>pad(parseInt(m[i]).toString(16))).join('');
  return '#000000';
}

// ============ LOGIN (Firebase Auth) ============
async function openLogin(){
  $('#loginPwd').value = '';
  $('#loginError').style.display = 'none';
  $('#setupWrap').style.display = 'none';
  $('#loginModal').classList.add('open');
  setTimeout(()=>$('#loginPwd').focus(), 100);
  try{
    const snap = await db.collection('pinMap').doc('map').get();
    if(!snap.exists) $('#setupWrap').style.display = 'block';
  }catch(e){
    $('#setupWrap').style.display = 'block';
  }
}

async function hashPin(pin){
  const data = new TextEncoder().encode(pin + 'calendarioSalt');
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

async function setupAccounts(){
  const apiKey = firebaseConfig.apiKey;
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
  const passwords = {
    admin:'7766', joao:'1010', thayane:'1212', lianda:'2323', ravy:'8080'
  };
  let ok = 0;
  const pinMapData = {};
  for(const [id, info] of Object.entries(AUTH_USERS)){
    try{
      const res = await fetch(url, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ email:info.email, password:pinToPassword(passwords[id]), returnSecureToken:false })
      });
      const data = await res.json();
      if(data.localId || data.kind) ok++;
      else if(data.error && data.error.message === 'EMAIL_EXISTS') ok++;
      const h = await hashPin(passwords[id]);
      pinMapData[h] = info.email;
    }catch(e){}
  }
  if(ok >= 1){
    // logar como admin para ter permissao de escrita no Firestore
    try{
      await auth.signInWithEmailAndPassword(AUTH_USERS.admin.email, pinToPassword(passwords.admin));
      await db.collection('authSetupDone').doc('flag').set({ at: new Date().toISOString() });
      await db.collection('pinMap').doc('map').set(pinMapData);
      await auth.signOut();
    }catch(e){
      console.error('Setup Firestore write failed:', e);
    }
    $('#setupWrap').style.display = 'none';
    toast(ok + ' contas criadas! Agora faca login.');
  } else {
    toast('Erro ao criar contas. Ative Email/Password no Firebase Console.');
  }
}

async function tryLogin(){
  const pin = $('#loginPwd').value;
  if(!pin || pin.length < 4){
    $('#loginError').textContent = 'Digite seu PIN de 4 dígitos.';
    $('#loginError').style.display = 'block';
    return;
  }
  $('#loginSubmit').textContent = 'Entrando...';
  $('#loginSubmit').disabled = true;

  try{
    const h = await hashPin(pin);
    const snap = await db.collection('pinMap').doc('map').get();
    if(!snap.exists){
      $('#loginError').textContent = 'Contas não configuradas. Clique em "Configurar contas".';
      $('#loginError').style.display = 'block';
      $('#setupWrap').style.display = 'block';
      $('#loginSubmit').textContent = 'Entrar';
      $('#loginSubmit').disabled = false;
      return;
    }
    const email = snap.data()[h];
    if(!email){
      $('#loginError').textContent = 'PIN incorreto.';
      $('#loginError').style.display = 'block';
      $('#loginPwd').value = '';
      $('#loginSubmit').textContent = 'Entrar';
      $('#loginSubmit').disabled = false;
      return;
    }
    await auth.signInWithEmailAndPassword(email, pinToPassword(pin));
  }catch(e){
    let msg = 'PIN incorreto.';
    if(e.code === 'auth/too-many-requests') msg = 'Muitas tentativas. Aguarde um momento.';
    else if(e.code === 'auth/invalid-credential') msg = 'PIN incorreto.';
    $('#loginError').textContent = msg;
    $('#loginError').style.display = 'block';
    $('#loginPwd').value = '';
  }

  $('#loginSubmit').textContent = 'Entrar';
  $('#loginSubmit').disabled = false;
}

const WELCOME_MESSAGES = {
  admin: 'Pronta pra organizar o time? Seu painel de gestão está atualizado.',
  joao: 'Bora fazer acontecer, João! Confira seus eventos do dia.',
  thayane: 'Oi Thayane! Veja o que tem programado pra hoje.',
  lianda: 'E aí Lianda! Seu calendário está te esperando.',
  ravy: 'Fala Ravy! Dá uma olhada no que vem por aí.'
};

function applyUserRole(userInfo){
  if(userInfo.role === 'admin'){
    state.role = 'admin';
    state.viewerAs = null;
    state.filterCollab = null;
    state.showOnlyMine = false;
  } else {
    state.role = 'viewer';
    state.viewerAs = userInfo.collabKey;
    state.filterCollab = userInfo.collabKey;
    state.showOnlyMine = true;
  }
  logHistory('Fez login como ' + userInfo.name);
  showWelcome(userInfo);
}

function showWelcome(userInfo){
  const key = userInfo.collabKey || 'admin';
  const photo = userInfo.role === 'admin' ? ADMIN_USER.photo : COLLABS[key].photo;
  const msg = WELCOME_MESSAGES[key] || 'Bem-vindo!';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : (hour < 18 ? 'Boa tarde' : 'Boa noite');

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(26,20,56,0.6);backdrop-filter:blur(4px);z-index:60;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s ease';
  overlay.innerHTML = `
    <div style="background:var(--card);border:1.5px solid var(--ink);border-radius:16px;padding:32px;max-width:340px;width:90%;text-align:center;box-shadow:6px 6px 0 var(--ink);animation:pop .3s ease">
      <img src="${photo}" alt="${userInfo.name}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid var(--ink);margin-bottom:14px">
      <h3 style="font-family:'Fraunces',serif;font-weight:700;font-size:22px;margin-bottom:4px">${greeting}, ${userInfo.name}!</h3>
      <p style="font-family:'Fraunces',serif;font-style:italic;font-size:14px;color:var(--ink-soft);line-height:1.5;margin-bottom:18px">${msg}</p>
      <button style="border:1.5px solid var(--ink);background:var(--ink);color:var(--bg);padding:10px 24px;border-radius:999px;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer" id="welcomeClose">Vamos lá</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#welcomeClose').addEventListener('click', () => {
    overlay.style.animation = 'fadeOut .2s ease forwards';
    setTimeout(() => overlay.remove(), 200);
  });
  setTimeout(() => { if(overlay.parentNode) overlay.querySelector('#welcomeClose').click(); }, 5000);
}

// ============ TASK ASSIGNMENT ============
// formTasks = [ { collab:'joao', text:'gravar', done:false }, ... ]
function renderTaskList(){
  const list = $('#taskAssignList');
  if(!formTasks.length){
    list.innerHTML = '<span style="font-size:11px;color:var(--ink-faint);font-style:italic">Nenhuma tarefa adicionada</span>';
    return;
  }
  list.innerHTML = formTasks.map((t,i) => {
    const c = COLLABS[t.collab];
    const photo = c && c.photo ? `<img src="${c.photo}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;border:1.5px solid var(${c.cssVar})">` : '';
    const name = c ? c.name : t.collab;
    return `<div class="task-item">
      ${photo}<strong style="font-size:11px;min-width:60px">${name}</strong>
      <span class="task-text">${escapeHtml(t.text)}</span>
      <button class="task-remove" data-task-idx="${i}" title="Remover">&times;</button>
    </div>`;
  }).join('');
  list.querySelectorAll('.task-remove').forEach(b => {
    b.addEventListener('click', () => {
      formTasks.splice(+b.dataset.taskIdx, 1);
      renderTaskList();
    });
  });
}
function addTaskAssign(){
  const collab = $('#taskCollabSelect').value;
  const input = $('#taskAssignInput');
  const text = input.value.trim();
  if(!text){ input.focus(); return; }
  formTasks.push({ id:uid(), collab, text, done:false });
  input.value = '';
  renderTaskList();
  input.focus();
}

// ============ BUSCA ============
function renderSearch(query){
  const wrap = $('#searchResults');
  if(!query || query.length < 2){ wrap.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const results = [];
  for(const [dateKey, evts] of Object.entries(state.events)){
    for(const ev of evts){
      if(state.role === 'viewer' && state.viewerAs && !evVisibleTo(ev, state.viewerAs)) continue;
      const c = COLLABS[ev.collab];
      const type = EVENT_TYPES[ev.type || 'outro'];
      const taskText = (ev.tasks || []).map(t => typeof t === 'object' ? t.text : t).join(' ');
      const haystack = [ev.title, ev.desc, c.name, type.label, ev.location, dateKey, taskText].join(' ').toLowerCase();
      if(haystack.includes(q)){
        results.push({ dateKey, ev, collab: c, type });
      }
    }
  }
  results.sort((a,b) => a.dateKey > b.dateKey ? 1 : -1);
  if(results.length === 0){
    wrap.innerHTML = '<p style="font-size:11px;color:var(--ink-faint);font-style:italic;padding:4px 0">Nenhum resultado</p>';
    return;
  }
  wrap.innerHTML = results.slice(0, 15).map(r => {
    const d = r.dateKey.split('-');
    const dateStr = `${d[2]}/${d[1]}/${d[0]}`;
    return `<div class="search-result" data-search-key="${r.dateKey}">
      <div class="sr-title">${r.type.ico} ${escapeHtml(r.ev.title)}</div>
      <div class="sr-meta">${dateStr} · ${r.collab.name}${r.ev.startTime ? ' · '+r.ev.startTime : ''}</div>
    </div>`;
  }).join('');
  if(results.length > 15){
    wrap.innerHTML += `<p style="font-size:11px;color:var(--ink-faint);font-style:italic;padding:4px 0">+${results.length-15} resultados</p>`;
  }
  wrap.querySelectorAll('.search-result').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.searchKey;
      const parts = key.split('-');
      state.current = new Date(+parts[0], +parts[1]-1, +parts[2]);
      if(state.view === 'month') state.current.setDate(1);
      openModal(key);
      wrap.innerHTML = '';
      $('#searchInput').value = '';
    });
  });
}

// ============ REQUESTS SYSTEM ============
function renderRequestBadge(){
  const btn = $('#requestsBtn');
  const badge = $('#requestBadge');
  if(!btn) return;
  if(state.role === 'admin'){
    btn.style.display = '';
    const pending = (state.requests||[]).filter(r => r.status === 'pending').length;
    if(pending > 0){ badge.style.display = 'flex'; badge.textContent = pending; }
    else { badge.style.display = 'none'; }
  } else { btn.style.display = 'none'; }
}

function requestDateChange(dateKey, eventId){
  const ev = (state.events[dateKey]||[]).find(x=>x.id===eventId);
  if(!ev) return;
  const newDate = prompt('Para qual data mover? (AAAA-MM-DD)', dateKey);
  if(!newDate || !/^\d{4}-\d{2}-\d{2}$/.test(newDate)) return;
  const reason = prompt('Motivo da troca (opcional):', '') || '';
  if(!state.requests) state.requests = [];
  state.requests.push({
    id: uid(), type:'date-change', eventId: ev.id, dateKey, requestedDate: newDate,
    who: state.viewerAs, reason, status:'pending', createdAt: new Date().toISOString(), resolvedAt:null
  });
  save('requests');
  logHistory(`${COLLABS[state.viewerAs].name} solicitou troca de "${ev.title}" para ${newDate}`);
  toast('Solicitação enviada!');
}

function openRequestsModal(){
  const body = $('#requestsBody');
  const reqs = state.requests || [];
  const pending = reqs.filter(r=>r.status==='pending');
  const resolved = reqs.filter(r=>r.status!=='pending').slice(-20);
  let html = '';
  if(!pending.length && !resolved.length){ html = '<p style="text-align:center;color:var(--ink-faint);font-style:italic">Nenhuma solicitação.</p>'; }
  pending.forEach(r => {
    const who = COLLABS[r.who] ? COLLABS[r.who].name : r.who;
    const photo = COLLABS[r.who] ? COLLABS[r.who].photo : '';
    const photoHtml = photo ? `<img src="${photo}" style="width:24px;height:24px;border-radius:50%;object-fit:cover">` : '';
    if(r.type === 'date-change'){
      const ev = Object.values(state.events).flat().find(e=>e.id===r.eventId);
      const evTitle = ev ? escapeHtml(ev.title) : '(evento removido)';
      html += `<div class="request-card pending">
        <div class="rc-head">${photoHtml}<strong>${who}</strong></div>
        <div class="rc-meta">Quer mover "<strong>${evTitle}</strong>" de ${r.dateKey} para ${r.requestedDate}</div>
        ${r.reason ? `<div class="rc-meta">Motivo: ${escapeHtml(r.reason)}</div>` : ''}
        <div class="rc-actions">
          <button class="btn small" data-req-approve="${r.id}">✓ Aprovar</button>
          <button class="btn small danger" data-req-deny="${r.id}">✗ Negar</button>
        </div>
      </div>`;
    } else if(r.type === 'meeting'){
      const cols = (r.colleagues||[]).map(k=>COLLABS[k]?COLLABS[k].name:k).join(', ');
      let respHtml = '';
      if(r.responses){
        respHtml = '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">';
        Object.entries(r.responses).forEach(([k,v]) => {
          const name = COLLABS[k] ? COLLABS[k].name : k;
          const icon = v === 'yes' ? '✅' : (v === 'no' ? '❌' : '⏳');
          respHtml += `<span class="rsvp-status rsvp-${v==='yes'?'yes':(v==='no'?'no':'pending')}">${icon} ${name}</span>`;
        });
        respHtml += '</div>';
      }
      html += `<div class="request-card pending">
        <div class="rc-head">${photoHtml}<strong>${who}</strong></div>
        <div class="rc-meta">Convidou <strong>${cols}</strong> para reunião em ${r.suggestedDate} às ${r.suggestedTime}</div>
        ${r.note ? `<div class="rc-meta">Obs: ${escapeHtml(r.note)}</div>` : ''}
        ${respHtml}
        <div class="rc-meta" style="margin-top:4px;font-style:normal;color:var(--ink-faint)">Aguardando resposta dos convidados</div>
      </div>`;
    }
  });
  if(resolved.length){
    html += '<h4 style="font-family:Fraunces,serif;font-size:14px;margin:16px 0 8px;color:var(--ink-soft)">Resolvidos</h4>';
    resolved.reverse().forEach(r => {
      const who = COLLABS[r.who] ? COLLABS[r.who].name : r.who;
      const icon = r.status === 'approved' ? '✅' : '❌';
      const label = r.type === 'meeting' ? 'reunião' : 'troca de dia';
      html += `<div class="request-card"><div class="rc-meta">${icon} ${who} — ${label} (${r.status === 'approved' ? 'aprovado' : 'negado'})</div></div>`;
    });
  }
  body.innerHTML = html;
  body.querySelectorAll('[data-req-approve]').forEach(b => {
    b.addEventListener('click', () => resolveRequest(b.dataset.reqApprove, 'approved'));
  });
  body.querySelectorAll('[data-req-deny]').forEach(b => {
    b.addEventListener('click', () => resolveRequest(b.dataset.reqDeny, 'denied'));
  });
  $('#requestsModal').classList.add('open');
}

function resolveRequest(reqId, status){
  const req = (state.requests||[]).find(r=>r.id===reqId);
  if(!req) return;
  req.status = status;
  req.resolvedAt = new Date().toISOString();
  if(status === 'approved'){
    if(req.type === 'date-change'){
      const fromArr = state.events[req.dateKey] || [];
      const idx = fromArr.findIndex(e=>e.id===req.eventId);
      if(idx !== -1){
        const ev = fromArr.splice(idx, 1)[0];
        if(!fromArr.length) delete state.events[req.dateKey];
        if(!state.events[req.requestedDate]) state.events[req.requestedDate] = [];
        state.events[req.requestedDate].push(ev);
        logHistory(`Aprovou troca de "${ev.title}" para ${req.requestedDate}`);
        save('events');
      }
    } else if(req.type === 'meeting'){
      const k = req.suggestedDate;
      const newEv = {
        id: uid(), title:'Reunião solicitada por '+COLLABS[req.who].name,
        collab:'todos', type:'reuniao', startTime:req.suggestedTime, endTime:addHour(req.suggestedTime),
        desc:req.note||'', link:'', location:'', recurring:'none', pinned:false, private:false,
        createdAt:new Date().toISOString(), rsvp:{}, comments:[], tasks:[]
      };
      if(!state.events[k]) state.events[k] = [];
      state.events[k].push(newEv);
      logHistory(`Aprovou reunião solicitada por ${COLLABS[req.who].name}`);
      save('events');
    }
  } else {
    const label = req.type === 'meeting' ? 'reunião' : 'troca';
    logHistory(`Negou ${label} de ${COLLABS[req.who].name}`);
  }
  save('requests');
  openRequestsModal();
  render();
}

// ============ PERSONAL NOTES ============
async function savePersonalNote(){
  const key = activeDateKey;
  const userKey = state.role === 'admin' ? 'admin' : state.viewerAs;
  if(!userKey) return;
  const text = $('#personalNoteText').value.trim();
  const icon = (document.querySelector('.note-ico-btn.selected') || {}).dataset?.nico || '📝';
  // reload notes from Firestore before merging to avoid overwriting other users
  try{
    const r = await window.storage.get('notes');
    if(r && r.value) state.notes = JSON.parse(r.value);
  }catch(e){}
  if(!state.notes[key]) state.notes[key] = {};
  if(text) state.notes[key][userKey] = { text, icon };
  else delete state.notes[key][userKey];
  if(Object.keys(state.notes[key]).length === 0) delete state.notes[key];
  save('notes');
  toast('Nota salva');
  render();
}
function deletePersonalNote(){
  const key = activeDateKey;
  const userKey = state.role === 'admin' ? 'admin' : state.viewerAs;
  if(!userKey) return;
  if(state.notes[key]){ delete state.notes[key][userKey]; }
  if(state.notes[key] && Object.keys(state.notes[key]).length === 0) delete state.notes[key];
  save('notes');
  $('#personalNoteText').value = '';
  $('#deleteNoteBtn').style.display = 'none';
  toast('Nota excluída');
  render();
}

// ============ MEETING REQUEST ============
function openMeetingRequest(){
  $('#meetingDate').value = todayKey;
  $('#meetingTime').value = '10:00';
  $('#meetingNote').value = '';
  const picker = $('#meetingCollabPicker');
  const others = Object.entries(COLLABS).filter(([k]) => k !== 'todos' && k !== state.viewerAs);
  picker.innerHTML = others.map(([k, info]) =>
    `<button class="pick" data-mcollab="${k}"><span class="dot" style="background:var(${info.cssVar})"></span>${info.name}</button>`
  ).join('');
  picker.querySelectorAll('.pick').forEach(b => {
    b.addEventListener('click', () => b.classList.toggle('selected'));
  });
  $('#meetingRequestModal').classList.add('open');
}
function submitMeetingRequest(){
  const colleagues = Array.from($$('#meetingCollabPicker .pick.selected')).map(b => b.dataset.mcollab);
  if(!colleagues.length){ toast('Selecione pelo menos um participante'); return; }
  if(!state.requests) state.requests = [];
  const responses = {};
  colleagues.forEach(c => { responses[c] = 'pending'; });
  state.requests.push({
    id: uid(), type:'meeting', who: state.viewerAs, colleagues, responses,
    suggestedDate: $('#meetingDate').value, suggestedTime: $('#meetingTime').value,
    note: $('#meetingNote').value.trim(), status:'pending', createdAt: new Date().toISOString(),
    resolvedAt:null, eventId:null
  });
  save('requests');
  logHistory(`${COLLABS[state.viewerAs].name} convidou ${colleagues.map(c=>COLLABS[c].name).join(', ')} para reunião`);
  $('#meetingRequestModal').classList.remove('open');
  toast('Convite enviado!');
  const fromName = COLLABS[state.viewerAs]?.name || state.viewerAs;
  colleagues.forEach(c => triggerPush(c, '📅 Convite de reunião', `${fromName} quer marcar em ${$('#meetingDate').value}`));
}

let substituteEventId = null;
let substituteTarget = null;
function openSubstituteModal(eventId){
  substituteEventId = eventId;
  substituteTarget = null;
  $('#substituteReason').value = '';
  const picker = $('#substitutePicker');
  picker.innerHTML = Object.entries(COLLABS)
    .filter(([k]) => k !== 'todos' && k !== state.viewerAs)
    .map(([k, c]) => {
      const photo = c.photo ? `<img src="${c.photo}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;border:1.5px solid var(${c.cssVar})">` : '';
      return `<button class="pick" data-sub-pick="${k}" style="display:flex;align-items:center;gap:8px;padding:10px">${photo}${c.name}</button>`;
    }).join('');
  picker.querySelectorAll('[data-sub-pick]').forEach(b => {
    b.addEventListener('click', () => {
      picker.querySelectorAll('[data-sub-pick]').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      substituteTarget = b.dataset.subPick;
    });
  });
  $('#substituteModal').classList.add('open');
}
function closeSubstituteModal(){
  $('#substituteModal').classList.remove('open');
  substituteEventId = null;
  substituteTarget = null;
}
function confirmSubstitute(){
  if(!substituteTarget){ toast('Selecione um colega'); return; }
  const ev = (state.events[activeDateKey]||[]).find(x => x.id === substituteEventId);
  if(!ev) return;
  const reason = $('#substituteReason').value.trim();
  if(!state.requests) state.requests = [];
  state.requests.push({
    id: uid(), type:'substitute', eventId: ev.id, dateKey: activeDateKey,
    who: state.viewerAs, target: substituteTarget, reason,
    status:'pending', createdAt: new Date().toISOString(), resolvedAt:null
  });
  save('requests');
  logHistory(`${COLLABS[state.viewerAs].name} pediu substituição para ${COLLABS[substituteTarget].name} em "${ev.title}"`);
  toast(`Pedido enviado para ${COLLABS[substituteTarget].name}`);
  const fromName = COLLABS[state.viewerAs]?.name || state.viewerAs;
  triggerPush(substituteTarget, '🔄 Pedido de substituição', `${fromName} pediu para cobrir "${ev.title}"`);
  closeSubstituteModal();
  renderExistingEvents();
  render();
}

function respondSubstituteRequest(reqId, response){
  const req = (state.requests||[]).find(r=>r.id===reqId);
  if(!req || req.status !== 'pending') return;
  req.status = response === 'yes' ? 'approved' : 'denied';
  req.resolvedAt = new Date().toISOString();
  if(response === 'yes'){
    // mover tarefas do solicitante para o target
    const ev = (state.events[req.dateKey]||[]).find(e=>e.id===req.eventId);
    if(ev && ev.tasks){
      ev.tasks.forEach(t => { if(t.collab === req.who) t.collab = req.target; });
      save('events');
    }
    logHistory(`${COLLABS[req.target].name} aceitou substituir ${COLLABS[req.who].name}`);
    toast('Substituição aceita!');
  } else {
    logHistory(`${COLLABS[req.target].name} recusou substituir ${COLLABS[req.who].name}`);
    toast('Substituição recusada');
  }
  save('requests');
  render();
}

function respondMeetingRequest(reqId, response){
  const req = (state.requests||[]).find(r=>r.id===reqId);
  if(!req || !req.responses || req.status !== 'pending') return;
  if(req.responses[state.viewerAs] !== 'pending') return;
  req.responses[state.viewerAs] = response;
  const who = COLLABS[state.viewerAs].name;
  logHistory(`${who} ${response==='yes'?'aceitou':'recusou'} reunião de ${COLLABS[req.who].name}`);

  // verificar se todos aceitaram
  const allResponded = Object.values(req.responses).every(v => v !== 'pending');
  const allAccepted = Object.values(req.responses).every(v => v === 'yes');
  if(allAccepted){
    req.status = 'approved';
    req.resolvedAt = new Date().toISOString();
    const k = req.suggestedDate;
    const allPeople = [req.who, ...req.colleagues];
    const participants = allPeople.map(c=>COLLABS[c]?COLLABS[c].name:c).join(', ');
    const rsvpDone = {};
    allPeople.forEach(c => { rsvpDone[c] = 'yes'; });
    const newEv = {
      id: uid(), title:'Reunião: '+participants,
      collab:'todos', type:'reuniao', startTime:req.suggestedTime, endTime:addHour(req.suggestedTime),
      desc:(req.note||''), link:'', location:'', recurring:'none', pinned:false, private:false,
      createdAt:new Date().toISOString(), rsvp:rsvpDone, comments:[], tasks:[], completed:false
    };
    if(!state.events[k]) state.events[k] = [];
    state.events[k].push(newEv);
    save('events');
    logHistory(`Reunião confirmada: ${participants} em ${k}`);
    toast('Todos aceitaram! Reunião criada.');
  } else if(allResponded){
    req.status = 'denied';
    req.resolvedAt = new Date().toISOString();
    toast('Reunião não confirmada (nem todos aceitaram).');
  }
  save('requests');
  render();
}

// ============ MY DAY ============
function openMyDay(){
  const today = todayKey;
  const userKey = state.viewerAs;
  if(!userKey){ toast('Faça login como colaborador'); return; }

  // resumo do dia
  const todayEvents = (state.events[today]||[]).filter(e => evVisibleTo(e, userKey));
  const myTaskCount = todayEvents.reduce((sum, e) => {
    if(!e.tasks) return sum;
    return sum + e.tasks.filter(t => t.collab === userKey).length;
  }, 0);
  const myDoneCount = todayEvents.reduce((sum, e) => {
    if(!e.tasks) return sum;
    return sum + e.tasks.filter(t => t.collab === userKey && t.done).length;
  }, 0);
  const dayName = new Date().toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
  $('#myDayDate').textContent = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  $('#myDayResume').innerHTML = `
    <div style="display:flex;justify-content:space-around;text-align:center;gap:12px">
      <div><div style="font-family:Fraunces,serif;font-size:24px;font-weight:700">${todayEvents.length}</div><div style="font-size:11px;color:var(--ink-soft);text-transform:uppercase">Eventos</div></div>
      <div><div style="font-family:Fraunces,serif;font-size:24px;font-weight:700">${myTaskCount}</div><div style="font-size:11px;color:var(--ink-soft);text-transform:uppercase">Tarefas</div></div>
      <div><div style="font-family:Fraunces,serif;font-size:24px;font-weight:700;color:var(--success)">${myDoneCount}</div><div style="font-size:11px;color:var(--ink-soft);text-transform:uppercase">Feitas</div></div>
    </div>
  `;

  // prioridades
  renderPriorities();
  // bloqueios
  renderBlocks();
  $('#myDayModal').classList.add('open');
}

function renderPriorities(){
  const today = todayKey;
  const userKey = state.viewerAs;
  if(!userKey) return;
  const list = ((state.priorities[today] || {})[userKey] || []);
  const wrap = $('#prioritiesList');
  if(!list.length){
    wrap.innerHTML = '<span style="font-size:11px;color:var(--ink-faint);font-style:italic">Nenhuma prioridade definida</span>';
    return;
  }
  wrap.innerHTML = list.map((p, i) => `
    <div class="priority-item" draggable="true" data-pi="${i}">
      <span class="drag-handle">⠿</span>
      <input type="checkbox" data-pri-check="${i}" ${p.done?'checked':''}>
      <span class="task-text${p.done?' done':''}" style="flex:1${p.done?';text-decoration:line-through;opacity:0.6':''}">${escapeHtml(p.text)}</span>
      <button class="task-remove" data-pri-rm="${i}">&times;</button>
    </div>
  `).join('');
  // drag handlers
  let dragIdx = null;
  wrap.querySelectorAll('.priority-item').forEach(el => {
    el.addEventListener('dragstart', e => { dragIdx = +el.dataset.pi; el.style.opacity = '0.4'; });
    el.addEventListener('dragend', () => { el.style.opacity = ''; });
    el.addEventListener('dragover', e => { e.preventDefault(); });
    el.addEventListener('drop', e => {
      e.preventDefault();
      const targetIdx = +el.dataset.pi;
      if(dragIdx === null || dragIdx === targetIdx) return;
      const items = state.priorities[today][userKey];
      const [moved] = items.splice(dragIdx, 1);
      items.splice(targetIdx, 0, moved);
      save('priorities');
      renderPriorities();
    });
  });
  wrap.querySelectorAll('[data-pri-check]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.priorities[today][userKey][+cb.dataset.priCheck].done = cb.checked;
      save('priorities');
      renderPriorities();
    });
  });
  wrap.querySelectorAll('[data-pri-rm]').forEach(b => {
    b.addEventListener('click', () => {
      state.priorities[today][userKey].splice(+b.dataset.priRm, 1);
      save('priorities');
      renderPriorities();
    });
  });
}

function addPriority(){
  const today = todayKey;
  const userKey = state.viewerAs;
  if(!userKey){ toast('Faça login'); return; }
  const text = $('#newPriorityInput').value.trim();
  if(!text) return;
  if(!state.priorities[today]) state.priorities[today] = {};
  if(!state.priorities[today][userKey]) state.priorities[today][userKey] = [];
  state.priorities[today][userKey].push({ text, done:false });
  $('#newPriorityInput').value = '';
  save('priorities');
  renderPriorities();
}

function renderBlocks(){
  const today = todayKey;
  const userKey = state.viewerAs;
  if(!userKey) return;
  const list = ((state.blocks[today] || {})[userKey] || []);
  const wrap = $('#blocksList');
  if(!list.length){
    wrap.innerHTML = '<span style="font-size:11px;color:var(--ink-faint);font-style:italic">Nenhum horário bloqueado</span>';
    return;
  }
  wrap.innerHTML = list.map((b, i) => `
    <div class="task-item">
      <span class="task-text">⛔ ${b.start} - ${b.end}${b.reason ? ' · '+escapeHtml(b.reason) : ''}</span>
      <button class="task-remove" data-block-rm="${i}">&times;</button>
    </div>
  `).join('');
  wrap.querySelectorAll('[data-block-rm]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.blocks[today][userKey].splice(+btn.dataset.blockRm, 1);
      save('blocks');
      renderBlocks();
    });
  });
}

function addBlock(){
  const today = todayKey;
  const userKey = state.viewerAs;
  if(!userKey){ toast('Faça login'); return; }
  const start = $('#blockStart').value;
  const end = $('#blockEnd').value;
  if(!start || !end || end <= start){ toast('Horários inválidos'); return; }
  const reason = prompt('Motivo (opcional):', '') || '';
  if(!state.blocks[today]) state.blocks[today] = {};
  if(!state.blocks[today][userKey]) state.blocks[today][userKey] = [];
  state.blocks[today][userKey].push({ start, end, reason });
  save('blocks');
  renderBlocks();
}


// ============ DIARY ============
function openDiary(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  if(!userKey){ toast('Faça login'); return; }
  $('#diaryDate').value = todayKey;
  loadDiaryForDate();
  renderDiaryAllHistory();
  $('#diaryModal').classList.add('open');
}
function loadDiaryForDate(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const date = $('#diaryDate').value;
  const txt = ((state.diary[date] || {})[userKey]) || '';
  $('#diaryFullText').value = txt;
  updateDiaryWordCount();
}
function updateDiaryWordCount(){
  const txt = $('#diaryFullText').value.trim();
  const words = txt ? txt.split(/\s+/).length : 0;
  const chars = txt.length;
  $('#diaryWordCount').textContent = words > 0 ? `${words} palavra(s) · ${chars} caractere(s)` : '';
}
function saveDiaryFull(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const date = $('#diaryDate').value;
  if(!userKey || !date) return;
  const text = $('#diaryFullText').value.trim();
  if(!state.diary[date]) state.diary[date] = {};
  if(text) state.diary[date][userKey] = text;
  else delete state.diary[date][userKey];
  if(Object.keys(state.diary[date]).length === 0) delete state.diary[date];
  save('diary');
  toast('Entrada salva');
  renderDiaryAllHistory();
}
function renderDiaryAllHistory(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const wrap = $('#diaryAllHistory');
  if(!wrap || !userKey) return;
  const entries = Object.entries(state.diary || {})
    .map(([dk, byUser]) => ({ dk, text: byUser[userKey] }))
    .filter(e => e.text)
    .sort((a, b) => b.dk.localeCompare(a.dk));
  if(!entries.length){
    wrap.innerHTML = '<span style="font-size:11px;color:var(--ink-faint);font-style:italic">Nenhuma entrada ainda. Escreva sua primeira!</span>';
    return;
  }
  wrap.innerHTML = entries.map(e => {
    const [y,m,d] = e.dk.split('-');
    const dt = new Date(+y, +m-1, +d);
    const dayName = dt.toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long'});
    const isToday = e.dk === todayKey;
    return `<div class="diary-entry" data-diary-date="${e.dk}" style="border:1.5px solid var(--muted);border-radius:8px;padding:12px;background:var(--card);cursor:pointer;transition:all .15s">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <strong style="font-size:13px;text-transform:capitalize">${dayName}${isToday?' · hoje':''}</strong>
        <button class="task-remove" data-diary-rm="${e.dk}" title="Excluir">&times;</button>
      </div>
      <div style="font-family:Fraunces,serif;font-style:italic;font-size:13px;line-height:1.5;white-space:pre-wrap;color:var(--ink-soft)">${escapeHtml(e.text.slice(0,200))}${e.text.length > 200 ? '...' : ''}</div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.diary-entry').forEach(el => {
    el.addEventListener('click', (e) => {
      if(e.target.closest('[data-diary-rm]')) return;
      $('#diaryDate').value = el.dataset.diaryDate;
      loadDiaryForDate();
      $('#diaryFullText').focus();
    });
  });
  wrap.querySelectorAll('[data-diary-rm]').forEach(b => {
    b.addEventListener('click', () => {
      const currentUser = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
      if(!currentUser){ toast('Sessão inválida'); return; }
      if(!confirm('Excluir esta entrada do diário?')) return;
      const date = b.dataset.diaryRm;
      if(state.diary[date]){ delete state.diary[date][currentUser]; }
      if(state.diary[date] && Object.keys(state.diary[date]).length === 0) delete state.diary[date];
      save('diary');
      renderDiaryAllHistory();
      if($('#diaryDate').value === date) loadDiaryForDate();
      toast('Entrada excluída');
    });
  });
}

// ============ KUDOS ============
function openKudos(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  if(!userKey){ toast('Faça login'); return; }
  const sel = $('#kudosTo');
  const opts = Object.entries(COLLABS).filter(([k]) => k !== 'todos' && k !== userKey)
    .map(([k, c]) => `<option value="${k}">${c.name}</option>`).join('');
  sel.innerHTML = opts + (userKey === 'admin' ? '' : `<option value="admin">${ADMIN_USER.name} (Admin)</option>`);
  $('#kudosText').value = '';
  renderKudosList();
  // marcar kudos recebidos como vistos
  localStorage.setItem('kudosLastSeen_' + userKey, String(Date.now()));
  renderKudosBadge();
  $('#kudosModal').classList.add('open');
}
function renderKudosList(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const list = (state.kudos || [])
    .filter(k => (k.to === userKey || k.from === userKey) && (k.from === 'admin' || COLLABS[k.from]) && (k.to === 'admin' || COLLABS[k.to]))
    .slice(-10).reverse();
  const wrap = $('#kudosList');
  if(!list.length){
    wrap.innerHTML = '<span style="font-size:11px;color:var(--ink-faint);font-style:italic">Sem elogios ainda</span>';
    return;
  }
  wrap.innerHTML = list.map(k => {
    const fromName = k.from === 'admin' ? ADMIN_USER.name : (COLLABS[k.from]?.name || k.from);
    const toName = k.to === 'admin' ? ADMIN_USER.name : (COLLABS[k.to]?.name || k.to);
    const dt = new Date(k.when);
    const when = `${pad(dt.getDate())}/${pad(dt.getMonth()+1)}`;
    return `<div style="border:1px solid var(--muted);border-radius:8px;padding:10px;background:var(--bg)">
      <div style="font-size:11px;color:var(--ink-soft);margin-bottom:4px">⭐ <strong>${escapeHtml(fromName)}</strong> → <strong>${escapeHtml(toName)}</strong> · ${when}</div>
      <div style="font-size:13px;font-style:italic">${escapeHtml(k.text)}</div>
    </div>`;
  }).join('');
}
function sendKudos(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  if(!userKey) return;
  const to = $('#kudosTo').value;
  const text = $('#kudosText').value.trim();
  if(!text){ toast('Escreva uma mensagem'); return; }
  if(!state.kudos) state.kudos = [];
  state.kudos.push({ id: uid(), from: userKey, to, text, when: new Date().toISOString() });
  save('kudos');
  $('#kudosText').value = '';
  renderKudosList();
  toast('Elogio enviado!');
  const fromName = userKey === 'admin' ? ADMIN_USER.name : (COLLABS[userKey]?.name || userKey);
  triggerPush(to, `⭐ Elogio de ${fromName}`, text.slice(0, 120));
}

// ============ MESSAGES ============
let activeChatContact = null;

function openMessages(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  if(!userKey){ toast('Faça login'); return; }
  activeChatContact = null;
  renderMsgContacts();
  renderMsgChat();
  document.querySelector('.msg-layout').classList.remove('chat-open');
  $('#messagesModal').classList.add('open');
}

function renderMsgContacts(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const wrap = $('#msgContactsList');
  if(!wrap || !userKey) return;
  const contacts = [];
  Object.entries(COLLABS).forEach(([k, c]) => {
    if(k === 'todos' || k === userKey) return;
    contacts.push({ key: k, name: c.name, photo: c.photo, cssVar: c.cssVar });
  });
  if(userKey !== 'admin') contacts.push({ key: 'admin', name: ADMIN_USER.name, photo: ADMIN_USER.photo, cssVar: null });

  // calcular ultima msg e unread por contato
  const msgs = state.messages || [];
  contacts.forEach(c => {
    const thread = msgs.filter(m => (m.from === userKey && m.to === c.key) || (m.from === c.key && m.to === userKey));
    c.lastMsg = thread.length ? thread[thread.length - 1] : null;
    c.unread = thread.filter(m => m.to === userKey && m.read === false).length;
  });
  // ordenar: nao lidos primeiro, depois pelos com mais recentes
  contacts.sort((a, b) => {
    if(a.unread !== b.unread) return b.unread - a.unread;
    const aTime = a.lastMsg ? new Date(a.lastMsg.when).getTime() : 0;
    const bTime = b.lastMsg ? new Date(b.lastMsg.when).getTime() : 0;
    return bTime - aTime;
  });

  wrap.innerHTML = contacts.map(c => {
    const isActive = activeChatContact === c.key;
    const photo = c.photo ? `<img src="${c.photo}" alt="${c.name}">` : `<div class="msg-contact-avatar-fallback">${c.name.charAt(0)}</div>`;
    const preview = c.lastMsg ? escapeHtml(c.lastMsg.text.slice(0, 40)) : 'Nenhuma mensagem ainda';
    const time = c.lastMsg ? formatMsgTime(c.lastMsg.when) : '';
    const badge = c.unread > 0 ? `<span class="msg-unread-badge">${c.unread}</span>` : '';
    return `<div class="msg-contact${isActive?' active':''}" data-msg-contact="${c.key}">
      ${photo}
      <div class="msg-contact-info">
        <div class="msg-contact-name"><span>${c.name}</span><span class="msg-contact-time">${time}</span></div>
        <div class="msg-contact-preview">${preview}</div>
      </div>
      ${badge}
    </div>`;
  }).join('');

  wrap.querySelectorAll('.msg-contact').forEach(el => {
    el.addEventListener('click', () => {
      activeChatContact = el.dataset.msgContact;
      // marcar como lidas
      (state.messages||[]).forEach(m => {
        if(m.from === activeChatContact && m.to === userKey) m.read = true;
      });
      save('messages');
      renderMsgContacts();
      renderMsgChat();
      document.querySelector('.msg-layout').classList.add('chat-open');
      renderMessagesBadge();
    });
  });
}

function formatMsgTime(iso){
  const dt = new Date(iso);
  const today = new Date();
  const isToday = dt.toDateString() === today.toDateString();
  if(isToday) return `${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
  const yesterday = new Date(today); yesterday.setDate(today.getDate()-1);
  if(dt.toDateString() === yesterday.toDateString()) return 'ontem';
  return `${pad(dt.getDate())}/${pad(dt.getMonth()+1)}`;
}

function renderMsgChat(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const headerWrap = $('#msgChatHeaderInfo');
  const thread = $('#msgThread');
  const inputWrap = $('#msgInputWrap');
  const empty = $('#msgEmpty');
  if(!activeChatContact){
    headerWrap.innerHTML = '';
    thread.style.display = 'none';
    inputWrap.style.display = 'none';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';
  thread.style.display = 'flex';
  inputWrap.style.display = 'flex';

  const isAdmin = activeChatContact === 'admin';
  const c = isAdmin ? { name: ADMIN_USER.name, photo: ADMIN_USER.photo } : (COLLABS[activeChatContact] || { name: 'Desconhecido', photo: '' });
  const photo = c.photo ? `<img src="${c.photo}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid var(--ink)">` : `<div class="msg-contact-avatar-fallback" style="width:36px;height:36px">${(c.name||'?').charAt(0)}</div>`;
  headerWrap.innerHTML = `${photo}<strong style="font-size:14px">${c.name}</strong>`;

  const msgs = (state.messages || []).filter(m =>
    (m.from === userKey && m.to === activeChatContact) || (m.from === activeChatContact && m.to === userKey)
  );
  if(!msgs.length){
    thread.innerHTML = '<div style="text-align:center;color:var(--ink-faint);font-style:italic;font-family:Fraunces,serif;font-size:13px;padding:20px">Comece a conversa!</div>';
  } else {
    thread.innerHTML = msgs.map(m => {
      const isMe = m.from === userKey;
      return `<div class="msg-bubble ${isMe?'me':'other'}">${escapeHtml(m.text)}<span class="when">${formatMsgTime(m.when)}</span></div>`;
    }).join('');
    setTimeout(() => { thread.scrollTop = thread.scrollHeight; }, 0);
  }
}

function sendMessage(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  if(!userKey || !activeChatContact) return;
  const text = $('#msgInput').value.trim();
  if(!text) return;
  if(!state.messages) state.messages = [];
  state.messages.push({ id: uid(), from: userKey, to: activeChatContact, text, when: new Date().toISOString(), read: false });
  save('messages');
  $('#msgInput').value = '';
  renderMsgChat();
  renderMsgContacts();
  const fromName = userKey === 'admin' ? ADMIN_USER.name : (COLLABS[userKey]?.name || userKey);
  triggerPush(activeChatContact, `💬 ${fromName}`, text.slice(0, 120));
}
function renderMessagesBadge(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const badge = $('#messagesBadge');
  if(!badge || !userKey) return;
  const unread = (state.messages||[]).filter(m => m.to === userKey && m.read === false).length;
  if(unread > 0){
    badge.style.cssText = 'display:inline-block;background:var(--danger);color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:999px;margin-left:4px';
    badge.textContent = unread;
  } else {
    badge.style.display = 'none';
  }
}

function renderKudosBadge(){
  const userKey = state.viewerAs || (state.role === 'admin' ? 'admin' : null);
  const badge = $('#kudosBadge');
  if(!badge || !userKey) return;
  const lastSeen = parseInt(localStorage.getItem('kudosLastSeen_' + userKey) || '0', 10);
  const unread = (state.kudos||[]).filter(k => k.to === userKey && new Date(k.when).getTime() > lastSeen).length;
  if(unread > 0){
    badge.style.cssText = 'display:inline-block;background:var(--danger);color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:999px;margin-left:4px';
    badge.textContent = unread;
  } else {
    badge.style.display = 'none';
  }
}

// ============ EXPORT ============
function exportJSON(){
  const data = {
    events: state.events,
    statuses: state.statuses,
    birthdays: state.birthdays,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `calendario-${state.current.getFullYear()}-${pad(state.current.getMonth()+1)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Backup exportado');
}

function animateNav(dir){
  const wrap = document.querySelector('.calendar-wrap');
  if(wrap){ wrap.style.animation = 'none'; wrap.offsetHeight; wrap.style.animation = dir === 'prev' ? 'slideFromLeft .25s ease' : 'slideFromRight .25s ease'; }
  const title = $('#monthName');
  if(title){ title.style.animation = 'none'; title.offsetHeight; title.style.animation = 'titleIn .3s ease'; }
}

// ============ EVENT BINDING ============
function bindEvents(){
  // navegação
  $('#prevBtn').addEventListener('click', () => {
    if(state.view === 'month'){ state.current.setMonth(state.current.getMonth()-1); state.current.setDate(1); }
    else if(state.view === 'week'){ state.current.setDate(state.current.getDate()-7); }
    else { state.current.setDate(state.current.getDate()-1); }
    animateNav('prev');
    render();
  });
  $('#nextBtn').addEventListener('click', () => {
    if(state.view === 'month'){ state.current.setMonth(state.current.getMonth()+1); state.current.setDate(1); }
    else if(state.view === 'week'){ state.current.setDate(state.current.getDate()+7); }
    else { state.current.setDate(state.current.getDate()+1); }
    animateNav('next');
    render();
  });
  $('#todayBtn').addEventListener('click', () => {
    state.current = new Date();
    if(state.view === 'month') state.current.setDate(1);
    render();
  });

  // view toggle
  $$('.view-toggle button').forEach(b => {
    b.addEventListener('click', () => {
      state.view = b.dataset.view;
      $$('.view-toggle button').forEach(x => x.classList.toggle('active', x.dataset.view === state.view));
      render();
    });
  });

  // login/logout buttons
  $('#loginBtn').addEventListener('click', () => {
    const loggedIn = state.role === 'admin' || state.viewerAs;
    if(!loggedIn) openLogin();
  });
  $('#logoutBtn').addEventListener('click', () => {
    logHistory('Fez logout');
    auth.signOut();
    state.role = 'viewer';
    state.viewerAs = null;
    state.filterCollab = null;
    state.showOnlyMine = false;
    activeChatContact = null;
    $('#appContent').style.display = 'none';
    openLogin();
  });

  // templates
  $('#templateBtns').addEventListener('click', e => {
    const btn = e.target.closest('[data-tpl]'); if(!btn) return;
    const tpl = EVENT_TEMPLATES[btn.dataset.tpl]; if(!tpl) return;
    $('#eventTitle').value = tpl.title;
    $('#eventStart').value = tpl.start;
    $('#eventEnd').value = tpl.end;
    $('#eventLocation').value = tpl.location;
    $('#eventDesc').value = tpl.desc || '';
    $('#eventRecurring').value = tpl.recurring;
    $('#customRecurWrap').style.display = tpl.recurring === 'custom' ? 'block' : 'none';
    formSelectedType = tpl.type;
    updatePickerSelections();
  });

  // pickers
  $('#typePicker').addEventListener('click', e => {
    const btn = e.target.closest('.pick'); if(!btn) return;
    formSelectedType = btn.dataset.type;
    updatePickerSelections();
  });

  // recorrencia custom toggle
  $('#eventRecurring').addEventListener('change', () => {
    $('#customRecurWrap').style.display = $('#eventRecurring').value === 'custom' ? 'block' : 'none';
  });

  // save/cancel
  $('#saveBtn').addEventListener('click', saveEvent);
  $('#cancelBtn').addEventListener('click', closeModal);
  $('#closeViewerBtn').addEventListener('click', closeModal);

  // close modals on backdrop / esc (exceto login quando nao logado)
  $$('.modal-backdrop').forEach(m => {
    m.addEventListener('click', e => {
      if(e.target === m){
        if(m.id === 'loginModal' && $('#appContent').style.display === 'none') return;
        m.classList.remove('open');
      }
    });
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
      $$('.modal-backdrop.open').forEach(m => {
        if(m.id === 'loginModal' && $('#appContent').style.display === 'none') return;
        m.classList.remove('open');
      });
    }
  });

  // top icons
  $('#themeBtn').addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    save('theme');
    render();
  });
  $('#insightsBtn').addEventListener('click', openInsights);
  $('#historyBtn').addEventListener('click', openHistory);
  $('#statusBtn').addEventListener('click', openStatus);
  $('#settingsBtn').addEventListener('click', openSettings);
  $('#printBtn').addEventListener('click', () => window.print());
  $('#exportBtn').addEventListener('click', exportJSON);
  $('#requestsBtn').addEventListener('click', openRequestsModal);
  $('#requestMeetingBtn').addEventListener('click', () => openMeetingRequest());
  $('#myDayBtn').addEventListener('click', openMyDay);
  $('#messagesBtn').addEventListener('click', openMessages);
  $('#kudosBtn').addEventListener('click', openKudos);
  $('#diaryBtn').addEventListener('click', openDiary);
  $('#diaryDate').addEventListener('change', loadDiaryForDate);
  $('#diaryTodayBtn').addEventListener('click', () => { $('#diaryDate').value = todayKey; loadDiaryForDate(); });
  $('#diaryFullText').addEventListener('input', updateDiaryWordCount);
  $('#diaryFullSaveBtn').addEventListener('click', saveDiaryFull);
  $('#substituteConfirmBtn').addEventListener('click', confirmSubstitute);
  $('#substituteCancelBtn').addEventListener('click', closeSubstituteModal);
  $('#addPriorityBtn').addEventListener('click', addPriority);
  $('#newPriorityInput').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); addPriority(); } });
  $('#addBlockBtn').addEventListener('click', addBlock);
  $('#kudosSendBtn').addEventListener('click', sendKudos);
  $('#msgSendBtn').addEventListener('click', sendMessage);
  $('#msgInput').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); sendMessage(); } });
  $('#msgBackBtn').addEventListener('click', () => {
    activeChatContact = null;
    document.querySelector('.msg-layout').classList.remove('chat-open');
    renderMsgChat();
    renderMsgContacts();
  });
  $('#meetingSubmitBtn').addEventListener('click', submitMeetingRequest);
  $('#meetingCancelBtn').addEventListener('click', () => $('#meetingRequestModal').classList.remove('open'));
  $('#saveNoteBtn').addEventListener('click', savePersonalNote);
  $('#taskAssignAddBtn').addEventListener('click', addTaskAssign);
  $('#taskAssignInput').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); addTaskAssign(); } });
  $('#taskQuickPicker').addEventListener('click', e => {
    const btn = e.target.closest('.task-quick'); if(!btn) return;
    const collab = $('#taskCollabSelect').value;
    if(btn.dataset.quick === '__custom'){
      $('#taskAssignInput').focus();
      return;
    }
    formTasks.push({ id:uid(), collab, text: btn.dataset.quick, done: false });
    renderTaskList();
  });
  $('#deleteNoteBtn').addEventListener('click', deletePersonalNote);
  $('#noteIconPicker').addEventListener('click', e => {
    const btn = e.target.closest('.note-ico-btn'); if(!btn) return;
    $$('.note-ico-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
  $('#bannerWeatherWrap').addEventListener('click', openWeatherModal);

  // settings save
  $('#settingsSave').addEventListener('click', () => {
    // tema e festive todos podem ajustar (preferencias visuais pessoais ja persistem global, mas ok)
    state.theme = $('#settingsTheme').value;
    state.festive = $('#settingsFestive').checked;
    save('theme'); save('festive');
    // cores: so admin
    if(state.role === 'admin'){
      Object.keys(COLLABS).filter(k => k !== 'todos').forEach(k => {
        const input = document.getElementById('color-' + k);
        if(input && input.value){ state.customColors[k] = input.value; }
      });
      save('customColors');
    }
    $('#settingsModal').classList.remove('open');
    toast('Preferências salvas');
    render();
  });
  $('#settingsReset').addEventListener('click', () => {
    if(state.role !== 'admin'){ toast('Apenas a gestora pode resetar cores'); return; }
    state.customColors = {};
    ['--c-joao','--c-thayane','--c-lianda','--c-ravy'].forEach(v => document.documentElement.style.removeProperty(v));
    save('customColors');
    toast('Cores resetadas');
    openSettings();
    render();
  });

  // login
  $('#loginSubmit').addEventListener('click', tryLogin);
  $('#loginPwd').addEventListener('keydown', e => { if(e.key === 'Enter') tryLogin(); });
  $('#setupBtn').addEventListener('click', async () => {
    $('#setupBtn').textContent = 'Criando contas...';
    $('#setupBtn').disabled = true;
    await setupAccounts();
    $('#setupBtn').textContent = 'Configurar contas';
    $('#setupBtn').disabled = false;
  });

  // busca de eventos
  let searchTimeout;
  $('#searchInput').addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => renderSearch(e.target.value.trim()), 200);
  });

  // mostrar só meus
  $('#showOnlyMine').addEventListener('change', e => {
    state.showOnlyMine = e.target.checked;
    render();
  });

  // sidebar admin extra
  $('#clearFilterBtn').addEventListener('click', () => {
    if(state.role === 'admin'){
      state.filterCollab = null;
    }
    state.showOnlyMine = false;
    render();
  });
}

// ============ INIT ============
(async () => {
  bindEvents();

  auth.onAuthStateChanged(async function(user){
    if(user){
      const userInfo = authUserByEmail(user.email);
      if(userInfo){
        await loadAll();
        applyUserRole(userInfo);
        $('#loginModal').classList.remove('open');
        $('#appContent').style.display = '';
        startRealtimeSync();
        render();
        initUserLocation();
        setTimeout(() => {
          requestNotificationPermission();
          const userKey = userInfo.role === 'admin' ? 'admin' : userInfo.collabKey;
          registerOneSignalUser(userKey);
        }, 2000);
      } else {
        auth.signOut();
        openLogin();
      }
    } else {
      openLogin();
    }
  });
  setInterval(() => {
    if(state.view === 'week' || state.view === 'day') render();
  }, 60000);

  // relogio dinamico
  const clockEl = $('#clock');
  const CIRC = 2 * Math.PI * 12;
  let clockInited = false;
  function tickClock(){
    if(!clockEl) return;
    const now = new Date();
    const h = pad(now.getHours());
    const m = pad(now.getMinutes());
    const s = now.getSeconds();
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    const dateStr = dias[now.getDay()] + ' ' + pad(now.getDate()) + '/' + pad(now.getMonth()+1);
    const offset = CIRC - (s / 60) * CIRC;

    if(!clockInited){
      const popupEl = clockEl.querySelector('.clock-popup');
      const popup = popupEl ? popupEl.outerHTML : '';
      clockEl.innerHTML = `<span class="clock-date">${dateStr}</span><span class="clock-time">${h}</span><span class="clock-sep">:</span><span class="clock-time">${m}</span><div class="clock-ring"><svg viewBox="0 0 28 28"><circle class="ring-bg" cx="14" cy="14" r="12"/><circle class="ring-fg" cx="14" cy="14" r="12" stroke-dasharray="${CIRC}" stroke-dashoffset="${offset}"/></svg><span class="ring-text">${pad(s)}</span></div>${popup}`;
      clockInited = true;
    } else {
      const times = clockEl.querySelectorAll('.clock-time');
      if(times[0]) times[0].textContent = h;
      if(times[1]) times[1].textContent = m;
      const rt = clockEl.querySelector('.ring-text');
      if(rt) rt.textContent = pad(s);
      const rf = clockEl.querySelector('.ring-fg');
      if(rf) rf.style.strokeDashoffset = offset;
      const dt = clockEl.querySelector('.clock-date');
      if(dt) dt.textContent = dateStr;
    }

  }
  tickClock();
  setInterval(tickClock, 1000);


  // ============ OFFLINE SYNC ============
  window.addEventListener('online', () => { updateOnlineStatus(true); flushOfflineQueue(); });
  window.addEventListener('offline', () => { updateOnlineStatus(false); });
  updateOnlineStatus(navigator.onLine);
  if(navigator.onLine) flushOfflineQueue();

  // ============ MOBILE ============
  const isMobile = () => window.innerWidth <= 768;

  // sidebar drawer
  const menuBtn = $('#menuBtn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = $('#sidebarOverlay');
  function openDrawer(){ sidebar.classList.add('drawer-open'); overlay.classList.add('open'); }
  function closeDrawer(){ sidebar.classList.remove('drawer-open'); overlay.classList.remove('open'); }
  if(menuBtn) menuBtn.addEventListener('click', openDrawer);
  if(overlay) overlay.addEventListener('click', closeDrawer);

  // bottom nav
  $$('.bnav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.bnav;
      $$('.bnav-btn').forEach(b => b.classList.remove('active'));
      if(action === 'calendar'){
        btn.classList.add('active');
        closeDrawer();
      } else if(action === 'today'){
        state.current = new Date();
        if(state.view === 'month') state.current.setDate(1);
        render();
        closeDrawer();
      } else if(action === 'weather'){
        openWeatherModal();
      } else if(action === 'menu'){
        openDrawer();
      }
    });
  });

  // swipe to change month on mobile
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    if(!isMobile()) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, {passive:true});
  document.addEventListener('touchend', e => {
    if(!isMobile()) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if(Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;
    if(sidebar.classList.contains('drawer-open')) return;
    if(e.target.closest('.modal-backdrop.open')) return;
    if(state.view === 'month'){
      if(dx < 0){ state.current.setMonth(state.current.getMonth()+1); state.current.setDate(1); animateNav('next'); }
      else { state.current.setMonth(state.current.getMonth()-1); state.current.setDate(1); animateNav('prev'); }
      render();
    }
  }, {passive:true});
})();

// ============ SERVICE WORKER & PWA ============
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(function(){});
}
// inicializar OneSignal
try { initOneSignal(); } catch(e) {}
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstall = e;
  const banner = document.getElementById('installBanner');
  if(banner && window.innerWidth <= 768) banner.style.display = 'flex';
});
document.addEventListener('click', e => {
  if(e.target.id === 'installBtn' && deferredInstall){
    deferredInstall.prompt();
    deferredInstall.userChoice.then(() => { deferredInstall = null; document.getElementById('installBanner').style.display = 'none'; });
  }
  if(e.target.id === 'installDismiss'){
    document.getElementById('installBanner').style.display = 'none';
  }
});

})();