export default function Features() {
  const features = [
    {
      icon: 'ri-heart-line',
      title: 'Compassionate Care',
      description: 'We treat every resident with the utmost care and respect.',
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Expert Staff',
      description: 'Our trained professionals provide top-quality care services.',
    },
    {
      icon: 'ri-home-smile-line',
      title: 'Comfortable Living',
      description: 'Modern facilities designed for comfort and safety.',
    },
    {
      icon: 'ri-nurse-line',
      title: '24/7 Support',
      description: 'Round-the-clock medical assistance and monitoring.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm">OUR FEATURES</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
            Why choose us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <i className={`${feature.icon} text-4xl text-teal-600 mb-4`}></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
