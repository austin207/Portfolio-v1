"use client"

import { useState, useMemo } from "react"
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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter((project) => project.status === selectedStatus)
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)))
    }

    return filtered
  }, [projects, searchTerm, selectedCategory, selectedStatus, selectedTags])

  // Update parent component when filters change
  useMemo(() => {
    onFilteredProjects(filteredProjects)
  }, [filteredProjects, onFilteredProjects])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSelectedStatus(null)
    setSelectedTags([])
  }

  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus || selectedTags.length > 0

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search projects by title, description, or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filters</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50"
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Status</h4>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <Badge
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedStatus === status
                    ? status === "Completed"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-amber-600 text-white border-amber-600"
                    : "bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50"
                }`}
                onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technology Tags Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>
    </div>
  )
}
