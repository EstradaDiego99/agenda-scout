const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://agenda-scout.herokuapp.com/api"
    : "http://localhost:5000/api";

export { backendURL };
