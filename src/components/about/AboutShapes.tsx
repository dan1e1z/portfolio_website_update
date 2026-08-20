// import useContainerDimensions from "@/hooks/useContainerDimensions";
// import RectangleAnimation from "@/animations/RectangleAnimation";
//
// const AboutShapes = () => {
//   const [setContainerRef, dimensions] = useContainerDimensions();
//   console.log(dimensions);
//
//   const width = dimensions?.width || 0;
//   const height = dimensions?.height || 0;
//
//   return (
//     <div
//       className="flex justify-center items-center h-full w-full"
//       ref={setContainerRef}
//     >
//       <div className="grid grid-cols-2 w-full h-full gap-0 m-0 p-0">
//         <div className="flex justify-center items-center">
//           <RectangleAnimation rotate={270} width={width} height={height} />
//         </div>
//         <div className="flex justify-center items-center">
//           <RectangleAnimation rotate={180} width={width} height={height} />
//         </div>
//         <div className="flex justify-center items-center">
//           <RectangleAnimation rotate={0} width={width} height={height} />
//         </div>
//         <div className="flex justify-center items-center">
//           <RectangleAnimation rotate={90} width={width} height={height} />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default AboutShapes;
