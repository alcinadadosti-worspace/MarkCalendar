const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
admin.initializeApp();

const COLLABS = {
  joao:    { name:'João' },
  thayane: { name:'Thayane' },
  lianda:  { name:'Lianda' },
  ravy:    { name:'Ravy' },
  admin:   { name:'Suzana' }
};

async function getUserTokens(userKey) {
  const snap = await admin.firestore().collection('fcmTokens').doc(userKey).get();
  if (!snap.exists) return [];
  return snap.data().tokens || [];
}

async function sendToUser(userKey, title, body, data = {}) {
  const tokens = await getUserTokens(userKey);
  if (!tokens.length) return;

  const message = {
    notification: { title, body },
    data: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])),
    webpush: {
      notification: {
        icon: 'https://markcalendar.onrender.com/logo.png',
        badge: 'https://markcalendar.onrender.com/icon-192.svg',
        tag: data.tag || 'cal-notif',
        requireInteraction: false,
        vibrate: [200, 100, 200]
      },
      fcm_options: { link: 'https://markcalendar.onrender.com/' }
    }
  };

  const results = await Promise.allSettled(
    tokens.map(token => admin.messaging().send({ ...message, token }))
  );

  // remove tokens invalidos
  const invalid = [];
  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      const code = r.reason?.errorInfo?.code || r.reason?.code || '';
      if (code.includes('registration-token-not-registered') || code.includes('invalid-argument') || code.includes('invalid-registration-token')) {
        invalid.push(tokens[i]);
      }
    }
  });
  if (invalid.length) {
    await admin.firestore().collection('fcmTokens').doc(userKey).update({
      tokens: admin.firestore.FieldValue.arrayRemove(...invalid)
    });
  }
}

function parseStateValue(doc) {
  try {
    const raw = doc.data().value;
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

// trigger principal: qualquer mudanca em calendarData/*
exports.onCalendarChange = onDocumentWritten('calendarData/{docId}', async (event) => {
  const docId = event.params.docId;
  const before = event.data.before.exists ? parseStateValue(event.data.before) : null;
  const after = event.data.after.exists ? parseStateValue(event.data.after) : null;
  if (!after) return;

  try {
    if (docId === 'messages') {
      const oldIds = new Set((before || []).map(m => m.id));
      for (const m of after) {
        if (!oldIds.has(m.id) && m.to && m.from !== m.to) {
          const fromName = COLLABS[m.from]?.name || m.from;
          await sendToUser(m.to, `💬 ${fromName}`, m.text.slice(0, 120), { tag: 'msg-' + m.from });
        }
      }
    }

    else if (docId === 'kudos') {
      const oldIds = new Set((before || []).map(k => k.id));
      for (const k of after) {
        if (!oldIds.has(k.id) && k.to && k.from !== k.to) {
          const fromName = COLLABS[k.from]?.name || k.from;
          await sendToUser(k.to, `⭐ Elogio de ${fromName}`, k.text.slice(0, 120), { tag: 'kudos-' + k.id });
        }
      }
    }

    else if (docId === 'requests') {
      const oldIds = new Set((before || []).map(r => r.id));
      for (const r of after) {
        if (oldIds.has(r.id)) continue;
        const fromName = COLLABS[r.who]?.name || r.who;
        if (r.type === 'meeting' && r.responses) {
          for (const target of Object.keys(r.responses)) {
            await sendToUser(target, '📅 Convite de reunião', `${fromName} quer marcar em ${r.suggestedDate}`, { tag: 'meet-' + r.id });
          }
        } else if (r.type === 'substitute' && r.target) {
          await sendToUser(r.target, '🔄 Pedido de substituição', `${fromName} pediu para cobrir`, { tag: 'sub-' + r.id });
        } else if (r.type === 'date-change') {
          await sendToUser('admin', '🗓️ Nova solicitação', `${fromName} quer trocar data de "${r.eventId || 'evento'}"`, { tag: 'dc-' + r.id });
        }
      }
    }

    else if (docId === 'events') {
      const oldEvents = before || {};
      const newEvents = after;
      for (const [dk, evs] of Object.entries(newEvents)) {
        const oldEvs = oldEvents[dk] || [];
        for (const ev of evs) {
          const oldEv = oldEvs.find(o => o.id === ev.id);

          // evento novo - notificar todos os colaboradores envolvidos
          if (!oldEv && ev.tasks?.length) {
            const collabs = [...new Set(ev.tasks.map(t => t.collab))];
            for (const c of collabs) {
              if (c && c !== 'todos') {
                await sendToUser(c, '📋 Nova tarefa atribuída', `${ev.title} em ${dk}`, { tag: 'task-' + ev.id });
              }
            }
          }

          // @mentions em novos comentarios
          const oldComments = new Set((oldEv?.comments || []).map(c => c.id));
          for (const c of (ev.comments || [])) {
            if (oldComments.has(c.id)) continue;
            // detectar @mencoes
            const text = c.text || '';
            const matches = text.match(/@(\w+)/g) || [];
            for (const m of matches) {
              const tag = m.slice(1).toLowerCase();
              const target = Object.keys(COLLABS).find(k => k === tag || COLLABS[k].name.toLowerCase() === tag);
              if (target && target !== c.who) {
                const fromName = COLLABS[c.who]?.name || c.who;
                await sendToUser(target, `@ ${fromName} mencionou você`, text.slice(0, 120), { tag: 'mention-' + c.id });
              }
            }
          }

          // pedido de ajuda novo - notificar quem participa do evento
          const oldHelps = new Set((oldEv?.helpRequests || []).map(h => h.who + h.when));
          const newHelps = (ev.helpRequests || []).filter(h => !oldHelps.has(h.who + h.when));
          for (const h of newHelps) {
            const collabs = ev.tasks ? [...new Set(ev.tasks.map(t => t.collab))] : [];
            const fromName = COLLABS[h.who]?.name || h.who;
            for (const c of collabs) {
              if (c && c !== 'todos' && c !== h.who) {
                await sendToUser(c, `🆘 ${fromName} pediu ajuda`, ev.title, { tag: 'help-' + ev.id });
              }
            }
            await sendToUser('admin', `🆘 ${fromName} pediu ajuda`, ev.title, { tag: 'help-admin-' + ev.id });
          }

          // oferta de ajuda - notifica dono
          const oldOffers = new Set((oldEv?.helpOffers || []).map(o => o.who + o.when));
          const newOffers = (ev.helpOffers || []).filter(o => !oldOffers.has(o.who + o.when));
          for (const o of newOffers) {
            const fromName = COLLABS[o.who]?.name || o.who;
            const collabs = ev.tasks ? [...new Set(ev.tasks.map(t => t.collab))] : [ev.collab];
            for (const c of collabs) {
              if (c && c !== 'todos' && c !== o.who) {
                await sendToUser(c, `🤝 ${fromName} ofereceu ajuda`, ev.title, { tag: 'offer-' + ev.id });
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Error processing notification:', err);
  }
});
