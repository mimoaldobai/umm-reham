import { Injectable, signal } from '@angular/core';

export type AppTheme = 
  | 'emerald' 
  | 'sapphire-cyan' 
  | 'amethyst-rose' 
  | 'mocha-amber' 
  | 'teal-coral' 
  | 'onyx-platinum'
  | 'white-green'
  | 'emerald-night'
  | 'forest-bronze';

export interface ThemeOption {
  id: AppTheme;
  nameAr: string;
  icon: string;
  desc: string;
  primaryColor: string;
  accentColor: string;
  primaryName: string;
  accentName: string;
  previewColor: string; // for UI circles
  primaryRgb: string;
  accentRgb: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme = signal<AppTheme>('emerald');

  public readonly themeOptions: ThemeOption[] = [
    {
      id: 'emerald',
      nameAr: 'الأخضر الملكي والذهب النبيل 🇸🇦👑',
      icon: '👑',
      desc: 'الأخضر السعودي العميق مع ذهب الشمبانيا الدافئ والعاجي الملكي',
      primaryColor: '#0A2F24',
      accentColor: '#E5B94F',
      primaryName: 'أخضر زمردي ملكي',
      accentName: 'ذهب شمبانيا فاخر',
      previewColor: '#0A2F24',
      primaryRgb: '10, 47, 36',
      accentRgb: '229, 185, 79'
    },
    {
      id: 'sapphire-cyan',
      nameAr: 'الياقوت الليلي والسماوي النيون 🌌💎',
      icon: '💎',
      desc: 'كحلي ياقوتي فخم للدراسات مع أزرق سماوي نيون متوهج',
      primaryColor: '#0B192C',
      accentColor: '#00F2FE',
      primaryName: 'كحلي ياقوتي عميق',
      accentName: 'سماوي كهربائي متلألئ',
      previewColor: '#0B192C',
      primaryRgb: '11, 25, 44',
      accentRgb: '0, 242, 254'
    },
    {
      id: 'amethyst-rose',
      nameAr: 'الجمشت الإمبراطوري والوردي الملكي 🍇✨',
      icon: '✨',
      desc: 'أرجواني ملكي هادئ مع لمسات وردي الشامبين الأنيق',
      primaryColor: '#1E1035',
      accentColor: '#F472B6',
      primaryName: 'جمشت ملكي فاخر',
      accentName: 'وردي شامبين متألق',
      previewColor: '#1E1035',
      primaryRgb: '30, 16, 53',
      accentRgb: '244, 114, 182'
    },
    {
      id: 'mocha-amber',
      nameAr: 'القهوة السعودية والعنبر الأصيل ☕🍂',
      icon: '☕',
      desc: 'مستوحى من أصالة الدرعية وبني القهوة العربية مع عنبر نجد الدافئ',
      primaryColor: '#211510',
      accentColor: '#F59E0B',
      primaryName: 'بني قهوة ملكية',
      accentName: 'عنبر ذهبي دافئ',
      previewColor: '#211510',
      primaryRgb: '33, 21, 16',
      accentRgb: '245, 158, 11'
    },
    {
      id: 'teal-coral',
      nameAr: 'بحر العرب والمرجان الفاخر 🌊🪸',
      icon: '🌊',
      desc: 'كحلي تيل بحري ساحر يعكس أمواج المملكة مع مرجان مشرق',
      primaryColor: '#04292E',
      accentColor: '#FB7185',
      primaryName: 'تيل بحري أطلسي',
      accentName: 'مرجان غروب أنيق',
      previewColor: '#04292E',
      primaryRgb: '4, 41, 46',
      accentRgb: '251, 113, 133'
    },
    {
      id: 'onyx-platinum',
      nameAr: 'الأونيكس الفحمي والبلاتين الفضي 🖤⚡',
      icon: '⚡',
      desc: 'أسود فحمي أونيكس فائق الفخامة مع تدرجات الفضة والبلاتينيوم',
      primaryColor: '#0F172A',
      accentColor: '#60A5FA',
      primaryName: 'أسود أونيكس تنفيذي',
      accentName: 'بلاتين وأزرق ثلجي',
      previewColor: '#0F172A',
      primaryRgb: '15, 23, 42',
      accentRgb: '96, 165, 250'
    }
  ];

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('umm_reham_theme') as AppTheme;
      // Map legacy theme keys if found
      if (saved === 'white-green') {
        this.setTheme('mocha-amber', false);
      } else if (saved === 'emerald-night') {
        this.setTheme('sapphire-cyan', false);
      } else if (saved === 'forest-bronze') {
        this.setTheme('mocha-amber', false);
      } else if (saved && this.themeOptions.some(t => t.id === saved)) {
        this.setTheme(saved, false);
      } else {
        this.setTheme('emerald', false);
      }
    }
  }

  public setTheme(theme: AppTheme, save = true): void {
    const details = this.getThemeDetails(theme);
    this.currentTheme.set(theme);

    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Attributes for global CSS rules
      root.setAttribute('data-theme', theme);
      document.body.className = `theme-${theme}`;

      // Dynamic CSS variables applied immediately to the entire app & dashboard
      root.style.setProperty('--theme-primary', details.primaryColor);
      root.style.setProperty('--theme-accent', details.accentColor);
      root.style.setProperty('--theme-primary-rgb', details.primaryRgb);
      root.style.setProperty('--theme-accent-rgb', details.accentRgb);
      root.style.setProperty('--theme-gradient', `linear-gradient(135deg, ${details.primaryColor} 0%, rgba(${details.primaryRgb}, 0.85) 100%)`);
      root.style.setProperty('--theme-accent-gradient', `linear-gradient(135deg, ${details.accentColor} 0%, rgba(${details.accentRgb}, 0.8) 100%)`);

      if (save) {
        localStorage.setItem('umm_reham_theme', theme);
      }
    }
  }

  public cycleTheme(): AppTheme {
    const nextIdx = (this.themeOptions.findIndex(t => t.id === this.currentTheme()) + 1) % this.themeOptions.length;
    const nextTheme = this.themeOptions[nextIdx].id;
    this.setTheme(nextTheme);
    return nextTheme;
  }

  public getThemeDetails(theme: AppTheme): ThemeOption {
    return this.themeOptions.find(t => t.id === theme) || this.themeOptions[0];
  }
}
