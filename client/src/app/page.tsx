'use client' 
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>MeetSync</title>
        <meta name="description" content="Manage your meeting schedule efficiently." />
      </Head>

      <main className="min-h-screen flex flex-col relative bg-gray-50">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white/90 shadow-md z-10 relative">
          <div className="text-xl font-bold text-gray-800 hover:text-[#ee5c5c] transition-transform duration-300 transform hover:scale-105">
            Meet<span className="text-[#ee5c5c]">Sync</span>
          </div>
          <Link
            href="/auth"
            className="px-4 py-2 border border-[#ee5c5c] text-[#ee5c5c] rounded-md font-medium hover:bg-[#f15050] hover:text-white transition duration-300"
          >
            Login
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center flex-grow text-center px-4 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629228449753-088b6c3fa2d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')" }}
          ></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 opacity-90"></div>

          <h1
            className="relative text-4xl md:text-6xl font-extrabold text-gray-800 mt-10 z-10 transition-transform duration-700 hover:rotate-3 hover:scale-105 hover:skew-y-1"
          >
            Manage Your Meetings with MeetSync
          </h1>
          
          <p className="mt-4 text-gray-700 max-w-2xl font-medium z-10">
            Simplify scheduling, bridge time zones, and stay organized with a modern solution to coordinate all your meetings.
          </p>
          
          <div className="mt-8 z-10">
            <Link 
              href="/auth"
              className="inline-block px-8 py-3 rounded-md bg-[#ee5c5c] text-white font-semibold hover:bg-[#f15050] transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
              Why Choose MeetSync?
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card Wrapper with perspective */}
              <div className="group relative w-full h-64 [transform-style:preserve-3d] [perspective:1000px] mx-auto">
                <div className="absolute inset-0 rounded-lg shadow-sm transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 bg-gray-50 p-6 rounded-lg backface-hidden flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-gray-800">Easy Scheduling</h3>
                    <p className="mt-2 text-gray-600 text-center">
                      Create time slots, share availability, and let guests pick the perfect time without endless emails.
                    </p>
                  </div>
                  {/* Back Face */}
                  <div className="absolute inset-0 bg-[#ee5c5c] p-6 rounded-lg [transform:rotateY(180deg)] backface-hidden flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-white">Seamless Coordination</h3>
                    <p className="mt-2 text-gray-100 text-center">
                      Focus on what matters—MeetSync handles the rest.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative w-full h-64 [transform-style:preserve-3d] [perspective:1000px] mx-auto">
                <div className="absolute inset-0 rounded-lg shadow-sm transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 bg-gray-50 p-6 rounded-lg backface-hidden flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-gray-800">Timezone Support</h3>
                    <p className="mt-2 text-gray-600 text-center">
                      Meetings shown in your local timezone, so you never miss an appointment.
                    </p>
                  </div>
                  {/* Back Face */}
                  <div className="absolute inset-0 bg-[#ee5c5c] p-6 rounded-lg [transform:rotateY(180deg)] backface-hidden flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-white">Global Ready</h3>
                    <p className="mt-2 text-gray-100 text-center">
                      Collaborate across the world effortlessly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative w-full h-64 [transform-style:preserve-3d] [perspective:1000px] mx-auto">
                <div className="absolute inset-0 rounded-lg shadow-sm transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 bg-gray-50 p-6 rounded-lg backface-hidden flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-gray-800">Analytics & Insights</h3>
                    <p className="mt-2 text-gray-600 text-center">
                      Track popular times, analyze booking trends, and optimize your schedule.
                    </p>
                  </div>
                  {/* Back Face */}
                  <div className="absolute inset-0 bg-[#ee5c5c] p-6 rounded-lg [transform:rotateY(180deg)] backface-hidden flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-white">Actionable Data</h3>
                    <p className="mt-2 text-gray-100 text-center">
                      Make informed decisions with real-time insights.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 bg-gray-800 relative z-10">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-300">
            <p>© {new Date().getFullYear()} MeetSync. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}