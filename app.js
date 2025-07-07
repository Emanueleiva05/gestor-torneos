import express from "express"
import gameRoutes from "./src/routes/gameRoutes.js"
import playerRoutes from "./src/routes/playerRoutes.js"
import matchRoutes from "./src/routes/matchRoutes.js"
import tournamentRoutes from "./src/routes/tournamentRoutes.js"

const app = express();
const PORT = 3000;

app.use((req,res,next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
})
app.use(express.json());

app.use("/game", gameRoutes);
app.use("/player", playerRoutes);
app.use("/match", matchRoutes);
app.use("/tournament", tournamentRoutes);



app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`)
})


