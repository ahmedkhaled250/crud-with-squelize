import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('week3db', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})
const connectDB = async () => {
    
    return await sequelize.sync({ alter: true }).then((result) => {
        console.log(`DB Connected `);
        // console.log(result);
    }).catch((err) => {
        console.log(`fail to connect DB ${err}`);
    })
}
export {
    sequelize,
    connectDB
}