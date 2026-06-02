import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
	BriefcaseIcon,
	CompassIcon,
	MapPinIcon,
	RotateCwIcon,
	SparklesIcon,
	CheckCircle2Icon,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useJobSeekerProfile } from "@/hooks/job-seeker/useJobSeekerProfile";
import { parseSeekerSubscription } from "@/lib/job-seeker-subscription-parse";
import { useApi } from "@/hooks/useApi";
import { cn } from "@/lib/utils";

type RecommendedJob = {
	job_posting_id: number;
	title: string;
	location: string;
	type: string;
	category: string;
	matching_reason: string;
	match_percentage: number;
};

export function JobSeekerRecommendationsPage() {
	const { profile, loading, refetch } = useJobSeekerProfile();
	const [generating, setGenerating] = useState(false);
	const { post } = useApi();

	const subscription = useMemo(() => parseSeekerSubscription(profile ?? undefined), [profile]);

	const isRecommendationsSubscribed = useMemo(() => {
		if (!subscription) return false;
		const planId = subscription.plan.id;
		const title = subscription.plan.title.toLowerCase();
		return (
			planId === 2 ||
			planId === 3 ||
			title.includes("recommendation") ||
			title.includes("second") ||
			title.includes("both") ||
			title.includes("third") ||
			title.includes("ultimate")
		);
	}, [subscription]);

	const cachedRecommendations = useMemo((): RecommendedJob[] => {
		if (profile && Array.isArray(profile.job_recommendation)) {
			return profile.job_recommendation as RecommendedJob[];
		}
		return [];
	}, [profile]);

	const handleGenerateRecommendations = useCallback(async () => {
		setGenerating(true);
		try {
			const res = (await post("/api/recommendations/jobs")) as { data: RecommendedJob[] } | RecommendedJob[];
			toast.success("AI job matching completed successfully!");
			await refetch({ background: true });
		} catch (err: any) {
			const message = err?.message || "Failed to match jobs";
			toast.error(message);
		} finally {
			setGenerating(false);
		}
	}, [post, refetch]);

	const getMatchPercentageColor = (pct: number) => {
		if (pct >= 90) return "border-emerald-200/90 bg-emerald-50 text-emerald-700";
		if (pct >= 75) return "border-amber-200/90 bg-amber-50 text-amber-700";
		return "border-slate-200/90 bg-slate-50 text-slate-700";
	};

	if (loading) {
		return (
			<div className="mx-auto w-full max-w-5xl space-y-6 pb-10">
				<Skeleton className="h-40 w-full rounded-3xl" />
				<div className="grid gap-6 md:grid-cols-2">
					<Skeleton className="h-48 w-full rounded-3xl" />
					<Skeleton className="h-48 w-full rounded-3xl" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex w-full min-w-0 flex-col gap-8 pb-10">
			{/* Top Header Card */}
			<section className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm sm:px-10 sm:py-10">
				<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/7 via-transparent to-primary/5" aria-hidden />
				<div className="relative flex flex-col gap-8 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
					<div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
						<div className="flex shrink-0 size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
							<CompassIcon className="size-8" strokeWidth={1.5} />
						</div>
						<div className="min-w-0 space-y-1">
							<p className="text-xs font-semibold tracking-widest text-primary uppercase">AI Career Expert</p>
							<h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Smart Job Matches</h1>
							<p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
								Our career-advisor AI evaluates your skills, experience, and certificates against active positions in real-time.
							</p>
						</div>
					</div>
					<div className="flex shrink-0">
						<Button
							type="button"
							size="lg"
							className="rounded-xl font-semibold shadow-sm gap-2"
							disabled={!isRecommendationsSubscribed || generating}
							onClick={handleGenerateRecommendations}
						>
							{generating ? (
								<>
									<Spinner className="size-4 animate-spin" />
									Analyzing Matching Job Postings...
								</>
							) : (
								<>
									<RotateCwIcon className="size-4" />
									{cachedRecommendations.length > 0 ? "Refresh AI Matches" : "Find AI Matches"}
								</>
							)}
						</Button>
					</div>
				</div>
			</section>

			{/* Plan and Warnings Alerts */}
			{!isRecommendationsSubscribed ? (
				<Alert className="rounded-2xl border-amber-200/90 bg-amber-50 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
					<SparklesIcon className="size-4 text-amber-600" />
					<AlertTitle>Smart Job Recommendations is a Premium Feature</AlertTitle>
					<AlertDescription>
						To enable semantic matching and AI-driven job suggestions, you must have an active **Job Matching** plan (Plan 2 or 3). Please <Link to="/plans" className="underline font-semibold">upgrade your membership</Link> to get started.
					</AlertDescription>
				</Alert>
			) : null}

			{/* Main Content Area */}
			{isRecommendationsSubscribed && cachedRecommendations.length === 0 && !generating ? (
				<Card className="mx-auto w-full max-w-lg rounded-3xl border-dashed border-border/80 py-16 text-center shadow-none bg-card/50">
					<CardContent className="space-y-4">
						<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
							<SparklesIcon className="size-6" />
						</div>
						<div className="space-y-1">
							<h3 className="text-lg font-semibold text-foreground">No matches calculated yet</h3>
							<p className="text-sm text-muted-foreground">
								Click the &quot;Find AI Matches&quot; button above. The AI career advisor will process active listings and find your top semantic opportunities!
							</p>
						</div>
					</CardContent>
				</Card>
			) : isRecommendationsSubscribed && generating ? (
				<div className="space-y-6 py-10">
					<div className="flex flex-col items-center justify-center text-center gap-4">
						<Spinner className="size-10 text-primary" />
						<div className="space-y-1">
							<h3 className="text-lg font-semibold text-foreground animate-pulse">Running Semantic Search Engines</h3>
							<p className="text-sm text-muted-foreground max-w-md">
								Gemini AI is examining your profile's resume data against our repository of active job postings. We will select the top 5 high-potential opportunities for you...
							</p>
						</div>
					</div>
				</div>
			) : isRecommendationsSubscribed && cachedRecommendations.length > 0 ? (
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold tracking-tight text-foreground">Matched Job Postings ({cachedRecommendations.length})</h2>
						<p className="text-xs text-muted-foreground">Matches are computed based on skills alignment, experience levels, and certifications.</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
						{cachedRecommendations.map((job) => (
							<Card
								key={job.job_posting_id}
								className="overflow-hidden rounded-3xl border-border/80 bg-card/95 hover:border-primary/30 shadow-xs hover:shadow-md transition-all duration-300"
							>
								<CardHeader className="border-b border-border/60 bg-muted/15 px-6 py-6 sm:px-8">
									<div className="flex flex-wrap items-start justify-between gap-4">
										<div className="min-w-0 space-y-1.5">
											<div className="flex flex-wrap items-center gap-2">
												<Badge variant="outline" className="rounded-lg capitalize font-mono text-[10px] tracking-wider px-2 py-0.5">
													{job.category}
												</Badge>
												<Badge variant="outline" className="rounded-lg capitalize font-mono text-[10px] tracking-wider px-2 py-0.5">
													{job.type}
												</Badge>
											</div>
											<CardTitle className="text-xl tracking-tight leading-none hover:text-primary transition-colors">
												<Link to={`/jobs/${job.job_posting_id}`}>{job.title}</Link>
											</CardTitle>
											<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
												<MapPinIcon className="size-3.5" />
												<span>{job.location}</span>
											</div>
										</div>

										<Badge
											variant="outline"
											className={cn(
												"shrink-0 rounded-xl px-4 py-2 font-heading text-lg font-bold border-2 shadow-xs",
												getMatchPercentageColor(job.match_percentage)
											)}
										>
											{job.match_percentage}% Match
										</Badge>
									</div>
								</CardHeader>
								<CardContent className="px-6 py-6 sm:px-8 space-y-4">
									<div className="space-y-2">
										<h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
											<CheckCircle2Icon className="size-3.5 text-primary" />
											AI Recommendation Analysis
										</h4>
										<p className="text-sm leading-relaxed text-foreground/90 bg-primary/5 rounded-2xl p-4 border border-primary/10">
											{job.matching_reason}
										</p>
									</div>
								</CardContent>
								<CardFooter className="border-t border-border/60 bg-muted/5 px-6 py-4 sm:px-8 flex justify-end">
									<Button asChild variant="outline" size="sm" className="rounded-xl border-border/80">
										<Link to={`/jobs/${job.job_posting_id}`}>
											<BriefcaseIcon className="size-4" data-icon="inline-start" />
											View Details &amp; Apply
										</Link>
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}
