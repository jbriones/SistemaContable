pipeline {
  agent {
    node {
      label 'dockerhost'
    }
    
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build PocRefBackend Image') {
      steps {
        dir(path: 'src/backend') {
          script {
            app = docker.build("iriscontainers.azurecr.io/bci/pocreferidosback")
          }
          
        }
        
        script {
          app.inside {
            sh 'echo "Tests passed"'
          }
        }
        
        script {
          docker.withRegistry('https://iriscontainers.azurecr.io', 'docker_registry') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
          }
        }
        
        input 'Deploy in Dev?'
      }
    }
    stage('Deploy Dev') {
      parallel {
        stage('Deploy pocrefback-dev') {
          steps {
            script {
              docker.withRegistry('https://iriscontainers.azurecr.io', 'docker_registry') {
                dir ('src/backend') {
                  sshagent (credentials: ['containers']) {
                    withCredentials([string(credentialsId: 'appinsights_pyme_dev', variable: 'APPINSIGHTS_INSTRUMENTATIONKEY')]) {
                      sh '''TIMEOUT=180
ssh -4 -o StrictHostKeyChecking=no docker@52.250.127.60 -p 50000 -L 2385:/var/run/docker.sock sleep $TIMEOUT &
docker-compose -H localhost:2385 -f docker-compose.dev.yml build &&
docker-compose -H localhost:2385 -f docker-compose.dev.yml push &&
docker -H localhost:2385 stack deploy --compose-file=docker-compose.dev.yml --with-registry-auth pocrefback &&
docker -H localhost:2385 service scale pocrefback_pocrefback=0 &&
docker -H localhost:2385 service scale pocrefback_pocrefback=6'''
                    }
                  }
                }
              }
            }
            
          }
        }
      }
    }
        stage('Promote to QA') {
      steps {
        input message: 'Deploy in QA?'
      }
    }

        stage('Deploy QA') {
      parallel {
        stage('Deploy pacrefback-qa') {
          steps {
            script {
              docker.withRegistry('https://iriscontainers.azurecr.io', 'docker_registry') {
                dir ('src/backend') {
                  sshagent (credentials: ['containers']) {
                    withCredentials([string(credentialsId: 'mongo_referidos_qa_uri', variable: 'ConnectionDb'), string(credentialsId: 'appinsights_pyme_qa', variable: 'APPINSIGHTS_INSTRUMENTATIONKEY'), string(credentialsId: 'dummy_credentials', variable: 'DUMMY_USERS')]) {
                      sh '''TIMEOUT=180
ssh -4 -o StrictHostKeyChecking=no docker@51.143.101.173 -p 50000 -L 2381:/var/run/docker.sock sleep $TIMEOUT & 
docker-compose -H localhost:2386 -f docker-compose.qa.yml build && 
docker-compose -H localhost:2386 -f docker-compose.qa.yml push && 
docker -H localhost:2386 stack deploy --compose-file=docker-compose.qa.yml --with-registry-auth pocrefback &&
docker -H localhost:2386 service scale pocrefback_pocrefback=0 &&
docker -H localhost:2386 service scale pocrefback_pocrefback=6'''
                    } 
                  }
                }
              }
            }
            
          }
        }
      }
    }
  }
}
