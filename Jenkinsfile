pipeline {
  agent any

   environment {
     CI = false
     DOCKER_TAG = getDockerTag()
   }

  stages {
    //stage pertama
    stage ('Install Dependencies react project'){
      steps{
        echo "Start install dependencies react projects"
        sh "npm install"
      }
    }

    //stage kedua
    stage ('Build react project'){
      steps{
        sh 'npm run build'
      }
    }

    //stage ketiga
    stage ('Build docker images'){
      steps{    
        script {
          app = docker.build("sendykris/rigup_frontend") 
        }    
      }
    }

    //stage keempat
    stage ('push image to registry'){
      steps{    
        script{
          docker.withRegistry("https://registry.hub.docker.com", "project-rigup"){
            app.push("${DOCKER_TAG}")
            app.push("latest")    
          }    
        }    
      }    
    }  

    //stage kelima
    stage ('deploy app to kubernetes cluster'){
      steps{    
        sh "chmod +x changeTag.sh"
        sh "./changeTag.sh ${DOCKER_TAG}"
        withKubeConfig([credentialsId: 'project-secretfile', serverUrl: 'https://34.101.92.159']){
          sh 'kubectl apply -f deployment-config.k8s.yaml'   
        }      
      }    
    }
  }      
}

def getDockerTag(){
  def tag = sh script: "git rev-parse HEAD", returnStdout: true
  return tag    
}