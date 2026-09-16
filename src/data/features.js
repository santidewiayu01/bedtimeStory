import { Gamepad2, Trophy, ShieldCheck, HeartHandshake } from 'lucide-react'

// Four core MiniLemon value/benefit props shown in FeaturesSection.
// Colors are Tailwind token names (not hex) so FeatureCard can map
// each one to the matching bg/icon utility classes.
export const features = [
  {
    id: 'belajar-sambil-bermain',
    icon: Gamepad2,
    title: 'Belajar Sambil Bermain',
    desc: 'Quiz, teka-teki, dan game edukasi yang menyenangkan.',
    tone: 'lavender',
  },
  {
    id: 'poin-dan-badge',
    icon: Trophy,
    title: 'Kumpulkan Poin dan Badge',
    desc: 'Dapatkan poin setiap kali belajar dan selesaikan misi.',
    tone: 'yellow',
  },
  {
    id: 'aman-untuk-anak',
    icon: ShieldCheck,
    title: 'Aman untuk Anak-anak',
    desc: 'Konten berkualitas, bebas iklan, dan ramah untuk semua usia.',
    tone: 'mint',
  },
  {
    id: 'nilai-kebaikan',
    icon: HeartHandshake,
    title: 'Belajar Nilai Kebaikan',
    desc: 'Setiap cerita mengajarkan sikap dan akhlak mulia.',
    tone: 'coral',
  },
]
