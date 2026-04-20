export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="flex gap-4">
            <div className="flex-1">
              <img
                src="https://framerusercontent.com/images/8qBJrPsRRAe8pgFv3OZG51jXc.jpg"
                alt="Senior care"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <img
                src="https://framerusercontent.com/images/aEKtvN7eD3fKEw6hRqV3uqJfmg.jpg"
                alt="Senior care"
                className="w-full h-36 object-cover rounded-lg"
              />
              <img
                src="https://framerusercontent.com/images/hlCZ1p1GlyMvHH5aVnvmP6Ny4.jpg"
                alt="Senior care"
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-teal-600 font-semibold text-sm">ABOUT US</span>
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
                Dedicated to senior wellness
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              We provide comprehensive senior care services with a focus on comfort, dignity, and quality of life. Our experienced team is committed to delivering personalized care tailored to each individual's needs.
            </p>
            <ul className="space-y-3">
              {[
                'Professional caregivers available 24/7',
                'Personalized care plans',
                'Safe and secure environment',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
