import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useData } from "../contexts/DataContext";
import {
  Email as MailIcon,
  LocationOn as MapPinIcon,
  Send as SendIcon,
  OpenInNew as ExternalLinkIcon,
} from "@mui/icons-material";
import { CircularProgress as Loader2Icon } from "@mui/material";
import {
  Box,
  Container,
  Typography,
  TextField,
  Paper,
  Alert,
  Stack,
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

// Contact Info Item Component
const ContactInfoItem = ({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: { xs: 1.5, sm: 2 },
        flexDirection: { xs: "column", sm: "row" },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <Avatar
        sx={{
          background: theme.custom.gradients.primary,
          color: "white",
          width: { xs: 44, sm: 48, md: 52 },
          height: { xs: 44, sm: 48, md: 52 },
          alignSelf: { xs: "center", sm: "flex-start" },
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1, width: "100%" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        {href ? (
          <Typography
            component="a"
            href={href}
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              wordBreak: "break-word",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              display: "block",
              "&:hover": {
                color: "primary.main",
                textDecoration: "underline",
              },
              transition: `color ${theme.custom.transitions.normal} ease`,
            }}
          >
            {content}
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {content}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// Form Input Component
const FormInput = ({
  type = "text",
  multiline = false,
  rows,
  ...props
}: any) => {
  const theme = useTheme();

  const inputStyles = {
    width: "100%",
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
        borderWidth: "1px",
        boxShadow: `0 0 0 1px ${theme.palette.primary.main}40`,
      },
      "&.Mui-error fieldset": {
        borderColor: "error.main",
      },
      "&.Mui-disabled": {
        backgroundColor: "action.disabledBackground",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: {
        xs: "12px 14px",
        sm: "14px 16px",
        md: "16px 18px",
      },
      fontSize: { xs: "0.875rem", sm: "1rem" },
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      fontSize: "0.75rem",
    },
  };

  if (multiline) {
    inputStyles["& textarea"] = {
      minHeight: {
        xs: "80px !important",
        sm: "100px !important",
        md: "120px !important",
      },
    };
  }

  return (
    <TextField
      fullWidth
      type={type}
      multiline={multiline}
      rows={rows}
      sx={inputStyles}
      {...props}
    />
  );
};

const ContactSection = () => {
  const theme = useTheme();
  const { bio } = useData();
  const { toast } = useToast();

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
      {/* Background Effects */}
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
            maxWidth: { xs: "100%", md: 1200, lg: 1400 },
            mx: "auto",
            backdropFilter: "blur(16px)",
            bgcolor: "background.paper",
            borderRadius: theme.custom.borderRadius.large,
            p: { xs: 2, sm: 3, md: 4, lg: 5 },
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
              gap: { xs: 3, sm: 4, md: 5, lg: 6 },
              alignItems: "stretch",
            }}
          >
            {/* Contact Info */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gridRow: { xs: 2, md: 1 },
                order: { xs: 2, md: 1 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    mb: { xs: 2, sm: 2.5, md: 3 },
                    color: "text.primary",
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                      md: "1.75rem",
                      lg: "2rem",
                    },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Contact Information
                </Typography>

                <Stack spacing={{ xs: 2.5, sm: 3 }} sx={{ flex: 1 }}>
                  <ContactInfoItem
                    icon={<MailIcon />}
                    title="Email"
                    content={bio.email}
                    href={`mailto:${bio.email}`}
                  />

                  <ContactInfoItem
                    icon={<MapPinIcon />}
                    title="Location"
                    content={bio.location}
                  />

                  <Paper
                    variant="outlined"
                    sx={{
                      mt: { xs: 2, sm: 3 },
                      p: { xs: 1.5, sm: 2, md: 2.5 },
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
                        textAlign: { xs: "center", sm: "left" },
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
                        sx={{ mt: 2 }}
                        action={
                          <Button size="sm" variant="outline" asChild>
                            <a href={generateMailtoLink()}>
                              <ExternalLinkIcon
                                className="mr-2"
                                style={{ fontSize: 16 }}
                              />
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
                </Stack>
              </motion.div>
            </Box>

            {/* Contact Form */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gridRow: { xs: 1, md: 1 },
                order: { xs: 1, md: 2 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    mb: { xs: 2, sm: 2.5, md: 3 },
                    color: "text.primary",
                    fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                    textAlign: { xs: "center", md: "left" },
                    display: { xs: "block", md: "none" },
                  }}
                >
                  Send Message
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ flex: 1 }}>
                    <FormInput
                      placeholder="Your Name"
                      {...register("name")}
                      disabled={isSubmitting}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />

                    <FormInput
                      type="email"
                      placeholder="Your Email"
                      {...register("email")}
                      disabled={isSubmitting}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />

                    <FormInput
                      multiline
                      rows={4}
                      placeholder="Your Message"
                      {...register("message")}
                      disabled={isSubmitting}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      sx={{ flex: { md: 1 } }}
                    />

                    <LoadingButton
                      type="submit"
                      fullWidth
                      size="large"
                      loading={isSubmitting}
                      loadingPosition="start"
                      startIcon={
                        isSubmitting ? (
                          <Loader2Icon style={{ fontSize: 18 }} />
                        ) : (
                          <SendIcon style={{ fontSize: 18 }} />
                        )
                      }
                      sx={{
                        height: { xs: 44, sm: 48, md: 52 },
                        background: theme.custom.gradients.primary,
                        color: "white",
                        fontWeight: 600,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        borderRadius: theme.custom.borderRadius.medium,
                        boxShadow: theme.custom.shadows.button,
                        transition: `all ${theme.custom.transitions.normal} ease`,
                        mt: { xs: 1, sm: 1.5, md: "auto" },
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
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </LoadingButton>
                  </Stack>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactSection;
