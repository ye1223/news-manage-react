import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

interface IProps {
    event: (val: string) => void
}
function MyEditor({ event }: IProps) {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [html, setHtml] = useState('')

    // 模拟 ajax 请求，异步设置 html
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello world</p>')
    //     }, 1500)
    // }, [])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        // 传递给父组件
        event(html)
    }, [html])

/*     useEffect(()=>{
        return () => {
            if(location.pathname!=='/news/add'){
                console.log('销毁')
                if (editor == null) return
                editor?.destroy()
                setEditor(null)
            }
            // console.log(location.pathname)
        }
    }, [location.pathname, editor]) */

    // 实例销毁
    useEffect(()=>{
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor: any) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            {/* <div style={{ marginTop: '15px' }}>
                {html}
            </div> */}
        </>
    )
}

export default MyEditor