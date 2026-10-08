import { Barlow, Barlow_Semi_Condensed } from 'next/font/google';

export const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });
export const display = Barlow_Semi_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
export const fontVars = `${body.variable} ${display.variable}`;
