import app from "./app";
import config from "./config";

// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });

if (config.NODE_ENV !== "production") {
  app.listen(3001, () => {
    console.log("server is running on http://localhost:3001");
  });
}

export default app;