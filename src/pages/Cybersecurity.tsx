import { ShieldCheck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CybersecuritySection from "@/components/CybersecuritySection";

const Cybersecurity = () => {
  return (
    <PageLayout
      eyebrow="Security First"
      eyebrowIcon={<ShieldCheck className="w-3.5 h-3.5" />}
      title={
        <>
          <span className="heading-emoji">🔐 </span><span className="text-neon-green">Cybersecurity</span>
        </>
      }
      description="Network security, ethical hacking and vulnerability detection — the practices I bring into every product I build."
    >
      <CybersecuritySection showHeading={false} />
    </PageLayout>
  );
};

export default Cybersecurity;
