import MarkdownRenderer from '@/components/markdownRenderer';
import DefaultTemplate from '@/templates/defaultTemplate';
import { fetchCategories, fetchPages } from '@/utils/api';
import { IEnrichedNode, getTreeFromCategoriesAndPages } from '@/utils/treeData';

import startPageMd from '@/md/startPage.md';

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories();
  const pages = await fetchPages();

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  return { props: { tree } };
};

const Index = ({ tree }: { tree: IEnrichedNode[] }) => (
  <DefaultTemplate nodes={tree}>
    <MarkdownRenderer markdown={startPageMd} />
  </DefaultTemplate>
);

export default Index;
