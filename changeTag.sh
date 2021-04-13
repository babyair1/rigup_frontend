#! /bin/bash

sed "s/tagVersion/$1/g" deployment-project.yaml > deployment-config.k8s.yaml