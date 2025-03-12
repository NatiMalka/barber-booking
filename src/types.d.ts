import { ChangeEvent, FormEvent } from 'react';
import { Dayjs } from 'dayjs';

// Appointment interfaces
export interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  peopleCount: number;
  contactInfo: string;
  notificationMethod: 'WhatsApp' | 'Email' | 'SMS';
  status?: 'pending' | 'approved' | 'rejected';
}

// Day availability interface
export interface DayAvailability {
  day: number;
  active: boolean;
  startTime: Dayjs;
  endTime: Dayjs;
}

// Special day interface
export interface SpecialDay {
  date: string;
  name: string;
  isWorkDay: boolean;
  startTime?: Dayjs;
  endTime?: Dayjs;
}

// Form event types
export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type FormSubmitEvent = FormEvent<HTMLFormElement>;

// Declare module augmentations for missing type definitions
declare module '@mui/material';
declare module '@mui/material/styles';
declare module '@mui/material/locale';
declare module '@mui/icons-material';
declare module 'framer-motion';

// Enhanced type declarations for stylis and stylis-plugin-rtl
declare module 'stylis-plugin-rtl' {
  const stylisRTLPlugin: any;
  export default stylisRTLPlugin;
}

declare module 'stylis' {
  export const prefixer: any;
  export const stringify: any;
  export const compile: any;
  export const serialize: any;
  export const middleware: any;
}

declare module '@mui/x-date-pickers/DatePicker';
declare module '@mui/x-date-pickers/TimePicker';
declare module '@mui/x-date-pickers/AdapterDayjs';
declare module '@mui/x-date-pickers/LocalizationProvider';
declare module 'firebase/app';
declare module 'firebase/firestore';
declare module 'firebase/auth'; 