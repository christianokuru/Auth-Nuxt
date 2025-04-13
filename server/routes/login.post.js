import {z} from 'zod'
import {User} from '../models/User.js'
import { setUserSession } from '#auth-utils'


const bodySchema = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"})
})

export default defineEventHandler(async (event) => {

})