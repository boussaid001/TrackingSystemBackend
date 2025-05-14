import express from 'express';

import { createBanchDoc } from '../../controllers/bulk-docs-create.controller';
import { createDoc } from '../../controllers/doc-create.controller';
import { updateDoc } from '../../controllers/doc-update.controller';
import { getByIdDoc } from '../../controllers/doc-get-by-id.controller';
import { softDeleteDoc } from '../../controllers/doc-soft-remove.controllers';
import { reactivateDoc } from '../../controllers/doc-reactive.controller';
import {
    addPackage,
    getPackageByFilter,
    getProductsByIds
} from '../../controllers/package/package.controller';
import {
    downloadPicture,
    uploadPicture
} from '../../controllers/picture/picture.controller';
import {
    GetTraceabilitiesByParam,
    addTraceability
} from '../../controllers/traceability/traceability.controller';
import { GetLineTypeByCode } from '../../controllers/lineType/lineType.controller';

const routes = express.Router();
routes.get('/', (req, res) => {
    console.log(req);
    res.send('succeful');
});

// Generic CRUD
routes.post('/create/:nom', createDoc);
routes.put('/update/:nom/:id', updateDoc);
routes.get('/get/:nom/:id', getByIdDoc);
routes.post('/createBanch/:nom', createBanchDoc);
routes.delete('/delete/:nom/:id', softDeleteDoc);
routes.put('/reactive/:nom/:id', reactivateDoc);

// Packages
routes.post('/package/filter', getPackageByFilter);
routes.post('/addPackage', addPackage);
routes.post('/products/byIds', getProductsByIds);
// Pictures
routes.post('/upload', uploadPicture);
routes.get('/download/:fileName', downloadPicture);

// Traceabilities
routes.post('/addTraceability', addTraceability);
routes.get('/GetTraceabilityByPackage/:packageId', GetTraceabilitiesByParam);
routes.get('/GetTraceabilityByUser/:userId', GetTraceabilitiesByParam);
routes.get(
    '/getTraceabilityByFlashinDate/:flashedAt',
    GetTraceabilitiesByParam
);

// LineType
routes.get('/GetLineTypeByCode/:code', GetLineTypeByCode);

export default routes;
