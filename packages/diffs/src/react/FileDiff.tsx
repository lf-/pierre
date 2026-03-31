'use client';

import { DIFFS_TAG_NAME } from '../constants';
import type { FileDiffMetadata } from '../types';
import type { DiffBasePropsReact } from './types';
import { renderDiffChildren } from './utils/renderDiffChildren';
import { templateRender } from './utils/templateRender';
import { useFileDiffInstance } from './utils/useFileDiffInstance';

export type { FileDiffMetadata };

export interface FileDiffProps<
  LAnnotation,
  LDecoration,
> extends DiffBasePropsReact<LAnnotation, LDecoration> {
  fileDiff: FileDiffMetadata;
  disableWorkerPool?: boolean;
  contentEditable?: boolean;
}

export function FileDiff<LAnnotation = undefined, LDecoration = undefined>({
  fileDiff,
  options,
  metrics,
  lineAnnotations,
  decorations,
  selectedLines,
  className,
  style,
  prerenderedHTML,
  renderAnnotation,
  renderCustomHeader,
  renderHeaderPrefix,
  renderHeaderFilenameSuffix,
  renderHeaderMetadata,
  renderGutterUtility,
  disableWorkerPool = false,
  contentEditable = false,
}: FileDiffProps<LAnnotation, LDecoration>): React.JSX.Element {
  const { ref, getHoveredLine } = useFileDiffInstance({
    fileDiff,
    options,
    metrics,
    lineAnnotations,
    decorations,
    selectedLines,
    prerenderedHTML,
    hasGutterRenderUtility: renderGutterUtility != null,
    hasCustomHeader: renderCustomHeader != null,
    disableWorkerPool,
    contentEditable,
  });
  const children = renderDiffChildren({
    fileDiff,
    renderCustomHeader,
    renderHeaderPrefix,
    renderHeaderFilenameSuffix,
    renderHeaderMetadata,
    renderAnnotation,
    renderGutterUtility,
    lineAnnotations,
    getHoveredLine,
  });
  return (
    <DIFFS_TAG_NAME ref={ref} className={className} style={style}>
      {templateRender(children, prerenderedHTML)}
    </DIFFS_TAG_NAME>
  );
}
