import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, AppTheme } from '../../../core/services/theme.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher-wrapper" (click)="$event.stopPropagation()">
      <!-- Toggle Button Trigger -->
      <button 
        class="btn-theme-trigger" 
        (click)="toggleDropdown()"
        [title]="'الثيم الحالي: ' + currentThemeDetails.nameAr">
        <span class="theme-icon">{{ currentThemeDetails.icon }}</span>
        <span class="theme-label">{{ currentThemeDetails.nameAr }}</span>
        <span class="theme-arrow" [class.open]="isDropdownOpen">▾</span>
      </button>

      <!-- Dropdown Palette Modal/Menu -->
      <div *ngIf="isDropdownOpen" class="theme-dropdown-palette" (click)="$event.stopPropagation()">
        <div class="palette-header">
          <span>اختر الطابع اللوني المفضل</span>
        </div>

        <div class="palette-options-list">
          <button 
            *ngFor="let opt of themeService.themeOptions" 
            class="palette-option-btn"
            [class.active]="themeService.currentTheme() === opt.id"
            (click)="selectTheme(opt.id)">
            
            <div class="option-preview-circle" [style.background]="opt.previewColor" [style.border-color]="opt.accentColor">
              <span class="mini-accent-dot" [style.background]="opt.accentColor"></span>
            </div>

            <div class="option-info">
              <strong>{{ opt.icon }} {{ opt.nameAr }}</strong>
              <small>{{ opt.desc }}</small>
            </div>

            <span *ngIf="themeService.currentTheme() === opt.id" class="check-mark">✓</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .theme-switcher-wrapper {
      position: relative;
      display: inline-block;
      direction: rtl;
      flex-shrink: 0;
    }

    .btn-theme-trigger {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(201, 169, 110, 0.3);
      color: #DFC698;
      padding: 0.42rem 0.85rem;
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      backdrop-filter: blur(10px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
      flex-shrink: 0;
      font-family: inherit;
    }

    .btn-theme-trigger:hover {
      background: rgba(201, 169, 110, 0.15);
      border-color: #C9A96E;
      color: #FFFFFF;
      transform: translateY(-1px);
    }

    .theme-icon {
      font-size: 0.95rem;
      flex-shrink: 0;
    }

    .theme-label {
      font-size: 0.78rem;
      font-family: inherit;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .theme-arrow {
      font-size: 0.7rem;
      transition: transform 0.2s;
      flex-shrink: 0;
    }

    .theme-arrow.open {
      transform: rotate(180deg);
    }

    /* Dropdown Palette */
    .theme-dropdown-palette {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      min-width: 260px;
      background: #0B1C15;
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      border-radius: var(--radius-lg);
      padding: 0.8rem;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(201, 169, 110, 0.15);
      z-index: 9999;
      animation: paletteFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(16px);
    }

    @keyframes paletteFade {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .palette-header {
      font-size: 0.72rem;
      color: #839E93;
      padding: 0.3rem 0.6rem 0.6rem 0.6rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.15);
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .palette-options-list {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .palette-option-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border-radius: var(--radius-md);
      background: transparent;
      border: 1px solid transparent;
      color: #C1D6CD;
      text-align: right;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
    }

    .palette-option-btn:hover {
      background: rgba(201, 169, 110, 0.1);
      border-color: rgba(201, 169, 110, 0.25);
      color: #FFFFFF;
    }

    .palette-option-btn.active {
      background: rgba(201, 169, 110, 0.18);
      border-color: #C9A96E;
      color: #FFFFFF;
    }

    .option-preview-circle {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 2px solid #C9A96E;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
    }

    .mini-accent-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .option-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .option-info strong {
      font-size: 0.84rem;
      color: #FFFFFF;
    }

    .option-info small {
      font-size: 0.7rem;
      color: #839E93;
      line-height: 1.3;
    }

    .check-mark {
      color: #25D366;
      font-weight: 900;
      font-size: 0.9rem;
    }
  `]
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);
  audio = inject(AudioService);

  isDropdownOpen = false;

  get currentThemeDetails() {
    return this.themeService.getThemeDetails(this.themeService.currentTheme());
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.audio.playClick();
  }

  selectTheme(theme: AppTheme): void {
    this.themeService.setTheme(theme);
    this.isDropdownOpen = false;
    this.audio.playSuccess();
  }
}
