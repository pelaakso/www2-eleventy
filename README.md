![Build status](https://github.com/pelaakso/www2-eleventy/actions/workflows/build-non-production.yml/badge.svg?branch=main)

# Web site using 11ty

A test project creating a site using [Eleventy](https://www.11ty.dev/) static site generator.

# Technologies

## Tools etc.

* Node 14.18.x or newer 14. This should match the latest version available in AWS Lambda.
* TailwindCSS 2.x.

## Infra

* AWS S3
* AWS Route 53

Infra is defined as code using [CDK](https://docs.aws.amazon.com/cdk/index.html).

## CI

* GitHub Actions

## CD

* Non existent

# Credits

Web site is based on https://github.com/tomreinert/minimal-11ty-tailwind-starter.
Mainly CSS and layouts remain from the original implementation.
