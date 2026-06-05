import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export const LoadingSpinner = forwardRef(
  (
    {
      variant = "circle",
      size = "md",
      color = "primary",
      label,
      labelPosition = "bottom",
      speed = "normal",
      className,
      ...props
    },
    ref
  ) => {
    // Sizing mapping
    const sizeMap = {
      xs: {
        container: "h-3.5 w-3.5",
        dot: "h-1 w-1",
        bar: "h-3 w-0.5",
        text: "text-[10px]",
        pingInner: "h-1.5 w-1.5",
      },
      sm: {
        container: "h-5 w-5",
        dot: "h-1.5 w-1.5",
        bar: "h-4 w-1",
        text: "text-xs",
        pingInner: "h-2 w-2",
      },
      md: {
        container: "h-8 w-8",
        dot: "h-2.5 w-2.5",
        bar: "h-6 w-1",
        text: "text-sm",
        pingInner: "h-3 w-3",
      },
      lg: {
        container: "h-12 w-12",
        dot: "h-3.5 w-3.5",
        bar: "h-8 w-1.5",
        text: "text-base",
        pingInner: "h-5 w-5",
      },
      xl: {
        container: "h-16 w-16",
        dot: "h-4.5 w-4.5",
        bar: "h-10 w-2",
        text: "text-lg",
        pingInner: "h-6 w-6",
      },
    };

    const activeSize = sizeMap[size] || sizeMap.md;

    // Color mapping
    const colorMap = {
      primary: {
        text: "text-blue-500",
        border: "border-blue-500/20 border-t-blue-500",
        bg: "bg-blue-500",
      },
      slate: {
        text: "text-slate-500 dark:text-slate-400",
        border: "border-slate-500/20 border-t-slate-500 dark:border-slate-800 dark:border-t-slate-400",
        bg: "bg-slate-500 dark:bg-slate-400",
      },
      indigo: {
        text: "text-indigo-500",
        border: "border-indigo-500/20 border-t-indigo-500",
        bg: "bg-indigo-500",
      },
      rose: {
        text: "text-rose-500",
        border: "border-rose-500/20 border-t-rose-500",
        bg: "bg-rose-500",
      },
      emerald: {
        text: "text-emerald-500",
        border: "border-emerald-500/20 border-t-emerald-500",
        bg: "bg-emerald-500",
      },
      amber: {
        text: "text-amber-500",
        border: "border-amber-500/20 border-t-amber-500",
        bg: "bg-amber-500",
      },
      white: {
        text: "text-white",
        border: "border-white/20 border-t-white",
        bg: "bg-white",
      },
    };

    const activeColor = colorMap[color] || colorMap.primary;

    // Speed mapping (animation duration)
    const speedMap = {
      slow: {
        spin: "1.5s",
        bounce: "1.2s",
        pulse: "2s",
        ping: "1.8s",
      },
      normal: {
        spin: "1s",
        bounce: "0.8s",
        pulse: "1.4s",
        ping: "1.2s",
      },
      fast: {
        spin: "0.6s",
        bounce: "0.5s",
        pulse: "0.8s",
        ping: "0.7s",
      },
    };

    const activeSpeed = speedMap[speed] || speedMap.normal;

    // Render individual variant animations
    const renderSpinner = () => {
      switch (variant) {
        case "circle":
          return (
            <div
              className={cn(
                "rounded-full border-2 border-solid",
                activeColor.border,
                activeSize.container
              )}
              style={{
                animation: `spin ${activeSpeed.spin} linear infinite`,
              }}
            />
          );
        case "dots":
          return (
            <div className="flex gap-1 items-center justify-center">
              <span
                className={cn("rounded-full animate-bounce", activeColor.bg, activeSize.dot)}
                style={{
                  animationDuration: activeSpeed.bounce,
                  animationDelay: "0ms",
                }}
              />
              <span
                className={cn("rounded-full animate-bounce", activeColor.bg, activeSize.dot)}
                style={{
                  animationDuration: activeSpeed.bounce,
                  animationDelay: "150ms",
                }}
              />
              <span
                className={cn("rounded-full animate-bounce", activeColor.bg, activeSize.dot)}
                style={{
                  animationDuration: activeSpeed.bounce,
                  animationDelay: "300ms",
                }}
              />
            </div>
          );
        case "bars":
          return (
            <div className="flex gap-1.5 items-end justify-center h-full min-h-[20px]">
              <span
                className={cn("rounded-full animate-pulse", activeColor.bg, activeSize.bar)}
                style={{
                  animationDuration: activeSpeed.pulse,
                  animationDelay: "0ms",
                }}
              />
              <span
                className={cn("rounded-full animate-pulse", activeColor.bg, activeSize.bar)}
                style={{
                  animationDuration: activeSpeed.pulse,
                  animationDelay: "150ms",
                }}
              />
              <span
                className={cn("rounded-full animate-pulse", activeColor.bg, activeSize.bar)}
                style={{
                  animationDuration: activeSpeed.pulse,
                  animationDelay: "300ms",
                }}
              />
            </div>
          );
        case "ping":
          return (
            <div className={cn("relative flex items-center justify-center", activeSize.container)}>
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full animate-ping opacity-75",
                  activeColor.bg
                )}
                style={{ animationDuration: activeSpeed.ping }}
              />
              <span className={cn("relative inline-flex rounded-full", activeColor.bg, activeSize.pingInner)} />
            </div>
          );
        case "pulse":
          return (
            <div
              className={cn("animate-pulse rounded-full", activeColor.bg, activeSize.container)}
              style={{ animationDuration: activeSpeed.pulse }}
            />
          );
        default:
          return null;
      }
    };

    const screenReaderText = label || "Loading...";

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex items-center gap-3 select-none",
          labelPosition === "bottom" ? "flex-col justify-center" : "flex-row justify-start",
          className
        )}
        {...props}
      >
        {/* Visual Loading Indicator */}
        {renderSpinner()}

        {/* Text Label */}
        {label && (
          <span className={cn("font-medium text-slate-500 dark:text-slate-400", activeSize.text)}>
            {label}
          </span>
        )}

        {/* Visually Hidden Screen Reader text */}
        <span className="sr-only">{screenReaderText}</span>
      </div>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";
