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
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  Alert,
  Stack,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Button } from "@/components/ui/button";
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
    <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 696 316"
        fill="none"
      >
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
    </Box>
  );
}

const ContactSection = () => {
  const theme = useTheme();
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
    <Box
      component="section"
      id="contact"
      sx={{
        position: "relative",
        bgcolor: "background.default",
        overflow: "hidden",
        py: {
          xs: theme.custom.sectionSpacing.mobile,
          md: theme.custom.sectionSpacing.desktop,
        },
      }}
    >
      {/* Background gradient blobs */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: 0.3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: -160,
            width: 384,
            height: 384,
            bgcolor: "primary.main",
            borderRadius: "50%",
            filter: "blur(48px)",
            opacity: 0.2,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 160,
            right: 0,
            width: 320,
            height: 320,
            bgcolor: "secondary.main",
            borderRadius: "50%",
            filter: "blur(48px)",
            opacity: 0.2,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 80,
            width: 288,
            height: 288,
            bgcolor: "secondary.light",
            borderRadius: "50%",
            filter: "blur(48px)",
            opacity: 0.2,
          }}
        />
      </Box>

      {/* Animated background paths */}
      <Box sx={{ position: "absolute", inset: 0 }}>
        <ContactFloatingPaths position={1} />
        <ContactFloatingPaths position={-1} />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: "center",
              mb: theme.spacing(5),
              color: "text.primary",
            }}
          >
            Get In Touch
          </Typography>
        </motion.div>

        <Paper
          elevation={6}
          sx={{
            maxWidth: { xs: "100%", md: 1024 },
            mx: "auto",
            backdropFilter: "blur(16px)",
            bgcolor: "background.paper",
            borderRadius: theme.custom.borderRadius.large,
            p: {
              xs: theme.spacing(2),
              sm: theme.spacing(3),
              md: theme.custom.cardSpacing.padding,
            },
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Grid
            container
            spacing={{ xs: theme.spacing(3), md: theme.spacing(4) }}
          >
            {/* Contact Info */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    mb: theme.spacing(3),
                    color: "text.primary",
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  }}
                >
                  Contact Information
                </Typography>

                <Stack spacing={theme.spacing(3)}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: { xs: theme.spacing(1.5), sm: theme.spacing(2) },
                    }}
                  >
                    <Avatar
                      sx={{
                        background: theme.custom.gradients.primary,
                        color: "white",
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                      }}
                    >
                      <Mail size={20} />
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          fontSize: { xs: "1rem", sm: "1.125rem" },
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        component="a"
                        href={`mailto:${bio.email}`}
                        sx={{
                          color: "text.secondary",
                          textDecoration: "none",
                          wordBreak: "break-word",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          "&:hover": {
                            color: "primary.main",
                            textDecoration: "underline",
                          },
                          transition: `color ${theme.custom.transitions.normal} ease`,
                        }}
                      >
                        {bio.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: { xs: theme.spacing(1.5), sm: theme.spacing(2) },
                    }}
                  >
                    <Avatar
                      sx={{
                        background: theme.custom.gradients.secondary,
                        color: "white",
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                      }}
                    >
                      <MapPin size={20} />
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          fontSize: { xs: "1rem", sm: "1.125rem" },
                        }}
                      >
                        Location
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        {bio.location}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                <Paper
                  variant="outlined"
                  sx={{
                    mt: theme.spacing(3),
                    p: { xs: theme.spacing(1.5), sm: theme.spacing(2) },
                    bgcolor: "background.paper",
                    borderColor: "divider",
                    borderRadius: theme.custom.borderRadius.medium,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontStyle: "italic",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    I'm always open to discussing product design work or
                    partnership opportunities.
                  </Typography>
                </Paper>

                {/* Fallback Email Option */}
                {(status === "failed" || showFallback) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Alert
                      severity="warning"
                      sx={{ mt: theme.spacing(2) }}
                      action={
                        <Button size="sm" variant="outline" asChild>
                          <a href={generateMailtoLink()}>
                            <ExternalLink size={16} className="mr-2" />
                            Open Email Client
                          </a>
                        </Button>
                      }
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 500, mb: 1 }}
                      >
                        Alternative Contact Method
                      </Typography>
                      <Typography variant="body2">
                        The contact form is temporarily unavailable. You can
                        email me directly.
                      </Typography>
                    </Alert>
                  </motion.div>
                )}
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Stack
                    spacing={{ xs: theme.spacing(2.5), sm: theme.spacing(3) }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Your Name"
                      {...register("name")}
                      disabled={isSubmitting}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.paper",
                          borderRadius: theme.custom.borderRadius.medium,
                          "& fieldset": {
                            borderColor: "divider",
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "1px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "2px",
                            boxShadow: `0 0 0 1px ${theme.palette.primary.main}20`,
                          },
                          "&.Mui-error fieldset": {
                            borderColor: "error.main",
                          },
                          "&.Mui-disabled": {
                            backgroundColor: "action.disabledBackground",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: { xs: "12px 14px", sm: "16px 14px" },
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                          fontSize: "0.75rem",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      type="email"
                      placeholder="Your Email"
                      {...register("email")}
                      disabled={isSubmitting}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.paper",
                          borderRadius: theme.custom.borderRadius.medium,
                          "& fieldset": {
                            borderColor: "divider",
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "1px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "2px",
                            boxShadow: `0 0 0 1px ${theme.palette.primary.main}20`,
                          },
                          "&.Mui-error fieldset": {
                            borderColor: "error.main",
                          },
                          "&.Mui-disabled": {
                            backgroundColor: "action.disabledBackground",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: { xs: "12px 14px", sm: "16px 14px" },
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                          fontSize: "0.75rem",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      multiline
                      rows={{ xs: 4, sm: 5 }}
                      placeholder="Your Message"
                      {...register("message")}
                      disabled={isSubmitting}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "background.paper",
                          borderRadius: theme.custom.borderRadius.medium,
                          "& fieldset": {
                            borderColor: "divider",
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "1px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "2px",
                            boxShadow: `0 0 0 1px ${theme.palette.primary.main}20`,
                          },
                          "&.Mui-error fieldset": {
                            borderColor: "error.main",
                          },
                          "&.Mui-disabled": {
                            backgroundColor: "action.disabledBackground",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: { xs: "12px 14px", sm: "16px 14px" },
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                          fontSize: "0.75rem",
                        },
                      }}
                    />

                    <LoadingButton
                      type="submit"
                      fullWidth
                      size="large"
                      loading={isSubmitting}
                      loadingPosition="start"
                      startIcon={
                        isSubmitting ? (
                          <Loader2 size={18} />
                        ) : (
                          <Send size={18} />
                        )
                      }
                      sx={{
                        height: { xs: 44, sm: 48 },
                        background: theme.custom.gradients.primary,
                        color: "white",
                        fontWeight: 600,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        borderRadius: theme.custom.borderRadius.medium,
                        boxShadow: theme.custom.shadows.button,
                        transition: `all ${theme.custom.transitions.normal} ease`,
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)"
                              : "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                          boxShadow: theme.custom.shadows.cardHover,
                          transform: "translateY(-1px)",
                        },
                        "&:focus": {
                          outline: `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: "2px",
                        },
                        "&.Mui-disabled": {
                          background: theme.palette.action.disabledBackground,
                          color: theme.palette.action.disabled,
                        },
                        // Ensure text is always visible
                        "& .MuiLoadingButton-label": {
                          color: "inherit",
                        },
                        "& .MuiButton-startIcon": {
                          color: "inherit",
                        },
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </LoadingButton>
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactSection;
