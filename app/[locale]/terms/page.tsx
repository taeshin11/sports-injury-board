import type { Metadata } from 'next';
import { FileText, AlertTriangle } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Use | SportsInjuryBoard',
    description:
      'Terms of use for SportsInjuryBoard. Injury data is sourced from public information and is not guaranteed accurate. Always verify before making lineup or betting decisions.',
    alternates: { canonical: 'https://sports-injury-board.vercel.app/terms' },
  };
}

export default async function TermsPage({
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
            <FileText className="w-5 h-5 text-rose-400" />
            <span className="text-rose-300 text-sm font-medium uppercase tracking-wide">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">Terms of Use</h1>
          <p className="text-rose-300 text-sm">Effective date: {effectiveDate}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Important:</strong> Injury data displayed on SportsInjuryBoard is sourced from publicly available
            information and is provided for informational purposes only. It is not guaranteed to be accurate, complete,
            or current. Always verify player status with official team and league sources before making fantasy sports
            lineup decisions or sports wagers.
          </p>
        </div>

        <div className="card p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SportsInjuryBoard (the "Service") at{' '}
              <a href="https://sports-injury-board.vercel.app" className="text-[#be123c] hover:underline">
                https://sports-injury-board.vercel.app
              </a>
              , you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, do not use
              the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">2. Description of Service</h2>
            <p>
              SportsInjuryBoard is an informational website that aggregates and presents publicly available player
              injury information for the NFL, NBA, MLB, and NHL. The Service is designed to assist fantasy sports
              players and sports bettors in staying informed about player availability. We are not affiliated with,
              endorsed by, or sponsored by any professional sports league, team, or official governing body.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">3. Data Accuracy Disclaimer</h2>
            <p className="mb-3">
              All injury data, player status information, expected return dates, and fantasy impact ratings displayed
              on the Service are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Sourced from publicly available reports, team announcements, and league communications</li>
              <li>Subject to change at any time without notice</li>
              <li><strong>Not guaranteed to be accurate, complete, up-to-date, or free from errors</strong></li>
              <li>Provided on an "as-is" and "as-available" basis</li>
            </ul>
            <p className="mt-3">
              <strong>Always verify player injury status directly with official team injury reports, league
              transaction wires, or reputable sports news sources before making any fantasy sports lineup decisions
              or placing sports wagers.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">4. No Liability for Fantasy or Betting Losses</h2>
            <p className="mb-3">
              SportsInjuryBoard expressly disclaims all liability for any losses, damages, or adverse outcomes arising
              from your use of, or reliance on, the information provided on the Service, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Fantasy sports lineup decisions that result in poor performance or lost contests</li>
              <li>Sports wagers placed based on injury information displayed on the Service</li>
              <li>Financial losses of any kind related to sports betting or daily fantasy sports</li>
              <li>Decisions made in reliance on inaccurate, outdated, or incomplete injury data</li>
            </ul>
            <p className="mt-3">
              Sports betting involves significant financial risk. Always gamble responsibly and within your means.
              If you or someone you know has a gambling problem, contact the{' '}
              <a href="https://www.ncpgambling.org/" className="text-[#be123c] hover:underline" target="_blank" rel="noopener noreferrer">
                National Council on Problem Gambling
              </a>{' '}
              at 1-800-522-4700.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">5. Intellectual Property</h2>
            <p>
              The design, layout, code, and original content of the Service are the property of SportsInjuryBoard and
              are protected by applicable intellectual property laws. Player names, team names, and league names are the
              trademarks or service marks of their respective owners. Your use of the Service does not grant you any
              rights to these trademarks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">6. Permitted Use</h2>
            <p className="mb-3">You may use the Service for personal, non-commercial informational purposes. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Scrape, crawl, or systematically download content from the Service without permission</li>
              <li>Reproduce or republish substantial portions of Service content without attribution</li>
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure</li>
              <li>Use automated tools to access the Service in a manner that burdens our servers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">7. Third-Party Links and Advertising</h2>
            <p>
              The Service may display third-party advertisements (including through Google AdSense) and links to
              external websites. We do not endorse and are not responsible for the content, accuracy, or practices of
              any third-party sites or advertisers. Your interactions with third-party services are governed by their
              own terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
              BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
              NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF
              VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPORTSINJURYBOARD SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS,
              DATA LOSS, OR FINANCIAL LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, EVEN IF
              WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a
              revised effective date. Continued use of the Service after modifications are posted constitutes your
              acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the United States, without
              regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1c0010] mb-3">12. Contact</h2>
            <p>
              Questions about these Terms can be sent to{' '}
              <a href="mailto:legal@sports-injury-board.vercel.app" className="text-[#be123c] hover:underline">
                legal@sports-injury-board.vercel.app
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
