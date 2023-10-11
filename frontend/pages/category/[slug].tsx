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

  const category = categories.find((category) => category.slug === params.slug);

  return { props: { tree, category } };
};

const CategoryPage = ({
  tree,
  category,
}: {
  tree: IEnrichedNode[];
  category: INode;
}) => {
  return (
    <DefaultTemplate nodes={tree}>
      <h1>{category.localized_name}</h1>
    </DefaultTemplate>
  );
};

export default CategoryPage;
