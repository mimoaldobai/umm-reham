import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ServicesPageComponent } from './features/services-page/services-page.component';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { 
  PortfolioPageComponent, 
  TestimonialsPageComponent, 
  ArticlesPageComponent 
} from './features/inner-pages/inner-pages.component';
import { ContactPageComponent } from './features/contact-page/contact-page.component';
import { ContactUsPageComponent } from './features/contact-us/contact-us-page.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { AdminLoginComponent } from './features/admin/admin-login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'أم رهام | الصفحة الرئيسية' },
  { path: 'services', component: ServicesPageComponent, title: 'المتجر والخدمات الأكاديمية | أم رهام' },
  { path: 'store', component: ServicesPageComponent, title: 'المتجر والخدمات الأكاديمية | أم رهام' },
  { path: 'about', component: AboutPageComponent, title: 'من نحن | أم رهام' },
  { path: 'order', component: ContactPageComponent, title: 'طلب خدمة ومتابعة الإنجاز | أم رهام' },
  { path: 'request-service', component: ContactPageComponent, title: 'طلب خدمة ومتابعة الإنجاز | أم رهام' },
  { path: 'testimonials', component: TestimonialsPageComponent, title: 'آراء العملاء | أم رهام' },
  { path: 'articles', component: ArticlesPageComponent, title: 'المقالات العلمية | أم رهام' },
  { path: 'contact', component: ContactUsPageComponent, title: 'تواصل معنا | أم رهام' },
  { path: 'contact-us', component: ContactUsPageComponent, title: 'تواصل معنا | أم رهام' },
  { path: 'portfolio', component: PortfolioPageComponent, title: 'أعمالنا السابقة | أم رهام' },
  { path: 'admin/login', component: AdminLoginComponent, title: 'تسجيل الدخول الإداري | أم رهام' },
  { path: 'login', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard], title: 'لوحة الإدارة والتحكم | أم رهام' },
  { path: '**', redirectTo: '' }
];


