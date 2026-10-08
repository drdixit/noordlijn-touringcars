'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export type AccordionItem = { id: string; title: string; content: string };

export const Accordion = ({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) => {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  return (
    <div className="divide-y divide-navy-100 border-y border-navy-100" data-testid="faq-accordion">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`acc-${it.id}`} onClick={() => setOpen(isOpen ? null : it.id)} data-testid={`faq-item-${it.id}`}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-sans text-base font-semibold text-navy-900 hover:text-navy-700">
                {it.title}
                {isOpen ? <Minus className="h-4 w-4 shrink-0 text-signal-500" /> : <Plus className="h-4 w-4 shrink-0 text-navy-400" />}
              </button>
            </h3>
            {isOpen && <p id={`acc-${it.id}`} className="pb-5 pr-8 text-[15px] leading-relaxed text-ink/75">{it.content}</p>}
          </div>
        );
      })}
    </div>
  );
};
