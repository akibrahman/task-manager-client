const About = () => {
  return (
    <section className="bg-gray-200 py-16">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-8 text-center">
          About Our Task Management System
        </h2>
        <div className="max-w-3xl mb-8">
          <p className="text-lg text-gray-700 px-10 md:px-0">
            Welcome to our advanced task management system, designed to empower
            individuals and teams to efficiently organize, collaborate, and
            succeed in their projects. Here&apos;s what sets us apart:
          </p>
        </div>
        <div className="flex flex-col gap-20 md:flex-row items-center">
          <div className="max-w-md mb-8 md:mb-0">
            <img
              className="w-full h-auto rounded-lg shadow-md"
              src="/b1.gif"
              alt="Task Management System"
            />
          </div>
          <div className="max-w-xl ml-4">
            <ul className="list-disc text-lg text-gray-700 px-10 md:px-0">
              <li>
                Intuitive and user-friendly interface for seamless task
                management.
              </li>
              <li>
                Customizable task boards tailored to your unique workflow.
              </li>
              <li>
                Real-time collaboration with team members on tasks and projects.
              </li>
              <li>
                Powerful filtering and sorting options for enhanced
                organization.
              </li>
              <li>
                Friendly deadline reminders to keep you on track and meet your
                goals.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
