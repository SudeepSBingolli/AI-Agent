export default function Services() {
  const services = [
    {
      title: 'In-Home Care',
      description: 'Professional caregivers providing personalized care in the comfort of your home.',
      icon: 'ri-home-line',
    },
    {
      title: 'Medical Services',
      description: 'Comprehensive medical support including medication management and health monitoring.',
      icon: 'ri-hospital-line',
    },
    {
      title: 'Daily Assistance',
      description: 'Help with activities of daily living including bathing, dressing, and meal preparation.',
      icon: 'ri-hand-heart-line',
    },
    {
      title: 'Companionship',
      description: 'Social engagement and emotional support to combat loneliness and isolation.',
      icon: 'ri-group-line',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm">OUR SERVICES</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
            Services we offer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col gap-4 p-8 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors">
              <i className={`${service.icon} text-4xl text-teal-600`}></i>
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
