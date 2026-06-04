// Savannah Precision Loan System — seed data & domain helpers
// All numbers/text reflect the Savannah Precision Project Framework brief.

export type Applicant = {
  id: string;
  name: string;
  occupation: string;
  location: string;
  monthlyFormalIncome: number; // KES — formal documented income
  mpesaVelocity: number; // KES — rolling 12-mo M-Pesa inflow / 12
  seasonalityIndex: number; // 0-1, higher = more seasonal
  requestedLoan: number; // KES
  tenureMonths: number;
  harvestAligned: boolean;
  notes: string;
};

export const APPLICANTS: Applicant[] = [
  {
    id: "grace",
    name: "Grace Akech",
    occupation: "Matooke Vendor — Nakasero Market",
    location: "Kampala border trader, sells in Nairobi",
    monthlyFormalIncome: 8000,
    mpesaVelocity: 72000,
    seasonalityIndex: 0.82,
    requestedLoan: 150000,
    tenureMonths: 12,
    harvestAligned: true,
    notes:
      "High seasonal income spikes in March/April and Sept/Oct matooke harvest. Denied 4× under 2025 rigid model despite strong M-Pesa cash velocity.",
  },
  {
    id: "john",
    name: "John Kamau",
    occupation: "Boda Boda Operator",
    location: "Eastlands, Nairobi",
    monthlyFormalIncome: 0,
    mpesaVelocity: 41000,
    seasonalityIndex: 0.25,
    requestedLoan: 80000,
    tenureMonths: 10,
    harvestAligned: false,
    notes:
      "Diverse daily mobile money transactions; no payslip but steady weekly inflow pattern. Traditional model flags as 'unemployed'.",
  },
  {
    id: "david",
    name: "David Omwamba",
    occupation: "Secondary School Teacher (TSC)",
    location: "Kisumu County",
    monthlyFormalIncome: 58000,
    mpesaVelocity: 12000,
    seasonalityIndex: 0.05,
    requestedLoan: 200000,
    tenureMonths: 18,
    harvestAligned: false,
    notes:
      "Formal payslip, fixed monthly TSC salary — the archetypal applicant the legacy model favours.",
  },
];

// 2025 baseline disparity from the Phase 1 bias audit
export const BIAS_BASELINE = {
  marketVendorDenial: 68,
  formalEmployeeDenial: 22,
  killSwitchThreshold: 25, // variance % that auto-halts screening
};

// Pipeline failure hypotheses
export const FAILURE_HYPOTHESES = [
  {
    id: "data-pipelines",
    title: "Data Pipelines",
    detail:
      "Core scoring engine ignores mobile money / M-Pesa cash-flow streams, deleting 60–80% of an informal trader's real economic footprint before risk is even computed.",
    impact: "+31pp denial bias",
  },
  {
    id: "taxonomy",
    title: "Occupation Taxonomy",
    detail:
      "Rigid SIC/SACCO occupation codes force multi-activity traders (vendor + farmer + mama-mboga) into single-job buckets, mis-classifying them as 'unemployed/casual'.",
    impact: "+18pp denial bias",
  },
  {
    id: "seasonal",
    title: "Seasonal Income Recognition",
    detail:
      "Affordability checks assume flat monthly income, penalising agricultural cycles (matooke Mar/Apr & Sep/Oct, maize Jul/Aug).",
    impact: "+22pp denial bias",
  },
] as const;

// MAP Repayment Engine — harvest-aware schedule
// Months 1-12 (calendar Jan..Dec) — harvest months get heavier payments,
// off-harvest months get lighter payments. Standard is flat.
export const HARVEST_MONTHS = [2, 3, 8, 9]; // Mar, Apr, Sep, Oct (0-indexed)

export function buildSchedule(
  principal: number,
  tenureMonths: number,
  annualRatePct: number,
  mode: "standard" | "map",
): { month: number; label: string; payment: number; principal: number; interest: number }[] {
  const r = annualRatePct / 100 / 12;
  // standard amortising payment
  const flat =
    r === 0
      ? principal / tenureMonths
      : (principal * r) / (1 - Math.pow(1 + r, -tenureMonths));

  const monthLabels = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  // For MAP: weight harvest months ×1.8, off-harvest ×0.65, then normalise so NPV ~ standard total
  const weights: number[] = [];
  let totalWeight = 0;
  for (let i = 0; i < tenureMonths; i++) {
    const calMonth = i % 12;
    const w =
      mode === "map"
        ? HARVEST_MONTHS.includes(calMonth)
          ? 1.8
          : 0.65
        : 1;
    weights.push(w);
    totalWeight += w;
  }
  const totalRepay = flat * tenureMonths;

  let balance = principal;
  return Array.from({ length: tenureMonths }, (_, i) => {
    const payment = (totalRepay * weights[i]) / totalWeight;
    const interest = balance * r;
    const principalPart = Math.max(0, payment - interest);
    balance = Math.max(0, balance - principalPart);
    return {
      month: i + 1,
      label: monthLabels[i % 12],
      payment: Math.round(payment),
      principal: Math.round(principalPart),
      interest: Math.round(interest),
    };
  });
}

// Scoring — Old vs Savannah Precision
export function scoreApplicant(a: Applicant) {
  // Legacy rigid model: only formal payslip income, flat affordability ratio
  const legacyAffordable = a.monthlyFormalIncome * a.tenureMonths * 0.35;
  const legacyApproved = legacyAffordable >= a.requestedLoan * 0.4;
  const legacyScore = Math.min(
    100,
    Math.round((a.monthlyFormalIncome / 1000) * 1.4),
  );

  // Savannah Precision: blended cash velocity + seasonal harvest alignment
  const blendedMonthly = a.monthlyFormalIncome + a.mpesaVelocity * 0.75;
  const seasonalBoost = a.harvestAligned ? 12 : 0;
  const precisionScore = Math.min(
    100,
    Math.round((blendedMonthly / 1500) + seasonalBoost),
  );
  const precisionAffordable = blendedMonthly * a.tenureMonths * 0.32;
  const precisionApproved = precisionAffordable >= a.requestedLoan * 0.55;

  return {
    legacyScore,
    legacyApproved,
    legacyReason: legacyApproved
      ? "Meets formal-income affordability threshold."
      : "Formal payslip income below 35% affordability ratio — DENIED.",
    precisionScore,
    precisionApproved,
    precisionReason: precisionApproved
      ? "Blended M-Pesa velocity + harvest alignment clears 32% adaptive ratio — APPROVED with MAP schedule."
      : "Even with blended cash-flow, requested principal exceeds adaptive capacity — refer to Elders Council.",
    blendedMonthly: Math.round(blendedMonthly),
  };
}

// OCEAN audit lines for the Verifier terminal
export const OCEAN_CHECKS = [
  { code: "O", label: "Ownership", line: "Data source provenance: M-Pesa Daraja API, signed by Safaricom KYC token ✓" },
  { code: "C", label: "Compliance", line: "CBK Microfinance Prudential Guideline CBK/PG/22 §4.3 (affordability) ✓" },
  { code: "E", label: "Ethics", line: "No proxy variables for tribe, gender, marital status detected ✓" },
  { code: "A", label: "Accuracy", line: "12-mo M-Pesa rolling window reconciled to ±0.4% of statement total ✓" },
  { code: "N", label: "Nuance", line: "Seasonal harvest signal applied; flagged for human cultural validation ⚑" },
] as const;

// 4D Delegation Matrix
export const DELEGATION = {
  human: [
    "Final credit approvals > KES 100,000",
    "Cultural nuance validation (Elders Council)",
    "Customer appeals & dispute resolution",
    "Quarterly bias audit sign-off",
  ],
  ai: [
    "Tier-1 chatbot / USSD customer inquiries (Swahili + English)",
    "M-Pesa & bank statement parsing and categorisation",
    "KYC document OCR & sanctions list screening",
    "Real-time anomaly detection on incoming applications",
  ],
  collaborative: [
    "Financial literacy content generation (AI drafts, human reviews tone)",
    "Harvest-cycle repayment planning per applicant",
    "Loan product redesign workshops with cooperative members",
  ],
} as const;

// Prompt Engineering Hub — editable system prompts
export const DEFAULT_PROMPTS = {
  product:
    "You are a SACCO loan product advisor. Recommend products that respect seasonal income variance, default to MAP harvest-aligned schedules for agricultural traders, and never assume formal payslip equals creditworthiness.",
  process:
    "When evaluating an application: (1) parse M-Pesa for 12-mo velocity, (2) detect occupation cluster (single vs multi-activity), (3) align repayment to harvest cycle, (4) flag for human review if any OCEAN dimension scores below 0.7.",
  performance:
    "Adopt a trust-building tone in Kiswahili-English code-switching. Acknowledge the applicant's economic dignity. Never use the word 'unbanked' — say 'differently-banked'. Surface seasonal variance as a strength, not a risk.",
};

// Kenya Agricultural Observatory mock RAG data
export const AGRI_OBSERVATORY = {
  updatedAt: "Today, 06:14 EAT",
  region: "Central Rift + Lake Basin",
  soilMoisturePct: 64,
  rainForecast7d: "Above-average rainfall expected (32–48 mm) — favourable for matooke flowering.",
  marketPriceMatookePerBunch: 850, // KES
  marketTrend: "+12% w/w",
  advisory:
    "Inject +8% to projected Sept harvest revenue for matooke vendors in Central Rift. Defer maize farmer repayments by 14 days in Trans-Nzoia (delayed planting rains).",
};

// ETHOS — Blind → Dignity-centered prompt transformations
export const ETHOS_TRANSFORMS = [
  {
    blind: "Assess risk based on steady monthly income.",
    dignity:
      "Assess capacity based on rolling 12-month agricultural trading volumes and community trust networks.",
  },
  {
    blind: "Reject applicants without a payslip.",
    dignity:
      "For applicants without formal payslips, evaluate M-Pesa velocity, supplier ledgers, and chama (SACCO group) standing.",
  },
  {
    blind: "Use national average household expenditure for affordability.",
    dignity:
      "Use county-level cost-of-living indices and applicant-declared dependant load, validated by community officer.",
  },
];

// TRACK forensic categories
export const TRACK_AXES = [
  { code: "T", label: "Training", drift: 4.2 },
  { code: "R", label: "Representation", drift: 9.1 },
  { code: "A", label: "Amplification", drift: 6.7 },
  { code: "C", label: "Counterfactuals", drift: 3.5 },
  { code: "K", label: "Kill-switch readiness", drift: 1.1 },
];

// OASIS data sovereignty toggles
export const OASIS_DEFAULTS = [
  { key: "mpesa", label: "Share M-Pesa transaction history (12 mo)", on: true },
  { key: "kin", label: "Share guarantor / kin contact graph", on: false },
  { key: "geo", label: "Share market-stall geolocation", on: true },
  { key: "anon", label: "Anonymise data in training corpus", on: true },
];

// Agent feed seeds
export const SCOUT_FEED = [
  "📱 SMS sent to Grace Akech: 'Habari Grace! Matooke harvest peak in 18 days — top up your savings to cover Nov lean month.'",
  "🎓 Literacy module delivered: 'Understanding compound interest using mandazi pricing.'",
  "📅 Harvest planner: Reserved 35% of expected Mar income for repayment cushion.",
];

export const GUARDIAN_FEED = [
  "🛡️ Triage: 14 applications screened in last 5 min — 11 auto-approved Tier-1, 3 escalated.",
  "⚠️ Anomaly: Applicant #8821 — M-Pesa velocity dropped 71% week-over-week. Escalated to Hunter.",
  "✅ Bias-block: Rejected automated denial of applicant 'Mama Njeri' — taxonomy mis-class caught.",
];

export const HUNTER_BRIEFING = {
  applicant: "Grace Akech",
  oneLine: "Approve KES 150,000 / 12-mo MAP schedule. Risk-adjusted PD: 4.8%.",
  evidence: [
    "M-Pesa 12-mo velocity: KES 864,000 (avg 72k/mo)",
    "Harvest-aligned: matooke peaks Mar/Apr & Sep/Oct confirmed via Observatory",
    "Chama (Nakasero Traders SACCO) standing: GOLD, 7 yrs, zero defaults",
    "OCEAN audit: 0.91 / 1.00 — nuance flag cleared by community officer",
  ],
  recommendation:
    "APPROVE with MAP harvest schedule. Set up auto-debit only in Mar, Apr, Sep, Oct. Lean-month payment: KES 4,800; Harvest-month payment: KES 22,400.",
};

export const GUARD_LOGS = [
  { type: "Bias Block", msg: "Denied auto-rejection on female vendor cluster (variance 11.2%) — referred to human." },
  { type: "Dignity Filter", msg: "Replaced 'unbanked' → 'differently-banked' in 4 outbound messages." },
  { type: "CYCLE", msg: "CSAT 4.7/5 last 24h ↔ 30-day repayment compliance 96.2% — weights re-balanced." },
  { type: "Bias Block", msg: "Held loan for review: counterfactual gender swap changed outcome." },
];
