pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    environment {
        DOCKER_IMAGE = 'bayebara01012000/todo-frontend'
        BACKEND_API_URL = '/api/todos'
        VM_HOST = '20.91.231.168'
        VM_USER = 'azureuser'
    }

    stages {
        stage('Build Docker image') {
            steps {
                sh '''
                    docker build \
                        --build-arg VITE_API_URL="$BACKEND_API_URL" \
                        -t "$DOCKER_IMAGE:$BUILD_NUMBER" \
                        -t "$DOCKER_IMAGE:latest" \
                        .
                '''
            }
        }

        stage('Push Docker image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-frontend-credentials',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login \
                            --username "$DOCKERHUB_USERNAME" \
                            --password-stdin
                        docker push "$DOCKER_IMAGE:$BUILD_NUMBER"
                        docker push "$DOCKER_IMAGE:latest"
                    '''
                }
            }
        }

        stage('Deploy to VM') {
            steps {
                sshagent(credentials: ['azure-vm-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no "$VM_USER@$VM_HOST" "
                            set -e
                            docker pull $DOCKER_IMAGE:$BUILD_NUMBER
                            docker rm -f todo-frontend || true
                            docker run -d \
                                --name todo-frontend \
                                --network todo-network \
                                -p 80:80 \
                                $DOCKER_IMAGE:$BUILD_NUMBER
                        "
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
