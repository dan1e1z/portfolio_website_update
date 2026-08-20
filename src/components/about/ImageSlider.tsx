import React from "react";
import { motion } from "framer-motion";
import { sliderItems } from "@/constants/aboutData";

interface ImageSliderProps {
  currentImageIndex: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ currentImageIndex }) => {
  return (
    <>
      {sliderItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <picture>
            <source srcSet={item.webp} type="image/webp" />
            <img
              src={item.jpg}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
          </picture>
        </motion.div>
      ))}
    </>
  );
};

export default ImageSlider;
