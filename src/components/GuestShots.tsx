import React from 'react';
import styled from '@emotion/styled';
import { Card, CardContent } from './ui/Card';
import { Button } from './Button';
import { Badge } from './ui/Badge';
import { 
  QrCode, 
  Camera, 
  Monitor, 
  Users, 
  Shield, 
  Download,
  Heart,
  Building,
  Baby,
  GraduationCap,
  CheckCircle,
  Star
} from './ui/LucideIcons';
import { MediaQuery } from '../styles/mediaQuery';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #fff7ed 100%);
`;

const Section = styled.section<{ background?: string }>`
  padding: 4rem 1rem;
  ${({ background }) => background && `background: ${background};`}

  ${MediaQuery.max('md')} {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div<{ maxWidth?: string }>`
  max-width: ${({ maxWidth }) => maxWidth || '72rem'};
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;

  ${MediaQuery.min('md')} {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  ${MediaQuery.min('md')} {
    font-size: 1.5rem;
  }
`;

const Grid = styled.div<{ columns?: string }>`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, 1fr);

  ${MediaQuery.min('md')} {
    grid-template-columns: ${({ columns }) => columns || 'repeat(3, 1fr)'};
  }
`;

const FlexContainer = styled.div<{ direction?: string; justify?: string; gap?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  gap: ${({ gap }) => gap || '1rem'};

  ${MediaQuery.min('sm')} {
    flex-direction: ${({ direction }) => direction === 'column' ? 'row' : direction || 'row'};
  }
`;

const IconContainer = styled.div<{ bgColor: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;

  ${MediaQuery.min('md')} {
    font-size: 2.5rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const PricingCard = styled(Card)`
  padding: 2rem;
  background: linear-gradient(to right, #faf5ff, #fdf2f8);
  border: 2px solid #c084fc;
`;

const PriceDisplay = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #8b5cf6;
  margin-bottom: 0.5rem;
`;

const MockupContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const MockupHeader = styled.div`
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const UploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
`;

const DisplayMockup = styled.div`
  background: black;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const ScreenMockup = styled.div`
  background: #374151;
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CTASection = styled(Section)`
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  color: white;
  text-align: center;
`;

const GuestShots: React.FC = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <Section>
        <Container maxWidth="64rem">
          <div style={{ textAlign: 'center' }}>
            <Badge className="mb-4" style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}>
              📸 New Feature
            </Badge>
            <HeroTitle>
              Turn Every Guest Into an Event Photographer
            </HeroTitle>
            <HeroSubtitle>
              GuestShots lets your guests upload, view, and share moments in real-time using a simple QR code.
            </HeroSubtitle>
            <FlexContainer justify="center">
              <Button style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }}>
                Add to My Event
              </Button>
              <Button variant="outline">
                See Demo
              </Button>
            </FlexContainer>
          </div>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section background="white">
        <Container>
          <SectionTitle>
            How It Works in 3 Simple Steps
          </SectionTitle>
          <Grid>
            <Card style={{ textAlign: 'center', padding: '2rem' }}>
              <CardContent>
                <IconContainer bgColor="#f3e8ff">
                  <QrCode className="w-8 h-8" style={{ color: '#8b5cf6' }} />
                </IconContainer>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                  1. Scan the QR Code
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Guests scan a unique QR code placed on tables or signage at your event.
                </p>
              </CardContent>
            </Card>

            <Card style={{ textAlign: 'center', padding: '2rem' }}>
              <CardContent>
                <IconContainer bgColor="#fce7f3">
                  <Camera className="w-8 h-8" style={{ color: '#ec4899' }} />
                </IconContainer>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                  2. Snap & Upload
                </h3>
                <p style={{ color: '#6b7280' }}>
                  They upload photos right from their phone—no app required, no login needed.
                </p>
              </CardContent>
            </Card>

            <Card style={{ textAlign: 'center', padding: '2rem' }}>
              <CardContent>
                <IconContainer bgColor="#fed7aa">
                  <Monitor className="w-8 h-8" style={{ color: '#ea580c' }} />
                </IconContainer>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                  3. See It Live
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Moderated photos appear on the live gallery instantly on screens at your venue.
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Live Demo Preview */}
      <Section background="#f9fafb">
        <Container>
          <SectionTitle>
            See GuestShots in Action
          </SectionTitle>
          <Grid columns="repeat(2, 1fr)">
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Mobile Upload Interface
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                Clean, simple interface that works on any smartphone. Guests can upload multiple photos 
                with just a few taps.
              </p>
              <MockupContainer>
                <MockupHeader>
                  <h4 style={{ fontWeight: '600' }}>Sarah's Wedding</h4>
                  <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Share your photos!</p>
                </MockupHeader>
                <div style={{ padding: '1rem' }}>
                  <UploadArea>
                    <Camera className="w-8 h-8" style={{ color: '#9ca3af', margin: '0 auto 0.5rem' }} />
                    <p style={{ color: '#6b7280' }}>Tap to upload photos</p>
                  </UploadArea>
                  <Button style={{ width: '100%', marginTop: '1rem' }}>Upload Photos</Button>
                </div>
              </MockupContainer>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Live Gallery Display
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                Beautiful slideshow that displays approved photos on TVs or projectors 
                throughout your event.
              </p>
              <DisplayMockup>
                <ScreenMockup>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <Monitor className="w-12 h-12" style={{ margin: '0 auto 0.5rem', opacity: 0.6 }} />
                    <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Live Photo Gallery</p>
                    <p style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: '0.25rem' }}>
                      Photos appear here in real-time
                    </p>
                  </div>
                </ScreenMockup>
              </DisplayMockup>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Customizable for Every Event */}
      <Section background="white">
        <Container>
          <SectionTitle>
            Customizable for Every Event
          </SectionTitle>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280', 
            textAlign: 'center', 
            marginBottom: '3rem', 
            maxWidth: '48rem', 
            marginLeft: 'auto', 
            marginRight: 'auto' 
          }}>
            Every event is unique, so is your GuestShots experience. We'll brand your flyer 
            with a custom image, your event name, and theme styling.
          </p>
          <Grid columns="repeat(4, 1fr)">
            <Card>
              <CardContent style={{ textAlign: 'center' }}>
                <IconContainer bgColor="#fce7f3">
                  <Heart className="w-6 h-6" style={{ color: '#ec4899' }} />
                </IconContainer>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Weddings</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Romantic themes with elegant floral designs and couple photos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ textAlign: 'center' }}>
                <IconContainer bgColor="#dbeafe">
                  <Building className="w-6 h-6" style={{ color: '#2563eb' }} />
                </IconContainer>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Corporate</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Professional branding with company logos and clean layouts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ textAlign: 'center' }}>
                <IconContainer bgColor="#fef3c7">
                  <Baby className="w-6 h-6" style={{ color: '#d97706' }} />
                </IconContainer>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Baby Showers</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Cute and playful designs with pastel colors and baby themes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ textAlign: 'center' }}>
                <IconContainer bgColor="#dcfce7">
                  <GraduationCap className="w-6 h-6" style={{ color: '#16a34a' }} />
                </IconContainer>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Graduations</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Celebratory designs with school colors and achievement themes
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Why Hosts Love It */}
      <Section background="linear-gradient(to right, #faf5ff, #fdf2f8)">
        <Container>
          <SectionTitle>
            Why Hosts Love GuestShots
          </SectionTitle>
          <Grid columns="repeat(3, 1fr)">
            <FeatureItem>
              <CheckCircle className="w-6 h-6" style={{ color: '#10b981', marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>No App Required</h3>
                <p style={{ color: '#6b7280' }}>Works with any smartphone browser - no downloads needed</p>
              </div>
            </FeatureItem>

            <FeatureItem>
              <Shield className="w-6 h-6" style={{ color: '#3b82f6', marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Private & Moderated</h3>
                <p style={{ color: '#6b7280' }}>Review all photos before they go live to ensure quality</p>
              </div>
            </FeatureItem>

            <FeatureItem>
              <Download className="w-6 h-6" style={{ color: '#8b5cf6', marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Easy Download</h3>
                <p style={{ color: '#6b7280' }}>Get all photos in one convenient download after your event</p>
              </div>
            </FeatureItem>

            <FeatureItem>
              <Users className="w-6 h-6" style={{ color: '#f97316', marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Boosts Engagement</h3>
                <p style={{ color: '#6b7280' }}>Guests become active participants in capturing memories</p>
              </div>
            </FeatureItem>

            <FeatureItem>
              <Star className="w-6 h-6" style={{ color: '#eab308', marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Unique Perspectives</h3>
                <p style={{ color: '#6b7280' }}>Capture moments from angles you never would have seen</p>
              </div>
            </FeatureItem>

            <FeatureItem>
              <Monitor className="w-6 h-6" style={{ color: '#ec4899', marginTop: '0.25rem', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Live Entertainment</h3>
                <p style={{ color: '#6b7280' }}>Photos become part of the event entertainment</p>
              </div>
            </FeatureItem>
          </Grid>
        </Container>
      </Section>

      {/* Pricing Section */}
      <Section background="white">
        <Container maxWidth="64rem">
          <div style={{ textAlign: 'center' }}>
            <SectionTitle>
              Simple Add-On Pricing
            </SectionTitle>
            <PricingCard>
              <CardContent>
                <PriceDisplay>$75</PriceDisplay>
                <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                  Add GuestShots to any event package
                </p>
                <Grid columns="repeat(2, 1fr)" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                  <FeatureItem>
                    <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>Custom branded flyer design</span>
                  </FeatureItem>
                  <FeatureItem>
                    <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>Unlimited photo uploads</span>
                  </FeatureItem>
                  <FeatureItem>
                    <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>Live moderation dashboard</span>
                  </FeatureItem>
                  <FeatureItem>
                    <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>Post-event photo download</span>
                  </FeatureItem>
                  <FeatureItem>
                    <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>Live gallery display</span>
                  </FeatureItem>
                  <FeatureItem>
                    <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>30-day photo storage</span>
                  </FeatureItem>
                </Grid>
                <Button style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }}>
                  Add to My Booking
                </Button>
              </CardContent>
            </PricingCard>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="#f9fafb">
        <Container maxWidth="64rem">
          <SectionTitle>
            Frequently Asked Questions
          </SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card>
              <CardContent>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  Does this require Wi-Fi at my venue?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Yes, guests will need internet access to upload photos. Most venues have Wi-Fi, 
                  or we can help coordinate mobile hotspot solutions if needed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  Can I review photos before they go live?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Absolutely! You'll have access to a moderation dashboard where you can approve 
                  or reject photos before they appear in the live gallery.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  How long are photos available for download?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Photos are stored for 30 days after your event. You'll receive a download link 
                  to save all approved photos to your device or cloud storage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  Is this private? Who owns the images?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Your event gallery is completely private and only accessible via your unique link. 
                  You own all the photos uploaded to your event, and guests retain rights to photos they upload.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  What if someone uploads inappropriate content?
                </h3>
                <p style={{ color: '#6b7280' }}>
                  That's why we include moderation! You can review and reject any inappropriate photos 
                  before they appear in your live gallery. We also provide reporting tools for quick action.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <CTASection>
        <Container maxWidth="64rem">
          <SectionTitle style={{ color: 'white' }}>
            Ready to Share the Spotlight?
          </SectionTitle>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Transform your event into an interactive photo experience that your guests will never forget.
          </p>
          <FlexContainer justify="center">
            <Button 
              variant="secondary" 
              style={{ 
                backgroundColor: 'white', 
                color: '#8b5cf6',
                border: 'none'
              }}
            >
              Add GuestShots to My Event
            </Button>
            <Button 
              variant="outline" 
              style={{ 
                borderColor: 'white', 
                color: 'white',
                backgroundColor: 'transparent'
              }}
            >
              Download Sample Flyer
            </Button>
          </FlexContainer>
        </Container>
      </CTASection>
    </PageContainer>
  );
};

export default GuestShots;