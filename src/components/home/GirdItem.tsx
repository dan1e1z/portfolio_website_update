// import { motion } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import { MediaItem } from "@/types/home";
//
// interface GridItemProps {
//   item: MediaItem;
//   isActive: boolean;
//   isExpanded: boolean;
//   onClick: () => void;
// }
//
// const GridItem = ({ item, isActive, isExpanded, onClick }: GridItemProps) => {
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//
//   // Initialize video when component mounts
//   useEffect(() => {
//     if (!videoRef.current) return;
//
//     const video = videoRef.current;
//
//     if (isExpanded || isActive) {
//       setIsLoading(true);
//       video.preload = "metadata";
//       const source = document.createElement("source");
//       source.src = item.videoUrl;
//       source.type = "video/mp4";
//       video.appendChild(source);
//     }
//
//     const handleCanPlayThrough = () => {
//       setVideoLoaded(true);
//       setIsLoading(false);
//     };
//
//     const handleError = () => {
//       setHasError(true);
//       setIsLoading(false);
//     };
//
//     video.addEventListener("canplaythrough", handleCanPlayThrough);
//     video.addEventListener("error", handleError);
//
//     return () => {
//       video.removeEventListener("canplaythrough", handleCanPlayThrough);
//       video.removeEventListener("error", handleError);
//       video.pause();
//       video.removeAttribute("src");
//       video.load();
//     };
//   }, [isExpanded, isActive, item.videoUrl]);
//
//   // Handle video playback
//   useEffect(() => {
//     if (!videoRef.current) return;
//
//     const video = videoRef.current;
//
//     if (isActive && videoLoaded) {
//       video.play().catch((error) => {
//         console.warn("Video autoplay failed:", error);
//       });
//     } else {
//       video.pause();
//       video.currentTime = 0;
//     }
//   }, [isActive, videoLoaded]);
//
//   return (
//     <motion.div
//       className={`relative h-full border-t border-[#eee9cc] text-[#eee9cc] md:border-r-[1px] last:border-r-0 cursor-pointer p-3 flex flex-col space-y-3 overflow-hidden
//       ${isActive || isExpanded ? "flex-[4]" : "flex-1"}`}
//       onClick={onClick}
//       layout
//     >
//       {/* Title Section */}
//       <div className="relative flex-none">
//         <h2 className="font-['ivar'] tracking-wider text-xs md:text-lg uppercase">
//           {item.title}/
//           <span className="font-['NeueMontreal'] text-[8px] md:text-[10px]">
//             {item.number}
//           </span>
//         </h2>
//         <h5 className="font-['NeueMontreal'] text-[8px] md:text-xs mt-1">
//           Details
//         </h5>
//       </div>
//
//       {/* Video Section */}
//       <motion.div
//         className={`relative flex-auto overflow-hidden
//           ${isActive ? "w-full h-full" : "w-0 h-0"}`}
//         initial={false}
//         animate={{
//           width: isActive ? "100%" : "0%",
//           height: isActive ? "100%" : "0%",
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.div
//           className="absolute top-0 left-0 w-full h-full bg-[#1c1915]"
//           initial={{ scale: 1.5, opacity: 0 }}
//           animate={{
//             scale: isActive ? 1 : 1.5,
//             opacity: isActive ? 1 : 0,
//           }}
//           transition={{ duration: 1 }}
//         >
//           {/* Loading Indicator - Always visible when loading */}
//           {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-[#1c1915] z-10">
//               <span className="text-white">Loading...</span>
//             </div>
//           )}
//
//           {/* Error State */}
//           {hasError && (
//             <div className="absolute inset-0 flex items-center justify-center bg-[#1c1915] z-10">
//               <span className="text-red-500">Failed to load video</span>
//             </div>
//           )}
//
//           {/* Video Element */}
//           {(isActive || isExpanded) && (
//             <video
//               ref={videoRef}
//               loop
//               muted
//               playsInline
//               preload="metadata"
//               className="w-full h-full object-cover"
//               width="1920"
//               height="1080"
//               style={{
//                 transform: "translateZ(0)",
//                 willChange: "transform",
//               }}
//             />
//           )}
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };
//
// export default GridItem;

// TEST1
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { MediaItem } from "@/types/home";

interface GridItemProps {
  item: MediaItem;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

const GridItem = ({ item, isActive, isExpanded, onClick }: GridItemProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize video when component mounts
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (isExpanded || isActive) {
      setIsLoading(true);
      video.preload = "metadata";
      const source = document.createElement("source");
      source.src = item.videoUrl;
      source.type = "video/mp4";
      video.appendChild(source);
    }

    const handleCanPlayThrough = () => {
      setVideoLoaded(true);
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("error", handleError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [isExpanded, isActive, item.videoUrl]);

  // Handle video playback
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (isActive && videoLoaded) {
      video.play().catch((error) => {
        console.warn("Video autoplay failed:", error);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, videoLoaded]);

  return (
    <motion.div
      className={`relative h-full border-t border-[#eee9cc] text-[#eee9cc] md:border-r-[1px] last:border-r-0 cursor-pointer p-3 flex flex-col space-y-3 overflow-hidden
      ${isActive || isExpanded ? "flex-[4]" : "flex-1"}`}
      onClick={onClick}
      layout
    >
      {/* Title Section */}
      <div className="relative flex-none">
        <h2 className="font-['ivar'] tracking-wider text-xs md:text-lg uppercase">
          {item.title}/
          <span className="font-['NeueMontreal'] text-[8px] md:text-[10px]">
            {item.number}
          </span>
        </h2>
        <h5 className="font-['NeueMontreal'] text-[8px] md:text-xs mt-1">
          Details
        </h5>
      </div>

      {/* Video Section */}
      <motion.div
        className={`relative flex-auto overflow-hidden
          ${isActive ? "w-full h-full" : "w-0 h-0"}`}
        initial={false}
        animate={{
          width: isActive ? "100%" : "0%",
          height: isActive ? "100%" : "0%",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[#1c1915]"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{
            scale: isActive ? 1 : 1.5,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 1 }}
        >
          {/* Loading Indicator - Always visible when loading */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1c1915] z-10">
              <span className="text-white">Loading...</span>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1c1915] z-10">
              <span className="text-red-500">Failed to load video</span>
            </div>
          )}

          {/* Video Element */}
          {(isActive || isExpanded) && (
            <div className="relative w-full h-full overflow-hidden">
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
                style={{
                  transform: "translate(-50%, -50%)",
                  willChange: "transform",
                }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GridItem;
