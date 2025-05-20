import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';

/**
 * Setup Swagger UI for API documentation
 * @param app Express application
 * @param docPath Path to serve the docs
 */
export default (app, docPath): void => {
    // Serve the Swagger UI at the specified path
    app.use(
        docPath,
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            explorer: true,
            customCss: '.swagger-ui .topbar { display: none }',
            swaggerOptions: {
                docExpansion: 'list',
                filter: true,
                showRequestDuration: true
            }
        })
    );
};
