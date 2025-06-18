"use client"

import React, { useState } from 'react';
import { ArrowLeft, Home, GitBranch, Cpu, Zap, Wrench, Code, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import roboticsSkillsData from '@/data/robotics-skills-data.json';

export default function SkillsPathPage() {
  const [expandedSkills, setExpandedSkills] = useState<{[key: string]: boolean}>({
    "mathematics": true,
    "mechanical": true,
    "electronics": true,
    "software": true
  });

  const toggleSkill = (skillId: string) => {
    setExpandedSkills(prev => ({
      ...prev,
      [skillId]: !prev[skillId]
    }));
  };

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

          {/* Horizontal Skills Tree */}
          <div className="mb-12">
            <Card className="bg-gray-800/20 backdrop-blur-md border-gray-700/50 p-8">
              <div className="skills-tree-container">
                {/* Root Node */}
                <div className="root-node">
                  <div className="skill-card root-card">
                    <div className="skill-card-inner">
                      <div className="skill-icon">
                        <GitBranch className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div className="skill-title">Robotics</div>
                      <div className="skill-level">Expert</div>
                    </div>
                  </div>
                
                  {/* Main Branches */}
                  <div className="skill-branches">
                    {/* Mathematics Branch */}
                    <div className="skill-branch mathematics-branch">
                      <div className="branch-line"></div>
                      <div className="main-skill-card" onClick={() => toggleSkill('mathematics')}>
                        <div className="skill-card-inner">
                          <div className="skill-header">
                            <div className="skill-icon">
                              <Cpu className="h-5 w-5 text-purple-400" />
                            </div>
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                              Advanced
                            </Badge>
                          </div>
                          <div className="skill-title">Mathematics</div>
                          <div className="skill-status">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>Mastered</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mathematics Sub-skills */}
                      <div className={`sub-skills ${expandedSkills['mathematics'] ? 'expanded' : ''}`}>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Control System Modeling</div>
                              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Other Mathematical Concepts</div>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                In Progress
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mechanical Branch */}
                    <div className="skill-branch mechanical-branch">
                      <div className="branch-line"></div>
                      <div className="main-skill-card" onClick={() => toggleSkill('mechanical')}>
                        <div className="skill-card-inner">
                          <div className="skill-header">
                            <div className="skill-icon">
                              <Wrench className="h-5 w-5 text-amber-400" />
                            </div>
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/50">
                              Advanced
                            </Badge>
                          </div>
                          <div className="skill-title">Mechanical</div>
                          <div className="skill-status">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>Mastered</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mechanical Sub-skills */}
                      <div className={`sub-skills ${expandedSkills['mechanical'] ? 'expanded' : ''}`}>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Actuator Designs, DOF-based Designs</div>
                              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Other Mechanical Concepts</div>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                In Progress
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Electronics Branch */}
                    <div className="skill-branch electronics-branch">
                      <div className="branch-line"></div>
                      <div className="main-skill-card" onClick={() => toggleSkill('electronics')}>
                        <div className="skill-card-inner">
                          <div className="skill-header">
                            <div className="skill-icon">
                              <Zap className="h-5 w-5 text-green-400" />
                            </div>
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                              Expert
                            </Badge>
                          </div>
                          <div className="skill-title">Electronics</div>
                          <div className="skill-status">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>Mastered</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Electronics Sub-skills */}
                      <div className={`sub-skills ${expandedSkills['electronics'] ? 'expanded' : ''}`}>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">PCB Designing</div>
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Verilog/VHDL</div>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                In Progress
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill has-children">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Analog Electronics</div>
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                          <div className="sub-sub-skills">
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">Analog Circuit Design, Amplifiers, Oscillators, Timers</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill has-children">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Digital Electronics</div>
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                          <div className="sub-sub-skills">
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">Communication Protocols</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Embedded Systems</div>
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                Expert
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Sensors and Actuators</div>
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Software Branch */}
                    <div className="skill-branch software-branch">
                      <div className="branch-line"></div>
                      <div className="main-skill-card" onClick={() => toggleSkill('software')}>
                        <div className="skill-card-inner">
                          <div className="skill-header">
                            <div className="skill-icon">
                              <Code className="h-5 w-5 text-blue-400" />
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                              Expert
                            </Badge>
                          </div>
                          <div className="skill-title">Software</div>
                          <div className="skill-status">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>Mastered</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Software Sub-skills */}
                      <div className={`sub-skills ${expandedSkills['software'] ? 'expanded' : ''}`}>
                        <div className="sub-skill has-children">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">ROS & ROS2</div>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                In Progress
                              </Badge>
                            </div>
                          </div>
                          <div className="sub-sub-skills">
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">C, C++, Rust, Python</div>
                                </div>
                              </div>
                            </div>
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">Gazebo, Unity</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Embedded Programming</div>
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill has-children">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">AI & ML</div>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                In Progress
                              </Badge>
                            </div>
                          </div>
                          <div className="sub-sub-skills">
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">LLMs, RNNs, CNNs, etc.</div>
                                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                                   Advanced
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">LLM Engineering</div>
                                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                    In Progress
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">MCP (Model-Contex Protocol)</div>
                                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                    In Progress
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill has-children">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Control Algorithms</div>
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                          <div className="sub-sub-skills">
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">Program Versions of Math Concepts</div>
                                </div>
                              </div>
                            </div>
                            <div className="sub-sub-skill">
                              <div className="sub-sub-skill-line"></div>
                              <div className="sub-sub-skill-card">
                                <div className="skill-card-inner">
                                  <div className="skill-title">PID</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Simulation / Real-time Systems</div>
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">Hardware-level Programming (C, C++, Rust)</div>
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="sub-skill">
                          <div className="sub-skill-line"></div>
                          <div className="sub-skill-card">
                            <div className="skill-card-inner">
                              <div className="skill-title">High-level Prototyping (Python)</div>
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                                Expert
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    <strong className="text-purple-400">Color coding:</strong> Different domains and skill levels
                  </div>
                  <div>
                    <strong className="text-green-400">Status icons:</strong> Mastered vs in-progress skills
                  </div>
                  <div>
                    <strong className="text-yellow-400">Badge colors:</strong> Indicate skill proficiency levels
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skills-tree-container {
          width: 100%;
          overflow-x: auto;
          padding: 20px 0;
        }
        
        .root-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          margin-bottom: 60px;
        }
        
        .root-card {
          background: linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(147,51,234,0.2) 100%);
          border: 2px solid rgba(0,212,255,0.5);
          border-radius: 12px;
          padding: 16px;
          width: 160px;
          margin-bottom: 30px;
          box-shadow: 0 0 20px rgba(0,212,255,0.3);
          position: relative;
          z-index: 2;
        }
        
        .skill-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .skill-icon {
          margin-bottom: 8px;
        }
        
        .skill-title {
          font-weight: bold;
          color: white;
          margin-bottom: 4px;
        }
        
        .skill-level {
          font-size: 0.85rem;
          color: #00D4FF;
        }
        
        .skill-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #d1d5db;
          margin-top: 4px;
        }
        
        .skill-branches {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          width: 100%;
        }
        
        .skill-branch {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: calc(25% - 20px);
          min-width: 240px;
        }
        
        .branch-line {
          position: absolute;
          top: -30px;
          width: 2px;
          height: 30px;
          background: linear-gradient(to bottom, rgba(0,212,255,0.5), rgba(255,255,255,0.2));
        }
        
        .main-skill-card {
          background-color: rgba(31, 41, 55, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 10px;
          padding: 12px;
          width: 100%;
          margin-bottom: 20px;
          border-width: 1px;
          border-style: solid;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }
        
        .main-skill-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(0,212,255,0.2);
        }
        
        .mathematics-branch .main-skill-card {
          border-color: rgba(147, 51, 234, 0.5);
        }
        
        .mechanical-branch .main-skill-card {
          border-color: rgba(245, 158, 11, 0.5);
        }
        
        .electronics-branch .main-skill-card {
          border-color: rgba(16, 185, 129, 0.5);
        }
        
        .software-branch .main-skill-card {
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 8px;
        }
        
        .sub-skills {
          display: none;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          padding-top: 10px;
        }
        
        .sub-skills.expanded {
          display: flex;
        }
        
        .sub-skill {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 20px;
        }
        
        .sub-skill-line {
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 50%;
          border-left: 2px solid rgba(255,255,255,0.1);
          border-bottom: 2px solid rgba(255,255,255,0.1);
          border-bottom-left-radius: 8px;
        }
        
        .sub-skill-card {
          background-color: rgba(31, 41, 55, 0.4);
          backdrop-filter: blur(5px);
          border-radius: 8px;
          padding: 10px;
          width: 100%;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s;
        }
        
        .sub-skill-card:hover {
          transform: translateX(5px);
          background-color: rgba(31, 41, 55, 0.6);
        }
        
        .has-children {
          padding-bottom: 12px;
        }
        
        .sub-sub-skills {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
          margin-left: 30px;
          width: calc(100% - 30px);
        }
        
        .sub-sub-skill {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .sub-sub-skill-line {
          position: absolute;
          left: -30px;
          top: 0;
          width: 30px;
          height: 50%;
          border-left: 2px solid rgba(255,255,255,0.1);
          border-bottom: 2px solid rgba(255,255,255,0.1);
          border-bottom-left-radius: 8px;
        }
        
        .sub-sub-skill-card {
          background-color: rgba(31, 41, 55, 0.3);
          backdrop-filter: blur(3px);
          border-radius: 6px;
          padding: 8px;
          width: 100%;
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 0.9rem;
        }
        
        /* Animation for skill branches */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .skill-branch {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .mathematics-branch { animation-delay: 0.1s; }
        .mechanical-branch { animation-delay: 0.2s; }
        .electronics-branch { animation-delay: 0.3s; }
        .software-branch { animation-delay: 0.4s; }
        
        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .skill-branches {
            flex-direction: column;
            align-items: center;
          }
          
          .skill-branch {
            width: 90%;
            max-width: 400px;
            margin-bottom: 40px;
          }
          
          .branch-line {
            height: 20px;
            top: -20px;
          }
        }
        
        /* Grid background */
        .bg-grid-white\/\[0\.02\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
        
        .bg-grid-16 {
          background-size: 16px 16px;
        }
      `}</style>
    </div>
  );
}
