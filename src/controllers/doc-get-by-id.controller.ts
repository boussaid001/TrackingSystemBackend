import { HttpStatusCode } from 'axios';

import { getModelByName } from '../shared/utils';

export async function getByIdDoc(req, res) {
    const nom = req.params.nom;
    const id = req.params.id;
    try {
        const modelService = await getModelByName(nom);
        return await modelService
            .findOneById(id)
            .then(doc => {
                return res.status(HttpStatusCode.Ok).json(doc);
            })
            .catch(() => {
                return res
                    .status(HttpStatusCode.NotFound)
                    .json({ message: 'Élément non trouvé' });
            });
    } catch (err) {
        console.error(err);
        res.status(HttpStatusCode.BadRequest).json({
            message: 'Erreur !!',
            err
        });
    }
}
