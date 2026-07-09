import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// Dictionary of high-quality, pixel-perfect brand SVG icons
const BRAND_ICONS = {
  google: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  ),
  github: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  twitter: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  x: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
    </svg>
  ),
  apple: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z" />
    </svg>
  ),
  discord: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
    </svg>
  ),
  linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  slack: (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#E01E5A"
          d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043z"
        />
        <path
          fill="#36C5F0"
          d="M8.823 5.043a2.528 2.528 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.52 2.522v2.52h-2.52zm0 1.26a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.825a2.528 2.528 0 0 1 2.52-2.52h5.043z"
        />
        <path
          fill="#2EB67D"
          d="M18.958 8.825a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.261 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.782a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043z"
        />
        <path
          fill="#ECB22E"
          d="M15.177 18.958a2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.52-2.522v-2.52h2.52zm0-1.261a2.528 2.528 0 0 1-2.52-2.522v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.522h-5.043z"
        />
      </g>
    </svg>
  ),
  spotify: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.978-.335.076-.668-.135-.744-.47-.076-.336.135-.668.47-.743 3.856-.88 7.15-.51 9.82 1.127.295.18.387.563.207.858zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.183-.412.125-.845-.108-.97-.52-.125-.413.108-.847.52-.972 3.667-1.112 8.232-.57 11.34 1.34.368.228.488.708.26 1.075zm.107-2.846C14.498 8.78 8.7 8.59 5.37 9.6c-.514.156-1.045-.137-1.202-.646-.156-.514.138-1.044.647-1.2 3.822-1.16 10.222-.94 14.17 1.404.462.275.61.874.336 1.336-.275.46-.874.61-1.336.335z" />
    </svg>
  ),
  microsoft: (props) => (
    <svg viewBox="0 0 23 23" {...props}>
      <path fill="#f25022" d="M1 1h10v10H1z" />
      <path fill="#7fba00" d="M12 1h10v10H12z" />
      <path fill="#00a4ef" d="M1 12h10v10H1z" />
      <path fill="#ffb900" d="M12 12h10v10H12z" />
    </svg>
  ),
};

// Map provider name to readable display name
const PROVIDER_NAMES = {
  google: "Google",
  github: "GitHub",
  twitter: "Twitter",
  x: "X",
  facebook: "Facebook",
  apple: "Apple",
  discord: "Discord",
  linkedin: "LinkedIn",
  slack: "Slack",
  spotify: "Spotify",
  microsoft: "Microsoft",
};

export const SocialButton = forwardRef(
  (
    {
      provider = "google",
      variant = "brand",
      size = "md",
      shape = "rounded",
      mode = "login",
      loading = false,
      disabled = false,
      animate = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const IconComponent = BRAND_ICONS[provider.toLowerCase()] || BRAND_ICONS.google;
    const providerLabel = PROVIDER_NAMES[provider.toLowerCase()] || "Google";

    // Text formatting based on mode
    const renderContent = () => {
      if (children) return children;
      if (mode === "login") {
        return `Continue with ${providerLabel}`;
      }
      if (mode === "share") {
        return `Share on ${providerLabel}`;
      }
      return null;
    };

    const isIconOnly = mode === "icon";

    // Sizes classes
    const sizes = {
      sm: cn("h-8 text-xs gap-1.5", isIconOnly ? "w-8 px-0" : "px-3"),
      md: cn("h-10 text-sm gap-2", isIconOnly ? "w-10 px-0" : "px-4"),
      lg: cn("h-12 text-base gap-2.5", isIconOnly ? "w-12 px-0" : "px-6"),
    };

    // Shapes classes
    const shapes = {
      rounded: "rounded-md",
      pill: "rounded-full",
      square: "rounded-none",
    };

    // Styling configuration map for providers and variants
    const getVariantClasses = () => {
      const p = provider.toLowerCase();

      // Brand color specifications
      const brandColors = {
        google: {
          brand: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-800/80 shadow-sm",
          "brand-outline": "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50",
          "brand-solid": "bg-[#4285F4] text-white hover:bg-[#357ae8] shadow-sm",
        },
        github: {
          brand: "bg-[#24292e] text-white hover:bg-[#2c3238] dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-200 shadow-sm",
          "brand-outline": "border border-slate-900 text-slate-900 hover:bg-slate-100 dark:border-slate-100 dark:text-white dark:hover:bg-slate-900",
          "brand-solid": "bg-[#24292e] text-white hover:bg-[#2c3238] dark:bg-[#1f2328] dark:hover:bg-zinc-800 shadow-sm",
        },
        twitter: {
          brand: "bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm",
          "brand-outline": "border border-black text-black hover:bg-zinc-50 dark:border-white dark:text-white dark:hover:bg-zinc-900",
          "brand-solid": "bg-black text-white hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 shadow-sm",
        },
        x: {
          brand: "bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm",
          "brand-outline": "border border-black text-black hover:bg-zinc-50 dark:border-white dark:text-white dark:hover:bg-zinc-900",
          "brand-solid": "bg-black text-white hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 shadow-sm",
        },
        facebook: {
          brand: "bg-[#1877F2] text-white hover:bg-[#166fe5] shadow-sm",
          "brand-outline": "border border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2]/5",
          "brand-solid": "bg-[#1877F2] text-white hover:bg-[#166fe5] shadow-sm",
        },
        apple: {
          brand: "bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm",
          "brand-outline": "border border-black text-black hover:bg-zinc-50 dark:border-white dark:text-white dark:hover:bg-zinc-900",
          "brand-solid": "bg-black text-white hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 shadow-sm",
        },
        discord: {
          brand: "bg-[#5865F2] text-white hover:bg-[#4752c4] shadow-sm",
          "brand-outline": "border border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2]/5",
          "brand-solid": "bg-[#5865F2] text-white hover:bg-[#4752c4] shadow-sm",
        },
        linkedin: {
          brand: "bg-[#0A66C2] text-white hover:bg-[#004182] shadow-sm",
          "brand-outline": "border border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/5",
          "brand-solid": "bg-[#0A66C2] text-white hover:bg-[#004182] shadow-sm",
        },
        slack: {
          brand: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-800/80 shadow-sm",
          "brand-outline": "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50",
          "brand-solid": "bg-[#4A154B] text-white hover:bg-[#3f1040] shadow-sm",
        },
        spotify: {
          brand: "bg-[#1DB954] text-black font-semibold hover:bg-[#1ed760] shadow-sm",
          "brand-outline": "border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/5",
          "brand-solid": "bg-[#1DB954] text-black font-semibold hover:bg-[#1ed760] shadow-sm",
        },
        microsoft: {
          brand: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-800/80 shadow-sm",
          "brand-outline": "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50",
          "brand-solid": "bg-[#2f2f2f] text-white hover:bg-[#242424] shadow-sm",
        },
      };

      const defaults = brandColors[p] || brandColors.google;

      switch (variant) {
        case "brand":
          return defaults.brand;
        case "brand-outline":
          return defaults["brand-outline"];
        case "brand-solid":
          return defaults["brand-solid"];
        case "solid":
          return "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-sm";
        case "outline":
          return "border border-slate-200 bg-transparent text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/50";
        case "ghost":
          return "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50";
        default:
          return defaults.brand;
      }
    };

    // Spin loader styles
    const spinnerSizes = {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const iconSizes = {
      sm: "h-3.5 w-3.5",
      md: "h-4.5 w-4.5",
      lg: "h-5.5 w-5.5",
    };

    // Button animation variants
    const buttonVariants = animate
      ? {
          hover: { scale: 1.02, y: -1 },
          tap: { scale: 0.98 },
        }
      : {};

    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    // Component wrapper (with motion support)
    const ButtonElement = animate ? motion.button : "button";

    return (
      <ButtonElement
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseClasses,
          sizes[size],
          shapes[shape],
          getVariantClasses(),
          className
        )}
        whileHover={animate ? "hover" : undefined}
        whileTap={animate ? "tap" : undefined}
        variants={buttonVariants}
        {...props}
      >
        {loading ? (
          <svg
            className={cn("animate-spin text-current", spinnerSizes[size])}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <IconComponent className={cn("shrink-0", iconSizes[size])} />
        )}

        {/* Render text when not in icon-only mode */}
        {!isIconOnly && <span className="truncate">{renderContent()}</span>}
      </ButtonElement>
    );
  }
);
SocialButton.displayName = "SocialButton";

// Layout container grouping multiple social buttons
export const SocialButtonGroup = forwardRef(
  (
    {
      layout = "row",
      cols = 2,
      gap = "md",
      divider = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const gaps = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    };

    const containerClasses = cn(
      "w-full",
      layout === "row" && "flex flex-row flex-wrap items-center justify-center",
      layout === "col" && "flex flex-col justify-center",
      layout === "grid" && "grid",
      layout === "grid" &&
        {
          1: "grid-cols-1",
          2: "grid-cols-1 sm:grid-cols-2",
          3: "grid-cols-1 sm:grid-cols-3",
          4: "grid-cols-2 sm:grid-cols-4",
        }[cols] || "grid-cols-2",
      gaps[gap],
      className
    );

    const dividerText = typeof divider === "string" ? divider : "Or connect with";

    return (
      <div ref={ref} className="w-full flex flex-col items-center" {...props}>
        {divider && (
          <div className="w-full flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none shrink-0">
              {dividerText}
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>
        )}
        <div className={containerClasses}>{children}</div>
      </div>
    );
  }
);
SocialButtonGroup.displayName = "SocialButtonGroup";
