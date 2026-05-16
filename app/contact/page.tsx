import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "お問い合わせ | まちのおすそわけ",
};

export default function ContactPage() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          お問い合わせ
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          ご質問・ご要望がございましたら、以下のフォームよりお問い合わせください。
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
