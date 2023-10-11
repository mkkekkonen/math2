import { INode } from './treeData';

export const fetchCategories = async (): Promise<INode[]> => {
  const categoryRes = await fetch('http://127.0.0.1:8000/categories/');
  const categories = await categoryRes.json();
  return categories as INode[];
};

export const fetchPages = async (): Promise<INode[]> => {
  const pageRes = await fetch('http://127.0.0.1:8000/pages/');
  const pages = await pageRes.json();
  return pages as INode[];
};
