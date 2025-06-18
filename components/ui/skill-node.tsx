"use client"

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SkillNode } from '@/types/skills-tree';
import { 
  Award, 
  BookOpen, 
  Zap, 
  Trophy,
  Clock,
  CheckCircle,
  Circle,
  ArrowRight
} from 'lucide-react';

interface SkillNodeProps {
  node: SkillNode;
  x: number;
  y: number;
  onClick?: () => void;
  isExpanded?: boolean;
  hasChildren?: boolean;
}

const SkillNodeComponent: React.FC<SkillNodeProps> = ({
  node,
  x,
  y,
  onClick,
  isExpanded,
  hasChildren
}) => {
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Expert':
        return <Trophy className="w-4 h-4" />;
      case 'Advanced':
        return <Award className="w-4 h-4" />;
      case 'Intermediate':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mastered':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered':
        return 'bg-green-500/20 border-green-500/50';
      case 'in-progress':
        return 'bg-yellow-500/20 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  const nodeRadius = node.depth === 0 ? 40 : node.depth === 1 ? 32 : 24;
  const nodeSize = node.depth === 0 ? 300 : node.depth === 1 ? 250 : 200;

  return (
    <g transform={`translate(${x}, ${y})`} className="skill-node">
      {/* Connection indicator for expandable nodes */}
      {hasChildren && (
        <g className="expand-indicator">
          <circle
            cx={nodeRadius + 15}
            cy={0}
            r={8}
            fill="rgba(0, 212, 255, 0.2)"
            stroke="#00D4FF"
            strokeWidth={2}
            className="cursor-pointer hover:fill-cyan-400/30 transition-all duration-300"
            onClick={onClick}
          />
          <ArrowRight
            x={nodeRadius + 11}
            y={-4}
            width={8}
            height={8}
            className={`text-cyan-400 cursor-pointer transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : ''
            }`}
            onClick={onClick}
          />
        </g>
      )}

      {/* Main skill node */}
      <foreignObject
        x={-nodeSize / 2}
        y={-50}
        width={nodeSize}
        height={100}
        className="overflow-visible"
      >
        <Card
          className={`w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${getStatusColor(
            node.status
          )} bg-gray-800/80 backdrop-blur-md border-2`}
          onClick={onClick}
          style={{
            borderColor: node.color + '80',
            boxShadow: `0 0 20px ${node.color}30`,
          }}
        >
          <CardContent className="p-4 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div
                  className="p-1 rounded-full"
                  style={{ backgroundColor: node.color + '20' }}
                >
                  <div style={{ color: node.color }}>
                    {getLevelIcon(node.level)}
                  </div>
                </div>
                {getStatusIcon(node.status)}
              </div>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: node.color + '50',
                  color: node.color,
                  backgroundColor: node.color + '10',
                }}
              >
                {node.level}
              </Badge>
            </div>

            {/* Title */}
            <h3
              className="font-bold text-center text-white text-sm leading-tight mb-2"
              style={{
                color: node.depth === 0 ? node.color : '#ffffff',
              }}
            >
              {node.name}
            </h3>

            {/* Description for larger nodes */}
            {node.depth <= 1 && (
              <p className="text-gray-300 text-xs text-center line-clamp-2">
                {node.description}
              </p>
            )}

            {/* Children count indicator */}
            {hasChildren && (
              <div className="text-center mt-1">
                <Badge
                  variant="secondary"
                  className="text-xs bg-cyan-500/20 text-cyan-300"
                >
                  {node.children.length} skills
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </foreignObject>

      {/* Pulsing effect for root node */}
      {node.depth === 0 && (
        <circle
          cx={0}
          cy={0}
          r={nodeRadius + 10}
          fill="none"
          stroke={node.color}
          strokeWidth={2}
          strokeOpacity={0.3}
          className="animate-pulse"
        />
      )}
    </g>
  );
};

export default SkillNodeComponent;
