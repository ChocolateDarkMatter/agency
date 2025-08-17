import type { SubmissionLog, FormContext } from './types';

class EmailLogger {
  private readonly isDev = import.meta.env.MODE === 'development';

  public logSubmission(log: SubmissionLog): void {
    if (this.isDev) {
      console.log('📧 Email Submission:', {
        context: log.context,
        timestamp: log.timestamp,
        success: log.success,
        admin_sent: log.admin_sent,
        user_sent: log.user_sent,
        error: log.error,
      });
    }

    this.logToAnalytics(log);
  }

  public logError(context: FormContext, error: string, details?: any): void {
    const logEntry = {
      context,
      timestamp: new Date().toISOString(),
      success: false,
      admin_sent: false,
      user_sent: false,
      error,
    };

    if (this.isDev) {
      console.error('❌ Email Error:', logEntry, details);
    }

    this.logToAnalytics(logEntry);
  }

  public logSuccess(context: FormContext, adminSent: boolean, userSent: boolean): void {
    const logEntry = {
      context,
      timestamp: new Date().toISOString(),
      success: adminSent, // Admin email is critical
      admin_sent: adminSent,
      user_sent: userSent,
    };

    if (this.isDev) {
      console.log('✅ Email Success:', logEntry);
    }

    this.logToAnalytics(logEntry);
  }

  private logToAnalytics(log: SubmissionLog): void {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'form_submission', {
        form_context: log.context,
        success: log.success,
        admin_sent: log.admin_sent,
        user_sent: log.user_sent,
      });
    }
  }

  public logThrottled(email: string, cooldownRemaining: number): void {
    if (this.isDev) {
      console.warn('🚦 Submission throttled:', {
        email: this.maskEmail(email),
        cooldownRemaining,
      });
    }
  }

  public logDomainBlocked(domain: string): void {
    if (this.isDev) {
      console.warn('🚫 Domain blocked:', { domain });
    }
  }

  public logHoneypotTriggered(): void {
    if (this.isDev) {
      console.warn('🍯 Honeypot triggered - potential bot detected');
    }
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!domain) return '***';
    return `${local.substring(0, 2)}***@${domain}`;
  }
}

export const emailLogger = new EmailLogger();