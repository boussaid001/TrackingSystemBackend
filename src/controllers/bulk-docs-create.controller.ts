import { HttpStatusCode } from 'axios';

import { getModelByName } from '../shared/utils';

export async function createBanchDoc(req, res) {
    const nom = req.params.nom;
    console.log(nom);
    try {
        const modelService = await getModelByName(nom);
        const body = req.body;
        for (const i of body) {
            await modelService.create(i);
        }
        res.status(HttpStatusCode.Created).json(
            'All Data has been added Successfuly'
        );
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}
