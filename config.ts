export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  href: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  titleLines: string[]
  subtitle: string
}

export interface StatItem {
  value: string
  label: string
  accentColor: string
}

export interface StatsConfig {
  items: StatItem[]
}

export interface ManifestoConfig {
  headingText: string
  bodyText: string
  videoPath: string
}

export interface StepItem {
  number: number
  title: string
  description: string
  icon: string
  accentColor: string
}

export interface HowItWorksConfig {
  sectionLabel: string
  heading: string
  subheading: string
  steps: StepItem[]
}

export interface CarArticleSection {
  heading: string
  body: string
}

export interface CarItem {
  slug: string
  title: string
  type: string
  image: string
  price: number
  tokenPrice: number
  tokensLeft: number
  totalTokens: number
  specs: string
  tags: string[]
  eyebrow: string
  intro: string
  sections: CarArticleSection[]
}

export interface FleetConfig {
  sectionLabel: string
  countLabel: string
  detailBackText: string
  items: CarItem[]
}

export interface PavilionVideoItem {
  src: string
  caption: string
}

export interface PavilionsConfig {
  sectionLabel: string
  videos: PavilionVideoItem[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterConfig {
  visitLabel: string
  visitLines: string[]
  connectLabel: string
  connectLinks: FooterLink[]
  brandName: string
  rightsText: string
  coordinatesText: string
}

// ─── Site Config ───
export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "LuxShare | Fractional Luxury Car Ownership",
  siteDescription: "The smartest way to drive luxury in India. Buy 1/10th of a supercar via secure tokenization. Block your dates, drive, and sell your share whenever you want.",
}

// ─── Navigation ───
export const navigationConfig: NavigationConfig = {
  brandName: "LuxShare",
  links: [
    { label: "Fleet", href: "#fleet" },
    { label: "Tokenization", href: "#how-it-works" },
    { label: "Pavilions", href: "#pavilions" },
    { label: "Contact", href: "#contact" },
  ],
}

// ─── Hero ───
export const heroConfig: HeroConfig = {
  titleLines: [
    "Own Your Dream",
    "Car For Less",
  ],
  subtitle: "Fractional Luxury Car Ownership — India",
}

// ─── Stats ───
export const statsConfig: StatsConfig = {
  items: [
    { value: "\u20B910L+", label: "Entry Price", accentColor: "#f43f5e" },
    { value: "10", label: "Max Owners Per Car", accentColor: "#8b5cf6" },
    { value: "35+", label: "Days/Year Guaranteed", accentColor: "#f97316" },
  ],
}

// ─── Manifesto (How It Works Intro) ───
export const manifestoConfig: ManifestoConfig = {
  headingText: "The Future of Ownership",
  bodyText: "We split the asset cost into 10 digital tokens. Buying 1 token grants you legal equity ownership and guaranteed usage rights. Our smart scheduling ensures fair rotation, and our marketplace lets you sell whenever you want. No maintenance headaches, no depreciation worries — just pure driving pleasure.",
  videoPath: "/videos/cinematic-fleet.mp4",
}

// ─── How It Works Steps ───
export const howItWorksConfig: HowItWorksConfig = {
  sectionLabel: "How It Works",
  heading: "What is Car Tokenization?",
  subheading: "Three simple steps to owning your dream car",
  steps: [
    {
      number: 1,
      title: "Buy a Token",
      description: "Select a car from our curated fleet. Instead of paying the full price, buy 1 token for just 10% of the car's value. You now legally own 10% of the asset.",
      icon: "coins",
      accentColor: "#8b5cf6",
    },
    {
      number: 2,
      title: "Book Your Days",
      description: "Use our smart app to block your driving dates. Each token gives you roughly 36 days of usage per year. Fair rotation algorithms ensure holidays are shared equitably.",
      icon: "calendar-check",
      accentColor: "#f43f5e",
    },
    {
      number: 3,
      title: "Drive or Sell",
      description: "Enjoy the drive. We handle maintenance, insurance, and secure storage. If the asset appreciates, sell your token on our marketplace at market value.",
      icon: "chart-line",
      accentColor: "#f97316",
    },
  ],
}

// ─── Fleet (Exhibitions → Cars) ───
export const fleetConfig: FleetConfig = {
  sectionLabel: "The Fleet",
  countLabel: "6 Vehicles",
  detailBackText: "Back to Fleet",
  items: [
    {
      slug: "koenigsegg-jesko",
      title: "Koenigsegg Jesko Attack",
      type: "PETROL HYPER CAR",
      image: "/images/koenigsegg-jesko.jpg",
      price: 18000000,
      tokenPrice: 1800000,
      tokensLeft: 3,
      totalTokens: 10,
      specs: "5.0L TWIN TURBO V12 | 1600 HP",
      tags: ["ABSOLUTE TRACK MONSTER", "TRACK ONLY"],
      eyebrow: "Swedish Engineering Excellence",
      intro: "The Koenigsegg Jesko Attack represents the absolute pinnacle of automotive engineering. Named after the founder's father, this track-focused hypercar delivers an astonishing 1600 horsepower on E85 fuel, making it one of the most powerful production cars ever created.",
      sections: [
        {
          heading: "Engineering Marvel",
          body: "The Jesko Attack features Koenigsegg's revolutionary Light Speed Transmission (LST) — a 9-speed multi-clutch gearbox that allows instantaneous gear changes at any RPM. The twin-turbo V8 features a flat-plane crankshaft and Koenigsegg's patented triplex damper system for unmatched stability.",
        },
        {
          heading: "Aerodynamic Mastery",
          body: "With an active rear wing generating over 1400 kg of downforce and an advanced front splitter system, the Jesko Attack corners with supernatural grip. Every surface has been sculpted in wind tunnels to balance drag and downforce.",
        },
        {
          heading: "Token Ownership",
          body: "Own a share of this \u20B918 Crore masterpiece for just \u20B918 Lakhs per token. With only 3 tokens remaining, this is a rare opportunity to join an exclusive group of owners. Each token includes 36+ driving days annually and full maintenance coverage.",
        },
      ],
    },
    {
      slug: "porsche-911-gt3-rs",
      title: "Porsche 911 GT3 RS",
      type: "SPORTS COUPE",
      image: "/images/porsche-911-gt3rs.jpg",
      price: 25000000,
      tokenPrice: 2500000,
      tokensLeft: 5,
      totalTokens: 10,
      specs: "3.0L TWIN TURBO V6 | 600 HP",
      tags: ["PERFORMANCE", "WEEKEND"],
      eyebrow: "German Precision Engineering",
      intro: "The Porsche 911 GT3 RS is the ultimate expression of track-capable road car engineering. With its race-derived naturally aspirated flat-six engine and aggressive aerodynamics, it delivers an unfiltered driving experience that few cars can match.",
      sections: [
        {
          heading: "Race-Bred Performance",
          body: "The GT3 RS inherits technology directly from Porsche's motorsport programs. The 4.0-liter naturally aspirated engine revs to 9,000 RPM, producing a spine-tingling soundtrack. The magnesium wheels, carbon fiber body panels, and rear-axle steering create a car that feels alive.",
        },
        {
          heading: "Aerodynamic Excellence",
          body: "The massive swan-neck rear wing, central radiator intake, and active aerodynamic elements generate significant downforce. The result is a car that sticks to the road with tenacious grip while remaining surprisingly comfortable for road use.",
        },
        {
          heading: "Ownership Benefits",
          body: "At \u20B925 Lakhs per token, the GT3 RS offers accessible supercar ownership. Porsche's legendary reliability means lower running costs, and the model's strong residual values make this both an emotional and financial investment. 5 tokens are currently available.",
        },
      ],
    },
    {
      slug: "land-rover-defender",
      title: "Land Rover Defender",
      type: "LUXURY SUV",
      image: "/images/land-rover-defender.jpg",
      price: 15000000,
      tokenPrice: 1500000,
      tokensLeft: 2,
      totalTokens: 10,
      specs: "OFF-ROAD CAPABLE | 5 SEATER",
      tags: ["ADVENTURE", "FAMILY"],
      eyebrow: "British Off-Road Legend",
      intro: "The Land Rover Defender combines unstoppable off-road capability with refined luxury. This modern interpretation of an iconic design brings 21st-century technology to the most capable 4x4 platform ever built, making it perfect for family adventures across India's diverse terrain.",
      sections: [
        {
          heading: "Unstoppable Capability",
          body: "The Defender's terrain response system, wade sensing technology, and all-terrain progress control allow it to conquer any surface. With 900mm wading depth and configurable terrain modes, it transforms challenging Indian landscapes into comfortable journeys.",
        },
        {
          heading: "Luxury Interior",
          body: "Inside, the Defender offers premium materials, configurable 5+2 seating, and the latest Pivi Pro infotainment system. The panoramic roof, Meridian sound system, and configurable ambient lighting create a refined environment for every journey.",
        },
        {
          heading: "Adventure Awaits",
          body: "At just \u20B915 Lakhs per token, the Defender is our most accessible offering. With only 2 tokens remaining, this versatile SUV is perfect for families who want luxury combined with genuine adventure capability. Includes comprehensive off-road insurance.",
        },
      ],
    },
    {
      slug: "mercedes-amg-project-one",
      title: "Mercedes-AMG Project One",
      type: "HYPER CAR",
      image: "/images/mercedes-project-one.jpg",
      price: 17000000,
      tokenPrice: 1700000,
      tokensLeft: 7,
      totalTokens: 10,
      specs: "1.6L TWIN TURBO V6 | 1100 HP",
      tags: ["TECH", "F1 DERIVED"],
      eyebrow: "Formula 1 for the Road",
      intro: "The Mercedes-AMG Project One brings genuine Formula 1 hybrid technology to the road. With a powertrain derived directly from Mercedes' championship-winning F1 car, this is the closest experience to driving a Grand Prix racer on public roads.",
      sections: [
        {
          heading: "F1 Powertrain",
          body: "The Project One uses the same 1.6-liter turbocharged V6 and hybrid system from Lewis Hamilton's championship car. Four electric motors — one per front wheel, one on the turbo, one on the crankshaft — deliver instantaneous torque and a combined output exceeding 1000 horsepower.",
        },
        {
          heading: "Aerodynamic Innovation",
          body: "Active aero elements, including extendable rear wing and adjustable front flaps, adapt to driving conditions. The roof-mounted air intake and shark fin echo F1 design language while feeding the power unit with critical cooling air.",
        },
        {
          heading: "Exclusive Opportunity",
          body: "With 7 tokens available at \u20B917 Lakhs each, the Project One offers a rare entry point into F1-derived hypercar ownership. Limited to just 275 units worldwide, this represents a significant collector's opportunity with strong appreciation potential.",
        },
      ],
    },
    {
      slug: "lamborghini-aventador-svj",
      title: "Lamborghini Aventador SVJ",
      type: "SUPERCAR",
      image: "/images/lamborghini-aventador-svj.jpg",
      price: 45000000,
      tokenPrice: 4500000,
      tokensLeft: 1,
      totalTokens: 10,
      specs: "NA V12 ENGINE | 800 HP",
      tags: ["EXOTIC", "TRACK"],
      eyebrow: "Italian Supercar Icon",
      intro: "The Lamborghini Aventador SVJ is the ultimate iteration of the iconic V12 supercar. With its naturally aspirated 6.5-liter V12 screaming to 8,700 RPM, the SVJ delivers an emotional and sensory driving experience that turbocharged rivals simply cannot match.",
      sections: [
        {
          heading: "V12 Masterpiece",
          body: "The SVJ's 6.5-liter naturally aspirated V12 produces 770 horsepower without turbochargers — just pure, linear power delivery. The ISR single-clutch transmission delivers brutal shifts that add to the drama. The sound at full throttle is nothing short of operatic.",
        },
        {
          heading: "ALA Aerodynamics",
          body: "Lamborghini's innovative Aerodinamica Lamborghini Attiva (ALA) system uses active flaps and channels to dynamically manage downforce. The system can direct airflow differently to each rear wheel, effectively creating aerodynamic torque vectoring.",
        },
        {
          heading: "Rare Investment",
          body: "At \u20B945 Lakhs per token, the SVJ is our flagship offering. With only 1 token remaining, this is an exclusive chance to own a share of the most iconic V12 supercar of its generation. Limited production ensures strong collector value.",
        },
      ],
    },
    {
      slug: "audi-r8",
      title: "Audi R8 V10 Performance",
      type: "SPORT CAR",
      image: "/images/audi-r8.jpg",
      price: 21000000,
      tokenPrice: 2100000,
      tokensLeft: 6,
      totalTokens: 10,
      specs: "4.0L TWIN TURBO V8 | 650 HP",
      tags: ["EXOTIC", "SPEED"],
      eyebrow: "German Everyday Supercar",
      intro: "The Audi R8 V10 Performance proves that a supercar can be both thrilling and usable every day. Sharing its naturally aspirated V10 with the Lamborghini Huracán, the R8 wraps Italian excitement in German precision and daily drivability.",
      sections: [
        {
          heading: "V10 Symphony",
          body: "The 5.2-liter naturally aspirated V10 produces 620 horsepower and revs to 8,700 RPM. Quattro all-wheel drive puts power down with devastating effectiveness. The dual-clutch transmission delivers rapid-fire shifts that keep the engine in its power band.",
        },
        {
          heading: "Accessible Performance",
          body: "Unlike many supercars, the R8 is genuinely usable daily. The magnetic ride suspension adapts to road conditions, the virtual cockpit keeps essential information in view, and the surprisingly practical front trunk accommodates weekend luggage.",
        },
        {
          heading: "Smart Value",
          body: "At \u20B921 Lakhs per token with 6 tokens available, the R8 represents excellent value in our fleet. Its combination of exotic performance and everyday usability makes it one of our most popular choices. Strong Audi reliability reduces ownership concerns.",
        },
      ],
    },
  ],
}

// ─── Pavilions ───
export const pavilionsConfig: PavilionsConfig = {
  sectionLabel: "Experience",
  videos: [
    {
      src: "/videos/cinematic-fleet.mp4",
      caption: "The LuxShare fleet in motion — experience the drive",
    },
  ],
}

// ─── Footer ───
export const footerConfig: FooterConfig = {
  visitLabel: "Contact",
  visitLines: [
    "East Point College of Engineering",
    "Bengaluru, Karnataka",
    "India",
    "+91 94825 49114",
  ],
  connectLabel: "Connect",
  connectLinks: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Newsletter", href: "#" },
  ],
  brandName: "LuxShare",
  rightsText: "\u00A9 2025 LuxShare India Pvt Ltd. All rights reserved.",
  coordinatesText: "12.9716° N, 77.5946° E",
}
