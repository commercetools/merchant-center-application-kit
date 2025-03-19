import { createRoot } from 'react-dom/client';
import EntryPoint from './components/entry-point';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<EntryPoint />);
