import app from './app.js';
import 'dotenv/config'; // Load environment variables

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});