import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Lightbulb,
  CheckSquare,
  PlayCircle,
  FileText,
  RefreshCw,
  Shield,
  DollarSign,
  Search,
  Filter,
  AlertTriangle,
  Clock3,
  ChevronRight,
  Activity,
  BarChart3,
  Server,
  Brain,
  HandCoins,
  Undo2,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const navItems = [
  { id: "control-tower", label: "Control Tower", icon: LayoutDashboard },
  { id: "recommendations", label: "Recommendations", icon: Lightbulb },
  { id: "approvals", label: "Approvals", icon: CheckSquare },
  { id: "executions", label: "Executions", icon: PlayCircle },
  { id: "renewals", label: "Renewals", icon: FileText },
  { id: "open-alternatives", label: "Open Alternatives", icon: RefreshCw },
];

const kpis = [
  { label: "Total Spend", value: "$4.8M", delta: "-3.2% vs last quarter", icon: DollarSign },
  { label: "Identified Savings", value: "$682K", delta: "42 active recommendations", icon: Lightbulb },
  { label: "Realized Savings", value: "$188K", delta: "YTD", icon: CheckSquare },
  { label: "Pending Approvals", value: "14", delta: "5 due today", icon: Clock3 },
  { label: "Active Risks", value: "6", delta: "2 need review", icon: Shield },
  { label: "Renewal Exposure", value: "$1.1M", delta: "next 90 days", icon: HandCoins },
];

const spendTrend = [
  { month: "Jan", spend: 410, savings: 18 },
  { month: "Feb", spend: 435, savings: 22 },
  { month: "Mar", spend: 448, savings: 31 },
  { month: "Apr", spend: 420, savings: 46 },
  { month: "May", spend: 408, savings: 54 },
  { month: "Jun", spend: 395, savings: 63 },
];

const categorySavings = [
  { category: "SaaS", value: 260 },
  { category: "Cloud", value: 190 },
  { category: "LLM", value: 120 },
  { category: "Vendor", value: 112 },
];

const recommendations = [
  {
    id: "rec-101",
    title: "Reduce 180 inactive ExampleCRM seats",
    category: "SaaS",
    vendor: "ExampleCRM",
    team: "Revenue Operations",
    risk: "Low",
    confidence: "High",
    status: "Awaiting Approval",
    savings: "$86,400",
    implCost: "$2,000",
    payback: "9 days",
    issue: "214 inactive seats detected over 60+ days",
    evidence: [
      "No login activity detected for 68 days across 214 paid seats",
      "180 seats tied to inactive users or departed employees",
      "34 seats show light usage and fit lower-cost plan tier",
    ],
    skeptic: [
      "Validate whether quarter-end seasonality affects revops usage",
      "Notify team leads before bulk license changes",
    ],
    rollback: [
      "Restore removed seats from latest license snapshot",
      "Reassign previous plan tier within 1 business day",
    ],
    approvals: ["RevOps Manager"],
    impact: "Revenue tooling",
  },
  {
    id: "rec-102",
    title: "Schedule non-prod Kubernetes clusters overnight",
    category: "Cloud",
    vendor: "AWS",
    team: "Platform Engineering",
    risk: "Medium",
    confidence: "High",
    status: "In Review",
    savings: "$142,000",
    implCost: "$12,500",
    payback: "32 days",
    issue: "Staging and QA clusters running 24x7 with low overnight usage",
    evidence: [
      "CPU utilization under 8% from 11 PM to 7 AM local time",
      "Four clusters tagged as non-production still running full node pools",
      "No overnight deployment windows in last 45 days",
    ],
    skeptic: [
      "Confirm on-call runbooks do not depend on staging availability overnight",
      "Add warm-start test before enabling automation",
    ],
    rollback: [
      "Restore prior autoscaling schedule",
      "Restart full node pools and run health checks",
    ],
    approvals: ["Engineering Owner", "Security Reviewer"],
    impact: "Non-production infra",
  },
  {
    id: "rec-103",
    title: "Route FAQ prompts to smaller model with cache",
    category: "LLM",
    vendor: "OpenAI / Gateway",
    team: "Support Automation",
    risk: "Low",
    confidence: "Medium",
    status: "Drafted",
    savings: "$58,000",
    implCost: "$6,000",
    payback: "38 days",
    issue: "High-cost model used for repetitive customer FAQ flows",
    evidence: [
      "62% of prompts are near-duplicate FAQ requests",
      "Average prompt tokens exceed needed context length by 47%",
      "Premium model selected for low-complexity classification and retrieval tasks",
    ],
    skeptic: [
      "Run quality A/B before full routing switch",
      "Keep escalation path to larger model for edge cases",
    ],
    rollback: [
      "Return routing policy to baseline premium model",
      "Clear stale cache keys and restore previous prompt template",
    ],
    approvals: ["Workflow Owner"],
    impact: "Customer support AI",
  },
];

const approvals = [
  {
    id: "apr-1",
    title: "Reduce ExampleCRM seats",
    role: "RevOps Manager",
    due: "Today, 5:00 PM",
    risk: "Low",
    savings: "$86,400",
    status: "Pending",
    recommendationId: "rec-101",
  },
  {
    id: "apr-2",
    title: "Schedule non-prod clusters overnight",
    role: "Engineering Owner",
    due: "Tomorrow, 11:00 AM",
    risk: "Medium",
    savings: "$142,000",
    status: "Pending",
    recommendationId: "rec-102",
  },
  {
    id: "apr-3",
    title: "Replace internal wiki SaaS",
    role: "Security Reviewer",
    due: "Escalated",
    risk: "High",
    savings: "$34,500",
    status: "Escalated",
    recommendationId: "rec-101",
  },
];

const executions = [
  {
    id: "exe-4401",
    recommendation: "Archive dormant design-tool seats",
    mode: "Controlled Live Run",
    status: "Completed",
    owner: "IT Ops",
    started: "09:30",
    completed: "09:42",
    steps: [
      { label: "Notify owners", done: true },
      { label: "Remove 48 seats", done: true },
      { label: "Verify access integrity", done: true },
    ],
  },
  {
    id: "exe-4402",
    recommendation: "Night schedule for QA clusters",
    mode: "Manual After Approval",
    status: "Running",
    owner: "Platform Eng",
    started: "10:15",
    completed: "—",
    steps: [
      { label: "Drain non-critical pods", done: true },
      { label: "Scale node pools", done: false },
      { label: "Run verification", done: false },
    ],
  },
  {
    id: "exe-4403",
    recommendation: "Rollback analytics config change",
    mode: "Rollback",
    status: "Rolled Back",
    owner: "Data Platform",
    started: "Yesterday",
    completed: "Yesterday",
    steps: [
      { label: "Restore config snapshot", done: true },
      { label: "Revalidate pipeline", done: true },
      { label: "Notify impacted team", done: true },
    ],
  },
];

const renewals = [
  {
    vendor: "ExampleCRM",
    endDate: "2026-06-30",
    autoRenew: "Yes",
    annualCommit: "$420,000",
    owner: "Procurement",
    recommendation: "Renegotiate seat commitment based on 27% underutilization",
  },
  {
    vendor: "CloudMetrics Pro",
    endDate: "2026-05-15",
    autoRenew: "No",
    annualCommit: "$110,000",
    owner: "Platform Eng",
    recommendation: "Compare against self-hosted observability stack",
  },
  {
    vendor: "KnowledgeHub",
    endDate: "2026-07-12",
    autoRenew: "Yes",
    annualCommit: "$76,000",
    owner: "IT",
    recommendation: "Evaluate OSS wiki migration",
  },
];

const openAlternatives = [
  {
    current: "KnowledgeHub",
    option: "Open-source wiki stack",
    tco: "-58%",
    risk: "Low",
    action: "Review",
    notes: "Good fit for internal docs and policy content",
  },
  {
    current: "CloudMetrics Pro",
    option: "Self-hosted observability stack",
    tco: "-34%",
    risk: "Medium",
    action: "Review",
    notes: "Needs SRE ownership and storage sizing",
  },
  {
    current: "FAQ AI Premium",
    option: "Hybrid small-model gateway",
    tco: "-41%",
    risk: "Medium",
    action: "Review",
    notes: "Requires routing policy + evaluation harness",
  },
];

const badgeTone = {
  Low: "secondary",
  Medium: "outline",
  High: "destructive",
  Pending: "outline",
  Completed: "secondary",
  Running: "outline",
  "Rolled Back": "destructive",
  Escalated: "destructive",
};

function AppShell({ active, setActive, children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r bg-white/80 backdrop-blur">
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="rounded-2xl bg-slate-900 p-2 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500">Autonomyx</div>
              <div className="text-lg font-semibold">Optimize</div>
            </div>
          </div>
          <nav className="space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    selected ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-3">
            <Card className="rounded-2xl border-slate-200 bg-slate-50 shadow-none">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4" /> Governance Status
                </div>
                <div className="text-sm text-slate-600">
                  SoD enforcement active. 14 actions currently blocked pending approval.
                </div>
                <Progress value={78} />
                <div className="text-xs text-slate-500">78% of savings opportunities fully governed</div>
              </CardContent>
            </Card>
          </div>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

function TopBar({ title, subtitle, search, setSearch }) {
  return (
    <div className="sticky top-0 z-10 border-b bg-white/85 backdrop-blur">
      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" placeholder="Search" />
          </div>
          <Button variant="outline" className="gap-2 rounded-2xl">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">{kpi.label}</span>
                  <div className="rounded-2xl bg-slate-100 p-2">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-semibold tracking-tight">{kpi.value}</div>
                <div className="mt-1 text-xs text-slate-500">{kpi.delta}</div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

function ControlTower({ onOpenRecommendation }) {
  return (
    <div className="space-y-6 p-6">
      <StatGrid />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Spend Trend</CardTitle>
            <CardDescription>Spend vs identified savings over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spend" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="savings" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Savings by Category</CardTitle>
            <CardDescription>Annualized opportunity currently in pipeline</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySavings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Recommendations</CardTitle>
              <CardDescription>Highest-value opportunities ranked by savings and confidence</CardDescription>
            </div>
            <Button variant="outline" className="rounded-2xl" onClick={() => onOpenRecommendation(recommendations[0].id)}>
              Open Workspace
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recommendation</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Savings</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recommendations.map((rec) => (
                  <TableRow key={rec.id} className="cursor-pointer" onClick={() => onOpenRecommendation(rec.id)}>
                    <TableCell>
                      <div className="font-medium">{rec.title}</div>
                      <div className="text-xs text-slate-500">{rec.team}</div>
                    </TableCell>
                    <TableCell>{rec.category}</TableCell>
                    <TableCell>{rec.savings}</TableCell>
                    <TableCell>
                      <Badge variant={badgeTone[rec.risk] || "secondary"}>{rec.risk}</Badge>
                    </TableCell>
                    <TableCell>{rec.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Approval Queue Snapshot</CardTitle>
              <CardDescription>Items requiring human decision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {approvals.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.role}</div>
                    </div>
                    <Badge variant={badgeTone[item.status] || "outline"}>{item.status}</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                    <span>{item.savings}</span>
                    <span>{item.due}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
              <CardDescription>Latest governed actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {executions.map((exe) => (
                <div key={exe.id} className="rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium">{exe.recommendation}</div>
                    <Badge variant={badgeTone[exe.status] || "outline"}>{exe.status}</Badge>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{exe.owner} · {exe.mode}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RecommendationWorkspace({ selected, onSelect }) {
  const rec = recommendations.find((r) => r.id === selected) || recommendations[0];

  return (
    <div className="grid gap-6 p-6 xl:grid-cols-[320px_1fr]">
      <Card className="rounded-3xl border-0 shadow-sm xl:sticky xl:top-24 xl:h-[calc(100vh-8rem)]">
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Explore evidence, simulation, approvals, and audit details</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[65vh] xl:h-[calc(100vh-14rem)]">
            <div className="space-y-2 px-4 pb-4">
              {recommendations.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                    rec.id === item.id ? "border-slate-900 bg-slate-900 text-white" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="font-medium">{item.title}</div>
                  <div className={`mt-1 text-xs ${rec.id === item.id ? "text-slate-300" : "text-slate-500"}`}>
                    {item.category} · {item.savings}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-2xl">{rec.title}</CardTitle>
                <CardDescription className="mt-2">{rec.issue}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{rec.category}</Badge>
                <Badge variant={badgeTone[rec.risk] || "secondary"}>{rec.risk} Risk</Badge>
                <Badge variant="outline">{rec.confidence} Confidence</Badge>
                <Badge variant="outline">{rec.status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
              <div className="space-y-6">
                <InfoCard title="Evidence">
                  <ul className="space-y-3 text-sm text-slate-600">
                    {rec.evidence.map((item) => (
                      <li key={item} className="flex gap-3"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />{item}</li>
                    ))}
                  </ul>
                </InfoCard>
                <InfoCard title="Skeptic / Challenge Notes">
                  <ul className="space-y-3 text-sm text-slate-600">
                    {rec.skeptic.map((item) => (
                      <li key={item} className="flex gap-3"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{item}</li>
                    ))}
                  </ul>
                </InfoCard>
                <InfoCard title="Rollback Plan">
                  <ul className="space-y-3 text-sm text-slate-600">
                    {rec.rollback.map((item) => (
                      <li key={item} className="flex gap-3"><Undo2 className="mt-0.5 h-4 w-4 shrink-0" />{item}</li>
                    ))}
                  </ul>
                </InfoCard>
              </div>
              <div className="space-y-6">
                <Card className="rounded-3xl border bg-slate-50 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-base">Financial Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <MetricRow label="Projected annual savings" value={rec.savings} />
                    <MetricRow label="Implementation cost" value={rec.implCost} />
                    <MetricRow label="Payback" value={rec.payback} />
                    <MetricRow label="Impact area" value={rec.impact} />
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border bg-slate-50 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-base">Required Approvals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rec.approvals.map((role) => (
                      <div key={role} className="flex items-center justify-between rounded-2xl border bg-white px-3 py-3 text-sm">
                        <span>{role}</span>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border bg-slate-50 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-base">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full rounded-2xl">Request Approval</Button>
                    <Button variant="outline" className="w-full rounded-2xl">Run Simulation</Button>
                    <Button variant="outline" className="w-full rounded-2xl">Export Memo</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="p-6">
            <Tabs defaultValue="simulation">
              <TabsList className="grid w-full grid-cols-4 rounded-2xl">
                <TabsTrigger value="simulation">Simulation</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
                <TabsTrigger value="execution">Execution</TabsTrigger>
                <TabsTrigger value="audit">Audit Log</TabsTrigger>
              </TabsList>
              <TabsContent value="simulation" className="mt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <MiniStat label="Best Case" value={rec.savings} />
                  <MiniStat label="Base Case" value={rec.savings} />
                  <MiniStat label="Worst Case" value={"-18% vs base"} />
                </div>
              </TabsContent>
              <TabsContent value="approvals" className="mt-6">
                <div className="space-y-3">
                  {rec.approvals.map((role, idx) => (
                    <div key={role} className="flex items-center justify-between rounded-2xl border p-4">
                      <div>
                        <div className="font-medium">Stage {idx + 1}</div>
                        <div className="text-sm text-slate-500">{role}</div>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="execution" className="mt-6">
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl border p-4">Execution preview available after all approvals are complete.</div>
                </div>
              </TabsContent>
              <TabsContent value="audit" className="mt-6">
                <div className="space-y-3 text-sm">
                  <AuditRow actor="saas_cost_analyst" action="created recommendation" time="09:04" />
                  <AuditRow actor="skeptic_agent" action="appended challenge notes" time="09:11" />
                  <AuditRow actor="policy_engine" action="determined manager approval required" time="09:12" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ApprovalsView({ selected, onSelect }) {
  const current = approvals.find((a) => a.id === selected) || approvals[0];
  const rec = recommendations.find((r) => r.id === current.recommendationId) || recommendations[0];
  const [comment, setComment] = useState("Proceed after notifying impacted team leads.");

  return (
    <div className="grid gap-6 p-6 xl:grid-cols-[340px_1fr]">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Approval List</CardTitle>
          <CardDescription>My queue, due dates, escalations, and risk context</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {approvals.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                current.id === item.id ? "border-slate-900 bg-slate-900 text-white" : "bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className={`mt-1 text-xs ${current.id === item.id ? "text-slate-300" : "text-slate-500"}`}>
                    {item.role} · {item.due}
                  </div>
                </div>
                <Badge variant={badgeTone[item.risk] || "outline"}>{item.risk}</Badge>
              </div>
              <div className={`mt-2 text-sm ${current.id === item.id ? "text-slate-200" : "text-slate-600"}`}>
                {item.savings}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>{current.title}</CardTitle>
              <CardDescription>Approval workspace with evidence, savings, risks, and rollback plan</CardDescription>
            </div>
            <Badge variant={badgeTone[current.status] || "outline"}>{current.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <MiniStat label="Savings" value={current.savings} />
            <MiniStat label="Risk" value={current.risk} />
            <MiniStat label="Approver" value={current.role} />
            <MiniStat label="Due" value={current.due} />
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <div className="space-y-6">
              <InfoCard title="Why this matters">
                <p className="text-sm text-slate-600">{rec.issue}</p>
              </InfoCard>
              <InfoCard title="Evidence">
                <ul className="space-y-3 text-sm text-slate-600">
                  {rec.evidence.map((item) => (
                    <li key={item} className="flex gap-3"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />{item}</li>
                  ))}
                </ul>
              </InfoCard>
              <InfoCard title="Rollback plan">
                <ul className="space-y-3 text-sm text-slate-600">
                  {rec.rollback.map((item) => (
                    <li key={item} className="flex gap-3"><Undo2 className="mt-0.5 h-4 w-4 shrink-0" />{item}</li>
                  ))}
                </ul>
              </InfoCard>
            </div>
            <div className="space-y-6">
              <Card className="rounded-3xl border bg-slate-50 shadow-none">
                <CardHeader>
                  <CardTitle className="text-base">Decision Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea value={comment} onChange={(e) => setComment(e.target.value)} className="min-h-[180px]" />
                </CardContent>
              </Card>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button className="rounded-2xl">Approve</Button>
                <Button variant="destructive" className="rounded-2xl">Reject</Button>
                <Button variant="outline" className="rounded-2xl">Defer</Button>
                <Button variant="outline" className="rounded-2xl">Escalate</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExecutionsView() {
  const [selected, setSelected] = useState(executions[0].id);
  const current = executions.find((e) => e.id === selected) || executions[0];
  return (
    <div className="grid gap-6 p-6 xl:grid-cols-[360px_1fr]">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Execution Jobs</CardTitle>
          <CardDescription>Queued, running, completed, failed, and rolled-back jobs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {executions.map((exe) => (
            <button
              key={exe.id}
              onClick={() => setSelected(exe.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                current.id === exe.id ? "border-slate-900 bg-slate-900 text-white" : "bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">{exe.recommendation}</div>
                <Badge variant={badgeTone[exe.status] || "outline"}>{exe.status}</Badge>
              </div>
              <div className={`mt-1 text-xs ${current.id === exe.id ? "text-slate-300" : "text-slate-500"}`}>
                {exe.mode} · {exe.owner}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>{current.recommendation}</CardTitle>
          <CardDescription>{current.id} · {current.mode}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <MiniStat label="Status" value={current.status} />
            <MiniStat label="Owner" value={current.owner} />
            <MiniStat label="Started" value={current.started} />
            <MiniStat label="Completed" value={current.completed} />
          </div>
          <InfoCard title="Execution Plan">
            <div className="space-y-3">
              {current.steps.map((step) => (
                <div key={step.label} className="flex items-center justify-between rounded-2xl border p-4 text-sm">
                  <span>{step.label}</span>
                  <Badge variant={step.done ? "secondary" : "outline"}>{step.done ? "Done" : "Pending"}</Badge>
                </div>
              ))}
            </div>
          </InfoCard>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-2xl">Pause</Button>
            <Button variant="outline" className="rounded-2xl">View Logs</Button>
            <Button variant="destructive" className="rounded-2xl">Rollback</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RenewalsView() {
  return (
    <div className="space-y-6 p-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Renewal Intelligence</CardTitle>
          <CardDescription>Upcoming contracts, exposure, and negotiation guidance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Auto Renew</TableHead>
                <TableHead>Annual Commit</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renewals.map((row) => (
                <TableRow key={row.vendor}>
                  <TableCell className="font-medium">{row.vendor}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>{row.autoRenew}</TableCell>
                  <TableCell>{row.annualCommit}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.recommendation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function OpenAlternativesView() {
  return (
    <div className="space-y-6 p-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Open Alternative Advisor</CardTitle>
          <CardDescription>Compare current tools with open-source or self-hosted replacements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Current Tool</TableHead>
                <TableHead>Open Option</TableHead>
                <TableHead>TCO Delta</TableHead>
                <TableHead>Migration Risk</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openAlternatives.map((row) => (
                <TableRow key={row.current}>
                  <TableCell className="font-medium">{row.current}</TableCell>
                  <TableCell>{row.option}</TableCell>
                  <TableCell>{row.tco}</TableCell>
                  <TableCell><Badge variant={badgeTone[row.risk] || "outline"}>{row.risk}</Badge></TableCell>
                  <TableCell>{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border bg-white px-3 py-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function AuditRow({ actor, action, time }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-4">
      <div className="flex items-center gap-3">
        <Activity className="h-4 w-4" />
        <div>
          <div className="font-medium">{actor}</div>
          <div className="text-sm text-slate-500">{action}</div>
        </div>
      </div>
      <div className="text-sm text-slate-500">{time}</div>
    </div>
  );
}

export default function AutonomyxOptimizeFrontendSpec() {
  const [active, setActive] = useState("control-tower");
  const [search, setSearch] = useState("");
  const [selectedRec, setSelectedRec] = useState(recommendations[0].id);
  const [selectedApproval, setSelectedApproval] = useState(approvals[0].id);

  const titleMap = useMemo(
    () => ({
      "control-tower": ["Control Tower", "Unified cost visibility, governed savings, and active risk overview."],
      recommendations: ["Recommendation Workspace", "Evidence-backed optimization ideas with challenge review and approval context."],
      approvals: ["Approval Inbox", "Human-in-the-loop review with financial impact, risk, and rollback clarity."],
      executions: ["Execution Center", "Track governed actions, verification, and rollback safety."],
      renewals: ["Renewal Intelligence", "Contract exposure, negotiation leverage, and renewal planning."],
      "open-alternatives": ["Open Alternative Advisor", "Evaluate open-source and self-hosted replacement opportunities."],
    }),
    []
  );

  const [title, subtitle] = titleMap[active];

  return (
    <AppShell active={active} setActive={setActive}>
      <TopBar title={title} subtitle={subtitle} search={search} setSearch={setSearch} />
      {active === "control-tower" && <ControlTower onOpenRecommendation={(id) => { setSelectedRec(id); setActive("recommendations"); }} />}
      {active === "recommendations" && <RecommendationWorkspace selected={selectedRec} onSelect={setSelectedRec} />}
      {active === "approvals" && <ApprovalsView selected={selectedApproval} onSelect={setSelectedApproval} />}
      {active === "executions" && <ExecutionsView />}
      {active === "renewals" && <RenewalsView />}
      {active === "open-alternatives" && <OpenAlternativesView />}
    </AppShell>
  );
}
