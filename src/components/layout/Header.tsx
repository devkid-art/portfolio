import { profile } from '@/content/profile';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Header({ localeSwitch }: { localeSwitch?: React.ReactNode }) {
  return (
    <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-5 py-4 md:px-8">
      <Link href="/" className="font-display text-2xl font-extrabold tracking-tight text-fg">
        {profile.name}
      </Link>
      <div className="flex items-center gap-2">
        {localeSwitch}
        <ThemeToggle />
      </div>
    </header>
  );
}
