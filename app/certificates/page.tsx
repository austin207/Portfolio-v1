"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, ExternalLink, Award, Calendar, Building2, ArrowLeft, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

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
  // Enhanced certificate data with better descriptions
  const certificates: Certificate[] = [
    {
      id: "Udemy learning",
      title: "AI Automation: Build LLM Apps & AI-Agents with n8n & APIs",
      issuer: "Udemy",
      date: "May 2025",
      description: "Developed a strong foundation in AI automation and intelligent agents, and implemented autonomous workflows using n8n.",
      credentialId: "UC-f6cac3b0-ea9e-43d2-8b21-28e329da236b",
      verificationUrl: "https://www.udemy.com/certificate/UC-f6cac3b0-ea9e-43d2-8b21-28e329da236b/",
      image: "/certificates/",
      skills: ["n8n", "AI Agents", "Automation workflows", "AI Automation", "Flowise"],
      status: "Active",
      category: "Agentic AI",
    },
    {
      id: "Udemy learning",
      title: "ROS 2 for Beginners (ROS Jazzy - 2025)",
      issuer: "Udemy",
      date: "June 2025",
      description: "Developed hands-on proficiency in ROS2 fundamentals such as nodes, topics, services, introspection, and CLI tools, with the ability to create custom ROS2 packages.",
      credentialId: "UC-fc6908b7-b208-442b-a765-8f4fd316719f",
      verificationUrl: "https://www.udemy.com/certificate/UC-fc6908b7-b208-442b-a765-8f4fd316719f/",
      image: "/certificates/",
      skills: ["ROS 2", "Topics", "Nodes", "Services", "Interfaces"],
      status: "Active",
      category: "Robotics",
    },
    {
      id: "Udemy learning",
      title: "PCB Design with Altium Designer",
      issuer: "Udemy",
      date: "June 2025",
      description: "Designed custom STM-based microcontroller PCBs using Altium and leveraged advanced features for optimized hardware performance.",
      credentialId: "UC-92908006-2d76-4ac9-94ad-0ddbe6703e75",
      verificationUrl: "https://www.udemy.com/certificate/UC-92908006-2d76-4ac9-94ad-0ddbe6703e75/",
      image: "/certificates/",
      skills: ["Multi-layer PCB Design", "High-Speed Design Principles", "Custom Footprint & Symbol Creation", "Embedded Components & Internal Planes", "Industrial standards"],
      status: "Active",
      category: "PCB Designing",
    },  
    {
      id: "IBM learning",
      title: "Prompt Engineering for Everyone",
      issuer: "Cognitive class",
      date: "January 2025",
      description: "Core knowledge of cloud services, Azure service categories, workloads, security, privacy, compliance, trust, and Azure pricing and support models for enterprise solutions.",
      credentialId: "39a494ce5ce74dfeb9436ee2bce17014",
      verificationUrl: "https://courses.cognitiveclass.ai/certificates/39a494ce5ce74dfeb9436ee2bce17014",
      image: "/certificates/",
      skills: ["Prompting Techniques", "Few-shot Prompting", "COT", "TOT", "System Prompt Engineering"],
      status: "Active",
      category: "Prompt Engineering",
    },
    {
      id: "Altium",
      title: "ALTIUM EDUCATION PCB BASIC DESIGN COURSE",
      issuer: "Altium Education",
      date: "June 2025",
      description: "Completed foundational course on Altium Designer covering PCB design fundamentals, schematic capture, layout techniques, and design rule management.",
      credentialId: "cert_trm6d962",
      verificationUrl: "https://drive.google.com/file/d/1b_Dy9Eq1H2Xi1srfCOkrKLGTiF9hbOoB/view",
      image: "/certificates/",
      skills: ["Schematic Capture", "PCB Layout Design", "Net Management", "3D PCB Visualization", "Design Rule Setup & Management"],
      status: "Active",
      category: "PCB Designing",
    },
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals Specialist",
      issuer: "IBM Security",
      date: "October 2024",
      description: "Essential cybersecurity concepts, threat analysis methodologies, risk management frameworks, incident response procedures, and comprehensive security best practices for modern organizations.",
      credentialId: "IBM-CS-2024-006",
      verificationUrl: "https://www.ibm.com/certificate",
      image: "/certificates/ibm-cybersecurity.png",
      skills: ["Cybersecurity", "Risk Management", "Threat Analysis", "Security", "Compliance"],
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
        return "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-emerald-500/20"
      case "Expired":
        return "bg-red-500/20 text-red-300 border-red-400/50 shadow-red-500/20"
      case "In Progress":
        return "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-amber-500/20"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/50 shadow-gray-500/20"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Agentic AI": "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
      "Robotics": "bg-purple-500/20 text-purple-300 border-purple-400/50",
      "PCB Designing": "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
      "Prompt Engineering": "bg-amber-500/20 text-amber-300 border-amber-400/50",
      "Security": "bg-red-500/20 text-red-300 border-red-400/50",
    }
    return colors[category] || "bg-gray-500/20 text-gray-300 border-gray-400/50"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-purple-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group"
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
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full mb-6">
              <Award className="h-8 w-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Professional Certifications
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive collection of professional certifications and credentials that validate my expertise 
              across various technologies, platforms, and domains in the modern tech landscape.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-8">
            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search certificates by title, issuer, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 bg-gray-800/40 border-gray-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm text-white placeholder-gray-400 text-lg rounded-xl transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Filter className="h-6 w-6 mr-3 text-cyan-400" />
                  Advanced Filters
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

                {/* Skills Filter */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {allSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 text-xs ${
                          selectedSkills.includes(skill) 
                            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-400/50 shadow-lg" 
                            : "border-gray-600 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-300"
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
              <p className="text-gray-400 text-lg">
                Displaying <span className="text-cyan-400 font-semibold">{filteredCertificates.length}</span> of{" "}
                <span className="text-purple-400 font-semibold">{certificates.length}</span> certificates
              </p>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate, index) => (
              <Card
                key={certificate.id}
                className="group bg-gray-800/40 backdrop-blur-md border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 rounded-2xl overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards"
                }}
              >
                <CardHeader className="pb-4 relative">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                        <Award className="h-5 w-5 text-cyan-400" />
                      </div>
                      <Badge className={`${getStatusColor(certificate.status)} shadow-lg`}>
                        {certificate.status}
                      </Badge>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCategoryColor(certificate.category)}`}
                    >
                      {certificate.category}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-white text-xl leading-tight mt-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {certificate.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-300 flex items-center mt-2">
                    <Building2 className="h-4 w-4 mr-2 text-purple-400" />
                    <span className="font-medium">{certificate.issuer}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-6">
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-4">
                    {certificate.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                      <span>Issued: <span className="text-white font-medium">{certificate.date}</span></span>
                      {certificate.expiryDate && (
                        <span className="ml-3 text-gray-500">
                          • Expires: <span className="text-amber-400">{certificate.expiryDate}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.slice(0, 4).map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="secondary" 
                          className="text-xs bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {certificate.skills.length > 4 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs text-purple-400 border-purple-500/50 bg-purple-500/10"
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
                      <div className="text-xs text-gray-500 font-mono bg-gray-900/50 rounded-lg p-2">
                        <span className="text-gray-400">Credential ID:</span> {certificate.credentialId}
                      </div>
                    )}
                    {certificate.verificationUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 text-cyan-300 hover:text-white transition-all duration-300 group"
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
              <div className="inline-flex items-center justify-center p-4 bg-gray-800/50 rounded-full mb-6">
                <Award className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                No certificates found matching your criteria
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more certifications.
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white"
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

        .bg-grid-white\/\[0\.02\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }

        .bg-grid-16 {
          background-size: 16px 16px;
        }
      `}</style>
    </div>
  )
}
