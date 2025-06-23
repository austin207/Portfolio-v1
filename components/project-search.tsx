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

  // Get unique categories, statuses, and tags
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

  // Filter projects based on search criteria
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

  // FIXED: Use useRef to store the callback and only update when filteredProjects actually changes
  const filteredProjectsRef = useRef(filteredProjects)
  const onFilteredProjectsRef = useRef(onFilteredProjects)

  // Update refs when they change
  useEffect(() => {
    onFilteredProjectsRef.current = onFilteredProjects
  }, [onFilteredProjects])

  // FIXED: Only call the callback when filteredProjects actually changes
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "AI/ML": "bg-purple-500/20 text-purple-300 border-purple-400/50",
      "Embedded Systems": "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
      "IoT": "bg-blue-500/20 text-blue-300 border-blue-400/50",
      "Automation": "bg-amber-500/20 text-amber-300 border-amber-400/50",
      "Networking": "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
    }
    return colors[category] || "bg-gray-500/20 text-gray-300 border-gray-400/50"
  }

  const getStatusColor = (status: string) => {
    return status === "Completed" 
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50"
      : "bg-amber-500/20 text-amber-300 border-amber-400/50"
  }

  return (
    <div className="mb-12 space-y-8">
      {/* Enhanced Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search projects by title, description, or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-4 py-4 bg-gray-800/40 border-gray-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm text-white placeholder-gray-400 text-lg rounded-xl transition-all duration-300"
        />
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Filter className="h-6 w-6 mr-3 text-cyan-400" />
            Project Filters
          </h3>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-300"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Filter */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category 
                      ? getCategoryColor(category) + " shadow-lg" 
                      : "border-gray-600 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-300"
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
            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedStatus === status 
                      ? getStatusColor(status) + " shadow-lg"
                      : "border-gray-600 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-300"
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
            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Technologies</h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 text-xs ${
                    selectedTags.includes(tag) 
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-400/50 shadow-lg" 
                      : "border-gray-600 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-300"
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
        <p className="text-gray-400 text-lg">
          Showing <span className="text-cyan-400 font-semibold">{filteredProjects.length}</span> of{" "}
          <span className="text-purple-400 font-semibold">{projects.length}</span> projects
        </p>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.7);
        }
      `}</style>
    </div>
  )
}
