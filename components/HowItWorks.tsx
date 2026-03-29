import { steps } from "@/lib/constants";
import SectionWrapper from "./SectionWrapper";
import StepCard from "./StepCard";

export default function HowItWorks() {
  return (
    <SectionWrapper
      title="How It Works"
      subtitle="Three steps to collecting your XCLSV song."
      className="bg-surface-1"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
