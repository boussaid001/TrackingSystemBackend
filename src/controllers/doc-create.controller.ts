import { HttpStatusCode } from 'axios';

import { getModelByName } from '../shared/utils';

export async function createDoc(req, res) {
    const nom = req.params.nom;
    try {
        const modelService = await getModelByName(nom);
        console.log('🚀 ~ createDoc ~ modelService:', modelService);
        const createdDoc = await modelService.create(req.body);
        return res.status(HttpStatusCode.Created).json(createdDoc);
    } catch (error) {
        return res.status(HttpStatusCode.BadRequest).json({
            succes: false,
            error,
            description: `Erreur lors du creation de ${nom} : ${error}`
        });
    }
}
