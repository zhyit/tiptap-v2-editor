import {Extension} from "@tiptap/vue-3";

export const LetterSpacing = Extension.create({
    name: 'letterSpacing',
    addOptions() {
        return {
            types: ['paragraph', 'heading'],
            defaultVal: '1pt'
        }
    },
    addGlobalAttributes() {
        return [
            {
                // 扩展以下扩展
                types: this.options.types,
                // …并添加这些属性
                attributes: {
                    letterSpacing: {
                        default: null,
                        parseHTML: element => element.style.letterSpacing || null,
                        renderHTML: attributes => {
                            if (!attributes.letterSpacing) {
                                return {}
                            }
                            return {
                                style: `letter-spacing: ${attributes.letterSpacing}`,
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setLetterSpacing: val => ({commands}) => {
                return this.options.types
                    .map(type => commands.updateAttributes(type, {letterSpacing: (val ? val : this.options.defaultVal)}))
                    .every(response => response)
            },
            unsetLetterSpacing: () => ({commands}) => {
                return this.options.types
                    .map(type => commands.resetAttributes(type, 'letterSpacing'))
                    .every(response => response)
            },
        }
    }
})