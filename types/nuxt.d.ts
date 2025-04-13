// types/nuxt.d.ts

declare global {
    namespace NodeJS {
        interface Process {
            server: boolean;
            client: boolean;
        }
    }
}

export { };