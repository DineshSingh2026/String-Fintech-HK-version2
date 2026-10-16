// Single source of truth for all site copy. Text is reproduced exactly as supplied;
// only line breaks have been normalised for layout.

export const company = {
  name: "String FinTech HK Ltd.",
  shortName: "String FinTech",
  tagline: "Transforming Business Through AI, Innovation & Technology.",
  addressLines: [
    "Flat/RM 606, 6/F, Hollywood Centre",
    "77–91 Queen's Road West, Sheung Wan, Hong Kong",
  ],
  phoneDisplay: "+852 6538 5852",
  phoneHref: "tel:+85265385852",
  email: "info@stringfintech.com",
  mapQuery: "Hollywood Centre, 77–91 Queen's Road West, Sheung Wan, Hong Kong",
  disclaimer:
    "String FinTech HK Ltd. provides technology, integration and consulting services. Regulated financial and payment services referenced on this website are provided by authorized financial institutions and service providers. Nothing on this website constitutes an offer of financial services or investment advice.",
  copyright: "© 2026 String FinTech HK Ltd. All rights reserved.",
};

export type IconKey =
  | "corporate"
  | "string"
  | "institution"
  | "users"
  | "decision"
  | "requirements"
  | "execution"
  | "analytics"
  | "settlement"
  | "provider"
  | "intelligence"
  | "reporting"
  | "cloud"
  | "collect"
  | "process"
  | "ai"
  | "predict"
  | "dashboard"
  | "automate";

export type DiagramNode = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: IconKey;
  /** Marks String FinTech's own node in the flow. */
  core?: boolean;
};

export type Service = {
  slug: string;
  image: string;
  imageAlt: string;
  number: string;
  title: string;
  summary: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  positioning?: string;
  markets?: string[];
  delivery: {
    heading: string;
    intro?: string;
    kind: "flow" | "process";
    nodes: DiagramNode[];
  };
  capabilities?: { label: string; icon: IconKey }[];
  strategy?: { heading: string; body: string };
  billing?: { heading: string; body: string };
  objective: string;
  note?: string;
};

export const services: Service[] = [
  {
    slug: "web3-gaming-blockchain",
    image: "/images/web3-gaming.png",
    imageAlt: "Translucent game controller above a chain of glowing blockchain blocks",
    number: "01",
    title: "Web3 Gaming & Blockchain Solutions",
    summary:
      "We build next-generation gaming experiences powered by blockchain technology, decentralized platforms and NFTs, enabling secure digital asset ownership, transparent in-game economies and seamless interoperability.",
    seoTitle: "Web3 Gaming & Blockchain Solutions | String FinTech HK Ltd.",
    metaDescription:
      "Blockchain-powered gaming platforms, API connectivity and transaction infrastructure connecting gaming operators with authorized financial service providers.",
    intro:
      "We build next-generation gaming experiences powered by blockchain technology, decentralized platforms and NFTs. Our solutions enable secure digital asset ownership, transparent in-game economies and seamless interoperability, creating immersive, player-centric ecosystems that redefine digital engagement.",
    delivery: {
      heading: "Corporate Service Delivery Model",
      intro:
        "Our Corporate Service Delivery Model shows how String FinTech HK Ltd. connects corporate clients and digital gaming operators with technology infrastructure, authorized financial service providers and end customers through an integrated service delivery framework.",
      kind: "flow",
      nodes: [
        {
          id: "corporate-clients",
          title: "Corporate Clients",
          icon: "corporate",
          description:
            "Gaming operators, digital businesses and enterprise partners engage String FinTech HK Ltd. for gaming software, blockchain technology, API integration and transaction reporting solutions tailored to their business requirements.",
        },
        {
          id: "string",
          title: "String FinTech HK Ltd.",
          subtitle: "Technology & Integration Layer",
          icon: "string",
          core: true,
          description:
            "Provides gaming platform development, blockchain-enabled solutions, API connectivity, and transaction data and reconciliation workflows to support efficient digital operations.",
        },
        {
          id: "financial-institutions",
          title: "Authorized Financial Institutions",
          icon: "institution",
          description:
            "Facilitate regulated financial transactions and eligible payment services.",
        },
        {
          id: "end-customers",
          title: "End Customers & Gaming Participants",
          icon: "users",
          description:
            "Access supported gaming platforms and eligible payment services through convenient digital channels, with transaction visibility and a streamlined user experience.",
        },
      ],
    },
    objective:
      "To establish a scalable, collaborative ecosystem in which String FinTech HK Ltd. delivers technology infrastructure, corporate clients operate their digital services, authorized financial institutions facilitate regulated financial transactions, and end customers access supported services securely and efficiently.",
  },
  {
    slug: "ai-data-services-analytics",
    image: "/images/ai-data.png",
    imageAlt: "Data streams converging into a glowing neural network core inside a data centre",
    number: "02",
    title: "AI-Powered Data Services & Analytics",
    summary:
      "We transform complex data into actionable intelligence through advanced data engineering, AI-driven analytics and scalable data management solutions.",
    seoTitle: "AI-Powered Data Services & Analytics | String FinTech HK Ltd.",
    metaDescription:
      "Data engineering, AI-driven analytics, dashboards and predictive insights for exchanges, financial institutions, gaming operators and digital enterprises.",
    intro:
      "We transform complex data into actionable intelligence through advanced data engineering, AI-driven analytics and scalable data management solutions. From data collection and processing to visualization and predictive insights, we empower organizations to make smarter decisions, optimize operations and accelerate sustainable business growth.",
    delivery: {
      heading: "Service Delivery Model",
      kind: "flow",
      nodes: [
        {
          id: "corporate-clients",
          title: "Corporate Clients",
          icon: "corporate",
          description:
            "Exchanges, financial trading institutions, gaming operators and digital enterprises engage String FinTech HK Ltd. to improve data utilization, automate reporting, enhance operational efficiency and support data-driven business decisions.",
        },
        {
          id: "string",
          title: "String FinTech HK Ltd.",
          subtitle: "Technology & Data Intelligence Layer",
          icon: "string",
          core: true,
          description:
            "Provides data collection and integration, data processing, AI-driven analytics, predictive insights, dashboard development and automated reporting solutions tailored to corporate requirements.",
        },
        {
          id: "business-users",
          title: "Business Users & Decision-Makers",
          icon: "decision",
          description:
            "Management teams, analysts and operational departments access actionable insights, performance dashboards, trend analysis and predictive intelligence to support strategic planning, risk assessment, operational optimization and business growth.",
        },
      ],
    },
    capabilities: [
      { label: "Data Collection & Integration", icon: "collect" },
      { label: "Data Processing", icon: "process" },
      { label: "AI-Driven Analytics", icon: "ai" },
      { label: "Predictive Insights", icon: "predict" },
      { label: "Dashboard Development", icon: "dashboard" },
      { label: "Automated Reporting", icon: "automate" },
    ],
    objective:
      "To establish a scalable, AI-driven data ecosystem that connects corporate data sources with intelligent processing and analytics capabilities, enabling organizations to make informed decisions, improve productivity and unlock measurable business value, all while maintaining appropriate data security, privacy and governance controls.",
  },
  {
    slug: "digital-marketing-growth",
    image: "/images/digital-marketing.png",
    imageAlt: "Holographic marketing analytics panels with a conversion funnel and growth charts",
    number: "03",
    title: "Digital Marketing & Growth Solutions",
    summary:
      "We deliver data-driven digital marketing strategies that strengthen brand visibility, engage target audiences and maximize conversions.",
    seoTitle: "Digital Marketing & Growth Solutions | String FinTech HK Ltd.",
    metaDescription:
      "AI-powered SEO, performance marketing, audience targeting and campaign analytics delivering measurable growth for corporate clients.",
    intro:
      "We deliver data-driven digital marketing strategies designed to strengthen brand visibility, engage target audiences and maximize conversions. By combining AI-powered insights, performance marketing, SEO and digital optimization, we help businesses generate qualified leads, improve campaign effectiveness and achieve measurable growth.",
    delivery: {
      heading: "Corporate Service Delivery & Customized Model",
      intro:
        "Our Corporate Service Delivery and Customized Model delivers AI-powered digital marketing services to corporate clients through a structured four-stage process.",
      kind: "process",
      nodes: [
        {
          id: "requirements",
          title: "Business Requirements",
          icon: "requirements",
          description: "Understanding client objectives, audiences and goals",
        },
        {
          id: "execution",
          title: "Campaign Execution",
          icon: "execution",
          description: "Deploying tailored strategies across digital channels",
        },
        {
          id: "analytics",
          title: "Performance Analytics",
          icon: "analytics",
          description: "Measuring, reporting and optimizing results",
        },
        {
          id: "settlement",
          title: "Commercial Settlement",
          icon: "settlement",
          description: "Payments settled according to agreed contractual terms",
        },
      ],
    },
    strategy: {
      heading: "Marketing Strategy & Service Delivery",
      body: "String FinTech HK Ltd. evaluates client requirements and develops tailored digital marketing strategies, including SEO, performance marketing, audience targeting, campaign optimization, content promotion and AI-driven marketing analytics.",
    },
    objective:
      "To establish a transparent, measurable and scalable digital marketing ecosystem in which String FinTech HK Ltd. delivers data-driven growth services, corporate clients receive measurable marketing outcomes, digital platforms facilitate campaign distribution, and payments are settled according to agreed contractual terms.",
  },
  {
    slug: "financial-data-analytics",
    image: "/images/financial-analytics.png",
    imageAlt: "Glass candlestick chart rising across a dark market-data environment",
    number: "04",
    title: "Financial Data Analytics & Intelligence",
    summary:
      "We provide advanced financial data analytics across equities, options, commodities, currencies and cryptocurrency markets.",
    seoTitle: "Financial Data Analytics & Intelligence | String FinTech HK Ltd.",
    metaDescription:
      "AI-assisted market analysis, algorithmic analytics and custom dashboards across equities, options, commodities, FX and cryptocurrency markets.",
    intro:
      "We provide advanced financial data analytics across equities, options, commodities, currencies and cryptocurrency markets. Leveraging AI-driven analysis, algorithmic strategies and real-time market data, we transform complex financial information into meaningful insights through historical analysis, intraday monitoring and customizable data visualizations.",
    markets: ["Equities", "Options", "Commodities", "Foreign Exchange", "Cryptocurrency"],
    delivery: {
      heading: "Service Delivery Model",
      kind: "flow",
      nodes: [
        {
          id: "technology-providers",
          title: "Technology Providers",
          icon: "provider",
          description: "Supply authorized market data and computing infrastructure.",
        },
        {
          id: "analytics-services",
          title: "Analytics & Intelligence Services",
          icon: "intelligence",
          core: true,
          description:
            "String FinTech HK Ltd. delivers data processing, AI-assisted market analysis, algorithmic analytics, historical trend analysis, intraday data monitoring and visualization solutions across equities, options, commodities, foreign exchange and cryptocurrency markets.",
        },
        {
          id: "reporting",
          title: "Financial Intelligence & Reporting",
          icon: "reporting",
          description:
            "Processed data is transformed into interactive dashboards, market summaries, historical comparisons, trend indicators and customizable reports, helping clients evaluate market activity, monitor performance and identify analytical patterns.",
        },
      ],
    },
    objective:
      "To establish a scalable financial intelligence ecosystem in which String FinTech HK Ltd. transforms complex market data into actionable analytical insights, corporate clients access customized intelligence services, technology providers supply authorized data and computing infrastructure, and service payments are settled transparently under agreed commercial terms.",
    note: "Analytics and intelligence services are provided for informational purposes only and do not constitute investment advice or a recommendation to buy or sell any financial instrument.",
  },
  {
    slug: "cloud-infrastructure-ai",
    image: "/images/cloud-infrastructure.png",
    imageAlt: "Glowing cloud above server racks connected by light beams to an AI processor",
    number: "05",
    title: "Cloud Infrastructure & AI Solutions",
    summary:
      "We design and implement secure, scalable, cloud-native architectures built for modern business demands.",
    seoTitle: "Cloud Infrastructure & AI Solutions | String FinTech HK Ltd.",
    metaDescription:
      "Cloud-native architecture, migration, containerization and AI-ready infrastructure on AWS and Google Cloud, with transparent billing and settlement.",
    intro:
      "We design and implement secure, scalable, cloud-native architectures built for modern business demands. Our expertise spans cloud migration, containerization, microservices, infrastructure optimization and AI-ready environments, helping organizations enhance performance, improve operational resilience, accelerate deployment and build future-ready digital infrastructure.",
    positioning:
      "String FinTech HK Ltd. acts as a cloud solutions and infrastructure integration partner, helping enterprises deploy, manage, optimize and scale their digital workloads under transparent service billing and cloud services arrangements.",
    delivery: {
      heading: "Service Delivery Model",
      kind: "flow",
      nodes: [
        {
          id: "cloud-providers",
          title: "Cloud Providers",
          subtitle: "AWS, Google Cloud & Others",
          icon: "cloud",
          description:
            "Amazon Web Services, Google Cloud and other cloud providers supply the underlying resources, including virtual machines, storage, networking, databases, container services and AI/ML infrastructure. String FinTech HK Ltd. provisions and manages these resources through authorized accounts and integrations, subject to provider agreements.",
        },
        {
          id: "string",
          title: "String FinTech HK Ltd.",
          subtitle: "Cloud Services & Integration",
          icon: "string",
          core: true,
          description:
            "We assess client requirements, design cloud-native architectures, configure infrastructure, manage application deployment, and provide technical support, monitoring, resource optimization and infrastructure administration according to the agreed service scope.",
        },
        {
          id: "clients-end-users",
          title: "Corporate Clients & End Users",
          icon: "corporate",
          description:
            "Clients access their deployed applications and business systems through secure endpoints and dashboards. Their users benefit from reliable digital services, while corporate administrators receive agreed operational reports, usage information and support.",
        },
      ],
    },
    billing: {
      heading: "Billing & Settlement",
      body: "String FinTech HK Ltd. manages cloud resources and invoices the client for cloud consumption plus agreed service fees. The company settles the underlying provider charges directly.",
    },
    objective:
      "String FinTech HK Ltd. bridges corporate customers and leading cloud platforms through integrated cloud infrastructure and AI solutions. Through AWS and Google Cloud environments, we help businesses modernize applications, deploy AI workloads, optimize infrastructure costs and maintain scalable digital operations, supported by transparent contractual billing and settlement processes.",
  },
];

export const serviceHref = (slug: string) => `/services/${slug}`;

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const home = {
  seoTitle: "String FinTech HK Ltd. | AI, Web3 & Digital Transformation Solutions",
  metaDescription:
    "Technology-led solutions in AI, Web3 gaming, data analytics, digital marketing, financial intelligence and cloud infrastructure for enterprises and financial institutions.",
  hero: {
    eyebrow: "AI • Technology • Innovation",
    headline: "Transforming Business Through AI, Innovation & Technology",
    body: "We combine intelligent automation and strategic IT consulting to help organizations optimize operations, sharpen decision-making and accelerate digital transformation, delivering measurable impact and sustainable growth.",
  },
  overview: {
    eyebrow: "Executive Overview",
    headline: "Connecting the Digital Economy with Trusted Financial Services",
    columns: [
      {
        title: "The Framework",
        body: "String FinTech HK Ltd. offers a technology-led framework designed to connect Web3 gaming ecosystems with traditional finance and corporate financial services.",
      },
      {
        title: "The Platform",
        body: "By combining gaming software, blockchain-enabled asset records, digital payment integrations, transaction infrastructure and API-based connectivity, the platform helps corporate partners build more efficient, transparent and scalable digital gaming businesses.",
      },
      {
        title: "The Objective",
        body: "To enable financial institutions to serve the growing digital economy, while allowing gaming operators and end customers to access suitable payment and financial services through authorized providers.",
      },
    ],
  },
  services: {
    eyebrow: "Our Services",
    headline: "Integrated Solutions for an AI-Driven Economy",
  },
  about: {
    eyebrow: "About Us",
    headline: "Aligning Business Strategy with Technology for Sustainable Growth",
    body: "We help non-IT organizations and software product companies align their business objectives with effective technology strategies through a process-driven approach and tailored IT consulting.",
  },
};

export const images = {
  hero: "/images/hero-network.png",
  overview: "/images/overview-bridge.png",
  hongKong: "/images/hong-kong.png",
};

/** Keywords for the scrolling ticker, drawn from the service copy. */
export const keywords = [
  "Artificial Intelligence",
  "Web3 Gaming",
  "Blockchain Technology",
  "Data Engineering",
  "Predictive Insights",
  "Performance Marketing",
  "Financial Intelligence",
  "Cloud-Native Architecture",
  "API Connectivity",
  "Digital Transformation",
];

export const ctaBand = {
  headline: "Ready to Accelerate Your Digital Transformation?",
  body: "Speak with our team about technology solutions tailored to your business.",
};

export const about = {
  seoTitle: "About Us | IT Consulting | String FinTech HK Ltd.",
  metaDescription:
    "String FinTech HK Ltd. aligns business strategy with technology through process-driven IT consulting and AI expertise.",
  eyebrow: "About Us | Information Technology Consulting",
  headline: "Aligning Business Strategy with Technology for Sustainable Growth",
  body: [
    "String FinTech HK Ltd. empowers non-IT organizations and software product companies to align their business objectives with effective technology strategies. Through a process-driven approach and tailored IT consulting solutions, we help businesses optimize operations, enhance performance, accelerate customer acquisition and scale efficiently.",
    "By combining AI technology expertise with a deep understanding of business needs, we enable organizations to streamline processes, embrace digital transformation, improve productivity and achieve sustainable long-term growth.",
  ],
  pillars: [
    { title: "Process-Driven", body: "Structured, transparent engagement from assessment to delivery" },
    { title: "Tailored Solutions", body: "Consulting shaped around each client's business requirements" },
    { title: "AI Expertise", body: "Intelligent automation and analytics built into every solution" },
    { title: "Sustainable Growth", body: "Technology strategies designed for long-term scalability" },
  ],
};

export const contact = {
  seoTitle: "Contact Us | String FinTech HK Ltd.",
  metaDescription: "Contact String FinTech HK Ltd. in Sheung Wan, Hong Kong.",
  headline: "Contact Us",
  subheadline: "Let's discuss how technology can move your business forward.",
  serviceOptions: [
    "Web3 Gaming & Blockchain",
    "AI Data Services & Analytics",
    "Digital Marketing & Growth",
    "Financial Data Analytics",
    "Cloud Infrastructure & AI",
    "IT Consulting",
    "Other",
  ],
};
