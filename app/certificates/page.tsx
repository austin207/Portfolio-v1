"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, ExternalLink, Award, Calendar, Building2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Certificate {
  id: string
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
  // Sample certificate data - replace with your actual certificates
  const certificates: Certificate[] = [
    {
      id: "aws-cloud-practitioner",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "March 2025",
      expiryDate: "March 2028",
      description: "Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.",
      credentialId: "AWS-CCP-2025-001",
      verificationUrl: "https://aws.amazon.com/verification",
      image: "/certificates/aws-cloud-practitioner.png",
      skills: ["AWS", "Cloud Computing", "Cloud Architecture", "Security"],
      status: "Active",
      category: "Cloud",
    },
    {
      id: "google-ml-crash-course",
      title: "Machine Learning Crash Course",
      issuer: "Google AI",
      date: "February 2025",
      description: "Comprehensive introduction to machine learning concepts, TensorFlow, and practical ML applications.",
      credentialId: "GOOGLE-ML-2025-002",
      verificationUrl: "https://developers.google.com/certificate",
      image: "/certificates/google-ml.png",
      skills: ["Machine Learning", "TensorFlow", "Python", "Data Science"],
      status: "Active",
      category: "AI/ML",
    },
    {
      id: "react-advanced-patterns",
      title: "Advanced React Patterns",
      issuer: "Meta",
      date: "January 2025",
      description: "Advanced React concepts including hooks, context, performance optimization, and modern React patterns.",
      credentialId: "META-REACT-2025-003",
      verificationUrl: "https://developers.facebook.com/certificate",
      image: "/certificates/react-advanced.png",
      skills: ["React", "JavaScript", "Frontend Development", "Performance"],
      status: "Active",
      category: "Web Development",
    },
    {
      id: "azure-fundamentals",
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "December 2024",
      expiryDate: "December 2026",
      description: "Fundamental knowledge of cloud services and how those services are provided with Microsoft Azure.",
      credentialId: "MS-AZ-900-2024-004",
      verificationUrl: "https://learn.microsoft.com/certificate",
      image: "/certificates/azure-fundamentals.png",
      skills: ["Azure", "Cloud Services", "Microsoft", "Infrastructure"],
      status: "Active",
      category: "Cloud",
    },
    {
      id: "docker-kubernetes",
      title: "Docker & Kubernetes Essentials",
      issuer: "Linux Foundation",
      date: "November 2024",
      description: "Container orchestration, Docker containerization, and Kubernetes cluster management fundamentals.",
      credentialId: "LF-DK-2024-005",
      verificationUrl: "https://training.linuxfoundation.org/certificate",
      image: "/certificates/docker-k8s.png",
      skills: ["Docker", "Kubernetes", "DevOps", "Container Orchestration"],
      status: "Active",
      category: "DevOps",
    },
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      issuer: "IBM",
      date: "October 2024",
      description: "Essential cybersecurity concepts, threat analysis, risk management, and security best practices.",
      credentialId: "IBM-CS-2024-006",
      verificationUrl: "https://www.ibm.com/certificate",
      image: "/certificates/ibm-cybersecurity.png",
      skills: ["Cybersecurity", "Risk Management", "Threat Analysis", "Security"],
      status: "Active",
      category: "Security",
    }
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Expired":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional certifications and credentials that validate my expertise across various technologies and domains.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          {/* Filters */}
          <div className="bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Badge
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {allSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
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
            <p className="text-gray-400">
              Showing {filteredCertificates.length} of {certificates.length} certificates
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-cyan-400" />
                    <Badge className={getStatusColor(certificate.status)}>
                      {certificate.status}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {certificate.category}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg leading-tight">
                  {certificate.title}
                </CardTitle>
                <CardDescription className="text-gray-300 flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  {certificate.issuer}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {certificate.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Issued: {certificate.date}</span>
                    {certificate.expiryDate && (
                      <span className="ml-2">• Expires: {certificate.expiryDate}</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {certificate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{certificate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="w-full space-y-2">
                  {certificate.credentialId && (
                    <p className="text-xs text-gray-500">
                      ID: {certificate.credentialId}
                    </p>
                  )}
                  {certificate.verificationUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(certificate.verificationUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
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
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No certificates found matching your criteria.
            </h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search terms or filters.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
