import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MarkdownRenderer from 'components/markdownRenderer';
import DefaultTemplate from 'templates/defaultTemplate';
import { fetchCategories, fetchPages } from 'utils/api';
import { IEnrichedNode, getTreeFromCategoriesAndPages } from 'utils/treeData';
import Col from 'react-bootstrap/Col';

const loadMarkdown = async (
  locale: string,
  setMarkdown: (param: string) => void
) => {
  if (locale) {
    const md = await import(`../md/sources_${locale}.md`);
    setMarkdown(md.default);
  }
};

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories(context.locale);
  const pages = await fetchPages(context.locale);

  const tree = getTreeFromCategoriesAndPages(categories, pages, context.locale);

  return { props: { tree } };
};

const Sources = ({ tree }: { tree: IEnrichedNode[] }) => {
  const [markdown, setMarkdown] = useState('');

  const router = useRouter();

  useEffect(() => {
    loadMarkdown(router.locale, setMarkdown);
  }, [router.locale]);

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

      <Col md={6}>
        <div className="content-container">
          <MarkdownRenderer markdown={markdown} />
        </div>
      </Col>
    </DefaultTemplate>
  );
};

export default Sources;
