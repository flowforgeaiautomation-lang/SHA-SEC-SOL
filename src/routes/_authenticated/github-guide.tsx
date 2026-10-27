import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/github-guide')({
  head: () => ({
    meta: [
      { title: 'MSS Team · GitHub Sync Guide' },
      { name: 'description', content: 'Private guide for keeping the MSS website code synced to GitHub.' },
      { property: 'og:title', content: 'MSS Team · GitHub Sync Guide' },
      { property: 'og:description', content: 'Private guide for keeping the MSS website code synced to GitHub.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: GithubGuide,
});

const steps: [string, string][] = [
  ['Open Git settings', 'In Lovable, open Project settings → Git (or the + menu beside the chat box → Project → GitHub).'],
  ['Connect GitHub', 'Choose Connect GitHub and pick your GitHub account or organisation. A workspace owner or admin must approve this.'],
  ['Let Lovable create the repository', 'Lovable always creates a new private repository. It cannot attach to a repository that already exists.'],
  ['Check the status', 'The Git settings show the repository name and whether Lovable and GitHub are in step. Every change made in Lovable is saved there automatically.'],
  ['Edit safely from GitHub', 'Push changes only to the synced branch (usually main). Changes on other branches never reach Lovable.'],
];

const rules = [
  'Never replace vite.config.ts or the build settings from GitHub — doing this once made every page fail to load.',
  'If GitHub shows commits that Lovable does not have, push one more commit to the synced branch to trigger a refresh.',
  'If Lovable reports the two sides have diverged, merge the newest lovable-sync branch into main on GitHub.',
  'Do not force-push, rebase or squash the synced branch — Lovable will replace its version with GitHub\'s.',
  'Files over 100 MB are rejected by GitHub and block the sync until removed from history.',
  'Publishing the live website is done with Lovable\'s Publish button; GitHub sync only stores the code.',
];

function GithubGuide() {
  return (
    <section className="section">
      <div className="container article">
        <span className="eyebrow">MSS Team</span>
        <h1>Keep the website code synced to GitHub</h1>
        <p>Follow these steps once. After that, every change is copied to your repository automatically.</p>
        <h2>Connect</h2>
        <ol>
          {steps.map(([t, d]) => (
            <li key={t}><strong>{t}.</strong> {d}</li>
          ))}
        </ol>
        <h2>Keep it up to date</h2>
        <ul>{rules.map((r) => <li key={r}>{r}</li>)}</ul>
        <p><Link to="/admin">Back to enquiries</Link></p>
      </div>
    </section>
  );
}
