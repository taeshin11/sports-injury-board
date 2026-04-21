import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy | SportsInjuryBoard',
    description: 'Privacy policy for SportsInjuryBoard. Learn how we collect, use, and protect your information.',
    alternates: { canonical: 'https://sports-injury-board.vercel.app/privacy' },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  const effectiveDate = 'April 13, 2026';

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1c0010] to-[#3d0020] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-rose-400" />
            <span className="text-rose-300 text-sm font-medium uppercase tracking-wide">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">Privacy Policy</h1>
          <p className="text-rose-300 text-sm">Effective date: {effectiveDate}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">1. Introduction</h2>
            <p>
              SportsInjuryBoard ("we", "us", or "our") operates the website at{' '}
              <a href="https://sports-injury-board.vercel.app" className="text-[#be123c] hover:underline">
                https://sports-injury-board.vercel.app
              </a>{' '}
              (the "Service"). This Privacy Policy explains what information we collect when you use the Service, how we
              use it, and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">2. Information We Collect</h2>
            <h3 className="font-semibold text-[#1c0010] mb-2">2.1 Automatically Collected Data</h3>
            <p className="mb-3">
              When you visit the Service, our servers and third-party analytics providers may automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>IP address and approximate geographic location (country/region)</li>
              <li>Browser type, version, and operating system</li>
              <li>Referring URL and pages visited on the Service</li>
              <li>Date, time, and duration of your visit</li>
              <li>Device identifiers and screen resolution</li>
            </ul>

            <h3 className="font-semibold text-[#1c0010] mb-2 mt-4">2.2 Cookies and Similar Technologies</h3>
            <p>
              We and our third-party partners (including Google Analytics and Google AdSense) use cookies, web beacons,
              and similar tracking technologies to operate the Service, measure traffic, and serve relevant advertising.
              You can control cookie preferences through your browser settings. Disabling cookies may affect some
              functionality of the Service.
            </p>

            <h3 className="font-semibold text-[#1c0010] mb-2 mt-4">2.3 Information You Provide</h3>
            <p>
              We do not currently require account registration. If you contact us via email or a contact form, we collect
              the information you voluntarily provide (e.g., name, email address, message content).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>To operate, maintain, and improve the Service</li>
              <li>To analyze usage patterns and optimize content</li>
              <li>To serve relevant advertisements via Google AdSense</li>
              <li>To detect and prevent fraud, abuse, and security incidents</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To comply with applicable legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">4. Google AdSense and Advertising</h2>
            <p>
              We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior
              visits to this site or other sites. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-[#be123c] hover:underline" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
              . For more information on how Google uses data, see{' '}
              <a href="https://policies.google.com/technologies/partner-sites" className="text-[#be123c] hover:underline" target="_blank" rel="noopener noreferrer">
                Google's Privacy & Terms
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">5. Third-Party Analytics</h2>
            <p>
              We use Google Analytics to understand how visitors use the Service. Google Analytics collects data such as
              page views, session duration, and user flow. This data is aggregated and anonymized. You can opt out by
              installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#be123c] hover:underline" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">6. Sharing of Information</h2>
            <p className="mb-3">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Service providers who assist in operating the Service (e.g., hosting, analytics, advertising)</li>
              <li>Law enforcement or government authorities when required by law</li>
              <li>Successors in the event of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">7. Data Retention</h2>
            <p>
              We retain automatically collected data for as long as necessary to fulfill the purposes described in this
              policy or as required by law. Analytics data is typically retained for 26 months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">8. Your Rights</h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the processing
              of personal data we hold about you. To exercise these rights, contact us at the address below. Residents of
              the European Economic Area (EEA) and California (CCPA) have additional rights under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">9. Children's Privacy</h2>
            <p>
              The Service is not directed at children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you believe we have inadvertently collected such information,
              please contact us so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the effective date at the
              top of this page. Continued use of the Service after changes are posted constitutes your acceptance of the
              revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your data, please contact us at{' '}
              <a href="mailto:privacy@sports-injury-board.vercel.app" className="text-[#be123c] hover:underline">
                privacy@sports-injury-board.vercel.app
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
