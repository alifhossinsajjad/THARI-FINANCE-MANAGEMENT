import ContactBanner from "@/components/user/landing/contact/ContactBanner";
import ContactFAQ from "@/components/user/landing/contact/ContactFAQ";
import ContactForm from "@/components/user/landing/contact/ContactForm";

function contact() {
  return (
    <div>
      <ContactBanner />
      <ContactForm />
      <ContactFAQ />
    </div>
  );
}

export default contact;
