import { TreeNodeInArray } from 'react-simple-tree-menu/dist/TreeMenu/walk';

export interface INode {
  id: number;
  slug: string;
  localization_key: string;
  parent?: number;
}

export interface IEnrichedNode extends INode, TreeNodeInArray {
  key: string;
  label: string;
  nodes: IEnrichedNode[];
}

export const getTreeFromCategoriesAndPages = (
  categories: INode[],
  pages: INode[]
) => {
  const nodes = [...categories, ...pages];
  const rootNodes: IEnrichedNode[] = [];

  const enrichedCategories = categories.map(enrichNode);
  const enrichedPages = pages.map(enrichNode);

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

const enrichNode = (node: INode) => {
  const enrichedNode: IEnrichedNode = {
    ...node,
    key: `${node.id}`,
    label: node.localization_key,
    nodes: null,
  };

  return enrichedNode;
};
