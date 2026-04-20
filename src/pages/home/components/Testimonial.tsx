export default function Testimonial() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Family Member',
      text: 'The care team has been incredible with my mother. She feels comfortable and well-cared for every day.',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Michael Chen',
      role: 'Family Member',
      text: 'Professional, compassionate, and reliable. We couldn\'t ask for better caregivers for our father.',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Family Member',
      text: 'The 24/7 support gives us peace of mind knowing our loved one is in good hands.',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
            What families say about us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400"></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
