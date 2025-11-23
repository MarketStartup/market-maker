'use client';

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

type Props = {
   data: SerializedEditorState;
};

export function RichText({ data }: Props) {
   const html = convertLexicalToHTML({ data });

   return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
