'use client';
import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

export const Modal = ({ open, onClose, title, children, footer, testId = 'modal' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; testId?: string }) => {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 sm:items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} data-testid={testId} onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white shadow-xl sm:rounded-md">
        <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" data-testid={`${testId}-close`} className="p-1 text-ink/50 hover:text-ink"><X className="h-5 w-5" /></button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-navy-100 bg-navy-50/50 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
};

export const ConfirmDialog = ({ open, onClose, onConfirm, title, text, confirmLabel = 'Delete' }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; text: string; confirmLabel?: string }) => (
  <Modal open={open} onClose={onClose} title={title} testId="confirm-dialog"
    footer={<><Button variant="outline" size="sm" onClick={onClose} data-testid="confirm-cancel">Cancel</Button><Button size="sm" onClick={() => { onConfirm(); onClose(); }} data-testid="confirm-ok">{confirmLabel}</Button></>}>
    <p className="text-sm text-ink/75">{text}</p>
  </Modal>
);
