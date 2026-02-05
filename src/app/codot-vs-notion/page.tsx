import { PageTemplate } from "@/components/templates/PageTemplate";

export default function Page() {
  return (
    <PageTemplate
      title="Codot vs Notion"
      subtitle="Stop building systems. Start getting things done."
    >
      <div className="text-gray-300 space-y-6">
        <p>
          Welcome to the future of productivity. This page is currently being updated with comprehensive content tailored to your needs.
        </p>
        <p>
          Codot uses advanced AI to understand your context, prioritize your tasks, and help you achieve more with less stress.
        </p>
        <h3>Why choose Codot?</h3>
        <ul>
          <li>Voice-first interaction</li>
          <li>Intelligent scheduling</li>
          <li>Adaptive reminders</li>
        </ul>
      </div>
    </PageTemplate>
  );
}
