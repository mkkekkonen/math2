import Col from 'react-bootstrap/Col';

import DefaultTemplate from '@/templates/defaultTemplate';
import { fetchCategories, fetchPages } from '@/utils/api';
import {
  IEnrichedNode,
  INode,
  getTreeFromCategoriesAndPages,
} from '@/utils/treeData';
import NodeList from '@/components/nodeList';

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories(context.locale);
  const pages = await fetchPages(context.locale);

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  const category = categories.find(
    (category) => category.slug === context.params.slug
  );

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
      <Col>
        <div className="content-container">
          <h1>{category.localized_name}</h1>
          <NodeList
            nodes={subcategories}
            headingLocalizationKey="subcategories"
            nodeType="category"
          />
          <NodeList
            nodes={categoryPages}
            headingLocalizationKey="pages"
            nodeType="page"
          />
        </div>
      </Col>
    </DefaultTemplate>
  );
};

export default CategoryPage;
