import { TreeNodeInArray } from 'react-simple-tree-menu/dist/TreeMenu/walk';

export type NodeType = 'category' | 'page' | 'topLevel';
export type LocaleType = 'fi' | 'en';

export interface INode {
  id: number;
  slug: string;
  localization_key: string;
  name_fi: string;
  name_en: string;
  filename?: string;
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
  pages: INode[],
  locale: LocaleType
) => {
  const nodes = [...categories, ...pages];
  const rootNodes: IEnrichedNode[] = [];

  const enrichedCategories = categories.map(enrichNode('category', locale));
  const enrichedPages = pages.map(enrichNode('page', locale));

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

  rootNodes.push({
    id: 0,
    slug: 'sources',
    name_fi: 'Lähteet',
    name_en: 'Sources',
    localization_key: 'sources',
    key: 'sources',
    label: locale === 'fi' ? 'Lähteet' : 'Sources',
    nodeType: 'topLevel',
    nodes: [],
  });

  return rootNodes;
};

const enrichNode =
  (nodeType: NodeType, locale: LocaleType) => (node: INode) => {
    const enrichedNode: IEnrichedNode = {
      ...node,
      key: `${node.id}`,
      label: locale === 'fi' ? node.name_fi : node.name_en,
      nodeType,
      nodes: null,
    };

    return enrichedNode;
  };
