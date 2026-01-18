import { Link } from "react-router-dom";
import samosa from "/images/samosa.avif"
interface Button {
  id: number;
  text: string;
  link: string;
  bgColor: string;
  hoverColor: string;
  textColor: string;
}

const Hero = () => {
  const heroButtons: Button[] = [
    {
      id: 1,
      text: "Create Student",
      link: "/students",
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-white"
    },
    {
      id: 2,
      text: "Browse Snacks",
      link: "/snacks",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      textColor: "text-white"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">School Canteen</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Order your favorite snacks with ease. Create an account, browse our delicious menu, and place your orders in minutes.
          </p>
          <div className="flex gap-4 flex-wrap">
            {heroButtons.map((button) => (
              <Link
                key={button.id}
                to={button.link}
                className={`${button.bgColor} ${button.hoverColor} ${button.textColor} px-2 py-1.5 md:px-8 md:py-3 rounded-lg font-bold text-lg transition transform hover:scale-95`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="w-[60%] mx-auto border border-gray-200 rounded-lg"><img src={samosa} className="rounded-lg" alt="Samosa" /></div>
          <p className="text-2xl font-semibold text-gray-700 mt-4">Delicious Snacks Await</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
