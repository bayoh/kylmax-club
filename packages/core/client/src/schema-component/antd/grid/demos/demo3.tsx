import { ISchema, observer, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import {
  CardItem,
  DragHandler,
  Grid,
  Markdown,
  SchemaComponent,
  SchemaComponentProvider,
  SchemaInitializer,
  SchemaInitializerProvider
} from '@nocobase/client';
import React from 'react';

const gridRowColWrap = (schema) => {
  return {
    type: 'void',
    'x-component': 'Grid.Row',
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'Grid.Col',
        properties: {
          [schema.name || uid()]: schema,
        },
      },
    },
  };
};

export const AddBlockButton = (props: any) => {
  const { insertPosition, component } = props;
  return (
    <SchemaInitializer.Button
      insertPosition={insertPosition}
      wrap={gridRowColWrap}
      items={[
        {
          key: 'media',
          type: 'itemGroup',
          title: 'Other blocks',
          children: [
            {
              key: 'markdown',
              type: 'item',
              title: 'Markdown',
              component: 'MarkdownBlockInitializer',
            },
          ],
        },
      ]}
      component={component}
      title={component ? undefined : 'Add block'}
    />
  );
};

const Block = observer((props) => {
  const fieldSchema = useFieldSchema();
  return (
    <div style={{ marginBottom: 20, padding: '0 20px', height: 50, lineHeight: '50px', background: '#f1f1f1' }}>
      Block {fieldSchema.title}
      <DragHandler />
    </div>
  );
});

const schema: ISchema = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'Grid',
      'x-initializer': 'AddBlockButton',
      'x-uid': uid(),
      properties: {},
    },
  },
};

export default function App() {
  return (
    <SchemaComponentProvider components={{ Grid, CardItem, Markdown }}>
      <SchemaInitializerProvider initializers={{ AddBlockButton }}>
        <SchemaComponent schema={schema} />
      </SchemaInitializerProvider>
    </SchemaComponentProvider>
  );
}
