import React from "react";
import { Code, Para } from "../../../utils/Helpers";

const Sixtheen = () => {
  return (
    <div>
      <>
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/cdn_aws_s3.jpg"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <Para>
          In the world of web applications and online services, data transfer
          costs can quickly add up, especially as your user base grows. One
          effective strategy to mitigate these costs and enhance your web
          performance is to implement a Content Delivery Network (CDN) via
          Amazon S3 and CloudFront. This setup not only reduces data transfer
          expenses but also significantly improves performance, scalability,
          reliability, and security. Additionally, it contributes to better SEO
          and user experience. In this blog, we'll walk through the steps to set
          up a CDN using Amazon S3 and CloudFront.
        </Para>
        <p>
          <b>Understanding CDNs and Their Benefits</b>
        </p>
        <p>
          A CDN is a network of distributed servers that deliver web content to
          users based on their geographic location. The primary benefits of
          using a CDN include:
        </p>
        <ul className="list-inside list-disc">
          <li>
            <b>Reduced Latency:</b> Content is delivered from the server closest
            to the user, minimizing latency.
          </li>
          <li>
            <b>Lower Bandwidth Costs:</b> By caching content closer to the user,
            CDNs reduce the amount of data transferred from the origin server.
          </li>
          <li>
            <b>Increased Availability and Redundancy:</b> CDNs provide built-in
            redundancy, ensuring high availability even during traffic spikes.
          </li>
          <li>
            <b>Improved Performance:</b> Faster content delivery leads to a
            better user experience and can positively impact your <b>SEO.</b>
          </li>
          <li>
            <b>Enhanced Security:</b> CDNs offer additional security features
            like <b>DDoS protection</b> and secure connections.
          </li>
        </ul>
        <br />
        <p>
          <b>
            Step-by-Step Guide to Implementing a CDN via Amazon S3 and
            CloudFront
          </b>
        </p>
        <br />
        <p>
          <b>Step 1: Set Up Your Amazon S3 Bucket</b>
        </p>
        <p>
          <b>1. Create an S3 Bucket:</b>
        </p>
        <ul className="list-inside list-disc">
          <li>
            Sign in to the AWS Management Console and navigate to the S3
            service.
          </li>
          <li>
            Click "Create bucket" and provide a unique name for your bucket.
          </li>
          <li>
            Select the appropriate region and configure any additional settings
            as needed.
          </li>
          <li>
            For example, name it “cdn-your_project_name” so you can identify the
            project. I named my bucket “cdn-dewang”. In object ownership, I
            selected ACL disabled, blocked public access, but enabled “bucket
            versioning”.
          </li>
          <li>Click "Create bucket" to finalize the creation.</li>
        </ul>
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/1_s3.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/1.2_encryption.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <p>
          <b>2. Upload Your Content:</b>
        </p>
        <ul className="list-inside list-disc">
          <li>
            Once your bucket is created, click on the bucket name to open it.
          </li>
          <li>
            Click "Upload" to add your web content (images, videos, HTML, CSS,
            JavaScript files, etc.) to the bucket. Here I’ve uploaded an image
            named “dewang_image.png”.
          </li>
        </ul>
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/2_object.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <p>
          <b>Step 2: Create a CloudFront Distribution</b>
        </p>
        <p>
          <b>1. Navigate to CloudFront:</b>
        </p>
        <p> In the AWS Management Console, go to the CloudFront service.</p>
        <br />
        <p>
          <b>2. Create a Distribution:</b>
        </p>
        <ul class="list-disc list-inside ">
          <li>Click "Create distribution".</li>
          <li>
            For the origin domain name, select the S3 bucket you created
            earlier.
          </li>
          <li>
            Configure the settings as needed, such as enabling caching, setting
            the default root object, and specifying any additional behaviors.
          </li>
          <li>
            For example, I selected “cdn-dewang” as the origin name. In origin
            access, I selected “Origin access control settings”. In origin
            access control, click on “Create new OAC”. For now, I have disabled
            the “Web Application Firewall” (you can enable it as per your use).
            Select “Redirect HTTP to HTTPS” as the viewer protocol policy, and
            mark Restrict Viewer Access as “NO”.
          </li>
          <li>Click "Create distribution" to start the creation process.</li>
        </ul>
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/3_cloudfront.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/4_distribution.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/5_aws.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/6_cdn.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/7_object.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/8_aws_service.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <p>
          <b>Step 3: Update S3 Bucket Policy</b>
        </p>
        <ul class="list-disc list-inside">
          <li>
            After creating the distribution, click "COPY POLICY" to update your
            S3 bucket policy.
          </li>
          <li>
            Update the policy in your required bucket (e.g.,
            “cdn-your_project_name”) under permissions with the following JSON:
          </li>
        </ul>
        <Code
          code={`{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "your_s3_bucket_arn/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "your_cloud_front_distribution_arn"
                }
            }
        }
    ]
}`}
          language={"json"}
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/9_policy.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/10_permission_security.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <p>
          <b>Step 4: Validate Your CDN</b>
        </p>
        <ul class="list-disc list-inside">
          <li>
            Go to the CloudFront service again, select your distribution, and
            copy the “Distribution domain name”.
          </li>
          <li>
            Paste it in the browser URL, followed by the object name you want to
            access.
          </li>
          <li>
            The resultant URL will be in the format:
            https://your_distribution_domain_name/your_object_uploaded . In my
            case, it is: https://d162u6c52yskad.cloudfront.net/dewang_image.png
          </li>
        </ul>
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Amazon_S3/11_data_transfer_validation.webp"
          alt="Implement a CDN via Amazon S3"
        />
        <br />
        <p>
          <b>Monitoring and Optimizing Your CDN</b>
        </p>
        <ol className="list-inside list-disc">
          <li>
            <strong>Monitor Performance: </strong>
            Use CloudFront and S3 metrics in the AWS Management Console to
            monitor the performance and usage of your CDN. Keep an eye on
            metrics like cache hit ratio, data transfer rates, and latency.
          </li>

          <li>
            <strong>Optimize Cache Settings: </strong>
            Continuously optimize your cache settings based on observed
            performance. Adjust TTL values, enable compression, and fine-tune
            other parameters to maximize efficiency.
          </li>

          <li>
            <strong>Cost Management: </strong>
            Regularly review your AWS billing reports to track data transfer
            costs and make necessary adjustments to your CDN configuration to
            keep costs under control.
          </li>
        </ol>
        <br />
        <p>
          <b>Conclusion</b>
        </p>
        <p>
          Implementing a CDN via Amazon S3 and CloudFront is a powerful way to
          reduce data transfer costs and enhance the performance, scalability,
          reliability, and security of your web applications. By following the
          steps outlined in this guide, you can set up a robust CDN that
          delivers content efficiently to your users, no matter where they are
          located. Start leveraging the benefits of a CDN today and watch your
          data transfer costs go down while your user experience improves.
        </p>
      </>
    </div>
  );
};

export default Sixtheen;
