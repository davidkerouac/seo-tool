const fs = require('fs');
const path = require('path');

const pages = [
    {
        path: 'productivity-apps-for-adhd',
        title: 'Best Productivity Apps for ADHD',
        subtitle: 'Stay focused and organized with AI designed for neurodivergent minds.'
    },
    {
        path: 'ai-task-prioritization-app',
        title: 'AI Task Prioritization App',
        subtitle: 'Let AI handle the heavy lifting of deciding what to do next.'
    },
    {
        path: 'best-productivity-apps-for-entrepreneurs',
        title: 'Productivity Tools for Entrepreneurs',
        subtitle: 'Scale your business, not your todo list.'
    },
    {
        path: 'ADHD',
        title: 'Codot for ADHD',
        subtitle: 'The assistant that understands how your brain works.'
    },
    {
        path: 'Entrepreneurs',
        title: 'Codot for Entrepreneurs',
        subtitle: 'Focus on strategy while Codot handles the execution details.'
    },
    {
        path: 'Executives',
        title: 'Codot for Executives',
        subtitle: 'High-level overview and smart delegation for busy leaders.'
    },
    {
        path: 'codot-vs-todoist',
        title: 'Codot vs Todoist',
        subtitle: 'Why AI-first task management is the future.'
    },
    {
        path: 'codot-vs-ticktick',
        title: 'Codot vs TickTick',
        subtitle: 'Experience the difference of conversational task management.'
    },
    {
        path: 'codot-vs-notion',
        title: 'Codot vs Notion',
        subtitle: 'Stop building systems. Start getting things done.'
    },
    {
        path: 'faq',
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about Codot.'
    },
    {
        path: 'about',
        title: 'About Codot',
        subtitle: 'Our mission to revolutionize personal productivity with AI.'
    }
];

const template = (title, subtitle) => `import { PageTemplate } from "@/components/templates/PageTemplate";

export default function Page() {
  return (
    <PageTemplate
      title="${title}"
      subtitle="${subtitle}"
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
`;

pages.forEach(page => {
    const dirPath = path.join(process.cwd(), 'src/app', page.path);
    const filePath = path.join(dirPath, 'page.tsx');

    // Ensure directory exists (though we created them earlier)
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, template(page.title, page.subtitle));
    console.log(`Created ${filePath}`);
});
