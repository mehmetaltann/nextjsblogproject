"use client";
import ContactForm from "@/Components/Contact/ContactForm";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";

const page = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type} className="flex flex-col justify-between">
      <ContactForm />
    </AnimationWrapper>
  );
};

export default page;
