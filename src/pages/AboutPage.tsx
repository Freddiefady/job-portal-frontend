import heroImage from "@/assets/hero.jpg"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EyeIcon, GraduationCapIcon, TargetIcon } from "lucide-react"

export function AboutPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-linear-to-b from-muted/40 via-background to-muted/20">
      <section
        className="relative isolate min-h-[min(56vh,480px)] w-full overflow-hidden border-b border-border/60"
        aria-labelledby="about-hero-heading"
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-primary/25 via-primary/5 to-transparent"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border/80 to-transparent" />

        <div className="container relative mx-auto flex min-h-[min(56vh,480px)] w-full flex-col justify-end px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Empowering Inclusive Employment Through Technology
          </p>
          <h1
            id="about-hero-heading"
            className="mt-2 font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
          >
            Opportix is a full-stack employment platform designed to connect companies with job seekers
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            especially individuals with disabilities—through an accessible, intelligent, and inclusive hiring experience. Developed as our graduation project, the platform demonstrates how modern technologies can support equal employment opportunities while simplifying the recruitment process for both employers and candidates.
          </p>
        </div>
      </section>

      <section
        className="container relative mx-auto w-full px-4 py-14 sm:px-8 sm:py-16 lg:py-20"
        aria-labelledby="about-intro-heading"
      >
        <div className="pointer-events-none absolute -left-24 top-20 size-64 rounded-full bg-primary/8 blur-3xl sm:size-80" />
        <div className="relative space-y-6">
          <h2
            id="about-intro-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            About this project
          </h2>
          <div className="space-y-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Opportix was built to address challenges faced by job seekers with disabilities when searching for suitable employment opportunities. By creating a platform that emphasizes accessibility and inclusivity, we aim to provide a more equitable job search experience. The project was developed as part of our graduation requirements, allowing us to apply our skills in software design, user experience, and responsible handling of user flows in a real-world context.
            </p>
          </div>
        </div>
      </section>

      <section
        className="container relative mx-auto w-full px-4 pb-16 sm:px-8 sm:pb-20 lg:pb-24"
        aria-labelledby="mission-vision-heading"
      >
        <h2 id="mission-vision-heading" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Card className="overflow-hidden rounded-3xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/15 px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <TargetIcon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 space-y-1">
                  <CardTitle className="text-xl sm:text-2xl">Project mission</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    What we set out to demonstrate
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-7 text-pretty text-sm leading-relaxed text-muted-foreground sm:px-8 sm:py-8 sm:text-base">
              <p>
               Our mission is to leverage technology to reduce employment barriers and promote workplace inclusion by qualifications, and needs while enabling companies to build more diverse and inclusive teams.

Through Opportix, we aim to demonstrate how thoughtful software design can contribute to social impact while maintaining professional standards in security, usability, and scalability.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-3xl border-border/70 bg-card/95 shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/15 px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <EyeIcon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 space-y-1">
                  <CardTitle className="text-xl sm:text-2xl">Project vision</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Where we hope this work leads us
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-7 text-pretty text-sm leading-relaxed text-muted-foreground sm:px-8 sm:py-8 sm:text-base">
              <p>
                We envision a future where employment platforms are designed with accessibility and inclusion as core principles rather than optional features. Opportix represents a step toward that vision by showcasing how technology, artificial intelligence, and user-centered design can work together to create fairer hiring experiences for everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden rounded-3xl border-dashed border-border/80 bg-muted/15 shadow-none sm:mt-10">
          <CardContent className="flex flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-center sm:gap-6 sm:py-12">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCapIcon className="size-6" aria-hidden />
            </div>
            <p className="min-w-0 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-left sm:text-base">
              <span className="font-medium text-foreground">Note:</span>{" "}
              Opportix is for coursework and demonstration. Data may be reset,
              and the system should not be relied on for real hiring decisions.
              Feedback from supervisors and visitors helps us document lessons
              learned and next steps we would take with more time.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
