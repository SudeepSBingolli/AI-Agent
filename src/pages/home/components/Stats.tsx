export default function Stats() {
  const stats = [
    {
      number: '500+',
      label: 'Seniors Cared For',
    },
    {
      number: '50+',
      label: 'Professional Caregivers',
    },
    {
      number: '10+',
      label: 'Years Experience',
    },
    {
      number: '99%',
      label: 'Satisfaction Rate',
    },
  ];

  return (
    <section className="py-20 bg-teal-600">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <h3 className="text-5xl md:text-6xl font-semibold mb-2">{stat.number}</h3>
              <p className="text-teal-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
