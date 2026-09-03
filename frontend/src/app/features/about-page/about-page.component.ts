import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-experience-wrapper bg-deep-saudi" dir="rtl">
      
      <!-- ==========================================
           HERO: ACADEMIC HERITAGE & VISION
           ========================================== -->
      <section class="about-hero-section">
        <div class="container">
          <div class="about-hero-content">
            <div class="hero-badge-row">
              <span class="badge-gold">🇸🇦 الصرح الأكاديمي السعودي الرائد</span>
              <span class="badge-glow">موثوقية • أصالة • تميز</span>
            </div>
            
            <h1 class="about-hero-title">
              نصنع الفارق الأكاديمي والبحثي <br/>
              <span class="gold-gradient-text">بأيدي نخبة من الخبراء والمستشارين</span>
            </h1>

            <p class="about-hero-lead">
              انطلقت <strong>أم رهام</strong> برؤية سعودية طموحة تهدف إلى إرساء معايير استثنائية في البحث العلمي، وتوفير الدعم الأكاديمي الرصين لطلاب الدراسات العليا والبكالوريوس والباحثين في كافة أرجاء المملكة.
            </p>

            <!-- Quick Trust Bar -->
            <div class="hero-stats-capsule glass-panel">
              <div class="stat-capsule-item">
                <strong class="gold-gradient-text">+25,000</strong>
                <span>قصة نجاح أكاديمية أنجزناها</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-capsule-item">
                <strong class="gold-gradient-text">100%</strong>
                <span>أصالة وفحص Turnitin معتمد</span>
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
      <section class="pillars-section section-padding">
        <div class="container">
          <div class="section-badge-center">
            <span class="badge-gold">ميثاق التميز والجودة</span>
            <h2 class="section-title">الأركان الأربعة لمنظومة <span class="gold-gradient-text">أم رهام</span></h2>
            <p class="section-desc">مبادئ وقيم راسخة توجه كل خطوة في رحلتنا لخدمة الباحثين والطلاب.</p>
          </div>

          <div class="pillars-grid">
            <!-- Pillar 1 -->
            <div class="pillar-card glass-panel" (mouseenter)="onHover()">
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
            <div class="pillar-card glass-panel" (mouseenter)="onHover()">
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
            <div class="pillar-card glass-panel" (mouseenter)="onHover()">
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
            <div class="pillar-card glass-panel" (mouseenter)="onHover()">
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
          <div class="vision-luxury-container glass-panel">
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
                      <small>تدريب وتوجيه منهجي يصنع باحثين متمكنين</small>
                    </div>
                  </div>

                  <div class="v-bullet">
                    <span class="vb-icon">💻</span>
                    <div class="vb-text">
                      <strong>مواكبة التحول التقني والذكاء الاصطناعي</strong>
                      <small>دمج أحدث الأدوات التكنولوجية في التحليل والتطوير</small>
                    </div>
                  </div>

                  <div class="v-bullet">
                    <span class="vb-icon">🏆</span>
                    <div class="vb-text">
                      <strong>معايير نشر وتوثيق دولية</strong>
                      <small>تهيئة الأبحاث للنشر في مجلات Scopus و Web of Science</small>
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
                      <small>نسبة القبول</small>
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
          <div class="about-cta-box glass-panel">
            <div class="cta-content">
              <h2>هل أنت مستعد لبدء قصة تميزك الأكاديمي؟</h2>
              <p>تواصل مع فريق مستشارينا الأكاديميين الآن واحصل على خطة عمل واستشارة فورية.</p>
            </div>
            <div class="cta-btns-group">
              <a href="https://wa.me/?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D8%A3%D9%85%20%D8%B1%D9%87%D8%A7%D9%85" 
                 target="_blank" 
                 class="btn-saudi-gold"
                 (click)="onClick()">
                <span>💬 تواصل عبر واتساب الآن</span>
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
      padding-top: 6rem;
      position: relative;
    }

    .about-hero-section {
      padding: 4rem 0 3rem 0;
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
      background: rgba(37, 211, 102, 0.12);
      border: 1px solid rgba(37, 211, 102, 0.35);
      color: #25D366;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: var(--radius-full);
    }

    .about-hero-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      color: #FFFFFF;
      line-height: 1.3;
      margin-bottom: 1.2rem;
      font-weight: 900;
    }

    .about-hero-lead {
      font-size: 1.15rem;
      color: #B8CCC4;
      line-height: 1.8;
      max-width: 780px;
      margin-bottom: 2.5rem;
    }

    .about-hero-lead strong {
      color: #DFC698;
    }

    .hero-stats-capsule {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      max-width: 850px;
      padding: 1.8rem 2.5rem;
      border-radius: var(--radius-xl);
      border: 1.5px solid rgba(201, 169, 110, 0.3);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    }

    .stat-capsule-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
    }

    .stat-capsule-item strong {
      font-size: 2rem;
      font-weight: 900;
      font-family: var(--font-family-latin);
    }

    .stat-capsule-item span {
      font-size: 0.85rem;
      color: #A3B8B0;
      font-weight: 600;
    }

    .stat-divider {
      width: 1px;
      height: 45px;
      background: rgba(201, 169, 110, 0.25);
    }

    /* Pillars Grid */
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .pillar-card {
      padding: 2.4rem 2rem;
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1.5px solid rgba(201, 169, 110, 0.2);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .pillar-card:hover {
      transform: translateY(-8px);
      border-color: #C9A96E;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 25px rgba(201, 169, 110, 0.2);
    }

    .pillar-icon-box {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-md);
      background: rgba(201, 169, 110, 0.15);
      border: 1.5px solid #C9A96E;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 1.4rem;
      position: relative;
    }

    .pillar-card h3 {
      font-size: 1.35rem;
      color: #FFFFFF;
      margin-bottom: 0.8rem;
      font-weight: 800;
    }

    .pillar-card p {
      color: #B8CCC4;
      font-size: 0.95rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .pillar-tag {
      font-size: 0.78rem;
      color: #52B788;
      font-weight: 800;
      background: rgba(37, 211, 102, 0.1);
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      width: fit-content;
      border: 1px solid rgba(37, 211, 102, 0.25);
    }

    /* Vision 2030 Container */
    .vision-luxury-container {
      padding: 3.5rem;
      border-radius: var(--radius-xl);
      border: 1.5px solid #C9A96E;
      background: linear-gradient(135deg, rgba(27, 67, 50, 0.8) 0%, rgba(11, 28, 21, 0.95) 100%);
    }

    .vision-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .vision-badge {
      font-size: 0.85rem;
      color: #DFC698;
      font-weight: 700;
      display: block;
      margin-bottom: 0.8rem;
    }

    .vision-text-col h2 {
      font-size: 2.2rem;
      color: #FFFFFF;
      margin-bottom: 1.2rem;
      font-weight: 900;
    }

    .vision-text-col p {
      color: #C1D6CD;
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
      gap: 1rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.9rem 1.2rem;
      border-radius: var(--radius-md);
      border: 1px solid rgba(201, 169, 110, 0.15);
    }

    .vb-icon {
      font-size: 1.6rem;
    }

    .vb-text strong {
      display: block;
      color: #FFFFFF;
      font-size: 0.95rem;
    }

    .vb-text small {
      color: #A3B8B0;
      font-size: 0.8rem;
    }

    .emblem-card-box {
      background: rgba(6, 19, 13, 0.8);
      border: 1.5px solid rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-lg);
      padding: 2.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .emblem-gold-circle {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.25) 0%, rgba(27, 67, 50, 0.8) 100%);
      border: 2px solid #C9A96E;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: 1.2rem;
    }

    .emblem-card-box h3 {
      font-size: 1.3rem;
      color: #FFFFFF;
      margin-bottom: 0.5rem;
    }

    .emblem-card-box p {
      font-size: 0.88rem;
      color: #A3B8B0;
      line-height: 1.6;
      margin-bottom: 1.8rem;
    }

    .mini-kpi-row {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      border-top: 1px solid rgba(201, 169, 110, 0.2);
      padding-top: 1.2rem;
    }

    .mk-item strong {
      display: block;
      font-size: 1.4rem;
      color: #DFC698;
      font-family: var(--font-family-latin);
    }

    .mk-item small {
      font-size: 0.75rem;
      color: #839E93;
    }

    /* About CTA Box */
    .about-cta-box {
      padding: 3rem;
      border-radius: var(--radius-xl);
      border: 1.5px solid #C9A96E;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      background: linear-gradient(135deg, #1B4332 0%, #0B1C15 100%);
    }

    .cta-content h2 {
      font-size: 2rem;
      color: #FFFFFF;
      margin-bottom: 0.5rem;
    }

    .cta-content p {
      color: #B8CCC4;
      font-size: 1rem;
    }

    .cta-btns-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;
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
    }

    .btn-outline-gold {
      border: 1.5px solid #C9A96E;
      color: #DFC698;
      padding: 0.85rem 1.6rem;
      border-radius: var(--radius-full);
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
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
