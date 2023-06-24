import server from "./app";
import sequelize from "./db";
import { Temperament } from "./models/Temperament";
const PORT = 3001;

server.listen(PORT,async () => {
    await sequelize.sync({force: true});
    await Temperament.initializeTemperaments(sequelize)
    console.log("server listening at port 3001")
    })