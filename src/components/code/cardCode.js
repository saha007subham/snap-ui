export const cardCodeString = `import { forwardRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = "Card";

Card.Header = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-2 text-lg font-bold text-slate-900", className)}
    {...props}
  >
    {children}
  </div>
));
Card.Header.displayName = "Card.Header";

Card.Body = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-slate-500 leading-relaxed", className)}
    {...props}
  >
    {children}
  </div>
));
Card.Body.displayName = "Card.Body";

Card.Footer = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 flex justify-end gap-2", className)}
    {...props}
  >
    {children}
  </div>
));
Card.Footer.displayName = "Card.Footer";
`;
