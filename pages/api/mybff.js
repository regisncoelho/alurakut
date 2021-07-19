import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    const TOKEN = '5318197e5528c61bdff01524e96390';
    const client = new SiteClient(TOKEN);

    if(request.method === 'POST') {
        const registroCriado = await client.items.create({
        ...request.body,
    })

    response.json({
        registroCriado: registroCriado,
    })
    return
    }
    response.status(404).json({
        message: 'This is not the method you are looking for'
    })
}