import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../../core/services/audio.service';
import * as L from 'leaflet';

export interface AcademicLocation {
  id: string;
  nameAr: string;
  shortNameAr?: string;
  countryAr: string;
  flag: string;
  lat: number;
  lng: number;
  zoom: number;
  projectsCount: string;
  satisfactionRate: string;
  universities: string[];
  deliveryTime: string;
  category: 'saudi' | 'gulf' | 'arab' | 'international';
}

@Component({
  selector: 'app-saudi-map-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="real-global-map-card" dir="rtl">
      <!-- Top Luxury Header Bar -->
      <div class="map-top-bar">
        <div class="map-title-group">
          <div class="badge-live-pulse">
            <span class="pulse-ring"></span>
            <span class="pulse-dot"></span>
          </div>
          <div>
            <h3 class="map-main-title">
              خريطة التغطية الأكاديمية والبحثية المباشرة
              <span class="saudi-flag-crest">🇸🇦</span>
            </h3>
            <p class="map-sub-title">تغطية جغرافية معتمدة لكافة الجامعات والمناطق</p>
          </div>
        </div>

        <div class="map-controls-group">
          <!-- Layer Switcher -->
          <div class="layer-pills-box">
            <button 
              type="button"
              class="btn-layer-pill" 
              [class.active]="currentLayerType === 'streets'"
              (click)="switchTileLayer('streets')">
              🗺️ تضاريس وطرق
            </button>
            <button 
              type="button"
              class="btn-layer-pill" 
              [class.active]="currentLayerType === 'satellite'"
              (click)="switchTileLayer('satellite')">
              🛰️ أقمار صناعية
            </button>
            <button 
              type="button"
              class="btn-layer-pill" 
              [class.active]="currentLayerType === 'dark'"
              (click)="switchTileLayer('dark')">
              🌙 وضع ليلي
            </button>
          </div>

          <div class="cities-count-pill">
            <span class="count-num gold-gradient-text">+40</span>
            <span>مدينة ومحافظة مغطاة</span>
          </div>
        </div>
      </div>

      <!-- Live Search and Quick Jump -->
      <div class="map-filter-toolbar">
        <div class="search-box-wrap">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="onSearchInput()"
            placeholder="ابحث عن أي مدينة أو جامعة (مثل: الرياض، مكة، جدة، جامعة الملك سعود، الدمام)..."
            class="map-search-input" />
          <button *ngIf="searchQuery" class="clear-search-btn" (click)="clearSearch()">✕</button>
        </div>

        <!-- Search Results Dropdown -->
        <div *ngIf="searchResults.length > 0" class="search-dropdown-menu">
          <div 
            *ngFor="let res of searchResults" 
            class="search-result-item"
            (click)="selectLocation(res)">
            <span class="res-dot">📍</span>
            <div class="res-info">
              <strong>{{ res.nameAr }}</strong>
              <small>{{ res.countryAr }} — {{ res.universities.join(', ') }}</small>
            </div>
            <span class="res-badge">{{ res.projectsCount }} بحث</span>
          </div>
        </div>
      </div>

      <!-- Focused Regional Category Filter Pills -->
      <div class="regions-selector-strip">
        <div class="strip-buttons-scroll">
          <button 
            type="button"
            class="region-chip-btn" 
            [class.selected]="selectedCategory === 'saudi'"
            (click)="filterByCategory('saudi')">
            <span class="chip-status-dot saudi"></span>
            <span>المملكة العربية السعودية (كافة المناطق)</span>
          </button>
          <button 
            type="button"
            class="region-chip-btn" 
            [class.selected]="selectedCategory === 'gulf'"
            (click)="filterByCategory('gulf')">
            <span class="chip-status-dot gulf"></span>
            <span>دول الخليج العربي الشقيقة</span>
          </button>
          <button 
            type="button"
            class="region-chip-btn" 
            [class.selected]="selectedCategory === 'all'"
            (click)="filterByCategory('all')">
            <span class="chip-status-dot world"></span>
            <span>كافة مناطق التغطية</span>
          </button>
        </div>
      </div>

      <!-- Real Map Canvas Container -->
      <div class="real-map-stage" dir="ltr">
        <div #mapContainer class="leaflet-map-element" dir="ltr"></div>

        <!-- Floating Tactical Details Card (Positioned on Left in RTL so it never blocks Saudi Arabia!) -->
        <div *ngIf="selectedLocation" class="tactical-hud-panel" dir="rtl" (click)="$event.stopPropagation()">
          <button class="hud-close-btn" (click)="selectedLocation = null" title="إغلاق">✕</button>
          
          <div class="hud-header">
            <div class="hud-pin-icon">📍</div>
            <div>
              <span class="hud-region">{{ selectedLocation.countryAr }}</span>
              <h4 class="hud-city-name">{{ selectedLocation.nameAr }}</h4>
            </div>
          </div>

          <div class="hud-metrics-grid">
            <div class="metric-box">
              <span class="metric-label">أبحاث ومشاريع منجزة</span>
              <strong class="metric-value gold-text">{{ selectedLocation.projectsCount }}</strong>
            </div>
            <div class="metric-box">
              <span class="metric-label">نسبة رضا الباحثين</span>
              <strong class="metric-value green-text">{{ selectedLocation.satisfactionRate }}</strong>
            </div>
            <div class="metric-box">
              <span class="metric-label">مدة التسليم المعتمدة</span>
              <strong class="metric-value dark-text">{{ selectedLocation.deliveryTime }}</strong>
            </div>
            <div class="metric-box">
              <span class="metric-label">فحص Turnitin</span>
              <strong class="metric-value green-text">0% أصالة تامة</strong>
            </div>
            <div class="metric-box full-width">
              <span class="metric-label">أبرز الجامعات والأكاديميات المخدومة:</span>
              <span class="universities-tags">
                <span *ngFor="let u of selectedLocation.universities" class="u-tag">{{ u }}</span>
              </span>
            </div>
          </div>

          <button class="btn-hud-order" (click)="requestFromLocation(selectedLocation)">
            <span>طلب خدمة أكاديمية من {{ selectedLocation.nameAr }}</span>
            <span class="arrow-icon">←</span>
          </button>
        </div>

        <!-- Interactive Map Controls Overlay -->
        <div class="map-floating-actions">
          <button type="button" class="btn-map-action" (click)="resetView()" title="إعادة ضبط الرؤية للمملكة">
            🎯 المركز
          </button>
          <button type="button" class="btn-map-action" (click)="zoomIn()" title="تكبير">+</button>
          <button type="button" class="btn-map-action" (click)="zoomOut()" title="تصغير">−</button>
        </div>
      </div>

      <!-- Quick Interactive City Chips Bar -->
      <div class="bottom-cities-quick-bar">
        <div class="quick-title-group">
          <span class="quick-title">⚡ وصول سريع للمدن:</span>
          <button type="button" class="btn-reset-map-view" (click)="resetView()" title="إعادة تركيز الخريطة">
            🔄 ضبط الرؤية
          </button>
        </div>

        <div class="chips-flex">
          <button 
            *ngFor="let loc of topHubLocations" 
            class="city-quick-chip"
            [class.active]="selectedLocation?.id === loc.id"
            (click)="selectLocation(loc)">
            <span class="city-dot"></span>
            <span class="chip-city-name">{{ loc.shortNameAr || loc.nameAr }}</span>
            <small class="chip-count">{{ loc.projectsCount }}</small>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chip-status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin-left: 5px;
    }
    .chip-status-dot.saudi { background: #10B981; box-shadow: 0 0 6px #10B981; }
    .chip-status-dot.world { background: #38BDF8; }
    .chip-status-dot.gulf { background: #C9A96E; }
    .chip-status-dot.arab { background: #F59E0B; }
    .chip-status-dot.intl { background: #A78BFA; }

    .city-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      display: inline-block;
      margin-left: 4px;
    }
    .real-global-map-card {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      box-shadow: 0 15px 45px rgba(27, 67, 50, 0.08);
      display: flex;
      flex-direction: column;
      color: #0B2516;
      font-family: inherit;
    }

    .map-top-bar {
      padding: 1.1rem 1.6rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FFFFFF;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .map-title-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .hologram-title {
      font-size: 1.25rem;
      color: #0B2516;
      margin: 0;
      font-weight: 800;
    }

    .radar-live-badge {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.75rem;
      color: #059669;
      font-weight: 700;
    }

    .radar-blip {
      width: 8px;
      height: 8px;
      background: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10B981;
      animation: radarPulse 1.8s infinite;
    }

    @keyframes radarPulse {
      0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
      70% { transform: scale(1.3); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .top-bar-controls {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      flex-wrap: wrap;
    }

    .layer-pill-group {
      display: flex;
      background: #F8F5EE;
      padding: 3px;
      border-radius: 30px;
      border: 1px solid rgba(201, 169, 110, 0.35);
    }

    .btn-layer-pill {
      background: transparent;
      border: none;
      color: #52665C;
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-layer-pill.active {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(27, 67, 50, 0.3);
    }

    .cities-count-pill {
      background: rgba(201, 169, 110, 0.15);
      border: 1px solid rgba(201, 169, 110, 0.4);
      padding: 0.35rem 0.9rem;
      border-radius: 30px;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.78rem;
      font-weight: 700;
      color: #8C6F32;
    }

    .gold-gradient-text {
      background: linear-gradient(135deg, #C9A96E 0%, #96753C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
    }

    .green-text { color: #059669 !important; font-weight: 800; }
    .gold-text { color: #A48348 !important; font-weight: 800; }
    .dark-text { color: #0B2516 !important; font-weight: 800; }

    /* Map Search and Toolbar */
    .map-filter-toolbar {
      position: relative;
      padding: 0.75rem 1.6rem;
      background: #FAF8F5;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      z-index: 1000;
    }

    .search-box-wrap {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      right: 14px;
      color: #1B4332;
      font-size: 0.9rem;
      pointer-events: none;
    }

    .map-search-input {
      width: 100%;
      padding: 0.7rem 2.8rem 0.7rem 2.2rem;
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      border-radius: 12px;
      color: #0B2516;
      font-size: 0.85rem;
      font-family: inherit;
      transition: all 0.2s;
    }

    .map-search-input:focus {
      outline: none;
      border-color: #1B4332;
      box-shadow: 0 0 15px rgba(27, 67, 50, 0.15);
    }

    .clear-search-btn {
      position: absolute;
      left: 14px;
      background: transparent;
      border: none;
      color: #94A3B8;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .search-dropdown-menu {
      position: absolute;
      top: 100%;
      right: 1.6rem;
      left: 1.6rem;
      background: #FFFFFF;
      border: 1.5px solid #1B4332;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 15px 35px rgba(27, 67, 50, 0.15);
      max-height: 260px;
      overflow-y: auto;
      z-index: 2000;
    }

    .search-result-item {
      padding: 0.75rem 1.1rem;
      border-bottom: 1px solid #F1F5F9;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: background 0.15s;
    }

    .search-result-item:hover {
      background: #F8F5EE;
    }

    .res-flag { font-size: 1.3rem; }
    .res-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .res-info strong { font-size: 0.85rem; color: #0B2516; }
    .res-info small { font-size: 0.72rem; color: #64748B; }
    .res-badge { font-size: 0.7rem; color: #1B4332; font-weight: 700; background: rgba(201, 169, 110, 0.2); padding: 3px 8px; border-radius: 12px; }

    /* Regions Selector Strip */
    .regions-selector-strip {
      padding: 0.6rem 1.6rem;
      background: #FFFFFF;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      overflow-x: auto;
    }

    .strip-buttons-scroll {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      white-space: nowrap;
    }

    .region-chip-btn {
      padding: 0.4rem 0.95rem;
      border-radius: 20px;
      background: #F8F5EE;
      border: 1px solid rgba(201, 169, 110, 0.35);
      color: #1B4332;
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .region-chip-btn:hover {
      background: #EFE8DA;
      border-color: #C9A96E;
    }

    .region-chip-btn.selected {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border-color: #C9A96E;
      box-shadow: 0 4px 12px rgba(27, 67, 50, 0.2);
    }

    /* Map Stage (Enforce LTR for Leaflet coordinates calculation) */
    .real-map-stage {
      position: relative;
      height: 500px;
      width: 100%;
      background: #EAE6DE;
      overflow: hidden;
      direction: ltr !important;
      text-align: left !important;
    }

    .leaflet-map-element {
      width: 100%;
      height: 100%;
      direction: ltr !important;
      text-align: left !important;
    }

    /* Floating Action Buttons (Center, Zoom) */
    .map-floating-actions {
      position: absolute;
      top: 15px;
      left: 15px;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      z-index: 500;
    }

    .btn-map-action {
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.4);
      color: #1B4332;
      padding: 0.4rem 0.75rem;
      border-radius: 10px;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.2s;
    }

    .btn-map-action:hover {
      background: #1B4332;
      color: #FFFFFF;
      border-color: #1B4332;
      transform: scale(1.05);
    }

    /* Tactical HUD Panel - Placed on the LEFT in RTL so it NEVER blocks Saudi Arabia! */
    .tactical-hud-panel {
      position: absolute;
      bottom: 15px;
      left: 15px;
      width: 320px;
      max-width: calc(100% - 30px);
      background: rgba(255, 255, 255, 0.96);
      border: 1.5px solid #C9A96E;
      border-radius: 18px;
      padding: 1.2rem;
      box-shadow: 0 15px 40px rgba(27, 67, 50, 0.18), 0 0 20px rgba(201, 169, 110, 0.15);
      backdrop-filter: blur(12px);
      z-index: 600;
      animation: hudSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes hudSlideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .hud-close-btn {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #F1F5F9;
      border: none;
      color: #64748B;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      transition: all 0.2s;
    }

    .hud-close-btn:hover { background: #EF4444; color: #FFFFFF; }

    .hud-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.25);
      padding-bottom: 0.65rem;
      margin-bottom: 0.75rem;
    }

    .hud-flag { font-size: 1.6rem; }
    .hud-region { font-size: 0.72rem; color: #059669; font-weight: 700; }
    .hud-city-name { font-size: 1.15rem; color: #0B2516; margin: 2px 0 0 0; font-weight: 800; }

    .hud-metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      margin-bottom: 0.9rem;
    }

    .metric-box {
      background: #F8F5EE;
      border: 1px solid rgba(201, 169, 110, 0.2);
      border-radius: 8px;
      padding: 0.55rem 0.65rem;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .metric-box.full-width { grid-column: span 2; }
    .metric-label { font-size: 0.68rem; color: #52665C; font-weight: 600; }
    .metric-value { font-size: 0.88rem; font-weight: 800; }

    .universities-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-top: 0.35rem;
    }

    .u-tag {
      font-size: 0.66rem;
      background: rgba(5, 150, 105, 0.1);
      border: 1px solid rgba(5, 150, 105, 0.25);
      color: #059669;
      padding: 2px 7px;
      border-radius: 6px;
      font-weight: 700;
    }

    .btn-hud-order {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      border: 1px solid #C9A96E;
      border-radius: 10px;
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-hud-order:hover {
      background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(201, 169, 110, 0.35);
      color: #DFC698;
    }

    /* Bottom Quick Cities Bar */
    .bottom-cities-quick-bar {
      padding: 0.65rem 1.2rem;
      background: #FAF8F5;
      border-top: 1px solid rgba(201, 169, 110, 0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
    }

    .quick-title-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .quick-title {
      font-size: 0.76rem;
      color: #1B4332;
      font-weight: 800;
      white-space: nowrap;
    }

    .btn-reset-map-view {
      background: #FFFFFF;
      border: 1px solid rgba(201, 169, 110, 0.4);
      color: #1B4332;
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      transition: all 0.2s;
    }

    .btn-reset-map-view:hover {
      background: #1B4332;
      color: #FFFFFF;
      border-color: #1B4332;
    }

    .chips-flex {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding: 2px 0;
    }

    .city-quick-chip {
      background: #FFFFFF;
      border: 1px solid rgba(201, 169, 110, 0.35);
      padding: 0.3rem 0.65rem;
      border-radius: 9999px;
      color: #1B4332;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      white-space: nowrap;
      scroll-snap-align: start;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .city-quick-chip:hover {
      background: rgba(27, 67, 50, 0.06);
      border-color: #1B4332;
    }

    .city-quick-chip.active {
      background: #1B4332 !important;
      border-color: #C9A96E !important;
      color: #FFFFFF !important;
      box-shadow: 0 3px 10px rgba(27, 67, 50, 0.25);
    }

    .chip-city-name {
      white-space: nowrap;
    }

    .chip-count {
      background: rgba(201, 169, 110, 0.2);
      padding: 1px 5px;
      border-radius: 8px;
      font-size: 0.65rem;
      color: #8C6221;
      font-weight: 800;
    }

    .city-quick-chip.active .chip-count {
      background: rgba(255, 255, 255, 0.25);
      color: #FFFFFF;
    }

    @media (max-width: 768px) {
      .bottom-cities-quick-bar {
        padding: 0.5rem 0.8rem;
        flex-direction: column;
        align-items: stretch;
      }
      .quick-title-group {
        justify-content: space-between;
      }
      .chips-flex {
        width: 100%;
      }
    }
  `]
})
export class SaudiMapCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainerRef!: ElementRef<HTMLDivElement>;

  private audio = inject(AudioService);
  private platformId = inject(PLATFORM_ID);

  private map: L.Map | null = null;
  private currentTileLayer: L.TileLayer | null = null;
  private markersLayerGroup: L.LayerGroup | null = null;

  currentLayerType: 'dark' | 'satellite' | 'streets' = 'streets';
  searchQuery = '';
  searchResults: AcademicLocation[] = [];
  selectedCategory: 'all' | 'saudi' | 'gulf' | 'arab' | 'international' = 'saudi';
  selectedLocation: AcademicLocation | null = null;

  // Comprehensive Real Worldwide Academic Locations
  locations: AcademicLocation[] = [
    // 🇸🇦 Saudi Arabia
    {
      id: 'riyadh',
      nameAr: 'الرياض والمنطقة الوسطى',
      shortNameAr: 'الرياض',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 24.7136,
      lng: 46.6753,
      zoom: 10,
      projectsCount: '+14,800',
      satisfactionRate: '99.6%',
      universities: ['جامعة الملك سعود', 'جامعة الإمام محمد بن سعود', 'جامعة الأميرة نورة', 'جامعة الفيصل', 'الجامعة السعودية الإلكترونية'],
      deliveryTime: '24-48 ساعة',
      category: 'saudi'
    },
    {
      id: 'makkah',
      nameAr: 'مكة المكرمة',
      shortNameAr: 'مكة المكرمة',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 21.3891,
      lng: 39.8579,
      zoom: 11,
      projectsCount: '+6,200',
      satisfactionRate: '99.2%',
      universities: ['جامعة أم القرى', 'كلية الحرم المكي الشريف'],
      deliveryTime: '24-48 ساعة',
      category: 'saudi'
    },
    {
      id: 'jeddah',
      nameAr: 'جدة والغربية',
      shortNameAr: 'جدة',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 21.5433,
      lng: 39.1728,
      zoom: 11,
      projectsCount: '+9,500',
      satisfactionRate: '99.1%',
      universities: ['جامعة الملك عبدالعزيز', 'جامعة جدة', 'جامعة عفت', 'دار الحكمة'],
      deliveryTime: '24-48 ساعة',
      category: 'saudi'
    },
    {
      id: 'madinah',
      nameAr: 'المدينة المنورة',
      shortNameAr: 'المدينة المنورة',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 24.5247,
      lng: 39.5692,
      zoom: 11,
      projectsCount: '+3,800',
      satisfactionRate: '98.9%',
      universities: ['الجامعة الإسلامية بالمدينة', 'جامعة طيبة', 'جامعة الأمير مقرن'],
      deliveryTime: '2-3 أيام',
      category: 'saudi'
    },
    {
      id: 'dammam',
      nameAr: 'الدمام والخبر والشرقية',
      shortNameAr: 'الشرقية',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 26.4207,
      lng: 50.0888,
      zoom: 10,
      projectsCount: '+5,700',
      satisfactionRate: '99.4%',
      universities: ['الملك فهد للبترول والمعادن (KFUPM)', 'الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل'],
      deliveryTime: '24-48 ساعة',
      category: 'saudi'
    },
    {
      id: 'qassim',
      nameAr: 'القصيم وبريدة',
      shortNameAr: 'القصيم',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 26.3260,
      lng: 43.9750,
      zoom: 11,
      projectsCount: '+2,900',
      satisfactionRate: '98.7%',
      universities: ['جامعة القصيم', 'جامعة المستقبل', 'كليات القصيم الأهلية'],
      deliveryTime: '2-3 أيام',
      category: 'saudi'
    },
    {
      id: 'abha',
      nameAr: 'عسير وأبها وخميس مشيط',
      shortNameAr: 'عسير وأبها',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 18.2164,
      lng: 42.5053,
      zoom: 11,
      projectsCount: '+2,700',
      satisfactionRate: '98.8%',
      universities: ['جامعة الملك خالد', 'جامعة بيشة'],
      deliveryTime: '2-4 أيام',
      category: 'saudi'
    },
    {
      id: 'tabuk',
      nameAr: 'تبوك والشمال',
      shortNameAr: 'تبوك',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 28.3835,
      lng: 36.5662,
      zoom: 11,
      projectsCount: '+1,950',
      satisfactionRate: '98.5%',
      universities: ['جامعة تبوك', 'جامعة فهد بن سلطان'],
      deliveryTime: '2-4 أيام',
      category: 'saudi'
    },
    {
      id: 'taif',
      nameAr: 'الطائف',
      shortNameAr: 'الطائف',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 21.2854,
      lng: 40.4222,
      zoom: 11,
      projectsCount: '+2,400',
      satisfactionRate: '98.9%',
      universities: ['جامعة الطائف'],
      deliveryTime: '2-3 أيام',
      category: 'saudi'
    },
    {
      id: 'jizan',
      nameAr: 'جازان ونجران',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 16.8894,
      lng: 42.5706,
      zoom: 10,
      projectsCount: '+1,800',
      satisfactionRate: '98.4%',
      universities: ['جامعة جازان', 'جامعة نجران'],
      deliveryTime: '2-4 أيام',
      category: 'saudi'
    },
    {
      id: 'hail',
      nameAr: 'حائل والجوف والحدود الشمالية',
      countryAr: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      lat: 27.5114,
      lng: 41.7208,
      zoom: 9,
      projectsCount: '+1,600',
      satisfactionRate: '98.6%',
      universities: ['جامعة حائل', 'جامعة الجوف', 'جامعة الحدود الشمالية'],
      deliveryTime: '2-4 أيام',
      category: 'saudi'
    },

    // 🇦🇪 🇰🇼 🇶🇦 🇧🇭 🇴🇲 Gulf (GCC)
    {
      id: 'dubai',
      nameAr: 'دبي وأبوظبي',
      countryAr: 'الإمارات العربية المتحدة',
      flag: '🇦🇪',
      lat: 25.2048,
      lng: 55.2708,
      zoom: 10,
      projectsCount: '+3,400',
      satisfactionRate: '99.5%',
      universities: ['جامعة الإمارات', 'جامعة زايد', 'الجامعة الأمريكية في الشارقة', 'جامعة نيويورك أبوظبي'],
      deliveryTime: '24-48 ساعة',
      category: 'gulf'
    },
    {
      id: 'kuwait',
      nameAr: 'مدينة الكويت',
      countryAr: 'دولة الكويت',
      flag: '🇰🇼',
      lat: 29.3759,
      lng: 47.9774,
      zoom: 11,
      projectsCount: '+2,800',
      satisfactionRate: '99.2%',
      universities: ['جامعة الكويت', 'جامعة الخليج للعلوم والتكنولوجيا', 'الجامعة الأمريكية في الكويت'],
      deliveryTime: '24-48 ساعة',
      category: 'gulf'
    },
    {
      id: 'doha',
      nameAr: 'الدوحة',
      countryAr: 'دولة قطر',
      flag: '🇶🇦',
      lat: 25.2854,
      lng: 51.5310,
      zoom: 11,
      projectsCount: '+1,900',
      satisfactionRate: '99.3%',
      universities: ['جامعة قطر', 'جامعة حمد بن خليفة', 'مؤسسة قطر للتربية والعلوم'],
      deliveryTime: '24-48 ساعة',
      category: 'gulf'
    },
    {
      id: 'manama',
      nameAr: 'المنامة',
      countryAr: 'مملكة البحرين',
      flag: '🇧🇭',
      lat: 26.2285,
      lng: 50.5860,
      zoom: 12,
      projectsCount: '+1,450',
      satisfactionRate: '99.0%',
      universities: ['جامعة البحرين', 'جامعة الخليج العربي', 'الجامعة الأهلية'],
      deliveryTime: '24-48 ساعة',
      category: 'gulf'
    },
    {
      id: 'muscat',
      nameAr: 'مسقط',
      countryAr: 'سلطنة عمان',
      flag: '🇴🇲',
      lat: 23.5880,
      lng: 58.3829,
      zoom: 11,
      projectsCount: '+1,600',
      satisfactionRate: '98.8%',
      universities: ['جامعة السلطان قابوس', 'جامعة ظفار', 'جامعة نزوى'],
      deliveryTime: '2-3 أيام',
      category: 'gulf'
    },

    // 🇪🇬 🇯🇴 Arab Countries
    {
      id: 'cairo',
      nameAr: 'القاهرة والإسكندرية',
      countryAr: 'جمهورية مصر العربية',
      flag: '🇪🇬',
      lat: 30.0444,
      lng: 31.2357,
      zoom: 10,
      projectsCount: '+4,200',
      satisfactionRate: '99.1%',
      universities: ['جامعة القاهرة', 'جامعة عين شمس', 'الجامعة الأمريكية بالقاهرة', 'جامعة الإسكندرية'],
      deliveryTime: '24-48 ساعة',
      category: 'arab'
    },
    {
      id: 'amman',
      nameAr: 'عمان وإربد',
      countryAr: 'المملكة الأردنية الهاشمية',
      flag: '🇯🇴',
      lat: 31.9454,
      lng: 35.9284,
      zoom: 11,
      projectsCount: '+2,100',
      satisfactionRate: '98.9%',
      universities: ['الجامعة الأردنية', 'جامعة العلوم والتكنولوجيا الأردنية', 'جامعة اليرموك'],
      deliveryTime: '24-48 ساعة',
      category: 'arab'
    },

  ];

  displayedLocations: AcademicLocation[] = [];

  get topHubLocations(): AcademicLocation[] {
    return this.locations.filter(l => ['riyadh', 'makkah', 'jeddah', 'dammam', 'madinah', 'qassim', 'abha', 'tabuk', 'taif'].includes(l.id));
  }

  ngOnInit(): void {
    this.displayedLocations = this.locations.filter(l => l.category === 'saudi');
    // Keep selectedLocation null on load so the map is unobstructed
    this.selectedLocation = null;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initMap(), 150);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initMap(): void {
    if (!this.mapContainerRef) return;

    // Strict boundary locking map to the Kingdom of Saudi Arabia and Arabian Gulf
    this.map = L.map(this.mapContainerRef.nativeElement, {
      center: [24.2, 45.0],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
      minZoom: 5.4,
      maxZoom: 13,
      maxBounds: [
        [13.0, 32.5], // Southwest limit (Red Sea & Yemen)
        [33.5, 57.5]  // Northeast limit (Arabian Gulf & Iraq)
      ],
      maxBoundsViscosity: 1.0, // 100% impenetrable wall - user cannot pan outside!
      worldCopyJump: false
    });

    this.switchTileLayer('streets');
    this.renderMarkers();

    // Ensure Leaflet tile layer recalculates size properly and frames Saudi Arabia
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        this.map.fitBounds([
          [16.5, 36.5],
          [31.5, 51.5]
        ], { padding: [20, 20] });
      }
    }, 250);
  }

  switchTileLayer(type: 'dark' | 'satellite' | 'streets'): void {
    this.currentLayerType = type;
    this.audio.playClick();

    if (!this.map) return;

    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }

    let url = '';

    if (type === 'dark') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    } else if (type === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    } else {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    }

    this.currentTileLayer = L.tileLayer(url, {
      maxZoom: 19
    }).addTo(this.map);
  }

  private renderMarkers(): void {
    if (!this.map) return;

    if (this.markersLayerGroup) {
      this.markersLayerGroup.clearLayers();
    } else {
      this.markersLayerGroup = L.layerGroup().addTo(this.map);
    }

    const filtered = this.selectedCategory === 'all'
      ? this.locations
      : this.locations.filter(l => l.category === this.selectedCategory);

    filtered.forEach(loc => {
      // Elegant Saudi Royal Green & Champagne Gold pin with pinpoint jewel
      const iconHtml = `
        <div style="position:relative; width:26px; height:26px; cursor:pointer;">
          <div style="position:absolute; inset:0; border-radius:50%; background:rgba(27,67,50,0.3); box-shadow:0 0 10px rgba(201,169,110,0.7); animation:pinPulse 2s infinite;"></div>
          <div style="position:absolute; inset:2px; border-radius:50%; background:linear-gradient(135deg, #1B4332, #0B2516); border:2px solid #C9A96E; box-shadow:0 2px 6px rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center;">
            <div style="width:6px; height:6px; border-radius:50%; background:#DFC698;"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'academic-leaflet-pin',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon });

      marker.bindTooltip(`
        <div style="font-family: inherit; text-align: right; padding: 2px 4px;">
          <strong style="color: #1B4332; font-size: 12px;">${loc.nameAr}</strong><br>
          <small style="color: #A48348; font-weight: 700;">${loc.projectsCount} بحث منجز</small>
        </div>
      `, {
        direction: 'top',
        className: 'map-luxury-tooltip',
        offset: [0, -10]
      });

      marker.on('click', () => {
        this.selectLocation(loc);
      });

      marker.on('mouseover', () => {
        this.audio.playHover();
      });

      this.markersLayerGroup!.addLayer(marker);
    });
  }

  selectLocation(loc: AcademicLocation): void {
    this.selectedLocation = loc;
    this.audio.playClick();
    this.searchQuery = '';
    this.searchResults = [];

    if (this.map) {
      this.map.flyTo([loc.lat, loc.lng], loc.zoom, {
        animate: true,
        duration: 1.2
      });
    }
  }

  filterByCategory(cat: 'all' | 'saudi' | 'gulf' | 'arab' | 'international'): void {
    this.selectedCategory = cat;
    this.audio.playClick();
    this.selectedLocation = null;
    this.displayedLocations = cat === 'all'
      ? this.locations
      : this.locations.filter(l => l.category === cat);

    this.renderMarkers();

    if (!this.map) return;

    if (cat === 'saudi') {
      this.map.fitBounds([
        [16.5, 36.5],
        [31.5, 51.5]
      ], { padding: [20, 20] });
    } else if (cat === 'gulf') {
      this.map.flyTo([25.0, 51.5], 6.5, { animate: true, duration: 1.0 });
    } else {
      this.map.fitBounds([
        [15.5, 34.0],
        [32.5, 55.5]
      ], { padding: [20, 20] });
    }
  }

  onSearchInput(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.locations.filter(loc => 
      loc.nameAr.toLowerCase().includes(q) ||
      loc.countryAr.toLowerCase().includes(q) ||
      loc.universities.some(u => u.toLowerCase().includes(q))
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
  }

  resetView(): void {
    this.audio.playClick();
    this.selectedLocation = null;
    if (this.map) {
      this.map.fitBounds([
        [16.5, 36.5],
        [31.5, 51.5]
      ], { padding: [20, 20] });
    }
  }

  zoomIn(): void {
    this.audio.playClick();
    this.map?.zoomIn();
  }

  zoomOut(): void {
    this.audio.playClick();
    this.map?.zoomOut();
  }

  requestFromLocation(loc: AcademicLocation): void {
    this.audio.playClick();
    const text = encodeURIComponent(`السلام عليكم ورحمة الله وبركاته 🌿\nأرغب بطلب خدمة أكاديمية وبحثية معتمدة من منصة أم رهام لمنطقة (${loc.flag} ${loc.nameAr} — ${loc.countryAr}).`);
    window.open(`https://wa.me/966572651058?text=${text}`, '_blank');
  }
}
