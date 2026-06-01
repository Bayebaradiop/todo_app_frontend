pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'bayebara01012000/todo-frontend'
        BACKEND_API_URL = 'https://todo-backend-api.purplegrass-93f276e6.swedencentral.azurecontainerapps.io/api/todos'
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
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
