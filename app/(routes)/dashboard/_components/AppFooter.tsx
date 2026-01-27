import Image from 'next/image'
import React from 'react'


function AppFooter() {
  return (
    <footer className="bg-gray-300 border-t mt-20">
      <div className="px-10 md:px-20 lg:px-40 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="logo"
              width={160}
              height={80}
            />
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              AI-powered doctor consultation platform providing
              expert guidance anytime, anywhere.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">History</li>
              <li className="hover:text-black cursor-pointer">Pricing</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Help Center</li>
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
              <li className="hover:text-black cursor-pointer">Terms of Service</li>
              <li className="hover:text-black cursor-pointer">Contact Us</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MediVoice AI. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built by Rukshan Ekanayake
          </p>
        </div>

      </div>
    </footer>
  )
}

export default AppFooter
