import { INode } from './treeData';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://math-backend-703600136736.europe-north1.run.app'
    : 'http://127.0.0.1:8000/';

export const fetchCategories = async (
  locale: string = 'fi'
): Promise<INode[]> => {
  const categoryRes = await fetch(`${baseUrl}categories/`, {
    headers: new Headers({
      'Accept-Language': locale,
    }),
  });
  const categories = await categoryRes.json();
  return categories as INode[];
};

export const fetchPages = async (locale: string = 'fi'): Promise<INode[]> => {
  const pageRes = await fetch(`${baseUrl}pages/`, {
    headers: new Headers({
      'Accept-Language': locale,
    }),
  });
  const pages = await pageRes.json();
  return pages as INode[];
};
