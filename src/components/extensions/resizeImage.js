import {Image} from "@tiptap/extension-image";
// 复制 tiptap-extension-resize-image 的index.js 改了图标
export const ResizeImage = Image.extend({
    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            style: {
                default: 'max-width: 100%; height: auto; cursor: pointer;',
                parseHTML: element => {
                    const width = element.getAttribute('width');
                    return width
                        ? `width: ${width}px; height: auto; cursor: pointer;`
                        : `${element.style.cssText}`;
                }
            },
            title: {
                default: null,
            },
            loading: {
                default: null,
            },
            srcset: {
                default: null,
            },
            sizes: {
                default: null,
            },
            crossorigin: {
                default: null,
            },
            usemap: {
                default: null,
            },
            ismap: {
                default: null,
            },
            width: {
                default: null,
            },
            height: {
                default: null,
            },
            referrerpolicy: {
                default: null,
            },
            longdesc: {
                default: null,
            },
            decoding: {
                default: null,
            },
            class: {
                default: null,
            },
            id: {
                default: null,
            },
            name: {
                default: null,
            },
            draggable: {
                default: true,
            },
            tabindex: {
                default: null,
            },
            'aria-label': {
                default: null,
            },
            'aria-labelledby': {
                default: null,
            },
            'aria-describedby': {
                default: null,
            },
        };
    },
    addNodeView() {
        return ({node, editor, getPos}) => {
            const {view, options: {editable},} = editor;
            const {style} = node.attrs;
            const $wrapper = document.createElement('div');
            const $container = document.createElement('div');
            const $img = document.createElement('img');
            const iconStyle = 'width: 14px; height: 14px; cursor: pointer;';
            const dispatchNodeView = () => {
                if (typeof getPos === 'function') {
                    const newAttrs = Object.assign(Object.assign({}, node.attrs), {style: `${$img.style.cssText}`});
                    view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
                }
            };
            const paintPositionController = () => {
                const temp = document.createElement('div');
                const $postionController = document.createElement('div');
                temp.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                        fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2 12C2 11.4477 2.44772 11 3 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H3C2.44772 13 2 12.5523 2 12Z"
                        fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2 18C2 17.4477 2.44772 17 3 17H17C17.5523 17 18 17.4477 18 18C18 18.5523 17.5523 19 17 19H3C2.44772 19 2 18.5523 2 18Z"
                        fill="currentColor"></path>
                </svg>`;
                const $leftController = temp.firstElementChild;
                temp.innerHTML = `<svg width="24" height="24" class="tiptap-btn-icon" viewBox="0 0 24 24" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                        fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
                        fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
                        fill="currentColor"></path>
                </svg>`
                const $centerController = temp.firstElementChild;
                temp.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                        fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8 12C8 11.4477 8.44772 11 9 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H9C8.44772 13 8 12.5523 8 12Z"
                        fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6 18C6 17.4477 6.44772 17 7 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H7C6.44772 19 6 18.5523 6 18Z"
                        fill="currentColor"></path>
                </svg>`
                const $rightController = temp.firstElementChild;
                temp.remove();
                const controllerMouseOver = e => {
                    e.target.style.opacity = 0.3;
                };
                const controllerMouseOut = e => {
                    e.target.style.opacity = 1;
                };
                $postionController.setAttribute('style', 'position: absolute; top: 0%; left: 50%; padding: 3px 5px; z-index: 999; background-color: rgba(255, 255, 255, 0.7); border-radius: 4px; border: 2px solid #6C6C6C; cursor: pointer; transform: translate(-50%, -50%); display: flex; justify-content: space-between; align-items: center;gap: 3px;');
                $leftController.setAttribute('style', iconStyle);
                $leftController.addEventListener('mouseover', controllerMouseOver);
                $leftController.addEventListener('mouseout', controllerMouseOut);
                $centerController.setAttribute('style', iconStyle);
                $centerController.addEventListener('mouseover', controllerMouseOver);
                $centerController.addEventListener('mouseout', controllerMouseOut);
                $rightController.setAttribute('style', iconStyle);
                $rightController.addEventListener('mouseover', controllerMouseOver);
                $rightController.addEventListener('mouseout', controllerMouseOut);
                $leftController.addEventListener('click', () => {
                    $img.setAttribute('style', `${$img.style.cssText} margin: 0 auto 0 0;`);
                    dispatchNodeView();
                });
                $centerController.addEventListener('click', () => {
                    $img.setAttribute('style', `${$img.style.cssText} margin: 0 auto;`);
                    dispatchNodeView();
                });
                $rightController.addEventListener('click', () => {
                    $img.setAttribute('style', `${$img.style.cssText} margin: 0 0 0 auto;`);
                    dispatchNodeView();
                });
                $postionController.appendChild($leftController);
                $postionController.appendChild($centerController);
                $postionController.appendChild($rightController);
                $container.appendChild($postionController);
            };
            $wrapper.setAttribute('style', `display: flex;`);
            $wrapper.appendChild($container);
            $container.setAttribute('style', `${style}`);
            $container.appendChild($img);
            Object.entries(node.attrs).forEach(([key, value]) => {
                if (value === undefined || value === null)
                    return;
                $img.setAttribute(key, value);
            });
            if (!editable)
                return {dom: $img};
            const dotsPosition = [
                'top: -4px; left: -4px; cursor: nwse-resize;',
                'top: -4px; right: -4px; cursor: nesw-resize;',
                'bottom: -4px; left: -4px; cursor: nesw-resize;',
                'bottom: -4px; right: -4px; cursor: nwse-resize;',
            ];
            let isResizing = false;
            let startX, startWidth;
            $container.addEventListener('click', () => {
                //remove remaining dots and position controller
                if ($container.childElementCount > 3) {
                    for (let i = 0; i < 5; i++) {
                        $container.removeChild($container.lastChild);
                    }
                }
                paintPositionController();
                $container.setAttribute('style', `position: relative; border: 1px dashed #6C6C6C; ${style} cursor: pointer;`);
                Array.from({length: 4}, (_, index) => {
                    const $dot = document.createElement('div');
                    $dot.setAttribute('style', `position: absolute; width: 9px; height: 9px; border: 1.5px solid #6C6C6C; border-radius: 50%; ${dotsPosition[index]}`);
                    $dot.addEventListener('mousedown', e => {
                        e.preventDefault();
                        isResizing = true;
                        startX = e.clientX;
                        startWidth = $container.offsetWidth;
                        const onMouseMove = (e) => {
                            if (!isResizing)
                                return;
                            const deltaX = index % 2 === 0 ? -(e.clientX - startX) : e.clientX - startX;
                            const newWidth = startWidth + deltaX;
                            $container.style.width = newWidth + 'px';
                            $img.style.width = newWidth + 'px';
                        };
                        const onMouseUp = () => {
                            if (isResizing) {
                                isResizing = false;
                            }
                            dispatchNodeView();
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                        };
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    });
                    $container.appendChild($dot);
                });
            });
            document.addEventListener('click', (e) => {
                const $target = e.target;
                const isClickInside = $container.contains($target) || $target.style.cssText === iconStyle;
                if (!isClickInside) {
                    const containerStyle = $container.getAttribute('style');
                    const newStyle = containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle.replace('border: 1px dashed #6C6C6C;', '');
                    $container.setAttribute('style', newStyle);
                    if ($container.childElementCount > 3) {
                        for (let i = 0; i < 5; i++) {
                            $container.removeChild($container.lastChild);
                        }
                    }
                }
            });
            return {
                dom: $wrapper,
            };
        };
    },
});