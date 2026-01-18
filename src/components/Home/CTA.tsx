import { Link } from "react-router-dom";

interface Button {
  id: number;
  text: string;
  link: string;
  bgColor: string;
  hoverColor: string;
  textColor: string;
}

const CTA = () => {
  const ctaButtons: Button[] = [
    {
      id: 1,
      text: "Create Your Account",
      link: "/students",
      bgColor: "bg-white",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-green-600"
    },
    {
      id: 2,
      text: "Start Ordering",
      link: "/snacks",
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-white"
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Order?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join hundreds of students enjoying fresh, delicious snacks from our canteen.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {ctaButtons.map((button) => (
              <Link
                key={button.id}
                to={button.link}
                className={`${button.bgColor} ${button.hoverColor} ${button.textColor} px-8 py-3 rounded-lg font-semibold transition`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
