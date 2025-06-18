"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { hierarchy, tree } from 'd3-hierarchy';
import SkillNodeComponent from '@/components/ui/skill-node';
import { SkillNode, D3Node, D3Link } from '@/types/skills-tree';
import { Button } from '@/components/ui/button';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2,
  GitBranch,
  TrendingUp
} from 'lucide-react';

interface SkillsTreeProps {
  data: SkillNode;
  className?: string;
}

const SkillsTree: React.FC<SkillsTreeProps> = ({ data, className = '' }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['robotics']));
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: Math.min(window.innerWidth - 40, 1400),
        height: Math.min(window.innerHeight - 200, 900),
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Filter data based on expanded nodes
  const filteredData = useMemo(() => {
    const filterNode = (node: SkillNode): SkillNode => ({
      ...node,
      children: expandedNodes.has(node.id)
        ? node.children.map(filterNode)
        : [],
    });
    return filterNode(data);
  }, [data, expandedNodes]);

  // Create D3 tree layout
  const { nodes, links } = useMemo(() => {
    const hierarchyData = hierarchy(filteredData);
    const treeLayout = tree<SkillNode>()
      .size([dimensions.height - 100, dimensions.width - 200])
      .separation((a, b) => {
        const baseDistance = a.parent === b.parent ? 1 : 2;
        const depthMultiplier = Math.max(1, 4 - a.depth);
        return baseDistance * depthMultiplier;
      });

    const treeData = treeLayout(hierarchyData);
    
    return {
      nodes: treeData.descendants() as D3Node[],
      links: treeData.links() as D3Link[],
    };
  }, [filteredData, dimensions]);

  // Node expansion toggle
  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.3));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Auto-expand all nodes
  const expandAll = () => {
    const getAllNodeIds = (node: SkillNode): string[] => [
      node.id,
      ...node.children.flatMap(getAllNodeIds),
    ];
    setExpandedNodes(new Set(getAllNodeIds(data)));
  };

  // Statistics
  const stats = useMemo(() => {
    const countNodes = (node: SkillNode): { total: number; mastered: number; inProgress: number } => {
      const current = {
        total: 1,
        mastered: node.status === 'mastered' ? 1 : 0,
        inProgress: node.status === 'in-progress' ? 1 : 0,
      };
      
      return node.children.reduce((acc, child) => {
        const childStats = countNodes(child);
        return {
          total: acc.total + childStats.total,
          mastered: acc.mastered + childStats.mastered,
          inProgress: acc.inProgress + childStats.inProgress,
        };
      }, current);
    };
    
    return countNodes(data);
  }, [data]);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  return (
    <div className={`relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden ${className}`}>
      {/* Header with controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800/80 backdrop-blur-md rounded-lg px-4 py-2 border border-gray-700">
            <h2 className="text-lg font-bold text-white flex items-center">
              <GitBranch className="mr-2 h-5 w-5 text-cyan-400" />
              Robotics Skills Path
            </h2>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-md rounded-lg px-4 py-2 border border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center">
                <TrendingUp className="mr-1 h-4 w-4 text-green-400" />
                <span>{stats.mastered} Mastered</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1" />
                <span>{stats.inProgress} In Progress</span>
              </div>
              <div>
                <span className="text-cyan-400 font-medium">{stats.total} Total Skills</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={expandAll}
            className="bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white"
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            Expand All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main SVG tree visualization */}
      <div className="w-full h-full pt-20">
        <svg
          width={dimensions.width}
          height={dimensions.height - 80}
          className="w-full h-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.05) 0%, transparent 50%)' }}
        >
          <defs>
            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g transform={`translate(${centerX + pan.x}, ${centerY + pan.y}) scale(${zoom})`}>
            {/* Connection lines */}
            {links.map((link, index) => {
              const sourceX = link.source.y;
              const sourceY = link.source.x;
              const targetX = link.target.y;
              const targetY = link.target.x;
              
              const midX = (sourceX + targetX) / 2;
              
              return (
                <path
                  key={index}
                  d={`M${sourceX},${sourceY} C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY}`}
                  fill="none"
                  stroke="url(#linkGradient)"
                  strokeWidth="2"
                  className="transition-all duration-500"
                  filter="url(#glow)"
                />
              );
            })}

            {/* Skill nodes */}
            {nodes.map((node) => (
              <SkillNodeComponent
                key={node.data.id}
                node={node.data}
                x={node.y}
                y={node.x}
                onClick={() => toggleNode(node.data.id)}
                isExpanded={expandedNodes.has(node.data.id)}
                hasChildren={node.data.children.length > 0}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #00D4FF 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #9333EA 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
    </div>
  );
};

export default SkillsTree;
