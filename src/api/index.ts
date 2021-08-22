import {FerdigClient} from '@ferdig/client-js';

let client: FerdigClient | null = null;

export async function getFerdigClient(): Promise<FerdigClient> {
    if (!client) {
        client = new FerdigClient({
            host: 'http://localhost:8083',
        });
        await client.auth.startSession({protocol: 'anonymous'});
    }

    return client;
}
