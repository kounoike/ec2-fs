#!/bin/bash

set -e

. $(dirname $0)/cdk-util.sh

echo "Connecting to $ec2 [$ec2ip]"
ssh $ec2ip