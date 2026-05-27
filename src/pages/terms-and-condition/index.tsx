import { useState, useRef, type UIEvent } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

const TermsAndConditions = () => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  //   const [ setIsAccepted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scrolling to ensure the user actually reviews the terms before accepting
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    // Calculate if the user has reached within 20px of the bottom
    const isAtBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 20;

    if (isAtBottom) {
      setHasScrolledToBottom(true);
    }
  };

  //   const handleAcceptance = () => {
  //     if (!hasScrolledToBottom) return;
  //     setIsAccepted(true);
  //     // Optional: Save acceptance to localStorage or fire an API update here
  //     alert("Thank you for accepting our Terms & Conditions!");
  //   };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50">
      <Header />

      <main className="flex-grow max-w-4xl w-[90%] mx-auto mt-[120px] mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {/* Header Block */}
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Terms and Conditions
            </h1>
            <p className="text-sm text-gray-500 mt-2">Last Updated: May 2026</p>
          </div>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Please read these Terms and Conditions carefully before using our
            service or completing your purchase. By accessing our platform and
            placing an order, you agree to be bound by these legal guidelines.
          </p>

          {/* Scrollable Legal Content Area */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-[350px] overflow-y-auto border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50 text-gray-700 text-sm space-y-6 leading-relaxed scroll-smooth shadow-inner"
          >
            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">
                1. User Accounts and Eligibility
              </h2>
              <p>
                To complete a purchase on our platform, you may be required to
                register a user account. You are solely responsible for
                maintaining the confidentiality of your session token,
                credentials, and password. You must notify us immediately of any
                unauthorized breach of security or access to your profile.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">
                2. Payments and Pricing
              </h2>
              <p>
                All payment transactions are initialized dynamically and
                processed securely via authorized third-party gateways
                (including Paystack). Prices for all products are subject to
                change without prior notice. We reserve the right to cancel or
                refuse any orders if pricing discrepancies or currency
                transaction errors occur.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">
                3. Shipping, Logistics, and Delivery
              </h2>
              <p>
                Shipping estimates, regional fees, and arrival times are
                calculated automatically based on the checkout form information
                provided (including city, state, and street designations). We
                are not liable for delayed shipments caused by incomplete
                contact addresses or shipping carrier dispatch interruptions.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">
                4. Returns, Cancellations, and Refunds
              </h2>
              <p>
                Orders transition atomically to a 'processing' state once a
                transaction confirmation webhook is successfully received from
                our processors. Because processing begins immediately, order
                adjustments or cancellations must be flagged to support channels
                before warehouse fulfillment begins.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">
                5. Intellectual Property rights
              </h2>
              <p>
                All code repositories, platform designs, visual assets, brand
                photography, item descriptions, layouts, text architectures, and
                interface components running on this platform are owned
                exclusively by us or our licensing entities and are protected by
                universal copyright laws.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-base mb-2">
                6. Limitation of Liability
              </h2>
              <p>
                To the widest extent permitted by applicable regional laws, our
                total platform liability for any distinct service disruption,
                financial transaction dispute, or item defect shall never exceed
                the absolute value amount paid by the customer for that specific
                transaction sequence.
              </p>
            </section>
          </div>

          {/* Prompt Message if not scrolled */}
          {!hasScrolledToBottom && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 text-center font-medium animate-pulse">
              💡 Please scroll down to the very bottom of the document wrapper
              to unlock the acceptance options.
            </p>
          )}

          {/* Action/Acceptance Block */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label
              className={`flex items-start gap-3 cursor-pointer select-none text-sm transition-opacity ${!hasScrolledToBottom ? "opacity-40 pointer-events-none" : ""}`}
            >
              <input
                type="checkbox"
                disabled={!hasScrolledToBottom}
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#4C0213] border-gray-300 focus:ring-[#4C0213]"
              />
              <span className="text-gray-600 font-medium">
                I have read, understood, and agree to follow all the legal
                guidelines outlined above.
              </span>
            </label>

            <button
              onClick={handleAcceptance}
              disabled={!hasScrolledToBottom || !isAccepted}
              className={`whitespace-nowrap px-8 py-3 rounded-full font-bold text-sm shadow-md transition-all sm:w-auto w-full ${
                hasScrolledToBottom && isAccepted
                  ? "bg-[#4C0213] text-white hover:opacity-95 cursor-pointer transform active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Accept Terms
            </button>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
