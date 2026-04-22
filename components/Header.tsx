import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-bg-elevated/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <div>
              <div className="text-white font-bold text-lg leading-none">TradeGuard</div>
              <div className="text-brand text-[10px] font-medium tracking-widest uppercase">AI Advisor</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/trades" label="Trades" />
            <NavLink href="/advisories" label="AI Advisories" />
            <NavLink href="/debriefs" label="Debriefs" />
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <NavLink href="/trades" label="Trades" />
            <NavLink href="/advisories" label="AI" />
            <NavLink href="/debriefs" label="Debriefs" />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-bg-card rounded-lg transition-colors"
    >
      {label}
    </Link>
  );
}