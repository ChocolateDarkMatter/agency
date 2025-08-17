import emailjs from '@emailjs/browser';
import type { FormData, EmailSendResult, FormContext } from './types';
import { getEmailJSConfig, isValidDomain } from './config';
import { submissionThrottle } from './throttle';
import { emailLogger } from './logger';

export class EmailService {
  private config = getEmailJSConfig();
  private initialized = false;

  private async initialize(): Promise<void> {
    if (this.initialized || !this.config.publicKey) return;
    
    emailjs.init({
      publicKey: this.config.publicKey,
      limitRate: {
        id: 'app_rate_limit',
        throttle: 1000, // 1 second between requests
      },
    });
    
    this.initialized = true;
  }

  public async sendEmails(formData: FormData): Promise<{
    adminResult: EmailSendResult;
    userResult: EmailSendResult;
    overall: boolean;
  }> {
    if (this.config.contactMode === 'off') {
      throw new Error('Contact form is currently disabled');
    }

    if (!isValidDomain(window.location.hostname)) {
      emailLogger.logDomainBlocked(window.location.hostname);
      throw new Error('Domain not authorized');
    }

    if (formData.honeypot && formData.honeypot.trim() !== '') {
      emailLogger.logHoneypotTriggered();
      return {
        adminResult: { success: true }, // Pretend success for bot
        userResult: { success: true },
        overall: true,
      };
    }

    const throttleCheck = submissionThrottle.canSubmit(formData.email);
    if (!throttleCheck.allowed) {
      emailLogger.logThrottled(formData.email, throttleCheck.cooldownRemaining || 0);
      throw new Error(`Please wait ${throttleCheck.cooldownRemaining} seconds before submitting again`);
    }

    await this.initialize();
    submissionThrottle.recordSubmission(formData.email);

    const templates = this.getTemplates(formData.context);
    const templateParams = this.prepareTemplateParams(formData);

    try {
      const adminResult = await this.sendSingleEmail(templates.admin, templateParams);
      
      await submissionThrottle.waitForEmailJSDelay();
      
      const userTemplateParams = {
        ...templateParams,
        reply_to: 'info@setupandsmile.com',
      };
      
      const userResult = await this.sendSingleEmail(templates.user, userTemplateParams);

      emailLogger.logSuccess(formData.context, adminResult.success, userResult.success);

      return {
        adminResult,
        userResult,
        overall: adminResult.success, // Admin email is critical
      };
    } catch (error) {
      emailLogger.logError(formData.context, error instanceof Error ? error.message : 'Unknown error', error);
      throw error;
    }
  }

  private async sendSingleEmail(templateId: string, params: Record<string, any>): Promise<EmailSendResult> {
    try {
      const response = await emailjs.send(
        this.config.serviceId,
        templateId,
        params
      );

      return {
        success: response.status === 200,
        messageId: response.text,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private getTemplates(context: FormContext) {
    return {
      admin: this.config.templates[context].admin,
      user: this.config.templates[context].user,
    };
  }

  private prepareTemplateParams(formData: FormData): Record<string, any> {
    const baseParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      context: formData.context,
      page_url: formData.page_url,
      timestamp: formData.timestamp,
      from_name: 'Setup & Smile Contact Form',
      from_email: 'no-reply@setupandsmile.com',
      to_email: 'info@setupandsmile.com',
      reply_to: formData.email,
    };

    if (formData.context === 'offers') {
      const offersData = formData as any;
      return {
        ...baseParams,
        budget: offersData.budget || 'Not specified',
        event_date: offersData.event_date || 'Not specified',
        event_type: offersData.event_type || 'Not specified',
        guest_count: offersData.guest_count || 'Not specified',
      };
    }

    return baseParams;
  }

  public isConfigured(): boolean {
    return !!(this.config.publicKey && this.config.serviceId);
  }

  public getContactMode(): 'emailjs' | 'off' {
    return this.config.contactMode;
  }
}

export const emailService = new EmailService();