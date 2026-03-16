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
  return (
    <Card className="rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-neutral-400" />
            <Badge className="px-3 py-1.5 text-xs rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
              {certificate.status}
            </Badge>
          </div>
          <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
            {certificate.category}
          </Badge>
        </div>
        <CardTitle className="text-foreground text-lg leading-tight tracking-tight">
          {certificate.title}
        </CardTitle>
        <CardDescription className="text-neutral-400 flex items-center">
          <Building2 className="h-4 w-4 mr-1 text-neutral-500" />
          {certificate.issuer}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-neutral-500 text-sm mb-4 line-clamp-3">
          {certificate.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-neutral-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Issued: {certificate.date}</span>
            {certificate.expiryDate && (
              <span className="ml-2">• Expires: {certificate.expiryDate}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {certificate.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1.5 text-xs rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                {skill}
              </Badge>
            ))}
            {certificate.skills.length > 3 && (
              <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                +{certificate.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="w-full space-y-2">
          {certificate.credentialId && (
            <p className="text-xs text-neutral-500 font-mono">
              ID: {certificate.credentialId}
            </p>
          )}
          {certificate.verificationUrl && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded-full"
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
