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
    case "passport_doc":
      return <PassportDoc />;
    case "flood_water":
      return <FloodWater />;
    case "power_outage":
      return <PowerOutage />;
    case "water_tap":
      return <WaterTap />;
    case "trash_pile":
      return <TrashPile />;
    case "money_envelope":
      return <MoneyEnvelope />;
    case "mining_rig":
      return <MiningRig />;
    case "reclamation":
      return <Reclamation />;
    case "textbook":
      return <Textbook />;
    case "ballot_box":
      return <BallotBox />;
    case "digital_handcuff":
      return <DigitalHandcuff />;
    case "press_badge":
      return <PressBadge />;
    case "tax_form":
      return <TaxForm />;
    case "data_breach":
      return <DataBreach />;
    case "rubber_stamp":
      return <RubberStamp />;
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

function PassportDoc({ className = "" }: SvgProps) {
  return (
    <svg width="44" height="52" viewBox="0 0 54 64" className={`md:w-[58px] md:h-[68px] ${className}`}>
      <rect x="8" y="4" width="38" height="56" rx="3" fill="#166534" stroke="#14532d" strokeWidth="1.5" />
      <rect x="16" y="14" width="22" height="16" rx="2" fill="#e5e7eb" stroke="#9ca3af" />
      <text x="27" y="24" fontSize="6" fill="#4b5563" textAnchor="middle" fontFamily="monospace">FOTO</text>
      <line x1="14" y1="38" x2="40" y2="38" stroke="#86efac" strokeWidth="0.5" />
      <line x1="14" y1="44" x2="36" y2="44" stroke="#86efac" strokeWidth="0.5" />
      <line x1="14" y1="50" x2="38" y2="50" stroke="#86efac" strokeWidth="0.5" />
      <circle cx="44" cy="52" r="6" fill="#dc2626" opacity="0.6" />
      <text x="44" y="55" fontSize="3" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">PENUH</text>
    </svg>
  );
}

function FloodWater({ className = "" }: SvgProps) {
  return (
    <svg width="56" height="48" viewBox="0 0 64 56" className={`md:w-[72px] md:h-[62px] ${className}`}>
      <rect x="4" y="28" width="56" height="24" fill="#1e40af" opacity="0.5" />
      <path d="M4 32 Q14 26 24 32 Q34 38 44 32 Q54 26 60 32" fill="none" stroke="#3b82f6" strokeWidth="2" />
      <path d="M4 38 Q14 32 24 38 Q34 44 44 38 Q54 32 60 38" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M4 44 Q14 38 24 44 Q34 50 44 44 Q54 38 60 44" fill="none" stroke="#93c5fd" strokeWidth="1" />
      <rect x="26" y="12" width="12" height="18" fill="#4b5563" />
      <polygon points="22,12 32,2 42,12" fill="#6b7280" />
      <circle cx="28" cy="22" r="8" fill="#1e293b" stroke="#dc2626" strokeWidth="1" />
      <text x="28" y="25" fontSize="5" fill="#f87171" textAnchor="middle" fontFamily="monospace">!</text>
    </svg>
  );
}

function PowerOutage({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="52" viewBox="0 0 56 60" className={`md:w-[62px] md:h-[68px] ${className}`}>
      <rect x="8" y="28" width="40" height="28" rx="2" fill="#1e293b" stroke="#334155" />
      <rect x="20" y="18" width="16" height="14" rx="2" fill="#3b82f6" stroke="#1d4ed8" />
      <text x="28" y="28" fontSize="6" fill="#93c5fd" textAnchor="middle" fontFamily="monospace">kW</text>
      <line x1="28" y1="4" x2="28" y2="18" stroke="#475569" strokeWidth="2" />
      <line x1="16" y1="40" x2="22" y2="40" stroke="#dc2626" strokeWidth="2" />
      <text x="28" y="48" fontSize="6" fill="#6b7280" textAnchor="middle" fontFamily="monospace">GELAP</text>
    </svg>
  );
}

function WaterTap({ className = "" }: SvgProps) {
  return (
    <svg width="44" height="52" viewBox="0 0 54 64" className={`md:w-[58px] md:h-[68px] ${className}`}>
      <rect x="18" y="34" width="6" height="24" rx="1" fill="#475569" />
      <ellipse cx="21" cy="34" rx="5" ry="3" fill="#6b7280" />
      <rect x="14" y="30" width="14" height="6" rx="2" fill="#4b5563" />
      <circle cx="21" cy="14" r="8" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
      <circle cx="21" cy="14" r="3" fill="#dbeafe" opacity="0.6" />
      <text x="21" y="54" fontSize="5" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">KERUH</text>
    </svg>
  );
}

function TrashPile({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="48" viewBox="0 0 60 56" className={`md:w-[68px] md:h-[62px] ${className}`}>
      <rect x="8" y="36" width="44" height="16" fill="#92400e" opacity="0.3" />
      <ellipse cx="22" cy="38" rx="8" ry="6" fill="#6b7280" stroke="#4b5563" />
      <ellipse cx="40" cy="34" rx="7" ry="5" fill="#78716c" stroke="#57534e" />
      <ellipse cx="16" cy="28" rx="6" ry="5" fill="#a3e635" stroke="#65a30d" />
      <ellipse cx="38" cy="26" rx="5" ry="4" fill="#dc2626" stroke="#991b1b" opacity="0.7" />
      <text x="30" y="16" fontSize="7" fill="#facc15" textAnchor="middle" fontFamily="monospace" fontWeight="bold">TPA</text>
    </svg>
  );
}

function MoneyEnvelope({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 56 56" className={`md:w-[62px] md:h-[62px] ${className}`}>
      <rect x="8" y="14" width="40" height="30" rx="2" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
      <polygon points="8,14 28,34 48,14" fill="none" stroke="#b45309" strokeWidth="1" />
      <rect x="20" y="20" width="16" height="12" rx="1" fill="none" stroke="#b45309" strokeWidth="0.5" />
      <ellipse cx="28" cy="26" rx="4" ry="2" fill="none" stroke="#b45309" strokeWidth="0.5" />
      <text x="28" cy="42" fontSize="5" fill="#d97706" textAnchor="middle" fontFamily="monospace">BANSOS</text>
    </svg>
  );
}

function MiningRig({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="56" viewBox="0 0 60 64" className={`md:w-[68px] md:h-[72px] ${className}`}>
      <polygon points="30,6 50,20 50,40 30,56 10,40 10,20" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
      <line x1="30" y1="6" x2="30" y2="56" stroke="#57534e" strokeWidth="0.5" />
      <line x1="10" y1="20" x2="50" y2="40" stroke="#57534e" strokeWidth="0.5" />
      <line x1="50" y1="20" x2="10" y2="40" stroke="#57534e" strokeWidth="0.5" />
      <circle cx="30" cy="30" r="6" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
      <text x="30" y="33" fontSize="4" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">IUP</text>
      <rect x="22" y="50" width="16" height="4" fill="#44403c" />
    </svg>
  );
}

function Reclamation({ className = "" }: SvgProps) {
  return (
    <svg width="56" height="48" viewBox="0 0 64 56" className={`md:w-[72px] md:h-[62px] ${className}`}>
      <path d="M4 38 L60 38" stroke="#ca8a04" strokeWidth="2" />
      <rect x="10" y="30" width="44" height="10" fill="#ca8a04" opacity="0.5" />
      <path d="M4 30 Q20 20 40 30 Q50 36 60 30" fill="none" stroke="#60a5fa" strokeWidth="3" />
      <circle cx="14" cy="28" r="3" fill="#fbbf24" />
      <polygon points="48,24 52,20 54,28 50,30" fill="#64748b" />
      <line x1="52" y1="20" x2="52" y2="12" stroke="#64748b" strokeWidth="1" />
      <text x="32" y="14" fontSize="6" fill="#dc2626" textAnchor="middle" fontFamily="monospace">REKLAMASI</text>
    </svg>
  );
}

function Textbook({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="52" viewBox="0 0 56 60" className={`md:w-[62px] md:h-[68px] ${className}`}>
      <rect x="8" y="6" width="18" height="46" rx="2" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
      <rect x="26" y="6" width="18" height="46" rx="2" fill="#db2777" stroke="#be185d" strokeWidth="1" />
      <line x1="8" y1="22" x2="26" y2="22" stroke="#60a5fa" strokeWidth="0.5" />
      <line x1="8" y1="28" x2="26" y2="28" stroke="#60a5fa" strokeWidth="0.5" />
      <line x1="8" y1="34" x2="22" y2="34" stroke="#60a5fa" strokeWidth="0.5" />
      <line x1="26" y1="22" x2="44" y2="22" stroke="#f9a8d4" strokeWidth="0.5" />
      <line x1="26" y1="28" x2="44" y2="28" stroke="#f9a8d4" strokeWidth="0.5" />
      <line x1="26" y1="34" x2="40" y2="34" stroke="#f9a8d4" strokeWidth="0.5" />
      <text x="38" y="8" fontSize="3" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">BARU</text>
      <text x="17" y="8" fontSize="3" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">LAMA</text>
    </svg>
  );
}

function BallotBox({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="52" viewBox="0 0 56 60" className={`md:w-[62px] md:h-[68px] ${className}`}>
      <rect x="8" y="20" width="40" height="34" rx="2" fill="#eff6ff" stroke="#1e3a8a" strokeWidth="1.5" />
      <rect x="18" y="14" width="20" height="8" rx="1" fill="none" stroke="#1e3a8a" strokeWidth="1" />
      <rect x="20" y="8" width="16" height="6" rx="1" fill="#1e3a8a" />
      <text x="28" y="13" fontSize="3" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">SUARA</text>
      <rect x="16" y="30" width="24" height="12" rx="1" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
      <text x="28" y="38" fontSize="4" fill="#1e3a8a" textAnchor="middle" fontFamily="monospace">JANJI</text>
    </svg>
  );
}

function DigitalHandcuff({ className = "" }: SvgProps) {
  return (
    <svg width="50" height="50" viewBox="0 0 58 58" className={`md:w-[66px] md:h-[66px] ${className}`}>
      <rect x="10" y="8" width="38" height="34" rx="2" fill="#1e293b" stroke="#dc2626" strokeWidth="1.5" />
      <text x="29" y="18" fontSize="4" fill="#3b82f6" textAnchor="middle" fontFamily="monospace">POSTING</text>
      <text x="29" y="24" fontSize="4" fill="#f87171" textAnchor="middle" fontFamily="monospace">PASAL 27</text>
      <line x1="14" y1="30" x2="44" y2="30" stroke="#dc2626" strokeWidth="0.5" />
      <text x="29" y="36" fontSize="4" fill="#6b7280" textAnchor="middle" fontFamily="monospace">DIKENAKAN</text>
      <circle cx="29" cy="52" r="5" fill="none" stroke="#dc2626" strokeWidth="2" />
      <circle cx="29" cy="52" r="2" fill="#dc2626" />
      <line x1="29" y1="42" x2="29" y2="48" stroke="#dc2626" strokeWidth="1.5" />
    </svg>
  );
}

function PressBadge({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 56 56" className={`md:w-[62px] md:h-[62px] ${className}`}>
      <circle cx="28" cy="26" r="18" fill="#1e293b" stroke="#facc15" strokeWidth="2" />
      <text x="28" y="24" fontSize="6" fill="#facc15" textAnchor="middle" fontFamily="monospace" fontWeight="bold">PERS</text>
      <text x="28" y="32" fontSize="3" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">INDONESIA</text>
      <rect x="16" y="42" width="24" height="6" rx="2" fill="#dc2626" />
      <text x="28" y="47" fontSize="3" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">DIBUNGKAM</text>
    </svg>
  );
}

function TaxForm({ className = "" }: SvgProps) {
  return (
    <svg width="48" height="56" viewBox="0 0 56 64" className={`md:w-[62px] md:h-[72px] ${className}`}>
      <rect x="6" y="6" width="44" height="52" rx="2" fill="#fef3c7" stroke="#92400e" strokeWidth="1" />
      <text x="28" y="18" fontSize="5" fill="#92400e" textAnchor="middle" fontFamily="monospace" fontWeight="bold">AMNESTI</text>
      <line x1="14" y1="24" x2="42" y2="24" stroke="#92400e" strokeWidth="0.5" />
      <line x1="14" y1="30" x2="42" y2="30" stroke="#92400e" strokeWidth="0.5" />
      <line x1="14" y1="36" x2="42" y2="36" stroke="#92400e" strokeWidth="0.5" />
      <line x1="14" y1="42" x2="38" y2="42" stroke="#92400e" strokeWidth="0.5" />
      <rect x="18" y="46" width="20" height="6" rx="1" fill="#dc2626" />
      <text x="28" y="51" fontSize="3" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">DIAMPUNKAN</text>
    </svg>
  );
}

function DataBreach({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="48" viewBox="0 0 60 56" className={`md:w-[68px] md:h-[62px] ${className}`}>
      <rect x="8" y="10" width="28" height="36" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="38" y="10" width="16" height="36" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <line x1="12" y1="20" x2="32" y2="20" stroke="#3b82f6" strokeWidth="0.5" />
      <line x1="12" y1="26" x2="32" y2="26" stroke="#3b82f6" strokeWidth="0.5" />
      <line x1="12" y1="32" x2="28" y2="32" stroke="#3b82f6" strokeWidth="0.5" />
      <line x1="40" y1="20" x2="52" y2="20" stroke="#ef4444" strokeWidth="0.5" />
      <line x1="40" y1="26" x2="52" y2="26" stroke="#ef4444" strokeWidth="0.5" />
      <line x1="40" y1="32" x2="48" y2="32" stroke="#ef4444" strokeWidth="0.5" />
      <line x1="32" y1="28" x2="38" y2="28" stroke="#dc2626" strokeWidth="2" />
      <text x="30" y="50" fontSize="5" fill="#f87171" textAnchor="middle" fontFamily="monospace">BOCOR</text>
    </svg>
  );
}

function RubberStamp({ className = "" }: SvgProps) {
  return (
    <svg width="52" height="52" viewBox="0 0 60 60" className={`md:w-[68px] md:h-[68px] ${className}`}>
      <rect x="4" y="28" width="52" height="28" rx="2" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1" />
      <text x="30" y="38" fontSize="4" fill="#374151" textAnchor="middle" fontFamily="monospace">DISAHKAN</text>
      <text x="30" y="44" fontSize="4" fill="#374151" textAnchor="middle" fontFamily="monospace">TANPA</text>
      <text x="30" y="50" fontSize="4" fill="#374151" textAnchor="middle" fontFamily="monospace">PUBLIK</text>
      <rect x="14" y="14" width="32" height="16" rx="3" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
      <rect x="18" y="18" width="24" height="8" fill="none" stroke="#fef3c7" strokeWidth="0.5" />
      <text x="30" y="24" fontSize="5" fill="#fef3c7" textAnchor="middle" fontFamily="monospace">RUU</text>
    </svg>
  );
}
