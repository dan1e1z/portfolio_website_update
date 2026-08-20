import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const interests = [
  "Web Development",
  "UI/UX Design",
  "Machine Learning",
  "Open Source",
];

const hobbies = ["Photography", "Hiking", "Reading", "Chess"];

const AnimatedTabContent = ({ tab }: { tab: string }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {tab === "education" && (
        <>
          <motion.h3
            className="text-lg font-medium text-card-foreground"
            variants={itemVariants}
          >
            Bachelor of Science in Computer Science
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground"
            variants={itemVariants}
          >
            University of Sydney
          </motion.p>
        </>
      )}
      {tab === "interests" && (
        <motion.div
          className="flex flex-wrap gap-2"
          variants={containerVariants}
        >
          {interests.map((interest, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Badge variant="secondary">{interest}</Badge>
            </motion.div>
          ))}
        </motion.div>
      )}
      {tab === "hobbies" && (
        <motion.div
          className="flex flex-wrap gap-2"
          variants={containerVariants}
        >
          {hobbies.map((hobby, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Badge variant="outline">{hobby}</Badge>
            </motion.div>
          ))}
        </motion.div>
      )}
      {tab === "about" && (
        <motion.p
          className="text-sm text-muted-foreground leading-relaxed"
          variants={itemVariants}
        >
          A passionate <strong className="text-primary">web developer</strong>{" "}
          specialising in creating{" "}
          <strong className="text-primary">
            intuitive and visually appealing interfaces
          </strong>
          . Proficient in{" "}
          <strong className="text-primary">full-stack development</strong> with
          expertise in{" "}
          <strong className="text-primary">Python, TypeScript, React</strong>,
          and modern web technologies.
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedTabContent;
