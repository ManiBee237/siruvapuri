import { AlertCircle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Disclaimer
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
                Please read this disclaimer carefully before using the Siruvapuri Murugan Matrimonial website and services. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
              </p>

              <Section title="1. General Information">
                <p>
                  The information provided on Siruvapuri Murugan Matrimonial ("the Platform") is for general informational and matchmaking purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Platform.
                </p>
              </Section>

              <Section title="2. User-Generated Content">
                <p>
                  The Platform hosts user-generated content including profiles, photos, and personal information provided by registered members. We do not verify, endorse, or guarantee the accuracy, authenticity, or truthfulness of any user-submitted content.
                </p>
                <ul>
                  <li>Users are solely responsible for the information they provide</li>
                  <li>We do not guarantee the identity, background, or intentions of any user</li>
                  <li>Users should exercise their own judgment and due diligence</li>
                  <li>We recommend independent verification of all claims made by other users</li>
                </ul>
              </Section>

              <Section title="3. No Guarantee of Matches">
                <p>
                  While we strive to provide an effective matchmaking platform, we cannot and do not guarantee:
                </p>
                <ul>
                  <li>That you will find a suitable match through our services</li>
                  <li>The success or outcome of any relationship initiated through our platform</li>
                  <li>The compatibility of matches suggested by our system</li>
                  <li>That all profiles represent genuine marriage seekers</li>
                </ul>
                <p>
                  Matchmaking involves personal compatibility factors that are beyond our control. Users should make their own informed decisions regarding potential matches.
                </p>
              </Section>

              <Section title="4. Horoscope and Astrological Information">
                <p>
                  Any horoscope matching or astrological services provided on our platform:
                </p>
                <ul>
                  <li>Are based on traditional methods and user-provided birth details</li>
                  <li>Should not be considered as absolute or scientific guidance</li>
                  <li>Are provided for informational purposes only</li>
                  <li>Should be verified by qualified astrologers if accuracy is important to you</li>
                </ul>
                <p>
                  We do not guarantee the accuracy of horoscope calculations or the validity of astrological predictions.
                </p>
              </Section>

              <Section title="5. Profile Verification">
                <p>
                  While we make efforts to verify profiles through phone verification and other means:
                </p>
                <ul>
                  <li>Verification does not guarantee the authenticity of all profile information</li>
                  <li>Users may still provide false or misleading information</li>
                  <li>We cannot verify all claims regarding education, employment, or family details</li>
                  <li>Users should conduct their own background checks before proceeding with any match</li>
                </ul>
              </Section>

              <Section title="6. Limitation of Liability">
                <p>
                  To the fullest extent permitted by applicable law:
                </p>
                <ul>
                  <li>We shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages</li>
                  <li>We are not responsible for the conduct of any user on or off the platform</li>
                  <li>We are not liable for any harm arising from meetings or relationships with other users</li>
                  <li>We disclaim any liability for losses resulting from reliance on information provided on the platform</li>
                  <li>Our liability is limited to the amount paid by you for our services</li>
                </ul>
              </Section>

              <Section title="7. External Links">
                <p>
                  Our Platform may contain links to external websites or resources:
                </p>
                <ul>
                  <li>We have no control over the content or availability of these external sites</li>
                  <li>Links do not imply endorsement or affiliation</li>
                  <li>We are not responsible for any harm or loss caused by external websites</li>
                  <li>Users access external links at their own risk</li>
                </ul>
              </Section>

              <Section title="8. Technical Issues">
                <p>
                  We do not guarantee that:
                </p>
                <ul>
                  <li>The Platform will be available at all times without interruption</li>
                  <li>The Platform will be free from errors, viruses, or other harmful components</li>
                  <li>Defects will be corrected immediately</li>
                  <li>Your information will be completely secure from all threats</li>
                </ul>
                <p>
                  While we implement security measures, no system is completely secure. Users should take their own precautions to protect their information.
                </p>
              </Section>

              <Section title="9. Professional Advice">
                <p>
                  Information on our Platform does not constitute:
                </p>
                <ul>
                  <li>Legal advice regarding marriage laws or procedures</li>
                  <li>Medical or psychological counseling</li>
                  <li>Financial or investment advice</li>
                  <li>Professional matchmaking consultation</li>
                </ul>
                <p>
                  Users should consult qualified professionals for specific advice in these areas.
                </p>
              </Section>

              <Section title="10. User Responsibility">
                <p>
                  Users are responsible for:
                </p>
                <ul>
                  <li>Providing accurate and truthful information</li>
                  <li>Verifying information provided by other users</li>
                  <li>Conducting appropriate background checks before proceeding with any match</li>
                  <li>Exercising caution and good judgment in all interactions</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Their own safety and security when meeting other users</li>
                </ul>
              </Section>

              <Section title="11. Indemnification">
                <p>
                  By using our Platform, you agree to indemnify and hold harmless Siruvapuri Murugan Matrimonial, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, costs, or expenses arising from:
                </p>
                <ul>
                  <li>Your use of the Platform</li>
                  <li>Your violation of these terms</li>
                  <li>Your interactions with other users</li>
                  <li>Any content you submit to the Platform</li>
                </ul>
              </Section>

              <Section title="12. Changes to Disclaimer">
                <p>
                  We reserve the right to modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after any changes indicates your acceptance of the updated disclaimer.
                </p>
              </Section>

              <Section title="13. Governing Law">
                <p>
                  This disclaimer shall be governed by and construed in accordance with the laws of India. Any disputes arising from this disclaimer or your use of our services shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
                </p>
              </Section>

              <Section title="14. Contact Information">
                <p>
                  If you have any questions about this disclaimer, please contact us:
                </p>
                <ul>
                  <li>Email: legal@siruvapurimurugan.com</li>
                  <li>Phone: +91 99999 99999</li>
                  <li>Address: 123, Temple Street, Chennai, Tamil Nadu - 600001</li>
                </ul>
              </Section>

              <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700">
                  Matrimonial decisions are personal and significant life choices. We strongly recommend that users take adequate time, involve their families, and conduct thorough due diligence before making any commitments. Never send money or share financial information with other users, and always meet in public places with family members present for initial meetings.
                </p>
              </div>
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

export default Disclaimer;
