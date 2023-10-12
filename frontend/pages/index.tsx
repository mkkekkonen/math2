import DefaultTemplate from '../templates/defaultTemplate';
import { fetchCategories, fetchPages } from '../utils/api';
import {
  IEnrichedNode,
  getTreeFromCategoriesAndPages,
} from '../utils/treeData';

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories();
  const pages = await fetchPages();

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  return { props: { tree } };
};

const Index = ({ tree }: { tree: IEnrichedNode[] }) => (
  <DefaultTemplate nodes={tree}>
    <h1>Hello world</h1>
  </DefaultTemplate>
);

export default Index;
