"use client"

import React, { useState } from 'react';
import { ArrowLeft, Home, GitBranch, Award, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface SkillNode {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  status: 'mastered' | 'in-progress' | 'locked';
  description: string;
  children?: SkillNode[];
}

export default function SkillsPathPage() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['robotics']));

  const skillsData: SkillNode = {
    id: 'robotics',
    name: 'Robotics',
    level: 'Expert',
    status: 'mastered',
    description: 'Comprehensive robotics expertise spanning multiple disciplines',
    children: [
      {
        id: 'mathematics',
        name: 'Mathematics',
        level: 'Advanced',
        status: 'mastered',
        description: 'Mathematical foundations for robotics systems',
        children: [
          {
            id: 'control-modeling',
            name: 'Control System Modeling',
            level: 'Advanced',
            status: 'mastered',
            description: 'Mathematical modeling of control systems and dynamics'
          },
          {
            id: 'math-concepts',
            name: 'Other Mathematical Concepts',
            level: 'Intermediate',
            status: 'in-progress',
            description: 'Linear algebra, calculus, differential equations'
          }
        ]
      },
      {
        id: 'mechanical',
        name: 'Mechanical',
        level: 'Advanced',
        status: 'mastered',
        description: 'Mechanical design and engineering principles',
        children: [
          {
            id: 'actuator-designs',
            name: 'Actuator Designs, DOF-based Designs',
            level: 'Advanced',
            status: 'mastered',
            description: 'Design and analysis of mechanical actuators and degrees of freedom'
          },
          {
            id: 'mechanical-concepts',
            name: 'Other Mechanical Concepts',
            level: 'Intermediate',
            status: 'in-progress',
            description: 'Kinematics, dynamics, materials science'
          }
        ]
      },
      {
        id: 'electronics',
        name: 'Electronics',
        level: 'Expert',
        status: 'mastered',
        description: 'Electronic systems design and implementation',
        children: [
          {
            id: 'pcb-design',
            name: 'PCB Designing',
            level: 'Advanced',
            status: 'mastered',
            description: 'Printed circuit board layout and design'
          },
          {
            id: 'verilog-vhdl',
            name: 'Verilog/VHDL',
            level: 'Intermediate',
            status: 'in-progress',
            description: 'Hardware description languages (to an extent)'
          },
          {
            id: 'analog-electronics',
            name: 'Analog Electronics',
            level: 'Advanced',
            status: 'mastered',
            description: 'Analog circuit design and analysis',
            children: [
              {
                id: 'analog-circuits',
                name: 'Analog Circuit Design, Amplifiers, Oscillators, Timers',
                level: 'Advanced',
                status: 'mastered',
                description: 'Design of analog circuits including amplifiers and timing circuits'
              }
            ]
          },
          {
            id: 'digital-electronics',
            name: 'Digital Electronics',
            level: 'Advanced',
            status: 'mastered',
            description: 'Digital circuit design and protocols',
            children: [
              {
                id: 'communication-protocols',
                name: 'Communication Protocols',
                level: 'Advanced',
                status: 'mastered',
                description: 'I2C, SPI, UART, CAN bus, and other protocols'
              }
            ]
          },
          {
            id: 'embedded-systems',
            name: 'Embedded Systems',
            level: 'Expert',
            status: 'mastered',
            description: 'Microcontroller and embedded system development'
          },
          {
            id: 'sensors-actuators',
            name: 'Sensors and Actuators',
            level: 'Advanced',
            status: 'mastered',
            description: 'Integration and control of various sensors and actuators'
          }
        ]
      },
      {
        id: 'software',
        name: 'Software',
        level: 'Expert',
        status: 'mastered',
        description: 'Software development for robotics systems',
        children: [
          {
            id: 'ros-ros2',
            name: 'ROS & ROS2',
            level: 'Expert',
            status: 'mastered',
            description: 'Robot Operating System framework expertise',
            children: [
              {
                id: 'ros-languages',
                name: 'C, C++, Rust, Python',
                level: 'Expert',
                status: 'mastered',
                description: 'Programming languages for ROS development'
              },
              {
                id: 'simulation-tools',
                name: 'Gazebo, Unity',
                level: 'Advanced',
                status: 'mastered',
                description: 'Simulation environments for robotics'
              }
            ]
          },
          {
            id: 'embedded-programming',
            name: 'Embedded Programming',
            level: 'Advanced',
            status: 'mastered',
            description: 'Low-level programming for embedded systems'
          },
          {
            id: 'ai-ml',
            name: 'AI & ML',
            level: 'Advanced',
            status: 'mastered',
            description: 'Artificial Intelligence and Machine Learning for robotics',
            children: [
              {
                id: 'ml-models',
                name: 'LLMs, RNNs, CNNs, etc.',
                level: 'Advanced',
                status: 'mastered',
                description: 'Various machine learning model architectures'
              },
              {
                id: 'llm-engineering',
                name: 'LLM Engineering',
                level: 'Advanced',
                status: 'mastered',
                description: 'Large Language Model development and deployment'
              },
              {
                id: 'mcp',
                name: 'MCP (Model-Constrained Policy)',
                level: 'Intermediate',
                status: 'in-progress',
                description: 'Advanced robotics control using constrained policies'
              }
            ]
          },
          {
            id: 'control-algorithms',
            name: 'Control Algorithms',
            level: 'Advanced',
            status: 'mastered',
            description: 'Implementation of control theory in software',
            children: [
              {
                id: 'programmed-math',
                name: 'Program Versions of Math Concepts',
                level: 'Advanced',
                status: 'mastered',
                description: 'Software implementation of mathematical control concepts'
              },
              {
                id: 'pid-controllers',
                name: 'PID Controllers',
                level: 'Expert',
                status: 'mastered',
                description: 'Proportional-Integral-Derivative control implementation'
              }
            ]
          },
          {
            id: 'simulation-realtime',
            name: 'Simulation / Real-time Systems',
            level: 'Advanced',
            status: 'mastered',
            description: 'Real-time system development and simulation'
          },
          {
            id: 'hardware-programming',
            name: 'Hardware-level Programming',
            level: 'Advanced',
            status: 'mastered',
            description: 'Low-level programming in C, C++, Rust'
          },
          {
            id: 'high-level-prototyping',
            name: 'High-level Prototyping',
            level: 'Expert',
            status: 'mastered',
            description: 'Rapid prototyping using Python'
          }
        ]
      }
    ]
  };

  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50';
      case 'in-progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/50';
      case 'Advanced':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
      case 'Intermediate':
        return 'bg-green-500/20 text-green-300 border-green-400/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  const getDomainColor = (nodeId: string) => {
    if (nodeId.includes('mathematics')) return 'border-purple-400/50 shadow-purple-500/20';
    if (nodeId.includes('mechanical')) return 'border-amber-400/50 shadow-amber-500/20';
    if (nodeId.includes('electronics')) return 'border-emerald-400/50 shadow-emerald-500/20';
    if (nodeId.includes('software')) return 'border-blue-400/50 shadow-blue-500/20';
    return 'border-cyan-400/50 shadow-cyan-500/20';
  };

  const renderSkillNode = (node: SkillNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className={`skill-node depth-${depth} mb-4`}>
        <div className="node-container relative">
          {/* Skill Card */}
          <Card 
            className={`skill-card bg-gray-800/60 backdrop-blur-md border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group ${
              depth === 0 ? 'root-node border-cyan-400/50 shadow-2xl shadow-cyan-500/20' : getDomainColor(node.id)
            } ${depth > 2 ? 'compact-card' : ''}`}
            onClick={() => hasChildren && toggleExpanded(node.id)}
            style={{
              marginLeft: depth > 0 ? `${depth * 2}rem` : '0',
              maxWidth: depth === 0 ? '500px' : depth === 1 ? '450px' : '400px',
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-cyan-400" />
                  {hasChildren && (
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className={getStatusColor(node.status)}>
                    {node.status}
                  </Badge>
                  <Badge variant="outline" className={getLevelColor(node.level)}>
                    {node.level}
                  </Badge>
                </div>
              </div>
              <CardTitle className={`text-white group-hover:text-cyan-300 transition-colors ${
                depth === 0 ? 'text-xl' : depth === 1 ? 'text-lg' : 'text-base'
              }`}>
                {node.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-sm">
                {node.description}
              </CardDescription>
              {hasChildren && (
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {node.children?.length} sub-skills
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Connection line to parent */}
          {depth > 0 && (
            <div 
              className="absolute w-8 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent -left-8 top-6"
              style={{ top: '1.5rem' }}
            />
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="children-container mt-4 relative">
            {/* Vertical connector */}
            {depth < 3 && (
              <div 
                className="absolute w-0.5 bg-gradient-to-b from-cyan-400/50 to-transparent"
                style={{
                  left: `${(depth + 1) * 2 - 0.5}rem`,
                  top: '0',
                  height: '100%'
                }}
              />
            )}
            {node.children?.map((child, index) => (
              <div key={child.id} className="relative">
                {renderSkillNode(child, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const calculateStats = (node: SkillNode): { total: number; mastered: number; inProgress: number } => {
    let stats = {
      total: 1,
      mastered: node.status === 'mastered' ? 1 : 0,
      inProgress: node.status === 'in-progress' ? 1 : 0
    };

    if (node.children) {
      node.children.forEach(child => {
        const childStats = calculateStats(child);
        stats.total += childStats.total;
        stats.mastered += childStats.mastered;
        stats.inProgress += childStats.inProgress;
      });
    }

    return stats;
  };

  const stats = calculateStats(skillsData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-purple-900/20" />
      
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
              Explore my comprehensive expertise in robotics engineering across mathematics, 
              mechanical design, electronics, and software development. Click on nodes to expand skill branches.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gray-800/40 backdrop-blur-md border-gray-700/50 text-center hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.total}</div>
                <div className="text-gray-300">Total Skills</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/40 backdrop-blur-md border-gray-700/50 text-center hover:border-emerald-400/50 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{stats.mastered}</div>
                <div className="text-gray-300">Mastered</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/40 backdrop-blur-md border-gray-700/50 text-center hover:border-amber-400/50 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-amber-400 mb-2">{stats.inProgress}</div>
                <div className="text-gray-300">In Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Tree */}
          <div className="skills-tree-container bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                <GitBranch className="mr-3 h-6 w-6 text-cyan-400" />
                Interactive Skills Tree
              </h2>
              <p className="text-gray-400">Click on skill cards to expand and explore sub-skills</p>
            </div>
            {renderSkillNode(skillsData)}
          </div>

          {/* Controls Info */}
          <div className="mt-8 text-center">
            <Card className="bg-gray-800/30 backdrop-blur-md border-gray-700/50 p-6 max-w-2xl mx-auto">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <strong className="text-cyan-400">Click nodes:</strong> Expand/collapse skill branches
                  </div>
                  <div>
                    <strong className="text-purple-400">Color coding:</strong> Different domains and skill levels
                  </div>
                  <div>
                    <strong className="text-green-400">Status badges:</strong> Mastered vs in-progress skills
                  </div>
                  <div>
                    <strong className="text-amber-400">Responsive design:</strong> Works on all screen sizes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skill-card {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .skill-card.root-node {
          transform: scale(1.02);
        }
        
        .skill-card.compact-card {
          font-size: 0.9rem;
        }
        
        .skill-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        @media (max-width: 768px) {
          .skill-card {
            margin-left: 0 !important;
            max-width: 100% !important;
          }
          
          .children-container {
            margin-left: 1rem;
          }
        }
      `}</style>
    </div>
  );
}