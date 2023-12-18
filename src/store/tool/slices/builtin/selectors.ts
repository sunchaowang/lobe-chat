import { pluginHelpers } from '../../helpers';
import type { ToolStoreState } from '../../initialState';

const isBuiltinTool = (id: string) => (s: ToolStoreState) =>
  pluginHelpers.isCustomPlugin(id, s.installedPlugins);

const metaList = (s: ToolStoreState) =>
  s.builtinTools.map((t) => ({
    identifier: t.identifier,
    meta: t.manifest.meta,
  }));

export const builtinToolSelectors = {
  isBuiltinTool,
  metaList,
};
