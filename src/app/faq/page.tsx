"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is delta?",
        a: "delta is a community-driven fork of osu!lazer that adds section gimmicks and per-hitobject control. It allows mappers to create maps with custom gameplay rules that change throughout the map.",
      },
      {
        q: "Is this official?",
        a: "No, delta is an unofficial community project. It uses osu!lazer as a base but adds experimental features not present in the official client.",
      },
      {
        q: "Can I use this for ranked play?",
        a: "Debug builds connect to the osu!dev server, not the official server. This is intentional for safety. We do not recommend using release builds that connect to official servers.",
      },
      {
        q: "Where can I get help?",
        a: "Join our Discord server! The community is active and happy to help with any questions about using section gimmicks or building maps.",
      },
      {
        q: "Can I play normal osu! maps with delta?",
        a: "Yes! delta is fully compatible with standard osu! beatmaps. Maps without section gimmicks will play exactly like they do in osu!lazer.",
      },
    ],
  },
  {
    category: "Section Gimmicks",
    questions: [
      {
        q: "What are section gimmicks?",
        a: "Section gimmicks are per-section mapper-defined rules that control gameplay behavior. Each section of your map can have different HP values, judgment limits, forced mods, and difficulty settings.",
      },
      {
        q: "How do I add section gimmicks to my map?",
        a: "In the editor, use the Section Gimmicks toolbox to add sections. Each section has a start and end time, and you can configure various gimmick groups for each section.",
      },
      {
        q: "Can I have multiple gimmicks active at once?",
        a: "Yes! You can enable multiple gimmick groups (HP Gimmick, No Miss, Count Limits, etc.) on the same section. They all apply simultaneously.",
      },
      {
        q: "Do gimmicks affect score submission?",
        a: "Since debug builds connect to osu!dev server and not the official server, scores are not submitted to official leaderboards. This is by design.",
      },
      {
        q: "Can sections overlap?",
        a: "No, sections cannot overlap. This is enforced by validation when saving. Each time point in your map can only belong to one section.",
      },
      {
        q: "How do I copy gimmick settings between sections?",
        a: "Select a section, use 'Copy Gimmick Settings', then select target sections and use 'Paste Gimmick Settings'. Only gimmick config is copied - the time range stays the same.",
      },
    ],
  },
  {
    category: "Editor Workflow",
    questions: [
      {
        q: "How do I create a new section?",
        a: "Click 'Add Section' in the Section Gimmicks toolbox. A new section appears with placeholder times. Select it and use 'Set Here' buttons to set start/end times from current playback position.",
      },
      {
        q: "How do I set section timing quickly?",
        a: "Play through your map and press 'Use Current Time' when you reach the desired start or end point. You can also type times manually in milliseconds.",
      },
      {
        q: "Can I apply section gimmicks to all difficulties at once?",
        a: "Yes! When saving, you can choose 'This difficulty' or 'Whole mapset'. Choosing 'Whole mapset' copies section gimmicks to all difficulties in your beatmap set.",
      },
      {
        q: "What happens if I edit a section's timing?",
        a: "Changes are saved when you commit the edit (press Enter or click away). The editor validates that sections don't overlap before allowing you to save the beatmap.",
      },
      {
        q: "Can I delete a section?",
        a: "Yes, select the section and click the remove button. This removes all gimmick settings for that time range.",
      },
      {
        q: "How do I know which section is active during playback?",
        a: "The active section is highlighted in the Section Gimmicks toolbox during playback. You can also see section boundaries in the timeline.",
      },
    ],
  },
  {
    category: "HP Gimmicks",
    questions: [
      {
        q: "How does ReverseHP work?",
        a: "With ReverseHP enabled, the HP behavior is inverted, so negative values reduce hp and positive values heal.",
      },
      {
        q: "Can I disable HP drain entirely?",
        a: "Yes, No Drain is a requirement for HP Gimmicks.",
      },
      {
        q: "What values should I use for HP gimmicks?",
        a: "It depends on your desired difficulty. A typical setup might be HP300=0, HP100=0.05, HP50=0.10, HPMiss=0.20. Negative values drain HP, positive values heal.",
      },
      {
        q: "Why is NoDrain required for HP Gimmicks?",
        a: "HP Gimmicks require NoDrain=true because continuous drain would interfere with your custom HP values. This ensures consistent, predictable HP behavior based only on hit judgments.",
      },
      {
        q: "Why do positive values reduce HP instead of healing?",
        a: "I keep forgetting to add the negative sign when configuring HP values, so I made it so that positive values reduce HP and negative values heal.",
      },
      {
        q: "Do slider ticks and slider ends count for HP gimmicks?",
        a: "Yes! You can route slider judgments through the HP gimmick system to control exactly how much HP sliders give or drain.",
      },
    ],
  },
  {
    category: "Difficulty Overrides",
    questions: [
      {
        q: "What difficulty values can I override per-section?",
        a: "You can override AR (Approach Rate), OD (Overall Difficulty), CS (Circle Size), Stack Leniency, and Slider Tick Rate on a per-section basis.",
      },
      {
        q: "Can I use negative AR?",
        a: "Yes! delta supports negative AR values, which can create unique reading challenges by hiding approach circles.",
      },
      {
        q: "How does gradual difficulty override work?",
        a: "When you set gradual timing, difficulty values smoothly interpolate from the baseline to your target value over the specified duration. AR/CS/OD values are quantized to one decimal place for smooth transitions.",
      },
      {
        q: "What is the 'unsafe' difficulty override option?",
        a: "Unsafe overrides allow extreme values outside normal ranges. Use with caution - extreme values can cause unexpected behavior or crashes.",
      },
      {
        q: "Can I override stack leniency?",
        a: "Yes, Stack Leniency can be overridden per-section. This affects how stacked notes are displayed and positioned.",
      },
    ],
  },
  {
    category: "Forced Mods",
    questions: [
      {
        q: "What mods can I force per-section?",
        a: "You can force Hidden (HD), HardRock (HR), Flashlight (FL), and Fun Mods like Traceable, Barrel Roll, and others on a per-section basis.",
      },
      {
        q: "How does per-section Flashlight work?",
        a: "You can customize FL radius, fade distance, and shrink behavior per-section. Gradual FL transitions follow the section's finish timing for smooth fades.",
      },
      {
        q: "Can I force multiple mods on the same section?",
        a: "Yes! You can force any combination of mods simultaneously. Each mod can be toggled independently.",
      },
      {
        q: "What are Fun Mods?",
        a: "Fun Mods are experimental mods like Traceable (shows cursor trail), Barrel Roll (rotates playfield), and others. In v2.2.1, you can adjust their intensity values per-section.",
      },
      {
        q: "Do forced mods affect scoring?",
        a: "Forced mods apply their gameplay effects but don't affect score multipliers in the traditional sense, since delta debug builds don't submit to official servers.",
      },
    ],
  },
  {
    category: "Advanced Features",
    questions: [
      {
        q: "What is Uncapped SV?",
        a: "Uncapped SV removes the legacy 10x slider velocity cap from osu!stable. You can now use extreme SV values for creative mapping. Shift-drag SV scaling has been stabilized for precise control.",
      },
      {
        q: "What is Great Offset Penalty?",
        a: "Great Offset Penalty applies additional HP drain when a 300 hit is outside a specific timing window (e.g., >18ms early/late). It rewards precise timing without changing the judgment itself.",
      },
      {
        q: "Can I limit specific judgment counts?",
        a: "Yes! Count Limits let you set Max300s, Max100s, and Max50s per section. Exceeding any enabled limit causes immediate failure. Use -1 for unlimited.",
      },
      {
        q: "What is No Missed Slider End?",
        a: "This gimmick causes immediate failure if the player doesn't complete a slider end/tail, like no miss but specifically for sliders.",
      },
      {
        q: "Can I create per-hitobject gimmicks?",
        a: "Yes! delta supports per-hitobject gimmicks in addition to section-wide gimmicks. Check the Documentation page for details.",
      },
    ],
  },
  {
    category: "Compatibility",
    questions: [
      {
        q: "Can I open delta maps in regular osu!lazer?",
        a: "Yes! The [BeatmapSectionGimmicks] section is ignored by vanilla clients. The map will play normally without gimmick features.",
      },
      {
        q: "Can I export to osu!stable format?",
        a: "Yes, but gimmicks will be stripped. osu!stable doesn't support section gimmicks, so maps export as standard beatmaps.",
      },
      {
        q: "Do section gimmicks work in multiplayer?",
        a: "Section gimmicks work in local multiplayer sessions, but keep in mind that delta debug builds connect to osu!dev server, not official servers.",
      },
      {
        q: "Will delta break my existing maps?",
        a: "No! delta is fully backward compatible. All your existing maps will work exactly as they do in osu!lazer.",
      },
    ],
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        q: "The editor crashes when I enable Fun Mods. What's wrong?",
        a: "This was a known issue in earlier versions (fixed in v2.2.1+). Make sure you're using the latest version. Fun mods now safely handle missing dependencies in the editor.",
      },
      {
        q: "My gimmick settings aren't saving. Help!",
        a: "Check for validation errors: sections can't overlap, NoDrain must be true for HP gimmicks, and ReverseHP requires positive healing values. The editor will show errors before allowing save.",
      },
      {
        q: "Why does the game fail immediately when I start playing?",
        a: "Check if you have No Miss enabled on your first section - any miss will cause instant failure. Also verify Count Limits aren't set too low.",
      },
      {
        q: "Gradual difficulty changes look choppy. How do I smooth them?",
        a: "As of v2.2.0+, gradual transitions are automatically smoothed and quantized. Make sure your gradual finish timing is set appropriately (longer duration = smoother transition).",
      },
      {
        q: "My hitobject textbox edits aren't persisting. What do I do?",
        a: "This was fixed in recent versions. Textbox edits now persist on deselect. If you're experiencing this, update to the latest version.",
      },
      {
        q: "How do I report bugs or request features?",
        a: "Join our Discord server or open an pull request on the GitHub repository.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "What .NET version is required?",
        a: "delta requires .NET 8 Runtime. If you're using the self-contained builds, it's included. Otherwise, download it from Microsoft.",
      },
      {
        q: "How do I build from source?",
        a: "Clone the repository, then run 'dotnet build osu.Desktop/osu.Desktop.csproj -c Debug'. See the Download page for full instructions.",
      },
      {
        q: "Where are gimmicks stored in the .osu file?",
        a: "Section gimmicks are stored in a [BeatmapSectionGimmicks] section in the .osu file. The format is: Id,StartTime,EndTime,Key=Value|Key2=Value|...",
      },
      {
        q: "Can I convert maps with gimmicks back to vanilla format?",
        a: "Yes, the gimmicks section is ignored by the vanilla osu! client. Maps will play normally without the gimmick features.",
      },
      {
        q: "How are sections identified in the file format?",
        a: "Each section has an Id (starting from 0), StartTime in milliseconds, EndTime in milliseconds (or -1 for map end), and pipe-separated key-value pairs for gimmick settings.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="flex-1 py-16 md:py-24 px-6 bg-white dark:bg-[#0a0a0a]">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          Frequently Asked <span className="text-[#b92e35]">Questions</span>
        </motion.h1>
        
        <motion.p
          variants={fadeInUp}
          className="text-[#666] dark:text-[#a1a1a1] text-center mb-12 max-w-2xl mx-auto"
        >
          Find answers to common questions about delta and section gimmicks.
        </motion.p>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Table of contents */}
          <motion.nav
            variants={fadeInUp}
            className="hidden lg:block sticky top-24 self-start"
          >
            <h2 className="font-semibold mb-4 text-[#0d0d0d] dark:text-white">Categories</h2>
            <ul className="space-y-2">
              {faqs.map((category) => (
                <li key={category.category}>
                  <a
                    href={`#${category.category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-[#666] hover:text-[#b92e35] transition-colors"
                  >
                    {category.category}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* FAQ content */}
          <div className="space-y-12">
            {faqs.map((category) => (
              <motion.section
                key={category.category}
                id={category.category.toLowerCase().replace(/\s+/g, "-")}
                variants={fadeInUp}
              >
                <h2 className="text-xl font-bold mb-6 text-[#0d0d0d] dark:text-white pb-2 border-b border-[#e5e5e5] dark:border-[#2a2a2a]">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <FAQItem key={index} question={item.q} answer={item.a} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#e5e5e5] dark:border-[#2a2a2a] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8f8f8] dark:hover:bg-[#161616] transition-colors"
      >
        <span className="font-medium text-[#0d0d0d] dark:text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#888] flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-5 pb-4 text-[#666] dark:text-[#a1a1a1]"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}
