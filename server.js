import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import candiesRoutes from "./routes/candiesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(/.*/, cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", candiesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});