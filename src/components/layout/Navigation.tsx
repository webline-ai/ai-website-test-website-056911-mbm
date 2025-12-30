'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'TechFlow',
  brandHref: '#hero',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
  ctaText: 'Get Started',
  ctaHref: '#pricing',
  showCta: true,
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleBrandClick = () => {
    navigate(config.brandHref);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              className="text-xl font-bold text-foreground hover:bg-accent hover:text-accent-foreground p-0 h-auto"
              onClick={handleBrandClick}
              data-editable-href="brandHref"
              data-href={config.brandHref}
            >
              <span data-editable="brandName">{config.brandName}</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {config.navItems.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => handleNavClick(item.href)}
                  data-editable-href={`navItems[${idx}].href`}
                  data-href={item.href}
                >
                  <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          {config.showCta && (
            <div className="hidden md:block">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={handleCtaClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background text-foreground w-[300px] sm:w-[400px]"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Brand */}
                  <div className="pb-4 border-b border-border">
                    <Button
                      variant="ghost"
                      className="text-xl font-bold text-foreground hover:bg-accent hover:text-accent-foreground p-0 h-auto"
                      onClick={handleBrandClick}
                      data-editable-href="brandHref"
                      data-href={config.brandHref}
                    >
                      <span data-editable="brandName">{config.brandName}</span>
                    </Button>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex flex-col space-y-2">
                    {config.navItems.map((item, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        className="text-foreground hover:bg-accent hover:text-accent-foreground justify-start px-4 py-3 text-base font-medium"
                        onClick={() => handleNavClick(item.href)}
                        data-editable-href={`navItems[${idx}].href`}
                        data-href={item.href}
                      >
                        <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  {config.showCta && (
                    <div className="pt-4 border-t border-border">
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full transition-colors"
                        onClick={handleCtaClick}
                        data-editable-href="ctaHref"
                        data-href={config.ctaHref}
                      >
                        <span data-editable="ctaText">{config.ctaText}</span>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
