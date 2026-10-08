'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ImageGallery = ({ images, alt, label = 'Photo', of = 'of' }: { images: string[]; alt: string; label?: string; of?: string }) => {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + images.length) % images.length);
  return (
    <div data-testid="image-gallery">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
        <Image src={images[i]} alt={`${alt} – ${label} ${i + 1}`} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
        {images.length > 1 && (
          <>
            <button type="button" aria-label="Previous" onClick={() => go(-1)} data-testid="gallery-prev" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-navy-900 hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" aria-label="Next" onClick={() => go(1)} data-testid="gallery-next" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-navy-900 hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
            <span className="absolute bottom-3 right-3 bg-navy-950/80 px-2 py-1 text-xs font-semibold text-white">{label} {i + 1} {of} {images.length}</span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((src, idx) => (
            <button key={src + idx} type="button" onClick={() => setI(idx)} data-testid={`gallery-thumb-${idx}`} aria-label={`${label} ${idx + 1}`}
              className={cn('relative aspect-[4/3] overflow-hidden ring-2 ring-offset-1 transition', idx === i ? 'ring-navy-800' : 'ring-transparent opacity-70 hover:opacity-100')}>
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
