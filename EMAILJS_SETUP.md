# EmailJS Contact Form Setup Guide

This guide walks you through setting up the secure EmailJS contact form system with Purelymail integration.

## Prerequisites

- EmailJS account (free tier available)
- Purelymail account or access to your domain's SMTP settings
- Domain control for SPF/DKIM/DMARC setup

## 1. EmailJS Configuration

### 1.1 Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com) and create an account
2. Create a new service and connect it to your Purelymail SMTP:
   - Service Type: Custom SMTP
   - SMTP Server: `smtp.purelymail.com`
   - Port: `587` (STARTTLS) or `465` (SSL)
   - Username: Your Purelymail email address
   - Password: Your Purelymail password or app-specific password

### 1.2 Create Email Templates

You need to create 4 templates:

#### Admin Contact Template
**Template ID**: Store as `PUBLIC_EMAILJS_ADMIN_TEMPLATE_CONTACT`
**Subject**: `New Contact Form Submission - {{name}}`
**Content**:
```
New contact form submission received:

Name: {{name}}
Email: {{email}}
Message: {{message}}

Page: {{page_url}}
Submitted: {{timestamp}}
Context: {{context}}

---
Sent via Setup & Smile Contact Form
```

#### User Contact Template
**Template ID**: Store as `PUBLIC_EMAILJS_USER_TEMPLATE_CONTACT`
**Subject**: `Thank you for contacting Setup & Smile!`
**Content**:
```
Hi {{name}},

Thank you for reaching out to Setup & Smile! We've received your message and will get back to you as soon as possible.

Your Message:
{{message}}

We typically respond within 24 hours during business days.

Best regards,
The Setup & Smile Team
info@setupandsmile.com

---
This is an automated confirmation. Please do not reply to this email.
```

#### Admin Offers Template  
**Template ID**: Store as `PUBLIC_EMAILJS_ADMIN_TEMPLATE_OFFERS`
**Subject**: `New Quote Request - {{name}} ({{event_type}})`
**Content**:
```
New quote request received:

Contact Information:
- Name: {{name}}
- Email: {{email}}

Event Details:
- Event Type: {{event_type}}
- Event Date: {{event_date}}
- Guest Count: {{guest_count}}
- Budget Range: {{budget}}

Message: {{message}}

Page: {{page_url}}
Submitted: {{timestamp}}

---
Sent via Setup & Smile Quote Request Form
```

#### User Offers Template
**Template ID**: Store as `PUBLIC_EMAILJS_USER_TEMPLATE_OFFERS`
**Subject**: `Your Setup & Smile Quote Request Received`
**Content**:
```
Hi {{name}},

Thank you for your quote request! We're excited to help make your {{event_type}} unforgettable.

Your Request Details:
- Event Date: {{event_date}}
- Guest Count: {{guest_count}}
- Budget Range: {{budget}}

We'll review your requirements and get back to you with a personalized quote within 24 hours.

Best regards,
The Setup & Smile Team
info@setupandsmile.com

---
This is an automated confirmation. Please do not reply to this email.
```

### 1.3 Configure Email Settings
For each template, set:
- **From Name**: Setup & Smile
- **From Email**: no-reply@setupandsmile.com
- **Reply-To**: info@setupandsmile.com (for admin templates) or {{email}} (for user templates)

## 2. Environment Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
# EmailJS Configuration
PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_from_emailjs_dashboard
PUBLIC_EMAILJS_SERVICE_ID=your_service_id_from_emailjs

# Template IDs (get these from your EmailJS templates)
PUBLIC_EMAILJS_ADMIN_TEMPLATE_CONTACT=template_xxxxxxx
PUBLIC_EMAILJS_USER_TEMPLATE_CONTACT=template_xxxxxxx
PUBLIC_EMAILJS_ADMIN_TEMPLATE_OFFERS=template_xxxxxxx
PUBLIC_EMAILJS_USER_TEMPLATE_OFFERS=template_xxxxxxx

# Feature Flag (emailjs|off)
PUBLIC_CONTACT_MODE=emailjs

# Domain Security (comma-separated)
PUBLIC_ALLOWED_DOMAINS=localhost,setupandsmile.com,*.setupandsmile.com
```

## 3. Domain Authentication (Purelymail)

### 3.1 SPF Record
Add this TXT record to your domain:
```
v=spf1 include:_spf.purelymail.com ~all
```

### 3.2 DKIM Setup
1. In Purelymail dashboard, go to your domain settings
2. Generate DKIM keys
3. Add the provided TXT records to your DNS

### 3.3 DMARC Policy
Add this TXT record for `_dmarc.yourdomain.com`:
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com; sp=quarantine; aspf=r; adkim=r;
```

## 4. EmailJS Dashboard Settings

### 4.1 Allowed Origins
In your EmailJS service settings, add these origins:
- `http://localhost:4321` (for development)
- `https://yourdomain.com` (production)
- `https://preview-url.vercel.app` (if using Vercel)

### 4.2 Rate Limiting
EmailJS has built-in rate limiting (200 emails/month for free tier). The form includes additional client-side throttling:
- Max 3 submissions per email per minute
- 5-minute cooldown after hitting the limit
- 1.1-second delay between admin and user emails

## 5. Security Features

### 5.1 Abuse Protection
- **Honeypot Field**: Hidden field that bots tend to fill
- **Domain Allowlist**: Only specified domains can send emails
- **Client Throttling**: Prevents rapid submission abuse
- **Form Validation**: Server-side validation with Zod

### 5.2 Privacy Protection
- No PII in logs (emails are masked)
- Minimal structured logging
- GDPR-friendly data handling

## 6. Testing

### 6.1 Development Testing
1. Start your dev server: `npm run dev`
2. Visit `http://localhost:4321/contact` and `http://localhost:4321/offers`
3. Test form submissions with real email addresses
4. Check both admin and user email delivery

### 6.2 Production Testing
1. Deploy to your hosting platform
2. Test from production domain
3. Verify delivery to Gmail, Outlook, and other major providers
4. Test abuse protection (honeypot, rate limiting)

### 6.3 Failure Testing
- Test with invalid EmailJS credentials
- Test network failures
- Test rate limit scenarios
- Verify fallback messaging works

## 7. Monitoring

### 7.1 EmailJS Dashboard
Monitor delivery rates and errors in your EmailJS dashboard.

### 7.2 Application Logs
Check browser console for:
- Submission attempts
- Rate limiting events
- Configuration errors

### 7.3 Email Deliverability
Monitor bounce rates and spam folder placement for your domain.

## 8. Troubleshooting

### Common Issues

**Forms not sending:**
- Check environment variables are set correctly
- Verify EmailJS service is active and has quota remaining
- Check browser console for error messages

**Emails going to spam:**
- Verify SPF, DKIM, and DMARC records
- Check email content for spam triggers
- Monitor sender reputation

**Rate limiting too aggressive:**
- Adjust throttle settings in `src/utils/emailjs/throttle.ts`
- Consider upgrading EmailJS plan for higher limits

**Template errors:**
- Verify all template variables are defined
- Check template IDs match environment config
- Test templates individually in EmailJS dashboard

## 9. Rollback Procedure

If issues arise:

1. **Quick Disable**: Set `PUBLIC_CONTACT_MODE=off` in environment
2. **Redeploy**: Push change to disable form, users see email fallback
3. **Fix Issues**: Debug and resolve problems
4. **Re-enable**: Set `PUBLIC_CONTACT_MODE=emailjs` and redeploy

## 10. Maintenance

### Regular Tasks
- Monitor EmailJS quota usage
- Review delivery reports monthly
- Update dependencies quarterly
- Test form functionality monthly

### Security Updates
- Rotate EmailJS keys annually
- Review domain allowlist quarterly
- Update abuse protection as needed

---

For additional support, contact the development team or refer to the [EmailJS documentation](https://www.emailjs.com/docs/).