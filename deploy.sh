echo "----Check out develop----"
git checkout develop
echo "----Pull code develop----"
git pull origin develop

docker-compose down
docker-compose build web-admin
docker-compose up -d
