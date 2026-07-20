import dotenv from "dotenv";
import connectDB from '../src/config/db.js'
import app from './app.js';

dotenv.config();

const port = process.env.PORT;

await connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});