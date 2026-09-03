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
      nameAr: 'الأخضر والذهب الشامباني 🇸🇦✨',
      icon: '👑',
      desc: 'أخضر سعودي ملكي فاخر مع لمسات ذهب شامباني راقية',
      previewColor: '#1B4332',
      accentColor: '#C9A96E'
    },
    {
      id: 'white-green',
      nameAr: 'الأخضر والأبيض النقي 🤍🌿',
      icon: '☀️',
      desc: 'أخضر ملكي صافٍ مع خلفيات وبطاقات بيضاء ناصعة ومريحة',
      previewColor: '#059669',
      accentColor: '#FFFFFF'
    },
    {
      id: 'emerald-night',
      nameAr: 'الأخضر والزمرد الليلي 🌙🌿',
      icon: '🌌',
      desc: 'أخضر زمردي داكن مع إضاءات وتفاصيل نعناعية متوهجة',
      previewColor: '#06180E',
      accentColor: '#10B981'
    },
    {
      id: 'forest-bronze',
      nameAr: 'الأخضر والبرونز الدافئ 🏛️🍂',
      icon: '📜',
      desc: 'أخضر غابات أكاديمي مع برونز وعنبر دافئ متناسق',
      previewColor: '#143829',
      accentColor: '#D97706'
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
