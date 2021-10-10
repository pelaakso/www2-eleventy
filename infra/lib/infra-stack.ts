import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53targets from '@aws-cdk/aws-route53-targets';

export class InfraStack extends cdk.Stack {
  public readonly webSiteBucket: s3.IBucket;
  public readonly webSiteARecord: route53.ARecord;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const recordName = 'www2-eleventy-dev';
    const domainName = 'petey952.be';
    const bucketName = `${recordName}.${domainName}`;

    this.webSiteBucket = new s3.Bucket(this, 'Www2EleventyWebBucket', {
      autoDeleteObjects: false,
      bucketName,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      websiteErrorDocument: '404.html',
      websiteIndexDocument: 'index.html',
    });

    const hostedZone = route53.HostedZone.fromLookup(this, 'Zone', {domainName});

    this.webSiteARecord = new route53.ARecord(this, 'Www2EleventyAliasRecord', {
      zone: hostedZone,
      recordName,
      target: route53.RecordTarget.fromAlias(new route53targets.BucketWebsiteTarget(this.webSiteBucket)),
    });

    /* To be done later.

    const provider = new iam.OpenIdConnectProvider(this, 'GitHubOIDCProvider', {
      url: 'https://vstoken.actions.githubusercontent.com',
      clientIds: [ 'sigstore' ],
      thumbprints: ['a031c46782e6e6c662c2c87c76da9aa62ccabd8e'],
    });

    const role = new iam.Role(this, 'Rooli', {
      assumedBy: new iam.OpenIdConnectPrincipal(provider),
    });
    */
  }
}
