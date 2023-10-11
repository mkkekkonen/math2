import { ReactNode, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import TreeMenu from 'react-simple-tree-menu';

import { IEnrichedNode, NodeType } from '@/utils/treeData';

import 'react-simple-tree-menu/dist/main.css';

const Row = styled.div`
  display: flex;
  font-family: 'Rajdhani', sans-serif;
`;

const TreeMenuCol = styled.div`
  width: 400px;
`;

const Container = styled.div`
  padding: 2rem;
`;

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
      <Row>
        <TreeMenuCol>
          <TreeMenu data={nodes} onClickItem={navigate(router)} />
        </TreeMenuCol>
        <Container>{children}</Container>
      </Row>
    </Fragment>
  );
};

export default DefaultTemplate;
