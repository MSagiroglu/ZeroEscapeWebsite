type LogoBg = "dark" | "light"

interface ExperienceLogoProps {
  logoUrl: string
  company: string
  logoBg?: LogoBg
  fallbackUrl?: string
}

export function ExperienceLogo({ logoUrl, company, logoBg = "light", fallbackUrl }: ExperienceLogoProps) {
  const isDark = logoBg === "dark"

  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border p-2 md:h-16 md:w-16 ${
        isDark
          ? "border-border bg-[#0A0A0A]"
          : "border-border bg-white"
      }`}
    >
      <img
        src={logoUrl}
        alt={`${company} logo`}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => {
          if (fallbackUrl) (e.currentTarget as HTMLImageElement).src = fallbackUrl
        }}
      />
    </div>
  )
}
