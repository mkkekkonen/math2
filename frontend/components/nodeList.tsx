import { Fragment } from 'react';
import Link from 'next/link';
import { useIntl, FormattedMessage } from 'react-intl';

import { INode, NodeType } from 'utils/treeData';

const NodeList = ({
  nodes,
  headingLocalizationKey,
  nodeType,
}: {
  nodes: INode[];
  headingLocalizationKey: string;
  nodeType: NodeType;
}) => {
  const intl = useIntl();

  if (!nodes || nodes.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <h3>
        <FormattedMessage id={headingLocalizationKey} />
      </h3>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            <Link className="node-link" href={`/${nodeType}/${node.slug}`}>
              {intl.locale === 'fi' ? node.name_fi : node.name_en}
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default NodeList;
