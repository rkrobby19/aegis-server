 #!/bin/sh

set -e

echo "run db migration"

npx sequelize-cli db:migrate
npm run dev

exec "$@"
