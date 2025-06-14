pipeline {
    agent any
    environment {
        DOCKER_BUILDKIT = 1
        DOCKER_HUB_USERNAME = 'legiahoangthien'
        DOCKERHUB_CREDENTIALS = credentials('legiahoangthien-dockerhub')
        SCANNER_HOME = tool 'jenkins-sonar'  
    }
    stages {
        // Stage 1: Clone mã nguồn từ GitHub
        stage('Clone') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/Lghthien/Deploys_Jenkin.git'
                }
            }
        }

        // Stage 2: Phân tích mã nguồn với SonarQube
        stage("Sonarqube Analysis") {
            steps {
                withSonarQubeEnv('sq1') {  // Sử dụng môi trường SonarQube đã cấu hình
                    sh ''' 
                        $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=lethien \
                        -Dsonar.projectKey=lethien \
                        -Dsonar.sources=./client/src,./server/src
                    '''
                }
            }
        }

        // Stage 3: Kiểm tra client (front-end)
        stage('Test Client') {
            steps {
                script {
                    dir('client') {
                        sh 'npm install'  
                        sh 'npm run test -- --passWithNoTests'
                    }
                }
            }
        }

        // Stage 4: Kiểm tra server (back-end)
        stage('Test Server') {
            steps {
                script {
                    dir('server') {
                        sh 'npm install'
                        sh 'chmod +x ./node_modules/.bin/jest' // Cấp quyền thực thi cho jest
                        sh 'npm run test -- --verbose'
                    }
                }
            }
        }

        // Stage 5: Build Docker image cho Server
        stage('Build Server Image') {
            steps {
                script {
                    // Sử dụng --no-cache để luôn build lại image
                    sh 'docker build --no-cache -t $DOCKER_HUB_USERNAME/nestjs-backend:latest ./server'
                }
            }
        }

        // Stage 6: Build Docker image cho Client
        stage('Build Client Image') {
            steps {
                script {
                    // Sử dụng --no-cache để luôn build lại image
                    sh 'docker build --no-cache -t $DOCKER_HUB_USERNAME/react-frontend:latest ./client'
                }
            }
        }

        stage('Scan Server Image with Trivy') {
            steps {
                script {
                    sh 'trivy image --exit-code 1 --no-progress --severity HIGH,CRITICAL $DOCKER_HUB_USERNAME/nestjs-backend:latest'
                }
            }
        }

        stage('Scan Client Image with Trivy') {
            steps {
                script {
                    sh 'trivy image --exit-code 1 --no-progress --severity HIGH,CRITICAL $DOCKER_HUB_USERNAME/react-frontend:latest'
                }
            }
        }


        // Stage 7: Đăng nhập vào Docker Hub
        stage('Login to Docker Hub') {
            steps {
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_USERNAME --password-stdin'
                }
            }
        }

        // Stage 8: Đẩy Docker images lên Docker Hub
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    sh 'docker push $DOCKER_HUB_USERNAME/nestjs-backend:latest'
                    sh 'docker push $DOCKER_HUB_USERNAME/react-frontend:latest'
                }
            }
        }

        // Stage 9: Triển khai với Docker Compose
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Đảm bảo Docker Compose kéo các image mới nhất
                    sh 'docker-compose pull'  // Kéo các image mới nhất từ Docker Hub
                    sh 'docker-compose -f docker-compose.yml up --build -d'  // Build và khởi động lại container
                }
            }
        }
    }

    // Phần post-action sau khi pipeline hoàn thành
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed. Please check the logs for errors.'
        }
    }
}
