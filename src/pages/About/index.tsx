import React from "react";

type AboutPageProps = {
  className?: string;
};

export const AboutPage = ({ className = "" }: AboutPageProps) => {
  return (
    <section className={`container mx-auto p-6 lg:px-8 ${className}`}>
      <header className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 mt-4">
          About Us
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante venenatis, suscipit nisl at, lacinia nunc.
        </p>
      </header>
      {/* Mission & Vision */}
      <section id="mission" className="mt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-gray-600">
              I hope this test will pass the interview test and I am genuinely
              excited about the opportunity to demonstrate my skills, my
              dedication, and my ability to contribute meaningfully to the
              organization. My mission is to showcase not only technical
              proficiency but also a strong work ethic, adaptability, and the
              willingness to continuously learn and grow within the company. I
              believe that joining Amartha will allow me to make a positive impact
              while working with a team that values innovation and collaboration.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-800">Vision</h3>
            <p className="mt-3 text-gray-600">
              My vision is to become a valuable team member who contributes to
              Amartha’s goals by embracing challenges, driving creative solutions,
              and fostering collaboration across teams. I aim to grow alongside
              the company, learning from mentors and colleagues, while actively
              sharing my own perspectives to strengthen the team. Ultimately, I
              envision a future where my contributions help Amartha innovate,
              succeed, and make an even greater impact in the industry, while I
              personally develop into a more experienced and versatile
              professional.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}