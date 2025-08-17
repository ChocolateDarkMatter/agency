interface ThrottleEntry {
  count: number;
  lastSubmit: number;
  cooldownUntil: number;
}

class SubmissionThrottle {
  private submissions = new Map<string, ThrottleEntry>();
  private readonly maxSubmissions = 3;
  private readonly timeWindow = 60 * 1000; // 1 minute
  private readonly cooldownDuration = 5 * 60 * 1000; // 5 minutes
  private readonly emailJSDelay = 1100; // 1.1 seconds between EmailJS calls

  private getKey(email: string): string {
    return email.toLowerCase().trim();
  }

  public canSubmit(email: string): { allowed: boolean; cooldownRemaining?: number } {
    const key = this.getKey(email);
    const now = Date.now();
    const entry = this.submissions.get(key);

    if (!entry) {
      return { allowed: true };
    }

    if (entry.cooldownUntil > now) {
      return { 
        allowed: false, 
        cooldownRemaining: Math.ceil((entry.cooldownUntil - now) / 1000) 
      };
    }

    if (now - entry.lastSubmit > this.timeWindow) {
      this.submissions.delete(key);
      return { allowed: true };
    }

    if (entry.count >= this.maxSubmissions) {
      entry.cooldownUntil = now + this.cooldownDuration;
      return { 
        allowed: false, 
        cooldownRemaining: Math.ceil(this.cooldownDuration / 1000) 
      };
    }

    return { allowed: true };
  }

  public recordSubmission(email: string): void {
    const key = this.getKey(email);
    const now = Date.now();
    const entry = this.submissions.get(key) || { count: 0, lastSubmit: 0, cooldownUntil: 0 };

    if (now - entry.lastSubmit > this.timeWindow) {
      entry.count = 1;
    } else {
      entry.count++;
    }

    entry.lastSubmit = now;
    this.submissions.set(key, entry);
  }

  public async waitForEmailJSDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.emailJSDelay));
  }

  public cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.submissions.entries()) {
      if (now - entry.lastSubmit > this.timeWindow && entry.cooldownUntil < now) {
        this.submissions.delete(key);
      }
    }
  }
}

export const submissionThrottle = new SubmissionThrottle();

setInterval(() => {
  submissionThrottle.cleanup();
}, 5 * 60 * 1000); // Cleanup every 5 minutes