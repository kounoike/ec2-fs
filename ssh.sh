#!/bin/bash

set -e

. $(dirname $0)/cdk-util.sh

echo "ec2ip: $ec2ip"
ssh ubuntu@$ec2ip