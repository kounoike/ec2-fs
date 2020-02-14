#!/bin/bash

set -e

. $(dirname $0)/cdk-util.sh

echo "Stopping instance $ec2"
aws ec2 stop-instances --instance-ids $ec2 > /dev/null
echo "Waiting to stop instance $ec2"
aws ec2 wait instance-stopped --instance-ids $ec2