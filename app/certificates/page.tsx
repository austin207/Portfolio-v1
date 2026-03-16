"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, ExternalLink, Award, Calendar, Building2, ArrowLeft, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import certificatesData from "@/content/data/certificates.json"

interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  expiryDate?: string
  description: string
  credentialId?: string
  verificationUrl?: string
  image: string
  skills: string[]
  status: "Active" | "Expired" | "In Progress"
  category: string
}

export default function CertificatesPage() {
  const certificates = certificatesData as Certificate[]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  // Get unique categories, statuses, and skills
  const categories = useMemo(() => {
    return Array.from(new Set(certificates.map((cert) => cert.category)))
  }, [certificates])

  const statuses = useMemo(() => {
    return Array.from(new Set(certificates.map((cert) => cert.status)))
  }, [certificates])

  const allSkills = useMemo(() => {
    const skills = new Set<string>()
    certificates.forEach((certificate) => {
      certificate.skills.forEach((skill) => skills.add(skill))
    })
    return Array.from(skills)
  }, [certificates])

  // Filter certificates based on search criteria
  const filteredCertificates = useMemo(() => {
    let filtered = certificates

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((cert) => cert.category === selectedCategory)
    }

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter((cert) => cert.status === selectedStatus)
    }

    // Filter by skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((cert) =>
        selectedSkills.some((skill) => cert.skills.includes(skill))
      )
    }

    return filtered
  }, [certificates, searchTerm, selectedCategory, selectedStatus, selectedSkills])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSelectedStatus(null)
    setSelectedSkills([])
  }

  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus || selectedSkills.length > 0

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
          <div className="text-center mb-12">
            <div className="glass-card inline-flex items-center justify-center p-2 rounded-full mb-6">
              <Award className="h-8 w-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Professional Certifications
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive collection of professional certifications and credentials that validate my expertise
              across various technologies, platforms, and domains in the modern tech landscape.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-8">
            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/60 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search certificates by title, issuer, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/20 text-foreground placeholder-muted-foreground text-lg rounded-xl transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="glass-card gradient-border rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center tracking-tight">
                  <Filter className="h-6 w-6 mr-3 text-cyan-400/60" />
                  Advanced Filters
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

                {/* Skills Filter */}
                <div className="space-y-4">
                  <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {allSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 px-3 py-1.5 text-xs rounded-full ${
                          selectedSkills.includes(skill)
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-white/[0.03] text-muted-foreground border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-muted-foreground text-lg">
                Displaying <span className="text-foreground font-semibold">{filteredCertificates.length}</span> of{" "}
                <span className="text-foreground font-semibold">{certificates.length}</span> certificates
              </p>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate, index) => (
              <Card
                key={certificate.id}
                className="group glass-card-hover gradient-border rounded-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards"
                }}
              >
                <CardHeader className="pb-4 relative">
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                        <Award className="h-5 w-5 text-cyan-400/60" />
                      </div>
                      <Badge className="px-3 py-1.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {certificate.status}
                      </Badge>
                    </div>
                    <Badge
                      variant="outline"
                      className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border-cyan-500/10 font-mono"
                    >
                      {certificate.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-foreground text-xl leading-tight mt-4 group-hover:text-cyan-400 transition-colors duration-300 tracking-tight">
                    {certificate.title}
                  </CardTitle>

                  <CardDescription className="text-muted-foreground flex items-center mt-2">
                    <Building2 className="h-4 w-4 mr-2 text-cyan-400/60" />
                    <span className="font-medium">{certificate.issuer}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-6">
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-4">
                    {certificate.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-cyan-400/60" />
                      <span>Issued: <span className="text-foreground font-medium">{certificate.date}</span></span>
                      {certificate.expiryDate && (
                        <span className="ml-3 text-muted-foreground">
                          • Expires: <span className="text-muted-foreground">{certificate.expiryDate}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.slice(0, 4).map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border-cyan-500/10 font-mono transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {certificate.skills.length > 4 && (
                        <Badge
                          variant="outline"
                          className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border-cyan-500/10 font-mono"
                        >
                          +{certificate.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 pb-6">
                  <div className="w-full space-y-3">
                    {certificate.credentialId && (
                      <div className="glass-card text-xs text-muted-foreground font-mono p-2 rounded-lg">
                        <span className="text-muted-foreground">Credential ID:</span> {certificate.credentialId}
                      </div>
                    )}
                    {certificate.verificationUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full transition-all duration-300 group"
                        onClick={() => window.open(certificate.verificationUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Verify Certificate
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredCertificates.length === 0 && (
            <div className="text-center py-16">
              <div className="glass-card inline-flex items-center justify-center p-4 rounded-full mb-6">
                <Award className="h-12 w-12 text-cyan-400/60" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">
                No certificates found matching your criteria
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more certifications.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(38, 38, 38, 0.5);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(115, 115, 115, 0.5);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(163, 163, 163, 0.7);
        }
      `}</style>
    </div>
  )
}
