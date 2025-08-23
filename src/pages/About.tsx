import { site } from '../site.config';

export default function About() {
  const avatarSrc = site.avatarUrl && site.avatarUrl.length > 0 ? site.avatarUrl : '/avatar.svg';

  return (
    <section className="mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={avatarSrc}
          alt={`${site.name} avatar`}
          className="w-20 h-20 rounded-2xl border border-gray-200 dark:border-gray-700 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{site.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{site.tagline}</p>
          <div className="mt-2 flex gap-3 text-sm">
            <a className="underline" href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            {site.social.github && <a className="underline" href={site.social.github} target="_blank" rel="noreferrer">GitHub</a>}
            {site.social.email && <a className="underline" href={`mailto:${site.social.email}`}>Email</a>}
          </div>
        </div>
      </div>

      <article className="prose dark:prose-invert">
        <h2>About Me</h2>
        <p>
          Hi, I’m <strong>{site.name}</strong> — a Front End React Developer and blogger.
          I share my thoughts, projects, and personal journey here. This site is minimal,
          markdown-powered, and easy to update.
        </p>
      </article>
    </section>
  );
}
