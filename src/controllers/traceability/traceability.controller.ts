import { HttpStatusCode } from 'axios';

import { flashingStatusConst } from '../../common/consts/flashingStatusConst';
import { LitigationService } from '../../services/litigation.service';
import { PackageService } from '../../services/package.service';
import { TraceabilityService } from '../../services/traceabilty.service';
import { UpdateMethodEnum } from '../../common/enum/update.method.enum';

const pacakgeService = new PackageService();
const tracabilityService = new TraceabilityService();

export async function addTraceability(req, res) {
    try {
        const { packageId, flashingStatusId, step, litigation } = req.body;
        if (!(step >= 1 && step <= 7)) {
            return res.status(HttpStatusCode.NotFound).json({
                error: 'STEP_UNDEFINED',
                message: 'Step non valide',
                success: false
            });
        } else {
            if (!packageId) {
                return res.status(HttpStatusCode.NotFound).json({
                    error: 'PACKAGE_ID_UNDEFINED',
                    message: "Merci d'introduire le package spécifique",
                    success: false
                });
            }
            const existingPackage =
                await pacakgeService.findPackageById(packageId);
            if (!existingPackage) {
                return res.status(HttpStatusCode.NotFound).json({
                    error: 'PACKAGE_NOT_FOUND',
                    message: "Package n'existe pas",
                    success: false
                });
            } else {
                const existingTraceability =
                    await tracabilityService.findTraceability(
                        step,
                        existingPackage._id
                    );
                if (existingTraceability.length) {
                    return res.status(HttpStatusCode.BadRequest).json({
                        error: 'PACKAGE_PASSED_BY_THIS_STEP',
                        message: 'Package deja passe par cette etape',
                        success: false
                    });
                } else {
                    const creationLitige: boolean =
                        flashingStatusConst.includes(flashingStatusId);
                    console.log(
                        '👊 ~ file: traceability.controller.ts:51 ~ addTraceability ~ creationLitige:',
                        creationLitige
                    );

                    let litige;
                    if (creationLitige) {
                        const litigationService = new LitigationService();
                        litige =
                            await litigationService.createLitigation(
                                litigation
                            );
                    }
                    const traceabilityPayload = {
                        ...req.body,
                        litigationId: litige?._id,
                        packageId: existingPackage._id
                    };
                    const createdTraceabilites =
                        await tracabilityService.create(traceabilityPayload);

                    const relatedTraceabilities = [
                        ...existingPackage.traceabilities,
                        createdTraceabilites._id
                    ];
                    await pacakgeService.update(
                        packageId,
                        { traceabilities: relatedTraceabilities },
                        UpdateMethodEnum.UPDATE
                    );

                    return res.status(200).json(createdTraceabilites);
                }
            }
        }
    } catch (error) {
        console.log(
            '👊 ~ file: traceability.controller.ts:83 ~ addTraceability ~ error:',
            error
        );
        const errorMessage = 'An error occurred while processing the request.';
        return res.status(HttpStatusCode.InternalServerError).json({
            error: 'INTERNAL_SERVER_ERROR',
            message: errorMessage,
            success: false
        });
    }
}

export async function GetTraceabilitiesByParam(req, res) {
    const param: string = req.params;
    const traceabilities = await tracabilityService.getTracabilities(param);
    return res.status(HttpStatusCode.Ok).json({ traceabilities });
}
