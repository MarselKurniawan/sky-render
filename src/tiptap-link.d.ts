declare module '@tiptap/extension-link' {
  import { Mark } from '@tiptap/core';
  
  interface LinkOptions {
    openOnClick?: boolean;
    linkOnPaste?: boolean;
    autolink?: boolean;
    protocols?: string[];
    HTMLAttributes?: Record<string, any>;
    validate?: (url: string) => boolean;
  }
  
  const Link: Mark<LinkOptions>;
  export default Link;
  export { Link, LinkOptions };
}
