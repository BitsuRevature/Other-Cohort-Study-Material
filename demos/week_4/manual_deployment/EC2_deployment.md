# Guide to EC2 Deployment

1. Navigate to AWS EC2 and launch an instance
2. Set the AMI to be 'Amazon Linux 2023'
3. Set the instance type to be free tier 'T2-Micro'
4. Create a key-pair login key
    - Save the key somewhere you can remember
5. Create a new security group
6. Launch the instance
7. Connect to the instance using ssh and the key in your terminal
    - Go to the instance and click on the connect button on the top right
    - There will be a guide for SSH
8. After SSHing into the instance, you need to install java, maven, and git

```bash
## Update dnf
sudo dnf update -y

## Install packages
sudo dnf install git -y
sudo dnf install java-17-amazon-corretto-devel -y
sudo dnf install maven -y

## Verify packages are installed
git --version
java -version
maven -version
```

9. Use git to clone a repo. You can use the spring boot demo app
    - `git clone https://github.com/brianAray/spring_demo.git`
10. `cd` into the spring boot app
    - run `mvn clean package`
11. `cd` into the target folder
    - run `java -jar <name of jar file>.jar`
12. Go to the EC2 instance security group
    - Edit the inbound rule to allow traffic to 8080 from anywhere
13. Navigate to the public IP of your EC2 instance on port 8080 to verify the spring boot app is running and accessible