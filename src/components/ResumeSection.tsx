import React from "react";
import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import {
  Description as FileTextIcon,
  CalendarToday as CalendarIcon,
  Work as BriefcaseIcon,
  School as BookIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`resume-tabpanel-${index}`}
      aria-labelledby={`resume-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: theme.spacing(3) }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `resume-tab-${index}`,
    "aria-controls": `resume-tabpanel-${index}`,
  };
}

const ResumeSection = () => {
  const theme = useTheme();
  const { experience, education } = useData();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Box
      component="section"
      id="resume"
      sx={{
        py: {
          xs: theme.custom.sectionSpacing.mobile,
          md: theme.custom.sectionSpacing.desktop,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 2,
          }}
        >
          Resume
        </Typography>

        <Box
          sx={{
            height: 4,
            width: 80,
            bgcolor: "primary.main",
            mx: "auto",
            borderRadius: theme.custom.borderRadius.small,
            mb: theme.spacing(6),
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: theme.spacing(6),
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<FileTextIcon style={{ fontSize: 18 }} />}
            href="/krishnaMahato.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="resume.pdf"
            sx={{
              borderRadius: theme.custom.borderRadius.medium,
              px: theme.spacing(3),
              py: theme.spacing(1.5),
            }}
          >
            Download Full Resume
          </Button>
        </Box>

        <Box sx={{ maxWidth: 1024, mx: "auto" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              mb: theme.spacing(3),
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="resume tabs"
              centered
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  minHeight: 48,
                },
              }}
            >
              <Tab
                icon={<BriefcaseIcon style={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Experience"
                {...a11yProps(0)}
              />
              <Tab
                icon={<BookIcon style={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Education"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          {/* Experience Tab */}
          <CustomTabPanel value={value} index={0}>
            <Stack spacing={theme.spacing(3)}>
              {experience.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card elevation={2}>
                    <CardContent sx={{ p: theme.custom.cardSpacing.padding }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: theme.spacing(2),
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h4"
                            component="h3"
                            sx={{ mb: 0.5 }}
                          >
                            {exp.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "primary.main", fontWeight: 500 }}
                          >
                            {exp.company}
                          </Typography>
                        </Box>
                        <Chip
                          icon={<CalendarIcon sx={{ fontSize: 14 }} />}
                          label={`${formatDate(exp.startDate)} - ${
                            exp.endDate === "Present"
                              ? exp.endDate
                              : formatDate(exp.endDate)
                          }`}
                          variant="outlined"
                          size="small"
                          sx={{ minWidth: "max-content" }}
                        />
                      </Box>

                      <Typography variant="body1" sx={{ mb: theme.spacing(2) }}>
                        {exp.description}
                      </Typography>

                      <List dense sx={{ mt: 1 }}>
                        {exp.responsibilities.map((item, i) => (
                          <ListItem
                            key={i}
                            sx={{
                              py: 0.5,
                              px: 0,
                              "&::before": {
                                content: '"•"',
                                color: "primary.main",
                                fontWeight: "bold",
                                width: "1em",
                                marginRight: "0.5em",
                              },
                            }}
                          >
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              sx={{ m: 0 }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </CustomTabPanel>

          {/* Education Tab */}
          <CustomTabPanel value={value} index={1}>
            <Stack spacing={theme.spacing(3)}>
              {education.map((edu, index) => (
                <motion.div
                  key={`${edu.institution}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card elevation={2}>
                    <CardContent sx={{ p: theme.custom.cardSpacing.padding }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: theme.spacing(2),
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h4"
                            component="h3"
                            sx={{ mb: 0.5 }}
                          >
                            {edu.degree}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "primary.main", fontWeight: 500 }}
                          >
                            {edu.institution}
                          </Typography>
                        </Box>
                        <Chip
                          icon={<CalendarIcon sx={{ fontSize: 14 }} />}
                          label={`${formatDate(edu.startDate)} - ${formatDate(
                            edu.endDate
                          )}`}
                          variant="outlined"
                          size="small"
                          sx={{ minWidth: "max-content" }}
                        />
                      </Box>

                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {edu.field}
                      </Typography>

                      {edu.description && (
                        <>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {edu.description}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </CustomTabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default ResumeSection;
