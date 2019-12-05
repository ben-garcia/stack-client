// resolve the 'cannot find module' when importing svg files.
declare module '*.svg' {
  const content: any;
  export default content;
}
