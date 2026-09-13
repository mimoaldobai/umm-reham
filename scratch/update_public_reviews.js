const fs = require('fs');
const path = require('path');

// 1. UPDATE home.component.ts
const homePath = 'c:/Users/USERW/Desktop/om reham/frontend/src/app/features/home/home.component.ts';
let homeContent = fs.readFileSync(homePath, 'utf8');

// Add media properties to reviewsRow1 and reviewsRow2
homeContent = homeContent.replace(
  `reviewsRow1 = [`,
  `reviewsRow1 = [\n    { quote: 'استماع للبصمة الصوتية للعميلة ريماس الشفافية والإنجاز 🎙️', name: 'ريماس الشهري', subject: 'مبادئ الرياضيات للأعمال SCMT 110', emoji: '🎙️', avatarBg: '#FDE047', isAudio: true, audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg' },`
);

homeContent = homeContent.replace(
  `reviewsRow2 = [`,
  `reviewsRow2 = [\n    { quote: 'لقطة شاشة لتقييم ونتيجة الماجستير بامتياز مع مرتبة الشرف 🖼️', name: 'عبدالله القحطاني', subject: 'ماجستير إدارة أعمال MBA', emoji: '🖼️', avatarBg: '#BAE6FD', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&auto=format&fit=crop' },`
);

// Inject Media UI elements in home review card template
const mediaCardMarkup = `
                <!-- Image Attachment Preview -->
                <div *ngIf="r.imageUrl" class="card-img-preview-box">
                  <img [src]="r.imageUrl" [alt]="r.name" class="card-review-img" />
                </div>

                <!-- Voice Note Audio Player -->
                <div *ngIf="r.isAudio || r.audioUrl" class="card-audio-voice-bar">
                  <button type="button" class="btn-play-voice-pill" (click)="toggleAudioReview(); $event.stopPropagation()">
                    <span>{{ isReviewPlaying ? '⏸️ إيقاف البصمة' : '🎙️ تشغيل البصمة الصوتية' }}</span>
                  </button>
                  <div class="voice-wave-min"><span></span><span></span><span></span><span></span></div>
                </div>
`;

homeContent = homeContent.replace(
  `<p class="review-bubble-text">{{ r.quote }}</p>`,
  `<p class="review-bubble-text">{{ r.quote }}</p>${mediaCardMarkup}`
);

// Add CSS for voice note and image preview in card
const cardMediaCss = `
    .card-img-preview-box {
      margin: 0.5rem 0;
      border-radius: 8px;
      overflow: hidden;
      max-height: 90px;
      border: 1px solid rgba(201,169,110,0.3);
    }
    .card-review-img { width: 100%; height: 100%; object-fit: cover; }
    .card-audio-voice-bar {
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(201,169,110,0.15);
      border: 1px solid #C9A96E;
      padding: 0.4rem 0.7rem;
      border-radius: 20px;
    }
    .btn-play-voice-pill {
      background: #C9A96E;
      color: #06130D;
      border: none;
      padding: 3px 10px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.72rem;
      cursor: pointer;
    }
    .voice-wave-min { display: flex; gap: 3px; height: 12px; align-items: flex-end; }
    .voice-wave-min span { width: 2.5px; height: 100%; background: #C9A96E; animation: wave 1s infinite ease-in-out; }
    .voice-wave-min span:nth-child(2) { animation-delay: 0.2s; }
    .voice-wave-min span:nth-child(3) { animation-delay: 0.4s; }
    .voice-wave-min span:nth-child(4) { animation-delay: 0.6s; }
`;

homeContent = homeContent.replace('.review-image3-card {', `${cardMediaCss}\n    .review-image3-card {`);

fs.writeFileSync(homePath, homeContent, 'utf8');
console.log('home.component.ts updated with multimedia review elements.');
