export default function Blog() {
  const posts = [
    {
      title: 'Tips for Maintaining Senior Health',
      excerpt: 'Learn practical tips to help seniors stay healthy and active.',
      image: 'https://framerusercontent.com/images/NjVzHmDEVi5LfDcVJNBvQAoN4.jpg',
      date: 'Mar 15, 2024',
    },
    {
      title: 'Understanding Dementia Care',
      excerpt: 'A comprehensive guide to caring for seniors with dementia.',
      image: 'https://framerusercontent.com/images/ibZvSr8FXz4xKzVEI1N6fkY4Tg.jpg',
      date: 'Mar 10, 2024',
    },
    {
      title: 'Nutrition for Healthy Aging',
      excerpt: 'Essential nutrients and meal ideas for senior wellness.',
      image: 'https://framerusercontent.com/images/8DKYZKEWKMDjRqC7mKOWJFxss.jpg',
      date: 'Mar 5, 2024',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-semibold text-sm">LATEST INSIGHTS</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
            Health & wellness tips
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-teal-600 font-medium hover:text-teal-700 flex items-center gap-2">
                  Read more
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
