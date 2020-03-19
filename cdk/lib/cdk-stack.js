const cdk = require('@aws-cdk/core');
const ec2 = require('@aws-cdk/aws-ec2');
const iam = require('@aws-cdk/aws-iam');
const ssm = require('@aws-cdk/aws-ssm');
const s3 = require('@aws-cdk/aws-s3');
const s3asset = require('@aws-cdk/aws-s3-assets');
const path = require('path');
const fs = require('fs');

class CdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    const vpc = ec2.Vpc.fromLookup(this, "ACCdev", {vpcName: "ACC-dev-Stack/ACC-dev-vpc"})
    const sg = new ec2.SecurityGroup(this, "EC2SG", {vpc: vpc})
    sg.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic());
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));
    const ec2Instance = new ec2.Instance(this, "EC2", {
      vpc: vpc,
      vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
      securityGroup: sg,
      blockDevices: [
        {
          deviceName: '/dev/sda1',
          volume: ec2.BlockDeviceVolume.ebs(100)
        }
      ],
      instanceType: "g4dn.xlarge",
      machineImage: new ec2.GenericLinuxImage({
        "ap-northeast-1": "ami-07f4cb4629342979c",
      }),
      userData: ec2.UserData.custom(fs.readFileSync(path.join(__dirname, "..", "userdata.cfg"))),
      instanceName: "kounoike-test",
      keyName: "kounoike-mbp"
    })
    ec2Instance.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'ssmmessages:*',
        'ssm:UpdateInstanceInformation',
        'ec2messages:*',
        'sts:*'
      ],
      resources: ['*'],
    }));
    new cdk.CfnOutput(this, "EC2Instance", {value: ec2Instance.instanceId})
    new cdk.CfnOutput(this, "EC2IP", {value: ec2Instance.instancePublicIp})

    // The code that defines your stack goes here
  }
}

module.exports = { CdkStack }
