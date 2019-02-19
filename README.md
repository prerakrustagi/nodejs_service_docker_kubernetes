# nodejs_service_docker_kubernetes

docker build -t nodejs_ms_1 .
docker run -p 5001:5000 nodejs_ms_1

docker ps - To view all the containers
docker stop your-container-id
docker rm your-container-id
docker rmi nodejs_ms_1