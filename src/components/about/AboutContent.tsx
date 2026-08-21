import { motion } from "framer-motion";

const AboutContent = () => {

  return (
    <>
      <div
        className="min-h-[90dvh] border-b border-b-[#EEE9CC] bg-[#1d1915] px-4 py-12 md:min-h-screen md:px-8 md:py-20"
        id="about1"
      >
        <div className="mx-auto flex min-h-[inherit] w-full max-w-7xl items-center">
          <div className="grid w-full items-center gap-8 md:grid-cols-[minmax(12rem,0.8fr)_minmax(0,1.4fr)] md:gap-16">
            <motion.h2 className="font-neueMontreal text-[clamp(3.75rem,10vw,8rem)] leading-[0.86] tracking-[-0.04em] text-[#EEE9CC]">
              About
              <br />
              Me
            </motion.h2>

            <p className="max-w-2xl text-pretty font-neueMontreal text-[clamp(0.9rem,1.6vw,1.25rem)] leading-relaxed text-muted-foreground">
              A passionate <strong className="text-[#EEE9CC]">web developer</strong> specialising in creating{" "}
              <strong className="text-[#EEE9CC]">intuitive and visually appealing interfaces</strong>. Proficient in{" "}
              <strong className="text-[#EEE9CC]">full-stack development</strong> with expertise in{" "}
              <strong className="text-[#EEE9CC]">Python, TypeScript, React</strong>, and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
