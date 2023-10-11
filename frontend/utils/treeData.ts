import { TreeNodeInArray } from 'react-simple-tree-menu/dist/TreeMenu/walk';

type NodeType = 'category' | 'page';

export interface INode {
  id: number;
  slug: string;
  localization_key: string;
  localized_name: string;
  parent?: number;
}

export interface IEnrichedNode extends INode, TreeNodeInArray {
  key: string;
  label: string;
  nodeType: NodeType;
  nodes: IEnrichedNode[];
}

export const getTreeFromCategoriesAndPages = (
  categories: INode[],
  pages: INode[]
) => {
  const nodes = [...categories, ...pages];
  const rootNodes: IEnrichedNode[] = [];

  const enrichedCategories = categories.map(enrichNode('category'));
  const enrichedPages = pages.map(enrichNode('page'));

  enrichedCategories.forEach((category) => {
    category.nodes = enrichedCategories.filter(
      (listNode) => listNode.parent === category.id
    );
    category.nodes = category.nodes.concat(
      enrichedPages.filter((page) => page.parent === category.id)
    );

    if (!category.parent) {
      rootNodes.push(category);
    }
  });

  return rootNodes;
};

const enrichNode = (nodeType: NodeType) => (node: INode) => {
  const enrichedNode: IEnrichedNode = {
    ...node,
    key: `${node.id}`,
    label: node.localized_name,
    nodeType,
    nodes: null,
  };

  return enrichedNode;
};
