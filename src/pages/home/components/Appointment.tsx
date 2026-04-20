import { useState } from 'react';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment scheduled:', formData);
    setFormData({ name: '', email: '', phone: '', date: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-12">
            <span className="text-teal-600 font-semibold text-sm">SCHEDULE NOW</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
              Book your free consultation
            </h2>
            <p className="text-gray-600 mt-4">
              Fill out the form below and our team will contact you to discuss your care needs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors mt-6"
            >
              Schedule consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
