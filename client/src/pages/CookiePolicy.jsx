import { Cookie } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Cookie className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Cookie Policy
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
                This Cookie Policy explains how Siruvapuri Murugan Matrimonial uses cookies and similar technologies when you visit our website. By using our platform, you consent to the use of cookies as described in this policy.
              </p>

              <Section title="1. What Are Cookies?">
                <p>
                  Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
                </p>
              </Section>

              <Section title="2. Types of Cookies We Use">
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable basic features like page navigation, access to secure areas, and authentication. Without these cookies, our services cannot be provided.
                </p>
                <ul>
                  <li>Session management</li>
                  <li>User authentication</li>
                  <li>Security features</li>
                  <li>Load balancing</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Functional Cookies</h3>
                <p>
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                </p>
                <ul>
                  <li>Language preferences</li>
                  <li>Display settings</li>
                  <li>User preferences</li>
                  <li>Previously viewed profiles</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Analytics Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul>
                  <li>Page visit counts</li>
                  <li>Traffic sources</li>
                  <li>User behavior patterns</li>
                  <li>Site performance data</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Marketing Cookies</h3>
                <p>
                  These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show you relevant advertisements.
                </p>
                <ul>
                  <li>Ad targeting</li>
                  <li>Campaign effectiveness</li>
                  <li>Interest-based advertising</li>
                </ul>
              </Section>

              <Section title="3. Cookies We Use">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left border-b">Cookie Name</th>
                        <th className="px-4 py-2 text-left border-b">Purpose</th>
                        <th className="px-4 py-2 text-left border-b">Duration</th>
                        <th className="px-4 py-2 text-left border-b">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border-b">session_id</td>
                        <td className="px-4 py-2 border-b">User session management</td>
                        <td className="px-4 py-2 border-b">Session</td>
                        <td className="px-4 py-2 border-b">Essential</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">auth_token</td>
                        <td className="px-4 py-2 border-b">Authentication</td>
                        <td className="px-4 py-2 border-b">7 days</td>
                        <td className="px-4 py-2 border-b">Essential</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">preferences</td>
                        <td className="px-4 py-2 border-b">User preferences</td>
                        <td className="px-4 py-2 border-b">1 year</td>
                        <td className="px-4 py-2 border-b">Functional</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">_ga</td>
                        <td className="px-4 py-2 border-b">Google Analytics</td>
                        <td className="px-4 py-2 border-b">2 years</td>
                        <td className="px-4 py-2 border-b">Analytics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section title="4. Third-Party Cookies">
                <p>
                  Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
                </p>
                <ul>
                  <li><strong>Google Analytics:</strong> For website traffic analysis</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing</li>
                  <li><strong>Social Media:</strong> For social sharing features</li>
                </ul>
                <p>
                  These third parties have their own privacy and cookie policies, which we encourage you to review.
                </p>
              </Section>

              <Section title="5. How to Control Cookies">
                <p>
                  You can control and manage cookies in various ways:
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Browser Settings</h3>
                <p>
                  Most browsers allow you to manage cookies through their settings. You can:
                </p>
                <ul>
                  <li>View and delete existing cookies</li>
                  <li>Block all cookies or only third-party cookies</li>
                  <li>Set preferences for certain websites</li>
                  <li>Enable "Do Not Track" signals</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Browser-Specific Instructions</h3>
                <ul>
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Opt-Out Links</h3>
                <ul>
                  <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Opt-out Plugin</a></li>
                </ul>
              </Section>

              <Section title="6. Impact of Disabling Cookies">
                <p>
                  Please note that if you choose to disable cookies:
                </p>
                <ul>
                  <li>Some features of our website may not function properly</li>
                  <li>You may not be able to log in or access certain areas</li>
                  <li>Your preferences may not be saved</li>
                  <li>The user experience may be degraded</li>
                </ul>
              </Section>

              <Section title="7. Local Storage and Similar Technologies">
                <p>
                  In addition to cookies, we may use other similar technologies:
                </p>
                <ul>
                  <li><strong>Local Storage:</strong> Stores data in your browser without an expiration date</li>
                  <li><strong>Session Storage:</strong> Stores data for the duration of your session</li>
                  <li><strong>Pixels/Beacons:</strong> Small images used to track user activity</li>
                </ul>
              </Section>

              <Section title="8. Updates to This Policy">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
                </p>
              </Section>

              <Section title="9. Contact Us">
                <p>
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <ul>
                  <li>Email: privacy@siruvapurimurugan.com</li>
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

export default CookiePolicy;
