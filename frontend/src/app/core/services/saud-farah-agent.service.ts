import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type LipViseme = 'rest' | 'open' | 'wide' | 'o' | 'smile';

export interface AgentChatMessage {
  id: string;
  sender: 'saud' | 'farah' | 'user';
  senderNameAr: string;
  avatarUrl: string;
  text: string;
  time: string;
  isSpecialOffer?: boolean;
  discountPrice?: number;
  originalPrice?: number;
  whatsappCtaUrl?: string;
  audioText?: string;
}

export interface MascotConfig {
  maleName: string;
  maleTitle: string;
  maleRole: string;
  maleGreeting: string;
  femaleName: string;
  femaleTitle: string;
  femaleRole: string;
  femaleGreeting: string;
  basePrice: number;
  discountPrice: number;
  discountPercentage: number;
  isMascotActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SaudFarahAgentService {
  public maleName = signal<string>('سعود');
  public maleTitle = signal<string>('المستشار سعود');
  public maleRole = signal<string>('تسعير الأبحاث والمشاريع');
  public maleGreeting = signal<string>('ومعاك سعود يا بطل! 🌟 مستشارك لحساب تكاليف أبحاثك ومشاريعك التخرج وتقدير الأسعار وأوقات التسليم فوراً وبكل دقة.');

  public femaleName = signal<string>('فرح');
  public femaleTitle = signal<string>('المرشدة فرح');
  public femaleRole = signal<string>('التميز الأكاديمي والعروض');
  public femaleGreeting = signal<string>('أهلاً وسهلاً بك في منصة أم رهام! نورتنا 🌸 أنا فرح، مرشدتك لتنسيق أبحاثك وضمان أعلى درجات التميز وفحص Turnitin بنسبة 0% اقتباس!');

  public basePrice = signal<number>(200);
  public discountPrice = signal<number>(170);
  public discountPercentage = signal<number>(15);
  public isMascotActive = signal<boolean>(true);

  private isWelcomeActiveSubject = new BehaviorSubject<boolean>(false);
  public isWelcomeActive$ = this.isWelcomeActiveSubject.asObservable();

  private isDockOpenSubject = new BehaviorSubject<boolean>(false);
  public isDockOpen$ = this.isDockOpenSubject.asObservable();

  public currentSpeakingAgent = signal<'saud' | 'farah' | null>(null);
  public saudViseme = signal<LipViseme>('rest');
  public farahViseme = signal<LipViseme>('rest');

  public isListening = signal<boolean>(false);
  public recognizedText = signal<string>('');
  public isVoiceMuted = signal<boolean>(false);

  private messagesSubject = new BehaviorSubject<AgentChatMessage[]>([]);
  public messages$: Observable<AgentChatMessage[]> = this.messagesSubject.asObservable();

  private speechSynth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private visemeInterval: any = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.loadSavedConfig();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynth = window.speechSynthesis;
      this.loadVoices();
      if (this.speechSynth.onvoiceschanged !== undefined) {
        this.speechSynth.onvoiceschanged = () => this.loadVoices();
      }
    }

    this.initDefaultMessages();
    this.initSpeechRecognition();
  }

  private loadSavedConfig(): void {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('umm_reham_mascot_config');
      if (saved) {
        try {
          const cfg = JSON.parse(saved);
          if (cfg.maleName) this.maleName.set(cfg.maleName);
          if (cfg.maleTitle) this.maleTitle.set(cfg.maleTitle);
          if (cfg.maleRole) this.maleRole.set(cfg.maleRole);
          if (cfg.maleGreeting) this.maleGreeting.set(cfg.maleGreeting);
          if (cfg.femaleName) this.femaleName.set(cfg.femaleName);
          if (cfg.femaleTitle) this.femaleTitle.set(cfg.femaleTitle);
          if (cfg.femaleRole) this.femaleRole.set(cfg.femaleRole);
          if (cfg.femaleGreeting) this.femaleGreeting.set(cfg.femaleGreeting);
          if (cfg.basePrice) this.basePrice.set(Number(cfg.basePrice));
          if (cfg.discountPrice) this.discountPrice.set(Number(cfg.discountPrice));
          if (cfg.discountPercentage) this.discountPercentage.set(Number(cfg.discountPercentage));
          if (cfg.isMascotActive !== undefined) this.isMascotActive.set(Boolean(cfg.isMascotActive));
        } catch (e) {
          console.error('Error loading mascot config', e);
        }
      }
    }
  }

  public saveConfig(cfg: Partial<MascotConfig>): void {
    if (cfg.maleName !== undefined) this.maleName.set(cfg.maleName);
    if (cfg.maleTitle !== undefined) this.maleTitle.set(cfg.maleTitle);
    if (cfg.maleRole !== undefined) this.maleRole.set(cfg.maleRole);
    if (cfg.maleGreeting !== undefined) this.maleGreeting.set(cfg.maleGreeting);
    if (cfg.femaleName !== undefined) this.femaleName.set(cfg.femaleName);
    if (cfg.femaleTitle !== undefined) this.femaleTitle.set(cfg.femaleTitle);
    if (cfg.femaleRole !== undefined) this.femaleRole.set(cfg.femaleRole);
    if (cfg.femaleGreeting !== undefined) this.femaleGreeting.set(cfg.femaleGreeting);
    if (cfg.basePrice !== undefined) this.basePrice.set(Number(cfg.basePrice));
    if (cfg.discountPrice !== undefined) this.discountPrice.set(Number(cfg.discountPrice));
    if (cfg.discountPercentage !== undefined) this.discountPercentage.set(Number(cfg.discountPercentage));
    if (cfg.isMascotActive !== undefined) this.isMascotActive.set(Boolean(cfg.isMascotActive));

    if (typeof localStorage !== 'undefined') {
      const fullConfig: MascotConfig = {
        maleName: this.maleName(),
        maleTitle: this.maleTitle(),
        maleRole: this.maleRole(),
        maleGreeting: this.maleGreeting(),
        femaleName: this.femaleName(),
        femaleTitle: this.femaleTitle(),
        femaleRole: this.femaleRole(),
        femaleGreeting: this.femaleGreeting(),
        basePrice: this.basePrice(),
        discountPrice: this.discountPrice(),
        discountPercentage: this.discountPercentage(),
        isMascotActive: this.isMascotActive()
      };
      localStorage.setItem('umm_reham_mascot_config', JSON.stringify(fullConfig));
    }

    this.initDefaultMessages();
  }

  public applyPreset(presetKey: 'saud_farah' | 'abdullah_reem' | 'faisal_nouf' | 'khalid_sarah'): void {
    if (presetKey === 'saud_farah') {
      this.saveConfig({
        maleName: 'سعود',
        maleTitle: 'المستشار سعود',
        maleRole: 'تسعير الأبحاث والمشاريع',
        maleGreeting: 'ومعاك سعود يا بطل! 🌟 مستشارك لحساب تكاليف أبحاثك ومشاريعك التخرج وتقدير الأسعار وأوقات التسليم فوراً وبكل دقة.',
        femaleName: 'فرح',
        femaleTitle: 'المرشدة فرح',
        femaleRole: 'التميز الأكاديمي والعروض',
        femaleGreeting: 'أهلاً وسهلاً بك في منصة أم رهام! نورتنا 🌸 أنا فرح، مرشدتك لتنسيق أبحاثك وضمان أعلى درجات التميز وفحص Turnitin بنسبة 0% اقتباس!',
        basePrice: 200,
        discountPrice: 170,
        discountPercentage: 15
      });
    } else if (presetKey === 'abdullah_reem') {
      this.saveConfig({
        maleName: 'د. عبد الله',
        maleTitle: 'المشرف الأكاديمي د. عبد الله',
        maleRole: 'مراجعة الماجستير والتسعير',
        maleGreeting: 'حياك الله مع الدكتور عبد الله 🎓 مستشارك لتدقيق خطط البحث وتحكيم الرسائل الجامعية بأعلى المعايير الأكاديمية.',
        femaleName: 'الأستاذة ريم',
        femaleTitle: 'المرشدة أ. ريم',
        femaleRole: 'التدقيق اللغوي والخصومات',
        femaleGreeting: 'أهلاً بك 🌸 معك الأستاذة ريم لمتابعة تنسيق رسالتك وضمان خلوها من الانتحال بنسبة 0% وتقديم أفضل العروض لك!',
        basePrice: 220,
        discountPrice: 180,
        discountPercentage: 18
      });
    } else if (presetKey === 'faisal_nouf') {
      this.saveConfig({
        maleName: 'فيصل',
        maleTitle: 'المستشار فيصل',
        maleRole: 'المشاريع البرمجية والتقنية',
        maleGreeting: 'مرحباً يا بطل! 💻 أنا فيصل، مستشارك لمشاريع التخرج التقنية وتطوير المواقع والذكاء الاصطناعي.',
        femaleName: 'نوف',
        femaleTitle: 'المرشدة نوف',
        femaleRole: 'إدارة الجودة والضمان',
        femaleGreeting: 'أهلاً وسهلاً 🌸 معك نوف، مرشدتك لتسليم متطلباتك بجودة فائقة وبأفضل الأسعار التنافسية!',
        basePrice: 250,
        discountPrice: 199,
        discountPercentage: 20
      });
    } else if (presetKey === 'khalid_sarah') {
      this.saveConfig({
        maleName: 'د. خالد',
        maleTitle: 'الدكتور خالد',
        maleRole: 'التحليل الإحصائي والدراسات',
        maleGreeting: 'أهلاً بك 📊 معك الدكتور خالد مستشارك للتحليل الإحصائي المتقدم ومناقشة النتائج العلمية.',
        femaleName: 'سارة',
        femaleTitle: 'المرشدة سارة',
        femaleRole: 'خدمة العملاء والخصومات',
        femaleGreeting: 'مرحباً بك 🌸 معك سارة لمساعدتك في اعتماد أفضل الباقات والخصومات المتاحة اليوم!',
        basePrice: 190,
        discountPrice: 150,
        discountPercentage: 21
      });
    }
  }

  private loadVoices(): void {
    if (this.speechSynth) {
      this.cachedVoices = this.speechSynth.getVoices();
    }
  }

  public startWelcomeIntro(): void {
    this.isWelcomeActiveSubject.next(true);
  }

  public closeWelcomeIntro(): void {
    this.stopSpeaking();
    this.isWelcomeActiveSubject.next(false);
  }

  public toggleDock(): void {
    const nextState = !this.isDockOpenSubject.value;
    this.isDockOpenSubject.next(nextState);
    if (nextState && this.messagesSubject.value.length === 0) {
      this.initDefaultMessages();
    }
  }

  public openDock(): void {
    this.isDockOpenSubject.next(true);
  }

  public closeDock(): void {
    this.stopSpeaking();
    this.isDockOpenSubject.next(false);
  }

  public speak(text: string, agent: 'saud' | 'farah', onComplete?: () => void): void {
    if (this.isVoiceMuted()) {
      if (onComplete) setTimeout(onComplete, 2500);
      return;
    }

    if (!this.speechSynth) {
      this.simulateSpeechWithoutTTS(agent, text.length, onComplete);
      return;
    }

    if (this.cachedVoices.length === 0) {
      this.cachedVoices = this.speechSynth.getVoices();
    }

    this.speechSynth.cancel();
    this.currentSpeakingAgent.set(agent);
    this.startLipSyncAnimation(agent);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';

    if (agent === 'saud') {
      utterance.pitch = 0.88;
      utterance.rate = 0.98;
      const maleVoice = this.cachedVoices.find(v => (v.lang.startsWith('ar') || v.lang.includes('SA')) && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('hamed') || v.name.toLowerCase().includes('maged') || v.name.toLowerCase().includes('tariq'))) || this.cachedVoices.find(v => v.lang.startsWith('ar'));
      if (maleVoice) utterance.voice = maleVoice;
    } else {
      utterance.pitch = 1.38;
      utterance.rate = 1.05;
      const femaleVoice = this.cachedVoices.find(v => (v.lang.startsWith('ar') || v.lang.includes('SA')) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('hoda') || v.name.toLowerCase().includes('salma') || v.name.toLowerCase().includes('zari') || v.name.toLowerCase().includes('laila'))) || this.cachedVoices.find(v => v.lang.startsWith('ar'));
      if (femaleVoice) utterance.voice = femaleVoice;
    }

    utterance.onend = () => {
      this.stopLipSyncAnimation();
      this.currentSpeakingAgent.set(null);
      if (onComplete) onComplete();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis note:', e);
      this.stopLipSyncAnimation();
      this.currentSpeakingAgent.set(null);
      if (onComplete) onComplete();
    };

    try {
      this.speechSynth.speak(utterance);
    } catch (e) {
      this.simulateSpeechWithoutTTS(agent, text.length, onComplete);
    }
  }

  public stopSpeaking(): void {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
    this.stopLipSyncAnimation();
    this.currentSpeakingAgent.set(null);
  }

  private startLipSyncAnimation(agent: 'saud' | 'farah'): void {
    this.stopLipSyncAnimation();
    const visemes: LipViseme[] = ['open', 'wide', 'o', 'smile', 'open', 'rest'];
    let index = 0;

    this.visemeInterval = setInterval(() => {
      const nextViseme = visemes[index % visemes.length];
      if (agent === 'saud') {
        this.saudViseme.set(nextViseme);
      } else {
        this.farahViseme.set(nextViseme);
      }
      index++;
    }, 140);
  }

  private stopLipSyncAnimation(): void {
    if (this.visemeInterval) {
      clearInterval(this.visemeInterval);
      this.visemeInterval = null;
    }
    this.saudViseme.set('rest');
    this.farahViseme.set('rest');
  }

  private simulateSpeechWithoutTTS(agent: 'saud' | 'farah', charCount: number, onComplete?: () => void): void {
    this.currentSpeakingAgent.set(agent);
    this.startLipSyncAnimation(agent);
    const simulatedDuration = Math.min(Math.max(charCount * 65, 1800), 7000);

    setTimeout(() => {
      this.stopLipSyncAnimation();
      this.currentSpeakingAgent.set(null);
      if (onComplete) onComplete();
    }, simulatedDuration);
  }

  private initSpeechRecognition(): void {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'ar-SA';
        this.recognition.continuous = false;
        this.recognition.interimResults = true;

        this.recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          this.recognizedText.set(transcript);
        };

        this.recognition.onend = () => {
          this.isListening.set(false);
          const finalPrompt = this.recognizedText();
          if (finalPrompt.trim()) {
            this.handleUserMessage(finalPrompt.trim());
            this.recognizedText.set('');
          }
        };

        this.recognition.onerror = () => {
          this.isListening.set(false);
        };
      }
    }
  }

  public toggleVoiceListening(): void {
    if (!this.recognition) {
      alert('ميزة التعرف الصوتي غير مدعومة في متصفحك الحالي، يمكنك الكتابة في مربع النص.');
      return;
    }

    if (this.isListening()) {
      this.recognition.stop();
      this.isListening.set(false);
    } else {
      this.recognizedText.set('');
      this.isListening.set(true);
      try {
        this.recognition.start();
      } catch (e) {
        this.isListening.set(false);
      }
    }
  }

  private initDefaultMessages(): void {
    const timeNow = this.getCurrentTime();
    this.messagesSubject.next([
      {
        id: 'msg_init_saud',
        sender: 'saud',
        senderNameAr: this.maleName() + ' 🇸🇦',
        avatarUrl: 'assets/images/saud_flying_3d.jpg',
        text: 'أهلاً بك يا بطل! 🌟 أنا ' + this.maleName() + '، مستشارك لحساب تكاليف الأبحاث والمشاريع وتقدير الأسعار فوراً.',
        time: timeNow,
        audioText: 'أهلاً بك! أنا ' + this.maleName() + '، مستشارك لحساب تكاليف الأبحاث والمشاريع وتقدير الأسعار فوراً.'
      },
      {
        id: 'msg_init_farah',
        sender: 'farah',
        senderNameAr: this.femaleName() + ' 🎓',
        avatarUrl: 'assets/images/farah_flying_3d.jpg',
        text: 'وأنا ' + this.femaleName() + ' 🌸 مرشدتك للتأكد من مطابقة شروط جامعتك السعودية، وضمان فحص Turnitin بنسبة 0% اقتباس مع خصومات مميزة للباحثين الجدد!',
        time: timeNow,
        audioText: 'وأنا ' + this.femaleName() + '، مرشدتك للتأكد من مطابقة شروط جامعتك وضمان أعلى درجات التميز مع خصومات مميزة!'
      }
    ]);
  }

  public handleUserMessage(userText: string): void {
    const timeNow = this.getCurrentTime();
    const userMsg: AgentChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      senderNameAr: 'أنت',
      avatarUrl: '',
      text: userText,
      time: timeNow
    };

    const currentList = this.messagesSubject.value;
    this.messagesSubject.next([...currentList, userMsg]);

    this.generateDualAgentResponse(userText);
  }

  private generateDualAgentResponse(query: string): void {
    const q = query.toLowerCase();
    let originalPrice = this.basePrice();
    let discountPrice = this.discountPrice();
    let serviceTitle = 'الخدمة الأكاديمية المطلوبة';
    let duration = '3-5 أيام عمل';

    if (q.includes('موقع') || q.includes('تطبيق') || q.includes('برمجة') || q.includes('تخرج')) {
      serviceTitle = 'مشروع التخرج البرمجي وتصميم الموقع';
      originalPrice = Math.round(this.basePrice() * 2.2);
      discountPrice = Math.round(this.discountPrice() * 2.2);
      duration = '5-7 أيام عمل';
    } else if (q.includes('خطة') || q.includes('proposal') || q.includes('مقترح')) {
      serviceTitle = 'إعداد خطة البحث (Proposal) المعتمدة';
      originalPrice = Math.round(this.basePrice() * 1.25);
      discountPrice = Math.round(this.discountPrice() * 1.2);
      duration = '3-4 أيام';
    } else if (q.includes('تحليل') || q.includes('spss') || q.includes('إحصائ')) {
      serviceTitle = 'التحليل الإحصائي ومناقشة النتائج';
      originalPrice = Math.round(this.basePrice() * 1.5);
      discountPrice = Math.round(this.discountPrice() * 1.4);
      duration = '3 أيام';
    } else if (q.includes('turnitin') || q.includes('فحص') || q.includes('سرقة') || q.includes('اقتباس')) {
      serviceTitle = 'فحص Turnitin والتدقيق اللغوي الشامل';
      originalPrice = Math.round(this.basePrice() * 0.75);
      discountPrice = Math.round(this.discountPrice() * 0.7);
      duration = 'خلال 24 ساعة';
    } else if (q.includes('ماجستير') || q.includes('رسالة') || q.includes('دكتوراه')) {
      serviceTitle = 'أبحاث ودراسات الماجستير والدكتوراه المتكاملة';
      originalPrice = Math.round(this.basePrice() * 3);
      discountPrice = Math.round(this.discountPrice() * 2.8);
      duration = 'حسب عدد الصفحات';
    }

    const timeNow = this.getCurrentTime();

    setTimeout(() => {
      const maleText = 'بناءً على المعايير الأكاديمية لـ (' + serviceTitle + ')، تكلفة التنفيذ المعتمدة تبدأ من ' + originalPrice + ' ريال سعودي، ومدة الإنجاز المتوقعة ' + duration + ' مع تقرير فحص الأصالة مجاناً.';
      
      const maleMsg: AgentChatMessage = {
        id: 'msg_male_' + Date.now(),
        sender: 'saud',
        senderNameAr: this.maleName() + ' 🇸🇦',
        avatarUrl: 'assets/images/saud_flying_3d.jpg',
        text: maleText,
        time: timeNow,
        originalPrice: originalPrice
      };

      this.messagesSubject.next([...this.messagesSubject.value, maleMsg]);
      this.speak(maleText, 'saud', () => {
        setTimeout(() => {
          const femaleText = 'ولأنك عميل جديد ومميز عندنا اليوم في منصة أم رهام، يسعدني تقديم خصم ترحيبي فوري لك! 🎁 السعر الحصري لك الآن هو ' + discountPrice + ' ريال سعودي فقط بدلاً من ' + originalPrice + ' ر.س! 🎉';
          const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent('السلام عليكم، تحدثت مع ' + this.maleName() + ' و' + this.femaleName() + ' وأرغب في اعتماد عرض (' + serviceTitle + ') بسعر العرض الحصري ' + discountPrice + ' ر.س.');

          const femaleMsg: AgentChatMessage = {
            id: 'msg_female_' + Date.now(),
            sender: 'farah',
            senderNameAr: this.femaleName() + ' 🎓',
            avatarUrl: 'assets/images/farah_flying_3d.jpg',
            text: femaleText,
            time: this.getCurrentTime(),
            isSpecialOffer: true,
            originalPrice: originalPrice,
            discountPrice: discountPrice,
            whatsappCtaUrl: whatsappUrl
          };

          this.messagesSubject.next([...this.messagesSubject.value, femaleMsg]);
          this.speak(femaleText, 'farah');
        }, 1100);
      });
    }, 600);
  }

  public playMessageAudio(msg: AgentChatMessage): void {
    const textToSpeak = msg.audioText || msg.text;
    const agent = msg.sender === 'farah' ? 'farah' : 'saud';
    this.speak(textToSpeak, agent);
  }

  public getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  }
}
