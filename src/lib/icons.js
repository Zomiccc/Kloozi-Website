// Zomic marketing — curated icon map.
// Only the icons referenced by name in lib/content.js are imported
// here, so the bundler tree-shakes lucide-react instead of pulling
// in every icon (saves ~600 kB).
import {
  Users, MessageCircle, Mail, UsersRound, Megaphone, Globe, Plug,
  Workflow, BarChart3, Flame, Sparkles, Home, TrendingUp, Building2,
  Rocket, BookOpen, LifeBuoy, ShieldCheck, Code2, Info, Briefcase,
  Newspaper, Circle,
} from 'lucide-react';

export const ICONS = {
  Users, MessageCircle, Mail, UsersRound, Megaphone, Globe, Plug,
  Workflow, BarChart3, Flame, Sparkles, Home, TrendingUp, Building2,
  Rocket, BookOpen, LifeBuoy, ShieldCheck, Code2, Info, Briefcase,
  Newspaper,
};

export const iconFor = (name) => ICONS[name] || Circle;
