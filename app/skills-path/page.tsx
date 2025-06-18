"use client"

import React from 'react';
import { ArrowLeft, Home, GitBranch, Cpu, Zap, Wrench, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SkillsTree from '@/components/sections/skills-tree';
import Link from 'next/link';
import roboticsSkillsData from '@/data/robotics-skills-data.json';
import { SkillNode } from '@/types/skills-tree';

export default function SkillsPathPage() {
  const skillsData = roboticsSkillsData as SkillNode;

  const domainStats = [
    {
      name: 'Mathematics',
      icon: <Cpu className="h-6 w-6" />,
      color: '#9333EA',
      skillCount: 2,
      description: 'Control systems and mathematical modeling'
    },
    {
      name: 'Mechanical',
      icon: <Wrench className="h-6 w-6" />,
      color: '#F59E0B',
      skillCount: 2,
      description: 'Actuator design and mechanical engineering'
    },
    {
      name: 'Electronics',
      icon: <Zap className="h-6 w-6" />,
      color: '#10B981',
      skillCount: 6,
      description: 'PCB design, embedded systems, and circuits'
    },
    {
      name: 'Software',
      icon: <Code className="h-6 w-6" />,
      color: '#3B82F6',
      skillCount: 7,
      description: 'ROS, AI/ML, and control algorithms'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-purple-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
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
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full mb-6">
              <GitBranch className="h-10 w-10 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Robotics Skills Journey
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore my comprehensive expertise in robotics engineering, spanning across mathematics, 
              mechanical design, electronics, and software development. Click on nodes to expand and 
              discover the interconnected nature of robotics skills.
            </p>
          </div>

          {/* Domain Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {domainStats.map((domain, index) => (
              <Card 
                key={domain.name}
                className="bg-gray-800/40 backdrop-blur-md border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: `0 0 20px ${domain.color}20`,
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: domain.color + '20' }}
                    >
                      <div style={{ color: domain.color }}>
                        {domain.icon}
                      </div>
                    </div>
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: domain.color }}
                    >
                      {domain.skillCount}
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">
                    {domain.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {domain.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Skills Tree */}
          <div className="mb-12">
            <Card className="bg-gray-800/20 backdrop-blur-md border-gray-700/50 p-8">
              <SkillsTree 
                data={skillsData} 
                className="min-h-[800px] w-full"
              />
            </Card>
          </div>

          {/* Instructions */}
          <div className="text-center">
            <Card className="bg-gray-800/30 backdrop-blur-md border-gray-700/50 p-6 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-center">
                  <GitBranch className="mr-2 h-5 w-5 text-cyan-400" />
                  Interactive Navigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <strong className="text-cyan-400">Click nodes:</strong> Expand/collapse skill branches
                  </div>
                  <div>
                    <strong className="text-purple-400">Zoom controls:</strong> Navigate large skill trees
                  </div>
                  <div>
                    <strong className="text-green-400">Color coding:</strong> Different domains and skill levels
                  </div>
                  <div>
                    <strong className="text-yellow-400">Status icons:</strong> Mastered vs in-progress skills
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .bg-grid-white\/\[0\.02\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
        .bg-grid-16 {
          background-size: 16px 16px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
