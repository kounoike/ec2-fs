#!/bin/bash

stack=$(aws cloudformation describe-stacks --stack-name KounoikeEc2Stack)
if [ $? != 0 ]; then
    pushd $(dirname $0)/cdk
    cdk deploy
    popd

    stack=$(aws cloudformation describe-stacks --stack-name KounoikeEc2Stack)
    if [ $? != 0 ]; then
        echo "ERROR"
        exit 1
    fi
fi

ec2=$(echo "$stack" | jq -r '.Stacks[].Outputs[] | select(.OutputKey=="EC2Instance") | .OutputValue')
ec2ip=$(echo "$stack" | jq -r '.Stacks[].Outputs[] | select(.OutputKey=="EC2IP") | .OutputValue')
