import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';

export default (app, docPath): void => {
    return app.use(docPath, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
