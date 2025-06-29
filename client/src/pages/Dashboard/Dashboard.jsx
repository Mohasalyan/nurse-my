import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  BarController,
} from "chart.js";

import AppointmentTable from "../../Components/AppointmentTable/AppointmentTable";
import NurseNotes from "../../Components/NurseNotes/NurseNotes";
import "./Dashboard.css";

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  BarController
);

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [nurseLogs, setNurseLogs] = useState([]);
  const [sugarTracking, setSugarTracking] = useState([]);
  const [bloodTracking, setBloodTracking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [newPatients, setNewPatients] = useState(0);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const fetchCollection = async (name, setter) => {
    const snapshot = await getDocs(collection(db, name));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setter(data);
  };

  const fetchNewPatientsThisWeek = async () => {
    const q = query(
      collection(db, "patients"),
      where("createdAt", ">=", Timestamp.fromDate(startOfWeek))
    );
    const snapshot = await getDocs(q);
    setNewPatients(snapshot.size);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([
          fetchCollection("patients", setPatients),
          fetchCollection("appointments", setAppointments),
          fetchCollection("medications", setMedications),
          fetchCollection("nurseLogs", setNurseLogs),
          fetchCollection("sugarTracking", setSugarTracking),
          fetchCollection("bloodTracking", setBloodTracking),
          fetchNewPatientsThisWeek(),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const getCriticalCount = () => {
    return (
      sugarTracking.filter((s) => s.level > 180 || s.level < 70).length +
      bloodTracking.filter((b) => b.systolic > 160 || b.systolic < 90).length
    );
  };

  const getMostCriticalPatient = () => {
    const criticalPatients = [...sugarTracking, ...bloodTracking]
      .map((entry) => ({ ...entry, danger: Math.abs((entry.level || entry.systolic) - 120) }))
      .sort((a, b) => b.danger - a.danger);
    return criticalPatients[0]?.name || "לא נמצא";
  };

  const stats = [
    { label: "כמות מטופלים", value: patients.length },
    { label: "מטופלים חדשים השבוע", value: newPatients },
    { label: "פגישות קרובות", value: appointments.length },
    { label: "מנות תרופה", value: medications.length },
    { label: "רישומי אחיות", value: nurseLogs.length },
    { label: "מעקבי סוכר חריגים", value: sugarTracking.filter((s) => s.level > 180 || s.level < 70).length },
    { label: "לחץ דם חריג", value: bloodTracking.filter((b) => b.systolic > 160 || b.systolic < 90).length },
    { label: "סה" + "כ רשומות", value: patients.length + appointments.length + medications.length + nurseLogs.length + sugarTracking.length + bloodTracking.length },
    { label: "המטופל בסיכון הגבוה ביותר", value: getMostCriticalPatient() },
  ];

  const barChartData = {
    labels: ["מטופלים", "פגישות", "תרופות", "אחיות", "סוכר", "לחץ דם"],
    datasets: [
      {
        label: "כמות רשומות",
        data: [
          patients.length,
          appointments.length,
          medications.length,
          nurseLogs.length,
          sugarTracking.length,
          bloodTracking.length,
        ],
        backgroundColor: "#42a5f5",
      },
    ],
  };

  const sugarTrendData = {
    labels: sugarTracking.map((entry, i) => entry.date || `Day ${i + 1}`),
    datasets: [
      {
        label: "רמות סוכר",
        data: sugarTracking.map((entry) => entry.level),
        borderColor: "#ef5350",
        fill: false,
      },
    ],
  };

  const pressureTrendData = {
    labels: bloodTracking.map((entry, i) => entry.date || `Day ${i + 1}`),
    datasets: [
      {
        label: "לחץ דם סיסטולי",
        data: bloodTracking.map((entry) => entry.systolic),
        borderColor: "#66bb6a",
        fill: false,
      },
    ],
  };

  return (
    <Box className="dashboard-container">
      {getCriticalCount() > 0 && (
        <Box className="alert-box">
          <Typography variant="h6" color="error">
            {`🚨 ישנם ${getCriticalCount()} מעקבים עם ערכים חריגים!`}
          </Typography>
        </Box>
      )}

      <Box className="dashboard-header">
        <Typography variant="h4">לוח בקרה</Typography>
        <Typography variant="subtitle1">
          תמונת מצב עדכנית של בדיקות, טיפולים, ורישומים
        </Typography>
      </Box>

      <Grid container spacing={2} mt={2} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="stat-card">
              <CardContent>
                <Typography variant="subtitle2">{stat.label}</Typography>
                <Typography variant="h5">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6">התפלגות נתונים (Pie)</Typography>
              <Divider sx={{ my: 1 }} />
              <Pie data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6">השוואת רשומות (Bar)</Typography>
              <Divider sx={{ my: 1 }} />
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6">מגמת רמות סוכר</Typography>
              <Divider sx={{ my: 1 }} />
              <Line data={sugarTrendData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6">מגמת לחץ דם סיסטולי</Typography>
              <Divider sx={{ my: 1 }} />
              <Line data={pressureTrendData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ mt: 4 }}
      >
        <Tab label="פגישות קרובות" />
        <Tab label="רישומי אחיות" />
      </Tabs>

      <Box hidden={tabIndex !== 0} mt={2}>
        {loading ? <CircularProgress /> : <AppointmentTable appointments={appointments} />}
      </Box>

      <Box hidden={tabIndex !== 1} mt={2}>
        {loading ? <CircularProgress /> : <NurseNotes nurseLogs={nurseLogs} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
