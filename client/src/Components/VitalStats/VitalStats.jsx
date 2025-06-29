import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const VitalStats = ({ patients }) => {
  // مثال: نحسب متوسط القيم (لو عندنا قيم مسجلة على patients)
  const averageBP = patients.length
    ? Math.round(patients.reduce((sum, p) => sum + (p.bp || 0), 0) / patients.length)
    : 0;

  const averageSugar = patients.length
    ? Math.round(patients.reduce((sum, p) => sum + (p.sugar || 0), 0) / patients.length)
    : 0;

  const averageTemp = patients.length
    ? (patients.reduce((sum, p) => sum + (p.temperature || 0), 0) / patients.length).toFixed(1)
    : 0;

  const stats = [
    { label: "לחץ דם ממוצע", value: averageBP, unit: "mmHg" },
    { label: "סוכר ממוצע", value: averageSugar, unit: "mg/dL" },
    { label: "חום גוף ממוצע", value: averageTemp, unit: "°C" },
  ];

  return (
    <Box mt={3}>
      <Typography variant="h6" textAlign="right">
        📊 מדדים חיוניים
      </Typography>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary" textAlign="center">
                  {stat.label}
                </Typography>
                <Typography variant="h3" fontWeight="bold" color="primary" textAlign="center">
                  {stat.value}
                </Typography>
                <Typography variant="subtitle2" textAlign="center">
                  {stat.unit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VitalStats;
