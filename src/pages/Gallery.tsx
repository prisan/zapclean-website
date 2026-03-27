import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type Category = "All" | "Car Wash" | "Valet" | "House Cleaning" | "Upholstery";

interface GalleryItem {
  id: number;
  src: string;
  category: Exclude<Category, "All">;
  label: string;
}

const items: GalleryItem[] = [
  { id: 1,  src: "https://picsum.photos/seed/carwash1/800/600",   category: "Car Wash",       label: "Exterior rinse & dry" },
  { id: 2,  src: "https://picsum.photos/seed/carwash2/800/600",   category: "Car Wash",       label: "Foam bath detail" },
  { id: 3,  src: "https://picsum.photos/seed/valet1/800/600",     category: "Valet",          label: "Full interior valet" },
  { id: 4,  src: "https://picsum.photos/seed/valet2/800/600",     category: "Valet",          label: "Dashboard & console detail" },
  { id: 5,  src: "https://picsum.photos/seed/house1/800/600",     category: "House Cleaning", label: "Living room deep clean" },
  { id: 6,  src: "https://picsum.photos/seed/house2/800/600",     category: "House Cleaning", label: "Kitchen steam clean" },
  { id: 7,  src: "https://picsum.photos/seed/upholstery1/800/600",category: "Upholstery",     label: "Sofa extraction clean" },
  { id: 8,  src: "https://picsum.photos/seed/upholstery2/800/600",category: "Upholstery",     label: "Chair fabric refresh" },
  { id: 9,  src: "https://picsum.photos/seed/carwash3/800/600",   category: "Car Wash",       label: "Wheel & tyre dressing" },
  { id: 10, src: "https://picsum.photos/seed/valet3/800/600",     category: "Valet",          label: "Leather conditioning" },
  { id: 11, src: "https://picsum.photos/seed/house3/800/600",     category: "House Cleaning", label: "Bedroom full clean" },
  { id: 12, src: "https://picsum.photos/seed/upholstery3/800/600",category: "Upholstery",     label: "Carpet steam extraction" },
];

const categories: Category[] = ["All", "Car Wash", "Valet", "House Cleaning", "Upholstery"];

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const currentIndex = lightbox !== null ? filtered.findIndex((i) => i.id === lightbox) : -1;

  const prev = () => {
    if (currentIndex > 0) setLightbox(filtered[currentIndex - 1].id);
  };
  const next = () => {
    if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1].id);
  };

  const currentItem = lightbox !== null ? filtered[currentIndex] : null;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative bg-black pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(100,100%,40%) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Our Work
          </motion.p>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white leading-tight"
          >
            Before &amp; After Gallery
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            className="mt-4 text-gray-400 max-w-xl mx-auto"
          >
            Real results from real clients across Johannesburg, Sandton, Fourways &amp; Midrand.
          </motion.p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-[76px] z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? "bg-primary text-black"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer shadow-md"
                  onClick={() => openLightbox(item.id)}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <ZoomIn className="text-white" size={28} />
                    <span className="text-white text-sm font-semibold px-3 text-center">{item.label}</span>
                    <span className="text-primary text-xs font-medium px-2 py-0.5 bg-black/40 rounded-full">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No photos in this category yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4">
            Want results like these?
          </h2>
          <p className="text-gray-400 mb-8">Book your clean today and see the Zap Clean difference.</p>
          <a
            href="/book"
            className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-full hover:brightness-110 transition-all"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.src}
                alt={currentItem.label}
                className="w-full rounded-2xl object-cover max-h-[75vh]"
              />
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-white font-semibold">{currentItem.label}</p>
                  <p className="text-primary text-sm">{currentItem.category}</p>
                </div>
                <p className="text-gray-500 text-sm">{currentIndex + 1} / {filtered.length}</p>
              </div>

              {/* Prev */}
              {currentIndex > 0 && (
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-white/10 hover:bg-primary hover:text-black text-white rounded-full p-2 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Next */}
              {currentIndex < filtered.length - 1 && (
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white/10 hover:bg-primary hover:text-black text-white rounded-full p-2 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 bg-black/60 hover:bg-primary hover:text-black text-white rounded-full p-1.5 transition-all"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
