"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Custom simple icons as React components
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
)

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </svg>
)

const RadioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="2" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
    <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
    <path d="M20.07 16.93a10 10 0 0 1 0-9.86" />
    <path d="M3.93 7.07a10 10 0 0 1 0 9.86" />
  </svg>
)

const CreditCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const services = [
  {
    title: "PTSP Kemenag",
    icon: "/assets/ptsp.png",
    color: "text-orange-500",
    bgColor: "bg-white/90 hover:bg-white",
    href: "",
  },
  {
    title: "Web Madrasah",
    icon: "/assets/madrasah.png",
    color: "text-blue-500",
    bgColor: "bg-white/90 hover:bg-white",
    href: "",
  },
  {
    title: "LURIK KUA",
    icon: "/assets/kua.png",
    color: "text-green-500",
    bgColor: "bg-white/90 hover:bg-white",
  },
  {
    title: "LENTERAKU",
    icon: "/assets/lentera.png",
    color: "text-red-500",
    bgColor: "bg-white/90 hover:bg-white",
  },
  {
    title: "Data & Informasi",
    icon: "/assets/data.png",
    color: "text-purple-500",
    bgColor: "bg-white/90 hover:bg-white",
  },
  {
    title: "Media Sosial",
    icon: "/assets/medsos.png",
    color: "text-orange-500",
    bgColor: "bg-white/90 hover:bg-white",
  },
  {
    title: "Aplikasi Kemenag",
    icon: "/assets/pusaka.png",
    color: "text-blue-500",
    bgColor: "bg-white/90 hover:bg-white",
  },
  {
    title: "Pengaduan dan Pelaporan",
    icon: "/assets/pengaduan.png",
    color: "text-red-500",
    bgColor: "bg-white/90 hover:bg-white",
  },
]

function getTimeGradient(hour: number) {
  if (hour >= 5 && hour < 10) {
    return "from-orange-200 via-yellow-100 to-sky-200"
  } else if (hour >= 10 && hour < 15) {
    return "from-sky-300 via-sky-200 to-green-200"
  } else if (hour >= 15 && hour < 18) {
    return "from-orange-300 via-orange-200 to-purple-200"
  } else {
    return "from-gray-900 via-gray-800 to-gray-700"
  }
}

function getCloudImage(hour: number) {
  if (hour >= 5 && hour < 15) {
    return "/assets/awanmthr.png"
  } else {
    return "/assets/awanbln.png"
  }
}

function App() {
  const [skyGradient, setSkyGradient] = useState("from-sky-200 via-sky-100 to-green-200")
  const [cloudImage, setCloudImage] = useState("/assets/awanmthr.png")

  useEffect(() => {
    const hour = new Date().getHours()
    setSkyGradient(getTimeGradient(hour))
    setCloudImage(getCloudImage(hour))

    const interval = setInterval(() => {
      const newHour = new Date().getHours()
      setSkyGradient(getTimeGradient(newHour))
      setCloudImage(getCloudImage(newHour))
    }, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card")
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-fade-in-scale")
        card.classList.remove("opacity-0")
      }, index * 100)
    })
  }, [])

  return (
    <div className="h-screen lg:overflow-hidden w-full overflow-x-hidden relative">
      {/* Sky Background with Dynamic Gradient */}
      <div className={`fixed inset-0 bg-gradient-to-b ${skyGradient} -z-10`}>
        {/* Floating Clouds - Hidden on mobile, visible on desktop */}
        <img
          src="/assets/awan.png"
          alt="Cloud"
          className="hidden lg:block absolute top-16 right-10 w-60 h-60 opacity-70 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <img
          src="/assets/awan.png"
          alt="Cloud"
          className="hidden lg:block absolute top-12 right-16 w-58 h-58 opacity-60 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <img
          src={cloudImage}
          alt="Cloud"
          className="hidden lg:block absolute top-20 left-32 w-64 h-64 opacity-80 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Pesawat - Hidden on mobile */}
      <img
        src="/assets/pesawat.png"
        alt="Pesawat"
        className="hidden lg:block fixed top-20 left-0 w-48 h-28 animate-flyFast z-0"
      />
      
      {/* Main Content - Scrollable */}
      <div className="relative z-10 h-full lg:h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-3 lg:py-4 px-4 lg:px-6 bg-transparent flex-shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <img
                  src="/kemenag.png"
                  alt="Logo Kementerian Agama"
                  className="h-12 lg:h-14 w-auto object-contain" 
                />
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-green-700">
                  Kantor Kementerian Agama
                </h3>
                <h3 className="text-base lg:text-lg font-bold text-green-700">
                  Kabupaten Kulon Progo
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-auto items-center lg:items-end">
              <Button
                variant="outline"
                className="bg-white/90 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 shadow-lg text-sm w-full lg:w-auto"
              >
                <div className="w-4 h-4 bg-orange-500 rounded mr-2" />
                Masuk ke Website Utama
              </Button>

              <a href="/link-survey" target="_blank" rel="noopener noreferrer" className="flex justify-center">
                <img
                  src="/assets/survey.png"
                  alt="Survey Layanan"
                  className="w-36 lg:w-40 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </header>

        {/* SILAKU Title */}
        <div className="text-center py-3 lg:py-4 flex-shrink-0">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-green-700 drop-shadow-sm">
            SILAKU
          </h2>
          <p className="text-base lg:text-lg xl:text-xl text-green-700 font-medium mt-1">
            Sistem Integrasi Layanan Kemenag Kulon Progo
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="w-full px-4 py-4 lg:py-4 flex-shrink-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-4xl mx-auto">
            {services.map((service) => {
              return (
                <Card
                  key={service.title}
                  className="relative hover-shine service-card overflow-hidden flex flex-col lg:flex-row items-center justify-between p-4 lg:p-5 rounded-2xl border border-[#e8dcd8] bg-[#fdfaf9] cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.03] opacity-0 hover:border-[#f0e6e2] min-h-[100px] lg:min-h-[80px]"
                >
                  <h3 className="relative z-10 text-sm text-gray-800 font-medium text-center lg:text-left leading-snug mb-2 lg:mb-0">
                    {service.title}
                  </h3>

                  <div className={`relative z-10 p-2 rounded-full bg-white/80 ${service.color} shadow-sm`}>
                    {typeof service.icon === "string" ? (
                      <img src={service.icon} alt={service.title} className="w-6 h-6 opacity-90" />
                    ) : (
                      <service.icon className="w-6 h-6 opacity-90" />
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Panorama - Hidden on mobile */}
        <div className="hidden lg:block relative w-full flex-grow min-h-0">
          <div className="absolute bottom-0 left-0 right-0 h-[240px] xl:h-[320px] bg-[url('/assets/bgrumdah.png')] bg-repeat-x bg-bottom bg-contain animate-cityMove">
          </div>
        </div>

      </div>
    </div>
  )
}

export default App