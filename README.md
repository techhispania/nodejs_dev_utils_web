# Dev-Utils
Web application developed with NodeJS with the purpose of practice programming with this language.

The application will contains several useful tools for the developers.

### Docker commands:
docker build -t dev-utils .

docker run -d --name dev-utils -p 3000:3000 dev-utils:latest

### Access to the MongoDB:
docker container exec -it mongodb bash

mongosh -u root -p --authenticationDatabase admin

### MongoDB useful queries:
- **Switch to the app db:** use dev-utils
- **Show all collections:** show collections
- **Query "credentials" collection:** db.credentials.find().pretty()

### Create DB Backup:
**Create the backup inside the container:**

docker exec mongodb mongodump \
  --username root \
  --password <DB_PASSWORD> \
  --authenticationDatabase admin \
  --db dev-utils \
  --out /backup

**Copy the backup out of the container:** docker cp mongodb:/backup ./mongo-backup
