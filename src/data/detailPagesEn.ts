import type { DetailPage } from "./detailPages";

const page = (
  slug: string, eyebrow: string, title: string, description: string,
  problemTitle: string, problem: string, sectionTitle: string,
  items: [string, string][], benefits: string[]
): DetailPage => ({
  slug, eyebrow, title, description, problemTitle, problem, sectionTitle,
  items: items.map(([title, text]) => ({ title, text })), benefits
});

export const solutionPagesEn: DetailPage[] = [
  page("edge", "Distributed sites. Always on.",
    "Resilient connectivity for every site in your distributed footprint.",
    "We build on your existing connectivity, add independent backup, and bond it with SuperWAN into one always-on connection with automatic failover.",
    "When distributed sites go offline, your business stops.",
    "ATMs, branches, stores, franchise sites, and remote facilities need continuity. One network per site and manual failover are an accepted vulnerability, not a strategy.",
    "Resilience in layers, sized to each site.",
    [["Keep what works", "Your existing infrastructure remains the base, with no new IPs or configuration changes."], ["Independent backup", "LTE, 5G, or Starlink LEO runs on separate infrastructure."], ["SuperWAN", "Managed CPE bonds available links with automatic hot failover."], ["Managed 24/7", "Per-site design, hardware on loan, NOC monitoring, and full lifecycle management."]],
    ["Up to 99.97% availability per site", "Multi-network resilience", "Automatic failover", "Pilot from 1–5 sites", "Nationwide rollout"]),
  page("core", "For complex, multi-provider estates.",
    "One accountable management layer across your entire network.",
    "Managed SD-WAN and orchestration across your WAN. Keep your providers; we orchestrate traffic, govern SLAs, and deliver auditable performance data.",
    "A fragmented provider estate with no single point of accountability.",
    "Dozens or hundreds of sites, contracts, and support processes leave IT coordinating providers and relying on redundancy that may share the same physical path.",
    "A managed overlay across your whole estate.",
    [["Orchestration", "Application-aware routing and intelligent failover across existing providers."], ["One accountable layer", "Performance, incident response, and SLA governance under one team."], ["Auditable reporting", "Monthly provider data to enforce SLAs and charge back underperformance."], ["Verified diversity", "Physical path separation at critical aggregation points."]],
    ["99.99% estate SLA", "Centralized governance", "Provider accountability", "Zero-downtime deployment"]),
  page("telco-as-a-service", "Connectivity is a balance sheet decision.",
    "We audit and restructure your full telecom spend, then govern it continuously.",
    "We map every link, contract, and cost, surface redundant or underperforming spend, and rebuild the architecture around what the business needs.",
    "No one is proactively managing your telco stack.",
    "Inherited contracts, silent SLA leakage, redundant links, and per-site firewall costs leave enterprises overpaying or underperforming.",
    "Structured strategic sourcing in four phases.",
    [["Diagnosis", "Inventory every link, contract, cost, and SLA."], ["Benchmarking", "Quantify leakage, underperformance, and consolidation opportunities."], ["Restructuring", "Renegotiate, source, and re-architect using savings to fund transition."], ["Continuous governance", "Monitor every provider so the savings and performance hold."]],
    ["Typical 15–30% spend reduction", "Spend baseline", "Savings analysis", "Restructuring plan", "Governance model"]),
  page("iot-sim", "Devices and machines, not sites.",
    "Managed connectivity for your device fleet. IoT sensors for the variables that matter.",
    "Managed SIM and eSIM at scale through our MVNO, with real-time monitoring, plan optimization, IMEI lock, and full lifecycle.",
    "Your device fleet is growing. Your SIM management is not.",
    "Spreadsheets and separate provider portals break when hundreds or thousands of terminals, sensors, ATMs, trackers, and machines must stay connected.",
    "SIM and sensor lifecycle, fully managed.",
    [["SIM and eSIM at scale", "Bulk provisioning, remote activation, and multi-carrier eSIM."], ["Monitoring", "Real-time alerts for spikes, silent devices, and plan limits."], ["Optimization and control", "Usage-based plans, IMEI lock, suspension, and replacement."], ["IoT sensors", "Temperature, presence, pressure, equipment status, and asset location."]],
    ["Centralized fleet control", "Lower data spend", "Proactive detection", "Full lifecycle management"])
];

export const industryPagesEn: DetailPage[] = [
  page("financial-services", "For banking infrastructure leaders", "Financial Services",
    "Resilient connectivity for ATMs, branches, and transaction infrastructure, where downtime means lost revenue and audit exposure.",
    "When ATMs go offline, transactions stop. Revenue stops. Audit exposure starts.",
    "Buyers come to us after a peak-hour outage, during a national rollout, or when audit exposes SLA and spend gaps.",
    "Use cases",
    [["ATM and branch connectivity → Edge", "SuperWAN adds independent paths and automatic failover at every site."], ["Estate orchestration → Core", "One accountable SD-WAN and SLA governance layer across the banking network."], ["Reference deployment", "A national ATM pilot scaled beyond one thousand sites with 99.97% availability."]],
    ["Pilot 30–50 sites", "Regulatory reporting", "Faster incident response"]),
  page("retail-franchise", "For retail and franchise leaders", "Retail and Franchise Chains",
    "Resilient connectivity for stores, franchises, POS, ordering, inventory, and distribution operations.",
    "When stores go offline, transactions stop. Customers leave. Franchisees complain.",
    "Buyers call after peak-weekend POS failures, during expansion, or when connectivity complaints reach corporate.",
    "Use cases",
    [["Store connectivity → Edge", "Independent backup and SuperWAN protect every revenue-generating location."], ["WAN orchestration → Core", "Unified monitoring, SLA, and provider accountability across the estate."], ["Reference deployment", "Multi-location clients expanded resilient connectivity across stores and regional hubs."]],
    ["Pilot 10–20 stores", "POS continuity", "Unified visibility"]),
  page("energy-industrial", "For energy and industrial operators", "Energy and Industrial",
    "Resilient connectivity for remote sites, SCADA, safety systems, and sensor networks.",
    "When remote sites lose connectivity, you lose operational visibility and control.",
    "Buyers call after operational disruption, failed compliance monitoring, or expansion into poorly served geographies.",
    "Use cases",
    [["Remote sites → Edge", "Starlink LEO and cellular bonded with SuperWAN keep critical operations online."], ["Sensors → IoT and SIM", "Managed connectivity and lifecycle for telemetry and equipment fleets."], ["Reference deployment", "Remote plants moved from hours of downtime to automatic failover in seconds."]],
    ["Continuous SCADA", "Safety visibility", "Faster activation"]),
  page("payments-infrastructure", "For payments infrastructure leaders", "Payments Infrastructure",
    "Managed connectivity for terminal fleets and processing infrastructure where every failed connection is lost revenue.",
    "Your terminal fleet is growing. Your SIM management is not. Processing cannot fail.",
    "Buyers call when manual SIM management breaks, merchants escalate, or a processing outage affects the whole network.",
    "Use cases",
    [["Terminal fleets → IoT and SIM", "Multi-carrier eSIM, provisioning, monitoring, optimization, and IMEI lock."], ["Processing resilience → Core", "Physically diverse paths, active-active balancing, and automatic failover."], ["Reference deployment", "A payments operator cut data costs and accelerated terminal activation."]],
    ["Fleet control", "Continuous processing", "Proactive alerts"]),
  page("logistics-cold-chain", "For logistics and supply-chain leaders", "Logistics and Cold Chain",
    "Resilient connectivity for distribution centers, cross docks, last-mile hubs, and cold storage.",
    "When a hub loses connectivity, the supply chain stalls. When cold storage goes blind, inventory spoils.",
    "Buyers call after WMS or TMS disruption, refrigeration blind spots, or when a new footprint must be online from day one.",
    "Use cases",
    [["Hubs and warehouses → Edge", "Multi-network connectivity keeps WMS, TMS, scanners, and dispatch online."], ["Cold-chain monitoring → IoT and SIM", "Managed sensors continuously report temperature and refrigeration status."], ["Reference deployment", "Distributed warehousing gained centralized visibility and resilient site connectivity."]],
    ["WMS/TMS continuity", "Cold-chain monitoring", "Day-one connectivity"])
];

export const platformPagesEn: DetailPage[] = [
  page("air-connect", "The platform behind every engagement", "AIr Connect: every site, device, and network in one platform.",
    "Real-time monitoring, intelligent routing, proactive incident response, and consolidated reporting across your footprint.",
    "A platform, not a product.",
    "AIr Connect powers our managed service and gives you one view of uptime, performance, incidents, providers, SIMs, sensors, and cost.",
    "Enter. Design. Deploy. Manage and expand.",
    [["Enter", "Start with the free Telco audit or a specific operational need."], ["Design", "Build the optimal network and technology mix from your data."], ["Deploy", "Activate hardware, networks, and monitoring without interrupting operations."], ["Manage and expand", "Continuously monitor, optimize, and scale."]],
    ["Full estate visibility", "Proactive incident response", "Consolidated SLA reporting"])
];

export const auditPagesEn: DetailPage[] = [
  page("telco-audit", "Free. No commitment. Written report.", "Find out exactly where connectivity is costing you money.",
    "We analyze your infrastructure, quantify downtime cost, and recommend a specific architecture within two weeks.",
    "You probably do not know what connectivity actually costs.",
    "The bill is only one line item. Failed transactions, lost revenue, escalations, manual fallback, and silent SLA leakage are the real cost.",
    "Five components. Two weeks. One report.",
    [["Contracts and spend", "Map every site, network, term, and monthly cost."], ["Redundancy and SLA", "Find single points of failure and compare purchased versus delivered performance."], ["Hardware lifecycle", "Identify aging CPE and avoidable capex."], ["Business case", "Receive a vulnerability map, downtime model, architecture recommendation, and TCO comparison."]],
    ["Free and without commitment", "Written report", "Response within one business day"])
];
