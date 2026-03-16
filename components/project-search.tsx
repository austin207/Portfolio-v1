"use client"

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X, Filter } from "lucide-react"


interface ProjectSearchProps {
  projects: any[]
  onFilteredProjects: (projects: any[]) => void
}

export default function ProjectSearch({ projects, onFilteredProjects }: ProjectSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const categories = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.category)))
  }, [projects])

  const statuses = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.status)))
  }, [projects])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((project) => {
      project.tags.forEach((tag: string) => tags.add(tag))
    })
    return Array.from(tags)
  }, [projects])

  const filteredProjects = useMemo(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    if (selectedStatus) {
      filtered = filtered.filter((project) => project.status === selectedStatus)
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)))
    }

    return filtered
  }, [projects, searchTerm, selectedCategory, selectedStatus, selectedTags])

  const filteredProjectsRef = useRef(filteredProjects)
  const onFilteredProjectsRef = useRef(onFilteredProjects)

  useEffect(() => {
    onFilteredProjectsRef.current = onFilteredProjects
  }, [onFilteredProjects])

  useEffect(() => {
    const stringifiedCurrent = JSON.stringify(filteredProjects)
    const stringifiedPrevious = JSON.stringify(filteredProjectsRef.current)

    if (stringifiedCurrent !== stringifiedPrevious) {
      filteredProjectsRef.current = filteredProjects
      onFilteredProjectsRef.current(filteredProjects)
    }
  }, [filteredProjects])

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSelectedStatus(null)
    setSelectedTags([])
  }, [])

  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus || selectedTags.length > 0

  return (
    <div className="mb-12 space-y-8">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/60 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search projects by title, description, or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-4 py-4 glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/20 text-foreground placeholder-muted-foreground text-lg rounded-xl transition-all duration-300"
        />
      </div>

      {/* Filters Section */}
      <div className="glass-card gradient-border p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center tracking-tight">
            <Filter className="h-6 w-6 mr-3 text-cyan-400/60" />
            Project Filters
          </h3>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full transition-all duration-300"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Filter */}
          <div className="space-y-4">
            <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 px-3 py-1.5 text-xs rounded-full ${
                    selectedCategory === category
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      : "bg-white/[0.03] text-muted-foreground border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-4">
            <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 px-3 py-1.5 text-xs rounded-full ${
                    selectedStatus === status
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      : "bg-white/[0.03] text-muted-foreground border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                  }`}
                  onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>

          {/* Technology Tags Filter */}
          <div className="space-y-4">
            <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs">Technologies</h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 px-3 py-1.5 text-xs rounded-full ${
                    selectedTags.includes(tag)
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      : "bg-white/[0.03] text-muted-foreground border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-muted-foreground text-lg">
          Showing <span className="text-foreground font-semibold">{filteredProjects.length}</span> of{" "}
          <span className="text-foreground font-semibold">{projects.length}</span> projects
        </p>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
