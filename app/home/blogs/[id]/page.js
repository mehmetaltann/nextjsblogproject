import SingleBlog from "@/Components/SingleBlog/SingleBlog";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper
      keyValue={type}
      className="mb-10 mt-6 items-center w-full px-3 md:px-0 md:w-3/4 lg:w-2/4"
    >
      <SingleBlog />
    </AnimationWrapper>
  );
};

export default page;
