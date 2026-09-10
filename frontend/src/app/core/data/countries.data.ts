export interface CityItem {
  idCode: string;
  nameAr: string;
}

export interface RegionItem {
  idCode: string;
  nameAr: string;
  cities: CityItem[];
}

export interface CountryCodeItem {
  code: string;
  idCode: string;
  nameAr: string;
  dialCode: string;
  flag: string;
  placeholder: string;
  digitsLength: number;
  regions?: RegionItem[];
}

export const SAUDI_REGIONS: RegionItem[] = [
  {
    idCode: '100101',
    nameAr: 'منطقة الرياض',
    cities: [
      { idCode: '10010101', nameAr: 'الرياض' },
      { idCode: '10010102', nameAr: 'الخرج' },
      { idCode: '10010103', nameAr: 'الدرعية' },
      { idCode: '10010104', nameAr: 'المجمعة' },
      { idCode: '10010105', nameAr: 'الدوادمي' },
      { idCode: '10010106', nameAr: 'وادي الدواسر' },
      { idCode: '10010107', nameAr: 'الزلفي' },
      { idCode: '10010108', nameAr: 'شقراء' },
      { idCode: '10010109', nameAr: 'حوطة بني تميم' },
      { idCode: '10010110', nameAr: 'الأفلاج' }
    ]
  },
  {
    idCode: '100102',
    nameAr: 'منطقة مكة المكرمة',
    cities: [
      { idCode: '10010201', nameAr: 'مكة المكرمة' },
      { idCode: '10010202', nameAr: 'جدة' },
      { idCode: '10010203', nameAr: 'الطائف' },
      { idCode: '10010204', nameAr: 'القنفذة' },
      { idCode: '10010205', nameAr: 'رابغ' },
      { idCode: '10010206', nameAr: 'الليث' },
      { idCode: '10010207', nameAr: 'خليص' }
    ]
  },
  {
    idCode: '100103',
    nameAr: 'المنطقة الشرقية',
    cities: [
      { idCode: '10010301', nameAr: 'الدمام' },
      { idCode: '10010302', nameAr: 'الخبر' },
      { idCode: '10010303', nameAr: 'الظهران' },
      { idCode: '10010304', nameAr: 'الأحساء - الهفوف' },
      { idCode: '10010305', nameAr: 'الجبيل' },
      { idCode: '10010306', nameAr: 'القطيف' },
      { idCode: '10010307', nameAr: 'حفر الباطن' },
      { idCode: '10010308', nameAr: 'الخفجي' }
    ]
  },
  {
    idCode: '100104',
    nameAr: 'منطقة المدينة المنورة',
    cities: [
      { idCode: '10010401', nameAr: 'المدينة المنورة' },
      { idCode: '10010402', nameAr: 'ينبع' },
      { idCode: '10010403', nameAr: 'العلا' },
      { idCode: '10010404', nameAr: 'مهد الذهب' },
      { idCode: '10010405', nameAr: 'بدر' }
    ]
  },
  {
    idCode: '100105',
    nameAr: 'منطقة القصيم',
    cities: [
      { idCode: '10010501', nameAr: 'بريدة' },
      { idCode: '10010502', nameAr: 'عنيزة' },
      { idCode: '10010503', nameAr: 'الرس' },
      { idCode: '10010504', nameAr: 'البكيرية' },
      { idCode: '10010505', nameAr: 'المذنب' }
    ]
  },
  {
    idCode: '100106',
    nameAr: 'منطقة عسير',
    cities: [
      { idCode: '10010601', nameAr: 'أبها' },
      { idCode: '10010602', nameAr: 'خميس مشيط' },
      { idCode: '10010603', nameAr: 'أحد رفيدة' },
      { idCode: '10010604', nameAr: 'النماص' },
      { idCode: '10010605', nameAr: 'محايل عسير' },
      { idCode: '10010606', nameAr: 'بيشة' }
    ]
  },
  {
    idCode: '100107',
    nameAr: 'منطقة تبوك',
    cities: [
      { idCode: '10010701', nameAr: 'تبوك' },
      { idCode: '10010702', nameAr: 'ضباء' },
      { idCode: '10010703', nameAr: 'الوجه' },
      { idCode: '10010704', nameAr: 'أملج' },
      { idCode: '10010705', nameAr: 'حقل' },
      { idCode: '10010706', nameAr: 'تيماء' }
    ]
  },
  {
    idCode: '100108',
    nameAr: 'منطقة حائل',
    cities: [
      { idCode: '10010801', nameAr: 'حائل' },
      { idCode: '10010802', nameAr: 'بقعاء' },
      { idCode: '10010803', nameAr: 'الغزالة' },
      { idCode: '10010804', nameAr: 'الشنان' }
    ]
  },
  {
    idCode: '100109',
    nameAr: 'منطقة جازان',
    cities: [
      { idCode: '10010901', nameAr: 'جازان' },
      { idCode: '10010902', nameAr: 'صبيا' },
      { idCode: '10010903', nameAr: 'أبو عريش' },
      { idCode: '10010904', nameAr: 'صامطة' },
      { idCode: '10010905', nameAr: 'بيش' },
      { idCode: '10010906', nameAr: 'فرسان' }
    ]
  },
  {
    idCode: '100110',
    nameAr: 'منطقة نجران',
    cities: [
      { idCode: '10011001', nameAr: 'نجران' },
      { idCode: '10011002', nameAr: 'شرورة' },
      { idCode: '10011003', nameAr: 'حبونا' }
    ]
  },
  {
    idCode: '100111',
    nameAr: 'منطقة الجوف',
    cities: [
      { idCode: '10011101', nameAr: 'سكاكا' },
      { idCode: '10011102', nameAr: 'القريات' },
      { idCode: '10011103', nameAr: 'دومة الجندل' },
      { idCode: '10011104', nameAr: 'طبرجل' }
    ]
  },
  {
    idCode: '100112',
    nameAr: 'منطقة الباحة',
    cities: [
      { idCode: '10011201', nameAr: 'الباحة' },
      { idCode: '10011202', nameAr: 'بلجرشي' },
      { idCode: '10011203', nameAr: 'المندق' },
      { idCode: '10011204', nameAr: 'المخواة' }
    ]
  },
  {
    idCode: '100113',
    nameAr: 'منطقة الحدود الشمالية',
    cities: [
      { idCode: '10011301', nameAr: 'عرعر' },
      { idCode: '10011302', nameAr: 'رفحاء' },
      { idCode: '10011303', nameAr: 'طريف' }
    ]
  }
];

export const COUNTRIES_DATA: CountryCodeItem[] = [
  { 
    code: 'SA', 
    idCode: '1001',
    nameAr: 'المملكة العربية السعودية', 
    dialCode: '+966', 
    flag: '🇸🇦', 
    placeholder: '5XXXXXXXX', 
    digitsLength: 9,
    regions: SAUDI_REGIONS
  },
  { 
    code: 'AE', 
    idCode: '1002',
    nameAr: 'الإمارات العربية المتحدة', 
    dialCode: '+971', 
    flag: '🇦🇪', 
    placeholder: '5XXXXXXXX', 
    digitsLength: 9,
    regions: [
      {
        idCode: '100201',
        nameAr: 'إمارة أبوظبي',
        cities: [
          { idCode: '10020101', nameAr: 'أبوظبي' },
          { idCode: '10020102', nameAr: 'العين' }
        ]
      },
      {
        idCode: '100202',
        nameAr: 'إمارة دبي',
        cities: [
          { idCode: '10020201', nameAr: 'دبي' }
        ]
      },
      {
        idCode: '100203',
        nameAr: 'إمارة الشارقة',
        cities: [
          { idCode: '10020301', nameAr: 'الشارقة' }
        ]
      }
    ]
  },
  { 
    code: 'KW', 
    idCode: '1003',
    nameAr: 'الكويت', 
    dialCode: '+965', 
    flag: '🇰🇼', 
    placeholder: 'XXXXXXXX', 
    digitsLength: 8,
    regions: [
      {
        idCode: '100301',
        nameAr: 'محافظة العاصمة',
        cities: [{ idCode: '10030101', nameAr: 'مدينة الكويت' }]
      },
      {
        idCode: '100302',
        nameAr: 'محافظة حولي',
        cities: [{ idCode: '10030201', nameAr: 'حولي' }, { idCode: '10030202', nameAr: 'السالمية' }]
      },
      {
        idCode: '100303',
        nameAr: 'محافظة الفروانية',
        cities: [{ idCode: '10030301', nameAr: 'الفروانية' }]
      },
      {
        idCode: '100304',
        nameAr: 'محافظة الأحمدي',
        cities: [{ idCode: '10030401', nameAr: 'الأحمدي' }]
      }
    ]
  },
  { 
    code: 'QA', 
    idCode: '1004',
    nameAr: 'قطر', 
    dialCode: '+974', 
    flag: '🇶🇦', 
    placeholder: 'XXXXXXXX', 
    digitsLength: 8,
    regions: [
      {
        idCode: '100401',
        nameAr: 'بلدية الدوحة',
        cities: [{ idCode: '10040101', nameAr: 'الدوحة' }]
      },
      {
        idCode: '100402',
        nameAr: 'بلدية الريان',
        cities: [{ idCode: '10040201', nameAr: 'الريان' }]
      },
      {
        idCode: '100403',
        nameAr: 'بلدية الوكرة',
        cities: [{ idCode: '10040301', nameAr: 'الوكرة' }]
      }
    ]
  },
  { 
    code: 'BH', 
    idCode: '1005',
    nameAr: 'البحرين', 
    dialCode: '+973', 
    flag: '🇧🇭', 
    placeholder: 'XXXXXXXX', 
    digitsLength: 8,
    regions: [
      {
        idCode: '100501',
        nameAr: 'محافظة العاصمة',
        cities: [{ idCode: '10050101', nameAr: 'المنامة' }]
      },
      {
        idCode: '100502',
        nameAr: 'محافظة المحرق',
        cities: [{ idCode: '10050201', nameAr: 'المحرق' }]
      }
    ]
  },
  { 
    code: 'OM', 
    idCode: '1006',
    nameAr: 'سلطنة عُمان', 
    dialCode: '+968', 
    flag: '🇴🇲', 
    placeholder: 'XXXXXXXX', 
    digitsLength: 8,
    regions: [
      {
        idCode: '100601',
        nameAr: 'محافظة مسقط',
        cities: [{ idCode: '10060101', nameAr: 'مسقط' }, { idCode: '10060102', nameAr: 'السيب' }]
      },
      {
        idCode: '100602',
        nameAr: 'محافظة ظفار',
        cities: [{ idCode: '10060201', nameAr: 'صلالة' }]
      }
    ]
  },
  { 
    code: 'EG', 
    idCode: '1007',
    nameAr: 'مصر', 
    dialCode: '+20', 
    flag: '🇪🇬', 
    placeholder: '1XXXXXXXXX', 
    digitsLength: 10,
    regions: [
      {
        idCode: '100701',
        nameAr: 'محافظة القاهرة',
        cities: [{ idCode: '10070101', nameAr: 'القاهرة' }, { idCode: '10070102', nameAr: 'مدينة نصر' }]
      },
      {
        idCode: '100702',
        nameAr: 'محافظة الجيزة',
        cities: [{ idCode: '10070201', nameAr: 'الجيزة' }, { idCode: '10070202', nameAr: '6 أكتوبر' }]
      },
      {
        idCode: '100703',
        nameAr: 'محافظة الإسكندرية',
        cities: [{ idCode: '10070301', nameAr: 'الإسكندرية' }]
      }
    ]
  },
  { 
    code: 'JO', 
    idCode: '1008',
    nameAr: 'الأردن', 
    dialCode: '+962', 
    flag: '🇯🇴', 
    placeholder: '7XXXXXXXX', 
    digitsLength: 9,
    regions: [
      {
        idCode: '100801',
        nameAr: 'محافظة العاصمة',
        cities: [{ idCode: '10080101', nameAr: 'عَمّان' }]
      },
      {
        idCode: '100802',
        nameAr: 'محافظة إربد',
        cities: [{ idCode: '10080201', nameAr: 'إربد' }]
      }
    ]
  },
  { code: 'IQ', idCode: '1009', nameAr: 'العراق', dialCode: '+964', flag: '🇮🇶', placeholder: '7XXXXXXXXX', digitsLength: 10 },
  { code: 'YE', idCode: '1010', nameAr: 'اليمن', dialCode: '+967', flag: '🇾🇪', placeholder: '7XXXXXXXX', digitsLength: 9 },
  { code: 'SD', idCode: '1011', nameAr: 'السودان', dialCode: '+249', flag: '🇸🇩', placeholder: '9XXXXXXXX', digitsLength: 9 },
  { code: 'DZ', idCode: '1012', nameAr: 'الجزائر', dialCode: '+213', flag: '🇩🇿', placeholder: 'XXXXXXXXX', digitsLength: 9 },
  { code: 'MA', idCode: '1013', nameAr: 'المغرب', dialCode: '+212', flag: '🇲🇦', placeholder: '6XXXXXXXX', digitsLength: 9 },
  { code: 'TN', idCode: '1014', nameAr: 'تونس', dialCode: '+216', flag: '🇹🇳', placeholder: 'XXXXXXXX', digitsLength: 8 },
  { code: 'LB', idCode: '1015', nameAr: 'لبنان', dialCode: '+961', flag: '🇱🇧', placeholder: 'XXXXXXXX', digitsLength: 8 },
  { code: 'GB', idCode: '1016', nameAr: 'المملكة المتحدة', dialCode: '+44', flag: '🇬🇧', placeholder: '7XXXXXXXXX', digitsLength: 10 },
  { code: 'US', idCode: '1017', nameAr: 'الولايات المتحدة / كندا', dialCode: '+1', flag: '🇺🇸', placeholder: 'XXXXXXXXXX', digitsLength: 10 },
  { code: 'TR', idCode: '1018', nameAr: 'تركيا', dialCode: '+90', flag: '🇹🇷', placeholder: '5XXXXXXXXX', digitsLength: 10 },
  { code: 'MY', idCode: '1019', nameAr: 'ماليزيا', dialCode: '+60', flag: '🇲🇾', placeholder: '1XXXXXXXX', digitsLength: 9 }
];
