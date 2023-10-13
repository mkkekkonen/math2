import { useState } from 'react';
import DefaultTemplate from '@/templates/defaultTemplate';
import { fetchCategories, fetchPages } from '@/utils/api';
import {
  IEnrichedNode,
  INode,
  getTreeFromCategoriesAndPages,
} from '@/utils/treeData';

const loadMarkdown = async (page: INode, setMarkdown: Function) => {
  if (page.filename) {
    const md = await import(`../../md/${page.filename}.md`);
    setMarkdown(md.default);
  }
};

export const getServerSideProps = async ({ params }) => {
  const categories = await fetchCategories();
  const pages = await fetchPages();

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  const page = pages.find((page) => page.slug === params.slug);

  return { props: { tree, page } };
};

const Page = ({ tree, page }: { tree: IEnrichedNode[]; page: INode }) => {
  const [markdown, setMarkdown] = useState('');

  loadMarkdown(page, setMarkdown);

  return (
    <DefaultTemplate nodes={tree}>
      <h1>{page.localized_name}</h1>
      <pre>{markdown}</pre>
    </DefaultTemplate>
  );
};

export default Page;
