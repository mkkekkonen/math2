import { useEffect } from 'react';

import MarkdownRenderer from '@/components/markdownRenderer';
import DefaultTemplate from '@/templates/defaultTemplate';
import { fetchCategories, fetchPages } from '@/utils/api';
import { IEnrichedNode, getTreeFromCategoriesAndPages } from '@/utils/treeData';
import Col from 'react-bootstrap/Col';

import Renderer from '@/mathRenderers/startPage';

import startPageMd from '@/md/startPage.md';

const mathRenderer = new Renderer();

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories();
  const pages = await fetchPages();

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  return { props: { tree } };
};

const Index = ({ tree }: { tree: IEnrichedNode[] }) => {
  useEffect(() => mathRenderer.initialize(), []);

  return (
    <DefaultTemplate nodes={tree}>
      <style jsx>{`
        .logging-area {
          background-color: #eee;
          margin-top: 1rem;
          max-width: 400px;
          min-height: 200px;
        }
      `}</style>

      <Col>
        <div className="content-container">
          <MarkdownRenderer markdown={startPageMd} />
        </div>
      </Col>
      <Col>
        <div className="content-container">
          <div id="graph" className="jxgbox graph-container" />
          <pre id="log" className="logging-area" />
        </div>
      </Col>
    </DefaultTemplate>
  );
};

export default Index;
