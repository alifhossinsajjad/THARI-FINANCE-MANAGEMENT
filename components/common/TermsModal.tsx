import { useState } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function TermsModal({
  isOpen,
  onClose,
  onAgree,
}: TermsModalProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  if (!isOpen) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 20;
    setScrolledToBottom(bottom);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm ">
      {/* Modal */}
      <div className="relative w-screen h-screen overflow-hidden border border-slate-700 shadow-2xl flex bg-[#0b0f16] p-12">
        {/* LEFT PANEL */}
        <div className="flex-1 flex flex-col w-360 mx-auto">
          {/* Header */}
          <div className="px-8 py-6 border-slate-700">
            <h2 className="text-2xl font-semibold text-white">
              Terms and Conditions for Thari
              <span className="text-gray-100 font-normal">
                {" "}
                (powered by halalrain.com)
              </span>
            </h2>
          </div>

          {/* Scrollable Content */}
          <div
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-8  text-slate-300 text-base leading-relaxed"
          >
            <p className="mb-6 text-gray-100 max-w-240">
              By accessing or using Thari (hereinafter referred to as &apos;the
              Platform&apos;), powered by halarain.com, you agree to comply with
              the following Terms and Conditions. These terms outline your
              rights and obligations as a user and are legally binding.
            </p>

            <ol className="space-y-6 list-decimal pl-5">
              <li className="text-sm">
                <strong className="text-white text-base">
                  Acceptance of Terms
                </strong>
                <br />
                By using the Platform, you acknowledge and agree to the Terms
                and Conditions set forth herein. If you do not agree with these
                terms, you should not access or use the Platform.
              </li>

              <li className="text-sm">
                <strong className="text-white text-base">
                  Platform Purpose
                </strong>
                <br />
                Thari provides a service for Muslims to verify the
                Sharia-compliance (Halal or Haram status) of stocks listed in
                the market. The Platform provides analysis based on Islamic
                principles of finance and investments, as well as tools for
                financial management. You also have access to community
                discussions and insights on topics including stocks, crypto, and
                investment strategies.
              </li>

              <li className="text-sm">
                <strong className="text-white text-base">
                  Data and Third-Party API
                </strong>
                <br />
                The Platform uses stock market data provided by third-party
                APIs. While Thari strives to ensure the accuracy of the data, it
                does not guarantee the accuracy, completeness, or timeliness of
                any information retrieved from these third-party sources. All
                data related to stock prices, market movements, and financial
                indicators is subject to the accuracy and availability of the
                data provided by these third parties.
              </li>

              <li className="text-sm">
                <strong className="text-white text-base">
                  Shariah Compliance
                </strong>
                <br />
                Thari makes reasonable efforts to assess and determine whether a
                stock is Sharia-compliant (Halal) or non-compliant (Haram).
                However, such determinations are based on our internal analysis
                and the guidelines available at the time of analysis. The final
                decision regarding investment suitability is your
                responsibility, and it is recommended to consult with a
                qualified Islamic financial advisor.
              </li>

              <li className="text-sm">
                <strong className="text-white text-base">
                  Investment Risks
                </strong>
                <br />
                Investing in stocks and other financial instruments involves
                risk. The Platform provides tools and insights for informational
                purposes only. You acknowledge that Thari is not responsible for
                any losses or damages incurred from using the Platform or any
                investment decisions made based on the information provided.
              </li>

              <li className="text-sm">
                <strong className="text-white text-base">User Conduct</strong>
                <br />
                You agree to use the Platform for lawful purposes and in
                compliance with all applicable laws and regulations. You shall
                not use the Platform to: Engage in fraudulent or misleading
                activities. Violate the intellectual property rights of others.
                Harass or disrupt the functionality of the Platform.
              </li>

              <li className="text-sm">
                <strong className="text-white text-base">
                  Intellectual Property
                </strong>
                <br />
                All content and materials available on the Platform, including
                but not limited to text, logos, graphics, images, and software,
                are the property of Thari and are protected by intellectual
                property laws. Users are prohibited from copying, modifying,
                distributing, or creating derivative works based on the
                Platform’s content without permission.
              </li>
            </ol>
          </div>

          {/* Footer */}
          <div className="px-8 py-5  border-slate-700 flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-red-600 text-white text-base font-medium hover:bg-red-500 transition"
            >
              Reject
            </button>

            <button
              onClick={onAgree}
              disabled={!scrolledToBottom}
              className={`px-6 py-2 rounded-full text-base font-medium transition ${
                scrolledToBottom
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-900/50 text-blue-300 cursor-not-allowed"
              }`}
            >
              Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
