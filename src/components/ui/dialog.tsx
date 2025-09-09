import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "md:block hidden",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideCloseIcon?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, hideCloseIcon = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 focus:outline-none transition-all duration-300 ease-in-out",

        // Desktop (default) styling - centered with bottom animation
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-[512px] max-w-[85%] rounded-lg border bg-background p-6 shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:slide-out-to-bottom-8",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",

        // Mobile overrides - TRUE full screen with proper scroll
        "max-md:fixed max-md:inset-0 max-md:h-full max-md:w-full max-md:max-w-full max-md:max-h-full",
        "max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-none max-md:border-0",
        "max-md:p-0 max-md:flex max-md:flex-col max-md:overflow-y-auto",
        "max-md:data-[state=open]:slide-in-from-bottom-full max-md:data-[state=closed]:slide-out-to-bottom-full",
        "max-md:data-[state=open]:duration-500 max-md:data-[state=closed]:duration-300",

        className
      )}
      {...props}
    >
      {/* Content wrapper to handle mobile fullscreen */}
      <div className="relative w-full h-full max-md:flex max-md:flex-col max-md:justify-between">
        {/* Main content area with scrolling */}
        <div className="w-full max-md:flex-1 max-md:overflow-y-auto max-md:p-4">
          {children}
        </div>
      </div>

      {/* Close button - positioned at top right */}
      {!hideCloseIcon && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground max-md:right-3 max-md:top-3 max-md:rounded-full max-md:bg-gray-100 max-md:p-2 max-md:hover:bg-gray-200 max-md:opacity-100 max-md:z-50">
          <Cross2Icon className="size-5 max-md:size-6" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// AutoTab input hook for automatically moving focus between inputs
const useAutoTab = () => {
  const handleInput = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>, nextInputId?: string) => {
      const input = e.target as HTMLInputElement;
      const maxLength = input.maxLength;

      if (maxLength > 0 && input.value.length >= maxLength && nextInputId) {
        const nextInput = document.getElementById(
          nextInputId
        ) as HTMLInputElement | null;
        if (nextInput) {
          nextInput.focus();
        }
      }
    },
    []
  );

  return handleInput;
};

interface DialogModalProps {
  isOpen?: boolean;
  children?: React.ReactElement;
  onClose?: () => void;
  className?: string;
  hideCloseIcon?: boolean;
}

const DialogModal = ({
  isOpen,
  children,
  onClose,
  className,
  hideCloseIcon,
}: DialogModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        autoFocus={false}
        hideCloseIcon={hideCloseIcon}
        className={cn(className)}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export {
  DialogModal,
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  useAutoTab,
};
