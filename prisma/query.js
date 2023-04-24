import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//4 functions that send and receive user and item data from the database
export const getItems = async (req, res) => {
    const items = await prisma.item.findMany()
    res.send(items)
}

export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany()
    res.send(users)
}

export const postUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }
    })
    res.send(user)
}
