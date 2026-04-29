import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const services = [
  {
    title: "Upholstery Cleaning",
    description:
      "Breathe new life into your sofas, chairs, and fabric furniture. Our deep-clean process removes dirt, stains, allergens, and odors using professional-grade equipment and safe cleaning solutions.",
    benefits: [
      "Removes deep-seated dirt and stains",
      "Eliminates odors and allergens",
      "Restores fabric texture and color",
      "Safe for all fabric types",
    ],
    image: "upholstery.png",
    icon: "🛋️",
  },
  {
    title: "Mobile Car Wash",
    description:
      "Get your vehicle looking showroom-fresh without leaving home. Our mobile car wash team comes to your driveway, office, or wherever you are — delivering a thorough clean on your schedule.",
    benefits: [
      "Exterior wash and interior vacuum",
      "Window and mirror cleaning",
      "Tire and rim polish",
      "Convenient at-your-location service",
    ],
    image: "car-wash.png",
    icon: "🚗",
  },
  {
    title: "Carpet Cleaning",
    description:
      "Restore your carpets to their original glory with our professional steam and dry cleaning services. We tackle stains, odors, and embedded dirt that regular vacuuming simply can't reach.",
    benefits: [
      "Steam and dry cleaning methods",
      "Removes tough stains and pet odors",
      "Fast drying times",
      "Prolongs carpet lifespan",
    ],
    image: "carpet.png",
    icon: "🏡",
  },
  {
    title: "Mobile Detailing",
    description:
      "A step above a standard wash — our mobile detailing service covers every inch of your vehicle with professional-grade products. From paint decontamination to interior deep cleans, we bring showroom results to your door.",
    benefits: [
      "Clay bar paint decontamination",
      "Premium wax and sealant application",
      "Full interior deep clean",
      "Engine bay cleaning available",
    ],
    image: "car-wash.png",
    icon: "✨",
  },
  {
    title: "Mobile Auto Valets",
    description:
      "Our premium valet service transforms your vehicle inside and out. We travel to you and deliver a thorough, meticulous valet — whether at your home, office, or on the go.",
    benefits: [
      "Full exterior hand wash and dry",
      "Interior vacuum, wipe-down and polish",
      "Glass and mirror clean",
      "Tyre shine and air freshener",
    ],
    image: "car-wash.png",
    icon: "🚘",
  },
];

export default function Services() {
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
            What We Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold"
          >
            Our Cleaning Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Professional, reliable, and tailored to your needs. Serving Johannesburg, Sandton, Fourways, and Midrand.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                variants={fadeUp}
                className={`order-2 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={`${import.meta.env.BASE_URL}images/${service.image}`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className={`order-1 space-y-6 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="inline-flex items-center gap-3 bg-primary/10 rounded-full px-4 py-2">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">Service</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-foreground">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="rounded-full px-6 font-bold">
                  <Link href="/book">Book Now</Link>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-black">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-black/70 text-lg">
            Contact us and we'll help you find the right cleaning solution for your needs.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-black/90 rounded-full px-10 py-6 text-base font-bold"
          >
            <Link href="/book">Book a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
