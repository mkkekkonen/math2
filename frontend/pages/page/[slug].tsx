import DefaultTemplate from '@/templates/defaultTemplate';
import { fetchCategories, fetchPages } from '@/utils/api';
import {
  IEnrichedNode,
  INode,
  getTreeFromCategoriesAndPages,
} from '@/utils/treeData';

export const getServerSideProps = async ({ params }) => {
  const categories = await fetchCategories();
  const pages = await fetchPages();

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  const page = pages.find((page) => page.slug === params.slug);

  return { props: { tree, page } };
};

const Page = ({ tree, page }: { tree: IEnrichedNode[]; page: INode }) => {
  return (
    <DefaultTemplate nodes={tree}>
      <h1>{page.localized_name}</h1>
    </DefaultTemplate>
  );
};

export default Page;
