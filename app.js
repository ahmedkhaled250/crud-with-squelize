import * as indexRouter from './modules/index.router.js'
import express from 'express'
import { connectDB } from './connictionDB/conniction.js'
import { userModel } from './connictionDB/model/user.js'
import { productModel } from './connictionDB/model/product.js'
const app = express()
const port = 5000
const baseUrl = '/api/v1'


productModel.belongsTo(userModel)
app.use(express.json())
connectDB()
userModel.hasMany(productModel,{
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
})
productModel.belongsTo(userModel)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/product`, indexRouter.productRouter)



app.use("*", (req, res, next) => {
    res.json({
        message: "404 page not found",
        details: "Method or URl are invalid"
    })
})



app.listen(port, () => {
    console.log(`server is running on port ........${port}`);
})