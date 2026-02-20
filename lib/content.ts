export const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" },
] as const;

export const problemStats = [
  {
    title: "SMEs lack access",
    description:
      "Most African SMEs lack structured access to green funding, frameworks, and dedicated climate products.",
  },
  {
    title: "Banks struggle to find projects",
    description:
      "Banks struggle to source, verify, and standardize qualified green projects across markets and sectors.",
  },
  {
    title: "Billions undeployed",
    description:
      "Billions in climate and ESG capital remain undeployed each year despite growing regulatory pressure.",
  },
] as const;

export const solutionSteps = [
  {
    step: 1,
    title: "SMEs submit green initiatives",
    description: "Sustainable SMEs and startups submit their green projects through our structured process.",
  },
  {
    step: 2,
    title: "GreenLedger structures & qualifies",
    description: "We structure, verify, and qualify projects against ESG and green finance standards.",
  },
  {
    step: 3,
    title: "Banks access verified deal flow",
    description: "Partner banks access a curated pipeline of verified green investment opportunities.",
  },
] as const;

export const smeValueProps = [
  "Access to green funding",
  "Improved sustainability profile",
  "Structured documentation support",
  "Increased bank visibility",
] as const;

export const bankValueProps = [
  "Verified green deal pipeline",
  "ESG-aligned capital deployment",
  "Risk-filtered projects",
  "Africa-focused opportunities",
] as const;

export const credibilityPoints = [
  "ESSEC Business School backing",
  "Early SME interest",
  "Africa-first focus",
  "Structured fintech approach",
] as const;
