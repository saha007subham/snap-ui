export const socialButtonUsageCode = `import { SocialButton, SocialButtonGroup } from "@/components/ui/SocialButton";

export default function SocialButtonDemo() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      
      {/* Brand Sign In Buttons */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Authentic Brand Identity</span>
        <div className="flex flex-col gap-2">
          <SocialButton provider="google" variant="brand" />
          <SocialButton provider="github" variant="brand" />
          <SocialButton provider="apple" variant="brand" />
        </div>
      </div>

      {/* Social Button Group with Divider */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Sign In Group with Divider</span>
        <SocialButtonGroup layout="grid" cols={2} gap="sm" divider="Or use social accounts">
          <SocialButton provider="google" variant="brand" mode="login" />
          <SocialButton provider="github" variant="brand" mode="login" />
          <SocialButton provider="facebook" variant="brand-solid" mode="login" />
          <SocialButton provider="discord" variant="brand-solid" mode="login" />
        </SocialButtonGroup>
      </div>

      {/* Share Actions */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Share Actions</span>
        <div className="flex flex-wrap items-center gap-2">
          <SocialButton provider="x" variant="brand" mode="share" size="sm" />
          <SocialButton provider="linkedin" variant="brand-solid" mode="share" size="sm" />
          <SocialButton provider="spotify" variant="brand-solid" mode="share" size="sm" />
        </div>
      </div>

      {/* Button Shapes & Animations */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Button Shapes</span>
        <div className="flex flex-wrap items-center gap-3">
          <SocialButton provider="google" variant="outline" shape="rounded">Rounded</SocialButton>
          <SocialButton provider="github" variant="outline" shape="pill">Pill Shape</SocialButton>
          <SocialButton provider="apple" variant="outline" shape="square">Square</SocialButton>
        </div>
      </div>

      {/* Icon Only Group */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Icon Only Buttons</span>
        <div className="flex items-center gap-3">
          <SocialButton provider="google" variant="brand" mode="icon" shape="pill" />
          <SocialButton provider="github" variant="brand" mode="icon" shape="pill" />
          <SocialButton provider="twitter" variant="brand" mode="icon" shape="pill" />
          <SocialButton provider="slack" variant="brand" mode="icon" shape="pill" />
          <SocialButton provider="microsoft" variant="brand" mode="icon" shape="pill" />
        </div>
      </div>

      {/* Sizes, Loading & Disabled States */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Sizes & States</span>
        <div className="flex flex-wrap items-center gap-3">
          <SocialButton provider="google" size="sm" loading>Small Loading</SocialButton>
          <SocialButton provider="github" size="md" loading>Loading</SocialButton>
          <SocialButton provider="twitter" size="lg" disabled>Disabled X</SocialButton>
        </div>
      </div>

    </div>
  );
}
`;
