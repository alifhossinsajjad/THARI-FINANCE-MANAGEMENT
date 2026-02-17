"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { toast } from "sonner";

import { useSendContactMutation } from "@/Redux/features/contact/contactApi";
import { ContactFormData } from "@/types/contactTypes";

interface ContactProps {
  width?: number;
  height?: number;
  className?: string;
}

const contactFormSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  message: yup.string().required("Message is required"),
});

const ContactForm: React.FC<ContactProps> = ({ width = 702, height = 748 }) => {
  const [
    sendContact,
    { isLoading, isSuccess, isError, error, reset: resetMutation },
  ] = useSendContactMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      const timeout = setTimeout(() => {
        resetMutation();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isSuccess, reset, resetMutation]);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      await sendContact(data).unwrap();
      toast.success("Message sent successfully");
    } catch (err) {
      console.error("Form submission failed:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="my-16 md:my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <Image
              src="/images/user/contact.png"
              alt="Contact"
              width={width}
              height={height}
              className="w-full max-w-md lg:max-w-full h-auto"
              priority
            />
          </div>

          {/* RIGHT FORM */}
          <div className="">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>

            {/* Success */}
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">
                  Thank you! We'll get back to you soon.
                </p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">
                  {(error as any)?.data?.message || "Something went wrong"}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Phone Number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={6}
                  {...register("message")}
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactForm);
