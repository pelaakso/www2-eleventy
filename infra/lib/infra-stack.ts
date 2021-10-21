import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as apigwint from '@aws-cdk/aws-apigatewayv2-integrations';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaNode from '@aws-cdk/aws-lambda-nodejs';
import * as s3 from '@aws-cdk/aws-s3';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53targets from '@aws-cdk/aws-route53-targets';

export class InfraStack extends cdk.Stack {
  public readonly webSiteBucket: s3.IBucket;
  public readonly webSiteARecord: route53.ARecord;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const recordName = 'www2-eleventy';
    const domainName = 'petey952.be';
    const apiCertificateArn = 'arn:aws:acm:eu-central-1:140966923789:certificate/c96ba383-ae37-49e3-a8ea-a58eb96da369';
    const bucketName = `${recordName}.${domainName}`;
    const apiRecordName = `${recordName}-api`;
    const apiGwCustomDomainNameRecord = `${apiRecordName}.${domainName}`;
    const corsAllowedOrigins = [
      'http://localhost:3000',
      'http://localhost:8080',
      `http://${recordName}.${domainName}`,
    ];

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


    const subscribeNewsletterFn = new lambdaNode.NodejsFunction(this, 'Www2EleventySubscribeNewsletter', {
      entry: 'src/functions/subscribeNewsletter.ts',
      handler: 'lambdaHandler',
      runtime: lambda.Runtime.NODEJS_14_X,
      description: 'Www2Eleventy: handler for subscribe to newsletter',
      functionName: 'Www2EleventySubscribeNewsletter',
      reservedConcurrentExecutions: 10,
      timeout: cdk.Duration.seconds(15),
    });


    const subscribeNewsletterIntegration = new apigwint.LambdaProxyIntegration({
      handler: subscribeNewsletterFn,
      payloadFormatVersion: apigw.PayloadFormatVersion.VERSION_2_0,
    });

    const apiGwCustomDomainName = new apigw.DomainName(this, 'Www2EleventyApiGwCustomDomainName', {
      domainName: apiGwCustomDomainNameRecord,
      certificate: acm.Certificate.fromCertificateArn(this, 'Www2EleventyImportedCertificate', apiCertificateArn),
    });

    const httpApi = new apigw.HttpApi(this, 'Www2EleventyHttpApi', {
      apiName: `Www2EleventyBackend`,
      corsPreflight: {
          allowCredentials: true,
          allowHeaders: ['Authorization'],
          allowMethods: [
            apigw.CorsHttpMethod.GET,
            apigw.CorsHttpMethod.POST,
            apigw.CorsHttpMethod.OPTIONS,
          ],
          allowOrigins: corsAllowedOrigins,
          maxAge: cdk.Duration.minutes(5),
      },
      defaultDomainMapping: {
        domainName: apiGwCustomDomainName,
      },
      description: 'Api Gateway for Www2Eleventy backend',
    });

    httpApi.addRoutes({
      path: '/v1/subscribe-newsletter',
      integration: subscribeNewsletterIntegration,
      methods: [
        apigw.HttpMethod.POST,
      ],
    });

    new route53.ARecord(this, 'Www2EleventyApiAliasRecord', {
      zone: hostedZone,
      recordName: apiRecordName,
      target: route53.RecordTarget.fromAlias(new route53targets.ApiGatewayv2DomainProperties(
        apiGwCustomDomainName.regionalDomainName, apiGwCustomDomainName.regionalHostedZoneId)),
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
