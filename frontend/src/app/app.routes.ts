import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ServicesPageComponent } from './features/services-page/services-page.component';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { 
  PortfolioPageComponent, 
  TestimonialsPageComponent, 
  ArticlesPageComponent, 
  ContactPageComponent 
} from './features/inner-pages/inner-pages.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'أم رهام | الصفحة الرئيسية' },
  { path: 'services', component: ServicesPageComponent, title: 'خدماتنا | أم رهام' },
  { path: 'about', component: AboutPageComponent, title: 'من نحن | أم رهام' },
  { path: 'portfolio', component: PortfolioPageComponent, title: 'أعمالنا السابقة | أم رهام' },
  { path: 'testimonials', component: TestimonialsPageComponent, title: 'آراء العملاء | أم رهام' },
  { path: 'articles', component: ArticlesPageComponent, title: 'المقالات العلمية | أم رهام' },
  { path: 'contact', component: ContactPageComponent, title: 'تواصل معنا | أم رهام' },
  { path: 'login', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard], title: 'لوحة الإدارة والتحكم | أم رهام' },
  { path: '**', redirectTo: '' }
];

