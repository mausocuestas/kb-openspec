import type { LucideProps } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

interface QuickAccessCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<LucideProps>;
}

export function QuickAccessCard({
  title,
  description,
  href,
  icon: Icon,
}: QuickAccessCardProps) {
  return (
    <a
      href={href}
      className="block group no-underline"
      aria-label={`Acessar ${title}`}
    >
      <Card
        className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        style={{
          borderColor: 'var(--sl-color-hairline)',
          backgroundColor: 'var(--sl-color-bg)',
        }}
      >
        <CardHeader>
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: 'var(--sl-color-accent)',
                color: 'var(--sl-color-white)',
              }}
            >
              <Icon size={24} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <CardTitle
                className="text-lg transition-colors no-underline"
                style={{
                  color: 'var(--sl-color-text)',
                  textDecoration: 'none'
                }}
              >
                {title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription
            style={{
              color: 'var(--sl-color-gray-2)',
              textDecoration: 'none'
            }}
          >
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
}
