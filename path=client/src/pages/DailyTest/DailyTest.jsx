// Saves the daily test record
await addDoc(collection(db, 'daily_tests'), {
  ...inputs,
  createdAt: Timestamp.now(),
});

// Updates patient information, but only if there's an ID and name
if (inputs.id && patientName) {
  await setDoc(doc(db, "patients", inputs.id), {
    id: inputs.id,
    name: patientName,
    firstName,
    lastName,
    age: inputs.age,
    address: inputs.address
  }, { merge: true });
} 