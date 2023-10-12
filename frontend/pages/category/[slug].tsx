import DefaultTemplate from '@/templates/defaultTemplate';
import { fetchCategories, fetchPages } from '@/utils/api';
import {
  IEnrichedNode,
  INode,
  getTreeFromCategoriesAndPages,
} from '@/utils/treeData';
import NodeList from '@/components/nodeList';

export const getServerSideProps = async ({ params }) => {
  const categories = await fetchCategories();
  const pages = await fetchPages();

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  const category = categories.find((category) => category.slug === params.slug);

  return { props: { tree, category, categories, pages } };
};

const CategoryPage = ({
  tree,
  category,
  categories,
  pages,
}: {
  tree: IEnrichedNode[];
  category: INode;
  categories: INode[];
  pages: INode[];
}) => {
  const subcategories = categories.filter(
    (listCategory) => listCategory.parent === category.id
  );
  const categoryPages = pages.filter((page) => page.parent === category.id);

  return (
    <DefaultTemplate nodes={tree}>
      <h1>{category.localized_name}</h1>
      <NodeList
        nodes={subcategories}
        headingLocalizationKey="Alakategoriat"
        nodeType="category"
      />
      <NodeList
        nodes={categoryPages}
        headingLocalizationKey="Sivut"
        nodeType="page"
      />
    </DefaultTemplate>
  );
};

export default CategoryPage;
