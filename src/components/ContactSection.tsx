import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useData } from "../contexts/DataContext";
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContactFormData } from "../types";
import apiClient from "../lib/axios";

// Form validation schema
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup
      .string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  })
  .required();

// Custom version of FloatingPaths for the contact form
function ContactFloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.8 + i * 0.05,
    hue: 210 + i * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={`hsl(${path.hue}, 70%, ${position > 0 ? 60 : 50}%)`}
            strokeWidth={path.width}
            strokeOpacity={0.3 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.4, 0.7, 0.4],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const ContactSection = () => {
  const { bio } = useData();
  const { toast } = useToast();

  // Local state to replace Redux
  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  // Reset form when submission succeeds
  useEffect(() => {
    if (status === "succeeded") {
      resetForm();
      toast({
        title: "Message sent!",
        description:
          successMessage ||
          "Thank you for your message. I'll get back to you soon.",
      });

      // Reset the status after a delay
      const timer = setTimeout(() => {
        setStatus("idle");
        setSuccessMessage(null);
        setError(null);
        setShowFallback(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, successMessage, resetForm, toast]);

  // Show error toast when submission fails
  useEffect(() => {
    if (status === "failed" && error) {
      toast({
        title: "Server Error",
        description:
          "The contact form is temporarily unavailable. Please try the email fallback below.",
        variant: "destructive",
      });

      // Show fallback after a delay
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [status, error, toast]);

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setError(null);
    setSuccessMessage(null);
    setShowFallback(false);

    try {
      const response = await apiClient.post("/contact", data);
      setStatus("succeeded");
      setSuccessMessage(response.data.message || "Message sent successfully");
    } catch (error: any) {
      console.error("Contact form error:", error);
      setStatus("failed");

      // Handle validation errors
      if (error.response?.data?.errors) {
        setError(
          error.response.data.errors.map((err: any) => err.msg).join(", ")
        );
      } else if (error.response?.status === 500) {
        setError(
          "Server is temporarily unavailable. Please use the email fallback below."
        );
      } else {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to send message. Please try the email fallback below."
        );
      }
    }
  };

  // Generate mailto link with form data
  const generateMailtoLink = () => {
    const formData = getValues();
    const subject = encodeURIComponent("Contact from Portfolio Website");
    const body = encodeURIComponent(
      `Hi Krishna,\n\nName: ${formData.name || "[Your Name]"}\nEmail: ${
        formData.email || "[Your Email]"
      }\n\nMessage:\n${
        formData.message || "[Your Message]"
      }\n\nBest regards,\n${formData.name || "[Your Name]"}`
    );
    return `mailto:${bio.email}?subject=${subject}&body=${body}`;
  };

  const isSubmitting = status === "loading";

  return (
    <section
      id="contact"
      className="relative bg-slate-50 dark:bg-slate-900 overflow-hidden py-16"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-40">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 right-0 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-400 dark:bg-pink-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Animated background paths */}
      <div className="absolute inset-0">
        <ContactFloatingPaths position={1} />
        <ContactFloatingPaths position={-1} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          className="section-title text-center mb-10 text-4xl font-bold text-slate-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto backdrop-blur-md bg-white/90 dark:bg-slate-800/90 rounded-xl p-8 shadow-xl border border-slate-200/80 dark:border-slate-700/80">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-md">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-200">
                    Email
                  </h4>
                  <a
                    href={`mailto:${bio.email}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {bio.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-md">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-200">
                    Location
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    {bio.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600/50 italic">
                I'm always open to discussing product design work or partnership
                opportunities.
              </p>
            </div>

            {/* Fallback Email Option */}
            {(status === "failed" || showFallback) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-orange-500 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                      Alternative Contact Method
                    </h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                      The contact form is temporarily unavailable. You can email
                      me directly:
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/30"
                      asChild
                    >
                      <a href={generateMailtoLink()}>
                        <ExternalLink size={16} className="mr-2" />
                        Open Email Client
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Input
                  placeholder="Your Name"
                  {...register("name")}
                  disabled={isSubmitting}
                  className={`bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 h-12 ${
                    errors.name ? "border-red-500" : ""
                  } cursor-text`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  disabled={isSubmitting}
                  className={`bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 h-12 ${
                    errors.email ? "border-red-500" : ""
                  } cursor-text`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  {...register("message")}
                  disabled={isSubmitting}
                  className={`bg-white/70 resize-none dark:bg-slate-700/70 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 ${
                    errors.message ? "border-red-500" : ""
                  } cursor-text`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 mt-2 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 border-0 shadow-md hover:shadow-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
