import { Injectable, signal, computed, inject } from '@angular/core';
import { AudioService } from './audio.service';

export interface ClientUser {
  id: string;
  fullName: string;
  countryCode?: string; // e.g. '+966'
  phone: string;
  email: string;
  academicLevel: 'طالب مدرسي' | 'بكالوريوس' | 'ماجستير' | 'دكتوراه' | 'باحث حر';
  university: string;
  specialization: string;
  avatarColor: string;
  createdAt: string;
  password?: string;
}

export interface ClientWithStats extends ClientUser {
  ordersCount: number;
  totalSpent: number;
  lastOrderDate?: string;
  orders: ClientOrderSummary[];
}

export interface ClientOrderSummary {
  orderCode: string;
  serviceName: string;
  date: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService {
  private audio = inject(AudioService);

  private readonly CLIENT_STORAGE_KEY = 'umm_reham_current_client';
  private readonly CLIENT_USERS_LIST_KEY = 'umm_reham_registered_clients';
  private readonly CLIENT_ORDERS_KEY = 'umm_reham_client_orders_';

  // Seed default demo clients for immediate testing
  private defaultClients: ClientUser[] = [
    {
      id: 'cl-001',
      fullName: 'سارة العتيبي',
      phone: '0551234567',
      email: 'sara.otaibi@gmail.com',
      academicLevel: 'ماجستير',
      university: 'جامعة الملك سعود',
      specialization: 'إدارة الأعمال والموارد البشرية',
      avatarColor: 'linear-gradient(135deg, #10B981, #059669)',
      createdAt: '2026-01-15'
    },
    {
      id: 'cl-002',
      fullName: 'م. عبدالله القحطاني',
      phone: '0509876543',
      email: 'a.qahtani@outlook.sa',
      academicLevel: 'دكتوراه',
      university: 'جامعة الإمام محمد بن سعود',
      specialization: 'الذكاء الاصطناعي وعلوم البيانات',
      avatarColor: 'linear-gradient(135deg, #C5A869, #9B7E3E)',
      createdAt: '2026-02-01'
    }
  ];

  // State Signals
  public currentClient = signal<ClientUser | null>(this.loadSession());
  public isAuthenticated = computed(() => !!this.currentClient());

  // Modal UI State
  public isAuthModalOpen = signal<boolean>(false);
  public modalTab = signal<'login' | 'register' | 'profile' | 'orders'>('login');

  constructor() {
    this.initClientsList();
  }

  private initClientsList(): void {
    if (typeof localStorage === 'undefined') return;
    const stored = localStorage.getItem(this.CLIENT_USERS_LIST_KEY);
    if (!stored) {
      localStorage.setItem(this.CLIENT_USERS_LIST_KEY, JSON.stringify(this.defaultClients));
    }
  }

  private loadSession(): ClientUser | null {
    if (typeof localStorage === 'undefined') return null;
    try {
      const data = localStorage.getItem(this.CLIENT_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public getRegisteredClients(): ClientUser[] {
    if (typeof localStorage === 'undefined') return this.defaultClients;
    try {
      const stored = localStorage.getItem(this.CLIENT_USERS_LIST_KEY);
      return stored ? JSON.parse(stored) : this.defaultClients;
    } catch {
      return this.defaultClients;
    }
  }

  private saveClientsList(clients: ClientUser[]): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(this.CLIENT_USERS_LIST_KEY, JSON.stringify(clients));
    } catch {}
  }

  // --- MODAL CONTROLS ---

  public openAuthModal(tab: 'login' | 'register' | 'profile' | 'orders' = 'login'): void {
    this.audio.playClick();
    this.modalTab.set(tab);
    this.isAuthModalOpen.set(true);
  }

  public closeAuthModal(): void {
    this.isAuthModalOpen.set(false);
  }

  // --- AUTHENTICATION ACTIONS ---

  public login(identifier: string, password?: string): { success: boolean; message: string } {
    const cleanId = identifier.trim().toLowerCase().replace(/\s+/g, '');
    const cleanPhone = identifier.replace(/[^\d]/g, '');

    const clients = this.getRegisteredClients();
    const found = clients.find(c => {
      const cEmail = c.email.toLowerCase();
      const cPhone = c.phone.replace(/[^\d]/g, '');
      return cEmail === cleanId || cPhone.includes(cleanPhone) || (cleanPhone.length >= 8 && cPhone.endsWith(cleanPhone.slice(-8)));
    });

    if (found) {
      this.currentClient.set(found);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.CLIENT_STORAGE_KEY, JSON.stringify(found));
      }
      this.audio.playSuccess();
      this.closeAuthModal();
      return { success: true, message: `أهلاً بك مجدداً، ${found.fullName}! 🌸` };
    }

    this.audio.playError();
    return { success: false, message: 'لم يتم العثور على حساب بهذا الرقم أو البريد الإلكتروني. يرجى إنشاء حساب جديد.' };
  }

  public register(data: {
    fullName: string;
    phone: string;
    email?: string;
    university?: string;
    academicLevel?: 'طالب مدرسي' | 'بكالوريوس' | 'ماجستير' | 'دكتوراه' | 'باحث حر';
    specialization?: string;
    password?: string;
  }): { success: boolean; message: string } {
    if (!data.fullName.trim() || !data.phone.trim()) {
      this.audio.playError();
      return { success: false, message: 'الاسم ورقم الجوال مطلوبان لإتمام التسجيل' };
    }

    const cleanPhone = data.phone.replace(/[^\d]/g, '');
    const clients = this.getRegisteredClients();

    // Check if phone already registered
    const existing = clients.find(c => c.phone.replace(/[^\d]/g, '').endsWith(cleanPhone.slice(-8)));
    if (existing) {
      this.audio.playError();
      return { success: false, message: 'رقم الجوال مسجل مسبقاً، يمكنك تسجيل الدخول مباشرة.' };
    }

    const colorPalette = [
      'linear-gradient(135deg, #10B981, #059669)',
      'linear-gradient(135deg, #C5A869, #9B7E3E)',
      'linear-gradient(135deg, #2563EB, #1D4ED8)',
      'linear-gradient(135deg, #8B5CF6, #6D28D9)',
      'linear-gradient(135deg, #0D9488, #0F766E)'
    ];
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

    const newClient: ClientUser = {
      id: 'cl-' + Date.now(),
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || `${cleanPhone}@client.ummreham.sa`,
      academicLevel: data.academicLevel || 'بكالوريوس',
      university: data.university?.trim() || 'جامعة سعودية',
      specialization: data.specialization?.trim() || 'عام',
      avatarColor: randomColor,
      createdAt: new Date().toISOString().split('T')[0],
      password: data.password || '123456'
    };

    clients.unshift(newClient);
    this.saveClientsList(clients);

    // Save session
    this.currentClient.set(newClient);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.CLIENT_STORAGE_KEY, JSON.stringify(newClient));
    }

    this.audio.playSuccess();
    this.closeAuthModal();
    return { success: true, message: `مبارك! تم إنشاء حسابك بنجاح. أهلاً بك يا ${newClient.fullName} 🎓` };
  }

  public updateProfile(updated: Partial<ClientUser>): { success: boolean; message: string } {
    const current = this.currentClient();
    if (!current) return { success: false, message: 'يرجى تسجيل الدخول أولاً' };

    const merged: ClientUser = {
      ...current,
      ...updated,
      id: current.id,
      createdAt: current.createdAt
    };

    const clients = this.getRegisteredClients();
    const idx = clients.findIndex(c => c.id === current.id);
    if (idx !== -1) {
      clients[idx] = merged;
      this.saveClientsList(clients);
    }

    this.currentClient.set(merged);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.CLIENT_STORAGE_KEY, JSON.stringify(merged));
    }

    this.audio.playSuccess();
    return { success: true, message: 'تم تحديث بيانات ملفك الأكاديمي بنجاح ✓' };
  }

  public logout(): void {
    this.audio.playClick();
    this.currentClient.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.CLIENT_STORAGE_KEY);
    }
    this.closeAuthModal();
  }

  // --- CLIENT ORDERS LIST ---

  public getClientOrders(): ClientOrderSummary[] {
    const client = this.currentClient();
    if (!client || typeof localStorage === 'undefined') return [];

    try {
      const key = this.CLIENT_ORDERS_KEY + client.id;
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);

      // Default mock orders for demo clients
      const sampleOrders: ClientOrderSummary[] = [
        {
          orderCode: 'UR-84920',
          serviceName: 'خطة بحث ماجستير متكاملة (معايير APA 7th)',
          date: '10 سبتمبر 2026',
          status: 'in_progress',
          price: 450
        },
        {
          orderCode: 'UR-71204',
          serviceName: 'فحص سرقة أدبية وتقرير Turnitin رسمي 0%',
          date: '02 سبتمبر 2026',
          status: 'completed',
          price: 85
        }
      ];
      localStorage.setItem(key, JSON.stringify(sampleOrders));
      return sampleOrders;
    } catch {
      return [];
    }
  }

  public addClientOrder(order: ClientOrderSummary): void {
    const client = this.currentClient();
    if (!client || typeof localStorage === 'undefined') return;

    try {
      const orders = this.getClientOrders();
      orders.unshift(order);
      localStorage.setItem(this.CLIENT_ORDERS_KEY + client.id, JSON.stringify(orders));
    } catch {}
  }

  // --- ADMIN CLIENTS MANAGEMENT ---

  public getClientsWithStats(orders: any[] = []): ClientWithStats[] {
    const clients = this.getRegisteredClients();

    return clients.map(client => {
      const cleanClientPhone = client.phone.replace(/[^\d]/g, '');
      const last8 = cleanClientPhone.length >= 8 ? cleanClientPhone.slice(-8) : cleanClientPhone;

      const storedOrders = this.getClientOrdersForUser(client.id);
      const matchedFromTable = orders.filter(ord => {
        const ordPhone = (ord.phone || '').replace(/[^\d]/g, '');
        const nameMatch = ord.clientName && ord.clientName.trim().toLowerCase() === client.fullName.trim().toLowerCase();
        return (ordPhone && ordPhone.endsWith(last8)) || nameMatch;
      });

      const totalCount = Math.max(storedOrders.length, matchedFromTable.length);
      const totalSpent = matchedFromTable.reduce((sum, o) => sum + (o.price || 0), 0) || (totalCount * 420);
      const lastDate = matchedFromTable[0]?.createdAt || (storedOrders[0]?.date) || client.createdAt;

      return {
        ...client,
        countryCode: client.countryCode || '+966',
        ordersCount: totalCount,
        totalSpent: totalSpent,
        lastOrderDate: lastDate,
        orders: storedOrders.length > 0 ? storedOrders : matchedFromTable.map((m: any) => ({
          orderCode: m.orderNumber || 'UR-REQ',
          serviceName: m.serviceTitle || 'خدمة أكاديمية',
          date: m.createdAt || client.createdAt,
          status: m.status || 'pending',
          price: m.price || 400
        }))
      };
    });
  }

  public getClientOrdersForUser(clientId: string): ClientOrderSummary[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const stored = localStorage.getItem(this.CLIENT_ORDERS_KEY + clientId);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public adminUpdateClient(updated: ClientUser): void {
    const clients = this.getRegisteredClients();
    const idx = clients.findIndex(c => c.id === updated.id);
    if (idx !== -1) {
      clients[idx] = updated;
      this.saveClientsList(clients);
      if (this.currentClient()?.id === updated.id) {
        this.currentClient.set(updated);
        localStorage.setItem(this.CLIENT_STORAGE_KEY, JSON.stringify(updated));
      }
    }
  }

  public adminDeleteClient(clientId: string): void {
    let clients = this.getRegisteredClients();
    clients = clients.filter(c => c.id !== clientId);
    this.saveClientsList(clients);
    if (this.currentClient()?.id === clientId) {
      this.logout();
    }
  }
}
