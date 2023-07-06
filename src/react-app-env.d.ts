/// <reference types="react-scripts" />
// 引用 react-scripts 提供的类型定义(type definitions),也就是 @types/react-scripts 提供的类型定义。
/// <reference types="node" />

interface NodeJS {
    process: ProcessEnv
}
interface ProcessEnv {
    REACT_APP_URL: string
}
declare const process: NodeJS