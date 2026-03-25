"use client"

import React, { useState } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"
import skillsTree from "@/data/robotics-skills-data.json"
import { useReveal } from "@/hooks/use-reveal"

interface SkillNode {
  name: string
  id: string
  level: string
  description: string
  color: string
  status: string
  children: SkillNode[]
}

function countNodes(node: SkillNode): number {
  return 1 + node.children.reduce((sum, c) => sum + countNodes(c), 0)
}

function countMastered(node: SkillNode): number {
  const self = node.status === "mastered" ? 1 : 0
  return node.children.reduce((sum, c) => sum + countMastered(c), self)
}

const levelBar = (level: string) => {
  switch (level) {
    case "Expert": return "w-full"
    case "Advanced": return "w-3/4"
    case "Intermediate": return "w-1/2"
    default: return "w-1/4"
  }
}

function LeafRow({ node, index }: { node: SkillNode; index: number }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0 group hover:bg-foreground/[0.02] transition-colors px-1">
      <span className="text-sm text-foreground flex-1">{node.name}</span>
      <div className="w-20 h-1 bg-border rounded-full overflow-hidden shrink-0">
        <div className={`h-full bg-foreground/40 rounded-full ${levelBar(node.level)}`} />
      </div>
      <span className="font-mono text-[10px] text-muted-foreground w-20 text-right shrink-0">{node.level}</span>
    </div>
  )
}

function DomainCard({ node, index }: { node: SkillNode; index: number }) {
  const [open, setOpen] = useState(false)
  const { ref, visible } = useReveal()
  const childCount = countNodes(node) - 1
  const masteredCount = countMastered(node) - (node.status === "mastered" ? 1 : 0)

  // Flatten all leaf skills for display
  function flattenSkills(n: SkillNode): SkillNode[] {
    if (n.children.length === 0) return [n]
    return n.children.flatMap(c => flattenSkills(c))
  }
  const allSkills = flattenSkills(node)

  return (
    <div ref={ref} className={`border overflow-hidden transition-colors duration-300 reveal ${visible ? "visible" : ""} ${open ? "border-foreground/20" : "border-border"}`} style={{ transitionDelay: `${index * 0.08}s` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start gap-5 hover:bg-foreground/[0.02] transition-colors cursor-pointer group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-foreground">{node.name}</h3>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{node.level}</span>
          </div>
          <p className="text-[13px] text-muted-foreground line-clamp-1">{node.description}</p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-lg font-bold text-foreground">{childCount}</p>
            <p className="font-mono text-[10px] text-muted-foreground">skills</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-lg font-bold text-foreground">{masteredCount}</p>
            <p className="font-mono text-[10px] text-muted-foreground">mastered</p>
          </div>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <div className={`expand-container ${open ? "open" : ""}`}>
        <div className="expand-inner">
          <div className="border-t border-border">
            {node.children.map((child, ci) => (
              <SubBranch key={child.id} node={child} index={ci} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SubBranch({ node, index }: { node: SkillNode; index: number }) {
  const [open, setOpen] = useState(false)
  const hasChildren = node.children.length > 0

  function flattenSkills(n: SkillNode): SkillNode[] {
    if (n.children.length === 0) return [n]
    return n.children.flatMap(c => flattenSkills(c))
  }

  if (!hasChildren) {
    return (
      <div className="flex items-center gap-4 py-3 px-6 border-b border-border last:border-0 hover:bg-foreground/[0.02] transition-colors">
        <span className="text-sm text-foreground flex-1">{node.name}</span>
        <div className="w-16 h-1 bg-border rounded-full overflow-hidden shrink-0">
          <div className={`h-full bg-foreground/40 rounded-full ${levelBar(node.level)}`} />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground w-20 text-right shrink-0">{node.level}</span>
      </div>
    )
  }

  const leaves = flattenSkills(node)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center gap-4 py-3 px-6 border-b border-border hover:bg-foreground/[0.02] transition-colors cursor-pointer"
      >
        <span className="text-sm font-medium text-foreground flex-1">{node.name}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{leaves.length} skills</span>
        <div className="w-16 h-1 bg-border rounded-full overflow-hidden shrink-0">
          <div className={`h-full bg-foreground/40 rounded-full ${levelBar(node.level)}`} />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground w-20 text-right shrink-0">{node.level}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`expand-container ${open ? "open" : ""}`}>
        <div className="expand-inner">
          <div className="pl-6 bg-foreground/[0.01]">
            {leaves.map((leaf, li) => (
              <LeafRow key={leaf.id} node={leaf} index={li} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillsPathPage() {
  const tree = skillsTree as SkillNode
  const totalSkills = countNodes(tree) - 1
  const mastered = countMastered(tree)
  const domains = tree.children
  const { ref: headerRef, visible: headerVisible } = useReveal()

  return (
    <div className="min-h-screen bg-background">
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-16">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          <div ref={headerRef} className="mb-16">
            <div className={`fade-in`}>
              <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">Expertise</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground tracking-tight">
                Skills Map
              </h1>
              <p className="text-muted-foreground max-w-2xl leading-relaxed mb-10">
                An interactive map of my engineering expertise. Click any domain to explore the skill tree.
              </p>
            </div>

            {/* Stats row */}
            <div className={`grid grid-cols-3 sm:grid-cols-5 gap-4 fade-in`} style={{ animationDelay: "0.15s" }}>
              <div className="border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{totalSkills}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">Total Skills</p>
              </div>
              <div className="border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{mastered - 1}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">Mastered</p>
              </div>
              <div className="border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{totalSkills - mastered + 1}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">In Progress</p>
              </div>
              <div className="border border-border p-4 text-center hidden sm:block">
                <p className="text-2xl font-bold text-foreground">{domains.length}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">Domains</p>
              </div>
              <div className="border border-border p-4 text-center hidden sm:block">
                <p className="text-2xl font-bold text-foreground">{tree.level}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">Overall</p>
              </div>
            </div>
          </div>

          {/* Domain cards */}
          <div className="space-y-4">
            {domains.map((domain, i) => (
              <DomainCard key={domain.id} node={domain} index={i} />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-16 border-t border-border pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Expert", desc: "Deep mastery", width: "w-full" },
                { label: "Advanced", desc: "Strong proficiency", width: "w-3/4" },
                { label: "Intermediate", desc: "Growing skill", width: "w-1/2" },
                { label: "Beginner", desc: "Learning", width: "w-1/4" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-1 bg-border rounded-full overflow-hidden">
                      <div className={`h-full bg-foreground/40 rounded-full ${item.width}`} />
                    </div>
                    <span className="font-mono text-[11px] text-foreground">{item.label}</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
