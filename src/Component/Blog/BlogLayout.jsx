import { useParams } from "react-router-dom";
import blogData from "../Data/blog/blogs.json";
import BlogSEOHead from "../Common/BlogSEOHead";
import BlogPerformanceOptimizer from "..//Common/BlogPerformanceOptimizer";
import RenderProfile from "../Common/RenderProfile";
import RecentsBlogs from "../Common/RecentsBlogs";
import One from "./BlogPages/One";
import Two from "./BlogPages/Two";
import Three from "./BlogPages/Three";
import Four from "./BlogPages/Four";
import Five from "./BlogPages/Five";
import Six from "./BlogPages/Six";
import Seven from "./BlogPages/Seven";
import Eight from "./BlogPages/Eight";
import Nine from "./BlogPages/Nine";
import Ten from "./BlogPages/Ten";
import Eleven from "./BlogPages/Eleven";
import Twelve from "./BlogPages/Twelve";
import Thirteen from "./BlogPages/Thirteen";
import Forteen from "./BlogPages/Forteen";
import Fiftheen from "./BlogPages/Fiftheen";
import Sixtheen from "./BlogPages/Sixtheen";
import Seventeenth from "./BlogPages/Seventeenth";
import Eighteen from "./BlogPages/Eighteen";
import Nineteen from "./BlogPages/Nineteen";
import Twenty from "./BlogPages/Twenty";
import TwentyOne from "./BlogPages/TwentyOne";
import TwentyTwo from "./BlogPages/TwentyTwo";
import TwentyThree from "./BlogPages/TwentyThree";
import TwentyFour from "./BlogPages/TwentyFour";
import TwentyFive from "./BlogPages/TwentyFive";
import TwentySix from "./BlogPages/TwentySix";
import TwentySeven from "./BlogPages/TwentySeven";
import TwentyEight from "./BlogPages/TwentyEight";
import TwentyNine from "./BlogPages/TwentyNine";
import Thirty from "./BlogPages/Thirty";
import ThirtyOne from "./BlogPages/ThirtyOne";
import ThirtyTwo from "./BlogPages/ThirtyTwo";
import ThirtyThree from "./BlogPages/ThirtyThree";
import ThirtyFour from "./BlogPages/ThirtyFour";
import ThirtyFive from "./BlogPages/ThirtyFive";
import ThirtySix from "./BlogPages/ThirtySix";
import ThirtySeven from "./BlogPages/ThirtySeven";
import ThirtyEight from "./BlogPages/ThirtyEight";
import ThirtyNine from "./BlogPages/ThirtyNine";
import Forty from "./BlogPages/Forty";
import FortyOne from "./BlogPages/FortyOne";
import FortyTwo from "./BlogPages/FortyTwo";
import FortyThree from "./BlogPages/FortyThree";
import FortyFour from "./BlogPages/FortyFour";
import FortyFive from "./BlogPages/FortyFive";
import FortySix from "./BlogPages/FortySix";
import FortySeven from "./BlogPages/FortySeven";
import FortyEight from './BlogPages/FortyEight'
import FortyNine from "./BlogPages/FortyNine";
import Fifty from "./BlogPages/Fifty";
import FiftyOne from "./BlogPages/FiftyOne";
import FiftyTwo from "./BlogPages/FiftyTwo";
import FiftyThree from "./BlogPages/FiftyThree";
import FiftyFour from "./BlogPages/FiftyFour";
import FiftyFive from "./BlogPages/FiftyFive";
import FiftySix from "./BlogPages/FiftySix";
import FiftySeven from "./BlogPages/FiftySeven";
import FiftyEight from "./BlogPages/FiftyEight";
import FiftyNine from "./BlogPages/FiftyNine";
import Sixty from "./BlogPages/Sixty";
import SixtyOne from "./BlogPages/SixtyOne";
import SixtyTwo from "./BlogPages/SixtyTwo";
import SixtyThree from "./BlogPages/SixtyThree";
import SixtyFour from "./BlogPages/SixtyFour";
import SixtyFive from "./BlogPages/SixtyFive";
import SixtySix from "./BlogPages/SixtySix";
import SixtySeven from "./BlogPages/SixtySeven";
import SixtyEight from "./BlogPages/SixtyEight";
import SixtyNine from "./BlogPages/SixtyNine";
import Seventy from "./BlogPages/Seventy";
import SeventyOne from "./BlogPages/SeventyOne";
import SeventyTwo from "./BlogPages/SeventyTwo";
import SeventyThree from './BlogPages/SeventyThree'
import SeventyFour from './BlogPages/SeventyFour'
const BlogMap = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
  9: Nine,
  10: Ten,
  11: Eleven,
  12: Twelve,
  13: Thirteen,
  14: Forteen,
  15: Fiftheen,
  16: Sixtheen,
  17: Seventeenth,
  18: Eighteen,
  19: Nineteen,
  20: Twenty,
  21: TwentyOne,
  22: TwentyTwo,
  23: TwentyThree,
  24: TwentyFour,
  25: TwentyFive,
  26: TwentySix,
  27: TwentySeven,
  28: TwentyEight,
  29: TwentyNine,
  30: Thirty,
  31: ThirtyOne,
  32: ThirtyTwo,
  33: ThirtyThree,
  34: ThirtyFour,
  35: ThirtyFive,
  36: ThirtySix,
  37: ThirtySeven,
  38: ThirtyEight,
  39: ThirtyNine,
  40: Forty,
  41: FortyOne,
  42: FortyTwo,
  43: FortyThree,
  44:FortyFour,
  45:FortyFive,
  46:FortySix,
  47:FortySeven,
  48:FortyEight,
  49:FortyNine,
  50:Fifty,
  51:FiftyOne,
  52:FiftyTwo,
  53:FiftyThree,
  54:FiftyFour,
  55:FiftyFive,
  56:FiftySix,
  57:FiftySeven,
  58:FiftyEight,
  59:FiftyNine,
  60:Sixty,
  61:SixtyOne,
  62:SixtyTwo,
  63:SixtyThree,
  64:SixtyFour,
  65:SixtyFive,
  66:SixtySix,
  67:SixtySeven,
  68:SixtyEight,
  69:SixtyNine,
  70:Seventy,
  71:SeventyOne,
  72:SeventyTwo,
  73:SeventyThree,
  74:SeventyFour
};

const ReturnBlogById = ({ id }) => {
  const Component = BlogMap[id];
  return <>{Component && <Component />}</>;
};

const BlogLayout = () => {
  const params = useParams();
  const ReturnCurrentBlogByTitle = (title) => {
    const foundBlog = blogData.blogs.find((blog) => blog.title === title);
    return foundBlog || null;
  };
  const data = ReturnCurrentBlogByTitle(params.title);
  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = data.description ? data.description.split(" ").length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      {data && (
        <>
          <BlogPerformanceOptimizer />
          <BlogSEOHead
            title={data.seoTitle}
            description={data.description}
            keywords={data.seoKeywords.split(", ")}
            canonicalUrl={`https://staropstech.com/blog/${data.title}`}
            ogImage={data.posterUrl}
            author={data.author}
            publishedTime={data.date}
            modifiedTime={data.date}
            section="Technology"
            tags={data.seoKeywords.split(", ").slice(0, 10)}
            readingTime={readingTime}
            category="Software Development"
            featured={data.id <= 5} // First 5 blogs are featured
          />
          <div className="h-5"></div>
          <div className="p-2 md:p-6 container mx-auto w-full  flex flex-col gap-3 items-start justify-center rounded-lg ">
            <h1 className="text-5xl font-medium border-b-2  w-full py-1 leading-snug">
              {data.heading}
            </h1>
            <div className="w-full flex flex-row justify-between">
              <RenderProfile name={data.author} />
              <p className="text-gray-600 text-sm font-semibold">{data.date}</p>
            </div>

            <div className="h-5 border-t-2 border-b-2 "></div>
            <div className="text-lg sm:text-xl w-full p-2 sm:leading-8 text-gray-700 ">
              <ReturnBlogById id={data.id} />
            </div>
          </div>
          <RecentsBlogs heading="Related Blogs" recents={data.related} />
        </>
      )}
    </>
  );
};

export default BlogLayout;
