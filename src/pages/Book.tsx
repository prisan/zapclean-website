import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageLayout } from "@/components/layout/PageLayout";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  address: z.string().min(5, "Please enter a valid address"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            Get Started
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold"
          >
            Book a Cleaning Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Fill in the form below and we'll confirm your booking within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Booking Form + Contact Info */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-extrabold text-foreground mb-2">Contact Info</h2>
                <p className="text-muted-foreground">Reach us directly or submit the form and we'll be in touch.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a href="tel:+27111234567" className="text-muted-foreground hover:text-primary transition-colors">
                      060 840 8260
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:zapclean@8conn.co.za" className="text-muted-foreground hover:text-primary transition-colors">
                      zapclean@8conn.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Service Areas</p>
                    <p className="text-muted-foreground">Johannesburg, Sandton, Fourways, Midrand</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-12 shadow-sm border border-border text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-foreground">Booking Received!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you! Your booking request has been received. We'll contact you within 24 hours to confirm your appointment.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-full px-6 border-primary text-primary hover:bg-primary hover:text-black"
                  >
                    Submit Another Booking
                  </Button>
                </motion.div>
              ) : (
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border">
                  <h2 className="text-xl font-display font-bold text-foreground mb-8">Booking Details</h2>

                  {error && (
                    <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Smith"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-destructive text-xs">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+27 82 123 4567"
                          {...register("phone")}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-destructive text-xs">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <Label htmlFor="service">Service *</Label>
                      <select
                        id="service"
                        {...register("service")}
                        className={`w-full h-10 rounded-md border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring ${
                          errors.service ? "border-destructive" : "border-input"
                        }`}
                      >
                        <option value="">Select a service...</option>
                        <option value="Upholstery Cleaning">Upholstery Cleaning</option>
                        <option value="Mobile Car Wash">Mobile Car Wash</option>
                        <option value="Carpet Cleaning">Carpet Cleaning</option>
                        <option value="Mobile Detailing">Mobile Detailing</option>
                        <option value="Mobile Auto Valets">Mobile Auto Valets</option>
                      </select>
                      {errors.service && (
                        <p className="text-destructive text-xs">{errors.service.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date */}
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date *</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          {...register("preferredDate")}
                          min={new Date().toISOString().split("T")[0]}
                          className={errors.preferredDate ? "border-destructive" : ""}
                        />
                        {errors.preferredDate && (
                          <p className="text-destructive text-xs">{errors.preferredDate.message}</p>
                        )}
                      </div>

                      {/* Time */}
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time *</Label>
                        <select
                          id="preferredTime"
                          {...register("preferredTime")}
                          className={`w-full h-10 rounded-md border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring ${
                            errors.preferredTime ? "border-destructive" : "border-input"
                          }`}
                        >
                          <option value="">Select a time slot...</option>
                          <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
                          <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                          <option value="Evening (4pm - 7pm)">Evening (4pm - 7pm)</option>
                        </select>
                        {errors.preferredTime && (
                          <p className="text-destructive text-xs">{errors.preferredTime.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Service Address *</Label>
                      <Input
                        id="address"
                        placeholder="12 Main Street, Sandton, 2196"
                        {...register("address")}
                        className={errors.address ? "border-destructive" : ""}
                      />
                      {errors.address && (
                        <p className="text-destructive text-xs">{errors.address.message}</p>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions, access codes, or additional details..."
                        rows={4}
                        {...register("notes")}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full rounded-full font-bold text-base py-6"
                    >
                      {loading ? "Submitting..." : "Submit Booking Request"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We'll confirm your booking within 24 hours via email or phone.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
