import { jwtVerify } from 'jose'

export default defineNuxtRouteMiddleware(async (event) =>{
    if (process.client) return
    console.log('middleWare fired')

    const jwt = useCookie('NoteJWT')
    console.log('jwt.value', jwt.value)

    if (!jwt.value) {
        return navigateTo('/register')
    }

    try {
        // Convert secret from string (env) to Uint8Array
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        // Verify the JWT
        const { payload } = await jwtVerify(jwt.value, secret)

        console.log('Payload vérifié:', payload)

        // Optionally attach user info to the request context or useState
        const user = useState('user', () => payload)

    } catch (err) {
        console.error('Vérifcation JWT échouée:', err)
        return navigateTo('/register')
    }

})