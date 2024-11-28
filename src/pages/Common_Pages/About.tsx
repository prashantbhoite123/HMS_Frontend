import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="min-h-screen p-2 bg-gray-50 text-gray-900 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          About Our Hospital & Patient Management System
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 font-semibold">
          An innovative healthcare management system designed to simplify
          hospital operations, improve patient care, and provide seamless
          appointment booking.
        </p>
      </div>

      <div className="mt-16 px-4 text-center bg-white py-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-indigo-600">
          Powerful Admin Panels
        </h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600 font-semibold">
          Our system provides three distinct admin roles: **Admin**, **Hospital
          Manager**, and **Doctor**. Each role has unique controls to ensure a
          smooth workflow and better management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Admin Panel
            </h3>
            <p className="mt-4 text-lg text-gray-700 font-semibold">
              The Admin has full control over all aspects of the system,
              managing hospital registrations, approving or rejecting hospitals,
              and overseeing all patient and user accounts.
            </p>
          </div>

          <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Hospital Manager Panel
            </h3>
            <p className="mt-4 text-lg text-gray-700 font-semibold">
              The Hospital Manager can manage hospital staff, appointments,
              doctor profiles, and patient scheduling. They are responsible for
              ensuring smooth operations within the hospital.
            </p>
          </div>

          <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Doctor Panel
            </h3>
            <p className="mt-4 text-lg text-gray-700 font-semibold">
              The Doctor controls their own appointment schedule, view patient
              records, and interact with patients. This panel allows doctors to
              stay organized and deliver better care.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 px-4 text-center">
        <h2 className="text-3xl font-semibold text-indigo-600">
          Patient Benefits
        </h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600 font-semibold">
          Our system is built with the patient’s convenience in mind, offering a
          seamless, transparent, and user-friendly interface to manage
          healthcare needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Easy Appointment Booking
            </h3>
            <p className="mt-4 text-lg text-gray-700 font-semibold">
              Patients can quickly search for hospitals based on their medical
              conditions and symptoms, making appointment booking easier and
              faster.
            </p>
          </div>

          <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-indigo-600">
              Comprehensive Medical Information
            </h3>
            <p className="mt-4 text-lg text-gray-700 font-semibold">
              Patients can view their medical history, track past appointments,
              and keep all relevant health information at their fingertips.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/contact"
          className="inline-block px-6 py-3 text-lg font-semibold text-indigo-600 bg-pink-300 rounded-lg shadow-md hover:bg-pink-400 transition-all duration-300 ease-in-out"
        >
          Contact Us to Learn More
        </Link>
      </div>
    </div>
  )
}

export default About
