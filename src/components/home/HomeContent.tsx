import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GRID_ITEMS } from "@/constants/homeData";
import { MediaItem } from "@/types/home";

type RowHeights = [string, string];

// GridItem.tsx
interface GridItemProps {
  item: MediaItem;
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

const GridItem = ({ item, isActive, isExpanded, onClick }: GridItemProps) => {
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
          {isActive && (
            <video
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full"
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
// hooks/useContainerDimensions.ts
const useContainerDimensions = (
  containerRef: React.RefObject<HTMLDivElement>,
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return dimensions;
};

// HomeContent.tsx
interface HomeContentProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const HomeContent: React.FC<HomeContentProps> = ({ containerRef }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rowHeights, setRowHeights] = useState<RowHeights>(["50%", "50%"]);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const dimensions = useContainerDimensions(containerRef);

  useEffect(() => {
    setTimeout(() => setIsGridVisible(true), 1000);
  }, []);

  const handleItemClick = (idx: number) => {
    if (activeIndex === idx) {
      setActiveIndex(null);
      setRowHeights(["50%", "50%"]);
      return;
    }

    setActiveIndex(idx);
    const newHeights: RowHeights =
      dimensions.width > 600
        ? idx <= 2
          ? ["70%", "30%"]
          : ["30%", "70%"]
        : ["50%", "50%"];

    setRowHeights(newHeights);
  };

  const getExpandedIndexes = (idx: number): number[] => {
    if (dimensions.width <= 600) return [idx];
    if (idx === 0 || idx === 3) return [0, 3];
    if (idx === 1 || idx === 4) return [1, 4];
    return [2, 5];
  };

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="w-full h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: isGridVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {[0, 1].map((rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row"
            style={{ height: rowHeights[rowIndex] }}
          >
            {GRID_ITEMS.slice(rowIndex * 3, (rowIndex + 1) * 3).map(
              (item, idx) => {
                const absoluteIdx = rowIndex * 3 + idx;
                const isActive = activeIndex === absoluteIdx;
                const isExpanded =
                  activeIndex !== null &&
                  getExpandedIndexes(activeIndex).includes(absoluteIdx);

                return (
                  <GridItem
                    key={absoluteIdx}
                    item={item}
                    index={absoluteIdx}
                    isActive={isActive}
                    isExpanded={isExpanded}
                    onClick={() => handleItemClick(absoluteIdx)}
                  />
                );
              },
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeContent;

// TEST1
