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
  /** Further paragraphs shown in a "How We Help" section below the page intro. */
  details?: string[];
  positioning?: string;
  markets?: string[];
  delivery: {
    heading: string;
    intro?: string;
    kind: "flow" | "process";
    nodes: DiagramNode[];
  };
  capabilities?: { label: string; icon: IconKey }[];
  billing?: { heading: string; body: string };
  /** Extended end-to-end detail, currently used by the Cloud service page. */
  cloud?: CloudDetail;
};

export const services: Service[] = [
  {
    slug: "cloud-infrastructure-ai",
    number: "01",
    shortTitle: "Cloud & AI",
    title: "Cloud Infrastructure & AI Solutions",
    summary:
      "Cloud migration, modernization, managed services and AI workloads on AWS and Google Cloud, with cost optimization and transparent billing.",
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
  },
  {
    slug: "web3-gaming-blockchain",
    number: "02",
    shortTitle: "Web3 & Blockchain",
    title: "Web3 Gaming & Blockchain Solutions",
    summary:
      "Cloud-hosted gaming platforms with blockchain-based in-game economies and digital asset ownership, supported from deployment and integration through to ongoing scaling.",
    seoTitle: "Web3 Gaming & Blockchain Solutions | String FinTech HK Ltd.",
    metaDescription:
      "Blockchain-powered gaming platforms, API connectivity and transaction infrastructure connecting gaming operators with authorized financial service providers.",
    intro:
      "String FinTech HK Ltd. delivers next-generation gaming solutions and services supported by scalable cloud infrastructure, blockchain technology, and innovative digital platforms. We help corporate clients build, deploy, and manage reliable gaming ecosystems with cloud-based hosting, flexible computing resources, and infrastructure designed to support performance, availability, and growing user demand. Our solutions integrate blockchain-based technologies to enable transparent in-game economies, digital asset ownership, and enhanced player engagement. From infrastructure deployment and platform integration to ongoing technical support and scalability, we help clients optimize gaming performance, improve operational efficiency, and develop engaging digital experiences for web, desktop, mobile, and community-driven platforms.",
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
          id: "end-customers",
          title: "End Customers & Gaming Participants",
          icon: "users",
          description:
            "Access supported gaming platforms and eligible payment services through convenient digital channels, with transaction visibility and a streamlined user experience.",
        },
      ],
    },
  },
  {
    slug: "ai-data-services-analytics",
    number: "03",
    shortTitle: "AI & Data Analytics",
    title: "AI-Powered Data Services & Analytics",
    summary:
      "AI-driven analytics, predictive modeling and data visualization on scalable cloud infrastructure, turning complex business data into actionable insights.",
    seoTitle: "AI-Powered Data Services & Analytics | String FinTech HK Ltd.",
    metaDescription:
      "Data engineering, AI-driven analytics, dashboards and predictive insights for exchanges, financial institutions, gaming operators and digital enterprises.",
    intro:
      "String FinTech HK Ltd. delivers AI-powered data services and analytics through scalable cloud infrastructure, intelligent data processing, and advanced analytical technologies. We help businesses collect, integrate, process, and manage data efficiently while transforming complex information into actionable insights through AI-driven analytics, predictive modeling, and interactive data visualization. Our cloud-based solutions support secure data management, flexible computing resources, real-time analysis, and scalable data operations. By enabling faster insights, improved operational efficiency, better resource utilization, and data-driven decision-making, we help organizations optimize business processes, identify growth opportunities, and accelerate digital transformation.",
    details: [
      "String FinTech HK Ltd. helps corporate clients modernize their data operations through integrated cloud services, AI-powered analytics, and scalable data management solutions. We connect enterprise data sources with secure cloud infrastructure and intelligent processing systems to streamline data integration, automate workflows, and transform complex business information into actionable insights. Our solutions support operational performance monitoring, business intelligence, predictive analytics, and customized reporting, enabling organizations to improve productivity, optimize resource utilization, reduce operational inefficiencies, and make informed strategic decisions. With flexible cloud infrastructure and appropriate data security, privacy, access management, and governance controls, we help corporate clients build scalable, efficient, and data-driven operations that deliver measurable business value.",
    ],
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
  },
  {
    slug: "digital-marketing-growth",
    number: "04",
    shortTitle: "Digital Marketing",
    title: "Digital Marketing & Growth Solutions",
    summary:
      "SEO, PPC, social media and performance marketing powered by AI analytics, helping businesses reach the right audiences, generate qualified leads and improve conversions.",
    seoTitle: "Digital Marketing & Growth Solutions | String FinTech HK Ltd.",
    metaDescription:
      "AI-powered SEO, performance marketing, audience targeting and campaign analytics delivering measurable growth for corporate clients.",
    intro:
      "String FinTech HK Ltd. combines cloud services, AI-driven marketing analytics, and digital innovation to help businesses strengthen their online presence, reach target audiences, and accelerate growth. We deliver tailored solutions across Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Social Media Marketing (SMM), performance marketing, PPC advertising, influencer marketing, content creation and promotion, and audience targeting. Our AI-powered online advertising and agentic media services support intelligent campaign planning, automated optimization, audience engagement, and data-driven performance monitoring. Supported by scalable cloud infrastructure and advanced marketing analytics, our solutions help clients improve search visibility, expand brand reach, generate qualified leads, optimize advertising expenditure, increase conversions, and measure campaign effectiveness. We enable businesses to build stronger digital brands, improve customer acquisition efficiency, and achieve measurable, sustainable growth.",
    details: [
      "String FinTech HK Ltd. empowers businesses to strengthen their digital presence, reach the right audiences, and accelerate sustainable growth through data-driven digital marketing and technology-enabled solutions. We evaluate each client's business objectives, target audience, industry landscape, and growth requirements to develop tailored marketing strategies that align with their goals. Our services include search engine optimization (SEO), performance marketing, pay-per-click (PPC) advertising, social media marketing, content creation and promotion, audience targeting, website optimization, and campaign management.",
      "By leveraging AI-driven marketing analytics, data insights, and continuous campaign optimization, we help clients improve online visibility, attract qualified traffic, enhance audience engagement, and measure marketing performance. From building brand awareness and generating leads to improving conversion rates and optimizing advertising expenditure, our solutions are designed to help businesses make informed marketing decisions and maximize the value of their digital investments. Whether supporting emerging businesses or established enterprises, String FinTech HK Ltd. delivers flexible, scalable, and results-oriented digital marketing solutions tailored to each client's evolving needs.",
    ],
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
  },
  {
    slug: "financial-data-analytics",
    number: "05",
    shortTitle: "Financial Intelligence",
    title: "Financial Data Analytics & Intelligence",
    summary:
      "Real-time and historical analytics across equities, options, commodities, currencies and cryptocurrency, delivered through cloud-based dashboards and customizable reports.",
    seoTitle: "Financial Data Analytics & Intelligence | String FinTech HK Ltd.",
    metaDescription:
      "AI-assisted market analysis, algorithmic analytics and custom dashboards across equities, options, commodities, FX and cryptocurrency markets.",
    intro:
      "String FinTech HK Ltd. empowers businesses, financial professionals, and technology-driven organizations to make smarter, data-driven decisions through advanced Financial Data Analytics & Intelligence solutions, supported by scalable cloud infrastructure, artificial intelligence, and innovative data technologies. We deliver analytics across equities, options, commodities, currencies, and cryptocurrency markets, combining real-time market data, historical datasets, intraday monitoring, and algorithmic analytical techniques to transform complex financial information into actionable insights.",
    details: [
      "Through secure, scalable cloud services and AI-powered data processing, we transform market data into interactive dashboards, market summaries, historical comparisons, trend indicators, performance monitoring tools, and customizable reports. Our solutions help clients streamline data analysis, improve operational efficiency, monitor market movements, evaluate performance, and identify emerging trends and analytical patterns. By providing flexible data visualization, reporting capabilities, and cloud-based access to financial intelligence, we enable organizations to reduce the complexity of market analysis, enhance analytical capabilities, and make faster, more informed business decisions—all through technology solutions designed to support their evolving operational and strategic needs.",
    ],
    markets: ["Equities", "Options", "Commodities", "Foreign Exchange", "Cryptocurrency"],
    delivery: {
      heading: "Service Delivery Model",
      kind: "flow",
      nodes: [
        {
          id: "technology-providers",
          title: "Cloud & Technology Services",
          icon: "provider",
          description: "Supply authorized market data and cloud computing infrastructure.",
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
    eyebrow: "Cloud Services • AI • Technology Services • Innovation",
    headline: "Transforming Business Through Cloud Services, AI, Innovation & Technology",
    /** Tail of the headline shown in the brand gradient. */
    highlight: "Cloud Services, AI, Innovation & Technology",
    body: "String FinTech HK Ltd. empowers businesses to accelerate digital transformation through cloud services, artificial intelligence, innovation, and advanced technology solutions. We help organizations leverage cloud infrastructure, AI-powered services, blockchain-based technology, financial technology infrastructure, and intelligent automation to streamline operations, optimize costs, enhance efficiency, and unlock new growth opportunities. By bridging traditional business ecosystems with the emerging digital and agentic economies, we aim to deliver scalable, secure, and reliable technology solutions that support business innovation, operational excellence, and sustainable growth.",
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
    "Cloud Infrastructure & AI",
    "Web3 Gaming & Blockchain",
    "AI Data Services & Analytics",
    "Digital Marketing & Growth",
    "Financial Data Analytics",
    "IT Consulting",
    "Other",
  ],
};
