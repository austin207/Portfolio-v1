"use client"

import React, { useState } from "react"
import { ArrowLeft, Home, GitBranch, ChevronRight, CheckCircle, Clock, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import skillsTree from "@/data/robotics-skills-data.json"

interface SkillNode {
  name: string
  id: string
  level: string
  description: string
  color: string
  status: string
  children: SkillNode[]
}

const levelStyles: Record<string, string> = {
  Expert: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Advanced: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Beginner: "bg-white/[0.03] text-muted-foreground border-white/[0.06]",
}

const statusIcon = (status: string) =>
  status === "mastered" ? (
    <CheckCircle className="h-3.5 w-3.5 text-emerald-400/70" />
  ) : (
    <Clock className="h-3.5 w-3.5 text-amber-400/70" />
  )

function countNodes(node: SkillNode): number {
  return 1 + node.children.reduce((sum, c) => sum + countNodes(c), 0)
}

function LeafNode({ node }: { node: SkillNode }) {
  return (
    <div className="flex items-center gap-3 p-3 glass-card rounded-lg group/leaf hover:bg-white/[0.04] transition-all duration-200">
      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: node.color }} />
      <span className="text-sm text-foreground/80 flex-1">{node.name}</span>
      {statusIcon(node.status)}
      {node.level && (
        <Badge className={`text-[10px] font-mono px-2 py-0 border ${levelStyles[node.level] || levelStyles.Beginner}`}>
          {node.level}
        </Badge>
      )}
    </div>
  )
}

function BranchNode({ node, depth = 0 }: { node: SkillNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = node.children.length > 0
  const childCount = countNodes(node) - 1

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group/branch ${
          hasChildren ? "cursor-pointer hover:bg-white/[0.04]" : "cursor-default"
        } ${depth === 0 ? "glass-card-hover gradient-border p-5" : "glass-card"}`}
      >
        {/* Color dot + connector */}
        <div
          className="w-3 h-3 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-background"
          style={{ backgroundColor: node.color, ringColor: node.color + "40" }}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-foreground truncate ${depth === 0 ? "text-lg" : "text-sm"}`}>
              {node.name}
            </h3>
            {statusIcon(node.status)}
          </div>
          {depth === 0 && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{node.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge className={`text-[10px] font-mono px-2 py-0 border ${levelStyles[node.level] || levelStyles.Beginner}`}>
            {node.level}
          </Badge>
          {hasChildren && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-[10px] font-mono">{childCount}</span>
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
              />
            </div>
          )}
        </div>
      </button>

      {/* Children */}
      {hasChildren && open && (
        <div className={`ml-5 mt-1 pl-4 border-l-2 space-y-1 ${depth === 0 ? "mt-3" : ""}`} style={{ borderColor: node.color + "20" }}>
          {node.children.map((child) =>
            child.children.length > 0 ? (
              <BranchNode key={child.id} node={child} depth={depth + 1} />
            ) : (
              <LeafNode key={child.id} node={child} />
            )
          )}
        </div>
      )}
    </div>
  )
}

export default function SkillsPathPage() {
  const tree = skillsTree as SkillNode
  const totalSkills = countNodes(tree) - 1
  const mastered = countMastered(tree)

  function countMastered(node: SkillNode): number {
    const self = node.status === "mastered" ? 1 : 0
    return node.children.reduce((sum, c) => sum + countMastered(c), self)
  }

  // Group top-level domains
  const domains = tree.children

  return (
    <div className="min-h-screen bg-background relative">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center p-3 glass-card rounded-full mb-6">
              <GitBranch className="h-10 w-10 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Skills <span className="gradient-text">Map</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              An interactive map of my engineering expertise across robotics, AI/ML, electronics,
              and software development. Click any branch to explore deeper.
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm">
              <Layers className="h-4 w-4 text-cyan-400/60" />
              <span className="text-muted-foreground"><span className="text-foreground font-semibold">{totalSkills}</span> skills</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-400/60" />
              <span className="text-muted-foreground"><span className="text-foreground font-semibold">{mastered - 1}</span> mastered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm">
              <Clock className="h-4 w-4 text-amber-400/60" />
              <span className="text-muted-foreground"><span className="text-foreground font-semibold">{totalSkills - mastered + 1}</span> in progress</span>
            </div>
            {domains.map((d) => (
              <div key={d.id} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
              </div>
            ))}
          </div>

          {/* Root node */}
          <div className="mb-6 glass-card gradient-border p-6 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
              <h2 className="text-2xl font-bold text-foreground">{tree.name}</h2>
              <Badge className="text-xs font-mono px-2.5 py-0.5 border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                {tree.level}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{tree.description}</p>
          </div>

          {/* Domain branches */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {domains.map((domain) => (
              <BranchNode key={domain.id} node={domain} depth={0} />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 glass-card gradient-border rounded-2xl p-6">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Badge className="text-[10px] font-mono px-2 py-0 border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Expert</Badge>
                <span className="text-muted-foreground">Deep mastery</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="text-[10px] font-mono px-2 py-0 border bg-blue-500/10 text-blue-400 border-blue-500/20">Advanced</Badge>
                <span className="text-muted-foreground">Strong proficiency</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="text-[10px] font-mono px-2 py-0 border bg-amber-500/10 text-amber-400 border-amber-500/20">Intermediate</Badge>
                <span className="text-muted-foreground">Growing skill</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400/70" />
                <span className="text-muted-foreground">Mastered</span>
                <Clock className="h-3.5 w-3.5 text-amber-400/70 ml-3" />
                <span className="text-muted-foreground">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
