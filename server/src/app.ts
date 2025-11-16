import express, { Application } from "express";
import cors from "cors";
import path from "path";
import schedulerRoutes from "./routes/schedulerRoutes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", schedulerRoutes);

// Serve static files from React build (PRODUCTION)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

// Health check
app.get("/", (req, res) => {
  res.json({ message: "CPU Scheduler API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
