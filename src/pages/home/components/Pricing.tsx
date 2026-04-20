export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$500',
      period: '/month',
      description: 'Perfect for occasional assistance',
      features: [
        'Up to 10 hours per week',
        'Basic caregiving',
        'Medication reminder',
        'Emergency support',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$1,200',
      period: '/month',
      description: 'Ideal for regular care needs',
      features: [
        'Up to 30 hours per week',
        'Full caregiving services',
        'Health monitoring',
        'Meal preparation',
        '24/7 support',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$2,000',
      period: '/month',
      description: 'Complete care solution',
      features: [
        'Full-time care (40+ hours)',
        'Medical services',
        'Transportation',
        'Companionship',
        'Priority support',
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm">PRICING PLANS</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
            Transparent pricing for everyone
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 transition-all ${
                plan.highlighted
                  ? 'bg-teal-600 text-white shadow-xl'
                  : 'bg-white text-gray-900 shadow-sm hover:shadow-md'
              }`}
            >
              <h3 className={`text-2xl font-semibold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`mb-6 ${plan.highlighted ? 'text-teal-50' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-semibold">{plan.price}</span>
                <span className={plan.highlighted ? 'text-teal-100' : 'text-gray-600'}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <i className={`ri-check-line text-lg ${plan.highlighted ? 'text-teal-100' : 'text-teal-600'}`}></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-teal-600 hover:bg-teal-50'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
