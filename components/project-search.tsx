"use client"

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface ProjectSearchProps {
  projects: any[]
  onFilteredProjects: (projects: any[]) => void
}

export default function ProjectSearch({ projects, onFilteredProjects }: ProjectSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects])
  const statuses = useMemo(() => Array.from(new Set(projects.map((p) => p.status))), [projects])

  const filteredProjects = useMemo(() => {
    let f = projects
    if (searchTerm) f = f.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()) || p.tags.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase())))
    if (selectedCategory) f = f.filter((p) => p.category === selectedCategory)
    if (selectedStatus) f = f.filter((p) => p.status === selectedStatus)
    return f
  }, [projects, searchTerm, selectedCategory, selectedStatus])

  const filteredRef = useRef(filteredProjects)
  const cbRef = useRef(onFilteredProjects)
  useEffect(() => { cbRef.current = onFilteredProjects }, [onFilteredProjects])
  useEffect(() => {
    if (JSON.stringify(filteredProjects) !== JSON.stringify(filteredRef.current)) {
      filteredRef.current = filteredProjects
      cbRef.current(filteredProjects)
    }
  }, [filteredProjects])

  const clear = useCallback(() => { setSearchTerm(""); setSelectedCategory(null); setSelectedStatus(null) }, [])
  const hasFilters = searchTerm || selectedCategory || selectedStatus

  return (
    <div className="mb-12 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-transparent border-border rounded-none text-sm focus:border-foreground focus:ring-0"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mr-2">Category</span>
        {categories.map((c) => (
          <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? null : c)} className={`text-xs px-3 py-1 border transition-colors ${selectedCategory === c ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {c}
          </button>
        ))}
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mx-2">Status</span>
        {statuses.map((s) => (
          <button key={s} onClick={() => setSelectedStatus(selectedStatus === s ? null : s)} className={`text-xs px-3 py-1 border transition-colors ${selectedStatus === s ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {s}
          </button>
        ))}
        {hasFilters && <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground ml-2"><X className="h-3 w-3" /></button>}
      </div>

      <p className="font-mono text-[11px] text-muted-foreground">{filteredProjects.length} of {projects.length}</p>
    </div>
  )
}
