import { HttpStatusCode } from 'axios';

import { getModelByName } from '../shared/utils';
import { UpdateMethodEnum } from '../common/enum/update.method.enum';

export async function softDeleteDoc(req, res) {
    const nom = req.params.nom;
    const id = req.params.id;

    try {
        const modelService = await getModelByName(nom);
        const doc = await modelService.findOneById(id);
        if (!doc) {
            return res
                .status(HttpStatusCode.NotFound)
                .json({ message: 'Élément non trouvé' });
        }
        // Réactiver le document en mettant à jour deletedAt à null
        await modelService.update(id, doc, UpdateMethodEnum.SOFT_DELETE);
        return res.status(HttpStatusCode.Ok).json({
            succes: true,
            message: 'Element supprimée temporairement avec succés'
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatusCode.BadRequest).json({
            message: "Erreur lors de la suppression de l'élément"
        });
    }
}
