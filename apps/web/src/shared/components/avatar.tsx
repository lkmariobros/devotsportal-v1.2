import { cn } from "@/shared/utils/cn";

interface AvatarProps {
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  className?: string;
}

export function Avatar({ name, email, role, imageUrl, className }: AvatarProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{role}</span>
      </div>
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
