// Flazyn marketing — named icon map for data-driven menus (lib/site.js).
import {
  Users, MessageCircle, Mail, Workflow, BarChart3, Home, TrendingUp,
  Building2, Rocket, Info, BookOpen, ShieldCheck, Circle,
} from 'lucide-react';

const ICONS = { Users, MessageCircle, Mail, Workflow, BarChart3, Home, TrendingUp, Building2, Rocket, Info, BookOpen, ShieldCheck };

export const iconFor = (name) => ICONS[name] || Circle;

/* Each menu icon gets a consistent 3D chip colour. */
const HUES = {
  Users: '', MessageCircle: 'mint', Mail: 'coral', Workflow: 'orchid', BarChart3: 'sky',
  Home: 'coral', TrendingUp: 'mint', Building2: 'sky', Rocket: 'sun',
  Info: '', BookOpen: 'sun', ShieldCheck: 'mint',
};
export const hueFor = (name) => HUES[name] ?? '';
