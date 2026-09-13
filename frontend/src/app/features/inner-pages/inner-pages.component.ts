import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AudioService } from '../../core/services/audio.service';
import { ApiService, Testimonial, PortfolioItem, Article } from '../../core/services/api.service';

// ==========================================
// 1. PORTFOLIO / WORKS PAGE (معرض الأعمال السابقة المعتمدة)
// ==========================================
@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="inner-page-wrapper bg-ivory-warm" dir="rtl">
      <div class="container section-padding">
        
        <!-- Header -->
        <div class="section-badge-center">
          <span class="badge-gold">معرض الإنجازات والأعمال المعتمدة</span>
          <h1 class="page-title">نماذج من <span class="green-gradient-text">أعمالنا السابقة</span></h1>
          <p class="page-desc">نماذج محكمة من أبحاث ماجستير، مشاريع تخرج هندسية، عروض تقديمية 4K، وبرمجيات نفذناها بأعلى المعايير الأكاديمية مع إمكانية التحميل والمعاينة الفورية.</p>
        </div>

        <!-- Filter Pills -->
        <div class="portfolio-filter-row">
          <button 
            *ngFor="let cat of portfolioCategories"
            class="port-filter-btn"
            [class.active]="selectedPortCat === cat.id"
            (click)="setCategory(cat.id)">
            {{ cat.name }}
          </button>
        </div>

        <!-- Portfolio Showcase Grid -->
        <div class="portfolio-grid">
          <div 
            *ngFor="let item of filteredItems" 
            class="portfolio-card glass-panel-light"
            (mouseenter)="onHover()">
            
            <!-- Card Thumbnail Banner -->
            <div class="port-card-banner">
              <img [src]="getPortfolioCover(item)" [alt]="item.titleAr || item.title" class="port-banner-img" />
              <div class="port-banner-badge">
                <span class="p-type-tag">📄 نموذج أكاديمي معتمد</span>
                <button type="button" class="p-download-tag" (click)="downloadSample(item); $event.stopPropagation()">
                  📥 تنزيل النموذج
                </button>
              </div>
            </div>

            <div class="port-card-inner">
              <div class="port-top-row">
                <span class="port-category-tag">{{ item.categoryNameAr || item.category || 'أبحاث ودراسات' }}</span>
                <span class="port-verified-badge">✓ معتمد ومُناقش</span>
              </div>

              <h3 class="port-title" (click)="openSampleModal(item)" title="انقر لعرض التفاصيل والمعاينة">
                {{ item.titleAr || item.title }}
              </h3>
              <p class="port-desc">{{ item.descriptionAr || item.desc }}</p>

              <div class="port-specs-box">
                <div class="spec-chip">🏛️ {{ item.university || 'جامعة سعودية' }}</div>
                <div class="spec-chip">📄 {{ item.pages || 'توثيق كامل' }}</div>
                <div class="spec-chip green">🛡️ Turnitin: 0%</div>
              </div>

              <div class="port-footer">
                <div class="port-interactive-row">
                  <button type="button" class="btn-star-rate" (click)="rateItem(item)" title="تقييم هذا العمل">
                    <span>⭐ {{ item.rating || 5 }}</span>
                    <small class="rate-count">({{ item.ratingCount || 1 }})</small>
                  </button>
                  <button type="button" class="btn-like-heart" [class.liked]="isItemLiked(item.id || item.titleAr)" (click)="likeItem(item)" title="إعجاب بالعمل">
                    <span>{{ isItemLiked(item.id || item.titleAr) ? '❤️' : '🤍' }}</span>
                    <span class="likes-num">{{ item.likesCount || 0 }}</span>
                  </button>
                  <button type="button" class="btn-download-action" (click)="downloadSample(item)" title="تحميل نموذج العمل على جهازك">
                    <span>📥 تحميل</span>
                  </button>
                </div>
                <a 
                  [href]="getSampleWhatsAppLink(item.titleAr || item.title)" 
                  target="_blank" 
                  class="btn-port-action"
                  (click)="onClick()">
                  <span>طلب مماثل ←</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Sample Preview & Download Modal -->
      <div *ngIf="selectedSampleItem" class="port-modal-backdrop" (click)="closeSampleModal()">
        <div class="port-modal-box" (click)="$event.stopPropagation()">
          <div class="port-modal-header">
            <div>
              <span class="badge-gold">{{ selectedSampleItem.categoryNameAr || selectedSampleItem.category || 'عمل أكاديمي' }}</span>
              <h3>{{ selectedSampleItem.titleAr || selectedSampleItem.title }}</h3>
            </div>
            <button class="btn-close-modal" (click)="closeSampleModal()">✕</button>
          </div>
          <div class="port-modal-body">
            <p class="modal-desc">{{ selectedSampleItem.descriptionAr || selectedSampleItem.desc }}</p>
            <div class="modal-meta-grid">
              <div class="meta-item"><span>🏛️ الجامعة:</span> <strong>{{ selectedSampleItem.university }}</strong></div>
              <div class="meta-item"><span>📄 حجم العمل:</span> <strong>{{ selectedSampleItem.pages || 'توثيق متكامل' }}</strong></div>
              <div class="meta-item"><span>🛡️ فحص الاقتباس:</span> <strong class="text-green">Turnitin 0% معتمد</strong></div>
              <div class="meta-item"><span>⭐ تقييم العملاء:</span> <strong>{{ selectedSampleItem.rating || 5 }} / 5 ({{ selectedSampleItem.ratingCount || 1 }} تقييم)</strong></div>
            </div>
            
            <div class="download-box-panel">
              <h4>📥 الملفات والنماذج المتاحة للتحميل الفوري:</h4>
              <div class="file-download-row">
                <div class="file-info">
                  <span class="file-icon">📕</span>
                  <div>
                    <strong>ملخص وخطة العمل المعتمدة (PDF)</strong>
                    <small>حجم الملف: 1.8 MB • فحص أمني معتمد وخالٍ من الفيروسات</small>
                  </div>
                </div>
                <button type="button" class="btn-download-file" (click)="downloadSample(selectedSampleItem)">
                  <span>تحميل الملف الآن 📥</span>
                </button>
              </div>
            </div>
          </div>
          <div class="port-modal-footer">
            <a [href]="getSampleWhatsAppLink(selectedSampleItem.titleAr || selectedSampleItem.title)" target="_blank" class="btn-saudi-gold">
              <span>طلب مشروع مماثل عبر واتساب 💬</span>
            </a>
            <button type="button" class="btn-ghost-close" (click)="closeSampleModal()">إغلاق</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inner-page-wrapper { min-height: 100vh; padding-top: 6rem; background: #FAF8F5; }
    .section-badge-center { text-align: center; max-width: 820px; margin: 0 auto 3rem auto; }
    .page-title { font-size: clamp(2.2rem, 4.5vw, 3.4rem); color: #0B2516; margin: 0.8rem 0; font-weight: 900; }
    .page-desc { color: #52665C; font-size: 1.1rem; line-height: 1.8; }

    .portfolio-filter-row {
      display: flex;
      justify-content: center;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }

    .port-filter-btn {
      padding: 0.6rem 1.4rem;
      border-radius: var(--radius-full);
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      color: #1B4332;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.04);
      transition: all 0.2s;
    }

    .port-filter-btn:hover { color: #C9A96E; border-color: #C9A96E; }
    .port-filter-btn.active {
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      color: #FFFFFF;
      border-color: #C9A96E;
      box-shadow: 0 4px 15px rgba(27, 67, 50, 0.25);
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }

    .portfolio-card {
      border-radius: var(--radius-xl);
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      box-shadow: 0 8px 25px rgba(27, 67, 50, 0.06);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .portfolio-card:hover {
      transform: translateY(-8px);
      border-color: #C9A96E;
      box-shadow: 0 20px 50px rgba(27, 67, 50, 0.15);
    }

    .port-card-banner {
      position: relative;
      height: 180px;
      overflow: hidden;
      background: #0B2516;
    }
    .port-banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .portfolio-card:hover .port-banner-img {
      transform: scale(1.06);
    }
    .port-banner-badge {
      position: absolute;
      bottom: 10px;
      right: 12px;
      left: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .p-type-tag {
      background: rgba(11, 37, 22, 0.85);
      color: #DFC698;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      backdrop-filter: blur(6px);
    }
    .p-download-tag {
      background: var(--theme-accent, #C9A96E);
      color: #06130D;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 800;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: transform 0.2s;
    }
    .p-download-tag:hover {
      transform: scale(1.05);
    }
    .port-card-inner {
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .port-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.8rem;
    }

    .port-category-tag {
      font-size: 0.75rem;
      color: #1B4332;
      background: #F4EFE6;
      border: 1px solid rgba(201, 169, 110, 0.4);
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-weight: 700;
    }

    .port-verified-badge {
      font-size: 0.72rem;
      background: rgba(37, 211, 102, 0.15);
      color: #059669;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      font-weight: 800;
    }

    .port-title {
      font-size: 1.15rem;
      color: #0B2516;
      margin-bottom: 0.6rem;
      font-weight: 800;
      line-height: 1.4;
      cursor: pointer;
      transition: color 0.2s;
    }
    .port-title:hover {
      color: #C9A96E;
    }

    .port-desc {
      color: #52665C;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1.2rem;
      flex: 1;
    }

    .port-specs-box {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1.2rem;
    }

    .spec-chip {
      font-size: 0.75rem;
      background: #F8F5EE;
      border: 1px solid #E2ECE6;
      color: #2D4A3E;
      padding: 4px 10px;
      border-radius: var(--radius-md);
      font-weight: 600;
    }

    .spec-chip.green {
      background: rgba(5, 150, 105, 0.1);
      border-color: rgba(5, 150, 105, 0.3);
      color: #059669;
      font-weight: 800;
    }

    .port-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(201, 169, 110, 0.2);
      padding-top: 1rem;
      gap: 0.5rem;
    }

    .port-interactive-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .btn-star-rate, .btn-like-heart {
      background: #F8F5EE;
      border: 1px solid #E2ECE6;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.2s;
    }
    .btn-star-rate:hover { background: #FFF8E7; border-color: #D4AF37; }
    .btn-like-heart:hover { background: #FFEBEB; border-color: #E53E3E; }
    .btn-like-heart.liked { color: #E53E3E; }

    .btn-download-action {
      background: rgba(201, 169, 110, 0.15);
      border: 1px solid rgba(201, 169, 110, 0.4);
      color: #9B7E3E;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: background 0.2s;
    }
    .btn-download-action:hover {
      background: #C9A96E;
      color: #06130D;
    }

    .btn-port-action {
      font-size: 0.85rem;
      color: #1B4332;
      font-weight: 800;
      text-decoration: none;
      transition: color 0.2s;
      white-space: nowrap;
    }
    .btn-port-action:hover { color: #C9A96E; }

    /* Sample Modal */
    .port-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .port-modal-box {
      background: #FFFFFF;
      border-radius: 24px;
      max-width: 620px;
      width: 100%;
      box-shadow: 0 25px 60px rgba(0,0,0,0.3);
      border: 1.5px solid rgba(15, 81, 50, 0.15);
      overflow: hidden;
    }
    .port-modal-header {
      padding: 1.4rem 1.8rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: #FAF8F5;
    }
    .port-modal-header h3 {
      font-size: 1.25rem;
      color: #0A2F24;
      margin: 0.3rem 0 0 0;
      font-weight: 800;
    }
    .btn-close-modal {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: #888;
      cursor: pointer;
    }
    .port-modal-body { padding: 1.8rem; }
    .modal-desc {
      color: #485A53;
      font-size: 0.95rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
    .modal-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem;
      background: #FAF8F5;
      padding: 1rem;
      border-radius: 14px;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    .download-box-panel {
      border: 1.5px dashed #C9A96E;
      background: rgba(201, 169, 110, 0.08);
      padding: 1.2rem;
      border-radius: 16px;
    }
    .download-box-panel h4 {
      margin: 0 0 0.8rem 0;
      color: #0A2F24;
      font-size: 0.95rem;
    }
    .file-download-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .file-info { display: flex; align-items: center; gap: 0.8rem; }
    .file-icon { font-size: 1.8rem; }
    .btn-download-file {
      background: #0A2F24;
      color: #FFFFFF;
      border: none;
      padding: 0.65rem 1.2rem;
      border-radius: 20px;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.88rem;
      transition: background 0.2s;
    }
    .btn-download-file:hover { background: #C9A96E; color: #06130D; }
    .port-modal-footer {
      padding: 1.2rem 1.8rem;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      background: #FAF8F5;
    }
    .btn-ghost-close {
      background: none;
      border: 1px solid #CCC;
      padding: 0.6rem 1.2rem;
      border-radius: 20px;
      cursor: pointer;
      color: #555;
    }
  `]
})
export class PortfolioPageComponent implements OnInit {
  private api = inject(ApiService);
  private audio = inject(AudioService);

  selectedPortCat = 'all';
  selectedSampleItem: any = null;
  likedItems = new Set<string>();

  portfolioCategories = [
    { id: 'all', name: '✨ كافة الأعمال' },
    { id: 'research', name: '📚 بحوث ماجستير ودكتوراه' },
    { id: 'projects', name: '🎓 مشاريع تخرج وهندسة' },
    { id: 'spss', name: '📊 تحليل إحصائي SPSS' },
    { id: 'presentations', name: '🎨 عروض تقديمية 4K' }
  ];

  portfolioItems: any[] = [
    {
      id: 'port-1',
      catId: 'research',
      categoryNameAr: 'بحوث ودراسات عليا',
      titleAr: 'أثر تطبيق معايير الحوكمة والتحول الرقمي في كفاءة المستشفيات الحكومية السعودية',
      descriptionAr: 'دراسة ميدانية تطبيقية محكمة بمنهجية كمية متقدمة مع توثيق APA 7th وفحص Turnitin.',
      university: 'جامعة الملك سعود — الرياض',
      pages: '45 صفحة',
      rating: 5.0,
      ratingCount: 14,
      likesCount: 38
    },
    {
      id: 'port-2',
      catId: 'projects',
      categoryNameAr: 'مشاريع تخرج حاسب',
      titleAr: 'منصة ذكية لإدارة سلاسل الإمداد اللوجستية باستخدام تقنيات IoT و Machine Learning',
      descriptionAr: 'مشروع تخرج متكامل يشمل التوثيق البرمجي، مخططات UML، واجهات Angular، و APIs سحابية.',
      university: 'جامعة الملك فهد للبترول والمعادن',
      pages: '65 صفحة + سورس كود',
      rating: 5.0,
      ratingCount: 22,
      likesCount: 54
    },
    {
      id: 'port-3',
      catId: 'spss',
      categoryNameAr: 'تحليل إحصائي متقدم',
      titleAr: 'تحليل الفرضيات ومعاملات الارتباط واختبارات الانحدار لـ 450 استبانة بحثية',
      descriptionAr: 'معالجة إحصائية احترافية مع جداول ورسوم بيانية جاهزة ومناقشة النتائج وفق الدراسات السابقة.',
      university: 'جامعة الإمام محمد بن سعود',
      pages: '28 صفحة تحليلية',
      rating: 4.9,
      ratingCount: 18,
      likesCount: 41
    },
    {
      id: 'port-4',
      catId: 'presentations',
      categoryNameAr: 'عروض تقديمية أكاديمية',
      titleAr: 'حقيبة عرض سينمائي تفاعلي 4K لمناقشة أطروحة الدكتوراه في الإدارة القيادية',
      descriptionAr: 'تصميم فخم مدعم بأنيميشن مخصص، جداول تفاعلية، وموجز تنفيذي للمحكمين.',
      university: 'جامعة الملك عبدالعزيز — جدة',
      pages: '35 سلايد تفاعلي',
      rating: 5.0,
      ratingCount: 31,
      likesCount: 76
    },
    {
      id: 'port-5',
      catId: 'research',
      categoryNameAr: 'خطط أبحاث (Proposal)',
      titleAr: 'خطة بحث ماجستير متكاملة في أمن المعلومات والأمن السيبراني المصرفي',
      descriptionAr: 'صياغة مشكلة البحث، الفرضيات، الدراسات السابقة، والمنهجية العلمية المعتمدة.',
      university: 'جامعة الطائف',
      pages: '20 صفحة',
      rating: 5.0,
      ratingCount: 12,
      likesCount: 29
    },
    {
      id: 'port-6',
      catId: 'projects',
      categoryNameAr: 'تطوير وتطبيقات ويب',
      titleAr: 'تطبيق رعاية صحية ذكي لحجز المواعيد والاستشارات الطبية عن بعد',
      descriptionAr: 'تطبيق Full-Stack بتصميم عصري مع توثيق تقني ودليل تشغيل شامل.',
      university: 'جامعة أم القرى',
      pages: 'توثيق + كود متكامل',
      rating: 4.8,
      ratingCount: 16,
      likesCount: 35
    }
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    this.api.getPortfolioItems().subscribe(res => {
      if (res && res.length > 0) {
        // Merge or replace with dynamic backend items
        this.portfolioItems = res.map(item => ({
          ...item,
          catId: item.categoryId || 'research',
          categoryNameAr: item.categoryNameAr || 'عمل أكاديمي معتمد',
          pages: item.university ? 'ملف متكامل' : '40 صفحة'
        }));
      }
    });
  }

  getPortfolioCover(item: any): string {
    if (item.coverImageUrl) return item.coverImageUrl;
    const map: Record<string, string> = {
      'research': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop',
      'projects': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop',
      'spss': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
      'presentations': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop'
    };
    return map[item.catId] || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop';
  }

  openSampleModal(item: any): void {
    this.selectedSampleItem = item;
    this.audio.playClick();
  }

  closeSampleModal(): void {
    this.selectedSampleItem = null;
  }

  downloadSample(item: any): void {
    this.audio.playSuccess();
    const title = item.titleAr || item.title || 'نموذج_أكاديمي';
    const cleanName = title.replace(/\s+/g, '_').slice(0, 30);
    const fileName = 'نموذج_' + cleanName + '.pdf';
    
    // If an external fileUrl exists, open or trigger download
    if (item.fileUrl && item.fileUrl.startsWith('http')) {
      window.open(item.fileUrl, '_blank');
      return;
    }

    const content = 'منظومة أم رهام للأعمال والبحوث الأكاديمية\n\n' +
      'عنوان العمل الأكاديمي المعتمد:\n' + title + '\n\n' +
      'القسم والتصنيف: ' + (item.categoryNameAr || item.category || 'عام') + '\n' +
      'الجامعة: ' + (item.university || 'جامعة سعودية') + '\n' +
      'الحجم: ' + (item.pages || 'توثيق كامل') + '\n' +
      'الضمان: فحص نسبة الاقتباس Turnitin 0% معتمد\n\n' +
      'ملف توثيقي متاح لمعاينة جودة وإتقان العمل الأكاديمي لدى منصة أم رهام.';

    const blob = new Blob([content], { type: 'application/pdf;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    alert('📥 تم بدء تنزيل ملف النموذج: ' + fileName + ' على جهازك بنجاح!');
  }

  isItemLiked(key: string): boolean {
    return this.likedItems.has(key);
  }

  likeItem(item: any): void {
    const key = item.id || item.titleAr || item.title;
    if (this.likedItems.has(key)) {
      this.likedItems.delete(key);
      item.likesCount = Math.max(0, (item.likesCount || 1) - 1);
    } else {
      this.likedItems.add(key);
      item.likesCount = (item.likesCount || 0) + 1;
      this.audio.playSuccess();
      if (item.id && !item.id.startsWith('port-')) {
        this.api.likePortfolioItem(item.id).subscribe();
      }
    }
  }

  rateItem(item: any): void {
    item.ratingCount = (item.ratingCount || 1) + 1;
    item.rating = 5.0;
    this.audio.playClick();
    if (item.id && !item.id.startsWith('port-')) {
      this.api.ratePortfolioItem(item.id, 5).subscribe();
    }
    alert('⭐ شكراً لك! تم تسجيل تقييمك (5 نجوم) لهذا العمل الأكاديمي.');
  }

  get filteredItems() {
    if (this.selectedPortCat === 'all') return this.portfolioItems;
    return this.portfolioItems.filter(i => i.catId === this.selectedPortCat);
  }

  setCategory(id: string): void {
    this.selectedPortCat = id;
    this.audio.playClick();
  }

  onHover(): void {
    this.audio.playHover();
  }

  onClick(): void {
    this.audio.playClick();
  }

  getSampleWhatsAppLink(title: string): string {
    const text = encodeURIComponent('السلام عليكم أم رهام 🌟\nأرغب بالاستفسار وطلب مشروع أكاديمي مماثل لـ:\n"' + title + '"');
    return 'https://wa.me/?text=' + text;
  }
}

// ==========================================
// 2. TESTIMONIALS PAGE (جدار الثقة الأكاديمية والآراء)
// ==========================================
@Component({
  selector: 'app-testimonials-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="inner-page-wrapper bg-ivory-warm" dir="rtl">
      <div class="container section-padding">
        
        <!-- Header -->
        <div class="section-badge-center">
          <span class="badge-gold">جدار الثقة وتجارب الباحثين</span>
          <h1 class="page-title">ماذا يقول <span class="green-gradient-text">عملاؤنا</span> عنا؟</h1>
          <p class="page-desc">شهادات وتجارب حقيقية موثقة بالصوت والصورة والنص من باحثين وطلاب الدراسات العليا في كافة جامعات ومناطق المملكة.</p>
          <div style="margin-top: 1.5rem;">
            <button type="button" class="btn-saudi-gold" (click)="openAddReviewModal()">
              <span>✍️ شاركنا تجربتك ورأيك الأكاديمي واحصل على خصم 15%</span>
            </button>
          </div>
        </div>

        <!-- Featured Voice Testimonial Waveform Player -->
        <div class="featured-voice-bar glass-panel-light" (click)="togglePlayVoice()">
          <div class="fvb-left">
            <button class="fvb-play-btn">
              <span>{{ isPlayingVoice ? '⏸️' : '▶️' }}</span>
            </button>
            <div class="fvb-info">
              <strong>🎙️ استمع إلى تجربة صوتية مسجلة من باحث معتمد</strong>
              <small>د. فهد الدوسري — جامعة الملك سعود (مناقشة رسالة ماجستير بامتياز مع مرتبة الشرف)</small>
            </div>
          </div>
          <div class="fvb-waveform" [class.playing]="isPlayingVoice">
            <div class="vw-bar" style="height: 14px;"></div>
            <div class="vw-bar" style="height: 28px;"></div>
            <div class="vw-bar" style="height: 18px;"></div>
            <div class="vw-bar" style="height: 38px;"></div>
            <div class="vw-bar" style="height: 24px;"></div>
            <div class="vw-bar" style="height: 32px;"></div>
            <div class="vw-bar" style="height: 16px;"></div>
            <div class="vw-bar" style="height: 26px;"></div>
            <div class="vw-bar" style="height: 34px;"></div>
            <div class="vw-bar" style="height: 20px;"></div>
            <div class="vw-bar" style="height: 12px;"></div>
            <div class="vw-bar" style="height: 30px;"></div>
          </div>
          <div class="fvb-duration">01:18</div>
        </div>

        <!-- Masonry-style Testimonials Grid -->
        <div class="testimonials-masonry-grid">
          <div 
            *ngFor="let t of testimonialsList" 
            class="testimonial-luxury-card glass-panel-light"
            (mouseenter)="onHover()">
            
            <div class="tlc-header">
              <div class="tlc-avatar">
                <span *ngIf="!t.avatarUrl">{{ getAvatarIcon(t) }}</span>
                <img *ngIf="t.avatarUrl" [src]="t.avatarUrl" alt="" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />
              </div>
              <div class="tlc-client-meta">
                <div class="tlc-name-row">
                  <strong>{{ t.clientName }}</strong>
                  <span class="tlc-verified">✓ موثق</span>
                  <!-- Media Type Badge -->
                  <span class="tlc-media-badge" *ngIf="t.mediaType && t.mediaType !== 'text'">
                    {{ getMediaBadge(t.mediaType) }}
                  </span>
                </div>
                <small>{{ t.clientTitle || 'باحث أكاديمي' }} • {{ t.clientUniversity || 'جامعة سعودية' }}</small>
              </div>
              <div class="tlc-stars">{{ renderStars(t.rating || 5) }}</div>
            </div>

            <p class="tlc-content">"{{ t.contentAr }}"</p>

            <!-- Media Attachment Preview Player -->
            <div class="tlc-media-box" *ngIf="t.mediaType && t.mediaType !== 'text'">
              <div *ngIf="t.mediaType === 'audio'" class="media-audio-row">
                <button type="button" class="btn-listen-audio" (click)="togglePlayVoice()">
                  <span>🎙️ استمع للبصمة الصوتية للعميل (0:45 دقيقة)</span>
                </button>
              </div>
              <div *ngIf="t.mediaType === 'image'" class="media-image-row">
                <a [href]="t.mediaUrl || '#'" target="_blank" class="media-img-link">
                  <span>📸 معاينة صورة شهادة الإنجاز / التقييم الأكاديمي</span>
                </a>
              </div>
              <div *ngIf="t.mediaType === 'video'" class="media-video-row">
                <a [href]="t.mediaUrl || '#'" target="_blank" class="media-video-link">
                  <span>🎥 مشاهدة مقطع الفيديو التوثيقي للتجربة</span>
                </a>
              </div>
            </div>

            <div class="tlc-footer">
              <span class="tlc-date">📍 {{ t.city || 'الرياض' }}</span>
              <span class="tlc-shield">🛡️ تقييم معتمد 100%</span>
            </div>

          </div>
        </div>

        <!-- Public Review Reward Banner -->
        <div class="reward-review-box">
          <div class="rrb-content">
            <span class="rrb-badge">🎁 هدية التقدير الأكاديمي</span>
            <h2>هل سبق لك الاستفادة من خدمات أم رهام؟</h2>
            <p>شاركنا تقييمك ورأيك الشفاف (صوت، صورة، فيديو، أو نص) واحصل فوراً على كود خصم 15% على طلبك القادم.</p>
          </div>
          <button type="button" class="btn-saudi-gold" (click)="openAddReviewModal()">
            <span>✍️ أضف رأيك وتجربتك الأكاديمية الآن</span>
          </button>
        </div>

      </div>

      <!-- Public Add Testimonial Modal -->
      <div *ngIf="isAddReviewModalOpen" class="port-modal-backdrop" (click)="closeAddReviewModal()">
        <div class="port-modal-box" (click)="$event.stopPropagation()">
          <div class="port-modal-header">
            <div>
              <span class="badge-gold">✍️ مشاركة بصمة وتجربة أكاديمية</span>
              <h3>شاركنا رأيك في خدمات أم رهام</h3>
              <small style="color: #666;">رأيك يهمنا ويساعد زملاءك الباحثين، وستحصل فوراً على كوبون خصم 15% 🎁</small>
            </div>
            <button class="btn-close-modal" (click)="closeAddReviewModal()">✕</button>
          </div>

          <form (ngSubmit)="submitReview()" class="public-review-form">
            <div class="form-row">
              <label>الاسم الكامل للباحث / الطالب: *</label>
              <input type="text" [(ngModel)]="newReview.clientName" name="clientName" placeholder="مثال: د. عبدالعزيز السبيعي أو نورة الشمري" required class="form-control" />
            </div>

            <div class="form-row-2">
              <div class="form-row">
                <label>الجامعة: *</label>
                <input type="text" [(ngModel)]="newReview.clientUniversity" name="clientUniversity" placeholder="مثال: جامعة الملك سعود" required class="form-control" />
              </div>
              <div class="form-row">
                <label>المدينة: *</label>
                <input type="text" [(ngModel)]="newReview.city" name="city" placeholder="مثال: الرياض" required class="form-control" />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-row">
                <label>نوع التقييم والوسائط:</label>
                <select [(ngModel)]="newReview.mediaType" name="mediaType" class="form-control">
                  <option value="text">💬 تقييم نصي</option>
                  <option value="audio">🎙️ تسجيل صوتي (بصمة صوت)</option>
                  <option value="image">📸 صورة شهادة أو محادثة معتمدة</option>
                  <option value="video">🎥 مقطع فيديو توثيقي</option>
                </select>
              </div>
              <div class="form-row">
                <label>تقييم النجوم:</label>
                <select [(ngModel)]="newReview.rating" name="rating" class="form-control">
                  <option [value]="5">⭐⭐⭐⭐⭐ ممتاز (5 نجوم)</option>
                  <option [value]="4">⭐⭐⭐⭐ جيد جداً (4 نجوم)</option>
                  <option [value]="3">⭐⭐⭐ جيد (3 نجوم)</option>
                </select>
              </div>
            </div>

            <div class="form-row" *ngIf="newReview.mediaType !== 'text'">
              <label>رابط الوسائط (صوت / صورة / فيديو):</label>
              <input type="text" [(ngModel)]="newReview.mediaUrl" name="mediaUrl" placeholder="https://... رابط الملف أو التسجيل" class="form-control" />
            </div>

            <div class="form-row">
              <label>تفاصيل تجربتك الأكاديمية: *</label>
              <textarea [(ngModel)]="newReview.contentAr" name="contentAr" rows="4" placeholder="اكتب رأيك بدقة حول جودة العمل، السرعة، والالتزام الأكاديمي..." required class="form-control"></textarea>
            </div>

            <div class="port-modal-footer">
              <button type="submit" class="btn-saudi-gold" style="border:none; cursor:pointer;">
                <span>إرسال التقييم وتفعيل الكوبون ✓</span>
              </button>
              <button type="button" class="btn-ghost-close" (click)="closeAddReviewModal()">إلغاء</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .inner-page-wrapper { min-height: 100vh; padding-top: 6rem; background: #FAF8F5; }
    .section-badge-center { text-align: center; max-width: 820px; margin: 0 auto 3rem auto; }
    .page-title { font-size: clamp(2.2rem, 4.5vw, 3.4rem); color: #0A2F24; margin: 0.8rem 0; font-weight: 900; }
    .page-desc { color: #485A53; font-size: 1.1rem; line-height: 1.8; }

    .featured-voice-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 2rem;
      border-radius: var(--radius-xl);
      border: 1.5px solid #C5A869;
      background: linear-gradient(135deg, #0A2F24 0%, #06180E 100%);
      margin-bottom: 3.5rem;
      cursor: pointer;
      gap: 1.5rem;
      box-shadow: 0 12px 35px rgba(10, 47, 36, 0.25);
    }

    .fvb-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .fvb-play-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C5A869 0%, #9B7E3E 100%);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(197, 168, 105, 0.4);
      flex-shrink: 0;
    }

    .fvb-info strong {
      color: #FFFFFF;
      font-size: 1.05rem;
      display: block;
      margin-bottom: 0.2rem;
    }

    .fvb-info small {
      color: #A3B8B0;
      font-size: 0.85rem;
    }

    .fvb-waveform {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 40px;
    }

    .vw-bar {
      width: 4px;
      background: #C5A869;
      border-radius: 2px;
      opacity: 0.5;
    }

    .fvb-waveform.playing .vw-bar {
      opacity: 1;
      animation: eqBounce 1s infinite alternate ease-in-out;
    }

    .fvb-duration {
      font-size: 0.8rem;
      color: #A3B8B0;
      font-weight: 700;
    }

    .testimonials-masonry-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .testimonial-luxury-card {
      padding: 2.2rem;
      border-radius: 22px;
      background: #FFFFFF;
      border: 1.5px solid rgba(15, 81, 50, 0.12);
      box-shadow: 0 10px 30px rgba(10, 47, 36, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .testimonial-luxury-card:hover {
      transform: translateY(-8px);
      border-color: #C5A869;
      box-shadow: 0 20px 45px rgba(10, 47, 36, 0.1);
    }

    .tlc-header {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      margin-bottom: 1.2rem;
    }

    .tlc-avatar {
      font-size: 1.8rem;
      width: 48px;
      height: 48px;
      background: #FAF8F5;
      border: 1px solid rgba(15, 81, 50, 0.15);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .tlc-client-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .tlc-name-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tlc-name-row strong {
      font-size: 1.05rem;
      color: #0A2F24;
      font-weight: 800;
    }

    .tlc-verified {
      font-size: 0.7rem;
      background: rgba(37, 211, 102, 0.15);
      color: #059669;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      font-weight: 800;
    }

    .tlc-media-badge {
      font-size: 0.7rem;
      background: rgba(201, 169, 110, 0.18);
      color: #8C6F2D;
      padding: 2px 7px;
      border-radius: var(--radius-full);
      font-weight: 700;
    }

    .tlc-client-meta small {
      font-size: 0.8rem;
      color: #556B62;
    }

    .tlc-stars {
      color: #C5A869;
      font-size: 1.05rem;
      letter-spacing: 2px;
    }

    .tlc-content {
      color: #2D3748;
      font-size: 0.95rem;
      line-height: 1.8;
      margin-bottom: 1.2rem;
    }

    .tlc-media-box {
      margin-bottom: 1.2rem;
      background: #FAF8F5;
      border: 1px solid rgba(201, 169, 110, 0.3);
      padding: 0.6rem 1rem;
      border-radius: 12px;
      font-size: 0.82rem;
    }

    .btn-listen-audio {
      background: none;
      border: none;
      color: #0A2F24;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .media-img-link, .media-video-link {
      color: #059669;
      font-weight: 700;
      text-decoration: none;
    }

    .tlc-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(15, 81, 50, 0.08);
      padding-top: 1rem;
      font-size: 0.82rem;
    }

    .tlc-date { color: #9B7E3E; font-weight: 700; }
    .tlc-shield { color: #059669; font-weight: 800; }

    /* Reward Box */
    .reward-review-box {
      padding: 3rem;
      border-radius: 24px;
      border: 1.5px solid #C5A869;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #0A2F24 0%, #06180E 100%);
      gap: 2rem;
      box-shadow: 0 15px 40px rgba(10, 47, 36, 0.25);
    }

    .rrb-badge {
      font-size: 0.8rem;
      color: #DFC698;
      font-weight: 800;
      display: block;
      margin-bottom: 0.4rem;
    }

    .rrb-content h2 {
      font-size: 1.8rem;
      color: #FFFFFF;
      margin-bottom: 0.4rem;
    }

    .rrb-content p {
      color: #B8CCC4;
      font-size: 0.98rem;
    }

    .btn-saudi-gold {
      background: linear-gradient(135deg, #C9A96E 0%, #A48348 100%);
      color: #06130D;
      padding: 0.9rem 1.8rem;
      border-radius: var(--radius-full);
      font-weight: 800;
      font-size: 0.95rem;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.4);
      white-space: nowrap;
      cursor: pointer;
      display: inline-block;
    }

    /* Modal Form */
    .public-review-form {
      padding: 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-row { display: flex; flex-direction: column; gap: 0.35rem; }
    .form-row label { font-size: 0.85rem; font-weight: 700; color: #0A2F24; }
    .form-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.7rem 0.9rem;
      border: 1px solid #D1D5DB;
      border-radius: 10px;
      font-size: 0.9rem;
      font-family: inherit;
      box-sizing: border-box;
    }
    .form-control:focus {
      outline: none;
      border-color: #0A2F24;
      box-shadow: 0 0 0 3px rgba(10, 47, 36, 0.1);
    }

    @media (max-width: 768px) {
      .featured-voice-bar { flex-direction: column; text-align: center; }
      .fvb-waveform { display: none; }
      .reward-review-box { flex-direction: column; text-align: center; }
      .btn-saudi-gold { width: 100%; text-align: center; }
      .form-row-2 { grid-template-columns: 1fr; }
    }
  `]
})
export class TestimonialsPageComponent implements OnInit {
  private api = inject(ApiService);
  private audio = inject(AudioService);

  testimonialsList: Testimonial[] = [];
  isPlayingVoice = false;
  isAddReviewModalOpen = false;

  newReview = {
    clientName: '',
    clientUniversity: '',
    city: 'الرياض',
    rating: 5,
    mediaType: 'text' as 'text' | 'audio' | 'image' | 'video',
    mediaUrl: '',
    contentAr: ''
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    this.api.getTestimonials().subscribe(res => {
      if (res && res.length > 0) {
        this.testimonialsList = res;
      } else {
        this.testimonialsList = [
          {
            id: '1',
            clientName: 'أحمد العتيبي',
            clientTitle: 'باحث ماجستير',
            city: 'الطائف',
            clientUniversity: 'جامعة الطائف',
            contentAr: 'بفضل الله ثم بفضل أم رهام حصلت على دعم استثنائي في إعداد رسالتي، والتزامهم بالمعايير الأكاديمية ونسبة Turnitin الصفرية كان فوق توقعاتي.',
            rating: 5,
            mediaType: 'audio'
          },
          {
            id: '2',
            clientName: 'سارة القحطاني',
            clientTitle: 'طالبة دكتوراه',
            city: 'الرياض',
            clientUniversity: 'جامعة الملك سعود',
            contentAr: 'سرعة ودقة فائقة في التحليل الإحصائي عبر SPSS والمراجعة المنهجية. تعاملت مع جهات كثيرة لكن احترافية وأمانة أم رهام لا تُضاهى.',
            rating: 5,
            mediaType: 'image'
          },
          {
            id: '3',
            clientName: 'عبدالرحمن الشهري',
            clientTitle: 'هندسة وبرمجيات',
            city: 'جدة',
            clientUniversity: 'جامعة الملك عبدالعزيز',
            contentAr: 'مشروع التخرج كان معقداً جداً، لكن الفريق أخرجه بأعلى جودة وقدم لي شرحاً مفصلاً لجميع جوانب النظام مما مكّنني من اجتياز المناقشة بامتياز.',
            rating: 5,
            mediaType: 'video'
          }
        ];
      }
    });
  }

  getAvatarIcon(t: Testimonial): string {
    if (t.mediaType === 'audio') return '🎙️';
    if (t.mediaType === 'image') return '📸';
    if (t.mediaType === 'video') return '🎥';
    return '🎓';
  }

  getMediaBadge(type?: string): string {
    switch(type) {
      case 'audio': return '🎙️ تسجيل صوتي';
      case 'image': return '📸 شهادة موثقة';
      case 'video': return '🎥 فيديو توثيقي';
      default: return '💬 نصي';
    }
  }

  renderStars(rating: number): string {
    const r = Math.min(5, Math.max(1, Math.round(rating)));
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }

  openAddReviewModal(): void {
    this.isAddReviewModalOpen = true;
    this.audio.playClick();
  }

  closeAddReviewModal(): void {
    this.isAddReviewModalOpen = false;
  }

  submitReview(): void {
    if (!this.newReview.clientName || !this.newReview.contentAr) {
      alert('يرجى كتابة اسمك وتفاصيل تجربتك الأكاديمية');
      return;
    }
    this.api.createTestimonial(this.newReview).subscribe(created => {
      if (created) {
        this.testimonialsList.unshift(created);
      }
    });
    this.audio.playSuccess();
    alert('🎉 شكراً لك! تم إرسال تقييمك بنجاح وحفظه في المنصة، كود خصمك هو: REHAM15 (خصم 15% فوري).');
    this.isAddReviewModalOpen = false;
    this.newReview = { clientName: '', clientUniversity: '', city: 'الرياض', rating: 5, mediaType: 'text', mediaUrl: '', contentAr: '' };
  }

  togglePlayVoice(): void {
    this.isPlayingVoice = !this.isPlayingVoice;
    if (this.isPlayingVoice) {
      this.audio.playNotification();
    } else {
      this.audio.playClick();
    }
  }

  onHover(): void {
    this.audio.playHover();
  }

  onClick(): void {
    this.audio.playClick();
  }
}

// ==========================================
// 3. ARTICLES PAGE (المقالات والأدلة العلمية المتجددة)
// ==========================================
@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="inner-page-wrapper bg-ivory-warm" dir="rtl">
      <div class="container section-padding">
        
        <!-- Header -->
        <div class="section-badge-center">
          <span class="badge-gold">المكتبة والمعرفة الأكاديمية</span>
          <h1 class="page-title">دليل الباحث <span class="green-gradient-text">والمقالات العلمية</span></h1>
          <p class="page-desc">إرشادات وأدلة علمية محكمة في مناهج البحث العلمي، التوثيق الأكاديمي، واجتياز المناقشات بنجاح. يتم تحديثها وإدارتها دورياً من المنظومة.</p>
        </div>

        <!-- Articles Grid -->
        <div class="articles-curated-grid">
          <article *ngFor="let a of articles" class="article-luxury-card" (mouseenter)="onHover()">
            <div class="art-cover-box">
              <span class="art-icon">{{ a.icon || '📖' }}</span>
              <span class="art-read-time">⏱️ {{ a.readTime || '5 دقائق قراءة' }}</span>
            </div>

            <div class="art-body">
              <span class="art-tag">{{ a.tag || a.categoryNameAr || 'دليل الباحث' }}</span>
              <h3 class="art-title" (click)="openArticleReader(a)">{{ a.titleAr || a.title }}</h3>
              <p class="art-excerpt">{{ a.excerptAr || a.excerpt }}</p>
            </div>

            <div class="art-footer">
              <span class="art-date">📅 {{ a.date || 'محدث 2026' }}</span>
              <button type="button" class="btn-read-guide" (click)="openArticleReader(a)">
                <span>قراءة المقال بالكامل ←</span>
              </button>
            </div>
          </article>
        </div>

      </div>

      <!-- Article Reader Modal -->
      <div *ngIf="selectedArticle" class="port-modal-backdrop" (click)="closeArticleReader()">
        <div class="port-modal-box" style="max-width: 720px;" (click)="$event.stopPropagation()">
          <div class="port-modal-header">
            <div>
              <span class="badge-gold">{{ selectedArticle.tag || selectedArticle.categoryNameAr || 'دليل علمي' }}</span>
              <h3>{{ selectedArticle.titleAr || selectedArticle.title }}</h3>
            </div>
            <button class="btn-close-modal" (click)="closeArticleReader()">✕</button>
          </div>
          <div class="port-modal-body" style="max-height: 70vh; overflow-y: auto;">
            <p class="modal-desc" style="font-weight: 600; color: #1B4332;">
              {{ selectedArticle.excerptAr || selectedArticle.excerpt }}
            </p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 1.2rem 0;" />
            <div class="article-full-content" style="line-height: 1.9; color: #2D3748; font-size: 1rem;">
              {{ selectedArticle.contentAr || selectedArticle.excerptAr || selectedArticle.excerpt }}
            </div>
          </div>
          <div class="port-modal-footer">
            <a [href]="getArticleWhatsAppLink(selectedArticle.titleAr || selectedArticle.title)" target="_blank" class="btn-saudi-gold">
              <span>طلب استشارة أكاديمية حول هذا المقال 💬</span>
            </a>
            <button type="button" class="btn-ghost-close" (click)="closeArticleReader()">إغلاق</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inner-page-wrapper { min-height: 100vh; padding-top: 6rem; background: #FAF8F5; }
    .section-badge-center { text-align: center; max-width: 820px; margin: 0 auto 3.5rem auto; }
    .page-title { font-size: clamp(2.2rem, 4.5vw, 3.4rem); color: #0B2516; margin: 0.8rem 0; font-weight: 900; }
    .page-desc { color: #52665C; font-size: 1.1rem; line-height: 1.8; }

    .articles-curated-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2.2rem;
    }

    .article-luxury-card {
      border-radius: var(--radius-xl);
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      box-shadow: 0 8px 25px rgba(27, 67, 50, 0.06);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .article-luxury-card:hover {
      transform: translateY(-8px);
      border-color: #C9A96E;
      box-shadow: 0 20px 50px rgba(27, 67, 50, 0.15);
    }

    .art-cover-box {
      background: linear-gradient(135deg, #1B4332 0%, #0B2516 100%);
      padding: 2.5rem 1.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .art-icon { font-size: 2.5rem; }

    .art-read-time {
      font-size: 0.78rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-weight: 600;
    }

    .art-body {
      padding: 1.8rem;
      flex: 1;
    }

    .art-tag {
      font-size: 0.75rem;
      color: #9B7E3E;
      background: #FAF8F5;
      border: 1px solid rgba(201, 169, 110, 0.35);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      font-weight: 800;
      display: inline-block;
      margin-bottom: 0.8rem;
    }

    .art-title {
      font-size: 1.25rem;
      color: #0B2516;
      margin-bottom: 0.7rem;
      font-weight: 800;
      line-height: 1.4;
      cursor: pointer;
      transition: color 0.2s;
    }
    .art-title:hover { color: #C9A96E; }

    .art-excerpt {
      color: #52665C;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .art-footer {
      padding: 1.2rem 1.8rem;
      border-top: 1px solid rgba(201, 169, 110, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8rem;
    }

    .art-date { color: #839E93; }
    .btn-read-guide {
      background: none;
      border: none;
      color: #1B4332;
      font-weight: 800;
      cursor: pointer;
      font-size: 0.88rem;
      transition: color 0.2s;
    }
    .btn-read-guide:hover { color: #C9A96E; }

    .port-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .port-modal-box {
      background: #FFFFFF;
      border-radius: 24px;
      max-width: 620px;
      width: 100%;
      box-shadow: 0 25px 60px rgba(0,0,0,0.3);
      border: 1.5px solid rgba(15, 81, 50, 0.15);
      overflow: hidden;
    }
    .port-modal-header {
      padding: 1.4rem 1.8rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: #FAF8F5;
    }
    .port-modal-header h3 {
      font-size: 1.25rem;
      color: #0A2F24;
      margin: 0.3rem 0 0 0;
      font-weight: 800;
    }
    .btn-close-modal {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: #888;
      cursor: pointer;
    }
    .port-modal-body { padding: 1.8rem; }
    .modal-desc {
      color: #485A53;
      font-size: 0.95rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
    .port-modal-footer {
      padding: 1.2rem 1.8rem;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      background: #FAF8F5;
    }
    .btn-saudi-gold {
      background: linear-gradient(135deg, #C9A96E 0%, #A48348 100%);
      color: #06130D;
      padding: 0.8rem 1.6rem;
      border-radius: var(--radius-full);
      font-weight: 800;
      font-size: 0.92rem;
      text-decoration: none;
      display: inline-block;
    }
    .btn-ghost-close {
      background: none;
      border: 1px solid #CCC;
      padding: 0.6rem 1.2rem;
      border-radius: 20px;
      cursor: pointer;
      color: #555;
    }
  `]
})
export class ArticlesPageComponent implements OnInit {
  private api = inject(ApiService);
  private audio = inject(AudioService);

  selectedArticle: any = null;

  articles: any[] = [
    {
      icon: '📖',
      tag: 'دليل التوثيق العلمي',
      titleAr: 'دليل الباحث الشامل لتوثيق المراجع بنظام APA الإصدار السابع (2026)',
      excerptAr: 'شرح تطبيقي دقيق لقواعد توثيق الكتب، المقالات المحكمة، المواقع، والتقارير الرسمية وفق أحدث المعايير الأكاديمية العالمية.',
      contentAr: 'يعتبر نظام APA 7th النظام الأكثر اعتماداً في الجامعات السعودية والعربية لتوثيق البحوث في مجالات الإدارة، العلوم التربوية، والعلوم الاجتماعية. يركز الإصدار السابع على تبسيط التوثيق في المتن، توثيق ما يصل إلى 20 مؤلفاً في قائمة المراجع، وتضمين روابط DOI بشكل قياسي.',
      readTime: '6 دقائق قراءة',
      date: 'سبتمبر 2026'
    },
    {
      icon: '🛡️',
      tag: 'معايير الأصالة والنزاهة',
      titleAr: 'كيف تتجاوز فحص Turnitin بنسبة اقتباس 0% بطرق أكاديمية سليمة؟',
      excerptAr: 'أهم الاستراتيجيات المنهجية لإعادة الصياغة، التلخيص العلمي، واستخدام علامات التنصيص بطريقة احترافية.',
      contentAr: 'تعتمد منظومة أم رهام تقنيات إعادة الصياغة العلمية المعتمدة (Paraphrasing) التي تحافظ على عمق الفكرة مع إعادة بناء الجمل وصياغة الأفكار بأسلوب الباحث الخاص، مما يضمن خلو العمل تماماً من الاقتباس غير المقبول مع الحفاظ على الرصانة العلمية.',
      readTime: '8 دقائق قراءة',
      date: 'سبتمبر 2026'
    },
    {
      icon: '🎓',
      tag: 'أسرار المناقشة الأكاديمية',
      titleAr: 'الوصايا العشر لاجتياز مناقشة رسائل الماجستير والدكتوراه بامتياز',
      excerptAr: 'نصائح عملية لإعداد العرض التقديمي (PowerPoint)، إدارة لغة الجسد، والرد الذكي على أسئلة لجنة التحكيم والمناقشين.',
      contentAr: 'المناقشة الأكاديمية ليست مجرد استعراض لمحتوى الرسالة، بل هي إثبات لتمكن الباحث وقدرته على الدفاع عن منهجيته ونتائجه. تبدأ الوصايا بتصميم عرض بصري مكثف يركز على الفجوة البحثية والنتائج والتوصيات التطبيقية، مع التدرب المسبق على إدارة الوقت والتوقعات.',
      readTime: '10 دقائق قراءة',
      date: 'أغسطس 2026'
    },
    {
      icon: '📊',
      tag: 'التحليل الإحصائي SPSS',
      titleAr: 'الفرق بين الاختبارات المعلمية واللامعلمية وكيف تختار الأنسب لبياناتك؟',
      excerptAr: 'دليل مبسط لفهم التوزيع الطبيعي للبيانات واختيار اختبار t-test أو Mann-Whitney أو ANOVA المناسب لفرضياتك.',
      contentAr: 'يعد تحديد طبيعة البيانات الخطوة الأهم في التحليل الإحصائي. إذا كانت البيانات تتبع التوزيع الطبيعي وتستخدم مقياساً فئوياً أو نسبياً نلجأ للاختبارات المعلمية (Parametric)، أما إذا كانت البيانات رتبية أو لا تتبع التوزيع الطبيعي فنعتمد الاختبارات اللامعلمية.',
      readTime: '7 دقائق قراءة',
      date: 'أغسطس 2026'
    }
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    this.api.getArticles().subscribe(res => {
      if (res && res.length > 0) {
        this.articles = res.map(a => ({
          ...a,
          icon: '📖',
          tag: a.categoryNameAr || 'دليل معتمد',
          readTime: '6 دقائق قراءة',
          date: 'محدث 2026'
        }));
      }
    });
  }

  openArticleReader(a: any): void {
    this.selectedArticle = a;
    this.audio.playClick();
  }

  closeArticleReader(): void {
    this.selectedArticle = null;
  }

  onHover(): void {
    this.audio.playHover();
  }

  onClick(): void {
    this.audio.playClick();
  }

  getArticleWhatsAppLink(title: string): string {
    const text = encodeURIComponent('السلام عليكم أم رهام 🌟\nأرغب في استشارة أكاديمية حول موضوع المقال:\n"' + title + '"');
    return 'https://wa.me/?text=' + text;
  }
}
