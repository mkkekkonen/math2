import { ReactNode, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import TreeMenu from 'react-simple-tree-menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

import { IEnrichedNode, NodeType } from '@/utils/treeData';
import LocalePicker from '@/components/localePicker';

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
        body {
          font-family: 'Rajdhani', sans-serif;
        }

        a,
        a:link,
        a:visited {
          color: #223d80;
          font-weight: bold;
          text-decoration: none;
        }

        a:hover,
        a:active {
          color: #4d6dbd;
        }

        .navbar-container {
          justify-content: flex-start !important;
        }

        .home-link {
          color: #ddd !important;
          display: flex;
          align-items: center;
        }

        .home-link > span {
          padding-top: 0.25rem;
        }

        .content-container {
          padding: 2rem;
        }

        .graph-container {
          width: 400px;
          height: 400px;
        }
      `}</style>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="/" className="home-link">
            <span>
              <FormattedMessage id="mathVisualized" />
            </span>
            &nbsp;
            <FaHome />
          </Navbar.Brand>
          <LocalePicker />
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col xs={3}>
            <TreeMenu data={nodes} onClickItem={navigate(router)} />
          </Col>
          {children}
        </Row>
      </Container>
    </Fragment>
  );
};

export default DefaultTemplate;
