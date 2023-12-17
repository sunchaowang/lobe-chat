import { LobeChatPluginApi , Meta } from '@lobehub/chat-plugin-sdk';

export interface BuiltinToolManifest {
  api: LobeChatPluginApi[];

  /**
   * Plugin name
   */
  identifier: string;
  /**
   * metadata
   * @desc Meta data of the plugin
   */
  meta: Meta;
  systemRole: string;
  /**
   * plugin runtime type
   * @default default
   */
  type?: 'builtin';
}

export interface LobeBuiltinTool {
  identifier: string;
  manifest: BuiltinToolManifest;
  type: 'builtin';
}
