import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, Package, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

type PricingTier = { label: string; price: string };
type PackageInfo = {
  name: string;
  category: "car" | "house";
  tagline: string;
  tiers: PricingTier[];
  description: string[];
  duration: string;
  weBring: string[];
  youNeed: string[];
  note?: string;
};

const packages: PackageInfo[] = [
  {
    name: "Car — WASH Type 1",
    category: "car",
    tagline: "Complete Interior & Exterior Clean",
    tiers: [
      { label: "Small", price: "R180" },
      { label: "Medium", price: "R190" },
      { label: "Large", price: "R200" },
    ],
    description: [
      "Exterior clean with Ph Neutral foam & pressure washer. Wash, Dry & Tyres dressed.",
      "Interior vacuum of carpets & mats. Wipe all seats & interior panels. Air freshener on carpets.",
    ],
    duration: "1 Hour per vehicle",
    weBring: ["Water", "Power", "Equipment"],
    youNeed: ["Your Vehicle", "A space to clean"],
  },
  {
    name: "Car — WASH Type 2",
    category: "car",
    tagline: "Complete Interior & Exterior Clean + Polish",
    tiers: [
      { label: "Small", price: "R300" },
      { label: "Medium", price: "R310" },
      { label: "Large", price: "R320" },
    ],
    description: [
      "Exterior clean with Ph Neutral foam & pressure washer. Wash, Dry & Tyres dressed. Choice of Autoglym hand polish OR Ceramic liquid spray wax.",
      "Interior vacuum of carpets & mats. Wipe all seats & interior panels. Air freshener on carpets. Wipe down of cloth seats OR leather cream application.",
    ],
    duration: "1.5 Hours per vehicle",
    weBring: ["Water", "Power", "Equipment"],
    youNeed: ["Your Vehicle", "A space to clean"],
  },
  {
    name: "Car — VALET Type 1",
    category: "car",
    tagline: "Complete Interior & Exterior Deep Clean",
    tiers: [
      { label: "Small", price: "R900" },
      { label: "Medium", price: "R950" },
      { label: "Large", price: "R1000" },
    ],
    description: [
      "Exterior clean with Ph Neutral foam & pressure washer. Wash, Dry & Tyres dressed. Choice of Autoglym hand polish OR Ceramic liquid spray wax. Engine Steam Clean.",
      "Interior deep clean of carpets, mats, hood lining & interior panels. Steam clean vents, dash and door wells. Hanging air freshener. Leather cream if applicable.",
    ],
    duration: "5.5 Hours per vehicle",
    weBring: ["Water", "Power for selected equipment", "Equipment"],
    youNeed: ["Your Vehicle", "A space to clean", "Power point"],
  },
  {
    name: "Car — VALET Type 2",
    category: "car",
    tagline: "Complete Interior & Exterior Deep Clean + Machine Polish",
    tiers: [
      { label: "Small", price: "R1800" },
      { label: "Medium", price: "R1850" },
      { label: "Large", price: "R1900" },
    ],
    description: [
      "Exterior clean with Ph Neutral foam & pressure washer. Wash, Dry & Tyres dressed. 3 Stage Machine Polish: Cut, Polish & Seal. Overall paint enhancement, removal of minor scratches. Engine Steam Clean.",
      "Interior deep clean of carpets, mats, hood lining & interior panels. Steam clean vents, dash and door wells. Hanging air freshener. Leather cream if applicable.",
    ],
    duration: "7 Hours per vehicle",
    weBring: ["Water", "Power for selected equipment", "Equipment"],
    youNeed: ["Your Vehicle", "A space to clean", "Power point"],
  },
  {
    name: "House — BEDS",
    category: "house",
    tagline: "Spray Extraction Upholstery Clean",
    tiers: [
      { label: "Single", price: "R250" },
      { label: "Double", price: "R350" },
      { label: "King", price: "R450" },
    ],
    description: [
      "Karcher Machine. Cloth Material. Simultaneous spray and extraction of upholstery cleaner. Steam if necessary.",
      "Gentle cleaning, improves hygiene, free from bleaching agents.",
    ],
    duration: "1–2 Hours per set",
    weBring: ["Water", "Power for selected equipment", "Equipment"],
    youNeed: ["Your Bed", "A space to clean and dry", "Power point"],
  },
  {
    name: "House — COUCHES",
    category: "house",
    tagline: "Spray Extraction Upholstery Clean",
    tiers: [
      { label: "Small (1–2 Seater)", price: "R350" },
      { label: "Medium (3–4 Seater)", price: "R450" },
      { label: "Large (5–6 Seater)", price: "R550" },
    ],
    description: [
      "Karcher Machine. Cloth Material. Surcharge applies for Extra Large. Simultaneous spray and extraction of upholstery cleaner. Steam if necessary.",
      "Gentle cleaning, improves hygiene, free from bleaching agents.",
    ],
    duration: "1–2 Hours per set",
    weBring: ["Water", "Power for selected equipment", "Equipment"],
    youNeed: ["Your Couch", "A space to clean and dry", "Power point"],
  },
  {
    name: "House — CARPETS",
    category: "house",
    tagline: "Spray Extraction Upholstery Clean",
    tiers: [
      { label: "Small Rug (1–3 sqm)", price: "R250" },
      { label: "Medium Rug (3–6 sqm)", price: "R300" },
      { label: "Large Rug (6–10 sqm)", price: "R350" },
    ],
    description: [
      "Karcher Machine. Simultaneous spray and extraction of upholstery cleaner. Steam if necessary.",
      "Gentle cleaning, improves hygiene, free from bleaching agents.",
    ],
    duration: "1–2 Hours per carpet",
    weBring: ["Water", "Power for selected equipment", "Equipment"],
    youNeed: ["Your Carpet", "A space to clean and dry", "Power point"],
  },
  {
    name: "House — CHAIRS",
    category: "house",
    tagline: "R60 Per Chair",
    tiers: [{ label: "Per Chair", price: "R60" }],
    description: [
      "Karcher Machine. Cloth Material. Dining Chairs. Simultaneous spray and extraction of upholstery cleaner. Steam if necessary.",
      "Gentle cleaning, improves hygiene, free from bleaching agents.",
    ],
    duration: "1–2 Hours per set",
    weBring: ["Water", "Power for selected equipment", "Equipment"],
    youNeed: ["Your Chairs", "A space to clean and dry", "Power point"],
  },
];

const extras = [
  { name: "Clay Bar", price: "R450" },
  { name: "Windscreen Chips", price: "R250" },
  { name: "Headlight Restoration", price: "R350" },
  { name: "Deployable Wash Bay", price: "R150 (TBC)" },
  { name: "Nasiol 5 Year Ceramic", price: "R4000 (TBC)" },
];

function PackageCard({ pkg }: { pkg: PackageInfo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-lg text-foreground">{pkg.name}</h3>
            <p className="text-sm text-muted-foreground">{pkg.tagline}</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full shrink-0">
            <Clock className="w-3 h-3" />
            {pkg.duration}
          </span>
        </div>

        {/* Pricing tiers */}
        <div className="mt-4 flex flex-wrap gap-2">
          {pkg.tiers.map((tier) => (
            <div key={tier.label} className="flex-1 min-w-[100px] bg-secondary rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">{tier.label}</p>
              <p className="font-display font-extrabold text-xl text-primary">{tier.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
      >
        <span>{expanded ? "Hide details" : "View details"}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">
              {/* Description */}
              <div className="space-y-2">
                {pkg.description.map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* We bring */}
                <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-foreground">What we bring</p>
                  {pkg.weBring.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                {/* You need */}
                <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-foreground">What you need</p>
                  {pkg.youNeed.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book CTA */}
      <div className="px-6 pb-6">
        <Button asChild className="w-full rounded-full font-bold">
          <Link href="/book">Book This Package</Link>
        </Button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"car" | "house">("car");

  const filtered = packages.filter((p) => p.category === activeTab);

  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-32 pb-16 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-sm font-bold tracking-widest text-primary uppercase"
          >
            Transparent Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold"
          >
            Price List
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            No hidden fees. Choose the package that suits you and book online.
          </motion.p>
          {/* Payment notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          >
            <CreditCard className="w-4 h-4 text-primary" />
            Card only — POS machine provided
          </motion.div>
        </div>
      </section>

      {/* Tab switcher */}
      <div className="sticky top-16 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 py-3">
          {(["car", "house"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-primary text-black shadow-sm"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {tab === "car" ? "🚗 Car Packages" : "🏡 House Packages"}
            </button>
          ))}
        </div>
      </div>

      {/* Packages grid */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Booking info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black text-white rounded-3xl p-8 md:p-10 space-y-6"
            >
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-display font-extrabold">How to Book</h2>
              </div>
              <p className="text-gray-300">When booking, please include the following:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Your address",
                  "Location pin drop",
                  "Service required",
                  "Number of vehicles / item size",
                  "Vehicle type: make & model (for car packages)",
                  "Preferred time slots",
                  "Any special requirements",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="rounded-full font-bold flex-1">
                  <Link href="/book">Book Online</Link>
                </Button>
                <a
                  href="https://wa.me/27608408260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b558] text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp: 060 840 8260
                </a>
              </div>
              <p className="text-xs text-gray-500 text-center pt-2">
                ***Right of admission is reserved***
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Extras */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="text-center space-y-2">
              <motion.span variants={fadeUp} className="inline-block text-sm font-bold tracking-widest text-primary uppercase">
                Add-Ons
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                Extras
              </motion.h2>
            </div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {extras.map((extra) => (
                <motion.div
                  key={extra.name}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-border p-5 flex items-center justify-between hover:border-primary hover:shadow-sm transition-all"
                >
                  <span className="font-semibold text-foreground">{extra.name}</span>
                  <span className="font-display font-extrabold text-primary text-lg">{extra.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-black">
            Ready to Get Started?
          </h2>
          <p className="text-black/70 text-lg">Book your preferred package online or reach out directly.</p>
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-black/90 rounded-full px-10 py-6 text-base font-bold"
          >
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
