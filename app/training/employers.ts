import type {Company} from './company-content';
// Focus areas are Casecraft coaching suggestions, not employer scoring criteria.
export const additionalEmployers:Record<string,Company>={
  "morgan-stanley": {
    "id": "morgan-stanley",
    "name": "Morgan Stanley",
    "source": "https://www.morganstanley.com/people-opportunities/students-graduates/resources/interview-preparation",
    "guide": "The firm publishes interview preparation that encourages understanding the role and the firm. Use the linked guidance alongside these original banking exercises.",
    "focus": [
      "Research the relevant business division",
      "Explain valuation assumptions and client implications",
      "Prepare a specific personal contribution story"
    ],
    "checkedAt": "October 16, 2026"
  },
  "bofa": {
    "id": "bofa",
    "name": "Bank of America",
    "source": "https://careers.bankofamerica.com/en-us/hiring-process",
    "guide": "The official hiring page explains the application and interview process. Check the requirements for your specific business and location.",
    "focus": [
      "Connect your experience to the role",
      "Practice accounting and financing decisions",
      "Prepare questions about the team and its clients"
    ],
    "checkedAt": "October 16, 2026"
  },
  "citi": {
    "id": "citi",
    "name": "Citi",
    "source": "https://careers.citigroup.com/students-and-graduates/interview-advice.html",
    "guide": "Citi provides recruiter interview advice for students and graduates. This track adds original role practice, not a reconstruction of Citi interviews.",
    "focus": [
      "Research the business and role",
      "Explain financial analysis clearly",
      "Prepare evidence of teamwork and judgment"
    ],
    "checkedAt": "October 16, 2026"
  },
  "bcg": {
    "id": "bcg",
    "name": "BCG",
    "source": "https://careers.bcg.com/global/en/case-interview-preparation",
    "guide": "BCG offers public case-interview preparation. Use it to understand the format, then work through original commercial problems here.",
    "focus": [
      "Clarify the client objective",
      "Structure and quantify the key drivers",
      "Synthesize a recommendation and its risks"
    ],
    "checkedAt": "October 16, 2026"
  },
  "deloitte": {
    "id": "deloitte",
    "name": "Deloitte",
    "source": "https://www.deloitte.com/us/en/careers/join-deloitte-careers-case-interview-tips.html",
    "guide": "Deloitte’s case and scenario guidance emphasizes analytical thinking and explaining your reasoning. The relevant format depends on the offering and role.",
    "focus": [
      "Clarify the question before analysis",
      "Show a practical decision process",
      "Explain implementation and stakeholder trade-offs"
    ],
    "checkedAt": "October 16, 2026"
  },
  "accenture": {
    "id": "accenture",
    "name": "Accenture",
    "source": "https://www.accenture.com/us-en/careers/explore-careers/area-of-interest/journey-to-accenture",
    "guide": "Accenture publishes recruiting and hiring FAQs. These original consulting exercises focus on decisions and implementation; verify your actual assessment with the recruiter.",
    "focus": [
      "Connect technology choices to business outcomes",
      "Explain a realistic implementation plan",
      "Prepare examples of adapting and collaborating"
    ],
    "checkedAt": "October 16, 2026"
  },
  "optiver-quant": {
    "id": "optiver-quant",
    "name": "Optiver",
    "source": "https://www.optiver.com/join-us/stories/optiver-us-campus-recruiting-qa/",
    "guide": "Optiver’s US campus Q&A covers trading, research and technology recruiting. Check regional and program details before preparing for a particular assessment.",
    "focus": [
      "Practice probability with explicit assumptions",
      "Explain risk and decision thresholds",
      "Respond to new evidence while thinking aloud"
    ],
    "checkedAt": "October 16, 2026"
  },
  "imc": {
    "id": "imc",
    "name": "IMC Trading",
    "source": "https://www.imc.com/in/careers/recruitment-process",
    "guide": "IMC publishes a recruitment-process guide for India. Use the regional source as orientation and confirm the process for your own location and role.",
    "focus": [
      "Explain quantitative reasoning step by step",
      "Check edge cases and uncertainty",
      "Connect a model to a practical decision"
    ],
    "checkedAt": "October 16, 2026"
  },
  "two-sigma": {
    "id": "two-sigma",
    "name": "Two Sigma",
    "source": "https://www.twosigma.com/interviewing-at-two-sigma/",
    "guide": "Two Sigma provides public interviewing information. This track offers original quantitative practice; it does not predict questions or team-specific rounds.",
    "focus": [
      "Formulate a testable research hypothesis",
      "Discuss validation and data limitations",
      "Explain your problem-solving approach"
    ],
    "checkedAt": "October 16, 2026"
  },
  "google": {
    "id": "google",
    "name": "Google",
    "source": "https://www.google.com/about/careers/applications/how-we-hire/",
    "guide": "Google’s careers site links hiring-process and interview-preparation resources. Use the job description and recruiter guidance to select the relevant role exercises.",
    "focus": [
      "Clarify requirements and constraints",
      "Explain alternatives and verification",
      "Prepare concrete examples of collaboration"
    ],
    "checkedAt": "October 16, 2026"
  },
  "hrt": {
    "id": "hrt",
    "name": "Hudson River Trading",
    "source": "https://www.hudsonrivertrading.com/careers/",
    "guide": "HRT’s careers page is a starting point for role requirements. The exercises here are Casecraft practice recommendations, not a claimed HRT interview format.",
    "focus": [
      "Practice precise coding and invariants",
      "Reason about systems performance and correctness",
      "Explain a technical project you understand deeply"
    ],
    "checkedAt": "October 16, 2026"
  },
  "nvidia": {
    "id": "nvidia",
    "name": "NVIDIA",
    "source": "https://www.nvidia.com/en-us/about-nvidia/careers/how-we-hire/",
    "guide": "NVIDIA describes role-dependent interviews and encourages candidates to consult their recruiter. Its technical hiring guidance mentions coding exercises; finance preparation here remains role practice.",
    "focus": [
      "Match examples to the position requirements",
      "Explain technical or commercial trade-offs",
      "Prepare questions for the hiring team"
    ],
    "checkedAt": "October 16, 2026"
  },
  "salesforce": {
    "id": "salesforce",
    "name": "Salesforce",
    "source": "https://www.salesforce.com/company/careers/how-we-hire/",
    "guide": "Salesforce provides hiring information and preparation resources. Select exercises for the role you are pursuing and verify the assessment format with your recruiter.",
    "focus": [
      "Connect decisions to customer outcomes",
      "Support claims with measurable evidence",
      "Explain stakeholder alignment and follow-through"
    ],
    "checkedAt": "October 16, 2026"
  },
  "stripe": {
    "id": "stripe",
    "name": "Stripe",
    "source": "https://stripe.com/jobs",
    "guide": "Stripe’s jobs site provides role information. These product exercises are original Casecraft recommendations, not reported Stripe questions or a fixed interview sequence.",
    "focus": [
      "Understand a customer workflow end to end",
      "Explain reliability and commercial trade-offs",
      "Use evidence to prioritize product decisions"
    ],
    "checkedAt": "October 16, 2026"
  },
  "snowflake": {
    "id": "snowflake",
    "name": "Snowflake",
    "source": "https://careers.snowflake.com/us/en/gethired",
    "guide": "Snowflake publishes hiring-process guidance. Use it with the relevant job description; these data exercises are independent practice rather than employer questions.",
    "focus": [
      "Define data grain and correctness",
      "Explain performance and reliability trade-offs",
      "Communicate assumptions to stakeholders"
    ],
    "checkedAt": "October 16, 2026"
  },
  "databricks": {
    "id": "databricks",
    "name": "Databricks",
    "source": "https://www.databricks.com/company/careers/open-positions",
    "guide": "Databricks publishes role requirements through its careers listings. This track focuses on transferable data skills and does not claim a uniform interview process.",
    "focus": [
      "Build reproducible data reasoning",
      "Explain pipeline and analysis correctness",
      "Test scale, failures and operational constraints"
    ],
    "checkedAt": "October 16, 2026"
  },
  "cisco": {
    "id": "cisco",
    "name": "Cisco",
    "source": "https://careers.cisco.com/global/en/how-we-hire",
    "guide": "Cisco says the interview process varies by team and role and encourages candidates to connect their experience to the opportunity.",
    "focus": [
      "Explain the customer or security requirement",
      "Validate architecture and operational assumptions",
      "Prepare detailed examples and thoughtful questions"
    ],
    "checkedAt": "October 16, 2026"
  },
  "palo-alto": {
    "id": "palo-alto",
    "name": "Palo Alto Networks",
    "source": "https://jobs.paloaltonetworks.com/en",
    "guide": "The employer’s careers site provides cybersecurity role information. The defensive scenarios here are independent Casecraft practice, not reported interview questions.",
    "focus": [
      "Prioritize threats using evidence",
      "Explain containment and verification",
      "Communicate risk without unsupported claims"
    ],
    "checkedAt": "October 16, 2026"
  },
  "apple": {
    "id": "apple",
    "name": "Apple",
    "source": "https://www.apple.com/careers/us/",
    "guide": "Apple’s careers site describes its teams and opportunities. Use the specific finance role to guide preparation; this track does not claim an Apple interview rubric.",
    "focus": [
      "Connect forecasts to business decisions",
      "Distinguish cash, profit and assumptions",
      "Explain your individual contribution"
    ],
    "checkedAt": "October 16, 2026"
  },
  "pepsico": {
    "id": "pepsico",
    "name": "PepsiCo",
    "source": "https://www.pepsicojobs.com/applicant-help/?lang=en-US",
    "guide": "PepsiCo’s applicant guide describes role-dependent steps and asks for real examples of experience. Use these original finance exercises to practice business judgment.",
    "focus": [
      "Explain commercial and operational drivers",
      "Build a transparent financial bridge",
      "Prepare truthful examples of impact"
    ],
    "checkedAt": "October 16, 2026"
  },
  "oracle": {
    "id": "oracle",
    "name": "Oracle",
    "source": "https://www.oracle.com/careers/",
    "guide": "Oracle’s careers site provides role and team information. This track focuses on original enterprise-sales and solution-design practice, not a fixed Oracle interview plan.",
    "focus": [
      "Discover the buyer’s actual constraints",
      "Validate technical fit and business value",
      "Explain implementation and commercial next steps"
    ],
    "checkedAt": "October 16, 2026"
  }
};
