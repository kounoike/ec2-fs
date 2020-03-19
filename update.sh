#!/bin/bash

set -e

. $(dirname $0)/cdk-util.sh

echo "updating instance $ec2"
# aws ssm start-associations-once --association-ids $ssmid
poetry run ansible-playbook -i ansible/hosts/ec2.py ansible/main.yml