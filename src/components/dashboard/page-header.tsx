import * as React from "react";

interface DashboardPageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function DashboardPageHeader({
  title,
  action,
}: DashboardPageHeaderProps) {
  return (
    <header className="flex justify-between">
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {title}
      </h1>
      {action}
    </header>
  );
}
