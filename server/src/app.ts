import express, { Application } from "express";
import cors from "cors";
import schedulerRoutes from "./routes/schedulerRoutes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", schedulerRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "CPU Scheduler API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
