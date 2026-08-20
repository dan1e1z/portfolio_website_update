interface ScrollProps {
  strokeColor: string;
}
const Scroll = ({ strokeColor }: ScrollProps) => (
  <svg
    viewBox="0 0 90 112"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="47"
    height="71"
  >
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g
        transform="translate(-87.000000, -582.000000)"
        fill={strokeColor}
        fill-rule="nonzero"
      >
        <g transform="translate(87.400000, 582.840000)">
          <polygon points="89.28 69.28 80.32 59.68 51.2 87.2 51.2 0 38.08 0 38.08 87.2 8.96 59.68 0 69.28 44.64 110.56"></polygon>
        </g>
      </g>
    </g>
  </svg>
);

export default Scroll;
