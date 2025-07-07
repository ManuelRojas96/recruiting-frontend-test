type StatusIconProps = {
  ok: boolean;
};

export default function StatusIcon({ ok }: StatusIconProps) {
  if (ok) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
        <svg
          className="w-4 h-4 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
      <svg
        className="w-4 h-4 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        viewBox="0 0 24 24"
      >
        <line x1="7" y1="7" x2="17" y2="17" strokeLinecap="round" />
        <line x1="7" y1="17" x2="17" y2="7" strokeLinecap="round" />
      </svg>
    </span>
  );
}
