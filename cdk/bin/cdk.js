#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CdkStack } = require('../lib/cdk-stack');

const app = new cdk.App();
new CdkStack(app, 'KounoikeEc2Stack', {env: {account: process.env.CDK_DEFAULT_ACCOUNT, region: "ap-northeast-1"}});
