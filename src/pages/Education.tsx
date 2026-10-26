import { GraduationCap, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import EducationSection from "@/components/EducationSection";
import { Button } from "@/components/ui/button";

const Education = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      eyebrow="Academics"
      eyebrowIcon={<GraduationCap className="w-3.5 h-3.5" />}
      title={
        <>
          <span className="heading-emoji">📘 </span>My <span className="text-neon-green">Education</span>
        </>
      }
      description="My academic journey and qualifications — the foundation behind the work I ship."
    >
      <EducationSection showHeading={false} />

      <section className="pb-20 bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button
            onClick={() => navigate("/achievements")}
            variant="outline"
            className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg font-semibold px-8 py-3 text-lg transition-all duration-300"
          >
            <Award className="w-5 h-5 mr-2" />
            View My Achievements
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Education;
