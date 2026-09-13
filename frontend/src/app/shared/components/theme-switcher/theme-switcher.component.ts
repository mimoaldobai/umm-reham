import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, AppTheme, ThemeOption } from '../../../core/services/theme.service';
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
        [title]="'الثيم النشط: ' + currentThemeDetails.nameAr">
        <div class="dual-tone-swatch" [title]="currentThemeDetails.primaryName + ' + ' + currentThemeDetails.accentName">
          <span class="swatch-color primary" [style.background-color]="currentThemeDetails.primaryColor"></span>
          <span class="swatch-color accent" [style.background-color]="currentThemeDetails.accentColor"></span>
        </div>
        <span class="theme-icon">{{ currentThemeDetails.icon }}</span>
        <span class="theme-label">{{ currentThemeDetails.nameAr.split(' ')[0] }} {{ currentThemeDetails.nameAr.split(' ')[1] }}</span>
        <span class="theme-arrow" [class.open]="isDropdownOpen">▾</span>
      </button>

      <!-- Dropdown Palette Modal/Menu -->
      <div *ngIf="isDropdownOpen" class="theme-dropdown-palette" (click)="$event.stopPropagation()">
        <div class="palette-header">
          <div class="palette-header-title">
            <span class="pulse-sparkle">✨</span>
            <strong>اختر الثيم الموحد للمنصة والداشبورد</strong>
          </div>
          <small class="palette-subtitle">ثيمات ثنائية متناغمة تعكس روح وفخامة الهوية الأكاديمية</small>
        </div>

        <div class="palette-options-list">
          <button 
            *ngFor="let opt of themeService.themeOptions" 
            class="palette-option-btn"
            [class.active]="themeService.currentTheme() === opt.id"
            (click)="selectTheme(opt.id)">
            
            <!-- Dual-Tone Circular Badge -->
            <div class="dual-tone-preview">
              <span class="preview-half primary" [style.background-color]="opt.primaryColor" [title]="opt.primaryName"></span>
              <span class="preview-half accent" [style.background-color]="opt.accentColor" [title]="opt.accentName"></span>
              <span class="preview-icon">{{ opt.icon }}</span>
            </div>

            <div class="option-info">
              <div class="option-title-row">
                <strong class="option-name">{{ opt.nameAr }}</strong>
              </div>
              <div class="option-colors-tag">
                <span class="color-dot-tag" [style.background-color]="opt.primaryColor"></span>
                <span>{{ opt.primaryName }}</span>
                <span class="plus-sep">+</span>
                <span class="color-dot-tag" [style.background-color]="opt.accentColor"></span>
                <span class="accent-name-text">{{ opt.accentName }}</span>
              </div>
              <small class="option-desc">{{ opt.desc }}</small>
            </div>

            <div class="active-indicator-col" *ngIf="themeService.currentTheme() === opt.id">
              <span class="check-pill">✓ مفعّل</span>
            </div>
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
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.92);
      border: 1.5px solid rgba(226, 232, 240, 0.9);
      color: #1E293B;
      padding: 0.42rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      backdrop-filter: blur(12px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
      flex-shrink: 0;
      font-family: inherit;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .btn-theme-trigger:hover {
      background: #FFFFFF;
      border-color: var(--theme-accent, #E5B94F);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    }

    .dual-tone-swatch {
      display: flex;
      align-items: center;
      width: 22px;
      height: 12px;
      border-radius: 9999px;
      overflow: hidden;
      box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    .dual-tone-swatch .swatch-color {
      width: 50%;
      height: 100%;
    }

    .theme-icon {
      font-size: 0.95rem;
      line-height: 1;
    }

    .theme-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: #0F172A;
    }

    .theme-arrow {
      font-size: 0.7rem;
      color: #64748B;
      transition: transform 0.2s ease;
    }

    .theme-arrow.open {
      transform: rotate(180deg);
    }

    /* Dropdown Palette */
    .theme-dropdown-palette {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      width: 330px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 18px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.04);
      padding: 0.85rem;
      z-index: 9999;
      animation: paletteFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes paletteFadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .palette-header {
      padding: 0.35rem 0.5rem 0.75rem 0.5rem;
      border-bottom: 1px solid #F1F5F9;
      margin-bottom: 0.5rem;
    }

    .palette-header-title {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.84rem;
      color: #0F172A;
    }

    .pulse-sparkle {
      font-size: 0.95rem;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }

    .palette-subtitle {
      display: block;
      font-size: 0.72rem;
      color: #64748B;
      margin-top: 0.2rem;
    }

    .palette-options-list {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      max-height: 380px;
      overflow-y: auto;
      padding-right: 0.2rem;
    }

    .palette-option-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border-radius: 12px;
      border: 1.5px solid transparent;
      background: #F8FAFC;
      cursor: pointer;
      text-align: right;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      width: 100%;
      font-family: inherit;
    }

    .palette-option-btn:hover {
      background: #F1F5F9;
      border-color: #CBD5E1;
      transform: translateX(-2px);
    }

    .palette-option-btn.active {
      background: #F8FAFC;
      border-color: var(--theme-accent, #E5B94F);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    /* Dual Tone Circular Preview */
    .dual-tone-preview {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      flex-shrink: 0;
      border: 2px solid #FFFFFF;
    }

    .preview-half {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
    }

    .preview-half.primary {
      right: 0;
    }

    .preview-half.accent {
      left: 0;
    }

    .preview-icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
    }

    .option-info {
      flex: 1;
      min-width: 0;
    }

    .option-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .option-name {
      font-size: 0.82rem;
      color: #0F172A;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .option-colors-tag {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.7rem;
      color: #475569;
      margin-top: 0.15rem;
      font-weight: 600;
    }

    .color-dot-tag {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    .plus-sep {
      color: #94A3B8;
      font-size: 0.75rem;
    }

    .accent-name-text {
      color: #0F172A;
      font-weight: 700;
    }

    .option-desc {
      display: block;
      font-size: 0.68rem;
      color: #64748B;
      margin-top: 0.2rem;
      line-height: 1.3;
      white-space: normal;
    }

    .active-indicator-col {
      flex-shrink: 0;
    }

    .check-pill {
      background: #ECFDF5;
      color: #047857;
      border: 1px solid #A7F3D0;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 0.2rem 0.45rem;
      border-radius: 9999px;
    }
  `]
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);
  private audio = inject(AudioService);

  isDropdownOpen = false;

  get currentThemeDetails(): ThemeOption {
    return this.themeService.getThemeDetails(this.themeService.currentTheme());
  }

  toggleDropdown(): void {
    this.audio.playClick();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectTheme(theme: AppTheme): void {
    this.audio.playSuccess();
    this.themeService.setTheme(theme);
    this.isDropdownOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.isDropdownOpen = false;
  }
}
