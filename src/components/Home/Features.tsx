interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
}

const Features = () => {
  const features: Feature[] = [
    {
      id: 1,
      icon: "⚡",
      title: "Quick Orders",
      description: "Place your order in just a few clicks and get your favorite snacks delivered to you.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      icon: "😋",
      title: "Fresh Snacks",
      description: "Enjoy a wide variety of fresh and delicious snacks prepared fresh daily.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: 3,
      icon: "🎯",
      title: "Easy Account",
      description: "Create your account in seconds with just your name. No complicated registration process.",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature:Feature) => (
            <div
              key={feature.id}
              className={`${feature.bgColor} p-8 rounded-lg border-2 ${feature.borderColor} hover:shadow-lg transition`}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
