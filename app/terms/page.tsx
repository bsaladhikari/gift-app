"use client"

import { Scale, Shield, FileText, AlertCircle } from "lucide-react"
import NavHeader from "@/components/nav-header"

export default function TermsPage() {
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
              <div className="text-6xl">⚖️</div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using LuxegiftAI
            </p>

            <div className="mt-6 text-sm text-gray-500">
              <p>Last updated: December 2024</p>
            </div>
          </div>

          {/* Terms Content */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-3xl border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">1. Introduction</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to LuxegiftAI ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our
                  website, mobile application, and services (collectively, the "Service") operated by LuxegiftAI Inc.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                  of these terms, then you may not access the Service.
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Scale className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">2. Acceptance of Terms</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  By creating an account or using LuxegiftAI, you confirm that you are at least 18 years old or have
                  parental consent, and you agree to comply with these Terms and all applicable laws and regulations.
                </p>
              </div>

              {/* Description of Service */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Description of Service</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  LuxegiftAI is an AI-powered platform that provides personalized gift recommendations and generates
                  custom messages. Our services include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Personalized gift suggestions based on recipient information</li>
                  <li>AI-generated personalized messages</li>
                  <li>Integration with third-party retailers (including Amazon)</li>
                  <li>Gift history and favorites management</li>
                  <li>Browse curated gift collections</li>
                </ul>
              </div>

              {/* User Accounts */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. User Accounts</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To access certain features, you may need to create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Updating your information to keep it current</li>
                </ul>
              </div>

              {/* Acceptable Use */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">5. Acceptable Use</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated tools to access the Service without permission</li>
                  <li>Interfere with or disrupt the Service</li>
                </ul>
              </div>

              {/* Third-Party Services */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Third-Party Services</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our Service may contain links to third-party websites or services (such as Amazon) that are not owned
                  or controlled by LuxegiftAI. We have no control over and assume no responsibility for the content,
                  privacy policies, or practices of any third-party websites or services.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Service and its original content, features, and functionality are and will remain the exclusive
                  property of LuxegiftAI Inc. and its licensors. The Service is protected by copyright, trademark, and
                  other laws.
                </p>
              </div>

              {/* Privacy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                  Service, to understand our practices.
                </p>
              </div>

              {/* Disclaimers */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  <h2 className="text-2xl font-bold text-gray-800 m-0">9. Disclaimers</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. LuxegiftAI makes no warranties,
                  expressed or implied, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>That the Service will meet your specific requirements</li>
                  <li>That the Service will be uninterrupted or error-free</li>
                  <li>That gift recommendations will always be suitable</li>
                  <li>That third-party services will be available or reliable</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall LuxegiftAI, its directors, employees, partners, agents, suppliers, or affiliates be
                  liable for any indirect, incidental, special, consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever, including without
                  limitation if you breach the Terms.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                  provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the State of California, United States,
                  without regard to its conflict of law provisions.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 font-medium">Email: legal@luxegiftai.com</p>
                  <p className="text-gray-700 font-medium">Address: 123 Innovation Drive, San Francisco, CA 94105</p>
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
