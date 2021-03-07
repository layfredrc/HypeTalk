const path = require("path");

/**
 * Dans la phase de développement, l'application Vue s'exécute sur le port 8080 à l'aide d'une CLI Vue 
 * et d'une API nodejs s'exécutant sur le port 3080.
 * Il devrait y avoir une certaine interaction entre ces deux. 
 * Nous pouvons proxy tous les appels d'API vers l'API nodejs. 
 * Vue CLI fournit des fonctionnalités intégrées et pour indiquer au serveur de développement 
 * de transmettre par proxy toutes les demandes inconnues à votre serveur API en développement, 
 * il nous suffit d'ajouter ce fichier à la racine où se trouve package.json et de configurer 
 * les chemins API appropriés.
 */
module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
            },
        }
    }
}