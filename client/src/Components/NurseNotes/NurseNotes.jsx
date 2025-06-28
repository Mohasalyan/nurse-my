// NurseNotes.jsx
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

const NurseNotes = ({ nurseLogs }) => {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">🩺 ממצאי אחיות יומיים</Typography>
      <Divider />
      <List>
        {nurseLogs.length > 0 ? (
          nurseLogs.map((note) => (
            <ListItem key={note.id}>
              <ListItemText
                primary={note.patientName}
                secondary={note.note}
              />
            </ListItem>
          ))
        ) : (
          <Typography>אין ממצאים יומיים</Typography>
        )}
      </List>
    </Paper>
  );
};

export default NurseNotes;
