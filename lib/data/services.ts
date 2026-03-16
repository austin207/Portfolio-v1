export interface ServiceExtra {
  name: string
  price: number | null
  perTier?: Record<string, { price: number; delivery: string }>
  delivery?: string
}

export interface ServiceTier {
  name: string
  label: string
  price: number
  description: string
  features: string[]
  delivery: string
  revisions: string
  highlighted?: boolean
}

export interface ServiceSection {
  title: string
  items: string[]
}

export interface Service {
  id: string
  title: string
  shortTitle: string
  icon: string
  headline: string
  description: string
  sections: ServiceSection[]
  tags: string[]
  preOrderNote: string
  tiers: ServiceTier[]
  extras: ServiceExtra[]
  fiverr: string
  faq?: string[]
}

export const services: Service[] = [
  {
    id: "ai-chatbot",
    title: "Personal AI Chatbot",
    shortTitle: "AI Chatbot",
    icon: "MessageSquare",
    headline: "I will build a custom AI chatbot powered by the latest LLM models.",
    description:
      "Custom AI chatbots tailored to your specific needs — personal assistants, customer support bots, knowledge base Q&A, and domain-specific conversational AI. From basic session-managed bots to production-ready agentic systems with multimodal capabilities.",
    sections: [
      {
        title: "What I Offer",
        items: [
          "LLM model integration (GPT-4, Claude, Gemini, Llama)",
          "Retrieval-Augmented Generation (RAG) pipelines",
          "Session management & memory",
          "Pre-set conversational journeys",
          "User authentication & personalization",
          "Multi-language support",
          "Advanced agentic workflows",
          "Image & video model integration",
        ],
      },
      {
        title: "Why Choose Me",
        items: [
          "Production-ready, scalable architecture",
          "Clean, well-documented code",
          "Fast turnaround with clear communication",
          "Post-delivery support included",
        ],
      },
    ],
    tags: ["LLMs", "Chatbots", "Python", "RAG", "API Integration", "GPT-4", "Claude"],
    preOrderNote: "Message before ordering — let's align on scope, stack & timeline first.",
    fiverr: "https://pro.fiverr.com/s/bdE5X1k",
    tiers: [
      {
        name: "basic",
        label: "Basic",
        price: 500,
        description: "A solid foundation for teams needing a functional AI chatbot fast.",
        features: [
          "LLM model integration",
          "Session management",
          "1 custom model",
        ],
        delivery: "5 days",
        revisions: "1",
      },
      {
        name: "standard",
        label: "Titanium",
        price: 1000,
        description: "Smarter, context-aware assistant with memory and retrieval capabilities.",
        features: [
          "Everything in Basic",
          "Retrieval-Augmented Generation (RAG)",
          "Multi-model integration",
          "Memory management",
          "Basic agentic capabilities",
          "Multi-language support",
        ],
        delivery: "14 days",
        revisions: "3",
        highlighted: true,
      },
      {
        name: "premium",
        label: "Titanium+",
        price: 2000,
        description: "Production-ready agentic system with full multimodal and auth support.",
        features: [
          "Everything in Titanium",
          "Advanced agentic workflows",
          "Image & video model integration",
          "Pre-set conversational journey",
          "User authentication",
        ],
        delivery: "21 days",
        revisions: "Unlimited",
      },
    ],
    extras: [
      {
        name: "Extra Fast Delivery",
        price: null,
        perTier: {
          basic: { price: 100, delivery: "2 days" },
          standard: { price: 200, delivery: "10 days" },
          premium: { price: 400, delivery: "14 days" },
        },
      },
      { name: "Source Code Handover", price: 500, delivery: "+2 days" },
      { name: "Additional Revision", price: 100, delivery: "+2 days" },
    ],
    faq: [
      "What is your primary use case? (customer support, internal assistant, lead generation, sales, training)",
      "Do you have existing docs, knowledge base, or data sources the chatbot should learn from?",
      "What's your preferred LLM provider? (OpenAI GPT-4, Claude, Gemini, Llama)",
      "Where should the chatbot be deployed? (website, mobile app, Slack, Teams, API)",
      "Do you need actions beyond Q&A? (create tickets, check orders, book appointments)",
      "What's your expected user volume?",
      "Any compliance or security requirements? (GDPR, HIPAA, SOC 2)",
    ],
  },
  {
    id: "arduino-esp32",
    title: "Arduino & ESP32 Firmware",
    shortTitle: "Arduino / ESP32",
    icon: "Cpu",
    headline: "I will develop custom Arduino or ESP32 firmware code for your projects.",
    description:
      "Professional embedded firmware development for IoT projects, sensor integration, and wireless connectivity. Custom solutions for Arduino, ESP32, and ESP8266 platforms with clean, documented, and maintainable code.",
    sections: [
      {
        title: "What I Offer",
        items: [
          "Custom firmware development for Arduino and ESP32",
          "Sensor integration (temperature, humidity, motion, etc.)",
          "WiFi and Bluetooth connectivity",
          "Cloud platform integration (AWS IoT, Firebase, etc.)",
          "Motor control and actuator programming",
          "MQTT and HTTP communication protocols",
          "Clean, documented, and maintainable code",
        ],
      },
      {
        title: "Why Choose Me",
        items: [
          "Fast turnaround time",
          "Well-commented source code included",
          "Thorough testing and debugging",
          "Responsive communication",
          "Multiple revisions to ensure your satisfaction",
        ],
      },
    ],
    tags: ["Arduino", "ESP32", "ESP8266", "Embedded C", "IoT", "WiFi", "Bluetooth", "MQTT"],
    preOrderNote: "Contact before placing an order.",
    fiverr: "https://pro.fiverr.com/s/kLkoELg",
    tiers: [
      {
        name: "basic",
        label: "Basic",
        price: 20,
        description: "Simple Arduino code for basic sensor integration and control.",
        features: [
          "2 sensors/modules",
          "Basic integration",
        ],
        delivery: "1 day",
        revisions: "1",
      },
      {
        name: "standard",
        label: "Standard",
        price: 40,
        description: "ESP32 firmware with WiFi connectivity and multiple sensors.",
        features: [
          "4 sensors/modules",
          "WiFi connectivity",
          "Multiple sensor support",
        ],
        delivery: "3 days",
        revisions: "2",
        highlighted: true,
      },
      {
        name: "premium",
        label: "Premium",
        price: 75,
        description: "Complete software solution with source code, version control and documentation.",
        features: [
          "6 sensors/modules",
          "Full source code",
          "Version control",
          "Documentation",
        ],
        delivery: "7 days",
        revisions: "3",
      },
    ],
    extras: [
      { name: "Component Selection", price: 15, delivery: "+2 days" },
      { name: "Driver Coding", price: 30, delivery: "+2 days" },
      { name: "Simulation", price: null },
      { name: "System Design", price: null },
      { name: "Additional Sensor/Module", price: null },
      { name: "Detailed Documentation", price: null },
      { name: "Include Source Code", price: null },
      { name: "Additional Revision", price: null },
    ],
    faq: [
      "Which microcontroller are you using? (Arduino Uno, ESP32, ESP8266, Nano, etc.)",
      "Describe your project requirements and what functionality the firmware needs.",
    ],
  },
  {
    id: "ros2",
    title: "ROS 2 Applications",
    shortTitle: "ROS 2",
    icon: "Bot",
    headline: "I will develop ROS 2 applications for simulation and real robots.",
    description:
      "Custom ROS 2 development for Gazebo simulation, URDF modeling, RViz visualization, Nav2, custom nodes, and more. From architecture consultation to full-stack production-ready robotics solutions.",
    sections: [
      {
        title: "What I Offer",
        items: [
          "Gazebo simulation environments",
          "URDF/XACRO robot modeling",
          "RViz visualization & debugging",
          "Nav2 navigation stack integration",
          "Custom ROS 2 nodes & launch files",
          "System architecture design & review",
          "Technology stack recommendations",
          "Production-ready, documented code",
        ],
      },
      {
        title: "Why Choose Me",
        items: [
          "Hands-on ROS 2 experience with real and simulated robots",
          "Clear communication and milestone-based delivery",
          "Comprehensive documentation included",
          "Post-delivery consultation available",
        ],
      },
    ],
    tags: ["ROS 2", "Gazebo", "URDF", "RViz", "Nav2", "Python", "C++"],
    preOrderNote: "Please message before placing an order so we can align on scope, budget, and timeline.",
    fiverr: "https://pro.fiverr.com/s/P27yA2o",
    tiers: [
      {
        name: "basic",
        label: "Silver",
        price: 25,
        description: "Focused ROS 2 consultation on system design and stack selection. Perfect for planning your project architecture.",
        features: [
          "Project plan",
          "Cost estimation",
          "60 min live consultation",
          "Tech stack recommendations",
        ],
        delivery: "3 days",
        revisions: "1",
      },
      {
        name: "standard",
        label: "Gold",
        price: 75,
        description: "Custom ROS 2 nodes and launch files implemented to your specs. Ideal for hardware-focused or real robot deployments.",
        features: [
          "Everything in Silver",
          "Custom ROS 2 nodes",
          "Launch files",
          "90 min consultation",
          "Code documentation",
        ],
        delivery: "5 days",
        revisions: "2",
        highlighted: true,
      },
      {
        name: "premium",
        label: "Platinum",
        price: 150,
        description: "Complete ROS 2 application with Gazebo/RViz simulation, URDF models, and production-ready code.",
        features: [
          "Everything in Gold",
          "Gazebo/RViz simulation",
          "URDF models",
          "120 min consultation",
          "Comprehensive documentation",
        ],
        delivery: "7 days",
        revisions: "3",
      },
    ],
    extras: [
      { name: "Live Consultation", price: 50, delivery: "Ongoing until completion" },
      { name: "DevOps Support", price: 75, delivery: "3-4 months post-delivery" },
      { name: "Web Application Audit", price: null },
      { name: "Cost Estimation", price: null },
    ],
    faq: [
      "Please provide a detailed requirement of the project (DOC file preferred).",
    ],
  },
  {
    id: "n8n-automation",
    title: "n8n Automation & AI Agents",
    shortTitle: "n8n / AI Agents",
    icon: "Zap",
    headline: "I will develop n8n automation workflows and custom AI agents for your business.",
    description:
      "Powerful n8n automation workflows, custom AI agents, and seamless multi-app integrations. From basic data syncing to enterprise-grade AI agent solutions with LLM integration, webhooks, and conditional logic.",
    sections: [
      {
        title: "What I Offer",
        items: [
          "Custom n8n workflow automation",
          "AI agent development with ChatGPT, Claude, and other LLMs",
          "Multi-app integrations (Slack, Gmail, Airtable, Notion, Google Sheets, etc.)",
          "API integrations and custom webhooks",
          "Data synchronization and transformation",
          "Error handling and workflow optimization",
          "Database automation (MySQL, PostgreSQL, MongoDB)",
          "CRM automation and lead management",
          "E-commerce and social media automation",
        ],
      },
      {
        title: "Why Choose Me",
        items: [
          "Expert in n8n automation platform",
          "Clean, efficient, and well-documented workflows",
          "Quick response time and clear communication",
          "Scalable solutions for businesses of all sizes",
          "Post-delivery support included",
        ],
      },
    ],
    tags: ["n8n", "AI Agents", "ChatGPT", "Claude", "Slack", "Gmail", "Airtable", "Notion", "MQTT"],
    preOrderNote: "Please contact me before placing an order to discuss your specific requirements.",
    fiverr: "https://pro.fiverr.com/s/akD0Aeg",
    tiers: [
      {
        name: "basic",
        label: "Basic",
        price: 45,
        description: "Basic n8n workflow automation with 2-3 app integrations and data syncing.",
        features: [
          "2-3 app integrations",
          "Data syncing",
          "Basic workflow logic",
        ],
        delivery: "4 days",
        revisions: "2",
      },
      {
        name: "standard",
        label: "Standard",
        price: 120,
        description: "Advanced n8n automation with 3-5 apps, AI tools, webhooks & conditional logic.",
        features: [
          "3-5 app integrations",
          "AI tools integration",
          "Webhooks",
          "Conditional logic",
          "Error handling",
        ],
        delivery: "7 days",
        revisions: "3",
        highlighted: true,
      },
      {
        name: "premium",
        label: "Premium",
        price: 275,
        description: "Enterprise n8n solution: custom AI agents, unlimited integrations, full documentation.",
        features: [
          "Unlimited integrations",
          "Custom AI agents",
          "Full documentation",
          "Database automation",
          "Priority support",
        ],
        delivery: "14 days",
        revisions: "9",
      },
    ],
    extras: [
      {
        name: "Extra Fast Delivery",
        price: null,
        perTier: {
          basic: { price: 25, delivery: "1 day" },
          standard: { price: 40, delivery: "3 days" },
          premium: { price: 60, delivery: "5 days" },
        },
      },
      { name: "Include Source Code", price: 20 },
      { name: "Additional Revision", price: 15 },
      { name: "Detailed Code Comments", price: null },
      { name: "Design Customization", price: null },
      { name: "Responsive Design", price: null },
    ],
    faq: [
      "What apps or services do you want to integrate with n8n?",
      "Describe what you want to automate and the expected outcome.",
    ],
  },
  {
    id: "pcb-design",
    title: "PCB Design",
    shortTitle: "PCB Design",
    icon: "PenTool",
    headline: "I will design professional PCBs from schematic capture to manufacturing-ready Gerbers.",
    description:
      "Professional PCB design services using Altium Designer, KiCad, and Eagle. From simple 2-layer hobby boards to complex multi-layer designs with high-speed considerations, impedance control, and DFM review. Includes native design files, Gerber output, and BOM.",
    sections: [
      {
        title: "What I Offer",
        items: [
          "Schematic capture from circuit descriptions or reference designs",
          "Single, double, and multi-layer PCB layout (up to 6+ layers)",
          "Component selection and sourcing recommendations",
          "High-speed design (controlled impedance, differential pairs, length matching)",
          "EMC/EMI design best practices",
          "DFM review with manufacturer guidelines",
          "Gerber, drill, pick-and-place, and stencil file generation",
          "3D board rendering and visualization",
          "BOM with supplier part numbers (DigiKey, Mouser, LCSC)",
        ],
      },
      {
        title: "Why Choose Me",
        items: [
          "Proficient in Altium Designer, KiCad, and Eagle",
          "Hands-on experience with real hardware manufacturing",
          "Clean, DRC-verified, production-ready layouts",
          "Clear communication with milestone-based delivery",
          "Support through manufacturing and first-article inspection",
        ],
      },
    ],
    tags: ["Altium Designer", "KiCad", "Eagle", "PCB Layout", "Schematic", "Gerber", "DFM"],
    preOrderNote: "Message before ordering — share your schematic or circuit description so I can scope accurately.",
    fiverr: "https://pro.fiverr.com/s/7Y9Kbq4",
    tiers: [
      {
        name: "basic",
        label: "Basic",
        price: 100,
        description: "Simple single or double-layer PCB with schematic capture and layout. Ideal for hobby projects and maker boards.",
        features: [
          "1-2 layer PCB (up to 50 components)",
          "Schematic capture",
          "PCB layout with DRC verification",
          "Gerber + drill files",
          "BOM spreadsheet",
          "Native design files (KiCad/Altium/Eagle)",
        ],
        delivery: "5 days",
        revisions: "2",
      },
      {
        name: "standard",
        label: "Standard",
        price: 250,
        description: "Multi-layer PCB with component selection guidance and manufacturing-ready output. Best for IoT, sensor boards, and MCU designs.",
        features: [
          "Up to 4-layer PCB (up to 150 components)",
          "Everything in Basic",
          "Component selection & sourcing recommendations",
          "Power/ground plane design",
          "Pick-and-place + assembly drawings",
          "BOM with supplier part numbers",
          "Basic DFM review",
        ],
        delivery: "12 days",
        revisions: "3",
        highlighted: true,
      },
      {
        name: "premium",
        label: "Premium",
        price: 500,
        description: "Complex multi-layer design with high-speed rules, full documentation, and manufacturing liaison support.",
        features: [
          "4-6+ layer PCB (200+ components)",
          "Everything in Standard",
          "High-speed design (impedance control, diff pairs)",
          "EMC/EMI best practices",
          "Complete documentation package",
          "DFM review with manufacturer guidelines",
          "Manufacturing liaison support",
          "3D board rendering",
        ],
        delivery: "18 days",
        revisions: "4",
      },
    ],
    extras: [
      { name: "Expedited Delivery", price: null, perTier: {
        basic: { price: 50, delivery: "3 days" },
        standard: { price: 100, delivery: "7 days" },
        premium: { price: 200, delivery: "12 days" },
      }},
      { name: "Additional Revision Round", price: 35, delivery: "+2 days" },
      { name: "Firmware/Embedded Support", price: null },
      { name: "Enclosure Design Consultation", price: null },
    ],
    faq: [
      "Do you have a schematic or circuit description ready?",
      "What's the target board size and layer count?",
      "Any specific components or footprints required?",
      "Which manufacturer will you use? (JLCPCB, PCBWay, OSHPark, etc.)",
      "Any high-speed or controlled impedance requirements?",
    ],
  },
]

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}
