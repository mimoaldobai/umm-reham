import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-experience-wrapper" dir="rtl">
      
      <!-- ==========================================
           HERO: ACADEMIC HERITAGE & VISION
           ========================================== -->
      <section class="about-hero-section">
        <div class="container">
          <div class="about-hero-content">
            <div class="hero-badge-row">
              <span class="badge-gold">
                <span>🇸🇦</span>
                <span>الصرح الأكاديمي والتعليمي السعودي الرائد</span>
              </span>
              <span class="badge-glow">موثوقية • أصالة 100% • تميز</span>
            </div>
            
            <h1 class="about-hero-title">
              نصنع الفارق الأكاديمي والبحثي <br/>
              <span class="gold-gradient-text">بأيدي نخبة من الخبراء والمستشارين</span>
            </h1>

            <p class="about-hero-lead">
              انطلقت <strong>منظومة أم رهام</strong> برؤية سعودية طموحة تهدف إلى إرساء أعلى معايير الجودة في البحث العلمي والدراسات العليا والخدمات العامة، وتوفير الدعم الأكاديمي والمهني الرصين للباحثين والطلاب في كافة أنحاء المملكة.
            </p>

            <!-- Quick Trust Bar -->
            <div class="hero-stats-capsule">
              <div class="stat-capsule-item">
                <strong class="gold-gradient-text">+25,000</strong>
                <span>قصة نجاح أكاديمية أنجزناها</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-capsule-item">
                <strong class="gold-gradient-text">100%</strong>
                <span>أصالة وفحص Turnitin معتمد 0% اقتباس</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-capsule-item">
                <strong class="gold-gradient-text">+40</strong>
                <span>مدينة وجامعة داخل المملكة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           OUR 4 NOBLE PILLARS (أركان التميز الأكاديمي)
           ========================================== -->
      <section class="pillars-section section-padding" id="pillars">
        <div class="container">
          <div class="section-badge-center">
            <span class="badge-gold">
              <span>🛡️</span>
              <span>ميثاق التميز والجودة</span>
            </span>
            <h2 class="section-title">الأركان الأربعة لمنظومة <span class="gold-gradient-text">أم رهام</span></h2>
            <p class="section-desc">مبادئ وقيم راسخة توجه كل خطوة في رحلتنا لخدمة الباحثين والطلاب.</p>
          </div>

          <div class="pillars-grid">
            <!-- Pillar 1 -->
            <div class="pillar-card" (mouseenter)="onHover()">
              <div class="pillar-icon-box">
                <span>📜</span>
                <div class="icon-ring"></div>
              </div>
              <h3>الأصالة والتوثيق الأكاديمي الصارم</h3>
              <p>
                نلتزم بأدق المعايير المنهجية المعتمدة عالمياً (APA 7th, Harvard, IEEE, Chicago)، مع تدقيق يدوي رصين وفحص نسبة الاقتباس عبر Turnitin لضمان خلو العمل من أي استلال.
              </p>
              <div class="pillar-tag">✓ مطابقة شروط الجامعات 100%</div>
            </div>

            <!-- Pillar 2 -->
            <div class="pillar-card" (mouseenter)="onHover()">
              <div class="pillar-icon-box">
                <span>🛡️</span>
                <div class="icon-ring"></div>
              </div>
              <h3>السرية التامة وميثاق الأمان (NDA)</h3>
              <p>
                نعتبر بياناتك الشخصية وحقوقك الفكرية ومسودات أبحاثك أمانة مقدسة. نطبق بروتوكولات حماية صارمة واتفاقيات سرية تضمن عدم مشاركة أي تفاصيل مع أي طرف.
              </p>
              <div class="pillar-tag">✓ حماية فكرية وتشفير كامل</div>
            </div>

            <!-- Pillar 3 -->
            <div class="pillar-card" (mouseenter)="onHover()">
              <div class="pillar-icon-box">
                <span>⏰</span>
                <div class="icon-ring"></div>
              </div>
              <h3>الانضباط الزمني والتسليم المرحلي</h3>
              <p>
                ندرك قيمة الوقت في المواعيد الأكاديمية وحلقات النقاش. نضع جداول زمنية محددة ونشاركك مسودات دورية تتيح لك مراجعة التقدم أولاً بأول.
              </p>
              <div class="pillar-tag">✓ تسليم فوري حسب الجدول</div>
            </div>

            <!-- Pillar 4 -->
            <div class="pillar-card" (mouseenter)="onHover()">
              <div class="pillar-icon-box">
                <span>🎓</span>
                <div class="icon-ring"></div>
              </div>
              <h3>الدعم المستمر حتى المناقشة النهائية</h3>
              <p>
                علاقتنا معك لا تنتهي بتسليم الملف، بل نرافقك بالملاحظات والتعديلات المجانية وتجهيز العروض التقديمية والتحضير للمناقشة حتى تجتاز أهدافك بنجاح باهر.
              </p>
              <div class="pillar-tag">✓ تعديلات مجانية ومتابعة مستمرة</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           VISION 2030 & NATIONAL IMPACT
           ========================================== -->
      <section class="vision-national-section section-padding">
        <div class="container">
          <div class="vision-luxury-container">
            <div class="vision-grid">
              <div class="vision-text-col">
                <span class="vision-badge">المملكة العربية السعودية 🇸🇦</span>
                <h2>مساهمتنا في تمكين <span class="gold-gradient-text">رؤية المملكة 2030</span></h2>
                <p>
                  إيماناً منا بأن المعرفة والبحث العلمي هما الركيزة الأساسية لاقتصاد المستقبل، نسعى لرفع كفاءة النتاج العلمي والابتكاري لطلاب الدراسات العليا والباحثين، وتزويدهم بالأدوات المنهجية التي ترفع تصنيف الجامعات السعودية عالمياً.
                </p>

                <div class="vision-bullets">
                  <div class="v-bullet">
                    <span class="vb-icon">🌱</span>
                    <div class="vb-text">
                      <strong>بناء القدرات البحثية الوطنية</strong>
                      <small>تدريب وتوجيه منهجي يصنع باحثين متمكنين ومتميزين</small>
                    </div>
                  </div>

                  <div class="v-bullet">
                    <span class="vb-icon">💻</span>
                    <div class="vb-text">
                      <strong>مواكبة التحول التقني والذكاء الاصطناعي</strong>
                      <small>دمج أحدث الأدوات التكنولوجية في التحليل والتطوير البرمجي</small>
                    </div>
                  </div>

                  <div class="v-bullet">
                    <span class="vb-icon">🏆</span>
                    <div class="vb-text">
                      <strong>معايير نشر وتوثيق دولية معتمدة</strong>
                      <small>تهيئة الأبحاث للنشر في مجلات Scopus و Web of Science الرصينة</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Visual Emblem & Highlights -->
              <div class="vision-emblem-col">
                <div class="emblem-card-box">
                  <div class="emblem-gold-circle">
                    <span>🇸🇦</span>
                  </div>
                  <h3>منظومة أم رهام الوطنية</h3>
                  <p>تغطية شاملة تخدم جامعات الرياض، جدة، الشرقية، مكة، المدينة، عسير، والقصيم.</p>
                  
                  <div class="mini-kpi-row">
                    <div class="mk-item">
                      <strong>+137</strong>
                      <small>تخصص معتمد</small>
                    </div>
                    <div class="mk-item">
                      <strong>99.4%</strong>
                      <small>نسبة القبول والاعتماد</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
           BOTTOM CTA
           ========================================== -->
      <section class="about-cta-section section-padding">
        <div class="container">
          <div class="about-cta-box">
            <div class="cta-content">
              <h2>هل أنت مستعد لبدء قصة تميزك الأكاديمي والمهني؟</h2>
              <p>تواصل مع فريق مستشارينا الأكاديميين الآن واحصل على خطة عمل واستشارة فورية معتمدة.</p>
            </div>
            <div class="cta-btns-group">
              <a href="https://wa.me/966572651058?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
                 target="_blank" 
                 class="btn-saudi-gold"
                 (click)="onClick()"
                 style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>تواصل عبر واتساب الآن</span>
              </a>
              <a routerLink="/services" class="btn-outline-gold" (click)="onClick()">
                <span>استكشف دليل الخدمات ←</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .about-experience-wrapper {
      min-height: 100vh;
      padding-top: 6.5rem;
      position: relative;
      background: #FAF8F5;
      color: #121816;
    }

    .about-hero-section {
      padding: 3.5rem 0 2.5rem 0;
      text-align: center;
    }

    .about-hero-content {
      max-width: 920px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-badge-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.2rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .badge-glow {
      background: rgba(22, 163, 74, 0.08);
      border: 1px solid rgba(22, 163, 74, 0.25);
      color: #16A34A;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: var(--radius-full);
    }

    .about-hero-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      color: #0A2F24;
      line-height: 1.35;
      margin-bottom: 1.2rem;
      font-weight: 900;
    }

    .about-hero-lead {
      font-size: 1.12rem;
      color: #485A53;
      line-height: 1.8;
      max-width: 780px;
      margin-bottom: 2.5rem;
    }

    .about-hero-lead strong {
      color: #0A2F24;
      font-weight: 800;
    }

    .hero-stats-capsule {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      max-width: 880px;
      padding: 1.8rem 2.5rem;
      border-radius: 24px;
      background: #FFFFFF;
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      box-shadow: 0 12px 35px rgba(10, 47, 36, 0.06);
    }

    .stat-capsule-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
    }

    .stat-capsule-item strong {
      font-size: 2.1rem;
      font-weight: 900;
      font-family: var(--font-family-latin);
    }

    .stat-capsule-item span {
      font-size: 0.88rem;
      color: #485A53;
      font-weight: 700;
    }

    .stat-divider {
      width: 1.5px;
      height: 45px;
      background: rgba(15, 81, 50, 0.12);
    }

    /* ==========================================
       PILLARS SECTION (الأركان الأربعة)
       ========================================== */
    .pillars-section {
      background: #FAF8F5;
      position: relative;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 1024px) {
      .pillars-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
    }

    @media (max-width: 640px) {
      .pillars-grid {
        grid-template-columns: 1fr;
        gap: 1.3rem;
      }
    }

    .pillar-card {
      padding: 2.4rem 1.8rem;
      border-radius: 22px;
      background: #FFFFFF !important;
      border: 1.5px solid rgba(15, 81, 50, 0.12) !important;
      box-shadow: 0 10px 30px rgba(10, 47, 36, 0.05) !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .pillar-card:hover {
      transform: translateY(-8px);
      border-color: #C5A869 !important;
      box-shadow: 0 20px 45px rgba(10, 47, 36, 0.1), 0 0 20px rgba(197, 168, 105, 0.15) !important;
    }

    .pillar-icon-box {
      width: 62px;
      height: 62px;
      border-radius: 18px;
      background: rgba(197, 168, 105, 0.12);
      border: 1.5px solid #C5A869;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: 1.4rem;
      position: relative;
      box-shadow: 0 4px 12px rgba(197, 168, 105, 0.15);
    }

    .pillar-card h3 {
      font-size: 1.28rem;
      color: #0A2F24 !important;
      margin-bottom: 0.85rem;
      font-weight: 800;
    }

    .pillar-card p {
      color: #485A53 !important;
      font-size: 0.92rem;
      line-height: 1.75;
      margin-bottom: 1.5rem;
    }

    .pillar-tag {
      font-size: 0.82rem;
      color: #16A34A;
      font-weight: 800;
      background: rgba(22, 163, 74, 0.08);
      padding: 6px 14px;
      border-radius: 8px;
      width: fit-content;
      border: 1px solid rgba(22, 163, 74, 0.25);
    }

    /* ==========================================
       VISION 2030 CONTAINER
       ========================================== */
    .vision-luxury-container {
      padding: 3.5rem;
      border-radius: 28px;
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      background: #FFFFFF;
      box-shadow: 0 16px 45px rgba(10, 47, 36, 0.06);
    }

    .vision-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .vision-badge {
      font-size: 0.88rem;
      color: #9B7E3E;
      font-weight: 800;
      display: inline-block;
      margin-bottom: 0.8rem;
      background: rgba(197, 168, 105, 0.12);
      padding: 4px 14px;
      border-radius: 9999px;
      border: 1px solid rgba(197, 168, 105, 0.3);
    }

    .vision-text-col h2 {
      font-size: 2.2rem;
      color: #0A2F24;
      margin-bottom: 1.2rem;
      font-weight: 900;
    }

    .vision-text-col p {
      color: #485A53;
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .vision-bullets {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .v-bullet {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      background: #FAF8F5;
      padding: 1rem 1.4rem;
      border-radius: 14px;
      border: 1.5px solid rgba(15, 81, 50, 0.1);
    }

    .vb-icon {
      font-size: 1.8rem;
    }

    .vb-text strong {
      display: block;
      color: #0A2F24;
      font-size: 1rem;
      font-weight: 800;
    }

    .vb-text small {
      color: #485A53;
      font-size: 0.84rem;
    }

    .emblem-card-box {
      background: #FAF8F5;
      border: 1.5px solid rgba(197, 168, 105, 0.35);
      border-radius: 24px;
      padding: 2.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 10px 30px rgba(10, 47, 36, 0.04);
    }

    .emblem-gold-circle {
      width: 74px;
      height: 74px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(197, 168, 105, 0.25) 0%, rgba(10, 47, 36, 0.1) 100%);
      border: 2px solid #C5A869;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      margin-bottom: 1.2rem;
      box-shadow: 0 6px 18px rgba(197, 168, 105, 0.25);
    }

    .emblem-card-box h3 {
      font-size: 1.35rem;
      color: #0A2F24;
      margin-bottom: 0.5rem;
      font-weight: 800;
    }

    .emblem-card-box p {
      font-size: 0.92rem;
      color: #485A53;
      line-height: 1.65;
      margin-bottom: 1.8rem;
    }

    .mini-kpi-row {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      border-top: 1.5px solid rgba(15, 81, 50, 0.1);
      padding-top: 1.4rem;
    }

    .mk-item {
      background: #FFFFFF;
      padding: 0.8rem 1.4rem;
      border-radius: 12px;
      border: 1px solid rgba(15, 81, 50, 0.1);
    }

    .mk-item strong {
      display: block;
      font-size: 1.5rem;
      color: #0A2F24;
      font-weight: 900;
      font-family: var(--font-family-latin);
    }

    .mk-item small {
      font-size: 0.78rem;
      color: #485A53;
      font-weight: 700;
    }

    /* ==========================================
       ABOUT CTA BOX
       ========================================== */
    .about-cta-box {
      padding: 3.5rem;
      border-radius: 28px;
      border: 1.5px solid rgba(197, 168, 105, 0.45);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      background: linear-gradient(135deg, #0A2F24 0%, #0D3B2E 100%);
      box-shadow: 0 20px 50px rgba(10, 47, 36, 0.25);
    }

    .cta-content h2 {
      font-size: 2.1rem;
      color: #FFFFFF;
      margin-bottom: 0.6rem;
      font-weight: 800;
    }

    .cta-content p {
      color: #CBDAD3;
      font-size: 1.05rem;
    }

    .cta-btns-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;
    }

    .btn-saudi-gold {
      background: linear-gradient(135deg, #DFC698 0%, #C5A869 100%);
      color: #0A2F24;
      padding: 0.95rem 1.9rem;
      border-radius: var(--radius-full);
      font-weight: 800;
      font-size: 0.96rem;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(197, 168, 105, 0.4);
      transition: all 0.3s ease;
    }

    .btn-saudi-gold:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(197, 168, 105, 0.55);
    }

    .btn-outline-gold {
      border: 1.5px solid #DFC698;
      color: #DFC698;
      padding: 0.9rem 1.7rem;
      border-radius: var(--radius-full);
      font-weight: 700;
      font-size: 0.96rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .btn-outline-gold:hover {
      background: rgba(223, 198, 152, 0.15);
      transform: translateY(-3px);
    }

    @media (max-width: 992px) {
      .vision-grid { grid-template-columns: 1fr; }
      .about-cta-box { flex-direction: column; text-align: center; }
      .cta-btns-group { flex-direction: column; width: 100%; }
      .btn-saudi-gold, .btn-outline-gold { width: 100%; text-align: center; }
      .hero-stats-capsule { flex-direction: column; gap: 1.2rem; }
      .stat-divider { display: none; }
    }
  `]
})
export class AboutPageComponent {
  audio = inject(AudioService);

  onHover(): void {
    this.audio.playHover();
  }

  onClick(): void {
    this.audio.playClick();
  }
}
