export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#f0f4f3]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-24 lg:py-0">
        {/* Content */}
        <div className="flex flex-col gap-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight tracking-tight">
            Where comfort meets compassion
          </h1>
          <a
            href="#services"
            className="inline-flex whitespace-nowrap items-center px-6 py-3 rounded-md bg-teal-600 text-white text-sm font-medium w-fit hover:bg-teal-700 transition-colors cursor-pointer"
          >
            Explore services
          </a>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-sm text-gray-500">Give us a call:</span>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+5588458890" className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors">
                +(558) 845 889
              </a>
              <a href="tel:+8570005790" className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors">
                +(857) 000 579
              </a>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[420px] md:h-[560px] lg:h-[80vh] rounded-2xl overflow-hidden">
          <img
            src="https://framerusercontent.com/images/bthppDMRAF7Nsn4v6ieCsBf2c0.jpg"
            alt="Senior care"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
