import { jwtVerify } from 'jose'

export default defineNuxtRouteMiddleware(async () =>{
    const jwt = useCookie('NoteJWT')
    if (import.meta.client) {
        console.log("middleWare fired");
        if (!jwt.value) return navigateTo("/login");

        // 👇 Check JWT expiry on the client
        try {
            const token = jwt.value
            const payload = JSON.parse(atob(token.split('.')[1]))
            const now = Math.floor(Date.now() / 1000)

            if (payload.exp < now) {
            console.warn('JWT expired on client!')
            return navigateTo('/login')
            }
        } catch (e) {
            console.error('Client-side JWT parsing error:', e)
            return navigateTo('/login')
        }

        // No need to run the server-side check on client
        return
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
        return navigateTo('/login')
    }
})