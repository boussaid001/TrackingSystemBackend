import { HttpStatusCode } from 'axios';

import { getModelByName } from '../shared/utils';
import { UpdateMethodEnum } from '../common/enum/update.method.enum';

export async function reactivateDoc(req, res) {
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
        await modelService.update(id, doc, UpdateMethodEnum.RE_ACTIVE);
        res.status(HttpStatusCode.Ok).json({
            message: 'Élément réactivé avec succès'
        });
    } catch (err) {
        console.error(err);
        res.status(HttpStatusCode.BadRequest).json({
            message: "Erreur lors de la réactivation de l'élément"
        });
    }
}
