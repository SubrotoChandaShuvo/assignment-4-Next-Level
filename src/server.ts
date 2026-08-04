import app from "./app";

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// if (config.NODE_ENV !== "production") {
//   app.listen(3000, () => {
//     console.log("server is running on http://localhost:3000");
//   });
// }