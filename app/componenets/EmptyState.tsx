"use client";

import Button from "./Button";
import Container from "./Container";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  action?: () => void;
  actionLabel?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  action,
  actionLabel,
}) => {
  return (
    <Container>
      <div
        className="
        w-full
        h-screen
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
      >
        <div
          className="
          text-2xl
          font-bold
        "
        >
          {title}
        </div>
        <div className="text-neutral-500">{subtitle}</div>
        {action && actionLabel && (
          <div className="mt-4">
            <Button actionLabel={actionLabel} action={action} outline />
          </div>
        )}
      </div>
    </Container>
  );
};

export default EmptyState;
