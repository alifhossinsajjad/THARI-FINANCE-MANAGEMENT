pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "softvence/saif-syn-frontlab"
        DOCKER_TAG = "latest"
        CONTAINER_NAME = "saif-syn-frontlab"
        SSH_HOST = "82.25.105.82"
    }

    stages {

        stage('Checkout Code') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image..."

                    # Build image with latest tag
                    docker build \
                        -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                        -t ${DOCKER_IMAGE}:latest \
                        .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                        echo "Logging into DockerHub..."

                        echo $DOCKER_PASS | docker login \
                            -u $DOCKER_USER \
                            --password-stdin

                        echo "Pushing images..."
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }

        // stage('Deploy via SSH (Password)') {
        //     steps {
        //         withCredentials([usernamePassword(
        //             credentialsId: 'server-ssh-password',
        //             usernameVariable: 'SSH_USER',
        //             passwordVariable: 'SSH_PASS'
        //         )]) {

        //             sh '''
        //                 echo "Installing sshpass if not exists..."
        //                 which sshpass || (sudo apt-get update && sudo apt-get install -y sshpass)

        //                 echo "Starting deployment via password SSH..."

        //                 sshpass -p "$SSH_PASS" ssh \
        //                     -o StrictHostKeyChecking=no \
        //                     ${SSH_USER}@${SSH_HOST} << EOF

        //                     echo "Pulling latest image..."
        //                     docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}

        //                     echo "Stopping old container..."
        //                     docker stop ${CONTAINER_NAME} || true
        //                     docker rm ${CONTAINER_NAME} || true

        //                     echo "Starting new container..."
        //                     docker run -d \
        //                         --name ${CONTAINER_NAME} \
        //                         -p 3000:3000 \
        //                         -e NODE_ENV=production \
        //                         -e NEXT_TELEMETRY_DISABLED=1 \
        //                         -e NEXT_PUBLIC_API_BASE_URL=http://46.224.80.189:4000/api \
        //                         ${DOCKER_IMAGE}:${DOCKER_TAG}

        //                     echo "Cleaning unused images..."
        //                     docker image prune -f

        //                     echo "🚀 Deployment completed successfully"
        //                 EOF
        //             '''
        //         }
        //     }
        // }
    }

    post {
        always {
            echo "Pipeline execution finished."
        }
        success {
            echo "Deployment successful 🚀"
        }
        failure {
            echo "Pipeline failed ❌"
        }
    }
}
