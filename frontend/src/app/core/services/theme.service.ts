import { Injectable, signal } from '@angular/core';

export type AppTheme = 'emerald' | 'white-green' | 'emerald-night' | 'forest-bronze';

export interface ThemeOption {
  id: AppTheme;
  nameAr: string;
  icon: string;
  desc: string;
  previewColor: string;
  accentColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme = signal<AppTheme>('emerald');

  public readonly themeOptions: ThemeOption[] = [
    {
      id: 'emerald',
      nameAr: 'الهوية السيادية الأساسية 🇸🇦👑',
      icon: '👑',
      desc: 'الأخضر السعودي العميق (#0A2F24) مع ذهب الشمبانيا الدافئ (#C5A869) والعاجي',
      previewColor: '#0A2F24',
      accentColor: '#C5A869'
    },
    {
      id: 'white-green',
      nameAr: 'العاجي والأبيض النقي 🤍🌿',
      icon: '☀️',
      desc: 'عاجي دافئ مريح للقراءة مع نصوص الأسود المعماري ومساحات ناصعة',
      previewColor: '#FBF9F5',
      accentColor: '#0A2F24'
    },
    {
      id: 'emerald-night',
      nameAr: 'الزمرد الليلي الهادئ 🌙🌿',
      icon: '🌌',
      desc: 'أخضر زمردي داكن مع إضاءات خافتة تركيزية للمذاكرة والأبحاث الليلية',
      previewColor: '#051A14',
      accentColor: '#16A34A'
    },
    {
      id: 'forest-bronze',
      nameAr: 'العنبر والتراث المعماري 🏛️🍂',
      icon: '📜',
      desc: 'مستوحى من أصالة العمارة التراثية والدرعية مع لمسات برونز وعنبر',
      previewColor: '#0D3B2E',
      accentColor: '#C5A869'
    }
  ];

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window !== 'undefined') {
      const validThemes: AppTheme[] = ['emerald', 'white-green', 'emerald-night', 'forest-bronze'];
      const saved = localStorage.getItem('umm_reham_theme') as AppTheme;
      if (saved && validThemes.includes(saved)) {
        this.setTheme(saved, false);
      } else {
        this.setTheme('emerald', false);
      }
    }
  }

  public setTheme(theme: AppTheme, save = true): void {
    this.currentTheme.set(theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.className = `theme-${theme}`;
      if (save) {
        localStorage.setItem('umm_reham_theme', theme);
      }
    }
  }

  public cycleTheme(): AppTheme {
    const themes: AppTheme[] = ['emerald', 'white-green', 'emerald-night', 'forest-bronze'];
    const nextIdx = (themes.indexOf(this.currentTheme()) + 1) % themes.length;
    const nextTheme = themes[nextIdx];
    this.setTheme(nextTheme);
    return nextTheme;
  }

  public getThemeDetails(theme: AppTheme): ThemeOption {
    return this.themeOptions.find(t => t.id === theme) || this.themeOptions[0];
  }
}
