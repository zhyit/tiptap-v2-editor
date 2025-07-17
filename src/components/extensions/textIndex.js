import {Extension} from "@tiptap/vue-3";

export const TextIndent = Extension.create({
    name: 'textIndent',

    addOptions() {
        return {
            types: ['paragraph'],
            defaultIndent: '2em', // 默认缩进2个字符
        }
    },

    addGlobalAttributes() {
        return [
            {
                // 扩展以下扩展
                types: this.options.types,
                // …并添加这些属性
                attributes: {
                    indent: {
                        default: null,
                        parseHTML: element => element.style.textIndent || null,
                        renderHTML: attributes => {
                            if (!attributes.indent) {
                                return {}
                            }
                            return {
                                style: `text-indent: ${attributes.indent}`,
                            }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            toggleTextIndent: indent => ({editor, commands}) => {
                // 更精确的激活状态检查
                const currentIndent = editor.getAttributes('paragraph').indent;
                const isActive = currentIndent === indent ||
                    (currentIndent && !indent) ||
                    (!currentIndent && indent === this.options.defaultIndent);

                if (isActive) {
                    return commands.unsetTextIndent();
                }
                return commands.setTextIndent(indent)
            },
            setTextIndent: indent => ({commands}) => {
                return this.options.types
                    .map(type => commands.updateAttributes(type, { indent: (indent ? indent : this.options.defaultIndent) }))
                    .every(response => response)
            },
            unsetTextIndent: () => ({commands}) => {
                return this.options.types
                    .map(type => commands.resetAttributes(type, 'indent'))
                    .every(response => response)
            },
        }
    },
})