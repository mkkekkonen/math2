import { INode } from './treeData';

export const fetchCategories = async (
  locale: string = 'fi'
): Promise<INode[]> => {
  const categoryRes = await fetch('http://127.0.0.1:8000/categories/', {
    headers: new Headers({
      'Accept-Language': locale,
    }),
  });
  const categories = await categoryRes.json();
  return categories as INode[];
};

export const fetchPages = async (locale: string = 'fi'): Promise<INode[]> => {
  const pageRes = await fetch('http://127.0.0.1:8000/pages/', {
    headers: new Headers({
      'Accept-Language': locale,
    }),
  });
  const pages = await pageRes.json();
  return pages as INode[];
};
