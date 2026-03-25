"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, ExternalLink, Award, Calendar, Building2, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import certificatesData from "@/content/data/certificates.json"
import { useReveal } from "@/hooks/use-reveal"

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
  const filterReveal = useReveal()
  const gridReveal = useReveal()

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3 fade-in" style={{ animationDelay: "0.1s" }}>Credentials</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground tracking-tight fade-in" style={{ animationDelay: "0.2s" }}>
              Professional Certifications
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed fade-in" style={{ animationDelay: "0.3s" }}>
              Comprehensive collection of professional certifications and credentials that validate my expertise
              across various technologies, platforms, and domains in the modern tech landscape.
            </p>
          </div>

          {/* Search and Filters */}
          <div ref={filterReveal.ref} className={`mb-12 space-y-6 reveal ${filterReveal.visible ? "visible" : ""}`}>
            {/* Search Input */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search certificates by title, issuer, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-3 border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
              />
            </div>

            {/* Filters */}
            <div className="border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest flex items-center">
                  <Filter className="h-3.5 w-3.5 mr-2" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Category Filter */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1.5 text-xs transition-colors ${
                          selectedCategory === category
                            ? "bg-foreground text-background"
                            : "text-muted-foreground border border-border hover:text-foreground"
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        className={`px-3 py-1.5 text-xs transition-colors ${
                          selectedStatus === status
                            ? "bg-foreground text-background"
                            : "text-muted-foreground border border-border hover:text-foreground"
                        }`}
                        onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Filter */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {allSkills.map((skill) => (
                      <button
                        key={skill}
                        className={`px-3 py-1.5 text-xs transition-colors ${
                          selectedSkills.includes(skill)
                            ? "bg-foreground text-background"
                            : "text-muted-foreground border border-border hover:text-foreground"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div>
              <p className="text-muted-foreground text-sm">
                Displaying <span className="text-foreground font-medium">{filteredCertificates.length}</span> of{" "}
                <span className="text-foreground font-medium">{certificates.length}</span> certificates
              </p>
            </div>
          </div>

          {/* Certificates Grid */}
          <div ref={gridReveal.ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate, i) => (
              <Card
                key={certificate.id}
                className={`border border-border bg-background rounded-none overflow-hidden reveal ${gridReveal.visible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      {certificate.status}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {certificate.category}
                    </span>
                  </div>

                  <CardTitle className="text-foreground text-lg leading-tight mt-3 tracking-tight">
                    {certificate.title}
                  </CardTitle>

                  <CardDescription className="text-muted-foreground flex items-center mt-2">
                    <Building2 className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{certificate.issuer}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-6">
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-4">
                    {certificate.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-2" />
                      <span>Issued: <span className="text-foreground">{certificate.date}</span></span>
                      {certificate.expiryDate && (
                        <span className="ml-3">
                          Expires: {certificate.expiryDate}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="font-mono text-[10px] text-muted-foreground"
                        >
                          {skill}{skillIndex < Math.min(certificate.skills.length, 4) - 1 ? "," : ""}
                        </span>
                      ))}
                      {certificate.skills.length > 4 && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          +{certificate.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 pb-6">
                  <div className="w-full space-y-3">
                    {certificate.credentialId && (
                      <div className="text-xs text-muted-foreground font-mono p-2.5 border border-border">
                        <span className="text-muted-foreground">Credential ID:</span> {certificate.credentialId}
                      </div>
                    )}
                    {certificate.verificationUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
                        onClick={() => window.open(certificate.verificationUrl, '_blank')}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-2" />
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
              <Award className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                No certificates found matching your criteria
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                Try adjusting your search terms or filters to discover more certifications.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center border border-border px-4 py-2 text-sm text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <X className="h-3.5 w-3.5 mr-2" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
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
