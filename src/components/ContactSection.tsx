import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useData } from "../contexts/DataContext";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContactFormData } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  sendContactForm,
  resetContactStatus,
} from "../store/slices/contactSlice";

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
  const dispatch = useAppDispatch();
  const { status, error, successMessage } = useAppSelector(
    (state) => state.contact
  );

  const {
    register,
    handleSubmit,
    reset: resetForm,
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
        dispatch(resetContactStatus());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, successMessage, dispatch, resetForm, toast]);

  // Show error toast when submission fails
  useEffect(() => {
    if (status === "failed" && error) {
      toast({
        title: "Something went wrong!",
        description:
          error || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });

      // Reset the status after a delay
      const timer = setTimeout(() => {
        dispatch(resetContactStatus());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, error, dispatch, toast]);

  const onSubmit = async (data: ContactFormData) => {
    console.log(data);
    dispatch(sendContactForm(data));
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
                  }`}
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
                  }`}
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
                  className={`bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 ${
                    errors.message ? "border-red-500" : ""
                  }`}
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
