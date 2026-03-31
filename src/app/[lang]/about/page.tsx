'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Rocket, Code2, Sparkles } from 'lucide-react';

const founders = [
  {
    name: 'Simone Di Natale',
    role: 'Co-Founder & CEO',
    initials: 'SD',
    quote: '"La tecnologia migliore è quella che sparisce nelle mani dell\'utente."',
    bio: 'Visionario digitale con un\'ossessione per l\'esperienza utente. Simone ha trasformato la sua passione per il problem solving in una missione: rendere la tecnologia invisibile e potente. Mentre i suoi coetanei navigavano social, lui progettava soluzioni che milioni di persone avrebbero usato senza sapere chi ringraziare. Leader naturale con un radar infallibile per le opportunità di mercato, guida la strategia di prodotto e le partnership commerciali di Taormina Vibe.',
    skills: ['Product Strategy', 'UX Design', 'Business Dev'],
    gradient: 'from-sunset-orange to-sunset-gold',
  },
  {
    name: 'Alessio Di Bella',
    role: 'Co-Founder & CTO',
    initials: 'AD',
    quote: '"Il codice pulito è poesia. Il codice che scala è architettura."',
    bio: 'Architetto del codice con la mentalità di un ingegnere aerospaziale. Alessio scrive sistemi come se costruisse ponti: ogni riga deve reggere il peso del mondo reale. La sua capacità di trasformare idee astratte in infrastrutture concrete è quasi inquietante. Dall\'ottimizzazione degli algoritmi all\'infrastruttura cloud, è la mente tecnica che tiene in piedi tutto. Se Taormina Vibe fosse una macchina, Alessio sarebbe il motore.',
    skills: ['System Architecture', 'Full-Stack Dev', 'Cloud & DevOps'],
    gradient: 'from-sunset-rose to-sunset-orange',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-20">
      {/* Top bar */}
      <nav className="sticky top-0 z-50 px-4 py-3 bg-sea-deep/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span className="sunset-text font-display font-bold text-sm">
            Taormina Vibe
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center pt-16 sm:pt-24 pb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-sunset-gold" />
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-white/60">
              Chi Siamo
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
            <span className="text-ceramic-white">Due menti,</span>
            <br />
            <span className="sunset-text">una visione.</span>
          </h1>

          <p className="text-white/50 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Nati sotto l&apos;Etna, forgiati dall&apos;ingegneria, guidati dall&apos;ambizione di trasformare ogni esperienza in qualcosa di straordinario.
          </p>
        </motion.section>

        {/* Origin story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-10 mb-12 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] bg-sunset-orange/8 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-[60px] bg-sunset-gold/6 pointer-events-none" />

          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-sunset-orange" />
            <span className="text-sunset-orange font-sans text-xs font-bold tracking-[0.2em] uppercase">
              La Genesi
            </span>
          </div>

          <div className="relative z-10 space-y-4 text-white/60 font-sans text-sm sm:text-base leading-relaxed">
            <p>
              Tutto è iniziato tra le aule del <strong className="text-ceramic-white">Dipartimento di Ingegneria Informatica dell&apos;Università di Catania</strong>, dove due studenti con background diversi ma la stessa ossessione — costruire cose che la gente ama usare — si sono trovati.
            </p>
            <p>
              Mentre gli altri studiavano per passare esami, <strong className="text-ceramic-white">Simone</strong> e <strong className="text-ceramic-white">Alessio</strong> studiavano per cambiare le regole del gioco. Hackathon, notti a programmare, prototipi lanciati il lunedì e pivotati il venerdì. Una palestra di fallimenti rapidi e lezioni preziose.
            </p>
            <p>
              Poi, un&apos;estate a Taormina, l&apos;intuizione: <em className="text-sunset-gold">&quot;I turisti meritano di meglio di una guida PDF.&quot;</em> 
              Da quella frase è nato <strong className="text-ceramic-white">Taormina Vibe</strong> — non un&apos;app, ma un modo completamente nuovo di vivere una città.
            </p>
          </div>
        </motion.section>

        {/* Founder cards */}
        <div className="space-y-8 mb-16">
          {founders.map((founder, index) => (
            <motion.section
              key={founder.name}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Avatar with initials */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className={`flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br ${founder.gradient} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white">
                    {founder.initials}
                  </span>
                </motion.div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-ceramic-white mb-1">
                    {founder.name}
                  </h2>
                  <p className={`text-sm font-sans font-bold tracking-wider uppercase bg-gradient-to-r ${founder.gradient} bg-clip-text text-transparent mb-3`}>
                    {founder.role}
                  </p>

                  {/* Quote */}
                  <blockquote className="text-white/40 font-sans text-sm italic border-l-2 border-sunset-orange/30 pl-4 mb-4">
                    {founder.quote}
                  </blockquote>

                  {/* Bio */}
                  <p className="text-white/60 font-sans text-sm leading-relaxed mb-4">
                    {founder.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-[10px] font-sans font-semibold tracking-wider uppercase rounded-full bg-white/5 text-white/50 border border-white/8"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Stats row */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {[
            { value: '∞', label: 'Ore di Codice', icon: <Code2 className="w-4 h-4" /> },
            { value: '2', label: 'Founders', icon: <Rocket className="w-4 h-4" /> },
            { value: '1', label: 'Visione', icon: <Sparkles className="w-4 h-4" /> },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <div className="text-sunset-orange mx-auto mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-display font-bold sunset-text mb-1">
                {stat.value}
              </div>
              <div className="text-white/40 text-[10px] font-sans font-medium tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Mission statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] bg-sunset-orange/10 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] bg-sunset-gold/8 pointer-events-none" />

            <div className="relative z-10">
              <Rocket className="w-8 h-8 text-sunset-orange mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ceramic-white mb-4">
                La Nostra Missione
              </h2>
              <p className="text-white/50 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                Rendere ogni viaggio un&apos;esperienza irripetibile. Non costruiamo app — costruiamo <strong className="text-sunset-gold">ponti tra le persone e i luoghi</strong>. Taormina è solo l&apos;inizio.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <Link
            href={`/`}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-sans font-bold rounded-full text-sm tracking-wide transition-all translate-y-0 hover:-translate-y-1"
          >
            Torna alla Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
