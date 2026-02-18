"use client";

import { Contact, useGetContactMessageQuery } from "@/Redux/features/AdminDashboard/adminContact/contactApi";
import { useState } from "react";

const ContactPage = () => {
  const [page, setPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);

  const { data, isLoading, isError } = useGetContactMessageQuery(page);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error loading data</p>;

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Message</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((contact) => (
              <tr key={contact.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  {contact.first_name} {contact.last_name}
                </td>

                <td className="p-4">{contact.email}</td>

                <td className="p-4">{contact.phone}</td>

                {/* 20 Character Preview */}
                <td
                  className="p-4 cursor-pointer text-blue-600 hover:underline"
                  onClick={() => setSelectedMessage(contact)}
                >
                  {contact.message.length > 20
                    ? contact.message.slice(0, 20) + "..."
                    : contact.message}
                </td>

                <td className="p-4">
                  {new Date(contact.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {data?.meta.current_page} of {data?.meta.last_page}
        </span>

        <button
          disabled={page === data?.meta.last_page}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedMessage.first_name} {selectedMessage.last_name}
            </h2>

            <p className="mb-2">
              <strong>Email:</strong> {selectedMessage.email}
            </p>

            <p className="mb-2">
              <strong>Phone:</strong> {selectedMessage.phone}
            </p>

            <p className="mb-4 whitespace-pre-line">
              <strong>Message:</strong>
              <br />
              {selectedMessage.message}
            </p>

            <div className="text-right">
              <button
                onClick={() => setSelectedMessage(null)}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
