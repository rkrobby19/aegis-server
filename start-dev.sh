 #!/bin/sh

set -e

echo "run db migration"

npx sequelize-cli db:migrate --env stage   
NODE_ENV=stage npx nodemon src --exec babel-node

exec "$@"
