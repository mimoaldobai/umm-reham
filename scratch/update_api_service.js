const fs = require('fs');
const path = require('path');

const root = 'c:/Users/USERW/Desktop/om reham/frontend/src/app';

// 1. UPDATE api.service.ts
const apiPath = path.join(root, 'core/services/api.service.ts');
let apiContent = fs.readFileSync(apiPath, 'utf8');

// Update Testimonial interface if needed
apiContent = apiContent.replace(
  `mediaType?: 'text' | 'audio' | 'image' | 'video';`,
  `mediaType?: 'text' | 'audio' | 'image' | 'video' | 'combined';\n  imageUrl?: string;\n  audioUrl?: string;`
);

// Update submitReview signature and fallback
if (!apiContent.includes('mediaType?:')) {
  apiContent = apiContent.replace(
    `submitReview(payload: { clientName: string; clientPhone?: string; clientEmail?: string; country?: string; city?: string; clientUniversity?: string; contentAr: string; rating: number }): Observable<Testimonial> {`,
    `submitReview(payload: { clientName: string; clientPhone?: string; clientEmail?: string; country?: string; city?: string; clientUniversity?: string; contentAr: string; rating: number; mediaType?: 'text' | 'audio' | 'image' | 'combined'; mediaUrl?: string; imageUrl?: string; audioUrl?: string; avatarUrl?: string }): Observable<Testimonial> {`
  );
}

fs.writeFileSync(apiPath, apiContent, 'utf8');
console.log('API Service updated successfully.');
