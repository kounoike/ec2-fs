#!/bin/bash

set -e

. $(dirname $0)/cdk-util.sh

echo "status $ec2"
aws ec2 describe-instance-status --instance-ids $ec2