'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSendContactMutation } from '@/Redux/features/contact/contactApi';
import { ContactFormData } from '@/types/contactTypes';
import { toast } from 'sonner';


// Validation schema
const contactFormSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  message: yup.string().required('Message is required'),
});

const ContactForm: React.FC = () => {
  const [sendContact, { isLoading, isSuccess, isError, error, reset: resetMutation }] =
    useSendContactMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema),
    mode: 'onBlur',
  });

  // Auto reset success message after 3 seconds
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
      toast.success('Massage send successfully')
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  };

  return (
    <div className="bg-gray-100 py-16">
  <div className="max-w-6xl mx-auto px-4">
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block">
        <img
          src="/contact-image.jpg" // put your image in public folder
          alt="Contact"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h2>

        <p className="text-gray-600 mb-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
              {(error as any)?.data?.message || 'Something went wrong'}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* First + Last */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register('firstName')}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
                {...register('lastName')}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register('email')}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
                {...register('phone')}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
              rows={5}
              {...register('message')}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Tell us how we can help you..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default ContactForm;
