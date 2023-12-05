import React from 'react';
import { StructuredText as DatoStructuredText } from 'react-datocms';
import { Link } from './Link';
import { buildUrl, hasStructuredText } from '../../utils';

export const StructuredText = ({ data }) =>
  hasStructuredText(data) && (
    <DatoStructuredText
      data={data}
      renderInlineRecord={({ record: { pageUrl, text } }) => {
        return <Link to={pageUrl}>{text}</Link>;
      }}
      renderLinkToRecord={({
        record: { pageUrl },
        transformedMeta,
        children,
      }) => {
        return transformedMeta && transformedMeta.target === '_blank' ? (
          <a
            href={pageUrl.slug ? buildUrl(pageUrl.slug, pageUrl) : pageUrl.url}
            {...transformedMeta}
          >
            {children}
          </a>
        ) : (
          <Link to={pageUrl}>{children}</Link>
        );
      }}
    />
  );
