export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <img
              src="https://framerusercontent.com/images/Lo1O0F6geJ5mTnLFDqcUCsY0eEI.svg"
              alt="Senior Care"
              width={140}
              height={38}
              className="h-9 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed">
              Providing compassionate senior care services with a focus on comfort and dignity.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">In-Home Care</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Medical Support</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Daily Assistance</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Companionship</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+5588458890" className="hover:text-teal-400 transition-colors">
                  +(558) 845-889
                </a>
              </li>
              <li>
                <a href="mailto:info@seniorcare.com" className="hover:text-teal-400 transition-colors">
                  info@seniorcare.com
                </a>
              </li>
              <li>123 Care Lane, Health City, HC 12345</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center md:text-left">
              &copy; 2024 Senior Care. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <i className="ri-facebook-line text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <i className="ri-twitter-line text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <i className="ri-linkedin-line text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
