resource "aws_iam_user" "github_iam_user" {
  name = "github-raidcomp-io"
}

resource "aws_iam_access_key" "github_iam_access_key" {
  user = aws_iam_user.github_iam_user.name
}

resource "aws_iam_user_policy" "github_publish_iam_user_policy" {
  name = "github-publish-to-s3"
  user = aws_iam_user.github_iam_user.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*", "s3-object-lambda:*"],
      "Resource": "*"
    }
  ]
}
EOF
}

# Main www S3 bucket
resource "aws_s3_bucket" "www_raidcomp_io_s3_bucket" {
  bucket = "www.raidcomp.io"
}

resource "aws_s3_bucket_acl" "www_raidcomp_io_s3_bucket_acl" {
  bucket = aws_s3_bucket.www_raidcomp_io_s3_bucket.bucket

  acl = "public-read"
}

resource "aws_s3_bucket_website_configuration" "www_raidcomp_io_s3_bucket_website_configuration" {
  bucket = aws_s3_bucket.www_raidcomp_io_s3_bucket.bucket

  index_document {
    suffix = "index.html"
  }
}