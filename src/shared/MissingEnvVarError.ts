export default class MissingEnvVarError extends Error {
    constructor(envVarName: string) {
        super(`Missing ENV Var: ${envVarName}`);
    }
}
