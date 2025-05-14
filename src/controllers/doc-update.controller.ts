import { HttpStatusCode } from 'axios';

import { getModelByName } from '../shared/utils';
import { UpdateMethodEnum } from '../common/enum/update.method.enum';

export async function updateDoc(req, res) {
    const nom = req.params.nom;
    const id = parseInt(req.params.id);

    try {
        const modelService = await getModelByName(nom);
        const doc = await modelService.findOneById(id);
        if (!doc) {
            return res
                .status(HttpStatusCode.NotFound)
                .json({ message: 'Élément non trouvé' });
        }
        const updatedDoc = await modelService.update(
            id,
            req.body,
            UpdateMethodEnum.UPDATE
        );
        return res.status(HttpStatusCode.Ok).json({
            succes: true,
            message: 'Element modifié avec succés',
            data: updatedDoc
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatusCode.BadRequest).json({
            message: "Erreur lors de la mise à jour de l'élément",
            err
        });
    }
}
