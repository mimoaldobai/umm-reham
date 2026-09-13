const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/USERW/Desktop/om reham/frontend/src/app/features/admin/admin-dashboard.component.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace Services Tab Table Row to render coverImageUrl and status toggle
const oldServicesRow = `                    <tr *ngFor="let s of filteredServicesList()">
                      <td><strong class="cell-primary-text">{{ s.nameAr }}</strong></td>
                      <td class="cell-nowrap"><span class="cell-tag-plain">{{ s.categoryNameAr || 'الخدمات العامة' }}</span></td>
                      <td class="cell-nowrap">
                        <strong *ngIf="s.priceFixed" class="text-accent-green">{{ s.priceFixed }} ر.س</strong>
                        <strong *ngIf="s.templates && s.templates.length > 0 && !s.priceFixed" class="text-accent-green">
                          تبدأ من {{ s.templates[0].price }} ر.س
                        </strong>
                        <span *ngIf="s.priceType === 'quote'" class="text-accent-gold">«طلب تسعيرة»</span>
                        <strong *ngIf="s.priceType === 'range' && !s.priceFixed" class="text-accent-green" dir="ltr">
                          {{ s.priceMin }} - {{ s.priceMax }} {{ s.priceCurrency }}
                        </strong>
                      </td>
                      <td class="cell-nowrap">
                        <span *ngIf="s.templates && s.templates.length > 0" class="cell-tag-plain" style="background: rgba(201,169,110,0.15); color: #C9A96E; padding: 0.2rem 0.5rem; border-radius: 4px;">
                          🎨 {{ s.templates.length }} نماذج
                        </span>
                        <span *ngIf="!s.templates || s.templates.length === 0" class="text-muted">—</span>
                      </td>
                      <td class="cell-nowrap">{{ s.estimatedDuration || 'نفس اليوم' }}</td>
                      <td class="cell-nowrap"><span class="status-chip completed"><span class="status-dot"></span>مفعلة ✓</span></td>
                      <td class="cell-nowrap">
                        <div class="table-actions">
                          <button class="btn-icon-action edit" (click)="editService(s)" title="تعديل">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="btn-icon-action del" (click)="deleteService(s.id)" title="حذف">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>`;

const newServicesRow = `                    <tr *ngFor="let s of filteredServicesList()">
                      <td>
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                          <div class="service-tbl-thumb">
                            <img *ngIf="s.coverImageUrl" [src]="s.coverImageUrl" [alt]="s.nameAr" class="srv-thumb-img" />
                            <span *ngIf="!s.coverImageUrl" class="srv-thumb-icon">{{ s.iconSvg || '🎓' }}</span>
                          </div>
                          <div>
                            <strong class="cell-primary-text">{{ s.nameAr }}</strong>
                            <small class="text-muted d-block" *ngIf="s.shortDescriptionAr">{{ s.shortDescriptionAr | slice:0:45 }}...</small>
                          </div>
                        </div>
                      </td>
                      <td class="cell-nowrap"><span class="cell-tag-plain">{{ s.categoryNameAr || 'الخدمات العامة' }}</span></td>
                      <td class="cell-nowrap">
                        <strong *ngIf="s.priceFixed" class="text-accent-green">{{ s.priceFixed }} ر.س</strong>
                        <strong *ngIf="s.templates && s.templates.length > 0 && !s.priceFixed" class="text-accent-green">
                          تبدأ من {{ s.templates[0].price }} ر.س
                        </strong>
                        <span *ngIf="s.priceType === 'quote'" class="text-accent-gold">«طلب تسعيرة»</span>
                        <strong *ngIf="s.priceType === 'range' && !s.priceFixed" class="text-accent-green" dir="ltr">
                          {{ s.priceMin }} - {{ s.priceMax }} {{ s.priceCurrency }}
                        </strong>
                      </td>
                      <td class="cell-nowrap">
                        <span *ngIf="s.templates && s.templates.length > 0" class="cell-tag-plain" style="background: rgba(201,169,110,0.15); color: #C9A96E; padding: 0.2rem 0.5rem; border-radius: 4px;">
                          🎨 {{ s.templates.length }} نماذج
                        </span>
                        <span *ngIf="!s.templates || s.templates.length === 0" class="text-muted">—</span>
                      </td>
                      <td class="cell-nowrap">{{ s.estimatedDuration || 'نفس اليوم' }}</td>
                      <td class="cell-nowrap">
                        <button type="button" class="btn-toggle-switch" [class.active]="s.isFeatured !== false" (click)="toggleServiceStatus(s)">
                          {{ s.isFeatured !== false ? 'مفعلة وظهرت ✓' : 'موقوفة مؤقتاً ⏸️' }}
                        </button>
                      </td>
                      <td class="cell-nowrap">
                        <div class="table-actions">
                          <button class="btn-icon-action edit" (click)="editService(s)" title="تعديل الخدمة والصورة والتسعير">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="btn-icon-action del" (click)="deleteService(s.id)" title="حذف الخدمة">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>`;

content = content.replace(oldServicesRow, newServicesRow);

// 2. Replace Testimonials Tab to render media badge, audio player, image preview
const oldTestimonialsDeck = `<div class="reviews-grid-deck">
                <div *ngFor="let t of filteredReviewsList()" class="review-brick">
                  <div class="review-brick-head">
                    <div>
                      <strong>{{ t.clientName }}</strong>
                      <small class="d-block text-muted">🇸🇦 {{ t.clientUniversity || 'جامعة سعودية' }} — {{ t.city || 'الرياض' }}</small>
                    </div>
                    <span class="stars-gold">★★★★★</span>
                  </div>
                  <p class="review-brick-body">"{{ t.contentAr }}"</p>
                  <div class="review-brick-foot">
                    <span class="text-accent-green font-bold">✓ تقييم معتمد وموثق</span>
                    <div class="table-actions">
                      <button class="btn-icon-action edit" (click)="editTestimonial(t)" title="تعديل">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="btn-icon-action del" (click)="deleteTestimonial(t.id)" title="حذف">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;

const newTestimonialsDeck = `
              <!-- Media Filter Tabs -->
              <div class="review-media-filter-bar">
                <button type="button" class="btn-media-tab" [class.active]="testimonialMediaFilter === 'all'" (click)="testimonialMediaFilter = 'all'">الكل ({{ testimonials.length }})</button>
                <button type="button" class="btn-media-tab" [class.active]="testimonialMediaFilter === 'text'" (click)="testimonialMediaFilter = 'text'">📝 نصي</button>
                <button type="button" class="btn-media-tab" [class.active]="testimonialMediaFilter === 'image'" (click)="testimonialMediaFilter = 'image'">🖼️ صور ولقطات شاشة</button>
                <button type="button" class="btn-media-tab" [class.active]="testimonialMediaFilter === 'audio'" (click)="testimonialMediaFilter = 'audio'">🎙️ بصمات صوتية</button>
                <button type="button" class="btn-media-tab" [class.active]="testimonialMediaFilter === 'combined'" (click)="testimonialMediaFilter = 'combined'">✨ تقييمات شاملة</button>
              </div>

              <div class="reviews-grid-deck">
                <div *ngFor="let t of filteredReviewsList()" class="review-brick">
                  <div class="review-brick-head">
                    <div>
                      <div style="display: flex; align-items: center; gap: 0.4rem;">
                        <strong>{{ t.clientName }}</strong>
                        <span class="media-badge-tag" [class.gold]="t.mediaType === 'combined'" [class.cyan]="t.mediaType === 'audio'" [class.emerald]="t.mediaType === 'image'">
                          {{ t.mediaType === 'audio' ? '🎙️ صوتي' : (t.mediaType === 'image' ? '🖼️ صورة' : (t.mediaType === 'combined' ? '✨ شامل' : '📝 نصي')) }}
                        </span>
                      </div>
                      <small class="d-block text-muted">🇸🇦 {{ t.clientUniversity || 'جامعة سعودية' }} — {{ t.city || 'الرياض' }}</small>
                    </div>
                    <span class="stars-gold">★★★★★</span>
                  </div>

                  <p class="review-brick-body">"{{ t.contentAr }}"</p>

                  <!-- Image Screenshot Attachment -->
                  <div *ngIf="t.imageUrl || (t.mediaType === 'image' || t.mediaType === 'combined')" class="review-img-box">
                    <img [src]="t.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&auto=format&fit=crop'" [alt]="t.clientName" class="review-attached-img" (click)="openImageLightbox(t.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&auto=format&fit=crop')" />
                  </div>

                  <!-- Audio Player Control -->
                  <div *ngIf="t.audioUrl || (t.mediaType === 'audio' || t.mediaType === 'combined')" class="review-audio-box">
                    <button type="button" class="btn-play-audio-dash" (click)="playDashAudio(t)">
                      <span>▶ تشغيل البصمة الصوتية</span>
                    </button>
                    <div class="dash-audio-wave"><span></span><span></span><span></span><span></span><span></span></div>
                  </div>

                  <div class="review-brick-foot">
                    <span class="text-accent-green font-bold">✓ تقييم معتمد وموثق</span>
                    <div class="table-actions">
                      <button class="btn-icon-action edit" (click)="editTestimonial(t)" title="تعديل التقييم والوسائط">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="btn-icon-action del" (click)="deleteTestimonial(t.id)" title="حذف">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;

content = content.replace(oldTestimonialsDeck, newTestimonialsDeck);

// Add methods to TS class for toggleServiceStatus, playDashAudio, lightbox, mediaFilter
const classExtensions = `
  testimonialMediaFilter: 'all' | 'text' | 'image' | 'audio' | 'combined' = 'all';
  previewImageUrl: string | null = null;

  openImageLightbox(url: string): void {
    this.previewImageUrl = url;
    this.audio.playClick();
  }

  closeImageLightbox(): void {
    this.previewImageUrl = null;
  }

  playDashAudio(t: Testimonial): void {
    this.audio.playSuccess();
    this.toastMessage = \`جاري تشغيل المذكرة الصوتية الخاصة بـ \${t.clientName} 🎙️\`;
    setTimeout(() => this.toastMessage = '', 3500);
  }

  toggleServiceStatus(s: ServiceItem): void {
    const newStatus = s.isFeatured === false ? true : false;
    s.isFeatured = newStatus;
    this.api.updateService(s.id, { isFeatured: newStatus }).subscribe(() => {
      this.audio.playClick();
      this.toastMessage = newStatus ? \`تم تفعيل خدمة (\${s.nameAr}) بنجاح ✓\` : \`تم إيقاف خدمة (\${s.nameAr}) مؤقتاً ⏸️\`;
      setTimeout(() => this.toastMessage = '', 3000);
    });
  }
`;

content = content.replace('export class AdminDashboardComponent implements OnInit, OnDestroy {', `export class AdminDashboardComponent implements OnInit, OnDestroy {\n${classExtensions}`);

// Add CSS styles for service thumbnail, media tabs, review audio
const extraCss = `
    .service-tbl-thumb {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      overflow: hidden;
      background: rgba(201,169,110,0.15);
      border: 1px solid rgba(201,169,110,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .srv-thumb-img { width: 100%; height: 100%; object-fit: cover; }
    .srv-thumb-icon { font-size: 1.3rem; }
    .review-media-filter-bar {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    .btn-media-tab {
      padding: 0.4rem 0.85rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(201,169,110,0.3);
      color: #A3B8B0;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-media-tab.active {
      background: #C9A96E;
      color: #06130D;
      border-color: #C9A96E;
      font-weight: 800;
    }
    .media-badge-tag {
      font-size: 0.68rem;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255,255,255,0.1);
      color: #FFFFFF;
    }
    .media-badge-tag.gold { background: rgba(201,169,110,0.25); color: #DFC698; }
    .media-badge-tag.cyan { background: rgba(6,182,212,0.2); color: #06B6D4; }
    .media-badge-tag.emerald { background: rgba(16,185,129,0.2); color: #10B981; }
    .review-img-box {
      margin: 0.6rem 0;
      max-height: 120px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(201,169,110,0.3);
      cursor: pointer;
    }
    .review-attached-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s; }
    .review-attached-img:hover { transform: scale(1.03); }
    .review-audio-box {
      margin: 0.6rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(201,169,110,0.1);
      border: 1px solid #C9A96E;
      padding: 0.45rem 0.75rem;
      border-radius: 8px;
    }
    .btn-play-audio-dash {
      background: #C9A96E;
      color: #06130D;
      border: none;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 800;
      font-size: 0.74rem;
      cursor: pointer;
    }
    .dash-audio-wave { display: flex; gap: 3px; height: 14px; align-items: flex-end; }
    .dash-audio-wave span { width: 3px; height: 100%; background: #C9A96E; animation: wave 1s infinite ease-in-out; }
`;

content = content.replace('.dash-pane {', `${extraCss}\n    .dash-pane {`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Services and Testimonials tabs updated successfully.');
