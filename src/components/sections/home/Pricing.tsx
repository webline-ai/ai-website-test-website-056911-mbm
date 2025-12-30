'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple Pricing',
  subtitle: 'Choose the plan that works for you. No hidden fees, no surprises.',
  billingToggle: {
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: 'Save 20%',
  },
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals getting started',
      monthlyPrice: 9,
      yearlyPrice: 7,
      currency: '$',
      period: 'month',
      features: ['Up to 5 projects', 'Basic analytics', 'Email support', '1GB storage'],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=starter',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For growing teams and businesses',
      monthlyPrice: 29,
      yearlyPrice: 23,
      currency: '$',
      period: 'month',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '10GB storage',
        'Team collaboration',
        'Custom integrations',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=professional',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 99,
      yearlyPrice: 79,
      currency: '$',
      period: 'month',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        '24/7 phone support',
        'Custom onboarding',
        'SLA guarantee',
        'Advanced security',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
    },
  ],
  guarantee: '30-day money-back guarantee on all plans',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isYearly
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isYearly
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span data-editable="billingToggle.yearly">{config.billingToggle.yearly}</span>
              <Badge variant="secondary" className="text-xs">
                <span data-editable="billingToggle.yearlyDiscount">
                  {config.billingToggle.yearlyDiscount}
                </span>
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">
                    <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                  </span>
                </div>
                {isYearly && <p className="text-sm text-muted-foreground">Billed annually</p>}
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            <span data-editable="guarantee">{config.guarantee}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
