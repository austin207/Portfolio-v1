// Types for the Skills Tree data structure
export interface SkillNode {
    name: string;
    id: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    description: string;
    color: string;
    status: 'mastered' | 'in-progress' | 'locked';
    children: SkillNode[];
  }
  
  // For D3 tree computation
  export interface D3Node {
    x: number;
    y: number;
    data: SkillNode;
    depth: number;
    height: number;
    parent?: D3Node;
    children?: D3Node[];
  }
  
  export interface D3Link {
    source: D3Node;
    target: D3Node;
  }
  
  export interface TreeLayoutConfig {
    width: number;
    height: number;
    nodeSize: [number, number];
    separation: (a: D3Node, b: D3Node) => number;
  }
  