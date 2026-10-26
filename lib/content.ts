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

export type CloudCapabilityIcon = "migrate" | "modernize" | "managed" | "ai" | "cost" | "consult";

export type CloudDetail = {
  approach: { heading: string; body: string; points: { title: string; body: string }[] };
  capabilities: {
    heading: string;
    body: string;
    items: { title: string; icon: CloudCapabilityIcon; body: string; points: string[] }[];
  };
  engagement: { heading: string; body: string[]; steps: { title: string; body: string }[] };
  platforms: { heading: string; body: string; items: { name: string; short: string; body: string }[]; note: string };
  commercials: { heading: string; body: string; items: { title: string; body: string }[]; note: string };
};

export type Service = {
  slug: string;
  number: string;
  /** Compact label for tight spaces such as the home hero graphic. */
  shortTitle: string;
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
  /** Extended end-to-end detail, currently used by the Cloud service page. */
  cloud?: CloudDetail;
  objective: string;
  note?: string;
};

export const services: Service[] = [
  {
    slug: "web3-gaming-blockchain",
    number: "01",
    shortTitle: "Web3 & Blockchain",
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
    number: "02",
    shortTitle: "AI & Data Analytics",
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
    number: "03",
    shortTitle: "Digital Marketing",
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
    number: "04",
    shortTitle: "Financial Intelligence",
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
    number: "05",
    shortTitle: "Cloud & AI",
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
    cloud: {
      approach: {
        heading: "Cloud services aligned with your business goals",
        body: "From initial assessment to ongoing operations, we help clients make informed cloud decisions and build technology foundations that can grow with their business.",
        points: [
          { title: "Plan with clarity", body: "Understand your existing IT environment, requirements, risks, and cloud options." },
          { title: "Deploy with confidence", body: "Move workloads through a structured implementation and migration process." },
          { title: "Optimize continuously", body: "Improve resource usage, operational visibility, security, and cost management." },
        ],
      },
      capabilities: {
        heading: "End-to-end cloud and AI capabilities",
        body: "Flexible services designed around your technology environment, delivery priorities, and operating model.",
        items: [
          {
            title: "Cloud Migration",
            icon: "migrate",
            body: "Navigate your cloud journey with expert planning and structured execution.",
            points: [
              "IT landscape and workload assessment",
              "Migration planning and implementation",
              "Application and database transition",
              "Security and post-migration validation",
            ],
          },
          {
            title: "Cloud Modernization",
            icon: "modernize",
            body: "Update legacy systems and create a flexible foundation for digital growth.",
            points: [
              "Cloud-native architecture guidance",
              "Application modernization",
              "Containerization and deployment support",
              "Automation and integration",
            ],
          },
          {
            title: "Managed Cloud Services",
            icon: "managed",
            body: "Keep cloud environments visible, supported, and aligned with operational needs.",
            points: [
              "Monitoring and incident support",
              "Backup and recovery planning",
              "Security updates and configuration reviews",
              "Performance and availability management",
            ],
          },
          {
            title: "AI & Cloud Solutions",
            icon: "ai",
            body: "Support practical AI adoption using scalable cloud resources and integrations.",
            points: [
              "AI application and model deployment",
              "API integration and workflow automation",
              "GPU and compute workload planning",
              "Cloud-native solution development",
            ],
          },
          {
            title: "Cost Optimization",
            icon: "cost",
            body: "Make cloud expenditure more transparent and align resource use with demand.",
            points: [
              "Usage and spend reviews",
              "Resource sizing recommendations",
              "Capacity and storage optimization",
              "Ongoing FinOps support",
            ],
          },
          {
            title: "Cloud Consulting",
            icon: "consult",
            body: "Connect technology decisions to your business requirements and roadmap.",
            points: [
              "Cloud strategy and architecture",
              "Technology and vendor evaluation",
              "Implementation roadmaps",
              "Technical documentation and guidance",
            ],
          },
        ],
      },
      engagement: {
        heading: "A practical partner for your cloud journey",
        body: [
          "String FinTech HK Ltd. can combine consulting, implementation, cloud provisioning, and ongoing management into a service model tailored to each client.",
          "Clients receive clearly scoped services, transparent billing arrangements, and support that can continue beyond initial deployment.",
        ],
        steps: [
          { title: "Assess and plan", body: "Review workloads, business objectives, security requirements, and expected cloud costs." },
          { title: "Design and deploy", body: "Develop the solution architecture and provision or migrate approved workloads." },
          { title: "Manage and optimize", body: "Monitor performance, maintain agreed controls, and identify efficiency improvements." },
          { title: "Support and scale", body: "Provide ongoing assistance and help adapt infrastructure as business needs evolve." },
        ],
      },
      platforms: {
        heading: "Solutions across leading cloud platforms",
        body: "We help clients plan and operate cloud workloads in suitable environments, subject to project needs and the applicable provider arrangements.",
        items: [
          { name: "Amazon Web Services", short: "AWS", body: "Compute, storage, networking, databases, security, and scalable application infrastructure." },
          { name: "Google Cloud", short: "GC", body: "Cloud infrastructure, data services, application platforms, and AI-related workloads." },
        ],
        note: "AWS and Google Cloud are trademarks of their respective owners. Mention of these platforms does not imply a formal partnership or endorsement unless separately confirmed.",
      },
      commercials: {
        heading: "A clear approach to contracts and billing",
        body: "Each engagement should define what the client pays for, how usage is measured, and how services are delivered and settled.",
        items: [
          { title: "Assessment & migration", body: "One-time project fees based on agreed scope, complexity, and delivery milestones." },
          { title: "Cloud consumption", body: "Provider usage charges billed directly by the provider or through an authorized billing arrangement, as agreed in the contract." },
          { title: "Managed services", body: "Monthly or annual fees for defined monitoring, maintenance, support, and operational services." },
          { title: "AI & development", body: "Project fees, recurring support, or usage-based pricing where appropriate and contractually defined." },
          { title: "Reconciliation & settlement", body: "Clear invoicing and reconciliation of provider charges, service fees, credits, taxes, and payments." },
        ],
        note: "Cloud-provider resale, partner discounts, commissions, and consolidated billing are subject to the relevant provider program requirements and signed agreements. Service scope, service levels, taxes, and payment terms should be documented in each client contract.",
      },
    },
    objective:
      "String FinTech HK Ltd. bridges corporate customers and leading cloud platforms through integrated cloud infrastructure and AI solutions. Through AWS and Google Cloud environments, we help businesses modernize applications, deploy AI workloads, optimize infrastructure costs and maintain scalable digital operations, supported by transparent contractual billing and settlement processes.",
  },
];

export const serviceHref = (slug: string) => `/services/${slug}`;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
  /** Home hero: traditional finance (columns) becoming a digital network. */
  overview: "/images/overview-bridge.png",
};


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
