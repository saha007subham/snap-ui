import imgAmazon from "../assets/amazon-dark.svg";
import imgSpotify from "../assets/spotify-dark.svg";
import imgCta from "../assets/cta-sections-dark.png";
import imgHeroes from "../assets/heroes-dark.png";
import imgPricing from "../assets/pricing-dark.png";
import imgStats from "../assets/stats-sections-dark.png";
import imgTeam from "../assets/team-sections-dark.png";
import imgTestimonials from "../assets/testimonials-dark.png";
import { motion } from "framer-motion";

import { Footer } from "@/components/core-components/Footer";

const LightningBolt = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="absolute -right-20 -top-20 w-96 h-96 text-teal-500 opacity-5 rotate-12 pointer-events-none"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const NpmIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1.2em"
    width="1.2em"
    className="text-teal-400"
  >
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1.2em"
    width="1.2em"
    className="text-teal-400"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const DiscordIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1.2em"
    width="1.2em"
    className="text-teal-400"
  >
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export function Home() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="h-full overflow-y-auto transition-colors px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-[85vh] flex flex-col items-center justify-center py-12"
      >
        <div
          style={{ position: "relative", top: "-90px", right: "60%" }}
          className="mb-8"
        >
          <LightningBolt />
        </div>

        <div className="max-w-3xl text-center">
          {/* Logo / Product Name */}
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            SnapUI
          </h2>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4">
            Build interfaces in a snap.
          </p>

          {/* Subtext */}
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Copy, customize, and ship beautiful React components instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={() => (window.location.href = "/components")}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition cursor-pointer font-medium"
            >
              Explore All Components
            </button>

            {/* Secondary CTA */}
            <button className="px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-300 dark:hover:text-white transition cursor-pointer font-medium">
              {/* Documentation */}
              Explore UI Blocks
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="min-h-[85vh] flex flex-col items-center justify-center py-12 text-center max-w-5xl mx-auto"
      >
        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Visually Stunning Interfaces
          <br />
          With Complete Design Freedom
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Create responsive, production-ready interfaces using components
          designed for performance, accessibility, and easy customization.
        </p>
      </motion.div>

      <div className="py-24 flex flex-col items-center text-center w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Ready to use SnapUI components
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            SnapUI is an open-source React component library that implements
            Google's Material Design. It's comprehensive and can be used in
            production out of the box.
          </p>
        </motion.div>

        {/* Images Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <img
              src={imgHeroes}
              alt="Heroes Section"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <img
              src={imgCta}
              alt="CTA Section"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <img
              src={imgPricing}
              alt="Pricing Section"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <img
              src={imgStats}
              alt="Stats Section"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <img
              src={imgTeam}
              alt="Team Section"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <img
              src={imgTestimonials}
              alt="Testimonials Section"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Logos Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="py-16 flex flex-col items-center justify-center mt-8 mb-24 max-w-6xl mx-auto w-full"
      >
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 w-full px-4 mb-10">
          <img
            style={{ height: "60px" }}
            src={imgSpotify}
            alt="Spotify"
            className="md:h-10 w-auto object-contain"
          />
          <img
            style={{ height: "60px" }}
            src={imgAmazon}
            alt="Amazon"
            className="md:h-10 w-auto object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
            alt="NASA"
            className="h-10 md:h-14 w-auto object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-6 md:h-8 w-auto object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Unity_2021.svg"
            alt="Unity"
            className="h-7 md:h-9 w-auto object-contain dark:brightness-0 dark:invert"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Shutterstock_logo.svg"
            alt="Shutterstock"
            className="h-6 md:h-8 w-auto object-contain dark:brightness-0 dark:invert"
          />
        </div>
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-center">
          The world's best product teams trust SnapUI to deliver an unrivaled
          experience for both developers and users.
        </p>
      </motion.div>

      {/* Stats / Built for developers Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="py-24 relative overflow-hidden flex flex-col items-center justify-center w-full max-w-7xl mx-auto"
      >
        <LightningBolt />

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Built for developers
            <br />
            By developers
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-center">
            Built for modern product teams. <br />
            From next-gen startups to established enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-6 max-w-5xl relative z-10">
          {/* Card 1 */}
          <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:dark:bg-slate-900/80 transition-colors">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              5.6M
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              <NpmIcon /> downloads / month
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:dark:bg-slate-900/80 transition-colors">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              40.4K
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              <GithubIcon /> github stars
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:dark:bg-slate-900/80 transition-colors">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              7.9K
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              <DiscordIcon /> discord members
            </div>
          </div>
        </div>
      </motion.div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
