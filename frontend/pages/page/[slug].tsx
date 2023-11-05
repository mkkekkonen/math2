import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Col from 'react-bootstrap/Col';

import DefaultTemplate from '@/templates/defaultTemplate';
import MarkdownRenderer from '@/components/markdownRenderer';
import { fetchCategories, fetchPages } from '@/utils/api';
import {
  IEnrichedNode,
  INode,
  getTreeFromCategoriesAndPages,
} from '@/utils/treeData';

const loadMarkdown = async (
  page: INode,
  locale: string,
  setMarkdown: Function
) => {
  if (page.filename) {
    const md = await import(`../../md/${page.filename}_${locale}.md`);
    setMarkdown(md.default);
  }
};

const loadMathScene = async (page: INode, setMathRenderer: Function) => {
  if (page.filename) {
    const renderer = await import(`math/entryPoints/${page.filename}`);
    setMathRenderer(new renderer.default());
  }
};

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories(context.locale);
  const pages = await fetchPages(context.locale);

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  const page = pages.find((page) => page.slug === context.params.slug);

  return { props: { tree, page } };
};

const Page = ({ tree, page }: { tree: IEnrichedNode[]; page: INode }) => {
  const [markdown, setMarkdown] = useState('');
  const [mathRenderer, setMathRenderer] = useState(null);

  const router = useRouter();

  useEffect(() => {
    loadMarkdown(page, router.locale, setMarkdown);
    loadMathScene(page, setMathRenderer);
  }, []);
  useEffect(() => {
    loadMarkdown(page, router.locale, setMarkdown);
  }, [router.locale]);
  useEffect(() => {
    if (mathRenderer) {
      mathRenderer.initialize();
    }
  }, [mathRenderer]);

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
          <MarkdownRenderer markdown={markdown} />
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

export default Page;
