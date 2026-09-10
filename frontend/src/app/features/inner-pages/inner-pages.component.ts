import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AudioService } from '../../core/services/audio.service';
import { ApiService, Testimonial } from '../../core/services/api.service';

// ==========================================
// 1. PORTFOLIO / WORKS PAGE (معرض الإنجازات)
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
          <p class="page-desc">نماذج محكمة من أبحاث ماجستير، مشاريع تخرج هندسية، عروض تقديمية 4K، وبرمجيات نفذناها بأعلى المعايير الأكاديمية.</p>
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
            
            <div class="port-top-row">
              <span class="port-category-tag">{{ item.category }}</span>
              <span class="port-verified-badge">✓ معتمد ومُناقش</span>
            </div>

            <h3 class="port-title">{{ item.title }}</h3>
            <p class="port-desc">{{ item.desc }}</p>

            <div class="port-specs-box">
              <div class="spec-chip">🏛️ {{ item.university }}</div>
              <div class="spec-chip">📄 {{ item.pages }}</div>
              <div class="spec-chip green">🛡️ Turnitin: 0%</div>
            </div>

            <div class="port-footer">
              <div class="rating-stars">★★★★★</div>
              <a 
                [href]="getSampleWhatsAppLink(item.title)" 
                target="_blank" 
                class="btn-port-action"
                (click)="onClick()">
                <span>طلب عمل مماثل ←</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .inner-page-wrapper { min-height: 100vh; padding-top: 6rem; background: #FBF9F5; }
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
      padding: 2.2rem;
      border-radius: var(--radius-xl);
      background: #FFFFFF;
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      box-shadow: 0 8px 25px rgba(27, 67, 50, 0.06);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .portfolio-card:hover {
      transform: translateY(-8px);
      border-color: #C9A96E;
      box-shadow: 0 20px 50px rgba(27, 67, 50, 0.15);
    }

    .port-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
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
      font-size: 1.2rem;
      color: #0B2516;
      margin-bottom: 0.7rem;
      font-weight: 800;
      line-height: 1.4;
    }

    .port-desc {
      color: #52665C;
      font-size: 0.92rem;
      line-height: 1.6;
      margin-bottom: 1.4rem;
    }

    .port-specs-box {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
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
      padding-top: 1.2rem;
    }

    .rating-stars {
      color: #D4AF37;
      font-size: 0.95rem;
    }

    .btn-port-action {
      font-size: 0.88rem;
      color: #1B4332;
      font-weight: 800;
      text-decoration: none;
      transition: color 0.2s;
    }

    .btn-port-action:hover {
      color: #C9A96E;
    }
  `]
})
export class PortfolioPageComponent {
  private audio = inject(AudioService);

  selectedPortCat = 'all';

  portfolioCategories = [
    { id: 'all', name: '✨ كافة الأعمال' },
    { id: 'research', name: '📚 بحوث ماجستير ودكتوراه' },
    { id: 'projects', name: '🎓 مشاريع تخرج وهندسة' },
    { id: 'spss', name: '📊 تحليل إحصائي SPSS' },
    { id: 'presentations', name: '🎨 عروض تقديمية 4K' }
  ];

  portfolioItems = [
    {
      catId: 'research',
      category: 'بحوث ودراسات عليا',
      title: 'أثر تطبيق معايير الحوكمة والتحول الرقمي في كفاءة المستشفيات الحكومية السعودية',
      desc: 'دراسة ميدانية تطبيقية محكمة بمنهجية كمية متقدمة مع توثيق APA 7th وفحص Turnitin.',
      university: 'جامعة الملك سعود — الرياض',
      pages: '45 صفحة'
    },
    {
      catId: 'projects',
      category: 'مشاريع تخرج حاسب',
      title: 'منصة ذكية لإدارة سلاسل الإمداد اللوجستية باستخدام تقنيات IoT و Machine Learning',
      desc: 'مشروع تخرج متكامل يشمل التوثيق البرمجي، مخططات UML، واجهات Angular، و APIs سحابية.',
      university: 'جامعة الملك فهد للبترول والمعادن',
      pages: '65 صفحة + سورس كود'
    },
    {
      catId: 'spss',
      category: 'تحليل إحصائي متقدم',
      title: 'تحليل الفرضيات ومعاملات الارتباط واختبارات الانحدار لـ 450 استبانة بحثية',
      desc: 'معالجة إحصائية احترافية مع جداول ورسوم بيانية جاهزة ومناقشة النتائج وفق الدراسات السابقة.',
      university: 'جامعة الإمام محمد بن سعود',
      pages: '28 صفحة تحليلية'
    },
    {
      catId: 'presentations',
      category: 'عروض تقديمية أكاديمية',
      title: 'حقيبة عرض سينمائي تفاعلي 4K لمناقشة أطروحة الدكتوراه في الإدارة القيادية',
      desc: 'تصميم فخم مدعم بأنيميشن مخصص، جداول تفاعلية، وموجز تنفيذي للمحكمين.',
      university: 'جامعة الملك عبدالعزيز — جدة',
      pages: '35 سلايد تفاعلي'
    },
    {
      catId: 'research',
      category: 'خطط أبحاث (Proposal)',
      title: 'خطة بحث ماجستير متكاملة في أمن المعلومات والأمن السيبراني المصرفي',
      desc: 'صياغة مشكلة البحث، الفرضيات، الدراسات السابقة، والمنهجية العلمية المعتمدة.',
      university: 'جامعة الطائف',
      pages: '20 صفحة'
    },
    {
      catId: 'projects',
      category: 'تطوير وتطبيقات ويب',
      title: 'تطبيق رعاية صحية ذكي لحجز المواعيد والاستشارات الطبية عن بعد',
      desc: 'تطبيق Full-Stack بتصميم عصري مع توثيق تقني ودليل تشغيل شامل.',
      university: 'جامعة أم القرى',
      pages: 'توثيق + كود متكامل'
    }
  ];

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
    const text = encodeURIComponent(`السلام عليكم أم رهام 🌟\nأرغب بالاستفسار وطلب مشروع مشابه لـ:\n"${title}"`);
    return `https://wa.me/?text=${text}`;
  }
}

// ==========================================
// 2. TESTIMONIALS PAGE (جدار الثقة الأكاديمية)
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
          <p class="page-desc">شهادات وتجارب حقيقية موثقة من باحثين وطلاب الدراسات العليا في كافة جامعات ومناطق المملكة.</p>
        </div>

        <!-- Featured Voice Testimonial Waveform Player -->
        <div class="featured-voice-bar glass-panel-light" (click)="togglePlayVoice()">
          <div class="fvb-left">
            <button class="fvb-play-btn">
              <span>{{ isPlayingVoice ? '⏸️' : '▶️' }}</span>
            </button>
            <div class="fvb-info">
              <strong>🎙️ استمع إلى تجربة صوتية مسجلة من باحث معتمد</strong>
              <small>د. فهد الدوسري — جامعة الملك سعود (مناقشة رسالة ماجستير بامتياز)</small>
            </div>
          </div>

          <div class="fvb-waveform" [class.playing]="isPlayingVoice">
            <span class="vw-bar" style="height: 35%;"></span>
            <span class="vw-bar" style="height: 65%;"></span>
            <span class="vw-bar" style="height: 95%;"></span>
            <span class="vw-bar" style="height: 50%;"></span>
            <span class="vw-bar" style="height: 85%;"></span>
            <span class="vw-bar" style="height: 100%;"></span>
            <span class="vw-bar" style="height: 70%;"></span>
            <span class="vw-bar" style="height: 90%;"></span>
            <span class="vw-bar" style="height: 45%;"></span>
            <span class="vw-bar" style="height: 80%;"></span>
            <span class="vw-bar" style="height: 60%;"></span>
          </div>

          <span class="fvb-duration">0:48 ثانية</span>
        </div>

        <!-- Testimonials Masonry Grid -->
        <div class="testimonials-masonry-grid">
          <div *ngFor="let t of testimonialsList" class="testimonial-luxury-card" (mouseenter)="onHover()">
            <div class="tlc-header">
              <div class="tlc-avatar">🎓</div>
              <div class="tlc-client-meta">
                <div class="tlc-name-row">
                  <strong>{{ t.clientName }}</strong>
                  <span class="tlc-verified">عميل موثق ✓</span>
                </div>
                <small>🇸🇦 {{ t.city || 'المملكة العربية السعودية' }} — {{ t.clientUniversity || 'جامعة سعودية' }}</small>
              </div>
              <div class="tlc-stars">★★★★★</div>
            </div>

            <p class="tlc-content">"{{ t.contentAr }}"</p>

            <div class="tlc-footer">
              <span class="tlc-date">🏅 تقييم معتمد بامتياز</span>
              <span class="tlc-shield">Turnitin 0% ✓</span>
            </div>
          </div>
        </div>

        <!-- Add Review & Discount Reward Banner -->
        <div class="reward-review-box">
          <div class="rrb-content">
            <span class="rrb-badge">🎁 مكافأة الباحثين والطلاب</span>
            <h2>هل تشرفت بالتعامل معنا؟</h2>
            <p>شاركنا تجربتك وتقييمك الأكاديمي واحصل فوراً على كوبون خصم 15% على خدمتك القادمة!</p>
          </div>
          <a routerLink="/order" class="btn-saudi-gold" (click)="onClick()">
            <span>✍️ اطلب خدمتك واستفد من الخصم</span>
          </a>
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
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #C5A869;
      border: none;
      color: #06130D;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
      flex-shrink: 0;
    }

    .fvb-info strong {
      display: block;
      color: #FFFFFF;
      font-size: 0.95rem;
      margin-bottom: 2px;
    }

    .fvb-info small {
      color: #DFC698;
      font-size: 0.78rem;
    }

    .fvb-waveform {
      flex: 1;
      max-width: 320px;
      height: 28px;
      display: flex;
      align-items: center;
      gap: 5px;
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
      font-family: var(--font-family-latin);
      font-weight: 700;
    }

    .testimonials-masonry-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .testimonial-luxury-card {
      padding: 2.4rem;
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
      font-size: 2rem;
      width: 48px;
      height: 48px;
      background: #FAF8F5;
      border: 1px solid rgba(15, 81, 50, 0.15);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      font-size: 1rem;
      line-height: 1.85;
      margin-bottom: 1.6rem;
    }

    .tlc-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(15, 81, 50, 0.08);
      padding-top: 1.1rem;
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
    }

    @media (max-width: 768px) {
      .featured-voice-bar { flex-direction: column; text-align: center; }
      .fvb-waveform { display: none; }
      .reward-review-box { flex-direction: column; text-align: center; }
      .btn-saudi-gold { width: 100%; text-align: center; }
    }
  `]
})
export class TestimonialsPageComponent implements OnInit {
  private api = inject(ApiService);
  private audio = inject(AudioService);

  testimonialsList: Testimonial[] = [];
  isPlayingVoice = false;

  ngOnInit(): void {
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
            rating: 5
          },
          {
            id: '2',
            clientName: 'سارة القحطاني',
            clientTitle: 'طالبة دكتوراه',
            city: 'الرياض',
            clientUniversity: 'جامعة الملك سعود',
            contentAr: 'سرعة ودقة فائقة في التحليل الإحصائي عبر SPSS والمراجعة المنهجية. تعاملت مع جهات كثيرة لكن احترافية وأمانة أم رهام لا تُضاهى.',
            rating: 5
          },
          {
            id: '3',
            clientName: 'عبدالرحمن الشهري',
            clientTitle: 'هندسة وبرمجيات',
            city: 'جدة',
            clientUniversity: 'جامعة الملك عبدالعزيز',
            contentAr: 'مشروع التخرج كان معقداً جداً، لكن الفريق أخرجه بأعلى جودة وقدم لي شرحاً مفصلاً لجميع جوانب النظام مما مكّنني من اجتياز المناقشة بامتياز.',
            rating: 5
          }
        ];
      }
    });
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
// 3. ARTICLES PAGE (المقالات والأدلة العلمية)
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
          <p class="page-desc">إرشادات وأدلة علمية محكمة في مناهج البحث العلمي، التوثيق الأكاديمي، واجتياز المناقشات بنجاح.</p>
        </div>

        <!-- Articles Grid -->
        <div class="articles-curated-grid">
          <article *ngFor="let a of articles" class="article-luxury-card" (mouseenter)="onHover()">
            <div class="art-cover-box">
              <span class="art-icon">{{ a.icon }}</span>
              <span class="art-read-time">⏱️ {{ a.readTime }}</span>
            </div>

            <div class="art-body">
              <span class="art-tag">{{ a.tag }}</span>
              <h3 class="art-title">{{ a.title }}</h3>
              <p class="art-excerpt">{{ a.excerpt }}</p>
            </div>

            <div class="art-footer">
              <span class="art-date">📅 {{ a.date }}</span>
              <a [href]="getArticleWhatsAppLink(a.title)" target="_blank" class="btn-read-guide" (click)="onClick()">
                <span>استشارة حول هذا الموضوع ←</span>
              </a>
            </div>
          </article>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .inner-page-wrapper { min-height: 100vh; padding-top: 6rem; background: #FBF9F5; }
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
      height: 130px;
      background: linear-gradient(135deg, #1B4332 0%, #0F2A1F 100%);
      border-bottom: 1px solid rgba(201, 169, 110, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.8rem;
    }

    .art-icon { font-size: 2.8rem; }
    .art-read-time {
      font-size: 0.75rem;
      color: #DFC698;
      background: rgba(0, 0, 0, 0.3);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-weight: 700;
    }

    .art-body {
      padding: 1.8rem;
    }

    .art-tag {
      font-size: 0.72rem;
      color: #059669;
      background: rgba(5, 150, 105, 0.1);
      border: 1px solid rgba(5, 150, 105, 0.25);
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
    }

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
      color: #1B4332;
      font-weight: 800;
      text-decoration: none;
      transition: color 0.2s;
    }
    .btn-read-guide:hover { color: #C9A96E; }
  `]
})
export class ArticlesPageComponent {
  private audio = inject(AudioService);

  articles = [
    {
      icon: '📖',
      tag: 'دليل التوثيق العلمي',
      title: 'دليل الباحث الشامل لتوثيق المراجع بنظام APA الإصدار السابع (2026)',
      excerpt: 'شرح تطبيقي دقيق لقواعد توثيق الكتب، المقالات المحكمة، المواقع، والتقارير الرسمية وفق أحدث المعايير.',
      readTime: '6 دقائق قراءة',
      date: 'أغسطس 2026'
    },
    {
      icon: '🛡️',
      tag: 'معايير الأصالة والنزاهة',
      title: 'كيف تتجاوز فحص Turnitin بنسبة اقتباس 0% بطرق أكاديمية سليمة؟',
      excerpt: 'أهم الاستراتيجيات المنهجية لإعادة الصياغة، التلخيص العلمي، واستخدام علامات التنصيص بطريقة احترافية.',
      readTime: '8 دقائق قراءة',
      date: 'أغسطس 2026'
    },
    {
      icon: '🎓',
      tag: 'إرشادات المناقشة',
      title: 'أسرار اجتياز مناقشة رسائل الماجستير والدكتوراه بثقة واقتدار',
      excerpt: 'نصائح عملية في بناء العرض التقديمي، الإجابة على أسئلة المحكمين، وتفنيد الملاحظات المنهجية بأسلوب علمي رصين.',
      readTime: '10 دقائق قراءة',
      date: 'أغسطس 2026'
    },
    {
      icon: '📊',
      tag: 'التحليل الإحصائي',
      title: 'كيف تختار المقياس الإحصائي المناسب في SPSS لفرضيات دراستك؟',
      excerpt: 'دليل مبسط لاختيار اختبارات t-test، الانحدار الخطي، والارتباط بما يتوافق مع طبيعة بياناتك ومتغيراتك.',
      readTime: '7 دقائق قراءة',
      date: 'أغسطس 2026'
    }
  ];

  onHover(): void {
    this.audio.playHover();
  }

  onClick(): void {
    this.audio.playClick();
  }

  getArticleWhatsAppLink(title: string): string {
    const text = encodeURIComponent(`السلام عليكم أم رهام 🌟\nقرأت المقال المميز: "${title}" وأرغب باستشارة متخصصة.`);
    return `https://wa.me/?text=${text}`;
  }
}

// ==========================================
// 4. CONTACT PAGE (طلب خدمة ومتابعة الطلب)
// ==========================================
export { ContactPageComponent } from '../contact-page/contact-page.component';

