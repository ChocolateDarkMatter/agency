export type FormContext = 'contact' | 'offers';

export interface BaseFormData {
  name: string;
  email: string;
  message: string;
  context: FormContext;
  page_url: string;
  timestamp: string;
  honeypot?: string;
  turnstile_token?: string;
}

export interface ContactFormData extends BaseFormData {
  context: 'contact';
}

export interface OffersFormData extends BaseFormData {
  context: 'offers';
  budget?: string;
  event_date?: string;
  event_type?: string;
  guest_count?: string;
}

export type FormData = ContactFormData | OffersFormData;

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface SubmissionLog {
  context: FormContext;
  timestamp: string;
  success: boolean;
  admin_sent: boolean;
  user_sent: boolean;
  error?: string;
}