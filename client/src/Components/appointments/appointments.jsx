// AppointmentTable.jsx
import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from "@mui/material";

const AppointmentTable = ({ appointments }) => {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">📅 מועדי פגישות קרובות</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>שם המטופל</TableCell>
            <TableCell>תאריך</TableCell>
            <TableCell>שעה</TableCell>
            <TableCell>סיבה</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.patientName}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>{app.time}</TableCell>
                <TableCell>{app.reason}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>אין פגישות קרובות</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AppointmentTable;
