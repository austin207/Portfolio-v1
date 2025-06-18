import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Building2, Calendar, ExternalLink } from "lucide-react"

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

interface CertificateCardProps {
  certificate: Certificate
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
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
    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm">
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
  )
}
