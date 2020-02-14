#!/bin/bash

set -e

. $(dirname $0)/cdk-util.sh

echo "Starting instance $ec2"
aws ec2 start-instances --instance-ids $ec2 >/dev/null
echo "Waiting instance running $ec2"
aws ec2 wait instance-running --instance-ids $ec2
