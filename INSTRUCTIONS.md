# React Scheduler Component - Guida all'Integrazione

Questa documentazione descrive come integrare il modulo "Scheduler" (`/lib`) all'interno di un'applicazione React esistente o nuova. Il componente è progettato per essere agnostico rispetto al backend e alla logica di business specifica.

## 1. Architettura

Il componente utilizza il pattern **Adapter (Hexagonal Architecture)**.
Il componente UI (`OperatorScheduler`) non effettua mai chiamate HTTP dirette. Comunica esclusivamente attraverso un'interfaccia TypeScript definita (`SchedulerAdapter`).

**Vantaggi:**
*   Puoi usarlo con REST, GraphQL, Firebase o LocalStorage semplicemente cambiando l'adapter.
*   Il componente è isolato dalla logica di autenticazione o gestione errori del backend.

## 2. Installazione e Dipendenze

### A. Copia dei file
Copia l'intera cartella `/lib` nel tuo progetto (es. `src/components/SchedulerLib` o `src/lib`).

### B. Dipendenze npm
Assicurati di avere le seguenti dipendenze installate nel `package.json`:

```bash
npm install lucide-react date-fns
# Assicurati di avere React 18+ e TailwindCSS configurato
```

### C. Configurazione Tailwind
Per far funzionare gli stili, aggiungi il percorso della cartella copiata al tuo `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./lib/**/*.{js,ts,jsx,tsx}" // <--- Aggiungi questa riga puntando alla cartella lib
  ],
  darkMode: 'class', // Necessario per il supporto Dark Mode
  // ...
}
```

### D. Supporto Mobile (Drag & Drop)
L'API HTML5 Drag & Drop non supporta il touch nativamente. Per il funzionamento su tablet e mobile, devi includere il polyfill nel tuo `index.html` (o importarlo nel main entry point):

```html
<!-- index.html -->
<script src="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/index.min.js"></script>
<script>
  var polyfill = MobileDragDrop.polyfill({
    dragImageCenterOnTouch: true
  });
  // Previene lo scroll della pagina mentre si trascina un elemento
  window.addEventListener('touchmove', function() {}, {passive: false});
</script>
```

## 3. Implementazione dell'Adapter

Devi creare un oggetto che soddisfi l'interfaccia `SchedulerAdapter`. La importi direttamente dalla libreria (`./lib`), non dai tipi interni.

```typescript
import { SchedulerAdapter, Intervention, Operator } from './lib';

export const myBackendAdapter: SchedulerAdapter = {
  // 1. Recupero configurazione (ore, giorni, slot)
  fetchConfig: async () => {
    return { startHour: 7, endHour: 19, daysIncluded: [1,2,3,4,5,6], slotDurationMinutes: 15 };
  },

  // 2. Recupero Risorse (Operatori, Stanze, Macchinari, ecc.)
  fetchOperators: async () => {
    const response = await fetch('/api/operators');
    return response.json();
  },

  // 3. Recupero Eventi/Interventi esistenti
  fetchInterventions: async () => {
    const response = await fetch('/api/schedule');
    return response.json();
  },

  // 4. Aggiornamento singolo (Drag & Drop)
  updateIntervention: async (intervention) => {
    // Chiamata API per salvare lo spostamento
    await fetch(`/api/schedule/${intervention.id}`, { method: 'PUT', body: JSON.stringify(intervention) });
    return intervention;
  },

  // 5. Salvataggio massivo (opzionale, se usi un pulsante "Salva")
  saveSchedule: async (interventions) => {
    await fetch('/api/schedule/save-batch', { method: 'POST', body: JSON.stringify(interventions) });
  }
};
```

## 4. Utilizzo del Componente

Importa il componente principale `OperatorScheduler` e passagli l'adapter.

```tsx
import React, { useState } from 'react';
import { OperatorScheduler } from './lib'; // Importa direttamente dalla cartella
import { myBackendAdapter } from './adapters/myBackendAdapter';

const MyPage = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Esterno (opzionale) */}
      <header>
        <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
      </header>

      {/* Scheduler */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <OperatorScheduler 
          adapter={myBackendAdapter} 
          isDarkMode={isDark} // Controllo tema esterno
        />
      </div>
    </div>
  );
};
```

## 5. Personalizzazione Dati (Types)

I tipi principali si trovano in `lib/types.ts`.
*   **Operator**: Chi esegue il lavoro (id, nome, colore).
*   **Intervention**: L'unità di lavoro (id, titolo, data, ora inizio, durata, ecc.).

Se il tuo backend restituisce campi diversi, dovrai mapparli all'interno del tuo `SchedulerAdapter` prima di restituirli al componente.

## 6. Come Funzionano gli Import

La cartella `lib` contiene un file `index.ts` (chiamato "Barrel File"). Questo file si occupa di esportare pubblicamente tutto ciò che ti serve.

Grazie a questo file, non devi importare dai percorsi interni (es. `lib/components/OperatorScheduler`), ma puoi importare tutto dalla radice della cartella:

**Corretto:**
```typescript
import { OperatorScheduler, SchedulerAdapter } from './lib';
```

**Sconsigliato (ma funzionante):**
```typescript
import { OperatorScheduler } from './lib/components/OperatorScheduler';
import { SchedulerAdapter } from './lib/adapter';
```

Se decidi di compilare la libreria con `npm run build` e usarla come pacchetto npm esterno, l'import diventerà:
```typescript
import { OperatorScheduler } from 'service-scheduler';
```
Questo è gestito automaticamente dal file `package.json` aggiunto al progetto.