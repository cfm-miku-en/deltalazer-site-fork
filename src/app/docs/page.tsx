"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Book, 
  Settings, 
  Heart, 
  Target, 
  Hash, 
  Crosshair,
  Timer,
  Wand
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Documentation structure
const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    items: [
      { title: "What is delta?", anchor: "what-is-delta" },
      { title: "Installation", anchor: "installation" },
      { title: "First Steps", anchor: "first-steps" },
    ],
  },
  {
    id: "section-gimmicks",
    title: "Section Gimmicks",
    icon: Settings,
    items: [
      { title: "Overview", anchor: "gimmicks-overview" },
      { title: "Creating Sections", anchor: "creating-sections" },
      { title: "Section Settings", anchor: "section-settings" },
    ],
  },
  {
    id: "hp-gimmicks",
    title: "HP Gimmicks",
    icon: Heart,
    items: [
      { title: "Custom HP Values", anchor: "custom-hp" },
      { title: "No Drain Mode", anchor: "no-drain" },
      { title: "ReverseHP", anchor: "reverse-hp" },
    ],
  },
  {
    id: "count-limits",
    title: "Count Limits",
    icon: Hash,
    items: [
      { title: "Max 300s/100s/50s", anchor: "count-limits-overview" },
      { title: "No Miss Mode", anchor: "no-miss" },
      { title: "No Missed Slider End", anchor: "no-missed-slider-end" },
    ],
  },
  {
    id: "difficulty-overrides",
    title: "Difficulty Overrides",
    icon: Target,
    items: [
      { title: "AR/OD/CS Overrides", anchor: "ar-od-cs" },
      { title: "Stack Leniency", anchor: "stack-leniency" },
      { title: "Tick Rate Override", anchor: "tick-rate" },
      { title: "Gradual Changes", anchor: "gradual-changes" },
    ],
  },
  {
    id: "forced-mods",
    title: "Forced Mods",
    icon: Wand,
    items: [
      { title: "Hidden/Flashlight", anchor: "hd-fl" },
      { title: "Hard Rock", anchor: "hard-rock" },
      { title: "Fun Mods", anchor: "fun-mods" },
    ],
  },
  {
    id: "offset-penalty",
    title: "Great Offset Penalty",
    icon: Timer,
    items: [
      { title: "How It Works", anchor: "offset-penalty-overview" },
      { title: "Configuration", anchor: "offset-config" },
    ],
  },
  {
    id: "hitobject-gimmicks",
    title: "Per-Hitobject Gimmicks",
    icon: Crosshair,
    items: [
      { title: "Object-Level Control", anchor: "object-control" },
      { title: "Linking to Objects", anchor: "linking-objects" },
    ],
  },
  {
    id: "uncapped-sv",
    title: "Uncapped SV",
    icon: Hash,
    items: [
      { title: "What Changed", anchor: "uncapped-sv-overview" },
      { title: "Mapping Notes", anchor: "uncapped-sv-notes" },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  return (
    <main className="flex-1 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] min-h-[calc(100vh-64px)]">
          {/* Sidebar */}
          <motion.aside
            className="hidden lg:block border-r border-[#e5e5e5] dark:border-[#1a1a1a] p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-bold text-lg mb-6 text-[#0d0d0d] dark:text-white">Documentation</h2>
            <nav className="space-y-4">
              {docSections.map((section) => (
                <div key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 font-medium text-sm py-1 transition-colors ${
                      activeSection === section.id
                        ? "text-[#b92e35]"
                        : "text-[#666] hover:text-[#b92e35]"
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </a>
                  <ul className="ml-6 mt-2 space-y-1">
                    {section.items.map((item) => (
                      <li key={item.anchor}>
                        <a
                          href={`#${item.anchor}`}
                          className="text-sm text-[#888] hover:text-[#b92e35] transition-colors block py-0.5"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            className="p-6 md:p-12 lg:p-16"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#b92e35]">delta</span> Documentation
              </h1>
              <p className="text-lg text-[#666] dark:text-[#a1a1a1] max-w-2xl">
                Learn how to use section gimmicks, hitobject controls, and all the features 
                that make delta unique.
              </p>
            </motion.div>

            {/* Getting Started */}
            <DocSection id="getting-started" title="Getting Started">
              <DocSubsection id="what-is-delta" title="What is delta?">
                <p>
                  delta is a community-driven fork of osu!lazer that introduces <strong>section gimmicks and hitobject gimmicks</strong>, 
                  mapper-defined rules that can change gameplay behavior throughout a beatmap. With delta, 
                  mappers can create maps where HP mechanics, difficulty settings, and even mods change 
                  dynamically from section to section.
                </p>
                <p className="mt-4">
                  This opens up entirely new possibilities for creative mapping, including:
                </p>
                <ul className="mt-2 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span>Challenge sections with custom HP drain/recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Forced mod sections (HD/FL/HR for specific parts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Per-section difficulty changes (AR/OD/CS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Judgment limits (max 100s, no misses, etc.)</span>
                  </li>
                </ul>
              </DocSubsection>

              <DocSubsection id="installation" title="Installation">
                <p>
                  Download the latest release from the <Link href="/download" className="text-[#b92e35] hover:underline">Download page</Link>. 
                  Extract the ZIP file and run the executable. Debug builds connect to the delta dev server 
                  for safety — your official account remains unaffected.
                </p>
                <CodeBlock>
                  {`# Windows
Extract to C:\\Games\\delta
Run osu!.exe

# Linux
Extract to ~/games/delta
chmod +x osu!
./osu!`}
                </CodeBlock>
              </DocSubsection>

              <DocSubsection id="first-steps" title="First Steps">
                <p>
                  After launching delta, you can play existing maps normally or create new maps 
                  with section gimmicks. To add gimmicks to a map:
                </p>
                <ol className="mt-4 space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#b92e35]/10 text-[#b92e35] text-sm font-bold flex items-center justify-center">1</span>
                    <span>Open the beatmap editor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#b92e35]/10 text-[#b92e35] text-sm font-bold flex items-center justify-center">2</span>
                    <span>Open the Section Gimmicks toolbox</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#b92e35]/10 text-[#b92e35] text-sm font-bold flex items-center justify-center">3</span>
                    <span>Click "Add Section" to create a new gimmick section</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#b92e35]/10 text-[#b92e35] text-sm font-bold flex items-center justify-center">4</span>
                    <span>Configure the section's start/end time and enable desired gimmicks</span>
                  </li>
                </ol>
              </DocSubsection>
            </DocSection>

            {/* Section Gimmicks */}
            <DocSection id="section-gimmicks" title="Section Gimmicks">
              <DocSubsection id="gimmicks-overview" title="Overview">
                <p>
                  Section gimmicks are per-section mapper-defined rules. A beatmap can have multiple 
                  sections, each with its own set of active gimmicks. Sections are defined by their 
                  start and end times (in milliseconds), and they cannot overlap.
                </p>
                <InfoBox type="info">
                  <strong>Note:</strong> Use <code>EndTime = -1</code> to 
                  indicate "until the end of the map."
                </InfoBox>
              </DocSubsection>

              <DocSubsection id="creating-sections" title="Creating Sections">
                <p>
                  In the editor, use the Section Gimmicks panel to manage sections:
                </p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span><strong>Add Section:</strong> Creates a new section in current time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span><strong>Use Current Time:</strong> Sets the start or end time to current playback position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span><strong>Copy/Paste Settings:</strong> Copy gimmick config between sections (times are not copied)</span>
                  </li>
                </ul>
              </DocSubsection>

              <DocSubsection id="section-settings" title="Section Settings">
                <p>
                  Each section has toggles for different gimmick groups. Enable only the groups you need:
                </p>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <GimmickCard title="HP Gimmick" description="Custom HP drain/gain values" />
                  <GimmickCard title="No Miss" description="Instant fail on any miss" />
                  <GimmickCard title="Count Limits" description="Max 300s/100s/50s allowed" />
                  <GimmickCard title="No Missed Slider End" description="Fail on dropped slider tails" />
                  <GimmickCard title="Great Offset Penalty" description="HP penalty for late/early 300s" />
                </div>
              </DocSubsection>
            </DocSection>

            {/* HP Gimmicks */}
            <DocSection id="hp-gimmicks" title="HP Gimmicks">
              <DocSubsection id="custom-hp" title="Custom HP Values">
                <p>
                  When HP Gimmick is enabled (Reverse HP disabled), you can define custom HP changes for each judgment result:
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e5e5e5] dark:border-[#2a2a2a]">
                        <th className="text-left py-2 pr-4 font-semibold">Field</th>
                        <th className="text-left py-2 pr-4 font-semibold">Description</th>
                        <th className="text-left py-2 font-semibold">Example</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#666] dark:text-[#a1a1a1]">
                      <tr className="border-b border-[#e5e5e5] dark:border-[#2a2a2a]">
                        <td className="py-2 pr-4"><code>HP300</code></td>
                        <td className="py-2 pr-4">HP change on 300 (Great)</td>
                        <td className="py-2"><code>-0.02</code> (gain 2%)</td>
                      </tr>
                      <tr className="border-b border-[#e5e5e5] dark:border-[#2a2a2a]">
                        <td className="py-2 pr-4"><code>HP100</code></td>
                        <td className="py-2 pr-4">HP change on 100 (Ok)</td>
                        <td className="py-2"><code>0.05</code> (lose 5%)</td>
                      </tr>
                      <tr className="border-b border-[#e5e5e5] dark:border-[#2a2a2a]">
                        <td className="py-2 pr-4"><code>HP50</code></td>
                        <td className="py-2 pr-4">HP change on 50 (Meh)</td>
                        <td className="py-2"><code>0.10</code> (lose 10%)</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4"><code>HPMiss</code></td>
                        <td className="py-2 pr-4">HP change on Miss</td>
                        <td className="py-2"><code>0.20</code> (lose 20%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DocSubsection>

              <DocSubsection id="no-drain" title="No Drain Mode">
                <p>
                  When <code>NoDrain=true</code>, continuous HP drain is disabled for the section. 
                  Only your custom HP values apply. This is <strong>required</strong> when enabling HP Gimmick.
                </p>
                <InfoBox type="warning">
                  <strong>Note:</strong> NoDrain <strong>needs to be enabled</strong> when HP Gimmick is active. You cannot have 
                  passive HP drain alongside custom HP values in the same section.
                </InfoBox>
              </DocSubsection>

              <DocSubsection id="reverse-hp" title="ReverseHP">
                <p>
                  ReverseHP inverts the standard HP behavior:
                </p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span><strong>300 (Great):</strong> No HP change (HP300 is ignored)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span><strong>100/50/Miss:</strong> HP is <em>recovered</em> instead of lost</span>
                  </li>
                </ul>
                <InfoBox type="info">
                  When ReverseHP is enabled, <code>HP100</code>, <code>HP50</code>, or <code>HPMiss</code> 
                  must be <strong>negative values</strong> to heal the player.
                </InfoBox>
              </DocSubsection>
            </DocSection>

            {/* Count Limits */}
            <DocSection id="count-limits" title="Count Limits">
              <DocSubsection id="count-limits-overview" title="Max 300s/100s/50s">
                <p>
                  With Count Limits enabled, you can set maximum allowed counts for each judgment type 
                  within the section. Exceeding any limit causes immediate failure.
                </p>
                <CodeBlock>
                  {`EnableCountLimits=True
Max300s=-1    # Unlimited (or set a number)
Max100s=3     # Fail after 3 100s
Max50s=0      # No 50s allowed`}
                </CodeBlock>
                <p className="mt-4">
                  Use <code>-1</code> for unlimited. This is useful for creating "accuracy challenge" sections.
                </p>
              </DocSubsection>

              <DocSubsection id="no-miss" title="No Miss Mode">
                <p>
                  When <code>EnableNoMiss=true</code>, any miss (including sliderbreaks) causes immediate failure. 
                  This is separate from Count Limits and can be combined with other gimmicks.
                </p>
              </DocSubsection>

              <DocSubsection id="no-missed-slider-end" title="No Missed Slider End">
                <p>
                  When <code>EnableNoMissedSliderEnd=true</code>, failing to complete a slider tail 
                  (dropping the slider before the end) causes immediate failure. Useful for slider-focused 
                  challenge sections.
                </p>
              </DocSubsection>
            </DocSection>

            {/* Difficulty Overrides */}
            <DocSection id="difficulty-overrides" title="Difficulty Overrides">
              <DocSubsection id="ar-od-cs" title="AR/OD/CS Overrides">
                <p>
                  Override the map's difficulty settings on a per-section basis. You can set:
                </p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span><strong>AR (Approach Rate):</strong> How fast circles approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span><strong>OD (Overall Difficulty):</strong> Timing window strictness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span><strong>CS (Circle Size):</strong> Hit circle radius</span>
                  </li>
                </ul>
                <InfoBox type="warning">
                  <strong>Unsafe Mode:</strong> By default, values are clamped to safe ranges. 
                  Enable "allow values past limits (unsafe)" to use extreme values, but 
                  this may cause crashes or visual glitches!
                </InfoBox>
              </DocSubsection>

              <DocSubsection id="stack-leniency" title="Stack Leniency Override">
                <p>
                  Control how aggressively stacked objects are offset. Lower values = tighter stacks.
                </p>
              </DocSubsection>

              <DocSubsection id="tick-rate" title="Tick Rate Override">
                <p>
                  Override the slider tick rate for the section. Higher values = more slider ticks.
                </p>
              </DocSubsection>

              <DocSubsection id="gradual-changes" title="Gradual Changes">
                <p>
                  Difficulty overrides support gradual transitions. Instead of instantly changing AR from 
                  8 to 10, you can specify a start point and end point for the change to happen smoothly.
                </p>
                <p className="mt-4">
                  Each difficulty parameter (AR, OD, CS) can have independent gradual start/end times within 
                  the same section.
                </p>
              </DocSubsection>
            </DocSection>

            {/* Forced Mods */}
            <DocSection id="forced-mods" title="Forced Mods">
              <DocSubsection id="hd-fl" title="Hidden/Flashlight">
                <p>
                  Force Hidden (HD) or Flashlight (FL) for specific sections. The mod activates 
                  automatically when entering the section and deactivates when leaving.
                </p>
                <p className="mt-4">
                  <strong>Flashlight options:</strong>
                </p>
                <ul className="mt-2 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span>Custom FL radius</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Gradual fade-in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Gradual shrink to target radius</span>
                  </li>
                </ul>
              </DocSubsection>

              <DocSubsection id="hard-rock" title="Hard Rock">
                <p>
                  Force Hard Rock (HR) for sections. This flips the playfield vertically and 
                  increases difficulty settings.
                </p>
              </DocSubsection>

              <DocSubsection id="fun-mods" title="Fun Mods">
                <p>
                  Force "fun mods" like Barrel Roll, Traceable, and other experimental modifiers. 
                  Added in v2.2.1!
                </p>
              </DocSubsection>
            </DocSection>

            {/* Great Offset Penalty */}
            <DocSection id="offset-penalty" title="Great Offset Penalty">
              <DocSubsection id="offset-penalty-overview" title="How It Works">
                <p>
                  Even when you hit a 300 (Great), if your timing is off by more than the threshold, 
                  you take an HP penalty. This encourages precise timing even within the "Great" window.
                </p>
                <CodeBlock>
                  {`EnableGreatOffsetPenalty=True
GreatOffsetThresholdMs=18     # Tolerance in ms
GreatOffsetPenaltyHP=-0.03    # HP loss when exceeded`}
                </CodeBlock>
              </DocSubsection>

              <DocSubsection id="offset-config" title="Configuration">
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span><strong>GreatOffsetThresholdMs:</strong> How many ms off-center is tolerated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span><strong>GreatOffsetPenaltyHP:</strong> HP penalty when exceeded (must be ≤ 0)</span>
                  </li>
                </ul>
                <InfoBox type="info">
                  This penalty is applied <em>in addition to</em> any HP Gimmick values. NoDrain
                  <strong> must be</strong> enabled when Great Offset Penalty is active.
                </InfoBox>
              </DocSubsection>
            </DocSection>

            {/* Per-Hitobject Gimmicks */}
            <DocSection id="hitobject-gimmicks" title="Per-Hitobject Gimmicks">
              <DocSubsection id="object-control" title="Object-Level Control">
                <p>
                  Beyond section-level gimmicks, delta supports <strong>per-hitobject gimmicks</strong>. 
                  This allows you to apply special rules to individual circles, sliders, or spinners.
                </p>
                <p className="mt-4">
                  Use cases include:
                </p>
                <ul className="mt-2 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span>Specific circles with different AR/CS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Individual objects with custom HP values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Stack leniency overrides per object</span>
                  </li>
                </ul>
              </DocSubsection>

              <DocSubsection id="linking-objects" title="Linking to Objects">
                <p>
                  Hitobject gimmicks are stored linked to the object itself, not the timestamp. 
                  This means moving a gimmicked object will keep its gimmick settings intact (fixed in v2.2).
                </p>
              </DocSubsection>
            </DocSection>

            {/* Uncapped SV */}
            <DocSection id="uncapped-sv" title="Uncapped SV">
              <DocSubsection id="uncapped-sv-overview" title="What Changed">
                <p>
                  delta includes improvements to slider velocity handling in the editor,
                  including a removal of the legacy 10x effective cap for SV scaling.
                  This makes high-SV gimmick mapping more consistent and less constrained.
                </p>
                <InfoBox type="info">
                  Based on commit <code>a08f791</code>: <em>"stabilise shift-drag SV scaling and remove 10x legacy cap"</em>.
                </InfoBox>
              </DocSubsection>

              <DocSubsection id="uncapped-sv-notes" title="Mapping Notes">
                <ul className="space-y-2 ml-4">
                  <li>Shift-drag SV edits are more stable during timeline manipulation.</li>
                  <li>Very high SV values are no longer artificially blocked by the old 10x limit.</li>
                </ul>
              </DocSubsection>
            </DocSection>

            {/* File Format Reference */}
            <DocSection id="file-format" title="File Format Reference">
              <DocSubsection id="serialization" title="Serialization">
                <p>
                  Section gimmicks are stored in the <code>.osu</code> file under the 
                  <code>[BeatmapSectionGimmicks]</code> header. Each line defines one section:
                </p>
                <CodeBlock>
                  {`[BeatmapSectionGimmicks]
0,0,15000,EnableHPGimmick=True|NoDrain=True|HP300=0|HP100=-0.05|HP50=-0.10|HPMiss=-0.20
1,15000,30000,EnableCountLimits=True|Max100s=3|Max50s=0
2,30000,-1,EnableNoMiss=True`}
                </CodeBlock>
                <p className="mt-4">
                  Format: <code>Id,StartTime,EndTime,Key=Value|Key2=Value|...</code>
                </p>
              </DocSubsection>
            </DocSection>

            {/* Footer */}
            <motion.div variants={fadeInUp} className="mt-16 pt-8 border-t border-[#e5e5e5] dark:border-[#2a2a2a]">
              <p className="text-[#888] text-sm">
                Need help? Join the{" "}
                <a 
                  href="https://discord.gg/dfPwhRtGVZ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#b92e35] hover:underline inline-flex items-center gap-1"
                >
                  Discord community
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

// Components
function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section id={id} variants={fadeInUp} className="mb-16 scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0d0d0d] dark:text-white">{title}</h2>
      </div>
      <div className="space-y-8">{children}</div>
    </motion.section>
  );
}

function DocSubsection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h3 className="text-lg font-semibold mb-3 text-[#0d0d0d] dark:text-white">{title}</h3>
      <div className="text-[#666] dark:text-[#a1a1a1] leading-relaxed">{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="mt-4 bg-[#0d0d0d] dark:bg-[#161616] rounded-lg p-4 font-mono text-sm overflow-x-auto">
      <pre className="text-[#a1a1a1]">{children}</pre>
    </div>
  );
}

function InfoBox({
  type,
  children,
}: {
  type: "info" | "warning" | "success";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-300",
    success: "bg-[#b92e35]/10 border-[#b92e35]/30 text-[#8f242a] dark:text-[#b92e35]",
  };

  return (
    <div className={`mt-4 p-4 rounded-lg border ${styles[type]}`}>
      {children}
    </div>
  );
}

function GimmickCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-[#e5e5e5] dark:border-[#2a2a2a] bg-[#f8f9fa] dark:bg-[#161616]">
      <h4 className="font-semibold text-[#0d0d0d] dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-[#888]">{description}</p>
    </div>
  );
}
