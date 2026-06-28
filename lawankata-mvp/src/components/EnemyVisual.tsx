interface EnemyVisualProps {
  visualKey: string;
  isHit: boolean;
}

export default function EnemyVisual({ visualKey, isHit }: EnemyVisualProps) {
  return (
    <div
      className={`absolute right-[15%] md:right-[13%] top-[48%] transition-transform duration-200 ${
        isHit ? "scale-105" : ""
      }`}
      style={{ transform: "translateX(50%)" }}
    >
      {renderVisual(visualKey)}
    </div>
  );
}

function renderVisual(key: string) {
  switch (key) {
    case "form_stack":
      return <FormStack />;
    case "screen_error":
      return <ScreenError />;
    case "stop_sign":
      return <StopSign />;
    case "school_gate":
      return <SchoolGate />;
    case "land_cert":
      return <LandCert />;
    case "broken_road":
      return <BrokenRoad />;
    case "unpaid_receipt":
      return <UnpaidReceipt />;
    case "dpr_building":
      return <DprBuilding />;
    case "exam_board":
      return <ExamBoard />;
    case "gavel":
      return <Gavel />;
    case "military_emblem":
      return <MilitaryEmblem />;
    case "budget_cut":
      return <BudgetCut />;
    case "empty_desk":
      return <EmptyDesk />;
    default:
      return <FormStack />;
  }
}

type SvgProps = { className?: string };

function FormStack({ className = "" }: SvgProps) {
  return (
    <svg width="44" height="64" viewBox="0 0 60 90" className={`md:w-[60px] md:h-[90px] ${className}`}>
      <rect x="8" y="55" width="44" height="10" fill="#9ca3af" opacity="0.6" stroke="#6b7280" />
      <rect x="5" y="42" width="50" height="10" fill="#9ca3af" opacity="0.7" stroke="#6b7280" />
      <rect x="9" y="29" width="42" height="10" fill="#9ca3af" opacity="0.8" stroke="#6b7280" />
      <rect x="15" y="8" width="30" height="16" rx="2" fill="#1e3a8a" stroke="#1e40af" />
      <text x="30" y="20" fontSize="8" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">
        STAMP
      </text>
    </svg>
  );
}

function ScreenError({ className = "" }: SvgProps) {
  return (
    <svg width="50" height="50" viewBox="0 0 60 60" className={`md:w-[70px] md:h-[70px] ${className}`}>
      <rect x="6" y="10" width="48" height="34" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="2" />
      <text x="30" y="26" fontSize="7" fill="#dc2626" textAnchor="middle" fontFamily="monospace">
        ERROR
      </text>
      <text x="30" y="36" fontSize="6" fill="#facc15" textAnchor="middle" fontFamily="monospace">
        #247
      </text>
      <rect x="22" y="44" width="16" height="3" fill="#475569" />
      <rect x="14" y="47" width="32" height="4" rx="1" fill="#334155" />
    </svg>
  );
}

function StopSign({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 60 60" className={`md:w-[64px] md:h-[64px] ${className}`}>
      <polygon points="20,8 40,8 52,20 52,40 40,52 20,52 8,40 8,20" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
      <text x="30" y="35" fontSize="9" fontWeight="bold" fill="#f8fafc" textAnchor="middle" fontFamily="monospace">
        STOP
      </text>
    </svg>
  );
}

function SchoolGate({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="56" viewBox="0 0 60 64" className={`md:w-[68px] md:h-[72px] ${className}`}>
      <rect x="6" y="30" width="48" height="30" fill="#374151" stroke="#4b5563" />
      <rect x="6" y="26" width="48" height="6" fill="#1f2937" />
      <rect x="10" y="38" width="12" height="22" fill="#1e293b" stroke="#374151" />
      <rect x="38" y="38" width="12" height="22" fill="#1e293b" stroke="#374151" />
      <rect x="26" y="36" width="8" height="24" fill="#334155" />
      <text x="30" y="22" fontSize="6" fill="#facc15" textAnchor="middle" fontFamily="monospace">
        PPDB
      </text>
      <rect x="14" y="10" width="32" height="6" rx="2" fill="#4b5563" />
      <rect x="28" y="4" width="4" height="8" fill="#6b7280" />
    </svg>
  );
}

function LandCert({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="56" viewBox="0 0 60 70" className={`md:w-[62px] md:h-[72px] ${className}`}>
      <rect x="8" y="8" width="44" height="54" rx="2" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
      <text x="30" y="22" fontSize="6" fill="#92400e" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
        HGU
      </text>
      <line x1="14" y1="30" x2="46" y2="30" stroke="#92400e" strokeWidth="0.5" />
      <line x1="14" y1="38" x2="46" y2="38" stroke="#92400e" strokeWidth="0.5" />
      <line x1="14" y1="46" x2="40" y2="46" stroke="#92400e" strokeWidth="0.5" />
      <circle cx="44" cy="54" r="6" fill="#dc2626" opacity="0.7" />
      <text x="44" y="57" fontSize="4" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">
        RESMI
      </text>
    </svg>
  );
}

function BrokenRoad({ className = "" }: SvgProps) {
  return (
    <svg width="56" height="48" viewBox="0 0 64 56" className={`md:w-[72px] md:h-[64px] ${className}`}>
      <rect x="2" y="30" width="60" height="22" fill="#4b5563" stroke="#374151" />
      <rect x="2" y="36" width="28" height="3" fill="#facc15" />
      <rect x="34" y="36" width="28" height="3" fill="#facc15" />
      <ellipse cx="18" cy="44" rx="6" ry="4" fill="#1e293b" />
      <ellipse cx="44" cy="48" rx="8" ry="5" fill="#1e293b" />
      <line x1="30" y1="30" x2="30" y2="52" stroke="#dc2626" strokeWidth="1" strokeDasharray="3,3" />
      <text x="32" y="22" fontSize="7" fill="#f87171" textAnchor="middle" fontFamily="monospace">
        $
      </text>
    </svg>
  );
}

function UnpaidReceipt({ className = "" }: SvgProps) {
  return (
    <svg width="44" height="56" viewBox="0 0 56 68" className={`md:w-[56px] md:h-[70px] ${className}`}>
      <path
        d="M8 8 L48 8 L48 56 L42 62 L36 56 L30 62 L24 56 L18 62 L12 56 L8 62 Z"
        fill="#e5e7eb"
        stroke="#6b7280"
        strokeWidth="1"
      />
      <text x="28" y="24" fontSize="6" fill="#dc2626" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
        THR
      </text>
      <line x1="14" y1="30" x2="42" y2="30" stroke="#dc2626" strokeWidth="1" />
      <text x="28" y="44" fontSize="5" fill="#6b7280" textAnchor="middle" fontFamily="monospace">
        UNPAID
      </text>
      <line x1="14" y1="48" x2="42" y2="48" stroke="#dc2626" strokeWidth="1" />
    </svg>
  );
}

function DprBuilding({ className = "" }: SvgProps) {
  return (
    <svg width="60" height="64" viewBox="0 0 72 76" className={`md:w-[72px] md:h-[78px] ${className}`}>
      <rect x="4" y="40" width="64" height="32" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="4" y="36" width="64" height="6" fill="#475569" />
      <rect x="4" y="32" width="64" height="5" fill="#334155" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={8 + i * 10} y="46" width="6" height="20" fill="#facc15" opacity="0.3" />
      ))}
      <polygon points="4,36 36,12 68,36" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="36" y="28" fontSize="7" fill="#facc15" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
        DPR
      </text>
      <rect x="20" y="58" width="32" height="14" fill="#0f172a" stroke="#1e293b" />
      <circle cx="36" cy="65" r="3" fill="#475569" />
    </svg>
  );
}

function ExamBoard({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="52" viewBox="0 0 60 60" className={`md:w-[68px] md:h-[68px] ${className}`}>
      <rect x="6" y="6" width="48" height="48" rx="2" fill="#e0e7ff" stroke="#3730a3" strokeWidth="1.5" />
      <rect x="12" y="14" width="3" height="3" fill="#3730a3" />
      <line x1="18" y1="16" x2="48" y2="16" stroke="#3730a3" strokeWidth="0.5" />
      <rect x="12" y="22" width="3" height="3" fill="#3730a3" />
      <line x1="18" y1="24" x2="48" y2="24" stroke="#3730a3" strokeWidth="0.5" />
      <rect x="12" y="30" width="3" height="3" fill="#3730a3" />
      <line x1="18" y1="32" x2="40" y2="32" stroke="#3730a3" strokeWidth="0.5" />
      <text x="30" y="48" fontSize="6" fill="#3730a3" textAnchor="middle" fontFamily="monospace">
        TWK
      </text>
    </svg>
  );
}

function Gavel({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="52" viewBox="0 0 60 60" className={`md:w-[66px] md:h-[66px] ${className}`}>
      <rect x="10" y="14" width="36" height="14" rx="3" fill="#92400e" stroke="#451a03" strokeWidth="1.5" transform="rotate(-20 28 21)" />
      <line x1="36" y1="28" x2="50" y2="46" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="30" cy="52" rx="14" ry="3" fill="#451a03" opacity="0.3" />
      <text x="30" y="10" fontSize="6" fill="#facc15" textAnchor="middle" fontFamily="monospace">
        MK
      </text>
    </svg>
  );
}

function MilitaryEmblem({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="56" viewBox="0 0 60 64" className={`md:w-[66px] md:h-[72px] ${className}`}>
      <polygon points="30,6 52,18 52,42 30,56 8,42 8,18" fill="#1a2e1a" stroke="#3f6212" strokeWidth="1.5" />
      <polygon points="30,14 44,22 44,38 30,48 16,38 16,22" fill="#166534" opacity="0.6" />
      <text x="30" y="34" fontSize="7" fill="#86efac" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
        TNI
      </text>
      <rect x="22" y="50" width="16" height="4" fill="#3f6212" />
    </svg>
  );
}

function BudgetCut({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="52" viewBox="0 0 60 60" className={`md:w-[66px] md:h-[66px] ${className}`}>
      <rect x="10" y="14" width="36" height="28" rx="2" fill="#fee2e2" stroke="#991b1b" strokeWidth="1" />
      <text x="28" y="26" fontSize="5" fill="#991b1b" textAnchor="middle" fontFamily="monospace">
        APBN
      </text>
      <line x1="14" y1="32" x2="42" y2="32" stroke="#dc2626" strokeWidth="0.5" />
      <line x1="14" y1="36" x2="38" y2="36" stroke="#dc2626" strokeWidth="0.5" />
      <line x1="6" y1="6" x2="54" y2="50" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function EmptyDesk({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="48" viewBox="0 0 60 56" className={`md:w-[68px] md:h-[62px] ${className}`}>
      <rect x="8" y="30" width="44" height="4" fill="#4b5563" />
      <rect x="10" y="34" width="4" height="20" fill="#4b5563" />
      <rect x="46" y="34" width="4" height="20" fill="#4b5563" />
      <rect x="14" y="12" width="32" height="18" rx="2" fill="#1e293b" stroke="#334155" />
      <text x="30" y="24" fontSize="6" fill="#6b7280" textAnchor="middle" fontFamily="monospace">
        KOSONG
      </text>
      <circle cx="48" cy="22" r="5" fill="#1e293b" opacity="0.4" stroke="#334155" />
      <text x="48" y="25" fontSize="5" fill="#475569" textAnchor="middle" fontFamily="monospace">
        X
      </text>
    </svg>
  );
}
