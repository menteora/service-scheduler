# Service Scheduler (React + Vite + Tailwind)

Questo progetto è un componente di calendario per la pianificazione di servizi (Service Scheduler) basato su React. Implementa un sistema **Drag & Drop** per assegnare interventi a diversi operatori su una vista settimanale.

È stato progettato seguendo un'architettura modulare (Hexagonal/Adapter Pattern) per separare completamente la logica di visualizzazione (UI) dalla logica di recupero dati (API), rendendolo facilmente integrabile in qualsiasi backend.

## 📂 Struttura del Progetto

Il codice è organizzato per separare la libreria riutilizzabile (`lib`) dall'implementazione demo (`demo` e `App.tsx`).

```text
/
├── lib/                        # IL CORE DELLA LIBRERIA
│   ├── adapter.ts              # Interfaccia (Contratto) tra UI e Backend
│   ├── types.ts                # Definizioni TypeScript (Intervention, Operator, Config)
│   ├── constants.ts            # Configurazioni di default
│   ├── index.ts                # Punto di ingresso (Barrel file) per l'export della libreria
│   │
│   ├── components/             # Componenti UI
│   │   ├── OperatorScheduler.tsx # Wrapper principale (Layout responsive)
│   │   ├── Calendar/           # Logica della griglia calendario
│   │   │   ├── CalendarView.tsx      # UI "stupida" (Presentation Component)
│   │   │   └── CalendarContainer.tsx # Logica "intelligente" (Container Component)
│   │   ├── Sidebar/            # Lista laterale degli interventi non assegnati
│   │   └── CalendarInterventionItem.tsx # Il singolo "blocchetto" trascinabile
│   │
│   ├── context/                # State Management globale
│   │   └── SchedulerContext.tsx # Provider per dati, tema e azioni
│   │
│   ├── hooks/                  # Custom Hooks (Logica di business)
│   │   ├── useScheduler.ts     # Gestisce il ciclo di vita dei dati (fetch, move, save)
│   │   └── useTheme.ts         # Gestione Dark Mode (interna o esterna)
│   │
│   └── utils/                  # Funzioni di utilità pure (date, formattazione)
│
├── demo/                       # IMPLEMENTAZIONE DI ESEMPIO
│   ├── adapters/               # Implementazione concreta dell'adapter
│   │   └── fakeAdapter.ts      # Collega la UI alla Fake API
│   ├── api/
│   │   ├── fakeApi.ts          # Simula chiamate asincrone al server
│   │   └── fakeData.ts         # Dati statici di prova
│
├── App.tsx                     # Entry point dell'applicazione React
├── index.html                  # Include il Polyfill per il Drag&Drop Mobile
└── tailwind.config.js          # Configurazione stili e palette colori
```

---

## 🔑 Concetti Chiave

### 1. Adapter Pattern (Disaccoppiamento Dati)
Il componente non fa mai chiamate API dirette (es. `fetch` o `axios`) al suo interno. Invece, dipende da un'interfaccia definita in `lib/adapter.ts`.
Per usare questo calendario con un vero backend, non devi modificare i componenti, ma solo creare un nuovo file adapter:

```typescript
// Esempio: realAdapter.ts
const realAdapter: SchedulerAdapter = {
  fetchInterventions: async () => await axios.get('/api/interventions').then(r => r.data),
  saveSchedule: async (data) => await axios.post('/api/save', data),
  // ... implementa gli altri metodi
};
```

### 2. Responsività (Mobile Friendly)
Il layout cambia drasticamente tra mobile e desktop:
*   **Desktop**: Sidebar a sinistra (lista interventi), Calendario a destra.
*   **Mobile**: Calendario in alto, Sidebar in basso ("Dock"). Questo permette di trascinare gli interventi dal basso verso l'alto con il pollice.

### 3. Drag & Drop Mobile
HTML5 Drag & Drop API non supporta nativamente il touch. Nel file `index.html` è stato incluso un **Polyfill** (`mobile-drag-drop`) che traduce gli eventi touch in eventi drag standard, permettendo il funzionamento su iOS e Android senza cambiare il codice React.

### 4. Gestione Tema (Dark Mode)
Il componente supporta la Dark Mode ma è "agnostico":
*   Può ricevere lo stato `isDarkMode` dall'esterno (via props).
*   Se non controllato esternamente, gestisce il tema internamente.
*   Usa le classi `dark:` di Tailwind CSS.

---

## 🚀 Come Replicare o Estendere

### Prerequisiti
*   Node.js & NPM
*   React 18+ o 19
*   Tailwind CSS configurato

### Passaggi per l'integrazione
1.  **Copia la cartella `lib/`** nel tuo progetto.
2.  Assicurati che **Tailwind** sia configurato per scansionare quei file (`content` in `tailwind.config.js`).
3.  Implementa la tua interfaccia `SchedulerAdapter` collegandola al tuo DB.
4.  Importa il componente:

```tsx
import { OperatorScheduler } from './lib';
import { myRealAdapter } from './adapters/myRealAdapter';

function MyPage() {
  return (
    <div style={{ height: '100vh' }}>
      <OperatorScheduler adapter={myRealAdapter} />
    </div>
  );
}
```

## 🛠 Comandi Utili

*   `npm install`: Installa le dipendenze.
*   `npm run dev`: Avvia l'ambiente di sviluppo locale.
*   `npm run build`: Compila il progetto per la produzione.
