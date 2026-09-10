import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, catchError, map } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface AdminUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: 'super_admin' | 'academic_editor' | 'consultant' | 'reviewer';
  roleNameAr: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'ummreham_admin_session';
  private readonly USERS_STORAGE_KEY = 'ummreham_admin_users';

  private defaultUsers: AdminUser[] = [
    {
      id: 'usr-1',
      fullName: 'د. نورة الشمري',
      username: 'admin',
      email: 'admin@ummreham.sa',
      role: 'super_admin',
      roleNameAr: 'مدير عام النظام (Super Admin)',
      isActive: true,
      lastLogin: 'اليوم، 14:35',
      createdAt: '2025-01-10',
      phone: '+966 50 123 4567'
    },
    {
      id: 'usr-2',
      fullName: 'م. فهد القحطاني',
      username: 'fahad',
      email: 'fahad@ummreham.sa',
      role: 'academic_editor',
      roleNameAr: 'مشرف أكاديمي وتقني',
      isActive: true,
      lastLogin: 'أمس، 18:20',
      createdAt: '2025-02-01',
      phone: '+966 55 987 6543'
    },
    {
      id: 'usr-3',
      fullName: 'أ. سارة الحربي',
      username: 'sara',
      email: 'sara@ummreham.sa',
      role: 'consultant',
      roleNameAr: 'مستشارة دراسات عليا ودعم',
      isActive: true,
      lastLogin: '28 أغسطس 2026',
      createdAt: '2025-03-15',
      phone: '+966 54 321 0987'
    },
    {
      id: 'usr-4',
      fullName: 'أ. سلطان العتيبي',
      username: 'sultan',
      email: 'sultan@ummreham.sa',
      role: 'reviewer',
      roleNameAr: 'مدقق لغوي ومحكم أبحاث',
      isActive: true,
      lastLogin: '25 أغسطس 2026',
      createdAt: '2025-04-20',
      phone: '+966 56 654 3210'
    }
  ];

  private currentUserSubject = new BehaviorSubject<AdminUser | null>(this.getStoredSession());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoginModalOpenSubject = new BehaviorSubject<boolean>(false);
  public isLoginModalOpen$ = this.isLoginModalOpenSubject.asObservable();

  constructor() {
    this.initUsers();
  }

  private initUsers(): void {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(this.defaultUsers));
    }
  }

  public getStoredUsers(): AdminUser[] {
    if (typeof window === 'undefined') return this.defaultUsers;
    const stored = localStorage.getItem(this.USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : this.defaultUsers;
  }

  private saveUsers(users: AdminUser[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
    }
  }

  private getStoredSession(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }

  public isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  public getCurrentUser(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  public openLoginModal(): void {
    this.isLoginModalOpenSubject.next(true);
  }

  public closeLoginModal(): void {
    this.isLoginModalOpenSubject.next(false);
  }

  public login(identifier: string, password: string): Observable<{ success: boolean; message?: string; user?: AdminUser }> {
    const trimmedId = identifier.trim().toLowerCase();
    const trimmedPass = password.trim();

    const users = this.getStoredUsers();
    const foundUser = users.find(u => 
      (u.email.toLowerCase() === trimmedId || u.username.toLowerCase() === trimmedId) && u.isActive
    );

    // Accept standard passwords (including Admin@123 from database seed)
    const validPasswords = ['admin@123', 'admin123', 'admin', '123456', 'Admin@123'];
    const isValidAdmin = (trimmedId === 'admin' || trimmedId === 'admin@ummreham.com' || trimmedId === 'admin@ummreham.sa') && 
                         (validPasswords.includes(trimmedPass) || validPasswords.includes(trimmedPass.toLowerCase()));
    const isValidUser = foundUser && (validPasswords.includes(trimmedPass) || validPasswords.includes(trimmedPass.toLowerCase()));

    if (isValidAdmin || isValidUser) {
      const user = foundUser || this.defaultUsers[0];
      user.lastLogin = 'الآن (متصل)';
      this.saveUsers(users);

      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      }
      this.currentUserSubject.next(user);
      this.closeLoginModal();
      return of({ success: true, user }).pipe(delay(200));
    }

    return of({ 
      success: false, 
      message: 'اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التحقق من صحة البيانات.' 
    }).pipe(delay(200));
  }

  public logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.currentUserSubject.next(null);
  }

  private apiUrl = 'http://localhost:5073/api';

  // CRUD Operations for Users
  public getUsers(): Observable<AdminUser[]> {
    return this.http.get<any[]>(`${this.apiUrl}/auth/users`).pipe(
      map(res => {
        if (res && res.length > 0) {
          const mapped: AdminUser[] = res.map(u => ({
            id: u.id || u.Id,
            fullName: u.fullName || u.FullName || u.username,
            username: u.username || u.Username,
            email: u.email || u.Email,
            role: (u.role || u.Role || 'consultant') as any,
            roleNameAr: this.getRoleNameAr(u.role || u.Role || 'consultant'),
            avatarUrl: u.avatarUrl || u.AvatarUrl,
            isActive: u.isActive !== undefined ? u.isActive : (u.IsActive !== undefined ? u.IsActive : true),
            lastLogin: u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString('ar-SA') : 'الآن',
            createdAt: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '2025-01-10',
            phone: u.phone || u.Phone || ''
          }));
          this.saveUsers(mapped);
          return mapped;
        }
        return this.getStoredUsers();
      }),
      catchError(() => of(this.getStoredUsers()))
    );
  }

  public addUser(user: Partial<AdminUser>): Observable<AdminUser> {
    const users = this.getStoredUsers();
    const newUser: AdminUser = {
      id: 'usr-' + Date.now(),
      fullName: user.fullName || 'مستخدم جديد',
      username: user.username || 'user_' + Math.floor(Math.random() * 1000),
      email: user.email || `user${Date.now()}@ummreham.sa`,
      role: user.role || 'consultant',
      roleNameAr: this.getRoleNameAr(user.role || 'consultant'),
      avatarUrl: user.avatarUrl,
      isActive: user.isActive !== undefined ? user.isActive : true,
      lastLogin: 'لم يسجل دخول بعد',
      createdAt: new Date().toISOString().split('T')[0],
      phone: user.phone || ''
    };

    // Attempt backend save
    this.http.post<any>(`${this.apiUrl}/auth/users`, {
      username: newUser.username,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
      isActive: newUser.isActive,
      password: 'admin123'
    }).pipe(catchError(() => of(null))).subscribe(res => {
      if (res && (res.id || res.Id)) {
        newUser.id = res.id || res.Id;
      }
    });

    users.unshift(newUser);
    this.saveUsers(users);
    return of(newUser);
  }

  public updateUser(id: string, updated: Partial<AdminUser>): Observable<AdminUser | null> {
    const users = this.getStoredUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx] = { 
        ...users[idx], 
        ...updated,
        roleNameAr: updated.role ? this.getRoleNameAr(updated.role) : users[idx].roleNameAr
      };
      this.saveUsers(users);

      // Attempt backend update if GUID
      if (!id.startsWith('usr-')) {
        this.http.put(`${this.apiUrl}/auth/users/${id}`, {
          username: users[idx].username,
          email: users[idx].email,
          fullName: users[idx].fullName,
          role: users[idx].role,
          avatarUrl: users[idx].avatarUrl,
          isActive: users[idx].isActive
        }).pipe(catchError(() => of(null))).subscribe();
      }

      if (this.currentUserSubject.value?.id === id) {
        this.currentUserSubject.next(users[idx]);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users[idx]));
      }
      return of(users[idx]);
    }
    return of(null);
  }

  public deleteUser(id: string): Observable<boolean> {
    let users = this.getStoredUsers();
    users = users.filter(u => u.id !== id);
    this.saveUsers(users);

    if (!id.startsWith('usr-')) {
      this.http.delete(`${this.apiUrl}/auth/users/${id}`).pipe(catchError(() => of(null))).subscribe();
    }

    return of(true);
  }

  public getRoleNameAr(role: string): string {
    switch (role) {
      case 'super_admin': return 'مدير عام النظام (Super Admin)';
      case 'academic_editor': return 'مشرف أكاديمي وتقني';
      case 'consultant': return 'مستشار دراسات عليا ودعم';
      case 'reviewer': return 'مدقق لغوي ومحكم أبحاث';
      default: return 'مستخدم نظام معتمد';
    }
  }
}
