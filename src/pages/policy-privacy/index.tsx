import Header from "../../components/header";
import Footer from "../../components/footer";
import Follow from "../../components/follow";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50">
      <Header />

      <main className="flex-grow max-w-4xl w-[90%] mx-auto mt-[120px] mb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {/* Header Section */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 mt-2">Last Updated: May 2026</p>
          </div>

          {/* Policy Body */}
          <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed font-geist">
            <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-gray-600 italic text-sm">
                Your privacy is crucially important to us. This Privacy Policy
                documents the distinct types of information gathered, tracked,
                and recorded by our platform and how we utilize it to secure
                your transactional workflow.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-3">
                We collect information directly from you when you interface with
                our checkout pipelines, create an account, or complete a
                transaction sequence. This includes:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1.5 text-gray-600">
                <li>
                  <strong className="text-gray-800">Identity Data:</strong> Full
                  name, email address, phone numbers, and profile identifiers.
                </li>
                <li>
                  <strong className="text-gray-800">Shipping Data:</strong>{" "}
                  Street address, city, state, postal code, and delivery
                  destination preferences.
                </li>
                <li>
                  <strong className="text-gray-800">Session Data:</strong>{" "}
                  Temporary browser interaction details, session tokens, and
                  checkout item arrays.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">
                We process your personal information to fulfill our
                transactional obligations to you, including to:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1.5 text-gray-600">
                <li>
                  Atomically provision, manage, and verify your customer account
                  profile.
                </li>
                <li>
                  Process order inventory items and establish unique reference
                  states.
                </li>
                <li>
                  Provide accurate delivery configurations for shipping
                  logistics.
                </li>
                <li>
                  Detect, prevent, and mitigate fraudulent transactional
                  behaviors.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                3. Payment Gateways and Financial Information
              </h2>
              <p>
                We do not collect, process, or store credit card numbers, CVV
                keys, or detailed banking credentials directly on our database
                models. All financial transaction initialization steps route
                seamlessly to our highly secure, PCI-DSS compliant third-party
                payment infrastructure partners (including{" "}
                <span className="font-semibold text-gray-900">Paystack</span>).
                Their usage of your data is governed strictly by their
                independent Privacy Guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                4. Security and Data Retention
              </h2>
              <p>
                We employ industry-standard encryption protocols to protect your
                identity data during transmission and storage. Your data is
                retained only for as long as necessary to complete fulfillment
                obligations, manage accounting structures, or satisfy legal
                operational records. When your token expires via our inactivity
                timeout mechanisms, active session states are wiped to prevent
                unauthorized client access.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                5. Third-Party Disclosures
              </h2>
              <p>
                We do not sell, trade, or rent your personal data profiles to
                third-party marketing entities. Your data is shared exclusively
                with critical operating partners—such as delivery logistics
                services and payment processors—solely to successfully execute
                your checkout purchases.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                6. Your Privacy Rights
              </h2>
              <p>
                Depending on your geographic location, you have distinct rights
                regarding your personal information. These include the right to
                inspect the personal data profiles we maintain, demand text
                corrections for inaccurate details, or request total deletion of
                your profile history from our production collection models.
              </p>
            </section>

            <section className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                7. Contact Us
              </h2>
              <p>
                If you have secondary questions, need clarification regarding
                these privacy protocols, or wish to assert your data rights,
                please contact our support desk directly via our designated
                channel addresses.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Follow />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
