import { LucideProps } from 'lucide-react';

const Artstation = (props: LucideProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 17l8-12h12l-8 12H2z" />
    <path d="M2 17l8 12h12l-8-12H2z" />
  </svg>
);

export default Artstation;