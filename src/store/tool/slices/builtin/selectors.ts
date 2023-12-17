import { pluginHelpers } from '../../helpers';
import type { ToolStoreState } from '../../initialState';

const isBuiltinTool = (id: string) => (s: ToolStoreState) =>
  pluginHelpers.isCustomPlugin(id, s.installedPlugins);

export const builtinToolSelectors = {
  isBuiltinTool,
};
