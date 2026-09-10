import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, AgentResponse } from '../../../core/services/api.service';
import { AudioService } from '../../../core/services/audio.service';

interface ChatMessage {
  sender: 'saud' | 'farah' | 'user';
  text: string;
  expression?: string;
  time: string;
  followUps?: { label: string; value: string; icon?: string }[];
  isAction?: boolean;
}

@Component({
  selector: 'app-saud-farah-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="agent-experience-section section-padding" id="smart-agents">
      <div class="container">
        <!-- Section Header -->
        <div class="section-badge-center">
          <span class="badge-gold">المرشدان الذكيان</span>
          <h2 class="section-title">تحدث مع <span class="gold-gradient-text">سعود وفرح</span></h2>
          <p class="section-desc">تجربة تفاعلية ذكية تفهم احتياجك بدقة، توضح لك الخيارات المناسبة، وتقدّر لك التكلفة والوقت فوراً.</p>
        </div>

        <div class="agent-interface-grid">
          <!-- Character Stage / Visual Presence -->
          <div class="character-showcase glass-panel tilt-card-3d" (mousemove)="onCardTilt($event)" (mouseleave)="onCardTiltReset($event)">
            <!-- Agent Switcher Tabs -->
            <div class="agent-tabs">
              <button 
                class="agent-tab-btn" 
                [class.active]="activeAgent === 'saud'"
                (click)="switchAgent('saud')">
                <div class="tab-avatar saud-avatar">🇸🇦</div>
                <div class="tab-info">
                  <span class="tab-name">سعود</span>
                  <span class="tab-role">مساعد الأسعار والطلبات</span>
                </div>
              </button>

              <button 
                class="agent-tab-btn" 
                [class.active]="activeAgent === 'farah'"
                (click)="switchAgent('farah')">
                <div class="tab-avatar farah-avatar">🎓</div>
                <div class="tab-info">
                  <span class="tab-name">فرح</span>
                  <span class="tab-role">المرشدة الأكاديمية</span>
                </div>
              </button>
            </div>

            <!-- Active Mascot 3D Showcase Stage -->
            <div class="mascot-stage">
              <!-- Saud Mascot 3D -->
              <div class="mascot-card" *ngIf="activeAgent === 'saud'" [ngClass]="currentExpression">
                <div class="mascot-illustration-3d floating-element">
                  <div class="character-frame-3d">
                    <div class="pedestal-glow"></div>
                    <img src="assets/images/saud_3d.jpg" alt="سعود — مستشار الأسعار والطلبات" class="mascot-photo-3d" />
                    <div class="pedestal-badge">
                      <span class="role-badge">المستشار سعود 🇸🇦</span>
                    </div>
                  </div>
                  <div class="mascot-speech-bubble">
                    <span class="bubble-tag">سعود يرحب بك:</span>
                    <p>"أهلاً يا بطل! جاهز أحسب لك تكلفة طلبك وأرتب لك كافة الخيارات الأكاديمية فوراً."</p>
                  </div>
                </div>
              </div>

              <!-- Farah Mascot 3D -->
              <div class="mascot-card" *ngIf="activeAgent === 'farah'" [ngClass]="currentExpression">
                <div class="mascot-illustration-3d floating-element">
                  <div class="character-frame-3d">
                    <div class="pedestal-glow farah-glow"></div>
                    <img src="assets/images/farah_3d.jpg" alt="فرح — المرشدة الأكاديمية" class="mascot-photo-3d" />
                    <div class="pedestal-badge">
                      <span class="role-badge farah-tag">المرشدة فرح 🎓</span>
                    </div>
                  </div>
                  <div class="mascot-speech-bubble">
                    <span class="bubble-tag farah-tag-text">فرح ترشدك:</span>
                    <p>"أهلاً وسهلاً! يسعدني مرافقتك لتحديد خطتك الأكاديمية وضمان أعلى درجات الإتقان والتميز."</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Service Actions -->
            <div class="quick-chips">
              <span class="chips-title">خيارات سريعة:</span>
              <div class="chips-list">
                <button class="chip-btn" (click)="sendQuickPrompt('أحتاج بحث علمي 25 صفحة')">📚 بحث علمي</button>
                <button class="chip-btn" (click)="sendQuickPrompt('عندي مشروع تخرج وأبي مساعدة')">🎓 مشروع تخرج</button>
                <button class="chip-btn" (click)="sendQuickPrompt('كم سعر تصميم عرض تقديمي؟')">🎨 تصميم عرض</button>
                <button class="chip-btn" (click)="sendQuickPrompt('أبي سيرة ذاتية احترافية ATS')">📄 سيرة ذاتية</button>
              </div>
            </div>
          </div>

          <!-- Interactive Live Chat Window -->
          <div class="chat-terminal glass-panel">
            <div class="terminal-header">
              <div class="terminal-agent-status">
                <span class="status-indicator"></span>
                <span class="status-text">{{ activeAgent === 'saud' ? 'سعود (متصل الآن)' : 'فرح (متصلة الآن)' }}</span>
              </div>
              <button class="btn-clear-chat" (click)="clearChat()" title="بدء محادثة جديدة">
                <span>🔄 إعادة ضبط</span>
              </button>
            </div>

            <!-- Messages Stream -->
            <div class="messages-container" #messagesContainer>
              <div 
                *ngFor="let msg of messages" 
                class="chat-bubble-row" 
                [class.user-row]="msg.sender === 'user'"
                [class.agent-row]="msg.sender !== 'user'">
                
                <div class="sender-badge" *ngIf="msg.sender !== 'user'">
                  {{ msg.sender === 'saud' ? 'سعود 🇸🇦' : 'فرح 🎓' }}
                </div>

                <div class="bubble-content">
                  <p class="bubble-text">{{ msg.text }}</p>
                  
                  <!-- Interactive Options / Suggestions within bubble -->
                  <div class="bubble-options" *ngIf="msg.followUps && msg.followUps.length">
                    <button 
                      *ngFor="let opt of msg.followUps" 
                      class="followup-pill" 
                      (click)="onOptionSelected(opt.label)">
                      <span>{{ opt.icon }}</span>
                      <span>{{ opt.label }}</span>
                    </button>
                  </div>

                  <!-- WhatsApp Transfer CTA if completed -->
                  <div *ngIf="msg.isAction" class="order-transfer-card">
                    <div class="transfer-title">ملخص طلبك جاهز للإرسال! ✨</div>
                    <button class="btn-whatsapp-direct" (click)="sendToWhatsApp(msg.text)">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.676.15-.2.301-.776.98-1.026 1.281-.25.301-.45.301-.75.15-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.462.131-.611.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.002-2.23-.275-.6-.576-.525-.776-.525-.2 0-.426-.025-.651-.025-.226 0-.602.075-.927.426-.326.35-1.253 1.226-1.253 2.984 0 1.758 1.278 3.46 1.454 3.71.175.25 2.511 3.834 6.084 5.378.85.367 1.514.587 2.031.751.854.271 1.631.233 2.246.141.685-.102 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.126-.275-.226-.576-.376z"/>
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                      </svg>
                      <span>تأكيد وإرسال عبر واتساب فوراً</span>
                    </button>
                  </div>

                  <span class="bubble-time">{{ msg.time }}</span>
                </div>
              </div>

              <!-- Typing Indicator -->
              <div *ngIf="isTyping" class="typing-indicator-row">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
              </div>
            </div>

            <!-- Input Area -->
            <div class="chat-input-bar">
              <input 
                type="text" 
                class="chat-input" 
                [(ngModel)]="userInput" 
                (keyup.enter)="sendMessage()" 
                [placeholder]="activeAgent === 'saud' ? 'اكتب لسعود (مثال: كم سعر بحث 15 صفحة؟)...' : 'اكتبي لفرح (مثال: عندي فكرة مشروع تخرج)...'" />
              
              <button class="btn-send" (click)="sendMessage()" [disabled]="!userInput.trim()">
                <span>إرسال</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .agent-experience-section {
      background: linear-gradient(180deg, #091712 0%, #0F251C 50%, #0B1C15 100%);
      position: relative;
    }

    .section-badge-center {
      text-align: center;
      max-width: 760px;
      margin: 0 auto 3.5rem auto;
    }

    .badge-gold {
      background: rgba(201, 169, 110, 0.15);
      color: #DFC698;
      border: 1px solid rgba(201, 169, 110, 0.4);
      padding: 0.35rem 1.2rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 0.8rem;
    }

    .section-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      color: #FFFFFF;
      margin-bottom: 0.8rem;
    }

    .section-desc {
      color: #A3B8B0;
      font-size: 1.05rem;
    }

    .agent-interface-grid {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 2rem;
      align-items: stretch;
    }

    /* Character Showcase Column */
    .character-showcase {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .agent-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .agent-tab-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(201, 169, 110, 0.2);
      border-radius: var(--radius-md);
      padding: 0.8rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.3s;
      text-align: right;
    }

    .agent-tab-btn.active {
      background: rgba(201, 169, 110, 0.15);
      border-color: #C9A96E;
      box-shadow: 0 0 20px rgba(201, 169, 110, 0.25);
    }

    .tab-avatar {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      background: #1B4332;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #C9A96E;
    }

    .tab-info {
      display: flex;
      flex-direction: column;
    }

    .tab-name {
      color: #FFFFFF;
      font-weight: 700;
      font-size: 1.05rem;
    }

    .tab-role {
      color: #A3B8B0;
      font-size: 0.75rem;
    }

    .mascot-stage {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 310px;
    }

    .mascot-card {
      text-align: center;
      width: 100%;
    }

    .mascot-illustration-3d {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .character-frame-3d {
      position: relative;
      width: 180px;
      height: 180px;
      margin: 0 auto 0.8rem auto;
      border-radius: 50%;
      padding: 6px;
      background: linear-gradient(135deg, #C9A96E 0%, #1B4332 50%, #DFC698 100%);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(201, 169, 110, 0.35);
    }

    .mascot-photo-3d {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      border: 3px solid #06130D;
    }

    .pedestal-glow {
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.4) 0%, transparent 70%);
      filter: blur(8px);
      z-index: -1;
      animation: pulseGlow 3s infinite;
    }

    .pedestal-glow.farah-glow {
      background: radial-gradient(circle, rgba(82, 183, 136, 0.5) 0%, transparent 70%);
    }

    .pedestal-badge {
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      z-index: 5;
    }

    .role-badge {
      background: linear-gradient(135deg, #1B4332, #0B1C15);
      color: #DFC698;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: var(--radius-full);
      border: 1px solid #C9A96E;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    }

    .role-badge.farah-tag {
      background: linear-gradient(135deg, #2D6A4F, #112A1F);
      color: #F8F6F0;
      border-color: #52B788;
    }

    .bubble-tag.farah-tag-text {
      color: #52B788;
    }

    .mascot-speech-bubble {
      margin-top: 0.6rem;
      background: rgba(11, 28, 21, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(201, 169, 110, 0.35);
      border-radius: var(--radius-md);
      padding: 0.8rem 1.2rem;
      max-width: 320px;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    }

    .bubble-tag {
      color: #DFC698;
      font-size: 0.78rem;
      font-weight: 700;
      display: block;
      margin-bottom: 2px;
    }

    .mascot-speech-bubble p {
      color: #FFFFFF;
      font-size: 0.92rem;
      line-height: 1.5;
    }

    .quick-chips {
      margin-top: 1.5rem;
      border-top: 1px solid rgba(201, 169, 110, 0.15);
      padding-top: 1.2rem;
    }

    .chips-title {
      font-size: 0.8rem;
      color: #C9A96E;
      display: block;
      margin-bottom: 0.6rem;
      font-weight: 600;
    }

    .chips-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .chip-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(201, 169, 110, 0.25);
      color: #E2EAE6;
      border-radius: var(--radius-full);
      padding: 0.4rem 0.9rem;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .chip-btn:hover {
      background: rgba(201, 169, 110, 0.2);
      border-color: #C9A96E;
      color: #FFFFFF;
      transform: translateY(-2px);
    }

    /* Chat Terminal Column */
    .chat-terminal {
      display: flex;
      flex-direction: column;
      height: 580px;
      overflow: hidden;
    }

    .terminal-header {
      padding: 1.1rem 1.5rem;
      border-bottom: 1px solid rgba(201, 169, 110, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(11, 28, 21, 0.6);
    }

    .terminal-agent-status {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .status-indicator {
      width: 9px;
      height: 9px;
      background: #52B788;
      border-radius: 50%;
      box-shadow: 0 0 10px #52B788;
    }

    .status-text {
      color: #FFFFFF;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .btn-clear-chat {
      color: #A3B8B0;
      font-size: 0.8rem;
      cursor: pointer;
      background: none;
      border: none;
      transition: color 0.2s;
    }

    .btn-clear-chat:hover {
      color: #DFC698;
    }

    .messages-container {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .mascot-eye {
      transform-origin: center;
      animation: eyeBlink 4s infinite;
    }

    @keyframes eyeBlink {
      0%, 96%, 100% { transform: scaleY(1); }
      98% { transform: scaleY(0.1); }
    }

    .chat-bubble-row {
      display: flex;
      flex-direction: column;
      max-width: 82%;
      animation: bubbleSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes bubbleSlideIn {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .chat-bubble-row.user-row {
      align-self: flex-start; /* in RTL, flex-start is right side */
    }

    .chat-bubble-row.agent-row {
      align-self: flex-end; /* in RTL, flex-end is left side */
    }

    .sender-badge {
      font-size: 0.72rem;
      color: #DFC698;
      margin-bottom: 4px;
      font-weight: 600;
    }

    .bubble-content {
      padding: 1rem 1.2rem;
      border-radius: 18px;
      position: relative;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .user-row .bubble-content {
      background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%);
      color: #FFFFFF;
      border: 1px solid rgba(201, 169, 110, 0.4);
      border-bottom-right-radius: 4px;
    }

    .agent-row .bubble-content {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      color: #F8F6F0;
      border: 1px solid rgba(201, 169, 110, 0.3);
      border-bottom-left-radius: 4px;
    }

    .bubble-text {
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .bubble-options {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.8rem;
    }

    .followup-pill {
      background: rgba(201, 169, 110, 0.15);
      border: 1px solid rgba(201, 169, 110, 0.35);
      color: #DFC698;
      padding: 0.35rem 0.8rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .followup-pill:hover {
      background: #C9A96E;
      color: #0B1C15;
    }

    .order-transfer-card {
      margin-top: 1rem;
      background: rgba(27, 67, 50, 0.7);
      border: 1px solid #52B788;
      border-radius: 12px;
      padding: 0.9rem;
      text-align: center;
    }

    .transfer-title {
      font-size: 0.85rem;
      color: #DFC698;
      font-weight: 700;
      margin-bottom: 0.6rem;
    }

    .btn-whatsapp-direct {
      background: #25D366;
      color: #0B1C15;
      font-weight: 700;
      padding: 0.6rem 1.2rem;
      border-radius: var(--radius-full);
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.9rem;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
      transition: transform 0.2s;
    }

    .btn-whatsapp-direct:hover {
      transform: scale(1.03);
    }

    .bubble-time {
      font-size: 0.68rem;
      color: #8C9E96;
      display: block;
      margin-top: 4px;
      text-align: left;
    }

    .typing-indicator-row {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0.6rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      width: fit-content;
    }

    .typing-indicator-row .dot {
      width: 6px;
      height: 6px;
      background: #C9A96E;
      border-radius: 50%;
      animation: bounce 1.2s infinite ease-in-out;
    }

    .typing-indicator-row .dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator-row .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-6px); }
    }

    .chat-input-bar {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(201, 169, 110, 0.2);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(11, 28, 21, 0.7);
    }

    .chat-input {
      flex: 1;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(201, 169, 110, 0.3);
      border-radius: var(--radius-full);
      padding: 0.75rem 1.2rem;
      color: #FFFFFF;
      font-size: 0.95rem;
      font-family: var(--font-family-arabic);
      outline: none;
      transition: border-color 0.2s;
    }

    .chat-input:focus {
      border-color: #C9A96E;
      background: rgba(255, 255, 255, 0.12);
    }

    .btn-send {
      background: linear-gradient(135deg, #C9A96E 0%, #A48348 100%);
      color: #0B1C15;
      font-weight: 700;
      border-radius: var(--radius-full);
      padding: 0.75rem 1.4rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }

    .btn-send:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-send:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(201, 169, 110, 0.4);
    }

    @media (max-width: 992px) {
      .agent-interface-grid {
        grid-template-columns: 1fr;
      }
      .chat-terminal {
        height: 500px;
      }
    }
  `]
})
export class SaudFarahAgentComponent implements OnInit {
  api = inject(ApiService);
  audio = inject(AudioService);

  activeAgent: 'saud' | 'farah' = 'saud';
  currentExpression: string = 'happy';
  userInput: string = '';
  isTyping: boolean = false;
  messages: ChatMessage[] = [];

  ngOnInit(): void {
    this.initWelcomeMessage();
  }

  switchAgent(agent: 'saud' | 'farah'): void {
    this.activeAgent = agent;
    this.audio.playClick();
    this.initWelcomeMessage();
  }

  private initWelcomeMessage(): void {
    const time = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    if (this.activeAgent === 'saud') {
      this.messages = [{
        sender: 'saud',
        text: 'هلا وغلا! 👋 أنا سعود، مساعدك في اختيار الخدمات وحساب التكلفة. وش تحتاج نسوي لك اليوم؟',
        time,
        followUps: [
          { label: '📚 بحوث وتقارير', value: 'research', icon: '📚' },
          { label: '🎓 مشروع تخرج', value: 'graduation', icon: '🎓' },
          { label: '💰 استفسار عن الأسعار', value: 'pricing', icon: '💰' },
          { label: '💻 برمجة ومشاريع تقنية', value: 'tech', icon: '💻' }
        ]
      }];
    } else {
      this.messages = [{
        sender: 'farah',
        text: 'أهلاً بك! 🌸 أنا فرح، مرشدتك الأكاديمية والبحثية. يسعدني توجيهك واختيار الخطة الأكاديمية الأنسب لك.',
        time,
        followUps: [
          { label: '✨ استشارة لاختيار الخدمة', value: 'consultation', icon: '✨' },
          { label: '📖 تدقيق ومراجعة رسائل', value: 'review', icon: '📖' },
          { label: '🎨 تصميم عروض تفاعلية', value: 'presentation', icon: '🎨' },
          { label: '📄 إعداد سيرة ذاتية احترافية', value: 'cv', icon: '📄' }
        ]
      }];
    }
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const userText = this.userInput.trim();
    this.userInput = '';
    const time = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

    this.messages.push({
      sender: 'user',
      text: userText,
      time
    });

    this.audio.playClick();
    this.isTyping = true;

    // Call API Agent or fallback logic
    this.api.sendAgentMessage({
      agentType: this.activeAgent,
      message: userText
    }).subscribe(res => {
      this.isTyping = false;
      this.audio.playNotification();

      // Trigger Confetti celebration if order or pricing completed
      if (userText.includes('طلب') || userText.includes('سعر') || userText.includes('مشروع') || userText.includes('بحث')) {
        this.triggerCelebration();
      }

      this.messages.push({
        sender: this.activeAgent,
        text: res.responseAr || (this.activeAgent === 'saud' 
          ? `ممتاز جداً! فهمت متطلبك بخصوص "${userText}". جهزت لك مسار الخدمة وسأرسل لك ملخصاً جاهزاً للواتساب.`
          : `أهلاً بك، متطلب "${userText}" يحظى بعناية خاصة من فريقنا الأكاديمي المتخصص. إليك الإجراء الأنسب:`),
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        followUps: res.followUpOptions,
        isAction: true
      });
    });
  }

  sendQuickPrompt(text: string): void {
    this.userInput = text;
    this.sendMessage();
  }

  onOptionSelected(optionText: string): void {
    this.userInput = optionText;
    this.sendMessage();
  }

  clearChat(): void {
    this.audio.playClick();
    this.initWelcomeMessage();
  }

  sendToWhatsApp(context: string): void {
    const text = encodeURIComponent(`السلام عليكم، تحدثت مع ${this.activeAgent === 'saud' ? 'سعود' : 'فرح'} في موقع أم رهام وأرغب في تأكيد الطلب التالي:\n\n${context}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  onCardTilt(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    target.style.setProperty('--card-mouse-x', `${(x / rect.width) * 100}%`);
    target.style.setProperty('--card-mouse-y', `${(y / rect.height) * 100}%`);
    target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  onCardTiltReset(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  private async triggerCelebration(): Promise<void> {
    try {
      const confettiMod = await import('canvas-confetti');
      const confettiFn = (confettiMod as any).default || confettiMod;
      if (typeof confettiFn === 'function') {
        confettiFn({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#C9A96E', '#DFC698', '#1B4332', '#52B788']
        });
      }
    } catch {
      // Ignore
    }
  }
}
