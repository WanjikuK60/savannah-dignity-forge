// Real, sourced figures about Kenya's informal economy and financial access.
// Each entry links to where the number comes from, so it can be checked.

export type KenyaFact = {
  value: string;
  label: string;
  source: string;
  url: string;
};

export const KENYA_FACTS: KenyaFact[] = [
  {
    value: "18.1M",
    label: "Kenyans worked in the informal sector in 2025, up 4.1% on 2024.",
    source: "KNBS Economic Survey 2026, via Capital FM",
    url: "https://capitalfm.africa/kenya-adds-882100-jobs-in-2025/",
  },
  {
    value: "9 in 10",
    label: "new jobs created in Kenya over the last five years were informal.",
    source: "KNBS Economic Survey 2026, via The Standard",
    url: "https://www.standardmedia.co.ke/nairobi/article/2001546935/mwaura-nine-in-10-new-jobs-created-in-2025-were-informal",
  },
  {
    value: "84.8%",
    label: "of adults had access to formal financial services in 2024, up from 83.7% in 2021.",
    source: "2024 FinAccess Household Survey, Central Bank of Kenya",
    url: "https://www.centralbank.go.ke/2024/12/13/10960/",
  },
  {
    value: "52.6%",
    label:
      "of Kenyans use mobile money every day, double the 2021 figure. Affordability is the top barrier to finance.",
    source: "2024 FinAccess infographic, FSD Kenya",
    url: "https://www.fsdkenya.org/wp-content/uploads/2024/12/2024-FinAccess-household-survey-infographic.pdf",
  },
];

// The real rules a Kenyan SACCO lending system has to respect.
export const KENYA_RULES: { name: string; what: string; url?: string }[] = [
  {
    name: "Sacco Societies Act (Cap. 490B)",
    what: "SACCOs are licensed and supervised by SASRA, the Sacco Societies Regulatory Authority.",
    url: "https://new.kenyalaw.org/akn/ke/act/2008/14/eng@2025-06-20",
  },
  {
    name: "CBK (Digital Credit Providers) Regulations, 2022",
    what: "Licensing and consumer-protection rules for digital lenders, supervised by the Central Bank of Kenya.",
    url: "https://new.kenyalaw.org/akn/ke/act/ln/2022/46/eng@2022-04-22",
  },
  {
    name: "Data Protection Act, 2019",
    what: "Applicants' M-Pesa and personal data must be collected and processed lawfully, with consent.",
  },
];
