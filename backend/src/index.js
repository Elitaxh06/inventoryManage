import app from "./app.js";
import routes from "./routes/routes.js";
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const port = config.server.port
app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}) 