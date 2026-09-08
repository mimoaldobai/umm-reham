import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaudFarahAgentService, LipViseme } from '../../../core/services/saud-farah-agent.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-saud-farah-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="agentService.isWelcomeActive$ | async" class="welcome-overlay-backdrop" (click)="skipWelcome()">
      <div class="welcome-stage-container" (click)="$event.stopPropagation()">
        
        <!-- Ambient Atmospheric Beam -->
        <div class="welcome-ambient-glow"></div>

        <!-- Top Stage Banner -->
        <div class="welcome-top-bar">
          <div class="brand-capsule">
            <span class="live-pulse-dot"></span>
            <span>استقبال ذكي تفاعلي • منصة أم رهام 🇸🇦</span>
          </div>
          <div class="stage-controls">
            <button class="stage-btn sound-toggle" (click)="toggleMute()" [title]="agentService.isVoiceMuted() ? 'تشغيل الصوت' : 'كتم الصوت'">
              <span>{{ agentService.isVoiceMuted() ? '🔇 صوت مكتوم' : '🔊 صوت مفعّل' }}</span>
            </button>
            <button class="stage-btn close-btn" (click)="skipWelcome()" title="تخطي للرئيسية">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <span>تخطي</span>
            </button>
          </div>
        </div>

        <!-- Duo Cinematic Arena -->
        <div class="duo-stage-arena">

          <!-- 1. FARAH (Slides in from RIGHT) -->
          <div class="agent-character-pod farah-pod" [class.speaking]="agentService.currentSpeakingAgent() === 'farah'" [class.active-entrance]="farahEntered">
            <div class="character-visual-wrap">
              <!-- Soundwave Halo Aura -->
              <div class="speaking-halo farah-halo" *ngIf="agentService.currentSpeakingAgent() === 'farah'">
                <span class="wave-ring"></span>
                <span class="wave-ring delayed"></span>
              </div>

              <!-- 3D Mascot Image Container -->
              <div class="mascot-frame">
                <img src="assets/images/farah_3d.jpg" alt="المرشدة فرح" class="mascot-img" />
                
                <!-- Animated SVG Lip-Sync Viseme Mouth Overlay -->
                <div class="lip-sync-overlay" [ngClass]="agentService.farahViseme()">
                  <svg viewBox="0 0 60 40" class="lip-svg">
                    <ellipse cx="30" cy="20" rx="14" ry="7" class="lip-outer" />
                    <ellipse cx="30" cy="20" rx="10" ry="4" class="lip-inner" />
                  </svg>
                </div>
              </div>

              <div class="character-nameplate farah-nameplate">
                <span class="name-badge">المرشدة فرح 🎓</span>
                <small class="role-sub">التميز الأكاديمي والعروض</small>
              </div>
            </div>

            <!-- Speech Bubble -->
            <div class="agent-bubble farah-bubble" [class.show]="farahEntered">
              <div class="bubble-speaker-tag">
                <span class="sparkle">🌸</span>
                <span>فرح ترحب بك:</span>
              </div>
              <p class="bubble-message-text">
                "أهلاً وسهلاً بك في <strong>منصة أم رهام</strong>! نورتنا 🌸 أنا فرح، مرشدتك لتنسيق أبحاثك وضمان أعلى درجات التميز وفحص Turnitin بنسبة 0% اقتباس!"
              </p>
              <div class="speaking-cadence-bars" *ngIf="agentService.currentSpeakingAgent() === 'farah'">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <!-- 2. SAUD (Slides in from LEFT) -->
          <div class="agent-character-pod saud-pod" [class.speaking]="agentService.currentSpeakingAgent() === 'saud'" [class.active-entrance]="saudEntered">
            <div class="character-visual-wrap">
              <!-- Soundwave Halo Aura -->
              <div class="speaking-halo saud-halo" *ngIf="agentService.currentSpeakingAgent() === 'saud'">
                <span class="wave-ring"></span>
                <span class="wave-ring delayed"></span>
              </div>

              <!-- 3D Mascot Image Container -->
              <div class="mascot-frame">
                <img src="assets/images/saud_3d.jpg" alt="المستشار سعود" class="mascot-img" />

                <!-- Animated SVG Lip-Sync Viseme Mouth Overlay -->
                <div class="lip-sync-overlay" [ngClass]="agentService.saudViseme()">
                  <svg viewBox="0 0 60 40" class="lip-svg">
                    <ellipse cx="30" cy="20" rx="15" ry="8" class="lip-outer" />
                    <ellipse cx="30" cy="20" rx="11" ry="5" class="lip-inner" />
                  </svg>
                </div>
              </div>

              <div class="character-nameplate saud-nameplate">
                <span class="name-badge">المستشار سعود 🇸🇦</span>
                <small class="role-sub">تسعير الأبحاث والمشاريع</small>
              </div>
            </div>

            <!-- Speech Bubble -->
            <div class="agent-bubble saud-bubble" [class.show]="saudEntered">
              <div class="bubble-speaker-tag">
                <span class="sparkle">🌟</span>
                <span>سعود يقدم لك:</span>
              </div>
              <p class="bubble-message-text">
                "ومعاك سعود يا بطل! 🌟 مستشارك لحساب تكاليف أبحاثك ومشاريعك التخرج وتقدير الأسعار وأوقات التسليم فوراً وبكل دقة."
              </p>
              <div class="speaking-cadence-bars" *ngIf="agentService.currentSpeakingAgent() === 'saud'">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

        </div>

        <!-- Center Audio Trigger Banner -->
        <div class="welcome-audio-control-bar">
          <button class="btn-play-greeting" [class.playing]="isPlaying" (click)="playAudioGreeting()">
            <span class="pulse-audio-icon">{{ isPlaying ? '🔊' : '▶️' }}</span>
            <span *ngIf="!isPlaying">انقر هنا للاستماع لترحيب فرح وسعود الصوتي 🎙️</span>
            <span *ngIf="isPlaying">الصوت يعمل الآن: {{ agentService.currentSpeakingAgent() === 'farah' ? 'فرح تتحدث 🌸' : 'سعود يتحدث 🌟' }}</span>
          </button>
        </div>

        <!-- Bottom Actions Deck -->
        <div class="welcome-actions-deck">
          <button class="btn-hero-action btn-chat-now" (click)="openChatWithAgents()">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>محادثة فورية مع سعود وفرح 💬</span>
          </button>
          <button class="btn-hero-action btn-explore-site" (click)="skipWelcome()">
            <span>استكشاف خدمات المنصة 🚀</span>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .welcome-overlay-backdrop {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: radial-gradient(circle at center, rgba(11, 28, 21, 0.88) 0%, rgba(5, 15, 10, 0.96) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      direction: rtl;
      animation: fadeIn 0.4s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .welcome-stage-container {
      position: relative;
      width: 100%;
      max-width: 980px;
      background: linear-gradient(145deg, rgba(27, 67, 50, 0.4) 0%, rgba(11, 28, 21, 0.7) 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.35);
      border-radius: 28px;
      padding: 2rem 2.5rem;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7), 0 0 50px rgba(212, 175, 55, 0.15);
      overflow: hidden;
    }

    .welcome-ambient-glow {
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 500px;
      height: 300px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
      pointer-events: none;
      filter: blur(40px);
    }

    /* Top Stage Bar */
    .welcome-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      position: relative;
      z-index: 2;
    }

    .brand-capsule {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.9rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 700;
      color: #E2EAE6;
    }

    .live-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
      animation: livePulse 1.5s infinite;
    }

    @keyframes livePulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.6; }
    }

    .stage-controls {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .stage-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #C1D6CD;
      padding: 0.4rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.25s;
      font-family: inherit;
    }

    .stage-btn:hover {
      background: rgba(212, 175, 55, 0.2);
      border-color: #D4AF37;
      color: #FFFFFF;
    }

    /* Duo Arena */
    .duo-stage-arena {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
      position: relative;
      z-index: 2;
    }

    .agent-character-pod {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      opacity: 0;
      transition: opacity 0.6s ease;
    }

    .farah-pod.active-entrance {
      opacity: 1;
      animation: entranceSlideFarah 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, farahAliveFloat 5s ease-in-out infinite 0.8s;
    }

    .saud-pod.active-entrance {
      opacity: 1;
      animation: entranceSlideSaud 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, saudAliveFloat 5s ease-in-out infinite 1s;
    }

    @keyframes entranceSlideFarah {
      0% { transform: translateX(100px) scale(0.85) rotate(3deg); opacity: 0; }
      70% { transform: translateX(-8px) scale(1.04) rotate(-1deg); opacity: 1; }
      100% { transform: translateX(0) scale(1) rotate(0deg); opacity: 1; }
    }

    @keyframes entranceSlideSaud {
      0% { transform: translateX(-100px) scale(0.85) rotate(-3deg); opacity: 0; }
      70% { transform: translateX(8px) scale(1.04) rotate(1deg); opacity: 1; }
      100% { transform: translateX(0) scale(1) rotate(0deg); opacity: 1; }
    }

    @keyframes farahAliveFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(1.2deg); }
    }

    @keyframes saudAliveFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(-1.2deg); }
    }

    .character-visual-wrap {
      position: relative;
      margin-bottom: 1.2rem;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .character-visual-wrap:hover {
      transform: scale(1.06);
    }

    .mascot-frame {
      position: relative;
      width: 155px;
      height: 155px;
      border-radius: 50%;
      border: 3px solid var(--dash-accent-gold, #D4AF37);
      background: linear-gradient(135deg, #1B4332 0%, #0B1C15 100%);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 35px rgba(212, 175, 55, 0.35);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    .mascot-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: mascotBreathe 4s ease-in-out infinite;
    }

    @keyframes mascotBreathe {
      0%, 100% { transform: scale(1) translateY(0); }
      50% { transform: scale(1.045) translateY(-3px); }
    }

    /* Live Animated Lip-Sync / Talking Mouth */
    .lip-sync-overlay {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      width: 34px;
      height: 20px;
      pointer-events: none;
      transition: all 0.12s ease;
      opacity: 0.9;
      animation: naturalTalkingCadence 1.4s ease-in-out infinite;
    }

    @keyframes naturalTalkingCadence {
      0%, 100% { transform: translateX(-50%) scaleY(0.7) scaleX(0.95); opacity: 0.7; }
      25% { transform: translateX(-50%) scaleY(1.3) scaleX(1.05); opacity: 1; }
      50% { transform: translateX(-50%) scaleY(0.85) scaleX(1.1); opacity: 0.85; }
      75% { transform: translateX(-50%) scaleY(1.4) scaleX(0.9); opacity: 1; }
    }

    .lip-svg {
      width: 100%;
      height: 100%;
    }

    .lip-outer {
      fill: rgba(210, 75, 75, 0.7);
      stroke: rgba(255, 140, 140, 0.85);
      stroke-width: 1.8;
      transition: all 0.1s ease;
    }

    .lip-inner {
      fill: rgba(30, 8, 8, 0.85);
      transition: all 0.1s ease;
    }

    /* Active Viseme States */
    .lip-sync-overlay.open .lip-outer { ry: 9; rx: 16; fill: rgba(225, 60, 60, 0.85); }
    .lip-sync-overlay.open .lip-inner { ry: 6; rx: 12; }
    
    .lip-sync-overlay.wide .lip-outer { rx: 19; ry: 6; }
    .lip-sync-overlay.wide .lip-inner { rx: 15; ry: 3; }
    
    .lip-sync-overlay.o .lip-outer { rx: 12; ry: 12; fill: rgba(210, 50, 50, 0.9); }
    .lip-sync-overlay.o .lip-inner { rx: 8; ry: 8; }
    
    .lip-sync-overlay.smile .lip-outer { rx: 17; ry: 4; }
    .lip-sync-overlay.smile .lip-inner { rx: 11; ry: 1.5; }

    /* Alive Aura Halo Rings */
    .speaking-halo {
      position: absolute;
      inset: -18px;
      border-radius: 50%;
      pointer-events: none;
    }

    .wave-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(212, 175, 55, 0.7);
      animation: pulseWaveAura 2.2s infinite cubic-bezier(0.16, 1, 0.3, 1);
    }

    .wave-ring.delayed {
      animation-delay: 1.1s;
      border-color: rgba(16, 185, 129, 0.6);
    }

    @keyframes pulseWaveAura {
      0% { transform: scale(0.92); opacity: 0.9; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .character-nameplate {
      margin-top: 0.9rem;
    }

    .name-badge {
      display: inline-block;
      padding: 0.35rem 0.95rem;
      border-radius: 20px;
      font-size: 0.88rem;
      font-weight: 800;
      color: #FFFFFF;
      background: rgba(212, 175, 55, 0.22);
      border: 1.5px solid rgba(212, 175, 55, 0.45);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .role-sub {
      display: block;
      font-size: 0.74rem;
      color: #A3C2B6;
      margin-top: 4px;
      font-weight: 600;
    }

    /* Speech Bubble with Smooth Slide & Glow */
    .agent-bubble {
      background: rgba(11, 28, 21, 0.88);
      border: 1.5px solid rgba(212, 175, 55, 0.35);
      border-radius: 20px;
      padding: 1.2rem 1.4rem;
      text-align: right;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
      position: relative;
      animation: bubblePop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes bubblePop {
      0% { transform: translateY(15px) scale(0.95); opacity: 0; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }

    .bubble-speaker-tag {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.82rem;
      font-weight: 800;
      color: #D4AF37;
      margin-bottom: 0.45rem;
    }

    .bubble-message-text {
      font-size: 0.9rem;
      line-height: 1.65;
      color: #F3F4F6;
      margin: 0;
    }

    .bubble-message-text strong {
      color: #D4AF37;
    }

    .speaking-cadence-bars {
      display: flex;
      align-items: center;
      gap: 3px;
      height: 14px;
      margin-top: 0.7rem;
      justify-content: flex-end;
    }

    .speaking-cadence-bars span {
      width: 3px;
      height: 6px;
      background: #D4AF37;
      border-radius: 2px;
      animation: barDance 0.8s infinite alternate ease-in-out;
    }

    .speaking-cadence-bars span:nth-child(2) { animation-delay: 0.2s; height: 12px; }
    .speaking-cadence-bars span:nth-child(3) { animation-delay: 0.4s; height: 8px; }
    .speaking-cadence-bars span:nth-child(4) { animation-delay: 0.1s; height: 14px; }
    .speaking-cadence-bars span:nth-child(5) { animation-delay: 0.3s; height: 10px; }

    @keyframes barDance {
      0% { transform: scaleY(0.4); }
      100% { transform: scaleY(1.3); }
    }

    /* Actions Deck */
    .welcome-actions-deck {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.2rem;
      position: relative;
      z-index: 2;
    }

    .btn-hero-action {
      padding: 0.75rem 1.6rem;
      border-radius: 9999px;
      font-size: 0.92rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: inherit;
    }

    .btn-chat-now {
      background: linear-gradient(135deg, #D4AF37 0%, #B89228 100%);
      color: #07150E;
      border: none;
      box-shadow: 0 6px 25px rgba(212, 175, 55, 0.4);
    }

    .btn-chat-now:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.6);
    }

    .btn-explore-site {
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .btn-explore-site:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #D4AF37;
      transform: translateY(-2px);
    }

    /* Audio Control Bar */
    .welcome-audio-control-bar {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
      position: relative;
      z-index: 2;
    }

    .btn-play-greeting {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.65rem 1.4rem;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(27, 67, 50, 0.6) 100%);
      border: 1.5px solid #D4AF37;
      border-radius: 9999px;
      color: #FFFFFF;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: inherit;
      animation: audioBtnPulse 2s infinite ease-in-out;
    }

    @keyframes audioBtnPulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3); transform: scale(1); }
      50% { box-shadow: 0 6px 28px rgba(212, 175, 55, 0.6); transform: scale(1.02); }
    }

    .btn-play-greeting:hover,
    .btn-play-greeting.playing {
      background: linear-gradient(135deg, #D4AF37 0%, #10B981 100%);
      color: #07150E;
      border-color: #FFFFFF;
    }

    .pulse-audio-icon {
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .duo-stage-arena {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .welcome-stage-container {
        padding: 1.5rem;
      }
      .welcome-actions-deck {
        flex-direction: column;
        width: 100%;
      }
      .btn-hero-action {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class SaudFarahWelcomeComponent implements OnInit, OnDestroy {
  agentService = inject(SaudFarahAgentService);
  audio = inject(AudioService);

  farahEntered = false;
  saudEntered = false;
  isPlaying = false;

  ngOnInit(): void {
    // Show characters entrance
    setTimeout(() => {
      this.farahEntered = true;
      this.saudEntered = true;
    }, 400);
  }

  ngOnDestroy(): void {
    this.agentService.stopSpeaking();
  }

  playAudioGreeting(): void {
    this.isPlaying = true;
    this.audio.playClick();
    
    const farahSpeech = 'أهلاً وسهلاً بك في منصة أم رهام الأكاديمية! نورتنا 🌸 أنا فرح، مرشدتك لتنسيق أبحاثك وضمان أعلى درجات التميز وفحص Turnitin بنسبة 0% اقتباس!';
    this.agentService.speak(farahSpeech, 'farah', () => {
      // Saud speaks next
      const saudSpeech = 'ومعاك سعود يا بطل! 🌟 مستشارك لحساب تكاليف الأبحاث والمشاريع وتقدير الأسعار وأوقات التسليم فوراً وبكل دقة.';
      this.agentService.speak(saudSpeech, 'saud', () => {
        this.isPlaying = false;
      });
    });
  }

  toggleMute(): void {
    const isMuted = this.agentService.isVoiceMuted();
    this.agentService.isVoiceMuted.set(!isMuted);
    if (!isMuted) {
      this.agentService.stopSpeaking();
      this.isPlaying = false;
    } else {
      this.playAudioGreeting();
    }
  }

  skipWelcome(): void {
    this.audio.playClick();
    this.agentService.closeWelcomeIntro();
  }

  openChatWithAgents(): void {
    this.audio.playClick();
    this.agentService.closeWelcomeIntro();
    this.agentService.openDock();
  }
}
