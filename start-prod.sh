 #!/bin/sh

set -e

echo "run db migration"

npx sequelize-cli db:migrate --env production
NODE_ENV=production node ./dist/index.js

exec "$@"
