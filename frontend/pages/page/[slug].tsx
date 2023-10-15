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

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories(context.locale);
  const pages = await fetchPages(context.locale);

  const tree = getTreeFromCategoriesAndPages(categories, pages);

  const page = pages.find((page) => page.slug === context.params.slug);

  return { props: { tree, page } };
};

const Page = ({ tree, page }: { tree: IEnrichedNode[]; page: INode }) => {
  const [markdown, setMarkdown] = useState('');

  const router = useRouter();

  useEffect(() => {
    loadMarkdown(page, router.locale, setMarkdown);
  }, []);
  useEffect(() => {
    loadMarkdown(page, router.locale, setMarkdown);
  }, [router.locale]);

  return (
    <DefaultTemplate nodes={tree}>
      <Col>
        <div className="content-container">
          <MarkdownRenderer markdown={markdown} />
        </div>
      </Col>
      <Col>
        <div className="content-container">
          <div id="graph" className="jxgbox graph-container" />
        </div>
      </Col>
    </DefaultTemplate>
  );
};

export default Page;
