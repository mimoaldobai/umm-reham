import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService, ServiceItem, Category, OrderTrackingResult } from '../../core/services/api.service';
import { AudioService } from '../../core/services/audio.service';
import { ClientAuthService } from '../../core/services/client-auth.service';
import { COUNTRIES_DATA, CountryCodeItem, RegionItem, CityItem } from '../../core/data/countries.data';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  private api = inject(ApiService);
  private audio = inject(AudioService);
  private route = inject(ActivatedRoute);
  clientAuth = inject(ClientAuthService);

  // Active Tab: 'new_order' | 'track_order'
  activeTab: 'new_order' | 'track_order' = 'new_order';

  // Services & Categories
  categories: Category[] = [];
  services: ServiceItem[] = [];
  filteredServices: ServiceItem[] = [];

  // Countries, Regions & Cities (Cascading Selectors)
  countries: CountryCodeItem[] = COUNTRIES_DATA;
  selectedCountry: CountryCodeItem = COUNTRIES_DATA[0]; // المملكة العربية السعودية (+966)
  availableRegions: RegionItem[] = COUNTRIES_DATA[0].regions || [];
  selectedRegion: RegionItem | null = COUNTRIES_DATA[0].regions ? COUNTRIES_DATA[0].regions[0] : null;
  availableCities: CityItem[] = (COUNTRIES_DATA[0].regions && COUNTRIES_DATA[0].regions[0].cities) ? COUNTRIES_DATA[0].regions[0].cities : [];
  selectedCity: CityItem | null = (COUNTRIES_DATA[0].regions && COUNTRIES_DATA[0].regions[0].cities) ? COUNTRIES_DATA[0].regions[0].cities[0] : null;

  phoneSubscriberNumber: string = '';

  // Dynamic Discount & Settings
  discountPercent: number = 15;
  whatsappNumber: string = '966572651058';
  currentTrackingCode: string = '';

  // Tab 1: New Service Request Model
  requestModel = {
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    country: 'المملكة العربية السعودية',
    region: 'منطقة الرياض',
    city: 'الرياض',
    categorySlug: '',
    serviceId: '',
    serviceName: '',
    university: '',
    degree: 'بكالوريوس',
    specialization: '',
    pageCount: 15,
    deadline: '',
    description: '',
    agreedToTerms: true
  };

  isSubmitting = false;
  orderSubmitted = false;
  submittedOrderDetails: any = null;
  copySuccess = false;

  // Tab 2: Tracking Model & State
  searchQuery: string = '';
  isSearching = false;
  searchPerformed = false;
  trackingResult: any = null;
  trackingError: string = '';

  ngOnInit(): void {
    // Generate fresh tracking code
    this.currentTrackingCode = this.api.generateTrackingCode();

    // Fetch dynamic discount from backend site settings
    this.api.getDiscountPercent().subscribe(pct => this.discountPercent = pct || 15);
    this.api.getWhatsAppNumber().subscribe(num => this.whatsappNumber = num || '966572651058');

    // Load categories & services
    this.api.getCategories().subscribe(cats => {
      this.categories = cats;
      if (cats.length > 0 && !this.requestModel.categorySlug) {
        this.requestModel.categorySlug = cats[0].slug;
        this.onCategoryChange();
      }
    });

    this.api.getServices().subscribe(srvs => {
      this.services = srvs;
      this.onCategoryChange();
    });

    // Initialize location selectors
    this.initLocation();

    // Auto-fill from authenticated client profile
    const client = this.clientAuth.currentClient();
    if (client) {
      this.requestModel.clientName = client.fullName;
      this.requestModel.clientEmail = client.email;
      this.requestModel.university = client.university;
      this.requestModel.specialization = client.specialization;
      this.requestModel.degree = client.academicLevel || 'بكالوريوس';
      this.initPhoneFromClient(client.phone, client.countryCode);
    } else {
      this.syncFullPhoneNumber();
    }

    // Check query params (e.g. ?tab=track&code=UR-12345)
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'track') {
        this.activeTab = 'track_order';
      }
      if (params['code']) {
        this.searchQuery = params['code'];
        this.activeTab = 'track_order';
        this.trackOrder();
      }
      if (params['service']) {
        this.requestModel.serviceName = params['service'];
      }
    });
  }

  // Country, Region & City Helpers (Cascading matching Screenshot 3)
  initLocation(): void {
    this.availableRegions = this.selectedCountry.regions || [];
    if (this.availableRegions.length > 0) {
      this.selectedRegion = this.availableRegions[0];
      this.availableCities = this.selectedRegion.cities || [];
      this.selectedCity = this.availableCities.length > 0 ? this.availableCities[0] : null;
    } else {
      this.selectedRegion = null;
      this.availableCities = [];
      this.selectedCity = null;
    }
    this.requestModel.country = this.selectedCountry.nameAr;
    this.requestModel.region = this.selectedRegion ? this.selectedRegion.nameAr : '';
    this.requestModel.city = this.selectedCity ? this.selectedCity.nameAr : '';
  }

  onCountryChange(): void {
    this.initLocation();
    this.syncFullPhoneNumber();
  }

  onRegionChange(): void {
    if (this.selectedRegion) {
      this.availableCities = this.selectedRegion.cities || [];
      this.selectedCity = this.availableCities.length > 0 ? this.availableCities[0] : null;
      this.requestModel.region = this.selectedRegion.nameAr;
      this.requestModel.city = this.selectedCity ? this.selectedCity.nameAr : '';
    } else {
      this.availableCities = [];
      this.selectedCity = null;
      this.requestModel.region = '';
      this.requestModel.city = '';
    }
  }

  onCityChange(): void {
    this.requestModel.city = this.selectedCity ? this.selectedCity.nameAr : '';
  }

  onSubscriberPhoneChange(): void {
    this.syncFullPhoneNumber();
  }

  private syncFullPhoneNumber(): void {
    const cleanNum = this.phoneSubscriberNumber.replace(/[^\d]/g, '');
    this.requestModel.clientPhone = this.selectedCountry.dialCode + (cleanNum ? cleanNum : '');
  }

  initPhoneFromClient(phoneStr: string, clientCountryCode?: string): void {
    if (!phoneStr) {
      this.syncFullPhoneNumber();
      return;
    }

    let matchedCountry: CountryCodeItem | undefined;
    if (clientCountryCode) {
      matchedCountry = this.countries.find(c => c.dialCode === clientCountryCode);
    }

    if (!matchedCountry) {
      matchedCountry = this.countries.find(c => phoneStr.startsWith(c.dialCode) || phoneStr.startsWith(c.dialCode.replace('+', '00')));
    }

    if (matchedCountry) {
      this.selectedCountry = matchedCountry;
      let clean = phoneStr;
      if (clean.startsWith(matchedCountry.dialCode)) {
        clean = clean.slice(matchedCountry.dialCode.length);
      } else if (clean.startsWith(matchedCountry.dialCode.replace('+', '00'))) {
        clean = clean.slice(matchedCountry.dialCode.length + 1);
      }
      this.phoneSubscriberNumber = clean.replace(/^0+/, '');
    } else {
      this.selectedCountry = this.countries[0];
      const digits = phoneStr.replace(/[^\d]/g, '');
      if (digits.startsWith('966')) {
        this.phoneSubscriberNumber = digits.slice(3);
      } else if (digits.startsWith('0')) {
        this.phoneSubscriberNumber = digits.slice(1);
      } else {
        this.phoneSubscriberNumber = digits;
      }
    }
    this.syncFullPhoneNumber();
  }

  setTab(tab: 'new_order' | 'track_order'): void {
    this.activeTab = tab;
    this.audio.playClick();
  }

  onCategoryChange(): void {
    if (!this.requestModel.categorySlug) {
      this.filteredServices = this.services;
    } else {
      const cat = this.categories.find(c => c.slug === this.requestModel.categorySlug);
      if (cat) {
        this.filteredServices = this.services.filter(s => s.categoryId === cat.id || s.categoryNameAr === cat.nameAr);
      } else {
        this.filteredServices = this.services;
      }
    }

    if (this.filteredServices.length > 0 && !this.requestModel.serviceName) {
      this.requestModel.serviceName = this.filteredServices[0].nameAr;
      this.requestModel.serviceId = this.filteredServices[0].id;
    }
  }

  onServiceSelect(): void {
    const selected = this.services.find(s => s.nameAr === this.requestModel.serviceName);
    if (selected) {
      this.requestModel.serviceId = selected.id;
    }
  }

  // Attached Files System
  attachedFiles: Array<{ id: string; fileName: string; fileSize: string; fileType: string; fileUrl: string }> = [];
  isUploadingFile = false;

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      this.uploadSingleFile(files[i]);
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        this.uploadSingleFile(event.dataTransfer.files[i]);
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  uploadSingleFile(file: File): void {
    if (file.size > 25 * 1024 * 1024) {
      alert(`حجم الملف (${file.name}) يتجاوز الحد الأقصى المسموح به 25 ميجابايت.`);
      return;
    }

    this.isUploadingFile = true;
    const formattedSize = this.formatFileSize(file.size);

    this.api.uploadMedia(file, 'order-attachments').subscribe({
      next: (res) => {
        this.isUploadingFile = false;
        this.attachedFiles.push({
          id: res.id || 'f-' + Date.now(),
          fileName: file.name,
          fileSize: formattedSize,
          fileType: file.type || file.name.split('.').pop() || 'file',
          fileUrl: res.url
        });
        this.audio.playSuccess();
      },
      error: () => {
        this.isUploadingFile = false;
        const localUrl = URL.createObjectURL(file);
        this.attachedFiles.push({
          id: 'f-' + Date.now(),
          fileName: file.name,
          fileSize: formattedSize,
          fileType: file.type || 'file',
          fileUrl: localUrl
        });
        this.audio.playSuccess();
      }
    });
  }

  removeFile(index: number): void {
    this.attachedFiles.splice(index, 1);
    this.audio.playClick();
  }

  formatFileSize(bytes?: number | string): string {
    if (bytes === undefined || bytes === null || bytes === '') return '';
    const num = typeof bytes === 'number' ? bytes : parseFloat(bytes.toString());
    if (isNaN(num)) return typeof bytes === 'string' ? bytes : '';
    if (num === 0) return '0 بايت';
    const k = 1024;
    const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(num) / Math.log(k));
    return parseFloat((num / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Live Price Calculation
  get estimatedBasePrice(): number {
    const pages = Number(this.requestModel.pageCount) || 10;
    if (this.requestModel.categorySlug === 'schools') return Math.max(50, pages * 15);
    if (this.requestModel.degree === 'ماجستير' || this.requestModel.degree === 'دكتوراه') {
      return Math.max(200, pages * 30);
    }
    return Math.max(120, pages * 22);
  }

  get discountAmount(): number {
    return Math.round((this.estimatedBasePrice * this.discountPercent) / 100);
  }

  get finalEstimatedPrice(): number {
    return this.estimatedBasePrice - this.discountAmount;
  }

  // Submit Service Request
  submitOrder(): void {
    this.syncFullPhoneNumber();
    if (!this.requestModel.clientName.trim() || !this.phoneSubscriberNumber.trim()) {
      alert('الرجاء إدخال اسمك الكريم ورقم الجوال للتواصل.');
      return;
    }

    this.isSubmitting = true;
    this.audio.playClick();

    const orderPayload = {
      orderNumber: this.currentTrackingCode,
      clientName: this.requestModel.clientName,
      clientPhone: this.requestModel.clientPhone,
      clientEmail: this.requestModel.clientEmail,
      serviceId: this.requestModel.serviceId,
      serviceName: this.requestModel.serviceName,
      serviceTitle: this.requestModel.serviceName,
      university: this.requestModel.university,
      degree: this.requestModel.degree,
      specialization: this.requestModel.specialization,
      pageCount: this.requestModel.pageCount,
      deadline: this.requestModel.deadline || 'خلال 7 أيام',
      description: this.requestModel.description,
      attachments: this.attachedFiles,
      discountPercent: this.discountPercent,
      price: this.finalEstimatedPrice,
      status: 'new'
    };

    // 1. Send to Backend API & Dashboard
    this.api.submitServiceRequest(orderPayload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.orderSubmitted = true;
        this.submittedOrderDetails = { ...orderPayload, ...res };
        this.audio.playSuccess();

        // Register order in customer's profile history
        if (this.clientAuth.isAuthenticated()) {
          this.clientAuth.addClientOrder({
            orderCode: this.currentTrackingCode,
            serviceName: this.requestModel.serviceName || 'طلب خدمة أكاديمية',
            date: new Date().toLocaleDateString('ar-SA'),
            status: 'pending',
            price: this.finalEstimatedPrice
          });
        }

        // 2. Open WhatsApp with formatted text
        const waUrl = this.api.generateWhatsAppUrl({
          trackingCode: this.currentTrackingCode,
          serviceName: this.requestModel.serviceName,
          clientName: this.requestModel.clientName,
          phone: this.requestModel.clientPhone,
          university: this.requestModel.university,
          specialization: this.requestModel.specialization,
          pageCount: this.requestModel.pageCount,
          deadline: this.requestModel.deadline,
          discount: this.discountPercent,
          totalPrice: this.finalEstimatedPrice,
          description: this.requestModel.description
        });

        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');
      },
      error: () => {
        // Fallback gracefully: treat as successful locally
        this.isSubmitting = false;
        this.orderSubmitted = true;
        this.submittedOrderDetails = orderPayload;
        this.audio.playSuccess();
      }
    });
  }

  // Copy tracking code
  copyTrackingCode(): void {
    const code = this.submittedOrderDetails?.orderNumber || this.currentTrackingCode;
    navigator.clipboard.writeText(code).then(() => {
      this.copySuccess = true;
      this.audio.playClick();
      setTimeout(() => this.copySuccess = false, 3000);
    });
  }

  // Switch to Track Tab and search for the submitted order
  viewSubmittedOrder(): void {
    this.searchQuery = this.submittedOrderDetails?.orderNumber || this.currentTrackingCode;
    this.orderSubmitted = false;
    this.activeTab = 'track_order';
    this.trackOrder();
  }

  // Reset form for a new order
  resetOrderForm(): void {
    this.orderSubmitted = false;
    this.currentTrackingCode = this.api.generateTrackingCode();
    this.phoneSubscriberNumber = '';
    this.selectedCountry = this.countries[0];
    this.initLocation();
    this.requestModel = {
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      country: 'المملكة العربية السعودية',
      region: 'منطقة الرياض',
      city: 'الرياض',
      categorySlug: this.categories[0]?.slug || '',
      serviceId: '',
      serviceName: '',
      university: '',
      degree: 'بكالوريوس',
      specialization: '',
      pageCount: 15,
      deadline: '',
      description: '',
      agreedToTerms: true
    };
    this.syncFullPhoneNumber();
    this.onCategoryChange();
  }

  // Tab 2: Track Order
  trackOrder(): void {
    const q = (this.searchQuery || '').trim();
    if (!q) {
      this.trackingError = 'الرجاء إدخال كود الطلب (مثل UR-94215) أو رقم الجوال للبحث.';
      return;
    }

    this.isSearching = true;
    this.trackingError = '';
    this.searchPerformed = true;
    this.audio.playClick();

    this.api.trackServiceRequest(q, q).subscribe({
      next: (res) => {
        this.isSearching = false;
        if (res) {
          this.trackingResult = res;
          this.audio.playSuccess();
        } else {
          this.trackingResult = null;
          this.trackingError = `لم يتم العثور على أي طلب مطابق للبحث: "${q}". يرجى التأكد من الرمز أو التواصل مع خدمة العملاء.`;
        }
      },
      error: () => {
        this.isSearching = false;
        this.trackingResult = null;
        this.trackingError = 'حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى.';
      }
    });
  }

  // Status Stepper Helper
  getStatusStepIndex(status: string): number {
    const s = (status || '').toLowerCase();
    if (s === 'new' || s === 'pending' || s === 'جديد') return 1;
    if (s === 'approved' || s === 'review' || s === 'معتمد' || s === 'قيد المراجعة') return 2;
    if (s === 'in_progress' || s === 'progress' || s === 'قيد التنفيذ' || s === 'جاري التجهيز') return 3;
    if (s === 'ready' || s === 'جاهز' || s === 'جاهز للتسليم') return 4;
    if (s === 'completed' || s === 'مكتمل' || s === 'تم التسليم') return 5;
    return 1;
  }

  getStatusLabel(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'new' || s === 'pending' || s === 'جديد') return 'تم استلام الطلب وتوثيقه';
    if (s === 'approved' || s === 'review' || s === 'معتمد' || s === 'قيد المراجعة') return 'تمت مراجعة الطلب واعتماده';
    if (s === 'in_progress' || s === 'progress' || s === 'قيد التنفيذ' || s === 'جاري التجهيز') return 'جاري التجهيز والتنفيذ الأكاديمي';
    if (s === 'ready' || s === 'جاهز' || s === 'جاهز للتسليم') return 'الطلب جاهز للتسليم النهائي';
    if (s === 'completed' || s === 'مكتمل' || s === 'تم التسليم') return 'تم التسليم بنجاح واكتمال العمل';
    return 'قيد المتابعة';
  }

  getStatusBadgeClass(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'new' || s === 'pending' || s === 'جديد') return 'badge-new';
    if (s === 'approved' || s === 'review') return 'badge-review';
    if (s === 'in_progress' || s === 'progress') return 'badge-progress';
    if (s === 'ready') return 'badge-ready';
    if (s === 'completed') return 'badge-completed';
    return 'badge-progress';
  }

  getWhatsAppSupportUrl(trackingCode?: string): string {
    const code = trackingCode || this.searchQuery || 'UR';
    const lines = [
      'السلام عليكم ورحمة الله وبركاته 🌸',
      '*استفسار ومتابعة حالة طلب — منصة أم رهام الأكاديمية*',
      '━━━━━━━━━━━━━━━━━━━━',
      `📋 *كود الطلب:* \`${code}\``,
      '━━━━━━━━━━━━━━━━━━━━',
      '✨ *أرجو التكرم بموافاة بأحدث تفاصيل وحالة هذا الطلب، شكراً لكم 🌸*'
    ];
    const text = encodeURIComponent(lines.join('\n'));
    const cleanNum = this.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${text}`;
  }

  onHover(): void {
    this.audio.playHover();
  }
}
