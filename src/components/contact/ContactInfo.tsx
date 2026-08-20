// import { ContactInfo as ContactInfoType } from "@/types/contact";
// import { useState, useEffect } from "react";
//
// interface ContactInfoProps {
//   contactInfo: ContactInfoType[];
// }
//
// const ContactInfo = ({ contactInfo }: ContactInfoProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//
//   useEffect(() => {
//     console.log("isHovered", isHovered);
//   }, [isHovered]);
//
//   return (
//     <ul className="space-y-6">
//       {contactInfo.map(({ label, text, type }) => (
//         <li key={text}>
//           <p className="text-sm uppercase mb-1">{label}</p>
//           <a
//             href={type === "email" ? `mailto:${text}` : `tel:${text}`}
//             className="text-1xl font-medium uppercase relative inline-block"
//             style={{
//               transform: isHovered ? "translateZ(5px)" : "scale(1)",
//               transition: "transform 1s cubic-bezier(.19, 1, .22, 1)",
//             }}
//             onMouseEnter={() => {
//               setIsHovered(true);
//             }}
//             onMouseLeave={() => {
//               setIsHovered(false);
//             }}
//           >
//             {text}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// };
//
// export default ContactInfo;

// TEST1
// import { ContactInfo as ContactInfoType } from "@/types/contact";
// import { useState, useEffect } from "react";
//
// interface ContactInfoProps {
//   contactInfo: ContactInfoType[];
// }
//
// const ContactInfo = ({ contactInfo }: ContactInfoProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//
//   useEffect(() => {
//     console.log("isHovered", isHovered);
//   }, [isHovered]);
//
//   return (
//     <ul className="space-y-6">
//       {contactInfo.map(({ label, text, type }) => (
//         <li key={text}>
//           <p className="text-sm uppercase mb-1">{label}</p>
//           <a
//             href={type === "email" ? `mailto:${text}` : `tel:${text}`}
//             className="text-1xl font-medium uppercase inline-block"
//             style={{
//               // transform: isHovered ? "translateZ(0)" : "scale(1)",
//               transform: isHovered
//                 ? "translate3d(0, -100%, 0)"
//                 : "translateZ(0)",
//               transition: "transform 1s cubic-bezier(.19, 1, .22, 1)",
//             }}
//             onMouseEnter={() => {
//               setIsHovered(true);
//             }}
//             onMouseLeave={() => {
//               setIsHovered(false);
//             }}
//           >
//             {text}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// };
//
// export default ContactInfo;

// TEST2
import { ContactInfo as ContactInfoType } from "@/types/contact";
import { useState } from "react";

interface ContactInfoProps {
  contactInfo: ContactInfoType[];
}

const ContactInfo = ({ contactInfo }: ContactInfoProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Function to split text into array of characters with their indices
  const splitText = (text: string) => {
    return text.split("").map((char, idx) => ({
      char,
      idx,
    }));
  };

  return (
    <ul className="space-y-6">
      {contactInfo.map(({ label, text, type }, itemIndex) => {
        const characters = splitText(text);

        return (
          <li key={text}>
            <p className="text-sm uppercase mb-1">{label}</p>
            <a
              href={type === "email" ? `mailto:${text}` : `tel:${text}`}
              className="relative inline-block font-medium uppercase"
              onMouseEnter={() => setHoveredIndex(itemIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top layer */}
              <div className="relative">
                {characters.map(({ char, idx }) => (
                  <span
                    key={`${char}-${idx}-top`}
                    className="inline-block transition-transform duration-500 transform-gpu preserve-3d origin-bottom cursor-pointer"
                    style={{
                      transitionDelay: `${idx * 50}ms`,
                      transform:
                        hoveredIndex === itemIndex
                          ? "translate3d(0, -100%, 0) rotateX(-90deg)"
                          : "translate3d(0, 0, 0) rotateX(0deg)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>

              {/* Bottom layer */}
              <div className="absolute top-0 left-0 right-0">
                {characters.map(({ char, idx }) => (
                  <span
                    key={`${char}-${idx}-bottom`}
                    className="inline-block transition-transform duration-500 transform-gpu preserve-3d origin-top"
                    style={{
                      transitionDelay: `${idx * 50}ms`,
                      transform:
                        hoveredIndex === itemIndex
                          ? "translate3d(0, 0, 0) rotateX(0deg)"
                          : "translate3d(0, 100%, 0) rotateX(-90deg)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactInfo;
