import { Briefcase } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import StudentLancerSection from "@/components/StudentLancerSection";

const StudentLancer = () => {
  return (
    <PageLayout
      eyebrow="Freelance Developer"
      eyebrowIcon={<Briefcase className="w-3.5 h-3.5" />}
      title={
        <>
          <span className="heading-emoji">🚀 </span>Where I Freelance — <span className="text-neon-green">Student Lancer</span>
        </>
      }
      description="A digital studio where emerging talent designs and ships world-class software — and where I take on client projects as a freelance developer, delivered error-free and handed over complete."
    >
      <StudentLancerSection showHeading={false} />
    </PageLayout>
  );
};

export default StudentLancer;
