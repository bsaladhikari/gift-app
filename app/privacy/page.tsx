"use client"

import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react"
import NavHeader from "@/components/nav-header"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <NavHeader />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="text-6xl">🔒</div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>

            <div className="mt-6 text-sm text-gray-500">
              <p>Last updated: December 2024</p>
            </div>
          </div>

          {/* Privacy Content */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-3xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">1. Introduction</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  LuxegiftAI Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our website,
                  mobile application, and services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">2. Information We Collect</h2>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Gift recipient information (names, relationships, preferences)</li>
                  <li>Communication preferences</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We automatically collect certain information about your use of our Service:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns and preferences</li>
                  <li>Gift search history and recommendations</li>
                  <li>Interaction with our AI features</li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">3. How We Use Your Information</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Provide personalized gift recommendations</li>
                  <li>Generate custom messages for your gifts</li>
                  <li>Maintain and improve our AI algorithms</li>
                  <li>Process transactions and manage your account</li>
                  <li>Send you service-related communications</li>
                  <li>Analyze usage patterns to improve our Service</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information in the following circumstances:
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Providers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share information with trusted third-party service providers who assist us in operating our
                  Service, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                  <li>Cloud hosting and storage providers</li>
                  <li>Payment processors</li>
                  <li>Analytics services</li>
                  <li>Customer support tools</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Legal Requirements</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may disclose your information if required by law or in response to valid legal requests.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Transfers</h3>
                <p className="text-gray-700 leading-relaxed">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part
                  of that transaction.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">5. Data Security</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data centers and infrastructure</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>

              {/* Your Rights */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">6. Your Rights and Choices</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">You have the following rights regarding your data:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request transfer of your data to another service
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications
                  </li>
                </ul>
              </div>

              {/* Cookies and Tracking */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic functionality
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how you use our Service
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings and preferences
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You can control cookies through your browser settings, but disabling certain cookies may affect
                  functionality.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">8. Third-Party Services</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our Service may contain links to third-party websites or integrate with third-party services (such as
                  Amazon). We are not responsible for the privacy practices of these third parties. We encourage you to
                  review their privacy policies.
                </p>
              </div>

              {/* Children's Privacy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If you become aware that a child has provided us with personal
                  information, please contact us.
                </p>
              </div>

              {/* International Users */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place to protect your information in accordance with this Privacy
                  Policy.
                </p>
              </div>

              {/* Data Retention */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and fulfill the
                  purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                </p>
              </div>

              {/* Changes to Privacy Policy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 font-medium">Email: privacy@luxegiftai.com</p>
                  <p className="text-gray-700 font-medium">Address: 123 Innovation Drive, San Francisco, CA 94105</p>
                  <p className="text-gray-700 font-medium">Phone: (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 text-center">
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 inline-block">
          <p className="text-gray-600 font-medium">
            &copy; 2024 LuxegiftAI. Making gift-giving magical <span className="inline-block animate-bounce">✨</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
