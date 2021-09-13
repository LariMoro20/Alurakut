import { SiteClient } from 'datocms-client'
export default async function recebeDados(req, res) {
    const token = '9f6c6a5831a84feb205c2da20bbd1b'

    const client = new SiteClient(token);
    const novoreg = client.items.create({
        itemType: "975850", // model ID
        title: '',
        creatorSlug: '',
        imageUrl: '',
        tagUrl: ''
    });
    res.json({
        dado: 'Reecebido',
        novoreg: novoreg
    })
}