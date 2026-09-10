import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaudFarahAgentService, AgentChatMessage } from '../../../core/services/saud-farah-agent.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-saud-farah-dock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- 1. SLEEK FLOATING AI ASSISTANT TRIGGER BUTTON (أسفل يسار الشاشة بتصميم أنيق فاخر) -->
    <div class="agent-floating-dock" [class.dock-hidden]="agentService.isDockOpen$ | async">
      <button class="dock-launcher-btn" (click)="openDock()" title="محادثة ذكية فورية مع المستشار سعود والمرشدة فرح">
        <div class="duo-avatar-stack">
          <div class="mini-avatar farah-mini">
            <img src="assets/images/farah_3d.jpg" alt="فرح" />
          </div>
          <div class="mini-avatar saud-mini">
            <img src="assets/images/saud_3d.jpg" alt="سعود" />
          </div>
        </div>

        <div class="dock-btn-text">
          <strong>سعود وفرح</strong>
        </div>

        <div class="launcher-chat-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </button>
    </div>

    <!-- 2. EXPANDED LUXURY DUAL-AGENT CHAT MODAL -->
    <div *ngIf="agentService.isDockOpen$ | async" class="chat-modal-backdrop" (click)="closeDock()">
      <div class="chat-modal-box" (click)="$event.stopPropagation()">
        
        <!-- Modal Top Bar -->
        <div class="chat-header-bar">
          <div class="header-agents-info">
            <div class="duo-avatars-header">
              <div class="header-avatar farah" [class.speaking]="agentService.currentSpeakingAgent() === 'farah'">
                <img src="assets/images/farah_3d.jpg" alt="فرح" />
                <span class="voice-wave" *ngIf="agentService.currentSpeakingAgent() === 'farah'"></span>
              </div>
              <div class="header-avatar saud" [class.speaking]="agentService.currentSpeakingAgent() === 'saud'">
                <img src="assets/images/saud_3d.jpg" alt="سعود" />
                <span class="voice-wave" *ngIf="agentService.currentSpeakingAgent() === 'saud'"></span>
              </div>
            </div>
            <div>
              <div class="header-title-row">
                <h3>{{ agentService.maleName() }} و{{ agentService.femaleName() }} 🇸🇦</h3>
                <span class="live-badge">متاحان الآن</span>
              </div>
              <small class="header-subtitle">المرشدان الذكيان للأسعار والدراسات العليا</small>
            </div>
          </div>

          <div class="header-actions">
            <!-- Replay Welcome Intro -->
            <button class="icon-btn" (click)="agentService.startWelcomeIntro()" title="مشاهدة الاستقبال السينمائي 🎬">
              <span>🎬</span>
            </button>
            <!-- Voice Mute Toggle -->
            <button class="icon-btn" (click)="toggleMute()" [title]="agentService.isVoiceMuted() ? 'تفعيل الصوت' : 'كتم الصوت'">
              <span>{{ agentService.isVoiceMuted() ? '🔇' : '🔊' }}</span>
            </button>
            <!-- Close Modal -->
            <button class="icon-btn close-btn" (click)="closeDock()" title="تصغير المحادثة">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Quick Topic Chips -->
        <div class="quick-inquiries-ribbon">
          <button class="inquiry-chip" (click)="sendQuickQuery('كم سعر تصميم وبرمجة موقع إلكتروني؟')">
            💻 كم سعر تصميم موقع؟
          </button>
          <button class="inquiry-chip" (click)="sendQuickQuery('كم سعر إعداد خطة بحث ماجستير كاملة؟')">
            📚 سعر خطة بحث ماجستير
          </button>
          <button class="inquiry-chip" (click)="sendQuickQuery('أحتاج تحليل إحصائي SPSS ومناقشة النتائج')">
            📊 تحليل إحصائي SPSS
          </button>
          <button class="inquiry-chip" (click)="sendQuickQuery('هل يتضمن العمل فحص Turnitin وتدقيق لغوي؟')">
            🛡️ فحص Turnitin والأصالة
          </button>
        </div>

        <!-- Chat Conversation Messages Body -->
        <div class="chat-messages-body" #scrollBody>
          <div *ngFor="let msg of agentService.messages$ | async" class="chat-message-row" [ngClass]="msg.sender">
            
            <!-- Agent Avatar -->
            <div class="message-avatar" *ngIf="msg.sender !== 'user'">
              <img [src]="msg.avatarUrl" [alt]="msg.senderNameAr" />
            </div>

            <!-- Message Bubble Content -->
            <div class="message-bubble-box" [class.special-offer-bubble]="msg.isSpecialOffer">
              
              <!-- Sender Header -->
              <div class="message-meta-header">
                <strong class="sender-name">{{ msg.senderNameAr }}</strong>
                <span class="message-time">{{ msg.time }}</span>
                <button 
                  *ngIf="msg.sender !== 'user'" 
                  class="btn-replay-voice" 
                  (click)="replayMessageVoice(msg)" 
                  title="استماع للصوت">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
              </div>

              <!-- Text Message -->
              <p class="message-text">{{ msg.text }}</p>

              <!-- Special Offer Price Capsule (From Farah) -->
              <div *ngIf="msg.isSpecialOffer" class="discount-capsule-card">
                <div class="discount-badge-head">
                  <span class="sparkle-icon">🎁</span>
                  <span>عرض حصري للعميل الجديد</span>
                </div>
                <div class="prices-comparison">
                  <span class="old-price">{{ msg.originalPrice }} ر.س</span>
                  <span class="arrow-sep">←</span>
                  <span class="new-price">{{ msg.discountPrice }} ر.س فقط!</span>
                </div>
                <!-- Direct WhatsApp Booking Button -->
                <a 
                  *ngIf="msg.whatsappCtaUrl" 
                  [href]="msg.whatsappCtaUrl" 
                  target="_blank" 
                  class="btn-book-offer"
                  (click)="audio.playClick()">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span>اعتماد العرض ({{ msg.discountPrice }} ر.س) عبر واتساب</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        <!-- Voice Listening Overlay Bar -->
        <div *ngIf="agentService.isListening()" class="voice-listening-bar">
          <div class="voice-pulse-ring"></div>
          <span>🎙️ جارِ الاستماع لصوتك الآن... تحدث وسيقوم سعود وفرح بالرد فوراً</span>
        </div>

        <!-- Input Compose Box -->
        <div class="chat-input-row">
          <!-- Microphone Voice Button -->
          <button 
            class="mic-record-btn" 
            [class.active-listening]="agentService.isListening()" 
            (click)="toggleVoiceInput()"
            [title]="agentService.isListening() ? 'إيقاف التسجيل' : 'تحدث صوتياً'">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          </button>

          <!-- Text Input -->
          <input 
            type="text" 
            class="chat-text-input" 
            [(ngModel)]="userInputText" 
            (keyup.enter)="sendMessage()" 
            placeholder="اكتب سؤالك أو اضغط على الميكروفون للتحدث..." />

          <!-- Send Button -->
          <button class="send-msg-btn" (click)="sendMessage()" [disabled]="!userInputText.trim()">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* 1. SLEEK COMPACT FLOATING AI LAUNCHER */
    .agent-floating-dock {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 990;
      display: flex;
      direction: rtl;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .dock-hidden {
      opacity: 0;
      pointer-events: none;
      transform: translateY(16px) scale(0.9);
    }

    .dock-launcher-btn {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(12px);
      border: 1.5px solid #C9A96E;
      border-radius: 9999px;
      padding: 0.28rem 0.75rem 0.28rem 0.35rem;
      color: #1B4332;
      box-shadow: 0 4px 18px rgba(27, 67, 50, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: inherit;
    }

    .dock-launcher-btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 25px rgba(201, 169, 110, 0.3);
      border-color: #D4AF37;
    }

    .duo-avatar-stack {
      display: flex;
      align-items: center;
      position: relative;
    }

    .mini-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      border: 1.5px solid #C9A96E;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      background: #F4EFE6;
    }

    .mini-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .saud-mini {
      margin-right: -8px;
      position: relative;
      z-index: 2;
    }

    .farah-mini {
      position: relative;
      z-index: 1;
    }

    .dock-btn-text strong {
      font-size: 0.78rem;
      font-weight: 800;
      color: #1B4332;
      line-height: 1;
      white-space: nowrap;
    }

    .launcher-chat-icon {
      font-size: 0.85rem;
    }

    /* 2. CHAT MODAL BOX */
    .chat-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      padding: 2rem 2.5rem;
      direction: rtl;
      animation: fadeIn 0.25s ease-out;
    }

    .chat-modal-box {
      width: 100%;
      max-width: 480px;
      height: 620px;
      max-height: 85vh;
      background: linear-gradient(160deg, rgba(27, 67, 50, 0.95) 0%, rgba(11, 28, 21, 0.98) 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.4);
      border-radius: 24px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUpModal {
      from { transform: translateY(50px) scale(0.95); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }

    /* Top Bar */
    .chat-header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.2rem;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      background: rgba(11, 28, 21, 0.7);
    }

    .header-agents-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .duo-avatars-header {
      display: flex;
      align-items: center;
      position: relative;
    }

    .header-avatar {
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      border: 1.5px solid #D4AF37;
    }

    .header-avatar.farah {
      margin-left: -10px;
      z-index: 2;
      border-color: #E9D5FF;
    }

    .header-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .header-title-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title-row h3 {
      font-size: 0.95rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0;
    }

    .live-badge {
      font-size: 0.65rem;
      font-weight: 700;
      padding: 0.15rem 0.5rem;
      border-radius: 10px;
      background: rgba(16, 185, 129, 0.2);
      color: #6EE7B7;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .header-subtitle {
      font-size: 0.7rem;
      color: #A3C2B6;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .icon-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .icon-btn:hover {
      background: rgba(212, 175, 55, 0.25);
      border-color: #D4AF37;
    }

    /* Quick Inquiries Ribbon */
    .quick-inquiries-ribbon {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.65rem 0.9rem;
      overflow-x: auto;
      white-space: nowrap;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      background: rgba(0, 0, 0, 0.2);
    }

    .quick-inquiries-ribbon::-webkit-scrollbar { height: 3px; }
    .quick-inquiries-ribbon::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 4px; }

    .inquiry-chip {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(212, 175, 55, 0.25);
      color: #E2EAE6;
      padding: 0.32rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.74rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      font-family: inherit;
    }

    .inquiry-chip:hover {
      background: rgba(212, 175, 55, 0.2);
      border-color: #D4AF37;
      color: #FFFFFF;
    }

    /* Messages Body */
    .chat-messages-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .chat-messages-body::-webkit-scrollbar { width: 4px; }
    .chat-messages-body::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 4px; }

    .chat-message-row {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
    }

    .chat-message-row.user {
      justify-content: flex-end;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      border: 1.5px solid #D4AF37;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .message-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .message-bubble-box {
      max-width: 82%;
      background: rgba(11, 28, 21, 0.9);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 16px;
      padding: 0.75rem 0.95rem;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    }

    .chat-message-row.user .message-bubble-box {
      background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%);
      border-color: rgba(212, 175, 55, 0.4);
    }

    .special-offer-bubble {
      border-color: #D4AF37 !important;
      background: linear-gradient(145deg, rgba(27, 67, 50, 0.95) 0%, rgba(45, 25, 10, 0.9) 100%) !important;
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.25) !important;
    }

    .message-meta-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.3rem;
    }

    .sender-name {
      font-size: 0.75rem;
      font-weight: 800;
      color: #D4AF37;
    }

    .chat-message-row.user .sender-name {
      color: #A7F3D0;
    }

    .message-time {
      font-size: 0.65rem;
      color: #839E93;
    }

    .btn-replay-voice {
      background: transparent;
      border: none;
      color: #D4AF37;
      cursor: pointer;
      padding: 2px;
      display: flex;
      align-items: center;
      transition: transform 0.2s;
    }

    .btn-replay-voice:hover { transform: scale(1.2); color: #FFFFFF; }

    .message-text {
      font-size: 0.84rem;
      line-height: 1.55;
      color: #F3F4F6;
      margin: 0;
    }

    /* Special Offer Card */
    .discount-capsule-card {
      margin-top: 0.7rem;
      padding: 0.75rem;
      background: rgba(0, 0, 0, 0.4);
      border: 1px dashed #D4AF37;
      border-radius: 12px;
      text-align: center;
    }

    .discount-badge-head {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
      font-size: 0.75rem;
      font-weight: 800;
      color: #FDE047;
      margin-bottom: 0.35rem;
    }

    .prices-comparison {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 0.6rem;
    }

    .old-price {
      font-size: 0.8rem;
      color: #9CA3AF;
      text-decoration: line-through;
    }

    .arrow-sep {
      color: #D4AF37;
    }

    .new-price {
      font-size: 1rem;
      font-weight: 900;
      color: #34D399;
      background: rgba(16, 185, 129, 0.15);
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
    }

    .btn-book-offer {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      width: 100%;
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      color: #FFFFFF;
      padding: 0.5rem 0.8rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      transition: all 0.25s;
    }

    .btn-book-offer:hover {
      background: #059669;
      transform: translateY(-1px);
    }

    /* Listening Pulse Bar */
    .voice-listening-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(239, 68, 68, 0.18);
      border-top: 1px solid rgba(239, 68, 68, 0.4);
      padding: 0.5rem 1rem;
      font-size: 0.76rem;
      font-weight: 700;
      color: #FCA5A5;
      animation: pulseAlert 1s infinite alternate;
    }

    @keyframes pulseAlert {
      from { background: rgba(239, 68, 68, 0.15); }
      to { background: rgba(239, 68, 68, 0.28); }
    }

    /* Input Row */
    .chat-input-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: rgba(11, 28, 21, 0.95);
      border-top: 1px solid rgba(212, 175, 55, 0.2);
    }

    .mic-record-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1.5px solid rgba(212, 175, 55, 0.4);
      color: #D4AF37;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s;
      flex-shrink: 0;
    }

    .mic-record-btn:hover,
    .mic-record-btn.active-listening {
      background: rgba(239, 68, 68, 0.3);
      border-color: #EF4444;
      color: #FFFFFF;
      box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
    }

    .chat-text-input {
      flex: 1;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 9999px;
      padding: 0.55rem 1.1rem;
      font-size: 0.84rem;
      color: #FFFFFF;
      outline: none;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .chat-text-input:focus {
      border-color: #D4AF37;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
    }

    .send-msg-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D4AF37 0%, #B89228 100%);
      border: none;
      color: #07150E;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .send-msg-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .send-msg-btn:not(:disabled):hover {
      transform: scale(1.08);
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
    }

    @media (max-width: 768px) {
      .chat-modal-backdrop {
        padding: 0;
      }
      .chat-modal-box {
        max-width: 100%;
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
      }
      .agent-floating-dock {
        bottom: 24px;
        left: 16px;
      }
      .dock-launcher-btn {
        padding: 0.35rem 0.75rem 0.35rem 0.4rem;
        gap: 0.45rem;
      }
      .dock-btn-text small {
        display: none;
      }
      .mini-avatar {
        width: 32px;
        height: 32px;
      }
    }
  `]
})
export class SaudFarahDockComponent {
  agentService = inject(SaudFarahAgentService);
  audio = inject(AudioService);

  userInputText = '';

  openDock(): void {
    this.audio.playClick();
    this.agentService.openDock();
  }

  closeDock(): void {
    this.audio.playClick();
    this.agentService.closeDock();
  }

  toggleMute(): void {
    const isMuted = this.agentService.isVoiceMuted();
    this.agentService.isVoiceMuted.set(!isMuted);
  }

  toggleVoiceInput(): void {
    this.audio.playClick();
    this.agentService.toggleVoiceListening();
  }

  sendQuickQuery(query: string): void {
    this.audio.playClick();
    this.agentService.handleUserMessage(query);
  }

  sendMessage(): void {
    if (!this.userInputText.trim()) return;
    const txt = this.userInputText.trim();
    this.userInputText = '';
    this.audio.playClick();
    this.agentService.handleUserMessage(txt);
  }

  replayMessageVoice(msg: AgentChatMessage): void {
    this.audio.playClick();
    this.agentService.speak(msg.audioText || msg.text, msg.sender as 'saud' | 'farah');
  }
}
