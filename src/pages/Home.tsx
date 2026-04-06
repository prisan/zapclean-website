import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Star, Clock, Zap, ChevronRight, CheckCircle } from "lucide-react";
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
    description: "Deep clean for sofas, chairs, and all fabric furniture.",
    icon: "🛋️",
  },
  {
    title: "Mobile Car Wash",
    description: "Professional vehicle cleaning at your location.",
    icon: "🚗",
  },
  {
    title: "Carpet Cleaning",
    description: "Steam and dry carpet cleaning for spotless results.",
    icon: "🏡",
  },
];

const trustItems = [
  { icon: Shield, label: "Trusted Professionals", desc: "Vetted, insured, and experienced cleaners." },
  { icon: Star, label: "Quality Guaranteed", desc: "We're not satisfied until you are." },
  { icon: Clock, label: "Flexible Scheduling", desc: "Book at a time that suits you." },
  { icon: Zap, label: "Fast Response", desc: "Quick turnaround and reliable service." },
];

export default function Home() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero.jpg`}
            alt="Zap Clean hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Zap Clean Logo"
                className="h-28 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white leading-tight"
            >
              Reliable Mobile Cleaning{" "}
              <span className="text-primary">You Can Trust</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto"
            >
              Zap Clean brings professional cleaning straight to your door. From upholstery to car washes — we've got you covered across Johannesburg and beyond.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8 py-6 rounded-full shadow-lg font-bold">
                <Link href="/book">Book Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold"
              >
                <Link href="/services">View Services <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/70"
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <motion.span variants={fadeUp} className="inline-block text-sm font-bold tracking-widest text-primary uppercase">
              About Zap Clean
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-extrabold text-foreground">
              Cleaning Done Right, Every Time
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
              Zap Clean is a Johannesburg-based mobile cleaning service committed to delivering exceptional results wherever you need us. Our trained professionals use top-quality products and equipment to keep your home, car, and furniture looking their best — all on your schedule.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button asChild className="rounded-full px-6">
                <Link href="/book">Get Started</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="text-center space-y-4">
              <motion.span variants={fadeUp} className="inline-block text-sm font-bold tracking-widest text-primary uppercase">
                What We Offer
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-extrabold text-foreground">
                Our Services
              </motion.h2>
            </div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:border-primary hover:shadow-md transition-all duration-300 group text-center"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <Button asChild variant="outline" className="rounded-full px-6 border-primary text-primary hover:bg-primary hover:text-black">
                <Link href="/services">See All Services <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="text-center space-y-4">
              <motion.span variants={fadeUp} className="inline-block text-sm font-bold tracking-widest text-primary uppercase">
                Why Choose Us
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-extrabold text-foreground">
                The Zap Clean Promise
              </motion.h2>
            </div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {trustItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center gap-4 p-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="inline-block text-sm font-bold tracking-widest text-primary uppercase">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
                Built on Trust, Driven by Quality
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Zap Clean was founded with one goal: to make professional cleaning accessible and convenient for every household and vehicle owner in Johannesburg. We understand the value of your time — which is why we come to you.
              </p>
              <ul className="space-y-3">
                {["Fully insured and vetted professionals", "Eco-friendly cleaning products", "100% satisfaction guarantee", "Flexible same-day and weekend bookings"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-full px-6 font-bold">
                <Link href="/book">Book a Service</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-primary/30">
                <img
                  src={`${import.meta.env.BASE_URL}images/hero.jpg`}
                  alt="Zap Clean team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary rounded-2xl p-6 shadow-xl">
                <p className="font-display font-extrabold text-3xl text-black">500+</p>
                <p className="text-black/80 text-sm font-semibold">Happy Clients</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-black"
          >
            Ready for a Spotless Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black/70 text-lg"
          >
            Book your cleaning service today — we'll be there before you know it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-black/90 rounded-full px-10 py-6 text-base font-bold"
            >
              <Link href="/book">Book Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
