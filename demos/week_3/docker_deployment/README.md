# Docker Deployment Guide

This guide will go over how to deploy a project to an EC2 instance using Docker and Dockerhub.

1. Launch an EC2 instance
    - Amazon Linux 2023
    - T2-Micro free tier
2. Install Docker either on the EC2 instance
    - We will be using Docker to build an image and to run a container
    - If you want you can build your Docker image locally and push it up to Dockerhub

```bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
# you may need to restart your system for the usermod to activate
# the next command may need sudo if it doesn't work
docker ps
```

3. Build your Docker image
    - Create a project you want to run inside a container, for example a simple Spring Boot Project
        - You will need to have maven installed
```bash
sudo dnf update -y
sudo dnf install maven
mvn -version
```
- Build the project into a jar file
    - `mvn clean package`
- Create a `Dockerfile`

```bash
# Official runtime as base image
FROM amazoncorretto:17

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/<name of jar>.jar app.jar

# Expose the port of your spring boot app
EXPOSE 8080

# Command to run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
```

- Run Docker build
    - `docker build -t spring-boot-app .`
- Verify the image
    - `docker images`

4. Push the image to DockerHub
    - Login to Docker Hub
        - `docker login`
    - Tag the image
        - `docker tag spring-boot-app <dockerhub-username>/spring-boot-app:latest`
    - Push the image
        - `docker push <dockerhub-username>/spring-boot-app:latest`

5. Deploy on EC2
    - Pull the docker image
        - `docker pull <dockerhub-username>/spring-boot-app:latest`
    - Run the container
        - `docker run -d -p 8080:8080 <dockerhub-username>/spring-boot-app:latest`
    - Verify the security groups of the EC2 instance and check that inbound rule to port 8080 is created
    - Verify that the app works on the EC2 endpoint for the spring boot app

6. Managing the container
    - Stop the container
        - `docker stop spring-boot-app`
    - Remove the container
        - `docker rm spring-boot-app`
    - View Logs
        - `docker logs spring-boot-app`