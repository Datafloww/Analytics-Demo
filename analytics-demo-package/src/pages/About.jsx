
const About = () => {
  return (
    <div className="animate-fade-in py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About This Template</h1>
          <p className="mt-4 text-lg text-gray-500">
            Learn more about the technologies used in this template.
          </p>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10" src={tech.logo} alt={tech.name} />
                    </div>
                    <h3 className="ml-3 text-xl font-semibold text-gray-900">{tech.name}</h3>
                  </div>
                  <p className="mt-3 text-base text-gray-500">{tech.description}</p>
                </div>
                <div className="mt-6">
                  <a
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Why Use This Template?</h2>
          <div className="mt-6 prose prose-blue prose-lg text-gray-500 mx-auto">
            <p>
              This React + Vite template provides a solid foundation for your web application projects.
              It combines the power of React, the speed of Vite, and the utility of Tailwind CSS to
              create a developer-friendly environment that makes building web apps more efficient.
            </p>
            <p>
              With this template, you get:
            </p>
            <ul>
              <li>Fast refresh and HMR (Hot Module Replacement)</li>
              <li>Optimized build process</li>
              <li>Modern JavaScript features</li>
              <li>Responsive design out of the box</li>
              <li>Clean and organized file structure</li>
              <li>Ready-to-use components</li>
            </ul>
            <p>
              Whether you're building a small project or starting a large application, this template
              provides the essential tools and structure to help you succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Technology data
const technologies = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces with a component-based architecture.',
    logo: 'https://reactjs.org/favicon.ico',
    link: 'https://reactjs.org/'
  },
  {
    name: 'Vite',
    description: 'A build tool that provides a faster and leaner development experience for modern web projects.',
    logo: 'https://vitejs.dev/logo.svg',
    link: 'https://vitejs.dev/'
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapidly building custom designs without leaving your HTML.',
    logo: 'https://tailwindcss.com/favicons/favicon-32x32.png',
    link: 'https://tailwindcss.com/'
  },
  {
    name: 'React Router',
    description: 'A collection of navigational components that compose declaratively with your application.',
    logo: 'https://reactrouter.com/favicon-light.png',
    link: 'https://reactrouter.com/'
  }
];

export default About;
