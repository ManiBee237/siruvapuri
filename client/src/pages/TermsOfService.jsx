import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Welcome to Siruvapuri Murugan Matrimonial. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
              </p>

              <Section title="1. Acceptance of Terms">
                <p>
                  By registering for an account or using any part of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                </p>
              </Section>

              <Section title="2. Eligibility">
                <p>To use our services, you must:</p>
                <ul>
                  <li>Be at least 18 years of age (21 for males in some states as per Indian law)</li>
                  <li>Be legally eligible to marry under the laws of India</li>
                  <li>Not be currently married</li>
                  <li>Have the legal capacity to enter into a binding contract</li>
                  <li>Not be prohibited from using our services under applicable laws</li>
                </ul>
              </Section>

              <Section title="3. Account Registration">
                <p>When you register for an account:</p>
                <ul>
                  <li>You must provide accurate, complete, and current information</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You may not create multiple accounts or accounts for others without their consent</li>
                </ul>
              </Section>

              <Section title="4. User Conduct">
                <p>You agree not to:</p>
                <ul>
                  <li>Provide false or misleading information in your profile</li>
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post or transmit any inappropriate, offensive, or objectionable content</li>
                  <li>Solicit money or other financial benefits from other users</li>
                  <li>Use automated systems or bots to access the service</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Share your account credentials with others</li>
                  <li>Use the platform for commercial purposes without authorization</li>
                </ul>
              </Section>

              <Section title="5. Profile Content">
                <p>
                  You are solely responsible for the content you post on your profile. By posting content, you represent and warrant that:
                </p>
                <ul>
                  <li>You own or have the right to use such content</li>
                  <li>The content is accurate and not misleading</li>
                  <li>The content does not violate any third-party rights</li>
                  <li>The content complies with all applicable laws and regulations</li>
                </ul>
                <p>
                  We reserve the right to remove any content that violates these terms or is otherwise objectionable.
                </p>
              </Section>

              <Section title="6. Membership and Payments">
                <p>
                  We offer various membership plans with different features and benefits:
                </p>
                <ul>
                  <li>Free membership with basic features</li>
                  <li>Paid membership plans (Gold, Platinum, Premium) with enhanced features</li>
                  <li>All payments are non-refundable unless otherwise specified</li>
                  <li>Membership fees are subject to change with prior notice</li>
                  <li>Membership benefits are personal and non-transferable</li>
                </ul>
              </Section>

              <Section title="7. Verification">
                <p>
                  We may verify user profiles through various means including phone verification and document verification. However, we do not guarantee the accuracy or authenticity of information provided by users. Users are advised to exercise caution and conduct their own verification before proceeding with any match.
                </p>
              </Section>

              <Section title="8. Privacy">
                <p>
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.
                </p>
              </Section>

              <Section title="9. Intellectual Property">
                <p>
                  All content on our platform, including text, graphics, logos, and software, is the property of Siruvapuri Murugan Matrimonial or its licensors and is protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or reproduce any content without our prior written consent.
                </p>
              </Section>

              <Section title="10. Limitation of Liability">
                <p>
                  To the fullest extent permitted by law:
                </p>
                <ul>
                  <li>We are not responsible for the conduct of any user on or off the platform</li>
                  <li>We do not guarantee the authenticity or accuracy of user profiles</li>
                  <li>We are not liable for any direct, indirect, incidental, or consequential damages</li>
                  <li>Our liability is limited to the amount paid by you for our services</li>
                  <li>We do not guarantee that you will find a suitable match</li>
                </ul>
              </Section>

              <Section title="11. Indemnification">
                <p>
                  You agree to indemnify and hold harmless Siruvapuri Murugan Matrimonial, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.
                </p>
              </Section>

              <Section title="12. Termination">
                <p>
                  We reserve the right to suspend or terminate your account at any time for any reason, including but not limited to:
                </p>
                <ul>
                  <li>Violation of these Terms of Service</li>
                  <li>Providing false information</li>
                  <li>Abusive behavior towards other users or staff</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Non-payment of membership fees</li>
                </ul>
              </Section>

              <Section title="13. Dispute Resolution">
                <p>
                  Any disputes arising from these terms or your use of our services shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in Chennai, Tamil Nadu, and the language shall be English.
                </p>
              </Section>

              <Section title="14. Governing Law">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
                </p>
              </Section>

              <Section title="15. Changes to Terms">
                <p>
                  We may update these Terms of Service from time to time. We will notify you of any material changes by posting the new terms on our platform. Your continued use of our services after such changes constitutes your acceptance of the new terms.
                </p>
              </Section>

              <Section title="16. Contact Us">
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <ul>
                  <li>Email: legal@siruvapurimurugan.com</li>
                  <li>Phone: +91 99999 99999</li>
                  <li>Address: 123, Temple Street, Chennai, Tamil Nadu - 600001</li>
                </ul>
              </Section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="text-gray-600 space-y-4">{children}</div>
  </div>
);

export default TermsOfService;
