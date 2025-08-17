import { type FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStyled } from "@components/Form";
import { Input } from "@components/Form/components/Input";
import { Button } from "@components/Button";
import { emailService, type FormData, type FormContext } from "@utils/emailjs";
import * as S from "./styled";

interface ContactFormProps {
  context: FormContext;
  title?: string;
  description?: string;
  showExtraFields?: boolean;
}

const baseSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  honeypot: z.string().optional(),
});

const extendedSchema = baseSchema.extend({
  budget: z.string().optional(),
  event_date: z.string().optional(),
  event_type: z.string().optional(),
  guest_count: z.string().optional(),
});

export const ContactForm: FC<ContactFormProps> = ({ 
  context, 
  title,
  description,
  showExtraFields = false 
}) => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const schema = showExtraFields ? extendedSchema : baseSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
      ...(showExtraFields && {
        budget: "",
        event_date: "",
        event_type: "",
        guest_count: "",
      }),
    },
  });

  useEffect(() => {
    if (!emailService.isConfigured()) {
      setSubmissionState('error');
      setErrorMessage('Contact form is not properly configured. Please email us directly at info@setupandsmile.com');
    }
  }, []);

  const onSubmit = form.handleSubmit(async (values) => {
    if (submissionState === 'submitting') return;

    setSubmissionState('submitting');
    setErrorMessage('');
    setIsButtonDisabled(true);

    try {
      const formData: FormData = {
        ...values,
        context,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: new Date().toISOString(),
      } as FormData;

      const result = await emailService.sendEmails(formData);

      if (result.overall) {
        setSubmissionState('success');
        if (result.userResult.success) {
          setSuccessMessage(
            'Thank you for your message! We\'ve received your inquiry and sent you a confirmation email. We\'ll get back to you as soon as possible.'
          );
        } else {
          setSuccessMessage(
            'Thank you for your message! We\'ve received your inquiry and will get back to you as soon as possible. (Note: Confirmation email may have been delayed)'
          );
        }
        form.reset();
      } else {
        throw new Error('Failed to send admin notification');
      }
    } catch (error) {
      setSubmissionState('error');
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      if (errorMsg.includes('wait') && errorMsg.includes('seconds')) {
        setErrorMessage(`Please wait before submitting again. ${errorMsg}`);
      } else if (errorMsg.includes('disabled')) {
        setErrorMessage('The contact form is temporarily unavailable. Please email us directly at info@setupandsmile.com');
      } else {
        setErrorMessage('Sorry, there was an error sending your message. Please try again or email us directly at info@setupandsmile.com');
      }
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false);
        if (submissionState !== 'success') {
          setSubmissionState('idle');
        }
      }, 2000);
    }
  });

  if (emailService.getContactMode() === 'off') {
    return (
      <S.ContactStyled>
        <S.ContainerStyled>
          <S.ContactThankYou>
            <h2>Contact Form Temporarily Unavailable</h2>
            <p>Please email us directly at <a href="mailto:info@setupandsmile.com">info@setupandsmile.com</a></p>
          </S.ContactThankYou>
        </S.ContainerStyled>
      </S.ContactStyled>
    );
  }

  if (submissionState === 'success') {
    return (
      <S.ContactStyled>
        <S.ContainerStyled>
          <S.ContactThankYou>
            <h2>Thank You!</h2>
            <p>{successMessage}</p>
            <Button 
              asButton={true} 
              variant="secondary" 
              onClick={() => setSubmissionState('idle')}
            >
              Send Another Message
            </Button>
          </S.ContactThankYou>
        </S.ContainerStyled>
      </S.ContactStyled>
    );
  }

  return (
    <S.ContactStyled>
      <S.ContainerStyled>
        <FormStyled onSubmit={onSubmit}>
          <h2>
            {title || (context === 'offers' 
              ? 'Request a Quote for Your Event' 
              : 'Have any questions or want to work together?'
            )} <b>Let's talk!</b>
          </h2>
          
          {description && <p>{description}</p>}
          
          {errorMessage && (
            <div role="alert" style={{ 
              color: '#d32f2f', 
              marginBottom: '1rem', 
              padding: '0.75rem', 
              backgroundColor: '#ffebee', 
              borderRadius: '4px',
              border: '1px solid #f8bbd9'
            }}>
              {errorMessage}
            </div>
          )}

          <Input
            type="text"
            placeholder="Name *"
            register={form.register("name")}
            error={form.formState.errors.name?.message}
            disabled={submissionState === 'submitting'}
          />

          <Input
            type="email"
            placeholder="Email *"
            register={form.register("email")}
            error={form.formState.errors.email?.message}
            disabled={submissionState === 'submitting'}
          />

          {showExtraFields && (
            <>
              <Input
                type="text"
                placeholder="Event Type (Wedding, Corporate, Party, etc.)"
                register={form.register("event_type" as any)}
                error={(form.formState.errors as any).event_type?.message}
                disabled={submissionState === 'submitting'}
              />

              <Input
                type="date"
                placeholder="Event Date"
                register={form.register("event_date" as any)}
                error={(form.formState.errors as any).event_date?.message}
                disabled={submissionState === 'submitting'}
              />

              <Input
                type="text"
                placeholder="Estimated Guest Count"
                register={form.register("guest_count" as any)}
                error={(form.formState.errors as any).guest_count?.message}
                disabled={submissionState === 'submitting'}
              />

              <Input
                type="text"
                placeholder="Budget Range (Optional)"
                register={form.register("budget" as any)}
                error={(form.formState.errors as any).budget?.message}
                disabled={submissionState === 'submitting'}
              />
            </>
          )}

          <Input
            type="textarea"
            placeholder={context === 'offers' 
              ? "Tell us about your event vision, specific rental needs, venue details, and any special requirements *"
              : "Message *"
            }
            register={form.register("message")}
            error={form.formState.errors.message?.message}
            disabled={submissionState === 'submitting'}
          />

          {/* Honeypot field - hidden from users */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
            <Input
              type="text"
              placeholder="Leave this empty"
              register={form.register("honeypot")}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Button
            asButton={true}
            type="submit"
            variant="secondary"
            disabled={isButtonDisabled || submissionState === 'submitting'}
          >
            {submissionState === 'submitting' 
              ? 'Sending...' 
              : (context === 'offers' ? 'Request Quote' : 'Submit')
            }
          </Button>

          <div aria-live="polite" aria-atomic="true" style={{ height: '1px', overflow: 'hidden' }}>
            {submissionState === 'submitting' && 'Sending your message...'}
            {submissionState === 'error' && 'Error sending message'}
          </div>
        </FormStyled>
      </S.ContainerStyled>
    </S.ContactStyled>
  );
};