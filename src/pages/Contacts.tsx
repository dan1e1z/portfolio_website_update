import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import ContactForm from "@/components/contact/ContactForm";
import { contactInfo, socialLinks } from "@/data/contact";
import { motion } from "framer-motion";
import Arrow from "@/animations/Arrow";
import { useRef, useMemo } from "react";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import { ScrollArea } from "@/components/ui/scroll-area";

const ContactPage = () => {
  const slideInVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 1.5,
        delay: 0.2,
      },
    },
  };

  const containerRef = useRef(null);

  const dimensions = useContainerDimensions(containerRef);

  const config = useMemo(() => {
    const width = dimensions?.width || 1000;

    const contentPosition =
      width < 1072 ? "flex flex-col gap-12" : "flex flex-row";

    let arrowPlacement = "hidden";
    if (width < 548) {
      arrowPlacement = "hidden";
    } else if (width < 706) {
      arrowPlacement = "mr-[2vw]";
    } else if (width < 868) {
      arrowPlacement = "mr-[8vw]";
    } else if (width < 1072) {
      arrowPlacement = "mr-[16vw]";
    }

    return {
      contentPosition,
      arrowPlacement,
    };
  }, [dimensions?.width]);

  const isColumnLayout = config.contentPosition === "flex flex-col gap-12";

  return (
    <ScrollArea
      viewportRef={containerRef}
      className="h-full w-full bg-[#1c1915] md:rounded-2xl relative"
    >
      <div className={`${config.contentPosition} p-6 relative`}>
        {/* Left Column - Contact Info */}
        <div className="flex flex-col gap-12 text-[#eee9cc] relative">
          <div className="flex-1 relative">
            <div className="relative">
              <h1 className="text-6xl mb-8 font-sometimesTimes">
                Contact <span className="mr-8">Me</span>
              </h1>
              {isColumnLayout && (
                <div
                  className={`absolute w-64 rotate-90 right-0 ${config.arrowPlacement}`}
                >
                  <Arrow />
                </div>
              )}
            </div>
            <p className="text-lg font-neueMontreal">
              I am here to connect,{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 2, ease: "easeIn" },
                }}
              >
                create
              </motion.span>
              , <br />
              and contribute to a future fuelled <br />
              by passion and purpose.
            </p>
            <div className="mt-4 w-6">
              <Arrow />
            </div>
          </div>
          <div className="space-y-8">
            <ContactInfo contactInfo={contactInfo} />
            <SocialLinks socialLinks={socialLinks} />
          </div>
        </div>

        <motion.div
          variants={slideInVariants}
          initial="hidden"
          animate="visible"
          className="w-[120px] ml-[20px] mr-[20px] border-l border-l-[#eee9cc] border-r border-r-[#eee9cc]"
        />
        <motion.div
          variants={slideInVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-[#eee9cc]"
        >
          <ContactForm containerRef={containerRef} />
        </motion.div>
      </div>
    </ScrollArea>
  );
};

export default ContactPage;
