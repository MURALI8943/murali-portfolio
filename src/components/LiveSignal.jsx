export default function LiveSignal() {
  return (
    <span className="live-mark" aria-hidden="true">
      <svg viewBox="0 0 78 28" width="68" height="24">
        <path className="live-wave live-wave-3" d="M14 2.5C4 8 4 20 14 25.5" />
        <path className="live-wave live-wave-2" d="M22 6C15 9.2 15 18.8 22 22" />
        <path className="live-wave live-wave-1" d="M29 9.2C25.2 11 25.2 17 29 18.8" />
        <circle className="live-dot" cx="39" cy="14" r="4.2" />
        <path className="live-wave live-wave-1" d="M49 9.2C52.8 11 52.8 17 49 18.8" />
        <path className="live-wave live-wave-2" d="M56 6C63 9.2 63 18.8 56 22" />
        <path className="live-wave live-wave-3" d="M64 2.5C74 8 74 20 64 25.5" />
      </svg>
    </span>
  );
}
