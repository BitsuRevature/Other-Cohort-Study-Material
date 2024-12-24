# Guide to S3 Static Website Hosting

1. Login to AWS and navigate to S3
2. Create an S3 bucket
    - Enable public access
    - Default values for everything else
3. Run `yarn build` on your react project to create a build folder
4. Upload the contents of the build folder into the S3 bucket
5. Go to properties on the S3 bucket, and enable static website hosting
6. Go to permissions on the S3 bucket, and edit the bucket policy to allow public read

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::Bucket-Name/*"
            ]
        }
    ]
}
```

## Guides

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html