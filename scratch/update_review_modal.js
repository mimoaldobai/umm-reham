const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/USERW/Desktop/om reham/frontend/src/app/shared/components/add-review-modal/add-review-modal.component.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Insert fields into class
const newProps = `  mediaType: 'text' | 'image' | 'audio' | 'combined' = 'text';
  imageUrl = '';
  audioUrl = '';
  isRecording = false;
  recordingSeconds = 0;
  recordingInterval: any = null;
`;

content = content.replace('  rating = 5;', `${newProps}  rating = 5;`);

// Insert Media Type selector into Template before comment field
const mediaTypeTemplate = `
          <!-- Media Type Selector -->
          <div class="form-group media-type-group">
            <label>نوع التقييم والوسائط المرفقة <span class="badge-discount">نص • صورة • صوت • شامل</span></label>
            <div class="media-type-pills">
              <button type="button" class="type-pill" [class.active]="mediaType === 'text'" (click)="mediaType = 'text'; audio.playClick()">
                📝 نصي
              </button>
              <button type="button" class="type-pill" [class.active]="mediaType === 'image'" (click)="mediaType = 'image'; audio.playClick()">
                🖼️ صورة / لقطة شاشة
              </button>
              <button type="button" class="type-pill" [class.active]="mediaType === 'audio'" (click)="mediaType = 'audio'; audio.playClick()">
                🎙️ بصمة صوتية
              </button>
              <button type="button" class="type-pill" [class.active]="mediaType === 'combined'" (click)="mediaType = 'combined'; audio.playClick()">
                ✨ شامل (كل الوسائط)
              </button>
            </div>
          </div>

          <!-- Image Attachment Box -->
          <div class="form-group" *ngIf="mediaType === 'image' || mediaType === 'combined'">
            <label>رابط أو لقطة شاشة التقييم (صورة)</label>
            <input type="url" class="form-control" [(ngModel)]="imageUrl" name="imageUrl" placeholder="https://example.com/screenshot.jpg" dir="ltr" />
            <small class="field-hint">يمكنك وضع رابط صورة التقييم أو نتيجة البحث المنجز</small>
            <div *ngIf="imageUrl" class="img-preview-box">
              <img [src]="imageUrl" alt="معاينة التقييم" class="review-preview-img" />
            </div>
          </div>

          <!-- Audio Attachment Box -->
          <div class="form-group" *ngIf="mediaType === 'audio' || mediaType === 'combined'">
            <label>تسجيل المذكرة الصوتية أو وضع الرابط الصوتي</label>
            <div class="audio-input-row">
              <input type="url" class="form-control" [(ngModel)]="audioUrl" name="audioUrl" placeholder="https://example.com/voice.mp3" dir="ltr" />
              <button type="button" class="btn-record-sim" [class.recording]="isRecording" (click)="toggleRecording()">
                {{ isRecording ? ('⏹️ إيقاف (' + recordingSeconds + 'ث)') : '🎙️ تسجيل صوتي مباشر' }}
              </button>
            </div>
            <div *ngIf="audioUrl" class="audio-preview-card">
              <button type="button" class="btn-play-preview" (click)="audio.playClick()">▶ تشغيل المعاينة الصوتية</button>
              <span class="audio-wave-anim"><span></span><span></span><span></span><span></span></span>
            </div>
          </div>
`;

content = content.replace('<!-- 6. Comment / Review -->', `${mediaTypeTemplate}\n          <!-- 6. Comment / Review -->`);

// Update onSubmit method call
content = content.replace(
  `this.api.submitReview({\n      clientName: this.clientName.trim(),\n      clientPhone: fullPhone,\n      clientEmail: this.clientEmail.trim(),\n      country: this.country,\n      city: this.city.trim(),\n      clientUniversity: this.clientUniversity.trim(),\n      contentAr: this.contentAr.trim(),\n      rating: this.rating\n    })`,
  `this.api.submitReview({\n      clientName: this.clientName.trim(),\n      clientPhone: fullPhone,\n      clientEmail: this.clientEmail.trim(),\n      country: this.country,\n      city: this.city.trim(),\n      clientUniversity: this.clientUniversity.trim(),\n      contentAr: this.contentAr.trim(),\n      rating: this.rating,\n      mediaType: this.mediaType,\n      imageUrl: this.imageUrl,\n      audioUrl: this.audioUrl\n    })`
);

// Add toggleRecording helper method inside class
const recordingMethod = `  toggleRecording(): void {
    if (this.isRecording) {
      this.isRecording = false;
      clearInterval(this.recordingInterval);
      if (!this.audioUrl) {
        this.audioUrl = 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg';
      }
      this.audio.playSuccess();
    } else {
      this.isRecording = true;
      this.recordingSeconds = 0;
      this.audio.playClick();
      this.recordingInterval = setInterval(() => {
        this.recordingSeconds++;
      }, 1000);
    }
  }
`;

content = content.replace('  setRating(val: number): void {', `${recordingMethod}\n  setRating(val: number): void {`);

// Add CSS styles for media selector
const newStyles = `
    .media-type-pills {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
      margin-top: 0.3rem;
    }
    .type-pill {
      flex: 1;
      min-width: 100px;
      padding: 0.5rem 0.6rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(201,169,110,0.3);
      color: #A3B8B0;
      border-radius: var(--radius-md);
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .type-pill.active {
      background: rgba(201,169,110,0.25);
      border-color: #C9A96E;
      color: #DFC698;
      box-shadow: 0 0 10px rgba(201,169,110,0.3);
    }
    .img-preview-box {
      margin-top: 0.5rem;
      border-radius: var(--radius-md);
      overflow: hidden;
      max-height: 140px;
      border: 1px solid rgba(201,169,110,0.4);
    }
    .review-preview-img { width: 100%; height: 100%; object-fit: cover; }
    .audio-input-row { display: flex; gap: 0.5rem; }
    .btn-record-sim {
      padding: 0.75rem 0.85rem;
      background: #1B4332;
      border: 1px solid #52B788;
      color: #FFFFFF;
      border-radius: var(--radius-md);
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn-record-sim.recording { background: #B91C1C; border-color: #EF4444; }
    .audio-preview-card {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(201,169,110,0.12);
      border: 1px solid #C9A96E;
      padding: 0.5rem 0.8rem;
      border-radius: var(--radius-md);
    }
    .btn-play-preview {
      background: #C9A96E;
      color: #06130D;
      border: none;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 800;
      font-size: 0.76rem;
      cursor: pointer;
    }
    .audio-wave-anim { display: flex; gap: 3px; align-items: flex-end; height: 16px; }
    .audio-wave-anim span { width: 3px; height: 100%; background: #C9A96E; animation: wave 1s infinite ease-in-out; }
    .audio-wave-anim span:nth-child(2) { animation-delay: 0.2s; }
    .audio-wave-anim span:nth-child(3) { animation-delay: 0.4s; }
    .audio-wave-anim span:nth-child(4) { animation-delay: 0.6s; }
    @keyframes wave { 0%,100% { height: 4px; } 50% { height: 16px; } }
`;

content = content.replace('    .form-group {', `${newStyles}\n    .form-group {`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('add-review-modal updated with multi-media options.');
