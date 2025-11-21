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

// Star Icon for Rating
const StarIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
      filled ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300"
    } hover:scale-110`}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

// Prayer Time Card Component
const PrayerTimeCard = () => {
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMinimized, setIsMinimized] = useState(true)

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Kulon Progo&country=Indonesia&method=20",
        )
        const data = await response.json()
        if (data.code === 200) {
          setPrayerTimes(data.data.timings)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching prayer times:", error)
        setLoading(false)
      }
    }

    fetchPrayerTimes()

    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  const getCurrentPrayer = () => {
    if (!prayerTimes) return null

    const now = currentTime.getHours() * 60 + currentTime.getMinutes()
    const prayers = [
      { name: "Subuh", time: prayerTimes.Fajr },
      { name: "Dzuhur", time: prayerTimes.Dhuhr },
      { name: "Ashar", time: prayerTimes.Asr },
      { name: "Maghrib", time: prayerTimes.Maghrib },
      { name: "Isya", time: prayerTimes.Isha },
    ]

    for (let i = 0; i < prayers.length; i++) {
      const [hours, minutes] = prayers[i].time.split(":")
      const prayerMinutes = Number.parseInt(hours) * 60 + Number.parseInt(minutes)

      if (now < prayerMinutes) {
        return prayers[i].name
      }
    }

    return "Subuh"
  }

  const nextPrayer = getCurrentPrayer()

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl shadow-md border-2 border-green-200 w-full lg:w-64">
        <div className="text-center text-green-700 text-sm">Memuat jadwal sholat...</div>
      </Card>
    )
  }

  if (!prayerTimes) {
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl shadow-md border-2 border-green-200 hover:shadow-lg transition-all duration-300 w-full lg:w-64">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <h3 className="text-sm font-bold text-green-700">Jadwal Sholat</h3>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-green-700 hover:text-green-900 font-bold text-lg transition-colors"
          title={isMinimized ? "Expand" : "Minimize"}
        >
          {isMinimized ? "+" : "−"}
        </button>
      </div>

      {!isMinimized && (
        <div className="space-y-1.5">
          {[
            { name: "Subuh", time: prayerTimes.Fajr },
            { name: "Dzuhur", time: prayerTimes.Dhuhr },
            { name: "Ashar", time: prayerTimes.Asr },
            { name: "Maghrib", time: prayerTimes.Maghrib },
            { name: "Isya", time: prayerTimes.Isha },
          ].map((prayer) => (
            <div
              key={prayer.name}
              className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg transition-all duration-300 ${
                prayer.name === nextPrayer
                  ? "bg-green-600 text-white font-semibold"
                  : "bg-white/60 text-gray-700 hover:bg-white/80"
              }`}
            >
              <span className="text-xs">{prayer.name}</span>
              <span className="text-xs font-mono">{prayer.time}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 text-center text-[10px] text-green-600 font-medium">Kulon Progo, Yogyakarta</div>
    </Card>
  )
}

const services = [
  {
    title: "PTSP Kemenag",
    icon: "/assets/ptsp.png",
    color: "text-orange-500",
    bgColor: "bg-white/90 hover:bg-white",
    href: "",
    description:
      "Pelayanan Terpadu Satu Pintu (PTSP) Kemenag menyediakan layanan administrasi dan perizinan dengan proses yang cepat dan transparan.",
    features: [
      { name: "Buat Akun", url: "https://ptsp-online.kemenagkulonprogo.com/site/register" },
      { name: "Masuk Aplikasi", url: "https://ptsp-online.kemenagkulonprogo.com/site/login" },
      { name: "Masuk Halaman PTSP", url: "https://ptsp-online.kemenagkulonprogo.com/" },
      { name: "Daftar Layanan dan Ketentuan Syarat", url: "https://ptsp-online.kemenagkulonprogo.com/site/syarat" },
      { name: "Standar Layanan", url: "https://kemenagkulonprogo.com/index/standar-layanan/" },
      {
        name: "Informasi pada SIPPN",
        url: "https://sippn.menpan.go.id/instansi/kantor-kementerian-agama-kabupaten-kulon-progo-176387",
      },
    ],
  },
  {
    title: "Web Madrasah",
    icon: "/assets/madrasah.png",
    color: "text-blue-500",
    bgColor: "bg-white/90 hover:bg-white",
    href: "",
    description:
      "Platform web untuk madrasah yang memudahkan pengelolaan data siswa, guru, dan akademik secara terintegrasi.",
    features: [
      { name: "MAN 1 Kulon Progo", url: "https://man1kulonprogo.sch.id/" },
      { name: "MAN 2 Kulon Progo", url: "https://man2kulonprogo.sch.id/" },
      { name: "MAN 3 Kulon Progo", url: "https://man3kulonprogo.sch.id/" },
      { name: "MTsN 1 Kulon Progo", url: "https://mtsn1kulonprogo.sch.id/" },
      { name: "MTsN 2 Kulon Progo", url: "https://mtsn2kulonprogo.sch.id/" },
      { name: "MTsN 3 Kulon Progo", url: "https://mtsn3kulonprogo.sch.id/" },
      { name: "MTsN 4 Kulon Progo", url: "https://mtsn4kulonprogo.sch.id/" },
      { name: "MTsN 5 Kulon Progo", url: "https://mtsn5kulonprogo.sch.id/" },
      { name: "MTsN 6 Kulon Progo", url: "https://mtsn6kulonprogo.sch.id/" },
      { name: "MI Muh Garongan", url: "https://mimuhgapanjatan.sch.id/" },
      { name: "MI Muh Nglinggo", url: "https://mimuhammmadiyahnglinggo.blogspot.com/" },
    ],
  },
  {
    title: "LURIK KUA",
    icon: "/assets/kua.png",
    color: "text-green-500",
    bgColor: "bg-white/90 hover:bg-white",
    href: "https://lurikjogja.id/",
  },
  {
    title: "LENTERAKU",
    icon: "/assets/lentera.png",
    color: "text-red-500",
    bgColor: "bg-white/90 hover:bg-white",
    description: "Lenteraku adalah Layanan Keagamaan untuk masyarakat Kulon Progo.",
    features: [
      { name: "Jempol Darmaji", url: "https://phu.kemenagkulonprogo.com/order", logo: "/assets/jempol.png" },
      {
        name: "Layanan Rentan",
        url: "https://ptsp-online.kemenagkulonprogo.com/site/inklusi",
        logo: "/assets/rentan.png",
      },
    ],
  },
  {
    title: "Data & Informasi",
    icon: "/assets/data.png",
    color: "text-purple-500",
    bgColor: "bg-white/90 hover:bg-white",
    description:
      "Pusat data dan informasi yang menyediakan statistik, laporan, dan analisis terkait keagamaan di Kulon Progo.",
    features: [
      { name: "Agenda Pimpinan", url: "https://kulonprogo.kemenag.go.id/index/agenda-pimpinan/" },
      {
        name: "Kemenag Dalam Angka",
        url: "https://drive.google.com/file/d/1X43J3ZZEqJnT-e6MPAVfnpM8lCcMhDNr/view?usp=sharing",
      },
      { name: "Data Pegawai", url: "https://kemenagkulonprogo.com/index/data-pegawai/" },
      { name: "Data Haji", url: "https://kemenagkulonprogo.com/index/haji-umroh/" },
      { name: "Data Pendidikan", url: "https://kemenagkulonprogo.com/index/pendidikan/" },
      { name: "Data Rumah Ibadah", url: "https://kemenagkulonprogo.com/index/data-musholla-masjid/" },
      { name: "Data Laporan Kinerja", url: "https://kemenagkulonprogo.com/index/laporan-kinerja/" },
    ],
  },
  {
    title: "Media Sosial",
    icon: "/assets/medsos.png",
    color: "text-orange-500",
    bgColor: "bg-white/90 hover:bg-white",
    description:
      "Akun media sosial resmi Kemenag Kulon Progo untuk berbagi informasi, berita, dan edukasi kepada masyarakat.",
    features: [
      { name: "YouTube", url: "https://www.youtube.com/@kemenagkulonprogo" },
      { name: "Instagram", url: "https://www.instagram.com/kemenagkulonprogo/" },
      { name: "TikTok", url: "https://www.tiktok.com/@kemenagkulonprogo" },
      { name: "Facebook", url: "https://www.facebook.com/kemenagkulonprogo" },
      { name: "Twitter", url: "https://twitter.com/kemenagkpg" },
    ],
  },
  {
    title: "Aplikasi Kemenag",
    icon: "/assets/pusaka.png",
    color: "text-blue-500",
    bgColor: "bg-white/90 hover:bg-white",
    description:
      "Aplikasi mobile resmi Kemenag yang mengintegrasikan berbagai layanan dalam satu platform yang mudah diakses.",
    features: [
      { name: "Pusaka", url: "https://pusaka-v3.kemenag.go.id/" },
      {
        name: "Haji Pintar",
        url: "https://play.google.com/store/apps/details?id=com.kemenag_haji_pintar_2019&pcampaignid=web_share&pli=1",
      },
      { name: "EMIS", url: "https://emis.kemenag.go.id/" },
      { name: "SITREN", url: "https://sitren.kemenag.go.id//" },
    ],
  },
  {
    title: "Pengaduan dan Pelaporan",
    icon: "/assets/pengaduan.png",
    color: "text-red-500",
    bgColor: "bg-white/90 hover:bg-white",
    description:
      "Saluran resmi untuk menyampaikan pengaduan, saran, dan laporan terkait pelayanan Kemenag Kulon Progo.",
    features: [
      { name: "Sistem Aduan Kemenag Kulon Progo", url: "https://ptsp-online.kemenagkulonprogo.com/site/syarat#aduan" },
      { name: "PROTEKSI", url: "https://bit.ly/PengendalianGratifikasiKemenagKP" },
      { name: "LAPOR", url: "https://www.lapor.go.id/" },
    ],
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

function RateExperienceButton() {
  const [showExperienceModal, setShowExperienceModal] = useState(false)

  return (
    <>
      {/* Mobile: Static button below cards, Desktop: Fixed floating button */}
      <div className="w-full px-4 py-8 lg:py-0 lg:fixed lg:bottom-8 lg:right-8 lg:w-auto lg:px-0 z-50">
        <button
          onClick={() => setShowExperienceModal(true)}
          className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full shadow-2xl text-base font-semibold lg:animate-bounce transition-all duration-300 hover:animate-none hover:scale-105 flex items-center justify-center gap-2"
        >
          <span className="text-2xl">⭐</span>
          <span>Ceritakan Pengalaman Anda</span>
        </button>
      </div>

      {showExperienceModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setShowExperienceModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <h2 className="text-xl font-bold text-gray-800">Ceritakan Pengalaman Anda</h2>
                </div>
                <button
                  onClick={() => setShowExperienceModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Bagikan Pengalaman Anda</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Kami ingin mendengar pengalaman Anda menggunakan layanan Kemenag Kulon Progo. Masukan Anda sangat
                    berharga untuk meningkatkan kualitas pelayanan kami.
                  </p>
                </div>

                <div className="space-y-3 mt-6">
                  <a
                    href="https://survey.kemenagkulonprogo.com/site/insert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🗒️</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">Isi Survey</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://survey.kemenagkulonprogo.com/site/publikasi-skm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📈</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">Rekap Hasil SKM</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://survey.kemenagkulonprogo.com/site/publikasi-ipk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💡</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">Rekap Hasil IPK</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowExperienceModal(false)}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

function LenterakuCard({ service, onClose }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        {service.features &&
          service.features.map((feature, index) => (
            <a
              key={index}
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <img src={feature.logo || "/placeholder.svg"} alt={feature.name} className="w-12 h-12 object-contain" />
              <span className="text-sm font-semibold text-gray-800 text-center">{feature.name}</span>
            </a>
          ))}
      </div>
    </div>
  )
}

function CardModal({ service, isOpen, onClose }) {
  const handleFeatureAction = (featureName, actionLabel) => {
    console.log(`Action: ${actionLabel} for feature: ${featureName}`)
    alert(`Anda memilih: ${actionLabel}`)
  }

  if (!isOpen || !service) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {typeof service.icon === "string" ? (
                <img src={service.icon || "/placeholder.svg"} alt={service.title} className="w-8 h-8" />
              ) : (
                <service.icon className="w-8 h-8" />
              )}
              <h2 className="text-xl font-bold text-gray-800">{service.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Daftar Layanan</h3>
              <div className="space-y-2">
                {service.features && service.features.length > 0 ? (
                  service.features.map((feature, index) => {
                    const url = feature?.url
                    return url ? (
                      <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                          <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-600 text-sm font-medium">
                              {typeof feature === "string" ? feature : feature.name}
                            </p>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg transition-colors">
                        <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-600 text-sm">
                            {typeof feature === "string" ? feature : feature.name}
                          </p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-gray-500">Belum ada layanan</p>
                )}
              </div>
            </div>

            {service.href && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Link Akses</h3>
                <p className="text-sm text-gray-600 break-all">{service.href || "Segera hadir"}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-200 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
            >
              Tutup
            </button>
            {service.href && (
              <a
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-center"
              >
                Kunjungi
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  const [skyGradient, setSkyGradient] = useState("from-sky-200 via-sky-100 to-green-200")
  const [cloudImage, setCloudImage] = useState("/assets/awanmthr.png")
  const [selectedService, setSelectedService] = useState(null)
  const [isNightTime, setIsNightTime] = useState(false)

  useEffect(() => {
    // Load Tawk.to chat widget with correct initialization
    const tawkScript = document.createElement("script")
    tawkScript.async = true
    tawkScript.src = "https://embed.tawk.to/66f4d7cde5982d6c7bb48dfc/1i8m6lur9"
    tawkScript.charset = "UTF-8"
    tawkScript.setAttribute("crossorigin", "*")
    tawkScript.onload = () => {
      console.log("[v0] Tawk.to loaded successfully")
    }
    document.head.appendChild(tawkScript)

    // Load UserWay accessibility widget
    const userwayScript = document.createElement("script")
    userwayScript.async = true
    userwayScript.src = "https://cdn.userway.org/widget.js"
    userwayScript.setAttribute("data-account", "h0kJ1XyUTx")
    userwayScript.onload = () => {
      console.log("[v0] UserWay loaded successfully")
    }
    document.head.appendChild(userwayScript)

    return () => {
      // Cleanup scripts if needed
      if (tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript)
      }
      if (userwayScript.parentNode) {
        userwayScript.parentNode.removeChild(userwayScript)
      }
    }
  }, [])

  useEffect(() => {
    const hour = new Date().getHours()
    setSkyGradient(getTimeGradient(hour))
    setCloudImage(getCloudImage(hour))
    setIsNightTime(hour < 5 || hour >= 18)

    const interval = setInterval(
      () => {
        const newHour = new Date().getHours()
        setSkyGradient(getTimeGradient(newHour))
        setCloudImage(getCloudImage(newHour))
        setIsNightTime(newHour < 5 || newHour >= 18)
      },
      1000 * 60 * 60,
    )

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
          src={cloudImage || "/placeholder.svg"}
          alt="Cloud"
          className="hidden lg:block absolute top-20 left-32 w-64 h-64 opacity-80 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Pesawat - Responsive size, larger on mobile, behind content */}
      <img
        src="/assets/pesawat.png"
        alt="Pesawat"
        className="fixed top-8 lg:top-20 left-0 w-52 h-36 lg:w-96 lg:h-64 animate-flyFast -z-10"
      />

      {/* Main Content - Scrollable on mobile, fixed on desktop */}
      <div className="relative z-10 h-full lg:h-screen flex flex-col overflow-y-auto lg:overflow-hidden">
        {/* Header */}
        <header className="w-full py-4 lg:py-6 px-4 lg:px-6 bg-transparent flex-shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <img src="/kemenag.png" alt="Logo Kementerian Agama" className="h-12 lg:h-14 w-auto object-contain" />
              </div>
              <div>
                <h3
                  className={`text-base lg:text-lg font-bold transition-colors duration-500 ${
                    isNightTime ? "text-yellow-400" : "text-green-700"
                  }`}
                >
                  Kantor Kementerian Agama
                </h3>
                <h3
                  className={`text-base lg:text-lg font-bold transition-colors duration-500 ${
                    isNightTime ? "text-yellow-400" : "text-green-700"
                  }`}
                >
                  Kabupaten Kulon Progo
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-auto items-center lg:items-end">
              {/* <Button
                onClick={() => window.location.href = "https://kulonprogo.kemenag.go.id/index/"}
                variant="outline"
                className={`bg-white/90 transition-all duration-500 shadow-lg text-sm w-full lg:w-auto ${
                  isNightTime
                    ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300"
                    : "border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mr-2 transition-colors duration-500 ${
                    isNightTime ? "bg-yellow-500" : "bg-orange-500"
                  }`}
                />
                Masuk ke Website Utama
              </Button> */}
            </div>
          </div>
        </header>

        {/* SILAKU Title */}
        <div className="text-center py-6 lg:py-8 flex-shrink-0">
        <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-extrabold ${isNightTime ? "text-yellow-400" : "text-green-700"}`}>SILAKU</h2>
        <p className={`text-base lg:text-lg xl:text-xl font-medium mt-1 ${isNightTime ? "text-yellow-300" : "text-green-700"}`}>
        Sistem Integrasi Layanan Kemenag Kulon Progo
        </p>
        </div>


        {/* NEW BUTTON POSITION UNDER SILAKU */}
        <div className="w-full flex justify-center mt-4">
          <Button
          onClick={() => window.open("https://kulonprogo.kemenag.go.id/index/", "_blank")}
          variant="outline"
          className={`bg-white/90 transition-all duration-500 shadow-lg text-sm px-12 py-6 text-xl w-80rounded-2xl ${
          isNightTime
          ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300"
          : "border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
          }`}
          >
          <div
          className={`w-4 h-4 rounded mr-2 transition-colors duration-500 ${
          isNightTime ? "bg-yellow-500" : "bg-orange-500"
          }`}
          />
          Masuk ke Website Utama
          </Button>
        </div>
        {/* <div className="text-center py-6 lg:py-8 flex-shrink-0">
          <h2
            className={`text-3xl lg:text-4xl xl:text-5xl font-extrabold drop-shadow-sm transition-colors duration-500 ${
              isNightTime ? "text-yellow-400" : "text-green-700"
            }`}
          >
            SILAKU
          </h2>
          <p
            className={`text-base lg:text-lg xl:text-xl font-medium mt-1 transition-colors duration-500 ${
              isNightTime ? "text-yellow-300" : "text-green-700"
            }`}
          >
            Sistem Integrasi Layanan Kemenag Kulon Progo
          </p>
        </div> */}

        {/* Service Cards Grid */}
        <div className="w-full px-6 py-6 lg:py-4 flex-shrink-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-6xl mx-auto">
            {services.map((service) => {
              if (service.title === "LENTERAKU") {
                return (
                  <Card
                    key={service.title}
                    onClick={() => {
                      if (service.href) {
                        window.open(service.href, "_blank")
                      } else {
                        setSelectedService(service)
                      }
                    }}
                    className="relative hover-shine service-card overflow-hidden flex flex-col lg:flex-row items-center justify-between p-4 lg:p-5 rounded-2xl border border-[#e8dcd8] bg-[#fdfaf9] cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.03] opacity-0 hover:border-[#f0e6e2] min-h-[100px] lg:min-h-[80px]"
                  >
                    <h3 className="relative z-10 text-lg text-gray-800 font-medium text-center lg:text-left leading-snug mb-2 lg:mb-0">
                      {service.title}
                    </h3>

                    <div className={`relative z-10 p-2 rounded-full bg-white/80 ${service.color} shadow-sm`}>
                      <img
                        src={service.icon || "/placeholder.svg"}
                        alt={service.title}
                        className="w-6 h-6 opacity-90"
                      />
                    </div>
                  </Card>
                )
              }

              return (
                <Card
                  key={service.title}
                  onClick={() => {
                    if (service.href) {
                      window.open(service.href, "_blank")
                    } else {
                      setSelectedService(service)
                    }
                  }}
                  className="relative hover-shine service-card overflow-hidden flex flex-col lg:flex-row items-center justify-between p-4 lg:p-5 rounded-2xl border border-[#e8dcd8] bg-[#fdfaf9] cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.03] opacity-0 hover:border-[#f0e6e2] min-h-[100px] lg:min-h-[80px]"
                >
                  <h3 className="relative z-10 text-lg text-gray-800 font-medium text-center lg:text-left leading-snug mb-2 lg:mb-0">
                    {service.title}
                  </h3>

                  <div className={`relative z-10 p-2 rounded-full bg-white/80 ${service.color} shadow-sm`}>
                    <img src={service.icon || "/placeholder.svg"} alt={service.title} className="w-6 h-6 opacity-90" />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* RATING BUTTON - Inline on mobile, below cards */}
        <div className="lg:hidden">
          <RateExperienceButton />
        </div>

        {/* Prayer Time Card - Mobile only, below rating button */}
        <div className="lg:hidden px-4 pb-24">
          <div className="max-w-sm mx-auto">
            <PrayerTimeCard />
          </div>
        </div>

        {/* Panorama - Responsive, behind content */}
        <div className="relative w-full flex-grow min-h-0 -z-10">
          <div className="absolute bottom-0 left-0 right-0 h-[120px] sm:h-[180px] lg:h-[240px] xl:h-[320px] bg-[url('/assets/bgrumdah.png')] bg-repeat-x bg-bottom bg-contain animate-cityMove"></div>
        </div>
      </div>

      {/* RATING BUTTON - Fixed floating on desktop only */}
      <div className="hidden lg:block">
        <RateExperienceButton />
      </div>

      {/* Prayer Time Card - Fixed bottom left on desktop only */}
      <div className="hidden lg:block fixed bottom-0 left-56 z-50">
        <PrayerTimeCard />
      </div>

      {selectedService?.title === "LENTERAKU" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setSelectedService(null)}
          />
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300 relative z-50">
            <div className="sticky top-0 bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {typeof selectedService.icon === "string" ? (
                  <img
                    src={selectedService.icon || "/placeholder.svg"}
                    alt={selectedService.title}
                    className="w-8 h-8"
                  />
                ) : (
                  <selectedService.icon className="w-8 h-8" />
                )}
                <h2 className="text-xl font-bold text-gray-800">{selectedService.title}</h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <LenterakuCard service={selectedService} onClose={() => setSelectedService(null)} />
            </div>
          </div>
        </div>
      ) : (
        <CardModal service={selectedService} isOpen={!!selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  )
}

export default App
