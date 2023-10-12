import { ReactNode, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import TreeMenu from 'react-simple-tree-menu';

import { IEnrichedNode, NodeType } from '@/utils/treeData';

import 'react-simple-tree-menu/dist/main.css';

const navigate = (router) => (item) => {
  switch (item.nodeType as NodeType) {
    case 'category':
      router.push(`/category/${item.slug}`);
      break;
    case 'page':
      router.push(`/page/${item.slug}`);
    default:
      return;
  }
};

const DefaultTemplate = ({
  nodes,
  children,
}: {
  nodes: IEnrichedNode[];
  children: ReactNode;
}) => {
  const router = useRouter();

  return (
    <Fragment>
      <style jsx global>{`
        .node-link,
        .node-link:link,
        .node-link:visited {
          color: #223d80;
          font-weight: bold;
          text-decoration: none;
        }

        .node-link:hover,
        .node-link:active {
          color: #4d6dbd;
        }
      `}</style>
      <style jsx>{`
        .row {
          display: flex;
          font-family: 'Rajdhani', sans-serif;
        }
        .tree-menu-col {
          width: 400px;
        }
        .container {
          padding: 2rem;
        }
      `}</style>
      <div className="row">
        <div className="tree-menu-col">
          <TreeMenu data={nodes} onClickItem={navigate(router)} />
        </div>
        <div className="container">{children}</div>
      </div>
    </Fragment>
  );
};

export default DefaultTemplate;
