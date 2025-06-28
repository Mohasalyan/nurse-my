import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  ArcElement,
} from "chart.js";

import AppointmentTable from "../../Components/appointments/appointments";
import NurseNotes from "../../Components/NurseNotes/NurseNotes";
// import AddPatient from "../../Components/AddPatient/AddPatient"; // Uncomment if you have this component 

// import VitalStats from "../../Components/VitalStats/VitalStats"; // Uncomment if you have this component
ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  ArcElement
);

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [nurseLogs, setNurseLogs] = useState([]);
  const [sugarTracking, setSugarTracking] = useState([]);
  const [bloodTracking, setBloodTracking] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollection = async (name, setter) => {
    const snapshot = await getDocs(collection(db, name));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setter(data);
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
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const stats = [
    { label: "כמות מטופלים נוכחיים", value: patients.length },
    { label: "כמות פגישות קרובות", value: appointments.length },
    { label: "כמות מנות תרופה פעילות", value: medications.length },
    { label: "כמות רישומי אחיות", value: nurseLogs.length },
    { label: "כמות מעקבי סוכר פעילים", value: sugarTracking.length },
    { label: "כמות מעקבי לחץ דם פעילים", value: bloodTracking.length },
  ];

  const lineChartData = {
    labels: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    datasets: [
      {
        label: "כמות בדיקות יומיות",
        data: [5, 7, 3, 4, 6, 8, 5],
        fill: false,
        borderColor: "#3f51b5",
        tension: 0.1,
      },
    ],
  };
  
  const barChartData = {
    labels: ["מטופלים", "פגישות", "תרופות", "רישומים", "סוכר", "לחץ דם"],
    datasets: [
      {
        label: "כמות רישומים",
        data: [
          patients.length,
          appointments.length,
          medications.length,
          nurseLogs.length,
          sugarTracking.length,
          bloodTracking.length,
        ],
        backgroundColor: [
          "#3f51b5",
          "#2196f3",
          "#4caf50",
          "#ff9800",
          "#f44336",
          "#9c27b0",
        ],
      },
    ],
  };
  
  const pieChartData = {
    labels: ["מטופלים", "פגישות", "תרופות", "רישומים", "סוכר", "לחץ דם"],
    datasets: [
      {
        data: [
          patients.length,
          appointments.length,
          medications.length,
          nurseLogs.length,
          sugarTracking.length,
          bloodTracking.length,
        ],
        backgroundColor: [
          "#3f51b5",
          "#2196f3",
          "#4caf50",
          "#ff9800",
          "#f44336",
          "#9c27b0",
        ],
      },
    ],
  };
  
  return (
    <Box p={3}>
      {/* ⚡️ Header */}
      <Box bgcolor="#f9fafb" p={3} borderRadius={3} textAlign="right" boxShadow={1}>
        <Typography variant="h4" fontWeight="bold">לוח הבקרה</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          סקירה מהירה של מצב מטופלים, משימות והתקדמות יומית
        </Typography>
      </Box>

      {/* ⚡️ Stats Cards */}
      <Grid container spacing={2} mt={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ⚡️ Main Sections */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">רשימת מטופלים</Typography>
              <Divider />
              {loading ? (
                <CircularProgress />
              ) : patients.length > 0 ? (
                <List>
                  {patients.map((patient) => (
                    <ListItem key={patient.id}>
                      <ListItemText
                        primary={patient.name}
                        secondary={`גיל: ${patient.age || "לא צוין"}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>אין מטופלים כרגע</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">סטטיסטיקות יומיות (קו)</Typography>
              <Divider />
              <Line data={lineChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ⚡️ Bar & Pie Charts */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">כמות רישומים חודשית (טבלה עמודות)</Typography>
              <Divider />
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">כמות רישומים – התפלגות (פאי)</Typography>
              <Divider />
              <Pie data={pieChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ⚡️ Additional Stats Section */}
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">סיכום יום</Typography>
              <Divider />
              <Stack direction="row" justifyContent="space-around" flexWrap="wrap" spacing={2}>
                <Typography variant="subtitle1">בדיקות שנעשו: 15</Typography>
                <Typography variant="subtitle1">כמות תרופות שחולקו: 30</Typography>
                <Typography variant="subtitle1">כמות פניות בטיפול: 2</Typography>
                <Typography variant="subtitle1">כמות משמרות סיעוד: 3</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ⚡️ مكونات مخصصة */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <AppointmentTable appointments={appointments} />
        </Grid>
        <Grid item xs={12}>
          <NurseNotes nurseLogs={nurseLogs} />
        </Grid>
        <Grid item xs={12}>
          {/* <AddPatient
            patients={patients}
            onPatientAdded={(newPatient) => setPatients((prev) => [...prev, newPatient])}
            onPatientDeleted={(id) => setPatients((prev) => prev.filter((patient) => patient.id !== id))}
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
